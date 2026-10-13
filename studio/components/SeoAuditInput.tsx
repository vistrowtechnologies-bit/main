import { Badge, Box, Card, Flex, Grid, Stack, Text } from "@sanity/ui";
import { useFormValue, type StringInputProps } from "sanity";
import { countVisuals, visualProblems } from "../schemaTypes/blogVisuals";

type SlugValue = { current?: string };
type SectionValue = { heading?: string; paragraphs?: string[]; image?: { asset?: unknown }; table?: { rows?: unknown[] }; steps?: unknown[] };

function asText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function includesPhrase(value: string, phrase: string) {
  return Boolean(phrase) && value.toLowerCase().includes(phrase.toLowerCase());
}

export function SeoAuditInput(_: StringInputProps) {
  const title = asText(useFormValue(["title"]));
  const slug = (useFormValue(["slug"]) || {}) as SlugValue;
  const excerpt = asText(useFormValue(["excerpt"]));
  const focusKeyword = asText(useFormValue(["focusKeyword"]));
  const metaTitle = asText(useFormValue(["metaTitle"]));
  const metaDescription = asText(useFormValue(["metaDescription"]));
  const canonicalUrl = asText(useFormValue(["canonicalUrl"]));
  const openGraphTitle = asText(useFormValue(["openGraphTitle"]));
  const openGraphDescription = asText(useFormValue(["openGraphDescription"]));
  const openGraphImage = useFormValue(["openGraphImage"]);
  const featuredImage = useFormValue(["featuredImage"]) as { asset?: unknown } | undefined;
  const createdAt = useFormValue(["_createdAt"]) as string | undefined;
  const sections = (useFormValue(["sections"]) || []) as SectionValue[];
  const body = sections
    .flatMap((section) => section.paragraphs || [])
    .join(" ")
    .trim();
  const wordCount = body ? body.split(/\s+/).length : 0;
  const keywordWords = focusKeyword ? focusKeyword.split(/\s+/).length : 0;
  const keywordMentions = focusKeyword
    ? body.toLowerCase().split(focusKeyword.toLowerCase()).length - 1
    : 0;
  const keywordDensity = wordCount
    ? (keywordMentions * keywordWords * 100) / wordCount
    : 0;
  const slugContainsKeyword = includesPhrase(
    (slug.current || "").replace(/-/g, " "),
    focusKeyword,
  );
  const hasSubheading = sections.some((section) => Boolean(section.heading));
  const canonicalIsValid = !canonicalUrl || /^https:\/\//i.test(canonicalUrl);

  const visuals = countVisuals(sections);
  const visualIssues = visualProblems({ _createdAt: createdAt, sections, featuredImage });

  const checks = [
    {
      label: `Real visuals in the article: ${visuals.images} image(s), ${visuals.tables} table(s), ${visuals.diagrams} diagram(s) - needs 1+ image and 3+ visuals, plus a featured image`,
      pass: Boolean(featuredImage?.asset) && visuals.images >= 1 && visuals.total >= 3,
      weight: 20,
    },
    { label: "Focus keyword selected", pass: Boolean(focusKeyword), weight: 10 },
    { label: "Keyword appears in article title", pass: includesPhrase(title, focusKeyword), weight: 10 },
    { label: "Keyword appears in SEO title", pass: includesPhrase(metaTitle, focusKeyword), weight: 10 },
    { label: "Keyword appears in SEO description", pass: includesPhrase(metaDescription, focusKeyword), weight: 10 },
    { label: "Keyword appears in URL slug", pass: slugContainsKeyword, weight: 10 },
    { label: "SEO title is 30 to 60 characters", pass: metaTitle.length >= 30 && metaTitle.length <= 60, weight: 10 },
    { label: "SEO description is 120 to 160 characters", pass: metaDescription.length >= 120 && metaDescription.length <= 160, weight: 10 },
    { label: "Article contains at least 300 words", pass: wordCount >= 300, weight: 10 },
    { label: "Article uses descriptive subheadings", pass: hasSubheading, weight: 5 },
    { label: "Social title, description, and image added", pass: Boolean(openGraphTitle && openGraphDescription && openGraphImage), weight: 5 },
    { label: "Canonical URL is blank or secure", pass: canonicalIsValid, weight: 5 },
    { label: "Keyword density is between 0.5% and 2.5%", pass: keywordDensity >= 0.5 && keywordDensity <= 2.5, weight: 5 },
  ];
  const maxScore = checks.reduce((total, check) => total + check.weight, 0);
  const score = Math.round((checks.reduce((total, check) => total + (check.pass ? check.weight : 0), 0) * 100) / maxScore);
  const tone = score >= 80 ? "positive" : score >= 60 ? "caution" : "critical";
  const previewTitle = metaTitle || title || "Your SEO title will appear here";
  const previewDescription = metaDescription || excerpt || "Add an SEO description to preview how this page may appear in search results.";
  const previewUrl = canonicalUrl || `https://vistrow.com/blog/${slug.current || "your-post-slug"}`;

  return (
    <Stack space={4}>
      <Card padding={4} radius={2} border tone={tone}>
        <Flex align="center" justify="space-between" gap={3}>
          <Stack space={2}>
            <Text size={1} weight="semibold">SEO score</Text>
            <Text size={1} muted>{wordCount} words · {keywordDensity.toFixed(1)}% keyword density</Text>
          </Stack>
          <Badge tone={tone} fontSize={2} padding={3} radius={2}>{score}/100</Badge>
        </Flex>
      </Card>

      <Card padding={4} radius={2} border>
        <Stack space={3}>
          <Text size={1} weight="semibold">Google preview</Text>
          <Text size={1} style={{ color: "#188038" }}>{previewUrl}</Text>
          <Text size={3} weight="medium" style={{ color: "#8ab4f8" }}>{previewTitle}</Text>
          <Text size={1} muted>{previewDescription}</Text>
          <Flex gap={3} wrap="wrap">
            <Badge tone={metaTitle.length > 60 ? "critical" : "default"}>{metaTitle.length}/60 title characters</Badge>
            <Badge tone={metaDescription.length > 160 ? "critical" : "default"}>{metaDescription.length}/160 description characters</Badge>
          </Flex>
        </Stack>
      </Card>

      {slug.current && (
        <Card padding={4} radius={2} border>
          <Stack space={3}>
            <Text size={1} weight="semibold">Branded cover (used for Google, WhatsApp, LinkedIn and X)</Text>
            <Text size={1} muted>Built automatically from the title, category and the first in-article image (or the featured image). Updates about a minute after publishing.</Text>
            <img
              src={`https://www.vistrow.com/api/og/blog/${encodeURIComponent(slug.current)}`}
              alt="Branded cover preview"
              style={{ width: "100%", maxWidth: 600, borderRadius: 6, border: "1px solid rgba(128,128,128,0.3)" }}
            />
          </Stack>
        </Card>
      )}

      {visualIssues.length > 0 && (
        <Card padding={4} radius={2} border tone="critical">
          <Stack space={3}>
            <Text size={1} weight="semibold">Can't publish yet: visuals needed</Text>
            {visualIssues.map((issue) => (
              <Text key={issue} size={1}>{issue}</Text>
            ))}
          </Stack>
        </Card>
      )}

      <Box>
        <Text size={1} weight="semibold">SEO checklist</Text>
        <Grid columns={[1, 1, 2]} gap={2} marginTop={3}>
          {checks.map((check) => (
            <Card key={check.label} padding={3} radius={2} border>
              <Flex align="flex-start" gap={3}>
                <Badge tone={check.pass ? "positive" : "critical"}>
                  {check.pass ? "Pass" : "Fix"}
                </Badge>
                <Text size={1}>{check.label}</Text>
              </Flex>
            </Card>
          ))}
        </Grid>
      </Box>
    </Stack>
  );
}
