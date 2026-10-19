import React from "react"
import type { ArticleBlock } from "@/app/data/articles"

interface ArticleRendererProps {
  blocks: ArticleBlock[]
}

export const ArticleRenderer: React.FC<ArticleRendererProps> = ({ blocks }) => {
  return (
    <div className="article-body">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p key={index} className="mb-6 text-base leading-relaxed text-slate-700 sm:text-lg">
                {block.content}
              </p>
            )

          case "heading":
            if (block.level === 3) {
              return (
                <h3
                  key={index}
                  id={block.id}
                  className="mt-8 mb-3 scroll-mt-24 text-xl font-medium tracking-tight text-slate-900 sm:text-2xl"
                >
                  {block.text}
                </h3>
              )
            }
            return (
              <h2
                key={index}
                id={block.id}
                className="mt-12 mb-4 scroll-mt-24 border-b border-gray-100 pb-2 text-2xl font-medium tracking-tight text-slate-900 sm:text-3xl"
              >
                {block.text}
              </h2>
            )

          case "code":
            return (
              <div key={index} className="my-6 overflow-hidden rounded-xl border border-slate-800 bg-slate-950 shadow-lg">
                {block.filename && (
                  <div className="flex items-center justify-between border-b border-slate-800/80 bg-slate-900/60 px-4 py-2 font-mono text-xs text-slate-400">
                    <span>{block.filename}</span>
                    <span className="uppercase text-slate-400 font-mono text-[10px]">{block.language}</span>
                  </div>
                )}
                <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-slate-200 sm:p-5 sm:text-sm">
                  <code>{block.code}</code>
                </pre>
              </div>
            )

          case "list":
            return (
              <ul key={index} className="my-6 list-disc space-y-2 pl-6 text-base leading-relaxed text-slate-700 sm:text-lg">
                {block.items.map((item, itemIdx) => (
                  <li key={itemIdx}>{item}</li>
                ))}
              </ul>
            )

          case "callout":
            return (
              <aside
                key={index}
                className="my-6 rounded-r-xl border-l-4 border-slate-900 bg-slate-50 p-4 sm:p-5"
              >
                {block.title && <h4 className="mb-1 font-semibold text-slate-900 text-sm sm:text-base">{block.title}</h4>}
                <p className="text-sm leading-relaxed text-slate-700 sm:text-base">{block.text}</p>
              </aside>
            )

          case "quote":
            return (
              <blockquote key={index} className="my-6 border-l-2 border-slate-300 pl-4 italic text-slate-600">
                <p className="text-base sm:text-lg leading-relaxed">{block.text}</p>
                {block.citation && <cite className="mt-2 block not-italic text-xs font-mono text-slate-500">— {block.citation}</cite>}
              </blockquote>
            )

          default:
            return null
        }
      })}
    </div>
  )
}
