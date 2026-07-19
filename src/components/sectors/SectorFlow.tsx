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
   WEALTH ASSISTANTS: an infinite, slow-motion "money rain". Minimalist silver
   $100 bills drift down the container with a gentle sway and rotation, like
   falling leaves. Terracotta-glowing "100". Staggered so the flow is seamless.
   --------------------------------------------------------------------------- */

/* One minimalist bill, centered at (0,0): silver outline + glowing "MONEY". */
function RainBill({ w = 66, h = 26 }: { w?: number; h?: number }) {
  const textStyle = { font: "700 9px var(--font-display), sans-serif", letterSpacing: "0.1em" } as const;
  return (
    <g>
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={3} fill="none" stroke={SILVER} strokeWidth={1.5} />
      <rect x={-w / 2 + 4} y={-h / 2 + 4} width={w - 8} height={h - 8} rx={2} fill="none" stroke={SILVER} strokeOpacity={0.25} strokeWidth={1} />
      {/* soft terracotta glow behind the word */}
      <text x={0} y={3.4} textAnchor="middle" fill={ACCENT} filter="url(#rain-glow)" opacity={0.7} style={textStyle}>
        MONEY
      </text>
      {/* crisp legible word on top */}
      <text x={0} y={3.4} textAnchor="middle" fill="#E7A98C" style={textStyle}>
        MONEY
      </text>
    </g>
  );
}

const RAIN_W = 320;
/* Fixed, compact animation band height (px) so bills reliably fall the full
   visible height regardless of container width, and the modal stays punchy. */
const RAIN_H = 132;

/* Deterministic per-bill drift so the SSR and client markup match. */
const RAIN_BILLS = [
  { left: 30, dur: 5.2, delay: 0, sway: 12, rot: 8, scale: 1 },
  { left: 96, dur: 6.4, delay: 0.9, sway: -16, rot: -10, scale: 0.86 },
  { left: 152, dur: 4.6, delay: 0.4, sway: 12, rot: 9, scale: 1.02 },
  { left: 208, dur: 6.0, delay: 1.6, sway: -13, rot: -8, scale: 0.92 },
  { left: 256, dur: 5.6, delay: 0.6, sway: 15, rot: 11, scale: 0.8 },
  { left: 128, dur: 5.0, delay: 2.3, sway: -11, rot: -9, scale: 0.94 },
  { left: 282, dur: 6.8, delay: 1.2, sway: 11, rot: 7, scale: 0.88 },
];

function WealthFlow() {
  const reduced = useReducedMotion();

  return (
    <div
      role="img"
      aria-label="A continuous rain of minimalist money notes"
      className="relative w-full overflow-hidden rounded-lg"
      style={{ height: `${RAIN_H}px` }}
    >
      {/* Shared filter defs (referenced document-wide by the falling bills). */}
      <svg className="absolute h-0 w-0" aria-hidden="true">
        <defs>
          <filter id="rain-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="1.4" />
          </filter>
        </defs>
      </svg>

      {reduced &&
        RAIN_BILLS.slice(0, 3).map((b, i) => (
          <svg
            key={i}
            viewBox="0 0 100 44"
            className="absolute"
            style={{ left: `${(b.left / RAIN_W) * 100}%`, width: "96px", top: `${16 + i * 40}px` }}
            aria-hidden="true"
          >
            <g transform={`translate(50 22) rotate(${b.rot / 2}) scale(${b.scale})`}>
              <RainBill />
            </g>
          </svg>
        ))}

      {!reduced &&
        RAIN_BILLS.map((b, i) => (
          <motion.svg
            key={i}
            viewBox="0 0 100 44"
            className="absolute"
            style={{ left: `${(b.left / RAIN_W) * 100}%`, width: "96px", top: 0 }}
            aria-hidden="true"
            initial={{ y: "-44px", x: 0, rotate: 0, opacity: 0 }}
            animate={{
              y: ["-44px", `${RAIN_H + 44}px`],
              x: [0, b.sway, -b.sway, 0],
              rotate: [0, b.rot, -b.rot, 0],
              opacity: [0, 0.92, 0.92, 0],
            }}
            transition={{
              duration: b.dur,
              delay: b.delay,
              repeat: Infinity,
              ease: "linear",
              times: [0, 0.12, 0.88, 1],
              x: { duration: b.dur, delay: b.delay, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: b.dur, delay: b.delay, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <g transform={`translate(50 22) scale(${b.scale})`}>
              <RainBill />
            </g>
          </motion.svg>
        ))}
    </div>
  );
}

/* ---------------------------------------------------------------------------
   FRAUD NEUTRALIZATION: a rail of silver transaction cards streaming through
   a hexagonal scanner gate. Legit cards pass clean; one terracotta card gets
   caught mid-gate, ringed, crossed out and dissolved. Language-neutral (no
   text), so it serves both locales.
   --------------------------------------------------------------------------- */
function TxCard({ color }: { color: string }) {
  return (
    <g>
      <rect x={-11} y={-7} width={22} height={14} rx={2.5} fill="#0A0A0B" stroke={color} strokeWidth={1.5} />
      <line x1={-6} y1={-2} x2={6} y2={-2} stroke={color} strokeOpacity={0.7} strokeWidth={1} />
      <line x1={-6} y1={2.5} x2={2} y2={2.5} stroke={color} strokeOpacity={0.35} strokeWidth={1} />
    </g>
  );
}

function FraudFlow() {
  const reduced = useReducedMotion();
  const LANE_Y = 74;
  const GATE_X = 170;
  const DUR = 5.6;
  // Hexagonal shield centered on the gate.
  const HEX = "M 170 54 L 187.3 64 L 187.3 84 L 170 94 L 152.7 84 L 152.7 64 Z";

  if (reduced) {
    return (
      <svg viewBox="0 0 320 140" fill="none" aria-hidden="true" className="w-full">
        <line x1="8" y1={LANE_Y} x2="312" y2={LANE_Y} stroke={SILVER} strokeOpacity="0.12" strokeDasharray="2 6" />
        <path d={HEX} stroke={SILVER} strokeOpacity="0.5" strokeWidth="1.5" />
        <g transform={`translate(60 ${LANE_Y})`}>
          <TxCard color={SILVER} />
        </g>
        <g transform={`translate(268 ${LANE_Y})`}>
          <TxCard color={SILVER} />
        </g>
        <g transform={`translate(${GATE_X} ${LANE_Y})`}>
          <TxCard color={ACCENT} />
        </g>
        <circle cx={GATE_X} cy={LANE_Y} r="15" stroke={ACCENT} strokeOpacity="0.6" strokeWidth="1.5" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 320 140" fill="none" aria-hidden="true" className="w-full">
      <defs>
        <filter id="fraud-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="2.6" />
        </filter>
      </defs>

      {/* Transaction rail */}
      <line x1="8" y1={LANE_Y} x2="312" y2={LANE_Y} stroke={SILVER} strokeOpacity="0.12" strokeDasharray="2 6" />

      {/* Scanner gate: hexagonal shield + breathing scan beam */}
      <path d={HEX} stroke={SILVER} strokeOpacity="0.45" strokeWidth="1.5" />
      <motion.line
        x1={GATE_X}
        y1="34"
        x2={GATE_X}
        y2="114"
        stroke={ACCENT}
        strokeWidth="1"
        animate={{ opacity: [0.06, 0.4, 0.06] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Legit transactions glide through the gate untouched. The lane offset
          lives on a static wrapper <g>: framer writes its own transform on the
          motion element, which would clobber a translate set there. */}
      {[0, 1.4, 2.8].map((delay) => (
        <g key={delay} transform={`translate(0 ${LANE_Y})`}>
          <motion.g
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: [-30, 350], opacity: [0, 0.85, 0.85, 0] }}
            transition={{
              duration: 4.2,
              delay,
              repeat: Infinity,
              ease: "linear",
              opacity: { duration: 4.2, delay, repeat: Infinity, times: [0, 0.1, 0.9, 1] },
            }}
          >
            <TxCard color={SILVER} />
          </motion.g>
        </g>
      ))}

      {/* The fraudulent one: arrives, gets caught mid-gate, dissolves */}
      <g transform={`translate(0 ${LANE_Y})`}>
        <motion.g
          initial={{ x: -30, opacity: 0, scale: 1 }}
          animate={{
            x: [-30, GATE_X, GATE_X, GATE_X, GATE_X],
            opacity: [0, 1, 1, 0, 0],
            scale: [1, 1, 1, 0.4, 0.4],
          }}
          transition={{ duration: DUR, times: [0, 0.4, 0.6, 0.7, 1], repeat: Infinity, ease: "linear" }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        >
          <TxCard color={ACCENT} />
        </motion.g>
      </g>

      {/* Neutralization: expanding ring + cross flash at the catch moment */}
      <motion.circle
        cx={GATE_X}
        cy={LANE_Y}
        r="9"
        stroke={ACCENT}
        strokeWidth="1.5"
        fill="none"
        filter="url(#fraud-glow)"
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: [0.4, 0.4, 0.6, 2.2, 2.2], opacity: [0, 0, 0.85, 0, 0] }}
        transition={{ duration: DUR, times: [0, 0.42, 0.5, 0.72, 1], repeat: Infinity, ease: "easeOut" }}
        style={{ transformBox: "view-box", transformOrigin: `${GATE_X}px ${LANE_Y}px` }}
      />
      <motion.g
        stroke={ACCENT}
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 0.9, 0.9, 0, 0] }}
        transition={{ duration: DUR, times: [0, 0.46, 0.52, 0.64, 0.72, 1], repeat: Infinity }}
      >
        <line x1={GATE_X - 5} y1={LANE_Y - 5} x2={GATE_X + 5} y2={LANE_Y + 5} />
        <line x1={GATE_X + 5} y1={LANE_Y - 5} x2={GATE_X - 5} y2={LANE_Y + 5} />
      </motion.g>
    </svg>
  );
}

/* ---------------------------------------------------------------------------
   PERSONAL SHOPPERS: a terracotta agent dot browses a shelf grid of product
   tiles, picks three (tiles flash, items arc into a line-drawn cart), then
   the cart pulses. Collection mechanic, distinct from the fraud interception
   and the inventory forecast.
   --------------------------------------------------------------------------- */
function ShopperFlow() {
  const reduced = useReducedMotion();
  const DUR = 8;
  const TILE_W = 32;
  const TILE_H = 24;
  const COLS = [20, 64, 108, 152];
  const ROWS = [26, 62];
  const CART = { x: 274, y: 100 };
  // Tiles the agent buys from, with the moment (0..1 of the cycle) it happens.
  const PICKS = [
    { cx: 124, cy: 38, t: 0.26 },
    { cx: 80, cy: 74, t: 0.42 },
    { cx: 168, cy: 74, t: 0.58 },
  ];

  const cart = (
    <g stroke={SILVER} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round">
      <path d="M 246 86 L 253 90 L 258 112 L 290 112 L 296 91" fill="none" />
      <circle cx="263" cy="118" r="3" fill="#0A0A0B" />
      <circle cx="285" cy="118" r="3" fill="#0A0A0B" />
    </g>
  );

  const grid = ROWS.map((y) =>
    COLS.map((x) => (
      <rect
        key={`${x}-${y}`}
        x={x}
        y={y}
        width={TILE_W}
        height={TILE_H}
        rx="4"
        stroke={SILVER}
        strokeOpacity="0.3"
        strokeWidth="1"
      />
    ))
  );

  if (reduced) {
    return (
      <svg viewBox="0 0 320 140" fill="none" aria-hidden="true" className="w-full">
        {grid}
        {PICKS.slice(0, 2).map((p) => (
          <rect
            key={p.t}
            x={p.cx - TILE_W / 2}
            y={p.cy - TILE_H / 2}
            width={TILE_W}
            height={TILE_H}
            rx="4"
            stroke={ACCENT}
            strokeOpacity="0.8"
            strokeWidth="1.5"
          />
        ))}
        {cart}
        <rect x="270" y="98" width="6" height="6" rx="1" fill={ACCENT} opacity="0.9" />
        <circle cx={CART.x} cy={CART.y - 14} r="3" fill={ACCENT} />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 320 140" fill="none" aria-hidden="true" className="w-full">
      <defs>
        <filter id="shop-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="2.4" />
        </filter>
      </defs>

      {grid}

      {/* Pick flashes on the tiles the agent buys from */}
      {PICKS.map((p) => (
        <motion.rect
          key={`flash-${p.t}`}
          x={p.cx - TILE_W / 2}
          y={p.cy - TILE_H / 2}
          width={TILE_W}
          height={TILE_H}
          rx="4"
          stroke={ACCENT}
          strokeWidth="1.5"
          fill="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0, 0.95, 0.95, 0, 0] }}
          transition={{
            duration: DUR,
            times: [0, p.t - 0.02, p.t, p.t + 0.05, p.t + 0.11, 1],
            repeat: Infinity,
          }}
        />
      ))}

      {/* Bought items arc from their tile into the cart */}
      {PICKS.map((p) => (
        <motion.rect
          key={`item-${p.t}`}
          width="6"
          height="6"
          rx="1"
          fill={ACCENT}
          initial={{ x: p.cx - 3, y: p.cy - 3, opacity: 0 }}
          animate={{
            x: [p.cx - 3, p.cx - 3, (p.cx + CART.x) / 2, CART.x - 3, CART.x - 3],
            y: [p.cy - 3, p.cy - 3, Math.min(p.cy, CART.y) - 26, CART.y - 6, CART.y - 6],
            opacity: [0, 0, 1, 0.9, 0],
          }}
          transition={{
            duration: DUR,
            times: [0, p.t + 0.01, p.t + 0.07, p.t + 0.13, p.t + 0.15],
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Cart + end-of-run pulse once the third item lands */}
      <motion.g
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1, 1.08, 1, 1] }}
        transition={{ duration: DUR, times: [0, 0.74, 0.79, 0.85, 1], repeat: Infinity }}
        style={{ transformBox: "view-box", transformOrigin: `${CART.x}px 104px` }}
      >
        {cart}
      </motion.g>

      {/* The agent: a glowing terracotta dot browsing the shelves */}
      <motion.g
        initial={{ x: -12, y: 110 }}
        animate={{
          x: [-12, 36, 124, 80, 168, CART.x, CART.x, 336],
          y: [110, 38, 38, 74, 74, CART.y, CART.y, 112],
        }}
        transition={{
          duration: DUR,
          times: [0, 0.12, 0.26, 0.42, 0.58, 0.75, 0.88, 1],
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <circle r="5.5" fill={ACCENT} opacity="0.4" filter="url(#shop-glow)" />
        <circle r="2.8" fill={ACCENT} />
      </motion.g>
    </svg>
  );
}

/* ---------------------------------------------------------------------------
   INVENTORY PREDICTION: a stock bar chart split by a "now" divider. Solid
   silver bars to the left, dashed forecast bars to the right under a
   terracotta prediction line with a confidence band. The bar nearest "now"
   drains and a terracotta replenishment packet drops in just in time.
   Time-series mechanic, distinct from the other two.
   --------------------------------------------------------------------------- */
function InventoryFlow() {
  const reduced = useReducedMotion();
  const BASE = 116;
  const BAR_W = 18;
  const DUR = 6.4;
  const NOW_X = 166;
  const actual = [
    { x: 24, h: 40 },
    { x: 52, h: 56 },
    { x: 80, h: 32 },
    { x: 108, h: 62 },
  ];
  const RISK = { x: 136, h: 46 }; // the bar that drains and refills
  const predicted = [
    { x: 182, h: 52 },
    { x: 210, h: 36 },
    { x: 238, h: 60 },
    { x: 266, h: 44 },
  ];
  // Forecast polyline over the bar tops, actual into predicted.
  const CURVE =
    "M 33 76 L 61 60 L 89 84 L 117 54 L 145 70 " +
    "L 191 64 L 219 80 L 247 56 L 275 72 L 296 66";
  const BAND =
    "M 191 54 L 219 70 L 247 46 L 275 62 L 296 56 " +
    "L 296 76 L 275 82 L 247 66 L 219 90 L 191 74 Z";

  const axis = (
    <>
      <line x1="16" y1={BASE} x2="304" y2={BASE} stroke={SILVER} strokeOpacity="0.18" />
      <line
        x1={NOW_X}
        y1="24"
        x2={NOW_X}
        y2={BASE + 6}
        stroke={SILVER}
        strokeOpacity="0.3"
        strokeDasharray="3 5"
      />
      <path d={`M ${NOW_X - 4} 18 L ${NOW_X + 4} 18 L ${NOW_X} 24 Z`} fill={SILVER} fillOpacity="0.5" />
    </>
  );

  const predictedBars = predicted.map((b, i) =>
    reduced ? (
      <rect
        key={b.x}
        x={b.x}
        y={BASE - b.h}
        width={BAR_W}
        height={b.h}
        rx="2"
        stroke={SILVER}
        strokeOpacity="0.45"
        strokeWidth="1"
        strokeDasharray="3 4"
      />
    ) : (
      <motion.rect
        key={b.x}
        x={b.x}
        y={BASE - b.h}
        width={BAR_W}
        height={b.h}
        rx="2"
        stroke={SILVER}
        strokeWidth="1"
        strokeDasharray="3 4"
        fill="none"
        animate={{ strokeOpacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, delay: i * 0.4, repeat: Infinity, ease: "easeInOut" }}
      />
    )
  );

  if (reduced) {
    return (
      <svg viewBox="0 0 320 140" fill="none" aria-hidden="true" className="w-full">
        {axis}
        {[...actual, RISK].map((b) => (
          <rect
            key={b.x}
            x={b.x}
            y={BASE - b.h}
            width={BAR_W}
            height={b.h}
            rx="2"
            fill={SILVER}
            fillOpacity="0.12"
            stroke={SILVER}
            strokeOpacity="0.5"
            strokeWidth="1"
          />
        ))}
        {predictedBars}
        <path d={BAND} fill={ACCENT} fillOpacity="0.07" />
        <path d={CURVE} stroke={ACCENT} strokeOpacity="0.8" strokeWidth="1.5" strokeDasharray="4 4" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 320 140" fill="none" aria-hidden="true" className="w-full">
      {axis}

      {/* Actual stock: solid bars grow in once */}
      {actual.map((b, i) => (
        <motion.rect
          key={b.x}
          x={b.x}
          y={BASE - b.h}
          width={BAR_W}
          height={b.h}
          rx="2"
          fill={SILVER}
          fillOpacity="0.12"
          stroke={SILVER}
          strokeOpacity="0.5"
          strokeWidth="1"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
          style={{ transformBox: "view-box", transformOrigin: `${b.x + BAR_W / 2}px ${BASE}px` }}
        />
      ))}

      {/* The at-risk bar drains, then refills the moment the packet lands */}
      <motion.rect
        x={RISK.x}
        y={BASE - RISK.h}
        width={BAR_W}
        height={RISK.h}
        rx="2"
        fill={SILVER}
        fillOpacity="0.12"
        stroke={SILVER}
        strokeOpacity="0.5"
        strokeWidth="1"
        animate={{ scaleY: [1, 0.26, 0.26, 1, 1] }}
        transition={{ duration: DUR, times: [0, 0.38, 0.52, 0.62, 1], repeat: Infinity, ease: "easeInOut" }}
        style={{ transformBox: "view-box", transformOrigin: `${RISK.x + BAR_W / 2}px ${BASE}px` }}
      />

      {/* Replenishment packet drops in just before stockout */}
      <motion.rect
        x={RISK.x + 3}
        width="12"
        height="7"
        rx="1.5"
        fill={ACCENT}
        initial={{ y: -14, opacity: 0 }}
        animate={{
          y: [-14, -14, -14, BASE - RISK.h - 12, BASE - RISK.h - 8, BASE - RISK.h - 8],
          opacity: [0, 0, 0.95, 0.95, 0, 0],
        }}
        transition={{ duration: DUR, times: [0, 0.4, 0.46, 0.56, 0.62, 1], repeat: Infinity, ease: "easeIn" }}
      />

      {/* Predicted stock: dashed bars breathing beyond the "now" line */}
      {predictedBars}

      {/* Confidence band + forecast line sweeping across */}
      <motion.path
        d={BAND}
        fill={ACCENT}
        initial={{ fillOpacity: 0 }}
        animate={{ fillOpacity: [0, 0.08, 0.08, 0] }}
        transition={{ duration: 5, times: [0, 0.3, 0.8, 1], repeat: Infinity, repeatDelay: 0.4 }}
      />
      <motion.path
        d={CURVE}
        stroke={ACCENT}
        strokeWidth="1.5"
        strokeDasharray="4 4"
        initial={{ pathLength: 0, opacity: 0.9 }}
        animate={{ pathLength: [0, 1, 1], opacity: [0.9, 0.9, 0] }}
        transition={{ duration: 5, times: [0, 0.6, 1], repeat: Infinity, repeatDelay: 0.4, ease: "easeInOut" }}
      />
    </svg>
  );
}

/* ---------------------------------------------------------------------------
   TRIAGE BOTS: patient dots stream into a diamond triage node and get routed
   onto three priority lanes. The urgent case turns terracotta at the node and
   takes the fast lane to a pulsing endpoint. Routing/classification mechanic,
   unlike the single-lane fraud interception.
   --------------------------------------------------------------------------- */
function TriageFlow() {
  const reduced = useReducedMotion();
  const DUR = 5.4;
  const NODE = { x: 120, y: 70 };
  // Lane endpoints: urgent (top), standard (middle), self-care (bottom).
  const LANES = [
    { x: 296, y: 30 },
    { x: 296, y: 70 },
    { x: 296, y: 110 },
  ];
  const DIAMOND = `M ${NODE.x} 54 L ${NODE.x + 16} 70 L ${NODE.x} 86 L ${NODE.x - 16} 70 Z`;

  if (reduced) {
    return (
      <svg viewBox="0 0 320 140" fill="none" aria-hidden="true" className="w-full">
        <line x1="8" y1={NODE.y} x2={NODE.x - 16} y2={NODE.y} stroke={SILVER} strokeOpacity="0.15" strokeDasharray="2 6" />
        <path d={DIAMOND} stroke={SILVER} strokeOpacity="0.5" strokeWidth="1.5" />
        {LANES.map((l) => (
          <g key={l.y}>
            <line x1={NODE.x + 16} y1={NODE.y} x2={l.x} y2={l.y} stroke={SILVER} strokeOpacity="0.18" strokeWidth="1" />
            <circle cx={l.x} cy={l.y} r="3.5" fill="#0A0A0B" stroke={SILVER} strokeWidth="1.5" />
          </g>
        ))}
        <circle cx={LANES[0].x} cy={LANES[0].y} r="8" stroke={ACCENT} strokeOpacity="0.7" strokeWidth="1.5" />
        <circle cx="200" cy="50" r="3" fill={ACCENT} />
        <circle cx="220" cy="70" r="3" fill={SILVER} />
      </svg>
    );
  }

  // Each dot repeats its own route; staggered so one reaches the node every
  // 1.8s, which the diamond's score-pulse mirrors.
  const dots = [
    { lane: 0, delay: 0, urgent: true },
    { lane: 1, delay: 1.8, urgent: false },
    { lane: 2, delay: 3.6, urgent: false },
  ];

  return (
    <svg viewBox="0 0 320 140" fill="none" aria-hidden="true" className="w-full">
      <defs>
        <filter id="triage-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="2.4" />
        </filter>
      </defs>

      {/* Intake rail + triage node */}
      <line x1="8" y1={NODE.y} x2={NODE.x - 16} y2={NODE.y} stroke={SILVER} strokeOpacity="0.15" strokeDasharray="2 6" />
      <motion.path
        d={DIAMOND}
        stroke={SILVER}
        strokeWidth="1.5"
        animate={{ strokeOpacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 1.8, delay: 1.9, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Priority lanes */}
      {LANES.map((l) => (
        <g key={l.y}>
          <line x1={NODE.x + 16} y1={NODE.y} x2={l.x} y2={l.y} stroke={SILVER} strokeOpacity="0.18" strokeWidth="1" />
          <circle cx={l.x} cy={l.y} r="3.5" fill="#0A0A0B" stroke={SILVER} strokeWidth="1.5" />
        </g>
      ))}

      {/* Urgent endpoint pulses terracotta */}
      <motion.circle
        cx={LANES[0].x}
        cy={LANES[0].y}
        r="6"
        fill="none"
        stroke={ACCENT}
        strokeWidth="1.5"
        initial={{ scale: 0.6, opacity: 0.8 }}
        animate={{ scale: [0.6, 1.9], opacity: [0.8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
        style={{ transformBox: "view-box", transformOrigin: `${LANES[0].x}px ${LANES[0].y}px` }}
      />

      {/* Patients: in on the rail, scored at the node, routed to a lane */}
      {dots.map((d) => {
        const lane = LANES[d.lane];
        return (
          <motion.circle
            key={d.lane}
            r="3.2"
            initial={{ x: -8, y: NODE.y, opacity: 0, fill: SILVER }}
            animate={{
              x: [-8, NODE.x - 8, NODE.x, lane.x, lane.x],
              y: [NODE.y, NODE.y, NODE.y, lane.y, lane.y],
              opacity: [0, 1, 1, 1, 0],
              fill: d.urgent
                ? [SILVER, SILVER, ACCENT, ACCENT, ACCENT]
                : [SILVER, SILVER, SILVER, SILVER, SILVER],
            }}
            transition={{
              duration: DUR,
              delay: d.delay,
              times: [0, 0.3, 0.38, 0.78, 0.92],
              repeat: Infinity,
              ease: "easeInOut",
            }}
            filter={d.urgent ? "url(#triage-glow)" : undefined}
          />
        );
      })}
    </svg>
  );
}

/* ---------------------------------------------------------------------------
   PREDICTIVE DIAGNOSTICS: an ECG trace redraws under a sweeping scan line.
   Two clean beats, then a subtly irregular one; as the sweep crosses it, a
   dashed terracotta ring and a risk flag pop over the anomaly. Waveform
   anomaly-detection mechanic.
   --------------------------------------------------------------------------- */
function DiagnosticsFlow() {
  const reduced = useReducedMotion();
  const DUR = 5;
  // Baseline y=78; beats at ~x74 and ~x150; irregular cluster around x216.
  const ECG =
    "M 16 78 L 44 78 L 50 72 L 56 78 L 62 78 L 68 46 L 74 104 L 80 78 L 88 70 L 96 78 " +
    "L 120 78 L 126 72 L 132 78 L 138 78 L 144 46 L 150 104 L 156 78 L 164 70 L 172 78 " +
    "L 196 78 L 202 74 L 208 80 L 214 64 L 218 84 L 224 70 L 230 78 L 304 78";
  const ANOM = { x: 216, y: 74 };

  if (reduced) {
    return (
      <svg viewBox="0 0 320 140" fill="none" aria-hidden="true" className="w-full">
        <path d={ECG} stroke={SILVER} strokeOpacity="0.7" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx={ANOM.x} cy={ANOM.y} r="16" stroke={ACCENT} strokeWidth="1.5" strokeDasharray="4 4" />
        <path d={`M ${ANOM.x - 4} 44 L ${ANOM.x + 4} 44 L ${ANOM.x} 51 Z`} fill={ACCENT} />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 320 140" fill="none" aria-hidden="true" className="w-full">
      {/* Faint full trace for context; the live trace redraws over it */}
      <path d={ECG} stroke={SILVER} strokeOpacity="0.14" strokeWidth="1.5" strokeLinejoin="round" />
      <motion.path
        d={ECG}
        stroke={SILVER}
        strokeWidth="1.5"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0.85 }}
        animate={{ pathLength: [0, 1, 1], opacity: [0.85, 0.85, 0] }}
        transition={{ duration: DUR, times: [0, 0.8, 1], repeat: Infinity, ease: "linear" }}
      />

      {/* Monitor sweep line */}
      <motion.line
        y1="30"
        y2="118"
        stroke={SILVER}
        strokeWidth="1"
        initial={{ x: 16, opacity: 0.25 }}
        animate={{ x: [16, 304], opacity: [0.25, 0.25, 0] }}
        transition={{
          duration: DUR,
          times: [0, 0.8, 1],
          repeat: Infinity,
          ease: "linear",
          opacity: { duration: DUR, times: [0, 0.94, 1], repeat: Infinity },
        }}
      />

      {/* Anomaly detected as the sweep crosses it: dashed ring + risk flag */}
      <motion.circle
        cx={ANOM.x}
        cy={ANOM.y}
        r="16"
        fill="none"
        stroke={ACCENT}
        strokeWidth="1.5"
        strokeDasharray="4 4"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: [0, 0, 0.9, 0.9, 0], scale: [0.6, 0.6, 1, 1, 1] }}
        transition={{ duration: DUR, times: [0, 0.56, 0.62, 0.92, 1], repeat: Infinity, ease: "easeOut" }}
        style={{ transformBox: "view-box", transformOrigin: `${ANOM.x}px ${ANOM.y}px` }}
      />
      <motion.path
        d={`M ${ANOM.x - 4} 44 L ${ANOM.x + 4} 44 L ${ANOM.x} 51 Z`}
        fill={ACCENT}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 0.95, 0.95, 0] }}
        transition={{ duration: DUR, times: [0, 0.6, 0.64, 0.92, 1], repeat: Infinity }}
      />
    </svg>
  );
}

/* ---------------------------------------------------------------------------
   24/7 MONITORING: a round-the-clock dial with a rotating sweep. Patient dots
   sit around the face; when the sweep passes the drifting one it flips
   terracotta, rings an alert and the staff station flashes in response.
   Circular radar mechanic, the only non-linear visual in the set.
   --------------------------------------------------------------------------- */
function MonitoringFlow() {
  const reduced = useReducedMotion();
  const DUR = 6;
  const C = { x: 160, y: 74 };
  const R = 46;
  // (angle° clockwise from 12) -> fixed patient positions on the dial.
  const PATIENTS = [
    { x: 180, y: 40 },
    { x: 199, y: 80 },
    { x: 174, y: 113 },
    { x: 129, y: 96, alert: true }, // ~235°, sweep passes at t≈0.65
    { x: 125, y: 54 },
  ];
  const STATION = { x: 278, y: 20, w: 12, h: 12 };
  const ticks = Array.from({ length: 12 }, (_, i) => {
    const a = (i * Math.PI) / 6;
    return {
      x1: C.x + (R - 4) * Math.sin(a),
      y1: C.y - (R - 4) * Math.cos(a),
      x2: C.x + R * Math.sin(a),
      y2: C.y - R * Math.cos(a),
    };
  });

  const dial = (
    <>
      <circle cx={C.x} cy={C.y} r={R} stroke={SILVER} strokeOpacity="0.3" strokeWidth="1" />
      <circle cx={C.x} cy={C.y} r={R - 18} stroke={SILVER} strokeOpacity="0.1" strokeWidth="1" />
      {ticks.map((t, i) => (
        <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke={SILVER} strokeOpacity="0.25" strokeWidth="1" />
      ))}
      <rect
        x={STATION.x}
        y={STATION.y}
        width={STATION.w}
        height={STATION.h}
        rx="2.5"
        stroke={SILVER}
        strokeOpacity="0.45"
        strokeWidth="1.5"
      />
    </>
  );

  if (reduced) {
    return (
      <svg viewBox="0 0 320 140" fill="none" aria-hidden="true" className="w-full">
        {dial}
        {PATIENTS.map((p) => (
          <circle key={`${p.x}-${p.y}`} cx={p.x} cy={p.y} r="3" fill={p.alert ? ACCENT : SILVER} opacity={p.alert ? 1 : 0.7} />
        ))}
        <circle cx={PATIENTS[3].x} cy={PATIENTS[3].y} r="9" stroke={ACCENT} strokeOpacity="0.7" strokeWidth="1.5" />
      </svg>
    );
  }

  const alertP = PATIENTS[3];

  return (
    <svg viewBox="0 0 320 140" fill="none" aria-hidden="true" className="w-full">
      <defs>
        <filter id="mon-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="2.2" />
        </filter>
      </defs>

      {dial}

      {/* Rotating sweep hand with a faint trailing wedge */}
      <motion.g
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: DUR, repeat: Infinity, ease: "linear" }}
        style={{ transformBox: "view-box", transformOrigin: `${C.x}px ${C.y}px` }}
      >
        <path
          d={`M ${C.x} ${C.y} L ${C.x} ${C.y - R} A ${R} ${R} 0 0 0 ${C.x - R * 0.5} ${C.y - R * 0.866} Z`}
          fill={SILVER}
          opacity="0.06"
        />
        <line x1={C.x} y1={C.y} x2={C.x} y2={C.y - R} stroke={SILVER} strokeOpacity="0.5" strokeWidth="1" />
      </motion.g>
      <circle cx={C.x} cy={C.y} r="2" fill={SILVER} opacity="0.6" />

      {/* Stable patients: quiet silver dots */}
      {PATIENTS.filter((p) => !p.alert).map((p) => (
        <motion.circle
          key={`${p.x}-${p.y}`}
          cx={p.x}
          cy={p.y}
          r="3"
          fill={SILVER}
          animate={{ opacity: [0.45, 0.8, 0.45] }}
          transition={{ duration: 3, delay: (p.x % 5) * 0.3, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* The drifting patient: flips terracotta as the sweep passes (~t 0.65) */}
      <motion.circle
        cx={alertP.x}
        cy={alertP.y}
        r="3.2"
        initial={{ fill: SILVER, opacity: 0.6 }}
        animate={{
          fill: [SILVER, SILVER, ACCENT, ACCENT, SILVER],
          opacity: [0.6, 0.6, 1, 1, 0.6],
        }}
        transition={{ duration: DUR, times: [0, 0.63, 0.66, 0.97, 1], repeat: Infinity }}
        filter="url(#mon-glow)"
      />
      <motion.circle
        cx={alertP.x}
        cy={alertP.y}
        r="8"
        fill="none"
        stroke={ACCENT}
        strokeWidth="1.5"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: [0.5, 0.5, 0.7, 2, 2], opacity: [0, 0, 0.85, 0, 0] }}
        transition={{ duration: DUR, times: [0, 0.65, 0.7, 0.88, 1], repeat: Infinity, ease: "easeOut" }}
        style={{ transformBox: "view-box", transformOrigin: `${alertP.x}px ${alertP.y}px` }}
      />

      {/* Staff station acknowledges right after the alert fires */}
      <motion.rect
        x={STATION.x}
        y={STATION.y}
        width={STATION.w}
        height={STATION.h}
        rx="2.5"
        fill="none"
        stroke={ACCENT}
        strokeWidth="1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 0.95, 0.95, 0] }}
        transition={{ duration: DUR, times: [0, 0.72, 0.76, 0.95, 1], repeat: Infinity }}
      />
    </svg>
  );
}

/* ---------------------------------------------------------------------------
   CONTRACT ANALYSIS: a document page whose text lines are swept by a scan
   band, clause by clause. Two deviating clauses flip terracotta and get wired
   to redline note chips beside the page. Document line-scan mechanic.
   --------------------------------------------------------------------------- */
function ContractFlow() {
  const reduced = useReducedMotion();
  const DUR = 6;
  const PAGE = { x: 36, y: 16, w: 112, h: 108 };
  // Text lines: y position and right end (start is fixed at x=48).
  const LINES = [
    { y: 30, x2: 128 },
    { y: 42, x2: 136 },
    { y: 54, x2: 120, flagged: true, chipY: 34, t: 0.35 },
    { y: 66, x2: 132 },
    { y: 78, x2: 124 },
    { y: 90, x2: 136, flagged: true, chipY: 78, t: 0.77 },
    { y: 102, x2: 118 },
    { y: 114, x2: 100 },
  ];
  const CHIP = { x: 196, w: 92, h: 26 };

  const page = (
    <>
      <rect x={PAGE.x} y={PAGE.y} width={PAGE.w} height={PAGE.h} rx="4" stroke={SILVER} strokeOpacity="0.35" strokeWidth="1.5" />
      {LINES.map((l) => (
        <line key={l.y} x1="48" y1={l.y} x2={l.x2} y2={l.y} stroke={SILVER} strokeOpacity="0.25" strokeWidth="1.5" />
      ))}
    </>
  );

  const chip = (l: (typeof LINES)[number]) => (
    <g key={`chip-${l.y}`}>
      <line x1={l.x2 + 4} y1={l.y} x2={CHIP.x} y2={l.chipY! + CHIP.h / 2} stroke={ACCENT} strokeOpacity="0.5" strokeWidth="1" strokeDasharray="3 3" />
      <rect x={CHIP.x} y={l.chipY} width={CHIP.w} height={CHIP.h} rx="4" stroke={SILVER} strokeOpacity="0.3" strokeWidth="1" fill="#0A0A0B" />
      <line x1={CHIP.x + 10} y1={l.chipY! + 10} x2={CHIP.x + 62} y2={l.chipY! + 10} stroke={ACCENT} strokeOpacity="0.8" strokeWidth="1.5" />
      <line x1={CHIP.x + 10} y1={l.chipY! + 17} x2={CHIP.x + 48} y2={l.chipY! + 17} stroke={SILVER} strokeOpacity="0.3" strokeWidth="1" />
    </g>
  );

  if (reduced) {
    return (
      <svg viewBox="0 0 320 140" fill="none" aria-hidden="true" className="w-full">
        {page}
        {LINES.filter((l) => l.flagged).map((l) => (
          <g key={l.y}>
            <line x1="48" y1={l.y} x2={l.x2} y2={l.y} stroke={ACCENT} strokeOpacity="0.9" strokeWidth="1.5" />
            {chip(l)}
          </g>
        ))}
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 320 140" fill="none" aria-hidden="true" className="w-full">
      {page}

      {/* Scan band sweeping down the page */}
      <motion.rect
        x={PAGE.x + 6}
        width={PAGE.w - 12}
        height="10"
        rx="2"
        fill={SILVER}
        initial={{ y: PAGE.y + 6, opacity: 0 }}
        animate={{ y: [PAGE.y + 6, PAGE.y + PAGE.h - 16], opacity: [0, 0.1, 0.1, 0] }}
        transition={{
          duration: DUR,
          repeat: Infinity,
          ease: "linear",
          opacity: { duration: DUR, times: [0, 0.05, 0.9, 1], repeat: Infinity },
        }}
      />

      {/* Deviating clauses flip terracotta as the scan crosses them, and a
          redline chip pops beside the page, wired to the exact line. */}
      {LINES.filter((l) => l.flagged).map((l) => (
        <g key={`flag-${l.y}`}>
          <motion.line
            x1="48"
            y1={l.y}
            x2={l.x2}
            y2={l.y}
            stroke={ACCENT}
            strokeWidth="1.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 0.95, 0.95, 0] }}
            transition={{ duration: DUR, times: [0, l.t!, l.t! + 0.03, 0.93, 1], repeat: Infinity }}
          />
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 0.95, 0.95, 0] }}
            transition={{ duration: DUR, times: [0, l.t! + 0.02, l.t! + 0.06, 0.93, 1], repeat: Infinity }}
          >
            {chip(l)}
          </motion.g>
        </g>
      ))}
    </svg>
  );
}

/* ---------------------------------------------------------------------------
   CASE-LAW RESEARCH: a query node fans dashed rays out to a stack of source
   volumes; terracotta citation dots travel back down the rays into a memo
   that builds itself line by line. Round-trip retrieval mechanic.
   --------------------------------------------------------------------------- */
function CaselawFlow() {
  const reduced = useReducedMotion();
  const DUR = 6.5;
  const QUERY = { x: 40, y: 38 };
  const MEMO = { x: 20, y: 70, w: 66, h: 48 };
  // Source volumes on the right, with the moment their citation lands.
  const SOURCES = [
    { x: 252, y: 20, t: 0.45 },
    { x: 252, y: 58, t: 0.6 },
    { x: 252, y: 96, t: 0.75 },
  ];
  const memoLines = [
    { y: 84, x2: 76 },
    { y: 94, x2: 70 },
    { y: 104, x2: 62 },
  ];

  const scene = (
    <>
      <circle cx={QUERY.x} cy={QUERY.y} r="4.5" fill="#0A0A0B" stroke={SILVER} strokeWidth="1.5" />
      <rect x={MEMO.x} y={MEMO.y} width={MEMO.w} height={MEMO.h} rx="3" stroke={SILVER} strokeOpacity="0.4" strokeWidth="1.5" />
      {SOURCES.map((s) => (
        <g key={s.y}>
          <rect x={s.x} y={s.y} width="44" height="24" rx="3" stroke={SILVER} strokeOpacity="0.35" strokeWidth="1.5" />
          <line x1={s.x + 8} y1={s.y + 4} x2={s.x + 8} y2={s.y + 20} stroke={SILVER} strokeOpacity="0.3" strokeWidth="1" />
        </g>
      ))}
    </>
  );

  if (reduced) {
    return (
      <svg viewBox="0 0 320 140" fill="none" aria-hidden="true" className="w-full">
        {scene}
        {SOURCES.map((s) => (
          <line key={s.y} x1={QUERY.x + 6} y1={QUERY.y} x2={s.x} y2={s.y + 12} stroke={SILVER} strokeOpacity="0.25" strokeWidth="1" strokeDasharray="3 4" />
        ))}
        {memoLines.map((m) => (
          <line key={m.y} x1={MEMO.x + 8} y1={m.y} x2={m.x2} y2={m.y} stroke={SILVER} strokeOpacity="0.5" strokeWidth="1.5" />
        ))}
        <line x1={MEMO.x + 8} y1={MEMO.y + 42} x2={MEMO.x + 40} y2={MEMO.y + 42} stroke={ACCENT} strokeOpacity="0.8" strokeWidth="1.5" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 320 140" fill="none" aria-hidden="true" className="w-full">
      <defs>
        <filter id="law-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>

      {scene}

      {/* Query pulse at the start of each cycle */}
      <motion.circle
        cx={QUERY.x}
        cy={QUERY.y}
        r="7"
        fill="none"
        stroke={SILVER}
        strokeWidth="1"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: [0.5, 0.5, 1.8, 1.8], opacity: [0, 0.7, 0, 0] }}
        transition={{ duration: DUR, times: [0, 0.03, 0.16, 1], repeat: Infinity, ease: "easeOut" }}
        style={{ transformBox: "view-box", transformOrigin: `${QUERY.x}px ${QUERY.y}px` }}
      />

      {/* Rays draw out to the sources in sequence */}
      {SOURCES.map((s, i) => (
        <motion.line
          key={`ray-${s.y}`}
          x1={QUERY.x + 6}
          y1={QUERY.y}
          x2={s.x}
          y2={s.y + 12}
          stroke={SILVER}
          strokeOpacity="0.3"
          strokeWidth="1"
          strokeDasharray="3 4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 0, 1, 1], opacity: [0, 0, 1, 1, 0] }}
          transition={{
            duration: DUR,
            times: [0, 0.06 + i * 0.08, 0.2 + i * 0.08, 1],
            repeat: Infinity,
            ease: "easeOut",
            opacity: { duration: DUR, times: [0, 0.06 + i * 0.08, 0.1 + i * 0.08, 0.93, 1], repeat: Infinity },
          }}
        />
      ))}

      {/* Citations travel back from each source into the memo */}
      {SOURCES.map((s) => (
        <motion.circle
          key={`cit-${s.y}`}
          r="2.6"
          fill={ACCENT}
          filter="url(#law-glow)"
          initial={{ x: s.x, y: s.y + 12, opacity: 0 }}
          animate={{
            x: [s.x, s.x, MEMO.x + MEMO.w, MEMO.x + MEMO.w],
            y: [s.y + 12, s.y + 12, MEMO.y + 24, MEMO.y + 24],
            opacity: [0, 0, 1, 0],
          }}
          transition={{
            duration: DUR,
            times: [0, s.t - 0.12, s.t, s.t + 0.02],
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Memo builds line by line as citations land; terracotta seal at the end */}
      {memoLines.map((m, i) => (
        <motion.line
          key={`memo-${m.y}`}
          x1={MEMO.x + 8}
          y1={m.y}
          x2={m.x2}
          y2={m.y}
          stroke={SILVER}
          strokeWidth="1.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0, 0.6, 0.6, 0] }}
          transition={{ duration: DUR, times: [0, SOURCES[i].t, SOURCES[i].t + 0.03, 0.93, 1], repeat: Infinity }}
        />
      ))}
      <motion.line
        x1={MEMO.x + 8}
        y1={MEMO.y + 42}
        x2={MEMO.x + 40}
        y2={MEMO.y + 42}
        stroke={ACCENT}
        strokeWidth="1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 0.9, 0.9, 0] }}
        transition={{ duration: DUR, times: [0, 0.8, 0.84, 0.93, 1], repeat: Infinity }}
      />
    </svg>
  );
}

/* ---------------------------------------------------------------------------
   RISK & COMPLIANCE: a regulatory checklist ticks itself item by item; one
   row fails with a terracotta cross, a dashed connector fires across to the
   counsel figure and rings them. Checklist mechanic.
   --------------------------------------------------------------------------- */
function ComplianceFlow() {
  const reduced = useReducedMotion();
  const DUR = 7;
  const PANEL = { x: 30, y: 22, w: 140, h: 96 };
  const COUNSEL = { x: 262, y: 70 };
  // Checklist rows: box + text line; one row is the violation.
  const ROWS = [
    { y: 36, x2: 152, t: 0.12 },
    { y: 53, x2: 138, t: 0.24 },
    { y: 70, x2: 156, t: 0.36, violation: true },
    { y: 87, x2: 132, t: 0.48 },
    { y: 104, x2: 146, t: 0.6 },
  ];

  const tick = (y: number, color: string) => (
    <path d={`M 42 ${y} l 2.6 3 l 5 -6.4`} stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  );
  const cross = (y: number) => (
    <g stroke={ACCENT} strokeWidth="1.8" strokeLinecap="round">
      <line x1="42" y1={y - 3} x2="49" y2={y + 4} />
      <line x1="49" y1={y - 3} x2="42" y2={y + 4} />
    </g>
  );

  const scene = (
    <>
      <rect x={PANEL.x} y={PANEL.y} width={PANEL.w} height={PANEL.h} rx="4" stroke={SILVER} strokeOpacity="0.3" strokeWidth="1.5" />
      {ROWS.map((r) => (
        <g key={r.y}>
          <rect x="40" y={r.y - 5} width="11" height="11" rx="2" stroke={r.violation ? ACCENT : SILVER} strokeOpacity={r.violation ? 0.8 : 0.4} strokeWidth="1.2" />
          <line x1="60" y1={r.y} x2={r.x2} y2={r.y} stroke={SILVER} strokeOpacity="0.25" strokeWidth="1.5" />
        </g>
      ))}
      {/* Counsel figure: head + shoulders */}
      <g stroke={SILVER} strokeOpacity="0.55" strokeWidth="1.5" fill="none">
        <circle cx={COUNSEL.x} cy={COUNSEL.y - 9} r="4.5" />
        <path d={`M ${COUNSEL.x - 10} ${COUNSEL.y + 8} Q ${COUNSEL.x} ${COUNSEL.y - 3} ${COUNSEL.x + 10} ${COUNSEL.y + 8}`} />
      </g>
    </>
  );

  if (reduced) {
    return (
      <svg viewBox="0 0 320 140" fill="none" aria-hidden="true" className="w-full">
        {scene}
        {ROWS.map((r) => (r.violation ? <g key={r.y}>{cross(r.y)}</g> : <g key={r.y}>{tick(r.y, SILVER)}</g>))}
        <line x1={PANEL.x + PANEL.w} y1="70" x2={COUNSEL.x - 16} y2="70" stroke={ACCENT} strokeOpacity="0.5" strokeWidth="1" strokeDasharray="3 4" />
        <circle cx={COUNSEL.x} cy={COUNSEL.y - 2} r="14" stroke={ACCENT} strokeOpacity="0.6" strokeWidth="1.5" fill="none" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 320 140" fill="none" aria-hidden="true" className="w-full">
      {scene}

      {/* Rows tick in sequence; the violation gets a cross instead */}
      {ROWS.map((r) => (
        <motion.g
          key={`mark-${r.y}`}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: [0, 0, 1, 1, 0], scale: [0.6, 0.6, 1, 1, 1] }}
          transition={{ duration: DUR, times: [0, r.t, r.t + 0.03, 0.92, 1], repeat: Infinity }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        >
          {r.violation ? cross(r.y) : tick(r.y, SILVER)}
        </motion.g>
      ))}

      {/* The failed check fires across to the counsel and rings them */}
      <motion.line
        x1={PANEL.x + PANEL.w}
        y1="70"
        x2={COUNSEL.x - 16}
        y2="70"
        stroke={ACCENT}
        strokeWidth="1"
        strokeDasharray="3 4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: [0, 0, 1, 1], opacity: [0, 0, 0.7, 0.7, 0] }}
        transition={{
          duration: DUR,
          times: [0, 0.4, 0.5, 1],
          repeat: Infinity,
          ease: "easeOut",
          opacity: { duration: DUR, times: [0, 0.4, 0.44, 0.92, 1], repeat: Infinity },
        }}
      />
      <motion.circle
        cx={COUNSEL.x}
        cy={COUNSEL.y - 2}
        r="12"
        fill="none"
        stroke={ACCENT}
        strokeWidth="1.5"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: [0.5, 0.5, 0.7, 1.8, 1.8], opacity: [0, 0, 0.85, 0, 0] }}
        transition={{ duration: DUR, times: [0, 0.52, 0.58, 0.75, 1], repeat: Infinity, ease: "easeOut" }}
        style={{ transformBox: "view-box", transformOrigin: `${COUNSEL.x}px ${COUNSEL.y - 2}px` }}
      />
    </svg>
  );
}

/* ---------------------------------------------------------------------------
   SUPPLY CHAIN: a mini network map. Parts flow from a supplier through the
   factory to the plant; when the primary supplier flags terracotta, the flow
   reroutes through the alternate without the factory ever starving. Network
   rerouting mechanic.
   --------------------------------------------------------------------------- */
function SupplyFlow() {
  const reduced = useReducedMotion();
  const DUR = 8;
  const S1 = { x: 36, y: 38 };
  const S2 = { x: 36, y: 102 };
  const F = { x: 160, y: 70 };
  const P = { x: 288, y: 70 };

  const scene = (
    <>
      <line x1={S1.x + 5} y1={S1.y + 2} x2={F.x - 14} y2={F.y - 6} stroke={SILVER} strokeOpacity="0.18" strokeWidth="1" />
      <line x1={S2.x + 5} y1={S2.y - 2} x2={F.x - 14} y2={F.y + 6} stroke={SILVER} strokeOpacity="0.18" strokeWidth="1" />
      <line x1={F.x + 14} y1={F.y} x2={P.x - 5} y2={P.y} stroke={SILVER} strokeOpacity="0.18" strokeWidth="1" />
      <circle cx={S1.x} cy={S1.y} r="5" fill="#0A0A0B" stroke={SILVER} strokeWidth="1.5" />
      <circle cx={S2.x} cy={S2.y} r="5" fill="#0A0A0B" stroke={SILVER} strokeWidth="1.5" />
      <rect x={F.x - 14} y={F.y - 14} width="28" height="28" rx="5" fill="#0A0A0B" stroke={SILVER} strokeOpacity="0.6" strokeWidth="1.5" />
      <circle cx={P.x} cy={P.y} r="5" fill="#0A0A0B" stroke={SILVER} strokeWidth="1.5" />
    </>
  );

  if (reduced) {
    return (
      <svg viewBox="0 0 320 140" fill="none" aria-hidden="true" className="w-full">
        {scene}
        <circle cx={S1.x} cy={S1.y} r="9" stroke={ACCENT} strokeOpacity="0.7" strokeWidth="1.5" />
        <line x1={S2.x + 5} y1={S2.y - 2} x2={F.x - 14} y2={F.y + 6} stroke={SILVER} strokeOpacity="0.5" strokeWidth="1.5" />
        <circle cx="98" cy="87" r="2.6" fill={ACCENT} />
        <circle cx="230" cy="70" r="2.6" fill={SILVER} />
      </svg>
    );
  }

  // Phase timings inside the 8s cycle: primary supplier feeds until ~0.4,
  // flags at ~0.45, alternate takes over from ~0.55.
  return (
    <svg viewBox="0 0 320 140" fill="none" aria-hidden="true" className="w-full">
      {scene}

      {/* Primary route dims after the disruption; alternate brightens */}
      <motion.line
        x1={S1.x + 5}
        y1={S1.y + 2}
        x2={F.x - 14}
        y2={F.y - 6}
        stroke={ACCENT}
        strokeWidth="1"
        strokeDasharray="3 4"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 0.7, 0.7, 0] }}
        transition={{ duration: DUR, times: [0, 0.44, 0.48, 0.9, 1], repeat: Infinity }}
      />
      <motion.line
        x1={S2.x + 5}
        y1={S2.y - 2}
        x2={F.x - 14}
        y2={F.y + 6}
        stroke={SILVER}
        strokeWidth="1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 0.5, 0.5, 0] }}
        transition={{ duration: DUR, times: [0, 0.5, 0.56, 0.92, 1], repeat: Infinity }}
      />

      {/* Disruption ring + cross on the primary supplier */}
      <motion.circle
        cx={S1.x}
        cy={S1.y}
        r="8"
        fill="none"
        stroke={ACCENT}
        strokeWidth="1.5"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: [0.5, 0.5, 0.7, 1.9, 1.9], opacity: [0, 0, 0.85, 0, 0] }}
        transition={{ duration: DUR, times: [0, 0.44, 0.5, 0.66, 1], repeat: Infinity, ease: "easeOut" }}
        style={{ transformBox: "view-box", transformOrigin: `${S1.x}px ${S1.y}px` }}
      />
      <motion.g
        stroke={ACCENT}
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 0.9, 0.9, 0] }}
        transition={{ duration: DUR, times: [0, 0.46, 0.5, 0.9, 1], repeat: Infinity }}
      >
        <line x1={S1.x - 3.5} y1={S1.y - 3.5} x2={S1.x + 3.5} y2={S1.y + 3.5} />
        <line x1={S1.x + 3.5} y1={S1.y - 3.5} x2={S1.x - 3.5} y2={S1.y + 3.5} />
      </motion.g>

      {/* Parts on the primary route (first phase only) */}
      {[0, 0.16].map((phase) => (
        <motion.circle
          key={`p1-${phase}`}
          r="2.6"
          fill={SILVER}
          initial={{ x: S1.x + 5, y: S1.y + 2, opacity: 0 }}
          animate={{
            x: [S1.x + 5, F.x - 16, F.x - 16],
            y: [S1.y + 2, F.y - 6, F.y - 6],
            opacity: [0, 0.9, 0],
          }}
          transition={{
            duration: DUR,
            times: [phase, phase + 0.22, phase + 0.24],
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Parts on the alternate route (after the reroute) */}
      {[0.55, 0.72].map((phase) => (
        <motion.circle
          key={`p2-${phase}`}
          r="2.6"
          fill={SILVER}
          initial={{ x: S2.x + 5, y: S2.y - 2, opacity: 0 }}
          animate={{
            x: [S2.x + 5, F.x - 16, F.x - 16],
            y: [S2.y - 2, F.y + 6, F.y + 6],
            opacity: [0, 0.9, 0],
          }}
          transition={{
            duration: DUR,
            times: [phase, phase + 0.22, phase + 0.24],
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Factory -> plant never stops (independent short loop) */}
      <motion.circle
        r="2.6"
        fill={SILVER}
        initial={{ x: F.x + 16, y: F.y, opacity: 0 }}
        animate={{ x: [F.x + 16, P.x - 7], opacity: [0, 0.9, 0.9, 0] }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "linear",
          opacity: { duration: 1.8, times: [0, 0.15, 0.85, 1], repeat: Infinity },
        }}
      />
    </svg>
  );
}

/* ---------------------------------------------------------------------------
   PREDICTIVE MAINTENANCE: a machine-health gauge. The needle creeps toward
   the terracotta zone, the alert fires BEFORE it gets there, a service slot
   is booked and the needle eases back to safe. Gauge-needle mechanic.
   --------------------------------------------------------------------------- */
function MaintenanceFlow() {
  const reduced = useReducedMotion();
  const DUR = 8;
  const C = { x: 160, y: 100 };
  const R = 56;
  const pt = (deg: number, r: number) => {
    const a = (deg * Math.PI) / 180;
    return { x: C.x + r * Math.sin(a), y: C.y - r * Math.cos(a) };
  };
  const a0 = pt(-80, R);
  const a1 = pt(80, R);
  const red0 = pt(40, R);
  const ticks = [-80, -40, 0, 40, 80].map((d) => ({ o: pt(d, R - 6), i: pt(d, R + 2) }));

  const dial = (
    <>
      <path d={`M ${a0.x} ${a0.y} A ${R} ${R} 0 0 1 ${a1.x} ${a1.y}`} stroke={SILVER} strokeOpacity="0.3" strokeWidth="2" />
      <path d={`M ${red0.x} ${red0.y} A ${R} ${R} 0 0 1 ${a1.x} ${a1.y}`} stroke={ACCENT} strokeOpacity="0.55" strokeWidth="3" />
      {ticks.map((t, i) => (
        <line key={i} x1={t.o.x} y1={t.o.y} x2={t.i.x} y2={t.i.y} stroke={SILVER} strokeOpacity="0.3" strokeWidth="1" />
      ))}
      <circle cx={C.x} cy={C.y} r="3" fill={SILVER} fillOpacity="0.6" />
    </>
  );
  const serviceChip = (
    <g>
      <rect x="238" y="24" width="40" height="22" rx="4" stroke={ACCENT} strokeOpacity="0.8" strokeWidth="1.2" fill="#0A0A0B" />
      <path d="M 249 35 l 3 3.4 l 6.5 -7.4" stroke={ACCENT} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </g>
  );

  if (reduced) {
    const tip = pt(28, R - 8);
    return (
      <svg viewBox="0 0 320 140" fill="none" aria-hidden="true" className="w-full">
        {dial}
        <line x1={C.x} y1={C.y} x2={tip.x} y2={tip.y} stroke={SILVER} strokeWidth="2" strokeLinecap="round" />
        <circle cx={tip.x} cy={tip.y} r="9" stroke={ACCENT} strokeOpacity="0.7" strokeWidth="1.5" strokeDasharray="3 3" />
        {serviceChip}
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 320 140" fill="none" aria-hidden="true" className="w-full">
      {dial}

      {/* Needle: creeps toward the red zone, then service brings it back */}
      <motion.g
        initial={{ rotate: -70 }}
        animate={{ rotate: [-70, -70, 34, 34, -55, -55] }}
        transition={{ duration: DUR, times: [0, 0.06, 0.45, 0.66, 0.85, 1], repeat: Infinity, ease: "easeInOut" }}
        style={{ transformBox: "view-box", transformOrigin: `${C.x}px ${C.y}px` }}
      >
        <line x1={C.x} y1={C.y} x2={C.x} y2={C.y - (R - 8)} stroke={SILVER} strokeWidth="2" strokeLinecap="round" />
      </motion.g>

      {/* Early-warning ring where the needle is heading, fired pre-redline */}
      <motion.circle
        cx={pt(34, R - 8).x}
        cy={pt(34, R - 8).y}
        r="9"
        fill="none"
        stroke={ACCENT}
        strokeWidth="1.5"
        strokeDasharray="3 3"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: [0.5, 0.5, 0.8, 1.8, 1.8], opacity: [0, 0, 0.85, 0, 0] }}
        transition={{ duration: DUR, times: [0, 0.46, 0.52, 0.68, 1], repeat: Infinity, ease: "easeOut" }}
        style={{ transformBox: "view-box", transformOrigin: `${pt(34, R - 8).x}px ${pt(34, R - 8).y}px` }}
      />

      {/* Service slot booked: chip with a check pops before the needle relaxes */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 0.95, 0.95, 0] }}
        transition={{ duration: DUR, times: [0, 0.6, 0.66, 0.94, 1], repeat: Infinity }}
      >
        {serviceChip}
      </motion.g>
    </svg>
  );
}

/* ---------------------------------------------------------------------------
   QA VISION: units ride a conveyor under a camera. Good units pass with a
   quiet tick; the defective one is locked by terracotta brackets and
   diverted off the line into the reject tray. Conveyor-inspection mechanic.
   --------------------------------------------------------------------------- */
function VisionFlow() {
  const reduced = useReducedMotion();
  const DUR = 8;
  const BELT_Y = 104;
  const ITEM_Y = 94;
  const SCAN_X = 160;

  const camera = (
    <g stroke={SILVER} strokeOpacity="0.55" strokeWidth="1.5" fill="none">
      <rect x="148" y="18" width="24" height="16" rx="3" />
      <circle cx="160" cy="26" r="4" />
      <line x1="160" y1="34" x2="160" y2="48" strokeDasharray="2 4" />
    </g>
  );
  const brackets = (color: string, opacity: number) => (
    <g stroke={color} strokeOpacity={opacity} strokeWidth="1.5" fill="none">
      <path d="M 146 76 h 6 M 146 76 v 6" />
      <path d="M 174 76 h -6 M 174 76 v 6" />
      <path d="M 146 106 h 6 M 146 106 v -6" />
      <path d="M 174 106 h -6 M 174 106 v -6" />
    </g>
  );
  const tray = (
    <path d="M 150 124 L 150 134 L 178 134 L 178 124" stroke={SILVER} strokeOpacity="0.35" strokeWidth="1.5" fill="none" />
  );

  if (reduced) {
    return (
      <svg viewBox="0 0 320 140" fill="none" aria-hidden="true" className="w-full">
        <line x1="10" y1={BELT_Y} x2="310" y2={BELT_Y} stroke={SILVER} strokeOpacity="0.25" strokeWidth="1.5" strokeDasharray="6 10" />
        {camera}
        {brackets(ACCENT, 0.9)}
        {tray}
        <rect x="70" y={ITEM_Y - 8} width="16" height="16" rx="2" stroke={SILVER} strokeOpacity="0.6" strokeWidth="1.5" />
        <rect x={SCAN_X - 8} y={ITEM_Y - 8} width="16" height="16" rx="2" stroke={ACCENT} strokeOpacity="0.9" strokeWidth="1.5" />
        <rect x="248" y={ITEM_Y - 8} width="16" height="16" rx="2" stroke={SILVER} strokeOpacity="0.6" strokeWidth="1.5" />
      </svg>
    );
  }

  // Items are phase-shifted copies of the same 8s journey; the third one is
  // defective and gets pulled off the line at the scanner.
  const good = [0, 0.33];
  const DEFECT_DELAY = 0.66;

  return (
    <svg viewBox="0 0 320 140" fill="none" aria-hidden="true" className="w-full">
      {/* Belt with drifting dashes */}
      <motion.line
        x1="10"
        y1={BELT_Y}
        x2="310"
        y2={BELT_Y}
        stroke={SILVER}
        strokeOpacity="0.25"
        strokeWidth="1.5"
        strokeDasharray="6 10"
        animate={{ strokeDashoffset: [0, -32] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
      />
      {camera}
      {tray}

      {/* Scan brackets breathe on the cadence of arriving units */}
      <motion.g
        animate={{ opacity: [0.35, 0.75, 0.35] }}
        transition={{ duration: DUR / 3, repeat: Infinity, ease: "easeInOut" }}
      >
        {brackets(SILVER, 1)}
      </motion.g>

      {/* Good units: cross the scanner, collect a quiet tick, roll on */}
      {good.map((phase) => (
        <g key={phase}>
          <motion.rect
            width="16"
            height="16"
            rx="2"
            stroke={SILVER}
            strokeOpacity="0.6"
            strokeWidth="1.5"
            fill="#0A0A0B"
            initial={{ x: -24, y: ITEM_Y - 8, opacity: 0 }}
            animate={{ x: [-24, 336], opacity: [0, 0.9, 0.9, 0] }}
            transition={{
              duration: DUR,
              delay: phase * DUR,
              repeat: Infinity,
              ease: "linear",
              opacity: { duration: DUR, delay: phase * DUR, times: [0, 0.06, 0.94, 1], repeat: Infinity },
            }}
          />
          <motion.path
            d="M 172 62 l 3 3.4 l 6.5 -7.4"
            stroke={SILVER}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 0.8, 0, 0] }}
            transition={{ duration: DUR, delay: phase * DUR, times: [0, 0.5, 0.54, 0.62, 1], repeat: Infinity }}
          />
        </g>
      ))}

      {/* The defective unit: locked at the scanner, diverted into the tray */}
      <motion.g
        initial={{ x: -24, y: 0, opacity: 0 }}
        animate={{
          x: [-24, SCAN_X - 8, SCAN_X - 8, SCAN_X - 6, SCAN_X - 6],
          y: [0, 0, 0, 32, 32],
          opacity: [0, 0.95, 0.95, 0.95, 0],
        }}
        transition={{
          duration: DUR,
          delay: DEFECT_DELAY * DUR,
          times: [0, 0.5, 0.6, 0.72, 0.8],
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <rect y={ITEM_Y - 8} width="16" height="16" rx="2" stroke={ACCENT} strokeOpacity="0.95" strokeWidth="1.5" fill="#0A0A0B" />
        <line x1="4" y1={ITEM_Y - 4} x2="12" y2={ITEM_Y + 4} stroke={ACCENT} strokeOpacity="0.7" strokeWidth="1" />
      </motion.g>
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 0.95, 0.95, 0] }}
        transition={{ duration: DUR, delay: DEFECT_DELAY * DUR, times: [0, 0.5, 0.53, 0.68, 0.74], repeat: Infinity }}
      >
        {brackets(ACCENT, 1)}
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
  if (flow === "fraud") return <FraudFlow />;
  if (flow === "shopper") return <ShopperFlow />;
  if (flow === "inventory") return <InventoryFlow />;
  if (flow === "triage") return <TriageFlow />;
  if (flow === "diagnostics") return <DiagnosticsFlow />;
  if (flow === "monitoring") return <MonitoringFlow />;
  if (flow === "contract") return <ContractFlow />;
  if (flow === "caselaw") return <CaselawFlow />;
  if (flow === "compliance") return <ComplianceFlow />;
  if (flow === "supply") return <SupplyFlow />;
  if (flow === "maintenance") return <MaintenanceFlow />;
  if (flow === "vision") return <VisionFlow />;
  if (sector === "finance") return <FinanceFlow labels={labels} />;
  return <GenericFlow labels={labels} />;
}
