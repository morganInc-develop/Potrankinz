'use client'

import Image from 'next/image'
import { useState } from 'react'
import type { ReactElement } from 'react'
import { motion } from 'framer-motion'
import { FiCalendar, FiStar, FiUsers } from 'react-icons/fi'
import { GiLeafSwirl } from 'react-icons/gi'

import HomepageLink from '@/components/ui/homepage-link'
import TypewriterText from '@/components/ui/TypewriterText'

const TAG_ICONS: Record<string, ReactElement> = {
  'Kitchen Notes': <GiLeafSwirl className="h-3 w-3" />,
  Events: <FiCalendar className="h-3 w-3" />,
  'Staff Picks': <FiStar className="h-3 w-3" />,
  Gatherings: <FiUsers className="h-3 w-3" />,
}

const TAG_COLORS: Record<string, string> = {
  'Kitchen Notes': '#3D9B3D',
  Events: '#7B1F1F',
  'Staff Picks': '#C49A00',
  Gatherings: '#3D9B3D',
}

interface Story {
  tag: string
  date: string
  title: string
  teaser: string
  href: string
  image: string
}

interface StoriesEventsProps {
  stories: Story[]
}

export default function StoriesEvents({ stories }: StoriesEventsProps) {
  const [labelDone, setLabelDone] = useState(false)
  const [headingDone, setHeadingDone] = useState(false)

  return (
    <section className="bg-warm-white px-6 py-16 md:px-8 md:py-[120px] lg:px-10">
      <div className="mx-auto max-w-[84rem]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          {/* Composition notebook block */}
          <div
            className="lined-paper relative inline-block max-w-[30rem]"
            style={{
              padding: '8px 28px 24px 72px',
              transform: 'rotate(0.35deg)',
              boxShadow: '3px 4px 0 #ede7dd, 6px 7px 0 #e1dbd0',
            }}
          >
            {/* Punch holes */}
            <div
              className="pointer-events-none absolute left-[28px] top-0 flex h-full flex-col justify-around py-6"
              aria-hidden
            >
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="h-[14px] w-[14px] rounded-full bg-warm-white/70"
                  style={{ boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.18)' }}
                />
              ))}
            </div>

            {/* Subject line — types first */}
            <div
              className="flex items-center border-b border-[rgba(61,155,61,0.5)]"
              style={{ height: 32 }}
            >
              <TypewriterText
                as="span"
                text="From the kitchen"
                speed={18}
                delay={300}
                onDone={() => setLabelDone(true)}
                className="font-special text-[9px] uppercase tracking-[0.22em] text-black/38"
              />
            </div>

            {/* Heading — types after label */}
            {labelDone && (
              <TypewriterText
                as="h2"
                text="Stories &amp; Events"
                speed={38}
                delay={100}
                onDone={() => setHeadingDone(true)}
                className="font-display font-light text-black"
                style={{
                  fontSize: 'clamp(2rem,4vw,3.2rem)',
                  lineHeight: '64px',
                  paddingTop: 6,
                }}
              />
            )}

            {/* Description — types after heading */}
            {headingDone && (
              <TypewriterText
                as="p"
                text="Notes from the pass, seasonal dinners, cellar releases, and private dining moments."
                speed={16}
                delay={80}
                className="font-body text-[14px] text-black/68"
                style={{ lineHeight: '32px', marginTop: 0 }}
              />
            )}
          </div>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {stories.map((story, index) => (
            /* perspective wrapper per card so tilt has independent depth */
            <div key={story.title} style={{ perspective: '900px' }}>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5, rotateY: 1.8, rotateX: -1.2 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                  delay: index * 0.08,
                }}
                className="shadow-paper"
              >
                <HomepageLink href={story.href} className="group block">
                  <div className="relative aspect-[0.78] overflow-hidden bg-[#eee4da]">
                    <Image
                      src={story.image}
                      alt={story.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    <div className="dog-ear-corner" aria-hidden />
                  </div>
                  <div className="mt-4 flex items-start justify-between gap-4 px-0.5">
                    <span
                      className="flex items-center gap-1.5 font-display text-[1.15rem] font-light italic"
                      style={{ color: TAG_COLORS[story.tag] ?? '#000' }}
                    >
                      {TAG_ICONS[story.tag] && (
                        <span aria-hidden className="opacity-70 not-italic">
                          {TAG_ICONS[story.tag]}
                        </span>
                      )}
                      {story.tag}
                    </span>
                    <span className="font-special text-[10px] uppercase tracking-[0.18em] text-black/52">
                      {story.date}
                    </span>
                  </div>
                  <h3 className="mt-2 font-display text-[2rem] leading-[0.96] font-light text-black transition-transform duration-500 group-hover:translate-x-1 px-0.5">
                    {story.title}
                  </h3>
                  <p className="mt-3 max-w-[16rem] font-ui text-[15px] leading-[1.6] text-black/72 px-0.5 pb-0.5">
                    {story.teaser}
                  </p>
                </HomepageLink>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
