'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const VIDEO_URL = 'https://www.pexels.com/download/video/8626681/'

// Many micro-points along top & bottom produce the hand-painted rough edge
const ROUGH_BTN =
  'polygon(0% 10%, 4% 2%, 10% 8%, 17% 0%, 24% 8%, 31% 2%, 38% 10%, 45% 2%, 52% 8%, 59% 2%, 66% 8%, 73% 0%, 80% 10%, 87% 2%, 94% 8%, 100% 5%, 99% 50%, 100% 95%, 96% 100%, 89% 90%, 82% 100%, 75% 92%, 68% 100%, 61% 90%, 54% 100%, 47% 92%, 40% 100%, 33% 90%, 26% 100%, 19% 92%, 12% 100%, 5% 90%, 0% 95%, 1% 50%)'

const contentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.15 },
  },
}

const riseIn = {
  hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7 },
  },
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* ── Background video ───────────────────────────────────────────────── */}
      <motion.video
        className="absolute inset-0 h-full w-full object-cover object-center"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        initial={{ scale: 1.04, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.25, ease: 'easeOut' }}
      >
        <source src={VIDEO_URL} />
      </motion.video>

      {/* Dark base overlay */}
      <motion.div
        className="absolute inset-0 bg-black/65"
        initial={{ opacity: 0.8 }}
        animate={{ opacity: [0.72, 0.62, 0.68] }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
        }}
      />

      {/* ── Single Jamaican flag atmosphere overlay ───────────────────────── */}
      <motion.svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-25"
        viewBox="0 0 100 60"
        preserveAspectRatio="none"
        aria-hidden="true"
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 0.25, scale: [1.02, 1.045, 1.02], x: [0, 10, 0] }}
        transition={{
          opacity: { duration: 1 },
          scale: { duration: 12, repeat: Infinity, ease: 'easeInOut' },
          x: { duration: 14, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <defs>
          <clipPath id="flag-clip">
            <rect width="100" height="60" />
          </clipPath>
        </defs>
        <g clipPath="url(#flag-clip)">
          <polygon points="0,0 50,24 100,0" fill="#1E5C14" />
          <polygon points="0,60 50,36 100,60" fill="#1E5C14" />
          <polygon points="0,0 38,30 0,60" fill="#050505" />
          <polygon points="100,0 62,30 100,60" fill="#050505" />
          <path
            d="M -8 -5 L 4 -5 L 108 65 L 96 65 Z M 96 -5 L 108 -5 L 4 65 L -8 65 Z"
            fill="#F5C518"
          />
        </g>
      </motion.svg>

      {/* ── Main content ─────────────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between px-8 lg:px-20 pt-28 pb-0 flex-1 gap-8 lg:gap-4">
        {/* ── LEFT: Typography ─────────────────────────────────────────────── */}
        <motion.div
          className="flex-1 max-w-full lg:max-w-[46%] text-center lg:text-left"
          variants={contentVariants}
          initial="hidden"
          animate="visible"
        >
          {/* ── Headline as inline SVG — filter is applied within same SVG
                 context so the distress effect is guaranteed to render.
                 viewBox is wide enough for the 25% larger headline.           */}
          <motion.div
            className="w-full mb-5"
            style={{ lineHeight: 0 }}
            variants={riseIn}
          >
            <svg
              viewBox="0 0 870 390"
              preserveAspectRatio="xMinYMid meet"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                overflow: 'visible',
              }}
              aria-label="Real Food. Real Flava. Pure Vibes."
              role="img"
            >
              <defs>
                <filter
                  id="prk-dist"
                  x="-6%"
                  y="-12%"
                  width="112%"
                  height="128%"
                  colorInterpolationFilters="sRGB"
                >
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.038 0.030"
                    numOctaves="5"
                    seed="11"
                    result="noise"
                  />
                  <feDisplacementMap
                    in="SourceGraphic"
                    in2="noise"
                    scale="8"
                    xChannelSelector="R"
                    yChannelSelector="G"
                  />
                </filter>
              </defs>

              <motion.text
                x="0"
                y="120"
                fontFamily="Anton, Impact, sans-serif"
                fontSize="118"
                fill="white"
                filter="url(#prk-dist)"
                style={{ textTransform: 'uppercase' } as React.CSSProperties}
                initial={{ opacity: 0, x: -28 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.62, ease: 'easeOut' }}
              >
                REAL FOOD.
              </motion.text>
              <motion.text
                x="0"
                y="245"
                fontFamily="Anton, Impact, sans-serif"
                fontSize="118"
                fill="#F5C518"
                filter="url(#prk-dist)"
                initial={{ opacity: 0, x: -28 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  fill: ['#F5C518', '#FFD83D', '#F5C518'],
                }}
                transition={{
                  opacity: { duration: 0.62, delay: 0.12 },
                  x: { duration: 0.62, delay: 0.12, ease: 'easeOut' },
                  fill: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' },
                }}
              >
                REAL FLAVA.
              </motion.text>
              <motion.text
                x="0"
                y="370"
                fontFamily="Anton, Impact, sans-serif"
                fontSize="118"
                fill="#1E6B1E"
                filter="url(#prk-dist)"
                initial={{ opacity: 0, x: -28 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  fill: ['#1E6B1E', '#3EA53E', '#1E6B1E'],
                }}
                transition={{
                  opacity: { duration: 0.62, delay: 0.24 },
                  x: { duration: 0.62, delay: 0.24, ease: 'easeOut' },
                  fill: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
                }}
              >
                PURE VIBES.
              </motion.text>
            </svg>
          </motion.div>

          {/* ── Tricolor bar — inline SVG so rough filter is guaranteed ─────── */}
          <motion.div
            className="w-[60%] mb-6 mx-auto lg:mx-0"
            style={{ lineHeight: 0 }}
            variants={riseIn}
          >
            <svg
              viewBox="0 0 570 28"
              preserveAspectRatio="xMinYMid meet"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                overflow: 'visible',
              }}
              aria-hidden="true"
            >
              <defs>
                <filter
                  id="prk-bar"
                  x="-2%"
                  y="-120%"
                  width="104%"
                  height="340%"
                >
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.07 0.12"
                    numOctaves="4"
                    seed="5"
                    result="noise"
                  />
                  <feDisplacementMap
                    in="SourceGraphic"
                    in2="noise"
                    scale="7"
                    xChannelSelector="R"
                    yChannelSelector="G"
                  />
                </filter>
              </defs>
              <motion.rect
                x="0"
                y="4"
                height="20"
                fill="#C41E3A"
                filter="url(#prk-bar)"
                initial={{ width: 0 }}
                animate={{ width: 190 }}
                transition={{ duration: 0.55, delay: 0.65, ease: 'easeOut' }}
              />
              <motion.rect
                x="190"
                y="4"
                height="20"
                fill="#F5C518"
                filter="url(#prk-bar)"
                initial={{ width: 0 }}
                animate={{
                  width: 190,
                  fill: ['#F5C518', '#FFD83D', '#F5C518'],
                }}
                transition={{
                  width: { duration: 0.55, delay: 0.78, ease: 'easeOut' },
                  fill: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' },
                }}
              />
              <motion.rect
                x="380"
                y="4"
                height="20"
                fill="#1E6B1E"
                filter="url(#prk-bar)"
                initial={{ width: 0 }}
                animate={{
                  width: 190,
                  fill: ['#1E6B1E', '#3EA53E', '#1E6B1E'],
                }}
                transition={{
                  width: { duration: 0.55, delay: 0.91, ease: 'easeOut' },
                  fill: { duration: 3.8, repeat: Infinity, ease: 'easeInOut' },
                }}
              />
            </svg>
          </motion.div>

          <motion.p
            className="text-white/90 text-base mb-1 max-w-xs mx-auto lg:mx-0"
            style={{ fontFamily: 'var(--font-body)' }}
            variants={riseIn}
          >
            Jamaican food made with love,
            <br />
            bold flavours and the freshest ingredients.
          </motion.p>
          <motion.p
            className="text-[#F5C518] italic mb-8"
            style={{ fontFamily: 'var(--font-body)' }}
            variants={riseIn}
            animate={{ color: ['#F5C518', '#FFE36B', '#F5C518'] }}
            transition={{
              color: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' },
            }}
          >
            From yard to plate – we&apos;ve got you!
          </motion.p>

          {/* ── CTA buttons — clip-path rough painted edges ───────────────── */}
          <motion.div
            className="flex flex-wrap gap-6 justify-center lg:justify-start"
            variants={riseIn}
          >
            {/* Yellow fill button */}
            <motion.div
              whileHover={{ y: -3, scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 360, damping: 18 }}
            >
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 bg-[#F5C518] text-black font-bold uppercase tracking-wider text-sm px-8 py-[14px] hover:bg-[#E0B000] transition-colors"
                style={{ fontFamily: 'var(--font-ui)', clipPath: ROUGH_BTN }}
              >
                EXPLORE MENU <ArrowRight size={16} />
              </Link>
            </motion.div>

            {/* White fill button — clip-path keeps the rough painted edge */}
            <motion.div
              style={{ display: 'inline-block', clipPath: ROUGH_BTN }}
              whileHover={{ y: -3, scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 360, damping: 18 }}
            >
              <Link
                href="/services"
                className="inline-flex items-center gap-2 border-2 border-white bg-white text-[#C41E3A] font-bold uppercase tracking-wider text-sm px-8 py-[14px] hover:border-[#F5C518] hover:bg-[#F5C518] hover:text-black transition-colors"
                style={{ fontFamily: 'var(--font-ui)' }}
              >
                OUR SERVICES
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ── CENTER: Logo / Badge — clean image, no CSS border overlay ────── */}
        <motion.div
          className="flex-shrink-0 flex items-center justify-center lg:absolute lg:right-4 xl:right-20 lg:top-1/2 lg:-translate-y-1/2"
          initial={{ opacity: 0, scale: 0.82, rotate: -5 }}
          animate={{
            opacity: 1,
            scale: [1, 1.025, 1],
            rotate: [-1.2, 1.2, -1.2],
          }}
          transition={{
            opacity: { duration: 0.8, delay: 0.35 },
            scale: { duration: 5.2, repeat: Infinity, ease: 'easeInOut' },
            rotate: { duration: 6.5, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          <div className="relative w-[442px] h-[442px] max-w-[90vw] max-h-[90vw] md:w-[598px] md:h-[598px] lg:w-[620px] lg:h-[620px] xl:w-[702px] xl:h-[702px]">
            <Image
              src="/hero-chefs/cutouts/pot-rankinz-logo.png"
              alt="Pot Rankinz Kitchen Catering Service"
              fill
              className="object-contain drop-shadow-2xl"
              sizes="(min-width: 1280px) 702px, (min-width: 1024px) 620px, (min-width: 768px) 598px, 90vw"
              priority
            />
          </div>
        </motion.div>
      </div>

      {/* Bottom fade into feature bar */}
      <motion.div
        className="relative z-10 h-16 bg-gradient-to-b from-transparent to-[#0A0A0A]"
        animate={{ opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
    </section>
  )
}
