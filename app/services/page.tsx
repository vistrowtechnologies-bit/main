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

export const metadata: Metadata = buildMetadata({
  title: "Services",
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

      <LinkCardGrid
        eyebrow="Marketing"
        title="Generate demand"
        cards={digitalMarketingOverview.cards}
        surface
      />

      <LinkCardGrid
        eyebrow="Automation"
        title="Convert what you generate"
        cards={businessAutomationOverview.cards}
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
