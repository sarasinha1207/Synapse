import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "./eyebrow";

interface SectionHeadProps {
  eyebrow: string;
  /** Plain part of the heading. */
  before: string;
  /** Last words of the heading, shown in --brand (the STC "two-tone" heading). */
  accent: string;
  description?: string;
  /** Centre the heading block. This is the default: STC sections are centred. Pass false for a left-aligned heading. */
  centered?: boolean;
  /** Optional control on the right (for example a "Leaderboard" button). Ignored when centred. */
  action?: ReactNode;
  /** id for the h2, so the section can point to it with aria-labelledby. */
  headingId?: string;
  className?: string;
}

export function SectionHead({
  eyebrow,
  before,
  accent,
  description,
  centered = true,
  action,
  headingId,
  className,
}: SectionHeadProps) {
  return (
    <div
      className={cn(
        "mb-10 flex flex-wrap items-end gap-x-8 gap-y-5",
        centered ? "justify-center text-center" : "justify-between",
        className,
      )}
    >
      <div className={cn("grid gap-4", centered ? "justify-items-center" : "justify-items-start")}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 id={headingId} className="text-h2 font-bold text-balance text-ink">
          {before}
          <span className="text-brand">{accent}</span>
        </h2>
        {description ? <p className="max-w-160 text-muted">{description}</p> : null}
      </div>
      {action && !centered ? <div className="flex-none">{action}</div> : null}
    </div>
  );
}
