import Image, { StaticImageData } from "next/image"
import clsx from "clsx"

export const Card = ({
  src,
  alt,
  color,
  type = "",
  reveal = true,
  text = "View Project",
  priority = false,
}: {
  src?: StaticImageData | string
  alt: string
  color?: string
  type?: string
  reveal?: boolean
  text?: string
  priority?: boolean
}) => {
  return (
    <div
      className={`h-full w-full overflow-hidden rounded-2xl [&_span]:transition-opacity [&_span]:duration-400 ${reveal ? "reveal-false:[&_span]:opacity-0" : "group relative"}`}
    >
      <div className="h-full w-full text-white duration-400 group-hover:scale-105">
        <span
          className={clsx(
            "absolute inset-0 overflow-hidden rounded-2xl opacity-90 contain-strict group-hover:opacity-0 after:absolute after:inset-0 after:z-4 after:rounded-2xl after:duration-200 after:content-['']"
          )}
          style={
            { "--color-gradient": color, background: "linear-gradient(to top, var(--color-gradient), #00000056 25%, transparent 50%)" } as React.CSSProperties
          }
        >
          <span className="absolute top-2 left-2 w-fit rounded-full border border-gray-700 bg-black px-4 py-2 text-xs shadow-md">{type}</span>
          <span className="absolute bottom-4 left-4 z-5 w-fit text-lg">{alt.split(" ")[0]}</span>
          <span className="absolute right-4 bottom-4 z-5 flex w-fit items-center gap-1 text-xs">
            {/* SVG inlined for performance */}
            <svg className="h-4 w-4" height="16" width="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0z" />
            </svg>
            {text}
          </span>
        </span>
        {src ? (
          <Image className="h-full w-full bg-gray-200 object-cover" src={src} alt={alt} priority={priority} decoding="async" />
        ) : (
          <div
            className="relative h-full w-full min-h-[260px] overflow-hidden bg-slate-950 md:min-h-[300px]"
            style={{
              background: `radial-gradient(ellipse at 85% 15%, ${color}45, transparent 65%), linear-gradient(145deg, #0f172a 0%, #020617 100%)`,
            }}
          >
            <div className="absolute inset-0 opacity-[0.12] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />
            <div className="pointer-events-none absolute inset-0 [background-image:url('/assets/framer-noise.png')] [background-size:128px] opacity-10" />
          </div>
        )}
      </div>
    </div>
  )
}
