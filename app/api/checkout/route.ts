import { NextResponse } from 'next/server'
import Stripe from 'stripe'

import { cartProductsById } from '@/lib/cart-products'
import { getDeliveryQuote } from '@/lib/delivery-server'
import { menuItems } from '@/lib/kindred-home-data'
import { absoluteUrl } from '@/lib/site'

interface CheckoutLine {
  id: string
  quantity: number
  selectedSideId?: string
}

type Fulfillment = 'pickup' | 'delivery'

interface DeliverySelection {
  placeId?: string
  apartment?: string
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
  const lineItems = items
    .map((line) => {
      const product = cartProductsById.get(line.id)
      const quantity = Math.max(1, Math.min(99, Math.floor(line.quantity)))
      const selectedSide = menuItems.find(
        (item) => item.id === line.selectedSideId && item.category === 'sides',
      )

      if (!product || !Number.isFinite(quantity)) return null

      return {
        quantity,
        price_data: {
          currency: 'usd',
          unit_amount: product.priceCents,
          product_data: {
            name: selectedSide
              ? `${product.title} — ${selectedSide.title}`
              : product.title,
            description: selectedSide
              ? `${product.description} Side choice: ${selectedSide.title}.`
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

  let deliveryQuote = null

  if (fulfillment === 'delivery') {
    if (!body.delivery?.placeId) {
      return NextResponse.json(
        { error: 'Select a verified delivery address.' },
        { status: 400 },
      )
    }

    try {
      deliveryQuote = await getDeliveryQuote(body.delivery.placeId)
    } catch (error) {
      return NextResponse.json(
        {
          error:
            error instanceof Error
              ? error.message
              : 'Delivery could not be calculated.',
        },
        { status: 400 },
      )
    }

    lineItems.push({
      quantity: 1,
      price_data: {
        currency: 'usd',
        unit_amount: deliveryQuote.feeCents,
        product_data: {
          name: 'Delivery fee',
          description: `${deliveryQuote.distanceMiles.toFixed(1)} driving miles at $0.85 per mile`,
          images: [],
        },
      },
    })
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
            ? `Delivery to ${deliveryQuote?.address ?? 'your verified address'} is included with this order.`
            : 'This order is marked for pickup at Pot Rankinz Kitchen.',
      },
    },
    success_url: `${origin}/cart?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/cart?checkout=cancelled`,
    metadata: {
      source: 'potrankinz-cart',
      fulfillment,
      delivery_address: deliveryQuote?.address ?? '',
      delivery_apartment: body.delivery?.apartment?.trim().slice(0, 80) ?? '',
      delivery_distance_miles: deliveryQuote
        ? deliveryQuote.distanceMiles.toFixed(1)
        : '',
      delivery_fee_cents: deliveryQuote ? String(deliveryQuote.feeCents) : '',
    },
  })

  return NextResponse.json({ id: session.id, url: session.url })
}
