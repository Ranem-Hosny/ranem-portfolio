import { motion } from 'framer-motion'
import { profile, stats } from '../data/profile'
import { useTypewriter } from '../hooks/useTypewriter'
import MagneticButton from './ui/MagneticButton'
import { smoothScrollTo } from '../utils/scroll'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
}
const item = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero({ start }) {
  const role = useTypewriter(profile.roles)

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-16"
    >
      {/* ── Ambient background ───────────────────────────── */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,var(--bg)_82%)]" />
        <div className="absolute -left-24 top-10 h-[34rem] w-[34rem] animate-blob-1 rounded-full bg-cyan/20 blur-[140px]" />
        <div className="absolute right-0 top-1/4 h-[30rem] w-[30rem] animate-blob-2 rounded-full bg-violet/20 blur-[140px]" />
        <div className="absolute bottom-0 left-1/3 h-[26rem] w-[26rem] animate-blob-3 rounded-full bg-electric/15 blur-[130px]" />
      </div>

      {/* ── Content ──────────────────────────────────────── */}
      <motion.div
        className="relative mx-auto grid w-full max-w-6xl items-center gap-10 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14"
        variants={container}
        initial="hidden"
        animate={start ? 'show' : 'hidden'}
      >
        {/* LEFT — photo */}
        <motion.div
          variants={item}
          className="relative order-2 mx-auto w-full max-w-xs sm:max-w-sm lg:order-1 lg:mx-0"
        >
          {/* glow halo behind the circle */}
          <div className="pointer-events-none absolute -inset-6 -z-10 rounded-full bg-gradient-to-br from-cyan/30 via-violet/25 to-electric/15 blur-3xl" />

          {/* circular photo */}
          <div className="relative aspect-square overflow-hidden rounded-full border border-line-strong bg-bg shadow-2xl">
            <img
              src="/me.png"
              alt={profile.name}
              className="h-full w-full object-cover"
            />
          </div>
        </motion.div>

        {/* RIGHT — name + content */}
        <div className="order-1 lg:order-2">
          {/* big name on top */}
          <motion.h1
            variants={item}
            className="text-left font-extrabold leading-[1.05] tracking-tight text-[clamp(2.2rem,5.6vw,4.2rem)]"
          >
            <span className="text-ink">{profile.firstName}</span>{' '}
            <span className="text-gradient glow-text">{profile.lastName}</span>
          </motion.h1>

          {/* typing role */}
          <motion.div
            variants={item}
            className="mt-6 flex items-center gap-2 font-mono text-lg sm:text-2xl"
          >
            <span className="text-faint">{'<'}</span>
            <span className="font-semibold text-ink">{role}</span>
            <span className="caret h-6 sm:h-7" />
            <span className="text-faint">{'/>'}</span>
          </motion.div>

          {/* tagline */}
          <motion.p
            variants={item}
            className="mt-6 max-w-md text-base leading-relaxed text-muted sm:text-lg"
          >
            {profile.tagline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={item}
            className="mt-8 flex flex-col items-start gap-3.5 sm:flex-row sm:flex-wrap sm:items-center"
          >
            <MagneticButton
              href="#work"
              onClick={(e) => {
                e.preventDefault()
                smoothScrollTo('work', -80)
              }}
              className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-cyan to-violet px-7 py-3.5 font-semibold text-bg shadow-glow sm:w-auto"
            >
              <span className="shimmer absolute inset-0 animate-shimmer opacity-0 transition-opacity group-hover:opacity-100" />
              View Projects
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </MagneticButton>

            <MagneticButton
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                smoothScrollTo('contact', -80)
              }}
              className="glass inline-flex w-full items-center justify-center gap-2 rounded-xl border-line-strong px-7 py-3.5 font-semibold text-ink transition-colors hover:border-accent sm:w-auto"
            >
              Contact Me
              <span className="h-2 w-2 rounded-full bg-accent" />
            </MagneticButton>

            <a
              href={profile.resume}
              download
              className="group inline-flex items-center gap-2 px-1 py-2 text-sm font-semibold text-muted transition-colors hover:text-accent"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform group-hover:translate-y-0.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3v14M5 12l7 7 7-7M5 21h14" />
              </svg>
              Download CV
            </a>
          </motion.div>

          {/* stats */}
          <motion.div
            variants={item}
            className="mt-12 grid max-w-lg grid-cols-2 gap-y-6 sm:grid-cols-4 sm:divide-x sm:divide-line sm:gap-y-0"
          >
            {stats.map((s) => (
              <div key={s.label} className="px-2 text-center sm:first:pl-0">
                <div className="text-2xl font-extrabold text-gradient-soft sm:text-3xl">
                  {s.value}
                </div>
                <div className="mt-1 text-xs text-faint sm:text-sm">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
