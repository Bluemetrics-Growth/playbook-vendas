"use client";

import { MotionConfig } from "framer-motion";

/** Respeita prefers-reduced-motion também nas animações do Framer Motion. */
export function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
