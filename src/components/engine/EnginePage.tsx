"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DecodeText from "./DecodeText";
import MiniAgent from "./MiniAgent";
import HeroAgent from "./HeroAgent";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { PageContent, Pillar } from "@/i18n/pages";
import type { EngineUi } from "@/i18n/engine";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function HeroTitle({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <h1
      aria-label={text}
      className="mt-6 max-w-4xl text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.04em] text-[#F5F5F7] md:text-6xl"
      style={{ fontFamily: "var(--font-display), sans-serif" }}
    >
      {words.map((w, i) => (
        <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-1 align-top">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 + i * 0.05, ease: EASE }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

function StreamDivider() {
  return (
    <div aria-hidden="true" className="mx-auto max-w-6xl px-6">
      <svg width="100%" height="2" className="block">
        <line x1="0" y1="1" x2="100%" y2="1" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        <line
          x1="0"
          y1="1"
          x2="100%"
          y2="1"
          stroke="#C7CCD6"
          strokeWidth="1"
          strokeDasharray="14 140"
          opacity="0.45"
        >
          <animate attributeName="stroke-dashoffset" from="0" to="-154" dur="5.5s" repeatCount="indefinite" />
        </line>
      </svg>
    </div>
  );
}

function PillarTile({ pillar, span, delay }: { pillar: Pillar; span: string; delay: number }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <motion.div
      onViewportEnter={() => setTimeout(() => setRevealed(true), 250 + delay)}
      viewport={{ once: true, margin: "-70px" }}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE }}
      className={`relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0A0A0B] p-8 transition-colors duration-500 hover:border-white/[0.22] md:p-10 ${span}`}
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 p-8 md:p-10"
        animate={{ opacity: revealed ? 0 : 1 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <div className="engine-shimmer h-3 w-2/5 rounded-full" />
        <div className="engine-shimmer mt-7 h-6 w-11/12 rounded-md" />
        <div className="engine-shimmer mt-4 h-3 w-full rounded-full" />
        <div className="engine-shimmer mt-2.5 h-3 w-3/4 rounded-full" />
      </motion.div>

      <motion.div
        animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 10 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <div className="flex items-baseline justify-between">
          <span className="font-mono text-[11px] uppercase tracking-[0.26em] text-zinc-500">
            {pillar.title}
          </span>
          <span
            aria-hidden="true"
            className="bg-gradient-to-b from-white via-[#C7CCD6] to-[#6E7178] bg-clip-text font-mono text-sm text-transparent"
          >
            {String(pillar.no).padStart(2, "0")}
          </span>
        </div>
        <h3
          className="mt-6 text-xl font-semibold tracking-[-0.02em] text-[#F5F5F7] md:text-2xl"
          style={{ fontFamily: "var(--font-display), sans-serif" }}
        >
          {pillar.question}
        </h3>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-zinc-400">{pillar.body}</p>
      </motion.div>
    </motion.div>
  );
}

export default function EnginePage({
  locale,
  dict,
  page,
  ui,
}: {
  locale: Locale;
  dict: Dictionary;
  page: PageContent;
  ui: EngineUi;
}) {
  const home = `/${locale}`;
  const secondaryHref = `/${locale}/${page.related[0].slug}`;
  const spans = ["md:col-span-4", "md:col-span-2", "md:col-span-2", "md:col-span-4"];

  return (
    <div className="sub-shell couders-shell">
      <Navbar locale={locale} dict={dict} />

      <main className="relative z-10 bg-black">
        <MiniAgent statuses={ui.agentStatuses} label={ui.agentLabel} />

        <section className="px-6 pb-24 pt-40 md:pb-32 md:pt-48">
          <div className="mx-auto max-w-6xl lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-16">
            <div>
              <nav
                aria-label="Breadcrumb"
                className="mb-10 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-600"
              >
                <Link href={home} className="pointer-events-auto transition-colors hover:text-white">
                  Couders
                </Link>
                <span aria-hidden="true">/</span>
                <span className="text-zinc-400">{page.breadcrumb}</span>
              </nav>

              <DecodeText
                text={page.eyebrow}
                className="font-mono text-[11px] uppercase tracking-[0.32em] text-zinc-500"
              />
              <HeroTitle text={page.h1} />
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
                className="mt-7 max-w-2xl text-pretty leading-relaxed text-zinc-400 md:text-lg"
              >
                {page.intro}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.9, ease: EASE }}
                className="mt-10 flex flex-wrap items-center gap-3.5"
              >
                <a
                  href={`${home}#contact`}
                  className="rounded-full bg-white px-7 py-3.5 text-[15px] font-medium text-black transition-transform duration-300 hover:-translate-y-0.5"
                >
                  {page.ctaPrimary}
                </a>
                <Link
                  href={secondaryHref}
                  className="rounded-full border border-white/20 px-7 py-3.5 text-[15px] font-medium text-white transition-colors duration-300 hover:border-white/60"
                >
                  {page.ctaSecondary}
                </Link>
              </motion.div>
            </div>

            <HeroAgent className="hidden w-56 lg:block xl:w-64" />
          </div>
        </section>

        <StreamDivider />

        <section className="px-6 py-24 md:py-32">
          <div className="mx-auto max-w-6xl">
            <h2
              className="max-w-2xl text-balance text-3xl font-semibold tracking-[-0.03em] text-[#F5F5F7] md:text-5xl"
              style={{ fontFamily: "var(--font-display), sans-serif" }}
            >
              {page.fomoH2}
            </h2>
            <p className="mt-6 max-w-2xl text-pretty leading-relaxed text-zinc-400">
              {page.fomoIntro}
            </p>

            <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{ duration: 0.7, ease: EASE }}
                className="rounded-2xl border border-white/[0.06] bg-[#050506] p-8 md:p-10"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.26em] text-zinc-600">
                  {page.contrastBeginnerLabel}
                </span>
                <ul className="mt-8 space-y-5">
                  {page.contrast.map((c, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -14 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                      className="flex gap-4 text-[15px] leading-relaxed text-zinc-500"
                    >
                      <span aria-hidden="true" className="mt-0.5 text-zinc-700">
                        ×
                      </span>
                      {c.beginner}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{ duration: 0.7, delay: 0.12, ease: EASE }}
                className="relative overflow-hidden rounded-2xl border border-white/[0.18] bg-[#0A0A0B] p-8 md:p-10"
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E8EAEE] to-transparent opacity-60"
                />
                <span className="font-mono text-[11px] uppercase tracking-[0.26em] text-zinc-300">
                  {page.contrastFullstackLabel}
                </span>
                <ul className="mt-8 space-y-5">
                  {page.contrast.map((c, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: 14 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                      className="flex gap-4 text-[15px] leading-relaxed text-zinc-200"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-0.5 bg-gradient-to-b from-white to-[#6E7178] bg-clip-text text-transparent"
                      >
                        +
                      </span>
                      {c.fullstack}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        <StreamDivider />

        <section className="px-6 py-24 md:py-32">
          <div className="mx-auto max-w-6xl">
            <DecodeText
              text={ui.specIndex}
              className="font-mono text-[11px] uppercase tracking-[0.32em] text-zinc-500"
            />
            <h2
              className="mt-4 max-w-2xl text-balance text-3xl font-semibold tracking-[-0.03em] text-[#F5F5F7] md:text-5xl"
              style={{ fontFamily: "var(--font-display), sans-serif" }}
            >
              {page.pillarsH2}
            </h2>

            <div className="mt-14 grid auto-rows-[minmax(200px,auto)] grid-cols-1 gap-4 md:grid-cols-6">
              {page.pillars.map((p, i) => (
                <PillarTile key={p.no} pillar={p} span={spans[i % spans.length]} delay={i * 120} />
              ))}
            </div>
          </div>
        </section>

        <StreamDivider />

        <section className="px-6 py-28 md:py-40">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="mx-auto flex max-w-3xl flex-col items-center text-center"
          >
            <h2
              className="text-balance bg-gradient-to-b from-white via-[#E8EAEE] to-[#9BA1AB] bg-clip-text text-3xl font-semibold tracking-[-0.04em] text-transparent md:text-5xl"
              style={{ fontFamily: "var(--font-display), sans-serif" }}
            >
              {page.ctaH2}
            </h2>
            <p className="mt-6 max-w-xl text-pretty leading-relaxed text-zinc-400">{page.ctaBody}</p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3.5">
              <a
                href={`${home}#contact`}
                className="rounded-full bg-white px-8 py-4 text-[15px] font-medium text-black transition-transform duration-300 hover:-translate-y-0.5"
              >
                {page.ctaPrimary}
              </a>
              <Link
                href={secondaryHref}
                className="rounded-full border border-white/20 px-8 py-4 text-[15px] font-medium text-white transition-colors duration-300 hover:border-white/60"
              >
                {page.ctaSecondary}
              </Link>
            </div>
          </motion.div>
        </section>

        <section className="px-6 pb-32">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.32em] text-zinc-500">
              {page.relatedH2}
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
              {page.related.map((r, i) => (
                <motion.div
                  key={r.slug}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
                >
                  <Link
                    href={`/${locale}/${r.slug}`}
                    className="group flex items-center justify-between rounded-2xl border border-white/[0.08] bg-[#0A0A0B] p-7 transition-colors duration-500 hover:border-white/[0.25]"
                  >
                    <span
                      className="text-lg font-medium tracking-[-0.01em] text-[#F5F5F7]"
                      style={{ fontFamily: "var(--font-display), sans-serif" }}
                    >
                      {r.label}
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-zinc-500 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white"
                    >
                      →
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer dict={dict} locale={locale} />
    </div>
  );
}
