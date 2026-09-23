import type { Metadata } from "next";
import {
  BarChart3,
  Clock,
  CloudLightning,
  DollarSign,
  FileText,
  Inbox,
  KeyRound,
  LayoutTemplate,
  MapPin,
  MessageSquareText,
  PhoneCall,
  ShieldCheck,
  Smartphone,
  Star,
} from "lucide-react";
import { PageHero, type CtaLink } from "@/components/sections/page-hero";
import { AnswerSummary } from "@/components/sections/answer-summary";
import { FeatureCards } from "@/components/sections/feature-cards";
import { Steps } from "@/components/sections/steps";
import { Faq } from "@/components/sections/faq";
import { CtaBand } from "@/components/sections/cta-band";
import { UsRoofingForm } from "@/components/forms/us-roofing-form";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata, siteUrl } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, graph } from "@/lib/structured-data";

const path = "/us/roofing";

/**
 * Public link to the Tallgrass Roofing concept demo. Leave empty until the demo
 * is shared publicly - the "See a live demo" button only renders when this is set.
 */
const DEMO_URL = "";

export const metadata: Metadata = buildMetadata({
  title: "Roofing Website Design & Lead Follow-Up for US Roofers",
  description:
    "Websites for US roofing companies that capture storm and replacement leads, then follow up instantly with text, email, and AI call answering. Free website audit.",
  path,
});

const challenges = [
  { icon: CloudLightning, title: "Storm weeks swamp the phones", body: "After hail, calls and forms arrive faster than the office can answer them." },
  { icon: Smartphone, title: "Mobile visitors can't act fast", body: "Slow pages and hidden phone numbers send homeowners to the next roofer." },
  { icon: Inbox, title: "Form leads sit in an inbox", body: "Nobody replies until the next morning, and the homeowner has booked someone else." },
  { icon: BarChart3, title: "No idea which jobs came from where", body: "Spend on ads, SEO and lead lists without knowing which one produced signed jobs." },
];

const builds = [
  { icon: LayoutTemplate, title: "Lead-capture website", body: "Fast, mobile-first pages with click-to-call, a short inspection form, and your credentials up front." },
  { icon: ShieldCheck, title: "Storm & insurance pages", body: "Plain-language hail and wind claim pages that homeowners search for after every storm." },
  { icon: MapPin, title: "City service-area pages", body: "One useful page per city you serve, built for local search and Google Business Profile." },
  { icon: MessageSquareText, title: "Instant text follow-up", body: "Every form gets a text and email reply within seconds, with booking options." },
  { icon: PhoneCall, title: "AI call answering", body: "Vistrow Voice answers after-hours and overflow calls, qualifies the job, and books the inspection." },
  { icon: Star, title: "Reviews & tracking", body: "Automated review requests after each job, and reporting from lead source to signed contract." },
];

const packages = [
  {
    name: "Roofing website",
    price: "$1,500–$3,500",
    unit: "one-time",
    body: "5–8 page lead-capture site: services, storm and insurance, service areas, financing, inspection form, tracking.",
  },
  {
    name: "Follow-up system",
    price: "$150–$300",
    unit: "per month + setup",
    body: "CRM pipeline, instant text and email replies, reminders, and review requests after every job.",
  },
  {
    name: "AI call answering",
    price: "$200–$500",
    unit: "per month",
    body: "Vistrow Voice for after-hours and storm-surge calls: qualifies the job and books an inspection.",
  },
  {
    name: "Care plan",
    price: "$99–$199",
    unit: "per month",
    body: "Hosting, backups, updates, small content edits, and a monthly lead report.",
  },
];

const usTerms = [
  { icon: Clock, title: "Calls in US hours", body: "Meetings scheduled in your time zone, with a morning overlap for Eastern and Central." },
  { icon: DollarSign, title: "USD invoicing", body: "Fixed quotes in US dollars, paid by card or bank transfer." },
  { icon: KeyRound, title: "You own everything", body: "Domain, website, content and data stay in your name and accounts." },
  { icon: FileText, title: "Written scope first", body: "Deliverables, timeline and price agreed in writing before work starts." },
];

const steps = [
  { title: "Free audit", body: "We review your site, Google profile and lead follow-up, then send a short video walkthrough." },
  { title: "Plan & quote", body: "A call in US hours to agree pages, integrations and a fixed USD quote." },
  { title: "Build", body: "Design, copy and setup, with review rounds. A standard site typically takes 3–4 weeks." },
  { title: "Launch & improve", body: "Tracking goes live, then we review lead sources and response times each month." },
];

const faqs = [
  {
    q: "Do you only build websites for roofing companies?",
    a: "No, but this page is for roofers. Roofing sells on speed, trust and storm timing, so the website, follow-up and call answering are shaped around that.",
  },
  {
    q: "You're based in India. How does that work for a US roofer?",
    a: "Vistrow is remote-first. Calls happen in your time zone, quotes are in USD, and you keep ownership of your domain, site and data. Your leads are answered instantly by the system, not by an offshore call centre.",
  },
  {
    q: "Can you guarantee more roofing leads?",
    a: "No. Lead volume depends on your market, reviews, budget and storm activity. We make sure the leads you already get are captured, answered fast and tracked, and we report what changed.",
  },
  {
    q: "Can you work with our CRM or roofing software?",
    a: "Usually, yes. We connect forms and calls to the tools you already use where they allow it, or set up a simple pipeline if you don't have one.",
  },
  {
    q: "Are the prices on this page final?",
    a: "They're typical ranges. Your quote depends on page count, content, integrations and whether you add follow-up or call answering.",
  },
];

export default function Page() {
  const secondaryCta: CtaLink | undefined = DEMO_URL
    ? { label: "See a live demo", href: DEMO_URL, external: true }
    : { label: "What's included", href: "#packages" };

  return (
    <>
      <JsonLd
        data={graph([
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Roofing websites (US)", path },
          ]),
          {
            "@type": "Service",
            "@id": `${siteUrl}${path}#service`,
            name: "Roofing website design and lead follow-up",
            serviceType: "Website development for roofing contractors",
            url: `${siteUrl}${path}`,
            provider: { "@id": `${siteUrl}/#organization` },
            areaServed: { "@type": "Country", name: "United States" },
            audience: { "@type": "BusinessAudience", name: "Roofing contractors" },
          },
          faqSchema(faqs),
        ])}
      />

      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Roofing websites (US)" }]}
        eyebrow="For US roofing companies"
        title="Roofing websites that answer every"
        highlight="storm lead"
        subtitle="A fast, mobile-first website for your roofing company, connected to instant text follow-up and AI call answering, so homeowners hear back from you first."
        primaryCta={{ label: "Get a free website audit", href: "#roofing-audit" }}
        secondaryCta={secondaryCta}
      />

      <AnswerSummary
        question="What does Vistrow build for roofing companies?"
        answer="A lead-capture website plus the follow-up behind it: every form gets an instant reply, after-hours calls are answered and booked, and every signed job is traced back to its source."
        groups={[
          { label: "Common gaps", items: challenges.slice(0, 3).map((c) => c.title) },
          { label: "What we build", items: builds.slice(0, 3).map((b) => b.title) },
          { label: "How we work", items: usTerms.slice(0, 3).map((t) => t.title) },
        ]}
      />

      <FeatureCards eyebrow="Where roofing leads leak" title="The problem isn't only the website" items={challenges} columns={4} />

      <FeatureCards
        eyebrow="What we build"
        title="A website and the system behind it"
        items={builds}
        columns={3}
        surface
      />

      <section id="packages" className="scroll-mt-24 py-section">
        <div className="container-edge">
          <SectionHeading
            eyebrow="Packages"
            title="Start with the website. Add the system when you're ready."
            description="Typical ranges in USD. Your quote is fixed in writing after the audit."
            className="mb-12"
          />
          <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-4">
            {packages.map((pkg, i) => (
              <Reveal key={pkg.name} delay={(i % 4) * 0.06}>
                <div className="glass flex h-full flex-col rounded-lg p-7">
                  <h3 className="font-display text-lg font-bold text-ink">{pkg.name}</h3>
                  <p className="mt-4 font-display text-3xl font-extrabold tracking-[-0.02em] text-ink">{pkg.price}</p>
                  <p className="font-sans text-sm text-muted">{pkg.unit}</p>
                  <p className="mt-4 font-sans text-sm leading-relaxed text-muted">{pkg.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Steps eyebrow="How it works" title="From free audit to live website" steps={steps} surface />

      <FeatureCards eyebrow="Working with Vistrow from the US" title="Clear terms, your time zone" items={usTerms} columns={4} />

      <section id="roofing-audit" className="scroll-mt-24 border-t border-line bg-surface py-section">
        <div className="container-edge">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 text-center">
              <span className="eyebrow">Free website audit</span>
              <h2 className="mt-3 font-display text-h2 text-ink">See where your roofing leads are leaking</h2>
              <p className="mx-auto mt-3 max-w-xl font-sans text-muted">
                We check your site speed, mobile call buttons, forms, Google Business Profile and how
                fast an enquiry gets a reply, then send you a short video walkthrough.
              </p>
            </div>
            <UsRoofingForm />
          </div>
        </div>
      </section>

      <Faq items={faqs} />

      <CtaBand
        title="Be the first roofer to call back."
        subtitle="Get a free audit of your website and lead follow-up, with a clear list of what to fix first."
        primaryCta={{ label: "Get a free website audit", href: "#roofing-audit" }}
        secondaryCta={{ label: "Talk to Vistrow", href: "/contact" }}
      />
    </>
  );
}
