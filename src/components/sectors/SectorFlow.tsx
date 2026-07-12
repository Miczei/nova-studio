"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Sector } from "@/i18n/sectors";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const ACCENT = "#C06C4C";
const SILVER = "#C7CCD6";

type FlowLabels = { from: string; via: string; to: string };

/* ---------------------------------------------------------------------------
   FINANCE: a hard, angular zig-zag market line (straight segments only, no
   beziers) that spikes at the outcome, with "smart money" (glowing terracotta
   packets) tracing the sharp corners through the decision nodes and a pulsing
   ring at the Business Outcome spike.
   --------------------------------------------------------------------------- */
function FinanceFlow({ labels }: { labels: FlowLabels }) {
  const reduced = useReducedMotion();

  // Straight-line vertices only. Nodes sit on: (20,104) request ·
  // (146,104) reasoning · (300,20) spike.
  const CHART =
    "M 20 104 L 48 60 L 76 110 L 104 58 L 146 104 L 178 64 " +
    "L 210 110 L 244 70 L 276 98 L 300 20";
  const AREA = `${CHART} L 300 128 L 20 128 Z`;

  const nodes = [
    { x: 20, y: 104, dy: 20, label: labels.from, anchor: "start" as const },
    { x: 146, y: 104, dy: 30, label: labels.via, anchor: "middle" as const },
    { x: 300, y: 20, dy: -14, label: labels.to, anchor: "end" as const },
  ];

  return (
    <svg viewBox="0 0 320 140" fill="none" aria-hidden="true" className="w-full">
      <defs>
        <linearGradient id="fin-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={ACCENT} stopOpacity="0.3" />
          <stop offset="1" stopColor={ACCENT} stopOpacity="0" />
        </linearGradient>
        <filter id="fin-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="3.2" />
        </filter>
      </defs>

      {/* Faint chart grid */}
      {[40, 72, 104].map((y) => (
        <line
          key={y}
          x1="12"
          y1={y}
          x2="308"
          y2={y}
          stroke={SILVER}
          strokeOpacity="0.06"
          strokeDasharray="2 6"
        />
      ))}

      {/* Area under the curve fades in behind the line */}
      <motion.path
        d={AREA}
        fill="url(#fin-area)"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
      />

      {/* Silver market line draws itself in */}
      <motion.path
        d={CHART}
        stroke={SILVER}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="miter"
        initial={reduced ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.6, ease: EASE }}
      />

      {/* Decision nodes + labels */}
      {nodes.map((n) => (
        <g key={n.label}>
          <circle cx={n.x} cy={n.y} r="4" fill="#0A0A0B" stroke={SILVER} strokeWidth="1.5" />
          <text
            x={n.x}
            y={n.y + n.dy}
            textAnchor={n.anchor}
            fill="#71717A"
            style={{ font: "500 8px ui-monospace, monospace", letterSpacing: "0.12em" }}
          >
            {n.label.toUpperCase()}
          </text>
        </g>
      ))}

      {/* Pulsing ring at the outcome spike */}
      {!reduced && (
        <motion.circle
          cx={300}
          cy={20}
          r="6"
          fill="none"
          stroke={ACCENT}
          strokeWidth="1.5"
          initial={{ scale: 0.6, opacity: 0.8 }}
          animate={{ scale: [0.6, 1.9], opacity: [0.8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
          style={{ transformOrigin: "300px 20px", transformBox: "view-box" }}
        />
      )}

      {/* Smart-money packets flowing along the market line */}
      {!reduced &&
        [0, -1.6].map((begin, i) => (
          <g key={i}>
            <circle r="5" fill={ACCENT} opacity="0.4" filter="url(#fin-glow)">
              <animateMotion dur="3.2s" repeatCount="indefinite" path={CHART} begin={`${begin}s`} />
            </circle>
            <circle r="2.5" fill={ACCENT}>
              <animateMotion dur="3.2s" repeatCount="indefinite" path={CHART} begin={`${begin}s`} />
            </circle>
          </g>
        ))}
    </svg>
  );
}

/* ---------------------------------------------------------------------------
   Generic request -> reasoning -> outcome timeline. Placeholder for the
   sectors whose bespoke visuals are not built yet (healthcare, legal,
   industrial, e-commerce).
   --------------------------------------------------------------------------- */
function GenericFlow({ labels }: { labels: FlowLabels }) {
  const reduced = useReducedMotion();
  const FLOW = "M 24 46 C 90 14 150 78 296 34";
  return (
    <svg viewBox="0 0 320 84" fill="none" aria-hidden="true" className="w-full">
      <defs>
        <filter id="flow-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>
      <path d={FLOW} stroke={SILVER} strokeOpacity="0.28" strokeWidth="1.5" />
      {[
        { x: 24, y: 46, dy: 20, label: labels.from, anchor: "start" as const },
        { x: 160, y: 46, dy: 32, label: labels.via, anchor: "middle" as const },
        { x: 296, y: 34, dy: -16, label: labels.to, anchor: "end" as const },
      ].map((n) => (
        <g key={n.label}>
          <circle cx={n.x} cy={n.y} r="4" fill="#0A0A0B" stroke={SILVER} strokeWidth="1.5" />
          <text
            x={n.x}
            y={n.y + n.dy}
            textAnchor={n.anchor}
            fill="#71717A"
            style={{ font: "500 8px ui-monospace, monospace", letterSpacing: "0.12em" }}
          >
            {n.label.toUpperCase()}
          </text>
        </g>
      ))}
      {!reduced && (
        <>
          <circle r="5" fill={ACCENT} opacity="0.45" filter="url(#flow-glow)">
            <animateMotion dur="2.6s" repeatCount="indefinite" path={FLOW} />
          </circle>
          <circle r="2.5" fill={ACCENT}>
            <animateMotion dur="2.6s" repeatCount="indefinite" path={FLOW} />
          </circle>
        </>
      )}
    </svg>
  );
}

export default function SectorFlow({
  sector,
  labels,
}: {
  sector: Sector["id"];
  labels: FlowLabels;
}) {
  if (sector === "finance") return <FinanceFlow labels={labels} />;
  return <GenericFlow labels={labels} />;
}
