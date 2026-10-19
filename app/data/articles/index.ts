import { article01 } from "./article-01"
import { article02 } from "./article-02"
import { article03 } from "./article-03"
import { Article } from "./types"

export * from "./types"
export { article01, article02, article03 }

export const ARTICLES: Article[] = [
  article01,
  article02,
  article03,
]

export function getAllArticles(): Article[] {
  return ARTICLES
}

export function getPublishedArticles(): Article[] {
  return ARTICLES.filter((article) => article.status === "published")
}

export function getLatestArticles(limit = 3): Article[] {
  return getPublishedArticles().slice(0, limit)
}

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((article) => article.slug === slug)
}

export function getAllArticleSlugs(): string[] {
  return getPublishedArticles().map((article) => article.slug)
}
