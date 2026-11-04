import { Button } from "@/stc-ui/button";
import { CtaBand } from "@/stc-ui/cta-band";
import { Section } from "@/stc-ui/section";
import { SectionHead } from "@/stc-ui/section-head";
import { resourceItems, resourcesHelp, resourcesList } from "../content/resources";
import { ResourceBrowser } from "./browser";

export function ResourcesList() {
  return (
    // The first section sits close under the page header (smaller top padding).
    <Section id="documents" aria-labelledby="documents-title" className="pt-8 md:pt-10">
      <SectionHead headingId="documents-title" {...resourcesList} />
      <ResourceBrowser items={resourceItems} />
    </Section>
  );
}

export function HelpSection() {
  return (
    <Section tone="soft">
      <CtaBand title={resourcesHelp.title} description={resourcesHelp.description}>
        <Button href={resourcesHelp.action.href} variant="light">
          {resourcesHelp.action.label}
        </Button>
      </CtaBand>
    </Section>
  );
}
