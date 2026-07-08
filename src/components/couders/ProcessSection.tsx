"use client";

import { motion } from "framer-motion";
import type { CoudersContent } from "@/i18n/couders";

export default function ProcessSection({
  content,
}: {
  content: CoudersContent["process"];
}) {
  return (
    <section id="process" className="relative z-10 bg-black px-6 py-28 md:py-40">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-zinc-500">
          {content.eyebrow}
        </p>
        <h2
          className="mt-4 max-w-2xl text-balance text-3xl font-semibold tracking-[-0.03em] text-[#F5F5F7] md:text-5xl"
          style={{ fontFamily: "var(--font-display), sans-serif" }}
        >
          {content.h2}
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-4">
          {content.steps.map((s, i) => (
            <motion.div
              key={s.no}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="border-t border-white/[0.12] pt-6"
            >
              <span
                className="bg-gradient-to-b from-white via-[#C7CCD6] to-[#6E7178] bg-clip-text font-mono text-sm text-transparent"
                aria-hidden="true"
              >
                {s.no}
              </span>
              <h3
                className="mt-4 text-lg font-semibold tracking-[-0.01em] text-[#F5F5F7]"
                style={{ fontFamily: "var(--font-display), sans-serif" }}
              >
                {s.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-zinc-400">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
