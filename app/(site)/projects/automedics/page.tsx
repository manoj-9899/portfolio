import ProjectDisplay from "@/app/components/ProjectSection/ProjectDisplay"
import { automedicsKirkland } from "@/app/data/project-data"
import { Metadata } from "next"
import { SITE_SLUGS } from "@/config/siteConfig"

export const metadata: Metadata = {
  title: "Manoj Pawar - Case Study AutoMedics Kirkland",
  description: "AutoMedics Kirkland website build case study.",
  keywords: ["Manoj Pawar", "AutoMedics", "Next.js", "React", "TypeScript"],
  alternates: {
    canonical: SITE_SLUGS.projectLinks.automedics,
  },
  robots: {
    index: false,
    follow: false,
  },
}

const AutomedicsKirklandPage: React.FC = () => {
  return (
    <>
      <ProjectDisplay projectData={automedicsKirkland} />
    </>
  )
}

export default AutomedicsKirklandPage
