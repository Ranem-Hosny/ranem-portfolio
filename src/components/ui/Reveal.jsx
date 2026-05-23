import { motion } from 'framer-motion'

/**
 * Reveal — scroll-triggered entrance wrapper.
 * Fades + slides children into view once, with an optional stagger delay.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 44,
  x = 0,
  duration = 0.75,
  className = '',
  once = true,
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once, margin: '-90px' }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
