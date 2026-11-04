import { NextResponse } from "next/server";
import { getSanityWriteClient } from "@/lib/sanity/write-client";
import { commentSignature } from "@/lib/blog-comments";
import { siteUrl } from "@/lib/seo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const requestLog = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 3;
const slugRe = /^[a-z0-9-]{1,200}$/;
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function GET(request: Request) {
  const slug = new URL(request.url).searchParams.get("slug") || "";
  if (!slugRe.test(slug)) return NextResponse.json({ comments: [] });
  try {
    const comments = await getSanityWriteClient().fetch(
      `*[_type=="blogComment" && postSlug==$slug && status=="approved"] | order(createdAt asc){_id, name, comment, createdAt}`,
      { slug },
    );
    return NextResponse.json({ comments }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ comments: [] });
  }
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many comments. Please wait a few minutes." }, { status: 429 });
  }

  let data: Record<string, unknown>;
  try {
    data = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  // Same quiet bot checks as the contact form: answer "ok" so bots learn nothing.
  if (data._gotcha || (typeof data._elapsed === "number" && data._elapsed < 3000)) {
    return NextResponse.json({ ok: true });
  }

  const slug = clean(data.slug, 200);
  const name = clean(data.name, 80);
  const email = clean(data.email, 160).toLowerCase();
  const comment = clean(data.comment, 2000);

  if (!slugRe.test(slug)) return NextResponse.json({ error: "Unknown post." }, { status: 400 });
  if (!name) return NextResponse.json({ error: "Please add your name." }, { status: 400 });
  if (email && !emailRe.test(email)) return NextResponse.json({ error: "That email doesn't look right." }, { status: 400 });
  if (comment.length < 3) return NextResponse.json({ error: "Please write a comment." }, { status: 400 });
  if ((comment.match(/https?:\/\//g) || []).length > 1) {
    return NextResponse.json({ error: "Please keep to one link at most." }, { status: 400 });
  }

  let id: string;
  try {
    const client = getSanityWriteClient();
    const post = await client.fetch(`*[_type=="blogPost" && slug.current==$slug][0]{title}`, { slug });
    if (!post) return NextResponse.json({ error: "Unknown post." }, { status: 400 });
    const created = await client.create({
      _type: "blogComment",
      postSlug: slug,
      postTitle: post.title,
      name,
      email,
      comment,
      status: "pending",
      createdAt: new Date().toISOString(),
    });
    id = created._id;
    await notify({ id, slug, title: post.title, name, email, comment });
  } catch (error) {
    console.error("Blog comment failed", error);
    return NextResponse.json({ error: "We couldn't save your comment right now." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

async function notify(c: { id: string; slug: string; title: string; name: string; email: string; comment: string }) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL || "hello@vistrow.com";
  if (!apiKey || !from) return;
  const link = (action: "approve" | "reject") =>
    `${siteUrl}/api/blog-comments/moderate?id=${encodeURIComponent(c.id)}&action=${action}&sig=${commentSignature(c.id, action)}`;
  const html = `<div style="font-family:Helvetica,Arial,sans-serif;font-size:14px;color:#0D0D0D;line-height:1.55">
<p><strong>New comment on:</strong> <a href="${siteUrl}/blog/${c.slug}">${esc(c.title)}</a></p>
<p><strong>${esc(c.name)}</strong>${c.email ? ` (${esc(c.email)})` : ""}</p>
<blockquote style="margin:0;padding:10px 14px;border-left:3px solid #C6FF00;background:#F7F8FA">${esc(c.comment).replace(/\n/g, "<br>")}</blockquote>
<p><a href="${link("approve")}" style="background:#C6FF00;color:#0D0D0D;padding:10px 18px;border-radius:999px;text-decoration:none;font-weight:700">Approve</a>
&nbsp; <a href="${link("reject")}" style="color:#6B7280">Reject</a></p></div>`;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `New blog comment: ${c.title}`,
      text: `${c.name}${c.email ? ` (${c.email})` : ""} on ${c.title}\n\n${c.comment}\n\nApprove: ${link("approve")}\nReject: ${link("reject")}`,
      html,
    }),
  });
  if (!res.ok) console.error("Comment email failed", res.status, await res.text());
}

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function esc(value: string) {
  return value.replace(/[&<>'"]/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[ch] || ch);
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const current = requestLog.get(ip);
  if (!current || current.resetAt <= now) {
    requestLog.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  current.count += 1;
  return current.count > MAX_REQUESTS;
}
