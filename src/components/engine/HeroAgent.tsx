"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FLOWER_COLOR, LINE_COLOR } from "./agentPath";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ============================================================================
   DEVELOPER: PASTE THE EXPORTED CONTINUOUS-LINE SVG PATH (d="") BELOW.
   Export the artwork from Figma / Illustrator as a single stroked path and
   replace AGENT_PATH_D with its `d` attribute. Any coordinate system works:
   the component measures the path with getBBox() and fits the viewBox
   automatically. The simple arc below is only a stand-in.
   ========================================================================== */
const AGENT_PATH_D = "M 30 170 C 60 96 140 96 170 170";

/* Align the flower head to the stem tip of YOUR exported path, in the same
   coordinate system as AGENT_PATH_D. */
const FLOWER = { cx: 100, cy: 78, r: 14 };

/* Length of the short stem segment that sways together with the head. */
const STEM_DROP = 18;

const FALLBACK_VIEWBOX = "0 0 200 200";

export default function HeroAgent({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const pathRef = useRef<SVGPathElement>(null);
  const [viewBox, setViewBox] = useState<string | null>(null);

  useEffect(() => {
    const p = pathRef.current;
    if (!p) return;
    let b: DOMRect;
    try {
      b = p.getBBox();
    } catch {
      setViewBox(FALLBACK_VIEWBOX);
      return;
    }
    const hasPath = b.width > 1 || b.height > 1;
    const minX = Math.min(hasPath ? b.x : Infinity, FLOWER.cx - FLOWER.r);
    const minY = Math.min(hasPath ? b.y : Infinity, FLOWER.cy - FLOWER.r);
    const maxX = Math.max(hasPath ? b.x + b.width : -Infinity, FLOWER.cx + FLOWER.r);
    const maxY = Math.max(hasPath ? b.y + b.height : -Infinity, FLOWER.cy + FLOWER.r);
    const w = maxX - minX;
    const h = maxY - minY;
    const pad = 0.1 * Math.max(w, h);
    setViewBox(
      `${(minX - pad).toFixed(1)} ${(minY - pad).toFixed(1)} ${(w + pad * 2).toFixed(1)} ${(h + pad * 2).toFixed(1)}`
    );
  }, []);

  const stemBase = { x: FLOWER.cx, y: FLOWER.cy + FLOWER.r + STEM_DROP };

  return (
    <motion.svg
      aria-hidden="true"
      viewBox={viewBox ?? FALLBACK_VIEWBOX}
      fill="none"
      className={className}
      opacity={viewBox ? 1 : 0}
      style={{ transformOrigin: "50% 85%" }}
      animate={reduced ? undefined : { rotate: [-2.2, 2.2] }}
      transition={{
        duration: 2.9,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      }}
    >
      <defs>
        <filter id="agent-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>

      {/* Soft silver halo behind the line; tracks any pasted path. */}
      <use
        href="#agent-line"
        filter="url(#agent-glow)"
        style={{ stroke: "#C7CCD6", strokeOpacity: 0.25, strokeWidth: 9 }}
      />

      {/* Flower head + upper stem, swaying counterphase to the figure. */}
      <motion.g
        animate={reduced ? undefined : { rotate: [3.5, -3.5] }}
        transition={{
          duration: 3.4,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          delay: 0.4,
        }}
        style={{
          transformOrigin: `${stemBase.x}px ${stemBase.y}px`,
          transformBox: "view-box",
        }}
      >
        <motion.circle
          cx={FLOWER.cx}
          cy={FLOWER.cy}
          r={FLOWER.r}
          fill={FLOWER_COLOR}
          initial={reduced ? false : { scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.9, duration: 0.7, ease: EASE }}
          style={{
            transformOrigin: `${stemBase.x}px ${stemBase.y}px`,
            transformBox: "view-box",
          }}
        />
        <path
          d={`M ${stemBase.x} ${stemBase.y} L ${FLOWER.cx} ${FLOWER.cy + FLOWER.r - 2}`}
          stroke={LINE_COLOR}
          strokeWidth="5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </motion.g>

      {/* DEVELOPER: PASTE THE EXPORTED CONTINUOUS-LINE SVG PATH (d="") HERE */}
      <motion.path
        id="agent-line"
        ref={pathRef}
        d={AGENT_PATH_D}
        stroke={LINE_COLOR}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        initial={reduced ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.2, ease: EASE }}
      />
    </motion.svg>
  );
}
