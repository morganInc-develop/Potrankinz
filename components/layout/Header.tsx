'use client'

import { useState, useEffect } from 'react'
import type { CSSProperties } from 'react'
import { motion } from 'framer-motion'
import {
  CalendarDays,
  Mail,
  ChefHat,
  BookOpen,
  Info,
  ShoppingCart,
} from 'lucide-react'

import CartNavBadge from '@/components/cart/CartNavBadge'
import MenuPlateIcon from '@/components/icons/MenuPlateIcon'
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
  contact: Mail,
  cart: ShoppingCart,
  services: ChefHat,
  reservations: CalendarDays,
  'book now': BookOpen,
  'about us': Info,
}

const NAV_ACCENTS: Record<string, string> = {
  menu: '#F5C518',
  cart: '#4CAF50',
  contact: '#C41E3A',
  services: '#F5C518',
  'about us': '#4CAF50',
}

function NavIcon({ label, className }: { label: string; className?: string }) {
  if (label.toLowerCase() === 'menu') {
    return <MenuPlateIcon className={className} size={20} />
  }

  const Icon = NAV_ICONS[label.toLowerCase()]
  if (!Icon) return null
  return (
    <Icon
      size={18}
      className={className}
      strokeWidth={2.15}
      style={{ color: NAV_ACCENTS[label.toLowerCase()] ?? '#FFFFFF' }}
    />
  )
}

function HeaderNav({ links }: { links: HeaderLink[] }) {
  return (
    <nav className="hidden items-center gap-4 lg:flex">
      {links.map((link) => {
        const isCart = link.label.toLowerCase() === 'cart'
        const accent = NAV_ACCENTS[link.label.toLowerCase()] ?? '#F5C518'

        return (
          <HomepageLink
            key={link.label}
            href={link.href}
            className="pointer-events-auto relative flex items-center gap-2.5 border bg-white/[0.045] px-3 py-2 font-ui text-[12px] font-bold uppercase tracking-[0.16em] text-white shadow-[0_3px_12px_rgba(0,0,0,0.24)] transition-[color,background-color,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-white/45 hover:bg-white/[0.11] hover:text-[#F5C518]"
            style={{
              borderColor: `${accent}66`,
              textShadow: '0 1px 8px rgba(255,255,255,0.2)',
            }}
          >
            <span className="relative">
              <NavIcon label={link.label} />
              {isCart && <CartNavBadge className="absolute -right-3 -top-3" />}
            </span>
            {link.label}
          </HomepageLink>
        )
      })}
    </nav>
  )
}

export default function Header({ leftLinks, rightLinks }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [desktopTop, setDesktopTop] = useState(32)

  useEffect(() => {
    let frame = 0

    const handle = () => {
      if (frame) return

      frame = window.requestAnimationFrame(() => {
        const announcement = document.querySelector<HTMLElement>(
          '[data-announcement-bar]',
        )
        const announcementBottom =
          announcement?.getBoundingClientRect().bottom ?? 0

        setScrolled(window.scrollY > 80)
        setDesktopTop(Math.max(0, Math.round(announcementBottom)))
        frame = 0
      })
    }

    handle()
    window.addEventListener('scroll', handle, { passive: true })
    window.addEventListener('resize', handle)

    return () => {
      window.removeEventListener('scroll', handle)
      window.removeEventListener('resize', handle)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <header
      className="pointer-events-none fixed inset-x-0 top-0 z-40 px-0 md:top-[var(--desktop-nav-top)] md:px-8 lg:px-10"
      style={
        {
          '--desktop-nav-top': `${desktopTop}px`,
        } as CSSProperties
      }
    >
      {/* Paper backing (fades in on scroll) */}
      <motion.div
        animate={{ opacity: 1 }}
        transition={{ duration: 0.38 }}
        className="pointer-events-none absolute inset-0"
        style={{
          background: '#171717',
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
            fill="#171717"
          />
        </svg>
      </motion.div>

      {/* Nav content */}
      <div
        className={`relative z-10 grid grid-cols-1 items-center px-6 pb-4 transition-[padding] duration-500 ease-out md:px-0 md:py-4 lg:grid-cols-[1fr_auto_1fr] ${
          scrolled ? 'pt-4' : 'pt-12'
        }`}
      >
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
