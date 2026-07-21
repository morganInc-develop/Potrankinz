import { NextResponse } from 'next/server'
import Stripe from 'stripe'

import { cartProductsById } from '@/lib/cart-products'
import { menuItems } from '@/lib/kindred-home-data'
import {
  hasValidSideCombination,
  sideIsAllowedForProduct,
} from '@/lib/side-options'
import { absoluteUrl } from '@/lib/site'

interface CheckoutLine {
  id: string
  quantity: number
  selectedSideIds?: string[]
}

type Fulfillment = 'pickup' | 'delivery'

interface DeliverySelection {
  address?: string
  apartment?: string
}

function checkoutSideIds(line: CheckoutLine) {
  return Array.isArray(line.selectedSideIds)
    ? line.selectedSideIds.filter(
        (sideId): sideId is string => typeof sideId === 'string',
      )
    : []
}

function productNeedsSides(category: string, productId: string) {
  return (
    category === 'mains' ||
    category === 'vegan' ||
    (category === 'breakfast' && productId !== 'cornmeal-porridge')
  )
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

  let body: {
    items?: CheckoutLine[]
    fulfillment?: Fulfillment
    delivery?: DeliverySelection
  }

  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: 'Invalid checkout payload.' },
      { status: 400 },
    )
  }

  const items = Array.isArray(body.items) ? body.items : []
  const fulfillment: Fulfillment =
    body.fulfillment === 'delivery' ? 'delivery' : 'pickup'

  for (const line of items) {
    const product = cartProductsById.get(line.id)
    if (!product || !productNeedsSides(product.category, product.id)) continue

    const sideIds = checkoutSideIds(line)
    const sidesExist = sideIds.every((sideId) =>
      menuItems.some((item) => item.id === sideId && item.category === 'sides'),
    )
    const sidesAreAllowed = sideIds.every((sideId) =>
      sideIsAllowedForProduct({
        sideId,
        productId: product.id,
        productCategory: product.category,
      }),
    )

    if (!hasValidSideCombination(sideIds) || !sidesExist || !sidesAreAllowed) {
      return NextResponse.json(
        {
          error: `${product.title} requires at least one side and allows no more than one starch plus one vegetable.`,
        },
        { status: 400 },
      )
    }
  }

  const lineItems = items
    .map((line) => {
      const product = cartProductsById.get(line.id)
      const quantity = Math.max(1, Math.min(99, Math.floor(line.quantity)))
      const selectedSideIds = checkoutSideIds(line)
      const selectedSides = selectedSideIds
        .map((sideId) =>
          menuItems.find(
            (item) => item.id === sideId && item.category === 'sides',
          ),
        )
        .filter((side): side is NonNullable<typeof side> => Boolean(side))
      const sideNames = selectedSides.map((side) => side.title).join(' + ')

      if (!product || !Number.isFinite(quantity)) return null

      return {
        quantity,
        price_data: {
          currency: 'usd',
          unit_amount: product.priceCents,
          product_data: {
            name: sideNames ? `${product.title} — ${sideNames}` : product.title,
            description: sideNames
              ? `${product.description} Side choices: ${sideNames}.`
              : product.description,
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

  const deliveryAddress = body.delivery?.address?.trim().slice(0, 240) ?? ''

  if (fulfillment === 'delivery') {
    if (deliveryAddress.length < 8) {
      return NextResponse.json(
        { error: 'Enter the full delivery address.' },
        { status: 400 },
      )
    }
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
    custom_text: {
      submit: {
        message:
          fulfillment === 'delivery'
            ? `We will confirm delivery availability and any delivery charge for ${deliveryAddress} after checkout.`
            : 'This order is marked for pickup at Pot Rankinz Kitchen.',
      },
    },
    success_url: `${origin}/cart?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/cart?checkout=cancelled`,
    metadata: {
      source: 'potrankinz-cart',
      fulfillment,
      delivery_address: fulfillment === 'delivery' ? deliveryAddress : '',
      delivery_apartment: body.delivery?.apartment?.trim().slice(0, 80) ?? '',
      delivery_distance_miles: '',
      delivery_fee_cents: '',
    },
  })

  return NextResponse.json({ id: session.id, url: session.url })
}
