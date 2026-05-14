'use client'

import Image from 'next/image'
import { SiInstagram } from 'react-icons/si'
import { restaurantHandle } from '@/lib/kindred-home-data'

interface InstagramCollageProps {
  images: string[]
}

export default function InstagramCollage({ images }: InstagramCollageProps) {
  // Split into two rows for a staggered look
  const mid = Math.ceil(images.length / 2)
  const row1 = images.slice(0, mid)
  const row2 = images.slice(mid)

  // Duplicate each row so the loop is seamless
  const row1Loop = [...row1, ...row1]
  const row2Loop = [...row2, ...row2]

  return (
    <section className="overflow-hidden bg-warm-white py-20 md:py-[120px]">
      {/* Heading */}
      <div className="relative mb-12 flex flex-col items-center text-center">
        {/* Washi tape — sage strip top-left of heading */}
        <div
          aria-hidden
          className="washi washi-sage pointer-events-none absolute -top-3 left-[calc(50%-110px)]"
          style={{ width: 88, transform: 'rotate(-2.8deg)' }}
        />
        {/* Washi tape — rose strip top-right */}
        <div
          aria-hidden
          className="washi washi-rose pointer-events-none absolute -top-5 left-[calc(50%+50px)]"
          style={{ width: 64, transform: 'rotate(1.6deg)' }}
        />
        <h2 className="font-display text-[3rem] leading-none font-light text-black [text-wrap:balance]">
          Follow us on{' '}
          <em style={{ color: '#3D9B3D', fontStyle: 'italic' }}>Instagram</em>
        </h2>
        <span
          className="mt-3 inline-flex items-center gap-2 font-special text-[11px] uppercase tracking-[0.2em]"
          style={{ color: '#7B1F1F' }}
        >
          <SiInstagram className="h-3.5 w-3.5" aria-hidden />
          {restaurantHandle}
        </span>
        {/* Amber washi strip below handle */}
        <div
          aria-hidden
          className="washi washi-amber pointer-events-none mt-3"
          style={{
            width: 48,
            transform: 'rotate(0.8deg)',
            alignSelf: 'center',
          }}
        />
      </div>

      {/* Row 1 — left scroll */}
      <div className="relative mb-4 flex overflow-hidden">
        <div
          className="flex"
          style={{
            animation: 'marquee 28s linear infinite',
            willChange: 'transform',
          }}
        >
          {row1Loop.map((src, i) => (
            <div
              key={i}
              className="relative mr-4 h-[260px] w-[200px] flex-shrink-0 overflow-hidden bg-[#efe7de]"
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="200px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 — right scroll (reverse) */}
      <div className="relative flex overflow-hidden">
        <div
          className="flex"
          style={{
            animation: 'marquee-reverse 22s linear infinite',
            willChange: 'transform',
          }}
        >
          {row2Loop.map((src, i) => (
            <div
              key={i}
              className="relative mr-4 h-[260px] w-[200px] flex-shrink-0 overflow-hidden bg-[#efe7de]"
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="200px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
