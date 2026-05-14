'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Menu,
  X,
  ArrowRight,
  Home,
  Users,
  Sparkles,
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
  { label: 'SERVICES', href: '/services', Icon: Sparkles },
  { label: 'MENU', href: '/menu', Icon: UtensilsCrossed },
  { label: 'GALLERY', href: '/gallery', Icon: Camera },
  { label: 'CONTACT', href: '/contact', Icon: Mail },
]

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
              className="text-white uppercase tracking-widest text-[13px] font-semibold"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              POT RANKINZ
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
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* ── Mobile menu ────────────────────────────────────────────────────── */}
      {open && (
        <div className="lg:hidden bg-[#0D0A06] border-t border-white/10 px-6 py-5">
          <ul className="flex flex-col gap-5">
            {navLinks.map(({ label, href, Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="flex items-center gap-2 text-white uppercase tracking-widest text-sm hover:text-[#F5C518] transition-colors"
                  style={{ fontFamily: 'var(--font-ui)' }}
                  onClick={() => setOpen(false)}
                >
                  <Icon size={14} strokeWidth={2} />
                  {label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 bg-[#F5C518] text-black uppercase tracking-widest text-sm font-bold px-6 py-3"
                style={{ fontFamily: 'var(--font-ui)', clipPath: ROUGH_BTN }}
                onClick={() => setOpen(false)}
              >
                BOOK NOW <ArrowRight size={15} />
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}
