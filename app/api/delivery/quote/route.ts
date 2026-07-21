import { NextResponse } from 'next/server'

import { getDeliveryQuote } from '@/lib/delivery-server'

export async function POST(request: Request) {
  let body: { placeId?: string }

  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: 'Invalid address request.' },
      { status: 400 },
    )
  }

  if (!body.placeId) {
    return NextResponse.json(
      { error: 'Select a verified delivery address.' },
      { status: 400 },
    )
  }

  try {
    const quote = await getDeliveryQuote(body.placeId)
    return NextResponse.json({ quote })
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Delivery could not be calculated.',
      },
      { status: 502 },
    )
  }
}
