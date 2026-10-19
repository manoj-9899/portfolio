import { getProductionOrigin, PUBLIC_INDEXABLE_ROUTES } from "@/config/siteConfig"
import { getPublishedArticles } from "@/app/data/articles"
import type { MetadataRoute } from "next"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const origin = getProductionOrigin()
  const lastModified = new Date().toISOString()

  const staticRoutes: MetadataRoute.Sitemap = PUBLIC_INDEXABLE_ROUTES.map((route) => ({
    url: `${origin}${route === "/" ? "" : route}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: route === "/" ? 1.0 : 0.8,
  }))

  const articleRoutes: MetadataRoute.Sitemap = getPublishedArticles().map((article) => ({
    url: `${origin}/articles/${article.slug}`,
    lastModified: new Date(article.dateISO).toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...articleRoutes]
}
