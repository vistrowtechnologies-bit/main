import type { Metadata } from "next";
import { Users, Boxes, Handshake, Repeat } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { FeatureCards } from "@/components/sections/feature-cards";
import { Steps } from "@/components/sections/steps";
import { CtaBand } from "@/components/sections/cta-band";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Agency and Technology Partnerships",
  description:
    "Partner with Vistrow for white-label digital marketing, CRM automation, AI voice agents, referrals, integrations, and custom software delivery.",
  path: "/partners",
});

const partnerTypes = [
  { icon: Users, title: "Agencies", body: "White-label our automation, CRM, and AI voice to serve more clients." },
  { icon: Boxes, title: "Technology partners", body: "Integrate your product with our systems and workflows." },
  { icon: Handshake, title: "Referral partners", body: "Refer businesses that need connected growth systems." },
  { icon: Repeat, title: "Delivery partners", body: "Extend your capacity with our marketing and product teams." },
];

const steps = [
  { title: "Introduce", body: "Tell us about your business and where we could fit." },
  { title: "Scope", body: "We define how we work together and under whose brand." },
  { title: "Enable", body: "We set up systems, training, and white-label delivery." },
  { title: "Grow", body: "We deliver together and expand the partnership over time." },
];

export default function Page() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Partners" }]}
        eyebrow="Partners"
        title="Grow further,"
        highlight="together"
        subtitle="Partner with Vistrow to deliver connected marketing and automation - white-label systems, AI voice, and custom builds your clients will value."
        primaryCta={{ label: "Become a partner", href: "/contact" }}
        secondaryCta={{ label: "Explore products", href: "/products" }}
      />
      <FeatureCards eyebrow="Ways to partner" title="How we work with partners" items={partnerTypes} columns={4} surface />
      <Steps eyebrow="Getting started" title="How a partnership begins" steps={steps} />
      <CtaBand
        title="Let's build something together."
        subtitle="Tell us about your business and clients, and we'll design a partnership that fits."
        primaryCta={{ label: "Become a partner", href: "/contact" }}
        secondaryCta={{ label: "Talk to Vistrow", href: "/contact" }}
      />
    </>
  );
}
