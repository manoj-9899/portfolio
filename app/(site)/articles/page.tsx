import { Metadata } from "next"
import Link from "next/link"
import { getPublishedArticles } from "@/app/data/articles"
import { AnimatedElement } from "@/app/components/ui/AnimatedElement"
import { Icon } from "@/app/components/Icon"
import { RecruiterContact } from "@/app/components/RecruiterContact"
import { getProductionOrigin, getCanonicalUrl, SITE_CONFIG, SITE_SLUGS } from "@/config/siteConfig"
import { getArticlesGraph, serializeJsonLd } from "@/config/schemas"

const canonical = getCanonicalUrl(SITE_SLUGS.articles)
const productionOrigin = getProductionOrigin()

export const metadata: Metadata = {
  title: SITE_CONFIG.articlesTitle,
  description: SITE_CONFIG.articlesDescription,
  alternates: { canonical },
  openGraph: {
    type: "website",
    locale: SITE_CONFIG.locale,
    url: canonical,
    siteName: SITE_CONFIG.siteName,
    title: `${SITE_CONFIG.articlesTitle} | ${SITE_CONFIG.siteName}`,
    description: SITE_CONFIG.articlesDescription,
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.siteName} - Technical Articles`,
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.articlesTitle} | ${SITE_CONFIG.siteName}`,
    description: SITE_CONFIG.articlesDescription,
    images: [SITE_CONFIG.ogImage],
  },
}

export default function ArticlesPage() {
  const articles = getPublishedArticles()

  return (
    <main className="relative z-1">
      <script
        id="jsonld-articles"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(getArticlesGraph(productionOrigin)),
        }}
      />
      {/* Editorial Header */}
      <div className="inside-container-large">
        <div className="flex flex-col items-center gap-6 max-md:px-5.5">
          <h1 className="xs:text-5xl relative z-5 text-center text-4xl leading-none font-medium tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
            <AnimatedElement element="span" offsetPx={20} fadeDirection="left" className="inline-block">
              Technical
            </AnimatedElement>{" "}
            <br />
            <AnimatedElement element="span" offsetPx={40} delay={0.2} fadeDirection="top" className="inline-block">
              Journal & Notes
            </AnimatedElement>
          </h1>
          <AnimatedElement
            element="p"
            delay={0.6}
            className="max-w-md text-center text-sm leading-tight tracking-tight text-slate-700 sm:text-base md:max-w-lg"
          >
            A collection of technical writing, system design investigations, and engineering breakdowns spanning post-quantum cryptography, local-first
            software, and high-performance web platforms.
          </AnimatedElement>
        </div>
      </div>

      {/* Complete Articles Index */}
      <section className="inside-container -mt-8 pt-0 pb-16 sm:pb-24">
        <div className="divide-y divide-gray-200 border-y border-gray-200">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="group block rounded-xl py-6 transition-colors duration-200 hover:bg-slate-50/70 sm:-mx-4 sm:px-4 sm:py-8"
              aria-label={`Read article: ${article.title}`}
            >
              <article className="flex flex-col gap-3 md:flex-row md:items-baseline md:justify-between md:gap-8">
                {/* Number & Category */}
                <div className="flex items-center gap-3 shrink-0 md:w-52">
                  <span className="font-mono text-xs font-semibold tracking-wider text-slate-400 transition-colors group-hover:text-slate-900 sm:text-sm">
                    {article.number}
                  </span>
                  <span className="rounded bg-slate-100 px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-slate-600 sm:text-xs">
                    {article.category}
                  </span>
                </div>

                {/* Title, Summary & Meta */}
                <div className="flex-1">
                  <h2 className="text-lg font-medium tracking-tight text-slate-900 transition-colors group-hover:text-indigo-600 sm:text-xl md:text-2xl">
                    {article.title}
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
                    {article.summary}
                  </p>
                  <div className="mt-3 flex items-center gap-3 font-mono text-xs text-slate-400">
                    <span>{article.publishedAt}</span>
                    <span aria-hidden="true">•</span>
                    <span>{article.readTime}</span>
                    {article.tags && article.tags.length > 0 && (
                      <>
                        <span aria-hidden="true" className="hidden sm:inline">•</span>
                        <span className="hidden sm:inline text-slate-400">{article.tags.slice(0, 2).join(", ")}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Right Arrow Interaction */}
                <div className="hidden shrink-0 items-center self-center text-slate-400 transition-all duration-200 group-hover:text-slate-900 md:flex">
                  <Icon
                    name="arrow-right"
                    height={20}
                    width={20}
                    className="transition-transform duration-200 group-hover:translate-x-1.5"
                    strokeWidth={0.5}
                  />
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      <RecruiterContact />
    </main>
  )
}
