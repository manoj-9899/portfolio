import { SITE_SLUGS, DOMAIN_URL } from "@/config/siteConfig"
import type { MetadataRoute } from "next"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Include only canonical public routes for Manoj Pawar's portfolio
  const allRoutes = [SITE_SLUGS.home, SITE_SLUGS.projects]

  return allRoutes.map((url) => ({
    url: DOMAIN_URL + url,
    lastModified: new Date().toISOString(),
    priority: url === "/" ? 1.0 : 0.8,
    changeFrequency: url === "/" ? "daily" : "weekly",
  }))
}
