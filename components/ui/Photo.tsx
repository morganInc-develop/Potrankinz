'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'

import { cn } from '@/lib/utils'

type PhotoTone = 'warm' | 'green' | 'gold' | 'red'

interface PhotoProps {
  src: string
  alt: string
  aspect?: string
  className?: string
  imageClassName?: string
  sizes?: string
  priority?: boolean
  label?: string
  tone?: PhotoTone
  tilt?: 'left' | 'right' | 'none'
  framed?: boolean
}

const toneClass: Record<PhotoTone, string> = {
  warm: 'bg-[#FDF8EC]',
  green: 'bg-[#4CAF50]',
  gold: 'bg-[#F5C518]',
  red: 'bg-[#C41E3A]',
}

const tiltClass = {
  left: '-rotate-1',
  right: 'rotate-1',
  none: '',
}

export default function Photo({
  src,
  alt,
  aspect = 'aspect-[4/5]',
  className,
  imageClassName,
  sizes = '(min-width: 1024px) 34vw, 92vw',
  priority = false,
  label,
  tone = 'warm',
  tilt = 'none',
  framed = true,
}: PhotoProps) {
  const reduced = useReducedMotion()

  return (
    <motion.figure
      className={cn(
        'group relative w-full overflow-hidden',
        framed && 'p-2 shadow-[4px_5px_0_rgba(255,255,255,0.18)]',
        toneClass[tone],
        tiltClass[tilt],
        className,
      )}
      initial={{
        opacity: 0,
        y: 28,
        rotate: tilt === 'left' ? -2 : tilt === 'right' ? 2 : 0,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        rotate: tilt === 'left' ? -1 : tilt === 'right' ? 1 : 0,
      }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: reduced ? 0 : 0.72, ease: [0.33, 1, 0.68, 1] }}
      whileHover={reduced ? undefined : { y: -4 }}
    >
      <div className={cn('relative overflow-hidden bg-black/20', aspect)}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={cn(
            'object-cover transition-transform duration-700 group-hover:scale-[1.045]',
            imageClassName,
          )}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/28 via-transparent to-white/8 opacity-75" />
        <div className="dog-ear-corner" />
      </div>
      {label && (
        <figcaption className="mt-2 flex items-center justify-between gap-3 px-1 font-ui text-[10px] uppercase tracking-[0.18em] text-black/70">
          <span>{label}</span>
          <span aria-hidden className="h-px flex-1 bg-black/16" />
        </figcaption>
      )}
    </motion.figure>
  )
}
