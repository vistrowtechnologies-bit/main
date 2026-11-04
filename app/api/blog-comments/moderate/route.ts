import { NextResponse } from "next/server";
import { getSanityWriteClient } from "@/lib/sanity/write-client";
import { validSignature } from "@/lib/blog-comments";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Opened from the link in the moderation email. The signature ties the link to one comment and one action.
export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const id = params.get("id") || "";
  const action = params.get("action");
  const sig = params.get("sig") || "";
  if ((action !== "approve" && action !== "reject") || !id || !validSignature(id, action, sig)) {
    return page("This link is not valid.", 403);
  }
  try {
    const client = getSanityWriteClient();
    const doc = await client.fetch(`*[_id==$id && _type=="blogComment"][0]{postSlug}`, { id });
    if (!doc) return page("Comment not found.", 404);
    await client.patch(id).set({ status: action === "approve" ? "approved" : "rejected" }).commit();
    return page(action === "approve" ? "Approved. It is now live on the post." : "Rejected. It will not be shown.");
  } catch (error) {
    console.error("Comment moderation failed", error);
    return page("Something went wrong. Try again.", 500);
  }
}

function page(message: string, status = 200) {
  return new NextResponse(
    `<!doctype html><meta name="viewport" content="width=device-width,initial-scale=1"><body style="font-family:Helvetica,Arial,sans-serif;display:grid;place-items:center;min-height:100vh;margin:0"><p style="font-size:18px">${message}</p>`,
    { status, headers: { "Content-Type": "text/html; charset=utf-8", "X-Robots-Tag": "noindex" } },
  );
}
