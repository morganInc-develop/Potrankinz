import { NextResponse } from 'next/server'

import { sendCustomerAndOwnerEmail } from '@/lib/email'
import {
  bookingEmailTemplate,
  type BookingEmailData,
} from '@/lib/email-templates'

function value(input: unknown) {
  return typeof input === 'string' ? input.trim() : ''
}

function isEmail(input: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input)
}

export async function POST(request: Request) {
  let body: Record<string, unknown>

  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: 'Invalid booking payload.' },
      { status: 400 },
    )
  }

  const data: BookingEmailData = {
    name: value(body.name),
    email: value(body.email),
    phone: value(body.phone),
    service: value(body.service),
    eventDate: value(body.eventDate),
    guestCount: value(body.guestCount),
    location: value(body.location),
    notes: value(body.notes),
  }

  if (!data.name || !isEmail(data.email) || !data.notes) {
    return NextResponse.json(
      { error: 'Name, email, and notes are required.' },
      { status: 400 },
    )
  }

  try {
    await sendCustomerAndOwnerEmail({
      customerEmail: data.email,
      subject: `Pot Rankinz booking request from ${data.name}`,
      html: bookingEmailTemplate(data),
      replyTo: data.email,
    })
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Booking email could not be sent.',
      },
      { status: 500 },
    )
  }

  return NextResponse.json({ ok: true })
}
