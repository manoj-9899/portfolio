import { WorkHero } from "./WorkHero"
import { ProjectsStatic } from "./ProjectsStatic"
import { RecruiterContact } from "@/app/components/RecruiterContact"
import { Metadata } from "next"
import { getProductionOrigin, getCanonicalUrl, SITE_CONFIG, SITE_SLUGS } from "@/config/siteConfig"
import { getProjectsGraph, serializeJsonLd } from "@/config/schemas"

const canonical = getCanonicalUrl(SITE_SLUGS.projects)
const productionOrigin = getProductionOrigin()

export const metadata: Metadata = {
  title: SITE_CONFIG.projectsTitle,
  description: SITE_CONFIG.projectsDescription,
  alternates: { canonical },
  openGraph: {
    type: "website",
    locale: SITE_CONFIG.locale,
    url: canonical,
    siteName: SITE_CONFIG.siteName,
    title: `${SITE_CONFIG.projectsTitle} | ${SITE_CONFIG.siteName}`,
    description: SITE_CONFIG.projectsDescription,
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.siteName} - Featured Projects`,
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.projectsTitle} | ${SITE_CONFIG.siteName}`,
    description: SITE_CONFIG.projectsDescription,
    images: [SITE_CONFIG.ogImage],
  },
}

const page = () => {
  return (
    <main className="relative z-1">
      <script
        id="jsonld-projects"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(getProjectsGraph(productionOrigin)),
        }}
      />
      <WorkHero />
      <ProjectsStatic />
      <RecruiterContact />
    </main>
  )
}

export default page
