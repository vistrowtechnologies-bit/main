"use client";

import { motion, useReducedMotion } from "framer-motion";

const confettiDots = [
  { x: -46, y: -58, delay: 0, color: "var(--accent)" },
  { x: 44, y: -52, delay: 0.04, color: "var(--accent-strong)" },
  { x: -60, y: 10, delay: 0.08, color: "var(--accent-strong)" },
  { x: 58, y: 4, delay: 0.02, color: "var(--accent)" },
  { x: -30, y: 56, delay: 0.1, color: "var(--accent)" },
  { x: 32, y: 58, delay: 0.06, color: "var(--accent-strong)" },
  { x: 0, y: -68, delay: 0.12, color: "var(--accent)" },
  { x: 0, y: 66, delay: 0.14, color: "var(--accent-strong)" },
];

// Animated checkmark badge with a one-shot confetti burst. Purely decorative
// (no fake progress or status implied) - used on form success states.
export function SuccessCelebration() {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto flex h-16 w-16 items-center justify-center">
      {!reduce &&
        confettiDots.map((dot, i) => (
          <motion.span
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: dot.color }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{ x: dot.x, y: dot.y, opacity: 0, scale: 0.4 }}
            transition={{ duration: 0.7, delay: dot.delay, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      <motion.div
        initial={reduce ? undefined : { scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="flex h-16 w-16 items-center justify-center rounded-full bg-accent"
      >
        <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none">
          <motion.path
            d="M5 13l4 4L19 7"
            stroke="rgb(var(--accent-ink))"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={reduce ? undefined : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
          />
        </svg>
      </motion.div>
    </div>
  );
}
