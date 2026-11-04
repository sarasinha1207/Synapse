import type { Metadata, Viewport } from "next";
import { Orbitron, Outfit } from "next/font/google";
import { SynapseFooter, SynapseNav } from "@/synapse/chrome";
import "./globals.css";

// Outfit = the STC family font. Orbitron = the Synapse wordmark only.
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap" });
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron", display: "swap" });

const description =
  "Synapse is the AI, ML and deep learning club of the Student Technical Council, IIT Patna. Hands-on projects, shared revision material, quizzes and events.";

export const metadata: Metadata = {
  // Pages set their own `title`; the template adds the club name after it ("Resources | Synapse").
  title: {
    default: "Synapse | AI, ML & Deep Learning Club, STC IIT Patna",
    template: "%s | Synapse",
  },
  description,
  openGraph: {
    title: "Synapse | The AI/ML Club, STC IIT Patna",
    description,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0268d0", // = --brand in src/synapse/theme.css
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // data-club selects the club theme (src/synapse/theme.css). Event pages would add data-event here.
    // data-scroll-behavior tells Next to pause our `scroll-behavior: smooth` during page changes, so a new page
    // opens at its top instead of animating from the old scroll position.
    <html
      lang="en"
      data-club="synapse"
      data-scroll-behavior="smooth"
      className={`${outfit.variable} ${orbitron.variable}`}
    >
      <body>
        {/* Reveal animations start hidden; without JavaScript, show everything. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-stc focus:bg-ink focus:px-4 focus:py-2.5 focus:text-white"
        >
          Skip to content
        </a>
        <SynapseNav />
        {children}
        <SynapseFooter />
      </body>
    </html>
  );
}
