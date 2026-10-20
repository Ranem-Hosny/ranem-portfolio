import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { useScrollSpy } from '../hooks/useScrollSpy'
import { profile } from '../data/profile'
import { smoothScrollTo } from '../utils/scroll'
import { useLang } from '../context/LanguageContext'

const LINKS = ['home', 'about', 'skills', 'work', 'contact'].map((id) => ({ id }))
const IDS = LINKS.map((l) => l.id)

/** EN ⇄ ع language switch — shows the language you'll switch to. */
function LangToggle() {
  const { t, toggleLang } = useLang()
  return (
    <button
      type="button"
      onClick={toggleLang}
      aria-label={t('nav.switchLangLabel')}
      title={t('nav.switchLangLabel')}
      className="flex h-9 min-w-[2.25rem] items-center justify-center rounded-full border border-line-strong bg-bg-soft px-2.5 text-sm font-bold text-ink transition-colors hover:border-cyan hover:text-cyan"
    >
      {t('nav.switchLang')}
    </button>
  )
}

/** Animated sun / moon theme switch. */
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const { t, isAr } = useLang()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggleTheme}
      aria-label={t('nav.theme')}
      className="relative h-9 w-16 rounded-full border border-line-strong bg-bg-soft p-1 transition-colors"
    >
      <motion.span
        className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-cyan to-violet text-bg"
        animate={{ x: isDark ? 0 : isAr ? -28 : 28 }}
        transition={{ type: 'spring', stiffness: 480, damping: 28 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={theme}
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.25 }}
          >
            {isDark ? (
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5 6.5 6.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19" />
              </svg>
            )}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </button>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useScrollSpy(IDS)
  const { t, pick } = useLang()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (e, id) => {
    e.preventDefault()
    smoothScrollTo(id, -80)
    setOpen(false)
  }

  return (
    <motion.header
      initial={{ y: -90 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7, delay: 2.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3 sm:pt-4"
    >
      <nav
        className={`flex w-full max-w-7xl items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-500 sm:px-5 ${
          scrolled ? 'nav-glass shadow-glow' : 'nav-glass'
        }`}
      >
        {/* logo */}
        <a href="#home" onClick={(e) => go(e, 'home')} className="group flex items-center">
          <span className="text-lg font-extrabold tracking-tight text-ink transition-colors group-hover:text-accent">
            {pick(profile, 'firstName')}
            <span className="text-accent">.</span>
          </span>
        </a>

        {/* desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={(e) => go(e, link.id)}
                className={`relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                  active === link.id ? 'text-ink' : 'text-muted hover:text-ink'
                }`}
              >
                {active === link.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-lg bg-line"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {t(`nav.${link.id}`)}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2.5">
          <LangToggle />
          <ThemeToggle />
          <a
            href="#contact"
            onClick={(e) => go(e, 'contact')}
            className="hidden rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-bg transition-transform hover:scale-105 sm:block"
          >
            {t('nav.letsTalk')}
          </a>

          {/* mobile toggle */}
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={t('nav.menu')}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-lg border border-line-strong md:hidden"
          >
            <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 4 : 0 }} className="h-0.5 w-4 bg-ink" />
            <motion.span animate={{ opacity: open ? 0 : 1 }} className="h-0.5 w-4 bg-ink" />
            <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -4 : 0 }} className="h-0.5 w-4 bg-ink" />
          </button>
        </div>
      </nav>

      {/* mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="glass absolute top-[72px] left-4 right-4 rounded-2xl border-line-strong p-3 md:hidden"
          >
            {LINKS.map((link, i) => (
              <motion.li
                key={link.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <a
                  href={`#${link.id}`}
                  onClick={(e) => go(e, link.id)}
                  className={`block rounded-xl px-4 py-3 text-sm font-medium ${
                    active === link.id ? 'bg-line text-ink' : 'text-muted'
                  }`}
                >
                  {t(`nav.${link.id}`)}
                </a>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
