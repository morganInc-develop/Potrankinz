'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { GiCandleFlame } from 'react-icons/gi'
import TypewriterText from '@/components/ui/TypewriterText'

interface MissionProps {
  label: string
  text: string
}

export default function Mission({ label, text }: MissionProps) {
  const [labelDone, setLabelDone] = useState(false)

  const formattedText = text
    .replace('live fire', '<em style="color:#7B1F1F">live fire</em>')
    .replace(
      'seasonal produce',
      '<em style="color:#3D9B3D">seasonal produce</em>',
    )
    .replace('patient sauces', '<em style="color:#F5C518">patient sauces</em>')
    .replace(
      'generous hospitality',
      '<em style="color:#7B1F1F">generous hospitality</em>',
    )
    .replace('warmth', '<em style="color:#3D9B3D">warmth</em>')

  // Label is ~20 chars at 16ms each ≈ 320ms. Body starts after label + 100ms gap.
  const labelText = `Subject: ${label}`

  return (
    <div style={{ perspective: '1400px' }}>
      <motion.section
        initial={{ opacity: 0, rotateX: -9, y: 16 }}
        whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.85, ease: [0.33, 1, 0.68, 1] }}
        style={{ transformOrigin: 'top center' }}
        className="bg-warm-white px-6 py-16 md:px-8 md:py-[120px] lg:px-10"
      >
        <div className="mx-auto max-w-[84rem]">
          <motion.div
            initial={{ opacity: 0, y: 20, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: -0.4 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.7,
              delay: 0.15,
              ease: [0.33, 1, 0.68, 1],
            }}
            className="lined-paper relative max-w-[54rem]"
            style={{
              padding: '8px 36px 40px 80px',
              boxShadow:
                '3px 4px 0 #ede7dd, 7px 8px 0 #e1dbd0, 0 14px 32px rgba(0,0,0,0.09)',
            }}
          >
            {/* Candle stamp — top-right corner, like a wax-seal mark */}
            <div
              aria-hidden
              className="pointer-events-none absolute right-5 top-4 text-black/16 rotate-6"
            >
              <GiCandleFlame className="h-7 w-7" />
            </div>

            {/* Ring-hole punches */}
            <div
              className="pointer-events-none absolute left-[30px] top-0 flex h-full flex-col justify-around py-8"
              aria-hidden
            >
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-[18px] w-[18px] rounded-full bg-warm-white/70"
                  style={{ boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.18)' }}
                />
              ))}
            </div>

            {/* Subject line — types first */}
            <div
              className="flex items-center gap-3 border-b border-[rgba(61,155,61,0.5)]"
              style={{ height: 32, marginBottom: 0 }}
            >
              <TypewriterText
                as="span"
                text={labelText}
                speed={16}
                delay={400}
                onDone={() => setLabelDone(true)}
                className="font-special text-[10px] uppercase tracking-[0.22em] text-black/60"
              />
            </div>

            {/* Body text — starts only after label finishes */}
            {labelDone && (
              <TypewriterText
                as="p"
                text={formattedText}
                speed={20}
                delay={120}
                className="font-display font-light text-black"
                style={{
                  fontSize: 'clamp(1.75rem, 3.4vw, 2.6rem)',
                  lineHeight: '64px',
                  paddingTop: 6,
                }}
              />
            )}
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}
