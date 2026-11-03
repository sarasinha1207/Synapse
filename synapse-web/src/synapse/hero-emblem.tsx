"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import emblem from "./assets/synapse-emblem.png";
import { hero } from "./content";

/**
 * The Synapse emblem card (304x375). It drifts gently up and down; the motion is
 * switched off for visitors who prefer reduced motion. Looks soft if shown larger than ~19rem.
 */
export function HeroEmblem() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="justify-self-start md:justify-self-center"
      animate={reduce ? undefined : { y: [0, -8, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      <Image
        src={emblem}
        alt={hero.emblemAlt}
        preload
        sizes="(min-width: 52rem) 19rem, 15rem"
        className="h-auto w-[min(100%,15rem)] rounded-3xl shadow-brand-glow md:w-[min(100%,19rem)]"
      />
    </motion.div>
  );
}
