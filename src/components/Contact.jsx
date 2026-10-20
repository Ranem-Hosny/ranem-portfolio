import { useState } from 'react'
import { motion } from 'framer-motion'
import { profile } from '../data/profile'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'
import { useLang } from '../context/LanguageContext'

/* Social icon set */
const icons = {
  github: (
    <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49v-1.7c-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.55-1.14-4.55-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.94.68 1.9v2.82c0 .27.18.59.69.49A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
  ),
  linkedin: (
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
  ),
  whatsapp: (
    <path d="M.06 24l1.68-6.13A11.86 11.86 0 0 1 .14 11.9C.14 5.35 5.49 0 12.05 0a11.82 11.82 0 0 1 8.41 3.49 11.78 11.78 0 0 1 3.48 8.42c0 6.56-5.35 11.9-11.9 11.9a11.9 11.9 0 0 1-5.69-1.45L.06 24ZM6.6 20.13c1.68 1 3.28 1.6 5.44 1.6 5.45 0 9.89-4.43 9.9-9.88a9.86 9.86 0 0 0-2.9-7 9.78 9.78 0 0 0-6.98-2.9c-5.46 0-9.9 4.44-9.9 9.89 0 2.27.66 3.97 1.77 5.75l-.99 3.63 3.66-1.09ZM17.9 14.7c-.07-.12-.27-.2-.56-.34-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.44-.53.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41Z" />
  ),
}

const SOCIALS = [
  { key: 'github', label: 'GitHub', url: profile.socials.github },
  { key: 'linkedin', label: 'LinkedIn', url: profile.socials.linkedin },
  { key: 'whatsapp', label: 'WhatsApp', url: profile.socials.whatsapp },
]

function SocialButton({ social, index }) {
  const { t } = useLang()
  return (
    <motion.a
      href={social.url}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}
      whileHover={{ y: -6 }}
      className="group glass relative flex items-center gap-4 overflow-hidden rounded-2xl border-line p-4 transition-colors hover:border-line-strong"
    >
      <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-line-strong bg-bg-soft text-ink transition-colors duration-300 group-hover:border-accent/50 group-hover:text-accent">
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
          {icons[social.key]}
        </svg>
      </span>
      <span className="relative">
        <span className="block font-bold text-ink">{social.label}</span>
        <span className="block text-sm text-muted">{t(`contact.handles.${social.key}`)}</span>
      </span>
      <svg
        viewBox="0 0 24 24"
        className="relative ms-auto h-4 w-4 text-faint transition-all duration-300 group-hover:translate-x-1 group-hover:text-cyan rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      >
        <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </motion.a>
  )
}

/* ── Brief builder options — labels and message wording live in the strings file ── */
const WHO_IDS = ['individual', 'company']
const WHAT_IDS = ['website', 'webapp', 'saas', 'mobile', 'ui', 'dashboard']
const WHEN_IDS = ['asap', 'month', 'quarter', 'exploring']

/** Builds the WhatsApp message as parts, so chosen answers can be highlighted. */
function buildMessage({ who, what, when, name, details }, c) {
  const m = c.message
  return [
    { text: m.hello },
    name.trim() && { text: `${name.trim()}${m.nameSep}`, hl: true },
    who ? { text: c.who[who].phrase, hl: true } : { gap: m.gaps.who },
    { text: m.looking },
    what ? { text: c.what[what].phrase, hl: true } : { gap: m.gaps.what },
    { text: m.end },
    when ? { text: c.when[when].sentence, hl: true } : { gap: m.gaps.when },
    details.trim() && { text: ` ${details.trim()}` },
  ].filter(Boolean)
}
/* Numbered step wrapper — the next unanswered step gets the dashed accent frame */
function Step({ n, kicker, question, current, done, children }) {
  return (
    <div
      className={`rounded-2xl p-3 transition-colors sm:p-4 ${
        current ? 'border border-dashed border-cyan/40 bg-cyan/[0.03]' : 'border border-transparent'
      }`}
    >
      <div className="mb-3 flex flex-wrap items-center gap-3">
        <span
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border font-mono text-[0.7rem] ${
            done ? 'border-transparent bg-gradient-to-br from-cyan to-violet text-bg' : current ? 'border-cyan text-cyan' : 'border-line-strong text-faint'
          }`}
        >
          {done ? '✓' : n}
        </span>
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-faint">{kicker}</span>
        <span className="font-semibold text-ink">{question}</span>
      </div>
      {children}
    </div>
  )
}

export default function Contact() {
  const { t, pick, lang } = useLang()
  const c = t('contact')
  const [brief, setBrief] = useState({ who: '', what: '', when: '', name: '', details: '' })
  const [copied, setCopied] = useState(false)
  const set = (key, value) => setBrief((b) => ({ ...b, [key]: value }))

  const required = ['who', 'what', 'when']
  const left = required.filter((k) => !brief[k]).length
  const current = required.find((k) => !brief[k]) ?? 'details'
  const parts = buildMessage(brief, c)

  const send = () => {
    if (left) return
    const text = parts.map((p) => p.text ?? '').join('')
    window.open(`${profile.socials.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer')
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard unavailable — ignore */
    }
  }

  return (
    <section id="contact" className="relative py-24 sm:py-32">

      <div className="mx-auto max-w-[84rem] px-6 lg:px-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading index="// 04" kicker={c.kicker} title={c.title} accent={c.accent} />
          <Reveal delay={0.1}>
            <p className="max-w-sm leading-relaxed text-muted lg:mb-10">
              {c.intro} <span className="font-semibold text-ink">{c.introStrong}</span>
            </p>
          </Reveal>
        </div>

        <Reveal>
          <div className="glass mt-10 grid overflow-hidden rounded-3xl border-line lg:grid-cols-[1fr_minmax(0,22rem)]">
            {/* ── the questions ── */}
            <div className="space-y-3 p-3 sm:p-5">
              <Step n={1} kicker={c.steps.who[0]} question={c.steps.who[1]} current={current === 'who'} done={!!brief.who}>
                <div className="grid grid-cols-2 gap-1 rounded-xl border border-line bg-bg/40 p-1" role="radiogroup" aria-label={c.steps.who[1]}>
                  {WHO_IDS.map((id) => {
                    const on = brief.who === id
                    return (
                      <button
                        key={id}
                        type="button"
                        role="radio"
                        aria-checked={on}
                        onClick={() => set('who', id)}
                        className={`rounded-lg px-4 py-3 text-sm font-semibold transition-all ${
                          on ? 'border border-cyan/50 bg-cyan/10 text-ink shadow-glow' : 'border border-transparent text-muted hover:text-ink'
                        }`}
                      >
                        {c.who[id].label}
                      </button>
                    )
                  })}
                </div>
              </Step>

              <Step n={2} kicker={c.steps.what[0]} question={c.steps.what[1]} current={current === 'what'} done={!!brief.what}>
                <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3" role="radiogroup" aria-label={c.steps.what[1]}>
                  {WHAT_IDS.map((id) => {
                    const on = brief.what === id
                    const o = c.what[id]
                    return (
                      <button
                        key={id}
                        type="button"
                        role="radio"
                        aria-checked={on}
                        onClick={() => set('what', id)}
                        className={`flex items-center justify-between gap-3 rounded-xl border p-3.5 text-start transition-all ${
                          on ? 'border-cyan/50 bg-cyan/10' : 'border-line bg-bg/30 hover:border-line-strong'
                        }`}
                      >
                        <span className="min-w-0">
                          <span className={`block font-mono text-[0.66rem] uppercase tracking-[0.18em] ${on ? 'text-cyan' : 'text-faint'}`}>
                            {o.kicker}
                          </span>
                          <span className="mt-1 block text-sm font-semibold leading-snug text-ink">{o.title}</span>
                        </span>
                        <span
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                            on ? 'border-cyan' : 'border-line-strong'
                          }`}
                          aria-hidden="true"
                        >
                          {on && <span className="h-2 w-2 rounded-full bg-cyan" />}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </Step>

              <Step n={3} kicker={c.steps.when[0]} question={c.steps.when[1]} current={current === 'when'} done={!!brief.when}>
                <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={c.steps.when[1]}>
                  {WHEN_IDS.map((id) => {
                    const on = brief.when === id
                    return (
                      <button
                        key={id}
                        type="button"
                        role="radio"
                        aria-checked={on}
                        onClick={() => set('when', id)}
                        className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
                          on ? 'border-cyan/60 bg-cyan/10 text-ink' : 'border-line-strong text-muted hover:text-ink'
                        }`}
                      >
                        {c.when[id].label}
                      </button>
                    )
                  })}
                </div>
              </Step>

              <Step n={4} kicker={c.steps.details[0]} question={c.steps.details[1]} current={current === 'details'} done={false}>
                <div className="grid gap-2 sm:grid-cols-[minmax(0,12rem)_1fr]">
                  <input
                    value={brief.name}
                    onChange={(e) => set('name', e.target.value)}
                    placeholder={c.namePlaceholder}
                    autoComplete="name"
                    aria-label={c.namePlaceholder}
                    className="contact-input"
                  />
                  <input
                    value={brief.details}
                    onChange={(e) => set('details', e.target.value)}
                    placeholder={c.detailsPlaceholder}
                    aria-label={c.detailsLabel}
                    className="contact-input"
                  />
                </div>
              </Step>
            </div>

            {/* ── live WhatsApp preview ── */}
            <div className="flex flex-col border-t border-line bg-bg/30 p-4 sm:p-5 lg:border-s lg:border-t-0">
              <div className="flex items-center justify-between font-mono text-[0.68rem] uppercase tracking-[0.2em] text-faint">
                <span>{c.preview}</span>
                <span className="flex items-center gap-1.5 text-cyan">
                  <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-cyan" />
                  {c.live}
                </span>
              </div>

              <div className="mt-4 overflow-hidden rounded-2xl border border-line bg-bg/60">
                <div className="flex items-center gap-3 border-b border-line px-4 py-3">
                  <img src="/me.png" alt="" className="h-10 w-10 rounded-full bg-white object-cover object-[50%_35%]" />
                  <div>
                    <div className="text-sm font-bold text-ink">{pick(profile, 'name')}</div>
                    <div className="text-xs text-faint">{c.replies}</div>
                  </div>
                </div>
                <div className="grid-bg p-4">
                  <div className="ms-auto max-w-[95%] rounded-2xl rounded-se-sm border border-cyan/25 bg-gradient-to-br from-cyan/10 to-violet/10 p-3.5 text-[0.92rem] leading-relaxed text-ink">
                    <p aria-live="polite" lang={lang}>
                      {parts.map((p, i) =>
                        p.gap ? (
                          <span key={i} className="rounded border border-dashed border-line-strong px-1 text-faint">
                            {p.gap}
                          </span>
                        ) : p.hl ? (
                          <mark key={i} className="rounded bg-cyan/20 px-0.5 text-ink">
                            {p.text}
                          </mark>
                        ) : (
                          <span key={i}>{p.text}</span>
                        ),
                      )}
                    </p>
                    <div className="mt-2 text-end font-mono text-[0.62rem] text-faint">now ✓✓</div>
                  </div>
                </div>
              </div>
              <div className="h-4 shrink-0" aria-hidden="true" />

              <button
                type="button"
                onClick={send}
                disabled={left > 0}
                className="group mt-4 flex w-full items-center justify-between gap-3 rounded-2xl bg-gradient-to-r from-cyan to-violet py-2.5 pe-2.5 ps-5 text-start font-semibold text-bg shadow-glow transition-all enabled:hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none lg:mt-auto"
              >
                <span className="flex flex-wrap items-baseline gap-x-3">
                  {c.send}
                  <span className="font-mono text-[0.66rem] uppercase tracking-[0.18em] opacity-75">
                    {left ? c.stepsLeft(left) : c.ready}
                  </span>
                </span>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-bg text-cyan transition-transform group-enabled:group-hover:translate-x-0.5 rtl:group-enabled:group-hover:-translate-x-0.5">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 rtl:-scale-x-100" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </button>
              <p className="mt-2 text-center text-xs text-faint">{c.editNote}</p>
            </div>
          </div>
        </Reveal>

        {/* ── direct channels ── */}
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="glass flex flex-col justify-center rounded-2xl border-line p-4">
            <div className="kicker">{c.preferEmail}</div>
            <button onClick={copyEmail} className="mt-2 flex w-full items-center justify-between gap-2 text-start">
              <span dir="ltr" className="truncate font-mono text-sm text-ink">{profile.email}</span>
              <span className="shrink-0 rounded-md border border-line-strong px-2 py-1 text-[0.65rem] font-semibold text-cyan">
                {copied ? c.copied : c.copy}
              </span>
            </button>
          </div>
          {SOCIALS.map((s, i) => (
            <SocialButton key={s.key} social={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
