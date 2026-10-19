import Link from "next/link"
import { Metadata } from "next"
import { SITE_SLUGS } from "@/config/siteConfig"

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist or has been moved.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function NotFound() {
  return (
    <main className="flex min-h-[75vh] flex-col items-center justify-center px-6 py-24 text-center">
      <div className="mx-auto max-w-lg space-y-6">
        <span className="inline-block rounded-full border border-gray-200 bg-slate-50 px-3.5 py-1 font-mono text-xs font-semibold tracking-wider text-slate-500 uppercase">
          404 Error
        </span>

        <h1 className="text-3xl font-medium tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
          Page Not Found
        </h1>

        <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
          The requested page could not be found. It may have been moved, renamed, or is temporarily unavailable.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <Link
            href={SITE_SLUGS.home}
            className="inline-flex items-center rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-slate-800"
          >
            Return Home
          </Link>
          <Link
            href={SITE_SLUGS.articles}
            className="inline-flex items-center rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-800 shadow-sm transition-colors hover:border-slate-400 hover:bg-slate-50"
          >
            Browse Articles
          </Link>
          <Link
            href={SITE_SLUGS.projects}
            className="inline-flex items-center rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-800 shadow-sm transition-colors hover:border-slate-400 hover:bg-slate-50"
          >
            View Projects
          </Link>
        </div>
      </div>
    </main>
  )
}
