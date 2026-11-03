import { ArrowRight, Cpu, Layers, Network, type LucideIcon } from "lucide-react";
import { Button } from "@/stc-ui/button";
import { Card, CardIcon } from "@/stc-ui/card";
import { Container } from "@/stc-ui/container";
import { CtaBand } from "@/stc-ui/cta-band";
import { Eyebrow } from "@/stc-ui/eyebrow";
import { FactsStrip } from "@/stc-ui/facts-strip";
import { Reveal } from "@/stc-ui/reveal";
import { SectionHead } from "@/stc-ui/section-head";
import { Timeline } from "@/stc-ui/timeline";
import { about, activities, activitiesSection, featuredEvent, hero, join, type Activity } from "./content";
import { HeroEmblem } from "./hero-emblem";

const icons: Record<Activity["icon"], LucideIcon> = { cpu: Cpu, layers: Layers, network: Network };

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden bg-hero py-[clamp(3rem,8vw,6rem)]">
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
    <section id="about" className="py-(--section-y)">
      <Container className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
        <div className="grid justify-items-start gap-5">
          <Eyebrow>{about.eyebrow}</Eyebrow>
          <h2 className="text-h2 font-bold text-balance text-ink">
            {about.before}
            <span className="text-brand">{about.accent}</span>
          </h2>
          <p className="max-w-xl">{about.intro}</p>
          <p className="max-w-xl">{about.placeholder}</p>
        </div>

        <Card>
          <dl className="grid gap-5">
            {about.facts.map((fact) => (
              <div key={fact.label}>
                <dt className="stc-label text-label font-medium text-muted">{fact.label}</dt>
                <dd className="mt-1 font-semibold text-ink">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Card>
      </Container>
    </section>
  );
}

export function Activities() {
  return (
    <section id="activities" className="bg-soft py-(--section-y)">
      <Container>
        <SectionHead centered {...activitiesSection} />
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-6">
          {activities.map((activity, i) => {
            const Icon = icons[activity.icon];
            return (
              <li key={activity.title}>
                <Reveal delay={i * 0.08} className="h-full">
                  <Card className="h-full">
                    <CardIcon>
                      <Icon aria-hidden className="size-6" strokeWidth={1.75} />
                    </CardIcon>
                    <h3 className="text-xl leading-tight font-bold text-ink">{activity.title}</h3>
                    <p className="text-[0.9375rem] text-muted">{activity.description}</p>
                  </Card>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

/** PLACEHOLDER content (see content.ts). This block is the reusable event pattern. */
export function FeaturedEvent() {
  const { facts, stages, ...head } = featuredEvent;
  return (
    <section id="events" className="py-(--section-y)">
      <Container>
        <SectionHead {...head} />
        <FactsStrip facts={facts} />
        <Timeline stages={stages} />
      </Container>
    </section>
  );
}

export function Join() {
  return (
    <section id="join" className="bg-soft py-(--section-y)">
      <Container>
        <CtaBand title={join.title} description={join.description}>
          <Button href={join.primary.href} variant="light">
            {join.primary.label}
          </Button>
          <Button href={join.secondary.href} variant="outlineLight">
            {join.secondary.label}
          </Button>
        </CtaBand>
      </Container>
    </section>
  );
}
