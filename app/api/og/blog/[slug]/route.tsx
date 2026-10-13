import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getBlogPost } from "@/lib/sanity/blog";

export const runtime = "nodejs";
export const revalidate = 60;

const assets = Promise.all([
  readFile(join(process.cwd(), "public/logo-dark.png")),
  readFile(join(process.cwd(), "public/fonts/manrope-bold.ttf")),
]);

// The branded cover used for social shares, search snippets and article schema: Vistrow branding,
// the title, and the post's first real in-article image (or its featured image) as proof.
export async function GET(
  _request: Request,
  { params }: { params: { slug: string } },
) {
  const post = await getBlogPost(params.slug);
  if (!post) return new Response("Article not found", { status: 404 });

  const [logo, font] = await assets;
  const title = post.title.trim();
  const sourceImage = post.sections.find((section) => section.image?.url)?.image?.url ?? post.featuredImage?.url;
  // Satori can't decode WebP, so ask the Sanity CDN for a cropped JPEG at the frame size.
  const visual = sourceImage?.startsWith("https://cdn.sanity.io/")
    ? `${sourceImage}?w=880&h=1000&fit=crop&fm=jpg&q=85`
    : undefined;
  const fontSize = visual
    ? title.length > 90 ? 40 : title.length > 60 ? 46 : 54
    : title.length > 120 ? 48 : title.length > 70 ? 56 : 66;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#0D0D0D",
          color: "#FFFFFF",
          fontFamily: "Manrope",
          fontWeight: 700,
          position: "relative",
        }}
      >
        {/* Brand glow and grid texture */}
        <div style={{ position: "absolute", right: -160, top: -160, width: 520, height: 520, borderRadius: 520, background: "rgba(198,255,0,0.14)", display: "flex" }} />
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 14, background: "#C6FF00", display: "flex" }} />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: visual ? 690 : 1200,
            padding: "52px 40px 44px 70px",
          }}
        >
          {/* Embedded assets keep social crawlers independent of external font requests. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`data:image/png;base64,${logo.toString("base64")}`} width={220} height={68} alt="Vistrow Technologies" />
          <div style={{ display: "flex", marginTop: 40 }}>
            <div
              style={{
                display: "flex",
                padding: "8px 18px",
                borderRadius: 999,
                background: "#C6FF00",
                color: "#0D0D0D",
                fontSize: 20,
                letterSpacing: 1,
                textTransform: "uppercase",
              }}
            >
              {post.category}
            </div>
          </div>
          <div style={{ display: "flex", flex: 1, alignItems: "center", fontSize, lineHeight: 1.14, letterSpacing: -1 }}>
            {title}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 19, color: "#A7ADB8" }}>
            <span>AI-powered marketing &amp; automation · Pune</span>
            {!visual && <span style={{ color: "#C6FF00" }}>vistrow.com</span>}
          </div>
        </div>

        {visual && (
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: 510, padding: "44px 48px 44px 0" }}>
            <div
              style={{
                display: "flex",
                borderRadius: 26,
                overflow: "hidden",
                border: "3px solid #C6FF00",
                boxShadow: "0 30px 80px rgba(0,0,0,0.55)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={visual} width={456} height={518} alt="" style={{ objectFit: "cover" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 18, fontSize: 19, color: "#C6FF00" }}>vistrow.com</div>
          </div>
        )}
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
