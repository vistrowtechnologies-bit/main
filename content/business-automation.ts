import { Database, PhoneCall, Zap, MessageSquare, Repeat, Wrench, Languages, PhoneIncoming, PhoneOutgoing, Globe, BookOpen, Webhook } from "lucide-react";
import type { ServiceContent, OverviewContent } from "@/lib/content-types";
import { PAGE_IMAGES } from "@/lib/page-images";

export const businessAutomationOverview: OverviewContent = {
  eyebrow: "AI Automation Agency",
  title: "AI automation agency for",
  highlight: "Indian businesses",
  subtitle:
    "Vistrow builds AI voice agents, CRM automation, WhatsApp follow-up and custom workflows for businesses across India, from our office in Pune. They respond in seconds and convert more of the demand you already create, without adding headcount.",
  metaTitle: "AI Automation Agency in India: AI Voice, CRM and WhatsApp",
  metaDescription:
    "AI automation agency in India building AI voice agents, CRM automation, WhatsApp follow-up and custom workflows. Based in Pune. Get a free Growth Audit.",
  cardsTitle: "AI automation services",
  cards: [
    { label: "CRM & Lead Management", href: "/business-automation/crm-lead-management", body: "One source of truth for every lead and deal.", icon: Database },
    { label: "AI Voice Calling", href: "/business-automation/ai-voice-calling", body: "Respond and qualify by phone in seconds, 24/7.", icon: PhoneCall },
    { label: "Sales Automation", href: "/business-automation/sales-automation", body: "Remove manual work from your sales process.", icon: Zap },
    { label: "WhatsApp, Email & SMS", href: "/business-automation/communication-automation", body: "Multi-channel follow-up that reaches people where they are.", icon: MessageSquare },
    { label: "Lead Follow-Up Systems", href: "/business-automation/lead-follow-up", body: "Never drop a lead - automated, persistent follow-up.", icon: Repeat },
    { label: "Custom Automation", href: "/business-automation/custom-automation", body: "Workflows built around how your business actually runs.", icon: Wrench },
  ],
  intro: {
    eyebrow: "Not just an integrator",
    title: "We build and run our own AI products.",
    body:
      "Vistrow Voice (AI voice calling in 11 languages, including Hindi and English) and ArthaLeads (AI lead scoring and follow-up for real estate) are products we built and operate. When we automate your process, we bring what we've learned running them: how Indian callers respond, how WhatsApp templates get approved, and how messy CRM data really is. We map your real process first, then connect CRM, voice, messaging, calendars and reporting around it.",
    image: PAGE_IMAGES.businessAutomation,
    points: [
      "AI voice agents that call in Hindi, Hinglish and other Indian languages",
      "AI lead scoring and WhatsApp follow-up drafted for each lead",
      "CRM, calendars and messaging connected around your real process",
      "Human handoff wherever a conversation needs a person",
    ],
  },
  process: [
    { title: "Map the workflow", body: "Document what happens today, who owns each step, and where work stalls." },
    { title: "Set the rules", body: "Define triggers, qualification logic, routing, timing, and human handoffs." },
    { title: "Connect the stack", body: "Integrate CRM, voice, messaging, calendars, forms, and reporting." },
    { title: "Monitor and refine", body: "Review exceptions and outcomes, then improve the automation over time." },
  ],
  faqs: [
    { q: "What does an AI automation agency do?", a: "It sets up AI and automation to handle the repetitive work in your sales and support process: answering and qualifying calls, sending follow-ups, routing leads, updating the CRM and reporting. Vistrow designs the process, builds it, connects it to the tools you already use and keeps people in charge of the decisions that need judgement." },
    { q: "Do you work with businesses outside Pune?", a: "Yes. We're based in Baner, Pune, and set up AI automation for businesses across India, mostly online, with in-person workshops in Pune when useful." },
    { q: "Do we need to replace our current CRM?", a: "Usually not. We first assess whether your existing CRM can support the process, then improve or replace only what is genuinely holding the team back." },
    { q: "Will customers know they are interacting with automation?", a: "We design clear, helpful interactions and use human handoff wherever judgement or a personal conversation is more appropriate." },
    { q: "Can you automate a process unique to our business?", a: "Yes. Custom Automation starts from your actual workflow rather than forcing your team into a generic template." },
  ],
};

export const businessAutomationServices: Record<string, ServiceContent> = {
  "crm-lead-management": {
    slug: "crm-lead-management",
    image: { src: "/images/services/svc-crm-lead-management.webp", alt: "Real estate sales manager walking telecallers through the ArthaLeads lead pipeline on a wall screen" },
    title: "CRM & Lead Management",
    eyebrow: "AI Automation",
    subtitle:
      "One clean, connected source of truth for every lead and deal - set up, integrated, and automated around your sales process.",
    metaTitle: "CRM Implementation and Lead Management",
    metaDescription:
      "CRM setup, cleanup, and automation - lead capture, scoring, routing, and pipeline visibility connected to your marketing.",
    problem: {
      title: "A messy CRM costs you deals you never see.",
      body: "When data is scattered and stale, leads fall through the cracks and reporting can't be trusted. The CRM should make selling easier, not harder.",
      points: [
        "Leads spread across inboxes and spreadsheets",
        "No consistent pipeline or stages",
        "Manual data entry eating selling time",
        "Reporting nobody trusts",
      ],
    },
    outcomes: [
      { stat: "One", label: "Source of truth", body: "Every lead and deal in one connected system." },
      { stat: "Less", label: "Manual entry", body: "Automation captures and updates records." },
      { stat: "Clear", label: "Pipeline visibility", body: "Know exactly where every deal stands." },
    ],
    included: [
      "CRM selection and setup",
      "Data cleanup and migration",
      "Pipeline and stage design",
      "Lead capture and routing",
      "Lead scoring rules",
      "Automation of manual tasks",
      "Reporting and dashboards",
      "Team training and handover",
    ],
    steps: [
      { title: "Audit", body: "Review your data, process, and current tools." },
      { title: "Plan", body: "Design pipeline, fields, and automations." },
      { title: "Build", body: "Set up, migrate, and connect the CRM." },
      { title: "Improve", body: "Refine as your process evolves." },
    ],
    tools: ["HubSpot", "Pipedrive", "Zoho", "Salesforce", "Zapier", "Make", "Twilio"],
    faqs: [
      { q: "Which CRM do you recommend?", a: "It depends on your size, process, and budget. We're platform-agnostic and recommend what fits - commonly HubSpot or Pipedrive for growing teams." },
      { q: "Can you clean up our existing CRM?", a: "Yes - cleanup, deduplication, and restructuring is often the fastest way to get more value from what you already have." },
      { q: "Will this connect to our marketing?", a: "That's the point. We connect lead capture, scoring, and follow-up so marketing and sales share one system." },
    ],
  },

  "ai-voice-calling": {
    slug: "ai-voice-calling",
    image: { src: "/images/services/svc-ai-voice-calling.webp", alt: "Telecaller in Pune with a headset mid-conversation while an example Vistrow Voice AI call transcript runs on her laptop" },
    title: "AI Voice Calling",
    heroTitle: "Multilingual AI voice assistant for",
    highlight: "Indian businesses",
    eyebrow: "AI Automation",
    subtitle:
      "Vistrow Voice is a multilingual AI voice assistant and AI calling software that handles inbound, outbound and website calls in 11 languages - Hindi, English and 9 more Indian languages, including natural Hinglish - answering questions, qualifying intent, booking next steps and pushing outcomes into your workflow 24/7.",
    metaTitle: "Multilingual AI Voice Assistant & Calling Software",
    metaDescription:
      "Multilingual AI voice assistant and AI calling software for Indian businesses: inbound, outbound and website calls in 11 languages, with CRM webhooks.",
    problem: {
      title: "Every unanswered or delayed call creates avoidable leakage.",
      body: "Teams cannot answer every enquiry, reminder, support question, or follow-up at the right moment. Vistrow Voice adds always-on coverage while keeping the rules, knowledge, and handoffs under your control.",
      points: [
        "Inbound calls missed after hours or during peaks",
        "New enquiries waiting too long for qualification",
        "Manual reminders and follow-up campaigns",
        "Customer questions repeated across phone and website",
      ],
    },
    features: [
      { icon: Languages, title: "11 languages", body: "Callers speak Hindi, English, Hinglish or one of 9 more Indian languages, and the agent replies in the same language, even switching mid-sentence." },
      { icon: PhoneIncoming, title: "Inbound calls, 24/7", body: "Answers, qualifies and routes or books the next step, including nights, weekends and peak hours." },
      { icon: PhoneOutgoing, title: "Outbound campaigns", body: "Reminders, follow-ups and collections called at scale, with outcomes logged for every call." },
      { icon: Globe, title: "Website voice widget", body: "Visitors talk to the agent in the browser without sharing a phone number." },
      { icon: BookOpen, title: "Grounded in your documents", body: "Answers come from the PDFs and documents you upload, so replies stay on your facts." },
      { icon: Webhook, title: "CRM handoff", body: "Leads, outcomes and transcripts are pushed to your CRM through webhooks, with escalation to a person when needed." },
    ],
    outcomes: [
      { stat: "11", label: "Languages", body: "Serve customers in Hindi, English and 9 more Indian languages." },
      { stat: "24/7", label: "Coverage", body: "Nights, weekends, and peak volume handled." },
      { stat: "3", label: "Calling channels", body: "Inbound phone, outbound campaigns, and a website call widget." },
    ],
    included: [
      "No-code voice agent configuration",
      "Persona, prompt, voice, and language setup",
      "Inbound number connection",
      "Outbound campaign workflow",
      "Website call widget",
      "PDF and document knowledge base",
      "CRM webhook integration",
      "Call history and analytics",
    ],
    steps: [
      { title: "Choose the call flow", body: "Define inbound, outbound, or web calling and the outcome each conversation should reach." },
      { title: "Train the agent", body: "Configure persona, language, business rules, and a knowledge base from your documents." },
      { title: "Connect and launch", body: "Attach the number or widget, then connect webhook outcomes to CRM and workflows." },
      { title: "Review and refine", body: "Use call history and analytics to improve prompts, knowledge, routing, and handoffs." },
    ],
    tools: ["Vistrow Voice", "Phone numbers", "Website call widget", "CRM webhooks", "PDF knowledge base", "Custom workflows"],
    faqs: [
      { q: "What is a multilingual AI voice assistant?", a: "It is an AI agent that talks to callers by voice in more than one language. Vistrow Voice answers and makes calls in 11 languages, including Hindi, English and natural Hinglish, so customers can speak the way they normally do while the agent answers questions, qualifies the enquiry and books the next step." },
      { q: "Is Vistrow Voice AI calling software or a service?", a: "Both. Vistrow Voice is the AI calling software, with a no-code agent builder you can run yourself. Vistrow can also set it up for you as a service: call flows, knowledge base, CRM connection and ongoing tuning." },
      { q: "Can it call and qualify real estate leads?", a: "Yes. It can call new enquiries from your ads and portals, ask your qualification questions, book site visits and pass the lead to your sales team with a transcript. It works alongside a CRM such as ArthaLeads." },
      { q: "Which languages does Vistrow Voice support?", a: "The current platform supports 11 languages: Hindi, English and 9 more Indian languages, with natural Hinglish and mid-sentence language switching. Confirm the exact language and voice fit during your product test." },
      { q: "Can it handle inbound and outbound calls?", a: "Yes. Vistrow Voice supports inbound calling, outbound campaigns, and a browser-based website call widget." },
      { q: "How does it answer business-specific questions?", a: "You can upload PDFs and documents to create a retrieval-grounded knowledge base, then configure the agent's persona, prompt, language, and rules." },
      { q: "Can it connect to our CRM?", a: "Yes. Lead details, outcomes, and transcripts can be pushed to your CRM or workflow through webhooks." },
    ],
  },

  "sales-automation": {
    slug: "sales-automation",
    image: { src: "/images/services/svc-sales-automation.webp", alt: "Field sales executive walking out of a Pune project site office, checking his next follow-up on his phone" },
    title: "Sales Automation",
    eyebrow: "AI Automation",
    subtitle:
      "Take the manual, repetitive work out of selling - so your team spends time on conversations, not admin.",
    metaTitle: "Sales Automation Services",
    metaDescription:
      "Automate repetitive sales tasks - data entry, reminders, sequences, and handoffs - so reps focus on closing.",
    problem: {
      title: "Reps sell less when they're doing admin.",
      body: "Manual updates, reminders, and copy-paste tasks eat the hours that should go into conversations and closing.",
      points: [
        "Time lost to data entry and updates",
        "Follow-ups forgotten or delayed",
        "Inconsistent sales process",
        "No visibility into rep activity",
      ],
    },
    outcomes: [
      { stat: "More", label: "Selling time", body: "Automation handles the repetitive admin." },
      { stat: "Consistent", label: "Sales process", body: "Every deal follows the right steps." },
      { stat: "Faster", label: "Deal velocity", body: "Fewer stalls, quicker follow-through." },
    ],
    included: [
      "Sales process mapping",
      "Task and reminder automation",
      "Sequence and cadence setup",
      "Auto data entry and enrichment",
      "Deal-stage automations",
      "Handoff and routing rules",
      "Activity reporting",
      "Team enablement",
    ],
    steps: [
      { title: "Audit", body: "Map the sales process and manual bottlenecks." },
      { title: "Plan", body: "Decide what to automate and how." },
      { title: "Build", body: "Implement automations in your CRM and tools." },
      { title: "Improve", body: "Refine based on team feedback and results." },
    ],
    tools: ["HubSpot", "Pipedrive", "Salesloft", "Apollo", "Zapier", "Make"],
    faqs: [
      { q: "Will this replace our sales team?", a: "No - it removes admin so your team can do more of what only people do well: build relationships and close." },
      { q: "Does it work with our current process?", a: "We automate around your process, not a generic template - starting from how your team already sells." },
      { q: "How much time can we save?", a: "It varies, but reclaiming several hours per rep per week is common once repetitive tasks are automated." },
    ],
  },

  "communication-automation": {
    slug: "communication-automation",
    image: { src: "/images/services/svc-communication-automation.webp", alt: "Furniture showroom owner in Pune serving a customer while an automated WhatsApp reply goes to a new enquiry on his phone" },
    title: "WhatsApp, Email & SMS Automation",
    eyebrow: "AI Automation",
    subtitle:
      "Reach leads and customers where they actually reply - coordinated across WhatsApp, email, and SMS, triggered by behaviour.",
    metaTitle: "WhatsApp, Email and SMS Automation",
    metaDescription:
      "Multi-channel communication automation across WhatsApp, email, and SMS - coordinated, behaviour-triggered follow-up.",
    problem: {
      title: "One channel isn't enough anymore.",
      body: "People respond on different channels at different times. Single-channel, manual outreach misses most of them.",
      points: [
        "Follow-up limited to one channel",
        "Manual messaging that doesn't scale",
        "No coordination across channels",
        "Messages sent at the wrong time",
      ],
    },
    outcomes: [
      { stat: "Higher", label: "Response rate", body: "Reach people on the channel they prefer." },
      { stat: "Coordinated", label: "Across channels", body: "No duplicate or conflicting messages." },
      { stat: "Timely", label: "Triggered sends", body: "Messages fire on behaviour, not guesswork." },
    ],
    included: [
      "Channel strategy and setup",
      "WhatsApp Business API integration",
      "Email and SMS sequences",
      "Behaviour-based triggers",
      "Unified conversation view",
      "Opt-in and compliance handling",
      "Templates and personalisation",
      "Reporting across channels",
    ],
    steps: [
      { title: "Audit", body: "Review current channels and messaging." },
      { title: "Plan", body: "Design coordinated, triggered journeys." },
      { title: "Build", body: "Connect channels and launch automations." },
      { title: "Improve", body: "Optimise timing, channel, and message." },
    ],
    tools: ["WhatsApp Business API", "Twilio", "Customer.io", "Klaviyo", "HubSpot", "Zapier"],
    faqs: [
      { q: "Do you have a WhatsApp CRM for real estate teams?", a: "Yes. ArthaLeads, the AI-powered real estate CRM we build, includes a WhatsApp CRM on the official WhatsApp Business Platform: one shared team inbox, every chat saved as a lead, and a WhatsApp AI agent that replies to buyers 24/7 in English, Hinglish, Hindi or Marathi. See arthaleads.com/whatsapp-crm." },
      { q: "Is WhatsApp automation compliant?", a: "Yes - we use the official WhatsApp Business API with proper opt-in and approved templates." },
      { q: "How do you avoid spamming people?", a: "Behaviour triggers, frequency caps, and clear opt-outs keep messaging relevant and respectful." },
      { q: "Can it all run from one place?", a: "Yes - channels connect to your CRM so conversations and history live in one system." },
    ],
  },

  "lead-follow-up": {
    slug: "lead-follow-up",
    image: { src: "/images/services/svc-lead-follow-up.webp", alt: "Telecaller ticking off a follow-up list beside the ArthaLeads dashboard showing overdue follow-ups and hot leads" },
    title: "Lead Follow-Up Systems",
    eyebrow: "AI Automation",
    subtitle:
      "Persistent, automated follow-up that keeps working every lead until they respond, book, or opt out - so nothing slips.",
    metaTitle: "Automated Lead Follow-Up Systems",
    metaDescription:
      "Automated, persistent lead follow-up across channels - so every lead is worked until it converts or opts out.",
    problem: {
      title: "Most leads are lost to weak follow-up.",
      body: "A single email or one missed call is where the majority of pipeline quietly disappears. Consistent follow-up is the difference.",
      points: [
        "Follow-up stops after one or two tries",
        "No system for persistence",
        "Leads forgotten as volume grows",
        "Inconsistent messaging and timing",
      ],
    },
    outcomes: [
      { stat: "Zero", label: "Leads dropped", body: "Every lead worked until resolved." },
      { stat: "More", label: "Booked meetings", body: "Persistence turns cold leads warm." },
      { stat: "Automatic", label: "Multi-touch", body: "Sequences run without manual effort." },
    ],
    included: [
      "Follow-up sequence design",
      "Multi-channel cadences",
      "Speed-to-lead automation",
      "Reminders and escalation",
      "Opt-out and compliance",
      "CRM logging",
      "Re-engagement campaigns",
      "Reporting on outcomes",
    ],
    steps: [
      { title: "Audit", body: "Find where leads currently go cold." },
      { title: "Plan", body: "Design cadences by channel and intent." },
      { title: "Build", body: "Automate persistent, coordinated follow-up." },
      { title: "Improve", body: "Tune cadence and messaging on results." },
    ],
    tools: ["HubSpot", "ActiveCampaign", "Twilio", "WhatsApp API", "Vistrow Voice", "Zapier"],
    faqs: [
      { q: "How persistent is too persistent?", a: "We design respectful cadences with clear opt-outs - persistent enough to convert, never enough to annoy." },
      { q: "Which channels do you use?", a: "Whatever your leads respond to - typically a mix of call, SMS, WhatsApp, and email." },
      { q: "Can this include AI calling?", a: "Yes - AI voice can handle the first touch and re-engagement within the same follow-up system." },
    ],
  },

  "custom-automation": {
    slug: "custom-automation",
    image: { src: "/images/services/svc-custom-automation.webp", alt: "Operations team mapping a workflow on a whiteboard beside an iMac showing an example order-desk automation" },
    title: "Custom Automation",
    eyebrow: "AI Automation",
    subtitle:
      "When off-the-shelf tools don't fit, we build the workflows and integrations that match how your business actually runs.",
    metaTitle: "Custom Business Automation Services",
    metaDescription:
      "Custom business automation and integrations - connecting your tools and building workflows around your real process.",
    problem: {
      title: "Your process is unique. Your tools should fit it.",
      body: "Forcing your business into rigid software creates workarounds and manual glue work. Custom automation removes the friction.",
      points: [
        "Tools that don't talk to each other",
        "Manual glue work between systems",
        "Processes that don't fit standard software",
        "Data re-entered across platforms",
      ],
    },
    outcomes: [
      { stat: "Connected", label: "Tools & data", body: "Systems that share data automatically." },
      { stat: "Less", label: "Manual work", body: "Repetitive tasks handled end to end." },
      { stat: "Tailored", label: "To your process", body: "Automation shaped around how you work." },
    ],
    included: [
      "Process discovery and mapping",
      "Integration between tools",
      "Custom workflow automation",
      "API and webhook work",
      "Data sync and enrichment",
      "Internal tooling where needed",
      "Documentation and handover",
      "Ongoing support",
    ],
    steps: [
      { title: "Audit", body: "Map your process, tools, and pain points." },
      { title: "Plan", body: "Design the workflows and integrations." },
      { title: "Build", body: "Implement and test the automation." },
      { title: "Improve", body: "Extend and maintain as you scale." },
    ],
    tools: ["Zapier", "Make", "n8n", "Custom APIs", "Webhooks", "Airtable", "Retool"],
    faqs: [
      { q: "How custom can you get?", a: "From simple tool-to-tool integrations to bespoke internal apps - we scope to your needs and budget." },
      { q: "Will it be maintainable?", a: "Yes - we document everything and favour maintainable, well-supported platforms over fragile hacks." },
      { q: "When should we choose custom over off-the-shelf?", a: "When standard tools force costly workarounds. We'll tell you honestly when off-the-shelf is the better call." },
    ],
  },
};
