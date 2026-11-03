import { Button } from "@/stc-ui/button";
import { CtaBand } from "@/stc-ui/cta-band";
import { ActionLink, ItemCard, type ItemCardProps } from "@/stc-ui/item-card";
import { Reveal } from "@/stc-ui/reveal";
import { Section } from "@/stc-ui/section";
import { SectionHead } from "@/stc-ui/section-head";
import { materials, quizzes, resourcesHelp } from "../content/resources";

/** A responsive grid of cards. Items can repeat titles (samples do), so the list index is the key. */
function ItemGrid({ items }: { items: ItemCardProps[] }) {
  return (
    <ul className="grid grid-cols-[repeat(auto-fit,minmax(18rem,1fr))] gap-6">
      {items.map((item, i) => (
        <li key={i}>
          <Reveal delay={(i % 3) * 0.08} className="h-full">
            <ItemCard {...item} />
          </Reveal>
        </li>
      ))}
    </ul>
  );
}

/** Section 1: revision material shared. Each item and the section itself can link to a leaderboard. */
export function MaterialsSection() {
  const { items, leaderboard, ...head } = materials;
  return (
    <Section id="materials" aria-labelledby="materials-title">
      <SectionHead headingId="materials-title" action={<ActionLink action={leaderboard} />} {...head} />
      <ItemGrid items={items} />
    </Section>
  );
}

/** Section 2: quizzes conducted. Each quiz links to its leaderboard. */
export function QuizzesSection() {
  const { items, leaderboard, ...head } = quizzes;
  return (
    <Section id="quizzes" tone="soft" aria-labelledby="quizzes-title">
      <SectionHead headingId="quizzes-title" action={<ActionLink action={leaderboard} />} {...head} />
      <ItemGrid items={items} />
    </Section>
  );
}

export function HelpSection() {
  return (
    <Section>
      <CtaBand title={resourcesHelp.title} description={resourcesHelp.description}>
        <Button href={resourcesHelp.action.href} variant="light">
          {resourcesHelp.action.label}
        </Button>
      </CtaBand>
    </Section>
  );
}
