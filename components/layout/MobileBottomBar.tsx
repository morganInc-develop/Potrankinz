'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { UtensilsCrossed, Mail, Sparkles, BookOpen } from 'lucide-react'
import Link from 'next/link'

import { navLinks } from '@/lib/kindred-home-data'

const ICONS: Record<string, React.ElementType> = {
  menu: UtensilsCrossed,
  contact: Mail,
  services: Sparkles,
  'book now': BookOpen,
}

const allLinks = [...navLinks.left, ...navLinks.right]

export default function MobileBottomBar() {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 72 }}
        animate={{ y: 0 }}
        exit={{ y: 72 }}
        transition={{ duration: 0.55, ease: [0.3, 0, 0, 1], delay: 0.3 }}
        className="fixed inset-x-0 bottom-0 z-[80] border-t border-[#7B1F1F]/30 bg-warm-white md:hidden"
      >
        <div className="grid grid-cols-4">
          {allLinks.map((link) => {
            const Icon = ICONS[link.label.toLowerCase()]
            return (
              <Link
                key={link.label}
                href={link.href}
                className="flex min-h-16 flex-col items-center justify-center gap-1"
                style={
                  link.label.toLowerCase() === 'book now'
                    ? { color: '#3D9B3D' }
                    : undefined
                }
              >
                {Icon && <Icon className="h-4 w-4" strokeWidth={1.6} />}
                <span className="font-ui text-[10px] uppercase tracking-[0.15em]">
                  {link.label}
                </span>
              </Link>
            )
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
