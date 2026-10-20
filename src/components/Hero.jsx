import { motion } from 'framer-motion'
import { profile, stats } from '../data/profile'
import { useTypewriter } from '../hooks/useTypewriter'
import MagneticButton from './ui/MagneticButton'
import { smoothScrollTo } from '../utils/scroll'
import { useLang } from '../context/LanguageContext'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
}
const item = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero({ start }) {
  const { t, pick } = useLang()
  const role = useTypewriter(pick(profile, 'roles'))

  return (
    <>
      <section id="home" className="relative flex items-center overflow-hidden pb-32 pt-28 lg:min-h-[92vh] lg:pb-36 lg:pt-32">
        {/* ── Ambient background ───────────────────────────── */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,var(--bg)_82%)]" />
        </div>

        {/* ── Content: name on one side, the pitch on the other ── */}
        <motion.div
          className="relative mx-auto grid w-full max-w-[84rem] items-center gap-10 px-6 lg:grid-cols-12 lg:gap-12 lg:px-10"
          variants={container}
          initial="hidden"
          animate={start ? 'show' : 'hidden'}
        >
          {/* big name */}
          <motion.h1
            variants={item}
            className="whitespace-nowrap font-extrabold leading-[1.1] tracking-tight text-[clamp(2.6rem,5.4vw,5.4rem)] rtl:leading-[1.35] lg:col-span-6"
          >
            <span className="text-ink">{pick(profile, 'firstName')}</span>{' '}
            <span className="text-gradient glow-text inline-block pb-[0.08em] rtl:pb-[0.2em]">{pick(profile, 'lastName')}</span>
          </motion.h1>

          {/* role, pitch, actions */}
          <div className="lg:col-span-6 lg:border-s lg:border-line lg:ps-12">
            <motion.div
              variants={item}
              dir="ltr"
              className="flex items-center gap-2 font-mono text-lg rtl:justify-end sm:text-2xl"
            >
              <span className="text-faint">{'<'}</span>
              <span className="font-semibold text-ink">{role}</span>
              <span className="caret h-6 sm:h-7" />
              <span className="text-faint">{'/>'}</span>
            </motion.div>

            <motion.p variants={item} className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {pick(profile, 'tagline')}
            </motion.p>

            <motion.div variants={item} className="mt-9 flex flex-col gap-3.5 sm:flex-row sm:flex-wrap sm:items-center">
              <MagneticButton
                href="#work"
                onClick={(e) => {
                  e.preventDefault()
                  smoothScrollTo('work', -80)
                }}
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-cyan to-violet px-7 py-3.5 font-semibold text-bg shadow-glow"
              >
                <span className="shimmer absolute inset-0 animate-shimmer opacity-0 transition-opacity group-hover:opacity-100" />
                {t('hero.viewProjects')}
                <svg viewBox="0 0 24 24" className="h-4 w-4 rtl:-scale-x-100" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </MagneticButton>

              <MagneticButton
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  smoothScrollTo('contact', -80)
                }}
                className="glass inline-flex items-center justify-center gap-2 rounded-xl border-line-strong px-7 py-3.5 font-semibold text-ink transition-colors hover:border-cyan"
              >
                {t('hero.contactMe')}
                <span className="h-2 w-2 rounded-full bg-cyan" />
              </MagneticButton>

              <a
                href={profile.resume}
                download
                className="group inline-flex items-center justify-center gap-2 px-1 py-2 text-sm font-semibold text-muted transition-colors hover:text-cyan"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform group-hover:translate-y-0.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3v14M5 12l7 7 7-7M5 21h14" />
                </svg>
                {t('hero.downloadCv')}
              </a>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ── Stats card overlapping the bottom edge of the hero ── */}
      <div className="relative z-10 mx-auto -mt-20 max-w-[84rem] px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={start ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="glass grid grid-cols-2 gap-y-6 rounded-3xl border-line-strong px-4 py-7 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] sm:grid-cols-4 sm:gap-y-0 sm:[&>*+*]:border-s sm:[&>*+*]:border-line"
        >
          {stats.map((s) => (
            <div key={s.value + s.label} className="px-4 text-center">
              <div className="text-3xl font-extrabold text-gradient-soft sm:text-4xl">{s.value}</div>
              <div className="mt-1.5 text-xs text-faint sm:text-sm">{pick(s, 'label')}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </>
  )
}
