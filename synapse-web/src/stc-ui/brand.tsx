import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import stcLogo from "./assets/stc-logo.jpg";

/** The STC logo is a white JPG, so it always sits in a white badge (works on light and dark). */
export function StcBadge() {
  return (
    <a
      href="https://www.stciitphybrid.in/"
      className="grid size-10 flex-none place-items-center rounded-stc bg-white shadow-stc-sm"
    >
      <Image src={stcLogo} alt="Student Technical Council, IIT Patna" className="h-auto w-[2.1rem]" />
    </a>
  );
}

/** [STC logo] | {club lockup}. Every club and event site starts its nav and footer with this. */
export function BrandGroup({ children, onDark = false }: { children: ReactNode; onDark?: boolean }) {
  return (
    <div className="mr-auto flex min-w-0 items-center gap-3">
      <StcBadge />
      <span aria-hidden className={cn("h-7 w-px flex-none", onDark ? "bg-white/20" : "bg-line")} />
      {children}
    </div>
  );
}

interface ClubLockupProps {
  href: string;
  /** Accessible name for the whole link. */
  label: string;
  /** The club's mark (an <Image> or SVG), about 2.5rem tall. */
  mark: ReactNode;
  /** The club's name as a styled element (e.g. a gradient wordmark). */
  name: ReactNode;
  tagline: string;
  onDark?: boolean;
}

export function ClubLockup({ href, label, mark, name, tagline, onDark = false }: ClubLockupProps) {
  return (
    <a href={href} aria-label={label} className="flex min-w-0 items-center gap-2.5 no-underline">
      {mark}
      <span className="grid min-w-0 gap-0.5 leading-tight">
        {name}
        <small
          className={cn(
            "stc-label text-[0.625rem] leading-tight font-medium whitespace-nowrap",
            onDark ? "text-on-dark-muted" : "text-muted",
          )}
        >
          {tagline}
        </small>
      </span>
    </a>
  );
}
