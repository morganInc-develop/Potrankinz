'use client'

import { useEffect, useState } from 'react'
import { Check, ShoppingCart } from 'lucide-react'

import SideSelectionModal from '@/components/cart/SideSelectionModal'
import {
  addCartItem,
  type CartProduct,
  type CartSideSelection,
} from '@/lib/cart'

interface AddToCartButtonProps {
  product: CartProduct | null
  className?: string
  disabledLabel?: string
  label?: string
  style?: React.CSSProperties
}

export default function AddToCartButton({
  product,
  className = '',
  disabledLabel = 'Quote',
  label = 'Add to cart',
  style,
}: AddToCartButtonProps) {
  const [added, setAdded] = useState(false)
  const [sidePickerOpen, setSidePickerOpen] = useState(false)

  useEffect(() => {
    if (!added) return
    const timer = window.setTimeout(() => setAdded(false), 1300)
    return () => window.clearTimeout(timer)
  }, [added])

  if (!product) {
    return (
      <button
        type="button"
        disabled
        style={style}
        className={`inline-flex items-center justify-center gap-2 whitespace-nowrap border border-white/14 px-4 py-2 font-ui text-[11px] font-bold uppercase tracking-[0.14em] text-white/42 ${className}`}
      >
        {disabledLabel}
      </button>
    )
  }

  const needsSide =
    product.category === 'mains' ||
    product.category === 'vegan' ||
    (product.category === 'breakfast' && product.id !== 'cornmeal-porridge')

  const addProduct = (selectedSide?: CartSideSelection) => {
    addCartItem(product, 1, selectedSide)
    setSidePickerOpen(false)
    setAdded(true)
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          if (needsSide) {
            setSidePickerOpen(true)
            return
          }
          addProduct()
        }}
        style={style}
        className={`inline-flex items-center justify-center gap-2 whitespace-nowrap bg-[#F5C518] px-4 py-2 font-ui text-[11px] font-bold uppercase tracking-[0.14em] text-black transition-colors hover:bg-[#4CAF50] ${className}`}
      >
        {added ? (
          <>
            <Check size={14} />
            Added
          </>
        ) : (
          <>
            <ShoppingCart size={14} />
            {label}
          </>
        )}
      </button>
      {needsSide && (
        <SideSelectionModal
          open={sidePickerOpen}
          onOpenChange={setSidePickerOpen}
          productTitle={product.title}
          productCategory={product.category}
          onConfirm={addProduct}
        />
      )}
    </>
  )
}
