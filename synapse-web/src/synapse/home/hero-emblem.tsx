"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import emblem from "../assets/synapse-emblem.png";
import { hero } from "../content/home";

const chip =
  "absolute rounded-full bg-white px-3.5 py-1.5 text-sm font-semibold text-ink shadow-stc-md ring-1 ring-line";

/**
 * The Synapse emblem card (304x375), framed by two faint rings and two small tags. It drifts gently up and
 * down; the motion is switched off for visitors who prefer reduced motion. Looks soft if shown larger than ~19rem.
 */
export function HeroEmblem() {
  const reduce = useReducedMotion();

  return (
    // The wrapper gets the explicit width and the image fills it. Putting a percentage width on the image itself
    // inside a shrink-to-fit grid item is circular, and browsers then fall back to the image's own (density-
    // corrected) size, which can come out far smaller than intended.
    <motion.div
      className="relative w-[min(100%,15rem)] justify-self-center md:w-[min(100%,17rem)] lg:w-[min(100%,19rem)]"
      animate={reduce ? undefined : { y: [0, -8, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      <div aria-hidden className="absolute -inset-4 rounded-[2rem] border border-brand-line" />
      <div aria-hidden className="absolute -inset-9 rounded-[2.75rem] border border-brand-line/50" />
      <Image
        src={emblem}
        alt={hero.emblemAlt}
        preload
        sizes="(min-width: 52rem) 19rem, 15rem"
        className="relative h-auto w-full rounded-3xl shadow-brand-glow"
      />
      {/* Decorative repeats of facts already stated in the text, so hidden from screen readers. */}
      <span aria-hidden className={`${chip} -top-2 -left-5`}>
        {hero.badges[0]}
      </span>
      <span aria-hidden className={`${chip} -right-5 -bottom-2`}>
        {hero.badges[1]}
      </span>
    </motion.div>
  );
}
