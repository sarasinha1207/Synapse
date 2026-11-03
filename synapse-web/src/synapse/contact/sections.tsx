import { Mail, MapPin } from "lucide-react";
import { AppLink } from "@/stc-ui/app-link";
import { Card } from "@/stc-ui/card";
import { Section } from "@/stc-ui/section";
import { contactAside, doubtForm } from "../content/contact";
import { reach } from "../content/site";
import { DoubtForm } from "./doubt-form";

/** The doubt form on the left, other ways to reach the club on the right (stacked on phones). */
export function ContactSection() {
  return (
    <Section id="doubts" aria-labelledby="doubt-form-title">
      <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-start">
        <Card interactive={false} className="gap-6 p-6 md:p-8">
          <h2 id="doubt-form-title" className="text-2xl font-bold text-ink">
            {doubtForm.title}
          </h2>
          <DoubtForm />
        </Card>

        <Card interactive={false} className="gap-5">
          <h2 className="text-xl font-bold text-ink">{contactAside.title}</h2>
          <ul className="grid gap-4 text-[0.9375rem]">
            {reach.emails.map(({ label, email }) => (
              <li key={email} className="flex gap-3">
                <Mail aria-hidden className="mt-0.5 size-5 flex-none text-brand" />
                <span>
                  <a href={`mailto:${email}`} className="font-medium text-ink hover:text-brand hover:underline">
                    {email}
                  </a>
                  <span className="block text-sm text-muted">{label}</span>
                </span>
              </li>
            ))}
            <li className="flex gap-3">
              <MapPin aria-hidden className="mt-0.5 size-5 flex-none text-brand" />
              <span className="text-ink-2">{reach.address}</span>
            </li>
          </ul>
          <hr className="border-line" />
          <p className="text-[0.9375rem] text-muted">
            {contactAside.beforeAsking.text}{" "}
            <AppLink
              href={contactAside.beforeAsking.link.href}
              className="font-medium text-brand underline-offset-4 hover:underline"
            >
              {contactAside.beforeAsking.link.label}
            </AppLink>
          </p>
        </Card>
      </div>
    </Section>
  );
}
