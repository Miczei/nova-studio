"use client";

import { useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  STANDBY_SPIRAL,
  STANDBY_DOT,
  STANDBY_VIEWBOX,
  FLOWER_COLOR,
  LINE_COLOR,
} from "./agentPath";

export default function MiniAgent({
  statuses,
  label,
}: {
  statuses: string[];
  label: string;
}) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 70, damping: 22 });
  const [status, setStatus] = useState(statuses[0]);
  const reduced = useReducedMotion();

  const dotScale = useTransform(progress, [0.85, 0.98], [0, 1]);

  useMotionValueEvent(progress, "change", (v) => {
    const idx = Math.min(statuses.length - 1, Math.max(0, Math.floor(v * statuses.length)));
    setStatus(statuses[idx]);
  });

  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-40 hidden flex-col items-center gap-2 md:flex">
      <span className="sr-only">{label}</span>
      <motion.svg
        aria-hidden="true"
        width="52"
        height="52"
        viewBox={STANDBY_VIEWBOX}
        fill="none"
        animate={reduced ? undefined : { opacity: [0.55, 0.9, 0.55] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <path
          d={STANDBY_SPIRAL}
          stroke="rgba(255,255,255,0.09)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <motion.path
          d={STANDBY_SPIRAL}
          stroke={LINE_COLOR}
          strokeWidth="4"
          strokeLinecap="round"
          style={reduced ? undefined : { pathLength: progress }}
        />
        <motion.circle
          cx={STANDBY_DOT.cx}
          cy={STANDBY_DOT.cy}
          r={STANDBY_DOT.r}
          fill={FLOWER_COLOR}
          style={
            reduced
              ? undefined
              : {
                  scale: dotScale,
                  opacity: dotScale,
                  transformOrigin: `${STANDBY_DOT.cx}px ${STANDBY_DOT.cy}px`,
                  transformBox: "view-box",
                }
          }
        />
      </motion.svg>
      <span
        aria-hidden="true"
        className="rounded-full border border-white/10 bg-black/70 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-500 backdrop-blur"
      >
        {status}
      </span>
    </div>
  );
}
