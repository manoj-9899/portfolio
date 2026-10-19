import Link from "next/link"
import { TextSlider } from "./TextSlider"
import { Socials } from "../Socials"
import { SITE_NAP, SITE_SLUGS } from "@/config/siteConfig"
import { H2 } from "@/app/ui/Elements"

const words: [string, string, string, string] = ["build", "create", "design", "make"]

export const socialLinks = [
  {
    href: SITE_NAP.profiles.linkedIn,
    icon: "linkedin",
  },
  {
    href: SITE_NAP.profiles.github,
    icon: "github",
  },
]

export const FooterV2: React.FC = () => {
  return (
    <footer className="relative overflow-hidden bg-black">
      <div className="xs:pb-32 mx-auto flex w-full max-w-6xl flex-col gap-12 px-5.5 pt-12 pb-24 text-white sm:pb-40 md:gap-16 md:px-11 md:pt-16 lg:pb-54">
        <div className="flex flex-col gap-8 md:gap-12">
          <H2 className="text-5xl leading-12 text-white md:text-6xl md:leading-14">
            Lets&nbsp;
            <TextSlider words={words} height={50} mobileHeight={41} />
            <br />
            <span className="text-gray-500">incredible work together.</span>
          </H2>
          <ul className="flex flex-col justify-between gap-5.5 border-b border-gray-500 pb-6 text-sm md:flex-row md:items-center md:gap-8">
            <li className="flex flex-col gap-1 md:gap-2">
              <span className="text-gray-500">Email</span>
              <Link href={`mailto:${SITE_NAP.email}`} className="w-fit text-sm transition-colors duration-200 hover:text-gray-300">
                {SITE_NAP.email}
              </Link>
            </li>
            <li className="flex flex-col gap-1 md:gap-2">
              <span className="text-gray-500">Phone</span>
              <Link href={`tel:${SITE_NAP.phone}`} className="w-fit text-sm transition-colors duration-200 hover:text-gray-300">
                {SITE_NAP.formattedPhone}
              </Link>
            </li>
            <li className="flex flex-col gap-2">
              <span className="text-gray-500">Socials</span>
              <Socials socialLinks={socialLinks} />
            </li>
          </ul>

          <div className="footer-links flex gap-4">
            <Link href={SITE_SLUGS.home} className="text-sm transition-colors duration-200 hover:text-gray-300">
              Home
            </Link>
            <Link href={SITE_SLUGS.projects} className="text-sm transition-colors duration-200 hover:text-gray-300">
              Projects
            </Link>
            <Link href={SITE_SLUGS.articles} className="text-sm transition-colors duration-200 hover:text-gray-300">
              Articles
            </Link>
            <Link href={SITE_SLUGS.about} className="text-sm transition-colors duration-200 hover:text-gray-300">
              About
            </Link>
            <Link href={SITE_SLUGS.contact} className="text-sm transition-colors duration-200 hover:text-gray-300">
              Contact
            </Link>
          </div>
        </div>
        <div className="flex flex-col-reverse justify-between gap-2 text-xs text-nowrap md:flex-row">
          <div className="flex items-center gap-5.5 max-sm:flex-wrap">
            <p>
              <span className="text-[#b8b8b8]">Based in </span> India
            </p>
            <div className="flex gap-4">
              {/* <Link href="/terms-of-service" className="text-sm transition-colors duration-200 hover:text-gray-300">
                Terms of Service
              </Link>
              <Link href="/privacy-policy" className="text-sm transition-colors duration-200 hover:text-gray-300">
                Privacy Policy
              </Link> */}
            </div>
          </div>
          <span className="text-[#b8b8b8]">© 2026 Manoj Shivaji Pawar</span>
        </div>
        <span aria-hidden="true" className="large-brand-text absolute bottom-2 left-0 flex w-full select-none items-center justify-center text-[clamp(2.5rem,14.8vw,7rem)] font-medium whitespace-nowrap text-white md:bottom-4 md:text-[clamp(6.5rem,13.8vw,11rem)] lg:bottom-6 xl:-bottom-16 xl:text-[240px]">
          Manoj Pawar
        </span>
      </div>
    </footer>
  )
}
