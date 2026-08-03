import type { Metadata } from "next";
import { Search, GitCompareArrows, ClipboardList, CalendarCheck, MessagesSquare, ListChecks } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { GrowthAuditForm } from "@/components/forms/growth-audit-form";
import { FeatureCards } from "@/components/sections/feature-cards";
import { Steps } from "@/components/sections/steps";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Digital Marketing and Sales Growth Audit",
  description:
    "Request a Vistrow growth audit to identify gaps across ad spend, landing pages, CRM, lead response, follow-up, sales automation, and revenue tracking.",
  path: "/growth-audit",
});

const whatYouGet = [
  { icon: Search, title: "Funnel & spend review", body: "Where budget goes and where it leaks." },
  { icon: GitCompareArrows, title: "System gap analysis", body: "The disconnects between marketing, CRM, and follow-up." },
  { icon: ClipboardList, title: "Prioritised action plan", body: "The highest-impact fixes, in order." },
];

const auditSteps = [
  { title: "Request", body: "Share the essential context about your company, channels, and current growth gap." },
  { title: "Confirm fit", body: "We review the request and clarify the systems, access, and people needed for a useful session." },
  { title: "Working session", body: "We examine acquisition, conversion, CRM, response, follow-up, and measurement as one journey." },
  { title: "Priorities", body: "You receive a practical sequence of issues to investigate or fix before implementation is scoped." },
];

const auditClarity = [
  { icon: CalendarCheck, title: "A request, not an instant booking", body: "Submitting the form starts a fit review. We contact you to confirm the right people, scope, and next meeting." },
  { icon: MessagesSquare, title: "Useful without a finished brief", body: "Bring the current problem, available data, and tools. You do not need to prescribe the solution." },
  { icon: ListChecks, title: "Implementation is separate", body: "Any build, campaign, or automation work is proposed separately with written scope, commercials, and responsibilities." },
];

export default function Page() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Request a Growth Audit" }]}
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
      <FeatureCards
        eyebrow="Before you request"
        title="A clear process, with no disguised commitment"
        items={auditClarity}
        columns={3}
        surface
      />
      <Steps eyebrow="What happens next" title="From request to useful priorities" steps={auditSteps} />
      <section id="audit-form" className="py-section">
        <div className="container-edge">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 text-center">
              <span className="eyebrow">Request your audit</span>
              <h2 className="mt-3 font-display text-h2 text-ink">A couple of quick details</h2>
              <p className="mx-auto mt-3 max-w-xl font-sans text-muted">
                We only ask what we need to assess fit and prepare the first conversation. It takes about a minute.
              </p>
            </div>
            <GrowthAuditForm />
          </div>
        </div>
      </section>
    </>
  );
}
