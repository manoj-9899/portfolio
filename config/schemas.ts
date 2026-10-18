import {
  getProductionOrigin,
  SITE_CONFIG,
  PERSONAL_INFO,
  SITE_SLUGS,
  PRODUCTION_ORIGIN,
} from "./siteConfig"
import type { Graph, ItemList } from "schema-dts"

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
          "Tailwind CSS",
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

  return {
    "@context": "https://schema.org",
    "@graph": [
      itemList,
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

// Backward-compatible static exports
export const siteGraph = getSiteGraph(PRODUCTION_ORIGIN)
export const homeGraph = getHomeGraph(PRODUCTION_ORIGIN)
export const projectsGraph = getProjectsGraph(PRODUCTION_ORIGIN)

