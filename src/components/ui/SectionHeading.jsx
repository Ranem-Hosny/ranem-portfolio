import { motion } from 'framer-motion'
import Reveal from './Reveal'

/**
 * SectionHeading — code-comment kicker + large gradient title + lead text.
 */
export default function SectionHeading({ index, kicker, title, accent, lead, align = 'left' }) {
  const centered = align === 'center'

  return (
    <div className={centered ? 'text-center mx-auto max-w-2xl' : 'max-w-2xl'}>
      <Reveal>
        <div
          className={`flex items-center gap-3 mb-5 ${centered ? 'justify-center' : ''}`}
        >
          <span className="kicker">{index}</span>
          <span className="h-px w-10 bg-gradient-to-r from-cyan to-transparent" />
          <span className="kicker">{kicker}</span>
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <h2 className="font-extrabold leading-[1.05] tracking-tight text-[clamp(2.1rem,5vw,3.6rem)]">
          {title} <span className="text-gradient">{accent}</span>
        </h2>
      </Reveal>

      {lead && (
        <Reveal delay={0.16}>
          <p
            className={`mt-5 text-muted text-base sm:text-lg leading-relaxed ${
              centered ? 'mx-auto' : ''
            }`}
          >
            {lead}
          </p>
        </Reveal>
      )}

      <motion.div
        className={`mt-7 h-[3px] rounded-full bg-gradient-to-r from-cyan via-violet to-electric ${
          centered ? 'mx-auto' : ''
        }`}
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: 88, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  )
}
