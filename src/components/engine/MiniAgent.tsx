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
    <div className="pointer-events-none fixed bottom-4 right-4 z-40 flex flex-col items-center gap-1.5 sm:bottom-6 sm:right-6 sm:gap-2">
      <span className="sr-only">{label}</span>
      <motion.svg
        aria-hidden="true"
        viewBox={STANDBY_VIEWBOX}
        fill="none"
        className="h-10 w-10 sm:h-[52px] sm:w-[52px]"
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
        className="max-w-[38vw] truncate rounded-full border border-white/10 bg-black/70 px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.16em] text-zinc-500 backdrop-blur sm:max-w-none sm:px-2.5 sm:py-1 sm:text-[9px] sm:tracking-[0.2em]"
      >
        {status}
      </span>
    </div>
  );
}
