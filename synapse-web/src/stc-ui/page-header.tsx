import type { ReactNode } from "react";
import { Container } from "./container";
import { Eyebrow } from "./eyebrow";

interface PageHeaderProps {
  eyebrow: string;
  /** Plain part of the h1. */
  before: string;
  /** Last words of the h1, shown in --brand. */
  accent: string;
  lead: string;
  /** Optional extra content under the lead (buttons, a note). */
  children?: ReactNode;
}

/**
 * Opening band of every inner page (Events, Resources, Contact...): eyebrow, two-tone h1, lead paragraph.
 * The home page uses a bigger hero instead. The bottom padding is deliberately small so the content
 * underneath starts close to the heading.
 */
export function PageHeader({ eyebrow, before, accent, lead, children }: PageHeaderProps) {
  return (
    <section className="relative isolate overflow-hidden bg-hero pt-[clamp(2.5rem,6vw,4rem)] pb-[clamp(1.5rem,4vw,2.5rem)]">
      <Container className="grid justify-items-center gap-5 text-center">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="text-h2 font-bold text-balance text-ink">
          {before}
          <span className="text-brand">{accent}</span>
        </h1>
        <p className="max-w-160 text-lead text-ink-2">{lead}</p>
        {children}
      </Container>
    </section>
  );
}
