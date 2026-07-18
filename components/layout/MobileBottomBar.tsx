'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Mail, ChefHat, BookOpen, Info, ShoppingCart } from 'lucide-react'
import Link from 'next/link'

import CartNavBadge from '@/components/cart/CartNavBadge'
import MenuPlateIcon from '@/components/icons/MenuPlateIcon'
import { navLinks } from '@/lib/kindred-home-data'

const ICONS: Record<string, React.ElementType> = {
  cart: ShoppingCart,
  contact: Mail,
  services: ChefHat,
  'book now': BookOpen,
  'about us': Info,
}

const ICON_COLORS: Record<string, string> = {
  cart: '#4CAF50',
  contact: '#C41E3A',
  services: '#F5C518',
  'about us': '#4CAF50',
}

const allLinks = [...navLinks.left, ...navLinks.right]

export default function MobileBottomBar() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return createPortal(
    <div
      data-mobile-bottom-bar
      className="fixed inset-x-0 bottom-[-1px] z-[80] w-full overflow-hidden border-t border-[#F5C518]/45 bg-[#111111] pb-[calc(env(safe-area-inset-bottom)+1px)] shadow-[0_-8px_24px_rgba(0,0,0,0.38)] md:hidden"
    >
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${allLinks.length}, minmax(0, 1fr))`,
        }}
      >
        {allLinks.map((link) => {
          const Icon = ICONS[link.label.toLowerCase()]
          const isMenu = link.label.toLowerCase() === 'menu'
          const isCart = link.label.toLowerCase() === 'cart'
          const iconColor = ICON_COLORS[link.label.toLowerCase()] ?? '#FFFFFF'
          return (
            <Link
              key={link.label}
              href={link.href}
              className="flex min-h-16 flex-col items-center justify-center gap-1 border-r border-white/8 bg-white/[0.025] text-white transition-colors last:border-r-0 hover:bg-white/[0.09]"
              style={{ textShadow: '0 1px 7px rgba(255,255,255,0.2)' }}
            >
              {isMenu && <MenuPlateIcon size={20} />}
              {Icon && (
                <span className="relative">
                  <Icon
                    className="h-[18px] w-[18px]"
                    strokeWidth={2.2}
                    style={{ color: iconColor }}
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
