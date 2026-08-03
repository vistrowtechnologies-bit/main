import type { Metadata } from "next";
import { Compass, ShieldCheck, LineChart, Layers, Megaphone, Cog, Boxes, Building2, Users, BadgeCheck } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { FeatureCards } from "@/components/sections/feature-cards";
import { LinkCardGrid } from "@/components/sections/link-card-grid";
import { Faq } from "@/components/sections/faq";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, graph } from "@/lib/structured-data";

export const metadata: Metadata = buildMetadata({
  title: "About Vistrow Technologies",
  description:
    "Meet Vistrow Technologies, an India-based digital marketing and automation company connecting campaigns, CRM, AI voice, follow-up, and revenue tracking.",
  path: "/about",
});

const values = [
  { icon: LineChart, title: "Outcomes over activity", body: "We optimise for pipeline and revenue, not vanity metrics." },
  { icon: Layers, title: "Connected by design", body: "Marketing works better when the system behind it is joined up." },
  { icon: ShieldCheck, title: "Honest and clear", body: "No fake guarantees. Realistic targets and straight answers." },
  { icon: Compass, title: "Built to scale", body: "Systems and tooling that grow with your business." },
];

const whatWeDo = [
  { label: "Services", href: "/services", body: "Performance marketing, lead generation, CRM, AI voice, and automation, delivered as engagements.", icon: Megaphone },
  { label: "Products", href: "/products", body: "Vistrow Voice, ArthaLeads, and Vistrow Labs - software you can also use on its own.", icon: Boxes },
  { label: "Industries", href: "/industries", body: "The same connected engine, shaped around how real estate, B2B, SaaS, and other markets actually buy.", icon: Building2 },
  { label: "Our approach", href: "/approach", body: "Audit, plan, build, improve - the repeatable method behind every engagement.", icon: Cog },
];

const companyFacts = [
  { icon: Building2, title: "Vistrow Technologies", body: "An India-based, remote-first company serving Indian and global businesses." },
  { icon: Users, title: "Small senior team", body: "The relevant delivery owner, responsibilities, and communication path are named before an engagement begins." },
  { icon: Boxes, title: "Product operators", body: "Vistrow builds and operates Vistrow Voice, ArthaLeads, and custom systems through Vistrow Labs." },
  { icon: BadgeCheck, title: "Evidence policy", body: "No guaranteed outcomes or anonymous performance claims presented as verified client results." },
];

const faqs = [
  {
    q: "What does Vistrow actually do?",
    a: "Vistrow connects performance marketing and lead generation to the systems that convert them - CRM, AI voice calling, automation, and conversion tracking - so a lead is captured, followed up, and tracked through to revenue instead of falling through the gaps.",
  },
  {
    q: "Is Vistrow a marketing agency or a software company?",
    a: "Both. Vistrow runs marketing and automation engagements for clients, and also builds and operates its own products - Vistrow Voice, ArthaLeads, and Vistrow Labs - which can be used standalone or as part of a Vistrow engagement.",
  },
  {
    q: "Where is Vistrow based, and who do you work with?",
    a: "Vistrow is remote-first, serving clients across India and globally, across real estate, local businesses, B2B, startups and SaaS, agencies, and education.",
  },
  {
    q: "Does Vistrow guarantee specific results?",
    a: "No. Marketing and automation outcomes depend on market, offer, budget, and execution, so Vistrow gives realistic targets and honest answers rather than guaranteed numbers.",
  },
];

export default function Page() {
  return (
    <>
      <JsonLd
        data={graph([
          breadcrumbSchema([{ name: "Home", path: "/" }, { name: "About", path: "/about" }]),
          faqSchema(faqs),
        ])}
      />
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

      <FeatureCards eyebrow="Company facts" title="What you can verify before working with us" items={companyFacts} columns={4} surface />

      <LinkCardGrid eyebrow="What we do" title="One connected engine, a few ways in" cards={whatWeDo} />

      <FeatureCards eyebrow="What we value" title="How we work" items={values} columns={4} />

      <Faq items={faqs} />

      <CtaBand />
    </>
  );
}
