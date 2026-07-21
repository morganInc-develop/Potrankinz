import { NextResponse } from 'next/server'
import Stripe from 'stripe'

import { sendCustomerAndOwnerEmail } from '@/lib/email'
import {
  receiptEmailTemplate,
  type ReceiptEmailItem,
} from '@/lib/email-templates'

function formatMoney(cents: number, currency = 'usd') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(cents / 100)
}

function productImage(
  product: Stripe.Product | Stripe.DeletedProduct | string | null | undefined,
) {
  if (!product || typeof product === 'string') return undefined
  if (product.deleted) return undefined
  return product.images[0]
}

export async function POST(request: Request) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY

  if (!stripeSecretKey) {
    return NextResponse.json(
      { error: 'STRIPE_SECRET_KEY is required to send checkout receipts.' },
      { status: 503 },
    )
  }

  let body: { sessionId?: string }

  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: 'Invalid receipt payload.' },
      { status: 400 },
    )
  }

  if (!body.sessionId) {
    return NextResponse.json(
      { error: 'Checkout session id is required.' },
      { status: 400 },
    )
  }

  const stripe = new Stripe(stripeSecretKey)
  const session = await stripe.checkout.sessions.retrieve(body.sessionId)

  if (session.metadata?.source !== 'potrankinz-cart') {
    return NextResponse.json(
      { error: 'Checkout session is not a Pot Rankinz cart order.' },
      { status: 400 },
    )
  }

  if (session.payment_status !== 'paid') {
    return NextResponse.json(
      { error: 'Payment is not complete yet.' },
      { status: 409 },
    )
  }

  if (session.metadata?.receipt_email_sent === 'true') {
    return NextResponse.json({ ok: true, sent: false })
  }

  const customerEmail =
    session.customer_details?.email ?? session.customer_email

  if (!customerEmail) {
    return NextResponse.json(
      { error: 'Stripe did not return a customer email for this order.' },
      { status: 400 },
    )
  }

  const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
    limit: 100,
    expand: ['data.price.product'],
  })

  const currency = session.currency ?? 'usd'
  const items: ReceiptEmailItem[] = lineItems.data.map((item) => ({
    title: item.description ?? 'Pot Rankinz item',
    quantity: item.quantity ?? 1,
    amount: formatMoney(item.amount_total, item.currency ?? currency),
    image: productImage(item.price?.product),
  }))
  const isDelivery = session.metadata?.fulfillment === 'delivery'
  const fulfillment = isDelivery ? 'Delivery' : 'Pickup'
  const receiptData = {
    customerName:
      session.metadata?.delivery_contact_name ||
      session.customer_details?.name ||
      undefined,
    customerEmail,
    contactPhone:
      session.metadata?.delivery_contact_phone ||
      session.customer_details?.phone ||
      undefined,
    orderId: session.id,
    fulfillment,
    deliveryAddress: isDelivery
      ? session.metadata?.delivery_address || undefined
      : undefined,
    deliveryApartment: isDelivery
      ? session.metadata?.delivery_apartment || undefined
      : undefined,
    deliveryDistance:
      isDelivery && session.metadata?.delivery_distance_miles
        ? `${session.metadata.delivery_distance_miles} straight-line miles from the delivery origin`
        : undefined,
    deliveryFee:
      isDelivery && session.metadata?.delivery_fee_cents
        ? formatMoney(Number(session.metadata.delivery_fee_cents), currency)
        : undefined,
    total: formatMoney(session.amount_total ?? 0, currency),
    items,
  }

  try {
    await sendCustomerAndOwnerEmail({
      customerEmail,
      subject: `Your Pot Rankinz ${fulfillment.toLowerCase()} order is confirmed`,
      html: receiptEmailTemplate({
        ...receiptData,
        audience: 'customer',
      }),
      ownerSubject: `New paid ${fulfillment.toLowerCase()} order — ${session.id}`,
      ownerHtml: receiptEmailTemplate({
        ...receiptData,
        audience: 'owner',
      }),
    })

    await stripe.checkout.sessions.update(session.id, {
      metadata: {
        ...session.metadata,
        receipt_email_sent: 'true',
        receipt_email_sent_at: new Date().toISOString(),
      },
    })
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Receipt email could not be sent.',
      },
      { status: 500 },
    )
  }

  return NextResponse.json({ ok: true, sent: true })
}
