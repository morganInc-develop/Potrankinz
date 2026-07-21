import { NextResponse } from 'next/server'

import {
  AddressVerificationUnavailableError,
  DeliveryConfigurationError,
  verifyDeliveryAddress,
} from '@/lib/address-verification'
import { deliveryDetailsSchema } from '@/lib/delivery'

export async function POST(request: Request) {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: 'Enter the delivery details before checking the address.' },
      { status: 400 },
    )
  }

  const parsed = deliveryDetailsSchema.safeParse(body)

  if (!parsed.success) {
    const issue = parsed.error.issues[0]
    return NextResponse.json(
      {
        error: issue?.message ?? 'Check the delivery details and try again.',
        field: issue?.path[0],
      },
      { status: 400 },
    )
  }

  try {
    const match = await verifyDeliveryAddress(parsed.data)

    if (!match) {
      return NextResponse.json(
        {
          error:
            'We could not match that address. Check the street number, city, state, and ZIP code.',
        },
        { status: 422 },
      )
    }

    return NextResponse.json(match)
  } catch (error) {
    if (error instanceof DeliveryConfigurationError) {
      return NextResponse.json({ error: error.message }, { status: 503 })
    }

    if (error instanceof AddressVerificationUnavailableError) {
      return NextResponse.json(
        {
          error:
            'The address checker is temporarily unavailable. Please wait a moment and try again.',
        },
        { status: 502 },
      )
    }

    return NextResponse.json(
      { error: 'The address could not be checked right now.' },
      { status: 500 },
    )
  }
}
