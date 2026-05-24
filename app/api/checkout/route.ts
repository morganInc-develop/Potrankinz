import { NextResponse } from 'next/server'
import Stripe from 'stripe'

import { cartProductsById } from '@/lib/cart-products'
import { absoluteUrl } from '@/lib/site'

interface CheckoutLine {
  id: string
  quantity: number
}

export async function POST(request: Request) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY

  if (!stripeSecretKey) {
    return NextResponse.json(
      {
        error:
          'Stripe is installed. Add STRIPE_SECRET_KEY to enable checkout sessions.',
      },
      { status: 503 },
    )
  }

  let body: { items?: CheckoutLine[] }

  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: 'Invalid checkout payload.' },
      { status: 400 },
    )
  }

  const items = Array.isArray(body.items) ? body.items : []
  const lineItems = items
    .map((line) => {
      const product = cartProductsById.get(line.id)
      const quantity = Math.max(1, Math.min(99, Math.floor(line.quantity)))

      if (!product || !Number.isFinite(quantity)) return null

      return {
        quantity,
        price_data: {
          currency: 'usd',
          unit_amount: product.priceCents,
          product_data: {
            name: product.title,
            description: product.description,
            images: [absoluteUrl(product.image)],
          },
        },
      }
    })
    .filter((line): line is NonNullable<typeof line> => Boolean(line))

  if (lineItems.length === 0) {
    return NextResponse.json(
      { error: 'Add items before checkout.' },
      { status: 400 },
    )
  }

  const origin =
    request.headers.get('origin') ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    'http://localhost:3000'

  const stripe = new Stripe(stripeSecretKey)
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: lineItems,
    customer_creation: 'if_required',
    phone_number_collection: {
      enabled: true,
    },
    success_url: `${origin}/cart?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/cart?checkout=cancelled`,
    metadata: {
      source: 'potrankinz-cart',
    },
  })

  return NextResponse.json({ id: session.id, url: session.url })
}
