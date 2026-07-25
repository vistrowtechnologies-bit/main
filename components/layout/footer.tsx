import Link from "next/link";
import Image from "next/image";
import {
  ExternalLink,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
} from "lucide-react";
import { Wordmark } from "@/components/ui/wordmark";
import { socialProfiles } from "@/lib/social-links";

const columns: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Capabilities",
    links: [
      { label: "Digital Marketing", href: "/digital-marketing" },
      { label: "Business Automation", href: "/business-automation" },
      { label: "CRM & Lead Management", href: "/business-automation/crm-lead-management" },
      { label: "AI Voice Calling", href: "/business-automation/ai-voice-calling" },
    ],
  },
  {
    title: "Products",
    links: [
      { label: "Vistrow Voice", href: "/products/vistrow-voice" },
      { label: "ArthaLeads", href: "/products/arthaleads" },
      { label: "Vistrow Labs", href: "/products/vistrow-labs" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Our Approach", href: "/approach" },
      { label: "Blog", href: "/blog" },
      { label: "Work", href: "/work" },
      { label: "Contact", href: "/contact" },
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
  const productLinks = [
    {
      label: "Vistrow Voice",
      href: "https://www.vistrowvoice.com/",
      logo: "/brands/vistrow-voice.png",
    },
    {
      label: "ArthaLeads",
      href: "https://www.arthaleads.com/",
      logo: "/brands/arthaleads.png",
    },
  ];

  return (
    <footer className="border-t border-line bg-surface">
      <div className="container-edge py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div className="col-span-2 md:col-span-1 lg:col-span-1">
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
              {col.title === "Products" ? (
                <div className="mt-5 flex flex-col gap-2">
                  {productLinks.map((product) => (
                    <a
                      key={product.label}
                      href={product.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex w-full max-w-[220px] items-center gap-2.5 rounded-sm border border-line bg-card/60 p-2 text-ink transition-all hover:-translate-y-0.5 hover:border-accent hover:bg-card"
                    >
                      <Image
                        src={product.logo}
                        alt={`${product.label} logo`}
                        width={32}
                        height={32}
                        className="h-8 w-8 shrink-0 rounded-[8px] object-cover"
                      />
                      <span className="min-w-0 flex-1 font-sans text-[13px] font-semibold">
                        {product.label}
                      </span>
                      <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted transition-colors group-hover:text-accent-strong" />
                    </a>
                  ))}
                  <Link
                    href="/products/vistrow-labs"
                    className="mt-1 font-sans text-sm text-muted transition-colors hover:text-accent-strong"
                  >
                    Vistrow Labs
                  </Link>
                </div>
              ) : (
                <ul className="mt-5 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="font-sans text-sm text-muted transition-colors hover:text-accent-strong"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
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
                  className="font-sans text-[13px] text-muted transition-colors hover:text-accent-strong"
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
