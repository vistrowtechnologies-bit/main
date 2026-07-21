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
    "readTime": coalesce(readTime, "5 min read"),
    "metaTitle": coalesce(metaTitle, title),
    "metaDescription": coalesce(metaDescription, excerpt),
    "sections": coalesce(sections[]{
      heading,
      "paragraphs": coalesce(paragraphs, []),
      "points": select(count(points) > 0 => points)
    }, [])
  }
`;
