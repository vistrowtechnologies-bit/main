export const blogPostsQuery = `
  *[
    _type == "blogPost" &&
    defined(slug.current) &&
    defined(title) &&
    // Scheduled posts (a future publication date) stay hidden until that day.
    (!defined(publishedAt) || publishedAt <= now())
  ] | order(publishedAt desc) {
    "slug": slug.current,
    "marketAngle": *[_type == "contentCalendarEntry" && blogPostId == ^._id][0].angle,
    title,
    excerpt,
    "keyTakeaways": coalesce(keyTakeaways, []),
    "faqs": coalesce(faqs[]{question, answer}, []),
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
      "points": select(count(points) > 0 => points),
      "image": select(defined(image.asset) => image{
        alt,
        caption,
        "url": asset->url,
        "width": asset->metadata.dimensions.width,
        "height": asset->metadata.dimensions.height
      }),
      "table": select(count(table.rows) > 0 => table{
        caption,
        "columns": coalesce(columns, []),
        "rows": rows[].cells
      }),
      "steps": select(count(steps) > 0 => steps[]{title, body})
    }, [])
  }
`;
