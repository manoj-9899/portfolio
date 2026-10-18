/**
 * Site Configuration for Manoj Pawar's Developer Portfolio
 *
 * PRODUCTION DOMAIN NOTE:
 * The production domain is currently undecided (pending final hosting platform choice between Vercel and Netlify).
 * Set the environment variable NEXT_PUBLIC_SITE_URL (or SITE_URL) in your hosting dashboard
 * (e.g. NEXT_PUBLIC_SITE_URL=https://your-custom-domain.com or https://portfolio.vercel.app).
 *
 * When unset, the application builds cleanly without fabricating canonical URLs or leaking
 * development/localhost URLs into production search engine directives.
 */

export const getProductionOrigin = (): string | undefined => {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL
  if (envUrl && envUrl.trim() !== "") {
    return envUrl.trim().replace(/\/+$/, "")
  }
  return undefined
}

export const PRODUCTION_ORIGIN = getProductionOrigin()

/**
 * Backward-compatible alias. Returns the configured production origin or an empty string.
 * @deprecated Prefer `getProductionOrigin()` or `PRODUCTION_ORIGIN`.
 */
export const DOMAIN_URL = PRODUCTION_ORIGIN || ""

/**
 * Helper to compute canonical URLs safely.
 * Returns undefined when production origin is unconfigured to prevent generating fake canonicals.
 */
export const getCanonicalUrl = (path: string = "/"): string | undefined => {
  const origin = getProductionOrigin()
  if (!origin) return undefined
  const normalizedPath = path.startsWith("/") ? path : `/${path}`
  return `${origin}${normalizedPath === "/" ? "" : normalizedPath}`
}

export const SITE_CONFIG = {
  siteName: "Manoj Pawar",
  fullName: "Manoj Shivaji Pawar",
  defaultTitle: "Manoj Pawar | Software Developer & Computer Engineering Student",
  titleTemplate: "%s | Manoj Pawar",
  title: "Manoj Pawar | Software Developer & Computer Engineering Student",
  description:
    "Explore Manoj Pawar's software engineering portfolio, featuring full-stack applications, developer tools, and post-quantum document security projects.",
  projectsTitle: "Projects",
  projectsDescription:
    "Featured software engineering projects by Manoj Pawar, including post-quantum document security enclaves, local-first productivity tooling, and full-stack web applications.",
  url: DOMAIN_URL,
  keywords: [
    "Manoj Pawar",
    "Manoj Shivaji Pawar",
    "Software Developer",
    "Full-Stack Developer",
    "Computer Engineering Student",
    "DBATU Lonere",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Post-Quantum Cryptography",
    "Python",
    "C++",
  ],
  ogImage: "/opengraph-image.jpg",
  ogImageAlt: "Manoj Pawar - Software Developer & Computer Engineering Student Portfolio",
  logo: "/favicon.ico",
  locale: "en_US",
} as const

export const PERSONAL_INFO = {
  name: "Manoj Pawar",
  fullName: "Manoj Shivaji Pawar",
  role: "Computer Engineering Student & Developer",
  university: "Dr. Babasaheb Ambedkar Technological University (DBATU), Lonere",
  location: "Maharashtra, India",
  email: "manojpawar.dev@gmail.com",
  phone: "+91 8805348821",
  formattedPhone: "+91 8805348821",
  profiles: {
    linkedIn: "https://linkedin.com/in/pawar-manoj/",
    github: "https://github.com/manoj-9899",
  } as const,
} as const

export const SITE_NAP = {
  name: PERSONAL_INFO.fullName,
  contact: PERSONAL_INFO.name,
  contactTitle: PERSONAL_INFO.role,
  email: PERSONAL_INFO.email,
  phone: "+918805348821",
  formattedPhone: PERSONAL_INFO.formattedPhone,
  profiles: PERSONAL_INFO.profiles,
  logo: SITE_CONFIG.logo,
  favicon: SITE_CONFIG.logo,
  images: [],
} as const

export const SITE_SLUGS = {
  home: "/",
  projects: "/projects",
  contact: "/#contact",
  about: "/#about-manoj-pawar",
  projectLinks: {
    iao: "/projects/iron-and-oak",
    automedics: "/projects/automedics",
    bespoke: "/projects/bespoke",
  },
} as const

export const PUBLIC_INDEXABLE_ROUTES = [SITE_SLUGS.home, SITE_SLUGS.projects] as const

export const externalLinks = {
  vetsChoice: "https://github.com/manoj-9899",
  zeroIconSprite: "https://github.com/manoj-9899",
  zeroCore: "https://github.com/manoj-9899",
  entitled: "https://github.com/manoj-9899",
} as const

const flattenSlugs = (obj: Record<string, string | Record<string, string>>): string[] => {
  return Object.values(obj).flatMap((value) => (typeof value === "string" ? [value] : flattenSlugs(value)))
}

export const ALL_PAGES: string[] = Object.values(SITE_SLUGS).flatMap((value) => (typeof value === "string" ? [value] : flattenSlugs(value)))
