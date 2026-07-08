"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

/**
 * FluidMorph: one continuous silver line on pure black that first draws an
 * abstract human profile (with a subtle smile), then unravels and re-forms as
 * the "Couders" wordmark. Coded SVG only, no video.
 *
 * Technique: both source paths are hidden in the SVG. On mount each is
 * resampled into N equidistant points (getPointAtLength), normalized to the
 * viewBox center. Every frame we rebuild the visible path from interpolated
 * points. Each point carries its own staggered progress (head of the line
 * morphs first), plus a sine lift and a traveling ripple, so the line reads
 * as a string flowing through space rather than a crossfade.
 */

const VB_W = 1440;
const VB_H = 560;
const SAMPLES = 260;
/** How far the head of the line runs ahead of the tail (0 = rigid morph). */
const LAG = 0.55;
/** Vertical arc the line travels through mid-morph, in viewBox units. */
const DRIFT = 64;
/** Amplitude of the fluid ripple mid-morph. */
const RIPPLE = 10;

/**
 * Abstract profile, one open stroke: forehead, brow, nose, lips (raised in a
 * slight smile), chin, jaw, then a long sweep back over the skull.
 */
const FACE_D = `
M 356 78
C 306 108 290 158 302 204
C 308 228 300 240 286 254
C 272 270 264 288 276 299
C 285 307 287 317 279 324
C 293 332 311 333 324 326
C 312 343 296 348 287 346
C 300 358 309 371 303 386
C 293 412 262 424 236 415
C 198 402 183 371 190 336
C 152 322 140 236 176 178
C 208 126 296 84 356 78
C 376 76 396 80 412 90
`;

/**
 * "Couders" as bespoke monoline cursive lettering, one continuous stroke.
 * This path IS the logotype: the same line that drew the face becomes the
 * brand name. Baseline y=330, x-height 90 (waist y=240), ascender y=168.
 */
const WORD_D = `
M 344 208
C 328 176 284 160 244 172
C 194 188 168 238 178 284
C 188 330 240 352 288 336
C 304 331 316 322 324 310
C 328 322 336 330 348 330
L 392 332
C 362 330 350 306 354 280
C 358 250 384 234 412 237
C 442 240 458 264 454 292
C 450 320 426 334 400 332
C 414 337 428 336 440 329
C 452 322 462 310 470 294
C 486 280 498 264 506 246
L 506 296
C 506 322 522 336 544 330
C 560 324 570 310 570 292
L 570 246
L 570 300
C 572 324 584 334 600 330
C 610 326 618 318 622 306
C 630 322 646 332 662 328
C 644 334 614 326 604 304
C 594 282 606 256 632 249
C 658 242 678 258 680 282
C 678 296 672 308 662 314
C 672 320 682 314 684 298
L 686 170
L 686 316
C 688 330 700 336 714 330
C 726 326 734 318 738 306
C 748 282 760 260 776 252
C 790 246 800 254 796 266
C 790 280 770 284 758 276
C 746 296 750 318 768 326
C 780 331 792 328 800 318
C 812 322 820 314 824 300
C 826 288 828 268 830 250
C 836 242 846 242 850 248
C 852 262 850 296 849 330
C 851 334 858 336 866 332
C 884 324 902 288 914 250
C 918 242 926 242 928 250
C 934 268 934 296 920 316
C 912 326 900 330 892 322
C 900 334 918 338 934 330
C 944 325 952 318 956 310
`;

function clamp01(v: number) {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/** Resample a path element into n+1 equidistant [x0,y0,x1,y1,...] points. */
function samplePath(el: SVGPathElement, n: number): number[] {
  const total = el.getTotalLength();
  const pts = new Array<number>((n + 1) * 2);
  for (let i = 0; i <= n; i++) {
    const p = el.getPointAtLength((total * i) / n);
    pts[i * 2] = p.x;
    pts[i * 2 + 1] = p.y;
  }
  return pts;
}

/**
 * Light Laplacian smoothing over the resampled polyline. Softens the corner
 * kinks left by hand-authored bezier junctions so the string reads as one
 * continuous, tensioned line. Endpoints stay pinned.
 */
function smoothPoints(pts: number[], passes: number): number[] {
  const out = pts.slice();
  const n = out.length / 2;
  for (let pass = 0; pass < passes; pass++) {
    for (let i = 1; i < n - 1; i++) {
      out[i * 2] = (out[(i - 1) * 2] + 2 * out[i * 2] + out[(i + 1) * 2]) / 4;
      out[i * 2 + 1] =
        (out[(i - 1) * 2 + 1] + 2 * out[i * 2 + 1] + out[(i + 1) * 2 + 1]) / 4;
    }
  }
  return out;
}

/** Scale a point set to fit a fraction of the viewBox and center it. */
function fitToViewBox(pts: number[], fracW: number, fracH: number): number[] {
  let minX = Infinity,
    maxX = -Infinity,
    minY = Infinity,
    maxY = -Infinity;
  for (let i = 0; i < pts.length; i += 2) {
    if (pts[i] < minX) minX = pts[i];
    if (pts[i] > maxX) maxX = pts[i];
    if (pts[i + 1] < minY) minY = pts[i + 1];
    if (pts[i + 1] > maxY) maxY = pts[i + 1];
  }
  const s = Math.min((VB_W * fracW) / (maxX - minX), (VB_H * fracH) / (maxY - minY));
  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;
  const out = new Array<number>(pts.length);
  for (let i = 0; i < pts.length; i += 2) {
    out[i] = (pts[i] - cx) * s + VB_W / 2;
    out[i + 1] = (pts[i + 1] - cy) * s + VB_H / 2;
  }
  return out;
}

/** Build the visible line for morph progress t in [0,1]. */
function morphD(a: number[], b: number[], t: number): string {
  const parts = new Array<string>(SAMPLES + 1);
  for (let i = 0; i <= SAMPLES; i++) {
    const u = i / SAMPLES;
    // Head-first unravel: the start of the string leaves the face early,
    // the tail follows. Eased per point so each segment glides.
    const p = easeInOutCubic(clamp01(t * (1 + LAG) - LAG * u));
    const swell = Math.sin(p * Math.PI); // 0 at rest, 1 mid-flight
    const lift = swell * DRIFT * Math.sin(u * Math.PI);
    const ripple = swell * RIPPLE * Math.sin(u * 16 + t * 9);
    const x = a[i * 2] + (b[i * 2] - a[i * 2]) * p;
    const y = a[i * 2 + 1] + (b[i * 2 + 1] - a[i * 2 + 1]) * p - lift + ripple;
    parts[i] = `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return parts.join(" ");
}

export default function FluidMorph({
  /** External 0..1 morph driver (scroll progress of the hero). */
  scrollTargetRef,
  /** Freeze at a fixed progress (design review / lab use). */
  debugProgress,
  className,
}: {
  scrollTargetRef?: React.RefObject<HTMLElement | null>;
  debugProgress?: number;
  className?: string;
}) {
  const faceRef = useRef<SVGPathElement>(null);
  const wordRef = useRef<SVGPathElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const shapes = useRef<{ a: number[]; b: number[] } | null>(null);
  const [ready, setReady] = useState(false);
  const reduced = useReducedMotion();

  // Scroll drives the morph across the hero's scrub range; a spring smooths
  // it so the line glides without friction instead of tracking the wheel 1:1.
  const { scrollYProgress } = useScroll(
    scrollTargetRef
      ? { target: scrollTargetRef, offset: ["start start", "end end"] }
      : undefined
  );
  const raw = useTransform(scrollYProgress, [0.08, 0.62], [0, 1]);
  const progress = useSpring(raw, { stiffness: 64, damping: 19, mass: 0.9 });

  const render = (t: number) => {
    const s = shapes.current;
    if (s && lineRef.current) lineRef.current.setAttribute("d", morphD(s.a, s.b, t));
  };

  useMotionValueEvent(progress, "change", (t) => {
    if (debugProgress === undefined && !reduced) render(t);
  });

  useEffect(() => {
    if (!faceRef.current || !wordRef.current) return;
    shapes.current = {
      a: fitToViewBox(smoothPoints(samplePath(faceRef.current, SAMPLES), 1), 0.34, 0.86),
      b: fitToViewBox(smoothPoints(samplePath(wordRef.current, SAMPLES), 1), 0.88, 0.62),
    };
    setReady(true);

    if (reduced) {
      // Reduced motion: skip the theatrics, show the wordmark.
      render(1);
      return;
    }
    if (debugProgress !== undefined) {
      render(debugProgress);
      return;
    }

    // Beat 1: the string draws the face in from nothing.
    render(0);
    const el = lineRef.current;
    if (!el) return;
    const len = el.getTotalLength();
    el.style.strokeDasharray = `${len}`;
    el.style.strokeDashoffset = `${len}`;
    const draw = animate(len, 0, {
      duration: 1.9,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => (el.style.strokeDashoffset = `${v}`),
      onComplete: () => {
        el.style.strokeDasharray = "none";
        el.style.strokeDashoffset = "0";
      },
    });
    return () => draw.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debugProgress, reduced]);

  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      fill="none"
      className={className}
      aria-label="A single continuous line morphing from an abstract face into the Couders wordmark"
      role="img"
    >
      <defs>
        <linearGradient id="chrome" x1="0" y1="0" x2="1" y2="0.25">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.35" stopColor="#D7DBE2" />
          <stop offset="0.62" stopColor="#9BA1AB" />
          <stop offset="0.85" stopColor="#EDEFF3" />
          <stop offset="1" stopColor="#FFFFFF" />
          {/* Slow specular sweep along the stroke. */}
          <animateTransform
            attributeName="gradientTransform"
            type="translate"
            values="-0.6 0; 0.6 0; -0.6 0"
            dur="9s"
            repeatCount="indefinite"
          />
        </linearGradient>
        <filter id="lineGlow" x="-20%" y="-40%" width="140%" height="180%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>

      {/* Hidden morph sources (never displayed, only measured). */}
      <path ref={faceRef} d={FACE_D} style={{ visibility: "hidden" }} />
      <path ref={wordRef} d={WORD_D} style={{ visibility: "hidden" }} />

      {/* Soft chrome halo behind the line. */}
      {ready && (
        <use
          href="#fluid-line"
          filter="url(#lineGlow)"
          stroke="#C7CCD6"
          strokeOpacity="0.22"
          strokeWidth="6"
        />
      )}

      <path
        id="fluid-line"
        ref={lineRef}
        stroke="url(#chrome)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ opacity: ready ? 1 : 0 }}
      />
    </svg>
  );
}
