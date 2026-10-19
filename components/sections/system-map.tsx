import Link from "next/link";
import { BadgeDollarSign, ClipboardCheck, Magnet, MessageSquare, RefreshCw, Target, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

// "Where this fits" diagram: the six stages of the Vistrow growth system (the same stages as the
// home page Conversion Engine), with the stages a page is about highlighted. Plain HTML, so the
// labels are readable text for visitors and search engines.

export type Stage = "attract" | "capture" | "respond" | "qualify" | "follow-up" | "convert";

const STAGES: { key: Stage; label: string; desc: string; icon: LucideIcon }[] = [
  { key: "attract", label: "Attract", desc: "Ads, social, creative and SEO bring the right people in", icon: Magnet },
  { key: "capture", label: "Capture", desc: "Websites, landing pages and forms turn interest into a lead", icon: Target },
  { key: "respond", label: "Respond", desc: "AI voice and WhatsApp answer every enquiry in seconds", icon: MessageSquare },
  { key: "qualify", label: "Qualify", desc: "The CRM scores, assigns and sorts who to call first", icon: ClipboardCheck },
  { key: "follow-up", label: "Follow up", desc: "Reminders and sequences keep every lead moving", icon: RefreshCw },
  { key: "convert", label: "Convert", desc: "Tracking ties each sale back to the source that paid for it", icon: BadgeDollarSign },
];

// Which stages each service works on, and what it does there.
export const SERVICE_STAGES: Record<string, { stages: Stage[]; note: string }> = {
  "performance-advertising": { stages: ["attract"], note: "Google and Meta campaigns aimed at buyers who are ready to enquire, measured on leads and sales rather than clicks." },
  "lead-generation": { stages: ["attract", "capture"], note: "Campaigns and lead forms built together, so the leads that arrive are the ones your team can actually close." },
  "website-development": { stages: ["capture"], note: "A fast website whose job is to turn visits into enquiries, connected straight to your CRM and tracking." },
  "landing-pages": { stages: ["capture"], note: "One focused page per offer, so paid traffic turns into named leads instead of bouncing." },
  "creative-strategy": { stages: ["attract"], note: "Ad concepts and messaging that earn the click from the right buyer and lower what each lead costs." },
  "social-media": { stages: ["attract"], note: "A consistent presence on Instagram, Facebook and LinkedIn that builds trust before the first enquiry." },
  "seo-content": { stages: ["attract"], note: "Pages and articles that answer what buyers search, so enquiries arrive without paying for every click." },
  "conversion-tracking": { stages: ["convert"], note: "GA4, Meta and CRM events wired together, so you can see which campaigns produce revenue." },
  "marketing-automation": { stages: ["follow-up"], note: "Sequences that keep nurturing leads who are not ready yet, without anyone remembering to send them." },
  "crm-lead-management": { stages: ["qualify"], note: "Every lead in one place, scored and assigned, so the team calls the best ones first." },
  "ai-voice-calling": { stages: ["respond", "qualify"], note: "Vistrow Voice calls new enquiries within seconds, asks the qualifying questions and logs the answers." },
  "sales-automation": { stages: ["follow-up", "convert"], note: "Tasks, reminders and stage updates handled for the team, so more time goes into closing." },
  "communication-automation": { stages: ["respond", "follow-up"], note: "WhatsApp, email and SMS that reply instantly and follow up on schedule, in one connected flow." },
  "lead-follow-up": { stages: ["follow-up"], note: "A follow-up rhythm that runs on its own, so no lead goes cold because someone was busy." },
  "custom-automation": { stages: ["respond", "qualify", "follow-up", "convert"], note: "Custom workflows that connect the tools you already use across every stage after the enquiry." },
};

// Which stages a set of service links covers (used on industry pages).
export function stagesForServices(hrefs: string[]): Stage[] {
  const keys = new Set<Stage>();
  for (const href of hrefs) SERVICE_STAGES[href.split("/").pop() ?? ""]?.stages.forEach((stage) => keys.add(stage));
  return STAGES.map((stage) => stage.key).filter((key) => keys.has(key));
}

export function SystemMap({
  eyebrow = "Where this fits",
  title,
  description,
  highlight,
  note,
  surface = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  highlight: Stage[];
  note?: string;
  surface?: boolean;
}) {
  return (
    <section className={`py-section ${surface ? "bg-surface" : ""}`}>
      <div className="container-edge">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} className="mb-10 max-w-3xl" />
        <Reveal>
          <figure>
            <ol className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6 lg:gap-0">
              {STAGES.map((stage, index) => {
                const active = highlight.includes(stage.key);
                const Icon = stage.icon;
                return (
                  <li key={stage.key} className="relative lg:px-1.5">
                    {/* connector between stages on the single desktop row */}
                    {index > 0 && (
                      <span
                        aria-hidden="true"
                        className={`absolute left-0 top-[34px] hidden h-px w-1.5 lg:block ${active ? "bg-accent" : "bg-line"}`}
                      />
                    )}
                    <div
                      className={`h-full rounded-lg border p-4 transition-colors ${
                        active ? "border-accent bg-accent/10 shadow-[0_0_24px_-10px_rgb(var(--accent)/0.6)]" : "border-line bg-card opacity-70"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`flex h-9 w-9 items-center justify-center rounded-full ${active ? "bg-accent text-accent-ink" : "bg-surface text-muted"}`}>
                          <Icon className="h-4 w-4" strokeWidth={2} />
                        </span>
                        <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <p className={`mt-4 font-display text-base font-bold ${active ? "text-ink" : "text-ink-2"}`}>{stage.label}</p>
                      <p className="mt-1 font-sans text-[13px] leading-relaxed text-muted">{stage.desc}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
            {note && (
              <figcaption className="mt-6 flex flex-col gap-3 rounded-lg border border-line bg-card p-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="font-sans text-[15px] leading-relaxed text-ink-2">
                  <span className="font-semibold text-ink">Highlighted:</span> {note}
                </p>
                <Link href="/services" className="shrink-0 font-sans text-sm font-semibold text-accent-strong hover:underline">
                  See every stage
                </Link>
              </figcaption>
            )}
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
