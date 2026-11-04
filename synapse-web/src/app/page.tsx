import { About, Belonging, Events, FocusAreas, Hero } from "@/synapse/home/sections";

// The Events preview depends on the clock, so rebuild this page at most once an hour.
export const revalidate = 3600;

/** Home: hero, About, Key focus areas, Events preview, and where Synapse sits inside TATVA and STC. */
export default function Home() {
  return (
    <main id="main">
      <Hero />
      <About />
      <FocusAreas />
      <Events />
      <Belonging />
    </main>
  );
}
