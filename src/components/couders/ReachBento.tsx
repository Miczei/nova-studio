"use client";

import { motion } from "framer-motion";
import type { CoudersContent } from "@/i18n/couders";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function ReachBento({
  content,
}: {
  content: CoudersContent["reach"];
}) {
  return (
    <section id="reach" className="relative z-10 bg-black px-6 py-28 md:py-40">
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

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-6">
          {content.tiles.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
              className={`rounded-2xl border border-white/[0.08] bg-[#0A0A0B] p-8 transition-colors duration-500 hover:border-white/[0.22] ${t.span}`}
            >
              <h3
                className="text-xl font-semibold tracking-[-0.01em] text-[#F5F5F7]"
                style={{ fontFamily: "var(--font-display), sans-serif" }}
              >
                {t.title}
              </h3>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
                {t.sub}
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-zinc-400">{t.body}</p>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.7, delay: 0.32, ease: EASE }}
            className={`flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#0A0A0B] p-8 ${content.stat.span}`}
          >
            <span
              className="bg-gradient-to-b from-white via-[#C7CCD6] to-[#6E7178] bg-clip-text text-5xl font-semibold tracking-[-0.03em] text-transparent"
              style={{ fontFamily: "var(--font-display), sans-serif" }}
            >
              {content.stat.value}
            </span>
            <p className="mt-6 font-mono text-xs uppercase leading-relaxed tracking-[0.18em] text-zinc-500">
              {content.stat.label}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
