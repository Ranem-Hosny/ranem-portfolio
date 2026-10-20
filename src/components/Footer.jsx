import { motion } from 'framer-motion'
import { profile } from '../data/profile'
import { smoothScrollTo } from '../utils/scroll'
import { useLang } from '../context/LanguageContext'

const NAV = ['home', 'about', 'skills', 'work', 'contact']

export default function Footer() {
  const year = new Date().getFullYear()
  const { t, pick } = useLang()

  const scrollTo = (id) => smoothScrollTo(id, -80)

  return (
    <footer className="relative overflow-hidden border-t border-line">
      {/* soft glow */}

      <div className="relative mx-auto max-w-[84rem] px-6 lg:px-10 py-14">
        {/* top row */}
        <div className="flex flex-col items-center gap-8 text-center md:flex-row md:justify-between md:text-start">
          {/* brand */}
          <div>
            <div className="flex items-center justify-center gap-2.5 md:justify-start">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan to-violet text-sm font-extrabold text-bg">
                {profile.firstName[0]}
                {profile.lastName[0]}
              </span>
              <span className="text-lg font-bold">{pick(profile, 'name')}</span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-muted">
              {t('footer.tagline')(pick(profile, 'location'))}
            </p>
          </div>

          {/* nav */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {NAV.map((id) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-sm text-muted transition-colors hover:text-accent"
              >
                {t(`nav.${id}`)}
              </button>
            ))}
          </nav>

          {/* back to top */}
          <motion.button
            onClick={() => smoothScrollTo('top')}
            whileHover={{ y: -4 }}
            className="glass group flex h-12 w-12 items-center justify-center rounded-full border-line-strong"
            aria-label={t('footer.backToTop')}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-accent transition-transform group-hover:-translate-y-0.5" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.button>
        </div>

        {/* divider */}
        <div className="my-8 h-px bg-gradient-to-r from-transparent via-line-strong to-transparent" />

        {/* bottom row */}
        <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-start">
          <p className="font-mono text-xs text-faint">
            © {year} {pick(profile, 'name')}. {t('footer.rights')}
          </p>
          <p className="font-mono text-xs text-faint">
            {t('footer.builtWith')} <span className="text-accent">React</span> ·{' '}
            <span className="text-accent">Tailwind</span> ·{' '}
            <span className="text-accent">Framer Motion</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
