import { ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { FeatureCards } from "@/components/sections/feature-cards";
import { Steps } from "@/components/sections/steps";
import { Chips } from "@/components/sections/outcomes";
import { Faq } from "@/components/sections/faq";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { ProductContent } from "@/lib/content-types";

export function ProductPage({
  content,
  preview,
}: {
  content: ProductContent;
  preview?: React.ReactNode;
}) {
  return (
    <>
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

      <FeatureCards eyebrow="Use cases" title="Where it earns its place" items={content.useCases} surface />

      <FeatureCards eyebrow="Features" title="Built for real workflows" items={content.features} />

      <Steps steps={content.howItWorks} surface />

      <Chips eyebrow="Integrations" title="Connects to your stack" items={content.integrations} />

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
