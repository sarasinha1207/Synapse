import { CalendarDays, Clock, Info, Mic, MonitorPlay } from "lucide-react";
import { Card } from "./card";
import { InfoRow } from "./info-row";

export interface EventCardProps {
  /** The event heading. */
  title: string;
  about: string;
  speaker: string;
  /** Already formatted, e.g. "15 Dec 2026". */
  date: string;
  /** Already formatted, e.g. "6:00 PM IST". */
  time: string;
  platform: string;
  status: "Upcoming" | "Past";
  /** Marks draft content. Remove the flag when the event is real. */
  sample?: boolean;
}

/** A webinar or event: heading, then About, Speaker, Date, Time and Platform, each with its own icon. */
export function EventCard({ title, about, speaker, date, time, platform, status, sample }: EventCardProps) {
  return (
    <Card className="flex h-full flex-col gap-6 p-7 md:p-8">
      <div className="grid gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="stc-label rounded-full bg-brand-tint px-3 py-1.5 text-label font-semibold text-brand">{status}</span>
          {sample ? (
            <span className="stc-label rounded-full border border-field px-3 py-1.5 text-label font-medium text-muted">Sample</span>
          ) : null}
        </div>
        <h3 className="text-xl leading-snug font-bold text-ink">{title}</h3>
      </div>
      <dl className="grid gap-5 border-t border-line pt-6">
        <InfoRow icon={Info} label="About">
          <span className="font-normal text-ink-2">{about}</span>
        </InfoRow>
        <InfoRow icon={Mic} label="Speaker">
          {speaker}
        </InfoRow>
        <InfoRow icon={CalendarDays} label="Date">
          {date}
        </InfoRow>
        <InfoRow icon={Clock} label="Time">
          {time}
        </InfoRow>
        <InfoRow icon={MonitorPlay} label="Platform">
          {platform}
        </InfoRow>
      </dl>
    </Card>
  );
}
