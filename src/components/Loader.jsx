import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { profile } from '../data/profile'

/**
 * Loader — full-screen boot sequence: a counter races to 100 while a
 * conic ring spins, then the panel splits and lifts away.
 */
export default function Loader({ onDone }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let value = 0
    const tick = () => {
      // ease the count: fast start, slow finish
      value += Math.max(1, Math.round((100 - value) * 0.07))
      if (value >= 100) {
        value = 100
        setProgress(100)
        setTimeout(onDone, 620)
        return
      }
      setProgress(value)
      setTimeout(tick, 70)
    }
    const start = setTimeout(tick, 280)
    return () => clearTimeout(start)
  }, [onDone])

  const lines = [
    '> initializing interface...',
    '> loading components & motion...',
    '> compiling experience...',
  ]

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/15 blur-[120px]" />

      {/* spinning ring + portrait */}
      <div className="relative mb-10 h-32 w-32">
        <div className="conic-ring absolute inset-0 animate-spin-slow rounded-full" />
        <motion.div
          className="absolute inset-[3px] flex items-center justify-center overflow-hidden rounded-full bg-black shadow-glow"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <img
            src="/me.png"
            alt={profile.name}
            className="h-full w-full object-cover object-top"
          />
        </motion.div>
      </div>

      {/* counter */}
      <div className="flex items-baseline gap-1 font-mono">
        <motion.span
          key={progress}
          className="text-5xl font-bold tabular-nums text-ink"
          initial={{ opacity: 0.4, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {String(progress).padStart(3, '0')}
        </motion.span>
        <span className="text-xl text-accent">%</span>
      </div>

      {/* progress bar */}
      <div className="mt-6 h-[3px] w-56 overflow-hidden rounded-full bg-line-strong">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan via-violet to-electric"
          animate={{ width: `${progress}%` }}
          transition={{ ease: 'easeOut' }}
        />
      </div>

      {/* boot log */}
      <div className="mt-6 h-4 font-mono text-xs text-faint">
        {lines[Math.min(lines.length - 1, Math.floor(progress / 34))]}
      </div>
    </motion.div>
  )
}
