import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./container";

interface SectionProps extends ComponentProps<"section"> {
  /** "soft" = the alternate grey background. Sections alternate white and soft down a page. */
  tone?: "white" | "soft";
}

/** A page section: standard vertical padding, optional grey background, content inside the container. */
export function Section({ tone = "white", className, children, ...props }: SectionProps) {
  return (
    <section className={cn("py-(--section-y)", tone === "soft" && "bg-soft", className)} {...props}>
      <Container>{children}</Container>
    </section>
  );
}
