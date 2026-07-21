import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const pillars = [
  {
    title: "Digital marketing services",
    body: "Performance advertising, lead generation, landing pages, SEO and content, social media, creative strategy, and conversion tracking built around qualified pipeline.",
    href: "/digital-marketing",
    label: "Explore digital marketing",
  },
  {
    title: "Business automation",
    body: "CRM implementation, AI voice calling, sales automation, WhatsApp, email and SMS journeys, lead follow-up, and custom workflows connected to your team.",
    href: "/business-automation",
    label: "Explore business automation",
  },
  {
    title: "Products for lead operations",
    body: "Vistrow Voice handles multilingual AI calls, ArthaLeads manages real-estate leads, and Vistrow Labs builds custom SaaS and internal business tools.",
    href: "/products",
    label: "Explore Vistrow products",
  },
];

export function HomeSearchIntro() {
  return (
    <section className="border-y border-line bg-surface py-section" aria-labelledby="what-vistrow-does">
      <div className="container-edge">
        <Reveal>
          <div className="max-w-3xl">
            <span className="eyebrow">Vistrow at a glance</span>
            <h2 id="what-vistrow-does" className="mt-3 font-display text-h2 text-ink">
              What does Vistrow do?
            </h2>
            <p className="mt-5 font-sans text-lg leading-relaxed text-muted">
              Vistrow Technologies is a digital marketing and business automation company based in India and working with businesses globally. We connect demand generation to CRM, AI voice, follow-up, and revenue tracking so more enquiries become measurable opportunities.
            </p>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-gutter lg:grid-cols-3">
          {pillars.map((pillar, index) => (
            <Reveal key={pillar.href} delay={index * 0.07}>
              <article className="flex h-full flex-col rounded-lg border border-line bg-card p-7">
                <h3 className="font-display text-xl font-bold text-ink">{pillar.title}</h3>
                <p className="mt-3 flex-1 font-sans text-sm leading-relaxed text-muted">{pillar.body}</p>
                <Link
                  href={pillar.href}
                  className="mt-6 inline-flex items-center gap-2 font-sans text-sm font-semibold text-accent-strong hover:underline"
                >
                  {pillar.label}
                  <ArrowRight className="h-4 w-4" strokeWidth={2} />
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
