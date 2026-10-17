import ProjectDisplay from "@/app/components/ProjectSection/ProjectDisplay"
import { bespoke } from "@/app/data/project-data"
import { Metadata } from "next"
import { SITE_SLUGS } from "@/config/siteConfig"

export const metadata: Metadata = {
  title: "Manoj Pawar - Case Study Bespoke Tint & PPF",
  description: "Bespoke Tint & PPF website build case study.",
  keywords: ["Manoj Pawar", "Bespoke", "Next.js", "React", "TypeScript"],
  alternates: {
    canonical: SITE_SLUGS.projectLinks.bespoke,
  },
  robots: {
    index: false,
    follow: false,
  },
}

const BespokePage: React.FC = () => {
  return (
    <>
      <ProjectDisplay projectData={bespoke} />
    </>
  )
}

export default BespokePage
