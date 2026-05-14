'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

import HomepageLink from '@/components/ui/homepage-link'

interface HouseSignaturesProps {
  href: string
  title: string
  cta: string
  image: string
  video?: string
}

gsap.registerPlugin(ScrollTrigger)

export default function HouseSignatures({
  href,
  title,
  cta,
  image,
  video,
}: HouseSignaturesProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!imageRef.current) return

      gsap.fromTo(
        imageRef.current,
        { yPercent: 8, opacity: 0.2 },
        {
          yPercent: -5,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      )
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      className="bg-warm-white px-6 py-20 md:px-8 md:py-[138px] lg:px-10"
    >
      <div className="mx-auto grid max-w-[84rem] gap-12 lg:grid-cols-[18rem_minmax(0,1fr)] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65 }}
          className="lg:order-1"
        >
          <HomepageLink href={href} className="inline-block">
            <h2 className="font-display text-[1.85rem] leading-none font-light text-black md:text-[2.2rem]">
              {title}
            </h2>
            <span className="mt-3 inline-flex border-b border-[#3D9B3D] pb-2 font-ui text-[11px] uppercase tracking-[0.2em] text-[#3D9B3D]">
              {cta}
            </span>
          </HomepageLink>
        </motion.div>

        {/* Paper drop-shadow wraps the image for the zero-blur offset look */}
        <HomepageLink
          href={href}
          className="block lg:order-2 lg:justify-self-center lg:w-[26rem]"
        >
          <div className="relative shadow-paper-img">
            {/* Handwritten annotation tag — floats top-right of the image */}
            <div
              aria-hidden
              className="paper-tag pointer-events-none absolute -right-4 -top-3 z-10"
              style={{
                transform: 'rotate(2.4deg)',
                background: '#F5C518',
                borderColor: 'rgba(0,0,0,0.12)',
                color: '#000',
              }}
            >
              ★ Chef&apos;s Selection
            </div>
            <div
              ref={imageRef}
              className="relative aspect-[0.82] overflow-hidden bg-[#efe4db]"
            >
              {video ? (
                <video
                  src={video}
                  poster={image}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="h-full w-full object-cover"
                />
              ) : (
                <Image
                  src={image}
                  alt={title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 26rem"
                  className="object-cover"
                />
              )}
            </div>
          </div>
        </HomepageLink>
      </div>
    </section>
  )
}
