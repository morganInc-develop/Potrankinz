'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  UtensilsCrossed,
  CalendarDays,
  Mail,
  ChefHat,
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
  services: ChefHat,
  reservations: CalendarDays,
  'book now': BookOpen,
}

function NavIcon({ label, className }: { label: string; className?: string }) {
  const Icon = NAV_ICONS[label.toLowerCase()]
  if (!Icon) return null
  return <Icon size={17} className={className} strokeWidth={1.9} />
}

function HeaderNav({ links }: { links: HeaderLink[] }) {
  return (
    <nav className="hidden items-center gap-8 lg:flex">
      {links.map((link) => (
        <HomepageLink
          key={link.label}
          href={link.href}
          className="pointer-events-auto flex items-center gap-2 font-ui text-[13px] uppercase tracking-[0.19em] text-white/78 transition-colors duration-300 hover:text-[#F5C518]"
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
        animate={{ opacity: 1 }}
        transition={{ duration: 0.38 }}
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'rgba(23, 23, 23, 0.94)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          backgroundImage: PAPER_GRAIN,
          backgroundBlendMode: 'multiply',
        }}
      />

      {/* Stacked paper shadow lines at bottom */}
      <motion.div
        animate={{ opacity: 1 }}
        transition={{ duration: 0.38 }}
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
        style={{
          boxShadow:
            '0 1px 0 0 rgba(255,255,255,0.08), 0 3px 0 0 rgba(0,0,0,0.28), 0 8px 18px rgba(0,0,0,0.18)',
        }}
      />

      {/* Wavy paper drip */}
      <motion.div
        animate={{ opacity: 1 }}
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
            fill="rgba(23,23,23,0.94)"
          />
        </svg>
      </motion.div>

      {/* Nav content */}
      <div className="relative z-10 grid grid-cols-1 items-center py-4 lg:grid-cols-[1fr_auto_1fr]">
        <HeaderNav links={leftLinks} />

        <HomepageLink
          href="/"
          className="pointer-events-auto mx-auto flex flex-col items-center text-center drop-shadow-sm"
          aria-label={restaurantName}
        >
          <span className="font-ui text-[17px] uppercase tracking-[0.36em] md:text-[21px] md:tracking-[0.42em]">
            <span style={{ color: '#C41E3A' }}>Pot</span>
            <span style={{ color: '#F5C518' }}>Rankinz</span>
          </span>
          <span
            className="mt-1 font-ui text-[9px] uppercase tracking-[0.35em] md:text-[10px]"
            style={{ color: '#3D9B3D' }}
          >
            Kitchen
          </span>
        </HomepageLink>

        <div className="justify-self-end">
          <HeaderNav links={rightLinks} />
        </div>
      </div>
    </header>
  )
}
