export type NavChild = { label: string; href: string; desc?: string };
export type NavItem = {
  label: string;
  href: string;
  children?: NavChild[];
};

export const primaryNav: NavItem[] = [
  {
    label: "Digital Marketing",
    href: "/digital-marketing",
    children: [
      { label: "Performance Advertising", href: "/digital-marketing/performance-advertising", desc: "ROI-focused paid media" },
      { label: "Lead Generation", href: "/digital-marketing/lead-generation", desc: "High-intent pipeline" },
      { label: "Landing Pages & Funnels", href: "/digital-marketing/landing-pages", desc: "Built to convert" },
      { label: "Creative Strategy", href: "/digital-marketing/creative-strategy", desc: "Message that lands" },
      { label: "Social Media Marketing", href: "/digital-marketing/social-media", desc: "Demand across channels" },
      { label: "SEO & Content", href: "/digital-marketing/seo-content", desc: "Compounding organic reach" },
      { label: "Conversion Tracking", href: "/digital-marketing/conversion-tracking", desc: "Marketing tied to revenue" },
      { label: "Marketing Automation", href: "/digital-marketing/marketing-automation", desc: "Scale what works" },
    ],
  },
  {
    label: "Business Automation",
    href: "/business-automation",
    children: [
      { label: "CRM & Lead Management", href: "/business-automation/crm-lead-management", desc: "One source of truth" },
      { label: "AI Voice Calling", href: "/business-automation/ai-voice-calling", desc: "Respond in seconds" },
      { label: "Sales Automation", href: "/business-automation/sales-automation", desc: "Less manual work" },
      { label: "WhatsApp, Email & SMS", href: "/business-automation/communication-automation", desc: "Multi-channel follow-up" },
      { label: "Lead Follow-Up Systems", href: "/business-automation/lead-follow-up", desc: "Never drop a lead" },
      { label: "Custom Automation", href: "/business-automation/custom-automation", desc: "Built for your process" },
    ],
  },
  {
    label: "Products",
    href: "/products",
    children: [
      { label: "Vistrow Voice", href: "/products/vistrow-voice", desc: "AI voice responder" },
      { label: "ArthaLeads", href: "/products/arthaleads", desc: "Lead generation engine" },
      { label: "Vistrow Labs", href: "/products/vistrow-labs", desc: "Custom SaaS & tools" },
    ],
  },
  {
    label: "Industries",
    href: "/industries",
    children: [
      { label: "Real Estate", href: "/industries/real-estate" },
      { label: "Local Businesses", href: "/industries/local-businesses" },
      { label: "B2B Companies", href: "/industries/b2b-companies" },
      { label: "Startups & SaaS", href: "/industries/startups-saas" },
      { label: "Agencies", href: "/industries/agencies" },
      { label: "Education", href: "/industries/education" },
    ],
  },
  {
    label: "Work",
    href: "/work",
    children: [
      { label: "Case Studies", href: "/work/case-studies" },
      { label: "Campaign Portfolio", href: "/work/campaign-portfolio" },
      { label: "Product Work", href: "/work/product-work" },
      { label: "Client Results", href: "/work/client-results" },
    ],
  },
  {
    label: "Company",
    href: "/about",
    children: [
      { label: "About Vistrow", href: "/about" },
      { label: "Our Approach", href: "/approach" },
      { label: "Careers", href: "/careers" },
      { label: "Partners", href: "/partners" },
      { label: "Contact", href: "/contact" },
    ],
  },
];
