export const DOMAIN_URL = "https://manoj-9899.github.io/manojpawar"

export const SITE_CONFIG = {
  title: "Manoj Pawar - Software & Full-Stack Developer Portfolio",
  description:
    "Portfolio of Manoj Shivaji Pawar, Computer Engineering student and developer specializing in React, Next.js, TypeScript, Node.js, and secure software systems.",
  url: DOMAIN_URL ?? "http://localhost:3000",
  siteName: "Manoj Pawar",
  keywords: ["Manoj Pawar", "Manoj Shivaji Pawar", "Full-Stack Developer", "Computer Engineering", "React", "Next.js", "TypeScript", "Node.js", "Python", "C++"],
  ogImage: "/opengraph-image.jpg",
  logo: "/favicon.ico",
} as const

export const SITE_NAP = {
  name: "Manoj Shivaji Pawar",
  googleBusinessType: "Person" as const,
  contact: "Manoj Pawar",
  contactTitle: "Computer Engineering Student & Developer",
  email: "manojpawar.dev@gmail.com",
  phone: "+918805348821",
  formattedPhone: "+91 8805348821",
  addressLink: "https://maps.google.com/?q=DBATU+Lonere",
  street: "DBATU Campus",
  city: "Lonere",
  state: "Maharashtra",
  zipCode: "402103",
  openingHours: [{ days: "Mon - Fri", hours: "9am - 6pm" }] as const,
  googleReviewLink: "",
  profiles: {
    linkedIn: "https://linkedin.com/in/pawar-manoj/",
    github: "https://github.com/manoj-9899",
  } as const,
  logo: "/favicon.ico",
  favicon: "/favicon.ico",
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
