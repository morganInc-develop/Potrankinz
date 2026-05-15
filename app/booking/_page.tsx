'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  ChefHat,
  Clock,
  Heart,
  ImageIcon,
  Mail,
  MapPin,
  Share2,
  Sparkles,
  Users,
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

const EDGE_COLORS = ['#C41E3A', '#F5C518', '#4CAF50'] as const

const featureRows: { Icon: LucideIcon; label: string; value: string }[] = [
  { Icon: MapPin, label: 'Service area', value: 'Florida & beyond' },
  { Icon: Users, label: 'Best for', value: '12 to 300 guests' },
  { Icon: ChefHat, label: 'Menu style', value: 'Jamaican catering' },
  { Icon: Clock, label: 'Timing', value: 'Pickup to staffed events' },
]

const quickDetails = [
  ['Starting point', 'Tell us the date'],
  ['Service', 'Catering / private event'],
  ['Response', 'Within 24 hours'],
]

const foodGallery = [
  'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/17500735/pexels-photo-17500735.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/6210921/pexels-photo-6210921.jpeg?auto=compress&cs=tinysrgb&w=1600',
]

function BookingHero() {
  return (
    <section className="relative overflow-hidden bg-[#454932] px-5 pb-16 pt-36 text-[#F8DCA7] md:px-8 md:pb-24 md:pt-40 lg:px-14">
      <div className="mx-auto grid max-w-[92rem] overflow-hidden bg-[#222515] shadow-[0_30px_80px_rgba(0,0,0,0.28)] lg:grid-cols-[0.95fr_1fr]">
        <motion.div
          className="flex min-h-[44rem] flex-col justify-between p-6 md:p-9 lg:p-12"
          initial={{ opacity: 0, x: -32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.72, ease }}
        >
          <div>
            <HomepageLink
              href="/services"
              className="mb-8 inline-grid h-12 w-12 place-items-center rounded-full bg-[#F8DCA7] text-[#222515]"
            >
              <ArrowLeft size={22} />
            </HomepageLink>
            <div className="h-px w-full bg-[#F8DCA7]/70" />

            <motion.p
              className="mt-8 font-ui text-[12px] font-bold uppercase tracking-[0.24em] text-[#4CAF50]"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.14 }}
            >
              Book Pot Rankinz
            </motion.p>
            <motion.h1
              className="mt-4 font-display text-[clamp(4.5rem,8vw,9rem)] font-light uppercase leading-[0.82]"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.22, ease }}
            >
              Bring the food to your event
            </motion.h1>
          </div>

          <div>
            <div className="mb-6 h-px w-full bg-[#F8DCA7]/70" />
            <div className="grid gap-5 md:grid-cols-[0.8fr_1fr_1fr] md:items-center">
              <HomepageLink
                href="#request"
                className="inline-flex items-center justify-center gap-2 bg-[#F8DCA7] px-8 py-4 font-ui text-[14px] font-bold uppercase tracking-[0.14em] text-[#222515]"
                style={{ clipPath: ROUGH_BTN }}
              >
                Book now
                <ArrowRight size={16} />
              </HomepageLink>
              {quickDetails.slice(1).map(([label, value]) => (
                <div key={label}>
                  <p className="font-ui text-[12px] uppercase tracking-[0.16em] text-[#F8DCA7]/56">
                    {label}
                  </p>
                  <p className="mt-1 text-xl leading-tight text-[#F8DCA7]">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-7 grid gap-7 border-t border-[#F8DCA7]/60 pt-6 md:grid-cols-2">
              <p className="text-sm leading-6 text-[#F8DCA7]/78">
                Whether it is a birthday, wedding, office lunch, church event,
                or backyard party, we shape the menu, portions, setup, and
                service around the crowd.
              </p>
              <p className="text-sm leading-6 text-[#F8DCA7]/78">
                Send the basics and we will follow up with a clear plan: guest
                count, food style, timing, equipment, staffing, and next steps.
              </p>
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {featureRows.map(({ Icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 border-t border-[#F8DCA7]/36 py-4"
                >
                  <Icon className="h-5 w-5 text-[#F8DCA7]" />
                  <div>
                    <p className="font-ui text-[11px] uppercase tracking-[0.16em] text-[#F8DCA7]/48">
                      {label}
                    </p>
                    <p className="mt-1 text-base text-[#F8DCA7]">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="relative min-h-[36rem] overflow-hidden lg:min-h-[58rem]"
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.72, delay: 0.1, ease }}
        >
          <Image
            src="https://images.pexels.com/photos/6210921/pexels-photo-6210921.jpeg?auto=compress&cs=tinysrgb&w=1800"
            alt="Pot Rankinz catering food"
            fill
            priority
            sizes="(min-width: 1024px) 48vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-white/10" />
          <div className="absolute right-5 top-5 flex gap-3">
            {[Heart, Share2].map((Icon, i) => (
              <button
                key={i}
                className="grid h-12 w-12 place-items-center rounded-full bg-[#F8DCA7] text-[#222515]"
                type="button"
                aria-label={
                  i === 0 ? 'Save booking idea' : 'Share booking idea'
                }
              >
                <Icon size={20} />
              </button>
            ))}
          </div>
          <div
            className="absolute bottom-8 right-7 flex items-center gap-2 bg-[#F8DCA7] px-5 py-3 font-ui text-[12px] font-bold uppercase tracking-[0.12em] text-[#222515]"
            style={{ clipPath: ROUGH_BTN }}
          >
            <ImageIcon size={16} />
            12 event looks
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function RequestForm() {
  const [service, setService] = useState(services[1]?.id ?? services[0]?.id)

  return (
    <section
      id="request"
      className="relative overflow-hidden bg-[#050505] px-6 py-20 text-white md:px-8 md:py-28 lg:px-14"
    >
      <div className="mx-auto grid max-w-[90rem] gap-10 lg:grid-cols-[0.78fr_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65, ease }}
        >
          <span className="font-ui text-[12px] font-bold uppercase tracking-[0.24em] text-[#F5C518]">
            Request details
          </span>
          <h2 className="mt-3 font-display text-[clamp(3.4rem,6.4vw,7rem)] font-light uppercase leading-[0.86]">
            Tell us what you are planning
          </h2>
          <p className="mt-6 max-w-xl text-base leading-7 text-white/66">
            This is not a payment form. It gives the team enough context to
            price, plan, and confirm what is possible for your date.
          </p>

          <div className="mt-8 grid gap-3">
            {services.map((item) => {
              const active = service === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setService(item.id)}
                  className={`flex items-center justify-between border p-4 text-left transition-colors ${
                    active
                      ? 'border-[#F5C518]/70 bg-[#F5C518]/12'
                      : 'border-white/10 bg-white/[0.04] hover:border-white/20'
                  }`}
                >
                  <span>
                    <span className="block font-display text-3xl font-light uppercase leading-none">
                      {item.title}
                    </span>
                    <span className="mt-1 block text-sm text-white/54">
                      {item.priceNote}
                    </span>
                  </span>
                  {active && <Sparkles className="h-5 w-5 text-[#F5C518]" />}
                </button>
              )
            })}
          </div>
        </motion.div>

        <motion.form
          className="grid gap-5 border border-white/10 bg-white/[0.055] p-5 shadow-[8px_10px_0_rgba(245,197,24,0.14)] md:p-8"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, delay: 0.08, ease }}
        >
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Your name" placeholder="Full name" />
            <Field label="Email" placeholder="you@example.com" type="email" />
            <Field label="Phone" placeholder="(555) 000-0000" />
            <Field label="Event date" placeholder="MM/DD/YYYY" />
            <Field label="Guest count" placeholder="Approx. guests" />
            <Field label="Location" placeholder="City / venue" />
          </div>
          <label className="grid gap-2">
            <span className="font-ui text-[11px] font-bold uppercase tracking-[0.18em] text-white/54">
              Notes
            </span>
            <textarea
              rows={5}
              placeholder="Tell us about the occasion, service style, favorite menu items, timing, and dietary needs."
              className="resize-none border border-white/12 bg-black/24 px-4 py-3 text-sm leading-6 text-white outline-none placeholder:text-white/28 focus:border-[#F5C518]/70"
            />
          </label>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="font-special text-[13px] uppercase tracking-[0.08em] text-[#4CAF50]">
              We reply within 24 hours.
            </span>
            <button
              type="button"
              className="inline-flex items-center gap-2 bg-[#F5C518] px-8 py-3 font-ui text-[13px] font-bold uppercase tracking-[0.16em] text-black"
              style={{ clipPath: ROUGH_BTN }}
            >
              Send request
              <Mail size={16} />
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
      <span className="font-ui text-[11px] font-bold uppercase tracking-[0.18em] text-white/54">
        {label}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        className="h-12 border border-white/12 bg-black/24 px-4 text-sm text-white outline-none placeholder:text-white/28 focus:border-[#F5C518]/70"
      />
    </label>
  )
}

function BookingGallery() {
  return (
    <section className="bg-warm-white px-6 py-20 text-black md:px-8 md:py-28 lg:px-14">
      <div className="mx-auto max-w-[90rem]">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="font-ui text-[12px] font-bold uppercase tracking-[0.24em] text-[#C41E3A]">
              Event energy
            </span>
            <h2 className="mt-3 font-display text-[clamp(3rem,6vw,6.5rem)] font-light uppercase leading-[0.88]">
              Plates built for gathering
            </h2>
          </div>
          <HomepageLink
            href="/menu"
            className="inline-flex w-fit items-center gap-2 border-b border-black/30 pb-2 font-ui text-[12px] font-bold uppercase tracking-[0.16em] text-black/70"
          >
            View menu
            <ArrowRight size={15} />
          </HomepageLink>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {foodGallery.map((src, i) => (
            <motion.div
              key={src}
              className="relative overflow-hidden bg-black shadow-[5px_7px_0_rgba(0,0,0,0.08)]"
              style={{ aspectRatio: i === 1 ? '4/5' : '4/4.4' }}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
            >
              <Image
                src={src}
                alt="Pot Rankinz event food"
                fill
                sizes="(min-width: 1024px) 29vw, 92vw"
                className="object-cover"
              />
              <div className="absolute left-4 top-4 bg-[#F5C518] px-3 py-2 font-ui text-[11px] font-bold uppercase tracking-[0.14em] text-black">
                0{i + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function BookingPage() {
  return (
    <main className="overflow-x-hidden bg-[#454932] pb-16 md:pb-0">
      <AnnouncementBar messages={announcementMessages} />
      <Header leftLinks={navLinks.left} rightLinks={navLinks.right} />
      <BookingHero />
      <TornEdge variant={1} fill={EDGE_COLORS[0]} />
      <RequestForm />
      <TornEdge variant={2} fill={EDGE_COLORS[1]} />
      <BookingGallery />
      <Footer {...footer} />
      <MobileBottomBar />
    </main>
  )
}
