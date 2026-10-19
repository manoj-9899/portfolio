import { getProductionOrigin, SITE_SLUGS } from "@/config/siteConfig"
import { getPublishedArticles } from "@/app/data/articles"
import type { MetadataRoute } from "next"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const origin = getProductionOrigin()
  const publishedArticles = getPublishedArticles()
  const latestArticleDate = publishedArticles[0]?.dateISO || "2026-10-19"

  // Stable dates reflecting real content updates rather than ephemeral build timestamps
  const routeModDates: Record<string, string> = {
    [SITE_SLUGS.home]: new Date(latestArticleDate).toISOString(),
    [SITE_SLUGS.articles]: new Date(latestArticleDate).toISOString(),
    [SITE_SLUGS.projects]: new Date("2026-01-01").toISOString(),
  }

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${origin}`,
      lastModified: routeModDates[SITE_SLUGS.home],
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${origin}${SITE_SLUGS.projects}`,
      lastModified: routeModDates[SITE_SLUGS.projects],
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${origin}${SITE_SLUGS.articles}`,
      lastModified: routeModDates[SITE_SLUGS.articles],
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
  ]

  const articleRoutes: MetadataRoute.Sitemap = publishedArticles.map((article) => ({
    url: `${origin}/articles/${article.slug}`,
    lastModified: new Date(article.dateISO).toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...articleRoutes]
}
