'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  UtensilsCrossed,
  Mail,
  ChefHat,
  BookOpen,
  ShoppingCart,
} from 'lucide-react'
import Link from 'next/link'

import CartNavBadge from '@/components/cart/CartNavBadge'
import { navLinks } from '@/lib/kindred-home-data'

const ICONS: Record<string, React.ElementType> = {
  menu: UtensilsCrossed,
  cart: ShoppingCart,
  contact: Mail,
  services: ChefHat,
  'book now': BookOpen,
}

const allLinks = [...navLinks.left, ...navLinks.right]

export default function MobileBottomBar() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return createPortal(
    <div
      data-mobile-bottom-bar
      className="fixed inset-x-0 bottom-[-1px] z-[80] w-full overflow-hidden border-t border-white/10 bg-[#171717] pb-[calc(env(safe-area-inset-bottom)+1px)] shadow-[0_-6px_18px_rgba(0,0,0,0.22)] md:hidden"
    >
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${allLinks.length}, minmax(0, 1fr))`,
        }}
      >
        {allLinks.map((link) => {
          const Icon = ICONS[link.label.toLowerCase()]
          const isCart = link.label.toLowerCase() === 'cart'
          const isBookNow = link.label.toLowerCase() === 'book now'
          return (
            <Link
              key={link.label}
              href={link.href}
              className="flex min-h-16 flex-col items-center justify-center gap-1 transition-colors"
              style={isBookNow ? { color: '#4CAF50' } : { color: '#FFFFFFC7' }}
            >
              {Icon && (
                <span className="relative">
                  <Icon
                    className="h-4 w-4"
                    strokeWidth={1.9}
                    style={isBookNow ? { color: '#4CAF50' } : undefined}
                  />
                  {isCart && (
                    <CartNavBadge className="absolute -right-3 -top-3" />
                  )}
                </span>
              )}
              <span className="font-ui text-[10px] uppercase tracking-[0.15em]">
                {link.label}
              </span>
            </Link>
          )
        })}
      </div>
    </div>,
    document.body,
  )
}
