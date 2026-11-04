import {
  ArrowRight,
  BookOpen,
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
import { CardGrid } from "@/stc-ui/card-grid";
import { Container } from "@/stc-ui/container";
import { Eyebrow } from "@/stc-ui/eyebrow";
import { InfoRow } from "@/stc-ui/info-row";
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

const highlightIcons: Record<"flask" | "book" | "talks", LucideIcon> = { flask: FlaskConical, book: BookOpen, talks: Mic };
const factIcons: LucideIcon[] = [Landmark, Layers, Brain];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-hero py-[clamp(3.5rem,7vw,6.5rem)]">
      {/* A faint dot grid that fades out downwards, for depth behind the content. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-60 [background-image:radial-gradient(var(--brand-line)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:linear-gradient(to_bottom,black,transparent_80%)]"
      />
      <Container className="grid items-center gap-16 md:grid-cols-[1.15fr_0.85fr] lg:gap-20">
        <div className="grid justify-items-start gap-6">
          <Eyebrow>{hero.eyebrow}</Eyebrow>
          <h1 className="text-hero font-bold text-balance text-ink">
            {hero.before}
            <span className="text-brand">{hero.accent}</span>
          </h1>
          <p className="max-w-xl text-lead text-ink-2">{hero.lead}</p>
          <div className="flex flex-wrap gap-3">
            <Button href={hero.primary.href}>
              {hero.primary.label}
              <ArrowRight aria-hidden className="size-4" />
            </Button>
            <Button href={hero.secondary.href} variant="secondary">
              {hero.secondary.label}
            </Button>
          </div>
          <ul className="mt-2 flex w-full max-w-xl flex-wrap gap-x-7 gap-y-3 border-t border-line pt-6">
            {hero.highlights.map((item) => {
              const Icon = highlightIcons[item.icon];
              return (
                <li key={item.label} className="flex items-center gap-2.5 text-sm font-medium text-ink-2">
                  <span className="grid size-8 place-items-center rounded-stc bg-brand-tint text-brand">
                    <Icon aria-hidden className="size-4" />
                  </span>
                  {item.label}
                </li>
              );
            })}
          </ul>
        </div>
        <HeroEmblem />
      </Container>
    </section>
  );
}

export function About() {
  return (
    <Section id="about" aria-labelledby="about-title">
      <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div className="grid justify-items-start gap-5">
          <Eyebrow>{about.eyebrow}</Eyebrow>
          <h2 id="about-title" className="text-h2 font-bold text-balance text-ink">
            {about.before}
            <span className="text-brand">{about.accent}</span>
          </h2>
          {/* The first paragraph is the lead: larger and darker than the supporting one. */}
          <p className="max-w-xl text-lead text-ink">{about.paragraphs[0]}</p>
          {about.paragraphs.slice(1).map((paragraph) => (
            <p key={paragraph} className="max-w-xl">
              {paragraph}
            </p>
          ))}
        </div>

        <Card interactive={false} className="gap-0 overflow-hidden p-0">
          <p className="stc-label border-b border-line bg-soft px-6 py-4 text-label font-semibold text-muted">
            {about.factsTitle}
          </p>
          <dl className="divide-y divide-line">
            {about.facts.map((fact, i) => (
              <div key={fact.label} className="px-6 py-5">
                <InfoRow icon={factIcons[i % factIcons.length]} label={fact.label}>
                  {fact.value}
                </InfoRow>
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
      {/* Eight items, four across on a wide screen = two even rows. */}
      <CardGrid columns={4}>
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
      </CardGrid>
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
      <p className="mt-8 text-center">
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
      <CardGrid>
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
      </CardGrid>
    </Section>
  );
}
