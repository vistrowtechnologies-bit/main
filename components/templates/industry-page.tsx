import type { ReactNode } from "react";
import Image from "next/image";
import { PageHero } from "@/components/sections/page-hero";
import { SystemMap, stagesForServices } from "@/components/sections/system-map";
import { Faq } from "@/components/sections/faq";
import { CtaBand } from "@/components/sections/cta-band";
import { ChallengeGrid, FactStrip, ServiceLinkGrid, SolutionSplit, Timeline } from "@/components/sections/service-blocks";
import { JsonLd } from "@/components/seo/json-ld";
import type { IndustryContent } from "@/lib/content-types";
import { breadcrumbSchema, faqSchema, graph, serviceSchema } from "@/lib/structured-data";

export function IndustryPage({ content, extra }: { content: IndustryContent; extra?: ReactNode }) {
  const path = content.path ?? `/industries/${content.slug}`;
  const market = Boolean(content.path);

  return (
    <>
      <JsonLd
        data={graph([
          breadcrumbSchema(
            market
              ? [
                  { name: "Home", path: "/" },
                  { name: content.title, path },
                ]
              : [
                  { name: "Home", path: "/" },
                  { name: "Industries", path: "/industries" },
                  { name: content.title, path },
                ],
          ),
          serviceSchema({
            name: content.schemaName ?? `${content.title} growth systems`,
            description: content.metaDescription,
            path,
            category: `${content.title} digital marketing and automation`,
          }),
          faqSchema(content.faqs),
        ])}
      />
      <PageHero
        breadcrumb={
          market
            ? [{ label: "Home", href: "/" }, { label: content.title }]
            : [
                { label: "Home", href: "/" },
                { label: "Industries", href: "/industries" },
                { label: content.title },
              ]
        }
        eyebrow={content.eyebrow}
        title={content.title}
        highlight={content.highlight}
        subtitle={content.subtitle}
        secondaryCta={market ? { label: "Talk to Vistrow", href: "/contact" } : { label: "All industries", href: "/industries" }}
        aside={
          content.image ? (
            <div className="relative overflow-hidden rounded-lg border border-line bg-card shadow-lift">
              <Image src={content.image.src} alt={content.image.alt} width={1536} height={1024} sizes="(min-width: 1024px) 600px, 100vw" priority className="aspect-[3/2] h-auto w-full object-cover" />
            </div>
          ) : undefined
        }
      />

      <FactStrip
        answer={content.metaDescription}
        facts={[
          { label: "Built for", value: content.audience ?? content.title },
          { label: "Starts with", value: content.services[0]?.label ?? "A Growth Audit" },
          { label: "Then", value: content.services[1]?.label ?? "Follow-up" },
        ]}
      />

      <ChallengeGrid title="What slows growth here" items={content.challenges} />

      <SolutionSplit title={content.solution.title} body={content.solution.body} points={content.solution.points} />

      <div className="[&>section]:py-block">
        <SystemMap
          title={`Where Vistrow usually starts for ${content.audience ?? content.title.toLowerCase()}`}
          description="The highlighted stages are where teams in this industry most often lose enquiries, and where we start."
          highlight={stagesForServices(content.services.map((service) => service.href))}
        />
      </div>

      <ServiceLinkGrid title="Where we usually start" services={content.services} />

      <Timeline tone="plain" eyebrow="Example workflow" title="How a lead moves through the system" steps={content.workflow} />

      {extra}

      <div className="[&>section]:py-block">
        <Faq items={content.faqs} />
      </div>

      <CtaBand />
    </>
  );
}
