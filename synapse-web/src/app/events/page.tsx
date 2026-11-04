import type { Metadata } from "next";
import { PageHeader } from "@/stc-ui/page-header";
import { eventsHeader } from "@/synapse/content/events";
import { EventsSections } from "@/synapse/events/sections";

export const metadata: Metadata = {
  title: "Events",
  description: "Webinars and events organised by Synapse, past and upcoming: speakers, dates, times and platforms.",
};

// Whether an event is "upcoming" or "past" depends on the clock, so rebuild this page at most once an hour.
export const revalidate = 3600;

/** Events: upcoming and past webinars. */
export default function EventsPage() {
  return (
    <main id="main">
      <PageHeader {...eventsHeader} />
      <EventsSections />
    </main>
  );
}
