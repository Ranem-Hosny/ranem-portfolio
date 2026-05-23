import { useState } from 'react'
import { motion } from 'framer-motion'
import { profile } from '../data/profile'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'
import MagneticButton from './ui/MagneticButton'

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
  { key: 'github', label: 'GitHub', handle: '@code', url: profile.socials.github, color: '#8b5cf6' },
  { key: 'linkedin', label: 'LinkedIn', handle: 'Connect', url: profile.socials.linkedin, color: '#3b82f6' },
  { key: 'whatsapp', label: 'WhatsApp', handle: 'Chat now', url: profile.socials.whatsapp, color: '#22c55e' },
]

function SocialButton({ social, index }) {
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
      {/* glow wash */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `radial-gradient(160px circle at 16% 50%, ${social.color}26, transparent 70%)` }}
      />
      <span
        className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-bg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
        style={{ background: social.color, boxShadow: `0 0 26px -6px ${social.color}` }}
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
          {icons[social.key]}
        </svg>
      </span>
      <span className="relative">
        <span className="block font-bold text-ink">{social.label}</span>
        <span className="block text-sm text-muted">{social.handle}</span>
      </span>
      <svg
        viewBox="0 0 24 24"
        className="relative ml-auto h-4 w-4 text-faint transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      >
        <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </motion.a>
  )
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [copied, setCopied] = useState(false)

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    const text =
      `Hi Ranem 👋\n\n` +
      `From: ${form.name}\n` +
      `Email: ${form.email}\n\n` +
      `${form.message}`
    const url = `${profile.socials.whatsapp}?text=${encodeURIComponent(text)}`
    window.open(url, '_blank', 'noopener,noreferrer')
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
      <div className="pointer-events-none absolute left-1/2 top-10 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-violet/10 blur-[150px]" />

      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          index="// 04"
          kicker="Get In Touch"
          title="Let's build"
          accent="something."
          lead="Have a project, a role, or just an idea worth chasing? My inbox is open — pick whichever channel suits you."
          align="center"
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-5">
          {/* left — contact form */}
          <Reveal x={-30} className="lg:col-span-3">
            <form
              onSubmit={submit}
              className="glass relative h-full rounded-3xl border-line p-6 sm:p-8"
            >
              <h3 className="text-xl font-bold text-ink">Send a message</h3>
              <p className="mt-1 text-sm text-muted">
                Fill this in and we'll continue the chat on WhatsApp.
              </p>

              <div className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Your name">
                    <input
                      required
                      name="name"
                      value={form.name}
                      onChange={change}
                      placeholder="username"
                      className="contact-input"
                    />
                  </Field>
                  <Field label="Email">
                    <input
                      required
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={change}
                      placeholder="email"
                      className="contact-input"
                    />
                  </Field>
                </div>
                <Field label="Message">
                  <textarea
                    required
                    name="message"
                    value={form.message}
                    onChange={change}
                    rows={4}
                    placeholder="Tell me about your project…"
                    className="contact-input resize-none"
                  />
                </Field>
              </div>

              <MagneticButton
                type="submit"
                strength={0.2}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan to-violet px-6 py-3.5 font-semibold text-bg shadow-glow transition-transform hover:scale-[1.02]"
              >
                Send via WhatsApp
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                  <path d="M.06 24l1.68-6.13A11.86 11.86 0 0 1 .14 11.9C.14 5.35 5.49 0 12.05 0a11.82 11.82 0 0 1 8.41 3.49 11.78 11.78 0 0 1 3.48 8.42c0 6.56-5.35 11.9-11.9 11.9a11.9 11.9 0 0 1-5.69-1.45L.06 24ZM6.6 20.13c1.68 1 3.28 1.6 5.44 1.6 5.45 0 9.89-4.43 9.9-9.88a9.86 9.86 0 0 0-2.9-7 9.78 9.78 0 0 0-6.98-2.9c-5.46 0-9.9 4.44-9.9 9.89 0 2.27.66 3.97 1.77 5.75l-.99 3.63 3.66-1.09ZM17.9 14.7c-.07-.12-.27-.2-.56-.34-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.44-.53.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41Z" />
                </svg>
              </MagneticButton>
            </form>
          </Reveal>

          {/* right — direct channels */}
          <Reveal x={30} delay={0.1} className="lg:col-span-2">
            <div className="flex h-full flex-col gap-3">
              {/* email card */}
              <div className="glass rounded-2xl border-line p-5">
                <div className="kicker">Direct email</div>
                <button
                  onClick={copyEmail}
                  className="mt-2 flex w-full items-center justify-between gap-2 text-left"
                >
                  <span className="truncate font-mono text-sm text-ink">{profile.email}</span>
                  <span className="shrink-0 rounded-md border border-line-strong px-2 py-1 text-[0.65rem] font-semibold text-accent">
                    {copied ? 'COPIED ✓' : 'COPY'}
                  </span>
                </button>
              </div>

              {SOCIALS.map((s, i) => (
                <SocialButton key={s.key} social={s} index={i} />
              ))}

              {/* location */}
              <div className="glass mt-auto flex items-center gap-3 rounded-2xl border-line p-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-bg-soft text-accent">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 21s-7-5.5-7-11a7 7 0 1 1 14 0c0 5.5-7 11-7 11Z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                </span>
                <div>
                  <div className="text-sm font-semibold text-ink">{profile.location}</div>
                  <div className="text-xs text-faint">Working worldwide · remote</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* Labelled field wrapper */
function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-faint">
        {label}
      </span>
      {children}
    </label>
  )
}
