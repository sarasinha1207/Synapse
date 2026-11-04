import { CalendarX } from "lucide-react";
import { Card } from "@/stc-ui/card";
import { CardGrid } from "@/stc-ui/card-grid";
import { EventCard } from "@/stc-ui/event-card";
import { Reveal } from "@/stc-ui/reveal";
import { Section } from "@/stc-ui/section";
import { SectionHead } from "@/stc-ui/section-head";
import { formatEventDate, formatEventTime, isUpcoming } from "@/lib/format";
import { events, eventsSections, type EventItem } from "../content/events";

/** Upcoming events (soonest first) and past events (most recent first), worked out from `startsAt` and the current time. */
export function splitEvents(items: EventItem[], now: Date = new Date()) {
  const time = (event: EventItem) => new Date(event.startsAt).getTime();
  return {
    upcoming: items.filter((e) => isUpcoming(e.startsAt, now)).sort((a, b) => time(a) - time(b)),
    past: items.filter((e) => !isUpcoming(e.startsAt, now)).sort((a, b) => time(b) - time(a)),
  };
}

/** One card per event. Events can repeat headings (samples do), so the list index is part of the key. */
export function EventGrid({ items, status }: { items: EventItem[]; status: "Upcoming" | "Past" }) {
  return (
    <CardGrid>
      {items.map((event, i) => (
        <li key={`${event.startsAt}-${i}`}>
          <Reveal delay={(i % 3) * 0.08} className="h-full">
            <EventCard
              title={event.title}
              about={event.about}
              speaker={event.speaker}
              date={formatEventDate(event.startsAt)}
              time={formatEventTime(event.startsAt)}
              platform={event.platform}
              status={status}
              sample={event.sample}
            />
          </Reveal>
        </li>
      ))}
    </CardGrid>
  );
}

export function EmptyNote({ children }: { children: string }) {
  return (
    <Card interactive={false} className="mx-auto flex max-w-xl items-center justify-center gap-3 text-center text-muted">
      <CalendarX aria-hidden className="size-5 flex-none text-brand" />
      {children}
    </Card>
  );
}

export function EventsSections() {
  const { upcoming, past } = splitEvents(events);
  const { upcoming: up, past: pa } = eventsSections;
  return (
    <>
      {/* The first section sits close under the page header (smaller top padding). */}
      <Section id="upcoming" aria-labelledby="upcoming-title" className="pt-8 md:pt-10">
        <SectionHead headingId="upcoming-title" eyebrow={up.eyebrow} before={up.before} accent={up.accent} description={up.description} />
        {upcoming.length > 0 ? <EventGrid items={upcoming} status="Upcoming" /> : <EmptyNote>{up.empty}</EmptyNote>}
      </Section>
      <Section id="past" tone="soft" aria-labelledby="past-title">
        <SectionHead headingId="past-title" eyebrow={pa.eyebrow} before={pa.before} accent={pa.accent} description={pa.description} />
        {past.length > 0 ? <EventGrid items={past} status="Past" /> : <EmptyNote>{pa.empty}</EmptyNote>}
      </Section>
    </>
  );
}
