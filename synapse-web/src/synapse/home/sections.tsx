import {
  ArrowRight,
  Brain,
  Code2,
  Cpu,
  FlaskConical,
  Landmark,
  Layers,
  ListChecks,
  MessageSquareText,
  Mic,
  Network,
  ScanEye,
  type LucideIcon,
} from "lucide-react";
import { AppLink } from "@/stc-ui/app-link";
import { Button } from "@/stc-ui/button";
import { Card, CardIcon } from "@/stc-ui/card";
import { Container } from "@/stc-ui/container";
import { Eyebrow } from "@/stc-ui/eyebrow";
import { Reveal } from "@/stc-ui/reveal";
import { Section } from "@/stc-ui/section";
import { SectionHead } from "@/stc-ui/section-head";
import { cn } from "@/lib/utils";
import { about, belonging, eventsPreview, focus, hero, type BelongingIcon, type FocusIcon } from "../content/home";
import { events } from "../content/events";
import { EmptyNote, EventGrid, splitEvents } from "../events/sections";
import { HeroEmblem } from "./hero-emblem";

const focusIcons: Record<FocusIcon, LucideIcon> = {
  cpu: Cpu,
  network: Network,
  flask: FlaskConical,
  checklist: ListChecks,
  code: Code2,
  vision: ScanEye,
  language: MessageSquareText,
  talks: Mic,
};

const belongingIcons: Record<BelongingIcon, LucideIcon> = {
  council: Landmark,
  wing: Layers,
  club: Brain,
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
      {/* Exactly eight items, so use fixed columns (1, then 2 across, then 4 across = two even rows) rather than auto-fit. */}
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) => {
          const Icon = focusIcons[item.icon];
          return (
            <li key={item.title}>
              <Reveal delay={(i % 4) * 0.08} className="h-full">
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

/** Preview of the next few upcoming events; the full list is on the Events page. */
export function Events() {
  const { limit, empty, allLink, ...head } = eventsPreview;
  const next = splitEvents(events).upcoming.slice(0, limit);
  return (
    <Section id="events" aria-labelledby="events-title">
      <SectionHead headingId="events-title" {...head} />
      {next.length > 0 ? <EventGrid items={next} status="Upcoming" /> : <EmptyNote>{empty}</EmptyNote>}
      <p className="mt-8">
        <AppLink href={allLink.href} className="inline-flex items-center gap-1.5 font-medium text-brand underline-offset-4 hover:underline">
          {allLink.label}
          <ArrowRight aria-hidden className="size-4" />
        </AppLink>
      </p>
    </Section>
  );
}

/** Last home section: why STC and TATVA exist, and how Synapse completes that vision (three short cards). */
export function Belonging() {
  const { cards, ...head } = belonging;
  return (
    <Section id="belonging" tone="soft" aria-labelledby="belonging-title">
      <SectionHead headingId="belonging-title" {...head} />
      <ul className="grid gap-6 md:grid-cols-3">
        {cards.map((card, i) => {
          const Icon = belongingIcons[card.icon];
          return (
            <li key={card.title}>
              <Reveal delay={i * 0.1} className="h-full">
                <Card
                  interactive={false}
                  className={cn("h-full gap-4 p-7", card.highlight && "border-brand-line bg-brand-tint")}
                >
                  <CardIcon className={card.highlight ? "bg-white" : undefined}>
                    <Icon aria-hidden className="size-6" strokeWidth={1.75} />
                  </CardIcon>
                  <h3 className="text-xl leading-tight font-bold text-ink">{card.title}</h3>
                  <p className="text-[0.9375rem] text-ink-2">{card.text}</p>
                </Card>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
