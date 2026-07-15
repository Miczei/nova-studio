"use client";

import { motion } from "framer-motion";
import type { CoudersContent } from "@/i18n/couders";

/* Minimalist white placeholder marks, 48x48. Swap for official press-kit
   assets before launch; the marquee accepts any SVG. */

function OpenAIMark() {
  return (
    <svg viewBox="0 0 48 48" className="h-8 w-8 fill-current" aria-hidden="true">
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
    <svg viewBox="0 0 48 48" className="h-8 w-8 fill-current" aria-hidden="true">
      <path d="M20.6 8h6.8L41 40h-7L20.6 8z" />
      <path d="M14.2 8h6.4L8.4 40H2L14.2 8z" opacity="0.85" />
    </svg>
  );
}

function GeminiMark() {
  return (
    <svg viewBox="0 0 48 48" className="h-8 w-8 fill-current" aria-hidden="true">
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
        stroke="currentColor"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function OpenClawMark() {
  return (
    <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
        <path d="M10 8c8 6 11 16 9 32" />
        <path d="M24 6c6 8 8 18 5 34" opacity="0.85" />
        <path d="M37 10c3 9 3 19-2 28" opacity="0.7" />
      </g>
    </svg>
  );
}

function OllamaMark() {
  return (
    <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round">
        <rect x="14" y="16" width="20" height="26" rx="9" />
        <path d="M18 15c-2-6 0-10 2-10s3 4 3 9" />
        <path d="M30 15c2-6 0-10-2-10s-3 4-3 9" />
      </g>
      <circle cx="20" cy="28" r="1.8" fill="currentColor" />
      <circle cx="28" cy="28" r="1.8" fill="currentColor" />
    </svg>
  );
}

function LangChainMark() {
  return (
    <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
        <rect x="4" y="17" width="22" height="14" rx="7" />
        <rect x="22" y="17" width="22" height="14" rx="7" />
      </g>
    </svg>
  );
}

function N8nMark() {
  return (
    <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="3.5">
        <circle cx="8" cy="30" r="4.5" />
        <circle cx="24" cy="17" r="4.5" />
        <circle cx="40" cy="30" r="4.5" />
        <path d="M12 27l8-7M28 20l8 7" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function PineconeMark() {
  return (
    <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 12l8-7 8 7" />
        <path d="M13 24l11-9 11 9" />
        <path d="M16 36l8-8 8 8" />
        <path d="M24 36v8" />
      </g>
    </svg>
  );
}

function ManusMark() {
  return (
    <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden="true">
      <path
        d="M24 5l16 9v20l-16 9-16-9V14z"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="24" r="4.5" fill="currentColor" />
    </svg>
  );
}

function CopilotMark() {
  return (
    <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
        <path d="M10 30c0-10 6-16 14-12 8 4 14-2 14 0" />
        <path d="M10 20c0 10 6 16 14 12 8-4 14 2 14 0" opacity="0.8" />
      </g>
    </svg>
  );
}

type Provider = { name: string; sub: string; Mark: () => React.JSX.Element };

const MODELS: Provider[] = [
  { name: "OpenAI", sub: "GPT · ChatGPT", Mark: OpenAIMark },
  { name: "Anthropic", sub: "Claude", Mark: AnthropicMark },
  { name: "Google", sub: "Gemini", Mark: GeminiMark },
  { name: "Meta", sub: "Llama", Mark: MetaMark },
  { name: "Manus", sub: "Autonomous AI Agents", Mark: ManusMark },
  { name: "OpenClaw", sub: "AI Models", Mark: OpenClawMark },
  { name: "Ollama", sub: "Local LLMs", Mark: OllamaMark },
];

const INFRA: Provider[] = [
  { name: "LangChain", sub: "AI Orchestration", Mark: LangChainMark },
  { name: "Copilot", sub: "AI Assistant Integration", Mark: CopilotMark },
  { name: "n8n", sub: "Workflow Automation", Mark: N8nMark },
  { name: "Pinecone", sub: "Vector Database", Mark: PineconeMark },
];

function MarqueeRow({ items }: { items: Provider[] }) {
  return (
    <div className="flex shrink-0 items-center">
      {items.map((p, i) => (
        <div
          key={`${p.name}-${i}`}
          className="group mx-8 flex items-center gap-3 opacity-40 transition-opacity duration-500 hover:opacity-100 sm:mx-12 sm:gap-4 md:mx-16"
        >
          <span className="text-[#C7CCD6] transition-[color,filter] duration-500 group-hover:text-[#C06C4C] group-hover:drop-shadow-[0_0_10px_rgba(192,108,76,0.55)]">
            <p.Mark />
          </span>
          <div>
            <span className="block text-base font-medium tracking-[-0.01em] text-[#C7CCD6] transition-colors duration-500 group-hover:text-[#C06C4C] sm:text-lg">
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

const MASK = {
  maskImage:
    "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
  WebkitMaskImage:
    "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
} as const;

function MarqueeBand({
  label,
  items,
  reverse,
}: {
  label: string;
  items: Provider[];
  reverse?: boolean;
}) {
  return (
    <div className="py-6 sm:py-8">
      <p className="mx-auto mb-5 max-w-6xl px-5 font-mono text-[9px] uppercase tracking-[0.24em] text-zinc-600 sm:mb-6 sm:px-6 sm:text-[10px] sm:tracking-[0.28em]">
        {label}
      </p>
      <div className="overflow-hidden" style={MASK}>
        <div
          className={`couders-marquee flex w-max ${
            reverse ? "couders-marquee--reverse couders-marquee--slow" : ""
          }`}
        >
          <MarqueeRow items={items} />
          <MarqueeRow items={items} />
          <MarqueeRow items={items} />
        </div>
      </div>
    </div>
  );
}

export default function LogoTicker({
  content,
}: {
  content: CoudersContent["logoTicker"];
}) {
  return (
    <section id="tech-ticker" className="relative z-10 overflow-x-hidden bg-black py-10 sm:py-14">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        role="img"
        aria-label={content.marqueeAria}
        className="divide-y divide-white/[0.08] border-y border-white/[0.08]"
      >
        <MarqueeBand label={content.rowModels} items={MODELS} />
        <MarqueeBand label={content.rowInfra} items={INFRA} reverse />
      </motion.div>
    </section>
  );
}
