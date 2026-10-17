import ProjectDisplay from "@/app/components/ProjectSection/ProjectDisplay"
import { iao } from "@/app/data/project-data"
import { Metadata } from "next"
import { SITE_SLUGS } from "@/config/siteConfig"

export const metadata: Metadata = {
  title: "Manoj Pawar - Case Study Iron & Oak",
  description: "Iron & Oak website build case study.",
  keywords: ["Manoj Pawar", "Iron & Oak", "Next.js", "React", "TypeScript"],
  alternates: {
    canonical: SITE_SLUGS.projectLinks.iao,
  },
  robots: {
    index: false,
    follow: false,
  },
}

const IaoPage: React.FC = () => {
  return (
    <>
      <ProjectDisplay projectData={iao} />
    </>
  )
}

export default IaoPage
