import { Hero } from "@/components/sections/hero";
import { TrustStrip } from "@/components/sections/trust-strip";
import { Problem } from "@/components/sections/problem";
import { Services } from "@/components/sections/services";
import { ConversionEngine } from "@/components/sections/conversion-engine";
import { Products } from "@/components/sections/products";
import { Results } from "@/components/sections/results";
import { FinalCta } from "@/components/sections/final-cta";
import { HomeSearchIntro } from "@/components/sections/home-search-intro";
import { JsonLd } from "@/components/seo/json-ld";
import { graph, organizationSchema } from "@/lib/structured-data";

export default function HomePage() {
  return (
    <>
      <JsonLd data={graph([organizationSchema])} />
      <Hero />
      <TrustStrip />
      <HomeSearchIntro />
      <Problem />
      <Services />
      <ConversionEngine />
      <Products />
      <Results />
      <FinalCta />
    </>
  );
}
