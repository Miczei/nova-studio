"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useReducedMotion } from "framer-motion";
import type { CoudersContent } from "@/i18n/couders";
import type { Locale } from "@/i18n/config";
import AmbientGlow from "./AmbientGlow";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Rough, transparent assumptions behind the estimate: each automated inquiry
// reclaims ~9 minutes of agent time, and a team's ability to actually
// reclaim/redeploy that freed time scales modestly with headcount.
const SAVED_HOURS_PER_INQUIRY = 0.15;
const EFFICIENCY_BASE = 0.5;
const EFFICIENCY_PER_EMPLOYEE = 0.01;
const HOURLY_RATE = { pl: 45, en: 11 } as const;

const INQUIRIES_MIN = 500;
const INQUIRIES_MAX = 50000;
const INQUIRIES_STEP = 500;
const INQUIRIES_DEFAULT = 5000;

const TEAM_MIN = 1;
const TEAM_MAX = 50;
const TEAM_STEP = 1;
const TEAM_DEFAULT = 5;

function useAnimatedNumber(target: number, reduced: boolean) {
  const [display, setDisplay] = useState(target);
  const prev = useRef(target);

  useEffect(() => {
    if (reduced) {
      setDisplay(target);
      prev.current = target;
      return;
    }
    const controls = animate(prev.current, target, {
      duration: 0.5,
      ease: EASE,
      onUpdate: setDisplay,
    });
    prev.current = target;
    return () => controls.stop();
  }, [target, reduced]);

  return display;
}

export default function RoiEstimator({
  content,
  locale,
}: {
  content: CoudersContent["roiEstimator"];
  locale: Locale;
}) {
  const reduced = Boolean(useReducedMotion());
  const [inquiries, setInquiries] = useState(INQUIRIES_DEFAULT);
  const [teamSize, setTeamSize] = useState(TEAM_DEFAULT);

  const savedHours = Math.round(inquiries * SAVED_HOURS_PER_INQUIRY);
  const efficiency = Math.min(1, EFFICIENCY_BASE + teamSize * EFFICIENCY_PER_EMPLOYEE);
  const monthlySavings = Math.round(savedHours * HOURLY_RATE[locale] * efficiency);

  const animatedHours = useAnimatedNumber(savedHours, reduced);
  const animatedSavings = useAnimatedNumber(monthlySavings, reduced);

  const numberLocale = locale === "pl" ? "pl-PL" : "en-US";
  const savingsDisplay =
    locale === "pl"
      ? `${Math.round(animatedSavings).toLocaleString(numberLocale)} PLN`
      : `$${Math.round(animatedSavings).toLocaleString(numberLocale)}`;

  return (
    <section
      id="roi-estimator"
      className="relative z-10 overflow-hidden bg-black px-5 py-16 sm:px-6 sm:py-24 md:py-40"
    >
      <AmbientGlow
        className="-top-32 left-[8%] h-[420px] w-[420px]"
        color="rgba(192,108,76,0.16)"
      />
      <AmbientGlow
        className="bottom-0 right-[4%] h-[380px] w-[380px]"
        color="rgba(90,120,150,0.12)"
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
        <p className="mt-5 max-w-xl text-pretty text-sm leading-relaxed text-zinc-400 sm:mt-6 sm:text-base">
          {content.lead}
        </p>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative mt-10 overflow-hidden rounded-2xl border border-white/10 bg-black/50 p-6 backdrop-blur-md sm:mt-14 md:p-10"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(560px circle at 85% 0%, rgba(192,108,76,0.14), transparent 65%)",
            }}
          />

          <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
            {/* Sliders */}
            <div className="flex flex-col justify-center gap-8">
              <div>
                <label htmlFor="roi-inquiries" className="block text-sm text-zinc-300">
                  {content.slider1Label}
                </label>
                <span
                  className="mt-2 block text-2xl font-semibold tabular-nums tracking-[-0.02em] text-white"
                  style={{ fontFamily: "var(--font-display), sans-serif" }}
                >
                  {inquiries.toLocaleString(numberLocale)}
                </span>
                <input
                  id="roi-inquiries"
                  type="range"
                  min={INQUIRIES_MIN}
                  max={INQUIRIES_MAX}
                  step={INQUIRIES_STEP}
                  value={inquiries}
                  onChange={(e) => setInquiries(Number(e.target.value))}
                  className="mt-4 h-2 w-full cursor-pointer touch-none appearance-none rounded-full bg-white/10 accent-[#C06C4C]"
                />
              </div>

              <div>
                <label htmlFor="roi-team" className="block text-sm text-zinc-300">
                  {content.slider2Label}
                </label>
                <span
                  className="mt-2 block text-2xl font-semibold tabular-nums tracking-[-0.02em] text-white"
                  style={{ fontFamily: "var(--font-display), sans-serif" }}
                >
                  {teamSize.toLocaleString(numberLocale)}
                </span>
                <input
                  id="roi-team"
                  type="range"
                  min={TEAM_MIN}
                  max={TEAM_MAX}
                  step={TEAM_STEP}
                  value={teamSize}
                  onChange={(e) => setTeamSize(Number(e.target.value))}
                  className="mt-4 h-2 w-full cursor-pointer touch-none appearance-none rounded-full bg-white/10 accent-[#C06C4C]"
                />
              </div>
            </div>

            {/* Results */}
            <div className="flex flex-col justify-center gap-8 border-t border-white/[0.08] pt-8 lg:border-l lg:border-t-0 lg:pl-14 lg:pt-0">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500 sm:text-[11px] sm:tracking-[0.26em]">
                  {content.hoursLabel}
                </p>
                <span
                  className="mt-2 block bg-gradient-to-b from-white via-[#C7CCD6] to-[#6E7178] bg-clip-text text-4xl font-semibold tabular-nums tracking-[-0.03em] text-transparent sm:text-5xl"
                  style={{ fontFamily: "var(--font-display), sans-serif" }}
                >
                  {Math.round(animatedHours).toLocaleString(numberLocale)}
                </span>
              </div>

              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500 sm:text-[11px] sm:tracking-[0.26em]">
                  {content.savingsLabel}
                </p>
                <span
                  className="mt-2 block bg-gradient-to-b from-white via-[#C7CCD6] to-[#6E7178] bg-clip-text text-4xl font-semibold tabular-nums tracking-[-0.03em] text-transparent sm:text-5xl"
                  style={{ fontFamily: "var(--font-display), sans-serif" }}
                >
                  {savingsDisplay}
                </span>
              </div>

              <a
                href="#contact"
                className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-[#C06C4C] px-7 py-3.5 text-center text-[15px] font-medium text-white transition-transform duration-300 hover:-translate-y-0.5 sm:w-auto"
              >
                {content.ctaLabel}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
