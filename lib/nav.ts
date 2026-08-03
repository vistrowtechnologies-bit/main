export type NavChild = { label: string; href: string; desc?: string };
export type NavGroup = { title: string; items: NavChild[] };
export type NavLinkRow = { label: string; cta: string; href: string };
export type NavItem = {
  label: string;
  href: string;
  children?: NavChild[];
  groups?: NavGroup[];
  /** Extra compact link rows shown under a grouped mega-menu (e.g. "Browse by industry"). */
  linkRows?: NavLinkRow[];
  /** Extra path prefixes that should also mark this item active (defaults to [href]). */
  activeMatch?: string[];
};

export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    activeMatch: ["/services", "/digital-marketing", "/business-automation"],
    linkRows: [
      { label: "Browse services by industry", cta: "Explore Industries", href: "/industries" },
      { label: "Not sure where to start?", cta: "Request a Growth Audit", href: "/growth-audit" },
    ],
    groups: [
      {
        title: "Marketing",
        items: [
          { label: "Performance Advertising", href: "/digital-marketing/performance-advertising" },
          { label: "Lead Generation", href: "/digital-marketing/lead-generation" },
          { label: "Website Development", href: "/digital-marketing/website-development" },
          { label: "Landing Pages & Funnels", href: "/digital-marketing/landing-pages" },
          { label: "Creative Strategy", href: "/digital-marketing/creative-strategy" },
          { label: "Social Media Marketing", href: "/digital-marketing/social-media" },
          { label: "SEO & Content", href: "/digital-marketing/seo-content" },
          { label: "Conversion Tracking", href: "/digital-marketing/conversion-tracking" },
          { label: "Marketing Automation", href: "/digital-marketing/marketing-automation" },
        ],
      },
      {
        title: "Automation",
        items: [
          { label: "CRM & Lead Management", href: "/business-automation/crm-lead-management" },
          { label: "AI Voice Calling", href: "/business-automation/ai-voice-calling" },
          { label: "Sales Automation", href: "/business-automation/sales-automation" },
          { label: "WhatsApp, Email & SMS", href: "/business-automation/communication-automation" },
          { label: "Lead Follow-Up Systems", href: "/business-automation/lead-follow-up" },
          { label: "Custom Automation", href: "/business-automation/custom-automation" },
        ],
      },
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
    label: "Customers",
    href: "/work",
    children: [
      { label: "Case Studies", href: "/work/case-studies" },
      { label: "Campaign Portfolio", href: "/work/campaign-portfolio" },
      { label: "Product Work", href: "/work/product-work" },
      { label: "Client Results", href: "/work/client-results" },
    ],
  },
  {
    label: "About Us",
    href: "/about",
    activeMatch: ["/about", "/approach", "/careers", "/partners", "/contact", "/blog"],
    children: [
      { label: "About Vistrow", href: "/about" },
      { label: "Our Approach", href: "/approach" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
      { label: "Partners", href: "/partners" },
      { label: "Contact", href: "/contact" },
    ],
  },
];
