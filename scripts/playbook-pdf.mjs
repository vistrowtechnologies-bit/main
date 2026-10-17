// Builds the free printable PDF (and a cover preview PNG) for every 100 Din Playbook chapter.
//   node scripts/playbook-pdf.mjs            -> public/playbook/pdf/vistrow-day-N-<slug>.pdf + day-N-cover.png
// Content comes from content/playbook.ts (same source as the web pages). Uses local Google Chrome headless.
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync, mkdtempSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { createRequire } from "node:module";
import { createHash } from "node:crypto";

const require = createRequire(import.meta.url);
const { transform } = require("sucrase");
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

// load content/playbook.ts without a TS toolchain
const src = transform(readFileSync(path.join(root, "content/playbook.ts"), "utf8"), { transforms: ["typescript", "imports"] }).code;
const mod = { exports: {} };
new Function("module", "exports", "require", src)(mod, mod.exports, require);
const { chapters, playbook } = mod.exports;

const outDir = path.join(root, "public/playbook/pdf");
mkdirSync(outDir, { recursive: true });
const work = mkdtempSync(path.join(tmpdir(), "playbook-pdf-"));
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const asset = (p) => "file://" + path.join(root, "public", p);
// the reel's own photos (assets/ is not served, so unreleased episodes stay private)
const photo = (c, i) => "file://" + path.join(root, "assets/playbook-photos", `day-${c.day}-${i}.jpg`);
const wa = (from) => `${playbook.whatsapp}?text=${encodeURIComponent(`Hi Vistrow! I'm coming from your 100 Din Playbook PDF (${from}). I'd like help with my business.`)}`;

// file names carry a short hash so an unreleased chapter's PDF can't be guessed before its reel is posted
const tag = (c) => createHash("sha256").update(`${c.slug}:vistrow-playbook`).digest("hex").slice(0, 10);
export const pdfName = (c) => `vistrow-day-${c.day}-${c.slug}-${tag(c)}.pdf`;
const coverName = (c) => `cover-day-${c.day}-${tag(c)}.jpg`;
const reelName = (c) => `reel-day-${c.day}-${tag(c)}.jpg`;
const cardName = (c) => `card-day-${c.day}-${tag(c)}.jpg`;

function inside(c) {
  const out = [];
  for (const b of c.blocks) {
    if (b.type === "check") out.push(`${b.items.length}-point tick-box checklist`);
    if (b.type === "steps") out.push(`${b.items.length} step-by-step actions`);
    if (b.type === "templates") out.push(`${b.items.length} copy-paste WhatsApp templates`);
    if (b.type === "table") out.push(b.title);
    if (b.type === "task") out.push("Aaj ka 5-minute kaam");
    if (b.type === "download") out.push("Ready-made tracker sheet");
  }
  return [...new Set(out)];
}

function block(b, c) {
  switch (b.type) {
    case "why":
      return `<section class="why with-pic"><div>${b.title ? `<h2>${esc(b.title)}</h2>` : ""}<p>${esc(b.text)}</p></div><img src="${photo(c, 3)}"></section>`;
    case "note":
      return `<p class="note">✔ ${esc(b.text)}</p>`;
    case "task":
      return `<section class="task"><span class="pill">⏱ Aaj ka 5-minute kaam</span><p>${esc(b.text)}</p><div class="done">Done on: ____ / ____ / ________</div></section>`;
    case "check":
      return `<section><h2>${esc(b.title)}</h2><ul class="check">${b.items.map(([t, d]) => `<li><span class="box"></span><div><b>${esc(t)}</b><small>${esc(d)}</small></div></li>`).join("")}</ul><div class="score">Mera score: ______ / ${b.items.length}</div></section>`;
    case "steps":
      return `<section><h2>${esc(b.title)}</h2><ol class="steps">${b.items.map(([t, d], i) => `<li><span class="n">${i + 1}</span><div><b>${esc(t)}</b><small>${esc(d)}</small></div><span class="box sm"></span></li>`).join("")}</ol></section>`;
    case "table":
      return `<section><h2>${esc(b.title)}</h2><table><thead><tr>${b.head.map((h) => `<th>${esc(h)}</th>`).join("")}</tr></thead><tbody>${b.rows.map((r) => `<tr>${r.map((x) => `<td>${esc(x) || "&nbsp;"}</td>`).join("")}</tr>`).join("")}</tbody></table></section>`;
    case "templates":
      return `<section><h2>${esc(b.title)}</h2>${b.items.map(([t, m]) => `<div class="tpl"><small>${esc(t)}</small><div class="bubble">${esc(m)}</div></div>`).join("")}</section>`;
    case "download":
      return `<section class="dl"><h2>${esc(b.title)}</h2><p>${esc(b.text)}</p><a href="https://www.vistrow.com${esc(b.href)}">www.vistrow.com${esc(b.href)}</a></section>`;
  }
  return "";
}

const WA_ICON = `<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" style="vertical-align:-3px;margin-right:6px"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2Zm0 18.13h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.36c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.83c0 4.55-3.7 8.21-8.24 8.21Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.17.24-.64.81-.78.97-.14.17-.29.19-.53.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.24-.02-.37.11-.5.11-.11.25-.29.37-.43.13-.14.17-.24.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.36-.77-1.86-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.66.31-.23.24-.87.85-.87 2.08 0 1.22.89 2.4 1.01 2.57.13.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.28Z"/></svg>`;

const css = `
@page { size: A4; margin: 15mm 16mm 20mm; }
@page :first { margin: 0; }
* { box-sizing: border-box; margin: 0; padding: 0; }
@font-face { font-family: Manrope; src: url(${asset("fonts/manrope-bold.ttf")}); font-weight: 700 800; }
body { font-family: Inter, -apple-system, "Helvetica Neue", Arial, sans-serif; color: #111; font-size: 11.5pt; line-height: 1.5; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
h1, h2, .display { font-family: Manrope, Inter, sans-serif; letter-spacing: -0.02em; }
.lime { color: #c6ff00; }
.cover { height: 297mm; background: #0b0b0c; color: #fff; padding: 20mm 18mm; display: flex; flex-direction: column; position: relative; overflow: hidden; page-break-after: always; }
.cover .glow { position: absolute; right: -60mm; top: -60mm; width: 160mm; height: 160mm; border-radius: 50%; background: radial-gradient(circle, rgba(198,255,0,.35), rgba(198,255,0,0) 65%); }
.cover .logo { height: 12mm; width: auto; align-self: flex-start; position: relative; }
.cover .kicker { margin-top: 16mm; display: inline-flex; gap: 6px; align-self: flex-start; background: #c6ff00; color: #0b0b0c; font-weight: 800; font-size: 10pt; padding: 5px 12px; border-radius: 99px; letter-spacing: .04em; }
.cover .day { font-family: Manrope; font-weight: 800; font-size: 92pt; line-height: .9; margin-top: 6mm; color: #c6ff00; letter-spacing: -0.05em; }
.cover h1 { font-size: 30pt; line-height: 1.05; margin-top: 6mm; font-weight: 800; max-width: 150mm; }
.cover .sum { margin-top: 5mm; font-size: 13pt; color: #bbb; max-width: 140mm; }
.cover .pics { position: relative; height: 76mm; margin: 8mm 0 6mm; }
.cover .pic { position: absolute; background: #fff; padding: 2.2mm 2.2mm 7mm; border-radius: 3px; }
.cover .pic img { display: block; width: 100%; height: 100%; object-fit: cover; }
.cover .pic.a { left: 2mm; top: 6mm; width: 84mm; height: 64mm; transform: rotate(-4deg); }
.cover .pic.b { right: 6mm; top: 0; width: 72mm; height: 56mm; transform: rotate(5deg); }
.cover .pic .cap { position: absolute; bottom: 1.5mm; left: 3mm; font-size: 8.5pt; font-weight: 700; color: #111; }
.cover .inside { margin-top: auto; border: 1px solid #333; border-radius: 10px; padding: 7mm 8mm; background: rgba(255,255,255,.04); }
.cover .inside h3 { font-family: Manrope; font-size: 10pt; letter-spacing: .12em; text-transform: uppercase; color: #c6ff00; }
.cover .inside ul { list-style: none; margin-top: 3mm; columns: 2; column-gap: 8mm; }
.cover .inside li { font-size: 11pt; padding: 1.2mm 0; break-inside: avoid; }
.cover .inside li::before { content: "✓  "; color: #c6ff00; font-weight: 800; }
.cover .foot { margin-top: 7mm; display: flex; justify-content: space-between; font-size: 9.5pt; color: #888; }
.page { padding: 0; }
.runner { position: fixed; bottom: -12mm; left: 0; right: 0; display: flex; justify-content: space-between; font-size: 8.5pt; color: #888; border-top: 1px solid #e5e5e5; padding-top: 2.5mm; }
.cover ~ .runner { }
section { margin-bottom: 8mm; break-inside: avoid; }
h2 { font-size: 16pt; font-weight: 800; margin-bottom: 3mm; }
.why { border-left: 5px solid #c6ff00; background: #f6f7f2; padding: 5mm 6mm; border-radius: 0 8px 8px 0; }
.why p { color: #333; }
.why.with-pic { display: flex; gap: 6mm; align-items: center; }
.why.with-pic img { flex: none; width: 52mm; height: 40mm; object-fit: cover; border-radius: 6px; transform: rotate(2deg); border: 2mm solid #fff; outline: 1px solid #ddd; }
.cta .pic { flex: none; width: 38mm; height: 50mm; object-fit: cover; border-radius: 6px; transform: rotate(-3deg); border: 1.5mm solid #fff; }
.note { background: #f4ffd6; border: 1px solid #c6ff00; border-radius: 8px; padding: 4mm 5mm; margin-bottom: 8mm; font-size: 10.5pt; }
.task { background: #0b0b0c; color: #fff; border-radius: 10px; padding: 6mm 7mm; }
.task .pill { display: inline-block; background: #c6ff00; color: #0b0b0c; font-weight: 800; font-size: 9pt; padding: 3px 10px; border-radius: 99px; }
.task p { margin-top: 3mm; font-size: 12.5pt; }
.task .done { margin-top: 4mm; color: #999; font-size: 10pt; }
.check, .steps { list-style: none; border: 1px solid #ddd; border-radius: 10px; overflow: hidden; }
.check li, .steps li { display: flex; gap: 4mm; align-items: flex-start; padding: 3.2mm 5mm; border-bottom: 1px solid #eee; break-inside: avoid; }
.check li:last-child, .steps li:last-child { border-bottom: 0; }
.check b, .steps b { display: block; font-size: 11pt; }
.check small, .steps small { display: block; color: #666; font-size: 9.5pt; line-height: 1.4; }
.steps li div { flex: 1; }
.box { flex: none; width: 5.5mm; height: 5.5mm; border: 2px solid #111; border-radius: 3px; margin-top: .6mm; }
.box.sm { width: 4.5mm; height: 4.5mm; border-color: #bbb; }
.n { flex: none; width: 7mm; height: 7mm; border-radius: 50%; background: #c6ff00; font-weight: 800; font-size: 9.5pt; display: flex; align-items: center; justify-content: center; }
.score { margin-top: 3mm; font-weight: 700; font-size: 11pt; }
table { width: 100%; border-collapse: collapse; font-size: 10pt; }
th { background: #f4ffd6; text-align: left; }
th, td { border: 1px solid #ddd; padding: 2.5mm 3mm; vertical-align: top; }
td { height: 8mm; }
.tpl { margin-bottom: 4mm; break-inside: avoid; }
.tpl small { font-size: 8.5pt; font-weight: 700; color: #777; text-transform: uppercase; letter-spacing: .06em; }
.bubble { margin-top: 1.5mm; background: #dcf8c6; border-radius: 4px 14px 14px 14px; padding: 3.5mm 4.5mm; max-width: 150mm; font-size: 10.5pt; }
.dl a { color: #111; font-weight: 700; }
.cta { break-inside: avoid; background: #0b0b0c; color: #fff; border-radius: 12px; padding: 8mm; display: flex; gap: 8mm; align-items: center; position: relative; overflow: hidden; }
.cta h2 { font-size: 18pt; color: #fff; }
.cta p { color: #bbb; margin-top: 1.5mm; font-size: 10.5pt; }
.cta .btn { white-space: nowrap; display: inline-block; margin-top: 4mm; background: #c6ff00; color: #0b0b0c; font-weight: 800; padding: 3mm 6mm; border-radius: 8px; text-decoration: none; font-size: 11pt; }
.cta .tap { margin-top: 2mm; font-size: 8.5pt; color: #888; }
.cta .next { flex: none; width: 52mm; border-left: 1px solid #333; padding-left: 7mm; font-size: 10pt; color: #bbb; }
.cta .next b { display: block; color: #c6ff00; font-family: Manrope; font-size: 10pt; letter-spacing: .1em; text-transform: uppercase; margin-bottom: 1.5mm; }
.cta .next a { color: #fff; }
`;

function html(c, coverOnly = false) {
  const i = chapters.indexOf(c);
  const next = chapters[i + 1];
  const pageUrl = `www.vistrow.com/playbook/${c.slug}`;
  const cover = `
  <div class="cover">
    <div class="glow"></div>
    <img class="logo" src="${asset("logo-dark.png")}" alt="Vistrow">
    <span class="kicker">FREE · 100 DIN PLAYBOOK</span>
    <div class="day">Day ${c.day}</div>
    <h1>${esc(c.title)}</h1>
    <p class="sum">${esc(c.summary)}</p>
    <div class="pics">
      <div class="pic a"><img src="${photo(c, 1)}"><span class="cap">Day ${c.day} reel se</span></div>
      <div class="pic b"><img src="${photo(c, 2)}"></div>
    </div>
    <div class="inside"><h3>Is PDF mein</h3><ul>${inside(c).map((x) => `<li>${esc(x)}</li>`).join("")}<li>Print karo, pen se tick karo</li></ul></div>
    <div class="foot"><span>${pageUrl}</span><span>Instagram: @vistrow_technologies</span></div>
  </div>`;
  if (coverOnly) return `<!doctype html><html><head><meta charset="utf-8"><style>${css} body{width:210mm}</style></head><body>${cover}</body></html>`;
  return `<!doctype html><html lang="hi"><head><meta charset="utf-8"><title>Vistrow 100 Din Playbook · Day ${c.day}: ${esc(c.title)}</title><style>${css}</style></head><body>
  ${cover}
  <main class="page">
    ${c.blocks.map((b) => block(b, c)).join("")}
    <div class="cta">
      <img class="pic" src="${photo(c, 1)}">
      <div style="flex:1">
        <h2>No time to do it yourself?</h2>
        <p>Vistrow sets all of this up for your business: Google profile, reviews, website and leads.</p>
        <a class="btn" href="${esc(wa(`Day ${c.day}: ${c.title}`))}">${WA_ICON}Chat on WhatsApp: 90670 97779 →</a><div class="tap">👆 Tap the button to chat · wa.me/919067097779</div>
      </div>
      <div class="next"><b>${next ? `Next · Day ${next.day}` : "Next chapter"}</b>${next ? esc(next.title) : "Har din naya chapter"}<br><br>Follow <a href="${playbook.instagram}">@vistrow_technologies</a> taaki agla chapter miss na ho.</div>
    </div>
  </main></body></html>`;
}

// 1200x628 card for the Instagram DM flow (Instagram shows template images at ~1.91:1)
function cardHtml(c) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>${css}
  body{width:1200px;height:628px;margin:0;background:#0b0b0c;color:#fff;overflow:hidden;position:relative}
  .g{position:absolute;right:-160px;top:-200px;width:620px;height:620px;border-radius:50%;background:radial-gradient(circle,rgba(198,255,0,.35),rgba(198,255,0,0) 65%)}
  .l{position:absolute;left:64px;top:56px;height:44px}
  .k{position:absolute;left:64px;top:150px;background:#c6ff00;color:#0b0b0c;font-weight:800;font-size:22px;padding:8px 18px;border-radius:99px;letter-spacing:.05em}
  .d{position:absolute;left:60px;top:205px;font-family:Manrope;font-weight:800;font-size:150px;line-height:1;color:#c6ff00;letter-spacing:-.05em}
  .t{position:absolute;left:64px;top:375px;width:560px;font-family:Manrope;font-weight:800;font-size:44px;line-height:1.08}
  .f{position:absolute;left:64px;bottom:44px;font-size:22px;color:#aaa}
  .p{position:absolute;right:70px;top:70px;width:330px;height:466px;object-fit:cover;border-radius:10px;transform:rotate(4deg);border:6px solid #fff}
  .q{position:absolute;right:330px;top:150px;width:250px;height:330px;object-fit:cover;border-radius:8px;transform:rotate(-6deg);border:6px solid #fff}
  </style></head><body><div class="g"></div><img class="l" src="${asset("logo-dark.png")}">
  <span class="k">FREE · 100 DIN PLAYBOOK</span><div class="d">Day ${c.day}</div><div class="t">${esc(c.title)}</div>
  <div class="f">Checklist + printable PDF · vistrow.com/playbook</div>
  <img class="q" src="${photo(c, 2)}"><img class="p" src="file://${path.join(outDir, coverName(c))}"></body></html>`;
}

const meta = {};
for (const c of chapters) {
  const h = path.join(work, `day-${c.day}.html`);
  writeFileSync(h, html(c));
  const pdf = path.join(outDir, pdfName(c));
  execFileSync(CHROME, ["--headless=new", "--disable-gpu", "--allow-file-access-from-files", "--no-pdf-header-footer", `--print-to-pdf=${pdf}`, "file://" + h], { stdio: "ignore" });
  const ch = path.join(work, `cover-${c.day}.html`);
  writeFileSync(ch, html(c, true));
  // cover preview at A4 ratio (794x1123 css px)
  execFileSync(CHROME, ["--headless=new", "--disable-gpu", "--allow-file-access-from-files", "--hide-scrollbars", "--window-size=794,1123", `--screenshot=${path.join(work, "cover.png")}`, "file://" + ch], { stdio: "ignore" });
  // small JPEGs keep every page light (Next/Image resizes them again on the site)
  execFileSync("sips", ["-Z", "600", "-s", "format", "jpeg", "-s", "formatOptions", "70", path.join(work, "cover.png"), "--out", path.join(outDir, coverName(c))], { stdio: "ignore" });
  execFileSync("sips", ["-Z", "540", "-s", "formatOptions", "72", path.join(root, "assets/reel-covers", `day-${c.day}.jpg`), "--out", path.join(outDir, reelName(c))], { stdio: "ignore" });
  const kh = path.join(work, `card-${c.day}.html`);
  writeFileSync(kh, cardHtml(c));
  execFileSync(CHROME, ["--headless=new", "--disable-gpu", "--allow-file-access-from-files", "--hide-scrollbars", "--window-size=1200,628", `--screenshot=${path.join(work, "card.png")}`, "file://" + kh], { stdio: "ignore" });
  execFileSync("sips", ["-s", "format", "jpeg", "-s", "formatOptions", "78", path.join(work, "card.png"), "--out", path.join(outDir, cardName(c))], { stdio: "ignore" });
  const buf = readFileSync(pdf);
  const pages = (buf.toString("latin1").match(/\/Type\s*\/Page[^s]/g) || []).length;
  meta[c.day] = { file: `/playbook/pdf/${pdfName(c)}`, cover: `/playbook/pdf/${coverName(c)}`, reel: `/playbook/pdf/${reelName(c)}`, card: `/playbook/pdf/${cardName(c)}`, pages, kb: Math.round(statSync(pdf).size / 1024) };
  console.log(`Day ${c.day}: ${pdfName(c)} · ${pages} pages · ${meta[c.day].kb} KB`);
}
writeFileSync(path.join(root, "content/playbook-pdfs.json"), JSON.stringify(meta, null, 2) + "\n");
