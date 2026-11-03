import type { Metadata, Viewport } from "next";
import { Michroma, Outfit } from "next/font/google";
import "./globals.css";

// Outfit = the STC family font. Michroma = the Synapse wordmark only.
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap" });
const michroma = Michroma({ subsets: ["latin"], weight: "400", variable: "--font-michroma", display: "swap" });

const description =
  "Synapse is the AI, ML and deep learning club of the Student Technical Council, IIT Patna. Hands-on projects, research and events.";

export const metadata: Metadata = {
  title: "Synapse | AI, ML & Deep Learning Club, STC IIT Patna",
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
    <html lang="en" data-club="synapse" className={`${outfit.variable} ${michroma.variable}`}>
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
        {children}
      </body>
    </html>
  );
}
