import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * CustomCursor — a precise dot plus a lagging ring that springs behind it.
 * The ring expands over interactive elements. Disabled on touch devices.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [down, setDown] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 320, damping: 26, mass: 0.5 })
  const ringY = useSpring(y, { stiffness: 320, damping: 26, mass: 0.5 })

  useEffect(() => {
    // Only run on devices with a fine pointer
    if (!window.matchMedia('(pointer: fine)').matches) return
    setEnabled(true)

    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const interactive = e.target.closest('a, button, [data-cursor]')
      setHovering(Boolean(interactive))
    }
    const onDown = () => setDown(true)
    const onUp = () => setDown(false)

    window.addEventListener('mousemove', move)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <>
      <motion.div
        className="cursor-dot"
        style={{ x, y }}
        animate={{ scale: down ? 0.6 : hovering ? 0 : 1 }}
        transition={{ duration: 0.18 }}
      />
      <motion.div
        className="cursor-ring"
        style={{ x: ringX, y: ringY }}
        animate={{
          scale: down ? 0.8 : hovering ? 1.85 : 1,
          opacity: hovering ? 1 : 0.65,
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      />
    </>
  )
}
