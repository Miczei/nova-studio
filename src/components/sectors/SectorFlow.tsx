"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Sector, SectorTile } from "@/i18n/sectors";

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
   WEALTH ASSISTANTS: a minimalist continuous-line hand lays $100 bills out on
   an invisible plane, pauses, then sweeps them back up. Silver stroke, glowing
   terracotta "$" accents. Seamless loop (start state == end state).
   --------------------------------------------------------------------------- */
const DUR = 6.6;
const T = [0, 0.14, 0.44, 0.6, 0.84, 1];

function Bill() {
  return (
    <>
      <rect x={-23} y={-12.5} width={46} height={25} rx={3} fill="#0a0a0a" stroke={SILVER} strokeWidth={1.5} />
      <rect x={-18} y={-8} width={36} height={16} rx={2} fill="none" stroke={SILVER} strokeOpacity={0.3} strokeWidth={1} />
      <circle cx={0} cy={0} r={7} fill="none" stroke={SILVER} strokeOpacity={0.45} strokeWidth={1} />
      <text
        x={0}
        y={3.6}
        textAnchor="middle"
        fill={ACCENT}
        filter="url(#wealth-glow)"
        style={{ font: '700 11px var(--font-display), sans-serif' }}
      >
        $
      </text>
      <text x={-19} y={-3.5} textAnchor="start" fill={SILVER} fillOpacity={0.5} style={{ font: '600 5px ui-monospace, monospace' }}>100</text>
      <text x={19} y={9.5} textAnchor="end" fill={SILVER} fillOpacity={0.5} style={{ font: '600 5px ui-monospace, monospace' }}>100</text>
    </>
  );
}

function WealthFlow() {
  const reduced = useReducedMotion();

  const bills = [
    { rest: { x: 236, y: 96, r: -6 }, fan: { x: 84, y: 120, r: -16 }, times: [0, 0.12, 0.4, 0.6, 0.8, 1] },
    { rest: { x: 230, y: 92, r: 0 }, fan: { x: 152, y: 106, r: -1 }, times: [0, 0.15, 0.44, 0.6, 0.83, 1] },
    { rest: { x: 224, y: 88, r: 6 }, fan: { x: 220, y: 116, r: 14 }, times: [0, 0.18, 0.48, 0.6, 0.86, 1] },
  ];

  const HAND =
    "M 318 74 L 288 78 C 262 70 236 76 230 96 C 227 108 231 116 238 116 " +
    "C 241 106 245 104 248 116 C 251 106 256 104 259 116 C 262 106 267 105 270 116 " +
    "C 279 104 288 92 288 78";

  return (
    <svg viewBox="0 0 320 176" fill="none" aria-label="A minimalist line-art hand fanning out and gathering hundred dollar bills" role="img" className="w-full">
      <defs>
        <filter id="wealth-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="1.6" />
        </filter>
        <filter id="wealth-trail" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>

      {/* Invisible plane the bills rest on, hinted with a faint terracotta line */}
      <motion.line
        x1="44"
        y1="140"
        x2="276"
        y2="140"
        stroke={ACCENT}
        strokeWidth="1"
        initial={false}
        animate={reduced ? { opacity: 0.16 } : { opacity: [0.06, 0.2, 0.06] }}
        transition={reduced ? undefined : { duration: DUR / 2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Bills */}
      {bills.map((b, i) => (
        <motion.g
          key={i}
          initial={false}
          animate={
            reduced
              ? { x: b.fan.x, y: b.fan.y, rotate: b.fan.r }
              : {
                  x: [b.rest.x, b.rest.x, b.fan.x, b.fan.x, b.rest.x, b.rest.x],
                  y: [b.rest.y, b.rest.y, b.fan.y, b.fan.y, b.rest.y, b.rest.y],
                  rotate: [b.rest.r, b.rest.r, b.fan.r, b.fan.r, b.rest.r, b.rest.r],
                  opacity: [0.9, 0.94, 1, 1, 0.94, 0.9],
                }
          }
          transition={reduced ? undefined : { duration: DUR, times: b.times, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        >
          <Bill />
        </motion.g>
      ))}

      {/* Hand — enters, lays the bills, pauses, sweeps back, exits (seamless) */}
      <motion.g
        initial={false}
        animate={reduced ? { x: -8, opacity: 1 } : { x: [70, 6, -12, -12, 52, 70], opacity: [0, 1, 1, 1, 1, 0] }}
        transition={reduced ? undefined : { duration: DUR, times: T, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d={HAND} stroke={SILVER} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        {/* faint terracotta glow at the working fingertip */}
        <circle cx="254" cy="118" r="3.5" fill={ACCENT} opacity="0.5" filter="url(#wealth-trail)" />
      </motion.g>
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
  flow,
  labels,
}: {
  sector: Sector["id"];
  flow?: SectorTile["flow"];
  labels: FlowLabels;
}) {
  if (flow === "wealth") return <WealthFlow />;
  if (sector === "finance") return <FinanceFlow labels={labels} />;
  return <GenericFlow labels={labels} />;
}
