'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

import HomepageLink from '@/components/ui/homepage-link'
import TypewriterText from '@/components/ui/TypewriterText'

interface HeroProps {
  desktopImage: string
  mobileImage: string
  video?: string
  title: string[]
  description: string[]
  href: string
  cta?: string
}

const chefCutouts = [
  {
    src: '/hero-chefs/cutouts/evette-quoibia-trimmed.png',
    alt: 'Chef stirring a pan',
    className:
      'left-[8%] bottom-[-2%] h-[91%] w-[39%] rotate-[-4deg] md:left-[8%] md:bottom-[-2%] md:h-[93%] md:w-[38%]',
    shakeClassName: 'chef-cutout-shake-a',
  },
  {
    src: '/hero-chefs/cutouts/pot-rankinz-logo.png',
    alt: 'Pot Rankinz Kitchen logo',
    className:
      'left-[33%] bottom-[-6%] h-[94%] w-[35%] rotate-[2deg] md:left-[33%] md:bottom-[-6%] md:h-[96%] md:w-[34%]',
    shakeClassName: 'chef-cutout-shake-b',
  },
  {
    src: '/hero-chefs/cutouts/nick-wallace-trimmed.png',
    alt: 'Chef cooking over live fire',
    className:
      'right-[5%] bottom-[-9%] h-[110%] w-[39%] rotate-[4deg] md:right-[5%] md:bottom-[-9%] md:h-[112%] md:w-[38%]',
    shakeClassName: 'chef-cutout-shake-c',
  },
  {
    src: '/hero-chefs/cutouts/plating-chef-trimmed.png',
    alt: 'Chef plating appetizers',
    className:
      'right-[-3%] top-[18%] h-[82%] w-[35%] rotate-[7deg] md:right-[-3%] md:top-[18%] md:h-[84%] md:w-[34%]',
    shakeClassName: 'chef-cutout-shake-d',
  },
]

const chefLabels = [
  {
    id: 'evette',
    name: 'Chef Evette',
    color: '#F5C518',
    className: 'left-[12%] top-[10%] rotate-[-7deg]',
    arrowClassName: 'left-[17%] top-[19%] h-[66px] w-[134px] rotate-[12deg]',
    path: 'M126 8 C82 8 46 22 10 58',
  },
  {
    id: 'forge',
    name: 'Pot Rankinz',
    color: '#3D9B3D',
    className: 'left-[42%] top-[12%] rotate-[5deg]',
    arrowClassName: 'left-[43%] top-[22%] h-[82px] w-[128px] rotate-[24deg]',
    path: 'M10 8 C34 34 72 54 120 70',
  },
  {
    id: 'nick',
    name: 'Nick Wallace',
    color: '#D42B2B',
    className: 'right-[18%] top-[8%] rotate-[-5deg]',
    arrowClassName: 'right-[17%] top-[18%] h-[78px] w-[146px] rotate-[-15deg]',
    path: 'M10 10 C42 32 88 44 138 68',
  },
  {
    id: 'plating',
    name: 'Plating Lead',
    color: '#3D9B3D',
    className: 'right-[2%] top-[20%] rotate-[8deg]',
    arrowClassName: 'right-[5%] top-[30%] h-[72px] w-[118px] rotate-[30deg]',
    path: 'M10 62 C44 46 82 28 110 8',
  },
]

export default function Hero({
  desktopImage,
  mobileImage,
  video,
  title,
  description,
  href,
  cta = 'View Collection',
}: HeroProps) {
  const desktopImageRef = useRef<HTMLDivElement>(null)
  const mobileImageRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!video) {
      if (desktopImageRef.current) {
        gsap.set(desktopImageRef.current, { scale: 1.04 })
        gsap.to(desktopImageRef.current, {
          scale: 1,
          duration: 8,
          ease: 'power1.out',
        })
      }
      if (mobileImageRef.current) {
        gsap.set(mobileImageRef.current, { scale: 1.04 })
        gsap.to(mobileImageRef.current, {
          scale: 1,
          duration: 8,
          ease: 'power1.out',
        })
      }
    }
  }, [video])

  const titleHtml = `<em>${title[0]}</em> ${title[1]}`
  const descHtml = `${description[0]}<br/><em>${description[1]}</em>`

  return (
    <>
      <section className="relative min-h-[92svh] overflow-hidden md:min-h-screen">
        <div className="absolute inset-0 bg-black/30" />

        {video ? (
          /* ── Video background ──────────────────────────────────────── */
          <>
            <video
              src={video}
              poster={desktopImage}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 hidden h-full w-full object-cover md:block"
            />
            <video
              src={video}
              poster={mobileImage}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover md:hidden"
            />
          </>
        ) : (
          /* ── Static image background ───────────────────────────────── */
          <>
            <div className="absolute inset-0 hidden md:block">
              <div
                ref={desktopImageRef}
                className="absolute inset-0 will-change-transform"
              >
                <Image
                  src={desktopImage}
                  alt=""
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover object-[53%_5%]"
                />
              </div>
            </div>
            <div className="absolute inset-0 md:hidden">
              <div
                ref={mobileImageRef}
                className="absolute inset-0 will-change-transform"
              >
                <Image
                  src={mobileImage}
                  alt=""
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover object-[52%_2%]"
                />
              </div>
            </div>
          </>
        )}

        {/* Paper grain over hero */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.68' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
            opacity: 0.055,
            mixBlendMode: 'overlay',
          }}
        />

        <motion.div
          initial={{ opacity: 0, x: 34, rotate: 1.8 }}
          animate={{ opacity: 1, x: 0, rotate: -0.8 }}
          transition={{
            delay: 0.55,
            duration: 0.9,
            ease: [0.33, 1, 0.68, 1],
          }}
          aria-hidden
          className="hero-chef-card lined-paper pointer-events-none absolute left-[4vw] top-[34%] z-10 h-[12rem] w-[92vw] origin-center md:left-auto md:top-auto md:bottom-12 md:right-[-3rem] md:h-[24rem] md:w-[52rem] md:origin-bottom-right lg:bottom-16 lg:right-6 lg:h-[28rem] lg:w-[60rem]"
          style={{
            boxShadow:
              '3px 4px 0 #ede7dd, 7px 8px 0 #e1dbd0, 0 18px 42px rgba(0,0,0,0.28)',
          }}
        >
          <div className="pointer-events-none absolute left-[28px] top-0 flex h-full flex-col justify-around py-7">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-[17px] w-[17px] rounded-full bg-warm-white/80"
                style={{ boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.2)' }}
              />
            ))}
          </div>

          <div className="absolute left-[76px] right-5 top-[26px] flex h-8 items-center border-b border-[rgba(130,180,218,0.5)]">
            <span className="font-special text-[9px] uppercase tracking-[0.22em] text-black/54">
              Subject: The Line
            </span>
          </div>

          <div className="absolute inset-0 z-20">
            {chefLabels.map((label) => (
              <div key={label.name}>
                <span
                  className={`chalk-chef-label absolute ${label.className}`}
                  style={{ color: label.color }}
                >
                  {label.name}
                </span>
                <svg
                  className={`chalk-chef-arrow absolute overflow-visible ${label.arrowClassName}`}
                  viewBox="0 0 128 72"
                  fill="none"
                  aria-hidden
                  style={{ color: label.color }}
                >
                  <defs>
                    <marker
                      id={`chalk-arrowhead-${label.id}`}
                      markerWidth="10"
                      markerHeight="10"
                      refX="8"
                      refY="5"
                      orient="auto"
                    >
                      <path d="M1 1 L9 5 L1 9" />
                    </marker>
                  </defs>
                  <path
                    d={label.path}
                    markerEnd={`url(#chalk-arrowhead-${label.id})`}
                  />
                </svg>
              </div>
            ))}
          </div>

          <div className="relative h-full w-full">
            {chefCutouts.map((cutout) => (
              <div key={cutout.src} className={`absolute ${cutout.className}`}>
                <div
                  className={`chef-paper-cutout relative h-full w-full ${cutout.shakeClassName}`}
                >
                  <Image
                    src={cutout.src}
                    alt={cutout.alt}
                    fill
                    sizes="(min-width: 1024px) 28vw, (min-width: 768px) 30vw, 34vw"
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="dog-ear-corner" />
        </motion.div>

        <div className="relative z-20 flex min-h-[92svh] items-end px-6 pb-28 pt-32 md:min-h-screen md:px-8 md:pb-16 lg:px-10 lg:pb-20">
          <div className="relative z-10 max-w-[26rem] text-white">
            {/* Note-card label */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="paper-tag mb-4 w-fit"
              style={{
                background: 'rgba(253,248,236,0.14)',
                borderColor: 'rgba(255,255,255,0.28)',
                color: 'rgba(255,255,255,0.82)',
              }}
            >
              ✦ Est. 2019 &nbsp;·&nbsp; Florida
            </motion.div>

            {/* Typewriter title */}
            <TypewriterText
              as="h1"
              text={titleHtml}
              speed={45}
              delay={350}
              className="font-display text-[32px] leading-none font-light md:text-[44px]"
            />

            {/* Typewriter description */}
            <TypewriterText
              as="p"
              text={descHtml}
              speed={28}
              delay={1400}
              className="mt-5 max-w-[17rem] font-ui text-[13px] leading-[1.5] text-white/86 md:max-w-[16rem]"
            />

            {/* Animated "Reserve a Table" CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.8, duration: 0.7 }}
              className="mt-8"
            >
              <HomepageLink
                href={href}
                className="group relative inline-flex items-center gap-2"
              >
                {/* Pulsing glow ring */}
                <span
                  className="pointer-events-none absolute -inset-3 rounded-sm"
                  style={{
                    animation: 'reserva-pulse 2.4s ease-in-out infinite',
                    border: '1px solid rgba(245,197,24,0.55)',
                    boxShadow: '0 0 12px rgba(61,155,61,0.35)',
                  }}
                />
                <span className="relative border-b border-white/60 pb-2 font-ui text-[11px] uppercase tracking-[0.2em] text-white transition-colors duration-300 group-hover:border-[#F5C518]/80 group-hover:text-[#F5C518]">
                  {cta}
                </span>
                {/* Arrow tick */}
                <span className="relative mb-2 font-ui text-[10px] text-white/70 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#F5C518]">
                  →
                </span>
              </HomepageLink>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Wavy paper edge */}
      <div className="relative -mt-1 overflow-hidden" style={{ height: 40 }}>
        <svg
          viewBox="0 0 1440 40"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          fill="rgb(251,248,245)"
        >
          <path d="M0,20 Q90,36 180,20 Q270,4 360,20 Q450,36 540,20 Q630,4 720,20 Q810,36 900,20 Q990,4 1080,20 Q1170,36 1260,20 Q1350,4 1440,20 L1440,40 L0,40 Z" />
        </svg>
      </div>
    </>
  )
}
