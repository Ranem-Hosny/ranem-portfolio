import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { projects } from '../data/projects'
import SectionHeading from './ui/SectionHeading'
import ProjectPreview from './ui/ProjectPreview'

/* Icons */
const LinkIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M10 14 21 3M15 3h6v6M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
  </svg>
)
const GitIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49v-1.7c-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.55-1.14-4.55-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.94.68 1.9v2.82c0 .27.18.59.69.49A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
  </svg>
)
const BuildingIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M3 21h18M5 21V7l7-4 7 4v14M9 9h.01M13 9h.01M9 13h.01M13 13h.01M9 17h.01M13 17h.01" />
  </svg>
)

/* Stagger config so body content fades in nicely under the preview */
const bodyStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.25 } },
}
const bodyItem = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

function ProjectCard({ project, index, className = '' }) {
  const ref = useRef(null)
  const hasLive = Boolean(project.live)

  /* Mouse-tracked 3D tilt */
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 220, damping: 20 })
  const sry = useSpring(ry, { stiffness: 220, damping: 20 })
  const rotateX = useTransform(sry, [-0.5, 0.5], ['6deg', '-6deg'])
  const rotateY = useTransform(srx, [-0.5, 0.5], ['-6deg', '6deg'])

  const handleMouse = (e) => {
    const r = ref.current.getBoundingClientRect()
    rx.set((e.clientX - r.left) / r.width - 0.5)
    ry.set((e.clientY - r.top) / r.height - 0.5)
    // also drive a CSS variable for the cursor-tracked glow
    ref.current.style.setProperty('--mx', `${e.clientX - r.left}px`)
    ref.current.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  const reset = () => {
    rx.set(0)
    ry.set(0)
  }

  return (
    <motion.article
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-bg-soft transition-colors duration-300 hover:border-line-strong ${className}`}
    >
      {/* ── cursor-tracked radial glow ── */}
      <div
        className="pointer-events-none absolute inset-0 z-20 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(420px circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.09), transparent 45%)',
        }}
      />

      {/* ── diagonal shine sweep ── */}
      <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-2xl">
        <div className="absolute -inset-y-2 left-0 w-1/2 -translate-x-[150%] -skew-x-12 bg-gradient-to-r from-transparent via-white/12 to-transparent transition-transform duration-[1100ms] ease-out group-hover:translate-x-[260%]" />
      </div>

      {/* ── animated gradient ring on hover ── */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `linear-gradient(135deg, ${project.gradient[0]}66, transparent 40%, transparent 60%, ${project.gradient[1]}66)`,
          padding: '1px',
          WebkitMask:
            'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />

      {/* ── PREVIEW ── */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <motion.div
          className="absolute inset-0"
          whileHover={{ scale: 1.07 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <ProjectPreview project={project} />
        </motion.div>

        {/* corner chips */}
        <span className="absolute left-3 top-3 z-10 max-w-[70%] truncate rounded-full border border-line-strong bg-[#05060e]/80 px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-wider text-white backdrop-blur-md">
          {project.category}
        </span>
        <span className="absolute right-3 top-3 z-10 rounded-full border border-line-strong bg-[#05060e]/80 px-2.5 py-1 font-mono text-[0.58rem] text-white backdrop-blur-md">
          {project.year}
        </span>

        {project.featured && (
          <motion.span
            className="absolute bottom-3 left-3 z-10 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-cyan to-violet px-2.5 py-1 text-[0.58rem] font-bold text-bg shadow-glow"
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            ★ Featured
          </motion.span>
        )}
        {project.iti && (
          <span className="absolute bottom-3 right-3 z-10 inline-flex items-center gap-1 rounded-full border border-line-strong bg-[#05060e]/80 px-2 py-0.5 text-[0.55rem] font-bold uppercase text-white backdrop-blur-md">
            <img src="/projects/iti.png" alt="ITI" className="h-3 w-3 rounded-sm" />
            ITI
          </span>
        )}

        {/* hover overlay with action chip */}
        <div className="pointer-events-none absolute inset-0 z-10 flex items-end justify-center bg-gradient-to-t from-[#05060e]/85 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="mb-4 inline-flex translate-y-3 items-center gap-1.5 rounded-full bg-ink px-3.5 py-1.5 text-[0.7rem] font-semibold text-bg transition-transform duration-300 group-hover:translate-y-0">
            {hasLive ? 'Visit Live' : 'View Code'}
            {hasLive ? <LinkIcon className="h-3 w-3" /> : <GitIcon className="h-3 w-3" />}
          </span>
        </div>
      </div>

      {/* ── BODY (staggered children) ── */}
      <motion.div
        variants={bodyStagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
        className="flex flex-1 flex-col p-5"
      >
        <motion.h3
          variants={bodyItem}
          className="text-lg font-extrabold leading-tight tracking-tight text-ink transition-colors group-hover:text-accent"
        >
          {project.title}
        </motion.h3>

        {project.company && (
          <motion.div variants={bodyItem} className="mt-2">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-line-strong bg-bg/60 px-2.5 py-0.5 text-[0.65rem] font-semibold text-accent">
              <BuildingIcon className="h-3 w-3" />
              Built at {project.company}
            </span>
          </motion.div>
        )}

        <motion.p
          variants={bodyItem}
          className="mt-3 flex-1 text-sm leading-relaxed text-muted"
        >
          {project.description}
        </motion.p>

        <motion.div variants={bodyItem} className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-md border border-line bg-bg px-2 py-0.5 font-mono text-[0.66rem] text-muted transition-colors group-hover:border-line-strong"
            >
              {t}
            </span>
          ))}
        </motion.div>

        <motion.div
          variants={bodyItem}
          className="mt-5 flex items-center gap-2 border-t border-line pt-4"
        >
          {hasLive ? (
            <>
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="group/btn inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-cyan to-violet px-3 py-2 text-xs font-semibold text-bg transition-transform hover:scale-[1.03]"
              >
                Live Demo
                <LinkIcon className="h-3 w-3 transition-transform group-hover/btn:translate-x-0.5" />
              </a>
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${project.title} on GitHub`}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line-strong text-muted transition-colors hover:border-accent hover:text-ink"
                >
                  <GitIcon className="h-4 w-4" />
                </a>
              )}
            </>
          ) : (
            project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="group/btn inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-cyan to-violet px-3 py-2 text-xs font-semibold text-bg transition-transform hover:scale-[1.03]"
              >
                <GitIcon className="h-3.5 w-3.5" />
                View Code
              </a>
            )
          )}
        </motion.div>
      </motion.div>
    </motion.article>
  )
}

export default function Projects() {
  return (
    <section id="work" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute left-0 top-1/4 h-96 w-96 rounded-full bg-cyan/10 blur-[150px]" />
      <div className="pointer-events-none absolute right-0 bottom-1/4 h-96 w-96 rounded-full bg-violet/10 blur-[150px]" />

      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          index="// 03"
          kicker="Selected Work"
          title="Projects I've"
          accent="shipped."
          lead="A handful of builds where motion, performance and detail came together. Each one is live or open-source — pick one to explore."
        />

        {/* perspective on the grid so each card's 3D tilt has depth */}
        <div className="perspective mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
