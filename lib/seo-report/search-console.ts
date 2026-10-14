import { createSign } from "node:crypto";

// Minimal Search Console API client using a Google Cloud service account (no extra dependency).
// The service account's email must be added as a user on the Search Console property.

type ServiceAccount = { client_email: string; private_key: string };

export type SearchRow = { keys: string[]; clicks: number; impressions: number; ctr: number; position: number };

function readServiceAccount(): ServiceAccount {
  const raw = process.env.GSC_SERVICE_ACCOUNT_JSON;
  if (!raw) throw new Error("GSC_SERVICE_ACCOUNT_JSON is not configured");
  // Accept the JSON key file as-is or base64-encoded (easier to paste into Vercel).
  const json = raw.trim().startsWith("{") ? raw : Buffer.from(raw, "base64").toString("utf8");
  const account = JSON.parse(json) as ServiceAccount;
  if (!account.client_email || !account.private_key) throw new Error("GSC_SERVICE_ACCOUNT_JSON is missing client_email or private_key");
  return account;
}

async function getAccessToken(): Promise<string> {
  const account = readServiceAccount();
  const now = Math.floor(Date.now() / 1000);
  const encode = (value: object) => Buffer.from(JSON.stringify(value)).toString("base64url");
  const unsigned = `${encode({ alg: "RS256", typ: "JWT" })}.${encode({
    iss: account.client_email,
    // Read/write scope: reading reports plus resubmitting the sitemap (needs Full permission in Search Console).
    scope: "https://www.googleapis.com/auth/webmasters",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  })}`;
  const signature = createSign("RSA-SHA256").update(unsigned).sign(account.private_key).toString("base64url");

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${unsigned}.${signature}` }),
    signal: AbortSignal.timeout(20_000),
  });
  if (!response.ok) throw new Error(`Google token request failed: ${response.status} ${await response.text()}`);
  const data = (await response.json()) as { access_token?: string };
  if (!data.access_token) throw new Error("Google token response had no access_token");
  return data.access_token;
}

export async function querySearchAnalytics(input: {
  siteUrl: string;
  startDate: string;
  endDate: string;
  dimensions: ("query" | "page")[];
  rowLimit?: number;
}): Promise<SearchRow[]> {
  const token = await getAccessToken();
  const response = await fetch(
    `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(input.siteUrl)}/searchAnalytics/query`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        startDate: input.startDate,
        endDate: input.endDate,
        dimensions: input.dimensions,
        rowLimit: input.rowLimit ?? 1000,
        type: "web",
      }),
      signal: AbortSignal.timeout(30_000),
    },
  );
  if (!response.ok) throw new Error(`Search Console query failed: ${response.status} ${await response.text()}`);
  const data = (await response.json()) as { rows?: SearchRow[] };
  return data.rows ?? [];
}

// Asks Google to re-read the sitemap. Google's supported way to flag updated pages for normal sites
// (its Indexing API is limited to job postings and livestreams).
export async function submitSitemap(siteUrl: string, sitemapUrl: string): Promise<void> {
  const token = await getAccessToken();
  const response = await fetch(
    `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/sitemaps/${encodeURIComponent(sitemapUrl)}`,
    { method: "PUT", headers: { Authorization: `Bearer ${token}` }, signal: AbortSignal.timeout(20_000) },
  );
  if (!response.ok) throw new Error(`Sitemap submit failed: ${response.status} ${await response.text()}`);
}
