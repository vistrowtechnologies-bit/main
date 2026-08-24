import { MapPin, Zap, Users2, LineChart } from "lucide-react";
import type { LocationContent, OverviewContent } from "@/lib/content-types";

export const locationsOverview: OverviewContent = {
  eyebrow: "Locations",
  title: "The digital marketing agency Pune businesses call",
  highlight: "call first",
  subtitle:
    "Vistrow is based in Baner, Pune, and works with businesses across Pimpri-Chinchwad, Hinjewadi, Wakad, Kothrud, and the wider city - connecting marketing, CRM, and automation into one system.",
  metaTitle: "Best Digital Marketing Agency in Pune | Vistrow Technologies",
  metaDescription:
    "Vistrow is a Pune-based digital marketing and business automation agency serving Baner, Pimpri-Chinchwad, Hinjewadi, Wakad, and Kothrud. See areas we serve.",
  cardsTitle: "Areas we serve around Pune",
  cards: [
    { label: "Pune", href: "/locations/pune", body: "Full-stack digital marketing and automation for businesses across Pune city.", icon: MapPin },
    { label: "Baner", href: "/locations/baner", body: "Our home base - marketing, lead generation, and CRM systems for Baner businesses.", icon: Zap },
    { label: "Pimpri-Chinchwad", href: "/locations/pimpri-chinchwad", body: "Lead generation and follow-up systems for Pimpri-Chinchwad's industrial and local businesses.", icon: Users2 },
    { label: "Hinjewadi", href: "/locations/hinjewadi", body: "Demand generation and CRM automation for Hinjewadi's IT and SaaS companies.", icon: LineChart },
    { label: "Wakad", href: "/locations/wakad", body: "Performance marketing and instant lead response for Wakad businesses.", icon: MapPin },
    { label: "Kothrud", href: "/locations/kothrud", body: "Marketing and enquiry follow-up systems for Kothrud's retail, education, and service businesses.", icon: Zap },
  ],
  intro: {
    eyebrow: "Local, but built to scale",
    title: "One connected system, wherever your business sits in Pune.",
    body:
      "Whether you're in Baner, Pimpri-Chinchwad, Hinjewadi, Wakad, or Kothrud, the same engine applies: marketing that generates real enquiries, and CRM plus AI voice systems that respond before a competitor does.",
    points: [
      "Based in Baner, Pune - available for in-person meetings",
      "Same-timezone support across all working hours",
      "Local market context: competitors, pricing, buyer behaviour",
      "Delivery scales beyond Pune when businesses grow",
    ],
  },
  process: [
    { title: "Local audit", body: "We review your current marketing, leads, and follow-up against what competitors in your area are doing." },
    { title: "Strategy build", body: "A plan matched to your market - channel mix, offer, and response system." },
    { title: "Launch & optimise", body: "Campaigns and automation go live, then get tuned against real results." },
    { title: "Report & scale", body: "Clear reporting on enquiries and revenue, with a plan to grow further." },
  ],
  faqs: [
    { q: "Who is the best digital marketing agency in Pune?", a: "That depends on what you need - but Vistrow specifically connects digital marketing with CRM, AI voice calling, and automation, so leads generated in Pune don't just arrive, they get followed up on automatically. We recommend comparing agencies on that connected-system approach, not just ad management." },
    { q: "Do you work with businesses outside Baner, Pimpri-Chinchwad, Hinjewadi, Wakad, and Kothrud?", a: "Yes. These are the areas we serve most actively around Pune, but we work with businesses across the city and, for many services, remotely across India." },
    { q: "What does a digital marketing agency in Pune typically charge?", a: "It depends on scope - a single channel like Google Ads differs from a full marketing plus CRM and automation build. Share your goals through the Growth Audit and we'll give you a clear, specific quote." },
    { q: "Can you handle both marketing and CRM/automation for a Pune business?", a: "Yes - that's the core of what Vistrow does. We build the marketing that generates enquiries and the CRM, AI voice, and follow-up systems that convert them, as one connected system rather than separate vendors." },
  ],
};

const dmServices = [
  { label: "Performance Advertising", href: "/digital-marketing/performance-advertising" },
  { label: "Lead Generation", href: "/digital-marketing/lead-generation" },
  { label: "SEO & Content", href: "/digital-marketing/seo-content" },
];
const baServices = [
  { label: "CRM & Lead Management", href: "/business-automation/crm-lead-management" },
  { label: "AI Voice Calling", href: "/business-automation/ai-voice-calling" },
  { label: "Lead Follow-Up Systems", href: "/business-automation/lead-follow-up" },
];

const standardReasons = [
  { title: "Local market fluency", body: "We know how businesses in your area actually compete, price, and win customers." },
  { title: "Fast, same-timezone response", body: "No overnight delays waiting on an overseas team or reseller." },
  { title: "One connected system", body: "Marketing, CRM, and follow-up built together, not stitched from separate vendors." },
  { title: "Transparent reporting", body: "Clear numbers on enquiries, cost per lead, and revenue - not just impressions." },
];

export const locations: Record<string, LocationContent> = {
  pune: {
    slug: "pune",
    title: "Digital Marketing Agency in Pune",
    area: "Pune",
    nearby: ["Baner", "Pimpri-Chinchwad", "Hinjewadi", "Wakad", "Kothrud"],
    eyebrow: "Location",
    subtitle:
      "Vistrow is a Pune-based digital marketing and business automation agency, connecting performance marketing, lead generation, CRM, and AI voice calling into one growth system for Pune businesses.",
    metaTitle: "Best Digital Marketing Agency in Pune | Vistrow",
    metaDescription:
      "Vistrow is a digital marketing agency in Pune offering performance advertising, lead generation, SEO, CRM, and AI voice calling for local businesses.",
    reasons: standardReasons,
    solution: {
      title: "Marketing that generates enquiries. Systems that convert them.",
      body: "Most digital marketing agencies in Pune stop at campaigns. Vistrow connects the campaign to a CRM and AI voice system that responds to every enquiry in seconds, so fewer leads go cold.",
      points: [
        "Google Ads, Meta Ads, and SEO built for Pune search behaviour",
        "Landing pages and funnels tuned to local buyer intent",
        "Instant AI voice response on every new enquiry",
        "CRM pipelines that make follow-up visible, not manual",
      ],
    },
    services: [...dmServices, ...baServices],
    process: [
      { title: "Audit", body: "We review your current marketing, website, and lead response against Pune competitors." },
      { title: "Plan", body: "A channel and automation plan matched to your budget and sales cycle." },
      { title: "Launch", body: "Campaigns, pages, and CRM/AI voice systems go live together." },
      { title: "Optimise", body: "Weekly tuning based on real enquiry and revenue data." },
    ],
    faqs: [
      { q: "Why choose a Pune-based digital marketing agency over a national one?", a: "Local context matters - pricing norms, competitor activity, and buyer behaviour in Pune differ from other cities. Being based here also means faster, same-timezone communication and, when useful, in-person meetings." },
      { q: "Do you only run ads, or also build the systems behind them?", a: "Both. We run performance advertising and SEO, and build the CRM, AI voice calling, and follow-up automation that converts the leads those campaigns generate." },
      { q: "How fast can we start?", a: "Most engagements start with a Growth Audit, typically completed within a few days, followed by a clear proposal and timeline." },
    ],
  },

  baner: {
    slug: "baner",
    title: "Digital Marketing Agency in Baner, Pune",
    area: "Baner",
    nearby: ["Pune", "Aundh", "Balewadi", "Pashan"],
    eyebrow: "Location",
    subtitle:
      "Vistrow is based in Baner, Pune - working with local businesses, startups, and service providers on digital marketing, lead generation, and CRM systems that turn enquiries into customers.",
    metaTitle: "Digital Marketing Agency in Baner, Pune | Vistrow",
    metaDescription:
      "Vistrow is a digital marketing agency in Baner, Pune, offering performance advertising, lead generation, CRM, and AI voice calling for local businesses.",
    reasons: standardReasons,
    solution: {
      title: "Based in Baner. Built for how Baner businesses actually sell.",
      body: "Baner's mix of startups, service businesses, and retail needs fast lead response as much as good ads. We build both - marketing that brings enquiries in, and CRM plus AI voice systems that respond immediately.",
      points: [
        "Local presence in Baner for direct, in-person conversations",
        "Performance ads and SEO tuned to Baner and nearby search demand",
        "AI voice calling that qualifies enquiries within seconds",
        "CRM pipelines built around how your team actually sells",
      ],
    },
    services: [...dmServices, ...baServices],
    process: [
      { title: "Local audit", body: "We review your current marketing and lead response against nearby competitors." },
      { title: "Strategy", body: "A plan for the channels and automation that fit your business type." },
      { title: "Launch", body: "Campaigns and systems go live together, not months apart." },
      { title: "Optimise", body: "Ongoing tuning based on real enquiry and conversion data." },
    ],
    faqs: [
      { q: "Are you actually based in Baner?", a: "Yes - Baner, Pune is Vistrow's base, which means direct availability for local businesses and same-timezone support." },
      { q: "Do you work with small businesses, not just larger companies?", a: "Yes. We work with local businesses, startups, and service providers of different sizes - the engagement scope adjusts to fit." },
      { q: "Can you help with just Google/Meta ads, or does it have to include automation?", a: "You can start with marketing alone. Many clients add CRM and AI voice calling once they see how much faster leads convert with instant follow-up." },
    ],
  },

  "pimpri-chinchwad": {
    slug: "pimpri-chinchwad",
    title: "Digital Marketing Agency in Pimpri-Chinchwad",
    area: "Pimpri-Chinchwad",
    nearby: ["Pune", "Wakad", "Nigdi", "Akurdi"],
    eyebrow: "Location",
    subtitle:
      "Vistrow works with manufacturing, industrial, and local businesses in Pimpri-Chinchwad on lead generation, performance advertising, and follow-up systems that keep enquiries from going cold.",
    metaTitle: "Digital Marketing Company in Pimpri-Chinchwad | Vistrow",
    metaDescription:
      "Vistrow is a digital marketing company serving Pimpri-Chinchwad - lead generation, performance advertising, CRM, and instant follow-up for local businesses.",
    reasons: standardReasons,
    solution: {
      title: "Steady enquiries, followed up before your competitor calls back.",
      body: "Pimpri-Chinchwad's industrial and service businesses often lose leads to slow follow-up, not bad marketing. We fix both sides - demand generation and instant response.",
      points: [
        "Lead generation built for B2B and industrial buyer behaviour",
        "WhatsApp, email, and SMS follow-up that runs automatically",
        "CRM pipelines that make every enquiry visible to your team",
        "Reporting tied to enquiries and closed business, not just clicks",
      ],
    },
    services: [
      { label: "Lead Generation", href: "/digital-marketing/lead-generation" },
      { label: "Performance Advertising", href: "/digital-marketing/performance-advertising" },
      { label: "WhatsApp, Email & SMS", href: "/business-automation/communication-automation" },
      { label: "CRM & Lead Management", href: "/business-automation/crm-lead-management" },
      { label: "Lead Follow-Up Systems", href: "/business-automation/lead-follow-up" },
      { label: "Landing Pages & Funnels", href: "/digital-marketing/landing-pages" },
    ],
    process: [
      { title: "Audit", body: "We map your current lead sources and where enquiries currently drop off." },
      { title: "Plan", body: "A lead generation and follow-up plan matched to your sales cycle." },
      { title: "Launch", body: "Campaigns and automated follow-up go live together." },
      { title: "Optimise", body: "We tune toward enquiries that actually convert to business." },
    ],
    faqs: [
      { q: "Do you work with industrial and B2B businesses, not just retail?", a: "Yes - Pimpri-Chinchwad's industrial base is a common client type. We adapt qualification and follow-up to longer, considered B2B sales cycles." },
      { q: "Can you fix slow follow-up without changing our whole marketing setup?", a: "Yes. CRM and automated follow-up can be added on top of your existing lead sources without rebuilding your marketing from scratch." },
      { q: "Is this only for large manufacturers?", a: "No - we work with businesses of varying sizes across Pimpri-Chinchwad, from local service providers to larger industrial companies." },
    ],
  },

  hinjewadi: {
    slug: "hinjewadi",
    title: "Digital Marketing Agency in Hinjewadi",
    area: "Hinjewadi",
    nearby: ["Pune", "Wakad", "Baner", "Marunji"],
    eyebrow: "Location",
    subtitle:
      "Vistrow works with IT companies, SaaS startups, and B2B businesses in Hinjewadi on demand generation, website development, and CRM automation built for longer sales cycles.",
    metaTitle: "Digital Marketing Agency in Hinjewadi, Pune | Vistrow",
    metaDescription:
      "Vistrow serves Hinjewadi's IT and SaaS companies with demand generation, website development, SEO, and CRM automation for B2B sales cycles.",
    reasons: standardReasons,
    solution: {
      title: "Demand generation and CRM built for B2B, IT, and SaaS sales cycles.",
      body: "Hinjewadi's IT park businesses need qualified pipeline, not just traffic. We build the marketing and automation that generate and nurture B2B opportunities properly.",
      points: [
        "Website and landing pages built to convert technical and business buyers",
        "SEO and content aimed at B2B and SaaS search intent",
        "CRM pipelines matched to longer, multi-stakeholder sales cycles",
        "Marketing automation that nurtures leads until they're sales-ready",
      ],
    },
    services: [
      { label: "Website Development", href: "/digital-marketing/website-development" },
      { label: "SEO & Content", href: "/digital-marketing/seo-content" },
      { label: "Marketing Automation", href: "/digital-marketing/marketing-automation" },
      { label: "CRM & Lead Management", href: "/business-automation/crm-lead-management" },
      { label: "Sales Automation", href: "/business-automation/sales-automation" },
      { label: "Custom Automation", href: "/business-automation/custom-automation" },
    ],
    process: [
      { title: "Audit", body: "We review your current pipeline, website, and CRM setup." },
      { title: "Plan", body: "A demand generation and nurture plan matched to your sales cycle." },
      { title: "Build", body: "Website, content, and CRM/automation are built together." },
      { title: "Optimise", body: "We tune toward qualified opportunities, not just leads." },
    ],
    faqs: [
      { q: "Do you specialise in B2B and SaaS marketing, or is this generic?", a: "We tailor qualification, nurture timing, and reporting to B2B and SaaS buying cycles rather than applying a generic lead-gen template." },
      { q: "Can you integrate with the CRM or tools we already use?", a: "In most cases, yes - we scope integration with your existing stack during the audit rather than forcing a switch." },
      { q: "Do you work with IT companies outside Hinjewadi too?", a: "Yes - Hinjewadi is a core area we serve, but we work with IT and SaaS companies across Pune and remotely." },
    ],
  },

  wakad: {
    slug: "wakad",
    title: "Digital Marketing Agency in Wakad",
    area: "Wakad",
    nearby: ["Pune", "Hinjewadi", "Baner", "Pimpri-Chinchwad"],
    eyebrow: "Location",
    subtitle:
      "Vistrow helps Wakad businesses run performance advertising, lead generation, and instant follow-up systems that convert local search and social enquiries into customers.",
    metaTitle: "Digital Marketing Agency in Wakad, Pune | Vistrow",
    metaDescription:
      "Vistrow is a digital marketing agency serving Wakad - performance advertising, lead generation, social media marketing, and CRM automation.",
    reasons: standardReasons,
    solution: {
      title: "Consistent enquiries from a market that moves fast.",
      body: "Wakad's mix of residential growth and local business means steady local search and social demand. We capture it and respond before competitors do.",
      points: [
        "Performance ads and local SEO built for Wakad search demand",
        "Social media marketing that builds visible local presence",
        "CRM pipelines that keep every enquiry on track",
        "Landing pages built to convert local intent, not just traffic",
      ],
    },
    services: [
      { label: "Performance Advertising", href: "/digital-marketing/performance-advertising" },
      { label: "Lead Generation", href: "/digital-marketing/lead-generation" },
      { label: "Social Media Marketing", href: "/digital-marketing/social-media" },
      { label: "CRM & Lead Management", href: "/business-automation/crm-lead-management" },
      { label: "Landing Pages & Funnels", href: "/digital-marketing/landing-pages" },
      { label: "Marketing Automation", href: "/digital-marketing/marketing-automation" },
    ],
    process: [
      { title: "Audit", body: "We review your current marketing and local visibility." },
      { title: "Plan", body: "A channel plan matched to your budget and customer type." },
      { title: "Launch", body: "Campaigns and follow-up systems go live together." },
      { title: "Optimise", body: "Ongoing tuning based on real enquiry data." },
    ],
    faqs: [
      { q: "Do you help with local visibility, not just paid ads?", a: "Yes - we work on local SEO, Google Business Profile optimisation, and social presence alongside paid campaigns." },
      { q: "How quickly will we see enquiries?", a: "Paid channels typically generate enquiries within the first few weeks; SEO builds over a longer horizon. We set expectations clearly during planning." },
      { q: "Can you manage both marketing and follow-up?", a: "Yes - that's the core of the Vistrow approach: marketing paired with CRM and automated follow-up." },
    ],
  },

  kothrud: {
    slug: "kothrud",
    title: "Digital Marketing Agency in Kothrud",
    area: "Kothrud",
    nearby: ["Pune", "Baner", "Warje", "Karve Nagar"],
    eyebrow: "Location",
    subtitle:
      "Vistrow supports Kothrud's retail, education, and local service businesses with digital marketing and follow-up systems that turn enquiries into booked business.",
    metaTitle: "Digital Marketing Agency in Kothrud, Pune | Vistrow",
    metaDescription:
      "Vistrow is a digital marketing agency serving Kothrud - performance advertising, SEO, social media marketing, and CRM follow-up for local businesses.",
    reasons: standardReasons,
    solution: {
      title: "Marketing that fills your calendar, not just your inbox.",
      body: "Kothrud's retail, education, and service businesses need enquiries that actually convert. We combine local marketing with follow-up that keeps every lead moving.",
      points: [
        "Local SEO and content built for Kothrud search behaviour",
        "Performance ads and social campaigns tuned to your customer type",
        "WhatsApp, email, and SMS follow-up on every enquiry",
        "CRM visibility so no enquiry is missed or forgotten",
      ],
    },
    services: [
      { label: "Performance Advertising", href: "/digital-marketing/performance-advertising" },
      { label: "SEO & Content", href: "/digital-marketing/seo-content" },
      { label: "Social Media Marketing", href: "/digital-marketing/social-media" },
      { label: "CRM & Lead Management", href: "/business-automation/crm-lead-management" },
      { label: "Lead Generation", href: "/digital-marketing/lead-generation" },
      { label: "WhatsApp, Email & SMS", href: "/business-automation/communication-automation" },
    ],
    process: [
      { title: "Audit", body: "We review your current marketing and enquiry handling." },
      { title: "Plan", body: "A plan matched to your customer type and budget." },
      { title: "Launch", body: "Campaigns and follow-up automation go live together." },
      { title: "Optimise", body: "We tune toward booked business, not just enquiries." },
    ],
    faqs: [
      { q: "Do you work with education and retail businesses, not just B2B?", a: "Yes - Kothrud's mix of education institutes, retail, and local services is a common client type, and we adapt the approach to each." },
      { q: "Can you help us follow up faster on enquiries?", a: "Yes - automated WhatsApp, email, and SMS follow-up, backed by a CRM, is a core part of what we build alongside marketing." },
      { q: "Is there a minimum budget to get started?", a: "It depends on the channel mix. Share your goals through the Growth Audit and we'll recommend a realistic starting scope." },
    ],
  },
};
