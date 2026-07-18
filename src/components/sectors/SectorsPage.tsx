"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectorHub from "./SectorHub";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { SectorsContent } from "@/i18n/sectors";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function SectorsPage({
  locale,
  dict,
  content,
}: {
  locale: Locale;
  dict: Dictionary;
  content: SectorsContent;
}) {
  const home = `/${locale}`;

  return (
    <div className="sub-shell couders-shell">
      <Navbar locale={locale} dict={dict} />

      <main className="relative z-10 overflow-x-hidden bg-black">
        <section className="px-5 pb-14 pt-32 sm:px-6 sm:pb-16 sm:pt-40 md:pt-48">
          <div className="mx-auto max-w-6xl">
            <nav
              aria-label="Breadcrumb"
              className="mb-8 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-600 sm:mb-10"
            >
              <Link href={home} className="transition-colors hover:text-white">
                Couders
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-zinc-400">{content.breadcrumb}</span>
            </nav>

            <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-zinc-500 sm:text-[11px] sm:tracking-[0.32em]">
              {content.eyebrow}
            </p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
              className="mt-5 max-w-3xl text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-[#F5F5F7] sm:text-5xl md:text-6xl"
              style={{ fontFamily: "var(--font-display), sans-serif" }}
            >
              {content.h1}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
              className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-zinc-400 md:text-lg"
            >
              {content.intro}
            </motion.p>
          </div>
        </section>

        <SectorHub content={content} />

        <section className="px-5 pb-28 sm:px-6 sm:pb-36">
          <div className="mx-auto flex max-w-6xl justify-center">
            <Link
              href={`${home}/contact`}
              className="rounded-full bg-white px-8 py-4 text-center text-[15px] font-medium text-black transition-transform duration-300 hover:-translate-y-0.5"
            >
              {content.cta}
            </Link>
          </div>
        </section>
      </main>

      <Footer dict={dict} locale={locale} />
    </div>
  );
}
