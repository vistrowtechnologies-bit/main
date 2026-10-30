import { FooterTagline } from "@/components/layout/footer-tagline";
import Link from "next/link";
import { ArrowRight, Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { CookieSettingsButton } from "@/components/analytics/cookie-banner";
import { WhatsappIcon } from "@/components/icons/whatsapp-icon";
import { Wordmark } from "@/components/ui/wordmark";
import { socialProfiles } from "@/lib/social-links";
import { businessPhone } from "@/lib/structured-data";

type FooterLink = { label: string; href: string };
type FooterColumn = { title: string; links: FooterLink[] };

const columns: FooterColumn[] = [
  { title: "Services", links: [
    { label: "AI Voice Calling", href: "/business-automation/ai-voice-calling" },
    { label: "CRM & Lead Management", href: "/business-automation/crm-lead-management" },
    { label: "Performance Advertising", href: "/digital-marketing/performance-advertising" },
    { label: "Website Development", href: "/digital-marketing/website-development" },
    { label: "SEO & Content", href: "/digital-marketing/seo-content" },
    { label: "Explore all services", href: "/services" },
  ] },
  { title: "Products", links: [
    { label: "Vistrow Voice", href: "/products/vistrow-voice" },
    { label: "ArthaLeads", href: "/products/arthaleads" },
    { label: "Vistrow Labs", href: "/products/vistrow-labs" },
    { label: "Explore all products", href: "/products" },
  ] },
  { title: "Resources", links: [
    { label: "Our Work", href: "/work" },
    { label: "Website Portfolio", href: "/work/website-portfolio" },
    { label: "Blog", href: "/blog" },
    { label: "100 Din Playbook", href: "/playbook" },
    { label: "Industries", href: "/industries" },
    { label: "For US businesses", href: "/us" },
    { label: "For UK businesses", href: "/uk" },
  ] },
  { title: "Company", links: [
    { label: "About Vistrow", href: "/about" },
    { label: "Our Approach", href: "/approach" },
    { label: "Careers", href: "/careers" },
    { label: "Partners", href: "/partners" },
    { label: "Contact", href: "/contact" },
  ] },
];

const legal: FooterLink[] = [
  { label: "Privacy", href: "/privacy-policy" },
  { label: "Terms", href: "/terms" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Disclaimer", href: "/disclaimer" },
];

export function Footer() {
  const socialIcons = { WhatsApp: WhatsappIcon, Instagram, Facebook, LinkedIn: Linkedin };
  const socialLinks = [
    ...socialProfiles.map((profile) => ({ icon: socialIcons[profile.platform], label: profile.label, href: profile.href })),
    { icon: Mail, label: "Email Vistrow", href: "mailto:hello@vistrow.com" },
  ];

  return (
    <footer className="border-t border-line bg-surface">
      <div className="container-edge pb-8 pt-10 sm:pt-14">
        {/* Hidden on pages that already end with a CtaBand, so the call to action never appears twice in a row. */}
        <div className="footer-cta relative overflow-hidden rounded-xl bg-[#111315] px-6 py-8 text-white sm:px-10 sm:py-10 lg:flex lg:items-center lg:justify-between lg:gap-12 lg:px-12">
          <div aria-hidden className="absolute -right-16 -top-24 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
          <div className="relative max-w-2xl">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-accent">Start a conversation</p>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight sm:text-3xl">Let&apos;s connect your marketing to what happens next.</h2>
            <p className="mt-3 max-w-xl font-sans text-sm leading-relaxed text-[#BBC0C8] sm:text-base">
              Tell us where enquiries slow down. We&apos;ll review the gaps across your campaigns, calls, CRM and follow-up.
            </p>
          </div>
          <Link href="/growth-audit" className="relative mt-6 inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-sm bg-accent px-6 font-sans text-sm font-bold text-accent-ink transition-transform hover:-translate-y-0.5 lg:mt-0">
            Request a Growth Audit <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-11 py-14 sm:gap-x-10 lg:grid-cols-[1.5fr_repeat(4,minmax(0,1fr))] lg:gap-x-7 lg:py-16">
          <div className="col-span-2 lg:col-span-1">
            <Wordmark height={42} />
            <p className="mt-5 max-w-sm font-sans text-sm leading-relaxed text-ink-2">
              <FooterTagline />
            </p>
            <div className="mt-6 space-y-3 font-sans text-sm">
              <a href={`tel:${businessPhone.replace(/\s+/g, "")}`} className="flex items-center gap-2.5 font-semibold text-ink hover:text-accent-strong">
                <Phone className="h-4 w-4 shrink-0 text-accent-strong" aria-hidden />{businessPhone}
              </a>
              <a href="mailto:hello@vistrow.com" className="flex items-center gap-2.5 text-ink-2 hover:text-accent-strong">
                <Mail className="h-4 w-4 shrink-0 text-accent-strong" aria-hidden />hello@vistrow.com
              </a>
              <Link href="/locations" className="flex items-center gap-2.5 text-ink-2 hover:text-accent-strong">
                <MapPin className="h-4 w-4 shrink-0 text-accent-strong" aria-hidden />Baner, Pune · View service areas
              </Link>
            </div>
            <div className="mt-6 flex items-center gap-2">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined} aria-label={label} title={label} className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-line text-ink-2 transition-colors hover:border-accent-strong hover:text-accent-strong">
                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                </a>
              ))}
            </div>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={`${column.title} footer links`}>
              <h3 className="font-sans text-sm font-bold text-ink">{column.title}</h3>
              <ul className="mt-5 space-y-3.5">
                {column.links.map((link) => (
                  <li key={link.href}><Link href={link.href} className="inline-flex font-sans text-sm leading-snug text-ink-2 transition-colors hover:text-accent-strong hover:underline hover:underline-offset-4">{link.label}</Link></li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-col gap-4 border-t border-line pt-6 font-sans text-xs text-muted md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Vistrow Technologies. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {legal.map((link) => <li key={link.href}><Link href={link.href} className="hover:text-ink hover:underline hover:underline-offset-4">{link.label}</Link></li>)}
            <li><CookieSettingsButton className="hover:text-ink hover:underline hover:underline-offset-4" /></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
