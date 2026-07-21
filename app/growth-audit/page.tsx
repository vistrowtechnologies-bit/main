import type { Metadata } from "next";
import { Search, GitCompareArrows, ClipboardList } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { GrowthAuditForm } from "@/components/forms/growth-audit-form";

export const metadata: Metadata = {
  title: "Book a Growth Audit",
  description:
    "A deep-dive into your funnel, spend, and tech stack - mapping exactly where opportunities leak between marketing and sales.",
};

const whatYouGet = [
  { icon: Search, title: "Funnel & spend review", body: "Where budget goes and where it leaks." },
  { icon: GitCompareArrows, title: "System gap analysis", body: "The disconnects between marketing, CRM, and follow-up." },
  { icon: ClipboardList, title: "Prioritised action plan", body: "The highest-impact fixes, in order." },
];

export default function Page() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Book a Growth Audit" }]}
        eyebrow="Growth Audit"
        title="Find the gaps between marketing and"
        highlight="sales"
        subtitle="A structured deep-dive into your funnel, spend, and tech stack - so you can see exactly where opportunities are leaking, and what to fix first."
        primaryCta={{ label: "Start the audit", href: "#audit-form" }}
        secondaryCta={{ label: "Talk to us first", href: "/contact" }}
        aside={
          <div className="glass rounded-xl p-7">
            <h2 className="font-display text-lg font-bold text-ink">What you get</h2>
            <ul className="mt-6 space-y-5">
              {whatYouGet.map((item) => (
                <li key={item.title} className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-accent-tint">
                    <item.icon className="h-5 w-5 text-accent-ink" strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="font-sans text-[15px] font-semibold text-ink">{item.title}</p>
                    <p className="mt-0.5 font-sans text-sm text-muted">{item.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        }
      />
      <section id="audit-form" className="py-section">
        <div className="container-edge">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 text-center">
              <span className="eyebrow">Request your audit</span>
              <h2 className="mt-3 font-display text-h2 text-ink">A couple of quick details</h2>
              <p className="mx-auto mt-3 max-w-xl font-sans text-muted">
                We only ask what we need to prepare a useful audit. It takes about a minute.
              </p>
            </div>
            <GrowthAuditForm />
          </div>
        </div>
      </section>
    </>
  );
}
