'use client'

import Image from 'next/image'
import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

import HomepageLink from '@/components/ui/homepage-link'

interface CategoryTypographyProps {
  items: string[]
  image: string
  href: string
}

gsap.registerPlugin(ScrollTrigger)

export default function CategoryTypography({
  items,
  image,
  href,
}: CategoryTypographyProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const lineRefs = useRef<(HTMLDivElement | null)[]>([])
  const imageRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const lines = lineRefs.current.filter(Boolean)
      if (!lines.length) return

      gsap.from(lines, {
        x: -60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
          once: true,
        },
      })

      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { yPercent: 10, scale: 0.96, opacity: 0 },
          {
            yPercent: -6,
            scale: 1,
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
      }
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-warm-white px-6 py-[74px] md:px-8 md:py-[150px] lg:px-10"
    >
      <div className="mx-auto grid max-w-[84rem] gap-12 lg:grid-cols-[minmax(0,1fr)_34rem] lg:items-end">
        <div className="space-y-2 md:space-y-3">
          {items.map((item, index) => (
            <div
              key={item}
              ref={(node) => {
                lineRefs.current[index] = node
              }}
              className="font-display text-[clamp(3rem,8vw,6rem)] leading-none font-light"
              style={{
                color:
                  index === 0 ? '#7B1F1F' : index === 2 ? '#3D9B3D' : '#000',
              }}
            >
              {item}
            </div>
          ))}
        </div>
        <HomepageLink
          href={href}
          className="mx-auto block w-full max-w-[26rem] lg:translate-y-20"
        >
          <div
            ref={imageRef}
            className="relative aspect-[0.83] overflow-hidden bg-[#e8e0d8]"
          >
            <Image
              src={image}
              alt="Editorial category image"
              fill
              sizes="(max-width: 1024px) 90vw, 34rem"
              className="object-cover"
            />
          </div>
        </HomepageLink>
      </div>
    </section>
  )
}
