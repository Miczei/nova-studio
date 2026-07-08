"use client";

import { motion } from "framer-motion";
import type { CoudersContent } from "@/i18n/couders";

export default function CtaSection({
  content,
  email,
}: {
  content: CoudersContent["cta"];
  email: string;
}) {
  return (
    <section id="contact" className="relative z-10 bg-black px-6 py-32 md:py-48">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto flex max-w-3xl flex-col items-center text-center"
      >
        <h2
          className="text-balance bg-gradient-to-b from-white via-[#E8EAEE] to-[#9BA1AB] bg-clip-text text-4xl font-semibold tracking-[-0.04em] text-transparent md:text-6xl"
          style={{ fontFamily: "var(--font-display), sans-serif" }}
        >
          {content.h2}
        </h2>
        <p className="mt-6 max-w-xl text-pretty leading-relaxed text-zinc-400">
          {content.body}
        </p>
        <a
          href={`mailto:${email}`}
          className="mt-10 rounded-full bg-white px-9 py-4 text-[15px] font-medium text-black transition-transform duration-300 hover:-translate-y-0.5"
        >
          {content.button}
        </a>
        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-600">
          {content.emailLabel}:{" "}
          <a href={`mailto:${email}`} className="text-zinc-400 hover:text-white">
            {email}
          </a>
        </p>
      </motion.div>
    </section>
  );
}
