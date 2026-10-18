import { getProductionOrigin } from "@/config/siteConfig"
import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const origin = getProductionOrigin()

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/serbyte-dev-credit", "/bespoke-hero.html"],
      },
    ],
    sitemap: `${origin}/sitemap.xml`,
  }
}
