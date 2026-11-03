import type { Metadata } from "next";
import { PageHeader } from "@/stc-ui/page-header";
import { contactHeader } from "@/synapse/content/contact";
import { ContactSection } from "@/synapse/contact/sections";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Have a doubt about AI, machine learning, a quiz or shared material? Send it to the Synapse team.",
};

/** Contact Us: a form for submitting doubts, plus other ways to reach the club. */
export default function ContactPage() {
  return (
    <main id="main">
      <PageHeader {...contactHeader} />
      <ContactSection />
    </main>
  );
}
