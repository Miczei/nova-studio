"use client";

import { motion } from "framer-motion";
import type { CoudersContent } from "@/i18n/couders";

/* Minimalist white placeholder marks, sized 48x48. Swap each <svg> for the
   official press-kit asset before launch; the marquee accepts any SVG. */

function OpenAIMark() {
  return (
    <svg viewBox="0 0 48 48" className="h-8 w-8 fill-white" aria-hidden="true">
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <rect
          key={deg}
          x="21.5"
          y="4"
          width="5"
          height="19"
          rx="2.5"
          transform={`rotate(${deg} 24 24)`}
        />
      ))}
    </svg>
  );
}

function AnthropicMark() {
  return (
    <svg viewBox="0 0 48 48" className="h-8 w-8 fill-white" aria-hidden="true">
      <path d="M20.6 8h6.8L41 40h-7L20.6 8z" />
      <path d="M14.2 8h6.4L8.4 40H2L14.2 8z" opacity="0.85" />
    </svg>
  );
}

function GeminiMark() {
  return (
    <svg viewBox="0 0 48 48" className="h-8 w-8 fill-white" aria-hidden="true">
      <path d="M24 3c1.9 11.3 9.7 19.1 21 21-11.3 1.9-19.1 9.7-21 21-1.9-11.3-9.7-19.1-21-21C14.3 22.1 22.1 14.3 24 3z" />
    </svg>
  );
}

function MetaMark() {
  return (
    <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden="true">
      <path
        d="M13 31.5c-5.5 0-5.5-15 0-15 7.5 0 8.5 15 16 15 5.5 0 5.5-15 0-15-7.5 0-8.5 15-16 15z"
        fill="none"
        stroke="white"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

const PROVIDERS = [
  { name: "OpenAI", sub: "GPT · ChatGPT", Mark: OpenAIMark },
  { name: "Anthropic", sub: "Claude", Mark: AnthropicMark },
  { name: "Google", sub: "Gemini", Mark: GeminiMark },
  { name: "Meta", sub: "Llama", Mark: MetaMark },
];

function MarqueeRow() {
  return (
    <div className="flex shrink-0 items-center">
      {PROVIDERS.map((p) => (
        <div key={p.name} className="mx-12 flex items-center gap-4 md:mx-16">
          <p.Mark />
          <div>
            <span className="block text-lg font-medium tracking-[-0.01em] text-white">
              {p.name}
            </span>
            <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
              {p.sub}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AiAgnostic({
  content,
}: {
  content: CoudersContent["agnostic"];
}) {
  return (
    <section id="stack" className="relative z-10 bg-black py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-zinc-500">
          {content.eyebrow}
        </p>
        <h2
          className="mt-4 max-w-2xl text-balance text-3xl font-semibold tracking-[-0.03em] text-[#F5F5F7] md:text-5xl"
          style={{ fontFamily: "var(--font-display), sans-serif" }}
        >
          {content.h2}
        </h2>
        <p className="mt-6 max-w-xl text-lg font-medium text-zinc-300">
          {content.lead}
        </p>

        <div className="mt-8 grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
          <p className="text-pretty text-[15px] leading-relaxed text-zinc-400">
            {content.p1}
          </p>
          <p className="text-pretty text-[15px] leading-relaxed text-zinc-400">
            {content.p2}
          </p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        role="img"
        aria-label={content.marqueeAria}
        className="mt-20 overflow-hidden border-y border-white/[0.08] py-10"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        }}
      >
        <div className="couders-marquee flex w-max">
          <MarqueeRow />
          <MarqueeRow />
          <MarqueeRow />
        </div>
      </motion.div>
    </section>
  );
}
