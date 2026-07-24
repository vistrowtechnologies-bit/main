import {
  Phone,
  Database,
  FlaskConical,
  CalendarCheck,
  Filter,
  Layers,
  ShieldCheck,
  Lock,
  Activity,
  Boxes,
  Plug,
  Languages,
  BookOpen,
  Globe2,
  Users,
  MapPin,
  Bell,
  BarChart3,
  Smartphone,
} from "lucide-react";
import type { ProductContent, OverviewContent } from "@/lib/content-types";

export const productsOverview: OverviewContent = {
  eyebrow: "Products",
  title: "Proprietary tools that strengthen the",
  highlight: "system",
  subtitle:
    "Software built to plug into your marketing and sales - so you respond faster, qualify smarter, and convert more of what you already generate.",
  metaTitle: "AI Voice, Real Estate CRM, and Custom Software",
  metaDescription: "Explore Vistrow Voice AI calling agents, ArthaLeads real estate CRM, and custom SaaS and internal software from Vistrow Labs.",
  cardsTitle: "Our products",
  cards: [
    { label: "Vistrow Voice", href: "/products/vistrow-voice", body: "India-native AI voice agents for inbound, outbound, and web calls in 10 languages.", icon: Phone },
    { label: "ArthaLeads", href: "/products/arthaleads", body: "A real-estate CRM that brings Facebook, Google, WhatsApp, and website leads into one workspace.", icon: Database },
    { label: "Vistrow Labs", href: "/products/vistrow-labs", body: "Custom SaaS and internal tools built for your workflow.", icon: FlaskConical },
  ],
  intro: {
    eyebrow: "Built from real operating problems",
    title: "Products that remove the gaps between enquiry, response, and action.",
    body:
      "Our products are designed to work on their own and as part of a connected growth system. Use the live platforms directly, or work with Vistrow to integrate them into your CRM, campaigns, calendars, and internal processes.",
    points: [
      "Vistrow Voice handles inbound, outbound, and web calls",
      "ArthaLeads manages property leads and real-estate sales activity",
      "Vistrow Labs builds software around unique workflows",
      "Implementation and integration support available",
    ],
  },
  process: [
    { title: "Choose the product", body: "Start with the operating problem: calling, real-estate lead management, or custom software." },
    { title: "Configure the workflow", body: "Set sources, team rules, knowledge, qualification, and desired outcomes." },
    { title: "Connect your stack", body: "Link forms, campaigns, CRM, calendars, webhooks, and internal tools." },
    { title: "Launch and improve", body: "Use live activity and operational data to refine how the product performs." },
  ],
  faqs: [
    { q: "Can we use the products without a Vistrow marketing engagement?", a: "Yes. ArthaLeads and Vistrow Voice can be explored as standalone products, and Vistrow can help with setup or integration when needed." },
    { q: "Can Vistrow connect these products to our existing tools?", a: "Yes. Integration and workflow design are core parts of our business automation and Vistrow Labs work." },
    { q: "Which product should we start with?", a: "Choose Vistrow Voice for automated calls, ArthaLeads for real-estate CRM and lead operations, and Vistrow Labs when the workflow needs custom software." },
  ],
};

export const products: Record<string, ProductContent> = {
  "vistrow-voice": {
    slug: "vistrow-voice",
    name: "Vistrow Voice",
    tagline: "India-native voice AI",
    subtitle:
      "AI voice agents that answer, qualify, and book in your customers’ language - across inbound calls, outbound campaigns, and a one-tap website calling widget, live 24/7.",
    metaTitle: "Vistrow Voice - AI Voice Agents for India",
    metaDescription:
      "Vistrow Voice provides inbound, outbound, and web-based AI calling in 10 Indian languages, with knowledge-grounded answers and CRM webhooks.",
    useCases: [
      { icon: Phone, title: "Inbound call handling", body: "Answer every incoming call, qualify intent, and route or book the next step." },
      { icon: Activity, title: "Outbound campaigns", body: "Run reminder, follow-up, and collection calls at scale without manual dialling." },
      { icon: Globe2, title: "Website voice widget", body: "Let visitors talk to your AI agent in the browser without sharing a phone number." },
    ],
    features: [
      { icon: Languages, title: "10 Indian languages", body: "Speak with customers in Hindi, Hinglish, and eight more Indian languages." },
      { icon: Activity, title: "Low-latency conversation", body: "Real-time, emotion-aware conversations designed to feel responsive." },
      { icon: BookOpen, title: "Knowledge base", body: "Ground answers in uploaded PDFs and documents using retrieval-based knowledge." },
      { icon: Filter, title: "No-code agent builder", body: "Configure persona, prompts, voice, language, and business rules without coding." },
      { icon: Plug, title: "CRM webhooks", body: "Push leads, outcomes, and transcripts into your CRM and downstream workflows." },
      { icon: CalendarCheck, title: "Qualification and booking", body: "Answer questions, qualify intent, and book the right next action around the clock." },
    ],
    howItWorks: [
      { title: "Connect a number", body: "Bring your own number or provision one and point inbound traffic at the agent." },
      { title: "Train on your knowledge", body: "Upload PDFs and documents, then configure the agent’s voice, language, and rules." },
      { title: "Go live", body: "Publish inbound, outbound, or website calling in minutes." },
      { title: "Review and improve", body: "Use call history, analytics, transcripts, and webhook outcomes to refine performance." },
    ],
    integrations: ["Phone numbers", "Website call widget", "CRM webhooks", "Calendars", "PDF & document knowledge", "Custom workflows"],
    security: [
      { icon: BookOpen, title: "Knowledge-grounded answers", body: "Responses stay anchored to the business information you provide." },
      { icon: Layers, title: "Controlled escalation", body: "Define when the agent should route, book, or hand a conversation to a person." },
      { icon: Activity, title: "Observable conversations", body: "Call history and analytics make performance reviewable rather than opaque." },
    ],
    demoCta: "Book a Demo",
    externalUrl: "https://voice-three-flax.vercel.app/",
    externalLabel: "Try Vistrow Voice",
    faqs: [
      {
        q: "What languages does Vistrow Voice support?",
        a: "Vistrow Voice speaks Hindi, Hinglish, and eight other Indian languages, so agents can handle calls in the language your customers actually use.",
      },
      {
        q: "Can Vistrow Voice handle both inbound and outbound calls?",
        a: "Yes. It answers inbound calls, runs outbound campaigns such as reminders and follow-ups, and can also be embedded as a one-tap voice widget on your website.",
      },
      {
        q: "How does the AI know what to say about my business?",
        a: "You upload PDFs and documents as a knowledge base. The agent grounds its answers in that material instead of guessing, and you configure its persona, voice, and business rules without writing code.",
      },
      {
        q: "Does Vistrow Voice connect to my CRM?",
        a: "Yes, via CRM webhooks. Leads, call outcomes, and transcripts are pushed into your CRM and downstream workflows automatically.",
      },
      {
        q: "What happens when the AI agent can't handle a call?",
        a: "You define escalation rules up front, so the agent can route, book a follow-up, or hand the conversation to a person when a call needs it.",
      },
    ],
    preview: {
      stats: [
        { value: "10", label: "Indian languages" },
        { value: "24/7", label: "Always answering" },
        { value: "3", label: "Calling channels" },
      ],
      rows: [
        { label: "Inbound calls", value: "Live" },
        { label: "Knowledge base", value: "Grounded" },
        { label: "CRM webhook", value: "Connected" },
      ],
    },
  },

  arthaleads: {
    slug: "arthaleads",
    name: "ArthaLeads",
    tagline: "Real estate CRM",
    subtitle:
      "A premium real-estate CRM for Indian developers, brokers, and channel partners - bringing Facebook Ads, Google Ads, WhatsApp enquiries, and website leads into one actionable workspace.",
    metaTitle: "ArthaLeads - Real Estate CRM for India",
    metaDescription:
      "ArthaLeads is a real-estate CRM for Indian developers and channel partners, with multi-channel lead capture, team assignment, site visits, follow-ups, and analytics.",
    useCases: [
      { icon: Database, title: "One property-lead workspace", body: "Bring Facebook, Google, WhatsApp, website, CSV, and manual leads together." },
      { icon: Users, title: "Team assignment and tracking", body: "Assign enquiries to agents and keep ownership and progress visible." },
      { icon: MapPin, title: "Site-visit management", body: "Schedule property visits and keep the next action connected to each lead." },
    ],
    features: [
      { icon: Boxes, title: "Multi-channel lead capture", body: "Capture enquiries from Facebook Ads, Google Ads, WhatsApp, and website forms." },
      { icon: Users, title: "Agent assignment", body: "Distribute leads across sales teams and maintain clear ownership." },
      { icon: Bell, title: "Follow-up reminders", body: "Keep callbacks, meetings, and next actions visible so opportunities do not stall." },
      { icon: MapPin, title: "Site-visit scheduling", body: "Plan property visits and track movement from enquiry to visit and conversion." },
      { icon: BarChart3, title: "Performance analytics", body: "Understand lead sources, agent activity, follow-ups, and conversion movement." },
      { icon: Smartphone, title: "Web and mobile ready", body: "Access the CRM through the web with Android and iOS support." },
    ],
    howItWorks: [
      { title: "Connect lead sources", body: "Bring Facebook, Google, WhatsApp, website, WordPress, and imported leads into one workspace." },
      { title: "Assign and prioritise", body: "Route each enquiry to the right agent with the context needed to respond." },
      { title: "Follow up and schedule", body: "Track reminders, conversations, and site visits from a shared pipeline." },
      { title: "Measure conversion", body: "Review source and team performance, then improve the process with real pipeline data." },
    ],
    integrations: ["Facebook Ads", "Google Ads", "WhatsApp", "Website forms", "WordPress plugin", "CSV import & export"],
    security: [
      { icon: ShieldCheck, title: "DPDP-aware experience", body: "Cookie and privacy controls are designed with India’s DPDP Act in mind." },
      { icon: Users, title: "Team-level ownership", body: "Lead assignment keeps accountability visible across agents and managers." },
      { icon: Activity, title: "Operational visibility", body: "Follow-ups, visits, and performance stay reviewable in one workspace." },
    ],
    demoCta: "Book a Demo",
    externalUrl: "https://www.arthaleads.com/",
    externalLabel: "Open ArthaLeads",
    faqs: [
      {
        q: "What lead sources does ArthaLeads connect to?",
        a: "ArthaLeads brings in leads from Facebook Ads, Google Ads, WhatsApp, website forms, real-estate portals such as 99acres, Housing.com, and MagicBricks, plus CSV import and manual entry - all into one workspace.",
      },
      {
        q: "How does ArthaLeads help agents prioritise which lead to call first?",
        a: "Every lead is scored automatically based on budget, urgency, pipeline stage, and engagement, and surfaced in a daily 'Hot Today' list so agents know who to call first instead of guessing.",
      },
      {
        q: "Can ArthaLeads prevent the same lead being called twice by different agents?",
        a: "Yes. Its duplicate-detection engine recognises the same phone number even across different formats, so each lead is only assigned and called once.",
      },
      {
        q: "Does ArthaLeads handle site visits and bookings, not just enquiries?",
        a: "Yes. It tracks the full pipeline from new enquiry through site visit to booking, and can convert a closed deal into an invoice with GST calculated automatically.",
      },
      {
        q: "Is ArthaLeads built specifically for the Indian real estate market?",
        a: "Yes. It's designed around how Indian developers, brokers, and channel partner teams actually sell property - including WhatsApp-heavy workflows, telecaller follow-up, and India-specific portals and compliance.",
      },
    ],
    preview: {
      stats: [
        { value: "4+", label: "Lead sources" },
        { value: "1", label: "Shared workspace" },
        { value: "Web", label: "+ mobile" },
      ],
      rows: [
        { label: "Facebook & Google", value: "Connected" },
        { label: "Agent assignment", value: "Active" },
        { label: "Site visits", value: "Tracked" },
      ],
    },
  },

  "vistrow-labs": {
    slug: "vistrow-labs",
    name: "Vistrow Labs",
    tagline: "Custom SaaS & internal tools",
    subtitle:
      "Where we build custom SaaS products and internal tools for businesses that need software shaped around their exact workflow.",
    metaTitle: "Vistrow Labs - Custom SaaS & Tools",
    metaDescription:
      "Vistrow Labs builds custom SaaS and internal tools - dashboards, portals, and automations tailored to your workflow.",
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
    faqs: [
      {
        q: "What kind of software does Vistrow Labs build?",
        a: "Internal tools and dashboards, customer and partner portals, and data or reporting apps - custom software shaped around a specific workflow rather than an off-the-shelf product.",
      },
      {
        q: "What's the process for a Vistrow Labs project?",
        a: "It starts with discovery to define the problem, users, and scope, then design and prototyping, then a build phase with integrations and testing, followed by launch with documentation and ongoing support.",
      },
      {
        q: "Can Vistrow Labs integrate with our existing tools?",
        a: "Yes. Projects are typically built on Next.js, Supabase, Postgres, Stripe, or Retool, and connect to your existing stack and data through custom APIs where needed.",
      },
      {
        q: "Do you support the software after launch?",
        a: "Yes, ongoing maintenance, documentation, and support are part of the engagement rather than a one-off handoff.",
      },
    ],
    preview: {
      stats: [
        { value: "Custom", label: "Workflows" },
        { value: "Live", label: "Dashboards" },
        { value: "API", label: "Connected" },
      ],
      rows: [
        { label: "Discovery", value: "Scoped" },
        { label: "Prototype", value: "Tested" },
        { label: "Delivery", value: "Supported" },
      ],
    },
  },
};
