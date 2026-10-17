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
      <div className="inside-container relative z-2">
        {/* HEADLINE */}
        <AnimatedH2>
          <span className="text-slate-500">About</span>
          <br />
          Manoj Pawar
        </AnimatedH2>
        <div className="flex flex-col-reverse gap-12 md:flex-row md:gap-16">
          {/* ---------------- left column ---------------- */}

          <div className="flex [flex:1_0_0px] flex-col gap-6">
            {/* portrait + overlay icons */}

            <ImageReveal src={profilePhoto} alt="Manoj Shivaji Pawar" className="custom-shadow aspect-[4/4.5]" />

            {/* name + role */}
            <MotionDiv
              initial={{ opacity: 0, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            >
              <Text as="h2" size="lg" className="font-medium">
                Manoj Shivaji Pawar
              </Text>
              <p className="text-sm text-gray-500">
                B.Tech in Computer Engineering @{" "}
                <span className="text-nowrap text-slate-900">
                  DBATU, Lonere (7th Sem)
                </span>
              </p>
            </MotionDiv>
          </div>
          {/* ---------------- right column ---------------- */}
          <Typography as="article" size="lg" className="[flex:1.5_0_0px] space-y-8 text-slate-500">
            <p>
              <strong className="font-semibold text-slate-900">Passionate about building secure, reliable, and user-centric software.</strong>
            </p>

            <p>
              I am a 7th-semester Computer Engineering undergraduate at Dr. Babasaheb Ambedkar Technological University (DBATU), Lonere.
              My journey centers on solving real-world challenges through full-stack development, applied cryptography, and systems engineering.
            </p>

            <p>
              Whether engineering browser-based post-quantum cryptographic document enclaves, creating local-first productivity tooling,
              or developing full-stack web platforms with Next.js, Node.js, and modern databases, I focus on clean architecture, performance, and practical impact.
            </p>
            <p>Outside of coursework and development, I enjoy exploring modern system designs, experimenting with machine learning algorithms, and contributing to open-source software.</p>

            {/* signature */}
            <Image src={signature} alt="Manoj Pawar Signature" className="relative mt-6 -ml-2 h-14 w-auto" />
          </Typography>
        </div>
      </div>
    </section>
  )
}
