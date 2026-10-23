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
    { label: "Vistrow Voice", href: "/products/vistrow-voice", body: "India-native AI voice agents for inbound, outbound, and web calls in 130+ languages.", icon: Phone },
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
    metaTitle: "Vistrow Voice: AI Voice Calling Agent for India",
    metaDescription:
      "Vistrow Voice provides inbound, outbound, and web-based AI calling in 130+ languages, including Hindi, English and 9 more Indian languages, with knowledge-grounded answers and CRM webhooks.",
    useCases: [
      { icon: Phone, title: "Inbound call handling", body: "Answer every incoming call, qualify intent, and route or book the next step." },
      { icon: Activity, title: "Outbound campaigns", body: "Run reminder, follow-up, and collection calls at scale without manual dialling." },
      { icon: Globe2, title: "Website voice widget", body: "Let visitors talk to your AI agent in the browser without sharing a phone number." },
    ],
    features: [
      { icon: Languages, title: "130+ languages", body: "Speak with customers in 130+ languages, including Hindi, English, Hinglish and 9 more Indian languages, with mid-sentence language switching." },
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
    externalUrl: "https://www.vistrowvoice.com/",
    externalLabel: "Try Vistrow Voice",
    faqs: [
      {
        q: "What languages does Vistrow Voice support?",
        a: "Hindi, Marathi, Tamil, Telugu, Kannada, Malayalam, Gujarati, Bengali, Punjabi and Odia, plus English and everyday Hinglish, out of more than 130 supported languages. One agent covers them all and follows the caller when they switch language mid-call.",
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
        { value: "130+", label: "Languages" },
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
    tagline: "AI-powered real estate CRM",
    subtitle:
      "An AI-powered real estate CRM for Indian builders, developers, channel partners and brokers. Every enquiry from Facebook, Instagram, WhatsApp, websites, portals and walk-ins lands in one workspace, AI scores who to call first, and a WhatsApp AI agent replies to buyers day and night.",
    metaTitle: "ArthaLeads: AI-Powered Real Estate CRM Software India",
    metaDescription:
      "ArthaLeads is an AI-powered real estate CRM for Indian builders and channel partners: AI lead scoring, a 24/7 WhatsApp AI agent, call intelligence and GST invoices.",
    useCases: [
      { icon: Database, title: "Every enquiry in one place", body: "Facebook and Instagram lead ads, WhatsApp chats, website forms, portal leads and walk-ins in one shared workspace." },
      { icon: Users, title: "Builders, channel partners and brokers", body: "Project-wise pipelines for developers, per-developer brokerage for channel partners, and a shared WhatsApp inbox for small teams." },
      { icon: MapPin, title: "From enquiry to site visit and booking", body: "Follow-ups, site visits, bookings and invoices tracked on the same lead record." },
    ],
    features: [
      { icon: Activity, title: "AI lead scoring", body: "Every lead is scored 0-100 on budget, urgency and engagement, so agents know who to call first." },
      { icon: Bell, title: "WhatsApp AI agent, 24/7", body: "Answers buyer questions day and night in English, Hinglish, Hindi or Marathi, and your team can take over any chat." },
      { icon: BarChart3, title: "AI call intelligence", body: "Calls are transcribed, summarised and scored for intent, and the lead's stage moves on its own." },
      { icon: Boxes, title: "AI WhatsApp drafts", body: "AI drafts a personalised message for each lead; the agent reviews and sends in seconds." },
      { icon: MapPin, title: "Pipeline, site visits and bookings", body: "Drag leads from New to Contacted, Site Visit, Negotiation and Closed Won, then turn a closed deal into a booking." },
      { icon: Smartphone, title: "Invoices and mobile app", body: "Branded PDF invoices with brokerage and GST worked out, plus an Android app for calling and today's follow-ups." },
    ],
    howItWorks: [
      { title: "Capture every lead", body: "Connect Facebook and Instagram lead ads, WhatsApp and your website; import portal leads from a sheet. Duplicates are flagged before anyone calls." },
      { title: "Let AI prioritise", body: "Leads are scored, assigned to the right agent and answered on WhatsApp straight away, even at 1 AM." },
      { title: "Call, remark and follow up", body: "Agents call from the app, log outcomes and get reminders; call intelligence summarises each conversation." },
      { title: "Track and convert", body: "Move leads to site visit and booking, issue GST invoices, and review conversion by source, project and agent." },
    ],
    integrations: ["Facebook & Instagram lead ads", "WhatsApp (official Meta API)", "WordPress plugin & website forms", "Meta Conversions API", "Google Ads (Enterprise)", "API & webhooks (Enterprise)", "Vistrow Voice AI calling (Enterprise)", "CSV & Excel import/export"],
    security: [
      { icon: ShieldCheck, title: "Official WhatsApp API", body: "Built on Meta's WhatsApp Business Platform, not a browser extension or unofficial tool." },
      { icon: Users, title: "Data kept separate", body: "Each company's data is isolated, and role-based access shows agents only the leads assigned to them." },
      { icon: Activity, title: "DPDP-aware", body: "Cookie and privacy controls designed with India's DPDP Act in mind, and your leads stay exportable." },
    ],
    screenshots: [
      {
        src: "/images/products/arthaleads-real-estate-crm-dashboard.webp",
        alt: "ArthaLeads real estate CRM dashboard showing leads by source, leads reached within an hour, site visits, overdue follow-ups and AI-scored hot leads",
        title: "Dashboard",
        body: "Leads by source, how many were reached within an hour, site visits, overdue follow-ups and today's AI-scored hot leads.",
        width: 1600,
        height: 900,
      },
      {
        src: "/images/products/arthaleads-whatsapp-ai-agent-chat.webp",
        alt: "ArthaLeads WhatsApp AI agent replying to a property buyer's enquiry and asking whether they are buying for themselves or as an investment",
        title: "WhatsApp AI agent",
        body: "Replies to a buyer within seconds, shares project details and asks the first qualifying question.",
        width: 436,
        height: 896,
      },
      {
        src: "/images/products/arthaleads-whatsapp-inbox.webp",
        alt: "ArthaLeads WhatsApp inbox with buyer chats on the left and the WhatsApp AI agent replying to a new property enquiry",
        title: "WhatsApp inbox",
        body: "Every buyer chat in one inbox, with the AI agent's replies, lead score and the option for your team to take over any chat.",
        width: 1356,
        height: 762,
      },
      {
        src: "/images/products/arthaleads-team-performance.webp",
        alt: "ArthaLeads team performance board with total leads, site visits, closed bookings and call analytics for each team member",
        title: "Team performance",
        body: "Leads, site visits and bookings for each team member, with call analytics by day.",
        width: 1600,
        height: 900,
      },
      {
        src: "/images/products/arthaleads-lead-pipeline-site-visit-stages.webp",
        alt: "ArthaLeads lead pipeline with New, Contacted, Site Visit, Negotiation, Closed Won and Closed Lost columns",
        title: "Pipeline",
        body: "Every lead moves from New to Contacted, Site Visit, Negotiation and Closed Won.",
        width: 1600,
        height: 900,
      },
    ],
    demoCta: "Book a Demo",
    externalUrl: "https://www.arthaleads.com/",
    externalLabel: "Start the 14-day free trial",
    faqs: [
      {
        q: "What is ArthaLeads?",
        a: "ArthaLeads is an AI-powered real estate CRM built by Vistrow in Pune for Indian builders, developers, channel partners and brokers. It collects every property enquiry in one place, scores and assigns it, replies on WhatsApp with an AI agent, and tracks each lead from first call to site visit, booking and invoice.",
      },
      {
        q: "Which lead sources does ArthaLeads connect to?",
        a: "Facebook and Instagram lead ads import automatically, WhatsApp chats become leads, and website forms connect through the WordPress plugin or API. Google Ads is available on Enterprise. Leads from 99acres, Housing.com and MagicBricks can be added or imported from a sheet, and duplicates are flagged before anyone calls.",
      },
      {
        q: "Can the WhatsApp AI reply to buyers in Hindi or Marathi?",
        a: "Yes. On Growth and Enterprise the WhatsApp AI agent answers buyer questions day and night and follows the buyer's language, including English, Hinglish, Hindi and Marathi. Your team can take over any chat at any time.",
      },
      {
        q: "How much does ArthaLeads cost?",
        a: "Starter is Rs 599 and Growth is Rs 999 per user per month, plus 18% GST, with a five-seat minimum. Enterprise is quoted on team size. Annual billing gives two months free, and every team can start with a 14-day free trial of all Growth features, no credit card needed.",
      },
      {
        q: "Does ArthaLeads handle site visits, bookings and invoices?",
        a: "Yes. Leads move through New, Contacted, Site Visit, Negotiation and Closed Won, a closed deal becomes a booking in one click, and ArthaLeads generates a branded PDF invoice with brokerage and GST worked out.",
      },
      {
        q: "Is there a mobile app?",
        a: "Yes. Agents get an Android app for calling leads, logging outcomes and seeing today's follow-ups, and the web app works on any phone or computer.",
      },
    ],
    preview: {
      stats: [
        { value: "0-100", label: "AI lead score" },
        { value: "24/7", label: "WhatsApp AI" },
        { value: "₹599", label: "Per user / month" },
      ],
      rows: [
        { label: "Facebook & WhatsApp", value: "Auto-import" },
        { label: "Hot leads", value: "Scored" },
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
    metaTitle: "Vistrow Labs: Custom SaaS and Business Tools",
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
