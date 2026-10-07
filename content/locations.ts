import { MapPin, Zap, Users2, LineChart } from "lucide-react";
import type { LocationContent, OverviewContent } from "@/lib/content-types";

export const locationsOverview: OverviewContent = {
  eyebrow: "Locations",
  title: "The digital marketing agency Pune businesses call",
  highlight: "call first",
  subtitle:
    "Vistrow is based in Baner, Pune, and works with businesses across Pimpri-Chinchwad, Hinjewadi, Wakad, Kothrud, and the wider city - connecting marketing, CRM, and automation into one system.",
  metaTitle: "Digital Marketing in Pune: Areas We Serve",
  metaDescription:
    "Vistrow is a Baner-based digital marketing and automation agency serving Pune, Baner, Pimpri-Chinchwad, Hinjewadi, Wakad and Kothrud. Find your area.",
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

const costFaq = (area: string, drivers: string) => ({
  q: `How much does digital marketing cost in ${area}?`,
  a: `There is no single price, because cost depends on ${drivers}. A Growth Audit looks at your market, goals and current lead handling first, so the quote you receive is specific to your business rather than a generic package.`,
});

export const locations: Record<string, LocationContent> = {
  pune: {
    slug: "pune",
    image: { src: "/images/locations/loc-pune.webp", alt: "Illustrative evening street scene for Pune with offices and apartment buildings" },
    title: "Digital Marketing Agency in Pune",
    area: "Pune",
    nearby: ["Baner", "Pimpri-Chinchwad", "Hinjewadi", "Wakad", "Kothrud"],
    eyebrow: "Location",
    hasOffice: true,
    subtitle:
      "Vistrow is a Pune digital marketing and business automation agency. We connect performance marketing, lead generation, CRM and AI voice calling into one system, so the enquiries your ads create are answered and followed up fast.",
    metaTitle: "Digital Marketing Agency in Pune: Ads, SEO and CRM",
    metaDescription:
      "Digital marketing agency in Pune for lead generation: Google and Meta ads, SEO, CRM and AI voice follow-up in one system. Get a free Growth Audit.",
    reasons: [
      { title: "Based in Pune", body: "Our office is in Baner, so meetings, reviews and support run in your time zone, in person when it helps." },
      { title: "Marketing plus follow-up", body: "Most agencies stop at the click. We also build the CRM, WhatsApp and AI voice follow-up that turns enquiries into customers." },
      { title: "Built for local demand", body: "Campaigns are set up around how people in Pune search and compare, by area, budget and urgency." },
      { title: "Numbers you can read", body: "Reporting follows enquiries, cost per lead and closed business, not only impressions and clicks." },
    ],
    localContext: {
      title: "Marketing in a city with many competing agencies",
      paragraphs: [
        "Pune is one of India's busiest business cities, with a large IT and startup base, a strong manufacturing and automotive belt, one of the country's biggest education markets and constant real estate activity. That means a lot of businesses compete for the same local searches, and buyers compare several options before they enquire.",
        "In a market like that, getting the click is only half the job. The business that replies first and follows up properly usually wins the customer. That is why we build the marketing and the response system together: ads and SEO to create demand, then CRM, WhatsApp and AI voice calling to respond within seconds and keep every lead moving.",
        "We work with businesses across the city, with dedicated pages for the areas we serve most: Baner, Pimpri-Chinchwad, Hinjewadi, Wakad and Kothrud.",
      ],
    },
    businessTypes: [
      { label: "Real estate developers and brokers", body: "Lead capture from portals and ads, with fast follow-up so site visits get booked.", href: "/industries/real-estate" },
      { label: "Local service businesses", body: "Clinics, salons, home services and shops that need steady enquiries from nearby customers.", href: "/industries/local-businesses" },
      { label: "IT, SaaS and B2B companies", body: "Pipeline-focused marketing for longer, multi-stakeholder sales cycles.", href: "/industries/b2b-companies" },
      { label: "Education and coaching", body: "Admission and enrolment enquiries handled quickly, season after season.", href: "/industries/education" },
    ],
    visibility: {
      title: "Get found when Pune customers search",
      body: "Local visibility is built from several small pieces working together. We set them up properly and keep them consistent.",
      points: [
        "Google Business Profile setup and optimisation",
        "Service and area pages written for how Pune customers search",
        "A review request process that asks happy customers at the right moment",
        "Consistent business details across directories and listings",
        "Google and Meta campaigns targeted by area, radius and intent",
      ],
    },
    solution: {
      title: "Marketing that generates enquiries. Systems that convert them.",
      body: "Most digital marketing agencies in Pune stop at campaigns. Vistrow connects the campaign to a CRM and an AI voice system that responds to every enquiry in seconds, so fewer leads go cold.",
      points: [
        "Google Ads, Meta Ads and SEO built for Pune search behaviour",
        "Landing pages and funnels tuned to local buyer intent",
        "Instant AI voice response on every new enquiry",
        "CRM pipelines that make follow-up visible, not manual",
      ],
    },
    services: [...dmServices, ...baServices],
    process: [
      { title: "Audit", body: "We review your marketing, website and lead response against Pune competitors." },
      { title: "Plan", body: "A channel and automation plan matched to your budget and sales cycle." },
      { title: "Launch", body: "Campaigns, pages and CRM or AI voice systems go live together." },
      { title: "Optimise", body: "Weekly tuning based on real enquiry and revenue data." },
    ],
    faqs: [
      { q: "Why choose a Pune-based digital marketing agency over a national one?", a: "Local context matters. Pricing norms, competitor activity and buyer behaviour in Pune differ from other cities. Being based here also means same-time-zone communication and, when useful, in-person meetings." },
      { q: "Do you only run ads, or also build the systems behind them?", a: "Both. We run performance advertising and SEO, and we build the CRM, AI voice calling and follow-up automation that converts the leads those campaigns generate." },
      costFaq("Pune", "your goals, the channels involved, how competitive your market is and whether you also need CRM and follow-up automation"),
      { q: "How soon will we see enquiries?", a: "Paid campaigns usually start producing enquiries within the first few weeks. SEO and Google Maps visibility build over a longer horizon, typically a few months. We set expectations clearly in the plan." },
      { q: "Can you help my business show up on Google Maps in Pune?", a: "Yes. We set up and optimise your Google Business Profile, build a review request process, keep your listings consistent and create local pages that support your Maps ranking." },
      { q: "How fast can we start?", a: "Most engagements begin with a Growth Audit, usually completed within a few days, followed by a clear proposal and timeline." },
    ],
  },

  baner: {
    slug: "baner",
    title: "Digital Marketing Agency in Baner, Pune",
    area: "Baner",
    nearby: ["Pune", "Aundh", "Balewadi", "Pashan"],
    eyebrow: "Location",
    hasOffice: true,
    subtitle:
      "Vistrow is based in Baner. We help Baner businesses, startups and service providers get more enquiries with performance marketing and local SEO, then follow up fast with CRM and AI voice systems.",
    metaTitle: "Digital Marketing Agency in Baner, Pune",
    metaDescription:
      "Baner-based digital marketing agency: Google and Meta ads, local SEO, lead generation, CRM and AI voice follow-up for Baner businesses. Free Growth Audit.",
    reasons: [
      { title: "Our office is in Baner", body: "Walk-in or call-in access, same-day replies and a team that knows the area, not a remote vendor." },
      { title: "Startup and service-business friendly", body: "Engagements are scoped to fit a growing business, and can start with marketing alone." },
      { title: "Faster response wins", body: "Baner buyers compare quickly. Instant WhatsApp and AI voice follow-up keeps you ahead of slower competitors." },
      { title: "Clear reporting", body: "Weekly numbers on enquiries and cost per lead, so you can see what the spend is doing." },
    ],
    localContext: {
      title: "Marketing in Baner: dense, competitive and quick to compare",
      paragraphs: [
        "Baner sits on Pune's western edge, close to Aundh, Balewadi and Pashan. It combines tall residential societies, offices and co-working spaces, startups, cafes and restaurants, clinics, salons, gyms and a steady stream of real estate activity. People here search on their phones and compare several nearby options before they call.",
        "That makes local visibility and response speed the two things that decide who gets the customer. If your Google Business Profile is thin, your reviews are few or your enquiries wait until the next morning, a competitor a few hundred metres away gets the job.",
        "Because Vistrow works from Baner, we see the same market you do. We build campaigns around the streets, societies and neighbourhoods your customers come from, and we set up the follow-up so a new enquiry is acknowledged in seconds.",
      ],
    },
    businessTypes: [
      { label: "Startups and SaaS", body: "Website, SEO and lead generation that build early pipeline without a large budget.", href: "/industries/startups-saas" },
      { label: "Local shops and services", body: "Clinics, salons, gyms, restaurants and home services that depend on nearby customers.", href: "/industries/local-businesses" },
      { label: "Real estate", body: "Project and broker lead generation with instant follow-up on every enquiry.", href: "/industries/real-estate" },
      { label: "Agencies and consultants", body: "White-label delivery and lead systems for teams that sell services.", href: "/industries/agencies" },
    ],
    visibility: {
      title: "Show up in Baner searches and on Google Maps",
      body: "When someone searches near Baner, Google weighs relevance, distance and reputation. We work on all three.",
      points: [
        "Google Business Profile optimised for Baner and nearby areas",
        "Reviews collected through a simple WhatsApp or SMS request after each job",
        "Location pages and service pages that match local search wording",
        "Ads targeted to Baner, Aundh, Balewadi and Pashan",
        "Click-to-call and WhatsApp buttons so mobile visitors can act immediately",
      ],
    },
    solution: {
      title: "Based in Baner. Built for how Baner businesses actually sell.",
      body: "Baner's mix of startups, service businesses and retail needs fast lead response as much as good ads. We build both: marketing that brings enquiries in, and CRM plus AI voice systems that respond immediately.",
      points: [
        "Local presence in Baner for direct, in-person conversations",
        "Performance ads and SEO tuned to Baner and nearby search demand",
        "AI voice calling that qualifies enquiries within seconds",
        "CRM pipelines built around how your team actually sells",
      ],
    },
    services: [...dmServices, ...baServices],
    process: [
      { title: "Local audit", body: "We review your marketing and lead response against nearby competitors." },
      { title: "Strategy", body: "A plan for the channels and automation that fit your business type." },
      { title: "Launch", body: "Campaigns and systems go live together, not months apart." },
      { title: "Optimise", body: "Ongoing tuning based on real enquiry and conversion data." },
    ],
    faqs: [
      { q: "Are you actually based in Baner?", a: "Yes. Baner, Pune is Vistrow's base, which means direct availability for local businesses and same-time-zone support." },
      { q: "Do you work with small businesses, not just larger companies?", a: "Yes. We work with local businesses, startups and service providers of different sizes, and the scope adjusts to fit." },
      costFaq("Baner", "the channels you choose, your ad budget, how competitive your category is and whether you add CRM and follow-up automation"),
      { q: "Can you help with just Google or Meta ads, or does it have to include automation?", a: "You can start with marketing alone. Many clients add CRM and AI voice calling once they see how much faster leads convert with instant follow-up." },
      { q: "Can you improve how my Baner business appears on Google Maps?", a: "Yes. We optimise your Google Business Profile, set up a review request flow, align your listings and build local pages that support Maps and local search visibility." },
    ],
  },

  "pimpri-chinchwad": {
    slug: "pimpri-chinchwad",
    image: { src: "/images/locations/loc-pimpri-chinchwad.webp", alt: "Illustrative industrial estate scene for Pimpri-Chinchwad with engineers in safety vests" },
    title: "Digital Marketing Company in Pimpri-Chinchwad",
    area: "Pimpri-Chinchwad",
    nearby: ["Pune", "Wakad", "Nigdi", "Akurdi"],
    eyebrow: "Location",
    subtitle:
      "Vistrow is a digital marketing company working with manufacturers, industrial suppliers and local businesses in Pimpri Chinchwad on B2B lead generation, performance advertising and follow-up systems that stop enquiries going cold.",
    metaTitle: "Digital Marketing Company in Pimpri-Chinchwad",
    metaDescription:
      "Digital marketing company for Pimpri-Chinchwad businesses: B2B lead generation, Google and Meta ads, CRM and instant follow-up. Free Growth Audit.",
    reasons: [
      { title: "B2B and industrial fluency", body: "We adapt qualification and follow-up to longer, considered purchase cycles, not quick retail clicks." },
      { title: "Follow-up that never sleeps", body: "WhatsApp, email and AI voice replies go out on every enquiry, including after hours." },
      { title: "Works with how you sell", body: "We start from your quotes, dealers, distributors and repeat buyers, not a generic template." },
      { title: "Tied to closed business", body: "Reports connect spend to enquiries and orders, so you can judge what is worth continuing." },
    ],
    localContext: {
      title: "Marketing for Pimpri Chinchwad's industrial and local economy",
      paragraphs: [
        "Pimpri-Chinchwad is one of Maharashtra's major industrial centres. The MIDC areas around Bhosari, Chinchwad, Talawade and nearby Chakan host automotive, engineering and manufacturing businesses, along with a large network of suppliers, fabricators and service providers. Alongside that sit busy residential areas such as Nigdi, Akurdi and Pimple Saudagar, with their own schools, clinics, retailers and service businesses.",
        "Industrial and B2B buyers research carefully. They search for specific products, capacities and suppliers, compare several vendors and often request quotes from more than one. The supplier that answers an enquiry first and clearly usually gets the conversation.",
        "Our work for Pimpri-Chinchwad businesses focuses on two things: getting you found for the searches that matter to your buyers, and making sure every enquiry is acknowledged immediately and tracked until it is won or lost.",
      ],
    },
    businessTypes: [
      { label: "Manufacturers and suppliers", body: "Product and capability pages, quote-request funnels and B2B lead generation.", href: "/industries/b2b-companies" },
      { label: "Local service businesses", body: "Clinics, salons, repair and home services in Nigdi, Akurdi and Pimple Saudagar.", href: "/industries/local-businesses" },
      { label: "Real estate", body: "Project promotion and lead follow-up for residential areas across the twin city.", href: "/industries/real-estate" },
      { label: "Education and training", body: "Admission and course enquiries captured and followed up quickly.", href: "/industries/education" },
    ],
    visibility: {
      title: "Be found by Pimpri Chinchwad buyers and by industrial searchers",
      body: "Whether the buyer is a purchase manager or a local customer, visibility starts with the right pages and a trustworthy profile.",
      points: [
        "Product, capability and service pages written around what your buyers search",
        "Google Business Profile for your plant, office or shop",
        "Quote-request forms and WhatsApp numbers that are easy to find on mobile",
        "Case notes, certifications and client logos placed where buyers decide",
        "Google and Meta campaigns targeted to the right industries and areas",
      ],
    },
    solution: {
      title: "Steady enquiries, followed up before your competitor calls back.",
      body: "Pimpri-Chinchwad's industrial and service businesses often lose leads to slow follow-up, not bad marketing. We fix both sides: demand generation and instant response.",
      points: [
        "Lead generation built for B2B and industrial buyer behaviour",
        "WhatsApp, email and SMS follow-up that runs automatically",
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
      { title: "Audit", body: "We map your current lead sources and where enquiries drop off." },
      { title: "Plan", body: "A lead generation and follow-up plan matched to your sales cycle." },
      { title: "Launch", body: "Campaigns and automated follow-up go live together." },
      { title: "Optimise", body: "We tune toward enquiries that actually convert to business." },
    ],
    faqs: [
      { q: "Do you work with industrial and B2B businesses, not just retail?", a: "Yes. Pimpri-Chinchwad's industrial base is a common client type, and we adapt qualification and follow-up to longer B2B sales cycles." },
      { q: "Can you generate B2B leads for a manufacturing company?", a: "We can build the pages, search and ad campaigns, and quote-request flow that bring qualified buyers to a manufacturer, then follow up on every enquiry. Results depend on your market, product and budget, and we do not promise specific lead numbers." },
      costFaq("Pimpri-Chinchwad", "your sales cycle, the channels involved, your budget and whether you need CRM and follow-up automation"),
      { q: "Can you fix slow follow-up without changing our whole marketing setup?", a: "Yes. CRM and automated follow-up can be added on top of your existing lead sources without rebuilding your marketing from scratch." },
      { q: "Is this only for large manufacturers?", a: "No. We work with businesses of varying sizes across Pimpri-Chinchwad, from local service providers to larger industrial companies." },
    ],
  },

  hinjewadi: {
    slug: "hinjewadi",
    image: { src: "/images/locations/loc-hinjewadi.webp", alt: "Illustrative IT park scene for Hinjewadi, Pune with office towers and employees" },
    title: "Digital Marketing Agency in Hinjewadi, Pune",
    area: "Hinjewadi",
    nearby: ["Pune", "Wakad", "Baner", "Marunji"],
    eyebrow: "Location",
    subtitle:
      "Vistrow works with IT services firms, SaaS startups and B2B companies in Hinjewadi on demand generation, website development, SEO and CRM automation built for longer, multi-stakeholder sales cycles.",
    metaTitle: "Digital Marketing Agency in Hinjewadi, Pune",
    metaDescription:
      "Digital marketing agency for Hinjewadi IT, SaaS and B2B firms: SEO, websites, lead generation, CRM and marketing automation. Free Growth Audit.",
    reasons: [
      { title: "B2B and SaaS focus", body: "Qualification, nurture timing and reporting are set up for considered purchases, not impulse buys." },
      { title: "Website that sells", body: "Clear positioning, fast pages and proof placed where technical and business buyers look." },
      { title: "Pipeline, not just traffic", body: "We measure marketing-qualified and sales-qualified opportunities, not only visits." },
      { title: "Fits your stack", body: "We scope integration with the CRM and tools you already use during the audit." },
    ],
    localContext: {
      title: "Marketing for the Hinjewadi IT and startup ecosystem",
      paragraphs: [
        "Hinjewadi is home to Rajiv Gandhi Infotech Park, one of Pune's largest IT and ITES hubs, with offices spread across several phases and a large working population living nearby in Wakad, Baner and Marunji. The area includes IT services companies, product and SaaS startups, engineering firms and a growing number of businesses that serve them.",
        "Selling in this environment usually means longer cycles. A buyer researches the problem, compares several vendors, brings in colleagues and may take weeks or months to decide. Marketing that only chases clicks tends to produce enquiries that never close.",
        "We build for that reality: positioning and content that answer buyers' questions, SEO that captures problem-aware searches, and a CRM and nurture setup that keeps conversations warm until the buyer is ready. The same approach applies to businesses serving the Hinjewadi workforce, such as housing, food, fitness and services.",
      ],
    },
    businessTypes: [
      { label: "IT services and consulting", body: "Credibility-led websites, content and outbound-supporting lead generation.", href: "/industries/b2b-companies" },
      { label: "SaaS and product startups", body: "Demand generation, onboarding funnels and CRM pipelines for early traction.", href: "/industries/startups-saas" },
      { label: "Agencies and freelancers", body: "White-label delivery and lead systems to grow without hiring.", href: "/industries/agencies" },
      { label: "Businesses serving IT employees", body: "Housing, fitness, food and services that depend on the nearby workforce.", href: "/industries/local-businesses" },
    ],
    visibility: {
      title: "Get found by the buyers researching your category",
      body: "B2B visibility comes from being useful at every stage of the search, from first question to vendor shortlist.",
      points: [
        "Service and solution pages that match how buyers describe the problem",
        "Blog and resource content that answers early-stage questions",
        "Google Business Profile for your Hinjewadi office",
        "Landing pages for campaigns, with tracked forms and calls",
        "Google and Meta campaigns tied to pipeline stages, not vanity metrics",
      ],
    },
    solution: {
      title: "Demand generation and CRM built for B2B, IT and SaaS sales cycles.",
      body: "Hinjewadi's IT park businesses need qualified pipeline, not just traffic. We build the marketing and automation that generate and nurture B2B opportunities properly.",
      points: [
        "Website and landing pages built to convert technical and business buyers",
        "SEO and content aimed at B2B and SaaS search intent",
        "CRM pipelines matched to longer, multi-stakeholder sales cycles",
        "Marketing automation that nurtures leads until they are sales-ready",
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
      { title: "Audit", body: "We review your pipeline, website and CRM setup." },
      { title: "Plan", body: "A demand generation and nurture plan matched to your sales cycle." },
      { title: "Build", body: "Website, content and CRM or automation are built together." },
      { title: "Optimise", body: "We tune toward qualified opportunities, not just leads." },
    ],
    faqs: [
      { q: "Do you specialise in B2B and SaaS marketing, or is this generic?", a: "We tailor qualification, nurture timing and reporting to B2B and SaaS buying cycles rather than applying a generic lead-gen template." },
      { q: "Can you integrate with the CRM or tools we already use?", a: "In most cases, yes. We scope integration with your existing stack during the audit rather than forcing a switch." },
      costFaq("Hinjewadi", "your target buyers, the channels, the amount of content and website work needed, and whether you add CRM and automation"),
      { q: "How long does B2B marketing take to show results?", a: "Paid campaigns can produce enquiries within weeks, but B2B deals close over months. We track leads, qualified opportunities and pipeline separately so you see progress early and honestly." },
      { q: "Do you work with IT companies outside Hinjewadi too?", a: "Yes. Hinjewadi is a core area we serve, but we work with IT and SaaS companies across Pune and remotely." },
    ],
  },

  wakad: {
    slug: "wakad",
    image: { src: "/images/locations/loc-wakad.webp", alt: "Illustrative evening residential street scene for Wakad, Pune" },
    title: "Digital Marketing Agency in Wakad, Pune",
    area: "Wakad",
    nearby: ["Pune", "Hinjewadi", "Baner", "Pimpri-Chinchwad"],
    eyebrow: "Location",
    subtitle:
      "Vistrow helps Wakad businesses run performance advertising, local SEO and lead generation, with instant WhatsApp and AI voice follow-up that turns local search and social enquiries into customers.",
    metaTitle: "Digital Marketing Agency in Wakad, Pune",
    metaDescription:
      "Digital marketing agency in Wakad, Pune: local SEO, Google and Meta ads, lead generation and instant WhatsApp follow-up for local businesses. Free audit.",
    reasons: [
      { title: "Local search first", body: "Wakad customers search on mobile and near them. We start with Google Maps and local intent." },
      { title: "Fast WhatsApp follow-up", body: "Local buyers expect a quick reply. Automated WhatsApp and call follow-up makes sure they get one." },
      { title: "Built for local budgets", body: "We start where the return is clearest and scale spend only when the numbers support it." },
      { title: "Plain-language reports", body: "You see enquiries, calls and cost per lead each week, without jargon." },
    ],
    localContext: {
      title: "Marketing in Wakad: a fast-growing residential and business hub",
      paragraphs: [
        "Wakad has grown quickly as a residential and commercial area beside Hinjewadi, with easy access to the Mumbai-Bengaluru highway. Large housing societies, a young working population and new retail streets have created steady demand for local services: clinics and dental practices, salons and spas, gyms, coaching classes, restaurants, interiors, home services and real estate.",
        "Most of these customers start on their phones. They search for a service near them, check the Google Maps listing, read the reviews and message or call the first business that looks credible and replies quickly.",
        "That is the funnel we build for Wakad businesses: a strong Google profile and local pages to be found, Google and Meta campaigns to reach nearby buyers, and automatic follow-up so no enquiry waits. Because many Wakad customers also work in Hinjewadi, we also use timing and targeting that match office-going schedules.",
      ],
    },
    businessTypes: [
      { label: "Clinics, salons and gyms", body: "Appointment and trial enquiries from nearby societies, followed up the same hour.", href: "/industries/local-businesses" },
      { label: "Real estate", body: "Project and resale lead generation with fast follow-up and site-visit booking.", href: "/industries/real-estate" },
      { label: "Coaching and education", body: "Enrolment enquiries captured from search and social, then nurtured.", href: "/industries/education" },
      { label: "Home and local services", body: "Interiors, repairs, cleaning and similar services that live on referrals and reviews.", href: "/industries/local-businesses" },
    ],
    visibility: {
      title: "Win the Wakad search, map and review battle",
      body: "For local services, three things decide who gets the call: the Maps listing, the reviews and the speed of reply.",
      points: [
        "Google Business Profile completed, categorised and kept active",
        "Review requests sent automatically after each visit or job",
        "Local landing pages for each service you offer",
        "Meta and Google ads targeted around Wakad, Hinjewadi and nearby societies",
        "WhatsApp click-to-chat and call buttons on every page",
      ],
    },
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
      { title: "Audit", body: "We review your marketing and local visibility." },
      { title: "Plan", body: "A channel plan matched to your budget and customer type." },
      { title: "Launch", body: "Campaigns and follow-up systems go live together." },
      { title: "Optimise", body: "Ongoing tuning based on real enquiry data." },
    ],
    faqs: [
      { q: "Do you help with local visibility, not just paid ads?", a: "Yes. We work on local SEO, Google Business Profile optimisation and social presence alongside paid campaigns." },
      costFaq("Wakad", "the channels, your ad budget, how competitive your category is and whether you add CRM and follow-up automation"),
      { q: "How quickly will we see enquiries?", a: "Paid channels typically generate enquiries within the first few weeks; SEO and Maps visibility build over a longer horizon. We set expectations clearly during planning." },
      { q: "Can you get my Wakad business more Google reviews?", a: "We set up a simple review request process that asks real customers by WhatsApp or SMS at the right time. We never write or buy fake reviews, which would break Google's rules." },
      { q: "Can you manage both marketing and follow-up?", a: "Yes. That is the core of the Vistrow approach: marketing paired with CRM and automated follow-up." },
    ],
  },

  kothrud: {
    slug: "kothrud",
    image: { src: "/images/locations/loc-kothrud.webp", alt: "Illustrative tree-lined street scene for Kothrud, Pune with students and shops" },
    title: "Digital Marketing Agency in Kothrud, Pune",
    area: "Kothrud",
    nearby: ["Pune", "Baner", "Warje", "Karve Nagar"],
    eyebrow: "Location",
    subtitle:
      "Vistrow supports Kothrud's coaching classes, clinics, retailers and local service businesses with local SEO, Google and Meta ads and follow-up systems that turn enquiries into booked business.",
    metaTitle: "Digital Marketing Agency in Kothrud, Pune",
    metaDescription:
      "Digital marketing for Kothrud businesses, classes and clinics: local SEO, Google and Meta ads, lead generation and WhatsApp follow-up. Free Growth Audit.",
    reasons: [
      { title: "Admissions and appointments", body: "We build funnels that end in a booked class, visit or appointment, not just a click." },
      { title: "Local trust signals", body: "Reviews, photos, results and clear contact details placed where Kothrud customers look." },
      { title: "Season-aware campaigns", body: "Admission seasons, exam periods and festival peaks are planned for in advance." },
      { title: "Follow-up that respects busy teams", body: "Automated replies and reminders so small teams do not miss enquiries." },
    ],
    localContext: {
      title: "Marketing in Kothrud: education, healthcare and established retail",
      paragraphs: [
        "Kothrud is one of Pune's long-established residential areas, known for its schools, colleges and coaching classes, its clinics and hospitals, and busy retail and food streets along Karve Road and Paud Road. Nearby Warje and Karve Nagar add more housing and local businesses. Families here tend to ask neighbours and then check Google before they decide.",
        "That makes reputation and visibility close to inseparable. A coaching class with strong, recent reviews and clear batch details gets more enquiries than a better class with an empty profile. A clinic that shows timings, services and a direct booking option wins over one that does not.",
        "We help Kothrud businesses build that visibility and then handle the enquiries properly: an instant reply on WhatsApp, a reminder for the demo class or appointment, and a record of every lead so nothing is forgotten in a busy week.",
      ],
    },
    businessTypes: [
      { label: "Coaching classes and schools", body: "Admission enquiries from Google and Meta, with automated replies and demo-class reminders.", href: "/industries/education" },
      { label: "Clinics and wellness", body: "Appointment-focused pages, Maps visibility and reminders that cut no-shows.", href: "/industries/local-businesses" },
      { label: "Retail and food", body: "Local promotion, festive campaigns and WhatsApp broadcasts to existing customers.", href: "/industries/local-businesses" },
      { label: "Professional services", body: "Lawyers, accountants and consultants who win clients on trust and referrals.", href: "/industries/b2b-companies" },
    ],
    visibility: {
      title: "Be the first name Kothrud families find",
      body: "In an area where word of mouth is strong, Google reviews and a complete profile carry the same weight.",
      points: [
        "Google Business Profile with accurate timings, services, photos and posts",
        "A steady flow of genuine reviews from happy students, patients and customers",
        "Landing pages for each course, treatment or service",
        "Ads targeted around Kothrud, Karve Nagar, Warje and nearby neighbourhoods",
        "WhatsApp enquiry buttons that reach your team instantly",
      ],
    },
    solution: {
      title: "Marketing that fills your calendar, not just your inbox.",
      body: "Kothrud's education, healthcare and service businesses need enquiries that actually convert. We combine local marketing with follow-up that keeps every lead moving.",
      points: [
        "Local SEO and content built for Kothrud search behaviour",
        "Performance ads and social campaigns tuned to your customer type",
        "WhatsApp, email and SMS follow-up on every enquiry",
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
      { title: "Audit", body: "We review your marketing and enquiry handling." },
      { title: "Plan", body: "A plan matched to your customer type and budget." },
      { title: "Launch", body: "Campaigns and follow-up automation go live together." },
      { title: "Optimise", body: "We tune toward booked business, not just enquiries." },
    ],
    faqs: [
      { q: "Do you work with education and retail businesses, not just B2B?", a: "Yes. Kothrud's mix of education institutes, clinics, retail and local services is a common client type, and we adapt the approach to each." },
      { q: "Can you help my coaching class get more admission enquiries?", a: "Yes. We build the pages, ads and local visibility that bring enquiries, and set up instant replies and demo-class reminders. Results depend on your course, fees, competition and budget, so we do not promise specific numbers." },
      costFaq("Kothrud", "the channels, your budget, the season and how many courses or services you promote"),
      { q: "Can you help us follow up faster on enquiries?", a: "Yes. Automated WhatsApp, email and SMS follow-up, backed by a CRM, is a core part of what we build alongside marketing." },
      { q: "Is there a minimum budget to get started?", a: "It depends on the channel mix. Share your goals through the Growth Audit and we will recommend a realistic starting scope." },
    ],
  },
};
