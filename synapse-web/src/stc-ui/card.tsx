import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends ComponentProps<"div"> {
  /** Lift and highlight on hover. Turn off for static boxes (a form, a fact list) so they don't look clickable. */
  interactive?: boolean;
}

export function Card({ className, interactive = true, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "grid content-start gap-3 rounded-stc border border-line bg-white p-6 shadow-stc-sm",
        interactive && [
          "transition-[transform,box-shadow,border-color] duration-200",
          "hover:-translate-y-[3px] hover:border-brand-line hover:shadow-stc-md",
          "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        ],
        className,
      )}
      {...props}
    />
  );
}

export function CardIcon({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn("grid size-11 place-items-center rounded-stc bg-brand-tint text-brand", className)}
      {...props}
    />
  );
}
