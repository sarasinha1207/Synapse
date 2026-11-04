/**
 * Events page data: every webinar or event, past and upcoming.
 *
 * HOW TO ADD AN EVENT
 *  1. Copy an entry, change the text.
 *  2. `startsAt` is the start date and time in India time: "YYYY-MM-DDTHH:MM:00+05:30".
 *     The card shows the date and the time ("6:00 PM IST") from it.
 *  3. Delete `sample: true` (that removes the "Sample" tag).
 *  Order in this file does not matter: the page puts upcoming events first (soonest first) and
 *  past events after (most recent first). An event moves to "Past" 3 hours after it starts.
 */

export interface EventItem {
  /** Event heading. */
  title: string;
  about: string;
  speaker: string;
  startsAt: string;
  platform: string;
  sample?: boolean;
}

export const eventsHeader = {
  eyebrow: "Events",
  before: "Webinars and events, ",
  accent: "past and upcoming",
  lead: "Everything Synapse has organised, and what is coming next: speakers, dates, timings and where to join.",
};

export const eventsSections = {
  upcoming: {
    eyebrow: "Coming up",
    before: "Upcoming ",
    accent: "events",
    description: "Mark your calendar. Joining details are shared here and with members.",
    empty: "No upcoming events right now. Check back soon, or follow STC for announcements.",
  },
  past: {
    eyebrow: "Archive",
    before: "Past ",
    accent: "events",
    description: "Webinars and events we have already run.",
    empty: "No past events yet.",
  },
};

// PLACEHOLDER: all three are sample entries (they show a "Sample" tag). Replace with the real events.
export const events: EventItem[] = [
  {
    title: "Event heading",
    about: "One or two sentences on what the event covers and who should attend.",
    speaker: "Speaker name, designation",
    startsAt: "2026-12-15T18:00:00+05:30",
    platform: "Google Meet",
    sample: true,
  },
  {
    title: "Event heading",
    about: "A short summary of what was covered in this session.",
    speaker: "Speaker name, designation",
    startsAt: "2026-10-10T17:00:00+05:30",
    platform: "Zoom",
    sample: true,
  },
  {
    title: "Event heading",
    about: "A short summary of what was covered in this session.",
    speaker: "Speaker name, designation",
    startsAt: "2026-09-20T16:30:00+05:30",
    platform: "Microsoft Teams",
    sample: true,
  },
];
