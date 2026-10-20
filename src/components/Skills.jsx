import { motion } from 'framer-motion'
import { skills } from '../data/skills'
import SectionHeading from './ui/SectionHeading'
import TechIcon from './ui/TechIcon'
import { useLang } from '../context/LanguageContext'

/* Extra concepts that scroll past in the marquee strip below the skill list */
const KEYWORDS = [
  'Authentication',
  'Responsive Design',
  'SEO Optimization',
  'Git',
  'GitHub',
  'REST APIs',
  'Performance',
  'Accessibility (a11y)',
  'Clean Code',
  'Component Architecture',
  'Design Systems',
  'Vibe Coding',
  'Cross-Browser',
  'Mobile-First',
]

/* One skill row: icon + name + thin animated bar + percentage */
function SkillRow({ skill, index }) {
  const { pick } = useLang()
  return (
    <motion.div
      initial={{ opacity: 0, x: -18 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: (index % 5) * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      {/* top line: icon + name + percentage */}
      <div className="mb-2 flex items-center gap-3">
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line bg-bg-soft transition-transform duration-300 group-hover:scale-110"
        >
          <TechIcon icon={skill.icon} className="h-6 w-6" />
        </span>

        <div className="min-w-0 flex-1">
          <div className="truncate font-bold text-ink">{skill.name}</div>
          <div className="font-mono text-[0.62rem] uppercase tracking-wider text-faint">
            {pick(skill, 'category')}
          </div>
        </div>

        <span
          className="font-mono text-sm font-bold tabular-nums"
          style={{ color: 'var(--ink)' }}
        >
          {skill.level}
          <span className="text-xs text-faint">%</span>
        </span>
      </div>

      {/* animated bar */}
      <div className="h-[5px] overflow-hidden rounded-full bg-line">
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'var(--accent)' }}
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.15, delay: 0.2 + (index % 5) * 0.05, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const { t } = useLang()
  return (
    <section id="skills" className="relative py-24 sm:py-32">

      <div className="mx-auto max-w-[84rem] px-6 lg:px-10">
        <SectionHeading
          index="// 02"
          kicker={t('skills.kicker')}
          title={t('skills.title')}
          accent={t('skills.accent')}
          lead={t('skills.lead')}
        />

        {/* skill rows, 2 columns on lg */}
        <div className="mt-14 rounded-2xl border border-line bg-bg-soft/40 p-6 sm:p-8">
          <div className="grid gap-x-12 gap-y-6 lg:grid-cols-2">
            {skills.map((skill, i) => (
              <SkillRow key={skill.name} skill={skill} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Full-width horizontal marquee of extra concepts ── */}
      <div dir="ltr" className="relative mt-16 overflow-hidden border-y border-line bg-bg-soft/30 py-5">
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-bg to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-bg to-transparent" />

        <div className="flex w-max animate-marquee gap-10">
          {[...Array(2)].map((_, dup) => (
            <div
              key={dup}
              className="flex shrink-0 items-center gap-10 font-mono text-base text-muted"
              aria-hidden={dup === 1 ? true : undefined}
            >
              {KEYWORDS.map((kw, i) => (
                <span
                  key={`${dup}-${i}`}
                  className="flex items-center gap-3 whitespace-nowrap"
                >
                  <span className="text-accent">◆</span>
                  {kw}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
