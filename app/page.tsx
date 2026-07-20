import { Hero } from "@/components/sections/hero";
import { TrustStrip } from "@/components/sections/trust-strip";
import { Problem } from "@/components/sections/problem";
import { Services } from "@/components/sections/services";
import { ConversionEngine } from "@/components/sections/conversion-engine";
import { Products } from "@/components/sections/products";
import { Results } from "@/components/sections/results";
import { FinalCta } from "@/components/sections/final-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Problem />
      <Services />
      <ConversionEngine />
      <Products />
      <Results />
      <FinalCta />
    </>
  );
}
