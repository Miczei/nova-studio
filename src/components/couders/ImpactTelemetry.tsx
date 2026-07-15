"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import type { CoudersContent, CoudersTelemetryCard } from "@/i18n/couders";
import AmbientGlow from "./AmbientGlow";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function useCountUp(target: number, decimals: number, active: boolean, reduced: boolean) {
  const [value, setValue] = useState(reduced ? target : 0);

  useEffect(() => {
    if (!active || reduced) return;
    const controls = animate(0, target, {
      duration: 1.8,
      ease: EASE,
      onUpdate: (v) => setValue(Number(v.toFixed(decimals))),
    });
    return () => controls.stop();
  }, [active, target, decimals, reduced]);

  return value;
}

function TelemetryCard({ card, index }: { card: CoudersTelemetryCard; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();
  const count = useCountUp(card.value ?? 0, card.decimals, inView && card.value !== null, Boolean(reduced));

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const metric = card.value === null ? card.display : `${count.toFixed(card.decimals)}${card.suffix}`;

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.09, ease: EASE }}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-md transition-colors duration-500 hover:border-[#C06C4C]/60 sm:p-8 md:p-10 ${card.span}`}
    >
      {/* Card 3's always-on highlight: a soft terracotta glow, dimmer than the hover state. */}
      {card.accent && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(480px circle at 15% 0%, rgba(192,108,76,0.16), transparent 65%)",
          }}
        />
      )}

      {/* Hover glow: border already shifts via the className transition above; this
          adds the cursor-following terracotta bloom behind the card. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgba(192,108,76,0.2), transparent 65%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-6 -z-10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-60"
        style={{ background: "radial-gradient(circle at 50% 50%, rgba(192,108,76,0.35), transparent 70%)" }}
      />

      <span
        className="relative bg-gradient-to-b from-white via-[#C7CCD6] to-[#6E7178] bg-clip-text text-4xl font-semibold tracking-[-0.03em] text-transparent sm:text-5xl md:text-6xl"
        style={{ fontFamily: "var(--font-display), sans-serif" }}
      >
        {metric}
      </span>

      <div className="relative mt-8">
        <h3
          className="text-lg font-semibold tracking-[-0.01em] text-[#F5F5F7] sm:text-xl"
          style={{ fontFamily: "var(--font-display), sans-serif" }}
        >
          {card.title}
        </h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-zinc-400 sm:text-[15px]">{card.body}</p>
      </div>
    </motion.div>
  );
}

export default function ImpactTelemetry({ content }: { content: CoudersContent["telemetry"] }) {
  return (
    <section
      id="telemetry"
      className="relative z-10 overflow-hidden bg-black px-5 py-16 sm:px-6 sm:py-24 md:py-40"
    >
      <AmbientGlow
        className="-top-24 right-[10%] h-[460px] w-[460px]"
        color="rgba(192,108,76,0.14)"
      />
      <AmbientGlow
        className="bottom-[-10%] left-[4%] h-[380px] w-[380px]"
        color="rgba(90,120,150,0.1)"
      />

      <div className="relative mx-auto max-w-6xl">
        <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-zinc-500 sm:text-[11px] sm:tracking-[0.32em]">
          {content.eyebrow}
        </p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mt-4 max-w-2xl text-balance text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl md:text-5xl"
          style={{ fontFamily: "var(--font-display), sans-serif" }}
        >
          {content.h2}
        </motion.h2>

        <div className="mt-10 grid auto-rows-[minmax(160px,auto)] grid-cols-1 gap-3 sm:mt-14 sm:auto-rows-[minmax(190px,auto)] sm:gap-4 md:grid-cols-6">
          {content.cards.map((c, i) => (
            <TelemetryCard key={c.title} card={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
