import type { Metadata } from "next";
import { notFound, permanentRedirect, redirect } from "next/navigation";
import { BlogPostPage } from "@/components/templates/blog-post-page";
import { buildMetadata, siteUrl } from "@/lib/seo";
import { getBlogPost, getBlogPosts } from "@/lib/sanity/blog";

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getBlogPost(params.slug);
  if (!post) return {};
  const brandedImage = {
    url: `${siteUrl}/api/og/blog/${encodeURIComponent(post.slug)}`,
    width: 1200,
    height: 630,
    alt: `${post.title} | Vistrow Insights`,
  };
  // Existing posts sometimes copied their featured image into social fields.
  const openGraphImage = post.openGraphImage?.url && post.openGraphImage.url !== post.featuredImage?.url
    ? post.openGraphImage
    : brandedImage;
  const twitterImage = post.twitterImage?.url && post.twitterImage.url !== post.featuredImage?.url
    ? post.twitterImage
    : openGraphImage;
  const metadata = buildMetadata({
    title: post.metaTitle,
    description: post.metaDescription,
    path: `/blog/${post.slug}`,
    canonicalUrl: post.canonicalUrl,
    keywords: [post.focusKeyword, ...(post.secondaryKeywords || [])].filter(
      (keyword): keyword is string => Boolean(keyword),
    ),
    openGraph: {
      title: post.openGraphTitle,
      description: post.openGraphDescription,
      image: openGraphImage,
    },
    twitter: {
      title: post.twitterTitle,
      description: post.twitterDescription,
      image: twitterImage,
      card: post.twitterCard,
    },
    robots: {
      index: post.robotsIndex,
      follow: post.robotsFollow,
      noarchive: post.robotsNoArchive,
      noimageindex: post.robotsNoImageIndex,
      nosnippet: post.robotsNoSnippet,
      maxSnippet: post.robotsMaxSnippet,
      maxVideoPreview: post.robotsMaxVideoPreview,
      maxImagePreview: post.robotsMaxImagePreview,
    },
    article: {
      publishedTime: post.date,
      modifiedTime: post.dateModified,
      section: post.category,
    },
  });
  // Long titles get cut off in search results once the " | Vistrow" suffix is added.
  if (`${post.metaTitle} | Vistrow`.length > 60) metadata.title = { absolute: post.metaTitle };
  return metadata;
}

export default async function Page({ params }: { params: { slug: string } }) {
  const [post, blogPosts] = await Promise.all([
    getBlogPost(params.slug),
    getBlogPosts(),
  ]);
  if (!post) notFound();
  if (post.redirectUrl) {
    if (post.redirectPermanent === false) redirect(post.redirectUrl);
    permanentRedirect(post.redirectUrl);
  }
  const morePosts = blogPosts
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => {
      const aRelated = a.category === post.category ? 1 : 0;
      const bRelated = b.category === post.category ? 1 : 0;
      if (aRelated !== bRelated) return bRelated - aRelated;
      return a.date < b.date ? 1 : -1;
    })
    .slice(0, 3);
  return <BlogPostPage post={post} morePosts={morePosts} allPosts={blogPosts} />;
}
