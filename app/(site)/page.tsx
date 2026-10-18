import { HeroV2 } from "../components/HeroV2"
import { ProjectsSection } from "../components/ProjectsSection"
import { AboutSectionV2 } from "../components/AboutSectionV2"
import { ServicesSectionV2 } from "../components/ServicesSectionV2"
import { RecruiterContact } from "../components/RecruiterContact"
import { Metadata } from "next"
import { getProductionOrigin, getCanonicalUrl, SITE_CONFIG } from "@/config/siteConfig"
import { getHomeGraph, serializeJsonLd } from "@/config/schemas"

const canonical = getCanonicalUrl("/")
const productionOrigin = getProductionOrigin()

export const metadata: Metadata = {
  title: {
    absolute: SITE_CONFIG.defaultTitle,
  },
  description: SITE_CONFIG.description,
  alternates: { canonical },
  openGraph: {
    type: "website",
    locale: SITE_CONFIG.locale,
    url: canonical,
    siteName: SITE_CONFIG.siteName,
    title: SITE_CONFIG.defaultTitle,
    description: SITE_CONFIG.description,
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.ogImageAlt,
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.defaultTitle,
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.ogImage],
  },
}

const PortfolioPage: React.FC = () => {
  return (
    <main className="overflow-hidden">
      <script
        id="jsonld-home"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(getHomeGraph(productionOrigin)),
        }}
      />
      <HeroV2 />
      <div className="border-b border-gray-200" />
      <ProjectsSection />
      <AboutSectionV2 />
      <ServicesSectionV2 />
      <RecruiterContact />
    </main>
  )
}

export default PortfolioPage
