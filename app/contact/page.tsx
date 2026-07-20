import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { ContactForm } from "@/components/forms/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Talk to Vistrow about connecting your marketing to CRM, automation, and conversion.",
};

const details = [
  { icon: Mail, label: "Email", value: "hello@vistrow.com" },
  { icon: Phone, label: "Phone", value: "Available on request" },
  { icon: MapPin, label: "Working", value: "Remote-first, global" },
];

export default function Page() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        eyebrow="Contact"
        title="Talk to"
        highlight="Vistrow"
        subtitle="Tell us where marketing and sales are disconnected, and we'll show you how a connected system closes the gap."
        primaryCta={{ label: "Book a Growth Audit", href: "/growth-audit" }}
        secondaryCta={{ label: "See our work", href: "/work" }}
      />
      <section className="py-section">
        <div className="container-edge grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="font-display text-h3 text-ink">Get in touch</h2>
            <p className="mt-3 font-sans text-muted">
              Prefer a structured start? A Growth Audit is the fastest way to see where your
              system is leaking opportunities.
            </p>
            <ul className="mt-8 space-y-5">
              {details.map((d) => (
                <li key={d.label} className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-sm bg-accent-tint">
                    <d.icon className="h-5 w-5 text-accent-ink" strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="font-sans text-[13px] text-muted">{d.label}</p>
                    <p className="font-sans text-[15px] font-semibold text-ink">{d.value}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
