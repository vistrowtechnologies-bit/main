import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { LinkCardGrid } from "@/components/sections/link-card-grid";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal } from "@/components/ui/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { digitalMarketingOverview } from "@/content/digital-marketing";
import { businessAutomationOverview } from "@/content/business-automation";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, collectionSchema, graph } from "@/lib/structured-data";
import { PhotoSplit } from "@/components/sections/photo-split";
import { SystemMap } from "@/components/sections/system-map";
import { PAGE_IMAGES } from "@/lib/page-images";

export const metadata: Metadata = buildMetadata({
  title: "Digital Marketing and AI Automation Services",
  description:
    "Marketing and automation, working as one system: performance marketing, CRM, AI voice, and the automation that connects them.",
  path: "/services",
});

export default function Page() {
  const allCards = [...digitalMarketingOverview.cards, ...businessAutomationOverview.cards];

  return (
    <>
      <JsonLd
        data={graph([
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
          collectionSchema({
            name: "Services",
            description:
              "Marketing and automation services from Vistrow, working as one connected system.",
            path: "/services",
            items: allCards.map((card) => ({ name: card.label, path: card.href })),
          }),
        ])}
      />
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Services" }]}
        eyebrow="Services"
        title="Marketing and automation,"
        highlight="working as one system"
        subtitle="Demand generation and the CRM, AI voice, and automation that turn it into pipeline. Two disciplines, one connected engine."
        secondaryCta={{ label: "Talk to Vistrow", href: "/contact" }}
      />

      <PhotoSplit
        eyebrow="One connected team"
        title="Marketing and the systems behind it, run as one"
        body="Many businesses hire one agency for ads, another for the website and someone else for the CRM, and enquiries fall through the gaps between them. Vistrow plans and runs all of it together, so a lead from an ad is answered, followed up and traced back to revenue."
        points={[
          "Marketing and automation planned together",
          "One owner for every stage of the journey",
          "Built on our own products, ArthaLeads and Vistrow Voice",
          "Reporting tied to enquiries and sales, not clicks",
        ]}
        image={PAGE_IMAGES.services}
      />

      <SystemMap
        eyebrow="The system"
        title="Six stages, from the first click to the closed sale"
        description="Marketing brings the right people in. Automation makes sure every enquiry is answered, qualified, followed up and measured. Each service below works on one or more of these stages."
        highlight={["attract", "capture", "respond", "qualify", "follow-up", "convert"]}
        surface
      />

      <LinkCardGrid
        eyebrow="Marketing"
        title="Generate demand"
        cards={digitalMarketingOverview.cards}
      />

      <LinkCardGrid
        eyebrow="Automation"
        title="Convert what you generate"
        cards={businessAutomationOverview.cards}
        surface
      />

      <section className="border-t border-line bg-surface py-section">
        <div className="container-edge">
          <Reveal>
            <div className="glass flex flex-col items-start justify-between gap-6 rounded-lg p-8 sm:flex-row sm:items-center">
              <div>
                <span className="eyebrow">By industry</span>
                <h3 className="mt-2 font-display text-lg font-bold text-ink">
                  See how these services apply to your industry
                </h3>
              </div>
              <Link href="/industries" className="btn-secondary shrink-0">
                Explore industries
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
