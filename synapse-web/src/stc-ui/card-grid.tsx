import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardGridProps {
  /** How many cards fit across a wide screen: 3 (events, resources, purposes) or 4 (focus areas). */
  columns?: 3 | 4;
  className?: string;
  /** The <li> cards. */
  children: ReactNode;
}

/**
 * A centred grid of cards. Unlike a CSS grid, a short last row (or a single card) stays in the middle of the
 * page instead of hugging the left edge. Every card has the same width: 1 across on phones, 2 across from
 * 640 px, then `columns` across from 1024 px. Widths are (100% - gaps) / columns, with a 1.5rem gap.
 * Put each card in an <li>; give the card h-full if it should stretch to the row's height.
 */
export function CardGrid({ columns = 3, className, children }: CardGridProps) {
  return (
    <ul
      className={cn(
        "flex flex-wrap justify-center gap-6",
        "[&>li]:w-full sm:[&>li]:w-[calc(50%-0.75rem)]",
        columns === 4 ? "lg:[&>li]:w-[calc(25%-1.125rem)]" : "lg:[&>li]:w-[calc(33.333%-1rem)]",
        className,
      )}
    >
      {children}
    </ul>
  );
}
