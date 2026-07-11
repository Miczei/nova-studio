"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import type { Sector, SectorTile, SectorsContent } from "@/i18n/sectors";
import SectorFlow from "./SectorFlow";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const ACCENT = "#C06C4C";
const SILVER = "#C7CCD6";

/* Continuous single-stroke hero paths per sector (viewBox 0 0 320 130). */
const VISUALS: Record<Sector["id"], string> = {
  healthcare:
    "M 8 78 L 74 78 L 84 60 L 96 96 L 108 46 L 120 84 L 128 78 L 176 78 " +
    "C 208 78 216 56 236 52 C 262 47 276 66 268 84 C 260 101 234 98 230 80 " +
    "C 227 66 240 55 254 58",
  legal:
    "M 44 84 A 26 26 0 0 0 96 84 L 70 46 L 160 30 L 250 46 L 224 84 " +
    "A 26 26 0 0 0 276 84 L 250 46 L 160 30 L 160 108 L 128 112 L 192 112",
  industrial:
    "M 96 34 L 110 42 L 126 36 L 132 52 L 148 58 L 142 74 L 150 88 L 136 96 " +
    "L 130 112 L 114 106 L 100 114 L 92 100 L 76 96 L 80 80 L 72 66 L 86 58 Z " +
    "M 150 88 L 168 84 L 178 72 L 192 78 L 206 70 L 212 82 L 228 84 L 226 98 " +
    "L 236 108 L 224 116 L 220 126 L 206 122 L 194 128 L 188 116 L 174 112 L 176 98 Z",
  ecommerce:
    "M 16 34 L 44 34 L 62 90 L 206 90 L 222 50 L 76 50 " +
    "C 92 96 76 112 90 116 C 104 120 110 100 96 98 " +
    "L 188 98 C 178 116 196 126 204 112 C 210 100 196 94 192 104 " +
    "C 232 84 250 60 284 56",
  finance:
    "M 12 104 L 58 78 L 92 90 L 138 50 L 170 64 L 206 28 " +
    "C 234 20 250 38 242 56 C 234 72 210 68 210 50 C 210 38 222 30 234 34",
};

function SectorVisual({ sector, aria }: { sector: Sector["id"]; aria: string }) {
  const reduced = useReducedMotion();
  return (
    <svg viewBox="0 0 320 130" fill="none" role="img" aria-label={aria} className="w-full max-w-md">
      <defs>
        <filter id="sector-glow" x="-20%" y="-40%" width="140%" height="180%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>
      <motion.path
        d={VISUALS[sector]}
        stroke={ACCENT}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#sector-glow)"
        animate={reduced ? undefined : { opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        opacity={0.3}
      />
      <motion.path
        d={VISUALS[sector]}
        stroke={ACCENT}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduced ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.6, ease: EASE }}
      />
    </svg>
  );
}

/* ---- Magnetic card: subtle pull toward the cursor + terracotta glow ---- */
function MagneticCard({
  children,
  className,
  layoutId,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  layoutId?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(my, { stiffness: 220, damping: 18, mass: 0.4 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--gx", `${e.clientX - r.left}px`);
    el.style.setProperty("--gy", `${e.clientY - r.top}px`);
    if (reduced) return;
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 10);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 8);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      layoutId={layoutId}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      style={{ x, y }}
      className={`group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0A0A0B] transition-colors duration-500 hover:border-white/[0.22] ${
        onClick ? "cursor-pointer" : ""
      } ${className ?? ""}`}
    >
      {/* Terracotta glow that follows the cursor */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(320px circle at var(--gx, 50%) var(--gy, 50%), ${ACCENT}1F, transparent 65%)`,
        }}
      />
      {children}
    </motion.div>
  );
}

export default function SectorHub({ content }: { content: SectorsContent }) {
  const [active, setActive] = useState<Sector["id"]>("healthcare");
  const [openTile, setOpenTile] = useState<SectorTile | null>(null);
  const rootRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const sector = content.sectors.find((s) => s.id === active) ?? content.sectors[0];

  /* Scroll-linked parallax for the floating background lines */
  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start end", "end start"],
  });
  const drift = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });
  const slow = useTransform(drift, [0, 1], [-40, 60]);
  const fast = useTransform(drift, [0, 1], [50, -90]);

  useEffect(() => {
    if (!openTile) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenTile(null);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [openTile]);

  return (
    <section ref={rootRef} className="relative z-10 bg-black px-5 pb-24 sm:px-6 sm:pb-32">
      {/* Parallax depth layer */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.svg
          viewBox="0 0 320 130"
          className="absolute -left-16 top-24 w-[420px] opacity-[0.05]"
          style={reduced ? undefined : { y: slow }}
          fill="none"
        >
          <path d={VISUALS.healthcare} stroke={SILVER} strokeWidth="2" />
        </motion.svg>
        <motion.svg
          viewBox="0 0 320 130"
          className="absolute -right-20 bottom-16 w-[480px] opacity-[0.05]"
          style={reduced ? undefined : { y: fast }}
          fill="none"
        >
          <path d={VISUALS.finance} stroke={ACCENT} strokeWidth="2" />
        </motion.svg>
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Animated pill sub-navigation */}
        <div
          role="tablist"
          aria-label={content.eyebrow}
          className="inline-flex flex-wrap gap-1 rounded-full border border-white/[0.1] bg-[#0A0A0B] p-1"
        >
          {content.sectors.map((s) => (
            <button
              key={s.id}
              role="tab"
              aria-selected={active === s.id}
              onClick={() => setActive(s.id)}
              className="relative rounded-full px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors duration-300 sm:px-5 sm:py-2.5 sm:text-[11px] sm:tracking-[0.2em]"
              style={{ color: active === s.id ? SILVER : "#52525B" }}
            >
              {active === s.id && (
                <motion.span
                  layoutId="sector-pill"
                  className="absolute inset-0 rounded-full border border-white/[0.18] bg-white/[0.06]"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative z-10">{s.label}</span>
            </button>
          ))}
        </div>

        {/* Cross-fading sector views */}
        <AnimatePresence mode="wait">
          <motion.div
            key={sector.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="mt-10 sm:mt-14"
          >
            <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-6">
              <div className="flex flex-col justify-between rounded-2xl border border-white/[0.12] bg-[#0A0A0B] p-6 sm:p-8 md:col-span-6 md:flex-row md:items-center md:gap-12 md:p-10">
                <div className="max-w-md">
                  <h2
                    className="text-2xl font-semibold tracking-[-0.02em] text-[#F5F5F7] sm:text-3xl"
                    style={{ fontFamily: "var(--font-display), sans-serif" }}
                  >
                    {sector.h2}
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-zinc-400 sm:text-[15px]">
                    {sector.lead}
                  </p>
                </div>
                <div className="mt-8 md:mt-0 md:w-2/5">
                  <SectorVisual sector={sector.id} aria={sector.visualAria} />
                </div>
              </div>

              {sector.tiles.map((t) => (
                <MagneticCard
                  key={t.title}
                  layoutId={t.deepDive ? `tile-${sector.id}-${t.title}` : undefined}
                  onClick={t.deepDive ? () => setOpenTile(t) : undefined}
                  className={`p-6 sm:p-8 ${t.span}`}
                >
                  <h3
                    className="text-lg font-semibold tracking-[-0.01em] text-[#F5F5F7] sm:text-xl"
                    style={{ fontFamily: "var(--font-display), sans-serif" }}
                  >
                    {t.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-[15px]">
                    {t.outcome ?? t.body}
                  </p>
                  {t.deepDive && (
                    <p
                      className="mt-5 font-mono text-[10px] uppercase tracking-[0.2em]"
                      style={{ color: ACCENT }}
                    >
                      {content.expandHint} +
                    </p>
                  )}
                </MagneticCard>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Expanded deep-dive modal (shared layoutId morph) */}
      <AnimatePresence>
        {openTile?.deepDive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/75 p-0 backdrop-blur-sm sm:items-center sm:p-6"
            onClick={() => setOpenTile(null)}
          >
            <motion.div
              layoutId={`tile-${sector.id}-${openTile.title}`}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl border border-white/[0.15] bg-[#0A0A0B] p-6 sm:rounded-2xl sm:p-10"
            >
              <div className="flex items-start justify-between gap-6">
                <h3
                  className="text-2xl font-semibold tracking-[-0.02em] text-[#F5F5F7] sm:text-3xl"
                  style={{ fontFamily: "var(--font-display), sans-serif" }}
                >
                  {openTile.title}
                </h3>
                <button
                  onClick={() => setOpenTile(null)}
                  aria-label={content.close}
                  className="rounded-full border border-white/[0.15] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-400 transition-colors hover:border-white/40 hover:text-white"
                >
                  {content.close}
                </button>
              </div>

              <p className="mt-3 text-[15px] font-medium" style={{ color: SILVER }}>
                {openTile.outcome}
              </p>
              <p className="mt-5 text-sm leading-relaxed text-zinc-400 sm:text-[15px]">
                {openTile.deepDive.intro}
              </p>

              <div className="mt-8 rounded-xl border border-white/[0.08] bg-black p-5">
                <SectorFlow sector={sector.id} labels={content.flow} />
              </div>

              <div className="mt-8 space-y-0">
                {openTile.deepDive.steps.map((s, i) => (
                  <motion.div
                    key={s.title}
                    initial={reduced ? false : { opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 + i * 0.12, ease: EASE }}
                    className="flex gap-5 border-t border-white/[0.08] py-5 last:border-b"
                  >
                    <span
                      className="font-mono text-sm"
                      style={{ color: ACCENT }}
                      aria-hidden="true"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h4 className="font-medium text-[#F5F5F7]">{s.title}</h4>
                      <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{s.body}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
