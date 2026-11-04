import { CalendarDays, Download, Eye, File, FileText, Tag, Trophy } from "lucide-react";
import { Button, buttonVariants } from "./button";
import { Card } from "./card";
import { InfoRow } from "./info-row";

export interface ResourceCardProps {
  /** Heading of the document. */
  title: string;
  /** Full file name, for example "Roadmap.pdf". Also the name the downloaded file gets. */
  fileName: string;
  categoryLabel: string;
  /** Already formatted, e.g. "14 Oct 2026". */
  dateLabel: string;
  /** Google Drive (or other) link that opens the document in a new tab. Leave out until it exists. */
  viewHref?: string;
  /** Path of the file in this site's public/resources folder, for example "/resources/Roadmap.pdf". */
  downloadHref: string;
  /** Optional: only quizzes normally have one. */
  leaderboardHref?: string;
  sample?: boolean;
}

/** A shared document: heading, file name, category and date, then View and Download buttons. */
export function ResourceCard({
  title,
  fileName,
  categoryLabel,
  dateLabel,
  viewHref,
  downloadHref,
  leaderboardHref,
  sample,
}: ResourceCardProps) {
  return (
    <Card className="flex h-full flex-col gap-4">
      <div className="flex items-start gap-3">
        <span className="grid size-11 flex-none place-items-center rounded-stc bg-brand-tint text-brand">
          <FileText aria-hidden className="size-6" strokeWidth={1.75} />
        </span>
        <div className="min-w-0">
          {sample ? (
            <span className="stc-label mb-1.5 inline-block rounded-full border border-field px-2.5 py-1 text-label font-medium text-muted">
              Sample
            </span>
          ) : null}
          <h3 className="text-xl leading-tight font-bold text-ink">{title}</h3>
        </div>
      </div>

      <dl className="grid gap-3.5">
        <InfoRow icon={File} label="Document">
          {fileName}
        </InfoRow>
        <InfoRow icon={Tag} label="Category">
          <span className="stc-label inline-block rounded-full bg-brand-tint px-2.5 py-1 text-label font-semibold text-brand">
            {categoryLabel}
          </span>
        </InfoRow>
        <InfoRow icon={CalendarDays} label="Provided on">
          {dateLabel}
        </InfoRow>
      </dl>

      <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-2 pt-2">
        {viewHref ? (
          <Button href={viewHref} external size="sm" variant="secondary">
            <Eye aria-hidden className="size-4" />
            View
            <span className="sr-only"> {fileName} (opens in a new tab)</span>
          </Button>
        ) : (
          <span className="inline-flex items-center gap-2 text-sm text-muted">
            <Eye aria-hidden className="size-4" />
            View: link coming soon
          </span>
        )}
        {/* A plain anchor, not a router link: it must download the file, not navigate to it. */}
        <a href={downloadHref} download={fileName} className={buttonVariants({ size: "sm" })}>
          <Download aria-hidden className="size-4" />
          Download
          <span className="sr-only"> {fileName}</span>
        </a>
        {leaderboardHref ? (
          <Button href={leaderboardHref} external size="sm" variant="secondary">
            <Trophy aria-hidden className="size-4" />
            Leaderboard
            <span className="sr-only"> (opens in a new tab)</span>
          </Button>
        ) : null}
      </div>
    </Card>
  );
}
