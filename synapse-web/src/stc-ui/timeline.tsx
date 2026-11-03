import { Reveal } from "./reveal";

export interface Stage {
  tag: string;
  title: string;
  description: string;
}

/** Event pattern borrowed from the WebWiser event page: numbered stages, one row each. */
export function Timeline({ stages }: { stages: Stage[] }) {
  return (
    <ol className="mt-8 border-t border-line">
      {stages.map((stage, i) => (
        <li key={stage.tag} className="border-b border-line">
          <Reveal delay={i * 0.06} className="grid gap-1 px-2 py-5 md:grid-cols-[8rem_1fr_2fr] md:items-baseline md:gap-4">
            <span className="stc-label text-label font-semibold text-brand">{stage.tag}</span>
            <h3 className="text-[1.0625rem] font-semibold text-ink">{stage.title}</h3>
            <p className="text-[0.9375rem] text-muted">{stage.description}</p>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
