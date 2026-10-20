/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Theme-aware tokens driven by CSS variables (see index.css)
        bg: 'var(--bg)',
        'bg-soft': 'var(--bg-soft)',
        surface: 'var(--surface-solid)',
        line: 'var(--border)',
        'line-strong': 'var(--border-strong)',
        ink: 'var(--ink)',
        muted: 'var(--muted)',
        faint: 'var(--faint)',
        // One accent colour. The old cyan / violet / electric names all point to it,
        // so legacy "from-cyan to-violet" gradients render as a single flat colour.
        accent: 'rgb(var(--accent-rgb) / <alpha-value>)',
        cyan: 'rgb(var(--accent-rgb) / <alpha-value>)',
        violet: 'rgb(var(--accent-rgb) / <alpha-value>)',
        electric: 'rgb(var(--accent-rgb) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Cairo', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        ultra: '0.35em',
      },
      boxShadow: {
        // No neon glow — just a soft depth shadow
        glow: '0 10px 30px -14px rgba(0,0,0,0.55)',
        'glow-violet': '0 10px 30px -14px rgba(0,0,0,0.55)',
      },
      animation: {
        'blob-1': 'blob1 22s ease-in-out infinite',
        'blob-2': 'blob2 26s ease-in-out infinite',
        'blob-3': 'blob3 30s ease-in-out infinite',
        'grid-pan': 'gridPan 28s linear infinite',
        float: 'float 7s ease-in-out infinite',
        'spin-slow': 'spin 14s linear infinite',
        shimmer: 'shimmer 3.5s linear infinite',
        'pulse-soft': 'pulseSoft 2.6s ease-in-out infinite',
        marquee: 'marquee 38s linear infinite',
        'phone-pan': 'phonePan 7s ease-in-out infinite alternate',
        'seg-fill': 'segFill 3s linear forwards',
      },
      keyframes: {
        // Fills the active project segment while autoplay counts down
        segFill: {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
        // Sweeps a cropped screenshot side to side inside the phone frame
        phonePan: {
          '0%': { objectPosition: '0% top' },
          '100%': { objectPosition: '100% top' },
        },
        blob1: {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(60px,-50px) scale(1.12)' },
          '66%': { transform: 'translate(-40px,40px) scale(0.92)' },
        },
        blob2: {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(-70px,40px) scale(1.15)' },
          '66%': { transform: 'translate(50px,-30px) scale(0.9)' },
        },
        blob3: {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '50%': { transform: 'translate(40px,60px) scale(1.18)' },
        },
        gridPan: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 -800px' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseSoft: {
          '0%,100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.4', transform: 'scale(0.82)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
