export type ArticleStatus = "published" | "draft"

export type ArticleBlock =
  | { type: "paragraph"; content: string }
  | { type: "heading"; level: 2 | 3; text: string; id: string }
  | { type: "code"; language: string; code: string; filename?: string }
  | { type: "list"; items: string[] }
  | { type: "callout"; text: string; title?: string }
  | { type: "quote"; text: string; citation?: string }

export interface TableOfContentsItem {
  id: string
  title: string
  level?: 2 | 3
}

export interface RelatedProject {
  title: string
  description: string
  href: string
  isExternal?: boolean
}

export interface Article {
  slug: string
  number: string
  title: string
  summary: string
  category: string
  publishedAt: string
  dateISO: string
  readTime: string
  status: ArticleStatus
  tags: string[]
  tableOfContents?: TableOfContentsItem[]
  relatedProjects?: RelatedProject[]
  content?: ArticleBlock[]
}
