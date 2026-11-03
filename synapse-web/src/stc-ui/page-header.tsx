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
 * Opening band of every inner page (Resources, Contact...): eyebrow, two-tone h1, lead paragraph.
 * The home page uses a bigger hero instead; inner pages use this smaller header so the content starts sooner.
 */
export function PageHeader({ eyebrow, before, accent, lead, children }: PageHeaderProps) {
  return (
    <section className="relative isolate overflow-hidden bg-hero py-[clamp(2.5rem,6vw,4.5rem)]">
      <Container className="grid justify-items-start gap-5">
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
