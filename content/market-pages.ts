import { Hammer, Stethoscope, Wrench } from "lucide-react";
import type { IndustryContent, OverviewContent } from "@/lib/content-types";

// Market versions (United States, United Kingdom) of the industry pages. India stays under /industries.
// Each market page has its own wording, currency and rules rather than a copy with the country swapped, and the
// regional equivalents point at each other with hreflang. We build for these markets; we do not claim local
// offices or clients there. No prices are published: quotes follow a free audit.

export const dentalHreflang = {
  "en-IN": "/industries/clinics",
  "en-US": "/us/dental-clinics",
  "en-GB": "/uk/dental-clinics",
};
export const homeServicesHreflang = {
  "en-IN": "/industries/home-services",
  "en-US": "/us/home-services",
  "en-GB": "/uk/home-services",
};

const sharedServices = [
  { label: "AI Voice Calling", href: "/business-automation/ai-voice-calling" },
  { label: "Lead Follow-Up Systems", href: "/business-automation/lead-follow-up" },
  { label: "WhatsApp, Email & SMS", href: "/business-automation/communication-automation" },
  { label: "CRM & Lead Management", href: "/business-automation/crm-lead-management" },
  { label: "Website Development", href: "/digital-marketing/website-development" },
];

export const usOverview: OverviewContent = {
  eyebrow: "United States",
  title: "AI answering and follow-up for US",
  highlight: "practices and contractors",
  subtitle:
    "Pick up every call, reply to every enquiry in minutes, and follow up until the appointment or job is booked. Built for US dental practices, HVAC and home-service contractors, and roofers.",
  metaTitle: "AI Receptionist and Follow-Up for US Businesses",
  metaDescription:
    "AI call answering, instant replies and follow-up for US dental practices, HVAC and home-service contractors and roofers. Book a free audit.",
  cardsTitle: "Where we start for US businesses",
  cards: [
    { label: "Dental practices", href: "/us/dental-clinics", body: "An AI receptionist that answers, books and reminds when the front desk is busy.", icon: Stethoscope },
    { label: "HVAC and home services", href: "/us/home-services", body: "After-hours answering and quote follow-up for contractors.", icon: Wrench },
    { label: "Roofing", href: "/us/roofing", body: "Websites, roofing leads and follow-up for US roofers.", icon: Hammer },
  ],
  intro: {
    eyebrow: "How it works for US teams",
    title: "The same system, set up for the way US customers search and buy.",
    body: "We set up AI call answering, instant text and email replies and follow-up around your hours and your tools. You decide what the AI can say and book, and your team takes over anything that needs a person.",
    points: [
      "Calls answered when your team is busy or closed",
      "Instant text and email replies to new enquiries",
      "Booking or visit requests passed to your team",
      "Quotes and reminders followed up automatically",
    ],
  },
  process: [
    { title: "Free audit", body: "We review how calls and enquiries are handled today." },
    { title: "Agree the rules", body: "You decide what the AI can say, book and pass to staff." },
    { title: "Go live", body: "Calls and messages start flowing through the system." },
    { title: "Review and improve", body: "We report on calls, bookings and follow-ups." },
  ],
  faqs: [
    { q: "Can you work with a US business?", a: "Yes. We schedule calls in your time zone, quote in writing in US dollars, and agree consent and recording rules with you before launch." },
    { q: "Where is Vistrow based?", a: "Vistrow Technologies is based in Baner, Pune, India. US customers get calls in their own time zone and fixed quotes in US dollars." },
    { q: "How much does it cost?", a: "It depends on call volume, the tools you use and what you add. We quote in writing after a free audit." },
  ],
};

export const ukOverview: OverviewContent = {
  eyebrow: "United Kingdom",
  title: "AI answering and follow-up for UK",
  highlight: "practices and trades",
  subtitle:
    "Pick up every call, reply to every enquiry in minutes, and follow up until the appointment or job is booked. Built for UK dental practices and for heating, plumbing, roofing, solar and renovation firms.",
  metaTitle: "AI Receptionist and Follow-Up for UK Businesses",
  metaDescription:
    "AI call answering, instant replies and follow-up for UK dental practices and for heating, plumbing, roofing and solar firms. Book a free audit.",
  cardsTitle: "Where we start for UK businesses",
  cards: [
    { label: "Dental practices", href: "/uk/dental-clinics", body: "An AI receptionist that answers, books and reminds when reception is busy.", icon: Stethoscope },
    { label: "Heating, roofing and trades", href: "/uk/home-services", body: "After-hours answering and quote follow-up for trades and installers.", icon: Wrench },
  ],
  intro: {
    eyebrow: "How it works for UK teams",
    title: "The same system, set up for UK customers and UK rules.",
    body: "We set up AI call answering, instant text and email replies and follow-up around your hours and your tools. You decide what the AI can say and book, and your team takes over anything that needs a person.",
    points: [
      "Calls answered when your team is busy or closed",
      "Instant text and email replies to new enquiries",
      "Booking or visit requests passed to your team",
      "Quotes and reminders followed up automatically",
    ],
  },
  process: [
    { title: "Free audit", body: "We review how calls and enquiries are handled today." },
    { title: "Agree the rules", body: "You decide what the AI can say, book and pass to staff." },
    { title: "Go live", body: "Calls and messages start flowing through the system." },
    { title: "Review and improve", body: "We report on calls, bookings and follow-ups." },
  ],
  faqs: [
    { q: "Can you work with a UK business?", a: "Yes. We schedule calls in UK hours, quote in writing in pounds sterling, and agree consent and recording rules with you before launch." },
    { q: "Where is Vistrow based?", a: "Vistrow Technologies is based in Baner, Pune, India. UK customers get calls in their own time zone and fixed quotes in pounds sterling." },
    { q: "How much does it cost?", a: "It depends on call volume, the tools you use and what you add. We quote in writing after a free audit." },
  ],
};

export const marketPages: Record<"us" | "uk", Record<string, IndustryContent>> = {
  us: {
    "dental-clinics": {
      slug: "dental-clinics",
      path: "/us/dental-clinics",
      audience: "US dental practices",
      schemaName: "AI receptionist and follow-up for US dental practices",
      hreflang: dentalHreflang,
      title: "AI Receptionist for US Dental Practices",
      eyebrow: "Dental practices · United States",
      subtitle:
        "Your front desk cannot answer every call while checking patients in. Our AI receptionist picks up, books and follows up, so new patient enquiries do not go to the practice down the road.",
      metaTitle: "AI Receptionist for US Dental Practices",
      metaDescription:
        "An AI dental receptionist for US practices: answers calls, books appointments and sends reminders when the front desk is busy. Book a free audit.",
      challenges: [
        { title: "Calls missed at the front desk", body: "Check-ins, insurance questions and patients at the counter mean new patient calls go to voicemail." },
        { title: "Lunchtime and after-hours calls", body: "People call when they are off work, and the office is often closed by then." },
        { title: "No-shows and open chairs", body: "Missed appointments leave gaps that are hard to fill at short notice." },
        { title: "New patient enquiries that stall", body: "A web form or call-back request waits for hours, and the patient books elsewhere." },
      ],
      solution: {
        title: "Pick up every call, book the chair, and follow up until the patient decides.",
        body: "We set up AI call answering and follow-up around your schedule. It answers when the front desk cannot, asks what the patient needs, books or requests an appointment, and hands insurance, clinical or urgent calls to your team. Text and email reminders and follow-ups keep new patients moving.",
        points: [
          "AI call answering for busy periods, lunch hours and after hours",
          "Appointment booking, or a request your front desk confirms",
          "Text and email reminders to reduce no-shows",
          "A clear handoff to staff for clinical, urgent or insurance questions",
        ],
      },
      services: [
        ...sharedServices,
        { label: "Dental practices in the UK", href: "/uk/dental-clinics" },
        { label: "Clinics in India", href: "/industries/clinics" },
      ],
      workflow: [
        { title: "Enquiry arrives", body: "A call, web form or message reaches the practice, day or night." },
        { title: "Answered straight away", body: "The AI picks up, asks what the patient needs and notes the details." },
        { title: "Booked or handed over", body: "An appointment is booked or requested, or a team member takes over." },
        { title: "Reminded and followed up", body: "Reminders and follow-ups go out until the visit happens or the enquiry closes." },
      ],
      faqs: [
        { q: "Can an AI receptionist replace our front desk?", a: "No. It covers the calls your team cannot take, such as during check-in, at lunch and after hours, and passes anything that needs a person to your staff. Your front desk stays in charge." },
        { q: "Does the AI give dental or medical advice?", a: "No. It answers practical questions such as hours, services and booking, and hands clinical, urgent or sensitive calls to your team. You agree what it can and cannot say before it goes live." },
        { q: "Is it HIPAA compliant?", a: "We do not claim HIPAA compliance on this page. What patient information the AI hears or stores depends on how it is set up, so we scope that with your practice and your own compliance adviser before anything goes live." },
        { q: "Can it text patients and record calls?", a: "Texting patients needs their consent, and call recording rules differ by state. We agree the consent wording and what is recorded with you before launch, and you should check the rules for your state with your own adviser." },
        { q: "How is this different from a dental answering service?", a: "A traditional answering service takes messages through people on shift. The AI answers, asks the questions you set, books where it can, keeps a record of every call and passes urgent calls to your team." },
        { q: "Can you also market our dental practice?", a: "Yes. Besides the AI receptionist, we can work as your dental marketing agency: Google Ads, SEO and website work that bring in new patient enquiries, with every enquiry answered and followed up. Quotes are written after a free audit." },
        { q: "How much does it cost?", a: "It depends on call volume, your software and whether you add follow-up. We quote in writing, in US dollars, after a free audit." },
      ],
    },
    "home-services": {
      slug: "home-services",
      path: "/us/home-services",
      audience: "US HVAC and contractor businesses",
      schemaName: "AI answering service and follow-up for US contractors",
      hreflang: homeServicesHreflang,
      title: "AI Answering Service for US HVAC and Contractors",
      eyebrow: "HVAC and home services · United States",
      subtitle:
        "Contractors miss calls while they are on the job. Our AI answers after hours and during busy periods, captures the job details and follows up on quotes, so you book more of the work people already call you for.",
      metaTitle: "AI Answering Service for US HVAC and Contractors",
      metaDescription:
        "An after-hours AI answering service for US HVAC, roofing, solar and plumbing contractors, with instant replies and quote follow-up. Free audit.",
      challenges: [
        { title: "Calls missed on the job", body: "You are on a roof or under a unit when a new customer rings, and they call the next contractor." },
        { title: "Heat waves, cold snaps and storms", body: "Demand arrives in waves, and the phone cannot keep up when it matters most." },
        { title: "Quotes that go quiet", body: "Estimates are sent and never chased, so the job goes to whoever followed up." },
        { title: "Slow replies to web leads", body: "Forms and ads bring leads that wait hours for an answer." },
      ],
      solution: {
        title: "Answer fast, quote clearly, and keep following up.",
        body: "We connect your phone, forms and ads to one follow-up system. New enquiries get an instant reply, the AI captures the job and requests an estimate visit, and quotes are chased until the customer decides.",
        points: [
          "AI call answering for after-hours and busy periods",
          "An instant text or email reply to every new enquiry",
          "Estimate and service visit requests passed to your team",
          "Quote follow-up and review requests after each job",
        ],
      },
      services: [
        ...sharedServices,
        { label: "Websites and follow-up for US roofers", href: "/us/roofing" },
        { label: "Trades and installers in the UK", href: "/uk/home-services" },
      ],
      workflow: [
        { title: "Enquiry arrives", body: "A call, form or message comes in, day or night." },
        { title: "Replied to at once", body: "The customer gets an instant answer and the job details are captured." },
        { title: "Visit requested", body: "An estimate or service visit is booked or requested for your team." },
        { title: "Quote chased", body: "Quotes and follow-ups go out until the job is won or closed, then a review is requested." },
      ],
      faqs: [
        { q: "Do you offer an HVAC answering service or an after-hours answering service for contractors?", a: "Yes. The AI works as an HVAC answering service and for other contractors: it answers after hours and during busy periods, takes the job details, and passes urgent or complicated calls to your team. You choose the rules." },
        { q: "Which trades is this for?", a: "HVAC, roofing, solar, plumbing, electrical, and similar contractors who win work from calls and quotes." },
        { q: "Can the AI give a price?", a: "Only if you set it to. Most contractors prefer it to collect the job details and request a visit, with their team giving the quote." },
        { q: "Can it text customers?", a: "Yes, with their consent. Texting rules matter in the US, so we agree the consent wording with you before launch, and you should confirm the rules with your own adviser." },
        { q: "Can you also bring in leads, not only answer them?", a: "Yes. We can run HVAC marketing and lead generation, roofing leads and solar lead generation campaigns on Google, Meta and your website, and the AI answers and follows up on every lead that arrives. Quotes are written after a free audit." },
        { q: "How much does it cost?", a: "It depends on call volume, the tools you use and what you add. We quote in writing, in US dollars, after a free audit." },
      ],
    },
  },
  uk: {
    "dental-clinics": {
      slug: "dental-clinics",
      path: "/uk/dental-clinics",
      audience: "UK dental practices",
      schemaName: "AI receptionist and follow-up for UK dental practices",
      hreflang: dentalHreflang,
      title: "AI Receptionist for UK Dental Practices",
      eyebrow: "Dental practices · United Kingdom",
      subtitle:
        "Your reception team cannot answer every call while greeting patients. Our AI receptionist picks up, books and follows up for private and mixed dental practices, so new patient enquiries are not lost.",
      metaTitle: "AI Receptionist for UK Dental Practices",
      metaDescription:
        "An AI dental receptionist for UK practices: answers calls, books appointments and follows up on enquiries when reception is busy. Book a free audit.",
      challenges: [
        { title: "Calls missed at reception", body: "Greeting patients, taking payments and phone calls all compete for the same team." },
        { title: "Lunchtime and evening calls", body: "People look for a dentist when they are off work, and the practice is closed by then." },
        { title: "Missed appointments and empty slots", body: "A patient who forgets leaves a gap that is hard to fill at short notice." },
        { title: "New patient enquiries that stall", body: "A web form or call-back request waits for hours, and the patient books elsewhere." },
      ],
      solution: {
        title: "Pick up every call, book the appointment, and follow up until the patient decides.",
        body: "We set up AI call answering and follow-up around your diary. It answers when reception cannot, asks what the patient needs, books or requests an appointment, and hands clinical, urgent or treatment-plan questions to your team. Text and email reminders keep new patients moving.",
        points: [
          "AI call answering for busy periods, lunch hours and after hours",
          "Appointment booking, or a request your reception confirms",
          "Text and email reminders to reduce missed appointments",
          "A clear handoff to staff for clinical, urgent or sensitive questions",
        ],
      },
      services: [
        ...sharedServices,
        { label: "Dental practices in the US", href: "/us/dental-clinics" },
        { label: "Clinics in India", href: "/industries/clinics" },
      ],
      workflow: [
        { title: "Enquiry arrives", body: "A call, web form or message reaches the practice, day or night." },
        { title: "Answered straight away", body: "The AI picks up, asks what the patient needs and notes the details." },
        { title: "Booked or handed over", body: "An appointment is booked or requested, or a team member takes over." },
        { title: "Reminded and followed up", body: "Reminders and follow-ups go out until the visit happens or the enquiry closes." },
      ],
      faqs: [
        { q: "Can an AI receptionist replace our reception team?", a: "No. It covers the calls your team cannot take, such as while greeting patients, at lunch and after hours, and passes anything that needs a person to your staff. Your reception team stays in charge." },
        { q: "Does the AI give dental advice?", a: "No. It answers practical questions such as opening hours, services and booking, and hands clinical, urgent or sensitive calls to your team. You agree what it can and cannot say before it goes live." },
        { q: "What about patient data and GDPR?", a: "Rules on patient data, call recording and marketing messages apply, including UK GDPR and PECR. We agree what the AI records, the consent wording and where data goes with you before launch. We do not claim certifications on this page, and your own data protection lead should review the setup." },
        { q: "Will it understand our patients?", a: "We test the AI on sample calls from your own practice during the audit, in the accents your patients use, before it takes live calls." },
        { q: "How is this different from a dental answering service?", a: "A traditional answering service takes messages through people on shift. The AI answers, asks the questions you set, books where it can, keeps a record of every call and passes urgent calls to your team." },
        { q: "Can you also market our dental practice?", a: "Yes. Besides the AI receptionist, we can work as your dental marketing agency: Google Ads, SEO and website work that bring in new patient enquiries, with every enquiry answered and followed up. Quotes are written after a free audit." },
        { q: "How much does it cost?", a: "It depends on call volume, your software and whether you add follow-up. We quote in writing, in pounds sterling, after a free audit." },
      ],
    },
    "home-services": {
      slug: "home-services",
      path: "/uk/home-services",
      audience: "UK trades and home-service businesses",
      schemaName: "AI answering service and follow-up for UK trades",
      hreflang: homeServicesHreflang,
      title: "AI Answering Service for UK Heating and Trades",
      eyebrow: "Heating and trades · United Kingdom",
      subtitle:
        "Tradespeople miss calls while they are on the job. Our AI answers after hours and during busy periods, captures the job details and chases quotes, for heating, plumbing, roofing, solar and renovation firms.",
      metaTitle: "AI Answering Service for UK Heating and Trades",
      metaDescription:
        "An after-hours AI answering service for UK heating, plumbing, roofing, solar and renovation firms, with instant replies and quote follow-up. Free audit.",
      challenges: [
        { title: "Calls missed on the job", body: "You are under a boiler or up a roof when a new customer rings, and they call the next firm." },
        { title: "Seasonal peaks", body: "Cold snaps, storms and summer installs bring waves of calls that the phone cannot keep up with." },
        { title: "Quotes that go quiet", body: "Quotes are sent and never chased, so the job goes to whoever followed up." },
        { title: "Slow replies to web enquiries", body: "Forms and ads bring enquiries that wait hours for an answer." },
      ],
      solution: {
        title: "Answer fast, quote clearly, and keep following up.",
        body: "We connect your phone, forms and ads to one follow-up system. New enquiries get an instant reply, the AI captures the job and requests a survey or visit, and quotes are chased until the customer decides.",
        points: [
          "AI call answering for after-hours and busy periods",
          "An instant text or email reply to every new enquiry",
          "Survey and site visit requests passed to your team",
          "Quote follow-up and review requests after each job",
        ],
      },
      services: [
        ...sharedServices,
        { label: "Contractors in the US", href: "/us/home-services" },
        { label: "Home services in India", href: "/industries/home-services" },
      ],
      workflow: [
        { title: "Enquiry arrives", body: "A call, form or message comes in, day or night." },
        { title: "Replied to at once", body: "The customer gets an instant answer and the job details are captured." },
        { title: "Visit requested", body: "A survey or site visit is booked or requested for your team." },
        { title: "Quote chased", body: "Quotes and follow-ups go out until the job is won or closed, then a review is requested." },
      ],
      faqs: [
        { q: "Do you offer an after-hours answering service for trades?", a: "Yes. The AI answers after hours and during busy periods, takes the job details, and passes urgent or complicated calls to your team. You choose the rules." },
        { q: "Which trades is this for?", a: "Heating engineers, plumbers, roofers, solar installers, electricians, and kitchen and bathroom fitters, plus similar firms that win work from calls and quotes." },
        { q: "Can the AI give a price?", a: "Only if you set it to. Most firms prefer it to collect the job details and request a survey, with their team giving the quote." },
        { q: "Can it text customers?", a: "Yes, with their consent. Marketing and text rules matter in the UK, including PECR, so we agree the consent wording with you before launch and you should confirm the rules with your own adviser." },
        { q: "Can you also bring in leads, not only answer them?", a: "Yes. We can run solar lead generation and roofing lead campaigns, and marketing for heating and renovation firms, on Google, Meta and your website, and the AI answers and follows up on every enquiry that arrives. Quotes are written after a free audit." },
        { q: "How much does it cost?", a: "It depends on call volume, the tools you use and what you add. We quote in writing, in pounds sterling, after a free audit." },
      ],
    },
  },
};
