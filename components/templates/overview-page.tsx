import type { ReactNode } from "react";
import Image from "next/image";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { CardLinkGrid, SolutionSplit, Timeline } from "@/components/sections/service-blocks";
import { Faq } from "@/components/sections/faq";
import { JsonLd } from "@/components/seo/json-ld";
import type { OverviewContent } from "@/lib/content-types";
import { breadcrumbSchema, collectionSchema, faqSchema, graph } from "@/lib/structured-data";

export function OverviewPage({
  content,
  parent,
  extra,
}: {
  content: OverviewContent;
  parent?: { label: string; href: string };
  extra?: ReactNode;
}) {
  const path = parent?.href ?? "/";
  const breadcrumb = parent
    ? [{ label: "Home", href: "/" }, { label: parent.label }]
    : [{ label: "Home", href: "/" }];

  return (
    <>
      <JsonLd
        data={graph([
          breadcrumbSchema(
            parent
              ? [
                  { name: "Home", path: "/" },
                  { name: parent.label, path },
                ]
              : [{ name: "Home", path: "/" }],
          ),
          collectionSchema({
            name: content.metaTitle,
            description: content.metaDescription,
            path,
            items: content.cards.map((card) => ({ name: card.label, path: card.href })),
          }),
          ...(content.faqs ? [faqSchema(content.faqs)] : []),
        ])}
      />
      <PageHero
        breadcrumb={breadcrumb}
        eyebrow={content.eyebrow}
        title={content.title}
        highlight={content.highlight}
        subtitle={content.subtitle}
        secondaryCta={{ label: "Talk to Vistrow", href: "/contact" }}
        aside={
          content.intro?.image ? (
            <div className="relative overflow-hidden rounded-lg border border-line bg-card shadow-lift">
              <Image src={content.intro.image.src} alt={content.intro.image.alt} width={1536} height={1024} sizes="(min-width: 1024px) 600px, 100vw" priority className="aspect-[3/2] h-auto w-full object-cover" />
            </div>
          ) : undefined
        }
      />

      {content.intro && (
        <SolutionSplit
          eyebrow={content.intro.eyebrow ?? "The connected system"}
          title={content.intro.title}
          body={content.intro.body}
          points={content.intro.points}
        />
      )}

      <CardLinkGrid title={content.cardsTitle} cards={content.cards} tone={content.intro ? "plain" : "plain"} />

      {content.process && (
        <Timeline
          eyebrow="How it comes together"
          title="A clear route from first step to measurable outcome"
          steps={content.process}
        />
      )}

      {extra}

      {content.faqs && (
        <div className="[&>section]:py-block">
          <Faq items={content.faqs} />
        </div>
      )}

      <CtaBand />
    </>
  );
}
