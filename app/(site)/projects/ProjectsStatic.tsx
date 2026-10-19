import { StaticImageData } from "next/image"
import { Card } from "@/app/components/ProjectCard/Card"
import { Link } from "@/app/utils/Link"
import postQuantumPreview from "@/app/images/post-quantum.webp"
import devhabitsPreview from "@/app/images/devhabits.webp"
import campuscanteenPreview from "@/app/images/campuscanteen.webp"
import focustubePreview from "@/app/images/focustube.webp"

type StaticProject = {
  id: string
  src?: StaticImageData
  alt: string
  color: string
  type: string
  text: string
  href: string
  dataText: string
  ariaLabel: string
  isExternal: boolean
}

export const STATIC_PROJECTS: StaticProject[] = [
  {
    id: "post-quantum-enclave",
    src: postQuantumPreview,
    alt: "Post-Quantum Document Enclave architectural preview",
    color: "#3B06D1",
    type: "Post-Quantum Security Enclave",
    text: "View on GitHub",
    href: "https://github.com/manoj-9899/sih",
    dataText: "View on GitHub",
    ariaLabel: "View Post-Quantum Document Enclave on GitHub",
    isExternal: true,
  },
  {
    id: "devhabits",
    src: devhabitsPreview,
    alt: "DevHabits habit tracker interface preview",
    color: "#024EFC",
    type: "Local-First Habit Tracker",
    text: "View on GitHub",
    href: "https://github.com/manoj-9899/devhabits",
    dataText: "View on GitHub",
    ariaLabel: "View DevHabits on GitHub",
    isExternal: true,
  },
  {
    id: "campuscanteen",
    src: campuscanteenPreview,
    alt: "CampusCanteen ordering and queue platform preview",
    color: "#DA961A",
    type: "Canteen & Queue Platform",
    text: "View on GitHub",
    href: "https://github.com/manoj-9899/CampusCanteen",
    dataText: "View on GitHub",
    ariaLabel: "View CampusCanteen on GitHub",
    isExternal: true,
  },
  {
    id: "focustube",
    src: focustubePreview,
    alt: "FocusTube AI YouTube focus assistant preview",
    color: "#13739C",
    type: "AI YouTube Focus Assistant",
    text: "View on GitHub",
    href: "https://github.com/manoj-9899/focustube",
    dataText: "View on GitHub",
    ariaLabel: "View FocusTube on GitHub",
    isExternal: true,
  },
]

export const ProjectsStatic: React.FC = () => {
  return (
    <section className="border-t border-slate-200">
      <div className="inside-container-small">
        <div className="relative z-4 grid grid-cols-1 grid-rows-1 gap-4 md:grid-cols-2 md:grid-rows-2">
          {STATIC_PROJECTS.map((project, index) => {
            const Tag = project.isExternal ? "a" : Link
            const tagProps = project.isExternal
              ? {
                  href: project.href,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  "data-text": project.dataText,
                  "aria-label": project.ariaLabel,
                }
              : {
                  href: project.href,
                  "data-text": project.dataText,
                  "aria-label": project.ariaLabel,
                  prefetch: true,
                }

            return (
              <Tag key={project.id} {...tagProps}>
                <Card
                  src={project.src}
                  alt={project.alt}
                  color={project.color}
                  type={project.type}
                  reveal={false}
                  text={project.text}
                  priority={index < 2}
                />
              </Tag>
            )
          })}
        </div>
      </div>
    </section>
  )
}
