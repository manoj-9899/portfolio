import { FooterV2 } from "./components/Footer/FooterV2"
import localFont from "next/font/local"
import "./globalsV2.css"
import { Metadata } from "next"
import { getProductionOrigin, SITE_CONFIG, PERSONAL_INFO } from "@/config/siteConfig"
import { TopBarV2 } from "./components/TopBar/TopBarV2"
import { MotionWrapper } from "./utils/lazy-ui"
import { bodyAttributes } from "@zero-ui/attributes"
import { ViewTransitions } from "./utils/ViewTransition"
import { getSiteGraph, serializeJsonLd } from "@/config/schemas"

const switzer = localFont({
  src: "./fonts/Switzer-Variable.woff2",
  variable: "--font-switzer",
  display: "swap",
  style: "normal",
  weight: "300 400 500 600 700",
  fallback: ["helvetica", "sans-serif"],
  preload: true,
})

const productionOrigin = getProductionOrigin()

export const metadata: Metadata = {
  metadataBase: new URL(productionOrigin),
  title: {
    default: SITE_CONFIG.defaultTitle,
    template: SITE_CONFIG.titleTemplate,
  },
  description: SITE_CONFIG.description,
  applicationName: SITE_CONFIG.siteName,
  authors: [{ name: SITE_CONFIG.fullName, url: PERSONAL_INFO.profiles.github }],
  creator: SITE_CONFIG.fullName,
  publisher: SITE_CONFIG.fullName,
  keywords: [...SITE_CONFIG.keywords],
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: SITE_CONFIG.locale,
    url: productionOrigin,
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
    creator: SITE_CONFIG.siteName,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body {...bodyAttributes} className="relative min-w-[300px] bg-white" data-mobile-menu="closed" data-scrolled="up">
        <MotionWrapper>
          <ViewTransitions />

          <div className="custom:mx-auto xxs:mx-3.5 pointer-events-none absolute inset-0 z-1 max-w-6xl [background-image:url('/assets/framer-noise.png')] bg-size-[128px] bg-repeat opacity-6 md:mx-5 lg:mx-8" />
          <div className={`${switzer.variable} font-switzer subpixel-antialiased`}>
            <div className="custom:mx-auto xxs:border-x pointer-events-none absolute inset-0 z-0 mx-3.5 max-w-6xl border-gray-200 md:mx-5 lg:mx-8" />
            <TopBarV2 />
            {children}

            <script
              id="jsonld-site"
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: serializeJsonLd(getSiteGraph(productionOrigin)),
              }}
            />
            <FooterV2 />
          </div>
        </MotionWrapper>
      </body>
    </html>
  )
}

export default RootLayout
