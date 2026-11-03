import { About, Events, FocusAreas, Hero } from "@/synapse/home/sections";

/** Home: hero, About, Key focus areas, Events. */
export default function Home() {
  return (
    <main id="main">
      <Hero />
      <About />
      <FocusAreas />
      <Events />
    </main>
  );
}
