import { Building2, Store, Briefcase, Rocket, Users, GraduationCap } from "lucide-react";
import type { IndustryContent, OverviewContent } from "@/lib/content-types";

export const industriesOverview: OverviewContent = {
  eyebrow: "Industries",
  title: "Growth systems tuned to your",
  highlight: "industry",
  subtitle:
    "The same connected engine - marketing, CRM, AI voice, and automation - shaped around the way your industry actually generates and closes business.",
  metaTitle: "Industry-Specific Growth Systems",
  metaDescription:
    "Vistrow growth systems for real estate, local businesses, B2B, startups & SaaS, agencies, and education.",
  cardsTitle: "Industries we serve",
  cards: [
    { label: "Real Estate", href: "/industries/real-estate", body: "Speed-to-lead and follow-up that win more listings and buyers.", icon: Building2 },
    { label: "Local Businesses", href: "/industries/local-businesses", body: "Steady enquiries and booked jobs from your local market.", icon: Store },
    { label: "B2B Companies", href: "/industries/b2b-companies", body: "Qualified pipeline for longer, considered sales cycles.", icon: Briefcase },
    { label: "Startups & SaaS", href: "/industries/startups-saas", body: "Efficient demand and activation that scale with you.", icon: Rocket },
    { label: "Agencies", href: "/industries/agencies", body: "White-label systems and automation to serve more clients.", icon: Users },
    { label: "Education", href: "/industries/education", body: "Enrolment pipelines and timely applicant follow-up.", icon: GraduationCap },
  ],
  intro: {
    eyebrow: "Industry context matters",
    title: "The engine stays connected. The workflow changes by market.",
    body:
      "A property enquiry, a B2B opportunity, and a course applicant should not enter the same generic funnel. We adapt channel mix, qualification, response, follow-up, and reporting to the real buying journey in each industry.",
    points: [
      "Channel selection based on how the market buys",
      "Qualification designed around real sales criteria",
      "Follow-up timing matched to the decision cycle",
      "Reporting aligned to meaningful commercial stages",
    ],
  },
  process: [
    { title: "Understand the market", body: "Map buyers, demand sources, seasonality, and the real decision process." },
    { title: "Define qualification", body: "Agree what makes an enquiry valuable and when it becomes sales-ready." },
    { title: "Build the journey", body: "Connect acquisition, response, nurture, CRM, and human handoff." },
    { title: "Optimise by outcome", body: "Improve the stages that matter: visits, appointments, opportunities, or enrolments." },
  ],
  faqs: [
    { q: "Do you only work with the industries listed here?", a: "No. These are common starting points, but the same audit and system-design approach can be adapted to other lead- and appointment-driven businesses." },
    { q: "Will we get an industry-specific strategy?", a: "Yes. We start from your market, margins, buying cycle, team, and tools rather than applying a prebuilt campaign template." },
    { q: "Can you work with our existing sales process?", a: "Yes. We map the current process first and preserve what works before recommending changes." },
  ],
};

const dmServices = [
  { label: "Performance Advertising", href: "/digital-marketing/performance-advertising" },
  { label: "Lead Generation", href: "/digital-marketing/lead-generation" },
  { label: "Landing Pages & Funnels", href: "/digital-marketing/landing-pages" },
];
const baServices = [
  { label: "CRM & Lead Management", href: "/business-automation/crm-lead-management" },
  { label: "AI Voice Calling", href: "/business-automation/ai-voice-calling" },
  { label: "Lead Follow-Up Systems", href: "/business-automation/lead-follow-up" },
];

export const industries: Record<string, IndustryContent> = {
  "real-estate": {
    slug: "real-estate",
    title: "Real Estate",
    eyebrow: "Industry",
    subtitle:
      "In real estate, the first agent to respond usually wins. We build the marketing and instant follow-up systems that turn enquiries into appointments.",
    metaTitle: "Real Estate Growth Systems",
    metaDescription:
      "Marketing, AI voice, and follow-up systems for real estate - capture, qualify, and book more buyers and sellers, faster.",
    challenges: [
      { title: "Slow lead response", body: "Enquiries go cold before an agent can call back." },
      { title: "High lead volume", body: "Portals and ads flood you with mixed-quality leads." },
      { title: "Inconsistent follow-up", body: "Busy agents drop leads that needed nurturing." },
      { title: "Poor source visibility", body: "Unclear which portals and campaigns actually convert." },
    ],
    solution: {
      title: "Respond in seconds, qualify automatically, book more viewings.",
      body: "We connect your lead sources to instant AI calling, scoring, and follow-up - so every enquiry gets a fast, consistent response and agents focus on ready buyers and sellers.",
      points: [
        "AI voice calls new enquiries in seconds",
        "Automatic qualification and scoring",
        "Viewings booked into agent calendars",
        "Persistent multi-channel follow-up",
      ],
    },
    services: [
      { label: "AI Voice Calling", href: "/business-automation/ai-voice-calling" },
      { label: "Lead Generation", href: "/digital-marketing/lead-generation" },
      { label: "Lead Follow-Up Systems", href: "/business-automation/lead-follow-up" },
      { label: "Landing Pages & Funnels", href: "/digital-marketing/landing-pages" },
      { label: "CRM & Lead Management", href: "/business-automation/crm-lead-management" },
      { label: "Performance Advertising", href: "/digital-marketing/performance-advertising" },
    ],
    workflow: [
      { title: "Enquiry captured", body: "Portal, ad, or website lead enters the system." },
      { title: "Instant AI call", body: "Vistrow Voice calls and qualifies within seconds." },
      { title: "Viewing booked", body: "Qualified leads book into the agent's calendar." },
      { title: "Follow-up runs", body: "Unbooked leads get persistent nurture." },
    ],
    faqs: [
      { q: "Does this work for agencies and individual agents?", a: "Both - we scale the system from solo agents to multi-branch agencies." },
      { q: "Will it integrate with our portal leads?", a: "Yes - leads from major portals and your website route into the same fast-response system." },
      { q: "Can the AI book viewings directly?", a: "Yes - it qualifies and books straight into agent calendars, with human handoff when needed." },
    ],
  },

  "local-businesses": {
    slug: "local-businesses",
    title: "Local Businesses",
    eyebrow: "Industry",
    subtitle:
      "For local and service businesses, every missed call is a missed job. We build marketing and follow-up that keep your calendar full.",
    metaTitle: "Local Business Growth Systems",
    metaDescription:
      "Local marketing, instant lead response, and follow-up that turn enquiries into booked jobs for service businesses.",
    challenges: [
      { title: "Missed calls, missed jobs", body: "Enquiries arrive while you're on the tools." },
      { title: "Feast or famine", body: "Unpredictable lead flow and cash flow." },
      { title: "No follow-up system", body: "Quotes sent and never chased." },
      { title: "Wasted ad spend", body: "Local ads that don't tie to booked work." },
    ],
    solution: {
      title: "Capture every enquiry and turn it into a booked job.",
      body: "We generate steady local demand and connect it to instant response and follow-up - so no call goes unanswered and no quote goes cold.",
      points: [
        "Local lead generation that fills the pipeline",
        "Instant response to every enquiry",
        "Automated quote follow-up",
        "Reviews and repeat-business automation",
      ],
    },
    services: [...dmServices, ...baServices],
    workflow: [
      { title: "Enquiry arrives", body: "Call, form, or message enters the system." },
      { title: "Instant response", body: "Auto-reply or AI call captures the lead." },
      { title: "Quote & follow-up", body: "Quotes go out and get chased automatically." },
      { title: "Job booked", body: "Booked into your schedule, logged in CRM." },
    ],
    faqs: [
      { q: "We're a small team - is this too much?", a: "No - the point is to do the work you can't, like answering and following up while you're busy on jobs." },
      { q: "What kinds of local business fit?", a: "Trades, clinics, salons, home services, and similar appointment- or quote-driven businesses." },
      { q: "Can it help with reviews?", a: "Yes - automated review requests after jobs help build your local reputation." },
    ],
  },

  "b2b-companies": {
    slug: "b2b-companies",
    title: "B2B Companies",
    eyebrow: "Industry",
    subtitle:
      "B2B sales are considered and multi-touch. We build the demand generation and nurture systems that create and mature qualified pipeline.",
    metaTitle: "B2B Growth Systems",
    metaDescription:
      "Demand generation, lead scoring, and nurture systems for B2B - qualified pipeline for longer sales cycles.",
    challenges: [
      { title: "Long sales cycles", body: "Deals need nurturing over weeks or months." },
      { title: "Low lead quality", body: "Volume without fit wastes sales time." },
      { title: "Marketing–sales gap", body: "Leads handed off with no context or scoring." },
      { title: "Hard attribution", body: "Multi-touch journeys are tough to measure." },
    ],
    solution: {
      title: "Generate qualified demand and nurture it to sales-ready.",
      body: "We combine targeted demand generation with scoring, nurture, and clean CRM handoff - so sales spends time on the right accounts at the right moment.",
      points: [
        "Targeted demand generation",
        "Lead scoring and lifecycle stages",
        "Nurture journeys that build intent",
        "Full-funnel attribution to revenue",
      ],
    },
    services: [
      { label: "Lead Generation", href: "/digital-marketing/lead-generation" },
      { label: "Marketing Automation", href: "/digital-marketing/marketing-automation" },
      { label: "Conversion Tracking", href: "/digital-marketing/conversion-tracking" },
      { label: "CRM & Lead Management", href: "/business-automation/crm-lead-management" },
      { label: "Sales Automation", href: "/business-automation/sales-automation" },
      { label: "SEO & Content", href: "/digital-marketing/seo-content" },
    ],
    workflow: [
      { title: "Demand generated", body: "Targeted campaigns attract fit accounts." },
      { title: "Scored & nurtured", body: "Leads are scored and matured with content." },
      { title: "Sales-ready handoff", body: "Qualified leads reach sales with context." },
      { title: "Measured to revenue", body: "Attribution ties activity to closed deals." },
    ],
    faqs: [
      { q: "Do you support ABM?", a: "Yes - we can focus demand generation and nurture around target accounts." },
      { q: "How do you improve lead quality?", a: "Through targeting, qualification, scoring, and tight sales feedback loops." },
      { q: "Can you prove ROI on long cycles?", a: "Yes - full-funnel tracking ties multi-touch journeys to pipeline and revenue." },
    ],
  },

  "startups-saas": {
    slug: "startups-saas",
    title: "Startups & SaaS",
    eyebrow: "Industry",
    subtitle:
      "Startups need efficient, measurable growth. We build acquisition and activation systems that scale with you - without wasting runway.",
    metaTitle: "Startup & SaaS Growth Systems",
    metaDescription:
      "Efficient acquisition, activation, and retention systems for startups and SaaS - measurable growth that scales.",
    challenges: [
      { title: "Limited runway", body: "Every rupee of spend has to be efficient." },
      { title: "Acquisition to activation gap", body: "Signups that never become active users." },
      { title: "Scaling manually", body: "Growth held back by manual processes." },
      { title: "Unclear metrics", body: "No clean view of CAC, activation, and retention." },
    ],
    solution: {
      title: "Efficient acquisition, strong activation, systems that scale.",
      body: "We build measurable acquisition and lifecycle automation - so you grow efficiently, activate more users, and don't rebuild your growth engine at every stage.",
      points: [
        "Efficient, measurable acquisition",
        "Onboarding and activation journeys",
        "Lifecycle and retention automation",
        "Clean metrics: CAC, activation, retention",
      ],
    },
    services: [
      { label: "Performance Advertising", href: "/digital-marketing/performance-advertising" },
      { label: "Marketing Automation", href: "/digital-marketing/marketing-automation" },
      { label: "Conversion Tracking", href: "/digital-marketing/conversion-tracking" },
      { label: "Landing Pages & Funnels", href: "/digital-marketing/landing-pages" },
      { label: "Custom Automation", href: "/business-automation/custom-automation" },
      { label: "SEO & Content", href: "/digital-marketing/seo-content" },
    ],
    workflow: [
      { title: "Acquire efficiently", body: "Measurable campaigns bring the right users." },
      { title: "Activate", body: "Onboarding journeys drive first value fast." },
      { title: "Retain & expand", body: "Lifecycle automation keeps users engaged." },
      { title: "Measure & scale", body: "Clean metrics guide where to invest next." },
    ],
    faqs: [
      { q: "We're pre-product-market fit - can you help?", a: "We focus on efficient experiments and measurement so you learn fast without overspending." },
      { q: "Do you work with product-led growth?", a: "Yes - we build activation and lifecycle systems around your product signals." },
      { q: "Can you integrate with our product data?", a: "Yes - via Custom Automation we connect product events to your growth systems." },
    ],
  },

  agencies: {
    slug: "agencies",
    title: "Agencies",
    eyebrow: "Industry",
    subtitle:
      "Agencies grow by delivering more without hiring more. We provide the automation, systems, and white-label capabilities to scale delivery.",
    metaTitle: "Agency Growth & White-Label Systems",
    metaDescription:
      "White-label automation, CRM, and AI voice systems that help agencies deliver more for clients without adding headcount.",
    challenges: [
      { title: "Delivery bottlenecks", body: "Growth capped by manual delivery work." },
      { title: "Hiring to scale", body: "Margins squeezed by adding headcount." },
      { title: "Inconsistent results", body: "Client outcomes vary by who's delivering." },
      { title: "Capability gaps", body: "Missing AI voice or automation offerings." },
    ],
    solution: {
      title: "Scale delivery and expand your offering - white-labelled.",
      body: "We give agencies the automation, CRM, and AI systems to deliver more per client and add new services under your own brand.",
      points: [
        "White-label automation and AI voice",
        "Repeatable delivery systems",
        "Expanded service offerings",
        "Better margins without more headcount",
      ],
    },
    services: [
      { label: "AI Voice Calling", href: "/business-automation/ai-voice-calling" },
      { label: "Custom Automation", href: "/business-automation/custom-automation" },
      { label: "CRM & Lead Management", href: "/business-automation/crm-lead-management" },
      { label: "Marketing Automation", href: "/digital-marketing/marketing-automation" },
      { label: "Lead Follow-Up Systems", href: "/business-automation/lead-follow-up" },
      { label: "Vistrow Labs", href: "/products/vistrow-labs" },
    ],
    workflow: [
      { title: "Partner & scope", body: "We map your services and delivery gaps." },
      { title: "White-label build", body: "Systems set up under your brand." },
      { title: "Deliver at scale", body: "Automation handles repetitive delivery." },
      { title: "Expand offering", body: "Add AI voice and automation as services." },
    ],
    faqs: [
      { q: "Is this truly white-label?", a: "Yes - systems run under your brand; we operate behind the scenes as your partner." },
      { q: "Can we resell AI voice to clients?", a: "Yes - many agency partners add AI calling and automation as premium services." },
      { q: "How do partnerships work?", a: "Flexible - project, retainer, or ongoing partner arrangements. See our Partners page." },
    ],
  },

  education: {
    slug: "education",
    title: "Education",
    eyebrow: "Industry",
    subtitle:
      "Education runs on enrolment. We build the marketing and applicant follow-up systems that fill programmes and respond to every enquiry in time.",
    metaTitle: "Education Growth Systems",
    metaDescription:
      "Enrolment marketing and applicant follow-up systems for education - capture, nurture, and convert more applicants.",
    challenges: [
      { title: "Enrolment targets", body: "Pressure to fill intakes on a deadline." },
      { title: "Slow applicant response", body: "Enquiries cool before anyone follows up." },
      { title: "Long decision cycles", body: "Applicants need nurturing over time." },
      { title: "Fragmented data", body: "Enquiries scattered across channels and forms." },
    ],
    solution: {
      title: "Fill intakes with timely, nurtured applicant journeys.",
      body: "We generate qualified enquiries and connect them to instant response and nurture - so applicants get answers fast and stay engaged through to enrolment.",
      points: [
        "Enrolment-focused lead generation",
        "Instant response to enquiries",
        "Nurture through the decision cycle",
        "One clean applicant pipeline",
      ],
    },
    services: [
      { label: "Lead Generation", href: "/digital-marketing/lead-generation" },
      { label: "AI Voice Calling", href: "/business-automation/ai-voice-calling" },
      { label: "Marketing Automation", href: "/digital-marketing/marketing-automation" },
      { label: "Lead Follow-Up Systems", href: "/business-automation/lead-follow-up" },
      { label: "Landing Pages & Funnels", href: "/digital-marketing/landing-pages" },
      { label: "CRM & Lead Management", href: "/business-automation/crm-lead-management" },
    ],
    workflow: [
      { title: "Enquiry captured", body: "Prospective applicant expresses interest." },
      { title: "Fast response", body: "Instant reply or AI call answers questions." },
      { title: "Nurtured to apply", body: "Sequences guide them through the decision." },
      { title: "Enrolled", body: "Applicant converts, tracked end to end." },
    ],
    faqs: [
      { q: "Which institutions do you work with?", a: "Colleges, training providers, and course businesses with enrolment targets." },
      { q: "Can you handle high enquiry volume?", a: "Yes - automation and AI voice ensure every enquiry gets a timely response." },
      { q: "Is applicant data handled securely?", a: "Yes - with privacy-compliant handling and one clean, connected pipeline." },
    ],
  },
};
