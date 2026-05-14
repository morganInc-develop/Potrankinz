'use client'

import Image from 'next/image'
import type { ReactElement } from 'react'
import { FiCalendar } from 'react-icons/fi'
import { SiFacebook, SiInstagram, SiTiktok } from 'react-icons/si'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import HomepageLink from '@/components/ui/homepage-link'
import { Input } from '@/components/ui/input'
import { restaurantName } from '@/lib/kindred-home-data'

const SOCIAL_ICONS: Record<string, ReactElement> = {
  Instagram: <SiInstagram className="h-3.5 w-3.5" />,
  TikTok: <SiTiktok className="h-3.5 w-3.5" />,
  Facebook: <SiFacebook className="h-3.5 w-3.5" />,
  Resy: <FiCalendar className="h-3.5 w-3.5" />,
}

const SOCIAL_HREFS: Record<string, string> = {
  Instagram: 'https://www.instagram.com/',
  TikTok: 'https://www.tiktok.com/',
  Facebook: 'https://www.facebook.com/',
}

interface FooterLink {
  label: string
  href: string
}

interface FooterColumn {
  title: string
  links: FooterLink[]
}

interface FooterProps {
  backgroundImage: string
  newsletterTitle: string
  newsletterDescription: string
  columns: FooterColumn[]
  legalLinks: FooterLink[]
  hours?: string[]
  contactLines?: string[]
  externalLinks?: FooterLink[]
}

export default function Footer({
  backgroundImage,
  newsletterTitle,
  newsletterDescription,
  columns,
  legalLinks,
  hours = [],
  contactLines = [],
  externalLinks = [],
}: FooterProps) {
  return (
    <footer className="relative overflow-hidden bg-warm-white">
      <div className="relative min-h-[55rem]">
        <Image
          src={backgroundImage}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/8" />
        <div className="relative z-10 px-6 pb-24 pt-24 md:px-8 lg:px-10">
          <div className="mx-auto max-w-[84rem] lg:pt-[22rem]">
            <div className="bg-[rgba(251,248,245,0.88)] p-6 backdrop-blur-[6px] md:p-10 lg:p-12">
              <div className="hidden gap-10 lg:grid lg:grid-cols-[repeat(3,minmax(0,11rem))_minmax(0,1fr)]">
                {columns.map((column, i) => (
                  <div key={column.title}>
                    <h3
                      className="font-display text-[2rem] leading-none font-light"
                      style={{
                        color:
                          i === 0 ? '#7B1F1F' : i === 1 ? '#3D9B3D' : '#C49A00',
                      }}
                    >
                      {column.title}
                    </h3>
                    <ul className="mt-5 space-y-3">
                      {column.links.map((link) => (
                        <li key={link.label}>
                          <HomepageLink
                            href={link.href}
                            className="inline-flex items-center gap-2 font-ui text-[11px] uppercase tracking-[0.15em] text-black/72 transition-opacity hover:opacity-100"
                          >
                            {SOCIAL_ICONS[link.label] && (
                              <span aria-hidden className="opacity-70">
                                {SOCIAL_ICONS[link.label]}
                              </span>
                            )}
                            {link.label}
                          </HomepageLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <div>
                  <h3
                    className="font-display text-[2rem] leading-none font-light"
                    style={{ color: '#7B1F1F' }}
                  >
                    {newsletterTitle}
                  </h3>
                  <p className="mt-4 max-w-[28rem] font-ui text-[14px] leading-[1.6] text-black/72">
                    {newsletterDescription}
                  </p>
                  {(hours.length > 0 || externalLinks.length > 0) && (
                    <div className="mt-7 grid gap-5 border-t border-black/10 pt-6 sm:grid-cols-2">
                      {hours.length > 0 && (
                        <div>
                          <div className="font-ui text-[10px] uppercase tracking-[0.2em] text-black/46">
                            Hours
                          </div>
                          <ul className="mt-3 space-y-1.5">
                            {hours.map((line) => (
                              <li
                                key={line}
                                className="font-ui text-[12px] leading-[1.55] text-black/68"
                              >
                                {line}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {externalLinks.length > 0 && (
                        <div>
                          <div className="font-ui text-[10px] uppercase tracking-[0.2em] text-black/46">
                            External Links
                          </div>
                          <ul className="mt-3 space-y-1.5">
                            {externalLinks.map((link) => (
                              <li key={link.label}>
                                <HomepageLink
                                  href={link.href}
                                  className="font-ui text-[12px] uppercase tracking-[0.12em] text-black/70 transition-colors hover:text-[#3D9B3D]"
                                >
                                  {link.label}
                                </HomepageLink>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="mt-8">
                    <div className="font-ui text-[11px] uppercase tracking-[0.2em] text-black">
                      Sign up to our newsletter
                    </div>
                    <div className="mt-5 flex items-end gap-4">
                      <Input placeholder="Email" />
                      <Button className="border-b border-[#3D9B3D] pb-2 text-[#3D9B3D]">
                        Subscribe
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:hidden">
                <h3
                  className="font-display text-[2.9rem] leading-none font-light"
                  style={{ color: '#7B1F1F' }}
                >
                  {newsletterTitle}
                </h3>
                <p className="mt-4 font-ui text-[15px] leading-[1.6] text-black/72">
                  {newsletterDescription}
                </p>
                {(hours.length > 0 || contactLines.length > 0) && (
                  <div className="mt-7 grid gap-5 border-t border-black/10 pt-6 sm:grid-cols-2">
                    {hours.length > 0 && (
                      <div>
                        <div className="font-ui text-[10px] uppercase tracking-[0.2em] text-black/46">
                          Hours
                        </div>
                        <ul className="mt-3 space-y-1.5">
                          {hours.map((line) => (
                            <li
                              key={line}
                              className="font-ui text-[12px] leading-[1.55] text-black/68"
                            >
                              {line}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {contactLines.length > 0 && (
                      <div>
                        <div className="font-ui text-[10px] uppercase tracking-[0.2em] text-black/46">
                          Contact
                        </div>
                        <ul className="mt-3 space-y-1.5">
                          {contactLines.map((line) => (
                            <li
                              key={line}
                              className="font-ui text-[12px] leading-[1.55] text-black/68"
                            >
                              {line}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
                <div className="mt-8">
                  <div className="font-ui text-[11px] uppercase tracking-[0.2em] text-black">
                    Sign up to our newsletter
                  </div>
                  <div className="mt-5 flex items-end gap-4">
                    <Input placeholder="Email" />
                    <Button className="border-b border-[#3D9B3D] pb-2 text-[#3D9B3D]">
                      Subscribe
                    </Button>
                  </div>
                </div>
                <div className="mt-10">
                  <Accordion type="single" collapsible>
                    {columns.map((column) => (
                      <AccordionItem key={column.title} value={column.title}>
                        <AccordionTrigger>{column.title}</AccordionTrigger>
                        <AccordionContent>
                          <ul className="space-y-3">
                            {column.links.map((link) => (
                              <li key={link.label}>
                                <HomepageLink
                                  href={link.href}
                                  className="font-ui text-[11px] uppercase tracking-[0.15em] text-black/72"
                                >
                                  {link.label}
                                </HomepageLink>
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                    {externalLinks.length > 0 && (
                      <AccordionItem value="External Links">
                        <AccordionTrigger>External Links</AccordionTrigger>
                        <AccordionContent>
                          <ul className="space-y-3">
                            {externalLinks.map((link) => (
                              <li key={link.label}>
                                <HomepageLink
                                  href={link.href}
                                  className="font-ui text-[11px] uppercase tracking-[0.15em] text-black/72"
                                >
                                  {link.label}
                                </HomepageLink>
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    )}
                  </Accordion>
                </div>
              </div>

              <div className="mt-10 border-t border-black/10 pt-6">
                <div className="flex flex-wrap items-center justify-between gap-y-4">
                  <div className="flex flex-wrap gap-x-8 gap-y-3">
                    <span className="font-ui text-[10px] uppercase tracking-[0.16em] text-black/62">
                      © 2026, {restaurantName}
                    </span>
                    {legalLinks.map((link) => (
                      <HomepageLink
                        key={link.label}
                        href={link.href}
                        className="font-ui text-[10px] uppercase tracking-[0.16em] text-black/62"
                      >
                        {link.label}
                      </HomepageLink>
                    ))}
                  </div>

                  {/* Social icon cluster */}
                  <div className="flex items-center gap-4">
                    {Object.entries(SOCIAL_HREFS).map(([label, href]) => (
                      <HomepageLink
                        key={label}
                        href={href}
                        aria-label={label}
                        className="text-black/52 transition-opacity hover:text-black/90"
                      >
                        <span aria-hidden>{SOCIAL_ICONS[label]}</span>
                      </HomepageLink>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
