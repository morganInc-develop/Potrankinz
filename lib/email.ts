import { Resend } from 'resend'

const OWNER_EMAILS = ['morganinc5680@gmail.com', 'Potrankinz@gmail.com']
const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ?? 'Pot Rankinz Kitchen <onboarding@resend.dev>'
const IS_TEST_SENDER = FROM_EMAIL.includes('@resend.dev')
const TEST_RECIPIENT_EMAIL =
  process.env.RESEND_TEST_RECIPIENT_EMAIL ?? 'morganinc5680@gmail.com'

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
  const deliveries = IS_TEST_SENDER
    ? [
        {
          to: TEST_RECIPIENT_EMAIL,
          subject: `[TEST] ${subject}`,
          html: `
            <p style="font:14px Arial,sans-serif;line-height:1.6;color:#16110d;">
              <strong>Resend test mode:</strong> this email would normally be sent to
              ${recipients.join(', ')}. It was routed to ${TEST_RECIPIENT_EMAIL}
              because RESEND_FROM_EMAIL is not set to a verified sending domain.
            </p>
            <hr style="border:0;border-top:1px solid #eadfca;margin:18px 0;">
            ${html}
          `,
        },
      ]
    : recipients.map((to) => ({ to, subject, html }))

  const results = await Promise.all(
    deliveries.map(async (delivery) => {
      const result = await resend.emails.send({
        from: FROM_EMAIL,
        to: delivery.to,
        subject: delivery.subject,
        html: delivery.html,
        replyTo: replyTo ? [replyTo] : undefined,
      })

      if (result.error) {
        throw new Error(
          `Resend rejected email to ${delivery.to}: ${result.error.message}`,
        )
      }

      return result.data.id
    }),
  )

  return results
}
