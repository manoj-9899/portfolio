import { Metadata } from "next"

const PORTFOLIO_URL = "/"
const GITHUB_URL = "https://github.com/manoj-9899"
const CREDIT_PATH = "/serbyte-dev-credit"

export const metadata: Metadata = {
  title: "Web Development by Manoj Pawar",
  description: "Credit page for software crafted by Manoj Shivaji Pawar.",
  alternates: { canonical: CREDIT_PATH },
  robots: {
    index: false,
    follow: false,
  },
}

export default function SiteCreditPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6 py-16 text-center text-gray-900">
      <div className="max-w-2xl space-y-4">
        <p className="text-sm tracking-[0.2em] text-gray-500 uppercase">Site Credit</p>
        <h1 className="text-2xl font-semibold">Crafted by Manoj Shivaji Pawar</h1>
        <p className="text-base text-gray-700">Built with Next.js, React, TypeScript, and Tailwind CSS.</p>
        <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-medium text-blue-700">
          <a href={PORTFOLIO_URL} className="underline underline-offset-4">
            View Manoj&apos;s portfolio
          </a>
          <span className="text-gray-400">•</span>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
            Visit GitHub
          </a>
        </div>
      </div>
    </main>
  )
}
