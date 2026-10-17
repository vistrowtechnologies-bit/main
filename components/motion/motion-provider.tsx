"use client";

import type { ReactNode } from "react";
import { LazyMotion } from "framer-motion";

// Animation features download after hydration instead of shipping in the
// first-load bundle; server-rendered starting styles are unchanged.
const loadFeatures = () => import("./features").then((mod) => mod.default);

export function MotionProvider({ children }: { children: ReactNode }) {
  return <LazyMotion features={loadFeatures}>{children}</LazyMotion>;
}
