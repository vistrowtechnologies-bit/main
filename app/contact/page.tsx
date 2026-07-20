import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Clock3, Globe2, Mail, MessagesSquare, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { ContactForm } from "@/components/forms/contact-form";
import { FeatureCards } from "@/components/sections/feature-cards";
import { Faq } from "@/components/sections/faq";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Contact",
  description: "Talk to Vistrow about connecting your marketing to CRM, automation, and conversion.",
};

const details = [
  { icon: Mail, label: "Email", value: "hello@vistrow.com", href: "mailto:hello@vistrow.com" },
  { icon: Clock3, label: "Typical response", value: "Within one business day" },
  { icon: Globe2, label: "Delivery", value: "Remote-first · India and global" },
];

const nextSteps = [
  { icon: MessagesSquare, title: "We review the context", body: "Your enquiry is routed to the person closest to the problem you described." },
  { icon: CheckCircle2, title: "You get a useful first reply", body: "We respond with clarifying questions, a relevant product link, or the right next meeting." },
  { icon: ShieldCheck, title: "No pressure or vague pitch", body: "If Vistrow is not the right fit, we'll say so clearly and point you in a better direction where we can." },
];

const faqs = [
  { q: "Should I use this form or book a Growth Audit?", a: "Use this form for product questions, partnerships, custom software, or a general conversation. Choose the Growth Audit when you want a structured review of marketing, CRM, follow-up, and tracking." },
  { q: "Can I ask about ArthaLeads or Vistrow Voice here?", a: "Yes. Select the product in the form and describe your use case. We can help with the product itself, implementation, or integration into your wider workflow." },
  { q: "Do you work with businesses outside India?", a: "Yes. Delivery is remote-first. Product availability, calling rules, channels, and integrations are confirmed for each market during scoping." },
];

export default function Page() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        eyebrow="Contact"
        title="Tell us what needs to"
        highlight="work better"
        subtitle="Ask about Vistrow Voice, ArthaLeads, digital marketing, automation, custom software, or the gaps between them. Give us the context and we'll respond with a practical next step."
        primaryCta={{ label: "Start your enquiry", href: "#contact-form" }}
        secondaryCta={{ label: "Book a Growth Audit", href: "/growth-audit" }}
      />
      <section id="contact-form" className="py-section scroll-mt-24">
        <div className="container-edge grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Reveal>
              <span className="eyebrow">Direct and useful</span>
              <h2 className="mt-3 font-display text-h3 text-ink">Start with the real problem</h2>
              <p className="mt-3 max-w-md font-sans leading-relaxed text-muted">
                You do not need a finished brief. Tell us what is happening today, what should happen instead, and any tools already involved.
              </p>
              <ul className="mt-8 space-y-5">
                {details.map((detail) => (
                  <li key={detail.label} className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-sm bg-accent-tint">
                      <detail.icon className="h-5 w-5 text-accent-ink" strokeWidth={1.75} />
                    </div>
                    <div>
                      <p className="font-sans text-[13px] text-muted">{detail.label}</p>
                      {detail.href ? (
                        <a href={detail.href} className="font-sans text-[15px] font-semibold text-ink hover:text-accent-strong">
                          {detail.value}
                        </a>
                      ) : (
                        <p className="font-sans text-[15px] font-semibold text-ink">{detail.value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-9 rounded-lg border border-accent/30 bg-accent-tint/30 p-5">
                <p className="font-sans text-sm leading-relaxed text-ink-2">
                  Want the structured route? The{" "}
                  <Link href="/growth-audit" className="font-semibold text-accent-strong hover:underline">
                    Growth Audit
                  </Link>{" "}
                  maps your funnel, spend, CRM, response, and tracking before we recommend priorities.
                </p>
              </div>
            </Reveal>
          </div>
          <ContactForm />
        </div>
      </section>
      <FeatureCards eyebrow="What happens next" title="A clear first conversation" items={nextSteps} columns={3} surface />
      <Faq items={faqs} title="Before you send an enquiry" />
    </>
  );
}
