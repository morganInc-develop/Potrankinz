'use client'

import { useEffect, useState } from 'react'

import { CART_UPDATED_EVENT, cartItemCount, readCart } from '@/lib/cart'

interface CartNavBadgeProps {
  className?: string
}

export default function CartNavBadge({ className = '' }: CartNavBadgeProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const sync = () => setCount(cartItemCount(readCart()))
    sync()
    window.addEventListener(CART_UPDATED_EVENT, sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener(CART_UPDATED_EVENT, sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  if (count === 0) return null

  return (
    <span
      aria-label={`${count} item${count === 1 ? '' : 's'} in cart`}
      className={`grid min-h-5 min-w-5 place-items-center rounded-full bg-[#C41E3A] px-1.5 font-ui text-[10px] font-bold leading-none text-white shadow-[0_0_0_2px_rgba(5,5,5,0.85)] ${className}`}
    >
      {count > 99 ? '99+' : count}
    </span>
  )
}
