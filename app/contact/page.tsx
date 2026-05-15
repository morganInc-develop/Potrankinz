'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  CalendarDays,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Star,
} from 'lucide-react'

import AnnouncementBar from '@/components/layout/AnnouncementBar'
import Header from '@/components/layout/Header'
import MobileBottomBar from '@/components/layout/MobileBottomBar'
import Footer from '@/components/sections/Footer'
import TornEdge from '@/components/ui/TornEdge'
import HomepageLink from '@/components/ui/homepage-link'
import { announcementMessages, footer, navLinks } from '@/lib/kindred-home-data'

const ROUGH_BTN =
  'polygon(0% 10%, 4% 2%, 10% 8%, 17% 0%, 24% 8%, 31% 2%, 38% 10%, 45% 2%, 52% 8%, 59% 2%, 66% 8%, 73% 0%, 80% 10%, 87% 2%, 94% 8%, 100% 5%, 99% 50%, 100% 95%, 96% 100%, 89% 90%, 82% 100%, 75% 92%, 68% 100%, 61% 90%, 54% 100%, 47% 92%, 40% 100%, 33% 90%, 26% 100%, 19% 92%, 12% 100%, 5% 90%, 0% 95%, 1% 50%)'

const EDGE_COLORS = ['#C41E3A', '#F5C518', '#4CAF50'] as const

const contactImages = [
  {
    src: '/hero-chefs/source/plating-chef.jpeg',
    label: '01',
    className: 'md:translate-y-32',
  },
  {
    src: '/hero-chefs/source/evette-quoibia.jpg',
    label: '02',
    className: 'md:translate-y-12',
  },
  {
    src: 'https://images.pexels.com/photos/6210921/pexels-photo-6210921.jpeg?auto=compress&cs=tinysrgb&w=1600',
    label: '03',
    className: 'md:translate-y-0',
  },
  {
    src: '/hero-chefs/source/nick-wallace.jpg',
    label: '04',
    className: 'md:translate-y-12',
  },
  {
    src: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=1600',
    label: '05',
    className: 'md:translate-y-32',
  },
]

const contactMethods = [
  {
    Icon: Phone,
    label: 'Call',
    value: '(555) 000-0192',
    note: 'Best for urgent catering dates',
  },
  {
    Icon: Mail,
    label: 'Email',
    value: 'hello@potrankinz.com',
    note: 'Menus, quotes, private events',
  },
  {
    Icon: MapPin,
    label: 'Service area',
    value: 'Florida & beyond',
    note: 'Travel available by request',
  },
  {
    Icon: Instagram,
    label: 'Social',
    value: '@POTRANKINZKITCHEN',
    note: 'Photos, pop-ups, quick updates',
  },
]

function ContactHero() {
  return (
    <section className="relative overflow-hidden bg-[#050505] px-5 pb-14 pt-36 md:px-8 md:pb-20 md:pt-40 lg:px-14">
      <div className="absolute inset-0 opacity-35">
        <Image
          src="https://images.pexels.com/photos/29748355/pexels-photo-29748355.jpeg?auto=compress&cs=tinysrgb&w=1800"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover grayscale"
        />
      </div>
      <div className="absolute inset-0 bg-black/72" />

      <motion.div
        className="relative z-10 mx-auto min-h-[78svh] max-w-[92rem] overflow-hidden bg-warm-white px-6 py-10 text-black shadow-[0_30px_80px_rgba(0,0,0,0.35)] md:px-10 md:py-12 lg:px-14"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75 }}
      >
        <div className="flex items-center justify-between gap-6">
          <HomepageLink
            href="/"
            className="font-ui text-[12px] font-bold uppercase tracking-[0.18em]"
          >
            Home
          </HomepageLink>
          <Image
            src="/hero-chefs/cutouts/pot-rankinz-logo.png"
            alt="Pot Rankinz Kitchen"
            width={70}
            height={70}
            className="h-16 w-16 object-contain"
          />
          <HomepageLink
            href="/booking"
            className="font-ui text-[12px] font-bold uppercase tracking-[0.18em]"
          >
            Book
          </HomepageLink>
        </div>

        <div className="relative mt-16 text-center md:mt-20">
          <div className="pointer-events-none absolute inset-x-[-3rem] top-[35%] hidden select-none font-display text-[clamp(8rem,18vw,18rem)] font-light uppercase leading-none text-black/[0.035] md:block">
            Pot Rankinz
          </div>
          <motion.p
            className="relative z-10 mx-auto mb-5 inline-flex items-center gap-2 font-ui text-[12px] font-bold uppercase tracking-[0.24em] text-[#C41E3A]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Star size={15} fill="currentColor" />
            Contact the kitchen
          </motion.p>
          <motion.h1
            className="relative z-10 mx-auto max-w-5xl font-display text-[clamp(4rem,9vw,9.5rem)] font-light uppercase leading-[0.86]"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28 }}
          >
            Connect with Pot Rankinz
          </motion.h1>
          <motion.p
            className="relative z-10 mx-auto mt-5 max-w-2xl text-base leading-7 text-black/62 md:text-lg"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Questions, catering quotes, pop-up ideas, pickup orders, and private
            events all start here.
          </motion.p>
        </div>

        <div className="relative z-10 mt-12 grid grid-cols-2 items-end gap-3 md:mt-16 md:grid-cols-5 md:gap-5">
          {contactImages.map((image, i) => (
            <motion.div
              key={image.label}
              className={`relative overflow-hidden bg-black ${image.className}`}
              style={{ aspectRatio: i === 2 ? '4/5.1' : '4/5.8' }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.48 + i * 0.08 }}
            >
              <Image
                src={image.src}
                alt="Pot Rankinz kitchen and food"
                fill
                sizes="(min-width: 768px) 18vw, 45vw"
                className="object-cover grayscale"
              />
              <span className="absolute left-3 top-3 bg-warm-white px-2 py-1 font-ui text-[11px] font-bold text-black">
                {image.label}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

function ContactMethods() {
  return (
    <section className="bg-[#050505] px-6 py-20 text-white md:px-8 md:py-28 lg:px-14">
      <div className="mx-auto max-w-[90rem]">
        <div className="mb-10 max-w-4xl">
          <span className="font-ui text-[12px] font-bold uppercase tracking-[0.24em] text-[#F5C518]">
            Reach us
          </span>
          <h2 className="mt-3 font-display text-[clamp(3.2rem,6vw,6.7rem)] font-light uppercase leading-[0.88]">
            The fastest route to the right person
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {contactMethods.map(({ Icon, label, value, note }, i) => (
            <motion.article
              key={label}
              className="border border-white/10 bg-white/[0.055] p-5"
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <div className="mb-5 grid h-12 w-12 place-items-center bg-[#F5C518] text-black">
                <Icon size={22} />
              </div>
              <p className="font-ui text-[11px] font-bold uppercase tracking-[0.18em] text-white/48">
                {label}
              </p>
              <h3 className="mt-2 break-words font-display text-3xl font-light uppercase leading-none">
                {value}
              </h3>
              <p className="mt-4 text-sm leading-6 text-white/58">{note}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

function ContactForm() {
  return (
    <section className="bg-warm-white px-6 py-20 text-black md:px-8 md:py-28 lg:px-14">
      <div className="mx-auto grid max-w-[90rem] gap-10 lg:grid-cols-[0.8fr_1fr]">
        <div>
          <span className="font-ui text-[12px] font-bold uppercase tracking-[0.24em] text-[#C41E3A]">
            Send a note
          </span>
          <h2 className="mt-3 font-display text-[clamp(3.2rem,6vw,6.6rem)] font-light uppercase leading-[0.88]">
            Tell us what you need
          </h2>
          <p className="mt-6 max-w-xl text-base leading-7 text-black/64">
            For catering, include the date, city, guest count, service style,
            and any menu favorites. For general questions, keep it simple.
          </p>
          <div className="mt-8 grid gap-4">
            {[
              ['Catering quote', 'Event date, guest count, location'],
              ['Pickup order', 'Menu items, time, contact info'],
              ['Pop-up request', 'Venue, expected crowd, service window'],
            ].map(([title, body], i) => (
              <motion.div
                key={title}
                className="flex gap-4 border-b border-black/10 pb-4"
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#1E6B1E] font-ui text-sm font-bold text-white">
                  {i + 1}
                </span>
                <span>
                  <span className="block font-ui text-[13px] font-bold uppercase tracking-[0.14em]">
                    {title}
                  </span>
                  <span className="mt-1 block text-sm text-black/56">
                    {body}
                  </span>
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.form
          className="grid gap-5 border border-black/8 bg-white p-5 shadow-[8px_10px_0_rgba(0,0,0,0.08)] md:p-8"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65 }}
        >
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Your name" placeholder="Full name" />
            <Field label="Email" placeholder="you@example.com" type="email" />
            <Field label="Phone" placeholder="(555) 000-0000" />
            <Field
              label="Inquiry type"
              placeholder="Catering, pickup, pop-up"
            />
          </div>
          <label className="grid gap-2">
            <span className="font-ui text-[11px] font-bold uppercase tracking-[0.18em] text-black/46">
              Message
            </span>
            <textarea
              rows={6}
              placeholder="Tell us the date, guest count, location, service style, or question."
              className="resize-none border border-black/10 bg-black/[0.025] px-4 py-3 text-sm leading-6 text-black outline-none placeholder:text-black/30 focus:border-[#C41E3A]/70"
            />
          </label>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="inline-flex items-center gap-2 font-special text-[13px] uppercase tracking-[0.08em] text-[#1E6B1E]">
              <MessageCircle size={15} />
              We reply within 24 hours.
            </span>
            <button
              type="button"
              className="inline-flex items-center gap-2 bg-[#C41E3A] px-8 py-3 font-ui text-[13px] font-bold uppercase tracking-[0.16em] text-white"
              style={{ clipPath: ROUGH_BTN }}
            >
              Send message
              <Send size={16} />
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  )
}

function Field({
  label,
  placeholder,
  type = 'text',
}: {
  label: string
  placeholder: string
  type?: string
}) {
  return (
    <label className="grid gap-2">
      <span className="font-ui text-[11px] font-bold uppercase tracking-[0.18em] text-black/46">
        {label}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        className="h-12 border border-black/10 bg-black/[0.025] px-4 text-sm text-black outline-none placeholder:text-black/30 focus:border-[#C41E3A]/70"
      />
    </label>
  )
}

function ContactCTA() {
  return (
    <section className="feature-rugged-band relative overflow-hidden bg-[#050505] px-6 py-20 text-center text-white md:px-8 md:py-24 lg:px-14">
      <motion.div
        className="feature-paint-edge feature-paint-edge-bottom"
        aria-hidden
        animate={{ x: ['2%', '-2%', '2%'], opacity: [0.78, 0.95, 0.78] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="relative z-10 mx-auto max-w-5xl">
        <p className="font-special text-[1.25rem] uppercase tracking-[0.08em] text-[#F5C518]">
          Need the date held?
        </p>
        <h2 className="mt-4 font-display text-[clamp(3.4rem,6.5vw,7.2rem)] font-light uppercase leading-[0.86]">
          Send the details.
          <br />
          We will take it from there.
        </h2>
        <HomepageLink
          href="/booking"
          className="mt-8 inline-flex items-center gap-2 bg-[#4CAF50] px-8 py-3 font-ui text-[13px] font-bold uppercase tracking-[0.16em] text-black"
          style={{ clipPath: ROUGH_BTN }}
        >
          Book now
          <CalendarDays size={16} />
        </HomepageLink>
      </div>
    </section>
  )
}

export default function ContactPage() {
  return (
    <main className="overflow-x-hidden bg-[#050505] pb-16 md:pb-0">
      <AnnouncementBar messages={announcementMessages} />
      <Header leftLinks={navLinks.left} rightLinks={navLinks.right} />
      <ContactHero />
      <TornEdge variant={1} fill={EDGE_COLORS[0]} />
      <ContactMethods />
      <TornEdge variant={2} fill={EDGE_COLORS[1]} />
      <ContactForm />
      <TornEdge variant={3} fill={EDGE_COLORS[2]} />
      <ContactCTA />
      <Footer {...footer} />
      <MobileBottomBar />
    </main>
  )
}
