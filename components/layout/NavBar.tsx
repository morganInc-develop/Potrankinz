'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import {
  Menu,
  X,
  ArrowRight,
  Home,
  Users,
  ChefHat,
  UtensilsCrossed,
  Camera,
  Mail,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

// Same painted rough-edge clip-path used on the hero buttons
const ROUGH_BTN =
  'polygon(0% 10%, 4% 2%, 10% 8%, 17% 0%, 24% 8%, 31% 2%, 38% 10%, 45% 2%, 52% 8%, 59% 2%, 66% 8%, 73% 0%, 80% 10%, 87% 2%, 94% 8%, 100% 5%, 99% 50%, 100% 95%, 96% 100%, 89% 90%, 82% 100%, 75% 92%, 68% 100%, 61% 90%, 54% 100%, 47% 92%, 40% 100%, 33% 90%, 26% 100%, 19% 92%, 12% 100%, 5% 90%, 0% 95%, 1% 50%)'

interface NavLink {
  label: string
  href: string
  Icon: LucideIcon
}

const navLinks: NavLink[] = [
  { label: 'HOME', href: '/', Icon: Home },
  { label: 'ABOUT US', href: '/about', Icon: Users },
  { label: 'SERVICES', href: '/services', Icon: ChefHat },
  { label: 'MENU', href: '/menu', Icon: UtensilsCrossed },
  { label: 'GALLERY', href: '/gallery', Icon: Camera },
  { label: 'CONTACT', href: '/contact', Icon: Mail },
]

const menuEase = [0.22, 1, 0.36, 1] as const

const mobileMenu: Variants = {
  closed: {
    height: 0,
    opacity: 0,
    clipPath: 'inset(0 0 100% 0)',
    transition: {
      duration: 0.38,
      ease: [0.4, 0, 0.2, 1],
      when: 'afterChildren',
      staggerChildren: 0.035,
      staggerDirection: -1,
    },
  },
  open: {
    height: 'auto',
    opacity: 1,
    clipPath: 'inset(0 0 0% 0)',
    transition: {
      height: { duration: 0.48, ease: menuEase },
      opacity: { duration: 0.22 },
      clipPath: { duration: 0.48, ease: menuEase },
      when: 'beforeChildren',
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
}

const mobileItem: Variants = {
  closed: {
    opacity: 0,
    y: 18,
    filter: 'blur(8px)',
    transition: { duration: 0.22, ease: 'easeIn' },
  },
  open: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.38, ease: menuEase },
  },
}

export default function NavBar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0D0A06]/95 backdrop-blur-sm border-b border-white/5">
      <div className="flex items-center justify-between px-6 lg:px-16 py-3">
        {/* ── Logo ──────────────────────────────────────────────────────────── */}
        <Link href="/" className="flex items-center gap-3 flex-shrink-0">
          <Image
            src="/hero-chefs/cutouts/pot-rankinz-logo.png"
            alt="Pot Rankinz Kitchen"
            width={52}
            height={52}
            className="object-contain"
          />
          <div className="leading-none">
            <div
              className="uppercase tracking-widest text-[13px] font-semibold"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              <span className="text-[#C41E3A]">POT</span>{' '}
              <span className="text-[#F5C518]">RANKINZ</span>
            </div>
            <div
              className="text-[#4CAF50] uppercase tracking-widest text-[11px]"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              KITCHEN
            </div>
          </div>
        </Link>

        {/* ── Desktop nav links — larger, icon + label, animated ────────────── */}
        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map(({ label, href, Icon }, i) => (
            <li key={href}>
              <Link
                href={href}
                className={`group flex items-center gap-[7px] uppercase tracking-widest text-[15px] font-medium transition-all duration-200 hover:-translate-y-[2px] ${
                  i === 0
                    ? 'text-[#F5C518] border-b-2 border-[#F5C518] pb-[2px]'
                    : 'text-white/90 hover:text-[#F5C518]'
                }`}
                style={{ fontFamily: 'var(--font-ui)' }}
              >
                {/* Icon animates on hover — slight scale + small rotation */}
                <Icon
                  size={15}
                  strokeWidth={2}
                  className="transition-transform duration-200 group-hover:scale-125 group-hover:rotate-6 flex-shrink-0"
                />
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* ── BOOK NOW — rough painted edge ─────────────────────────────────── */}
        <Link
          href="/booking"
          className="hidden lg:flex items-center gap-2 bg-[#F5C518] text-black uppercase tracking-widest text-[14px] font-bold px-7 py-3 hover:bg-[#E0B000] transition-colors flex-shrink-0"
          style={{ fontFamily: 'var(--font-ui)', clipPath: ROUGH_BTN }}
        >
          BOOK NOW <ArrowRight size={15} />
        </Link>

        {/* ── Mobile toggle ──────────────────────────────────────────────────── */}
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? 'close' : 'menu'}
              className="block"
              initial={{ opacity: 0, rotate: -35, scale: 0.72 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 35, scale: 0.72 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>

      {/* ── Mobile menu ────────────────────────────────────────────────────── */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="overflow-hidden border-t border-white/10 bg-[#0D0A06] lg:hidden"
            variants={mobileMenu}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <motion.div
              className="relative px-6 py-6"
              initial={{ backgroundPosition: '50% 0%' }}
              animate={{ backgroundPosition: ['50% 0%', '52% 100%'] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              style={{
                background:
                  'radial-gradient(circle at 18% 0%, rgba(245,197,24,0.12), transparent 32%), radial-gradient(circle at 85% 10%, rgba(76,175,80,0.11), transparent 34%), #0D0A06',
              }}
            >
              <motion.ul
                className="flex flex-col gap-2"
                variants={{
                  open: {
                    transition: {
                      staggerChildren: 0.075,
                      delayChildren: 0.1,
                    },
                  },
                  closed: {
                    transition: {
                      staggerChildren: 0.035,
                      staggerDirection: -1,
                    },
                  },
                }}
              >
                {navLinks.map(({ label, href, Icon }, i) => (
                  <motion.li key={href} variants={mobileItem}>
                    <Link
                      href={href}
                      className="group flex items-center justify-between border-b border-white/8 py-3 text-white transition-colors hover:text-[#F5C518]"
                      style={{ fontFamily: 'var(--font-ui)' }}
                      onClick={() => setOpen(false)}
                    >
                      <span className="flex items-center gap-3 uppercase tracking-widest text-sm">
                        <span
                          className={`grid h-9 w-9 place-items-center border transition-colors group-hover:border-[#F5C518] ${
                            i === 0
                              ? 'border-[#F5C518]/60 text-[#F5C518]'
                              : 'border-white/14 text-white/82'
                          }`}
                        >
                          <Icon size={15} strokeWidth={2} />
                        </span>
                        {label}
                      </span>
                      <ArrowRight
                        size={15}
                        className="text-white/34 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#F5C518]"
                      />
                    </Link>
                  </motion.li>
                ))}
                <motion.li className="pt-4" variants={mobileItem}>
                  <Link
                    href="/booking"
                    className="inline-flex items-center gap-2 bg-[#F5C518] px-7 py-3 text-sm font-bold uppercase tracking-widest text-black"
                    style={{
                      fontFamily: 'var(--font-ui)',
                      clipPath: ROUGH_BTN,
                    }}
                    onClick={() => setOpen(false)}
                  >
                    BOOK NOW <ArrowRight size={15} />
                  </Link>
                </motion.li>
              </motion.ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
