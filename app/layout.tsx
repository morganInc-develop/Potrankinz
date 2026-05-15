import type { Metadata } from 'next'
import { Anton, Oswald, DM_Sans, Special_Elite } from 'next/font/google'
import Providers from './providers'

import './globals.css'

const anton = Anton({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-anton',
})

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-oswald',
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

export const metadata: Metadata = {
  metadataBase: new URL('https://potrankinz.vercel.app'),
  applicationName: 'Potrankinz',
  title: {
    default: 'Potrankinz',
    template: '%s | Potrankinz',
  },
  description: 'Soul food and catering done right in Florida and beyond.',
  icons: {
    icon: '/hero-chefs/cutouts/pot-rankinz-logo.png',
    shortcut: '/hero-chefs/cutouts/pot-rankinz-logo.png',
    apple: '/hero-chefs/cutouts/pot-rankinz-logo.png',
  },
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
      className={`${anton.variable} ${oswald.variable} ${dmSans.variable} ${specialElite.variable}`}
    >
      <body className="min-h-screen bg-[#0D0A06] text-white antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
