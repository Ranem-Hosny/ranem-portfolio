import { motion } from 'framer-motion'
import { profile, programs } from '../data/profile'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'

/* Quick-facts shown beside the bio */
const FACTS = [
  { label: 'Experience', value: '3+ Years' },
  { label: 'Focus', value: 'Frontend & Cross-Platform' },
  { label: 'Based in', value: profile.location },
  { label: 'Status', value: 'Open to work' },
]

/* One entry in the training timeline */
function ProgramCard({ program, index, last }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.14, ease: [0.22, 1, 0.36, 1] }}
      className="relative pl-14"
    >
      {/* connecting line */}
      {!last && (
        <span className="absolute left-[21px] top-12 -bottom-5 w-px bg-gradient-to-b from-line-strong to-transparent" />
      )}
      {/* node */}
      <span className="absolute left-1 top-1 flex h-11 w-11 items-center justify-center rounded-full border border-line-strong bg-bg-soft">
        <span className="h-3 w-3 rounded-full bg-gradient-to-br from-cyan to-violet shadow-glow" />
      </span>

      <div className="glass rounded-2xl border-line p-5 transition-colors duration-300 hover:border-line-strong">
        <div className="flex items-center justify-between gap-3">
          <span className="text-xl font-extrabold tracking-tight text-gradient-soft">
            {program.org}
          </span>
          <span className="rounded-full border border-line-strong px-2.5 py-0.5 font-mono text-[0.62rem] uppercase tracking-wider text-accent">
            {program.badge}
          </span>
        </div>
        <div className="mt-0.5 text-xs text-faint">{program.fullName}</div>
        <h4 className="mt-3 font-bold text-ink">{program.track}</h4>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">{program.detail}</p>
      </div>
    </motion.div>
  )
}

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute left-0 top-1/4 h-96 w-96 rounded-full bg-cyan/10 blur-[150px]" />

      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          index="// 01"
          kicker="About Me"
          title="A frontend dev with"
          accent="intent."
          lead="The person behind the code — what I do, and how I got here."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* ── left: bio + quick facts ── */}
          <div>
            <Reveal>
              <div className="space-y-4 text-base leading-relaxed text-muted sm:text-lg">
                {profile.about.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-8 grid grid-cols-2 gap-3">
                {FACTS.map((fact) => (
                  <div
                    key={fact.label}
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

          {/* ── right: training timeline ── */}
          <div>
            <Reveal>
              <div className="mb-7 flex items-center gap-3">
                <span className="kicker">Training &amp; Scholarships</span>
                <span className="h-px flex-1 bg-gradient-to-r from-line-strong to-transparent" />
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
          </div>
        </div>
      </div>
    </section>
  )
}
