import { FileText, Megaphone, AppWindow, LineChart } from "lucide-react";
import type { OverviewContent } from "@/lib/content-types";
import type { WorkContent } from "@/components/templates/work-page";

export const workOverview: OverviewContent = {
  eyebrow: "Work",
  title: "Evidence over",
  highlight: "promises",
  subtitle:
    "First-party products, system architecture, delivery artefacts, and the measurement standards we use before calling something a result.",
  metaTitle: "Digital Marketing and Automation Work",
  metaDescription:
    "Review Vistrow's first-party products, delivery evidence, campaign artefacts, and standards for verifying marketing and automation outcomes.",
  cardsTitle: "Explore the evidence",
  cards: [
    { label: "System Evidence", href: "/work/case-studies", body: "First-party systems we can demonstrate without relying on anonymous claims.", icon: FileText },
    { label: "Campaign Blueprints", href: "/work/campaign-portfolio", body: "The practical artefacts produced during a measurable campaign engagement.", icon: Megaphone },
    { label: "Product Work", href: "/work/product-work", body: "Live products and reusable product capabilities built by Vistrow.", icon: AppWindow },
    { label: "Measurement Standards", href: "/work/client-results", body: "What must exist before an outcome is presented as a client result.", icon: LineChart },
  ],
  intro: {
    eyebrow: "Evidence policy",
    title: "Show the system. Label the claim. Keep the context.",
    body:
      "Vistrow does not publish invented client names, rounded-up percentages, or anonymous logos. Owned products are identified as first-party work. Delivery patterns are labelled as examples. Client outcomes are published only with permission, a baseline, a time period, and traceable source data.",
    points: [
      "Live first-party products: Vistrow Voice and ArthaLeads",
      "Inspectable workflow, integration, and reporting artefacts",
      "Clear separation between product capability, target, and measured result",
      "Private walkthroughs when client confidentiality prevents publication",
    ],
  },
  process: [
    { title: "Define the baseline", body: "Record the starting process, metric definition, source, and time period." },
    { title: "Document the build", body: "Keep campaign structure, workflow logic, integrations, ownership, and release history inspectable." },
    { title: "Trace the outcome", body: "Connect the reported change to CRM history, call logs, platform data, or agreed attribution." },
    { title: "Publish with context", body: "State what changed, what did not, the period measured, and whether client identity is approved." },
  ],
  faqs: [
    { q: "Are all items named client case studies?", a: "No. First-party products, delivery blueprints, and measurement standards are labelled separately. Named client results will appear only with permission and verifiable context." },
    { q: "Can we inspect a relevant system?", a: "Yes. Request a walkthrough with your industry and current workflow. We can demonstrate an owned product or the closest non-confidential delivery artefact." },
    { q: "What counts as a verified result?", a: "A defined baseline and period, traceable source data, agreed metric definitions, relevant caveats, and permission to publish." },
  ],
};

export const workPages: Record<string, WorkContent> = {
  "case-studies": {
    slug: "case-studies",
    title: "System Evidence",
    eyebrow: "Work",
    subtitle:
      "First-party systems and observable capabilities that can be demonstrated today, without borrowing credibility from unnamed clients.",
    metaTitle: "Growth System Evidence",
    metaDescription: "Inspect first-party Vistrow product and website systems, the workflows they support, and the evidence available in a product walkthrough.",
    items: [
      {
        title: "Vistrow Voice: connected AI calling",
        tag: "Owned product",
        summary: "Inbound, outbound, and web calling connected to knowledge, qualification, scheduling, and CRM webhooks.",
        metric: "10",
        metricLabel: "Supported Indian languages",
        evidence: ["Live product walkthrough", "Call history and transcript review", "Webhook and handoff demonstration"],
        href: "/products/vistrow-voice",
        linkLabel: "Review Vistrow Voice",
      },
      {
        title: "ArthaLeads: real-estate lead operations",
        tag: "Owned product",
        summary: "A unified workflow for leads from advertising, WhatsApp, websites, and property portals, with assignment and follow-up visibility.",
        metric: "One",
        metricLabel: "Operational lead workspace",
        evidence: ["Live product walkthrough", "Lead-source and pipeline demonstration", "Role and follow-up workflow review"],
        href: "/products/arthaleads",
        linkLabel: "Review ArthaLeads",
      },
      {
        title: "Vistrow.com: connected acquisition journey",
        tag: "First-party build",
        summary: "A content, conversion, CRM-enquiry, analytics-consent, and measurement foundation built as one public system.",
        metric: "End-to-end",
        metricLabel: "Publicly inspectable journey",
        evidence: ["Route-specific metadata and schema", "Consent-aware analytics", "Validated enquiry and confirmation workflow"],
        href: "/approach",
        linkLabel: "See the delivery method",
      },
    ],
  },
  "campaign-portfolio": {
    slug: "campaign-portfolio",
    title: "Campaign Blueprints",
    eyebrow: "Work",
    subtitle: "The artefacts a measurable campaign should produce before anyone presents a performance claim.",
    metaTitle: "Performance Marketing Campaign Blueprints",
    metaDescription: "See the campaign architecture, creative testing, funnel, tracking, and reporting artefacts Vistrow uses for measurable performance marketing.",
    items: [
      { title: "Paid acquisition architecture", tag: "Delivery artefact", summary: "Account structure mapped to audience, offer, landing experience, CRM source data, and a qualified conversion event.", metric: "Traceable", metricLabel: "Campaign-to-pipeline path", evidence: ["Channel and campaign map", "UTM and CRM field specification", "Qualified conversion definition"] },
      { title: "Creative testing system", tag: "Delivery artefact", summary: "A documented set of hypotheses, hooks, formats, audiences, and decisions rather than an unstructured asset batch.", metric: "Documented", metricLabel: "Test-and-learn record", evidence: ["Creative matrix", "Test log and decision rule", "Winning and losing pattern review"] },
      { title: "Landing and lead handoff", tag: "Delivery artefact", summary: "The page, form, consent, routing, response, and CRM ownership needed to turn traffic into an actionable enquiry.", metric: "Connected", metricLabel: "Conversion handoff", evidence: ["Funnel map", "Form and event specification", "Routing and response test"] },
      { title: "Performance review pack", tag: "Delivery artefact", summary: "Reporting that separates media activity, lead quality, pipeline movement, and revenue attribution with visible caveats.", metric: "Agreed", metricLabel: "Metric definitions", evidence: ["Source-of-truth register", "Dashboard and QA checklist", "Monthly decision log"] },
    ],
  },
  "product-work": {
    slug: "product-work",
    title: "Product Work",
    eyebrow: "Work",
    subtitle: "Owned products and reusable system capabilities built around real operational workflows.",
    metaTitle: "Custom SaaS and Product Work",
    metaDescription: "Explore Vistrow Voice, ArthaLeads, and reusable product capabilities for calling, lead operations, reporting, and business workflows.",
    items: [
      { title: "AI voice qualification", tag: "Vistrow Voice", summary: "Knowledge-grounded conversations, qualification, call records, and CRM handoffs in a reviewable workflow.", metric: "24/7", metricLabel: "Configurable availability", evidence: ["Prompt and knowledge configuration", "Call outcome history", "Human handoff and webhook flow"], href: "/products/vistrow-voice", linkLabel: "Explore the product" },
      { title: "Unified real-estate lead operations", tag: "ArthaLeads", summary: "Multi-source capture, scoring, assignment, follow-up scheduling, site visits, pipeline, and operational reporting.", metric: "Multi-source", metricLabel: "Lead capture and ownership", evidence: ["Lead inbox and deduplication", "Role-based workflow", "Pipeline and activity reporting"], href: "/products/arthaleads", linkLabel: "Explore the product" },
      { title: "Custom internal tools", tag: "Vistrow Labs", summary: "Scoped dashboards, portals, and workflow interfaces built only after the operating process and ownership are defined.", metric: "Purpose-built", metricLabel: "Workflow fit", evidence: ["Process and permission map", "Prototype and acceptance criteria", "Release and support plan"], href: "/products/vistrow-labs", linkLabel: "Explore Vistrow Labs" },
    ],
  },
  "client-results": {
    slug: "client-results",
    title: "Measurement Standards",
    eyebrow: "Work",
    subtitle: "The minimum evidence required before Vistrow presents an operational or commercial outcome as a client result.",
    metaTitle: "Marketing and Automation Measurement Standards",
    metaDescription: "See how Vistrow defines baselines, attribution, lead quality, response time, and evidence before publishing client outcomes.",
    items: [
      { title: "Lead response", tag: "Verification standard", summary: "Measure from an agreed lead-created timestamp to the first meaningful automated or human response, with channel and business-hour context.", metric: "Timestamped", metricLabel: "CRM or workflow evidence", evidence: ["Start and end event definition", "Exceptions and failed attempts", "Median and distribution, not a single best case"] },
      { title: "Qualified lead cost", tag: "Verification standard", summary: "Define qualification before the campaign starts and reconcile platform spend with CRM-qualified records.", metric: "Reconciled", metricLabel: "Spend and CRM records", evidence: ["Qualification rule", "Source and campaign fields", "Rejected and duplicate lead handling"] },
      { title: "Pipeline attribution", tag: "Verification standard", summary: "Keep first touch, last touch, sales activity, stage history, and revenue source visible instead of claiming perfect attribution.", metric: "Contextual", metricLabel: "Attribution, not certainty", evidence: ["Agreed model and limitations", "CRM stage history", "Offline and assisted-touch caveats"] },
      { title: "Operational scale", tag: "Verification standard", summary: "Compare handled volume, exceptions, human workload, and service quality over a defined period.", metric: "Comparable", metricLabel: "Before-and-after period", evidence: ["Equivalent time windows", "Volume and quality together", "Implementation and staffing changes disclosed"] },
    ],
  },
};
