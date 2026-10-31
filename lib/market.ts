// Which market a visitor is browsing: India (default), US or UK. Market pages live under /us and /uk. The market is
// remembered for the session so the Growth Audit form can start with the right country and currency.
export type Market = "IN" | "US" | "UK";

export function marketFromPath(pathname: string | null | undefined): Market {
  if (pathname === "/us" || pathname?.startsWith("/us/")) return "US";
  if (pathname === "/uk" || pathname?.startsWith("/uk/")) return "UK";
  return "IN";
}

const KEY = "vistrow-market";

export function rememberMarket(pathname: string | null | undefined) {
  const market = marketFromPath(pathname);
  if (market === "IN") return;
  try {
    sessionStorage.setItem(KEY, market);
  } catch {
    /* storage can be blocked; the form then falls back to India */
  }
}

export function readMarket(): Market {
  try {
    const value = sessionStorage.getItem(KEY);
    if (value === "US" || value === "UK") return value;
  } catch {
    /* ignore */
  }
  return "IN";
}

export const countries = ["India", "United States", "United Kingdom", "Canada", "Australia", "Other"] as const;
export const countryForMarket = (m: Market) => (m === "US" ? "United States" : m === "UK" ? "United Kingdom" : "India");

// Monthly marketing budget ranges in the visitor's own currency.
export function budgetsFor(country: string): string[] {
  if (country === "India") return ["< ₹50k / month", "₹50k–₹1L / month", "₹1L–₹3L / month", "₹3L–₹10L / month", "₹10L+ / month"];
  if (country === "United Kingdom") return ["< £1k / month", "£1k–£3k / month", "£3k–£8k / month", "£8k–£20k / month", "£20k+ / month"];
  return ["< $1k / month", "$1k–$3k / month", "$3k–$10k / month", "$10k–$25k / month", "$25k+ / month"];
}
