"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import FluidMorph from "./FluidMorph";
import HeroChat from "./HeroChat";
import type { CoudersContent } from "@/i18n/couders";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
// The subtitle/chat entrance is bound to FluidMorph's actual onComplete event
// (not a hardcoded mount-relative timer) so it can never drift out of sync
// with however long the logo animation ends up taking. ENTRY_DELAY is only
// the tiny gap *after* that real event, kept deliberately near-zero for a
// seamless, overlapping hand-off.
const ENTRY_DELAY = 0.12;

export default function CoudersHero({
  content,
  debugProgress,
}: {
  content: CoudersContent["hero"];
  debugProgress?: number;
}) {
  const reduced = useReducedMotion();
  const still = debugProgress !== undefined || !!reduced;
  const [logoDone, setLogoDone] = useState(still);

  return (
    <section className="relative z-10 bg-black">
      <div className="flex min-h-screen flex-col items-center overflow-hidden px-0 pb-16 pt-12 sm:pt-16">
        <motion.p
          initial={still ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mb-1 px-6 text-center font-mono text-[10px] uppercase tracking-[0.26em] text-zinc-500 sm:text-[11px] sm:tracking-[0.32em]"
        >
          {content.eyebrow}
        </motion.p>

        <FluidMorph
          debugProgress={debugProgress}
          ariaLabel={content.morphAria}
          className="w-[min(72vw,620px)]"
          onComplete={() => setLogoDone(true)}
        />

        <motion.h1
          initial={still ? false : { opacity: 0, y: 20 }}
          animate={logoDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: logoDone ? ENTRY_DELAY : 0, ease: EASE }}
          className="mt-1 max-w-xl text-balance px-6 text-center text-xl font-semibold tracking-[-0.03em] text-[#F5F5F7] sm:max-w-2xl sm:text-2xl lg:w-max lg:max-w-none lg:whitespace-nowrap lg:text-3xl"
          style={{ fontFamily: "var(--font-display), sans-serif" }}
        >
          {content.h1}
        </motion.h1>

        <div className="w-full max-w-4xl px-6">
          <HeroChat ready={logoDone} />
        </div>

        <motion.div
          initial={still ? false : { opacity: 0 }}
          animate={{ opacity: logoDone ? 1 : 0 }}
          transition={{ duration: 0.8, delay: logoDone ? 1 : 0 }}
          className="mt-auto flex flex-col items-center gap-2.5 pt-10 text-zinc-600"
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
