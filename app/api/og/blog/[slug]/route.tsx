import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getBlogPost } from "@/lib/sanity/blog";

export const runtime = "nodejs";
export const revalidate = 60;

const assets = Promise.all([
  readFile(join(process.cwd(), "public/logo-light.png")),
  readFile(join(process.cwd(), "public/fonts/manrope-bold.ttf")),
]);

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } },
) {
  const post = await getBlogPost(params.slug);
  if (!post) return new Response("Article not found", { status: 404 });

  const [logo, font] = await assets;
  const title = post.title.trim();
  const fontSize = title.length > 140 ? 46 : title.length > 80 ? 54 : 64;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "48px 64px",
          background: "#ffffff",
          color: "#0D0D0D",
          fontFamily: "Manrope",
          fontWeight: 700,
          borderLeft: "12px solid #C6FF00",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Embedded assets keep social crawlers independent of external image/font requests. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`data:image/png;base64,${logo.toString("base64")}`}
            width={300}
            height={87}
            alt="Vistrow Technologies"
          />
          <div style={{ display: "flex", maxWidth: 470, fontSize: 21, color: "#4E6700" }}>
            {post.category}
          </div>
        </div>
        <div style={{ display: "flex", marginTop: 46, fontSize: 18, color: "#6B7280" }}>
          VISTROW INSIGHTS
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flex: 1,
            fontSize,
            lineHeight: 1.16,
            letterSpacing: 0,
            overflowWrap: "anywhere",
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "2px solid #E5E7EB",
            paddingTop: 24,
            fontSize: 18,
            color: "#6B7280",
          }}
        >
          <span>Digital marketing. Connected systems. Measurable growth.</span>
          <span style={{ color: "#0D0D0D" }}>vistrow.com | 9067097779</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [{ name: "Manrope", data: font, style: "normal", weight: 700 }],
      headers: { "Cache-Control": "public, max-age=60, s-maxage=60" },
    },
  );
}
