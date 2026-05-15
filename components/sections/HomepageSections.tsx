'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import {
  ArrowRight,
  CalendarDays,
  ChefHat,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Phone,
  Star,
} from 'lucide-react'

import Photo from '@/components/ui/Photo'
import {
  menuItems,
  services,
  instagramImages,
  restaurantHandle,
} from '@/lib/kindred-home-data'

gsap.registerPlugin(useGSAP)

const ROUGH_BTN =
  'polygon(0% 10%, 4% 2%, 10% 8%, 17% 0%, 24% 8%, 31% 2%, 38% 10%, 45% 2%, 52% 8%, 59% 2%, 66% 8%, 73% 0%, 80% 10%, 87% 2%, 94% 8%, 100% 5%, 99% 50%, 100% 95%, 96% 100%, 89% 90%, 82% 100%, 75% 92%, 68% 100%, 61% 90%, 54% 100%, 47% 92%, 40% 100%, 33% 90%, 26% 100%, 19% 92%, 12% 100%, 5% 90%, 0% 95%, 1% 50%)'

const ease = [0.33, 1, 0.68, 1] as const

function BrandStamp({
  dark = false,
  className,
}: {
  dark?: boolean
  className?: string
}) {
  return (
    <motion.div
      className={`inline-flex items-center gap-2 border px-2.5 py-2 ${
        dark
          ? 'border-white/14 bg-white/[0.06] text-white'
          : 'border-black/10 bg-black/[0.035] text-black'
      } ${className ?? ''}`}
      initial={{ opacity: 0, scale: 0.88, rotate: -3 }}
      whileInView={{ opacity: 1, scale: 1, rotate: -1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, ease }}
    >
      <Image
        src="/hero-chefs/cutouts/pot-rankinz-logo.png"
        alt="Pot Rankinz Kitchen"
        width={34}
        height={34}
        className="h-8 w-8 object-contain"
      />
      <span className="font-ui text-[10px] font-bold uppercase leading-none tracking-[0.16em]">
        Pot Rankinz
        <br />
        Kitchen
      </span>
    </motion.div>
  )
}

function SectionHeading({
  eyebrow,
  title,
  body,
  dark = false,
}: {
  eyebrow: string
  title: string
  body?: string
  dark?: boolean
}) {
  return (
    <motion.div
      className="mx-auto mb-10 max-w-3xl text-center md:mb-14"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.7, ease }}
    >
      <span
        className={`font-ui text-[11px] uppercase tracking-[0.24em] ${
          dark ? 'text-[#F5C518]' : 'text-[#C41E3A]'
        }`}
      >
        {eyebrow}
      </span>
      <h2
        className={`mt-3 font-display text-[clamp(2.55rem,5.8vw,5.9rem)] font-light uppercase leading-[0.9] ${
          dark ? 'text-white' : 'text-black'
        }`}
      >
        {title}
      </h2>
      {body && (
        <p
          className={`mx-auto mt-5 max-w-2xl text-base leading-7 md:text-lg ${
            dark ? 'text-white/72' : 'text-black/68'
          }`}
        >
          {body}
        </p>
      )}
    </motion.div>
  )
}

function RoughLink({
  href,
  children,
  tone = 'gold',
}: {
  href: string
  children: React.ReactNode
  tone?: 'gold' | 'green' | 'red'
}) {
  const tones = {
    gold: 'bg-[#F5C518] text-black hover:bg-[#FFE36B]',
    green: 'bg-[#4CAF50] text-black hover:bg-[#66D866]',
    red: 'bg-[#C41E3A] text-white hover:bg-[#E8314F]',
  }

  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 360, damping: 18 }}
    >
      <Link
        href={href}
        className={`inline-flex items-center gap-2 px-7 py-3 font-ui text-[13px] font-bold uppercase tracking-[0.16em] transition-colors ${tones[tone]}`}
        style={{ clipPath: ROUGH_BTN }}
      >
        {children}
        <ArrowRight size={16} />
      </Link>
    </motion.div>
  )
}

export function AboutPreview() {
  return (
    <section className="bg-warm-white px-6 py-20 text-black md:px-8 md:py-28 lg:px-14">
      <div className="mx-auto grid max-w-[86rem] items-center gap-12 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="grid grid-cols-[0.9fr_1fr] items-end gap-4 md:gap-6">
          <Photo
            src="/hero-chefs/source/plating-chef.jpeg"
            alt="Pot Rankinz chef plating food"
            label="Chef-led plates"
            tone="gold"
            tilt="left"
            aspect="aspect-[3/4]"
            imageClassName="object-cover object-center"
            sizes="(min-width: 1024px) 23vw, 45vw"
          />
          <Photo
            src="https://images.pexels.com/photos/29748355/pexels-photo-29748355.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Chef preparing food in a busy kitchen"
            label="Fresh fire"
            tone="green"
            tilt="right"
            aspect="aspect-[4/5]"
            sizes="(min-width: 1024px) 26vw, 48vw"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.72, ease }}
        >
          <BrandStamp className="mb-5" />
          <span className="font-ui text-[11px] uppercase tracking-[0.24em] text-[#C41E3A]">
            About the kitchen
          </span>
          <h2 className="mt-3 max-w-3xl font-display text-[clamp(2.7rem,6vw,6.4rem)] font-light uppercase leading-[0.9]">
            Big island flavor. Serious hospitality.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-black/70">
            Pot Rankinz Kitchen brings Jamaican soul, slow-cooked comfort, and
            celebration-ready catering together with the polish of a
            full-service restaurant team. The food is generous, colorful, and
            built to travel from weeknight dinners to weddings, private parties,
            and corporate spreads.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {['Scratch sauces', 'Event service', 'Florida + beyond'].map(
              (item, i) => (
                <motion.div
                  key={item}
                  className="border-l-4 border-[#F5C518] bg-black/[0.035] px-4 py-3"
                  initial={{ opacity: 0, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <span className="font-ui text-[12px] font-bold uppercase tracking-[0.14em] text-black/78">
                    {item}
                  </span>
                </motion.div>
              ),
            )}
          </div>
          <div className="mt-9 flex flex-wrap gap-4">
            <RoughLink href="/services">Plan catering</RoughLink>
            <RoughLink href="/contact" tone="green">
              Talk to us
            </RoughLink>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export function MenuPreview() {
  const featured = menuItems
    .filter((item) =>
      ['curry-goat', 'jerk-chicken', 'ackee-saltfish'].includes(item.id),
    )
    .slice(0, 3)

  return (
    <section className="relative overflow-hidden bg-[#0D0A06] px-6 py-20 md:px-8 md:py-28 lg:px-14">
      <BrandStamp
        dark
        className="absolute right-6 top-8 hidden md:inline-flex lg:right-14"
      />
      <SectionHeading
        dark
        eyebrow="A taste of the menu"
        title="House favorites"
        body="A short pour of the kitchen: bold mains, bright sides, sweet finishes, and prices guests can plan around."
      />
      <div className="mx-auto grid max-w-[86rem] gap-6 lg:grid-cols-3">
        {featured.map((item, i) => (
          <motion.article
            key={item.id}
            className="group"
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.64, delay: i * 0.08, ease }}
          >
            <Photo
              src={item.image}
              alt={item.title}
              label={item.tags[0] ?? 'House dish'}
              tone={i === 1 ? 'red' : i === 2 ? 'gold' : 'green'}
              aspect="aspect-[5/4]"
              framed
              sizes="(min-width: 1024px) 29vw, 92vw"
            />
            <div className="mt-5 flex items-start justify-between gap-4 border-t border-white/12 pt-5">
              <div>
                <h3 className="font-display text-3xl font-light uppercase leading-none text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/62">
                  {item.description}
                </p>
              </div>
              <span className="font-ui text-lg font-bold text-[#F5C518]">
                {item.price}
              </span>
            </div>
          </motion.article>
        ))}
      </div>
      <div className="mt-12 flex justify-center">
        <RoughLink href="/menu">View full menu</RoughLink>
      </div>
    </section>
  )
}

export function ServicesPreview() {
  const cards = services.filter((service) =>
    ['catering', 'private-dining', 'chefs-counter'].includes(service.id),
  )

  return (
    <section className="bg-warm-white px-6 py-20 text-black md:px-8 md:py-28 lg:px-14">
      <SectionHeading
        eyebrow="What we do"
        title="Dinner, catering, celebrations"
        body="From easy pickup to fully staffed private events, the team shapes every spread around the room, the crowd, and the occasion."
      />
      <div className="mx-auto grid max-w-[86rem] gap-5 lg:grid-cols-3">
        {cards.map((service, i) => (
          <motion.article
            key={service.id}
            className="relative overflow-hidden bg-[#0D0A06] p-5 text-white shadow-[5px_6px_0_rgba(0,0,0,0.10)]"
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.58, delay: i * 0.08 }}
          >
            <Photo
              src={service.image}
              alt={service.title}
              aspect="aspect-[4/3]"
              label={service.tag.replace('✦ ', '').replace('★ ', '')}
              framed={false}
              tone="warm"
              sizes="(min-width: 1024px) 27vw, 92vw"
            />
            <div className="mt-5">
              <div className="mb-3 inline-flex items-center gap-2 font-ui text-[11px] uppercase tracking-[0.2em] text-[#F5C518]">
                <ChefHat size={14} />
                {service.priceNote}
              </div>
              <h3 className="font-display text-4xl font-light uppercase leading-none">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-white/68">
                {service.description}
              </p>
              <Link
                href={service.href}
                className="mt-5 inline-flex items-center gap-2 font-ui text-[12px] font-bold uppercase tracking-[0.16em] text-[#4CAF50]"
              >
                {service.cta}
                <ArrowRight size={14} />
              </Link>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

export function PhotoCarousel() {
  const scopeRef = useRef<HTMLElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const tweenRef = useRef<gsap.core.Tween | null>(null)
  const reduced = useReducedMotion()
  const carouselImages = instagramImages.slice(0, 8)
  const loopImages = [...carouselImages, ...carouselImages]

  useGSAP(
    () => {
      if (reduced || !trackRef.current) return
      const track = trackRef.current
      const distance = track.scrollWidth / 2
      tweenRef.current = gsap.to(track, {
        x: -distance,
        duration: 34,
        ease: 'none',
        repeat: -1,
      })

      return () => {
        tweenRef.current?.kill()
        tweenRef.current = null
      }
    },
    { scope: scopeRef, dependencies: [reduced] },
  )

  const setDirection = (direction: 1 | -1) => {
    tweenRef.current?.timeScale(direction)
  }

  return (
    <section
      ref={scopeRef}
      className="overflow-hidden bg-[#050505] px-6 py-20 md:px-8 md:py-28 lg:px-14"
    >
      <div className="mx-auto max-w-[86rem]">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <BrandStamp dark className="mb-5" />
            <span className="font-ui text-[11px] uppercase tracking-[0.24em] text-[#F5C518]">
              From the kitchen
            </span>
            <h2 className="mt-3 font-display text-[clamp(2.55rem,5.8vw,5.8rem)] font-light uppercase leading-[0.9] text-white">
              Plates, prep, party energy
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/68">
              A rotating look at the sauces, smoke, prep, and celebration
              moments that make the kitchen feel alive.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              aria-label="Move gallery backward"
              onClick={() => setDirection(-1)}
              className="grid h-11 w-11 place-items-center border border-white/18 text-white transition-colors hover:border-[#F5C518] hover:text-[#F5C518]"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              aria-label="Move gallery forward"
              onClick={() => setDirection(1)}
              className="grid h-11 w-11 place-items-center border border-white/18 text-white transition-colors hover:border-[#F5C518] hover:text-[#F5C518]"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div
          className="-mx-6 overflow-hidden md:-mx-8 lg:-mx-14"
          onMouseEnter={() => tweenRef.current?.pause()}
          onMouseLeave={() => tweenRef.current?.resume()}
        >
          <div
            ref={trackRef}
            className="flex w-max gap-5 px-6 md:px-8 lg:px-14"
          >
            {loopImages.map((src, i) => (
              <div
                key={`${src}-${i}`}
                className="w-[230px] shrink-0 md:w-[310px]"
              >
                <Photo
                  src={src}
                  alt="Pot Rankinz food and kitchen photography"
                  aspect={i % 3 === 0 ? 'aspect-[3/4]' : 'aspect-[4/5]'}
                  label={i % 2 === 0 ? restaurantHandle : 'Kitchen roll'}
                  tone={i % 3 === 0 ? 'green' : i % 3 === 1 ? 'gold' : 'red'}
                  tilt={i % 2 === 0 ? 'left' : 'right'}
                  sizes="310px"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function VisitAndBooking() {
  const details = [
    {
      icon: Clock,
      title: 'Hours',
      lines: ['Tue-Thu 11am-8pm', 'Fri-Sat 11am-10pm', 'Sun 12pm-6pm'],
    },
    {
      icon: MapPin,
      title: 'Service Area',
      lines: ['Florida events', 'Private homes', 'Corporate venues'],
    },
    {
      icon: Phone,
      title: 'Contact',
      lines: [
        'Call for catering',
        'DM for quick questions',
        'Book online anytime',
      ],
    },
  ]

  return (
    <section className="relative overflow-hidden bg-warm-white px-6 py-20 text-black md:px-8 md:py-28 lg:px-14">
      <div className="mx-auto grid max-w-[86rem] gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-center">
        <motion.div
          className="relative overflow-hidden bg-[#0D0A06] px-6 py-10 text-white md:px-10 md:py-12"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.72, ease }}
        >
          <div className="absolute inset-0 opacity-20">
            <Photo
              src="https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt=""
              framed={false}
              aspect="h-full"
              className="h-full"
              imageClassName="opacity-60"
              sizes="50vw"
            />
          </div>
          <div className="relative z-10">
            <BrandStamp dark className="mb-5" />
            <div className="mb-4 inline-flex items-center gap-2 font-ui text-[11px] uppercase tracking-[0.22em] text-[#F5C518]">
              <CalendarDays size={15} />
              Ready when you are
            </div>
            <h2 className="font-display text-[clamp(2.7rem,5.4vw,5.6rem)] font-light uppercase leading-[0.9]">
              Reserve the date. We will bring the food.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/72">
              Send the guest count, occasion, date, and service style. The team
              can shape a menu for pickup, drop-off catering, private dining, or
              a fully staffed event.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <RoughLink href="/booking">Book now</RoughLink>
              <RoughLink href="/contact" tone="red">
                Ask a question
              </RoughLink>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-4">
          {details.map(({ icon: Icon, title, lines }, i) => (
            <motion.div
              key={title}
              className="flex gap-5 border-b border-black/12 pb-6"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.58, delay: i * 0.08 }}
            >
              <div className="grid h-12 w-12 shrink-0 place-items-center bg-[#F5C518] text-black">
                <Icon size={22} />
              </div>
              <div>
                <h3 className="font-display text-3xl font-light uppercase leading-none">
                  {title}
                </h3>
                <ul className="mt-3 space-y-1">
                  {lines.map((line) => (
                    <li key={line} className="text-sm leading-6 text-black/64">
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
          <motion.div
            className="mt-4 flex flex-wrap gap-3 font-ui text-[11px] uppercase tracking-[0.18em] text-black/58"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
          >
            <span className="inline-flex items-center gap-1 text-[#C41E3A]">
              <Star size={13} fill="currentColor" />
              4.9 guest rating
            </span>
            <span>Online menu</span>
            <span>Fast catering inquiry</span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export function HomepageCompletionSections() {
  return (
    <>
      <AboutPreview />
      <MenuPreview />
      <ServicesPreview />
      <PhotoCarousel />
      <VisitAndBooking />
    </>
  )
}
