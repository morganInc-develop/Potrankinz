'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

import HomepageLink from '@/components/ui/homepage-link'

interface RainbowRestockProps {
  href: string
  title: string
  description: string
  image: string
  supportingImage: string
  supportingVideo?: string
  cta?: string
}

gsap.registerPlugin(ScrollTrigger)

export default function RainbowRestock({
  href,
  title,
  description,
  image,
  supportingImage,
  supportingVideo,
  cta = 'Discover Edit',
}: RainbowRestockProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const supportRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!imageRef.current) return

      gsap.to(imageRef.current, {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })

      if (supportRef.current) {
        gsap.fromTo(
          supportRef.current,
          { yPercent: 10, opacity: 0.45, scale: 0.96 },
          {
            yPercent: -4,
            opacity: 0.72,
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        )
      }
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      className="bg-warm-white px-6 py-16 md:px-8 md:py-[120px] lg:px-10"
    >
      <div className="mx-auto max-w-[84rem]">
        <div className="grid gap-5 lg:grid-cols-[1.18fr_0.82fr] lg:items-end">
          <div className="grid gap-5 md:grid-cols-[1.06fr_0.94fr] lg:min-h-[42rem]">
            <div className="relative overflow-hidden bg-[#efe6dd]">
              <div
                ref={imageRef}
                className="absolute inset-0 will-change-transform"
              >
                <Image
                  src={image}
                  alt={title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40rem"
                  className="object-cover object-center"
                />
              </div>
              <div className="aspect-[0.86] md:aspect-auto md:min-h-[42rem]" />
            </div>
            <div
              ref={supportRef}
              className="relative hidden overflow-hidden bg-[#d8d0cc] md:block"
            >
              {supportingVideo ? (
                <video
                  src={supportingVideo}
                  poster={supportingImage}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="h-full w-full object-cover opacity-75 grayscale-[12%]"
                />
              ) : (
                <Image
                  src={supportingImage}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 50vw, 30rem"
                  className="object-cover opacity-70 grayscale-[12%]"
                />
              )}
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:pb-8"
          >
            <h2
              className="font-display text-[clamp(3rem,5vw,4.3rem)] leading-none font-light"
              style={{ color: '#7B1F1F' }}
            >
              <em>{title}</em>
            </h2>
            <p className="mt-6 max-w-[24rem] font-display text-[clamp(1.6rem,2.4vw,2.25rem)] leading-[1.05] font-light text-black md:max-w-[28rem]">
              {description}
            </p>
            <HomepageLink
              href={href}
              className="mt-10 inline-flex border-b border-[#3D9B3D] pb-2 font-ui text-[11px] uppercase tracking-[0.2em] text-[#3D9B3D]"
            >
              {cta}
            </HomepageLink>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
