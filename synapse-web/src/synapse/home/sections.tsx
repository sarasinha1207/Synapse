import {
  ArrowRight,
  Briefcase,
  Cpu,
  FlaskConical,
  Landmark,
  Layers,
  ListChecks,
  Mail,
  Network,
  Rocket,
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
import { about, belonging, eventsPreview, focus, hero, type FocusIcon } from "../content/home";
import { events } from "../content/events";
import { reach } from "../content/site";
import { EmptyNote, EventGrid, splitEvents } from "../events/sections";
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

/** Last home section: Synapse sits inside the TATVA wing of STC. One card about STC, one about TATVA. */
export function Belonging() {
  const { stc, tatva, ...head } = belonging;
  const wingIcons = [Briefcase, Rocket, FlaskConical];
  return (
    <Section id="belonging" tone="soft" aria-labelledby="belonging-title">
      <SectionHead headingId="belonging-title" {...head} />
      <div className="grid gap-6 md:grid-cols-2">
        <Reveal className="h-full">
          <Card interactive={false} className="flex h-full flex-col gap-5 p-6 md:p-8">
            <div className="flex items-center gap-3">
              <CardIcon>
                <Landmark aria-hidden className="size-6" strokeWidth={1.75} />
              </CardIcon>
              <div>
                <h3 className="text-xl leading-tight font-bold text-ink">{stc.title}</h3>
                <p className="text-sm text-muted">{stc.subtitle}</p>
              </div>
            </div>
            <p className="text-[0.9375rem] text-ink-2">{stc.text}</p>
            <dl className="flex gap-8">
              {stc.stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block text-3xl leading-none font-bold text-brand">{stat.value}</span>
                    <span className="stc-label text-label font-medium text-muted">{stat.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
            <ul className="grid gap-3">
              {stc.wings.map((wing, i) => {
                const Icon = wingIcons[i % wingIcons.length];
                return (
                  <li
                    key={wing.name}
                    className={cn(
                      "flex items-start gap-3 rounded-stc border p-3",
                      wing.current ? "border-brand-line bg-brand-tint" : "border-line bg-white",
                    )}
                  >
                    <Icon aria-hidden className="mt-0.5 size-5 flex-none text-brand" />
                    <span className="text-[0.9375rem]">
                      <strong className="font-semibold text-ink">{wing.name}</strong>
                      {wing.current ? <span className="font-medium text-brand"> (our wing)</span> : null}
                      <span className="block text-muted">{wing.role}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
            <Button href={stc.action.href} external variant="secondary" className="mt-auto self-start">
              {stc.action.label}
              <span className="sr-only"> (opens in a new tab)</span>
            </Button>
          </Card>
        </Reveal>

        <Reveal delay={0.1} className="h-full">
          <Card interactive={false} className="flex h-full flex-col gap-5 p-6 md:p-8">
            <div className="flex items-center gap-3">
              <CardIcon>
                <Layers aria-hidden className="size-6" strokeWidth={1.75} />
              </CardIcon>
              <div>
                <h3 className="text-xl leading-tight font-bold text-ink">{tatva.title}</h3>
                <p className="text-sm text-muted">{tatva.subtitle}</p>
              </div>
            </div>
            <p className="text-[0.9375rem] text-ink-2">{tatva.text}</p>
            <div>
              <h4 className="stc-label mb-2 text-label font-medium text-muted">{tatva.domainsTitle}</h4>
              <ul className="grid gap-1.5 text-[0.9375rem] text-ink-2">
                {tatva.domains.map((domain) => (
                  <li key={domain} className="flex items-start gap-2">
                    <Cpu aria-hidden className="mt-1 size-4 flex-none text-brand" />
                    {domain}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="stc-label mb-2 text-label font-medium text-muted">{tatva.clubsTitle}</h4>
              <ul className="flex flex-wrap gap-2">
                {tatva.clubs.map((club) => (
                  <li
                    key={club.name}
                    className={cn(
                      "rounded-full border px-3 py-1 text-sm font-medium",
                      club.current ? "border-brand bg-brand text-on-brand" : "border-field bg-white text-ink-2",
                    )}
                  >
                    {club.name}
                    {club.current ? <span className="sr-only"> (this club)</span> : null}
                  </li>
                ))}
              </ul>
            </div>
            <p className="flex items-center gap-2 text-[0.9375rem]">
              <Mail aria-hidden className="size-4 flex-none text-brand" />
              <a href={`mailto:${reach.emails[0].email}`} className="font-medium text-ink hover:text-brand hover:underline">
                {reach.emails[0].email}
              </a>
            </p>
            <Button href={tatva.action.href} external variant="secondary" className="mt-auto self-start">
              {tatva.action.label}
              <span className="sr-only"> (opens in a new tab)</span>
            </Button>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}
