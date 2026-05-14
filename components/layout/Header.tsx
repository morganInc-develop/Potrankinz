'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  UtensilsCrossed,
  CalendarDays,
  Mail,
  Sparkles,
  BookOpen,
} from 'lucide-react'

import HomepageLink from '@/components/ui/homepage-link'
import { restaurantName } from '@/lib/kindred-home-data'

interface HeaderLink {
  label: string
  href: string
}

interface HeaderProps {
  leftLinks: HeaderLink[]
  rightLinks: HeaderLink[]
}

const PAPER_GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.042'/%3E%3C/svg%3E")`

const NAV_ICONS: Record<string, React.ElementType> = {
  menu: UtensilsCrossed,
  contact: Mail,
  services: Sparkles,
  reservations: CalendarDays,
  'book now': BookOpen,
}

function NavIcon({ label, className }: { label: string; className?: string }) {
  const Icon = NAV_ICONS[label.toLowerCase()]
  if (!Icon) return null
  return <Icon size={13} className={className} strokeWidth={1.6} />
}

function HeaderNav({
  links,
  scrolled,
}: {
  links: HeaderLink[]
  scrolled: boolean
}) {
  return (
    <nav className="hidden items-center gap-7 lg:flex">
      {links.map((link) => (
        <HomepageLink
          key={link.label}
          href={link.href}
          className={`pointer-events-auto flex items-center gap-1.5 font-ui text-[11px] uppercase tracking-[0.2em] transition-colors duration-500 hover:opacity-60 ${
            scrolled ? 'text-black/75' : 'text-white drop-shadow-sm'
          }`}
        >
          <NavIcon label={link.label} />
          {link.label}
        </HomepageLink>
      ))}
    </nav>
  )
}

export default function Header({ leftLinks, rightLinks }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 80)
    handle()
    window.addEventListener('scroll', handle, { passive: true })
    return () => window.removeEventListener('scroll', handle)
  }, [])

  return (
    <header
      className={`pointer-events-none fixed inset-x-0 z-40 px-6 transition-[top] duration-500 ease-out md:px-8 lg:px-10 ${
        scrolled ? 'top-0' : 'top-8'
      }`}
    >
      {/* Paper backing (fades in on scroll) */}
      <motion.div
        animate={{ opacity: scrolled ? 1 : 0 }}
        transition={{ duration: 0.38 }}
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'rgba(251, 248, 245, 0.96)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          backgroundImage: PAPER_GRAIN,
          backgroundBlendMode: 'multiply',
        }}
      />

      {/* Stacked paper shadow lines at bottom */}
      <motion.div
        animate={{ opacity: scrolled ? 1 : 0 }}
        transition={{ duration: 0.38 }}
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
        style={{
          boxShadow:
            '0 1px 0 0 #e8e2d8, 0 3px 0 0 #ddd7cc, 0 8px 18px rgba(0,0,0,0.06)',
        }}
      />

      {/* Wavy paper drip */}
      <motion.div
        animate={{ opacity: scrolled ? 1 : 0 }}
        transition={{ duration: 0.38 }}
        className="pointer-events-none absolute inset-x-0 bottom-0"
        style={{ height: 9, transform: 'translateY(100%)' }}
      >
        <svg
          viewBox="0 0 1440 9"
          preserveAspectRatio="none"
          style={{ height: '100%', width: '100%', display: 'block' }}
        >
          <path
            d="M0,4.5 Q80,9 160,4.5 Q240,0 320,4.5 Q400,9 480,4.5 Q560,0 640,4.5 Q720,9 800,4.5 Q880,0 960,4.5 Q1040,9 1120,4.5 Q1200,0 1280,4.5 Q1360,9 1440,4.5 L1440,9 L0,9 Z"
            fill="rgba(251,248,245,0.96)"
          />
        </svg>
      </motion.div>

      {/* Nav content */}
      <div className="relative z-10 grid grid-cols-1 items-start py-4 lg:grid-cols-[1fr_auto_1fr]">
        <HeaderNav links={leftLinks} scrolled={scrolled} />

        <HomepageLink
          href="/"
          className={`pointer-events-auto mx-auto flex flex-col items-center text-center transition-colors duration-500 ${
            scrolled ? 'text-black' : 'text-white drop-shadow-sm'
          }`}
        >
          <span className="font-ui text-[17px] uppercase tracking-[0.36em] md:text-[21px] md:tracking-[0.42em]">
            {restaurantName.split(' ').slice(0, 2).join(' ')}
          </span>
          <span
            className="mt-1 font-ui text-[9px] uppercase tracking-[0.35em] md:text-[10px]"
            style={{ color: scrolled ? '#3D9B3D' : 'inherit' }}
          >
            {restaurantName.split(' ')[2]}
          </span>
        </HomepageLink>

        <div className="justify-self-end">
          <HeaderNav links={rightLinks} scrolled={scrolled} />
        </div>
      </div>
    </header>
  )
}
