import type { Metadata } from "next";
import { Compass, ShieldCheck, LineChart, Layers } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { FeatureCards } from "@/components/sections/feature-cards";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "About Vistrow",
  description:
    "Vistrow is a digital-marketing-first technology company connecting marketing to the CRM, AI voice, and automation systems that convert.",
};

const values = [
  { icon: LineChart, title: "Outcomes over activity", body: "We optimise for pipeline and revenue, not vanity metrics." },
  { icon: Layers, title: "Connected by design", body: "Marketing works better when the system behind it is joined up." },
  { icon: ShieldCheck, title: "Honest and clear", body: "No fake guarantees. Realistic targets and straight answers." },
  { icon: Compass, title: "Built to scale", body: "Systems and tooling that grow with your business." },
];

export default function Page() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "About" }]}
        eyebrow="About Vistrow"
        title="A digital-marketing-first"
        highlight="technology company"
        subtitle="Vistrow helps businesses generate demand and then convert it - by connecting marketing to CRM, AI voice, automation, and the tracking that ties it all to revenue."
        secondaryCta={{ label: "Our approach", href: "/approach" }}
      />

      <section className="py-section">
        <div className="container-edge grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading eyebrow="Why we exist" title="Marketing shouldn't stop at the click." />
          <Reveal>
            <div className="space-y-5 font-sans text-lg leading-relaxed text-muted">
              <p>
                Most businesses can generate attention. The harder problem is what happens
                next - slow responses, disconnected CRMs, missed follow-ups, and no clear link
                between marketing and revenue.
              </p>
              <p>
                Vistrow was built to close that gap. We combine performance marketing with the
                systems that manage and convert opportunities: CRM, AI voice calling,
                automation, and conversion tracking - working as one engine.
              </p>
              <p>
                The result is marketing that connects directly to business growth, with the
                infrastructure to prove and improve it.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <FeatureCards eyebrow="What we value" title="How we work" items={values} columns={4} surface />

      <CtaBand />
    </>
  );
}
