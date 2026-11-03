"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import emblem from "../assets/synapse-emblem.png";
import { hero } from "../content/home";

/**
 * The Synapse emblem card (304x375). It drifts gently up and down; the motion is
 * switched off for visitors who prefer reduced motion. Looks soft if shown larger than ~19rem.
 */
export function HeroEmblem() {
  const reduce = useReducedMotion();

  return (
    // The wrapper gets the explicit width and the image fills it. Putting a percentage width on the image itself
    // inside a shrink-to-fit grid item is circular, and browsers then fall back to the image's own (density-
    // corrected) size, which can come out far smaller than intended.
    <motion.div
      className="w-[min(100%,15rem)] justify-self-start md:w-[min(100%,19rem)] md:justify-self-center"
      animate={reduce ? undefined : { y: [0, -8, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      <Image
        src={emblem}
        alt={hero.emblemAlt}
        preload
        sizes="(min-width: 52rem) 19rem, 15rem"
        className="h-auto w-full rounded-3xl shadow-brand-glow"
      />
    </motion.div>
  );
}
