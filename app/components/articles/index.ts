import type { ComponentType } from "react"
import AIConfidenceArticle from "./AIConfidenceArticle"
import GitCommitArticle from "./GitCommitArticle"
import LeakInvestigationArticle from "./LeakInvestigationArticle"
import StorageRestartArticle from "./StorageRestartArticle"

export const ARTICLE_COMPONENTS: Record<string, ComponentType> = {
  "an-ai-model-can-be-confident-and-still-be-wrong": AIConfidenceArticle,
  "what-git-actually-saves-when-you-make-a-commit": GitCommitArticle,
  "encryption-protects-a-document-what-helps-trace-a-leak": LeakInvestigationArticle,
  "why-does-my-app-forget-everything-when-i-restart-it": StorageRestartArticle,
}

export function getArticleComponent(slug: string): ComponentType | undefined {
  return ARTICLE_COMPONENTS[slug]
}

export {
  AIConfidenceArticle,
  GitCommitArticle,
  LeakInvestigationArticle,
  StorageRestartArticle,
}
