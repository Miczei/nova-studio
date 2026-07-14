"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import type { CoudersContent } from "@/i18n/couders";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function useCountUp(target: number, active: boolean, reduced: boolean) {
  const [value, setValue] = useState(reduced ? target : 0);

  useEffect(() => {
    if (!active || reduced) return;
    const controls = animate(0, target, {
      duration: 1.6,
      ease: EASE,
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [active, target, reduced]);

  return value;
}

function StatCard({
  stat,
  index,
}: {
  stat: CoudersContent["commitments"]["stats"][number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();
  const count = useCountUp(stat.value, inView, Boolean(reduced));

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: EASE }}
      className={`flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#0A0A0B] p-6 transition-colors duration-500 hover:border-white/[0.22] sm:p-8 ${stat.span}`}
    >
      <span
        className="bg-gradient-to-b from-white via-[#C7CCD6] to-[#6E7178] bg-clip-text text-4xl font-semibold tracking-[-0.03em] text-transparent sm:text-5xl"
        style={{ fontFamily: "var(--font-display), sans-serif" }}
        aria-hidden="true"
      >
        {count}
        {stat.suffix}
      </span>
      <span className="sr-only">
        {stat.value}
        {stat.suffix} - {stat.label}
      </span>
      <div className="mt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500 sm:text-[11px] sm:tracking-[0.26em]">
          {stat.label}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-[15px]">{stat.body}</p>
      </div>
    </motion.div>
  );
}

export default function Commitments({
  content,
}: {
  content: CoudersContent["commitments"];
}) {
  return (
    <section id="commitments" className="relative z-10 bg-black px-5 py-16 sm:px-6 sm:py-24 md:py-40">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-zinc-500 sm:text-[11px] sm:tracking-[0.32em]">
          {content.eyebrow}
        </p>
        <h2
          className="mt-4 max-w-2xl text-balance text-2xl font-semibold tracking-[-0.03em] text-[#F5F5F7] sm:text-3xl md:text-5xl"
          style={{ fontFamily: "var(--font-display), sans-serif" }}
        >
          {content.h2}
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-3 sm:mt-14 sm:gap-4 md:grid-cols-6">
          {content.stats.map((s, i) => (
            <StatCard key={s.label} stat={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
