import Link from "next/link";
import { AtSign, Database, Globe, PhoneCall } from "lucide-react";
import { Wordmark } from "@/components/ui/wordmark";

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
  const externalLinks = [
    { icon: Globe, label: "Vistrow website", href: "https://www.vistrow.com" },
    { icon: PhoneCall, label: "Vistrow Voice", href: "https://voice-three-flax.vercel.app/" },
    { icon: Database, label: "ArthaLeads", href: "https://www.arthaleads.com/" },
    { icon: AtSign, label: "Email Vistrow", href: "mailto:hello@vistrow.com" },
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
            <div className="mt-6 flex gap-2.5">
              {externalLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-line text-ink-2 transition-colors hover:border-accent hover:text-ink"
                >
                  <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="font-sans text-sm font-semibold text-ink">{col.title}</h3>
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
