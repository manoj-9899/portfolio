import Image from "next/image"
import clsx from "clsx"
import { Text, Typography } from "../ui/Elements"
import { AnimatedH2 } from "./ui/AnimatedH2"
import { ImageReveal } from "./ImageReveal"
import { MotionDiv } from "../utils/lazy-ui"
import profilePhoto from "@/app/images/profile.webp"
import signature from "@/app/images/signature.png"

export const AboutSectionV2 = ({ className = "" }: { className?: string }) => {
  return (
    <section id="about-manoj-pawar" className={clsx("border-y border-gray-200 bg-white", className)}>
      <div className="inside-container relative z-2 gap-6 sm:gap-8 md:gap-16">
        {/* HEADLINE */}
        <AnimatedH2>
          <span className="text-slate-500">About</span>
          <br />
          Manoj Pawar
        </AnimatedH2>
        <div className="flex flex-col gap-6 md:flex-row md:gap-16">
          {/* ---------------- left column on desktop / visual items on mobile ---------------- */}
          <div className="contents md:flex md:[flex:1_0_0px] md:flex-col md:gap-6">
            {/* 2. Profile photo (order-2 on mobile) */}
            <div className="order-2 flex justify-center md:order-none md:justify-start">
              <ImageReveal src={profilePhoto} alt="Manoj Shivaji Pawar" className="custom-shadow mx-auto aspect-[4/4.5] w-56 sm:w-60 md:mx-0 md:w-60" />
            </div>

            {/* 3. Name & Education details (order-3 on mobile) */}
            <MotionDiv
              className="order-3 text-center md:order-none md:text-left"
              initial={{ opacity: 0, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "0px 0px -50px 0px" }}
            >
              <Text as="h3" size="lg" className="font-semibold text-slate-900">
                Manoj Shivaji Pawar
              </Text>
              <p className="mt-1 text-sm text-slate-600">
                <span className="font-medium text-slate-800">B.Tech in Computer Engineering</span>
                <span className="mt-0.5 block text-xs text-slate-500 sm:text-sm">@ DBATU (7th Sem)</span>
              </p>
            </MotionDiv>
          </div>

          {/* ---------------- right column on desktop / text items on mobile ---------------- */}
          <Typography as="article" size="lg" className="contents text-slate-500 md:flex md:[flex:1.5_0_0px] md:flex-col md:space-y-8">
            {/* 1. Short introduction (order-1 on mobile) */}
            <p className="order-1 text-lg leading-snug font-semibold text-slate-900 sm:text-xl md:order-none">
              Passionate about building secure, reliable, and user-centric software.
            </p>

            {/* 4. Full biography (order-4 on mobile) */}
            <div className="order-4 space-y-4 text-base leading-relaxed text-slate-600 sm:space-y-5 sm:text-[17px] sm:leading-7 md:order-none md:space-y-8 md:text-lg md:leading-relaxed md:text-slate-500">
              <p>
                I am a 7th-semester Computer Engineering undergraduate at Dr. Babasaheb Ambedkar Technological University (DBATU). My journey centers on
                solving real-world challenges through full-stack development, applied cryptography, and systems engineering.
              </p>

              <p>
                Whether engineering browser-based post-quantum cryptographic document enclaves, creating local-first productivity tooling, or developing
                full-stack web platforms with Next.js, Node.js, and modern databases, I focus on clean architecture, performance, and practical impact.
              </p>

              <p>
                Outside of coursework and development, I enjoy exploring modern system designs, experimenting with machine learning algorithms, and contributing
                to open-source software.
              </p>
            </div>

            {/* 5. Signature (order-5 on mobile) */}
            <div className="order-5 pt-2 md:order-none md:pt-0">
              <Image src={signature} alt="Manoj Pawar Signature" className="relative h-11 w-auto sm:h-12 md:mt-6 md:-ml-2 md:h-14" />
            </div>
          </Typography>
        </div>
      </div>
    </section>
  )
}
