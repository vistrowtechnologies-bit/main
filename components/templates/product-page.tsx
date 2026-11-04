import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Chips } from "@/components/sections/outcomes";
import { Faq } from "@/components/sections/faq";
import { CtaBand } from "@/components/sections/cta-band";
import { ChallengeGrid, FactStrip, Timeline } from "@/components/sections/service-blocks";
import { Section } from "@/components/ui/section";
import { BrowserFrame, ProductTour } from "@/components/sections/product-tour";
import { ProductDemoCall, ProductLanguages, ProductPlans } from "@/components/sections/product-extras";
import { SectionHeading } from "@/components/ui/section-heading";
import { JsonLd } from "@/components/seo/json-ld";
import type { ProductContent } from "@/lib/content-types";
import { arthaLeadsOffers, breadcrumbSchema, faqSchema, graph, productSchema } from "@/lib/structured-data";

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
            ...(content.slug === "arthaleads" ? { offers: arthaLeadsOffers } : {}),
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
        title={`${content.name}: ${content.tagline}`}
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
        aside={content.screenshots?.length ? <ProductHeroShot screens={content.screenshots} /> : preview}
      />

      <FactStrip
        answer={content.metaDescription}
        facts={[
          { label: "Best for", value: content.useCases[0]?.title ?? content.name },
          { label: "Connects with", value: content.integrations.slice(0, 3).join(", ") },
          { label: "Capabilities", value: `${content.features.length} core features` },
        ]}
      />

      {content.screenshots && content.screenshots.length > 0 && <ProductScreens name={content.name} screens={content.screenshots} />}

      <div className="[&>section]:py-block">
        {content.demoCall && <ProductDemoCall call={content.demoCall} />}
        {content.languages && <ProductLanguages languages={content.languages} />}
      </div>

      <ChallengeGrid eyebrow="Use cases" title="Where it earns its place" items={content.useCases} tone={content.languages ? "plain" : "surface"} />

      <ChallengeGrid eyebrow="Features" title="Built for real workflows" items={content.features} tone={content.languages ? "surface" : "plain"} />

      <Timeline steps={content.howItWorks} tone="plain" />

      <div className="[&>section]:py-block">
        <Chips eyebrow="Integrations" title="Connects to your stack" items={content.integrations} />
        {content.plans && <ProductPlans plans={content.plans} />}
      </div>

      <ChallengeGrid
        eyebrow="Trust & control"
        title="Built to stay observable, governed, and dependable"
        items={content.security.map((item) => ({ ...item, icon: item.icon ?? ShieldCheck }))}
        tone="surface"
      />

      {content.faqs && content.faqs.length > 0 && (
        <div className="[&>section]:py-block">
          <Faq items={content.faqs} />
        </div>
      )}

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

type Screen = NonNullable<ProductContent["screenshots"]>[number];
const isPhone = (screen: Screen) => screen.height > screen.width;

// First screen: the real dashboard with the phone app overlapping it, so visitors see the product immediately.
function ProductHeroShot({ screens }: { screens: Screen[] }) {
  const desktop = screens.find((screen) => !isPhone(screen));
  const phone = screens.find(isPhone);
  if (!desktop) return null;
  return (
    <div className={`relative ${phone ? "pb-10 lg:pb-0 lg:pr-10" : ""}`}>
      {desktop.bare ? (
        <Image src={desktop.src} alt={desktop.alt} width={desktop.width} height={desktop.height} sizes="(min-width: 1024px) 620px, 100vw" priority className="h-auto w-full" />
      ) : (
        <BrowserFrame>
          <Image src={desktop.src} alt={desktop.alt} width={desktop.width} height={desktop.height} sizes="(min-width: 1024px) 620px, 100vw" priority className="h-auto w-full" />
        </BrowserFrame>
      )}
      {phone && (
        <div className="absolute -bottom-2 right-0 w-[30%] max-w-[170px] overflow-hidden rounded-[22px] border-[5px] border-ink bg-ink shadow-lift lg:-bottom-10">
          <Image src={phone.src} alt={phone.alt} width={phone.width} height={phone.height} sizes="170px" priority className="h-auto w-full rounded-[17px]" />
        </div>
      )}
    </div>
  );
}

// Real screens from the live product as a tabbed tour, each captioned so the image and its meaning are both indexable.
function ProductScreens({ name, screens }: { name: string; screens: Screen[] }) {
  return (
    <Section>
      <SectionHeading
        eyebrow="Real product screens"
        title={`See inside ${name}`}
        description="Screens from the live product, shown with a demo workspace."
        className="mb-8 max-w-3xl"
      />
      <ProductTour screens={screens.filter((screen) => !isPhone(screen))} phone={screens.find(isPhone)} />
    </Section>
  );
}
