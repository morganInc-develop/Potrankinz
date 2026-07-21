import { NextResponse } from 'next/server'
import Stripe from 'stripe'

import {
  AddressVerificationUnavailableError,
  DeliveryConfigurationError,
  verifyDeliveryAddress,
} from '@/lib/address-verification'
import { cartProductsById } from '@/lib/cart-products'
import {
  confirmedDeliverySchema,
  normalizeAddressForComparison,
  normalizeDeliveryDetails,
  type AddressVerificationResult,
  type ConfirmedDeliveryDetails,
} from '@/lib/delivery'
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
    delivery?: unknown
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

  let deliveryDetails: ConfirmedDeliveryDetails | undefined
  let deliveryMatch: AddressVerificationResult | undefined

  if (fulfillment === 'delivery') {
    const parsedDelivery = confirmedDeliverySchema.safeParse(body.delivery)

    if (!parsedDelivery.success) {
      return NextResponse.json(
        {
          error:
            parsedDelivery.error.issues[0]?.message ??
            'Check and confirm the delivery details.',
        },
        { status: 400 },
      )
    }

    const normalizedDetails = normalizeDeliveryDetails(parsedDelivery.data)
    deliveryDetails = {
      ...normalizedDetails,
      confirmedAddress: parsedDelivery.data.confirmedAddress.trim(),
    }

    try {
      deliveryMatch =
        (await verifyDeliveryAddress(normalizedDetails)) ?? undefined
    } catch (error) {
      if (error instanceof DeliveryConfigurationError) {
        return NextResponse.json({ error: error.message }, { status: 503 })
      }

      if (error instanceof AddressVerificationUnavailableError) {
        return NextResponse.json(
          {
            error:
              'The address checker is temporarily unavailable. Please try checkout again in a moment.',
          },
          { status: 502 },
        )
      }

      return NextResponse.json(
        { error: 'The delivery address could not be verified.' },
        { status: 500 },
      )
    }

    if (!deliveryMatch) {
      return NextResponse.json(
        {
          error:
            'We could not match that delivery address. Check it again before checkout.',
        },
        { status: 422 },
      )
    }

    if (
      normalizeAddressForComparison(deliveryMatch.matchedAddress) !==
      normalizeAddressForComparison(deliveryDetails.confirmedAddress)
    ) {
      return NextResponse.json(
        {
          error:
            'The delivery address changed after confirmation. Check and confirm it again.',
        },
        { status: 409 },
      )
    }

    if (deliveryMatch.withinDeliveryArea === false) {
      return NextResponse.json(
        {
          error: `This address is outside the ${deliveryMatch.maxDistanceMiles}-mile delivery area.`,
        },
        { status: 422 },
      )
    }
  }

  const deliveryAddress = deliveryMatch?.matchedAddress ?? ''

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
      enabled: fulfillment === 'pickup',
    },
    custom_text: {
      submit: {
        message:
          fulfillment === 'delivery'
            ? `Delivery address verified: ${deliveryAddress}. We will contact ${deliveryDetails?.contactName} if the driver needs help.`
            : 'This order is marked for pickup at Pot Rankinz Kitchen.',
      },
    },
    success_url: `${origin}/cart?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/cart?checkout=cancelled`,
    metadata: {
      source: 'potrankinz-cart',
      fulfillment,
      delivery_address: fulfillment === 'delivery' ? deliveryAddress : '',
      delivery_apartment:
        fulfillment === 'delivery' ? (deliveryDetails?.apartment ?? '') : '',
      delivery_contact_name:
        fulfillment === 'delivery' ? (deliveryDetails?.contactName ?? '') : '',
      delivery_contact_phone:
        fulfillment === 'delivery' ? (deliveryDetails?.contactPhone ?? '') : '',
      delivery_latitude:
        fulfillment === 'delivery'
          ? String(deliveryMatch?.coordinates.latitude ?? '')
          : '',
      delivery_longitude:
        fulfillment === 'delivery'
          ? String(deliveryMatch?.coordinates.longitude ?? '')
          : '',
      delivery_distance_miles:
        fulfillment === 'delivery' && deliveryMatch?.distanceMiles !== undefined
          ? deliveryMatch.distanceMiles.toFixed(2)
          : '',
      delivery_distance_basis:
        fulfillment === 'delivery' && deliveryMatch?.distanceMiles !== undefined
          ? 'straight-line'
          : '',
      delivery_max_distance_miles:
        fulfillment === 'delivery' &&
        deliveryMatch?.maxDistanceMiles !== undefined
          ? String(deliveryMatch.maxDistanceMiles)
          : '',
      delivery_fee_cents: '',
    },
  })

  return NextResponse.json({ id: session.id, url: session.url })
}
