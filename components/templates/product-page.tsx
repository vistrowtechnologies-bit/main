import { ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { FeatureCards } from "@/components/sections/feature-cards";
import { Steps } from "@/components/sections/steps";
import { Chips } from "@/components/sections/outcomes";
import { Faq } from "@/components/sections/faq";
import { CtaBand } from "@/components/sections/cta-band";
import { AnswerSummary } from "@/components/sections/answer-summary";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { JsonLd } from "@/components/seo/json-ld";
import type { ProductContent } from "@/lib/content-types";
import { breadcrumbSchema, faqSchema, graph, productSchema } from "@/lib/structured-data";

export function ProductPage({
  content,
  preview,
}: {
  content: ProductContent;
  preview?: React.ReactNode;
}) {
  const path = `/products/${content.slug}`;

  return (
    <>
      <JsonLd
        data={graph([
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Products", path: "/products" },
            { name: content.name, path },
          ]),
          productSchema({
            name: content.name,
            description: content.metaDescription,
            path,
            externalUrl: content.externalUrl,
          }),
          ...(content.faqs && content.faqs.length > 0 ? [faqSchema(content.faqs)] : []),
        ])}
      />
      <PageHero
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: content.name },
        ]}
        eyebrow="Product"
        title={content.name}
        subtitle={content.subtitle}
        primaryCta={
          content.externalUrl
            ? {
                label: content.externalLabel ?? `Visit ${content.name}`,
                href: content.externalUrl,
                external: true,
              }
            : { label: content.demoCta ?? "Book a Demo", href: "/contact" }
        }
        secondaryCta={{ label: "Book a walkthrough", href: "/contact" }}
        aside={preview}
      />

      <AnswerSummary
        question={`What is ${content.name}?`}
        answer={content.subtitle}
        groups={[
          { label: "Best-fit uses", items: content.useCases.map((item) => item.title) },
          { label: "Key capabilities", items: content.features.slice(0, 3).map((item) => item.title) },
          { label: "Connects with", items: content.integrations.slice(0, 3) },
        ]}
      />

      <FeatureCards eyebrow="Use cases" title="Where it earns its place" items={content.useCases} surface />

      <FeatureCards eyebrow="Features" title="Built for real workflows" items={content.features} />

      <Steps steps={content.howItWorks} surface />

      <Chips eyebrow="Integrations" title="Connects to your stack" items={content.integrations} />

      <section className="border-y border-line bg-surface py-section">
        <div className="container-edge">
          <SectionHeading eyebrow="Evaluation clarity" title={`Questions to settle before choosing ${content.name}`} align="center" className="mb-12" />
          <div className="grid gap-gutter md:grid-cols-3">
            {[
              ["Workflow fit", "Define the use case, exception path, human owner, and measurable acceptance criteria for a pilot."],
              ["Data and control", "Confirm data sources, access, retention, permissions, monitoring, and the human review required."],
              ["Commercial scope", "Agree implementation, usage, integration, support, and any third-party costs before rollout."],
            ].map(([title, body], index) => (
              <Reveal key={title} delay={index * 0.06}>
                <article className="h-full rounded-lg border border-line bg-card p-6">
                  <span className="font-display text-sm font-bold text-accent-strong">0{index + 1}</span>
                  <h3 className="mt-4 font-display text-xl font-bold text-ink">{title}</h3>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-muted">{body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Trust / reliability */}
      <section className="py-section">
        <div className="container-edge">
          <SectionHeading
            eyebrow="Trust & control"
            title="Built to stay observable, governed, and dependable"
            align="center"
            className="mb-12"
          />
          <div className="grid grid-cols-1 gap-gutter sm:grid-cols-3">
            {content.security.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.07}>
                <div className="h-full rounded-lg border border-line bg-card p-7">
                  <div className="flex h-11 w-11 items-center justify-center rounded-sm bg-accent-tint">
                    {(() => {
                      const Icon = item.icon ?? ShieldCheck;
                      return <Icon className="h-5 w-5 text-accent-ink" strokeWidth={1.75} />;
                    })()}
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-ink">{item.title}</h3>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-muted">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {content.faqs && content.faqs.length > 0 && <Faq items={content.faqs} />}

      <CtaBand
        title={`See ${content.name} in action.`}
        subtitle="Explore the live product or book a walkthrough to see how it fits your workflow."
        primaryCta={
          content.externalUrl
            ? {
                label: content.externalLabel ?? `Visit ${content.name}`,
                href: content.externalUrl,
                external: true,
              }
            : { label: content.demoCta ?? "Book a Demo", href: "/contact" }
        }
        secondaryCta={{ label: "Talk to Vistrow", href: "/contact" }}
      />
    </>
  );
}
