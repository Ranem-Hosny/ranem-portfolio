/**
 * TechIcon — renders a named SVG glyph ('atom' | 'next' | 'node')
 * or a short monogram string. Inherits `color` from the parent.
 */
export default function TechIcon({ icon, className = 'w-7 h-7' }) {
  if (icon === 'atom') {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="2.1" fill="currentColor" />
        {[0, 60, 120].map((deg) => (
          <ellipse
            key={deg}
            cx="12"
            cy="12"
            rx="10.6"
            ry="4.1"
            stroke="currentColor"
            strokeWidth="1.4"
            transform={`rotate(${deg} 12 12)`}
          />
        ))}
      </svg>
    )
  }

  if (icon === 'next') {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="10.2" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M8.3 16.5V7.8l8 9.4M15.5 7.6v6.2"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  if (icon === 'node') {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <path
          d="M12 2.4 21 7.5v9L12 21.6 3 16.5v-9L12 2.4Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M9.4 14.6c0 1 .8 1.5 2.1 1.5 1.4 0 2.3-.6 2.3-1.8 0-1.1-.7-1.5-2.2-1.7-1.6-.2-2.2-.5-2.2-1.6 0-1 .9-1.6 2.1-1.6 1.2 0 2 .5 2.1 1.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    )
  }

  // Monogram fallback (JS, TW, <>, #, $, B …)
  return (
    <span
      className={`flex items-center justify-center font-mono font-bold leading-none ${className}`}
      style={{ fontSize: icon.length > 1 ? '0.95rem' : '1.25rem' }}
      aria-hidden="true"
    >
      {icon}
    </span>
  )
}
