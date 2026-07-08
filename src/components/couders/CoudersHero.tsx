"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import FluidMorph from "./FluidMorph";
import type { CoudersContent } from "@/i18n/couders";

export default function CoudersHero({
  content,
  debugProgress,
}: {
  content: CoudersContent["hero"];
  debugProgress?: number;
}) {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 64, damping: 19 });

  const forced = debugProgress !== undefined;
  const copyOpacity = useTransform(smooth, [0.6, 0.78], [0, 1]);
  const copyY = useTransform(smooth, [0.6, 0.78], [28, 0]);
  const cueOpacity = useTransform(smooth, [0, 0.12], [1, 0]);

  return (
    <section ref={sectionRef} className="relative z-10 h-[260vh] bg-black">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden pt-16">
        <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.32em] text-zinc-500">
          {content.eyebrow}
        </p>

        <FluidMorph
          scrollTargetRef={sectionRef}
          debugProgress={debugProgress}
          ariaLabel={content.morphAria}
          className="w-[min(94vw,1160px)]"
        />

        <motion.div
          style={forced ? undefined : { opacity: copyOpacity, y: copyY }}
          className="flex max-w-2xl flex-col items-center px-6 text-center"
        >
          <h1
            className="text-balance text-3xl font-semibold tracking-[-0.04em] text-[#F5F5F7] md:text-5xl"
            style={{ fontFamily: "var(--font-display), sans-serif" }}
          >
            {content.h1}
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-zinc-400 antialiased md:text-lg">
            {content.sub}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
            <a
              href="#contact"
              className="rounded-full bg-white px-7 py-3.5 text-[15px] font-medium text-black transition-transform duration-300 hover:-translate-y-0.5"
            >
              {content.ctaPrimary}
            </a>
            <a
              href="#engine"
              className="rounded-full border border-white/20 px-7 py-3.5 text-[15px] font-medium text-white transition-colors duration-300 hover:border-white/60"
            >
              {content.ctaSecondary}
            </a>
          </div>
        </motion.div>

        <motion.div
          style={forced ? undefined : { opacity: cueOpacity }}
          className="absolute bottom-8 flex flex-col items-center gap-2.5 text-zinc-600"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.28em]">
            {content.scroll}
          </span>
          <span className="relative block h-9 w-px overflow-hidden bg-white/15">
            <motion.span
              className="absolute left-0 top-0 h-3 w-px bg-white/70"
              animate={{ y: [-12, 36] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
        </motion.div>
      </div>
    </section>
  );
}
