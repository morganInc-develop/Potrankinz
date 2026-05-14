import type { Metadata } from 'next'
import { DM_Sans, Fraunces, Special_Elite, Lora } from 'next/font/google'
import Providers from './providers'

import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  axes: ['opsz'],
  variable: '--font-fraunces',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-sans',
})

const specialElite = Special_Elite({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-special-elite',
})

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-lora',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://potrankinz.vercel.app'),
  applicationName: 'Potrankinz',
  title: {
    default: 'Potrankinz',
    template: '%s | Potrankinz',
  },
  description: 'Soul food and catering done right in Florida and beyond.',
  openGraph: {
    title: 'Potrankinz',
    description: 'Soul food and catering done right in Florida and beyond.',
    url: 'https://potrankinz.vercel.app',
    siteName: 'Potrankinz',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Potrankinz',
    description: 'Soul food and catering done right in Florida and beyond.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${dmSans.variable} ${specialElite.variable} ${lora.variable}`}
    >
      <body className="min-h-screen bg-warm-white text-black antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
