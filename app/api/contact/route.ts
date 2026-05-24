import { NextResponse } from 'next/server'

import { sendCustomerAndOwnerEmail } from '@/lib/email'
import {
  contactEmailTemplate,
  type ContactEmailData,
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
      { error: 'Invalid contact payload.' },
      { status: 400 },
    )
  }

  const data: ContactEmailData = {
    name: value(body.name),
    email: value(body.email),
    phone: value(body.phone),
    inquiryType: value(body.inquiryType),
    message: value(body.message),
  }

  if (!data.name || !isEmail(data.email) || !data.message) {
    return NextResponse.json(
      { error: 'Name, email, and message are required.' },
      { status: 400 },
    )
  }

  try {
    await sendCustomerAndOwnerEmail({
      customerEmail: data.email,
      subject: `Pot Rankinz contact inquiry from ${data.name}`,
      html: contactEmailTemplate(data),
      replyTo: data.email,
    })
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Contact email could not be sent.',
      },
      { status: 500 },
    )
  }

  return NextResponse.json({ ok: true })
}
