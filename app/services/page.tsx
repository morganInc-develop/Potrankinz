'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

import AnnouncementBar from '@/components/layout/AnnouncementBar'
import Header from '@/components/layout/Header'
import MobileBottomBar from '@/components/layout/MobileBottomBar'
import Footer from '@/components/sections/Footer'
import TornEdge from '@/components/ui/TornEdge'
import TypewriterText from '@/components/ui/TypewriterText'
import {
  announcementMessages,
  navLinks,
  footer,
  services,
  servicesHero,
  type Service,
} from '@/lib/kindred-home-data'

// ─── SVG utensil paths ────────────────────────────────────────────────────────
// Each array is one utensil drawn as multiple strokes.
// Paths are designed in a 60×150 viewBox — handle at bottom, head at top.

const UTENSIL_PATHS: Record<string, string[]> = {
  fork: [
    'M 30 145 L 30 90', // handle
    'M 16 90 L 44 90', // neck bar
    'M 16 90 L 16 28', // outer-left tine
    'M 25 90 L 25 20', // inner-left tine
    'M 35 90 L 35 20', // inner-right tine
    'M 44 90 L 44 28', // outer-right tine
  ],
  ladle: [
    'M 46 145 C 38 120 24 100 18 82', // handle curving toward bowl
    'M 18 82 C 2 76 -2 54 8 40 C 16 26 34 24 44 34 C 56 44 56 66 46 76 C 38 84 24 86 18 82', // bowl outline
  ],
  knife: [
    'M 27 145 L 33 145', // handle base
    'M 27 145 L 27 100', // handle left
    'M 33 145 L 33 100', // handle right
    'M 22 100 L 38 100', // bolster
    'M 38 100 L 30 14', // spine (back of blade)
    'M 22 100 C 14 72 18 40 30 14', // cutting edge (curved)
  ],
  whisk: [
    'M 30 145 L 30 95', // handle
    'M 30 95 L 30 68', // stem
    'M 30 68 C 10 62 4 44 16 32 C 24 24 36 24 44 32 C 56 44 50 62 30 68', // main balloon loop
    'M 30 68 C 14 58 10 40 22 30', // left inner wire
    'M 30 68 C 46 58 50 40 38 30', // right inner wire
    'M 22 30 C 24 20 36 20 38 30', // top connector
  ],
}

// ─── Washi / chalk color per utensil ─────────────────────────────────────────

const WASHI: Record<string, { bg: string; text: string; border: string }> = {
  fork: {
    bg: 'rgba(152,183,148,0.55)',
    text: '#2e4a2c',
    border: 'rgba(152,183,148,0.85)',
  },
  ladle: {
    bg: 'rgba(210,162,152,0.55)',
    text: '#4a2e2c',
    border: 'rgba(210,162,152,0.85)',
  },
  knife: {
    bg: 'rgba(208,178,118,0.55)',
    text: '#4a3d1e',
    border: 'rgba(208,178,118,0.85)',
  },
  whisk: {
    bg: 'rgba(130,180,218,0.55)',
    text: '#1e3449',
    border: 'rgba(130,180,218,0.85)',
  },
}

const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.68' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`

// ─── Self-drawing utensil SVG ─────────────────────────────────────────────────

function DrawnUtensil({
  type,
  color,
  delay = 0,
  className = '',
}: {
  type: 'fork' | 'ladle' | 'knife' | 'whisk'
  color: string
  delay?: number
  className?: string
}) {
  const paths = UTENSIL_PATHS[type]

  return (
    <svg
      viewBox="0 0 60 150"
      fill="none"
      aria-hidden
      className={className}
      style={{ overflow: 'visible' }}
    >
      {paths.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          stroke={color}
          strokeWidth={2.4}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{
            pathLength: {
              duration: 0.82,
              delay: delay + i * 0.07,
              ease: 'easeOut',
            },
            opacity: { duration: 0.01, delay: delay + i * 0.07 },
          }}
        />
      ))}
    </svg>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function ServicesHero() {
  const [labelDone, setLabelDone] = useState(false)

  return (
    <>
      <section className="relative min-h-[58svh] overflow-hidden md:min-h-[64vh]">
        <div className="absolute inset-0">
          <Image
            src={servicesHero.image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.54) 0%, rgba(0,0,0,0.20) 50%, rgba(0,0,0,0.62) 100%)',
          }}
        />

        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: GRAIN,
            opacity: 0.042,
            mixBlendMode: 'overlay',
          }}
        />

        <div className="relative z-10 flex min-h-[58svh] items-end px-6 pb-20 pt-36 md:min-h-[64vh] md:px-8 md:pb-24 lg:px-10">
          <div style={{ perspective: '1400px' }}>
            <motion.div
              initial={{ opacity: 0, rotateX: -9, y: 20 }}
              animate={{ opacity: 1, rotateX: 0, y: 0 }}
              transition={{
                duration: 0.9,
                ease: [0.33, 1, 0.68, 1],
                delay: 0.2,
              }}
              style={{ transformOrigin: 'top center' }}
            >
              <motion.div
                initial={{ opacity: 0, y: 16, rotate: 0 }}
                animate={{ opacity: 1, y: 0, rotate: -0.5 }}
                transition={{
                  duration: 0.75,
                  delay: 0.42,
                  ease: [0.33, 1, 0.68, 1],
                }}
                className="lined-paper relative"
                style={{
                  padding: '10px 36px 40px 80px',
                  maxWidth: '40rem',
                  boxShadow:
                    '3px 4px 0 #ede7dd, 7px 8px 0 #e1dbd0, 0 24px 56px rgba(0,0,0,0.38)',
                }}
              >
                <div
                  className="pointer-events-none absolute left-[28px] top-0 flex h-full flex-col justify-around py-8"
                  aria-hidden
                >
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-[16px] w-[16px] rounded-full bg-warm-white/70"
                      style={{ boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.18)' }}
                    />
                  ))}
                </div>

                <div
                  className="flex items-center border-b border-[rgba(130,180,218,0.48)]"
                  style={{ height: 30 }}
                >
                  <TypewriterText
                    as="span"
                    text="Subject: How We Can Help"
                    speed={18}
                    delay={500}
                    onDone={() => setLabelDone(true)}
                    className="font-special text-[10px] uppercase tracking-[0.22em] text-black/60"
                  />
                </div>

                {labelDone && (
                  <TypewriterText
                    as="h1"
                    text="Our Services."
                    speed={60}
                    delay={100}
                    className="font-display font-light text-black"
                    style={{
                      fontSize: 'clamp(2.4rem, 4.5vw, 3.6rem)',
                      lineHeight: '64px',
                      paddingTop: 6,
                    }}
                  />
                )}

                <div className="dog-ear-corner" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="relative -mt-1 overflow-hidden" style={{ height: 40 }}>
        <svg
          viewBox="0 0 1440 40"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          fill="rgb(251,248,245)"
        >
          <path d="M0,20 Q90,36 180,20 Q270,4 360,20 Q450,36 540,20 Q630,4 720,20 Q810,36 900,20 Q990,4 1080,20 Q1170,36 1260,20 Q1350,4 1440,20 L1440,40 L0,40 Z" />
        </svg>
      </div>
    </>
  )
}

// ─── Utensil intro nav ────────────────────────────────────────────────────────

function UtensilNav() {
  const scrollTo = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="bg-warm-white px-6 pt-16 pb-4 md:px-8 md:pt-20 lg:px-10">
      <div className="mx-auto max-w-[84rem]">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {services.map((svc, i) => {
            const washi = WASHI[svc.utensil]
            return (
              <motion.button
                key={svc.id}
                onClick={() => scrollTo(svc.id)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.1,
                  ease: [0.33, 1, 0.68, 1],
                }}
                className="group flex flex-col items-center gap-4 rounded-none py-8 transition-opacity hover:opacity-75"
                style={{ background: washi.bg + '55' }}
              >
                <DrawnUtensil
                  type={svc.utensil as 'fork' | 'ladle' | 'knife' | 'whisk'}
                  color={washi.text}
                  delay={i * 0.14}
                  className="h-24 w-auto md:h-28"
                />

                {/* Chalk label */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.14 + 0.75, duration: 0.4 }}
                  className="flex flex-col items-center gap-1"
                >
                  <span
                    className="chalk-chef-label text-center"
                    style={{
                      fontSize: 13,
                      color: washi.text,
                      whiteSpace: 'normal',
                    }}
                  >
                    {svc.title}
                  </span>
                  <span className="font-ui text-[8px] uppercase tracking-[0.16em] text-black/34 transition-colors group-hover:text-black/58">
                    Scroll to explore ↓
                  </span>
                </motion.div>
              </motion.button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── Individual service section ───────────────────────────────────────────────

function ServiceSection({
  service,
  index,
}: {
  service: Service
  index: number
}) {
  const washi = WASHI[service.utensil]
  const flipLayout = index % 2 !== 0

  return (
    <section
      id={service.id}
      className="scroll-mt-[80px] bg-warm-white px-6 py-16 md:px-8 md:py-20 lg:px-10"
    >
      <div className="mx-auto max-w-[84rem]">
        {/* Utensil + title header */}
        <motion.div
          initial={{ opacity: 0, x: flipLayout ? 20 : -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
          className="mb-10 flex items-end gap-5"
        >
          <DrawnUtensil
            type={service.utensil as 'fork' | 'ladle' | 'knife' | 'whisk'}
            color={washi.text}
            delay={0.1}
            className="h-20 w-auto md:h-24 shrink-0"
          />

          <div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.72, duration: 0.45 }}
            >
              <span
                className="paper-tag mb-3 inline-flex"
                style={{ color: washi.text, borderColor: washi.border + '88' }}
              >
                {service.tag}
              </span>
            </motion.div>
            <h2
              className="font-display font-light leading-none text-black"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}
            >
              {service.title}
            </h2>
          </div>
        </motion.div>

        {/* Card + photo grid */}
        <div
          className={`grid gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-start ${
            flipLayout
              ? 'lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1'
              : ''
          }`}
        >
          {/* ── Lined paper card ── */}
          <div style={{ perspective: '1400px' }}>
            <motion.div
              initial={{ opacity: 0, rotateX: -8, y: 16 }}
              whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.82,
                delay: 0.18,
                ease: [0.33, 1, 0.68, 1],
              }}
              style={{ transformOrigin: 'top center' }}
            >
              <motion.div
                initial={{ opacity: 0, rotate: 0 }}
                whileInView={{ opacity: 1, rotate: flipLayout ? 0.35 : -0.35 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.7,
                  delay: 0.28,
                  ease: [0.33, 1, 0.68, 1],
                }}
                className="lined-paper relative"
                style={{
                  padding: '10px 36px 48px 80px',
                  boxShadow:
                    '3px 4px 0 #ede7dd, 7px 8px 0 #e1dbd0, 0 14px 32px rgba(0,0,0,0.09)',
                }}
              >
                {/* Washi tape stripe across top of card */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute left-0 right-0 top-0 h-[13px]"
                  style={{
                    background: washi.bg,
                    backgroundImage:
                      'repeating-linear-gradient(90deg, transparent 0px, transparent 5px, rgba(255,255,255,0.22) 5px, rgba(255,255,255,0.22) 6px)',
                  }}
                />

                {/* Ring holes */}
                <div
                  className="pointer-events-none absolute left-[28px] top-0 flex h-full flex-col justify-around py-8"
                  aria-hidden
                >
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-[16px] w-[16px] rounded-full bg-warm-white/70"
                      style={{ boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.18)' }}
                    />
                  ))}
                </div>

                {/* Subject line */}
                <div
                  className="flex items-center border-b border-[rgba(130,180,218,0.48)]"
                  style={{ height: 32, marginTop: 13 }}
                >
                  <span className="font-special text-[9px] uppercase tracking-[0.22em] text-black/56">
                    Subject: {service.title}
                  </span>
                </div>

                {/* Description — rides the ruled lines */}
                <p
                  className="font-display font-light text-black"
                  style={{
                    fontSize: 'clamp(1rem, 1.8vw, 1.3rem)',
                    lineHeight: '32px',
                    paddingTop: 4,
                  }}
                >
                  {service.description}
                </p>

                {/* What's included */}
                <div className="mt-1">
                  <p className="font-special text-[8.5px] uppercase tracking-[0.18em] text-black/38">
                    What&apos;s included
                  </p>

                  {/* Featured (catering): 2-column grid of tags */}
                  {service.featured ? (
                    <div className="mt-1 grid grid-cols-2 gap-x-4">
                      {service.includes.map((item) => (
                        <div
                          key={item}
                          className="font-body text-[11px] text-black/74"
                          style={{ lineHeight: '32px' }}
                        >
                          · {item}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <ul>
                      {service.includes.map((item) => (
                        <li
                          key={item}
                          className="font-body text-[12px] text-black/74"
                          style={{ lineHeight: '32px' }}
                        >
                          · {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Price + CTA */}
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                  {service.priceNote && (
                    <span className="font-special text-[10px] tracking-[0.1em] text-black/54">
                      {service.priceNote}
                    </span>
                  )}
                  <a
                    href={service.href}
                    className="paper-tag group cursor-pointer transition-all duration-300 hover:shadow-paper"
                    style={{
                      fontSize: 11,
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      padding: '8px 18px',
                    }}
                  >
                    {service.cta}
                    <span className="ml-1 inline-block transition-transform duration-300 group-hover:translate-x-0.5">
                      →
                    </span>
                  </a>
                </div>

                <div className="dog-ear-corner" />
              </motion.div>
            </motion.div>
          </div>

          {/* ── Photo ── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.65,
              delay: 0.32,
              ease: [0.33, 1, 0.68, 1],
            }}
            className="relative shadow-paper-img"
          >
            <div
              aria-hidden
              className="paper-tag pointer-events-none absolute -right-3 -top-3 z-10"
              style={{
                transform: 'rotate(2.2deg)',
                color: washi.text,
                borderColor: washi.border + '66',
              }}
            >
              {service.tag}
            </div>

            <div
              className="relative overflow-hidden bg-[#efe4db]"
              style={{ aspectRatio: '4/5' }}
            >
              <Image
                src={service.image}
                alt={service.title}
                fill
                sizes="(max-width: 1024px) 100vw, 38rem"
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── Booking CTA ──────────────────────────────────────────────────────────────

function BookingCTA() {
  const [labelDone, setLabelDone] = useState(false)

  return (
    <div style={{ perspective: '1400px' }}>
      <motion.section
        initial={{ opacity: 0, rotateX: -9, y: 16 }}
        whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.85, ease: [0.33, 1, 0.68, 1] }}
        style={{ transformOrigin: 'top center' }}
        className="bg-warm-white px-6 pb-20 pt-6 md:px-8 lg:px-10"
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
            className="lined-paper relative max-w-[44rem]"
            style={{
              padding: '10px 36px 48px 80px',
              boxShadow:
                '3px 4px 0 #ede7dd, 7px 8px 0 #e1dbd0, 0 14px 32px rgba(0,0,0,0.09)',
            }}
          >
            <div
              className="pointer-events-none absolute left-[28px] top-0 flex h-full flex-col justify-around py-8"
              aria-hidden
            >
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-[16px] w-[16px] rounded-full bg-warm-white/70"
                  style={{ boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.18)' }}
                />
              ))}
            </div>

            <div
              className="flex items-center border-b border-[rgba(130,180,218,0.48)]"
              style={{ height: 32 }}
            >
              <TypewriterText
                as="span"
                text="Subject: Let's Plan Something"
                speed={18}
                delay={400}
                onDone={() => setLabelDone(true)}
                className="font-special text-[10px] uppercase tracking-[0.22em] text-black/60"
              />
            </div>

            {labelDone && (
              <>
                <TypewriterText
                  as="h2"
                  text="Ready to bring<br/>us to your table?"
                  speed={38}
                  delay={120}
                  className="font-display font-light text-black"
                  style={{
                    fontSize: 'clamp(1.6rem, 3.2vw, 2.6rem)',
                    lineHeight: '64px',
                    paddingTop: 6,
                  }}
                />

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4, duration: 0.5 }}
                  className="mt-2 flex flex-wrap gap-3"
                >
                  <a
                    href="/contact"
                    className="paper-tag group cursor-pointer transition-all duration-300 hover:shadow-paper"
                    style={{
                      fontSize: 11,
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      padding: '8px 18px',
                    }}
                  >
                    Contact Us
                    <span className="ml-1 inline-block transition-transform duration-300 group-hover:translate-x-0.5">
                      →
                    </span>
                  </a>
                  <a
                    href="/menu"
                    className="paper-tag group cursor-pointer transition-all duration-300 hover:shadow-paper"
                    style={{
                      fontSize: 11,
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      padding: '8px 18px',
                    }}
                  >
                    View Menu
                    <span className="ml-1 inline-block transition-transform duration-300 group-hover:translate-x-0.5">
                      →
                    </span>
                  </a>
                </motion.div>
              </>
            )}

            <div className="dog-ear-corner" />
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ServicesPage() {
  return (
    <main className="overflow-x-hidden bg-warm-white pb-16 md:pb-0">
      <AnnouncementBar messages={announcementMessages} />
      <Header leftLinks={navLinks.left} rightLinks={navLinks.right} />
      <ServicesHero />
      <UtensilNav />
      <TornEdge variant={1} />
      {services.map((svc, i) => (
        <>
          <ServiceSection key={svc.id} service={svc} index={i} />
          {i < services.length - 1 && (
            <TornEdge
              key={`torn-${svc.id}`}
              variant={((i % 3) + 1) as 1 | 2 | 3}
            />
          )}
        </>
      ))}
      <TornEdge variant={2} />
      <BookingCTA />
      <TornEdge variant={3} />
      <Footer {...footer} />
      <MobileBottomBar />
    </main>
  )
}
