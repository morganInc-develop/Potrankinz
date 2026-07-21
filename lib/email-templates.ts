import { absoluteAssetUrl, SITE_URL } from '@/lib/site'

export interface ContactEmailData {
  name: string
  email: string
  phone?: string
  inquiryType?: string
  message: string
}

export interface BookingEmailData {
  name: string
  email: string
  phone?: string
  service?: string
  eventDate?: string
  guestCount?: string
  location?: string
  notes: string
}

export interface ReceiptEmailItem {
  title: string
  quantity: number
  amount: string
  image?: string
}

export interface ReceiptEmailData {
  customerName?: string
  customerEmail: string
  orderId: string
  fulfillment?: string
  deliveryAddress?: string
  deliveryDistance?: string
  deliveryFee?: string
  total: string
  items: ReceiptEmailItem[]
}

type Detail = [string, string | undefined]

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function detailRows(details: Detail[]) {
  return details
    .filter(([, value]) => value && value.trim().length > 0)
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid #eadfca;color:#6d5e4f;font:700 11px Arial,sans-serif;text-transform:uppercase;letter-spacing:1.5px;width:34%;">${escapeHtml(label)}</td>
          <td style="padding:12px 0;border-bottom:1px solid #eadfca;color:#16110d;font:400 15px Arial,sans-serif;line-height:1.5;">${escapeHtml(value ?? '')}</td>
        </tr>
      `,
    )
    .join('')
}

function emailLayout({
  eyebrow,
  title,
  preview,
  heroImage,
  children,
}: {
  eyebrow: string
  title: string
  preview: string
  heroImage: string
  children: string
}) {
  const logo = absoluteAssetUrl('/hero-chefs/cutouts/pot-rankinz-logo.png')

  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="x-apple-disable-message-reformatting">
    <title>${escapeHtml(title)}</title>
  </head>
  <body style="margin:0;background:#050505;padding:0;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeHtml(preview)}</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#050505;">
      <tr>
        <td align="center" style="padding:28px 12px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px;background:#fff8ea;border:1px solid #2b241b;">
            <tr>
              <td style="background:#0d0a06;padding:18px 22px;border-bottom:4px solid #f5c518;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                  <tr>
                    <td style="vertical-align:middle;">
                      <img src="${logo}" width="58" height="58" alt="Pot Rankinz Kitchen" style="display:block;border:0;object-fit:contain;">
                    </td>
                    <td align="right" style="vertical-align:middle;color:#f5c518;font:700 12px Arial,sans-serif;text-transform:uppercase;letter-spacing:2px;">
                      Pot Rankinz Kitchen
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td>
                <img src="${absoluteAssetUrl(heroImage)}" width="680" alt="" style="display:block;width:100%;max-width:680px;height:250px;object-fit:cover;border:0;">
              </td>
            </tr>
            <tr>
              <td style="padding:30px 26px 8px;">
                <div style="color:#c41e3a;font:700 12px Arial,sans-serif;text-transform:uppercase;letter-spacing:2.4px;">${escapeHtml(eyebrow)}</div>
                <h1 style="margin:10px 0 0;color:#15110d;font:400 42px Georgia,serif;line-height:.95;text-transform:uppercase;letter-spacing:0;">${escapeHtml(title)}</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:12px 26px 30px;">
                ${children}
              </td>
            </tr>
            <tr>
              <td style="background:#0d0a06;padding:22px 26px;color:#fff8ea;">
                <p style="margin:0;color:#4caf50;font:700 12px Arial,sans-serif;text-transform:uppercase;letter-spacing:2px;">One love. Hot food. Yaad style.</p>
                <p style="margin:10px 0 0;color:#ffffffa8;font:400 13px Arial,sans-serif;line-height:1.6;">Florida and beyond | <a href="${SITE_URL}" style="color:#f5c518;text-decoration:none;">potrankinz.vercel.app</a></p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`
}

export function contactEmailTemplate(data: ContactEmailData) {
  return emailLayout({
    eyebrow: 'Contact inquiry',
    title: 'We received your note',
    preview: `Pot Rankinz received a contact inquiry from ${data.name}.`,
    heroImage: '/menu-images/ackee-saltfish.jpg',
    children: `
      <p style="margin:0 0 18px;color:#3a3026;font:400 16px Arial,sans-serif;line-height:1.65;">Thanks for reaching out. The kitchen team will review the details and follow up within 24 hours.</p>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-top:4px solid #4caf50;">
        ${detailRows([
          ['Name', data.name],
          ['Email', data.email],
          ['Phone', data.phone],
          ['Inquiry', data.inquiryType],
          ['Message', data.message],
        ])}
      </table>
    `,
  })
}

export function bookingEmailTemplate(data: BookingEmailData) {
  return emailLayout({
    eyebrow: 'Booking request',
    title: 'Your event request is in',
    preview: `Pot Rankinz received a booking request from ${data.name}.`,
    heroImage: '/menu-images/jerk-chicken.jpg',
    children: `
      <p style="margin:0 0 18px;color:#3a3026;font:400 16px Arial,sans-serif;line-height:1.65;">We have the basics for your event. We will follow up with availability, menu direction, and next steps.</p>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-top:4px solid #f5c518;">
        ${detailRows([
          ['Name', data.name],
          ['Email', data.email],
          ['Phone', data.phone],
          ['Service', data.service],
          ['Event date', data.eventDate],
          ['Guest count', data.guestCount],
          ['Location', data.location],
          ['Notes', data.notes],
        ])}
      </table>
    `,
  })
}

export function receiptEmailTemplate(data: ReceiptEmailData) {
  const items = data.items
    .map(
      (item) => `
        <tr>
          <td style="padding:14px 0;border-bottom:1px solid #eadfca;width:72px;">
            ${
              item.image
                ? `<img src="${absoluteAssetUrl(item.image)}" width="58" height="58" alt="" style="display:block;width:58px;height:58px;object-fit:cover;border:0;">`
                : ''
            }
          </td>
          <td style="padding:14px 12px;border-bottom:1px solid #eadfca;">
            <div style="color:#16110d;font:700 15px Arial,sans-serif;line-height:1.35;">${escapeHtml(item.title)}</div>
            <div style="margin-top:4px;color:#6d5e4f;font:400 13px Arial,sans-serif;">Qty ${item.quantity}</div>
          </td>
          <td align="right" style="padding:14px 0;border-bottom:1px solid #eadfca;color:#c41e3a;font:700 15px Arial,sans-serif;">${escapeHtml(item.amount)}</td>
        </tr>
      `,
    )
    .join('')

  return emailLayout({
    eyebrow: 'Order receipt',
    title: 'Payment received',
    preview: `Pot Rankinz receipt for order ${data.orderId}.`,
    heroImage: '/menu-images/curry-goat.jpg',
    children: `
      <p style="margin:0 0 18px;color:#3a3026;font:400 16px Arial,sans-serif;line-height:1.65;">Your order payment is complete. We will start lining up the food and follow up if anything else is needed.</p>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-top:4px solid #c41e3a;">
        ${detailRows([
          ['Customer', data.customerName ?? data.customerEmail],
          ['Email', data.customerEmail],
          ['Order', data.orderId],
          ['Order type', data.fulfillment],
          ['Delivery address', data.deliveryAddress],
          ['Delivery distance', data.deliveryDistance],
          ['Delivery fee', data.deliveryFee],
        ])}
      </table>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top:18px;">
        ${items}
        <tr>
          <td colspan="2" align="right" style="padding:18px 12px 0 0;color:#16110d;font:700 13px Arial,sans-serif;text-transform:uppercase;letter-spacing:1.5px;">Total paid</td>
          <td align="right" style="padding:18px 0 0;color:#1e6b1e;font:700 22px Arial,sans-serif;">${escapeHtml(data.total)}</td>
        </tr>
      </table>
    `,
  })
}
