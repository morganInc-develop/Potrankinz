'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import type { ReactElement } from 'react'
import { motion } from 'framer-motion'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { GiForkKnifeSpoon, GiWineGlass } from 'react-icons/gi'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

import HomepageLink from '@/components/ui/homepage-link'

const TAB_ICONS: Record<string, ReactElement> = {
  'Tasting Menu': <GiForkKnifeSpoon className="h-3.5 w-3.5" />,
  'A La Carte': <GiForkKnifeSpoon className="h-3.5 w-3.5" />,
  Cellar: <GiWineGlass className="h-3.5 w-3.5" />,
}

interface Product {
  title: string
  price: string
  href: string
  image: string
  hoverImage: string
}

interface CategoryRailProps {
  tabs: string[]
  products: Product[]
}

gsap.registerPlugin(ScrollTrigger)

export default function CategoryRail({ tabs, products }: CategoryRailProps) {
  const [activeTab, setActiveTab] = useState(tabs[0])
  const scrollerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const cardRefs = useRef<(HTMLSpanElement | null)[]>([])

  const scrollByAmount = (direction: 'left' | 'right') => {
    const node = scrollerRef.current
    if (!node) return
    node.scrollBy({
      left: direction === 'left' ? -340 : 340,
      behavior: 'smooth',
    })
  }

  useGSAP(
    () => {
      const cards = cardRefs.current.filter(Boolean)
      if (!cards.length) return

      gsap.from(cards, {
        opacity: 0,
        y: 52,
        scale: 0.98,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          once: true,
        },
      })
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      className="bg-warm-white px-6 pb-10 pt-4 md:px-8 lg:px-10"
    >
      <div className="mx-auto max-w-[84rem]">
        <div className="flex items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-4 md:gap-6">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-1.5 border-b pb-1 font-special text-[11px] uppercase tracking-[0.2em] transition-colors ${
                  activeTab === tab
                    ? 'border-[#7B1F1F] text-[#7B1F1F]'
                    : 'border-transparent text-black/48'
                }`}
              >
                {TAB_ICONS[tab] && (
                  <span aria-hidden className="opacity-70">
                    {TAB_ICONS[tab]}
                  </span>
                )}
                {tab}
              </button>
            ))}
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <button
              onClick={() => scrollByAmount('left')}
              className="rounded-full border border-black/12 p-2 text-black/70"
            >
              <FiChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => scrollByAmount('right')}
              className="rounded-full border border-black/12 p-2 text-black/70"
            >
              <FiChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="mt-10 flex snap-x gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {products.map((product, index) => (
            /* perspective per card for independent tilt */
            <div key={product.title} style={{ perspective: '900px' }}>
              <motion.div
                ref={(node) => {
                  cardRefs.current[index] = node
                }}
                whileHover={{ y: -5, rotateY: 2, rotateX: -1 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
                className="group min-w-[16.25rem] snap-start shadow-paper md:min-w-[17rem] lg:min-w-[18rem]"
              >
                <HomepageLink href={product.href} className="block">
                  <div className="relative aspect-[3/4] overflow-hidden bg-[#efe8e1]">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      sizes="(max-width: 768px) 70vw, 18rem"
                      className="object-cover transition-all duration-700 group-hover:scale-[1.03] group-hover:opacity-0"
                    />
                    <Image
                      src={product.hoverImage}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 70vw, 18rem"
                      className="object-cover opacity-0 transition-all duration-700 group-hover:scale-[1.03] group-hover:opacity-100"
                    />
                    <div className="dog-ear-corner" aria-hidden />
                  </div>
                  <div className="mt-3 flex items-start justify-between gap-4 px-0.5 pb-0.5">
                    <div>
                      <h3 className="font-ui text-[11px] uppercase tracking-[0.12em] text-black">
                        {product.title}
                      </h3>
                      <p className="mt-2 font-ui text-[12px] text-black/54">
                        {product.price}
                      </p>
                    </div>
                    <span className="font-ui text-[11px] uppercase tracking-[0.2em] text-[#F5C518]">
                      +
                    </span>
                  </div>
                </HomepageLink>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
