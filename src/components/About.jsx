import { motion } from 'framer-motion'
import { profile, programs, experience } from '../data/profile'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'
import { useLang } from '../context/LanguageContext'

/* Quick-facts shown beside the bio — [label, value] pairs from the strings file */
const FACT_KEYS = ['experience', 'focus', 'based', 'status']

/* One entry in the work-experience timeline */
function ExperienceCard({ exp, index, last }) {
  const { pick } = useLang()
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="relative ps-14"
    >
      {!last && (
        <span className="absolute start-[21px] top-12 -bottom-5 w-px bg-gradient-to-b from-line-strong to-transparent" />
      )}
      <span className="absolute start-1 top-1 flex h-11 w-11 items-center justify-center rounded-full border border-line-strong bg-bg-soft">
        <span className="h-3 w-3 rounded-full bg-gradient-to-br from-violet to-cyan shadow-glow" />
      </span>

      <div className="glass rounded-2xl border-line p-5 transition-colors duration-300 hover:border-line-strong">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="truncate text-xl font-extrabold tracking-tight text-gradient-soft">
              {exp.company}
            </div>
            <div className="mt-0.5 text-xs text-faint">
              {pick(exp, 'role')}
              {exp.employment && <span className="whitespace-nowrap text-muted"> · {pick(exp, 'employment')}</span>}
            </div>
          </div>
          <span className="shrink-0 rounded-full border border-line-strong px-2.5 py-0.5 font-mono text-[0.62rem] uppercase tracking-wider text-accent">
            {pick(exp, 'period')}
          </span>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted">{pick(exp, 'detail')}</p>
      </div>
    </motion.div>
  )
}

/* One entry in the training timeline */
function ProgramCard({ program, index, last }) {
  const { t, pick } = useLang()
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.14, ease: [0.22, 1, 0.36, 1] }}
      className="relative ps-14"
    >
      {/* connecting line */}
      {!last && (
        <span className="absolute start-[21px] top-12 -bottom-5 w-px bg-gradient-to-b from-line-strong to-transparent" />
      )}
      {/* node */}
      <span className="absolute start-1 top-1 flex h-11 w-11 items-center justify-center rounded-full border border-line-strong bg-bg-soft">
        <span className="h-3 w-3 rounded-full bg-gradient-to-br from-cyan to-violet shadow-glow" />
      </span>

      <div className="glass rounded-2xl border-line p-5 transition-colors duration-300 hover:border-line-strong">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            {program.logo && (
              <span className="flex h-16 shrink-0 items-center justify-center rounded-xl bg-white px-2.5 shadow-sm">
                <img src={program.logo} alt={`${program.org} ${t('about.logo')}`} className="h-12 w-auto max-w-[10rem] object-contain" />
              </span>
            )}
            <span className="text-base font-extrabold leading-snug tracking-tight text-gradient-soft">
              {pick(program, 'fullName')}
            </span>
          </div>
          <span className="rounded-full border border-line-strong px-2.5 py-0.5 font-mono text-[0.62rem] uppercase tracking-wider text-accent">
            {pick(program, 'badge')}
          </span>
        </div>
        <h4 className="mt-3 font-bold text-ink">{pick(program, 'track')}</h4>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">{pick(program, 'detail')}</p>
      </div>
    </motion.div>
  )
}

export default function About() {
  const { t, pick } = useLang()
  const facts = FACT_KEYS.map((key) => {
    const [label, value] = t(`about.facts.${key}`)
    return { key, label, value: key === 'based' ? pick(profile, 'location') : value }
  })

  return (
    <section id="about" className="relative py-24 sm:py-32">

      <div className="mx-auto max-w-[84rem] px-6 lg:px-10">
        <SectionHeading
          index="// 01"
          kicker={t('about.kicker')}
          title={t('about.title')}
          accent={t('about.accent')}
          lead={t('about.lead')}
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* ── bio + quick facts ── */}
          <div>
            <Reveal>
              <div className="space-y-4 text-base leading-relaxed text-muted sm:text-lg">
                {pick(profile, 'about').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-8 grid grid-cols-2 gap-3">
                {facts.map((fact) => (
                  <div
                    key={fact.key}
                    className="glass rounded-xl border-line p-4 transition-colors hover:border-line-strong"
                  >
                    <div className="font-mono text-[0.64rem] uppercase tracking-widest text-faint">
                      {fact.label}
                    </div>
                    <div className="mt-1 font-bold text-ink">{fact.value}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* ── training + work experience ── */}
          <div>
            <Reveal>
              <div className="mb-7 flex items-center gap-3">
                <span className="kicker">{t('about.training')}</span>
                <span className="h-px flex-1 bg-gradient-to-r from-line-strong to-transparent rtl:bg-gradient-to-l" />
              </div>
            </Reveal>
            <div className="space-y-5">
              {programs.map((program, i) => (
                <ProgramCard
                  key={program.org}
                  program={program}
                  index={i}
                  last={i === programs.length - 1}
                />
              ))}
            </div>

            <Reveal>
              <div className="mb-7 mt-12 flex items-center gap-3">
                <span className="kicker">{t('about.work')}</span>
                <span className="h-px flex-1 bg-gradient-to-r from-line-strong to-transparent rtl:bg-gradient-to-l" />
              </div>
            </Reveal>
            <div className="space-y-5">
              {experience.map((exp, i) => (
                <ExperienceCard
                  key={exp.company}
                  exp={exp}
                  index={i}
                  last={i === experience.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
