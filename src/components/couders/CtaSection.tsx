"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { CoudersContent } from "@/i18n/couders";
import type { Locale } from "@/i18n/config";

export default function CtaSection({
  content,
  email,
  locale,
}: {
  content: CoudersContent["cta"];
  email: string;
  locale: Locale;
}) {
  return (
    <section id="contact" className="relative z-10 bg-black px-5 py-24 sm:px-6 sm:py-32 md:py-48">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto flex max-w-3xl flex-col items-center text-center"
      >
        <h2
          className="text-balance bg-gradient-to-b from-white via-[#E8EAEE] to-[#9BA1AB] bg-clip-text text-3xl font-semibold tracking-[-0.04em] text-transparent sm:text-4xl md:text-6xl"
          style={{ fontFamily: "var(--font-display), sans-serif" }}
        >
          {content.h2}
        </h2>
        <p className="mt-5 max-w-xl text-pretty text-sm leading-relaxed text-zinc-400 sm:mt-6 sm:text-base">
          {content.body}
        </p>
        <Link
          href={`/${locale}/contact`}
          className="mt-8 w-full max-w-xs rounded-full bg-white px-9 py-4 text-center text-[15px] font-medium text-black transition-transform duration-300 hover:-translate-y-0.5 sm:mt-10 sm:w-auto sm:max-w-none"
        >
          {content.button}
        </Link>
        <p className="mt-6 px-4 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-600 sm:text-[11px] sm:tracking-[0.22em]">
          {content.emailLabel}:{" "}
          <a href={`mailto:${email}`} className="text-zinc-400 hover:text-white">
            {email}
          </a>
        </p>
      </motion.div>
    </section>
  );
}
