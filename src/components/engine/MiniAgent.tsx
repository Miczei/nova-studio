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
  AGENT_FIGURE,
  AGENT_STEM,
  AGENT_FLOWER,
  AGENT_VIEWBOX,
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

  const stemOpacity = useTransform(progress, [0.72, 0.84], [0, 1]);
  const flowerScale = useTransform(progress, [0.8, 0.96], [0, 1]);

  useMotionValueEvent(progress, "change", (v) => {
    const idx = Math.min(statuses.length - 1, Math.max(0, Math.floor(v * statuses.length)));
    setStatus(statuses[idx]);
  });

  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-40 hidden flex-col items-center gap-2 md:flex">
      <span className="sr-only">{label}</span>
      <svg aria-hidden="true" width="72" height="79" viewBox={AGENT_VIEWBOX} fill="none">
        <motion.circle
          cx={AGENT_FLOWER.cx}
          cy={AGENT_FLOWER.cy}
          r={AGENT_FLOWER.r}
          fill={FLOWER_COLOR}
          style={
            reduced
              ? undefined
              : {
                  scale: flowerScale,
                  opacity: flowerScale,
                  transformOrigin: "121px 56px",
                  transformBox: "view-box",
                }
          }
        />
        <motion.path
          d={AGENT_STEM}
          stroke={LINE_COLOR}
          strokeWidth="7"
          strokeLinecap="round"
          style={reduced ? undefined : { opacity: stemOpacity }}
        />
        <motion.path
          d={AGENT_FIGURE}
          stroke={LINE_COLOR}
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={reduced ? undefined : { pathLength: progress }}
        />
      </svg>
      <span
        aria-hidden="true"
        className="rounded-full border border-white/10 bg-black/70 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-500 backdrop-blur"
      >
        {status}
      </span>
    </div>
  );
}
