import type { Metadata } from "next";
import { PageHeader } from "@/stc-ui/page-header";
import { resourcesHeader } from "@/synapse/content/resources";
import { HelpSection, MaterialsSection, QuizzesSection } from "@/synapse/resources/sections";

export const metadata: Metadata = {
  title: "Resources",
  description: "Revision material shared by Synapse and the quizzes we have conducted, with links to their leaderboards.",
};

/** Resources: revision material shared, quizzes conducted (each with a leaderboard link). */
export default function ResourcesPage() {
  return (
    <main id="main">
      <PageHeader {...resourcesHeader} />
      <MaterialsSection />
      <QuizzesSection />
      <HelpSection />
    </main>
  );
}
