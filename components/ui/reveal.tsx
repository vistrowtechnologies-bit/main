"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
};

export function Reveal({ children, delay = 0, ...props }: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? undefined : { opacity: 0, y: 24 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
