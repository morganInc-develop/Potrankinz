'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { GiForkKnifeSpoon, GiWineGlass } from 'react-icons/gi'
import { Cake } from 'lucide-react'

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
  menuItems,
  menuCategories,
  menuHero,
  type MenuItem,
  type MenuCategory,
} from '@/lib/kindred-home-data'

// ─── Category config ──────────────────────────────────────────────────────────

const WASHI: Record<MenuCategory, { bg: string; text: string; spine: string }> =
  {
    starters: {
      bg: 'rgba(152,183,148,0.68)',
      text: '#2e4a2c',
      spine: 'rgba(152,183,148,0.85)',
    },
    mains: {
      bg: 'rgba(210,162,152,0.68)',
      text: '#4a2e2c',
      spine: 'rgba(210,162,152,0.85)',
    },
    desserts: {
      bg: 'rgba(208,178,118,0.68)',
      text: '#4a3d1e',
      spine: 'rgba(208,178,118,0.85)',
    },
    cellar: {
      bg: 'rgba(130,180,218,0.68)',
      text: '#1e3449',
      spine: 'rgba(130,180,218,0.85)',
    },
  }

const CATEGORY_META: Record<
  MenuCategory,
  { label: string; Icon: React.ElementType }
> = {
  starters: { label: 'Starters', Icon: GiForkKnifeSpoon },
  mains: { label: 'Mains', Icon: GiForkKnifeSpoon },
  desserts: { label: 'Desserts', Icon: Cake },
  cellar: { label: 'Cellar', Icon: GiWineGlass },
}

// ─── Grain SVG (same as hero / contact page) ─────────────────────────────────

const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.68' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`

// ─── Hero ─────────────────────────────────────────────────────────────────────

function MenuHero() {
  const [labelDone, setLabelDone] = useState(false)

  return (
    <>
      <section className="relative min-h-[58svh] overflow-hidden md:min-h-[64vh]">
        <div className="absolute inset-0">
          <Image
            src={menuHero.image}
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
              'linear-gradient(to bottom, rgba(0,0,0,0.54) 0%, rgba(0,0,0,0.22) 50%, rgba(0,0,0,0.60) 100%)',
          }}
        />

        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: GRAIN,
            opacity: 0.045,
            mixBlendMode: 'overlay',
          }}
        />

        {/* Card — bottom-left, same pattern as homepage hero */}
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
                {/* Ring holes */}
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

                {/* Subject line */}
                <div
                  className="flex items-center border-b border-[rgba(130,180,218,0.48)]"
                  style={{ height: 30 }}
                >
                  <TypewriterText
                    as="span"
                    text="Subject: Spring Menu"
                    speed={20}
                    delay={500}
                    onDone={() => setLabelDone(true)}
                    className="font-special text-[10px] uppercase tracking-[0.22em] text-black/60"
                  />
                </div>

                {labelDone && (
                  <TypewriterText
                    as="h1"
                    text="The Menu."
                    speed={65}
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

      {/* Wavy paper edge */}
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

// ─── Sticky category tabs ─────────────────────────────────────────────────────

function CategoryTabs({
  active,
  onSelect,
}: {
  active: MenuCategory
  onSelect: (cat: MenuCategory) => void
}) {
  const scrollTo = (id: MenuCategory) => {
    onSelect(id)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div
      className="sticky top-[58px] z-30 border-b border-black/8"
      style={{
        background: 'rgba(251,248,245,0.96)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
    >
      <div className="mx-auto max-w-[84rem] px-6 md:px-8 lg:px-10">
        <div className="flex items-stretch overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {menuCategories.map((cat) => {
            const { label, Icon } = CATEGORY_META[cat.id]
            const washi = WASHI[cat.id]
            const isActive = active === cat.id

            return (
              <button
                key={cat.id}
                onClick={() => scrollTo(cat.id)}
                className="relative flex shrink-0 items-center gap-2 px-5 py-3 font-special text-[10px] uppercase tracking-[0.2em] transition-all duration-300"
                style={{
                  color: isActive ? washi.text : 'rgba(0,0,0,0.44)',
                  background: isActive ? washi.bg : 'transparent',
                }}
              >
                <Icon
                  size={12}
                  className="opacity-75"
                  style={{ color: isActive ? washi.text : 'rgba(0,0,0,0.44)' }}
                />
                {label}

                {isActive && (
                  <motion.div
                    layoutId="menu-tab-underline"
                    className="absolute inset-x-0 bottom-0 h-[2px]"
                    style={{
                      background: washi.spine,
                      filter: 'brightness(0.72)',
                    }}
                    transition={{ type: 'spring', stiffness: 500, damping: 40 }}
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

// ─── Book card ────────────────────────────────────────────────────────────────

function MenuBookCard({ item, index }: { item: MenuItem; index: number }) {
  const [flipped, setFlipped] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const prefersReducedMotion = useReducedMotion()
  const washi = WASHI[item.category]

  const openCard = () => setFlipped(true)
  const closeCard = () => setFlipped(false)

  const handleMouseEnter = () => {
    timerRef.current = setTimeout(openCard, 110)
  }
  const handleMouseLeave = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    closeCard()
  }
  const handleClick = () => setFlipped((f) => !f)

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    },
    [],
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{
        duration: 0.55,
        delay: index * 0.07,
        ease: [0.33, 1, 0.68, 1],
      }}
      className="cursor-pointer select-none"
      style={{ perspective: '1200px' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={`${item.title} — tap to see details`}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
    >
      {/* Scene — rotates as a whole */}
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.55,
          ease: [0.33, 1, 0.68, 1],
        }}
        style={{ transformStyle: 'preserve-3d', position: 'relative' }}
        className="aspect-[2/3] w-full"
      >
        {/* ── FRONT FACE ────────────────────────────────────── */}
        <div
          className="absolute inset-0 overflow-hidden bg-[#fdf8ec]"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            boxShadow: '3px 4px 0 #ede7dd, 7px 8px 0 #e1dbd0',
          }}
        >
          {/* Binding spine */}
          <div
            className="absolute left-0 top-0 bottom-0 z-10 flex flex-col items-center justify-around py-4"
            style={{ width: 13, background: washi.spine }}
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: 5,
                  height: 2,
                  borderRadius: 1,
                  background: 'rgba(0,0,0,0.22)',
                }}
              />
            ))}
          </div>

          {/* Photo */}
          <div
            className="absolute left-[13px] right-0 top-0"
            style={{ height: '62%' }}
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 44vw, 28vw"
              className="object-cover"
            />
            {/* Subtle vignette at bottom of photo */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to top, rgba(0,0,0,0.14) 0%, transparent 55%)',
              }}
            />
            <div className="dog-ear-corner" aria-hidden />
          </div>

          {/* Washi tape seam */}
          <div
            className="absolute left-[13px] right-0 z-10"
            style={{
              top: 'calc(62% - 7px)',
              height: 14,
              background: washi.bg,
              backgroundImage:
                'repeating-linear-gradient(90deg, transparent 0px, transparent 5px, rgba(255,255,255,0.22) 5px, rgba(255,255,255,0.22) 6px)',
            }}
          />

          {/* Text panel */}
          <div
            className="absolute left-[13px] right-0 bottom-0 flex flex-col justify-between bg-[#fdf8ec] px-3 pb-3 pt-3"
            style={{ height: '38%' }}
          >
            {/* Tags */}
            <div className="flex flex-wrap gap-1">
              {item.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="font-special text-[8px] uppercase tracking-[0.1em]"
                  style={{
                    color: 'rgba(0,0,0,0.46)',
                    background: 'rgba(0,0,0,0.045)',
                    padding: '1px 5px',
                  }}
                >
                  {tag === "Chef's Pick" ? '★ ' : ''}
                  {tag}
                </span>
              ))}
            </div>

            {/* Dish name */}
            <h3
              className="font-display font-light leading-snug text-black"
              style={{ fontSize: 'clamp(0.88rem, 1.5vw, 1.08rem)' }}
            >
              {item.title}
            </h3>

            {/* Price + flip hint */}
            <div className="flex items-center justify-between">
              <span className="font-special text-[10px] tracking-[0.08em] text-black/56">
                {item.price}
              </span>
              <span className="font-ui text-[8px] uppercase tracking-[0.14em] text-black/32">
                Open →
              </span>
            </div>
          </div>
        </div>

        {/* ── BACK FACE ─────────────────────────────────────── */}
        <div
          className="lined-paper absolute inset-0 overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            boxShadow: '3px 4px 0 #ede7dd, 7px 8px 0 #e1dbd0',
          }}
        >
          {/* Ring holes */}
          <div
            className="pointer-events-none absolute left-[22px] top-0 flex h-full flex-col justify-around py-5"
            aria-hidden
          >
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-[13px] w-[13px] rounded-full bg-warm-white/75"
                style={{ boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.18)' }}
              />
            ))}
          </div>

          {/* Category icon stamp — top-right */}
          <div
            className="pointer-events-none absolute right-2 top-2 flex h-[30px] w-[30px] items-center justify-center rounded-full"
            style={{ background: washi.bg }}
            aria-hidden
          >
            {(() => {
              const { Icon } = CATEGORY_META[item.category]
              return <Icon size={13} style={{ color: washi.text }} />
            })()}
          </div>

          {/* Scroll container */}
          <div
            className="absolute inset-0 overflow-y-auto"
            style={{
              paddingLeft: 46,
              paddingRight: 14,
              paddingTop: 10,
              paddingBottom: 18,
            }}
          >
            {/* Subject line */}
            <div
              className="flex items-center border-b border-[rgba(130,180,218,0.48)]"
              style={{ height: 28, marginBottom: 4 }}
            >
              <span className="truncate font-special text-[8px] uppercase tracking-[0.18em] text-black/52">
                Subject: {item.title}
              </span>
            </div>

            {/* Ingredients label */}
            <p className="mb-0 mt-1 font-special text-[8px] uppercase tracking-[0.14em] text-black/38">
              Ingredients
            </p>

            {/* Ingredients — sit on the ruled lines */}
            <ul>
              {item.ingredients.map((ing) => (
                <li
                  key={ing}
                  className="font-body text-[10.5px] text-black/80"
                  style={{ lineHeight: '32px' }}
                >
                  <span style={{ color: washi.text, fontWeight: 700 }}>·</span>{' '}
                  {ing}
                </li>
              ))}
            </ul>

            {/* Description */}
            <p className="mt-1 font-body text-[11px] font-semibold italic leading-[1.55] text-black/78">
              {item.description}
            </p>

            {/* Chef note */}
            {item.chefNote && (
              <p
                className="mt-2 font-display font-light italic text-black/78"
                style={{ fontSize: '0.88rem', lineHeight: '32px' }}
              >
                &ldquo;{item.chefNote}&rdquo;
              </p>
            )}

            {/* Footer row */}
            <div className="mt-2 flex items-end justify-between border-t border-[rgba(130,180,218,0.3)] pt-1">
              <div className="flex flex-wrap gap-1">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-special text-[7.5px] uppercase tracking-[0.08em] text-black/44"
                    style={{
                      background: 'rgba(0,0,0,0.04)',
                      padding: '1px 4px',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span
                className="font-display font-light text-black"
                style={{ fontSize: '0.92rem' }}
              >
                {item.price}
              </span>
            </div>
          </div>

          {/* Dog-ear */}
          <div className="dog-ear-corner" />
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Category section ─────────────────────────────────────────────────────────

function CategorySection({ category }: { category: MenuCategory }) {
  const { label, Icon } = CATEGORY_META[category]
  const washi = WASHI[category]
  const items = menuItems.filter((item) => item.category === category)

  return (
    <section
      id={category}
      className="scroll-mt-[100px] bg-warm-white px-6 py-16 md:px-8 md:py-20 lg:px-10"
    >
      <div className="mx-auto max-w-[84rem]">
        {/* Category header */}
        <motion.div
          initial={{ opacity: 0, x: -18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
          className="mb-10 flex items-center gap-4"
        >
          <div
            className="flex items-center gap-2.5 px-5 py-2"
            style={{ background: washi.bg }}
          >
            <Icon size={14} style={{ color: washi.text }} />
            <h2
              className="font-display font-light leading-none"
              style={{
                fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                color: washi.text,
              }}
            >
              {label}
            </h2>
          </div>
          <div className="h-px flex-1 bg-black/8" />
        </motion.div>

        {/* Cards grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item, i) => (
            <MenuBookCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Chef's seasonal note ─────────────────────────────────────────────────────

function ChefNote() {
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
            className="lined-paper relative max-w-[54rem]"
            style={{
              padding: '8px 36px 40px 80px',
              boxShadow:
                '3px 4px 0 #ede7dd, 7px 8px 0 #e1dbd0, 0 14px 32px rgba(0,0,0,0.09)',
            }}
          >
            {/* Ring holes */}
            <div
              className="pointer-events-none absolute left-[30px] top-0 flex h-full flex-col justify-around py-8"
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
                text="Subject: From The Kitchen"
                speed={16}
                delay={400}
                onDone={() => setLabelDone(true)}
                className="font-special text-[10px] uppercase tracking-[0.22em] text-black/60"
              />
            </div>

            {labelDone && (
              <TypewriterText
                as="p"
                text="This menu changes with the season. What you're reading today is driven by what arrived at the back door this morning — the best carrots we've seen all year, a fish that didn't exist on the menu until 9 a.m., and a dessert our pastry chef invented between dinner service and midnight."
                speed={12}
                delay={120}
                className="font-display font-light text-black"
                style={{
                  fontSize: 'clamp(1.1rem, 2.2vw, 1.75rem)',
                  lineHeight: '64px',
                  paddingTop: 6,
                }}
              />
            )}

            <div className="dog-ear-corner" />
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MenuPage() {
  const [activeCat, setActiveCat] = useState<MenuCategory>('starters')

  // Update active tab as user scrolls through sections
  useEffect(() => {
    const observers = menuCategories.map((cat) => {
      const el = document.getElementById(cat.id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveCat(cat.id)
        },
        { threshold: 0.25, rootMargin: '-60px 0px -35% 0px' },
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach((o) => o?.disconnect())
  }, [])

  return (
    <main className="overflow-x-hidden bg-warm-white pb-16 md:pb-0">
      <AnnouncementBar messages={announcementMessages} />
      <Header leftLinks={navLinks.left} rightLinks={navLinks.right} />
      <MenuHero />
      <CategoryTabs active={activeCat} onSelect={setActiveCat} />

      <CategorySection category="starters" />
      <TornEdge variant={1} />
      <CategorySection category="mains" />
      <TornEdge variant={2} />
      <CategorySection category="desserts" />
      <TornEdge variant={3} />
      <CategorySection category="cellar" />

      <TornEdge variant={1} />
      <ChefNote />
      <TornEdge variant={2} />
      <Footer {...footer} />
      <MobileBottomBar />
    </main>
  )
}
