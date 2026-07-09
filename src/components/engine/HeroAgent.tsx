"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  AGENT_FIGURE,
  AGENT_STEM,
  AGENT_FLOWER,
  AGENT_VIEWBOX,
  FLOWER_COLOR,
  LINE_COLOR,
} from "./agentPath";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function HeroAgent({ className }: { className?: string }) {
  const reduced = useReducedMotion();

  return (
    <motion.svg
      aria-hidden="true"
      viewBox={AGENT_VIEWBOX}
      fill="none"
      className={className}
      animate={reduced ? undefined : { rotate: [-2.2, 2.2] }}
      transition={{
        duration: 2.9,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      }}
      style={{ transformOrigin: "50% 92%" }}
    >
      <motion.g
        animate={reduced ? undefined : { rotate: [3.5, -3.5] }}
        transition={{
          duration: 3.4,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          delay: 0.4,
        }}
        style={{ transformOrigin: "121px 56px", transformBox: "view-box" }}
      >
        <motion.circle
          cx={AGENT_FLOWER.cx}
          cy={AGENT_FLOWER.cy}
          r={AGENT_FLOWER.r}
          fill={FLOWER_COLOR}
          initial={reduced ? false : { scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.9, duration: 0.7, ease: EASE }}
          style={{ transformOrigin: "121px 56px", transformBox: "view-box" }}
        />
        <path
          d={AGENT_STEM}
          stroke={LINE_COLOR}
          strokeWidth="7"
          strokeLinecap="round"
        />
      </motion.g>
      <motion.path
        d={AGENT_FIGURE}
        stroke={LINE_COLOR}
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduced ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.2, ease: EASE }}
      />
    </motion.svg>
  );
}
