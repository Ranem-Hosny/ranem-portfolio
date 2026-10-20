import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { strings } from '../i18n/strings'

const LanguageContext = createContext(null)

/** Reads the saved language, falling back to the browser language. */
function getInitialLang() {
  if (typeof window === 'undefined') return 'en'
  try {
    const stored = localStorage.getItem('site-lang')
    if (stored === 'en' || stored === 'ar') return stored
  } catch {
    /* storage blocked — fall through */
  }
  return navigator.language?.startsWith('ar') ? 'ar' : 'en'
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLang)
  const isAr = lang === 'ar'

  // Sync <html lang/dir> + persist the choice
  useEffect(() => {
    const root = document.documentElement
    root.lang = lang
    root.dir = isAr ? 'rtl' : 'ltr'
    try {
      localStorage.setItem('site-lang', lang)
    } catch {
      /* storage blocked — the choice just won't persist */
    }
  }, [lang, isAr])

  const toggleLang = useCallback(() => setLang((l) => (l === 'en' ? 'ar' : 'en')), [])

  /** UI string by dotted key, e.g. t('nav.home') */
  const t = useCallback(
    (key) => key.split('.').reduce((o, k) => o?.[k], strings[lang]) ?? key,
    [lang],
  )

  /** Localised data field: uses `${field}Ar` in Arabic when it exists, e.g. pick(project, 'description') */
  const pick = useCallback(
    (obj, field) => (isAr && obj?.[`${field}Ar`] != null ? obj[`${field}Ar`] : obj?.[field]),
    [isAr],
  )

  return (
    <LanguageContext.Provider value={{ lang, isAr, toggleLang, t, pick }}>
      {children}
    </LanguageContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useLang = () => useContext(LanguageContext)
