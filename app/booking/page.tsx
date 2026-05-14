'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

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
  bookingHero,
} from '@/lib/kindred-home-data'

// ─── Types ────────────────────────────────────────────────────────────────────

interface BookingData {
  service: string
  date: string
  month: string
  day: string
  year: string
  guests: number
  name: string
  email: string
  phone: string
  notes: string
}

const SERVICES = [
  { id: 'dinner', label: 'Dinner', sub: 'Tue – Sun, 5:30 pm – 10 pm' },
  { id: 'private', label: 'Private Dining', sub: 'Groups of 12 – 40' },
  { id: 'counter', label: "Chef's Counter", sub: '8 seats · omakase' },
  { id: 'buyout', label: 'Buyout / Event', sub: 'Full restaurant · up to 80' },
]

const TOTAL_STEPS = 5

// ─── Tally mark display ───────────────────────────────────────────────────────

function TallyGroup({ count, delay }: { count: number; delay: number }) {
  const reduced = useReducedMotion()
  const dur = reduced ? 0 : 0.45

  // Positions for 4 vertical strokes + 1 diagonal in a 38×48 viewBox
  const strokes = [
    'M 6 6 L 6 42',
    'M 14 6 L 14 42',
    'M 22 6 L 22 42',
    'M 30 6 L 30 42',
    'M 2 40 L 36 8', // diagonal strike
  ]

  return (
    <svg viewBox="0 0 38 48" width={28} height={36} aria-hidden="true">
      {strokes.slice(0, count).map((d, i) => (
        <motion.path
          key={i}
          d={d}
          stroke="rgba(255,255,255,0.82)"
          strokeWidth={2.2}
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            pathLength: { duration: dur, delay: delay + i * 0.07 },
            opacity: { duration: 0.01, delay: delay + i * 0.07 },
          }}
        />
      ))}
    </svg>
  )
}

function TallyDisplay({ count }: { count: number }) {
  const groups: number[] = []
  let remaining = Math.min(count, 25)
  while (remaining > 0) {
    groups.push(Math.min(remaining, 5))
    remaining -= 5
  }

  return (
    <div className="flex flex-wrap items-end gap-2 justify-center min-h-[48px]">
      {groups.map((g, i) => (
        <TallyGroup key={i} count={g} delay={i * 0.3} />
      ))}
    </div>
  )
}

// ─── Chalk-rectangle selection highlight ─────────────────────────────────────

function ChalkRect({ active }: { active: boolean }) {
  const reduced = useReducedMotion()
  const dur = reduced ? 0 : 0.55
  if (!active) return null

  return (
    <svg
      className="pointer-events-none absolute inset-0 w-full h-full"
      viewBox="0 0 200 68"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <motion.path
        d="M 6 4 L 194 4 L 194 64 L 6 64 Z"
        stroke="rgba(255,255,255,0.72)"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="rgba(255,255,255,0.07)"
        strokeDasharray="4 3"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{
          pathLength: { duration: dur },
          opacity: { duration: 0.01 },
        }}
      />
    </svg>
  )
}

// ─── Step indicator ───────────────────────────────────────────────────────────

function StepIndicator({ step }: { step: number }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {Array.from({ length: TOTAL_STEPS }, (_, i) => {
        const n = i + 1
        const done = n < step
        const active = n === step
        return (
          <div key={n} className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center border transition-all duration-300 ${
                active
                  ? 'border-white/80 bg-white/12 text-white'
                  : done
                    ? 'border-white/40 bg-white/8 text-white/50'
                    : 'border-white/20 text-white/30'
              }`}
              style={{ fontFamily: 'var(--font-special)', fontSize: 12 }}
            >
              {done ? '✓' : n}
            </div>
            {i < TOTAL_STEPS - 1 && (
              <div
                className={`w-6 h-px transition-all duration-300 ${
                  done ? 'bg-white/40' : 'bg-white/14'
                }`}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

// ─── Chalk heading / label helpers ───────────────────────────────────────────

function ChalkHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-white/90 text-center mb-6 leading-tight"
      style={{
        fontFamily: 'var(--font-special)',
        fontSize: 22,
        letterSpacing: '0.06em',
        textShadow: '0 1px 8px rgba(0,0,0,0.4)',
      }}
    >
      {children}
    </h2>
  )
}

function ChalkLabel({ children }: { children: React.ReactNode }) {
  return (
    <label
      className="block text-white/50 mb-1"
      style={{
        fontFamily: 'var(--font-special)',
        fontSize: 11,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
      }}
    >
      {children}
    </label>
  )
}

// ─── Step 1 — Service picker ──────────────────────────────────────────────────

function Step1({
  data,
  onChange,
  onNext,
}: {
  data: BookingData
  onChange: (key: keyof BookingData, val: string) => void
  onNext: () => void
}) {
  return (
    <div>
      <ChalkHeading>What brings you in?</ChalkHeading>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
        {SERVICES.map((s) => {
          const active = data.service === s.id
          return (
            <button
              key={s.id}
              onClick={() => onChange('service', s.id)}
              className="relative text-left px-5 py-4 rounded transition-colors duration-200 cursor-pointer"
              style={{
                background: active
                  ? 'rgba(255,255,255,0.08)'
                  : 'rgba(255,255,255,0.04)',
              }}
            >
              <ChalkRect active={active} />
              <div
                className="text-white/90"
                style={{ fontFamily: 'var(--font-special)', fontSize: 15 }}
              >
                {s.label}
              </div>
              <div
                className="text-white/44 mt-0.5"
                style={{ fontFamily: 'var(--font-ui)', fontSize: 11 }}
              >
                {s.sub}
              </div>
            </button>
          )
        })}
      </div>
      <div className="flex justify-end">
        <button
          disabled={!data.service}
          onClick={onNext}
          className="paper-tag text-black/80 disabled:opacity-40 cursor-pointer"
          style={{
            fontSize: 12,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
          }}
        >
          Next →
        </button>
      </div>
    </div>
  )
}

// ─── Step 2 — Date ────────────────────────────────────────────────────────────

function Step2({
  data,
  onChange,
  onNext,
  onBack,
}: {
  data: BookingData
  onChange: (key: keyof BookingData, val: string) => void
  onNext: () => void
  onBack: () => void
}) {
  const valid = data.month && data.day && data.year
  return (
    <div>
      <ChalkHeading>When would you like to visit?</ChalkHeading>
      <div className="grid grid-cols-3 gap-5 mb-8">
        <div>
          <ChalkLabel>Month</ChalkLabel>
          <input
            className="chalk-field"
            placeholder="MM"
            maxLength={2}
            value={data.month}
            onChange={(e) =>
              onChange('month', e.target.value.replace(/\D/g, ''))
            }
          />
        </div>
        <div>
          <ChalkLabel>Day</ChalkLabel>
          <input
            className="chalk-field"
            placeholder="DD"
            maxLength={2}
            value={data.day}
            onChange={(e) => onChange('day', e.target.value.replace(/\D/g, ''))}
          />
        </div>
        <div>
          <ChalkLabel>Year</ChalkLabel>
          <input
            className="chalk-field"
            placeholder="YYYY"
            maxLength={4}
            value={data.year}
            onChange={(e) =>
              onChange('year', e.target.value.replace(/\D/g, ''))
            }
          />
        </div>
      </div>
      <StepNav onBack={onBack} onNext={onNext} nextDisabled={!valid} />
    </div>
  )
}

// ─── Step 3 — Guest count ─────────────────────────────────────────────────────

function Step3({
  data,
  onGuests,
  onNext,
  onBack,
}: {
  data: BookingData
  onGuests: (n: number) => void
  onNext: () => void
  onBack: () => void
}) {
  return (
    <div>
      <ChalkHeading>How many guests?</ChalkHeading>
      <div className="flex items-center justify-center gap-6 mb-4">
        <button
          onClick={() => onGuests(Math.max(1, data.guests - 1))}
          className="w-10 h-10 rounded-full border border-white/30 text-white/80 flex items-center justify-center text-xl hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Fewer guests"
          style={{ fontFamily: 'var(--font-special)' }}
        >
          −
        </button>
        <span
          className="text-white/90 text-3xl min-w-[3ch] text-center"
          style={{ fontFamily: 'var(--font-special)' }}
        >
          {data.guests}
        </span>
        <button
          onClick={() => onGuests(Math.min(80, data.guests + 1))}
          className="w-10 h-10 rounded-full border border-white/30 text-white/80 flex items-center justify-center text-xl hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="More guests"
          style={{ fontFamily: 'var(--font-special)' }}
        >
          +
        </button>
      </div>
      <div className="mb-8 py-2 min-h-[56px]">
        <TallyDisplay count={data.guests} />
      </div>
      <StepNav onBack={onBack} onNext={onNext} />
    </div>
  )
}

// ─── Step 4 — Contact details ─────────────────────────────────────────────────

function Step4({
  data,
  onChange,
  onNext,
  onBack,
}: {
  data: BookingData
  onChange: (key: keyof BookingData, val: string) => void
  onNext: () => void
  onBack: () => void
}) {
  const valid = data.name && data.email
  return (
    <div>
      <ChalkHeading>Your details</ChalkHeading>
      <div className="flex flex-col gap-6 mb-8">
        <div>
          <ChalkLabel>Full Name</ChalkLabel>
          <input
            className="chalk-field"
            placeholder="Jane Smith"
            value={data.name}
            onChange={(e) => onChange('name', e.target.value)}
          />
        </div>
        <div>
          <ChalkLabel>Email Address</ChalkLabel>
          <input
            className="chalk-field"
            type="email"
            placeholder="jane@example.com"
            value={data.email}
            onChange={(e) => onChange('email', e.target.value)}
          />
        </div>
        <div>
          <ChalkLabel>Phone (optional)</ChalkLabel>
          <input
            className="chalk-field"
            type="tel"
            placeholder="+1 (555) 000-0000"
            value={data.phone}
            onChange={(e) => onChange('phone', e.target.value)}
          />
        </div>
      </div>
      <StepNav onBack={onBack} onNext={onNext} nextDisabled={!valid} />
    </div>
  )
}

// ─── Step 5 — Notes + review ──────────────────────────────────────────────────

function Step5({
  data,
  onChange,
  onSubmit,
  onBack,
}: {
  data: BookingData
  onChange: (key: keyof BookingData, val: string) => void
  onSubmit: () => void
  onBack: () => void
}) {
  const serviceLabel =
    SERVICES.find((s) => s.id === data.service)?.label ?? data.service
  const dateStr = `${data.month}/${data.day}/${data.year}`

  return (
    <div>
      <ChalkHeading>Almost there</ChalkHeading>

      {/* Review summary */}
      <div
        className="mb-6 rounded px-4 py-3 border border-white/14 grid grid-cols-2 gap-x-4 gap-y-2"
        style={{ background: 'rgba(255,255,255,0.05)' }}
      >
        {(
          [
            ['Service', serviceLabel],
            ['Date', dateStr],
            ['Guests', String(data.guests)],
            ['Name', data.name],
            ['Email', data.email],
            ...(data.phone ? [['Phone', data.phone]] : []),
          ] as [string, string][]
        ).map(([label, val]) => (
          <div key={label}>
            <div
              className="text-white/40"
              style={{
                fontFamily: 'var(--font-special)',
                fontSize: 10,
                letterSpacing: '0.12em',
              }}
            >
              {label}
            </div>
            <div
              className="text-white/80"
              style={{ fontFamily: 'var(--font-special)', fontSize: 13 }}
            >
              {val}
            </div>
          </div>
        ))}
      </div>

      <div className="mb-8">
        <ChalkLabel>Any notes or dietary needs?</ChalkLabel>
        <textarea
          className="chalk-field resize-none"
          placeholder="Allergies, anniversaries, seating preferences…"
          rows={3}
          value={data.notes}
          onChange={(e) => onChange('notes', e.target.value)}
          style={{
            borderBottom: 'none',
            borderTop: '1.5px solid rgba(255,255,255,0.14)',
          }}
        />
      </div>

      <div className="flex items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="text-white/40 hover:text-white/70 transition-colors cursor-pointer"
          style={{ fontFamily: 'var(--font-special)', fontSize: 13 }}
        >
          ← Back
        </button>
        <button
          onClick={onSubmit}
          className="paper-tag text-black/80 cursor-pointer"
          style={{
            fontSize: 12,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            padding: '8px 20px',
          }}
        >
          Send Request ✦
        </button>
      </div>
    </div>
  )
}

// ─── Shared back / next nav ───────────────────────────────────────────────────

function StepNav({
  onBack,
  onNext,
  nextDisabled,
}: {
  onBack: () => void
  onNext: () => void
  nextDisabled?: boolean
}) {
  return (
    <div className="flex items-center justify-between">
      <button
        onClick={onBack}
        className="text-white/40 hover:text-white/70 transition-colors cursor-pointer"
        style={{ fontFamily: 'var(--font-special)', fontSize: 13 }}
      >
        ← Back
      </button>
      <button
        disabled={nextDisabled}
        onClick={onNext}
        className="paper-tag text-black/80 disabled:opacity-40 cursor-pointer"
        style={{
          fontSize: 12,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
        }}
      >
        Next →
      </button>
    </div>
  )
}

// ─── Confirmation slate ───────────────────────────────────────────────────────

function ConfirmationSlate({ name }: { name: string }) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      initial={{ opacity: 0, y: reduced ? 0 : 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
      className="text-center py-4"
    >
      {/* Chalk check circle */}
      <svg
        className="mx-auto mb-5"
        viewBox="0 0 60 60"
        width={60}
        height={60}
        aria-hidden="true"
      >
        <motion.circle
          cx="30"
          cy="30"
          r="24"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth={2}
          strokeDasharray="3 3"
          fill="rgba(255,255,255,0.06)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            pathLength: { duration: reduced ? 0 : 0.8 },
            opacity: { duration: 0.01 },
          }}
        />
        <motion.path
          d="M 18 30 L 26 40 L 44 22"
          stroke="rgba(255,255,255,0.82)"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            pathLength: { duration: reduced ? 0 : 0.55, delay: 0.55 },
            opacity: { duration: 0.01, delay: 0.55 },
          }}
        />
      </svg>
      <div
        className="text-white/90 mb-2"
        style={{
          fontFamily: 'var(--font-special)',
          fontSize: 22,
          letterSpacing: '0.06em',
        }}
      >
        Thank you, {name.split(' ')[0]}.
      </div>
      <div
        className="text-white/48 mb-8 max-w-xs mx-auto"
        style={{
          fontFamily: 'var(--font-special)',
          fontSize: 13,
          lineHeight: 1.7,
        }}
      >
        We&apos;ll be in touch shortly to confirm your reservation.
      </div>
      <Link
        href="/"
        className="paper-tag text-black/80"
        style={{
          fontSize: 12,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
        }}
      >
        Return Home
      </Link>
    </motion.div>
  )
}

// ─── Main Chalkboard component ────────────────────────────────────────────────

const EMPTY: BookingData = {
  service: '',
  date: '',
  month: '',
  day: '',
  year: '',
  guests: 2,
  name: '',
  email: '',
  phone: '',
  notes: '',
}

function Chalkboard() {
  const reduced = useReducedMotion()
  const [step, setStep] = useState(1)
  const [data, setData] = useState<BookingData>(EMPTY)
  const [submitted, setSubmitted] = useState(false)
  const [dir, setDir] = useState<1 | -1>(1)

  function change(key: keyof BookingData, val: string) {
    setData((d) => ({ ...d, [key]: val }))
  }
  function guests(n: number) {
    setData((d) => ({ ...d, guests: n }))
  }
  function next() {
    setDir(1)
    setStep((s) => s + 1)
  }
  function back() {
    setDir(-1)
    setStep((s) => s - 1)
  }

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: reduced ? 0 : d * 28 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: reduced ? 0 : d * -28 }),
  }

  return (
    <div
      className="relative rounded-lg overflow-hidden"
      style={{
        border: '14px solid #7a5220',
        boxShadow:
          '6px 8px 0 #5c3d18, 12px 16px 0 rgba(0,0,0,0.22), 0 24px 48px rgba(0,0,0,0.32)',
      }}
    >
      <div className="chalkboard-surface px-6 pt-6 pb-8 md:px-10 md:pt-8 md:pb-10">
        {/* Board header */}
        <div className="flex items-center justify-between mb-2">
          <div
            className="text-white/35"
            style={{
              fontFamily: 'var(--font-special)',
              fontSize: 11,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
            }}
          >
            Pot Rankinz Kitchen
          </div>
          {/* Chalk dust corner smudges */}
          <div className="flex gap-1 opacity-30" aria-hidden="true">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-white/60"
                style={{ transform: `rotate(${i * 20}deg)` }}
              />
            ))}
          </div>
        </div>

        {/* Step indicator */}
        {!submitted && <StepIndicator step={step} />}

        {/* Step content */}
        <AnimatePresence mode="wait" custom={dir}>
          {submitted ? (
            <ConfirmationSlate key="done" name={data.name} />
          ) : (
            <motion.div
              key={step}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: reduced ? 0 : 0.3,
                ease: [0.33, 1, 0.68, 1],
              }}
            >
              {step === 1 && (
                <Step1 data={data} onChange={change} onNext={next} />
              )}
              {step === 2 && (
                <Step2
                  data={data}
                  onChange={change}
                  onNext={next}
                  onBack={back}
                />
              )}
              {step === 3 && (
                <Step3
                  data={data}
                  onGuests={guests}
                  onNext={next}
                  onBack={back}
                />
              )}
              {step === 4 && (
                <Step4
                  data={data}
                  onChange={change}
                  onNext={next}
                  onBack={back}
                />
              )}
              {step === 5 && (
                <Step5
                  data={data}
                  onChange={change}
                  onBack={back}
                  onSubmit={() => setSubmitted(true)}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

// ─── Booking Hero ─────────────────────────────────────────────────────────────

function BookingHero() {
  return (
    <section className="relative h-[52vh] min-h-[380px] overflow-hidden">
      <Image
        src={bookingHero.image}
        alt="Restaurant table setting"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      {/* gradient: darkest at top for nav visibility, soft at bottom */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.54) 0%, rgba(0,0,0,0.22) 42%, rgba(0,0,0,0.58) 100%)',
        }}
      />

      {/* Hero card */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
          className="lined-paper shadow-paper rounded-md px-7 py-6 max-w-md w-full text-center relative"
        >
          {/* Ring holes */}
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="absolute left-[22px] w-4 h-4 rounded-full border-2 border-black/14 bg-[#fdf8ec]"
              style={{ top: `${20 + i * 34}%` }}
            />
          ))}

          <div
            className="text-black/40 mb-1 ml-8"
            style={{
              fontFamily: 'var(--font-special)',
              fontSize: 11,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
            }}
          >
            <TypewriterText text="Subject: Make a Reservation" speed={42} />
          </div>
          <h1
            className="text-black/80 ml-8 leading-tight"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 32,
              fontWeight: 300,
            }}
          >
            Book Your Table.
          </h1>
        </motion.div>
      </div>

      {/* Wavy bottom edge */}
      <div
        className="absolute inset-x-0 bottom-0 pointer-events-none"
        style={{ height: 40 }}
      >
        <svg
          viewBox="0 0 1440 40"
          preserveAspectRatio="none"
          style={{ width: '100%', height: '100%', display: 'block' }}
        >
          <path
            d="M0,20 Q120,40 240,20 Q360,0 480,20 Q600,40 720,20 Q840,0 960,20 Q1080,40 1200,20 Q1320,0 1440,20 L1440,40 L0,40 Z"
            fill="var(--color-warm-white)"
          />
        </svg>
      </div>
    </section>
  )
}

// ─── FAQ cards ────────────────────────────────────────────────────────────────

const FAQS = [
  {
    q: 'Cancellations',
    a: 'We ask for 24 hours notice. For parties of 6 or more, 48 hours is appreciated.',
    rotate: -1.2,
    tag: '✦ Policy',
    tagColor: 'bg-rose-100/80',
  },
  {
    q: 'Dietary Needs',
    a: 'Please note allergies in the reservation notes and we will confirm accommodations before your visit.',
    rotate: 0.6,
    tag: '✦ Accommodations',
    tagColor: 'bg-amber-100/80',
  },
  {
    q: 'Large Parties',
    a: "Groups over 8 require a minimum spend. Chef's Counter and Buyout inquiries go directly to our events team.",
    rotate: -0.5,
    tag: '✦ Groups',
    tagColor: 'bg-emerald-100/80',
  },
]

function FAQCards() {
  return (
    <section className="px-6 pb-24 md:px-10">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55 }}
          className="text-center mb-10"
        >
          <h2
            className="text-black/70"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 26,
              fontWeight: 300,
            }}
          >
            Good to Know
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FAQS.map((faq, i) => (
            <motion.div
              key={faq.q}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="lined-paper shadow-paper rounded-md px-5 py-5 relative"
              style={{ transform: `rotate(${faq.rotate}deg)` }}
            >
              {/* Dog-ear */}
              <div className="dog-ear-corner" />

              {/* Ring hole */}
              <div className="absolute left-4 top-4 w-3.5 h-3.5 rounded-full border-2 border-black/13 bg-[#fdf8ec]" />

              <div className={`paper-tag mb-3 ml-6 ${faq.tagColor}`}>
                {faq.tag}
              </div>
              <div
                className="font-semibold text-black/75 mb-2 ml-1"
                style={{ fontFamily: 'var(--font-special)', fontSize: 15 }}
              >
                {faq.q}
              </div>
              <p
                className="text-black/55 leading-relaxed ml-1"
                style={{ fontFamily: 'var(--font-body)', fontSize: 13 }}
              >
                {faq.a}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BookingPage() {
  return (
    <>
      <AnnouncementBar messages={announcementMessages} />
      <Header leftLinks={navLinks.left} rightLinks={navLinks.right} />

      <main>
        <BookingHero />

        {/* Chalkboard section */}
        <section className="px-6 py-16 md:px-10">
          <div className="max-w-xl mx-auto">
            <Chalkboard />
          </div>
        </section>

        <TornEdge variant={2} />

        <FAQCards />
      </main>

      <Footer {...footer} />
      <MobileBottomBar />
    </>
  )
}
