import { CalendarDays, Download, Eye, File, FileText, Tag, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
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
  /** Google Drive (or other) link that opens the document in a new tab. Leave out until it exists: the View button is then disabled. */
  viewHref?: string;
  /** Path of the file in this site's public/resources folder, for example "/resources/Roadmap.pdf". */
  downloadHref: string;
  /** Optional: only quizzes normally have one. */
  leaderboardHref?: string;
  sample?: boolean;
}

const actionClass = "min-w-28 flex-1 justify-center";

/**
 * A shared document: heading, then file name, category and date shown as icons (no captions), then the
 * View and Download buttons. View is always a button; with no link yet it is dimmed and does nothing.
 */
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
    <Card className="flex h-full flex-col gap-5 p-5">
      <div className="flex items-start gap-3.5">
        <span className="grid size-11 flex-none place-items-center rounded-stc bg-brand-tint text-brand">
          <FileText aria-hidden className="size-6" strokeWidth={1.75} />
        </span>
        <div className="grid min-w-0 gap-2">
          {sample ? (
            <span className="stc-label w-fit rounded-full border border-field px-3 py-1 text-label font-medium text-muted">
              Sample
            </span>
          ) : null}
          <h3 className="text-lg leading-snug font-bold text-ink">{title}</h3>
        </div>
      </div>

      {/* Icons only: the captions (Document, Category, Provided on) are still read aloud by screen readers. */}
      <dl className="grid gap-3.5 border-t border-line pt-5">
        <InfoRow icon={File} label="Document" iconOnly>
          {/* Offer a line-break point after each underscore so long names wrap between words, not mid-word. */}
          {fileName.split("_").map((part, i, all) => (
            <span key={i}>
              {part}
              {i < all.length - 1 ? (
                <>
                  _<wbr />
                </>
              ) : null}
            </span>
          ))}
        </InfoRow>
        <InfoRow icon={Tag} label="Category" iconOnly>
          <span className="stc-label inline-block rounded-full bg-brand-tint px-3 py-1 text-label font-semibold text-brand">
            {categoryLabel}
          </span>
        </InfoRow>
        <InfoRow icon={CalendarDays} label="Provided on" iconOnly>
          {dateLabel}
        </InfoRow>
      </dl>

      <div className="mt-auto flex flex-wrap gap-2.5 border-t border-line pt-5">
        {viewHref ? (
          <Button href={viewHref} external variant="secondary" className={actionClass}>
            <Eye aria-hidden className="size-4" />
            View
            <span className="sr-only"> {fileName} (opens in a new tab)</span>
          </Button>
        ) : (
          // No link yet: still a button, but dimmed and not functional.
          <button
            type="button"
            disabled
            className={cn(
              buttonVariants({ variant: "secondary" }),
              actionClass,
              "cursor-not-allowed opacity-50 hover:border-line hover:bg-white",
            )}
          >
            <Eye aria-hidden className="size-4" />
            View
            <span className="sr-only"> {fileName} (no link available yet)</span>
          </button>
        )}
        {/* A plain anchor, not a router link: it must download the file, not navigate to it. */}
        <a href={downloadHref} download={fileName} className={cn(buttonVariants(), actionClass)}>
          <Download aria-hidden className="size-4" />
          Download
          <span className="sr-only"> {fileName}</span>
        </a>
        {leaderboardHref ? (
          <Button href={leaderboardHref} external variant="secondary" className={actionClass}>
            <Trophy aria-hidden className="size-4" />
            Leaderboard
            <span className="sr-only"> (opens in a new tab)</span>
          </Button>
        ) : null}
      </div>
    </Card>
  );
}
