import type { ReactNode } from "react";
import { AppLink } from "./app-link";
import { Container } from "./container";

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export interface FooterContact {
  title: string;
  lines: { text: string; href?: string; note?: string }[];
}

interface SiteFooterProps {
  /** Usually <BrandGroup onDark>. */
  brand: ReactNode;
  blurb: string;
  columns: FooterColumn[];
  contact: FooterContact;
  legal: string;
}

const linkClass = "hover:text-white hover:underline focus-visible:outline-white";

/** Dark navy, four columns, as on stciitphybrid.in: brand + blurb, link columns, contact, legal line. */
export function SiteFooter({ brand, blurb, columns, contact, legal }: SiteFooterProps) {
  return (
    <footer className="bg-ink pt-14 pb-8 text-on-dark-muted">
      <Container>
        <div className="grid grid-cols-1 gap-10 min-[32rem]:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.4fr]">
          <div className="col-span-full grid content-start gap-4 lg:col-span-1">
            {brand}
            <p className="max-w-sm text-sm">{blurb}</p>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h2 className="mb-3.5 text-lg font-semibold text-white">{column.title}</h2>
              <ul className="grid gap-2 text-sm">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <AppLink href={link.href} className={linkClass}>
                      {link.label}
                    </AppLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h2 className="mb-3.5 text-lg font-semibold text-white">{contact.title}</h2>
            <ul className="grid gap-2 text-sm">
              {contact.lines.map((line) => (
                <li key={line.text}>
                  {line.href ? (
                    <a href={line.href} className={linkClass}>
                      {line.text}
                    </a>
                  ) : (
                    line.text
                  )}
                  {line.note ? ` (${line.note})` : null}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-10 border-t border-white/12 pt-6 text-sm">{legal}</p>
      </Container>
    </footer>
  );
}
