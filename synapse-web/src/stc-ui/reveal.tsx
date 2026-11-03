"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Seconds. Use small multiples (0.06-0.1) to stagger siblings. */
  delay?: number;
}

/**
 * Fade-and-rise when scrolled into view, once.
 * - Not used above the fold, so it never delays the first paint of the hero.
 * - Skipped entirely when the visitor prefers reduced motion.
 * - `data-reveal` lets the <noscript> rule in app/layout.tsx show content when JS is off.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      data-reveal
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
