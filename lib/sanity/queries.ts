export const blogPostsQuery = `
  *[
    _type == "blogPost" &&
    defined(slug.current) &&
    defined(title)
  ] | order(publishedAt desc) {
    "slug": slug.current,
    title,
    excerpt,
    "category": coalesce(category, "Insights"),
    "author": coalesce(author, "Vistrow Team"),
    "date": string(publishedAt),
    "dateModified": _updatedAt,
    "readTime": coalesce(readTime, "5 min read"),
    "metaTitle": coalesce(metaTitle, title),
    "metaDescription": coalesce(metaDescription, excerpt),
    focusKeyword,
    "secondaryKeywords": coalesce(secondaryKeywords, []),
    breadcrumbTitle,
    canonicalUrl,
    "schemaType": coalesce(schemaType, "BlogPosting"),
    featuredImage{
      alt,
      "url": asset->url,
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height
    },
    openGraphTitle,
    openGraphDescription,
    openGraphImage{
      alt,
      "url": asset->url,
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height
    },
    twitterTitle,
    twitterDescription,
    twitterImage{
      alt,
      "url": asset->url,
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height
    },
    "twitterCard": coalesce(twitterCard, "summary_large_image"),
    "robotsIndex": coalesce(robotsIndex, true),
    "robotsFollow": coalesce(robotsFollow, true),
    "robotsNoArchive": coalesce(robotsNoArchive, false),
    "robotsNoImageIndex": coalesce(robotsNoImageIndex, false),
    "robotsNoSnippet": coalesce(robotsNoSnippet, false),
    "robotsMaxSnippet": coalesce(robotsMaxSnippet, -1),
    "robotsMaxVideoPreview": coalesce(robotsMaxVideoPreview, -1),
    "robotsMaxImagePreview": coalesce(robotsMaxImagePreview, "large"),
    "excludeFromSitemap": coalesce(excludeFromSitemap, false),
    redirectUrl,
    "redirectPermanent": coalesce(redirectPermanent, true),
    "sections": coalesce(sections[]{
      heading,
      "paragraphs": coalesce(paragraphs, []),
      "points": select(count(points) > 0 => points)
    }, [])
  }
`;
