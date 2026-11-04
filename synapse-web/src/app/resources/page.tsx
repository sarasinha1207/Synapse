import type { Metadata } from "next";
import { PageHeader } from "@/stc-ui/page-header";
import { resourcesHeader } from "@/synapse/content/resources";
import { HelpSection, ResourcesList } from "@/synapse/resources/sections";

export const metadata: Metadata = {
  title: "Resources",
  description: "Study material, revision guides, quizzes, roadmaps and cheat sheets shared by Synapse. View online or download.",
};

/** Resources: one filterable list of shared documents. */
export default function ResourcesPage() {
  return (
    <main id="main">
      <PageHeader {...resourcesHeader} />
      <ResourcesList />
      <HelpSection />
    </main>
  );
}
