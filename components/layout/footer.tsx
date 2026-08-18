import Link from "next/link";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
} from "lucide-react";
import { Wordmark } from "@/components/ui/wordmark";
import { socialProfiles } from "@/lib/social-links";

type FooterLink = { label: string; href: string; external?: boolean };
type FooterColumn = { title: string; links: FooterLink[] };

const columns: FooterColumn[] = [
  {
    title: "Digital Marketing",
    links: [
      { label: "All Digital Marketing", href: "/digital-marketing" },
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
    title: "Business Automation",
    links: [
      { label: "All Business Automation", href: "/business-automation" },
      { label: "CRM & Lead Management", href: "/business-automation/crm-lead-management" },
      { label: "AI Voice Calling", href: "/business-automation/ai-voice-calling" },
      { label: "Sales Automation", href: "/business-automation/sales-automation" },
      { label: "WhatsApp, Email & SMS", href: "/business-automation/communication-automation" },
      { label: "Lead Follow-Up Systems", href: "/business-automation/lead-follow-up" },
      { label: "Custom Automation", href: "/business-automation/custom-automation" },
    ],
  },
  {
    title: "Products",
    links: [
      { label: "All Products", href: "/products" },
      { label: "Vistrow Voice", href: "https://www.vistrowvoice.com/", external: true },
      { label: "ArthaLeads", href: "https://www.arthaleads.com/", external: true },
      { label: "Vistrow Labs", href: "/products/vistrow-labs" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "All Industries", href: "/industries" },
      { label: "Real Estate", href: "/industries/real-estate" },
      { label: "Local Businesses", href: "/industries/local-businesses" },
      { label: "B2B Companies", href: "/industries/b2b-companies" },
      { label: "Startups & SaaS", href: "/industries/startups-saas" },
      { label: "Agencies", href: "/industries/agencies" },
      { label: "Education", href: "/industries/education" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "About", href: "/about" },
      { label: "Our Approach", href: "/approach" },
      { label: "Work", href: "/work" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
      { label: "Partners", href: "/partners" },
      { label: "Contact", href: "/contact" },
      { label: "Book a Growth Audit", href: "/growth-audit" },
    ],
  },
];

const legal = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Disclaimer", href: "/disclaimer" },
];

export function Footer() {
  const socialIcons = { Instagram, Facebook, LinkedIn: Linkedin };
  const socialLinks = [
    ...socialProfiles.map((profile) => ({
      icon: socialIcons[profile.platform],
      label: profile.label,
      href: profile.href,
    })),
    { icon: Mail, label: "Email Vistrow", href: "mailto:hello@vistrow.com" },
  ];

  return (
    <footer className="border-t border-line bg-surface">
      <div className="container-edge py-16">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-3 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1fr_1fr]">
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Wordmark />
            <p className="mt-5 max-w-xs font-sans text-sm leading-relaxed text-muted">
              Digital marketing connected to the CRM, automation, and AI systems that
              turn opportunities into revenue.
            </p>
            <div className="mt-6">
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                Follow Vistrow
              </p>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {socialLinks.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    aria-label={label}
                    title={label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-line text-ink-2 transition-colors hover:border-accent hover:bg-accent/10 hover:text-ink"
                  >
                    <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="font-sans text-sm font-semibold text-ink">{col.title}</h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) =>
                  link.external ? (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center font-sans text-sm text-muted transition-colors hover:text-accent-strong"
                      >
                        {link.label}
                      </a>
                    </li>
                  ) : (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="inline-flex min-h-11 items-center font-sans text-sm text-muted transition-colors hover:text-accent-strong"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-line pt-8 md:flex-row md:items-center">
          <p className="font-sans text-[13px] text-muted">
            © {new Date().getFullYear()} Vistrow Technologies. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legal.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-11 items-center font-sans text-[13px] text-muted transition-colors hover:text-accent-strong"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
