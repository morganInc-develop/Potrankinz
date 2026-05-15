'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import {
  Bean,
  Coffee,
  CupSoda,
  Flame,
  Leaf,
  Sandwich,
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
  menuCategories,
  menuItems,
  navLinks,
  type MenuCategory,
  type MenuItem,
} from '@/lib/kindred-home-data'

const ease = [0.33, 1, 0.68, 1] as const

const ROUGH_BTN =
  'polygon(0% 10%, 4% 2%, 10% 8%, 17% 0%, 24% 8%, 31% 2%, 38% 10%, 45% 2%, 52% 8%, 59% 2%, 66% 8%, 73% 0%, 80% 10%, 87% 2%, 94% 8%, 100% 5%, 99% 50%, 100% 95%, 96% 100%, 89% 90%, 82% 100%, 75% 92%, 68% 100%, 61% 90%, 54% 100%, 47% 92%, 40% 100%, 33% 90%, 26% 100%, 19% 92%, 12% 100%, 5% 90%, 0% 95%, 1% 50%)'

const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`

const EDGE_COLORS = ['#C41E3A', '#F5C518', '#4CAF50'] as const

const CATEGORY_META: Record<
  MenuCategory,
  {
    Icon: LucideIcon
    shortLabel: string
    paint: string
    text: string
    glow: string
  }
> = {
  breakfast: {
    Icon: Coffee,
    shortLabel: 'Breakfast',
    paint: '#F5C518',
    text: '#0D0A06',
    glow: 'rgba(245,197,24,0.24)',
  },
  mains: {
    Icon: Flame,
    shortLabel: 'Main Plates',
    paint: '#4CAF50',
    text: '#0D0A06',
    glow: 'rgba(76,175,80,0.22)',
  },
  snacks: {
    Icon: Sandwich,
    shortLabel: 'Snacks',
    paint: '#C41E3A',
    text: '#fff7e5',
    glow: 'rgba(196,30,58,0.22)',
  },
  sides: {
    Icon: Bean,
    shortLabel: 'Sides',
    paint: '#F5C518',
    text: '#0D0A06',
    glow: 'rgba(245,197,24,0.22)',
  },
  drinks: {
    Icon: CupSoda,
    shortLabel: 'Drinks',
    paint: '#C41E3A',
    text: '#fff7e5',
    glow: 'rgba(196,30,58,0.22)',
  },
}

function PotWall() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.14]">
      {Array.from({ length: 28 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${(i * 19) % 102}%`,
            top: `${(i * 13) % 96}%`,
          }}
          animate={{
            y: [0, i % 2 === 0 ? -10 : 10, 0],
            rotate: [i % 2 === 0 ? -5 : 5, 0, i % 2 === 0 ? -5 : 5],
          }}
          transition={{
            duration: 7 + (i % 5),
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div
            className="relative h-12 w-16 rounded-b-[22px] rounded-t-[10px] border-2 border-white/35"
            style={{ transform: `rotate(${(i % 7) - 3}deg)` }}
          >
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
      initial={{ opacity: 0, x: reverse ? 50 : -50, rotate: reverse ? 3 : -3 }}
      animate={{ opacity: 1, x: 0, rotate: reverse ? -2 : 2 }}
      transition={{ duration: 0.9, delay: 0.28, ease }}
    >
      <div
        className="relative h-[140px] w-[270px] overflow-hidden opacity-95 md:h-[190px] md:w-[380px]"
        style={{
          clipPath:
            'polygon(0 18%, 12% 8%, 28% 16%, 44% 4%, 58% 13%, 75% 6%, 100% 18%, 94% 84%, 78% 74%, 62% 90%, 44% 78%, 27% 94%, 12% 80%, 0 88%)',
          transform: reverse ? 'scaleX(-1)' : undefined,
        }}
      >
        <div className="absolute inset-0 bg-[#0D0A06]" />
        <div className="absolute inset-x-[-16%] top-1/2 h-9 -translate-y-1/2 rotate-[24deg] bg-[#F5C518]" />
        <div className="absolute inset-x-[-16%] top-1/2 h-9 -translate-y-1/2 rotate-[-24deg] bg-[#F5C518]" />
        <div className="absolute bottom-0 left-0 h-1/2 w-full bg-[#1E6B1E] [clip-path:polygon(0_0,50%_54%,100%_0,100%_100%,0_100%)]" />
        <div
          className="absolute inset-0"
          style={{ backgroundImage: GRAIN, opacity: 0.3 }}
        />
      </div>
    </motion.div>
  )
}

function PaintHeading({
  category,
  align = 'left',
}: {
  category: MenuCategory
  align?: 'left' | 'center'
}) {
  const meta = CATEGORY_META[category]
  const label = menuCategories.find((cat) => cat.id === category)?.label

  return (
    <motion.div
      className={`mb-7 flex ${align === 'center' ? 'justify-center' : 'justify-start'}`}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.45 }}
      transition={{ duration: 0.55, ease }}
    >
      <div className="relative inline-flex items-center gap-3 px-6 py-3">
        <motion.span
          aria-hidden
          className="absolute inset-0"
          style={{
            background: meta.paint,
            clipPath: ROUGH_BTN,
            boxShadow: `0 0 42px ${meta.glow}`,
            transformOrigin: 'left center',
          }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.62, ease }}
        />
        <meta.Icon
          className="relative z-10 h-5 w-5"
          style={{ color: meta.text }}
        />
        <h2
          className="relative z-10 font-display text-[clamp(2.2rem,4.6vw,4.9rem)] font-light uppercase leading-none"
          style={{ color: meta.text }}
        >
          {label}
        </h2>
      </div>
    </motion.div>
  )
}

function FeaturedPlate({ item, index }: { item: MenuItem; index: number }) {
  return (
    <motion.div
      className="group relative flex items-center gap-4 bg-white/[0.08] p-3 shadow-[8px_10px_30px_rgba(0,0,0,0.26)] backdrop-blur-md"
      style={{ clipPath: ROUGH_BTN }}
      initial={{ opacity: 0, x: 34 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.58, delay: 0.65 + index * 0.12, ease }}
      whileHover={{ x: -6, scale: 1.02 }}
    >
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 border-[#F5C518] bg-black">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="80px"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      <div className="min-w-0 pr-2">
        <h3 className="font-display text-2xl font-light uppercase leading-none text-white">
          {item.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-xs leading-5 text-white/62">
          {item.description}
        </p>
      </div>
      <span className="ml-auto shrink-0 font-ui text-lg font-bold text-[#F5C518]">
        {item.price}
      </span>
    </motion.div>
  )
}

function MenuHero() {
  const heroRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const dishY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, prefersReducedMotion ? 0 : 90],
  )
  const dishScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, prefersReducedMotion ? 1 : 0.92],
  )
  const textY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, prefersReducedMotion ? 0 : -36],
  )
  const heroDish =
    menuItems.find((item) => item.id === 'jerk-chicken') ?? menuItems[0]
  const featured = menuItems.filter((item) => item.featured).slice(0, 3)

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100svh] overflow-hidden bg-[#050505] px-6 pb-16 pt-32 text-white md:px-8 lg:px-14"
    >
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            'radial-gradient(circle at 25% 18%, rgba(76,175,80,0.18), transparent 26%), radial-gradient(circle at 84% 34%, rgba(245,197,24,0.16), transparent 28%), linear-gradient(115deg, rgba(196,30,58,0.20), transparent 38%, rgba(30,107,30,0.18))',
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '42px 42px',
        }}
      />
      <PotWall />
      <FlagBrush className="left-[-8rem] top-[13rem] opacity-65 md:left-[-4rem] md:top-[9rem] md:opacity-100" />
      <FlagBrush
        className="bottom-[7rem] right-[-5rem] hidden md:block"
        reverse
      />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: GRAIN,
          opacity: 0.12,
          mixBlendMode: 'overlay',
        }}
      />

      <div className="relative z-10 mx-auto grid min-h-[calc(100svh-8rem)] max-w-[90rem] items-center gap-10 lg:grid-cols-[0.9fr_1.15fr_0.85fr]">
        <motion.div
          style={{ y: textY }}
          className="relative max-w-xl rounded-[2px] bg-black/28 p-4 backdrop-blur-[1px] md:bg-transparent md:p-0 md:backdrop-blur-0"
        >
          <motion.div
            className="mb-6 inline-flex items-center gap-3 border border-white/15 bg-black/40 px-3 py-2 md:bg-white/[0.06]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease }}
          >
            <Image
              src="/hero-chefs/cutouts/pot-rankinz-logo.png"
              alt="Pot Rankinz Kitchen"
              width={42}
              height={42}
              className="h-10 w-10 object-contain"
            />
            <span className="font-ui text-[11px] font-bold uppercase tracking-[0.18em] text-[#F5C518]">
              Pot Rankinz Menu
            </span>
          </motion.div>

          <motion.p
            className="relative z-10 font-special text-[clamp(1.25rem,2vw,1.85rem)] uppercase leading-tight tracking-[0.04em] text-[#F5C518] [text-shadow:0_2px_8px_rgba(0,0,0,0.85)]"
            initial={{ opacity: 0, x: -22 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.62, delay: 0.18, ease }}
          >
            Real food. Real flavor.
          </motion.p>
          <motion.h1
            className="relative z-10 mt-3 font-display text-[clamp(4rem,9vw,9.7rem)] font-light uppercase leading-[0.82] [text-shadow:0_3px_14px_rgba(0,0,0,0.72)]"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.28, ease }}
          >
            Real
            <br />
            Jamaica.
          </motion.h1>
          <motion.p
            className="relative z-10 mt-6 max-w-md text-base leading-7 text-white/82 md:text-lg md:text-white/72"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.62, delay: 0.45, ease }}
          >
            Big flavor, small price, yaad style. Breakfast classics, main
            plates, sides, drinks, and a Yard Box combo built for the full
            plate.
          </motion.p>
          <motion.div
            className="mt-8 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.6, ease }}
          >
            <HomepageLink
              href="#mains"
              className="inline-flex items-center gap-2 bg-[#F5C518] px-7 py-3 font-ui text-[13px] font-bold uppercase tracking-[0.16em] text-black"
              style={{ clipPath: ROUGH_BTN }}
            >
              See main plates
              <UtensilsCrossed size={16} />
            </HomepageLink>
            <HomepageLink
              href="/booking"
              className="inline-flex items-center gap-2 border border-white/18 px-7 py-3 font-ui text-[13px] font-bold uppercase tracking-[0.16em] text-white"
              style={{ clipPath: ROUGH_BTN }}
            >
              Cater with us
            </HomepageLink>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative mx-auto aspect-square w-full max-w-[34rem]"
          style={{ y: dishY, scale: dishScale }}
          initial={{ opacity: 0, scale: 0.86, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: -1.5 }}
          transition={{ duration: 0.85, delay: 0.35, ease }}
        >
          <motion.div
            aria-hidden
            className="absolute inset-[-7%] rounded-full border border-[#F5C518]/25"
            animate={{ rotate: 360 }}
            transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            aria-hidden
            className="absolute inset-[3%] rounded-full border border-[#4CAF50]/30"
            animate={{ rotate: -360 }}
            transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}
          />
          <div className="shadow-paper-img relative h-full w-full overflow-hidden rounded-full border-[10px] border-[#fff7e5] bg-black">
            <Image
              src={heroDish.image}
              alt={heroDish.title}
              fill
              priority
              sizes="(min-width: 1024px) 36vw, 86vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/8" />
          </div>
          <motion.div
            className="absolute -bottom-2 left-4 bg-[#C41E3A] px-6 py-3 text-white"
            style={{ clipPath: ROUGH_BTN }}
            animate={{ y: [0, -6, 0], rotate: [-2, 1, -2] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="font-ui text-[12px] font-bold uppercase tracking-[0.18em]">
              Top food: {heroDish.title}
            </span>
          </motion.div>
        </motion.div>

        <div className="space-y-4 lg:pt-24">
          <motion.div
            className="mb-5"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.52, ease }}
          >
            <p className="font-special text-[1.25rem] uppercase leading-tight text-[#4CAF50]">
              Big flavor.
              <br />
              Small price.
              <br />
              <span className="text-[#F5C518]">Yaad style.</span>
            </p>
          </motion.div>
          {featured.map((item, i) => (
            <FeaturedPlate key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CategoryTabs({
  active,
  onSelect,
}: {
  active: MenuCategory
  onSelect: (cat: MenuCategory) => void
}) {
  const scrollTo = (id: MenuCategory) => {
    onSelect(id)
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="sticky top-[92px] z-30 border-y border-white/10 bg-[#050505]/94 backdrop-blur-md">
      <div className="mx-auto max-w-[90rem] px-6 md:px-8 lg:px-14">
        <div className="flex overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {menuCategories.map((cat) => {
            const meta = CATEGORY_META[cat.id]
            const isActive = active === cat.id
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => scrollTo(cat.id)}
                className="relative flex shrink-0 items-center gap-2 px-5 py-4 font-ui text-[12px] font-bold uppercase tracking-[0.16em] transition-colors"
                style={{
                  color: isActive ? meta.paint : 'rgba(255,255,255,0.56)',
                }}
              >
                <meta.Icon size={15} />
                {meta.shortLabel}
                {isActive && (
                  <motion.span
                    layoutId="menu-active-tab"
                    className="absolute inset-x-3 bottom-0 h-[3px]"
                    style={{ background: meta.paint }}
                    transition={{ type: 'spring', stiffness: 520, damping: 42 }}
                  />
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function MenuPosterCard({ item, index }: { item: MenuItem; index: number }) {
  return (
    <motion.article
      className="group grid gap-4 border-b border-white/12 pb-6 md:grid-cols-[8.5rem_1fr_auto]"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.56, delay: index * 0.055, ease }}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-white/8 shadow-[4px_5px_0_rgba(245,197,24,0.26)] md:aspect-square">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(min-width: 768px) 136px, 92vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="dog-ear-corner" aria-hidden />
      </div>
      <div>
        <div className="mb-2 flex flex-wrap gap-2">
          {item.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="bg-white/8 px-2 py-1 font-ui text-[10px] font-bold uppercase tracking-[0.14em] text-[#F5C518]"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="font-display text-[clamp(2rem,3.5vw,3.3rem)] font-light uppercase leading-[0.9] text-[#4CAF50]">
          {item.title}
        </h3>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-white/70">
          {item.description}
        </p>
        {item.chefNote && (
          <p className="mt-2 font-special text-[13px] uppercase tracking-[0.06em] text-[#F5C518]/82">
            {item.chefNote}
          </p>
        )}
      </div>
      <div className="flex md:justify-end">
        <span
          className="grid h-16 min-w-16 place-items-center bg-[#1E6B1E] px-3 text-center font-ui text-xl font-bold text-white"
          style={{ clipPath: ROUGH_BTN }}
        >
          {item.price}
        </span>
      </div>
    </motion.article>
  )
}

function PriceLine({ item, index }: { item: MenuItem; index: number }) {
  return (
    <motion.div
      className="group"
      initial={{ opacity: 0, x: -18 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.42, delay: index * 0.045 }}
    >
      <div className="flex items-baseline gap-3">
        <h3 className="shrink-0 font-ui text-[clamp(1.05rem,2vw,1.42rem)] font-bold uppercase tracking-[0.04em] text-white">
          {item.title}
        </h3>
        <div className="mb-1 h-px flex-1 border-b border-dotted border-white/42 transition-colors group-hover:border-[#F5C518]" />
        <span className="font-ui text-[clamp(1.1rem,2vw,1.55rem)] font-bold text-[#F5C518]">
          {item.price}
        </span>
      </div>
      <p className="mt-1 max-w-xl text-sm leading-6 text-white/54">
        {item.description}
      </p>
    </motion.div>
  )
}

function CategorySection({ category }: { category: MenuCategory }) {
  const items = menuItems.filter((item) => item.category === category)
  const compact = category === 'sides' || category === 'drinks'

  return (
    <section
      id={category}
      className="scroll-mt-[150px] bg-[#050505] px-6 py-16 text-white md:px-8 md:py-24 lg:px-14"
    >
      <div className="mx-auto max-w-[90rem]">
        <PaintHeading category={category} />
        {compact ? (
          <div className="grid gap-x-12 gap-y-7 lg:grid-cols-2">
            {items.map((item, i) => (
              <PriceLine key={item.id} item={item} index={i} />
            ))}
          </div>
        ) : (
          <div className="grid gap-7 lg:grid-cols-2">
            {items.map((item, i) => (
              <MenuPosterCard key={item.id} item={item} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function YardBoxCombo() {
  return (
    <section className="relative overflow-hidden bg-[#050505] px-6 py-20 text-white md:px-8 lg:px-14">
      <div className="absolute inset-x-0 top-0 h-px bg-white/10" />
      <FlagBrush className="bottom-5 left-[-6rem] opacity-50" />
      <div className="relative z-10 mx-auto grid max-w-[90rem] gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-stretch">
        <motion.div
          className="relative overflow-hidden border border-[#F5C518]/45 bg-[#0D0A06] p-6 shadow-[8px_10px_0_rgba(245,197,24,0.18)] md:p-8"
          initial={{ opacity: 0, y: 28, rotate: -1 }}
          whileInView={{ opacity: 1, y: 0, rotate: -0.4 }}
          viewport={{ once: true, amount: 0.28 }}
          transition={{ duration: 0.72, ease }}
        >
          <div className="grid gap-8 md:grid-cols-[1fr_15rem] md:items-end">
            <div>
              <p className="font-special text-[1.1rem] uppercase tracking-[0.08em] text-[#4CAF50]">
                Best value box
              </p>
              <h2 className="mt-3 font-display text-[clamp(4rem,8vw,8rem)] font-light uppercase leading-[0.82] text-white">
                Yard Box
                <br />
                <span className="text-[#F5C518]">Combo</span>
              </h2>
              <ul className="mt-6 grid gap-2 font-ui text-[1rem] font-bold uppercase tracking-[0.12em] text-white/82 sm:grid-cols-2">
                {[
                  'Jerk chicken',
                  'Rice & peas',
                  'Cabbage',
                  'Festival',
                  'Plantain',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Leaf size={15} className="text-[#4CAF50]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden bg-white/8">
              <Image
                src={
                  menuItems.find((item) => item.id === 'jerk-chicken')?.image ??
                  menuItems[0].image
                }
                alt="Yard Box Combo"
                fill
                sizes="240px"
                className="object-cover"
              />
              <div
                className="absolute bottom-3 right-3 bg-[#F5C518] px-5 py-3 font-ui text-2xl font-bold text-black"
                style={{ clipPath: ROUGH_BTN }}
              >
                $14
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col justify-between gap-8 bg-[#F5C518] p-6 text-black md:p-8"
          style={{ clipPath: ROUGH_BTN }}
          initial={{ opacity: 0, x: 28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.28 }}
          transition={{ duration: 0.65, delay: 0.1, ease }}
        >
          <div>
            <h2 className="font-display text-[clamp(2.8rem,5vw,5rem)] font-light uppercase leading-[0.9]">
              Add extra protein
            </h2>
            <div className="mt-7 grid gap-4">
              {[
                ['Chicken', '$4'],
                ['Saltfish', '$3'],
                ['Goat', '$6'],
              ].map(([label, price]) => (
                <div key={label} className="flex items-baseline gap-3">
                  <span className="font-ui text-xl font-bold uppercase tracking-[0.08em]">
                    {label}
                  </span>
                  <span className="h-px flex-1 border-b border-dotted border-black/45" />
                  <span className="font-ui text-2xl font-bold">{price}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="font-special text-[1.5rem] uppercase leading-tight text-[#1E6B1E]">
            One love.
            <br />
            Good food.
            <br />
            Yaad style.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

function MenuClosingBand() {
  return (
    <section className="feature-rugged-band relative overflow-hidden bg-[#050505] px-6 py-12 text-center text-white md:px-8 lg:px-14">
      <motion.div
        className="feature-paint-edge feature-paint-edge-top"
        aria-hidden
        animate={{ x: ['-2%', '2%', '-2%'], opacity: [0.72, 0.96, 0.78] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="relative z-10 mx-auto max-w-5xl">
        <p className="font-ui text-[12px] font-bold uppercase tracking-[0.24em] text-[#F5C518]">
          We cater
        </p>
        <h2 className="mt-3 font-display text-[clamp(2.8rem,6vw,6.5rem)] font-light uppercase leading-[0.9]">
          Authentic flavor. Jamaican heart.
        </h2>
        <HomepageLink
          href="/booking"
          className="mt-8 inline-flex bg-[#4CAF50] px-8 py-3 font-ui text-[13px] font-bold uppercase tracking-[0.16em] text-black"
          style={{ clipPath: ROUGH_BTN }}
        >
          Book catering
        </HomepageLink>
      </div>
    </section>
  )
}

export default function MenuPage() {
  const [activeCat, setActiveCat] = useState<MenuCategory>('breakfast')

  useEffect(() => {
    const observers = menuCategories.map((cat) => {
      const el = document.getElementById(cat.id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveCat(cat.id)
        },
        { threshold: 0.22, rootMargin: '-90px 0px -42% 0px' },
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach((o) => o?.disconnect())
  }, [])

  return (
    <main className="overflow-x-hidden bg-[#050505] pb-16 md:pb-0">
      <AnnouncementBar messages={announcementMessages} />
      <Header leftLinks={navLinks.left} rightLinks={navLinks.right} />
      <MenuHero />
      <CategoryTabs active={activeCat} onSelect={setActiveCat} />
      <CategorySection category="breakfast" />
      <TornEdge variant={1} fill={EDGE_COLORS[0]} />
      <CategorySection category="mains" />
      <TornEdge variant={2} fill={EDGE_COLORS[1]} />
      <CategorySection category="snacks" />
      <TornEdge variant={3} fill={EDGE_COLORS[2]} />
      <CategorySection category="sides" />
      <TornEdge variant={1} fill={EDGE_COLORS[0]} />
      <CategorySection category="drinks" />
      <YardBoxCombo />
      <MenuClosingBand />
      <Footer {...footer} />
      <MobileBottomBar />
    </main>
  )
}
