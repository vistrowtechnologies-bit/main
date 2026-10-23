import { Reveal } from "@/components/ui/reveal";
import { StageExplorer, type StageService } from "@/components/sections/stage-explorer";
import { digitalMarketingServices } from "@/content/digital-marketing";
import { businessAutomationServices } from "@/content/business-automation";
import { SectionHeading } from "@/components/ui/section-heading";

// "Where this fits" diagram: the six stages of the Vistrow growth system (the same stages as the
// home page Conversion Engine), with the stages a page is about highlighted. Plain HTML, so the
// labels are readable text for visitors and search engines.

export type Stage = "attract" | "capture" | "respond" | "qualify" | "follow-up" | "convert";

const STAGES: { key: Stage; label: string; desc: string }[] = [
  { key: "attract", label: "Attract", desc: "Ads, social, creative and SEO bring the right people in" },
  { key: "capture", label: "Capture", desc: "Websites, landing pages and forms turn interest into a lead" },
  { key: "respond", label: "Respond", desc: "AI voice and WhatsApp answer every enquiry in seconds" },
  { key: "qualify", label: "Qualify", desc: "The CRM scores, assigns and sorts who to call first" },
  { key: "follow-up", label: "Follow up", desc: "Reminders and sequences keep every lead moving" },
  { key: "convert", label: "Convert", desc: "Tracking ties each sale back to the source that paid for it" },
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

// The services that work at each stage, as links (shown in the stage detail panel).
function servicesByStage(): Record<string, StageService[]> {
  const out: Record<string, StageService[]> = {};
  const sections: [Record<string, { title: string }>, string][] = [
    [digitalMarketingServices, "/digital-marketing"],
    [businessAutomationServices, "/business-automation"],
  ];
  for (const [services, base] of sections) {
    for (const [slug, service] of Object.entries(services)) {
      for (const stage of SERVICE_STAGES[slug]?.stages ?? []) (out[stage] ??= []).push({ title: service.title, href: `${base}/${slug}` });
    }
  }
  return out;
}

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
          <StageExplorer stages={STAGES} highlight={highlight} note={note} services={servicesByStage()} />
        </Reveal>
      </div>
    </section>
  );
}
