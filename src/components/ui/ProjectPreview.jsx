import { useRef } from 'react'

/**
 * ProjectPreview — visual for a project card.
 * Priority: `video` > `image` > generated abstract artwork tinted by `gradient`.
 * When a video is supplied it plays muted-on-hover for a polished, lightweight feel.
 */
export default function ProjectPreview({ project }) {
  const videoRef = useRef(null)
  const [c1, c2] = project.gradient

  if (project.video) {
    return (
      <div
        className="absolute inset-0"
        onMouseEnter={() => videoRef.current?.play().catch(() => {})}
        onMouseLeave={() => {
          const v = videoRef.current
          if (!v) return
          v.pause()
          v.currentTime = 0
        }}
      >
        <video
          ref={videoRef}
          src={project.video}
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    )
  }

  if (project.image) {
    return (
      <img
        src={project.image}
        alt={project.title}
        className="absolute inset-0 h-full w-full object-cover object-top"
        loading="lazy"
      />
    )
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* tinted base */}
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}
      />
      {/* depth wash */}
      <div className="absolute inset-0 bg-[#05060e]/55" />
      {/* glow orb */}
      <div
        className="absolute -right-10 -top-10 h-44 w-44 rounded-full blur-3xl opacity-60"
        style={{ background: c1 }}
      />

      {/* faux browser window */}
      <div className="absolute inset-x-5 top-5 bottom-0">
        <div className="rounded-t-xl border border-white/15 bg-white/10 backdrop-blur-md">
          {/* chrome bar */}
          <div className="flex items-center gap-1.5 px-3 py-2.5">
            <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
            <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
            <span className="h-2 w-2 rounded-full bg-[#28c840]" />
            <span className="ml-3 h-3.5 flex-1 rounded-full bg-white/15" />
          </div>
          {/* app body */}
          <div className="flex gap-2.5 px-3 pb-3">
            {/* sidebar */}
            <div className="flex w-9 flex-col gap-1.5">
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className="h-2 rounded bg-white/25"
                  style={{ width: i === 0 ? '100%' : `${70 - i * 8}%` }}
                />
              ))}
            </div>
            {/* main */}
            <div className="flex-1">
              <div
                className="mb-2 h-12 rounded-lg"
                style={{ background: `linear-gradient(120deg, ${c1}, ${c2})` }}
              />
              <div className="grid grid-cols-3 gap-1.5">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="h-7 rounded-md bg-white/20" />
                ))}
              </div>
              <div className="mt-2 space-y-1.5">
                <span className="block h-1.5 w-5/6 rounded bg-white/20" />
                <span className="block h-1.5 w-2/3 rounded bg-white/15" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* watermark mark */}
      <span className="absolute bottom-3 right-4 font-mono text-[0.62rem] uppercase tracking-[0.25em] text-white/70">
        {project.id}.app
      </span>
    </div>
  )
}
