import { siteUrl } from "@/lib/seo";

// IndexNow tells Bing, Yandex, Seznam and other participating engines about changed URLs straight away.
// The key is public by design: search engines verify it by fetching /813963aa8fbbe60dc36530b6b16a54b0.txt from this site.
export const INDEXNOW_KEY = "813963aa8fbbe60dc36530b6b16a54b0";

export async function submitToIndexNow(urls: string[]): Promise<string> {
  if (urls.length === 0) return "IndexNow: nothing to submit.";
  const host = new URL(siteUrl).host;
  const response = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host,
      key: INDEXNOW_KEY,
      keyLocation: `${siteUrl}/${INDEXNOW_KEY}.txt`,
      urlList: urls.slice(0, 10_000),
    }),
    signal: AbortSignal.timeout(20_000),
  });
  // 200 and 202 both mean accepted.
  return response.ok ? `IndexNow: submitted ${urls.length} URL(s) (${response.status}).` : `IndexNow failed: ${response.status} ${await response.text()}`;
}
