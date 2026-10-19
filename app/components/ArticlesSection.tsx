import React from "react"
import Link from "next/link"
import { getLatestArticles } from "@/app/data/articles"
import { AnimatedH2 } from "./ui/AnimatedH2"
import { Icon } from "./Icon"
import { SITE_SLUGS } from "@/config/siteConfig"

export const ArticlesSection: React.FC = () => {
  const latestArticles = getLatestArticles(3)

  return (
    <section id="articles" className="border-t border-gray-200 bg-white">
      <div className="inside-container">
        {/* Section Headline & Intro */}
        <div className="flex flex-col gap-4">
          <AnimatedH2>
            <span className="text-slate-500">Selected</span>
            <br />
            Writing & Analysis
          </AnimatedH2>
          <p className="max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Architectural breakdowns, applied cryptography notes, and engineering investigations spanning post-quantum security, local-first systems, and
            full-stack performance.
          </p>
        </div>

        {/* Editorial Articles List */}
        <div className="divide-y divide-gray-200 border-y border-gray-200">
          {latestArticles.map((article) => (
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
                  <h3 className="text-lg font-medium tracking-tight text-slate-900 transition-colors group-hover:text-indigo-600 sm:text-xl md:text-2xl">
                    {article.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
                    {article.summary}
                  </p>
                  <div className="mt-3 flex items-center gap-3 font-mono text-xs text-slate-400">
                    <span>{article.publishedAt}</span>
                    <span aria-hidden="true">•</span>
                    <span>{article.readTime}</span>
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

        {/* View All Articles Link */}
        <div className="flex justify-center pt-2">
          <Link href={SITE_SLUGS.articles} className="group flex items-center justify-center gap-2">
            <span className="underline-hover text-xl leading-6 tracking-tight text-slate-700 md:text-2xl">
              View All Articles
            </span>
            <Icon name="arrow-right" height={18} width={18} className="group-hover:animate-wiggle-right" strokeWidth={0.5} />
          </Link>
        </div>
      </div>
    </section>
  )
}
