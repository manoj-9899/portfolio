import {
  getProductionOrigin,
  SITE_CONFIG,
  PERSONAL_INFO,
  SITE_SLUGS,
  PRODUCTION_ORIGIN,
} from "./siteConfig"
import type { Graph, ItemList, BreadcrumbList, TechArticle } from "schema-dts"
import { getPublishedArticles, type Article } from "@/app/data/articles"

export interface ProjectItem {
  name: string
  url: string
  date: string
  description: string
  external?: string
  type?: "SoftwareSourceCode" | "SoftwareApplication" | "WebSite" | "WebApplication" | "CreativeWork"
}

// Canonical 4 featured projects for Manoj Pawar
export const projectsData: ProjectItem[] = [
  {
    name: "Post-Quantum Document Enclave & Forensic Attribution System",
    url: "https://github.com/manoj-9899/sih",
    date: "2026-01-01",
    description:
      "Browser-based document security using post-quantum cryptography, encryption, signing, watermarking, forensic attribution, and tamper-evident audit trails.",
    type: "SoftwareSourceCode",
  },
  {
    name: "DevHabits",
    url: "https://github.com/manoj-9899/devhabits",
    date: "2025-10-01",
    description:
      "Local-first habit tracker with React dashboard, Node.js CLI/TUI, SQLite, streak analytics, and activity heatmaps.",
    type: "SoftwareApplication",
  },
  {
    name: "CampusCanteen",
    url: "https://github.com/manoj-9899/CampusCanteen",
    date: "2025-05-01",
    description:
      "Full-stack canteen pre-ordering and queue management platform with authentication, inventory, QR pickup verification, and staff queue operations.",
    type: "WebApplication",
  },
  {
    name: "FocusTube",
    url: "https://github.com/manoj-9899/focustube",
    date: "2025-02-01",
    description:
      "AI-powered YouTube focus assistant using Chrome extension, Groq LLM inference, focus scoring, session summaries, and Node.js/Express backend.",
    type: "SoftwareApplication",
  },
]

/**
 * Safely stringify JSON-LD data preventing script injection
 */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c").replace(/>/g, "\\u003e").replace(/&/g, "\\u0026")
}

/**
 * Generates Root Layout schema containing Person and WebSite
 */
export function getSiteGraph(origin: string | undefined = getProductionOrigin()): Graph {
  const base = origin || ""
  const personId = base ? `${base}/#manoj-pawar` : "#manoj-pawar"
  const websiteId = base ? `${base}/#website` : "#website"

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: PERSONAL_INFO.fullName,
        alternateName: PERSONAL_INFO.name,
        ...(base ? { url: base } : {}),
        jobTitle: PERSONAL_INFO.role,
        email: `mailto:${PERSONAL_INFO.email}`,
        sameAs: [
          PERSONAL_INFO.profiles.github,
          PERSONAL_INFO.profiles.linkedIn,
        ],
        affiliation: {
          "@type": "EducationalOrganization",
          name: PERSONAL_INFO.university,
        },
        knowsAbout: [
          "React",
          "Next.js",
          "TypeScript",
          "JavaScript",
          "Node.js",
          "Express.js",
          "Post-Quantum Cryptography",
          "Python",
          "C++",
          "SQL",
          "PostgreSQL",
          "MongoDB",
        ],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        ...(base ? { url: base } : {}),
        name: `${SITE_CONFIG.siteName} - Developer Portfolio`,
        description: SITE_CONFIG.description,
        publisher: { "@id": personId },
        inLanguage: "en",
      },
    ],
  }
}

/**
 * Generates Homepage schema containing ProfilePage
 */
export function getHomeGraph(origin: string | undefined = getProductionOrigin()): Graph {
  const base = origin || ""
  const personId = base ? `${base}/#manoj-pawar` : "#manoj-pawar"
  const websiteId = base ? `${base}/#website` : "#website"
  const pageId = base ? `${base}/#home` : "#home"

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": pageId,
        ...(base ? { url: base } : {}),
        name: SITE_CONFIG.defaultTitle,
        description: SITE_CONFIG.description,
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": personId },
        inLanguage: "en",
      },
    ],
  }
}

/**
 * Generates Projects listing schema containing CollectionPage and ItemList
 */
export function getProjectsGraph(origin: string | undefined = getProductionOrigin()): Graph {
  const base = origin || ""
  const websiteId = base ? `${base}/#website` : "#website"
  const pageId = base ? `${base}${SITE_SLUGS.projects}#page` : "#projects-page"
  const listId = base ? `${base}${SITE_SLUGS.projects}#list` : "#projects-list"
  const authorRef = { "@id": base ? `${base}/#manoj-pawar` : "#manoj-pawar" }

  const itemList: ItemList = {
    "@type": "ItemList",
    "@id": listId,
    name: "Featured Projects by Manoj Pawar",
    itemListOrder: "Descending",
    numberOfItems: projectsData.length,
    itemListElement: projectsData.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: project.name,
      item: {
        "@type": project.type || "SoftwareApplication",
        name: project.name,
        description: project.description,
        url: project.url,
        codeRepository: project.url,
        author: authorRef,
      },
    })),
  }

  const breadcrumbs: BreadcrumbList = {
    "@type": "BreadcrumbList",
    "@id": base ? `${base}${SITE_SLUGS.projects}#breadcrumb` : "#projects-breadcrumb",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: base || "/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: SITE_CONFIG.projectsTitle,
        item: base ? `${base}${SITE_SLUGS.projects}` : SITE_SLUGS.projects,
      },
    ],
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      itemList,
      breadcrumbs,
      {
        "@type": "CollectionPage",
        "@id": pageId,
        ...(base ? { url: `${base}${SITE_SLUGS.projects}` } : {}),
        name: `${SITE_CONFIG.projectsTitle} | ${SITE_CONFIG.siteName}`,
        description: SITE_CONFIG.projectsDescription,
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": listId },
        inLanguage: "en",
      },
    ],
  }
}

/**
 * Generates Articles index schema containing CollectionPage, ItemList, and BreadcrumbList
 */
export function getArticlesGraph(origin: string | undefined = getProductionOrigin()): Graph {
  const base = origin || ""
  const websiteId = base ? `${base}/#website` : "#website"
  const pageId = base ? `${base}${SITE_SLUGS.articles}#page` : "#articles-page"
  const listId = base ? `${base}${SITE_SLUGS.articles}#list` : "#articles-list"
  const authorRef = { "@id": base ? `${base}/#manoj-pawar` : "#manoj-pawar" }
  const publishedArticles = getPublishedArticles()

  const itemList: ItemList = {
    "@type": "ItemList",
    "@id": listId,
    name: "Technical Articles & Engineering Breakdowns by Manoj Pawar",
    itemListOrder: "Descending",
    numberOfItems: publishedArticles.length,
    itemListElement: publishedArticles.map((article, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: article.title,
      item: {
        "@type": "TechArticle",
        name: article.title,
        headline: article.title,
        description: article.summary,
        url: base ? `${base}/articles/${article.slug}` : `/articles/${article.slug}`,
        datePublished: article.dateISO,
        author: authorRef,
      },
    })),
  }

  const breadcrumbs: BreadcrumbList = {
    "@type": "BreadcrumbList",
    "@id": base ? `${base}${SITE_SLUGS.articles}#breadcrumb` : "#articles-breadcrumb",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: base || "/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: SITE_CONFIG.articlesTitle,
        item: base ? `${base}${SITE_SLUGS.articles}` : SITE_SLUGS.articles,
      },
    ],
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      itemList,
      breadcrumbs,
      {
        "@type": "CollectionPage",
        "@id": pageId,
        ...(base ? { url: `${base}${SITE_SLUGS.articles}` } : {}),
        name: `${SITE_CONFIG.articlesTitle} | ${SITE_CONFIG.siteName}`,
        description: SITE_CONFIG.articlesDescription,
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": listId },
        inLanguage: "en",
      },
    ],
  }
}

/**
 * Generates Article Detail schema containing TechArticle and BreadcrumbList
 */
export function getArticleDetailGraph(article: Article, origin: string | undefined = getProductionOrigin()): Graph {
  const base = origin || ""
  const websiteId = base ? `${base}/#website` : "#website"
  const articleUrl = base ? `${base}/articles/${article.slug}` : `/articles/${article.slug}`
  const articleId = `${articleUrl}#article`
  const authorRef = { "@id": base ? `${base}/#manoj-pawar` : "#manoj-pawar" }
  const imageUrl = base ? `${base}${SITE_CONFIG.ogImage}` : SITE_CONFIG.ogImage

  const techArticle: TechArticle = {
    "@type": "TechArticle",
    "@id": articleId,
    headline: article.title,
    description: article.summary,
    url: articleUrl,
    mainEntityOfPage: articleUrl,
    datePublished: article.dateISO,
    dateModified: article.dateISO,
    inLanguage: "en",
    author: authorRef,
    publisher: authorRef,
    articleSection: article.category,
    keywords: article.tags?.join(", "),
    image: imageUrl,
    isPartOf: { "@id": websiteId },
  }

  const breadcrumbs: BreadcrumbList = {
    "@type": "BreadcrumbList",
    "@id": `${articleUrl}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: base || "/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: SITE_CONFIG.articlesTitle,
        item: base ? `${base}${SITE_SLUGS.articles}` : SITE_SLUGS.articles,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: articleUrl,
      },
    ],
  }

  return {
    "@context": "https://schema.org",
    "@graph": [techArticle, breadcrumbs],
  }
}

// Backward-compatible static exports
export const siteGraph = getSiteGraph(PRODUCTION_ORIGIN)
export const homeGraph = getHomeGraph(PRODUCTION_ORIGIN)
export const projectsGraph = getProjectsGraph(PRODUCTION_ORIGIN)
export const articlesGraph = getArticlesGraph(PRODUCTION_ORIGIN)


