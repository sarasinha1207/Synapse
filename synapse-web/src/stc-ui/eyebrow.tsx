import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** The STC signature: a small tinted pill above a heading. */
export function Eyebrow({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "stc-label inline-flex items-center gap-2 rounded-full bg-brand-tint px-3.5 py-1.5 text-label font-semibold text-brand",
        className,
      )}
      {...props}
    />
  );
}
