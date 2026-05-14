'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { GiCandleFlame } from 'react-icons/gi'

interface AnnouncementBarProps {
  messages: string[]
}

const PAPER_GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.07'/%3E%3C/svg%3E")`

export default function AnnouncementBar({ messages }: AnnouncementBarProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % messages.length)
    }, 4000)
    return () => window.clearInterval(timer)
  }, [messages.length])

  return (
    <div
      className="relative z-50 flex h-8 items-center justify-center overflow-hidden bg-olive-dark px-4 text-center"
      style={{
        backgroundImage: PAPER_GRAIN,
        backgroundBlendMode: 'overlay',
      }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={messages[index]}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.45, ease: [0.3, 0, 0, 1] }}
          className="flex items-center gap-2.5 font-special text-[11px] uppercase tracking-[0.2em] text-overlay-text"
        >
          <GiCandleFlame
            className="h-[11px] w-[11px] shrink-0 opacity-55"
            aria-hidden
          />
          {messages[index]}
          <GiCandleFlame
            className="h-[11px] w-[11px] shrink-0 opacity-55"
            aria-hidden
          />
        </motion.span>
      </AnimatePresence>
    </div>
  )
}
