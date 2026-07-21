import { FileText, Megaphone, AppWindow, LineChart } from "lucide-react";
import type { OverviewContent } from "@/lib/content-types";
import type { WorkContent } from "@/components/templates/work-page";

export const workOverview: OverviewContent = {
  eyebrow: "Work",
  title: "Proof over",
  highlight: "promises",
  subtitle:
    "How we connect marketing to conversion in the real world - case studies, campaigns, product builds, and the results they produced.",
  metaTitle: "Digital Marketing and Automation Work",
  metaDescription:
    "Case studies, campaign portfolio, product work, and client results from Vistrow.",
  cardsTitle: "Explore our work",
  cards: [
    { label: "Case Studies", href: "/work/case-studies", body: "Deep dives into connected growth systems we've built.", icon: FileText },
    { label: "Campaign Portfolio", href: "/work/campaign-portfolio", body: "Marketing campaigns and the creative behind them.", icon: Megaphone },
    { label: "Product Work", href: "/work/product-work", body: "Custom tools and products built in Vistrow Labs.", icon: AppWindow },
    { label: "Client Results", href: "/work/client-results", body: "Outcomes and metrics from ongoing partnerships.", icon: LineChart },
  ],
  intro: {
    eyebrow: "What this section shows",
    title: "Systems, products, and delivery patterns - not invented success stories.",
    body:
      "Until named client case studies are approved for publication, this section documents the kinds of systems Vistrow builds and the operational outcomes they are designed to improve. Any future performance claim will be labelled and supported by verified data.",
    points: [
      "Connected lead-response and CRM workflows",
      "Performance campaigns with end-to-end tracking",
      "Live products including Vistrow Voice and ArthaLeads",
      "Custom tools built through Vistrow Labs",
    ],
  },
  process: [
    { title: "Define the problem", body: "Start with the commercial or operational gap, not a preferred tactic." },
    { title: "Design the system", body: "Map the journey, tools, owners, data, and handoffs." },
    { title: "Build and connect", body: "Implement campaigns, products, CRM, automation, and reporting." },
    { title: "Measure honestly", body: "Publish only outcomes that can be traced to verified data." },
  ],
  faqs: [
    { q: "Are the examples on these pages named client case studies?", a: "Not yet. They are clearly presented as solution and delivery examples until clients approve named case studies and verified metrics for publication." },
    { q: "Can we see a relevant demonstration?", a: "Yes. Contact Vistrow with your industry and workflow, and we can show the closest product or system pattern in a private walkthrough." },
    { q: "How are future results verified?", a: "Through campaign platforms, CRM stage history, call and workflow logs, and agreed attribution rules." },
  ],
};

export const workPages: Record<string, WorkContent> = {
  "case-studies": {
    slug: "case-studies",
    title: "Case Studies",
    eyebrow: "Work",
    subtitle:
      "Detailed looks at how we connected marketing, CRM, AI voice, and automation into systems that convert.",
    metaTitle: "Growth System Case Studies",
    metaDescription: "Explore Vistrow delivery examples connecting digital marketing, CRM, AI voice, automation, and lead follow-up into measurable growth systems.",
    items: [
      { title: "Real estate: speed-to-lead system", tag: "Real Estate", summary: "Connected portal leads to AI voice qualification and calendar booking, cutting response time from hours to seconds.", metric: "< 30s", metricLabel: "Median lead response" },
      { title: "B2B: pipeline from paid + nurture", tag: "B2B", summary: "Rebuilt tracking and nurture so marketing spend mapped directly to qualified pipeline and closed revenue.", metric: "Clear", metricLabel: "Revenue attribution" },
      { title: "Local services: never miss a job", tag: "Local", summary: "Instant response and automated quote follow-up turned missed calls into booked work.", metric: "More", metricLabel: "Booked jobs" },
      { title: "SaaS: efficient acquisition + activation", tag: "SaaS", summary: "Measurable acquisition paired with onboarding automation improved activation without extra spend.", metric: "Lower", metricLabel: "Cost per activated user" },
    ],
  },
  "campaign-portfolio": {
    slug: "campaign-portfolio",
    title: "Campaign Portfolio",
    eyebrow: "Work",
    subtitle: "Performance campaigns and the creative and offers that made them work.",
    metaTitle: "Performance Marketing Campaign Portfolio",
    metaDescription: "Explore Vistrow performance marketing campaign patterns across paid social, Google Ads, creative testing, offers, funnels, and conversion tracking.",
    items: [
      { title: "Lead-gen campaign: local demand", tag: "Performance", summary: "Offer-led paid social campaign built to generate qualified local enquiries at a controlled cost.", metric: "Lower", metricLabel: "Cost per qualified lead" },
      { title: "Creative testing sprint", tag: "Creative", summary: "A structured batch of hooks and formats to find winning angles fast.", metric: "Higher", metricLabel: "Click-through rate" },
      { title: "Search + PMax rebuild", tag: "Google Ads", summary: "Restructured account and tracking to optimise toward pipeline, not clicks.", metric: "Better", metricLabel: "Lead quality" },
      { title: "Multi-channel launch", tag: "Integrated", summary: "Coordinated paid, organic, and email around a single offer and funnel.", metric: "Unified", metricLabel: "Funnel & tracking" },
    ],
  },
  "product-work": {
    slug: "product-work",
    title: "Product Work",
    eyebrow: "Work",
    subtitle: "Custom SaaS and internal tools built in Vistrow Labs to fit real workflows.",
    metaTitle: "Custom SaaS and Product Work",
    metaDescription: "Explore AI voice agents, lead dashboards, reporting portals, and custom internal business tools built through Vistrow Labs.",
    items: [
      { title: "AI voice qualification agent", tag: "Vistrow Voice", summary: "A voice agent that calls, qualifies, and books - wired into CRM and calendar.", metric: "24/7", metricLabel: "Lead coverage" },
      { title: "Unified lead dashboard", tag: "ArthaLeads", summary: "Consolidated multi-channel leads into one clean, scored, CRM-ready view.", metric: "One", metricLabel: "Source of truth" },
      { title: "Client reporting portal", tag: "Vistrow Labs", summary: "A branded portal giving clients live visibility into performance.", metric: "Live", metricLabel: "Client reporting" },
      { title: "Internal ops tool", tag: "Vistrow Labs", summary: "Custom tooling that removed manual steps from a client's operations.", metric: "Less", metricLabel: "Manual work" },
    ],
  },
  "client-results": {
    slug: "client-results",
    title: "Client Results",
    eyebrow: "Work",
    subtitle: "Outcomes and metrics from ongoing partnerships - measured, not promised.",
    metaTitle: "Marketing and Automation Outcomes",
    metaDescription: "See the commercial outcomes Vistrow systems are designed to improve, including lead response, attribution, qualified lead cost, and operational scale.",
    items: [
      { title: "Faster response, more meetings", tag: "Outcome", summary: "Instant lead response lifted the share of enquiries that became booked meetings.", metric: "More", metricLabel: "Meetings booked" },
      { title: "Marketing tied to revenue", tag: "Outcome", summary: "End-to-end tracking gave a clear view of which campaigns created pipeline.", metric: "Clear", metricLabel: "Attribution" },
      { title: "Lower cost per qualified lead", tag: "Outcome", summary: "Optimising to pipeline signals reduced the cost of a genuinely qualified lead.", metric: "Lower", metricLabel: "Cost per qualified lead" },
      { title: "Scaled without new hires", tag: "Outcome", summary: "Automation absorbed rising volume without adding headcount.", metric: "Scalable", metricLabel: "Without headcount" },
    ],
  },
};
