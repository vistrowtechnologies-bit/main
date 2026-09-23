import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { ClientDiscoveryForm } from "@/components/forms/client-discovery-form";
import { buildMetadata } from "@/lib/seo";

// Not linked from primary navigation - this is sent directly to a qualified
// lead alongside the Stage 1 reply, per the Client Onboarding SOP.
export const metadata: Metadata = buildMetadata({
  title: "Client Discovery Questionnaire",
  description: "A short questionnaire Vistrow uses to understand your business before the first call.",
  path: "/client-discovery",
});

export default function Page() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Client Discovery" }]}
        eyebrow="Before we talk"
        title="Help us understand your"
        highlight="business"
        subtitle="Ten quick questions - about two minutes. It means our first call goes straight into strategy instead of starting from scratch."
        primaryCta={{ label: "Start", href: "#discovery-form" }}
        secondaryCta={{ label: "Talk to us instead", href: "/contact" }}
      />
      <section id="discovery-form" className="py-section">
        <div className="container-edge">
          <div className="mx-auto max-w-3xl">
            <ClientDiscoveryForm />
          </div>
        </div>
      </section>
    </>
  );
}
