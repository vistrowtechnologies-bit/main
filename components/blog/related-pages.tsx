import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Target = { href: string; label: string; note: string };

const T: Record<string, Target> = {
  arthaleads: { href: "/products/arthaleads", label: "ArthaLeads", note: "AI CRM for real estate leads" },
  crm: { href: "/business-automation/crm-lead-management", label: "CRM and lead management", note: "One clean record for every lead" },
  realestate: { href: "/industries/real-estate", label: "Real estate marketing", note: "Marketing and follow-up for builders and brokers" },
  voice: { href: "/products/vistrow-voice", label: "Vistrow Voice", note: "AI voice agents in 130+ languages" },
  voiceservice: { href: "/business-automation/ai-voice-calling", label: "AI voice calling", note: "Answer and qualify calls around the clock" },
  followup: { href: "/business-automation/lead-follow-up", label: "Lead follow-up systems", note: "Persistent, automated follow-up" },
  messaging: { href: "/business-automation/communication-automation", label: "WhatsApp, email and SMS automation", note: "Reach leads where they reply" },
  sales: { href: "/business-automation/sales-automation", label: "Sales automation", note: "Take admin out of selling" },
  custom: { href: "/business-automation/custom-automation", label: "Custom automation", note: "Workflows built around your process" },
  leadgen: { href: "/digital-marketing/lead-generation", label: "Lead generation", note: "Qualified leads delivered to your CRM" },
  landing: { href: "/digital-marketing/landing-pages", label: "Landing pages and funnels", note: "Pages that turn clicks into enquiries" },
  website: { href: "/digital-marketing/website-development", label: "Website development", note: "Fast, SEO-ready sites" },
  social: { href: "/digital-marketing/social-media", label: "Social media marketing", note: "Content that leads to enquiries" },
  creative: { href: "/digital-marketing/creative-strategy", label: "Creative strategy", note: "Ads and messages that earn attention" },
  ads: { href: "/digital-marketing/performance-advertising", label: "Performance advertising", note: "Paid media tied to your pipeline" },
  tracking: { href: "/digital-marketing/conversion-tracking", label: "Conversion tracking", note: "Know which campaigns create revenue" },
  seo: { href: "/digital-marketing/seo-content", label: "SEO and content", note: "Organic traffic that compounds" },
  mktauto: { href: "/digital-marketing/marketing-automation", label: "Marketing automation", note: "Journeys that nurture and score leads" },
  dental: { href: "/us/dental-clinics", label: "AI receptionist for US dental practices", note: "Answer calls and book appointments" },
  contractors: { href: "/us/home-services", label: "Home services in the US", note: "Never miss a job call" },
};

// First matching rule wins its slots; up to three distinct links per post.
const RULES: { re: RegExp; keys: string[] }[] = [
  { re: /arthaleads|real estate|builder|broker|99acres|housing\.com|magicbricks|site visit|rera|property|realtor|channel partner/i, keys: ["arthaleads", "crm", "realestate"] },
  { re: /dental|dentist|clinic/i, keys: ["dental", "voice", "followup"] },
  { re: /roof|hvac|contractor|solar|trades|plumb/i, keys: ["contractors", "voice", "followup"] },
  { re: /voice|telecaller|receptionist|answering|calling|call centre|call center/i, keys: ["voice", "voiceservice", "followup"] },
  { re: /whatsapp|sms|rcs|dlt|messag/i, keys: ["messaging", "followup", "voice"] },
  { re: /conversion|tracking|ga4|attribution|capi/i, keys: ["tracking", "ads", "landing"] },
  { re: /landing page|website|web development/i, keys: ["landing", "website", "tracking"] },
  { re: /social|instagram|reels|linkedin/i, keys: ["social", "creative", "leadgen"] },
  { re: /google ads|meta ads|performance|advertis|cpl|cost per lead/i, keys: ["ads", "tracking", "landing"] },
  { re: /seo|content marketing|google business|local search/i, keys: ["seo", "website", "leadgen"] },
  { re: /automat|workflow|sales|crm|lead/i, keys: ["sales", "crm", "custom"] },
];

export function RelatedPages({ title, category, slug }: { title: string; category: string; slug: string }) {
  const haystack = `${title} ${category} ${slug.replace(/-/g, " ")}`;
  const picked: Target[] = [];
  for (const rule of RULES) {
    if (!rule.re.test(haystack)) continue;
    for (const key of rule.keys) {
      const target = T[key];
      if (target && !picked.includes(target)) picked.push(target);
      if (picked.length === 3) break;
    }
    if (picked.length === 3) break;
  }
  for (const key of ["leadgen", "sales", "ads"]) {
    if (picked.length === 3) break;
    if (!picked.includes(T[key])) picked.push(T[key]);
  }

  return (
    <section className="mt-12 border-t border-line pt-8" aria-labelledby="related-pages-heading">
      <h2 id="related-pages-heading" className="font-display text-h3 text-ink">
        Related services and products
      </h2>
      <ul className="mt-5 grid gap-4 sm:grid-cols-3">
        {picked.map((target) => (
          <li key={target.href}>
            <Link
              href={target.href}
              className="group flex h-full flex-col justify-between gap-2 rounded-lg border border-line bg-card p-5 transition-colors hover:border-accent/60"
            >
              <span className="font-display text-lg font-bold text-ink">{target.label}</span>
              <span className="font-sans text-sm leading-snug text-muted">{target.note}</span>
              <span className="inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-accent-strong">
                Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2} />
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-5 font-sans text-sm text-muted">
        <Link href="/services" className="font-semibold text-accent-strong hover:underline">
          All services
        </Link>
        {" · "}
        <Link href="/contact" className="font-semibold text-accent-strong hover:underline">
          Contact us
        </Link>
      </p>
    </section>
  );
}
