"use client";

import { motion } from "framer-motion";
import NeuralConstellation from "./NeuralConstellation";
import type { CoudersContent } from "@/i18n/couders";

export default function CoreEngine({
  content,
}: {
  content: CoudersContent["engine"];
}) {
  return (
    <section id="engine" className="relative z-10 bg-black px-6 py-28 md:py-40">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-zinc-500">
            {content.eyebrow}
          </p>
          <h2
            className="mt-4 text-balance text-3xl font-semibold tracking-[-0.03em] text-[#F5F5F7] md:text-5xl"
            style={{ fontFamily: "var(--font-display), sans-serif" }}
          >
            {content.h2}
          </h2>
          <p className="mt-6 max-w-xl text-pretty leading-relaxed text-zinc-400">
            {content.intro}
          </p>

          <div className="mt-12 space-y-0">
            {content.points.map((p, i) => (
              <motion.div
                key={p.no}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="flex gap-6 border-t border-white/[0.08] py-6 last:border-b"
              >
                <span
                  className="bg-gradient-to-b from-white via-[#C7CCD6] to-[#6E7178] bg-clip-text font-mono text-sm text-transparent"
                  aria-hidden="true"
                >
                  {p.no}
                </span>
                <div>
                  <h3 className="font-medium tracking-[-0.01em] text-[#F5F5F7]">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-zinc-400">
                    {p.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative min-h-[420px] overflow-hidden rounded-2xl border border-white/[0.08] bg-[#050506] lg:min-h-full"
        >
          <NeuralConstellation
            ariaLabel={content.canvasAria}
            className="absolute inset-0 h-full w-full"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.8) 100%)",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
