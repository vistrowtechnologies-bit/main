import {
  Phone,
  Database,
  FlaskConical,
  Clock,
  CalendarCheck,
  Filter,
  Layers,
  ShieldCheck,
  Lock,
  Activity,
  Boxes,
  Plug,
} from "lucide-react";
import type { ProductContent, OverviewContent } from "@/lib/content-types";

export const productsOverview: OverviewContent = {
  eyebrow: "Products",
  title: "Proprietary tools that strengthen the",
  highlight: "system",
  subtitle:
    "Software built to plug into your marketing and sales—so you respond faster, qualify smarter, and convert more of what you already generate.",
  metaTitle: "Products",
  metaDescription: "Vistrow Voice, ArthaLeads, and Vistrow Labs—products that connect marketing to conversion.",
  cardsTitle: "Our products",
  cards: [
    { label: "Vistrow Voice", href: "/products/vistrow-voice", body: "AI voice responder that qualifies leads by phone 24/7.", icon: Phone },
    { label: "ArthaLeads", href: "/products/arthaleads", body: "High-intent lead generation engine and clean dashboard.", icon: Database },
    { label: "Vistrow Labs", href: "/products/vistrow-labs", body: "Custom SaaS and internal tools built for your workflow.", icon: FlaskConical },
  ],
};

export const products: Record<string, ProductContent> = {
  "vistrow-voice": {
    slug: "vistrow-voice",
    name: "Vistrow Voice",
    tagline: "AI voice responder",
    subtitle:
      "An AI voice agent that calls new leads within seconds, qualifies them naturally, answers common questions, and books appointments straight into your calendar—24/7.",
    metaTitle: "Vistrow Voice — AI Voice Responder",
    metaDescription:
      "Vistrow Voice calls and qualifies leads by phone in seconds, books appointments, and logs everything to your CRM.",
    useCases: [
      { icon: Clock, title: "Instant speed-to-lead", body: "Call every new lead the moment it arrives, before it goes cold." },
      { icon: CalendarCheck, title: "Appointment booking", body: "Qualify and book directly into your team's calendar." },
      { icon: Phone, title: "After-hours coverage", body: "Handle nights, weekends, and volume spikes without missed leads." },
    ],
    features: [
      { icon: Activity, title: "Natural conversation", body: "Real-time voice that qualifies without sounding robotic." },
      { icon: Filter, title: "Smart qualification", body: "Scores and sorts leads with logic tuned to your criteria." },
      { icon: CalendarCheck, title: "Calendar integration", body: "Books meetings into Google Calendar, Cal.com, and more." },
      { icon: Database, title: "CRM logging", body: "Every call, transcript, and outcome synced automatically." },
      { icon: Layers, title: "Human handoff", body: "Escalates to a person when the conversation calls for it." },
      { icon: Phone, title: "Recording & transcripts", body: "Full records for coaching and quality assurance." },
    ],
    howItWorks: [
      { title: "Lead arrives", body: "A new lead triggers Vistrow Voice instantly." },
      { title: "AI calls & qualifies", body: "The agent calls, asks your questions, and scores intent." },
      { title: "Books or hands off", body: "It books a meeting or routes a hot lead to a human." },
      { title: "Syncs to CRM", body: "Notes, transcript, and outcome land in your CRM." },
    ],
    integrations: ["Twilio", "HubSpot", "Pipedrive", "Google Calendar", "Cal.com", "Zapier", "Make"],
    security: [
      { icon: Lock, title: "Data protection", body: "Encryption in transit and at rest, with access controls." },
      { icon: ShieldCheck, title: "Consent & compliance", body: "Built with call consent and regional rules in mind." },
      { icon: Activity, title: "Reliable uptime", body: "Monitored infrastructure designed for always-on response." },
    ],
    demoCta: "Book a Demo",
  },

  arthaleads: {
    slug: "arthaleads",
    name: "ArthaLeads",
    tagline: "Lead generation engine",
    subtitle:
      "A high-intent lead generation engine that sources prospects across channels and consolidates them into a single, clean, actionable dashboard.",
    metaTitle: "ArthaLeads — Lead Generation Engine",
    metaDescription:
      "ArthaLeads sources high-intent prospects across channels into one clean dashboard, ready to route into your CRM.",
    useCases: [
      { icon: Filter, title: "Consolidated lead flow", body: "One dashboard for leads from every channel." },
      { icon: Database, title: "CRM-ready pipeline", body: "Clean, deduplicated leads routed to sales." },
      { icon: Activity, title: "Source insight", body: "See which channels produce real pipeline." },
    ],
    features: [
      { icon: Boxes, title: "Multi-channel sourcing", body: "Pull leads from paid, organic, and inbound in one place." },
      { icon: Filter, title: "Deduplication & scoring", body: "Clean data with intent scoring built in." },
      { icon: Database, title: "One clean dashboard", body: "No more spreadsheets or scattered inboxes." },
      { icon: Plug, title: "CRM routing", body: "Send qualified leads to the right owner automatically." },
      { icon: Activity, title: "Source reporting", body: "Attribution down to the channel and campaign." },
      { icon: Layers, title: "Enrichment", body: "Add context so sales knows who they're calling." },
    ],
    howItWorks: [
      { title: "Connect channels", body: "Link your lead sources and campaigns." },
      { title: "Consolidate & clean", body: "Leads are deduplicated, scored, and enriched." },
      { title: "Route to CRM", body: "Qualified leads flow to the right owner." },
      { title: "Measure sources", body: "See which channels create pipeline." },
    ],
    integrations: ["Meta Lead Ads", "Google Ads", "HubSpot", "Pipedrive", "Zapier", "Webhooks"],
    security: [
      { icon: Lock, title: "Secure data handling", body: "Encrypted storage and controlled access." },
      { icon: ShieldCheck, title: "Privacy compliant", body: "Consent and data-handling aligned to regulation." },
      { icon: Activity, title: "Dependable sync", body: "Monitored pipelines so leads never stall." },
    ],
    demoCta: "Book a Demo",
  },

  "vistrow-labs": {
    slug: "vistrow-labs",
    name: "Vistrow Labs",
    tagline: "Custom SaaS & internal tools",
    subtitle:
      "Where we build custom SaaS products and internal tools for businesses that need software shaped around their exact workflow.",
    metaTitle: "Vistrow Labs — Custom SaaS & Tools",
    metaDescription:
      "Vistrow Labs builds custom SaaS and internal tools—dashboards, portals, and automations tailored to your workflow.",
    useCases: [
      { icon: Boxes, title: "Internal tools", body: "Dashboards and admin tools your team actually needs." },
      { icon: Layers, title: "Customer portals", body: "Branded portals for clients and partners." },
      { icon: Activity, title: "Data & reporting apps", body: "Turn scattered data into decisions." },
    ],
    features: [
      { icon: FlaskConical, title: "Product discovery", body: "Scope and validate before building." },
      { icon: Boxes, title: "Custom builds", body: "Web apps and tools tailored to your process." },
      { icon: Plug, title: "Integrations", body: "Connect to your existing stack and data." },
      { icon: Activity, title: "Analytics built in", body: "Reporting designed into the product." },
      { icon: Layers, title: "Scalable architecture", body: "Built to grow without a rebuild." },
      { icon: ShieldCheck, title: "Maintained & supported", body: "Documentation and ongoing support included." },
    ],
    howItWorks: [
      { title: "Discover", body: "Define the problem, users, and scope." },
      { title: "Design", body: "Prototype the workflow and interface." },
      { title: "Build", body: "Develop, integrate, and test the product." },
      { title: "Launch & support", body: "Ship, document, and maintain it." },
    ],
    integrations: ["Next.js", "Supabase", "Postgres", "Stripe", "Custom APIs", "Retool"],
    security: [
      { icon: Lock, title: "Secure by design", body: "Auth, access control, and encryption from day one." },
      { icon: ShieldCheck, title: "Compliance-aware", body: "Built with your regulatory needs in mind." },
      { icon: Activity, title: "Monitored & maintained", body: "Reliability and support after launch." },
    ],
    demoCta: "Talk to Vistrow Labs",
  },
};
