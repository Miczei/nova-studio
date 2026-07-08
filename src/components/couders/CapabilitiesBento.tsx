"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

/**
 * Capabilities as a bento grid: four AI pillars on pure black with hairline
 * silver borders. Hover lifts the border and follows the cursor with a faint
 * chrome spotlight; tiles rise in with a stagger as they enter the viewport.
 */

type Tile = {
  no: string;
  eyebrow: string;
  title: string;
  body: string;
  foot?: string;
  span: string;
};

const TILES: Tile[] = [
  {
    no: "01",
    eyebrow: "Custom Enterprise Chatbots",
    title: "Conversation, engineered.",
    body: "Chatbots trained exclusively on your private knowledge, locked to your tone of voice, and deployed where your customers already talk: chat, WhatsApp, Slack, email. Every answer instant, every answer yours.",
    foot: "Grounded in your data. Fluent in every market you serve.",
    span: "md:col-span-4 md:row-span-2",
  },
  {
    no: "02",
    eyebrow: "Autonomous AI Agents",
    title: "Not assistants. Operators.",
    body: "Agents that plan multi-step work and finish it: qualifying leads, triaging tickets, drafting replies, updating records. Human approval exactly where you demand it.",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    no: "03",
    eyebrow: "Internal Knowledge Retrieval",
    title: "Your company, searchable.",
    body: "Policies, contracts, tickets and docs become one private brain. Employees ask in plain language and get cited, grounded answers in seconds.",
    span: "md:col-span-3",
  },
  {
    no: "04",
    eyebrow: "CRM & Workflow Integrations",
    title: "Plugged into everything.",
    body: "Salesforce, HubSpot, calendars, ERPs, internal tools. Our agents read and write where your work actually lives, so nothing needs copying twice.",
    span: "md:col-span-3",
  },
];

function BentoTile({ tile, index }: { tile: Tile; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.09, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0A0A0B] p-8 transition-colors duration-500 hover:border-white/[0.22] md:p-10 ${tile.span}`}
    >
      {/* Cursor spotlight, chrome tinted, only on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgba(199,204,214,0.07), transparent 65%)",
        }}
      />

      <div className="relative">
        <div className="flex items-baseline justify-between">
          <span className="font-mono text-[11px] uppercase tracking-[0.26em] text-zinc-500">
            {tile.eyebrow}
          </span>
          <span
            className="bg-gradient-to-b from-white via-[#C7CCD6] to-[#6E7178] bg-clip-text font-mono text-sm text-transparent"
            aria-hidden="true"
          >
            {tile.no}
          </span>
        </div>
        <h3
          className="mt-6 text-2xl font-semibold tracking-[-0.02em] text-[#F5F5F7] md:text-[1.7rem]"
          style={{ fontFamily: "var(--font-display), sans-serif" }}
        >
          {tile.title}
        </h3>
        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-zinc-400">
          {tile.body}
        </p>
      </div>

      {tile.foot && (
        <p className="relative mt-10 border-t border-white/[0.07] pt-5 font-mono text-xs uppercase tracking-[0.18em] text-zinc-500">
          {tile.foot}
        </p>
      )}
    </motion.div>
  );
}

export default function CapabilitiesBento() {
  return (
    <section id="capabilities" className="relative z-10 bg-black px-6 py-28 md:py-40">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-zinc-500">
          Capabilities
        </p>
        <h2
          className="mt-4 max-w-2xl text-balance text-3xl font-semibold tracking-[-0.03em] text-[#F5F5F7] md:text-5xl"
          style={{ fontFamily: "var(--font-display), sans-serif" }}
        >
          Four disciplines. One intelligent system.
        </h2>

        <div className="mt-14 grid auto-rows-[minmax(180px,auto)] grid-cols-1 gap-4 md:grid-cols-6">
          {TILES.map((t, i) => (
            <BentoTile key={t.no} tile={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
