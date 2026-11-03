import { SynapseFooter, SynapseNav } from "@/synapse/chrome";
import { About, Activities, FeaturedEvent, Hero, Join } from "@/synapse/sections";

export default function Home() {
  return (
    <>
      <SynapseNav />
      <main id="main">
        <Hero />
        <About />
        <Activities />
        <FeaturedEvent />
        <Join />
      </main>
      <SynapseFooter />
    </>
  );
}
