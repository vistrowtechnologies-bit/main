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
      "AI voice agents that answer, qualify and book customers in their own language, on your phone number, your website and outbound campaigns, 24/7. Talk to Artha live before you decide: 5 free calls, no signup.",
    metaTitle: "Vistrow Voice: AI Voice Calling Agent for India",
    metaDescription:
      "Vistrow Voice provides inbound, outbound, and web-based AI calling in 130+ languages, including Hindi, English and 9 more Indian languages, with knowledge-grounded answers and CRM webhooks.",
    useCases: [
      { icon: Phone, title: "Inbound call handling", body: "Answer every incoming call 24/7, understand the need, and route, qualify or book the next step." },
      { icon: Activity, title: "Outbound campaigns", body: "Run reminder, follow-up and collection calls at scale without manual dialling." },
      { icon: Globe2, title: "Website call widget", body: "A one-tap call button on your site, so visitors can talk to the agent without a phone number." },
    ],
    features: [
      { icon: Languages, title: "130+ languages", body: "Hindi, English and 9 more Indian languages are included, with natural Hinglish. The agent follows the caller when they switch language mid-sentence." },
      { icon: BookOpen, title: "Answers from your documents", body: "Upload PDFs and docs. With strict mode on, the agent quotes your approved answers and never makes up prices." },
      { icon: Filter, title: "No-code agent builder", body: "Set the persona, prompt, voice and language, test it in the browser, then publish. Changes apply from the next call." },
      { icon: Activity, title: "Reads the caller's tone", body: "Picks up frustration, confusion or excitement and adjusts its pace and warmth during the call." },
      { icon: Plug, title: "CRM webhooks", body: "Every lead, outcome and transcript is pushed to your CRM and downstream workflows." },
      { icon: CalendarCheck, title: "Qualification and booking", body: "Asks your qualifying questions, books the next step and saves the answers as lead fields." },
    ],
    howItWorks: [
      { title: "Connect a number", body: "Bring your own number from a compatible provider, or use the website widget with no number at all." },
      { title: "Train on your knowledge", body: "Upload PDFs and documents, then set the agent's persona, voice, language and rules." },
      { title: "Go live", body: "Publish the agent on inbound calls, outbound campaigns or your website." },
      { title: "Review and improve", body: "Read transcripts, call outcomes and analytics, and refine the agent from the next call." },
    ],
    integrations: ["Your phone number", "Website call widget", "CRM webhooks", "PDF & document knowledge", "Live catalog feed", "Full API (Scale plan)"],
    security: [
      { icon: BookOpen, title: "Strict mode", body: "The agent quotes only your approved answers and says it will check with the team when something is not covered, instead of guessing." },
      { icon: Users, title: "Hand-off to a person", body: "On phone calls it dials the colleague you set and stays on until they answer. Website calls take a callback request instead." },
      { icon: ShieldCheck, title: "Consent and recording", body: "Require spoken consent, switch recording on or off, and set how long records are kept." },
      { icon: Layers, title: "Every call logged", body: "A transcript for every call, the lead fields captured, and the audio when recording is on." },
    ],
    screenshots: [
      {
        src: "/images/products/vistrow-voice-dashboard-overview.webp",
        alt: "Vistrow Voice dashboard overview with sample data: calls handled, minutes left, qualified leads, appointments and recent calls",
        title: "Dashboard",
        body: "Calls handled, qualified leads, appointments booked and minutes left, with the latest calls underneath.",
        width: 1576,
        height: 982,
        bare: true,
      },
      {
        src: "/images/products/vistrow-voice-call-history.webp",
        alt: "Vistrow Voice call history with sample data: phone and website widget calls with status, direction, duration, sentiment and agent",
        title: "Call history",
        body: "Every phone and website call with its direction, duration, sentiment and the agent that took it.",
        width: 1576,
        height: 982,
        bare: true,
      },
      {
        src: "/images/products/vistrow-voice-agents.webp",
        alt: "Three Vistrow Voice agent cards: a clinic front desk, a property enquiries agent and an EMI reminder agent",
        title: "Agents",
        body: "One agent per job, such as a front desk, a property enquiry agent and a reminder agent, each with its own voice and language.",
        width: 1200,
        height: 526,
      },
      {
        src: "/images/products/vistrow-voice-usage.webp",
        alt: "Vistrow Voice usage page with sample data: plan minutes used per day and by channel, agent and voice tier",
        title: "Usage",
        body: "Where plan minutes go: by day, channel, agent and voice tier.",
        width: 1600,
        height: 797,
      },
    ],
    demoCall: {
      title: "Hear how a qualifying call goes",
      body: "A property enquiry in Hindi and Hinglish. Artha asks the purpose, plot size and budget, does not make up a price, and saves the answers for your sales team.",
      language: "Hindi + Hinglish",
      label: "Sample script, not a real customer",
      turns: [
        { speaker: "agent", text: "Namaste, I am calling about your interest in the Khopoli project. Are you exploring this for investment or self-use?" },
        { speaker: "caller", text: "Investment ke liye hai." },
        { speaker: "agent", text: "Great. Which plot size are you roughly looking at, and do you have a budget range in mind?" },
        { speaker: "caller", text: "Lagbhag 6000 square feet. Pricing bata dijiye." },
        { speaker: "agent", text: "I will have the sales team confirm exact availability and pricing. I am noting this as an investment enquiry for a larger plot." },
      ],
      saved: [
        { label: "Purpose", value: "Investment" },
        { label: "Plot size", value: "About 6,000 sq ft" },
        { label: "Language", value: "Hindi + Hinglish" },
        { label: "Next step", value: "Sales to confirm price" },
      ],
      href: "https://www.vistrowvoice.com/",
    },
    languages: {
      title: "Customers speak their language. Artha follows.",
      body: "More than 130 languages, including Hindi, English and these 9 Indian languages. One agent covers them all, with no separate set-up per language, and switches mid-call when the caller does.",
      items: [
        { native: "नमस्ते", name: "Hindi" },
        { native: "नमस्कार", name: "Marathi" },
        { native: "வணக்கம்", name: "Tamil" },
        { native: "నమస్కారం", name: "Telugu" },
        { native: "ನಮಸ್ಕಾರ", name: "Kannada" },
        { native: "നമസ്കാരം", name: "Malayalam" },
        { native: "નમસ્તે", name: "Gujarati" },
        { native: "নমস্কার", name: "Bengali" },
        { native: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ", name: "Punjabi" },
        { native: "ନମସ୍କାର", name: "Odia" },
        { native: "Hello", name: "English" },
        { native: "Hinglish", name: "Mixed, mid-sentence" },
      ],
    },
    plans: {
      title: "Three plans, sized by agents and call capacity",
      body: "Usage is measured in minutes of conversation. The voice and model you choose change how quickly minutes are used.",
      note: "Pricing is shared on request while plans are being finalised. Telephony (number rental and carrier minutes) is billed by your provider, and GST applies to plan prices.",
      items: [
        { name: "Starter", summary: "For trying voice AI on one real use case before scaling up.", features: ["1 AI agent", "1 knowledge base", "Up to 5 concurrent calls", "Call history and dashboard"] },
        { name: "Growth", summary: "For teams automating inbound and outbound campaigns.", features: ["5 AI agents", "5 knowledge bases", "Up to 15 concurrent calls", "Inbound and outbound campaigns", "CRM webhook integration", "Full analytics"] },
        { name: "Scale", summary: "Full API access and integrations for production volume.", features: ["20 AI agents", "15 knowledge bases", "Up to 30 concurrent calls", "Full API access", "Premium voice tier", "Everything in Growth"] },
      ],
    },
    demoCta: "Book a Demo",
    externalUrl: "https://www.vistrowvoice.com/",
    externalLabel: "Talk to Artha live",
    faqs: [
      {
        q: "What languages does Vistrow Voice support?",
        a: "More than 130 languages, including Hindi, Marathi, Tamil, Telugu, Kannada, Malayalam, Gujarati, Bengali, Punjabi and Odia, plus English and everyday Hinglish. One agent covers them all and follows the caller when they switch language mid-call.",
      },
      {
        q: "Can I try it before buying?",
        a: "Yes. You can talk to Artha live in your browser on vistrowvoice.com, with 5 free calls and no signup or card needed.",
      },
      {
        q: "How is Vistrow Voice priced?",
        a: "There are three plans, Starter, Growth and Scale, sized by agents, knowledge bases and concurrent calls. Pricing is shared on request. Usage is measured in minutes of conversation, telephony is billed separately by your provider, and GST applies.",
      },
      {
        q: "Can it handle both inbound and outbound calls?",
        a: "Yes. It answers inbound calls, runs outbound campaigns such as reminders and follow-ups, and works as a one-tap call widget on your website.",
      },
      {
        q: "What happens when the agent does not know the answer?",
        a: "With strict mode on, it quotes only your approved answers and tells the caller it will check with the team, rather than guessing. On phone calls it can also bring in the colleague you set and stay on until they answer.",
      },
      {
        q: "Does Vistrow Voice connect to my CRM?",
        a: "Yes, through CRM webhooks. Leads, call outcomes and transcripts are pushed into your CRM automatically. ArthaLeads, Vistrow's real estate CRM, connects to it directly.",
      },
    ],
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
