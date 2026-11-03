import { ArrowRight, Cpu, FlaskConical, ListChecks, Network, type LucideIcon } from "lucide-react";
import { AppLink } from "@/stc-ui/app-link";
import { Button } from "@/stc-ui/button";
import { Card, CardIcon } from "@/stc-ui/card";
import { Container } from "@/stc-ui/container";
import { Eyebrow } from "@/stc-ui/eyebrow";
import { ItemCard } from "@/stc-ui/item-card";
import { Reveal } from "@/stc-ui/reveal";
import { Section } from "@/stc-ui/section";
import { SectionHead } from "@/stc-ui/section-head";
import { about, events, focus, hero, type FocusIcon } from "../content/home";
import { HeroEmblem } from "./hero-emblem";

const focusIcons: Record<FocusIcon, LucideIcon> = {
  cpu: Cpu,
  network: Network,
  flask: FlaskConical,
  checklist: ListChecks,
};

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-hero py-[clamp(3rem,8vw,6rem)]">
      <Container className="grid items-center gap-12 md:grid-cols-[1.1fr_0.9fr]">
        <div className="grid justify-items-start gap-6">
          <Eyebrow>{hero.eyebrow}</Eyebrow>
          <h1 className="text-hero font-bold text-balance text-ink">
            {hero.before}
            <span className="text-brand">{hero.accent}</span>
          </h1>
          <p className="max-w-160 text-lead text-ink-2">{hero.lead}</p>
          <div className="mt-2 flex flex-wrap gap-3">
            <Button href={hero.primary.href}>
              {hero.primary.label}
              <ArrowRight aria-hidden className="size-4" />
            </Button>
            <Button href={hero.secondary.href} variant="secondary">
              {hero.secondary.label}
            </Button>
          </div>
        </div>
        <HeroEmblem />
      </Container>
    </section>
  );
}

export function About() {
  return (
    <Section id="about" aria-labelledby="about-title">
      <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
        <div className="grid justify-items-start gap-5">
          <Eyebrow>{about.eyebrow}</Eyebrow>
          <h2 id="about-title" className="text-h2 font-bold text-balance text-ink">
            {about.before}
            <span className="text-brand">{about.accent}</span>
          </h2>
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph} className="max-w-xl">
              {paragraph}
            </p>
          ))}
        </div>

        <Card interactive={false}>
          <dl className="grid gap-5">
            {about.facts.map((fact) => (
              <div key={fact.label}>
                <dt className="stc-label text-label font-medium text-muted">{fact.label}</dt>
                <dd className="mt-1 font-semibold text-ink">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Card>
      </div>
    </Section>
  );
}

export function FocusAreas() {
  const { items, ...head } = focus;
  return (
    <Section id="focus" tone="soft" aria-labelledby="focus-title">
      <SectionHead centered headingId="focus-title" {...head} />
      {/* Exactly four items, so use fixed columns (1, then 2x2, then 4 across) rather than auto-fit, which would leave a lone card. */}
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) => {
          const Icon = focusIcons[item.icon];
          return (
            <li key={item.title}>
              <Reveal delay={i * 0.08} className="h-full">
                <Card className="h-full">
                  <CardIcon>
                    <Icon aria-hidden className="size-6" strokeWidth={1.75} />
                  </CardIcon>
                  <h3 className="text-xl leading-tight font-bold text-ink">{item.title}</h3>
                  <p className="text-[0.9375rem] text-muted">{item.description}</p>
                </Card>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}

export function Events() {
  const { items, resourcesPrompt, resourcesLink, ...head } = events;
  return (
    <Section id="events" aria-labelledby="events-title">
      <SectionHead headingId="events-title" {...head} />
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(18rem,1fr))] gap-6">
        {items.map((item, i) => (
          <li key={i}>
            <Reveal delay={i * 0.08} className="h-full">
              <ItemCard {...item} />
            </Reveal>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-muted">
        {resourcesPrompt}{" "}
        <AppLink href={resourcesLink.href} className="font-medium text-brand underline-offset-4 hover:underline">
          {resourcesLink.label}
        </AppLink>
      </p>
    </Section>
  );
}
