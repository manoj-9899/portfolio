import { StaticImageData } from "next/image"

export interface ReviewProps {
  quote: React.ReactNode
  name: string
  title: string
  img: StaticImageData | string
  id?: string
}

export const REVIEWS = [
  {
    id: "entitled",
    img: "/client-photos/yassine-rhamani-profile-photo.jpeg",
    name: "Yassine Ramani",
    title: "CEO, Entitled",
    quote:
      "The technical implementation transformed our development process, improved our UI performance significantly, and elevated the entire frontend architecture.",
  },
  {
    id: "herba-naturals",
    img: "/brands/herba-naturals-logo.png",
    name: "Sami Raheem",
    title: "Owner, Herba Naturals",
    quote:
      "Delivered an e-commerce website that exceeded all our expectations. It was fast, user-friendly, and packed with modern product management features.",
  },
  {
    id: "vets-choice",
    img: "/brands/vets-choice-insurance-logo.png",
    name: "Rob Dow",
    title: "Co-Founder, Vets Choice Insurance",
    quote:
      "The engineering support was exceptional. We went through rounds of revisions to comply with legal requirements and ensure full accessibility.",
  },
  {
    id: "bespoke",
    img: "/client-photos/bespoke-tint-owner-kris-256.webp",
    name: "Kris Meyer",
    title: "Owner, Bespoke Tint",
    quote:
      "The website rebuild made our business look as professional online as it is in person, driving measurable growth in online engagements.",
  },
  {
    id: "iao",
    img: "/client-photos/aleksandr-butowicz-iron-oak-profile-photo.jpg",
    name: "Aleks Butokowitz",
    title: "CEO, Iron & Oak",
    quote:
      "Delivered a site that perfectly blended branding and design with seamless functionality and high performance across devices.",
  },

  {
    id: "automedics",
    name: "Jeff Egbert",
    title: "Owner, Automedics Kirkland",
    quote: "Our website was built fast and works flawlessly. A great, reliable engineering experience.",
    img: "/assets/automedics-logo-optimized.png",
  },
] as const satisfies readonly ReviewProps[]

// O(1) lookup
export const REVIEW_MAP: Record<string, ReviewProps> = Object.fromEntries(REVIEWS.map((r) => [r.id, r]))

export function getReview(id: string) {
  return REVIEW_MAP[id]
}
