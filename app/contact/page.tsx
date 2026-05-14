'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { MapPin, Clock, Phone, Mail, ChefHat } from 'lucide-react'

import AnnouncementBar from '@/components/layout/AnnouncementBar'
import Header from '@/components/layout/Header'
import MobileBottomBar from '@/components/layout/MobileBottomBar'
import Footer from '@/components/sections/Footer'
import TornEdge from '@/components/ui/TornEdge'
import TypewriterText from '@/components/ui/TypewriterText'
import { announcementMessages, navLinks, footer } from '@/lib/kindred-home-data'

const HERO_IMAGE =
  'https://images.pexels.com/photos/29748355/pexels-photo-29748355.jpeg?auto=compress&cs=tinysrgb&w=1600'

// ─── Info card data ──────────────────────────────────────────────────────────

const INFO_CARDS = [
  {
    Icon: MapPin,
    label: 'Address',
    tag: '★ Find Us',
    tagRotate: '-1.2deg',
    cardRotate: '-1.2deg',
    lines: ['7141 E Lincoln Dr', 'Scottsdale, AZ 85253'],
    note: 'Valet available nightly',
    noteColor: '#ee8fca',
  },
  {
    Icon: Clock,
    label: 'Hours',
    tag: "✦ We're Open",
    tagRotate: '2deg',
    cardRotate: '0.8deg',
    lines: ['Tue – Sat  5 pm – 10 pm', 'Sun  5 pm – 9 pm', 'Mon  Closed'],
    note: 'Bar opens at 4 pm',
    noteColor: '#f2c45f',
  },
  {
    Icon: Phone,
    label: 'Contact',
    tag: '✉ Reach Us',
    tagRotate: '-0.8deg',
    cardRotate: '-0.5deg',
    lines: ['(480) 555-0192', 'hello@potrankinz.com'],
    note: 'Groups 6+ call ahead',
    noteColor: '#94d6ff',
  },
]

// ─── Chalk annotation component ──────────────────────────────────────────────

function ChalkNote({
  text,
  color,
  className,
}: {
  text: string
  color: string
  className?: string
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute ${className}`}
      style={{ color }}
    >
      <span className="chalk-chef-label" style={{ fontSize: 11, color }}>
        {text}
      </span>
      <svg
        className="chalk-chef-arrow absolute -bottom-5 left-2 h-[30px] w-[48px]"
        viewBox="0 0 48 30"
        fill="none"
        style={{ color }}
      >
        <defs>
          <marker
            id={`arrowhead-${text.replace(/\s/g, '')}`}
            markerWidth="8"
            markerHeight="8"
            refX="6"
            refY="4"
            orient="auto"
          >
            <path d="M1 1 L7 4 L1 7" />
          </marker>
        </defs>
        <path
          d="M4 4 C14 10 32 18 44 26"
          markerEnd={`url(#arrowhead-${text.replace(/\s/g, '')})`}
        />
      </svg>
    </div>
  )
}

// ─── Page hero ───────────────────────────────────────────────────────────────

function ContactHero() {
  const [labelDone, setLabelDone] = useState(false)

  return (
    <>
      <section className="relative min-h-[72svh] overflow-hidden md:min-h-[78vh]">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src={HERO_IMAGE}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        {/* Gradient overlay — darkens image so card pops and nav stays readable */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0.28) 50%, rgba(0,0,0,0.55) 100%)',
          }}
        />

        {/* Paper grain over image */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.68' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
            opacity: 0.045,
            mixBlendMode: 'overlay',
          }}
        />

        {/* Card — centered, floats over the image */}
        <div className="relative z-10 flex min-h-[72svh] items-center justify-center px-6 pb-16 pt-36 md:min-h-[78vh] md:px-8 md:pt-44 lg:px-10">
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
                animate={{ opacity: 1, y: 0, rotate: -0.6 }}
                transition={{
                  duration: 0.75,
                  delay: 0.4,
                  ease: [0.33, 1, 0.68, 1],
                }}
                className="lined-paper relative"
                style={{
                  padding: '10px 40px 48px 84px',
                  maxWidth: '52rem',
                  boxShadow:
                    '3px 4px 0 #ede7dd, 7px 8px 0 #e1dbd0, 0 24px 56px rgba(0,0,0,0.38)',
                }}
              >
                {/* Candle stamp */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute right-6 top-5 text-black/12 rotate-6"
                >
                  <ChefHat className="h-7 w-7" />
                </div>

                {/* Ring holes */}
                <div
                  className="pointer-events-none absolute left-[30px] top-0 flex h-full flex-col justify-around py-10"
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

                {/* Subject line */}
                <div
                  className="flex items-center border-b border-[rgba(130,180,218,0.48)]"
                  style={{ height: 32, marginBottom: 0 }}
                >
                  <TypewriterText
                    as="span"
                    text="Subject: Get In Touch"
                    speed={18}
                    delay={600}
                    onDone={() => setLabelDone(true)}
                    className="font-special text-[10px] uppercase tracking-[0.22em] text-black/60"
                  />
                </div>

                {/* Heading */}
                {labelDone && (
                  <TypewriterText
                    as="h1"
                    text="We'd love<br/>to hear from you."
                    speed={38}
                    delay={100}
                    className="font-display font-light text-black"
                    style={{
                      fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                      lineHeight: '64px',
                      paddingTop: 8,
                    }}
                  />
                )}

                {/* Dog-ear */}
                <div className="dog-ear-corner" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Wavy paper edge — same as homepage hero bottom */}
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

// ─── Contact form section ────────────────────────────────────────────────────

function ContactForm() {
  return (
    <div style={{ perspective: '1400px' }}>
      <motion.section
        initial={{ opacity: 0, rotateX: -9, y: 16 }}
        whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.85, ease: [0.33, 1, 0.68, 1] }}
        style={{ transformOrigin: 'top center' }}
        className="bg-warm-white px-6 py-16 md:px-8 md:py-[100px] lg:px-10"
      >
        <div className="mx-auto max-w-[84rem]">
          <motion.div
            initial={{ opacity: 0, y: 24, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0.35 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.7,
              delay: 0.12,
              ease: [0.33, 1, 0.68, 1],
            }}
            className="lined-paper relative mx-auto max-w-[52rem]"
            style={{
              padding: '10px 40px 52px 84px',
              boxShadow:
                '3px 4px 0 #ede7dd, 7px 8px 0 #e1dbd0, 0 14px 32px rgba(0,0,0,0.09)',
            }}
          >
            {/* Ring holes */}
            <div
              className="pointer-events-none absolute left-[30px] top-0 flex h-full flex-col justify-around py-10"
              aria-hidden
            >
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-[18px] w-[18px] rounded-full bg-warm-white/70"
                  style={{ boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.18)' }}
                />
              ))}
            </div>

            {/* Subject line */}
            <div
              className="flex items-center border-b border-[rgba(130,180,218,0.48)]"
              style={{ height: 32, marginBottom: 0 }}
            >
              <span className="font-special text-[10px] uppercase tracking-[0.22em] text-black/60">
                Subject: Send A Message
              </span>
            </div>

            {/* Chalk annotation */}
            <ChalkNote
              text="We reply within 24 hrs"
              color="#94d6ff"
              className="-right-4 top-10 md:-right-8"
            />

            {/* Form fields — transparent so ruled lines show through */}
            <form className="mt-2 space-y-0">
              {[
                {
                  id: 'name',
                  label: 'Full Name',
                  type: 'text',
                  placeholder: 'Your name',
                },
                {
                  id: 'email',
                  label: 'Email',
                  type: 'email',
                  placeholder: 'you@example.com',
                },
                {
                  id: 'phone',
                  label: 'Phone',
                  type: 'tel',
                  placeholder: '(480) 555-0000',
                },
              ].map((field) => (
                <div
                  key={field.id}
                  className="group relative"
                  style={{ height: 64 }}
                >
                  <label
                    htmlFor={field.id}
                    className="absolute left-0 top-[14px] font-special text-[9px] uppercase tracking-[0.2em] text-black/44 transition-all duration-200 group-focus-within:text-black/70"
                  >
                    {field.label}
                  </label>
                  <input
                    id={field.id}
                    type={field.type}
                    placeholder={field.placeholder}
                    className="absolute inset-x-0 bottom-0 h-[32px] bg-transparent font-display text-[1.1rem] font-light text-black placeholder:text-black/24 focus:outline-none"
                  />
                </div>
              ))}

              {/* Message — spans multiple ruled lines */}
              <div className="relative pt-4" style={{ minHeight: 192 }}>
                <label
                  htmlFor="message"
                  className="font-special text-[9px] uppercase tracking-[0.2em] text-black/44"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Tell us about your visit, event, or inquiry…"
                  className="mt-1 w-full resize-none bg-transparent font-display text-[1.05rem] font-light leading-[32px] text-black placeholder:text-black/24 focus:outline-none"
                  style={{ lineHeight: '32px' }}
                />
              </div>

              {/* Submit — paper tag style */}
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="paper-tag group cursor-pointer transition-all duration-300 hover:shadow-paper"
                  style={{
                    fontSize: 11,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    padding: '8px 20px',
                  }}
                >
                  <Mail className="h-3 w-3 opacity-60 transition-opacity group-hover:opacity-100" />
                  Send Message
                  <span className="ml-1 transition-transform duration-300 group-hover:translate-x-0.5 inline-block">
                    →
                  </span>
                </button>
              </div>
            </form>

            {/* Dog-ear */}
            <div className="dog-ear-corner" />
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}

// ─── Info cards ───────────────────────────────────────────────────────────────

function InfoCards() {
  return (
    <section className="bg-warm-white px-6 pb-20 md:px-8 md:pb-[120px] lg:px-10">
      <div className="mx-auto max-w-[84rem]">
        <div className="grid gap-8 md:grid-cols-3">
          {INFO_CARDS.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.65,
                delay: i * 0.12,
                ease: [0.33, 1, 0.68, 1],
              }}
              className="lined-paper relative"
              style={{
                padding: '10px 28px 40px 72px',
                rotate: card.cardRotate,
                boxShadow:
                  '3px 4px 0 #ede7dd, 7px 8px 0 #e1dbd0, 0 10px 24px rgba(0,0,0,0.07)',
              }}
            >
              {/* Floating paper tag */}
              <div
                aria-hidden
                className="paper-tag pointer-events-none absolute -right-3 -top-2 z-10"
                style={{
                  transform: `rotate(${card.tagRotate})`,
                  color: card.noteColor,
                  borderColor: card.noteColor + '44',
                }}
              >
                {card.tag}
              </div>

              {/* Ring holes */}
              <div
                className="pointer-events-none absolute left-[26px] top-0 flex h-full flex-col justify-around py-8"
                aria-hidden
              >
                {[0, 1, 2].map((j) => (
                  <div
                    key={j}
                    className="h-[15px] w-[15px] rounded-full bg-warm-white/70"
                    style={{ boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.18)' }}
                  />
                ))}
              </div>

              {/* Subject line */}
              <div
                className="flex items-center gap-2 border-b border-[rgba(130,180,218,0.48)]"
                style={{ height: 28 }}
              >
                <card.Icon
                  className="h-3 w-3 text-black/40"
                  strokeWidth={1.5}
                />
                <span className="font-special text-[9px] uppercase tracking-[0.2em] text-black/54">
                  {card.label}
                </span>
              </div>

              {/* Content lines */}
              <div className="mt-1 space-y-0">
                {card.lines.map((line) => (
                  <p
                    key={line}
                    className="font-display font-light text-black"
                    style={{ fontSize: '1.05rem', lineHeight: '32px' }}
                  >
                    {line}
                  </p>
                ))}
              </div>

              {/* Chalk note */}
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-6 left-[72px]"
                style={{ color: card.noteColor }}
              >
                <span
                  className="chalk-chef-label"
                  style={{ fontSize: 10, color: card.noteColor }}
                >
                  {card.note}
                </span>
              </div>

              {/* Dog-ear */}
              <div className="dog-ear-corner" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  return (
    <main className="overflow-x-hidden bg-warm-white pb-16 md:pb-0">
      <AnnouncementBar messages={announcementMessages} />
      <Header leftLinks={navLinks.left} rightLinks={navLinks.right} />
      <ContactHero />
      <ContactForm />
      <TornEdge variant={1} />
      <InfoCards />
      <TornEdge variant={3} />
      <Footer {...footer} />
      <MobileBottomBar />
    </main>
  )
}
