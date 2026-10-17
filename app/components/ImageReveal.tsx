import Image, { StaticImageData } from "next/image"
import { ReactElement } from "react"
import { Socials } from "./Socials"
import { socialLinks } from "./Footer/FooterV2"
import { MotionDiv } from "../utils/lazy-ui"

interface ImageRevealProps {
  src?: StaticImageData | string
  alt?: string
  className?: string
}

export function ImageReveal({ className = "", src, alt = "Manoj Shivaji Pawar" }: ImageRevealProps): ReactElement {
  return (
    <div className={`relative max-w-60 overflow-hidden rounded-2xl ${className} `}>
      <MotionDiv
        initial={{ x: "100%" }}
        whileInView={{ x: 0 }}
        transition={{ duration: 0.3, type: "spring", bounce: 0 }}
        style={{
          transformOrigin: "right",
        }}
        className="absolute inset-0 bg-slate-900"
        viewport={{ once: true, margin: "0px 0px -200px 0px" }}
      />

      {/* AVATAR / IMAGE ---------------------------------------------*/}
      <MotionDiv
        initial={{ x: "100%" }}
        whileInView={{ x: 0 }}
        transition={{ duration: 0.5, delay: 0.3, type: "spring", bounce: 0 }}
        style={{ transformOrigin: "right" }}
        className="absolute inset-0"
        viewport={{ once: true, margin: "0px 0px -200px 0px" }}
      >
        <Socials socialLinks={socialLinks} className="absolute right-4 bottom-4 z-5" iconClassName="md:opacity-95 hover:opacity-100" />
        {src ? (
          <Image
            id="headshot"
            src={src}
            fill
            alt={alt}
            className="rounded-2xl object-cover"
            sizes="(max-width: 560px) 300px, (max-width: 768px) 500px, 50vw"
          />
        ) : (
          <div className="relative flex h-full w-full select-none flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-black p-6 text-white">
            <div className="absolute inset-0 rounded-2xl [background-image:url('/assets/framer-noise.png')] [background-size:128px] opacity-15" />
            <div className="relative z-1 flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-sm">
              <span className="text-3xl font-bold tracking-wider text-slate-100">MP</span>
            </div>
            <span className="relative z-1 mt-3 text-xs font-medium tracking-widest text-slate-400 uppercase">Software Engineer</span>
          </div>
        )}
      </MotionDiv>
    </div>
  )
}
