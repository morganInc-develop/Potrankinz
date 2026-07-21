'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { loadStripe } from '@stripe/stripe-js'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  CreditCard,
  LockKeyhole,
  Minus,
  Plus,
  ShoppingBag,
  ShoppingCart,
  Trash2,
  Truck,
  UtensilsCrossed,
} from 'lucide-react'

import AddToCartButton from '@/components/cart/AddToCartButton'
import DeliveryAddressField from '@/components/cart/DeliveryAddressField'
import AnnouncementBar from '@/components/layout/AnnouncementBar'
import Header from '@/components/layout/Header'
import MobileBottomBar from '@/components/layout/MobileBottomBar'
import Footer from '@/components/sections/Footer'
import TornEdge from '@/components/ui/TornEdge'
import HomepageLink from '@/components/ui/homepage-link'
import {
  CART_UPDATED_EVENT,
  cartItemCount,
  cartSubtotal,
  clearCart,
  formatMoney,
  readCart,
  removeCartItem,
  updateCartQuantity,
  type CartLine,
} from '@/lib/cart'
import { cartProducts } from '@/lib/cart-products'
import type { DeliveryQuote } from '@/lib/delivery'
import { announcementMessages, footer, navLinks } from '@/lib/kindred-home-data'

const ROUGH_BTN =
  'polygon(0% 10%, 4% 2%, 10% 8%, 17% 0%, 24% 8%, 31% 2%, 38% 10%, 45% 2%, 52% 8%, 59% 2%, 66% 8%, 73% 0%, 80% 10%, 87% 2%, 94% 8%, 100% 5%, 99% 50%, 100% 95%, 96% 100%, 89% 90%, 82% 100%, 75% 92%, 68% 100%, 61% 90%, 54% 100%, 47% 92%, 40% 100%, 33% 90%, 26% 100%, 19% 92%, 12% 100%, 5% 90%, 0% 95%, 1% 50%)'

const EDGE_COLORS = ['#C41E3A', '#F5C518', '#4CAF50'] as const

function useCartLines() {
  const [lines, setLines] = useState<CartLine[]>([])

  useEffect(() => {
    const sync = () => setLines(readCart())
    sync()
    window.addEventListener(CART_UPDATED_EVENT, sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener(CART_UPDATED_EVENT, sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  return lines
}

function QuantityButton({
  label,
  onClick,
  children,
}: {
  label: string
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="grid h-9 w-9 place-items-center border border-white/14 text-white transition-colors hover:border-[#F5C518] hover:text-[#F5C518]"
    >
      {children}
    </button>
  )
}

function CartHero({ count }: { count: number }) {
  return (
    <section className="relative overflow-hidden bg-[#050505] px-6 pb-16 pt-36 text-white md:px-8 md:pb-20 md:pt-40 lg:px-14">
      <div className="absolute inset-0 opacity-45">
        <Image
          src="https://images.pexels.com/photos/6210921/pexels-photo-6210921.jpeg?auto=compress&cs=tinysrgb&w=1800"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover grayscale"
        />
      </div>
      <div className="absolute inset-0 bg-black/76" />
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            'radial-gradient(circle at 16% 28%, rgba(196,30,58,0.28), transparent 26%), radial-gradient(circle at 78% 24%, rgba(245,197,24,0.16), transparent 28%), radial-gradient(circle at 55% 88%, rgba(76,175,80,0.18), transparent 34%)',
        }}
      />

      <div className="relative z-10 mx-auto grid max-w-[90rem] gap-10 lg:grid-cols-[0.95fr_0.8fr] lg:items-end">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-flex items-center gap-2 font-ui text-[12px] font-bold uppercase tracking-[0.24em] text-[#F5C518]">
            <ShoppingCart size={16} />
            Order cart
          </span>
          <h1 className="mt-5 max-w-5xl font-display text-[clamp(4.5rem,10vw,10rem)] font-light uppercase leading-[0.82]">
            Build the
            <br />
            <span className="text-[#C41E3A]">plate.</span>{' '}
            <span className="text-[#F5C518]">Hold</span>{' '}
            <span className="text-[#4CAF50]">the line.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/72 md:text-lg">
            Add menu favorites, check the count, and move to Stripe when the
            order is ready. Choose pickup or delivery, then let Stripe handle
            the secure checkout.
          </p>
        </motion.div>

        <motion.div
          className="border border-[#F5C518]/45 bg-black/54 p-6 shadow-[8px_10px_0_rgba(196,30,58,0.22)]"
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, delay: 0.12 }}
        >
          <p className="font-special text-[1.45rem] uppercase leading-tight text-[#4CAF50]">
            One love.
            <br />
            Hot food.
            <br />
            Yaad style.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="bg-[#F5C518] p-4 text-black">
              <p className="font-ui text-[11px] font-bold uppercase tracking-[0.18em]">
                Items
              </p>
              <p className="mt-2 font-display text-5xl font-light leading-none">
                {count}
              </p>
            </div>
            <div className="bg-[#1E6B1E] p-4 text-white">
              <p className="font-ui text-[11px] font-bold uppercase tracking-[0.18em]">
                Checkout
              </p>
              <p className="mt-3 flex items-center gap-2 font-ui text-[13px] font-bold uppercase tracking-[0.14em]">
                <LockKeyhole size={15} />
                Stripe
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function CartLineItem({ line }: { line: CartLine }) {
  return (
    <motion.article
      className="grid gap-4 border-b border-white/12 pb-6 md:grid-cols-[7.5rem_1fr_auto]"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      <div className="relative aspect-square overflow-hidden bg-white/8 shadow-[4px_5px_0_rgba(245,197,24,0.24)]">
        <Image
          src={line.image}
          alt={line.title}
          fill
          sizes="120px"
          className="object-cover"
        />
      </div>
      <div>
        <p className="font-ui text-[11px] font-bold uppercase tracking-[0.18em] text-[#F5C518]">
          {line.category}
        </p>
        <h2 className="mt-2 font-display text-[clamp(2.2rem,4vw,3.8rem)] font-light uppercase leading-[0.88] text-[#4CAF50]">
          {line.title}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-white/64">
          {line.description}
        </p>
        {line.selectedSides && line.selectedSides.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {line.selectedSides.map((side) => (
              <div
                key={side.id}
                className="inline-flex items-center gap-3 border border-[#F5C518]/30 bg-[#F5C518]/8 p-2 pr-4"
              >
                <span className="relative h-12 w-14 shrink-0 overflow-hidden">
                  <Image
                    src={side.image}
                    alt=""
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </span>
                <span>
                  <span className="block font-ui text-[9px] font-bold uppercase tracking-[0.16em] text-white/48">
                    Side choice
                  </span>
                  <span className="font-ui text-xs font-bold uppercase tracking-[0.1em] text-[#F5C518]">
                    {side.title}
                  </span>
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-col items-start gap-4 md:items-end">
        <p className="font-ui text-2xl font-bold text-[#F5C518]">
          {formatMoney(line.priceCents * line.quantity)}
        </p>
        <div className="flex items-center gap-2">
          <QuantityButton
            label={`Remove one ${line.title}`}
            onClick={() => updateCartQuantity(line.lineId, line.quantity - 1)}
          >
            <Minus size={15} />
          </QuantityButton>
          <span className="grid h-9 min-w-10 place-items-center bg-white px-3 font-ui text-sm font-bold text-black">
            {line.quantity}
          </span>
          <QuantityButton
            label={`Add one ${line.title}`}
            onClick={() => updateCartQuantity(line.lineId, line.quantity + 1)}
          >
            <Plus size={15} />
          </QuantityButton>
        </div>
        <button
          type="button"
          onClick={() => removeCartItem(line.lineId)}
          className="inline-flex items-center gap-2 font-ui text-[11px] font-bold uppercase tracking-[0.16em] text-white/44 transition-colors hover:text-[#C41E3A]"
        >
          <Trash2 size={14} />
          Remove
        </button>
      </div>
    </motion.article>
  )
}

function CartSummary({ lines }: { lines: CartLine[] }) {
  const [checkoutState, setCheckoutState] = useState<'idle' | 'loading'>('idle')
  const [fulfillment, setFulfillment] = useState<'pickup' | 'delivery'>(
    'pickup',
  )
  const [deliveryQuote, setDeliveryQuote] = useState<DeliveryQuote | null>(null)
  const [deliveryApartment, setDeliveryApartment] = useState('')
  const [message, setMessage] = useState('')
  const subtotal = cartSubtotal(lines)
  const deliveryFee =
    fulfillment === 'delivery' ? (deliveryQuote?.feeCents ?? 0) : 0
  const total = subtotal + deliveryFee

  useEffect(() => {
    const search = new URLSearchParams(window.location.search)
    if (search.get('checkout') === 'success') {
      const sessionId = search.get('session_id')
      setMessage('Payment complete. We will start lining up the order.')
      clearCart()

      if (sessionId) {
        fetch('/api/checkout/receipt', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId }),
        })
          .then(async (response) => {
            if (!response.ok) {
              const payload = (await response.json()) as { error?: string }
              throw new Error(
                payload.error ?? 'Receipt email could not be sent.',
              )
            }
            setMessage(
              'Payment complete. A Pot Rankinz receipt has been emailed.',
            )
          })
          .catch((error) => {
            setMessage(
              error instanceof Error
                ? `Payment complete, but ${error.message}`
                : 'Payment complete, but receipt email could not be sent.',
            )
          })
      }
    }
    if (search.get('checkout') === 'cancelled') {
      setMessage('Checkout was cancelled. Your cart is still here.')
    }
  }, [])

  const startCheckout = async () => {
    if (fulfillment === 'delivery' && !deliveryQuote) {
      setMessage('Select a verified address before starting delivery checkout.')
      return
    }

    setCheckoutState('loading')
    setMessage('')

    try {
      const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY

      if (!stripePublicKey) {
        throw new Error(
          'Stripe is installed. Add NEXT_PUBLIC_STRIPE_PUBLIC_KEY to enable checkout.',
        )
      }

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fulfillment,
          delivery:
            fulfillment === 'delivery' && deliveryQuote
              ? {
                  placeId: deliveryQuote.placeId,
                  apartment: deliveryApartment.trim(),
                }
              : undefined,
          items: lines.map((line) => ({
            id: line.id,
            quantity: line.quantity,
            selectedSideIds: line.selectedSides?.map((side) => side.id),
          })),
        }),
      })
      const payload = (await response.json()) as {
        id?: string
        url?: string
        error?: string
      }

      if (!response.ok || !payload.url) {
        throw new Error(payload.error ?? 'Checkout could not start.')
      }

      const stripe = await loadStripe(stripePublicKey)

      if (!stripe) {
        throw new Error('Stripe could not be loaded.')
      }

      window.location.href = payload.url
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : 'Checkout could not start.',
      )
      setCheckoutState('idle')
    }
  }

  return (
    <aside className="border border-[#F5C518]/35 bg-[#0D0A06] p-5 text-white shadow-[8px_10px_0_rgba(245,197,24,0.14)] md:p-6">
      <p className="font-ui text-[12px] font-bold uppercase tracking-[0.22em] text-[#F5C518]">
        Order check
      </p>
      <fieldset className="mt-6">
        <legend className="font-ui text-[11px] font-bold uppercase tracking-[0.18em] text-white/58">
          Pickup or delivery
        </legend>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {(
            [
              {
                id: 'pickup',
                label: 'Pickup',
                detail: 'Collect at the kitchen',
                Icon: ShoppingBag,
              },
              {
                id: 'delivery',
                label: 'Delivery',
                detail: '$0.85 per driving mile',
                Icon: Truck,
              },
            ] as const
          ).map(({ id, label, detail, Icon }) => {
            const selected = fulfillment === id

            return (
              <button
                key={id}
                type="button"
                aria-pressed={selected}
                onClick={() => {
                  setFulfillment(id)
                  setMessage('')
                }}
                className={`border p-3 text-left transition-colors ${
                  selected
                    ? 'border-[#F5C518] bg-[#F5C518] text-black'
                    : 'border-white/14 bg-white/[0.04] text-white hover:border-white/36'
                }`}
              >
                <span className="flex items-center gap-2 font-ui text-[12px] font-bold uppercase tracking-[0.12em]">
                  <Icon size={16} />
                  {label}
                </span>
                <span
                  className={`mt-2 block text-xs ${
                    selected ? 'text-black/62' : 'text-white/48'
                  }`}
                >
                  {detail}
                </span>
              </button>
            )
          })}
        </div>
        {fulfillment === 'delivery' && (
          <DeliveryAddressField
            quote={deliveryQuote}
            apartment={deliveryApartment}
            onApartmentChange={setDeliveryApartment}
            onQuoteChange={setDeliveryQuote}
          />
        )}
      </fieldset>
      <div className="mt-6 space-y-4 border-b border-white/12 pb-6">
        <div className="flex items-center justify-between gap-4">
          <span className="text-white/58">Subtotal</span>
          <span className="font-ui text-xl font-bold text-white">
            {formatMoney(subtotal)}
          </span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-white/58">Tax</span>
          <span className="text-sm text-white/56">At checkout</span>
        </div>
        {fulfillment === 'delivery' && (
          <div className="flex items-center justify-between gap-4">
            <span className="text-white/58">Delivery fee</span>
            <span className="text-sm text-white/72">
              {deliveryQuote ? formatMoney(deliveryFee) : 'Select an address'}
            </span>
          </div>
        )}
      </div>
      <div className="mt-6 flex items-center justify-between gap-4">
        <span className="font-ui text-[12px] font-bold uppercase tracking-[0.18em] text-white/62">
          Due today
        </span>
        <span className="font-display text-5xl font-light leading-none text-[#4CAF50]">
          {formatMoney(total)}
        </span>
      </div>
      <button
        type="button"
        disabled={
          lines.length === 0 ||
          checkoutState === 'loading' ||
          (fulfillment === 'delivery' && !deliveryQuote)
        }
        onClick={startCheckout}
        className="mt-7 inline-flex w-full items-center justify-center gap-2 bg-[#C41E3A] px-8 py-4 font-ui text-[13px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#F5C518] hover:text-black disabled:cursor-not-allowed disabled:bg-white/16 disabled:text-white/38"
        style={{ clipPath: ROUGH_BTN }}
      >
        {checkoutState === 'loading'
          ? 'Starting checkout'
          : `Checkout for ${fulfillment}`}
        <CreditCard size={16} />
      </button>
      {message && (
        <p className="mt-4 border border-white/10 bg-white/[0.055] p-3 text-sm leading-6 text-white/68">
          {message}
        </p>
      )}
      <div className="mt-6 flex flex-wrap gap-3">
        <HomepageLink
          href="/menu"
          className="inline-flex items-center gap-2 border-b border-white/30 pb-1 font-ui text-[12px] font-bold uppercase tracking-[0.14em] text-white/70"
        >
          Menu
          <UtensilsCrossed size={14} />
        </HomepageLink>
        {lines.length > 0 && (
          <button
            type="button"
            onClick={clearCart}
            className="border-b border-white/30 pb-1 font-ui text-[12px] font-bold uppercase tracking-[0.14em] text-white/70 transition-colors hover:text-[#C41E3A]"
          >
            Clear cart
          </button>
        )}
      </div>
    </aside>
  )
}

function Suggestions() {
  const picks = useMemo(() => cartProducts.slice(0, 4), [])

  return (
    <section className="bg-warm-white px-6 py-20 text-black md:px-8 md:py-24 lg:px-14">
      <div className="mx-auto max-w-[90rem]">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-ui text-[12px] font-bold uppercase tracking-[0.24em] text-[#C41E3A]">
              Build it bigger
            </p>
            <h2 className="mt-3 font-display text-[clamp(3.3rem,6vw,6.8rem)] font-light uppercase leading-[0.88]">
              Add a few staples
            </h2>
          </div>
          <HomepageLink
            href="/menu"
            className="inline-flex w-fit items-center gap-2 border-b border-black/30 pb-2 font-ui text-[12px] font-bold uppercase tracking-[0.16em] text-black/70"
          >
            Full menu
            <ArrowRight size={15} />
          </HomepageLink>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {picks.map((product, i) => (
            <motion.article
              key={product.id}
              className="group bg-[#050505] p-4 text-white shadow-[5px_7px_0_rgba(196,30,58,0.18)]"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-white/8">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="(min-width: 1024px) 22vw, 45vw"
                  className="object-cover grayscale transition-[filter,transform] duration-500 group-hover:grayscale-0"
                />
              </div>
              <h3 className="mt-4 font-display text-3xl font-light uppercase leading-none text-[#4CAF50]">
                {product.title}
              </h3>
              <div className="mt-4 flex items-center justify-between gap-3">
                <span className="font-ui text-lg font-bold text-[#F5C518]">
                  {product.price}
                </span>
                <AddToCartButton product={product} />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function CartPage() {
  const lines = useCartLines()
  const count = cartItemCount(lines)

  return (
    <main className="overflow-x-hidden bg-[#050505] pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-0">
      <AnnouncementBar messages={announcementMessages} />
      <Header leftLinks={navLinks.left} rightLinks={navLinks.right} />
      <CartHero count={count} />
      <TornEdge variant={1} fill={EDGE_COLORS[0]} />
      <section className="bg-[#050505] px-6 py-16 text-white md:px-8 md:py-24 lg:px-14">
        <div className="mx-auto grid max-w-[90rem] gap-10 lg:grid-cols-[1fr_24rem]">
          <div>
            <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="font-ui text-[12px] font-bold uppercase tracking-[0.24em] text-[#F5C518]">
                  Cart
                </p>
                <h2 className="mt-3 font-display text-[clamp(3rem,6vw,6.6rem)] font-light uppercase leading-[0.88]">
                  Your order
                </h2>
              </div>
              <p className="font-special text-[1.2rem] uppercase leading-tight text-[#4CAF50]">
                {count} item{count === 1 ? '' : 's'} in the bag.
              </p>
            </div>
            {lines.length > 0 ? (
              <div className="grid gap-6">
                {lines.map((line) => (
                  <CartLineItem key={line.lineId} line={line} />
                ))}
              </div>
            ) : (
              <div className="border border-white/10 bg-white/[0.055] p-8">
                <p className="font-display text-4xl font-light uppercase leading-none text-[#4CAF50]">
                  Your cart is waiting.
                </p>
                <p className="mt-4 max-w-xl text-sm leading-6 text-white/62">
                  Start with a main plate, add a side, then come back here for
                  checkout.
                </p>
                <HomepageLink
                  href="/menu"
                  className="mt-6 inline-flex items-center gap-2 bg-[#F5C518] px-7 py-3 font-ui text-[12px] font-bold uppercase tracking-[0.16em] text-black"
                  style={{ clipPath: ROUGH_BTN }}
                >
                  View menu
                  <ArrowRight size={15} />
                </HomepageLink>
              </div>
            )}
          </div>
          <CartSummary lines={lines} />
        </div>
      </section>
      <TornEdge variant={2} fill={EDGE_COLORS[1]} />
      <Suggestions />
      <Footer {...footer} />
      <MobileBottomBar />
    </main>
  )
}
