'use client'

import Image from 'next/image'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'
import type { MotionValue } from 'framer-motion'
import { ArrowRight, ChefHat } from 'lucide-react'

import HomepageLink from '@/components/ui/homepage-link'
import { menuItems } from '@/lib/kindred-home-data'

const ease = [0.33, 1, 0.68, 1] as const

const ROUGH_BTN =
  'polygon(0% 10%, 4% 2%, 10% 8%, 17% 0%, 24% 8%, 31% 2%, 38% 10%, 45% 2%, 52% 8%, 59% 2%, 66% 8%, 73% 0%, 80% 10%, 87% 2%, 94% 8%, 100% 5%, 99% 50%, 100% 95%, 96% 100%, 89% 90%, 82% 100%, 75% 92%, 68% 100%, 61% 90%, 54% 100%, 47% 92%, 40% 100%, 33% 90%, 26% 100%, 19% 92%, 12% 100%, 5% 90%, 0% 95%, 1% 50%)'

const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`

const ORBIT_PLATES = [
  {
    id: 'jerk-chicken',
    className: 'left-[7%] top-[15%] h-28 w-28 md:h-40 md:w-40',
  },
  {
    id: 'ital-stew-bowl',
    className: 'right-[7%] top-[14%] h-24 w-24 md:h-36 md:w-36',
  },
  {
    id: 'ackee-saltfish',
    className: 'left-[10%] bottom-[12%] h-24 w-24 md:h-36 md:w-36',
  },
  {
    id: 'curry-goat',
    className: 'right-[11%] bottom-[11%] h-28 w-28 md:h-40 md:w-40',
  },
] as const

function PaintRift() {
  return (
    <div className="pointer-events-none absolute inset-0">
      {[
        ['#C41E3A', 'top-[20%] left-[-18%] h-24 w-[72%] rotate-[-9deg]', 0],
        ['#F5C518', 'top-[33%] right-[-20%] h-28 w-[78%] rotate-[8deg]', 0.1],
        ['#4CAF50', 'bottom-[18%] left-[-20%] h-24 w-[68%] rotate-[7deg]', 0.2],
      ].map(([color, className, delay]) => (
        <motion.div
          key={String(color)}
          className={`absolute ${className}`}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 0.95 }}
          transition={{ duration: 0.9, delay: Number(delay), ease }}
          style={{
            background: String(color),
            transformOrigin: String(className).includes('right')
              ? 'right center'
              : 'left center',
            clipPath:
              'polygon(0 24%, 11% 9%, 24% 29%, 41% 8%, 60% 27%, 79% 12%, 100% 25%, 94% 74%, 78% 62%, 58% 84%, 39% 67%, 21% 88%, 8% 70%, 0 80%)',
          }}
        />
      ))}
    </div>
  )
}

function JamaicanFlagOverlay() {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-45 mix-blend-screen"
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{ opacity: 0.45, scale: [1.02, 1.045, 1.02] }}
      transition={{
        opacity: { duration: 0.7, ease },
        scale: { duration: 12, repeat: Infinity, ease: 'easeInOut' },
      }}
    >
      <svg
        viewBox="0 0 100 60"
        preserveAspectRatio="none"
        className="h-full w-full"
      >
        <polygon points="0,0 50,24 100,0" fill="#1E6B1E" opacity="0.52" />
        <polygon points="0,60 50,36 100,60" fill="#1E6B1E" opacity="0.52" />
        <polygon points="0,0 38,30 0,60" fill="#050505" opacity="0.72" />
        <polygon points="100,0 62,30 100,60" fill="#050505" opacity="0.72" />
        <path
          d="M -8 -5 L 4 -5 L 108 65 L 96 65 Z M 96 -5 L 108 -5 L 4 65 L -8 65 Z"
          fill="#F5C518"
          opacity="0.58"
        />
      </svg>
    </motion.div>
  )
}

function FlagPortal() {
  return (
    <motion.div
      aria-hidden
      className="absolute left-1/2 top-1/2 aspect-square w-[112vmin] -translate-x-1/2 -translate-y-1/2"
      initial={{ opacity: 0, scale: 0.82, rotate: -12 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 1.1, ease }}
    >
      <motion.div
        className="absolute inset-[6%] rounded-full border border-[#F5C518]/34"
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute inset-[15%] rounded-full border border-[#4CAF50]/36"
        animate={{ rotate: -360 }}
        transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute inset-[24%] rounded-full border border-[#C41E3A]/42"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      <div className="absolute inset-[28%] rounded-full bg-[radial-gradient(circle,rgba(245,197,24,0.16),rgba(76,175,80,0.08)_42%,transparent_68%)] blur-xl" />
    </motion.div>
  )
}

function OrbitPlates({
  x,
  y,
}: {
  x: MotionValue<number>
  y: MotionValue<number>
}) {
  const plates = ORBIT_PLATES.map((plate) => ({
    ...plate,
    item: menuItems.find((item) => item.id === plate.id),
  })).filter(
    (
      plate,
    ): plate is (typeof ORBIT_PLATES)[number] & {
      item: (typeof menuItems)[number]
    } => Boolean(plate.item),
  )

  return (
    <motion.div
      className="pointer-events-none absolute inset-0"
      style={{ x, y }}
    >
      {plates.map(({ item, className }, index) => (
        <motion.div
          key={item.id}
          className={`absolute overflow-hidden rounded-full border-[5px] border-[#fff7e5] bg-black shadow-[0_18px_46px_rgba(0,0,0,0.48)] ${className}`}
          initial={{ opacity: 0, y: 24, scale: 0.76 }}
          animate={{
            opacity: [0.84, 1, 0.84],
            y: [0, index % 2 === 0 ? -12 : 12, 0],
            rotate: [index % 2 === 0 ? -5 : 5, 0, index % 2 === 0 ? -5 : 5],
            scale: 1,
          }}
          transition={{
            opacity: { duration: 4.5, repeat: Infinity, ease: 'easeInOut' },
            y: { duration: 5.5 + index, repeat: Infinity, ease: 'easeInOut' },
            rotate: {
              duration: 6 + index,
              repeat: Infinity,
              ease: 'easeInOut',
            },
            scale: { duration: 0.6, delay: 0.45 + index * 0.1, ease },
          }}
        >
          <Image
            src={item.image}
            alt=""
            fill
            sizes="(min-width: 768px) 160px, 112px"
            className="object-cover"
          />
        </motion.div>
      ))}
    </motion.div>
  )
}

function KineticWords() {
  const words = ['Welcome', 'Yaad', 'Flavor', 'Vibes', 'Irie']

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 overflow-hidden opacity-[0.12]">
      <motion.div
        className="flex w-max gap-10 whitespace-nowrap py-4 font-display text-[clamp(5rem,13vw,14rem)] font-light uppercase leading-none text-white"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
      >
        {[...words, ...words, ...words, ...words].map((word, index) => (
          <span key={`${word}-${index}`}>{word}</span>
        ))}
      </motion.div>
    </div>
  )
}

export default function LandingPage() {
  const reduced = useReducedMotion()
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const springX = useSpring(pointerX, { stiffness: 70, damping: 18 })
  const springY = useSpring(pointerY, { stiffness: 70, damping: 18 })
  const mascotX = useTransform(springX, [-1, 1], reduced ? [0, 0] : [-18, 18])
  const mascotY = useTransform(springY, [-1, 1], reduced ? [0, 0] : [-14, 14])
  const plateX = useTransform(springX, [-1, 1], reduced ? [0, 0] : [-22, 22])
  const plateY = useTransform(springY, [-1, 1], reduced ? [0, 0] : [-18, 18])

  return (
    <main className="min-h-screen overflow-hidden bg-[#050505] text-white">
      <section
        className="relative grid h-[100svh] place-items-center overflow-hidden px-6 py-4"
        onPointerMove={(event) => {
          if (reduced) return
          const rect = event.currentTarget.getBoundingClientRect()
          pointerX.set(((event.clientX - rect.left) / rect.width - 0.5) * 2)
          pointerY.set(((event.clientY - rect.top) / rect.height - 0.5) * 2)
        }}
        onPointerLeave={() => {
          pointerX.set(0)
          pointerY.set(0)
        }}
      >
        <div className="absolute inset-0">
          <Image
            src="/menu-images/jerk-chicken.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-35 saturate-[1.16]"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_46%,rgba(0,0,0,0.22),rgba(0,0,0,0.78)_58%,rgba(0,0,0,0.94)_100%)]" />
        </div>

        <KineticWords />
        <JamaicanFlagOverlay />
        <PaintRift />
        <FlagPortal />
        <OrbitPlates x={plateX} y={plateY} />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.15] mix-blend-overlay"
          style={{ backgroundImage: GRAIN }}
        />

        <div className="relative z-10 mx-auto grid w-full max-w-[76rem] place-items-center text-center">
          <motion.div
            className="mb-4 inline-flex items-center gap-2 border border-white/16 bg-black/45 px-3 py-2 backdrop-blur-md md:mb-5"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.52, ease }}
          >
            <ChefHat size={15} className="text-[#F5C518]" />
            <span className="font-ui text-[10px] font-bold uppercase tracking-[0.2em] text-[#F5C518] md:text-[11px]">
              Pull up to the yard
            </span>
          </motion.div>

          <motion.div
            className="relative mb-2 aspect-square w-[min(45vw,12rem)] md:mb-0 md:w-[min(24vw,16rem)]"
            style={{ x: mascotX, y: mascotY }}
            initial={{ opacity: 0, scale: 0.68, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.12, ease }}
          >
            <Image
              src="/hero-chefs/cutouts/pot-rankinz-logo.png"
              alt="Pot Rankinz Kitchen mascot"
              fill
              priority
              sizes="(min-width: 768px) 21rem, 48vw"
              className="object-contain drop-shadow-[0_24px_32px_rgba(0,0,0,0.62)]"
            />
          </motion.div>

          <motion.h1
            className="max-w-5xl font-display text-[clamp(4.3rem,16vw,9.8rem)] font-light uppercase leading-[0.76] [text-shadow:0_6px_28px_rgba(0,0,0,0.8)]"
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.24, ease }}
          >
            Welcome
            <br />
            <span className="text-[#F5C518]">to Pot</span>
            <br />
            <span className="text-[#4CAF50]">Rankinz</span>
          </motion.h1>

          <motion.p
            className="mt-4 max-w-2xl text-base leading-7 text-white/76 md:text-lg md:leading-7"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.58, delay: 0.42, ease }}
          >
            A one-stop entry into Jamaican flavor, catering energy, and the full
            kitchen experience.
          </motion.p>

          <motion.div
            className="mt-5 md:mt-6"
            initial={{ opacity: 0, y: 22, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.56, delay: 0.56, ease }}
          >
            <HomepageLink
              href="/"
              className="group inline-flex items-center gap-3 bg-[#F5C518] px-8 py-4 font-ui text-[13px] font-bold uppercase tracking-[0.18em] text-black shadow-[0_18px_46px_rgba(245,197,24,0.26)] transition-transform hover:scale-[1.03] md:px-10"
              style={{ clipPath: ROUGH_BTN }}
            >
              Enter the kitchen
              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </HomepageLink>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
