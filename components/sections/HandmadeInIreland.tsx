'use client'

import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'

import HomepageLink from '@/components/ui/homepage-link'

interface HandmadeSlide {
  href: string
  title: string
  description: string
  image: string
  supportingImage: string
  supportingVideo?: string
  cta: string
}

interface HandmadeInIrelandProps {
  slides: HandmadeSlide[]
}

export default function HandmadeInIreland({ slides }: HandmadeInIrelandProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeSlide = slides[activeIndex]
  const thumbs = useMemo(() => slides.map((slide) => slide.image), [slides])

  return (
    <section className="bg-warm-white px-6 py-16 md:px-8 md:py-[120px] lg:px-10">
      <div className="mx-auto grid max-w-[84rem] gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div className="grid gap-5 md:grid-cols-[1fr_4.25rem] lg:grid-cols-[minmax(0,1fr)_4.75rem]">
          <div className="relative aspect-[1.15] overflow-hidden bg-[#ebe3da]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide.image}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.985 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={activeSlide.image}
                  alt={activeSlide.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 42rem"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex items-end gap-3 md:flex-col md:justify-end">
            {thumbs.map((thumb, index) => (
              <button
                key={thumb}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Show slide ${index + 1}`}
                className={`relative h-16 w-16 overflow-hidden border-2 transition-all hover:scale-[1.03] md:h-20 md:w-[4.25rem] ${
                  index === activeIndex
                    ? 'border-[#3D9B3D]'
                    : 'border-transparent opacity-70'
                }`}
              >
                <Image
                  src={thumb}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            ))}
            <div
              className="font-special text-[11px] uppercase tracking-[0.2em] md:mt-2"
              style={{ color: '#7B1F1F' }}
            >
              {activeIndex + 1} / {slides.length}
            </div>
          </div>
        </div>
        <div className="max-w-[25rem] lg:pt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.title}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.45 }}
            >
              <h2 className="font-display text-[2.3rem] leading-none font-light text-black md:text-[2.8rem]">
                {activeSlide.title}
              </h2>
            </motion.div>
          </AnimatePresence>
          <div className="relative mt-6 aspect-[0.74] max-w-[11rem] overflow-hidden bg-[#ddd4cb]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide.supportingImage}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.45 }}
                className="absolute inset-0"
              >
                {activeSlide.supportingVideo ? (
                  <video
                    src={activeSlide.supportingVideo}
                    poster={activeSlide.supportingImage}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Image
                    src={activeSlide.supportingImage}
                    alt=""
                    fill
                    sizes="12rem"
                    className="object-cover"
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
          <AnimatePresence mode="wait">
            <motion.p
              key={activeSlide.description}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45 }}
              className="mt-6 font-display text-[clamp(1.25rem,2vw,1.8rem)] leading-[1.1] font-light text-black"
            >
              {activeSlide.description}
            </motion.p>
          </AnimatePresence>
          <HomepageLink
            href={activeSlide.href}
            className="mt-8 inline-flex border-b border-[#7B1F1F] pb-2 font-ui text-[11px] uppercase tracking-[0.2em] text-[#7B1F1F]"
          >
            {activeSlide.cta}
          </HomepageLink>
        </div>
      </div>
    </section>
  )
}
