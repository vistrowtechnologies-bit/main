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

const cta = "Book a Growth Audit";

export const digitalMarketingServices: Record<string, ServiceContent> = {
  "performance-advertising": {
    slug: "performance-advertising",
    title: "Performance Advertising",
    eyebrow: "Digital Marketing",
    subtitle:
      "Paid media managed for ROI, not vanity metrics. We buy attention where your best customers are and connect every click to your pipeline.",
    metaTitle: "Performance Advertising Agency",
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
    title: "Lead Generation",
    eyebrow: "Digital Marketing",
    subtitle:
      "A predictable flow of high-intent leads - captured, qualified, and delivered into your CRM ready for follow-up.",
    metaTitle: "Lead Generation Services",
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
    title: "Website Development",
    eyebrow: "Digital Marketing",
    subtitle:
      "Fast, accessible websites built on modern infrastructure - designed to support your whole funnel, not just look good.",
    metaTitle: "Website Development Services",
    metaDescription:
      "Custom website development - fast, SEO-ready, and built to convert, with tracking and CRM handoff wired in from day one.",
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
    tools: ["Next.js", "Sanity", "Tailwind CSS", "Vercel", "GA4", "Google Tag Manager", "HubSpot"],
    faqs: [
      { q: "Do you also handle ongoing maintenance?", a: "Yes - we can hand the site fully over to your team or stay on for updates, content, and improvements." },
      { q: "Will the site be built on a page builder?", a: "No. We build custom on modern infrastructure (Next.js) for speed and flexibility, with a CMS so non-developers can still edit content." },
      { q: "Can this connect to our CRM and tracking?", a: "Yes - forms, events, and conversions are wired into your CRM and analytics from launch, the same as our landing pages and funnels." },
      { q: "How long does a typical build take?", a: "Most marketing sites take a few weeks from approved design to launch, depending on page count and integrations." },
    ],
  },

  "landing-pages": {
    slug: "landing-pages",
    title: "Landing Pages & Funnels",
    eyebrow: "Digital Marketing",
    subtitle:
      "Fast, focused pages and funnels engineered to turn campaign traffic into qualified leads and booked calls.",
    metaTitle: "Landing Page and Funnel Design",
    metaDescription:
      "High-converting landing pages and funnels - fast, accessible, and built to capture and route leads into your CRM.",
    problem: {
      title: "Great traffic dies on a weak page.",
      body: "Slow, cluttered, or unfocused pages waste the budget spent getting people there. Conversion is where most campaigns quietly lose money.",
      points: [
        "Slow load times and poor mobile UX",
        "Unclear offer and weak calls to action",
        "No A/B testing or iteration",
        "Forms that don't connect to the CRM",
      ],
    },
    outcomes: [
      { stat: "Higher", label: "Conversion rate", body: "Focused pages built around a single action." },
      { stat: "Fast", label: "Load performance", body: "Optimised pages that don't lose impatient visitors." },
      { stat: "Clean", label: "Lead handoff", body: "Every submission routed and tracked." },
    ],
    included: [
      "Conversion-focused page design",
      "Copywriting and offer framing",
      "Mobile-first, fast builds",
      "Multi-step and quiz funnels",
      "Form and CRM integration",
      "A/B testing setup",
      "Analytics and heatmaps",
      "Accessibility and SEO basics",
    ],
    steps: [
      { title: "Audit", body: "Review current pages, traffic, and conversion data." },
      { title: "Plan", body: "Define the offer, structure, and success metric." },
      { title: "Build", body: "Design and ship fast, tracked, connected pages." },
      { title: "Improve", body: "Run tests and iterate on the biggest levers." },
    ],
    tools: ["Next.js", "Webflow", "Unbounce", "GA4", "Hotjar", "HubSpot Forms", "Zapier"],
    faqs: [
      { q: "Do you design and build, or just design?", a: "Both. We design and build production-ready pages, or work within your existing site and stack." },
      { q: "Can you improve our current pages?", a: "Yes - often the fastest win is optimising and testing what you already have before building new." },
      { q: "How do you decide what to test?", a: "We prioritise by expected impact: offer, headline, and structure first, then finer details, always measured against conversions." },
    ],
  },

  "creative-strategy": {
    slug: "creative-strategy",
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
    title: "Social Media Marketing",
    eyebrow: "Digital Marketing",
    subtitle:
      "Build demand and trust across the platforms your audience actually uses - organic and paid working together.",
    metaTitle: "Social Media Marketing Services",
    metaDescription:
      "Social media strategy, content, and paid amplification that builds demand and feeds your pipeline.",
    problem: {
      title: "Posting isn't a strategy.",
      body: "Random content without a plan burns time and rarely creates pipeline. Social works when it's tied to demand and follow-up.",
      points: [
        "Inconsistent posting and no plan",
        "Content that doesn't drive action",
        "No connection to lead capture",
        "Effort spread across too many platforms",
      ],
    },
    outcomes: [
      { stat: "Consistent", label: "Content cadence", body: "A reliable, planned publishing rhythm." },
      { stat: "More", label: "Qualified reach", body: "Content and targeting aimed at real buyers." },
      { stat: "Connected", label: "To pipeline", body: "Social traffic captured and nurtured." },
    ],
    included: [
      "Channel and content strategy",
      "Content calendar and production",
      "Community management",
      "Paid social amplification",
      "Lead capture from social",
      "Influencer and partner support",
      "Reporting and insights",
      "Trend and format monitoring",
    ],
    steps: [
      { title: "Audit", body: "Assess channels, content, and audience fit." },
      { title: "Plan", body: "Pick platforms and build a content system." },
      { title: "Build", body: "Produce and publish on a consistent cadence." },
      { title: "Improve", body: "Amplify what performs; refine the rest." },
    ],
    tools: ["Meta", "LinkedIn", "Instagram", "TikTok", "YouTube", "Buffer", "Later"],
    faqs: [
      { q: "Which platforms should we be on?", a: "Only the ones where your buyers are and you can be consistent. We'd rather do two platforms well than six poorly." },
      { q: "Organic, paid, or both?", a: "Usually both - organic builds trust, paid amplifies your best content and drives predictable reach." },
      { q: "Do you create the content?", a: "Yes - strategy, calendar, and production, aligned with your brand and offers." },
    ],
  },

  "seo-content": {
    slug: "seo-content",
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
