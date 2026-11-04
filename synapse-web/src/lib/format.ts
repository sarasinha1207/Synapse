/** Date and time formatting shared by the Events and Resources pages. All times are shown in India time. */

const TIME_ZONE = "Asia/Kolkata";

/** "15 Dec 2026" from a full timestamp such as "2026-12-15T18:00:00+05:30". */
export function formatEventDate(iso: string): string {
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: TIME_ZONE }).format(new Date(iso));
}

/** "6:00 PM IST" from a full timestamp. */
export function formatEventTime(iso: string): string {
  const time = new Intl.DateTimeFormat("en-IN", { hour: "numeric", minute: "2-digit", hour12: true, timeZone: TIME_ZONE }).format(new Date(iso));
  return `${time.toUpperCase()} IST`;
}

/** "14 Oct 2026" from a plain date such as "2026-10-14". Fixed to UTC so server and browser always agree. */
export function formatPlainDate(isoDate: string): string {
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(isoDate));
}

/** An event counts as upcoming until 3 hours after it starts, so it does not flip to "Past" the minute it begins. */
const GRACE_MS = 3 * 60 * 60 * 1000;

export function isUpcoming(startsAt: string, now: Date = new Date()): boolean {
  return new Date(startsAt).getTime() + GRACE_MS > now.getTime();
}
