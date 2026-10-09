export type ReviewBusiness = {
  slug: string;
  name: string;
  logoLight: string;
  googleReviewUrl: string;
};

const businesses: Record<string, ReviewBusiness> = {
  "vistrow-technologies": {
    slug: "vistrow-technologies",
    name: "Vistrow Technologies",
    logoLight: "/logo-light.png",
    googleReviewUrl: "https://g.page/r/CfHhzV3hPTDiEBM/review",
  },
};

export function getReviewBusiness(slug: string): ReviewBusiness | undefined {
  return businesses[slug];
}
