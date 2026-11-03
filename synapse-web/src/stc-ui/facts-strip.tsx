import { cn } from "@/lib/utils";

export interface Fact {
  label: string;
  value: string;
}

/** Event pattern borrowed from the WebWiser event page: Format / Duration / Participation / Registration. */
export function FactsStrip({ facts }: { facts: Fact[] }) {
  return (
    <dl className="grid grid-cols-2 rounded-stc-lg border border-line bg-white shadow-stc-sm md:grid-cols-4">
      {facts.map((fact, i) => (
        <div
          key={fact.label}
          className={cn(
            "border-line px-6 py-5",
            // phone: 2 columns -> left border on the right-hand cells, top border from row 2
            i % 2 === 1 && "border-l",
            i >= 2 && "border-t",
            // desktop: one row of four -> left border on every cell but the first
            "md:border-t-0",
            i > 0 ? "md:border-l" : "md:border-l-0",
          )}
        >
          <dt className="stc-label text-label font-medium text-muted">{fact.label}</dt>
          <dd className="mt-1.5 font-semibold text-ink">{fact.value}</dd>
        </div>
      ))}
    </dl>
  );
}
