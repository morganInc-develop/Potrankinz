'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import * as Dialog from '@radix-ui/react-dialog'
import { Check, Leaf, Wheat, X } from 'lucide-react'

import type { CartSideSelection } from '@/lib/cart'
import { menuItems } from '@/lib/kindred-home-data'
import {
  sideGroupForId,
  sideIsAllowedForProduct,
  type SideGroup,
} from '@/lib/side-options'

const allSideOptions: CartSideSelection[] = menuItems
  .filter((item) => item.category === 'sides')
  .map(({ id, title, image }) => ({ id, title, image }))

interface SideSelectionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  productId: string
  productTitle: string
  productCategory: string
  onConfirm: (sides: CartSideSelection[]) => void
}

function SideGroupOptions({
  group,
  label,
  description,
  options,
  selected,
  onSelect,
}: {
  group: SideGroup
  label: string
  description: string
  options: CartSideSelection[]
  selected: CartSideSelection | null
  onSelect: (side: CartSideSelection | null) => void
}) {
  const Icon = group === 'starch' ? Wheat : Leaf
  const paint = group === 'starch' ? '#F5C518' : '#4CAF50'

  if (options.length === 0) return null

  return (
    <section className="border border-white/12 bg-white/[0.035] p-3 md:p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3
            className="flex items-center gap-2 font-ui text-[12px] font-bold uppercase tracking-[0.16em]"
            style={{ color: paint }}
          >
            <Icon size={17} />
            {label}
          </h3>
          <p className="mt-1 text-xs leading-5 text-white/48">{description}</p>
        </div>
        <span className="shrink-0 border border-white/12 px-2 py-1 font-ui text-[9px] font-bold uppercase tracking-[0.12em] text-white/52">
          Up to 1
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {options.map((side) => {
          const isSelected = selected?.id === side.id

          return (
            <button
              key={side.id}
              type="button"
              aria-pressed={isSelected}
              aria-label={`${isSelected ? 'Remove' : 'Choose'} ${side.title}`}
              onClick={() => onSelect(isSelected ? null : side)}
              className="group text-left"
            >
              <span
                className={`relative block aspect-[4/3] overflow-hidden border-2 bg-white/8 transition-colors ${
                  isSelected
                    ? 'border-[#F5C518]'
                    : 'border-transparent group-hover:border-white/40'
                }`}
              >
                <Image
                  src={side.image}
                  alt=""
                  fill
                  sizes="(min-width: 640px) 180px, 42vw"
                  className="object-cover"
                />
                {isSelected && (
                  <span className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-[#F5C518] text-black">
                    <Check size={15} strokeWidth={3} />
                  </span>
                )}
              </span>
              <span
                className={`mt-2 block font-ui text-[10px] font-bold uppercase tracking-[0.1em] ${
                  isSelected ? 'text-[#F5C518]' : 'text-white/64'
                }`}
              >
                {side.title}
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}

export default function SideSelectionModal({
  open,
  onOpenChange,
  productId,
  productTitle,
  productCategory,
  onConfirm,
}: SideSelectionModalProps) {
  const sideOptions = allSideOptions.filter((side) =>
    sideIsAllowedForProduct({
      sideId: side.id,
      productId,
      productCategory,
    }),
  )
  const starchOptions = sideOptions.filter(
    (side) => sideGroupForId(side.id) === 'starch',
  )
  const vegetableOptions = sideOptions.filter(
    (side) => sideGroupForId(side.id) === 'vegetable',
  )
  const [selectedStarch, setSelectedStarch] =
    useState<CartSideSelection | null>(null)
  const [selectedVegetable, setSelectedVegetable] =
    useState<CartSideSelection | null>(null)
  const selectedSides = [selectedStarch, selectedVegetable].filter(
    (side): side is CartSideSelection => Boolean(side),
  )

  useEffect(() => {
    if (!open) return
    setSelectedStarch(null)
    setSelectedVegetable(null)
  }, [open])

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-black/82 backdrop-blur-sm data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out data-[state=open]:fade-in" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-[101] max-h-[92vh] w-[min(94vw,64rem)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto border border-[#F5C518]/45 bg-[#0D0A06] p-4 text-white shadow-[12px_14px_0_rgba(196,30,58,0.28)] outline-none md:p-7">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="font-ui text-[11px] font-bold uppercase tracking-[0.2em] text-[#F5C518]">
                Build your plate
              </p>
              <Dialog.Title className="mt-2 font-display text-[clamp(2.5rem,6vw,5.5rem)] font-light uppercase leading-[0.86] text-[#4CAF50]">
                Pick your sides
              </Dialog.Title>
              <Dialog.Description className="mt-3 max-w-2xl text-sm leading-6 text-white/64">
                Choose at least 1 side for {productTitle}. You may add up to 2:
                one starch and one vegetable.
              </Dialog.Description>
            </div>
            <Dialog.Close
              aria-label="Close side selector"
              className="grid h-11 w-11 shrink-0 place-items-center border border-white/18 text-white transition-colors hover:border-[#C41E3A] hover:bg-[#C41E3A]"
            >
              <X size={20} />
            </Dialog.Close>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <SideGroupOptions
              group="starch"
              label="Starch"
              description="Choose one rice, bread, dumpling, mac, or pasta option."
              options={starchOptions}
              selected={selectedStarch}
              onSelect={setSelectedStarch}
            />
            <SideGroupOptions
              group="vegetable"
              label="Vegetable"
              description="Choose cabbage, cabbage salad, Pikliz, or plantains."
              options={vegetableOptions}
              selected={selectedVegetable}
              onSelect={setSelectedVegetable}
            />
          </div>

          <div className="mt-5 flex flex-col-reverse gap-3 border-t border-white/12 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-ui text-[10px] font-bold uppercase tracking-[0.14em] text-white/48">
                {selectedSides.length}/2 selected · 1 required
              </p>
              <p className="mt-1 text-sm text-white/70">
                {selectedSides.length > 0
                  ? selectedSides.map((side) => side.title).join(' + ')
                  : 'Select a starch or vegetable to continue.'}
              </p>
            </div>
            <button
              type="button"
              disabled={selectedSides.length === 0}
              onClick={() => onConfirm(selectedSides)}
              className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#F5C518] px-6 py-3 font-ui text-[12px] font-bold uppercase tracking-[0.14em] text-black transition-colors hover:bg-[#4CAF50] disabled:cursor-not-allowed disabled:bg-white/14 disabled:text-white/35"
            >
              <Check size={16} />
              Add plate with {selectedSides.length} side
              {selectedSides.length === 1 ? '' : 's'}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
