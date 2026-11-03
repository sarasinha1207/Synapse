import { cn } from "@/lib/utils";
import { Eyebrow } from "./eyebrow";

interface SectionHeadProps {
  eyebrow: string;
  /** Plain part of the heading. */
  before: string;
  /** Last words of the heading, shown in --brand (the STC "two-tone" heading). */
  accent: string;
  description?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHead({ eyebrow, before, accent, description, centered = false, className }: SectionHeadProps) {
  return (
    <div className={cn("mb-10 grid gap-4", centered ? "justify-items-center text-center" : "justify-items-start", className)}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="text-h2 font-bold text-balance text-ink">
        {before}
        <span className="text-brand">{accent}</span>
      </h2>
      {description ? <p className="max-w-160 text-muted">{description}</p> : null}
    </div>
  );
}
