import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { projects } from '../data/projects'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'
import { useLang } from '../context/LanguageContext'

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

const SCREEN_RATIO = 19.5 / 9 // height / width of the phone screen
// Wide screenshots get cropped to the phone — `imageFocus` picks which side stays in view
const FOCUS = { left: '0%', center: '50%', right: '100%' }
const endYear = (p) => Number(p.year.match(/\d{4}/g).pop())

// Client work first, then personal & training — newest first inside each group
const ordered = [...projects].sort(
  (a, b) => Number(Boolean(b.company)) - Number(Boolean(a.company)) || endYear(b) - endYear(a),
)

// One filter per kind of work, in the order they appear as tabs
const FILTERS = ['website', 'landing', 'webapp', 'saas', 'seo']
  .map((type) => ({ id: type, test: (p) => p.type === type }))
  .filter((f) => ordered.some(f.test))

/** Readable address for the URL bar: the live domain, or the repo path. */
function addressOf(project) {
  const url = project.live || project.github
  if (!url) return `${project.id}.app`
  const { hostname, pathname } = new URL(url)
  const host = hostname.replace(/^www\./, '')
  return project.live ? host : `${host}${pathname.replace(/\/$/, '')}`
}

/* ── Phone frame: tall screenshots scroll top → bottom on hover, short ones fill the screen ── */
function PhoneFrame({ project }) {
  const { t, pick } = useLang()
  const [ratio, setRatio] = useState(null)
  const [hover, setHover] = useState(false)
  const reduce = useReducedMotion()
  const tall = ratio !== null && ratio > SCREEN_RATIO
  const travel = tall ? (1 - SCREEN_RATIO / ratio) * 100 : 0
  const scrolling = hover && tall && !reduce

  return (
    <div
      onPointerEnter={(e) => e.pointerType === 'mouse' && setHover(true)}
      onPointerLeave={(e) => e.pointerType === 'mouse' && setHover(false)}
      onPointerUp={(e) => e.pointerType !== 'mouse' && tall && setHover((h) => !h)}
      className="relative rounded-[2.75rem] border border-line-strong bg-bg-soft p-2.5 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.55)]"
    >
      {/* side buttons */}
      <span className="absolute -start-[3px] top-24 h-10 w-[3px] rounded-s bg-line-strong" aria-hidden="true" />
      <span className="absolute -start-[3px] top-36 h-14 w-[3px] rounded-s bg-line-strong" aria-hidden="true" />
      <span className="absolute -end-[3px] top-28 h-16 w-[3px] rounded-e bg-line-strong" aria-hidden="true" />

      {/* screen */}
      <div className="relative aspect-[9/19.5] overflow-hidden rounded-[2.2rem] bg-bg">
        {project.video ? (
          <video
            src={project.video}
            muted
            loop
            playsInline
            autoPlay={!reduce}
            controls={reduce}
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : project.mobileImage || project.image ? (
          <img
            src={project.mobileImage || project.image}
            alt={`${pick(project, 'title')} ${t('work.website')}`}
            loading="lazy"
            onLoad={(e) => setRatio(e.currentTarget.naturalHeight / e.currentTarget.naturalWidth)}
            className={
              tall
                ? 'absolute inset-x-0 top-0 h-auto w-full'
                : `absolute inset-0 h-full w-full object-cover ${hover && !reduce ? 'animate-phone-pan' : ''}`
            }
            style={
              tall
                ? {
                    transform: `translateY(-${scrolling ? travel : 0}%)`,
                    transition: `transform ${scrolling ? Math.min(9, 0.8 * ratio) : 0.9}s ease-in-out`,
                  }
                : { objectPosition: `${FOCUS[project.imageFocus] ?? '50%'} top` }
            }
          />
        ) : (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center text-white"
            style={{ background: `linear-gradient(160deg, ${project.gradient[0]}, ${project.gradient[1]})` }}
          >
            <div className="grid-bg absolute inset-0 opacity-25" aria-hidden="true" />
            <span dir="auto" className="relative text-[1.9rem] font-extrabold leading-none tracking-tight drop-shadow">
              {pick(project, 'title')}
            </span>
            <span className="relative font-mono text-[0.62rem] uppercase tracking-[0.2em] text-white/75">
              {pick(project, 'category')}
            </span>
          </div>
        )}

        {/* dynamic island */}
        <span className="absolute left-1/2 top-2.5 h-[1.35rem] w-[5.5rem] -translate-x-1/2 rounded-full bg-black" aria-hidden="true" />

        {/* bottom address bar, like mobile Safari */}
        <div className="absolute inset-x-2.5 bottom-2.5">
          {tall && !reduce && (
            <span
              className={`pointer-events-none mx-auto mb-2 block w-max rounded-full bg-[#05060e]/80 px-3 py-1 font-mono text-[0.58rem] text-white backdrop-blur-md transition-opacity duration-300 ${
                hover ? 'opacity-0' : 'opacity-100'
              }`}
            >
              <span className="hidden [@media(hover:hover)]:inline">{t('work.hoverHint')}</span>
              <span className="[@media(hover:hover)]:hidden">{t('work.tapHint')}</span>
            </span>
          )}
          <span className="flex items-center justify-center gap-1.5 rounded-2xl bg-[#05060e]/75 px-3 py-2 font-mono text-[0.62rem] text-white/85 backdrop-blur-md">
            <svg viewBox="0 0 24 24" className="h-2.5 w-2.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
              <rect x="5" y="11" width="14" height="10" rx="2" />
              <path d="M8 11V8a4 4 0 0 1 8 0v3" />
            </svg>
            <span className="truncate">{addressOf(project)}</span>
          </span>
        </div>
      </div>
    </div>
  )
}

/* ── Details under the frame ── */
function ProjectDetails({ project }) {
  const { t, pick } = useLang()
  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-mono text-xs text-faint">{project.year}</span>
        {project.company && (
          <span className="ms-1 inline-flex items-center gap-1.5 rounded-full border border-line-strong px-2.5 py-0.5 text-[0.68rem] font-semibold text-[color:var(--accent)]">
            <BuildingIcon className="h-3 w-3" />
            {t('work.builtAt')} {project.company}
          </span>
        )}
        {project.iti && (
          <span className="inline-flex items-center gap-1 rounded-full border border-line-strong px-2 py-0.5 text-[0.68rem] font-bold text-ink">
            <img src="/projects/iti.png" alt="" className="h-3.5 w-3.5 rounded-sm" />
            {t('work.itiProject')}
          </span>
        )}
      </div>

      <h3 className="mt-3 text-start text-[clamp(1.6rem,3vw,2.2rem)] font-extrabold leading-tight tracking-tight text-ink">
        {pick(project, 'title')}
      </h3>

      <p className="mt-3 max-w-2xl leading-relaxed text-muted">{pick(project, 'description')}</p>

      <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={t('work.builtWith')}>
        {project.tech.map((t) => (
          <li key={t} className="rounded-md border border-line bg-bg px-2 py-0.5 font-mono text-[0.7rem] text-muted">
            {t}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            className="group/btn inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan to-violet px-5 py-2.5 text-sm font-semibold text-bg shadow-glow transition-transform hover:scale-[1.03]"
          >
            {t('work.visitLive')}
            <LinkIcon className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5" />
          </a>
        )}
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-line-strong px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-[color:var(--accent)]"
          >
            <GitIcon className="h-4 w-4" />
            {t('work.sourceCode')}
          </a>
        )}
      </div>
    </div>
  )
}

const ArrowIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

/* ── Prev / next, counter and a clickable progress strip ── */
function Stepper({ list, index, onGo, autoplay, paused, onDone }) {
  const { pick } = useLang()
  const pad = (n) => String(n).padStart(2, '0')
  const btn =
    'grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line-strong text-ink transition-colors hover:border-[color:var(--accent)] hover:text-[color:var(--accent)] disabled:pointer-events-none disabled:opacity-30'

  return (
    <div className="flex items-center gap-4">
      <button type="button" className={btn} onClick={() => onGo(index - 1)} disabled={index === 0} aria-label="Previous project">
        <ArrowIcon className="h-4 w-4 rotate-180 rtl:rotate-0" />
      </button>
      <button type="button" className={btn} onClick={() => onGo(index + 1)} disabled={index === list.length - 1} aria-label="Next project">
        <ArrowIcon className="h-4 w-4 rtl:rotate-180" />
      </button>

      <span className="shrink-0 font-mono text-sm text-muted" aria-live="polite">
        <span className="text-ink">{pad(index + 1)}</span> / {pad(list.length)}
      </span>

      <div className="flex min-w-0 flex-1 gap-1">
        {list.map((p, i) => (
          <button
            key={p.id}
            type="button"
            onClick={() => onGo(i)}
            title={pick(p, 'title')}
            aria-label={pick(p, 'title')}
            aria-current={i === index}
            className="group flex-1 py-2"
          >
            <span
              className={`relative block h-[3px] overflow-hidden rounded-full transition-colors ${
                i < index ? 'bg-muted' : 'bg-line-strong group-hover:bg-muted'
              }`}
            >
              {/* the active segment fills up while autoplay counts down to the next project */}
              {i === index && (
                <span
                  key={`${p.id}-${index}`}
                  className={`absolute inset-0 origin-left rounded-full bg-[color:var(--accent)] rtl:origin-right ${
                    autoplay ? 'animate-seg-fill' : ''
                  }`}
                  style={{ animationPlayState: paused ? 'paused' : 'running' }}
                  onAnimationEnd={onDone}
                />
              )}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default function Projects() {
  const { t } = useLang()
  const reduce = useReducedMotion()
  const [filter, setFilter] = useState(FILTERS[0].id)
  const list = ordered.filter(FILTERS.find((f) => f.id === filter).test)
  const [[index, dir], setStep] = useState([0, 0])
  const active = list[Math.min(index, list.length - 1)]

  // Start from the first project whenever the filter changes
  useEffect(() => setStep([0, 0]), [filter])

  // Autoplay: the active progress segment fills over 3s and its animationend moves to the
  // next project (looping), so pausing the bar pauses the slideshow too. Pauses while hovered
  // or keyboard-focused and while off-screen; never runs for reduced-motion users.
  const sectionRef = useRef(null)
  const [inView, setInView] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.4 })
    io.observe(sectionRef.current)
    return () => io.disconnect()
  }, [])
  const autoplay = !reduce && list.length > 1
  const paused = hovered || focused || !inView
  const advance = () => setStep(([i]) => [(i + 1) % list.length, 1])

  const go = (i) => {
    if (i < 0 || i >= list.length || i === index) return
    setStep([i, i > index ? 1 : -1])
  }

  const slide = {
    initial: (d) => ({ opacity: 0, x: reduce ? 0 : d * 48 }),
    animate: { opacity: 1, x: 0 },
    exit: (d) => ({ opacity: 0, x: reduce ? 0 : d * -48 }),
  }

  return (
    <section
      ref={sectionRef}
      id="work"
      onPointerEnter={(e) => e.pointerType === 'mouse' && setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={(e) => e.target.matches(':focus-visible') && setFocused(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setFocused(false)}
      className="relative flex min-h-[100svh] flex-col pb-10 pt-28 lg:h-[100svh] lg:pb-8"
      onKeyDown={(e) => {
        if (e.target.closest('input, textarea')) return
        const rtl = document.documentElement.dir === 'rtl'
        if (e.key === 'ArrowRight') go(index + (rtl ? -1 : 1))
        if (e.key === 'ArrowLeft') go(index + (rtl ? 1 : -1))
      }}
    >
      <div className="work-stage mx-auto grid w-full max-w-[84rem] flex-1 gap-8 px-6 lg:min-h-0 lg:grid-cols-[auto_1fr] lg:gap-16 lg:px-10">
        {/* phone — fills the section height on desktop */}
        <div className="order-2 flex justify-center lg:order-1 lg:h-full lg:items-center">
          <div className="phone-fit">
            <AnimatePresence mode="wait" initial={false} custom={dir}>
              <motion.div
                key={active.id}
                custom={dir}
                variants={slide}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <PhoneFrame project={active} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* heading, filters, details, stepper */}
        <div className="order-1 flex min-w-0 flex-col lg:order-2 lg:h-full">
          <SectionHeading index="// 03" kicker={t('work.kicker')} title={t('work.title')} accent={t('work.accent')} />

          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label={t('work.filterLabel')}>
              {FILTERS.map((f) => {
                const count = ordered.filter(f.test).length
                const on = filter === f.id
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFilter(f.id)}
                    aria-pressed={on}
                    className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${
                      on
                        ? 'border-transparent bg-ink text-bg'
                        : 'border-line-strong text-muted hover:border-[color:var(--accent)] hover:text-ink'
                    }`}
                  >
                    {t(`work.filters.${f.id}`)}
                    <span className={`ms-1.5 font-mono text-xs ${on ? 'text-bg opacity-70' : 'text-faint'}`}>{count}</span>
                  </button>
                )
              })}
            </div>
          </Reveal>

          {/* desktop: details sit between the filters and the stepper */}
          <div className="hidden min-h-0 flex-1 items-center lg:flex">
            <AnimatePresence mode="wait" initial={false} custom={dir}>
              <motion.div
                key={active.id}
                custom={dir}
                variants={slide}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.35, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
                className="w-full"
              >
                <ProjectDetails project={active} />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="hidden lg:block">
            <Stepper list={list} index={index} onGo={go} autoplay={autoplay} paused={paused} onDone={advance} />
          </div>
        </div>

        {/* mobile & tablet: stepper + details under the phone */}
        <div className="order-3 lg:hidden">
          <Stepper list={list} index={index} onGo={go} autoplay={autoplay} paused={paused} onDone={advance} />
          <AnimatePresence mode="wait" initial={false} custom={dir}>
            <motion.div
              key={active.id}
              custom={dir}
              variants={slide}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8"
            >
              <ProjectDetails project={active} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
