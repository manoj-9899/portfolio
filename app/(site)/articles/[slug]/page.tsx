import { notFound } from "next/navigation"
import Link from "next/link"
import { Metadata } from "next"
import { getArticleBySlug, getAllArticleSlugs } from "@/app/data/articles"
import { ArticleRenderer } from "@/app/components/ArticleRenderer"
import { getArticleComponent } from "@/app/components/articles"
import { RecruiterContact } from "@/app/components/RecruiterContact"
import { Icon } from "@/app/components/Icon"
import { getCanonicalUrl, getProductionOrigin, SITE_CONFIG } from "@/config/siteConfig"
import { getArticleDetailGraph, serializeJsonLd } from "@/config/schemas"

const productionOrigin = getProductionOrigin()

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getAllArticleSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  if (!article || article.status !== "published") {
    return {
      title: "Article Not Found",
    }
  }

  const canonical = getCanonicalUrl(`/articles/${article.slug}`)

  return {
    title: article.title,
    description: article.summary,
    alternates: { canonical },
    openGraph: {
      type: "article",
      locale: SITE_CONFIG.locale,
      url: canonical,
      siteName: SITE_CONFIG.siteName,
      title: `${article.title} | ${SITE_CONFIG.siteName}`,
      description: article.summary,
      publishedTime: article.dateISO,
      authors: [SITE_CONFIG.fullName],
      images: [
        {
          url: SITE_CONFIG.ogImage,
          width: 1200,
          height: 630,
          alt: article.title,
          type: "image/jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${article.title} | ${SITE_CONFIG.siteName}`,
      description: article.summary,
      images: [SITE_CONFIG.ogImage],
    },
  }
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  if (!article || article.status !== "published") {
    notFound()
  }

  const CustomComponent = getArticleComponent(article.slug)
  const hasToc = !CustomComponent && article.tableOfContents && article.tableOfContents.length > 0

  return (
    <main className="relative z-1">
      <script
        id="jsonld-article-detail"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(getArticleDetailGraph(article, productionOrigin)),
        }}
      />
      <div className="inside-container pt-28 pb-16 sm:pt-32 sm:pb-24">
        {/* Navigation / Return link */}
        <div className="mb-8">
          <Link
            href="/articles"
            className="group inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 transition-colors hover:text-slate-900 sm:text-sm"
          >
            <Icon
              name="arrow-right"
              height={14}
              width={14}
              className="rotate-180 transition-transform group-hover:-translate-x-1"
            />
            <span>Back to All Articles</span>
          </Link>
        </div>

        {CustomComponent ? (
          /* Custom TSX Article Component */
          <div className="w-full">
            <CustomComponent />
          </div>
        ) : (
          /* Standard Editorial Layout for block-based content */
          <>
            <header className="border-b border-gray-200 pb-8 sm:pb-12">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-semibold tracking-wider text-slate-400 sm:text-sm">
                  {article.number}
                </span>
                <span className="rounded bg-slate-100 px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-slate-600 sm:text-xs">
                  {article.category}
                </span>
              </div>

              <h1 className="mt-4 text-3xl font-medium tracking-tight text-slate-900 sm:text-4xl md:text-5xl lg:leading-tight">
                {article.title}
              </h1>

              <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg md:text-xl">
                {article.summary}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4 font-mono text-xs text-slate-400 sm:text-sm">
                <span>By {SITE_CONFIG.fullName}</span>
                <span aria-hidden="true">•</span>
                <span>{article.publishedAt}</span>
                <span aria-hidden="true">•</span>
                <span>{article.readTime}</span>
              </div>
            </header>

            <div className="mt-10 flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
              <div className="w-full flex-1 max-w-3xl">
                {hasToc && (
                  <div className="mb-8 rounded-xl border border-gray-200 bg-slate-50/60 p-4 lg:hidden">
                    <details className="group">
                      <summary className="flex cursor-pointer items-center justify-between font-mono text-xs font-semibold uppercase tracking-wider text-slate-600">
                        <span>Table of Contents</span>
                        <span className="text-slate-400 transition-transform group-open:rotate-180">▼</span>
                      </summary>
                      <nav className="mt-3 space-y-2 border-t border-gray-200 pt-3">
                        {article.tableOfContents?.map((item) => (
                          <a
                            key={item.id}
                            href={`#${item.id}`}
                            className="block text-sm text-slate-600 transition-colors hover:text-indigo-600"
                          >
                            {item.title}
                          </a>
                        ))}
                      </nav>
                    </details>
                  </div>
                )}

                <ArticleRenderer blocks={article.content || []} />
              </div>

              {hasToc && (
                <aside className="hidden w-64 shrink-0 lg:block">
                  <div className="sticky top-28 rounded-2xl border border-gray-200 bg-slate-50/40 p-5">
                    <h2 className="mb-4 font-mono text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Contents
                    </h2>
                    <nav className="space-y-2.5">
                      {article.tableOfContents?.map((item) => (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          className="block text-xs leading-relaxed text-slate-600 transition-colors hover:text-indigo-600"
                        >
                          {item.title}
                        </a>
                      ))}
                    </nav>
                  </div>
                </aside>
              )}
            </div>
          </>
        )}

        {/* Related Projects Connection */}
        {article.relatedProjects && article.relatedProjects.length > 0 && (
          <aside className="mx-auto mt-12 max-w-3xl rounded-2xl border border-gray-200 bg-slate-50/80 p-6 sm:p-8">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-500">
              Related Project Reference
            </span>
            {article.relatedProjects.map((project, idx) => (
              <div key={idx} className="mt-3 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <h3 className="text-base font-semibold text-slate-900 sm:text-lg">{project.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{project.description}</p>
                </div>
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-full border border-gray-300 bg-white px-4 py-2 text-xs font-medium text-slate-800 shadow-sm transition-colors hover:border-slate-400 hover:bg-slate-50 sm:self-center"
                >
                  <span>View Repository</span>
                  <Icon name="arrow-right" height={14} width={14} />
                </a>
              </div>
            ))}
          </aside>
        )}

        {/* Bottom Return Link */}
        <div className="mx-auto mt-16 max-w-3xl flex items-center justify-between border-t border-gray-200 pt-8">
          <Link
            href="/articles"
            className="group inline-flex items-center gap-2 text-sm font-medium text-slate-700 transition-colors hover:text-slate-900"
          >
            <Icon
              name="arrow-right"
              height={16}
              width={16}
              className="rotate-180 transition-transform group-hover:-translate-x-1"
            />
            <span>Back to All Articles</span>
          </Link>
        </div>
      </div>

      <RecruiterContact />
    </main>
  )
}
