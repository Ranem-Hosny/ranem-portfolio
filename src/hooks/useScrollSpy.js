import { useEffect, useState } from 'react'

/**
 * useScrollSpy — returns the id of the section currently in view.
 * @param {string[]} ids   section ids in document order
 * @param {number} offset  px offset from the top (≈ navbar height)
 */
export function useScrollSpy(ids, offset = 140) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const onScroll = () => {
      const pos = window.scrollY + offset
      let current = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= pos) current = id
      }
      setActive(current)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [ids, offset])

  return active
}
