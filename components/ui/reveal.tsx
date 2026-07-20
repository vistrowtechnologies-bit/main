"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "scale" | "none";
  distance?: number;
  duration?: number;
  once?: boolean;
};

export function Reveal({
  children,
  delay = 0,
  direction = "up",
  distance = 24,
  duration = 0.6,
  once = true,
  ...props
}: RevealProps) {
  const reduce = useReducedMotion();
  const initial = {
    up: { opacity: 0, y: distance },
    down: { opacity: 0, y: -distance },
    left: { opacity: 0, x: distance },
    right: { opacity: 0, x: -distance },
    scale: { opacity: 0, scale: 0.94 },
    none: { opacity: 0 },
  }[direction];

  return (
    <motion.div
      initial={reduce ? undefined : initial}
      whileInView={
        reduce ? undefined : { opacity: 1, x: 0, y: 0, scale: 1 }
      }
      viewport={{ once, margin: "-72px 0px" }}
      transition={{ duration, ease: [0.22, 1, 0.36, 1], delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
