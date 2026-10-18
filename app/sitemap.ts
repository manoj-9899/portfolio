import { getProductionOrigin, PUBLIC_INDEXABLE_ROUTES } from "@/config/siteConfig"
import type { MetadataRoute } from "next"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const origin = getProductionOrigin()

  // When the production domain is unconfigured, avoid emitting placeholder, localhost, or outdated domains
  if (!origin) {
    return []
  }

  const lastModified = new Date().toISOString()

  return PUBLIC_INDEXABLE_ROUTES.map((route) => ({
    url: `${origin}${route === "/" ? "" : route}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: route === "/" ? 1.0 : 0.8,
  }))
}
