/**
 * smoothScrollTo — wraps Lenis when available, falls back to native smooth scroll.
 * @param {string|HTMLElement|0|'top'} target  element, id ("about") or top sentinel
 * @param {number} offset  pixel offset (negative = above the element, room for navbar)
 */
export function smoothScrollTo(target, offset = -70) {
  if (typeof window === 'undefined') return
  const lenis = window.__lenis

  // Top of the page
  if (target === 'top' || target === 0) {
    if (lenis) lenis.scrollTo(0)
    else window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }

  const el =
    typeof target === 'string'
      ? document.getElementById(target.replace(/^#/, ''))
      : target
  if (!el) return

  if (lenis) lenis.scrollTo(el, { offset })
  else el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
