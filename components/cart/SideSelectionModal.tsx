'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import * as Dialog from '@radix-ui/react-dialog'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, X } from 'lucide-react'

import type { CartSideSelection } from '@/lib/cart'
import { menuItems } from '@/lib/kindred-home-data'

const allSideOptions: CartSideSelection[] = menuItems
  .filter((item) => item.category === 'sides')
  .map(({ id, title, image }) => ({ id, title, image }))

const breakfastExcludedSideIds = new Set(['rice-peas', 'white-rice'])

interface SideSelectionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  productTitle: string
  productCategory: string
  onConfirm: (side: CartSideSelection) => void
}

export default function SideSelectionModal({
  open,
  onOpenChange,
  productTitle,
  productCategory,
  onConfirm,
}: SideSelectionModalProps) {
  const sideOptions =
    productCategory === 'breakfast'
      ? allSideOptions.filter((side) => !breakfastExcludedSideIds.has(side.id))
      : allSideOptions
  const [activeIndex, setActiveIndex] = useState(0)
  const activeSide = sideOptions[activeIndex]

  useEffect(() => {
    if (open) setActiveIndex(0)
  }, [open])

  const move = (direction: -1 | 1) => {
    setActiveIndex(
      (current) =>
        (current + direction + sideOptions.length) % sideOptions.length,
    )
  }

  if (!activeSide) return null

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-black/82 backdrop-blur-sm data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out data-[state=open]:fade-in" />
        <Dialog.Content
          onKeyDown={(event) => {
            if (event.key === 'ArrowLeft') move(-1)
            if (event.key === 'ArrowRight') move(1)
          }}
          className="fixed left-1/2 top-1/2 z-[101] max-h-[92vh] w-[min(94vw,68rem)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto border border-[#F5C518]/45 bg-[#0D0A06] p-4 text-white shadow-[12px_14px_0_rgba(196,30,58,0.28)] outline-none md:p-7"
        >
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="font-ui text-[11px] font-bold uppercase tracking-[0.2em] text-[#F5C518]">
                Build your plate
              </p>
              <Dialog.Title className="mt-2 font-display text-[clamp(2.5rem,6vw,5.5rem)] font-light uppercase leading-[0.86] text-[#4CAF50]">
                Pick your side
              </Dialog.Title>
              <Dialog.Description className="mt-3 max-w-2xl text-sm leading-6 text-white/64">
                Choose the side to serve with {productTitle}. Use the arrows or
                select any dish from the row below.
              </Dialog.Description>
            </div>
            <Dialog.Close
              aria-label="Close side selector"
              className="grid h-11 w-11 shrink-0 place-items-center border border-white/18 text-white transition-colors hover:border-[#C41E3A] hover:bg-[#C41E3A]"
            >
              <X size={20} />
            </Dialog.Close>
          </div>

          <div className="mt-6 grid grid-cols-[2.75rem_minmax(0,1fr)_2.75rem] items-center gap-2 md:grid-cols-[3.5rem_minmax(0,1fr)_3.5rem] md:gap-5">
            <button
              type="button"
              aria-label="Previous side"
              onClick={() => move(-1)}
              className="grid h-11 w-11 place-items-center bg-[#F5C518] text-black transition-colors hover:bg-[#4CAF50] md:h-14 md:w-14"
            >
              <ArrowLeft size={22} />
            </button>

            <div className="min-w-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSide.id}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.24 }}
                >
                  <div className="relative mx-auto h-52 overflow-hidden bg-white/8 shadow-[7px_8px_0_rgba(245,197,24,0.24)] md:h-[clamp(13rem,34vh,22rem)]">
                    <Image
                      src={activeSide.image}
                      alt={activeSide.title}
                      fill
                      priority
                      sizes="(min-width: 768px) 760px, 75vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/60 to-transparent px-4 pb-4 pt-16 md:px-6 md:pb-6">
                      <p className="font-display text-[clamp(2.3rem,6vw,5.8rem)] font-light uppercase leading-[0.82] text-white">
                        {activeSide.title}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              type="button"
              aria-label="Next side"
              onClick={() => move(1)}
              className="grid h-11 w-11 place-items-center bg-[#F5C518] text-black transition-colors hover:bg-[#4CAF50] md:h-14 md:w-14"
            >
              <ArrowRight size={22} />
            </button>
          </div>

          <div
            className="mt-6 grid grid-flow-col auto-cols-[7.5rem] gap-3 overflow-x-auto pb-3 md:auto-cols-[9rem]"
            aria-label="Available sides"
          >
            {sideOptions.map((side, index) => {
              const selected = index === activeIndex

              return (
                <button
                  key={side.id}
                  type="button"
                  aria-pressed={selected}
                  aria-label={`Choose ${side.title}`}
                  onClick={() => setActiveIndex(index)}
                  className={`group text-left transition-transform hover:-translate-y-1 ${
                    selected ? '-translate-y-1' : ''
                  }`}
                >
                  <span
                    className={`relative block aspect-[4/3] overflow-hidden border-2 bg-white/8 ${
                      selected
                        ? 'border-[#F5C518]'
                        : 'border-transparent group-hover:border-white/40'
                    }`}
                  >
                    <Image
                      src={side.image}
                      alt=""
                      fill
                      sizes="144px"
                      className="object-cover"
                    />
                    {selected && (
                      <span className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full bg-[#F5C518] text-black">
                        <Check size={14} strokeWidth={3} />
                      </span>
                    )}
                  </span>
                  <span
                    className={`mt-2 block font-ui text-[10px] font-bold uppercase tracking-[0.1em] ${
                      selected ? 'text-[#F5C518]' : 'text-white/64'
                    }`}
                  >
                    {side.title}
                  </span>
                </button>
              )
            })}
          </div>

          <div className="mt-4 flex flex-col-reverse gap-3 border-t border-white/12 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-white/58">
              Selected:{' '}
              <strong className="font-ui uppercase tracking-[0.08em] text-white">
                {activeSide.title}
              </strong>
            </p>
            <button
              type="button"
              onClick={() => onConfirm(activeSide)}
              className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#F5C518] px-6 py-3 font-ui text-[12px] font-bold uppercase tracking-[0.14em] text-black transition-colors hover:bg-[#4CAF50]"
            >
              <Check size={16} />
              Add with {activeSide.title}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
