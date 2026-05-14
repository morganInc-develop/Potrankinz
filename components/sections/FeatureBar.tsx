'use client'

import { motion } from 'framer-motion'
import { ConciergeBell, Heart, Leaf, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Feature {
  Icon: LucideIcon
  iconBg: string
  headingColor: string
  heading: string
  body: string
  seed: number
}

const features: Feature[] = [
  {
    Icon: Leaf,
    iconBg: '#4CAF50',
    headingColor: '#4CAF50',
    heading: 'FRESH INGREDIENTS',
    body: 'We use only the best quality ingredients.',
    seed: 3,
  },
  {
    Icon: ConciergeBell,
    iconBg: '#F5C518',
    headingColor: '#F5C518',
    heading: 'EXPERT CHEFS',
    body: 'Our chefs bring passion to every dish.',
    seed: 7,
  },
  {
    Icon: Users,
    iconBg: '#4CAF50',
    headingColor: '#4CAF50',
    heading: 'PERFECT FOR ANY EVENT',
    body: 'Weddings, parties, birthdays and more!',
    seed: 11,
  },
  {
    Icon: Heart,
    iconBg: '#F5C518',
    headingColor: '#F5C518',
    heading: 'MADE WITH LOVE',
    body: 'Every meal is prepared with care and love.',
    seed: 15,
  },
]

function BrushBadge({
  Icon,
  color,
  seed,
  index,
}: {
  Icon: LucideIcon
  color: string
  seed: number
  index: number
}) {
  return (
    <motion.div
      className="relative flex h-24 w-24 flex-shrink-0 items-center justify-center"
      initial={{ opacity: 0, scale: 0.82, rotate: -6 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true, amount: 0.45 }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: 'easeOut' }}
      animate={{ y: [0, -4, 0], rotate: [0, index % 2 === 0 ? -2 : 2, 0] }}
    >
      <motion.svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 120 120"
        aria-hidden="true"
        animate={{ scale: [1, 1.05, 0.99, 1] }}
        transition={{
          duration: 4 + index * 0.35,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <defs>
          <filter
            id={`feat-brush-${seed}`}
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.075 0.11"
              numOctaves="4"
              seed={seed}
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
        <motion.g filter={`url(#feat-brush-${seed})`}>
          <motion.path
            d="M21 58c2-19 18-32 40-35 17-2 34 3 42 15 8 11 6 28-4 41-10 14-27 20-46 19-22-2-36-15-32-40Z"
            fill={color}
            opacity="0.95"
            animate={{ opacity: [0.86, 1, 0.9] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <path
            d="M10 67c20-9 48-12 88-9 6 0 11 3 12 7-31 8-63 12-95 9-5-1-7-3-5-7Z"
            fill={color}
            opacity="0.82"
          />
          <path
            d="M19 39c18-8 45-13 78-10 5 0 8 2 9 5-29 7-57 10-86 9-5 0-6-2-1-4Z"
            fill={color}
            opacity="0.68"
          />
          <path
            d="M30 23c14-5 37-7 56-2 4 1 5 3 2 5-19 0-41 2-60 6-6 1-6-6 2-9Z"
            fill={color}
            opacity="0.74"
          />
          <path
            d="M26 90c22 5 42 6 63 1 5-1 6 2 2 5-16 10-47 9-65 0-5-3-4-7 0-6Z"
            fill={color}
            opacity="0.7"
          />
        </motion.g>
      </motion.svg>
      <motion.div
        className="relative z-10 text-black"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{
          duration: 2.8 + index * 0.25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <Icon
          size={42}
          strokeWidth={2.8}
          fill={Icon === Heart ? 'currentColor' : 'none'}
        />
      </motion.div>
    </motion.div>
  )
}

const featureContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const featureItem = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55 },
  },
}

export default function FeatureBar() {
  return (
    <motion.section
      className="feature-rugged-band relative overflow-hidden bg-[#050505]"
      initial={{ opacity: 0.92 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.25 }}
    >
      <motion.div
        className="feature-paint-edge feature-paint-edge-top"
        aria-hidden="true"
        animate={{ x: ['-2%', '2%', '-2%'], opacity: [0.72, 0.95, 0.78] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="feature-paint-edge feature-paint-edge-bottom"
        aria-hidden="true"
        animate={{ x: ['2%', '-2%', '2%'], opacity: [0.8, 0.96, 0.76] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="relative z-10 grid grid-cols-1 gap-y-2 px-6 py-9 sm:grid-cols-2 lg:grid-cols-4 lg:px-12"
        variants={featureContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {features.map(
          ({ Icon, iconBg, headingColor, heading, body, seed }, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-5 px-2 py-3 lg:px-4"
              variants={featureItem}
            >
              <BrushBadge Icon={Icon} color={iconBg} seed={seed} index={i} />

              {/* ── Heading — inline SVG with embedded distress filter ────────── */}
              <div className="flex-1 min-w-0">
                <div className="mb-1" style={{ lineHeight: 0 }}>
                  <svg
                    width="100%"
                    height="20"
                    style={{ overflow: 'visible', display: 'block' }}
                    aria-label={heading}
                  >
                    <defs>
                      <filter
                        id={`feat-h-${i}`}
                        x="-5%"
                        y="-80%"
                        width="110%"
                        height="260%"
                        colorInterpolationFilters="sRGB"
                      >
                        <feTurbulence
                          type="fractalNoise"
                          baseFrequency="0.05 0.04"
                          numOctaves="4"
                          seed={seed}
                          result="noise"
                        />
                        <feDisplacementMap
                          in="SourceGraphic"
                          in2="noise"
                          scale="2.5"
                          xChannelSelector="R"
                          yChannelSelector="G"
                        />
                      </filter>
                    </defs>
                    <text
                      x="0"
                      y="15"
                      fontFamily="Oswald, sans-serif"
                      fontSize="13"
                      fontWeight="700"
                      fill={headingColor}
                      letterSpacing="1"
                      filter={`url(#feat-h-${i})`}
                    >
                      {heading}
                    </text>
                  </svg>
                </div>
                <p
                  className="max-w-[18rem] text-sm leading-snug text-white/78"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {body}
                </p>
              </div>
            </motion.div>
          ),
        )}
      </motion.div>
    </motion.section>
  )
}
