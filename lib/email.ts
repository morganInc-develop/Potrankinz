import { Resend } from 'resend'

const OWNER_EMAILS = ['morganinc5680@gmail.com', 'Potrankinz@gmail.com']
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
  replyTo,
}: {
  customerEmail: string
  subject: string
  html: string
  replyTo?: string
}) {
  const resend = requireResend()
  const recipients = uniqueEmails([customerEmail, ...OWNER_EMAILS])

  const results = await Promise.all(
    recipients.map(async (to) => {
      const result = await resend.emails.send({
        from: FROM_EMAIL,
        to,
        subject,
        html,
        replyTo: replyTo ? [replyTo] : undefined,
      })

      if (result.error) {
        throw new Error(
          `Resend rejected email to ${to}: ${result.error.message}`,
        )
      }

      return result.data.id
    }),
  )

  return results
}
