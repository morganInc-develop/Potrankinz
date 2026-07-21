import { Resend } from 'resend'

const OWNER_EMAILS = ['Potrankinz@gmail.com', 'morganinc5680@gmail.com']
const VERIFIED_SENDER_DOMAIN = '@potrankinz.com'
const DEFAULT_FROM_EMAIL = `Pot Rankinz Kitchen <hello${VERIFIED_SENDER_DOMAIN}>`

function resolveFromEmail() {
  const configured = process.env.RESEND_FROM_EMAIL?.trim()

  if (configured?.toLowerCase().includes(VERIFIED_SENDER_DOMAIN)) {
    return configured
  }

  return DEFAULT_FROM_EMAIL
}

const FROM_EMAIL = resolveFromEmail()

function uniqueEmails(emails: string[]) {
  return Array.from(
    new Set(emails.map((email) => email.trim()).filter(Boolean)),
  )
}

export function requireResend() {
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    throw new Error('RESEND_API_KEY is required to send email.')
  }

  return new Resend(apiKey)
}

export async function sendCustomerAndOwnerEmail({
  customerEmail,
  subject,
  html,
  ownerSubject,
  ownerHtml,
  replyTo,
}: {
  customerEmail: string
  subject: string
  html: string
  ownerSubject?: string
  ownerHtml?: string
  replyTo?: string
}) {
  const resend = requireResend()
  const normalizedCustomerEmail = customerEmail.trim()
  const ownerRecipients = uniqueEmails(OWNER_EMAILS).filter(
    (email) => email.toLowerCase() !== normalizedCustomerEmail.toLowerCase(),
  )
  const [primaryOwnerEmail, ...additionalOwnerEmails] = ownerRecipients
  const messages = [
    {
      to: normalizedCustomerEmail,
      subject,
      html,
      bcc: [] as string[],
    },
    ...(primaryOwnerEmail
      ? [
          {
            to: primaryOwnerEmail,
            subject: ownerSubject ?? subject,
            html: ownerHtml ?? html,
            bcc: additionalOwnerEmails,
          },
        ]
      : []),
  ]

  const results = await Promise.all(
    messages.map(async (message) => {
      const result = await resend.emails.send({
        from: FROM_EMAIL,
        to: message.to,
        subject: message.subject,
        html: message.html,
        bcc: message.bcc.length > 0 ? message.bcc : undefined,
        replyTo: replyTo ? [replyTo] : undefined,
      })

      if (result.error) {
        throw new Error(
          `Resend rejected email to ${message.to}: ${result.error.message}`,
        )
      }

      return result.data.id
    }),
  )

  return results
}
