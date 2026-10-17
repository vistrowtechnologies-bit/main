import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Download, Lock, Play, ShieldCheck, Sparkles } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { WhatsappIcon } from "@/components/icons/whatsapp-icon";
import { Reveal } from "@/components/ui/reveal";
import { AnimatedBar } from "@/components/ui/motion-primitives";
import { CopyButton } from "@/components/playbook/copy-button";
import { ChecklistCard, HeroGlow, SwapWord, UnlockCountdown } from "@/components/playbook/interactive";
import { chapters, playbook, waLink, type PlaybookBlock, type PlaybookChapter } from "@/content/playbook";
import pdfs from "@/content/playbook-pdfs.json";
import { isLive, reelUrl, type LiveReels } from "@/lib/playbook-live";
import { playbookHub, playbookSeo } from "@/content/playbook-seo";

const MONTHS = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const unlockLabel = (c: PlaybookChapter) => {
  const h = Number(c.release.slice(11, 13));
  return `${Number(c.release.slice(8, 10))} ${MONTHS[Number(c.release.slice(5, 7))]}, ${h % 12 || 12}:${c.release.slice(14, 16)} ${h < 12 ? "AM" : "PM"}`;
};
type PdfMeta = { file: string; cover: string; reel: string; pages: number; kb: number };
const pdfOf = (c: PlaybookChapter) => (pdfs as Record<string, PdfMeta>)[String(c.day)];
// reel cover image (hashed file name, so unreleased covers can't be guessed)
const cover = (c: PlaybookChapter) => pdfOf(c)?.reel ?? "/og.png";

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`rounded-lg border border-line bg-surface p-4 sm:p-7 ${className}`}>{children}</section>;
}
const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-display text-lg font-bold tracking-[-0.02em] text-ink sm:text-2xl">{children}</h2>
);
const Chip = ({ children, solid = false }: { children: React.ReactNode; solid?: boolean }) => (
  <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-sans text-xs font-bold ${solid ? "bg-accent text-accent-ink" : "border border-line text-ink-2"}`}>{children}</span>
);

function ReelThumb({ c, locked = false, icon = true, className = "" }: { c: PlaybookChapter; locked?: boolean; icon?: boolean; className?: string }) {
  return (
    <span className={`relative block aspect-[9/16] overflow-hidden rounded-md border border-line bg-ink/10 ${className}`}>
      <Image src={cover(c)} alt={`Day ${c.day} reel cover: ${c.title}`} fill sizes="(max-width: 640px) 30vw, 160px" className={`object-cover ${locked ? "scale-110 blur-[3px] brightness-75" : ""}`} />
      {(icon || locked) && <span className="absolute inset-0 flex items-center justify-center">
        <span className={`flex h-9 w-9 items-center justify-center rounded-full ${locked ? "bg-black/60 text-white" : "bg-accent text-accent-ink"} shadow-lg`}>
          {locked ? <Lock className="h-4 w-4" /> : <Play className="h-4 w-4 translate-x-[1px]" fill="currentColor" />}
        </span>
      </span>}
    </span>
  );
}

function Block({ block, slug }: { block: PlaybookBlock; slug: string }) {
  switch (block.type) {
    case "why":
      return (
        <Card className="relative overflow-hidden">
          <span className="absolute inset-y-0 left-0 w-1.5 bg-accent" />
          {block.title && <H2>{block.title}</H2>}
          <p className="mt-2.5 font-sans text-[15px] leading-relaxed text-ink-2 sm:text-base">{block.text}</p>
        </Card>
      );
    case "note":
      return (
        <p className="flex gap-3 rounded-lg border border-accent/40 bg-accent-tint p-4 font-sans text-sm leading-relaxed text-ink">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent-strong" strokeWidth={2} />
          <span>{block.text}</span>
        </p>
      );
    case "task":
      return (
        <section className="relative overflow-hidden rounded-lg bg-[#07111f] p-5 sm:p-7">
          <span aria-hidden className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/20 blur-2xl" />
          <span className="relative inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 font-sans text-xs font-extrabold text-accent-ink">
            <Clock className="h-3.5 w-3.5" /> Aaj ka 5-minute kaam
          </span>
          <p className="relative mt-3 font-sans text-base font-medium leading-relaxed text-white sm:text-lg">{block.text}</p>
        </section>
      );
    case "check":
      return <ChecklistCard slug={slug} title={block.title} items={block.items} />;
    case "steps":
      return (
        <Card>
          <H2>{block.title}</H2>
          <ol className="relative mt-4 space-y-5 before:absolute before:bottom-2 before:left-[15px] before:top-2 before:w-0.5 before:bg-ink/15">
            {block.items.map(([t, d], i) => (
              <li key={t} className="relative flex gap-3.5">
                <span className="relative z-[1] flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent font-sans text-sm font-extrabold text-accent-ink ring-4 ring-surface">{i + 1}</span>
                <span className="pt-0.5">
                  <b className="block font-sans text-[15px] font-semibold text-ink">{t}</b>
                  <span className="mt-0.5 block font-sans text-sm leading-relaxed text-muted">{d}</span>
                </span>
              </li>
            ))}
          </ol>
        </Card>
      );
    case "table":
      return (
        <Card>
          <H2>{block.title}</H2>
          <div className="-mx-4 mt-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
            <table className="w-full min-w-[400px] border-collapse font-sans text-sm">
              <thead>
                <tr>{block.head.map((h) => <th key={h} className="border border-line bg-accent-tint px-3 py-2.5 text-left font-semibold text-ink">{h}</th>)}</tr>
              </thead>
              <tbody>
                {block.rows.map((r, i) => (
                  <tr key={i}>{r.map((c, j) => <td key={j} className="border border-line px-3 py-2.5 align-top text-ink-2">{c || " "}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      );
    case "templates":
      return (
        <Card>
          <H2>{block.title}</H2>
          <div className="mt-3 space-y-4">
            {block.items.map(([t, msg]) => (
              <div key={t}>
                <p className="font-sans text-[11px] font-bold uppercase tracking-wider text-muted">{t}</p>
                <div className="relative mt-1.5 max-w-[92%] rounded-2xl rounded-tl-sm bg-[#dcf8c6] p-3.5 pb-11 font-sans text-[15px] leading-relaxed text-[#111b21] shadow-sm dark:bg-[#005c4b] dark:text-[#e9edef]">
                  {msg}
                  <CopyButton text={msg} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      );
    case "download":
      return (
        <Card className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <H2>{block.title}</H2>
            <p className="mt-1 font-sans text-sm text-muted">{block.text}</p>
          </div>
          <a href={block.href} download className="btn-primary w-full shrink-0 sm:w-auto">
            <Download className="h-4 w-4" /> {block.label}
          </a>
        </Card>
      );
  }
}

/** What the chapter's PDF contains (same wording as the PDF cover). */
function inside(c: PlaybookChapter) {
  const out: string[] = [];
  for (const b of c.blocks) {
    if (b.type === "check") out.push(`${b.items.length}-point tick-box checklist`);
    if (b.type === "steps") out.push(`${b.items.length} step-by-step actions`);
    if (b.type === "templates") out.push(`${b.items.length} copy-paste WhatsApp templates`);
    if (b.type === "table") out.push(b.title);
    if (b.type === "task") out.push("Aaj ka 5-minute kaam");
    if (b.type === "download") out.push("Ready-made tracker sheet");
  }
  return Array.from(new Set(out));
}

function PdfCard({ c, open, className = "" }: { c: PlaybookChapter; open: boolean; className?: string }) {
  const pdf = pdfOf(c);
  if (!pdf) return null;
  const share = `https://wa.me/?text=${encodeURIComponent(`Yeh free checklist dekho, kaam ki hai: ${c.title} https://www.vistrow.com/playbook/${c.slug}`)}`;
  return (
    <section className={`group relative overflow-hidden rounded-lg border border-accent/50 bg-surface p-4 sm:p-6 ${className}`}>
      <span aria-hidden className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-accent/20 blur-3xl" />
      <div className="relative flex gap-4">
        <span className="relative w-[92px] shrink-0 sm:w-[110px]">
          <Image
            src={pdf.cover}
            alt={`Day ${c.day} PDF cover`}
            width={220}
            height={311}
            className={`aspect-[210/297] w-full -rotate-3 rounded-[4px] object-cover shadow-[0_12px_30px_-8px_rgba(0,0,0,0.55)] ring-1 ring-black/10 transition duration-300 group-hover:rotate-0 group-hover:scale-105 ${open ? "" : "blur-[2px] brightness-75"}`}
          />
          <span className="absolute -right-2 -top-2 rounded-full bg-accent px-2 py-0.5 font-sans text-[10px] font-extrabold text-accent-ink shadow">PDF</span>
        </span>
        <div className="min-w-0">
          <p className="font-sans text-[11px] font-extrabold uppercase tracking-wider text-accent-strong">Free · no signup</p>
          <h2 className="mt-1 font-display text-lg font-extrabold leading-tight tracking-[-0.02em] text-ink sm:text-xl">Print karo, pen se tick karo</h2>
          <ul className="mt-2 space-y-1">
            {inside(c).map((x) => (
              <li key={x} className="flex gap-1.5 font-sans text-[13px] leading-snug text-ink-2"><span className="font-bold text-accent-strong">✓</span>{x}</li>
            ))}
          </ul>
        </div>
      </div>
      {open ? (
        <>
          <a href={pdf.file} download className="btn-primary relative mt-4 w-full">
            <Download className="h-4 w-4 transition group-hover:translate-y-0.5" /> Download free PDF
          </a>
          <div className="relative mt-2.5 flex items-center justify-between font-sans text-xs text-muted">
            <span>{pdf.pages} pages · {pdf.kb} KB · A4</span>
            <a href={share} target="_blank" rel="noopener" className="inline-flex items-center gap-1 font-semibold text-ink underline decoration-accent decoration-2 underline-offset-2"><WhatsappIcon className="h-3.5 w-3.5 text-[#25D366]" />Dost ko WhatsApp karo</a>
          </div>
        </>
      ) : (
        <p className="relative mt-4 rounded-md bg-ink/5 px-3 py-2.5 text-center font-sans text-sm font-semibold text-ink-2">🔒 PDF {unlockLabel(c)} ko milega</p>
      )}
    </section>
  );
}

/** Answer-first box: the direct answer AI search and featured snippets quote. */
function QuickAnswer({ question, answer }: { question: string; answer: string }) {
  return (
    <section aria-labelledby="quick-answer" className="rounded-lg border border-line bg-surface p-4 sm:p-6">
      <p className="font-sans text-[11px] font-extrabold uppercase tracking-wider text-accent-strong">Quick answer</p>
      <h2 id="quick-answer" className="mt-1 font-display text-lg font-bold leading-snug tracking-[-0.02em] text-ink sm:text-xl">{question}</h2>
      <p className="mt-2 font-sans text-[15px] leading-relaxed text-ink-2 sm:text-base">{answer}</p>
    </section>
  );
}

function Faq({ items }: { items: [string, string][] }) {
  return (
    <section aria-labelledby="faq" className="rounded-lg border border-line bg-surface p-4 sm:p-6">
      <H2><span id="faq">Aksar pooche jaane wale sawaal (FAQ)</span></H2>
      <div className="mt-3 divide-y divide-line">
        {items.map(([q, a], k) => (
          <details key={q} className="group py-3" open={k === 0}>
            <summary className="flex cursor-pointer list-none items-start justify-between gap-3 font-sans text-[15px] font-semibold text-ink [&::-webkit-details-marker]:hidden">
              <span>{q}</span>
              <span aria-hidden className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-tint font-bold text-accent-strong transition group-open:rotate-45">+</span>
            </summary>
            <p className="mt-2 pr-8 font-sans text-sm leading-relaxed text-ink-2">{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function HelpCard({ c, className = "" }: { c?: PlaybookChapter; className?: string }) {
  return (
    <section className={`rounded-lg border border-line bg-surface p-4 sm:p-6 ${className}`}>
      <H2>No time to do it yourself?</H2>
      <p className="mt-1.5 font-sans text-sm leading-relaxed text-ink-2">Vistrow sets all of this up for your business: Google profile, reviews, website and leads.</p>
      <a href={waLink(c ? `Day ${c.day}: ${c.title}` : "Playbook home page")} target="_blank" rel="noopener" className="btn-secondary mt-4 w-full"><WhatsappIcon className="h-5 w-5 text-[#25D366]" /> Chat on WhatsApp: 90670 97779</a>
    </section>
  );
}

export function PlaybookChapterPage({ chapter, preview = false, live = null }: { chapter: PlaybookChapter; preview?: boolean; live?: LiveReels | null }) {
  const open = preview || isLive(chapter, live);
  // the exact reel on Instagram (from the publisher); profile only as a fallback
  const reel = reelUrl(chapter, live) ?? playbook.instagram;
  const seo = playbookSeo[chapter.slug];
  const i = chapters.indexOf(chapter);
  const prev = chapters[i - 1];
  const next = chapters[i + 1] && (preview || isLive(chapters[i + 1], live)) ? chapters[i + 1] : undefined;
  const q = preview ? "?preview=1" : "";
  return (
    <article className="pb-16 pt-6 sm:pb-24 sm:pt-10">
      <div className="container-edge">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "100 Din Playbook", href: `/playbook${q}` }, { label: `Day ${chapter.day}` }]} />

        <header className="relative mt-4 overflow-hidden rounded-lg border border-line bg-surface p-4 sm:p-8 lg:p-10">
          <HeroGlow />
          <div className="relative flex items-center gap-4 sm:gap-8">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap gap-2">
                <Chip solid>Day {chapter.day}</Chip>
                <Chip><Clock className="h-3.5 w-3.5" /> 5 min</Chip>
                <Chip>Free</Chip>
              </div>
              <h1 className="mt-3 max-w-4xl font-display text-[clamp(1.6rem,4.6vw,3.5rem)] font-extrabold leading-[1.05] tracking-[-0.035em] text-ink">{chapter.title}</h1>
              <p className="mt-3 max-w-2xl font-sans text-[15px] leading-relaxed text-muted sm:text-lg">{chapter.summary}</p>
              <div className="mt-6 hidden gap-3 sm:flex">
                <a href={reel} target="_blank" rel="noopener" className="btn-primary">Day {chapter.day} reel dekho <ArrowRight className="h-4 w-4" /></a>
              </div>
            </div>
            <a href={reel} target="_blank" rel="noopener" className="w-[86px] shrink-0 sm:w-[150px] lg:w-[180px]" aria-label={`Day ${chapter.day} reel dekho`}>
              <ReelThumb c={chapter} locked={!open} className="transition duration-300 hover:-rotate-2 hover:scale-[1.03]" />
            </a>
          </div>
          <a href={reel} target="_blank" rel="noopener" className="btn-primary relative mt-5 w-full sm:hidden">Day {chapter.day} reel dekho <ArrowRight className="h-4 w-4" /></a>
        </header>

        <div className="mt-5 grid gap-5 lg:mt-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-8">
          <div className="min-w-0 space-y-4 sm:space-y-5">
            {open && seo && <QuickAnswer question={seo.question} answer={seo.answer} />}
            <PdfCard c={chapter} open={open} className="lg:hidden" />
            {open ? (
              chapter.blocks.map((b, k) => (
                <Reveal key={k} delay={Math.min(k, 3) * 0.05} distance={18}>
                  <Block block={b} slug={chapter.slug} />
                </Reveal>
              ))
            ) : (
              <Card className="text-center">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent-tint"><Lock className="h-6 w-6 text-accent-strong" /></span>
                <h2 className="mt-3 font-display text-xl font-bold text-ink">{unlockLabel(chapter)} ko unlock hoga</h2>
                <div className="mt-4"><UnlockCountdown release={chapter.release} /></div>
                <p className="mx-auto mt-4 max-w-lg font-sans text-[15px] text-ink-2">
                  Day {chapter.day} ki reel post hote hi yeh page khul jaayega. Reel pe <b className="rounded bg-accent px-1.5 text-accent-ink">{chapter.keyword}</b> comment karo, link seedha DM mein aa jaayega.
                </p>
              </Card>
            )}
            {open && seo && <Faq items={seo.faq} />}

            <nav className="grid grid-cols-2 gap-2.5 pt-3 sm:gap-3">
              {prev ? (
                <Link href={`/playbook/${prev.slug}${q}`} className="rounded-lg border border-line bg-surface p-3.5 transition hover:-translate-y-0.5 hover:border-accent sm:p-4">
                  <small className="block font-sans text-xs font-semibold text-muted">← Day {prev.day}</small>
                  <b className="line-clamp-2 font-sans text-sm text-ink">{prev.title}</b>
                </Link>
              ) : <span />}
              {next ? (
                <Link href={`/playbook/${next.slug}${q}`} className="rounded-lg border border-line bg-surface p-3.5 text-right transition hover:-translate-y-0.5 hover:border-accent sm:p-4">
                  <small className="block font-sans text-xs font-semibold text-muted">Day {next.day} →</small>
                  <b className="line-clamp-2 font-sans text-sm text-ink">{next.title}</b>
                </Link>
              ) : <span />}
            </nav>
            <HelpCard c={chapter} className="lg:hidden" />
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-5">
              <PdfCard c={chapter} open={open} />
              <HelpCard c={chapter} />
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}

export function PlaybookIndexPage({ preview = false, live = null }: { preview?: boolean; live?: LiveReels | null }) {
  const q = preview ? "?preview=1" : "";
  // only chapters whose reel is already posted are shown; the next one is a teaser (no title, no cover)
  const released = chapters.filter((c) => preview || isLive(c, live));
  const upcoming = chapters.find((c) => !released.includes(c));
  const fan = released.slice(-3);
  return (
    <article className="pb-16 pt-6 sm:pb-24 sm:pt-10">
      <div className="container-edge">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "100 Din Playbook" }]} />

        <header className="relative mt-4 overflow-hidden rounded-lg border border-line bg-surface p-4 sm:p-8 lg:p-12">
          <HeroGlow />
          <div className={`relative grid grid-cols-1 items-center gap-8 ${fan.length ? "lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]" : "lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-12"}`}>
            <div>
              <Chip solid><Sparkles className="h-3.5 w-3.5" /> Free · 100-day challenge</Chip>
              <h1 className="mt-4 font-display text-[clamp(2.2rem,6vw,4.5rem)] font-extrabold leading-[1] tracking-[-0.045em] text-ink">100 Din Playbook</h1>
              <p className="mt-3 font-display text-xl font-bold text-ink sm:text-3xl">
                Free <SwapWord words={["checklists", "WhatsApp templates", "trackers", "printable PDFs"]} className="text-accent-strong" />
              </p>
              <p className="mt-4 max-w-xl font-sans text-[15px] leading-relaxed text-muted sm:text-lg">{playbook.intro}</p>

              <div className="mt-6 max-w-md rounded-md border border-line p-3.5">
                <div className="flex items-baseline justify-between">
                  <span className="font-sans text-sm font-semibold text-ink-2">Chapters unlocked</span>
                  <span className="font-display text-2xl font-extrabold text-ink">{released.length}<span className="text-base text-muted"> / 100</span></span>
                </div>
                <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-ink/10">
                  <AnimatedBar width={`${Math.max(released.length, 1)}%`} className="h-full rounded-full bg-accent" />
                </div>
              </div>

              <div className="mt-6 grid gap-2.5 sm:flex">
                <a href={playbook.instagram} target="_blank" rel="noopener" className="btn-primary w-full sm:w-auto">Instagram pe follow karo <ArrowRight className="h-4 w-4" /></a>
                <a href={playbook.youtube} target="_blank" rel="noopener" className="btn-secondary w-full sm:w-auto">YouTube playlist</a>
              </div>
            </div>

            {fan.length > 0 ? (
              <div className="relative mx-auto hidden h-[420px] w-full max-w-[440px] lg:block">
                {fan.map((c, k) => {
                  const mid = (fan.length - 1) / 2;
                  return (
                    <a
                      key={c.slug}
                      href={reelUrl(c, live) ?? `/playbook/${c.slug}${q}`}
                      target={reelUrl(c, live) ? "_blank" : undefined}
                      rel="noopener"
                      aria-label={`Day ${c.day} reel dekho`}
                      className="absolute top-6 w-[190px] transition duration-500 hover:z-10 hover:-translate-y-3"
                      style={{ left: `calc(50% - 95px + ${(k - mid) * 120}px)`, transform: `rotate(${(k - mid) * 7}deg)`, zIndex: k === fan.length - 1 ? 3 : 1 }}
                    >
                      <ReelThumb c={c} className="shadow-[0_24px_50px_-12px_rgba(0,0,0,0.6)]" />
                    </a>
                  );
                })}
              </div>
            ) : upcoming ? (
              <div className="relative rounded-lg border border-dashed border-accent/60 p-5 text-center sm:p-8">
                <p className="font-sans text-xs font-extrabold uppercase tracking-wider text-accent-strong">Day {upcoming.day} · first chapter</p>
                <p className="mt-2 font-display text-2xl font-extrabold text-ink">{unlockLabel(upcoming)}</p>
                <div className="mt-4"><UnlockCountdown release={upcoming.release} /></div>
                <p className="mt-4 font-sans text-sm text-muted">Reel post hote hi yahan khulega.</p>
              </div>
            ) : null}
          </div>
        </header>

        {released.length > 0 && (
          <>
            <div className="mt-10 flex items-end justify-between gap-4">
              <h2 className="font-display text-2xl font-bold tracking-[-0.02em] text-ink sm:text-3xl">Saare chapters</h2>
              <span className="hidden font-sans text-sm text-muted sm:block">Har chapter ke saath free PDF</span>
            </div>
            <ol className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
              {released.slice().reverse().map((c, k) => (
                <li key={c.slug}><Reveal delay={(k % 3) * 0.06} distance={16} className="h-full">
                  <Link
                    href={`/playbook/${c.slug}${q}`}
                    className="group flex h-full items-center gap-3.5 rounded-lg border border-line bg-surface p-3 pr-4 transition duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.5)] active:scale-[0.99]"
                  >
                    <ReelThumb c={c} icon={false} className="w-16 shrink-0 transition duration-300 group-hover:-rotate-3 lg:w-20" />
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-accent px-2 py-0.5 font-sans text-[11px] font-extrabold text-accent-ink">DAY {c.day}</span>
                        {k === 0 && <span className="font-sans text-[11px] font-bold text-accent-strong">● Naya</span>}
                      </span>
                      <b className="mt-1.5 block font-sans text-[15px] font-semibold leading-snug text-ink">{c.title}</b>
                      <small className="mt-0.5 block font-sans text-[13px] leading-snug text-muted">{c.summary}</small>
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-accent-strong transition group-hover:translate-x-1" />
                  </Link>
                </Reveal></li>
              ))}
              {upcoming && (
                <li className="flex items-center gap-3.5 rounded-lg border border-dashed border-line p-3">
                  <span className="flex aspect-[9/16] w-16 shrink-0 items-center justify-center rounded-md bg-ink/10 lg:w-20"><Lock className="h-5 w-5 text-muted" /></span>
                  <span className="min-w-0">
                    <b className="block font-sans text-[15px] font-semibold text-ink">Day {upcoming.day}: agla chapter</b>
                    <small className="block font-sans text-[13px] text-muted">Reel post hote hi yahan khulega.</small>
                  </span>
                </li>
              )}
            </ol>
          </>
        )}

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <QuickAnswer question="What is the 100 Din Playbook?" answer={playbookHub.answer} />
          <Faq items={playbookHub.faq} />
        </div>

        <section className="relative mt-10 overflow-hidden rounded-lg bg-[#0b0b0c] p-5 sm:p-10">
          <span aria-hidden className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
          <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="font-display text-2xl font-extrabold tracking-[-0.03em] text-white sm:text-4xl">No time to do it yourself?</h2>
              <p className="mt-2 max-w-xl font-sans text-[15px] text-white/70 sm:text-lg">Vistrow sets all of this up for your business: Google profile, reviews, website and leads.</p>
            </div>
            <a href={waLink("Playbook home page")} target="_blank" rel="noopener" className="btn-primary w-full shrink-0 lg:w-auto"><WhatsappIcon className="h-5 w-5" /> Chat on WhatsApp: 90670 97779 <ArrowRight className="h-4 w-4" /></a>
          </div>
        </section>
      </div>
    </article>
  );
}
