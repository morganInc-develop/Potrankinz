'use client'

import { Fragment, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import {
  ArrowRight,
  CalendarDays,
  ChefHat,
  Check,
  ConciergeBell,
  Flame,
  Search,
  Star,
  Truck,
  Users,
  UtensilsCrossed,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import AnnouncementBar from '@/components/layout/AnnouncementBar'
import Header from '@/components/layout/Header'
import MobileBottomBar from '@/components/layout/MobileBottomBar'
import Footer from '@/components/sections/Footer'
import TornEdge from '@/components/ui/TornEdge'
import HomepageLink from '@/components/ui/homepage-link'
import {
  announcementMessages,
  footer,
  navLinks,
  services,
} from '@/lib/kindred-home-data'

const ease = [0.33, 1, 0.68, 1] as const

const ROUGH_BTN =
  'polygon(0% 10%, 4% 2%, 10% 8%, 17% 0%, 24% 8%, 31% 2%, 38% 10%, 45% 2%, 52% 8%, 59% 2%, 66% 8%, 73% 0%, 80% 10%, 87% 2%, 94% 8%, 100% 5%, 99% 50%, 100% 95%, 96% 100%, 89% 90%, 82% 100%, 75% 92%, 68% 100%, 61% 90%, 54% 100%, 47% 92%, 40% 100%, 33% 90%, 26% 100%, 19% 92%, 12% 100%, 5% 90%, 0% 95%, 1% 50%)'

const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`

const EDGE_COLORS = ['#C41E3A', '#F5C518', '#4CAF50'] as const

const SERVICE_ICONS: Record<string, LucideIcon> = {
  'private-dining': Users,
  catering: ConciergeBell,
  'chefs-counter': Truck,
  buyouts: Flame,
}

const SERVICE_COLORS: Record<
  string,
  { paint: string; text: string; glow: string }
> = {
  'private-dining': {
    paint: '#F5C518',
    text: '#0D0A06',
    glow: 'rgba(245,197,24,0.24)',
  },
  catering: {
    paint: '#4CAF50',
    text: '#0D0A06',
    glow: 'rgba(76,175,80,0.22)',
  },
  'chefs-counter': {
    paint: '#C41E3A',
    text: '#fff7e5',
    glow: 'rgba(196,30,58,0.24)',
  },
  buyouts: {
    paint: '#F5C518',
    text: '#0D0A06',
    glow: 'rgba(245,197,24,0.22)',
  },
}

const serviceStats = [
  ['4 service styles', 'Built around the room'],
  ['Hot food flow', 'Setup, serve, cleanup'],
  ['Florida + beyond', 'Events large and small'],
]

const steps = [
  {
    title: 'Choose the service',
    body: 'Pick the format that fits: staffed catering, private dining, pickup trays, or a high-energy pop-up.',
    Icon: Search,
  },
  {
    title: 'Build the menu',
    body: 'We shape portions, sides, drinks, dietary needs, timing, and service flow around your guest count.',
    Icon: UtensilsCrossed,
  },
  {
    title: 'Let us handle it',
    body: 'The team brings the flavor, organizes the setup, keeps the line moving, and leaves the room clean.',
    Icon: Check,
  },
]

const testimonials = [
  {
    name: 'Brandon Baptista',
    type: 'Birthday catering',
    quote:
      'The food stayed hot, the setup looked sharp, and everyone went back for jerk chicken and rice & peas.',
  },
  {
    name: 'Arlene McCoy',
    type: 'Private dinner',
    quote:
      'They turned a regular backyard dinner into a real celebration. The service was calm and the flavors were huge.',
  },
  {
    name: 'Albert Flores',
    type: 'Corporate lunch',
    quote:
      'Easy planning, generous portions, and no confusion day-of. The curry goat was the first tray gone.',
  },
]

function PotPattern() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.11]">
      {Array.from({ length: 24 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${(i * 23) % 106}%`,
            top: `${(i * 17) % 96}%`,
          }}
          animate={{
            y: [0, i % 2 === 0 ? -8 : 8, 0],
            rotate: [i % 2 === 0 ? -4 : 4, 0, i % 2 === 0 ? -4 : 4],
          }}
          transition={{
            duration: 7 + (i % 4),
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className="relative h-11 w-16 rounded-b-[22px] rounded-t-[10px] border-2 border-white/35">
            <div className="absolute -left-3 top-3 h-5 w-4 rounded-l-full border-2 border-r-0 border-white/35" />
            <div className="absolute -right-3 top-3 h-5 w-4 rounded-r-full border-2 border-l-0 border-white/35" />
            <div className="absolute left-3 right-3 top-[-8px] h-2 rounded-full bg-white/35" />
          </div>
        </motion.div>
      ))}
    </div>
  )
}

function FlagBrush({
  className = '',
  reverse = false,
}: {
  className?: string
  reverse?: boolean
}) {
  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none absolute ${className}`}
      initial={{ opacity: 0, x: reverse ? 45 : -45, rotate: reverse ? 4 : -4 }}
      whileInView={{ opacity: 1, x: 0, rotate: reverse ? -2 : 2 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.85, ease }}
    >
      <div
        className="relative h-[132px] w-[260px] overflow-hidden opacity-90 md:h-[180px] md:w-[360px]"
        style={{
          clipPath:
            'polygon(0 18%, 12% 8%, 28% 16%, 44% 4%, 58% 13%, 75% 6%, 100% 18%, 94% 84%, 78% 74%, 62% 90%, 44% 78%, 27% 94%, 12% 80%, 0 88%)',
          transform: reverse ? 'scaleX(-1)' : undefined,
        }}
      >
        <div className="absolute inset-0 bg-[#0D0A06]" />
        <div className="absolute inset-x-[-16%] top-1/2 h-8 -translate-y-1/2 rotate-[24deg] bg-[#F5C518]" />
        <div className="absolute inset-x-[-16%] top-1/2 h-8 -translate-y-1/2 rotate-[-24deg] bg-[#F5C518]" />
        <div className="absolute bottom-0 left-0 h-1/2 w-full bg-[#1E6B1E] [clip-path:polygon(0_0,50%_54%,100%_0,100%_100%,0_100%)]" />
        <div
          className="absolute inset-0"
          style={{ backgroundImage: GRAIN, opacity: 0.3 }}
        />
      </div>
    </motion.div>
  )
}

function SectionHeading({
  eyebrow,
  title,
  body,
  centered = false,
}: {
  eyebrow: string
  title: string
  body?: string
  centered?: boolean
}) {
  return (
    <motion.div
      className={`mb-10 max-w-4xl ${centered ? 'mx-auto text-center' : ''}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.66, ease }}
    >
      <span className="font-ui text-[12px] font-bold uppercase tracking-[0.24em] text-[#F5C518]">
        {eyebrow}
      </span>
      <h2 className="mt-3 font-display text-[clamp(3rem,6.2vw,6.8rem)] font-light uppercase leading-[0.88] text-white">
        {title}
      </h2>
      {body && (
        <p className="mt-5 max-w-2xl text-base leading-7 text-white/68 md:text-lg">
          {body}
        </p>
      )}
    </motion.div>
  )
}

function ServiceHero() {
  const [activeId, setActiveId] = useState('catering')
  const heroRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const cutoutY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, prefersReducedMotion ? 0 : 72],
  )
  const active =
    services.find((service) => service.id === activeId) ?? services[0]
  const activeColor = SERVICE_COLORS[active.id]

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100svh] overflow-hidden bg-[#050505] px-6 pb-16 pt-32 text-white md:px-8 lg:px-14"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 18% 20%, rgba(196,30,58,0.22), transparent 28%), radial-gradient(circle at 82% 28%, rgba(76,175,80,0.24), transparent 30%), linear-gradient(120deg, rgba(245,197,24,0.08), transparent 45%)',
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '42px 42px',
        }}
      />
      <PotPattern />
      <FlagBrush className="left-[-6rem] top-[11rem]" />
      <FlagBrush className="bottom-[5rem] right-[-6rem]" reverse />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: GRAIN,
          opacity: 0.12,
          mixBlendMode: 'overlay',
        }}
      />

      <motion.div
        className="pointer-events-none absolute bottom-[-3rem] left-[-7rem] hidden h-[72vh] w-[26rem] md:block lg:w-[30rem]"
        style={{ y: cutoutY }}
        initial={{ opacity: 0, x: -60, rotate: -4 }}
        animate={{ opacity: 1, x: 0, rotate: -2 }}
        transition={{ duration: 0.85, delay: 0.25, ease }}
      >
        <Image
          src="/hero-chefs/cutouts/evette-quoibia-trimmed.png"
          alt=""
          fill
          priority
          sizes="30vw"
          className="object-contain object-bottom chef-paper-cutout"
        />
      </motion.div>

      <motion.div
        className="pointer-events-none absolute bottom-[-4rem] right-[-7rem] hidden h-[76vh] w-[28rem] md:block lg:w-[32rem]"
        style={{ y: cutoutY }}
        initial={{ opacity: 0, x: 60, rotate: 4 }}
        animate={{ opacity: 1, x: 0, rotate: 2 }}
        transition={{ duration: 0.85, delay: 0.38, ease }}
      >
        <Image
          src="/hero-chefs/cutouts/nick-wallace-trimmed.png"
          alt=""
          fill
          priority
          sizes="32vw"
          className="object-contain object-bottom chef-paper-cutout"
        />
      </motion.div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-8rem)] max-w-[90rem] flex-col items-center justify-center text-center">
        <motion.div
          className="mb-5 inline-flex items-center gap-2 border border-white/14 bg-white/[0.06] px-3 py-2"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease }}
        >
          <Star className="h-4 w-4 fill-[#F5C518] text-[#F5C518]" />
          <span className="font-ui text-[11px] font-bold uppercase tracking-[0.18em] text-[#F5C518]">
            Trusted event kitchen
          </span>
        </motion.div>

        <motion.h1
          className="max-w-5xl font-display text-[clamp(4rem,9vw,9.5rem)] font-light uppercase leading-[0.84] text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.72, delay: 0.12, ease }}
        >
          Your trusted kitchen for every event
        </motion.h1>
        <motion.p
          className="mt-6 max-w-2xl text-base leading-7 text-white/72 md:text-lg"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.62, delay: 0.28, ease }}
        >
          Catering, private dining, pickup trays, and pop-up service with big
          Jamaican flavor, clear planning, and a team that keeps the day moving.
        </motion.p>

        <motion.div
          className="mt-8 flex w-full max-w-[42rem] items-center gap-3 bg-white/[0.08] p-2 shadow-[0_20px_60px_rgba(0,0,0,0.28)] backdrop-blur-md"
          style={{ clipPath: ROUGH_BTN }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.42, ease }}
        >
          <div className="grid h-11 w-11 shrink-0 place-items-center text-white/70">
            <Search size={20} />
          </div>
          <div className="min-w-0 flex-1 text-left font-ui text-[13px] uppercase tracking-[0.12em] text-white/48">
            Find the service you need
          </div>
          <HomepageLink
            href="/contact"
            className="shrink-0 bg-[#F5C518] px-6 py-3 font-ui text-[12px] font-bold uppercase tracking-[0.14em] text-black"
            style={{ clipPath: ROUGH_BTN }}
          >
            Start
          </HomepageLink>
        </motion.div>

        <motion.div
          className="mt-8 grid w-full max-w-5xl gap-3 md:grid-cols-4"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.62, delay: 0.55, ease }}
        >
          {services.map((service) => {
            const Icon = SERVICE_ICONS[service.id] ?? ChefHat
            const colors = SERVICE_COLORS[service.id]
            const selected = service.id === active.id
            return (
              <button
                key={service.id}
                type="button"
                onClick={() => setActiveId(service.id)}
                className="group relative min-h-[7.6rem] overflow-hidden border border-white/10 bg-white/[0.055] p-4 text-left transition-transform hover:-translate-y-1"
              >
                <motion.span
                  className="absolute inset-x-0 top-0 h-1"
                  animate={{ scaleX: selected ? 1 : 0 }}
                  style={{
                    background: colors.paint,
                    transformOrigin: 'left center',
                  }}
                />
                <div
                  className="mb-3 grid h-9 w-9 place-items-center"
                  style={{
                    background: selected
                      ? colors.paint
                      : 'rgba(255,255,255,0.08)',
                    color: selected ? colors.text : 'rgba(255,255,255,0.72)',
                  }}
                >
                  <Icon size={18} />
                </div>
                <h2 className="font-display text-[1.55rem] font-light uppercase leading-none text-white">
                  {service.title}
                </h2>
                <p className="mt-2 line-clamp-2 text-xs leading-5 text-white/52">
                  {service.priceNote}
                </p>
              </button>
            )
          })}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            className="mt-6 max-w-3xl border border-white/10 bg-black/26 px-5 py-4 text-left backdrop-blur-md"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.32 }}
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p
                  className="font-special text-[13px] uppercase tracking-[0.08em]"
                  style={{ color: activeColor.paint }}
                >
                  {active.tag}
                </p>
                <p className="mt-1 text-sm leading-6 text-white/68">
                  {active.description}
                </p>
              </div>
              <HomepageLink
                href={active.href}
                className="inline-flex shrink-0 items-center gap-2 px-5 py-3 font-ui text-[12px] font-bold uppercase tracking-[0.14em]"
                style={{
                  background: activeColor.paint,
                  color: activeColor.text,
                  clipPath: ROUGH_BTN,
                }}
              >
                {active.cta}
                <ArrowRight size={15} />
              </HomepageLink>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 grid w-full max-w-3xl gap-3 md:grid-cols-3">
          {serviceStats.map(([value, label], i) => (
            <motion.div
              key={value}
              className="border-l-4 border-[#4CAF50] bg-white/[0.05] px-4 py-3 text-left"
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.72 + i * 0.08 }}
            >
              <div className="font-ui text-[12px] font-bold uppercase tracking-[0.16em] text-white">
                {value}
              </div>
              <div className="mt-1 text-xs text-white/50">{label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function StepGuide() {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <section className="relative overflow-hidden bg-warm-white px-6 py-20 text-black md:px-8 md:py-28 lg:px-14">
      <div className="mx-auto grid max-w-[90rem] gap-12 lg:grid-cols-[1fr_0.58fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65, ease }}
        >
          <span className="font-ui text-[12px] font-bold uppercase tracking-[0.24em] text-[#C41E3A]">
            Step-by-step
          </span>
          <h2 className="mt-3 max-w-4xl font-display text-[clamp(3rem,6.2vw,6.9rem)] font-light uppercase leading-[0.88] text-black">
            Getting your event fed with ease
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-7 text-black/68 md:text-lg">
            Start with the occasion, lock the menu and timing, then let the team
            handle the hot food, service flow, and cleanup.
          </p>
        </motion.div>

        <div className="grid gap-4">
          {steps.map(({ title, body, Icon }, i) => {
            const active = activeStep === i
            return (
              <motion.button
                key={title}
                type="button"
                onClick={() => setActiveStep(i)}
                className={`group relative overflow-hidden p-5 text-left transition-all ${
                  active
                    ? 'bg-white shadow-[7px_9px_0_rgba(0,0,0,0.08)]'
                    : 'bg-black/[0.035] opacity-65 hover:opacity-100'
                }`}
                initial={{ opacity: 0, x: 28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div className="flex gap-5">
                  <div
                    className="grid h-14 w-14 shrink-0 place-items-center rounded-full font-ui text-xl font-bold"
                    style={{
                      background: active ? '#7BE36F' : 'transparent',
                      border: active ? '0' : '1px solid rgba(0,0,0,0.14)',
                    }}
                  >
                    {i + 1}
                  </div>
                  <div>
                    <div className="mb-3 inline-flex items-center gap-2 font-ui text-[11px] font-bold uppercase tracking-[0.16em] text-[#1E6B1E]">
                      <Icon size={15} />
                      {title}
                    </div>
                    <p className="text-sm leading-6 text-black/62">{body}</p>
                  </div>
                </div>
              </motion.button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function ServiceExplorer() {
  const [activeId, setActiveId] = useState(services[0].id)
  const active =
    services.find((service) => service.id === activeId) ?? services[0]
  const colors = SERVICE_COLORS[active.id]
  const Icon = SERVICE_ICONS[active.id] ?? ChefHat

  return (
    <section className="relative overflow-hidden bg-[#050505] px-6 py-20 text-white md:px-8 md:py-28 lg:px-14">
      <FlagBrush className="right-[-5rem] top-12 opacity-45" reverse />
      <div className="relative z-10 mx-auto max-w-[90rem]">
        <SectionHeading
          eyebrow="Explore services"
          title="Choose your format"
          body="Each service is built from the same Pot Rankinz foundation: bold food, clear portions, organized setup, and a team that understands events."
        />

        <div className="grid gap-8 lg:grid-cols-[0.46fr_1fr]">
          <div className="grid gap-3">
            {services.map((service) => {
              const ServiceIcon = SERVICE_ICONS[service.id] ?? ChefHat
              const selected = active.id === service.id
              const serviceColor = SERVICE_COLORS[service.id]
              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => setActiveId(service.id)}
                  className={`flex items-center gap-4 border p-4 text-left transition-all ${
                    selected
                      ? 'border-white/18 bg-white/[0.08]'
                      : 'border-white/8 bg-white/[0.035] hover:border-white/16'
                  }`}
                >
                  <span
                    className="grid h-12 w-12 shrink-0 place-items-center"
                    style={{
                      background: selected
                        ? serviceColor.paint
                        : 'rgba(255,255,255,0.08)',
                      color: selected
                        ? serviceColor.text
                        : 'rgba(255,255,255,0.68)',
                    }}
                  >
                    <ServiceIcon size={20} />
                  </span>
                  <span>
                    <span className="block font-display text-3xl font-light uppercase leading-none">
                      {service.title}
                    </span>
                    <span className="mt-1 block text-xs text-white/52">
                      {service.priceNote}
                    </span>
                  </span>
                </button>
              )
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
            >
              <div className="relative min-h-[30rem] overflow-hidden bg-white/8">
                <Image
                  src={active.image}
                  alt={active.title}
                  fill
                  sizes="(min-width: 1024px) 34vw, 92vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div
                  className="absolute bottom-5 left-5 px-5 py-3 font-ui text-[12px] font-bold uppercase tracking-[0.16em]"
                  style={{
                    background: colors.paint,
                    color: colors.text,
                    clipPath: ROUGH_BTN,
                  }}
                >
                  {active.tag}
                </div>
              </div>

              <div className="flex flex-col justify-between bg-white/[0.055] p-6 md:p-8">
                <div>
                  <div
                    className="mb-5 grid h-14 w-14 place-items-center"
                    style={{ background: colors.paint, color: colors.text }}
                  >
                    <Icon size={26} />
                  </div>
                  <h3 className="font-display text-[clamp(3rem,5vw,5.6rem)] font-light uppercase leading-[0.86] text-white">
                    {active.title}
                  </h3>
                  <p className="mt-5 max-w-xl text-base leading-7 text-white/68">
                    {active.description}
                  </p>

                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    {active.includes.map((item, i) => (
                      <motion.div
                        key={item}
                        className="flex items-start gap-3 border border-white/8 bg-black/20 p-3"
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.04 }}
                      >
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#4CAF50]" />
                        <span className="text-sm leading-5 text-white/70">
                          {item}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <HomepageLink
                    href={active.href}
                    className="inline-flex items-center gap-2 px-7 py-3 font-ui text-[13px] font-bold uppercase tracking-[0.16em]"
                    style={{
                      background: colors.paint,
                      color: colors.text,
                      clipPath: ROUGH_BTN,
                    }}
                  >
                    {active.cta}
                    <ArrowRight size={16} />
                  </HomepageLink>
                  <span className="font-special text-[13px] uppercase tracking-[0.08em] text-[#F5C518]/82">
                    {active.priceNote}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section className="bg-warm-white px-6 py-20 text-black md:px-8 md:py-28 lg:px-14">
      <div className="mx-auto max-w-[90rem]">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="font-ui text-[12px] font-bold uppercase tracking-[0.24em] text-[#C41E3A]">
              Guest notes
            </span>
            <h2 className="mt-3 max-w-3xl font-display text-[clamp(3rem,6vw,6.3rem)] font-light uppercase leading-[0.88]">
              What our customers are saying
            </h2>
          </div>
          <div className="flex items-center gap-2 font-ui text-[12px] font-bold uppercase tracking-[0.16em] text-black/70">
            Excellent
            <span className="inline-flex gap-1 text-[#1E6B1E]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </span>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {testimonials.map((item, i) => (
            <motion.article
              key={item.name}
              className="flex min-h-[16rem] flex-col justify-between border border-black/8 bg-white p-5 shadow-[5px_7px_0_rgba(0,0,0,0.06)]"
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.52, delay: i * 0.08 }}
            >
              <div>
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-ui text-[15px] font-bold uppercase tracking-[0.08em]">
                      {item.name}
                    </h3>
                    <p className="mt-1 text-sm text-black/52">{item.type}</p>
                  </div>
                  <span className="inline-flex text-[#1E6B1E]">
                    {Array.from({ length: 5 }).map((_, star) => (
                      <Star key={star} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </span>
                </div>
                <p className="text-base leading-7 text-black/68">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>
              <span className="mt-6 w-fit rounded-full border border-black/10 px-3 py-1 text-xs text-black/56">
                {item.type}
              </span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceCTA() {
  return (
    <section className="feature-rugged-band relative overflow-hidden bg-[#050505] px-6 py-20 text-white md:px-8 md:py-28 lg:px-14">
      <motion.div
        className="feature-paint-edge feature-paint-edge-top"
        aria-hidden
        animate={{ x: ['-2%', '2%', '-2%'], opacity: [0.72, 0.96, 0.78] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="relative z-10 mx-auto grid max-w-[90rem] gap-10 lg:grid-cols-[1fr_0.74fr] lg:items-center">
        <div>
          <p className="font-special text-[1.25rem] uppercase tracking-[0.08em] text-[#4CAF50]">
            Ready when you are
          </p>
          <h2 className="mt-4 font-display text-[clamp(3.8rem,7vw,8rem)] font-light uppercase leading-[0.84]">
            Tell us the date.
            <br />
            We will bring the food.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/68 md:text-lg">
            Send the guest count, occasion, location, and service style. We will
            shape a menu and flow that fits the event.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <HomepageLink
              href="/booking"
              className="inline-flex items-center gap-2 bg-[#F5C518] px-8 py-3 font-ui text-[13px] font-bold uppercase tracking-[0.16em] text-black"
              style={{ clipPath: ROUGH_BTN }}
            >
              Book now
              <CalendarDays size={16} />
            </HomepageLink>
            <HomepageLink
              href="/menu"
              className="inline-flex items-center gap-2 bg-[#4CAF50] px-8 py-3 font-ui text-[13px] font-bold uppercase tracking-[0.16em] text-black"
              style={{ clipPath: ROUGH_BTN }}
            >
              View menu
              <ArrowRight size={16} />
            </HomepageLink>
          </div>
        </div>

        <motion.div
          className="relative overflow-hidden border border-[#F5C518]/36 bg-white/[0.06] p-6 shadow-[7px_9px_0_rgba(245,197,24,0.16)]"
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease }}
        >
          <div className="grid gap-4">
            {[
              ['Guest count', 'How many plates?'],
              ['Service style', 'Buffet, staffed, pickup, pop-up'],
              ['Menu direction', 'Jerk, curry, sides, drinks'],
              ['Event timing', 'Setup, serve, cleanup window'],
            ].map(([title, body], i) => (
              <motion.div
                key={title}
                className="flex gap-4 border-b border-white/10 pb-4 last:border-b-0 last:pb-0"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.42, delay: i * 0.06 }}
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#C41E3A] font-ui text-sm font-bold">
                  {i + 1}
                </span>
                <span>
                  <span className="block font-ui text-[13px] font-bold uppercase tracking-[0.14em] text-white">
                    {title}
                  </span>
                  <span className="mt-1 block text-sm text-white/56">
                    {body}
                  </span>
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default function ServicesPage() {
  const orderedServices = useMemo(() => services, [])

  return (
    <main className="overflow-x-hidden bg-[#050505] pb-16 md:pb-0">
      <AnnouncementBar messages={announcementMessages} />
      <Header leftLinks={navLinks.left} rightLinks={navLinks.right} />
      <ServiceHero />
      <TornEdge variant={1} fill={EDGE_COLORS[0]} />
      <StepGuide />
      <TornEdge variant={2} fill={EDGE_COLORS[1]} />
      <ServiceExplorer />
      <TornEdge variant={3} fill={EDGE_COLORS[2]} />
      <Testimonials />
      <TornEdge variant={1} fill={EDGE_COLORS[0]} />
      {orderedServices.map((service) => (
        <Fragment key={service.id}>
          <span className="sr-only">{service.title}</span>
        </Fragment>
      ))}
      <ServiceCTA />
      <Footer {...footer} />
      <MobileBottomBar />
    </main>
  )
}
