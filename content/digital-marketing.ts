import {
  Target,
  MousePointerClick,
  LayoutTemplate,
  Palette,
  Share2,
  Search,
  BarChart3,
  Workflow,
  Code2,
} from "lucide-react";
import type { ServiceContent, OverviewContent } from "@/lib/content-types";
import { PAGE_IMAGES } from "@/lib/page-images";

export const digitalMarketingOverview: OverviewContent = {
  eyebrow: "Digital Marketing",
  title: "Digital marketing that connects to",
  highlight: "business growth",
  subtitle:
    "Performance marketing built to generate qualified demand - then wired into the CRM, follow-up, and tracking that turn attention into revenue.",
  metaTitle: "Digital Marketing Services in India",
  metaDescription:
    "Performance advertising, lead generation, landing pages, creative, social, SEO, conversion tracking, and marketing automation - connected to your sales system.",
  cardsTitle: "Digital marketing services",
  cards: [
    { label: "Performance Advertising", href: "/digital-marketing/performance-advertising", body: "ROI-focused paid media across search, social, and display.", icon: Target },
    { label: "Lead Generation", href: "/digital-marketing/lead-generation", body: "High-intent pipeline from the channels your buyers use.", icon: MousePointerClick },
    { label: "Website Development", href: "/digital-marketing/website-development", body: "Fast, conversion-ready websites built to support the whole funnel.", icon: Code2 },
    { label: "Landing Pages & Funnels", href: "/digital-marketing/landing-pages", body: "Pages and funnels engineered to convert traffic.", icon: LayoutTemplate },
    { label: "Creative Strategy", href: "/digital-marketing/creative-strategy", body: "Messaging and creative that earns attention and clicks.", icon: Palette },
    { label: "Social Media Marketing", href: "/digital-marketing/social-media", body: "Demand and community across the platforms that matter.", icon: Share2 },
    { label: "SEO & Content", href: "/digital-marketing/seo-content", body: "Compounding organic reach and qualified search traffic.", icon: Search },
    { label: "Conversion Tracking", href: "/digital-marketing/conversion-tracking", body: "Marketing tied directly to pipeline and revenue.", icon: BarChart3 },
    { label: "Marketing Automation", href: "/digital-marketing/marketing-automation", body: "Scale what works with connected, automated journeys.", icon: Workflow },
  ],
  intro: {
    eyebrow: "Beyond campaign management",
    title: "Demand generation is only valuable when it reaches revenue.",
    body:
      "We plan media, creative, landing pages, tracking, and lead handoff as one operating system. That means every campaign has a clear audience, offer, conversion path, and measurement model before budget is scaled.",
    image: PAGE_IMAGES.digitalMarketing,
    points: [
      "Channel strategy tied to commercial goals",
      "Creative and landing pages built around one offer",
      "Lead capture connected directly to CRM",
      "Campaign reporting linked to qualified pipeline",
    ],
  },
  process: [
    { title: "Audit demand", body: "Review positioning, channels, spend, pages, tracking, and lead quality." },
    { title: "Design the journey", body: "Define audiences, offers, conversion paths, and the measurement plan." },
    { title: "Launch connected", body: "Ship campaigns with landing pages, CRM routing, and attribution in place." },
    { title: "Improve on revenue", body: "Optimise against qualified opportunities and business outcomes." },
  ],
  faqs: [
    { q: "Can you manage only one channel?", a: "Yes. We can improve a single priority channel or manage a connected multi-channel programme, depending on your goals and internal team." },
    { q: "Do you create landing pages and creative?", a: "Yes. Strategy, creative, landing pages, tracking, and CRM handoff can be delivered together so the campaign does not depend on disconnected suppliers." },
    { q: "What do you report on?", a: "We report on spend and campaign performance, but the main focus is lead quality, opportunities created, pipeline movement, and revenue attribution where the CRM data allows it." },
  ],
};

const cta = "Request a Growth Audit";

export const digitalMarketingServices: Record<string, ServiceContent> = {
  "performance-advertising": {
    slug: "performance-advertising",
    facts: [
      { label: "Channels", value: "Google, Meta, LinkedIn" },
      { label: "Reporting", value: "Weekly, tied to your CRM" },
      { label: "Built for", value: "Lead-driven businesses" },
    ],
    photos: { problem: { src: "/images/services/more/svc-pain-performance-advertising.webp", alt: "A Pune business owner frowning at a thick printed ad invoice at his desk" }, outcome: { src: "/images/services/more/svc-win-performance-advertising.webp", alt: "A Vistrow strategist walking a business owner through a printed campaign plan with a rising bar chart" } },
    image: { src: "/images/services/svc-performance-advertising.webp", alt: "Overhead view of a marketer's desk with an example Google Ads and Meta campaign dashboard showing cost per lead and site visits, beside a printed ad report" },
    title: "Performance Advertising",
    eyebrow: "Digital Marketing",
    subtitle:
      "Paid media managed for ROI, not vanity metrics. We buy attention where your best customers are and connect every click to your pipeline.",
    metaTitle: "Performance Marketing Agency in India",
    metaDescription:
      "ROI-focused paid advertising across Google, Meta, LinkedIn, and more - tracked end to end from click to closed deal.",
    problem: {
      title: "Ad spend without a system just buys clicks.",
      body: "Most accounts optimise for cheap clicks and impressions while the real question - did this generate revenue? - goes unanswered.",
      points: [
        "Spend optimised to clicks, not qualified leads",
        "No view of which campaigns create pipeline",
        "Leads that arrive but never get followed up",
        "Reporting that can't tie budget to revenue",
      ],
    },
    outcomes: [
      { stat: "Lower", label: "Cost per qualified lead", body: "By optimising to pipeline signals, not surface metrics." },
      { stat: "Faster", label: "Speed to first response", body: "Leads route straight into CRM and follow-up." },
      { stat: "Clear", label: "Revenue attribution", body: "Every campaign tied to opportunities created." },
    ],
    included: [
      "Account audit and restructure",
      "Google Ads (Search, PMax, Display)",
      "Meta and LinkedIn campaigns",
      "Audience and offer strategy",
      "Landing page alignment",
      "Conversion and lead-quality tracking",
      "CRM lead routing",
      "Weekly performance reporting",
    ],
    steps: [
      { title: "Audit", body: "Review spend, structure, tracking, and lead flow to find waste and gaps." },
      { title: "Plan", body: "Set targets, channels, offers, and the measurement model." },
      { title: "Build", body: "Launch structured campaigns wired into tracking and CRM." },
      { title: "Improve", body: "Optimise weekly against pipeline and cost-per-qualified-lead." },
    ],
    tools: ["Google Ads", "Meta Ads", "LinkedIn Ads", "GA4", "Google Tag Manager", "HubSpot", "Zapier"],
    faqs: [
      { q: "What ad budget do I need?", a: "We work with a range of budgets and will be honest about what's realistic. In the audit we recommend a starting spend based on your goals, market, and margins - no inflated promises." },
      { q: "How do you measure success?", a: "Cost per qualified lead and pipeline created, not clicks or impressions. We tie campaigns to CRM outcomes so you can see what actually drives revenue." },
      { q: "Do you handle creative too?", a: "Yes - our Creative Strategy service produces the ads, and we align them tightly with landing pages and offers." },
      { q: "How fast will we see results?", a: "Early signal usually appears within the first few weeks; durable improvements build over the first quarter as we optimise on real data." },
    ],
  },

  "lead-generation": {
    slug: "lead-generation",
    facts: [
      { label: "Channels", value: "Meta Lead Ads, Google Ads" },
      { label: "Qualified", value: "Before it reaches sales" },
      { label: "Delivered to", value: "Your CRM" },
    ],
    photos: { problem: { src: "/images/services/more/svc-pain-lead-generation.webp", alt: "A real estate sales executive waiting at an empty sales office reception beside untouched brochures" }, outcome: { src: "/images/services/more/svc-win-lead-generation.webp", alt: "A sales executive shaking hands with a young couple holding a project brochure at a Pune site office" } },
    image: { src: "/images/services/svc-lead-generation.webp", alt: "Home buyer filling in an example site-visit lead form for a Pune real estate project on a phone" },
    title: "Lead Generation",
    eyebrow: "Digital Marketing",
    subtitle:
      "A predictable flow of high-intent leads - captured, qualified, and delivered into your CRM ready for follow-up.",
    metaTitle: "Lead Generation Services in India",
    metaDescription:
      "High-intent lead generation across paid, organic, and outbound - captured and routed into your CRM with instant follow-up.",
    problem: {
      title: "More leads only help if the system behind them works.",
      body: "Volume without qualification and follow-up creates busywork, not revenue. The pipeline leaks between capture and contact.",
      points: [
        "Unqualified leads clog the pipeline",
        "Slow or inconsistent follow-up",
        "No lead scoring or prioritisation",
        "Poor visibility into lead source quality",
      ],
    },
    outcomes: [
      { stat: "Higher", label: "Lead-to-opportunity rate", body: "Better qualification means sales works the right leads." },
      { stat: "Seconds", label: "To first touch", body: "Automated response when intent is highest." },
      { stat: "Full", label: "Source visibility", body: "Know which channels create real pipeline." },
    ],
    included: [
      "Offer and lead-magnet strategy",
      "Multi-channel lead capture",
      "Qualification and lead scoring",
      "Instant follow-up automation",
      "CRM integration and routing",
      "Lead nurture sequences",
      "Duplicate and spam filtering",
      "Source-level reporting",
    ],
    steps: [
      { title: "Audit", body: "Map your current lead flow and where it leaks." },
      { title: "Plan", body: "Design offers, channels, scoring, and routing rules." },
      { title: "Build", body: "Launch capture, qualification, and follow-up systems." },
      { title: "Improve", body: "Tune scoring and sources against closed revenue." },
    ],
    tools: ["Meta Lead Ads", "Google Ads", "HubSpot", "Pipedrive", "Zapier", "Make", "Twilio"],
    faqs: [
      { q: "How do you keep lead quality high?", a: "Through offer design, qualifying questions, scoring, and filtering - plus feedback loops from sales so we optimise for leads that actually convert." },
      { q: "Can you plug into our existing CRM?", a: "Yes. We integrate with common CRMs and route leads with the fields, tags, and owner assignment your team needs." },
      { q: "Do you guarantee a number of leads?", a: "We don't sell guarantees. We set realistic targets from your data and improve them month over month." },
    ],
  },

  "website-development": {
    slug: "website-development",
    facts: [
      { label: "Built with", value: "Next.js, Sanity, Tailwind" },
      { label: "Based in", value: "Baner, Pune" },
      { label: "Lead forms", value: "Straight into your CRM" },
    ],
    photos: { problem: { src: "/images/services/more/svc-pain-website-development.webp", alt: "A young woman at a cafe losing patience with a slow website on her phone" } },
    showcase: {
      eyebrow: "Recent work",
      title: "Websites we've built",
      body: "Real sites built by Vistrow for Pune businesses and our own products.",
      shots: [
        { src: "/work/portfolio/prophuntllp-apple.jpg", alt: "Prophunt real estate advisory website built by Vistrow, on laptop, tablet and phone", caption: "Prophunt LLP: curated listings and a book-a-site-visit funnel.", width: 1536, height: 1024, href: "https://www.prophuntllp.com" },
        { src: "/work/portfolio/singhsteel-apple.jpg", alt: "Singh Steel contractor website built by Vistrow, on laptop, tablet and phone", caption: "Singh Steel: service catalogue, project gallery and quotes.", width: 1536, height: 1024, href: "https://www.singhsteel.in" },
        { src: "/work/portfolio/mahindra-citadel-apple.jpg", alt: "Mahindra Citadel project microsite built by Vistrow for the channel partner Prophunt, on laptop, tablet and phone", caption: "Mahindra Citadel microsite for Prophunt, a RERA-registered channel partner.", width: 1536, height: 1024 },
        { src: "/work/portfolio/marketixstudio-apple.jpg", alt: "Marketix Studio agency website built by Vistrow, on laptop, tablet and phone", caption: "Marketix Studio: case studies and a lead-capture funnel.", width: 1536, height: 1024, href: "https://www.marketixstudio.com" }
      ],
    },
    image: { src: "/images/services/svc-website-development.webp", alt: "Prophunt website built by Vistrow, shown on an iMac with its mobile version on an iPhone beside it" },
    title: "Website Development",
    heroTitle: "Website development company in",
    highlight: "Pune",
    eyebrow: "Digital Marketing",
    subtitle:
      "Vistrow builds fast, SEO-ready websites from our office in Baner, Pune, for businesses in Pune and across India. Lead forms go straight into your CRM and tracking is set up before launch, so the site brings in enquiries, not just visits. Websites for Indian businesses start from ₹9,999.",
    metaTitle: "Website Development Company in Pune, SEO-Ready",
    metaDescription:
      "Website development company in Pune. Fast, SEO-ready websites with CRM and tracking built in, starting from ₹9,999 for Indian businesses.",
    problem: {
      title: "A slow, generic website quietly costs you leads.",
      body: "Templated builders and unmaintained sites load slowly, rank poorly, and disconnect from the systems that turn visitors into pipeline.",
      points: [
        "Slow load times hurting rankings and conversions",
        "Templates that don't reflect the brand or offer",
        "No connection between the site, CRM, and tracking",
        "Difficult to update without a developer",
      ],
    },
    outcomes: [
      { stat: "Fast", label: "Core Web Vitals", body: "Built on modern infrastructure for real-world speed." },
      { stat: "Connected", label: "Lead capture", body: "Forms and CTAs routed straight into your CRM." },
      { stat: "Owned", label: "Content and code", body: "A codebase and CMS your team can actually use." },
    ],
    included: [
      "Information architecture and UX design",
      "Custom, responsive front-end build",
      "CMS setup for self-serve content edits",
      "On-page SEO and structured data",
      "Analytics and conversion tracking",
      "Form and CRM integration",
      "Performance and accessibility tuning",
      "Hosting, domain, and launch support",
    ],
    steps: [
      { title: "Audit", body: "Review the current site, goals, and technical constraints." },
      { title: "Plan", body: "Map sitemap, content, and the conversion path for each page." },
      { title: "Build", body: "Design and develop a fast, tracked, CRM-connected site." },
      { title: "Improve", body: "Monitor performance and iterate after launch." },
    ],
    costGuide: {
      title: "What website development costs in India, and why quotes differ",
      body: "Websites for Indian businesses start from ₹9,999. Two quotes for \"a business website\" can still be far apart because they describe different work, so these are the things that move the price above that. Share your page list and integrations with us for a line-by-line quote.",
      factors: [
        { label: "Pages and content depth", body: "A five-page brochure site is a different job from thirty service and location pages, each written and optimised for search." },
        { label: "Template or custom build", body: "Themes and page builders cost less up front but are slower and harder to extend. A custom build (we use Next.js) costs more and loads faster." },
        { label: "Copy, photos and translation", body: "Low quotes often leave out who writes the words, sources the photos and handles Hindi or Marathi versions." },
        { label: "Integrations", body: "Each connection adds work: CRM, WhatsApp, payment gateway, booking calendar, or property portal and ad lead feeds." },
        { label: "SEO and tracking setup", body: "Structured data, redirects from your old site, GA4 and conversion events, and a Google Business Profile link-up." },
        { label: "Hosting, support and ownership", body: "Ask what hosting costs each year, what changes cost after launch, and whether you own the domain and the code." },
      ],
    },
    tools: ["Next.js", "Sanity", "Tailwind CSS", "Vercel", "GA4", "Google Tag Manager", "HubSpot"],
    faqs: [
      { q: "How much does website development cost in Pune?", a: "Websites for Indian businesses start from ₹9,999. The final price depends on the factors above: how many pages, whether it is a custom build or a template, who writes the content, the integrations, and the support you want after launch. After a short call we send a line-by-line quote, so you can see what each part costs and compare it fairly with other quotes." },
      { q: "Is Vistrow a website development company based in Pune?", a: "Yes. Our office is in Baner, Pune. We meet Pune clients in person when it helps, and also build websites for businesses across India and abroad." },
      { q: "Who owns the website after launch?", a: "You do - the domain, the content and the code. We can hand everything over to your team or stay on for updates and improvements." },
      { q: "Do you also handle ongoing maintenance?", a: "Yes - we can hand the site fully over to your team or stay on for updates, content, and improvements." },
      { q: "Will the site be built on a page builder?", a: "No. We build custom on modern infrastructure (Next.js) for speed and flexibility, with a CMS so non-developers can still edit content." },
      { q: "Can this connect to our CRM and tracking?", a: "Yes - forms, events, and conversions are wired into your CRM and analytics from launch, the same as our landing pages and funnels." },
      { q: "How long does a typical build take?", a: "Most marketing sites take a few weeks from approved design to launch, depending on page count and integrations." },
    ],
  },

  "landing-pages": {
    slug: "landing-pages",
    facts: [
      { label: "Built for", value: "Campaign traffic" },
      { label: "Stack", value: "Next.js, Webflow, Unbounce" },
      { label: "Tracked with", value: "GA4 and Hotjar" },
    ],
    photos: { problem: { src: "/images/services/more/svc-pain-landing-pages.webp", alt: "A commuter on a Pune metro platform glancing at his phone, about to put it away" } },
    showcase: {
      eyebrow: "Recent work",
      title: "A landing page we run ourselves",
      body: "Our own Growth Audit page: one offer, one action, built to convert on desktop and phone.",
      shots: [
        { src: "/images/services/deliverables/growth-audit-landing-page.webp", alt: "Vistrow Growth Audit landing page with one headline, what you get, and a single call to action", caption: "vistrow.com/growth-audit on desktop.", width: 1600, height: 1000, frame: "browser", url: "vistrow.com/growth-audit", href: "https://www.vistrow.com/growth-audit" },
        { src: "/images/services/deliverables/growth-audit-landing-page-mobile.webp", alt: "Vistrow Growth Audit landing page on a phone", caption: "The same page on a phone.", width: 600, height: 1298 }
      ],
    },
    image: { src: "/images/services/svc-landing-pages.webp", alt: "Vistrow Growth Audit landing page on a MacBook Air with its mobile version on a phone, on a cafe table" },
    title: "Landing Pages & Funnels",
    eyebrow: "Digital Marketing",
    subtitle:
      "Fast, focused pages and funnels engineered to turn campaign traffic into qualified leads and booked calls.",
    metaTitle: "Landing Page and Funnel Design",
    metaDescription:
      "High-converting landing pages and funnels - fast, accessible, and built to capture and route leads into your CRM.",
    problem: {
      title: "The click was paid for. The page decides if it was worth it.",
      body: "Most landing pages lose leads in the same few places: the ad promises one thing and the page says another, the form asks for too much, the page is slow on a mid-range phone, and the enquiry lands in an inbox nobody checks until the next day. Each of these is fixable, and fixing them usually costs less than buying more traffic.",
      points: [
        "The page says something different from the ad that brought the visitor",
        "The page loads slowly on a typical Android phone",
        "The form asks for more than a first enquiry needs",
        "Leads land in email, with no source and no follow-up task",
      ],
    },
    outcomes: [
      { stat: "Matched", label: "Ad to page", body: "The headline, offer and proof on the page continue what the ad promised." },
      { stat: "Fast", label: "On a mid-range phone", body: "Built in Next.js with an image and script budget, and checked against Core Web Vitals before launch." },
      { stat: "Traceable", label: "Every lead has a source", body: "Campaign, ad and click ID are saved with the lead and passed to your CRM." },
    ],
    included: [
      "One offer and one action per page",
      "Copy written around the offer and the objections buyers raise",
      "Mobile-first build in Next.js, or inside the Webflow or Unbounce setup you already use",
      "Short forms, with multi-step or quiz forms where the offer needs them",
      "Form to CRM, WhatsApp and email alerts",
      "UTM, gclid and fbclid capture saved with each lead",
      "GA4 events, Meta Pixel and Conversions API set up and tested",
      "Speed and accessibility checks before launch",
    ],
    features: [
      { title: "Message match", body: "The ad, the headline and the first screen say the same thing, so visitors do not have to decide again." },
      { title: "Speed on real phones", body: "Lean pages, compressed images and few scripts. We test on a mid-range Android phone over mobile data, because that is how many of your visitors arrive." },
      { title: "Forms that fit the offer", body: "A short form for a quick enquiry, a multi-step or quiz form when you need to qualify. Phone and email checks help cut fake leads." },
      { title: "CRM and WhatsApp handoff", body: "Each submission creates a record with its source and can trigger a WhatsApp message or a call task straight away." },
      { title: "Tracking you can trust", body: "GA4 events, the Meta Conversions API and click IDs, so ad platforms learn from real leads and not just clicks." },
      { title: "Built to be edited", body: "Your team can change copy and swap offers without a developer, or we maintain the pages for you." },
    ],
    costGuide: {
      title: "What decides the scope of a landing page project",
      body: "A landing page can be one page for one offer, or a set of variants for different audiences, cities and languages. These are the things that change the work, so you can plan before we quote.",
      factors: [
        { label: "Number of pages and variants", body: "One offer on one page is a small job. Separate pages per audience, city or ad group multiply the copy, design and testing." },
        { label: "Copy and proof you already have", body: "If testimonials, project photos and numbers exist, writing is quick. If they have to be gathered, that becomes part of the work." },
        { label: "Form logic and qualification", body: "A simple form is quick. Multi-step quizzes, calendar booking and phone verification need more build and testing." },
        { label: "Integrations", body: "CRM, WhatsApp, email alerts and call tasks each have to be connected and tested with a real lead." },
        { label: "Languages", body: "English plus Hindi or Marathi means writing for each audience, not translating line by line." },
        { label: "Testing plan", body: "A/B tests need enough traffic to mean anything. We tell you honestly if volumes are too low to test and suggest a better use of the budget." },
      ],
    },
    steps: [
      { title: "Read the traffic", body: "Start from the ad, the audience and the current page. We check where visitors leave and which sources bring leads worth calling." },
      { title: "Write the offer", body: "Agree one offer, one action and the proof you can honestly show. Copy and structure come from that, not from a template." },
      { title: "Build and connect", body: "Ship the page, wire the form to your CRM and WhatsApp, and confirm tracking works with a test lead before any budget goes in." },
      { title: "Test one lever at a time", body: "Change the headline, offer or form length one at a time and judge each on qualified leads, not clicks." },
    ],
    tools: ["Next.js", "Webflow", "Unbounce", "GA4", "Hotjar", "HubSpot Forms", "Zapier"],
    faqs: [
      { q: "Do you design and build, or just design?", a: "Both. We design and build production-ready pages, or work inside your existing site and stack." },
      { q: "Can you improve our current pages?", a: "Yes. Often the fastest win is fixing and testing what you already have before building new pages." },
      { q: "How long does a landing page take?", a: "It depends on whether the offer, copy and proof are ready. A single page with a clear offer is the quickest piece of work; waiting for approvals and content is usually what takes longest. We give a timeline after the first audit call." },
      { q: "Will it live on our main website?", a: "Either way works. Landing pages often sit on their own, on a path or subdomain of your domain, so they load fast and can change without touching the main site. We can also build inside the platform you already use if that fits." },
      { q: "Can you promise a conversion rate?", a: "No. Conversion depends on the offer, the traffic and the price. We commit to a fast, tracked page, a clear test plan and honest reporting on qualified leads, not to a fixed rate." },
      { q: "Where do the leads go, and how do you handle fake ones?", a: "Straight into your CRM with the source and click IDs attached, plus an alert by email or WhatsApp so someone can call quickly. Short forms, phone and email validation and duplicate matching cut fake and repeat leads, and we track which campaigns send low-quality ones." },
    ],
  },

  "creative-strategy": {
    slug: "creative-strategy",
    facts: [
      { label: "Made for", value: "Meta, Google, TikTok" },
      { label: "Based on", value: "What your buyers respond to" },
      { label: "Tools", value: "Figma, Adobe CC, CapCut" },
    ],
    photos: { problem: { src: "/images/services/more/svc-pain-creative-strategy.webp", alt: "Marketers puzzled in front of a wall of printed ads that all look the same" }, outcome: { src: "/images/services/more/svc-win-creative-strategy.webp", alt: "A photographer shooting a product in a studio while a creative director gives a thumbs up" } },
    image: { src: "/images/services/svc-creative-strategy.webp", alt: "Creative team in Pune pinning printed ad concepts to a board while an example creative testing board shows hook rate and cost per lead on an iMac" },
    title: "Creative Strategy",
    eyebrow: "Digital Marketing",
    subtitle:
      "Messaging and creative that earns attention and drives action - grounded in what your buyers actually respond to.",
    metaTitle: "Creative Strategy for Performance Marketing",
    metaDescription:
      "Ad creative and messaging strategy that improves click-through and conversion - tested and iterated on real performance data.",
    problem: {
      title: "Weak creative makes every channel more expensive.",
      body: "When the message doesn't land, you pay more for every result. Creative is the biggest lever most accounts ignore.",
      points: [
        "Generic messaging that blends in",
        "No creative testing framework",
        "Creative disconnected from the offer",
        "One-size-fits-all across channels",
      ],
    },
    outcomes: [
      { stat: "Higher", label: "Click-through rate", body: "Creative that stops the scroll." },
      { stat: "Lower", label: "Cost per result", body: "Better messaging lowers acquisition cost." },
      { stat: "Faster", label: "Creative iteration", body: "A steady pipeline of tested variations." },
    ],
    included: [
      "Positioning and message strategy",
      "Ad concepts and hooks",
      "Static and video creative",
      "Channel-specific variations",
      "Creative testing framework",
      "Performance-based iteration",
      "Offer and angle development",
      "Creative reporting",
    ],
    steps: [
      { title: "Audit", body: "Review current creative and what's working." },
      { title: "Plan", body: "Develop angles, hooks, and a testing plan." },
      { title: "Build", body: "Produce creative variations per channel." },
      { title: "Improve", body: "Double down on winners, retire the rest." },
    ],
    tools: ["Figma", "Adobe CC", "CapCut", "Meta Ads", "TikTok Ads", "Google Ads"],
    faqs: [
      { q: "Do you produce video?", a: "Yes - static, motion, and short-form video suited to each platform." },
      { q: "How many concepts do we get?", a: "We work in testable batches rather than one-offs, so there's always fresh creative to learn from." },
      { q: "Do you write the copy too?", a: "Yes - hooks, headlines, and ad copy are part of the strategy, aligned to your offer and landing pages." },
    ],
  },

  "social-media": {
    slug: "social-media",
    facts: [
      { label: "Platforms", value: "Meta, LinkedIn, YouTube" },
      { label: "Approach", value: "Organic and paid together" },
      { label: "Goal", value: "Demand and trust" },
    ],
    photos: { problem: { src: "/images/services/more/svc-pain-social-media.webp", alt: "A Pune bakery owner looking disappointed at her phone behind the counter" }, outcome: { src: "/images/services/more/svc-win-social-media.webp", alt: "A content creator filming the smiling bakery owner holding a tray of croissants for a reel" } },
    image: { src: "/images/services/svc-social-media.webp", alt: "Close-up of a phone showing an example sponsored Instagram post for a Pune dental clinic, with a reel being shot behind" },
    title: "Social Media Marketing",
    eyebrow: "Digital Marketing",
    subtitle:
      "Build demand and trust across the platforms your audience actually uses - organic and paid working together.",
    metaTitle: "Social Media Marketing Services",
    metaDescription:
      "Social media strategy, content, and paid amplification that builds demand and feeds your pipeline.",
    problem: {
      title: "Posting is not the same as having a plan.",
      body: "Many businesses post when there is time, on every platform, with nothing asking the viewer to do anything. Social media works when each post has a job, one or two platforms get proper attention, and replies lead into follow-up.",
      points: [
        "No clear reason for each post to exist",
        "Spread across too many platforms to do any of them well",
        "Comments and messages answered late, or not at all",
        "No path from a viewer to an enquiry",
      ],
    },
    outcomes: [
      { stat: "Planned", label: "Content with a job", body: "Every post is tied to a buyer question, an offer or a proof point." },
      { stat: "Focused", label: "One or two platforms", body: "Effort goes where your buyers already are and where you can keep up." },
      { stat: "Connected", label: "From viewer to lead", body: "Comments, messages and link clicks end up in your follow-up, not lost in an inbox." },
    ],
    included: [
      "Platform choice based on where your buyers are",
      "Content pillars and a monthly calendar",
      "Reels, carousels and posts produced to your brand",
      "Community replies to comments and messages",
      "Paid boosts on posts that have already worked",
      "Lead capture: comment keywords, WhatsApp links and forms",
      "Reporting on reach, saves, enquiries and leads",
      "Monitoring of formats and platform changes",
    ],
    features: [
      { title: "Content pillars", body: "A small set of recurring themes: the questions buyers ask, proof, process and offers, so the feed is consistent and easy to recognise." },
      { title: "Reels and short video", body: "Short videos built around one idea each, with a hook and a clear next step." },
      { title: "LinkedIn for B2B", body: "Founder and company posts written for people who buy services, with posts and comments that lead to conversations." },
      { title: "Comment-to-resource capture", body: "Viewers comment a keyword and receive a resource or a link. We run this ourselves with Meta's official APIs, as described in our Privacy Policy, and set it up for clients the same way." },
      { title: "Replies that lead somewhere", body: "Fast, helpful answers to comments and messages, handed to a person or a WhatsApp follow-up when someone shows interest." },
      { title: "Paid boosts on proven posts", body: "Budget goes behind organic posts that already earn attention, instead of guessing with new creative." },
    ],
    costGuide: {
      title: "What decides the scope of social media work",
      body: "Social media scope depends more on the kind of content than on the number of posts. These are the factors that change the work and the plan.",
      factors: [
        { label: "Platforms", body: "Two platforms done properly take less than six done thinly. We recommend fewer, then add more when the first ones are working." },
        { label: "Format mix", body: "Short video and reels need more production than static posts and carousels." },
        { label: "Posting rhythm", body: "A steady weekly rhythm matters more than a burst. We agree one you can keep for months." },
        { label: "Community replies", body: "Replying within the day takes real time. Decide whether we handle it or your team does." },
        { label: "Paid budget", body: "Ad spend is separate from our fee and is set by your goals and what the organic posts prove." },
        { label: "Approvals", body: "Fast brand and claim approvals keep the calendar on time; slow ones are the usual cause of gaps." },
      ],
    },
    steps: [
      { title: "Pick platforms", body: "Look at where your buyers spend time and what you can sustain. Choose one or two, not all of them." },
      { title: "Plan the pillars", body: "Agree the themes, the offers and the proof you can show, then lay out a monthly calendar." },
      { title: "Produce and publish", body: "Make and post content on a steady rhythm, and answer comments and messages the same day where possible." },
      { title: "Review what moved", body: "Look at saves, enquiries and leads, not only likes. Put paid budget behind what works and drop what does not." },
    ],
    tools: ["Meta", "LinkedIn", "Instagram", "TikTok", "YouTube", "Buffer", "Later"],
    faqs: [
      { q: "Which platforms should we be on?", a: "Only those where your buyers are and where you can stay consistent. For most B2B and service businesses in India that is LinkedIn and Instagram, sometimes YouTube. We would rather do two well than six thinly." },
      { q: "Organic, paid, or both?", a: "Usually both. Organic builds trust and shows what people respond to. Paid then amplifies the best posts and gives predictable reach." },
      { q: "Do you create the content?", a: "Yes: strategy, calendar and production, in line with your brand and offers. You approve claims before they go out." },
      { q: "How do social media enquiries reach us?", a: "Through comments, direct messages, WhatsApp links and forms. We connect them to your CRM or WhatsApp so a person can follow up quickly, and respect each platform's opt-in rules." },
      { q: "Can you promise followers or leads?", a: "No. Reach depends on the platform and your market. We agree what to measure up front, usually qualified enquiries, and report on it honestly." },
      { q: "Do you run your own social media?", a: "Yes. Vistrow publishes on Instagram, LinkedIn and YouTube, including a 100-day series with free playbooks, so the approach we recommend is one we use ourselves." },
    ],
  },

  "seo-content": {
    slug: "seo-content",
    facts: [
      { label: "Covers", value: "Technical SEO, content, links" },
      { label: "Measured in", value: "Search Console and GA4" },
      { label: "Payoff", value: "Compounds over time" },
    ],
    photos: { problem: { src: "/images/services/more/svc-pain-seo-content.webp", alt: "A founder looking concerned at a printed report with a falling line graph" }, outcome: { src: "/images/services/more/svc-win-seo-content.webp", alt: "An SEO strategist and a content writer mapping topic clusters with sticky notes on a whiteboard" } },
    image: { src: "/images/services/svc-seo-content.webp", alt: "iMac on a desk showing an example Google search performance report with keywords moving up the rankings, beside a printed keyword list" },
    title: "SEO & Content Marketing",
    eyebrow: "Digital Marketing",
    subtitle:
      "Compounding organic growth - technical SEO, content, and internal linking that earn qualified search traffic over time.",
    metaTitle: "SEO and Content Marketing Services",
    metaDescription:
      "Technical SEO, content strategy, and on-page optimisation that build durable, qualified organic traffic.",
    problem: {
      title: "Content without strategy rarely ranks or converts.",
      body: "Publishing for the sake of it wastes effort. Organic growth comes from intent, structure, and technical health working together.",
      points: [
        "Content that targets no clear intent",
        "Technical issues holding back rankings",
        "Thin internal linking and structure",
        "No connection between traffic and leads",
      ],
    },
    outcomes: [
      { stat: "Compounding", label: "Organic traffic", body: "Durable growth that lowers reliance on ads." },
      { stat: "Higher", label: "Qualified visits", body: "Content matched to buyer intent." },
      { stat: "Stronger", label: "Technical health", body: "A site search engines can crawl and trust." },
    ],
    included: [
      "Technical SEO audit and fixes",
      "Keyword and intent research",
      "Content strategy and briefs",
      "On-page optimisation",
      "Internal linking structure",
      "Content production support",
      "Schema and structured data",
      "Rank and traffic reporting",
    ],
    steps: [
      { title: "Audit", body: "Assess technical health, content, and opportunities." },
      { title: "Plan", body: "Prioritise topics and fixes by impact." },
      { title: "Build", body: "Ship optimisations and intent-led content." },
      { title: "Improve", body: "Iterate on rankings, traffic, and conversions." },
    ],
    tools: ["Ahrefs", "Semrush", "Google Search Console", "GA4", "Screaming Frog", "Surfer"],
    faqs: [
      { q: "How long until SEO works?", a: "SEO is a compounding investment - early movement in months, meaningful results over two to three quarters depending on competition." },
      { q: "Do you write the content?", a: "We provide strategy, briefs, and optimisation, and can produce content or work with your writers." },
      { q: "Is SEO worth it if we run ads?", a: "Yes - organic reduces long-term dependence on paid and compounds, while ads deliver immediate volume. They work best together." },
    ],
  },

  "conversion-tracking": {
    slug: "conversion-tracking",
    facts: [
      { label: "Stack", value: "GA4, GTM, Meta CAPI" },
      { label: "Connects", value: "Marketing to pipeline" },
      { label: "Reports in", value: "Looker Studio" },
    ],
    photos: { problem: { src: "/images/services/more/svc-pain-conversion-tracking.webp", alt: "Two colleagues disagreeing over printed reports with charts that do not match" }, outcome: { src: "/images/services/more/svc-win-conversion-tracking.webp", alt: "A Vistrow analyst showing a business owner a clean funnel chart" } },
    image: { src: "/images/services/svc-conversion-tracking.webp", alt: "Analyst walking a business owner through an example lead-to-revenue tracking report showing which ad sources produce bookings" },
    title: "Conversion Tracking",
    eyebrow: "Digital Marketing",
    subtitle:
      "Trustworthy measurement that connects marketing activity to pipeline and revenue - so you can invest with confidence.",
    metaTitle: "Conversion Tracking and Attribution",
    metaDescription:
      "End-to-end conversion tracking and attribution that ties every campaign to pipeline and revenue.",
    problem: {
      title: "You can't improve what you can't measure.",
      body: "Broken or shallow tracking means decisions get made on guesswork. Without clean measurement, budget goes to whatever looks good, not what works.",
      points: [
        "Broken or duplicated conversion events",
        "No link between marketing and CRM",
        "Attribution that stops at the click",
        "Privacy changes breaking measurement",
      ],
    },
    outcomes: [
      { stat: "Reliable", label: "Conversion data", body: "Clean events you can actually trust." },
      { stat: "End-to-end", label: "Attribution", body: "From first touch to closed revenue." },
      { stat: "Confident", label: "Budget decisions", body: "Invest where the data proves it works." },
    ],
    included: [
      "Tracking audit and plan",
      "GA4 and Tag Manager setup",
      "Server-side and conversion APIs",
      "CRM revenue integration",
      "Cross-channel attribution",
      "Consent-mode and privacy compliance",
      "Dashboards and reporting",
      "Ongoing QA and maintenance",
    ],
    steps: [
      { title: "Audit", body: "Find gaps, duplicates, and broken events." },
      { title: "Plan", body: "Design a measurement and attribution model." },
      { title: "Build", body: "Implement tracking, APIs, and dashboards." },
      { title: "Improve", body: "Maintain accuracy as platforms change." },
    ],
    tools: ["GA4", "Google Tag Manager", "Meta CAPI", "Segment", "Looker Studio", "HubSpot"],
    faqs: [
      { q: "Will this work with privacy changes?", a: "Yes - we use consent mode, server-side tracking, and conversion APIs to keep measurement resilient and compliant." },
      { q: "Can you connect ad spend to revenue?", a: "That's the goal - by integrating your CRM we tie campaigns to opportunities and closed revenue, not just form fills." },
      { q: "Do you build dashboards?", a: "Yes - clear reporting so you can see performance without digging through platforms." },
    ],
  },

  "marketing-automation": {
    slug: "marketing-automation",
    facts: [
      { label: "Handles", value: "Nurture, scoring, routing" },
      { label: "Platforms", value: "HubSpot, ActiveCampaign" },
      { label: "Triggered by", value: "What the lead does" },
    ],
    photos: { problem: { src: "/images/services/more/svc-pain-marketing-automation.webp", alt: "A marketing executive working late, ticking names one by one on a long printed contact list" }, outcome: { src: "/images/services/more/svc-win-marketing-automation.webp", alt: "A marketing executive closing his laptop and leaving the office on time while a colleague waves goodbye" } },
    image: { src: "/images/services/svc-marketing-automation-v2.webp", alt: "A marketing strategist mapping an automated customer journey with sticky notes and arrows on a whiteboard" },
    title: "Marketing Automation",
    eyebrow: "Digital Marketing",
    subtitle:
      "Automated journeys that nurture, score, and route leads - so the right message reaches the right person at the right time.",
    metaTitle: "Marketing Automation Services",
    metaDescription:
      "Marketing automation and lifecycle journeys - nurture, scoring, and routing that scale what works without adding headcount.",
    problem: {
      title: "Manual follow-up doesn't scale.",
      body: "As volume grows, leads slip through the cracks. Automation makes sure every lead gets a timely, relevant response.",
      points: [
        "Leads that never get nurtured",
        "Inconsistent, manual follow-up",
        "No lead scoring or lifecycle stages",
        "Disconnected email, SMS, and CRM",
      ],
    },
    outcomes: [
      { stat: "Zero", label: "Dropped leads", body: "Every lead enters a nurture path automatically." },
      { stat: "Higher", label: "Engagement rate", body: "Relevant, timely, behaviour-based messaging." },
      { stat: "Scalable", label: "Without headcount", body: "Systems handle the repetitive work." },
    ],
    included: [
      "Lifecycle and journey mapping",
      "Lead scoring model",
      "Email and SMS sequences",
      "Behaviour-based triggers",
      "CRM sync and routing",
      "Segmentation and personalisation",
      "A/B testing of journeys",
      "Performance reporting",
    ],
    steps: [
      { title: "Audit", body: "Map lifecycle stages and current gaps." },
      { title: "Plan", body: "Design journeys, scoring, and triggers." },
      { title: "Build", body: "Implement automations across channels." },
      { title: "Improve", body: "Optimise journeys against conversions." },
    ],
    tools: ["HubSpot", "ActiveCampaign", "Customer.io", "Klaviyo", "Twilio", "Zapier", "Make"],
    faqs: [
      { q: "Which automation platform is best?", a: "It depends on your stack and goals - we're platform-agnostic and recommend based on your needs, not a reseller relationship." },
      { q: "Isn't automation impersonal?", a: "Done well, it's the opposite - behaviour-based, segmented messaging feels more relevant than generic manual outreach." },
      { q: "Can you connect this to AI voice and CRM?", a: "Yes - automation is the connective layer that ties marketing to CRM, follow-up, and even AI calling." },
    ],
  },
};
