import { getProductionOrigin } from "@/config/siteConfig"
import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const origin = getProductionOrigin()

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/serbyte-dev-credit"],
      },
    ],
    ...(origin ? { sitemap: `${origin}/sitemap.xml` } : {}),
  }
}
