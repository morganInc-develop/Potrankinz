import type { Metadata } from 'next'
import Image from 'next/image'
import { ArrowRight, Clock, Flame, Heart, Users } from 'lucide-react'

import AnnouncementBar from '@/components/layout/AnnouncementBar'
import Header from '@/components/layout/Header'
import MobileBottomBar from '@/components/layout/MobileBottomBar'
import Footer from '@/components/sections/Footer'
import TornEdge from '@/components/ui/TornEdge'
import HomepageLink from '@/components/ui/homepage-link'
import { announcementMessages, footer, navLinks } from '@/lib/kindred-home-data'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Meet Pot Rankinz, a Caribbean food truck serving authentic island cooking, bold flavors, and warm hospitality.',
}

const ROUGH_BTN =
  'polygon(0% 10%, 4% 2%, 10% 8%, 17% 0%, 24% 8%, 31% 2%, 38% 10%, 45% 2%, 52% 8%, 59% 2%, 66% 8%, 73% 0%, 80% 10%, 87% 2%, 94% 8%, 100% 5%, 99% 50%, 100% 95%, 96% 100%, 89% 90%, 82% 100%, 75% 92%, 68% 100%, 61% 90%, 54% 100%, 47% 92%, 40% 100%, 33% 90%, 26% 100%, 19% 92%, 12% 100%, 5% 90%, 0% 95%, 1% 50%)'

const values = [
  {
    title: 'Real flavor',
    body: 'Fresh ingredients, handcrafted seasonings, and recipes inspired by generations of Caribbean cooking.',
    Icon: Flame,
  },
  {
    title: 'Made with heart',
    body: 'Every plate celebrates Caribbean culture, family, and the joy of coming together over great food.',
    Icon: Heart,
  },
  {
    title: 'For the people',
    body: 'Generous portions, exceptional quality, and friendly service that makes every customer feel like family.',
    Icon: Users,
  },
]

export default function AboutPage() {
  return (
    <main className="overflow-x-hidden bg-[#050505] pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-0">
      <AnnouncementBar messages={announcementMessages} />
      <Header leftLinks={navLinks.left} rightLinks={navLinks.right} />

      <section className="relative min-h-[78svh] overflow-hidden px-6 pb-20 pt-40 text-white md:px-8 lg:px-14">
        <Image
          src="/menu-images/jerk-chicken.jpg"
          alt="Pot Rankinz Jamaican food"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/72" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_30%,rgba(196,30,58,0.34),transparent_30%),radial-gradient(circle_at_82%_24%,rgba(245,197,24,0.22),transparent_28%),radial-gradient(circle_at_62%_88%,rgba(76,175,80,0.24),transparent_34%)]" />
        <div className="relative z-10 mx-auto flex min-h-[58svh] max-w-[90rem] items-end">
          <div className="max-w-5xl">
            <p className="font-ui text-[12px] font-bold uppercase tracking-[0.24em] text-[#F5C518]">
              About Pot Rankinz
            </p>
            <h1 className="mt-5 font-display text-[clamp(4.6rem,11vw,11rem)] font-light uppercase leading-[0.8]">
              Made with heart.
              <br />
              <span className="text-[#4CAF50]">Built for the people.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-7 text-white/76 md:text-lg">
              Pot Rankinz is a Caribbean food truck bringing the heart and soul
              of the islands to every street we serve.
            </p>
          </div>
        </div>
      </section>

      <TornEdge variant={1} fill="#F5C518" />

      <section className="bg-[#F5C518] px-6 py-20 text-black md:px-8 md:py-28 lg:px-14">
        <div className="mx-auto grid max-w-[90rem] gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
          <div className="relative aspect-[4/5] overflow-hidden shadow-[10px_12px_0_rgba(196,30,58,0.28)]">
            <Image
              src="/menu-images/ackee-saltfish.jpg"
              alt="Ackee and saltfish from Pot Rankinz Kitchen"
              fill
              sizes="(min-width: 1024px) 42vw, 92vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-ui text-[12px] font-bold uppercase tracking-[0.22em] text-[#C41E3A]">
              Our kitchen
            </p>
            <h2 className="mt-4 font-display text-[clamp(3.6rem,7vw,8rem)] font-light uppercase leading-[0.84]">
              Food that feels like home.
            </h2>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-black/72">
              Our food truck was built from a passion for authentic island
              cooking, bold flavors, and sharing the rich traditions of
              Caribbean cuisine with our community.
            </p>
            <p className="mt-5 max-w-2xl text-base leading-7 text-black/64">
              Every dish is made with fresh ingredients, handcrafted seasonings,
              and recipes inspired by generations of Caribbean cooking. From
              smoky jerk chicken and tender, fall-off-the-bone oxtails to
              flavorful curry goat, savory brown stew chicken, and fresh,
              perfectly seasoned seafood, every bite is packed with authentic
              island flavor.
            </p>
            <p className="mt-5 max-w-2xl text-base leading-7 text-black/64">
              At Pot Rankinz, food is more than a meal—it is a celebration of
              culture, family, and togetherness. Whether you are a longtime fan
              of Caribbean cuisine or trying it for the first time, we are
              committed to generous portions, exceptional quality, and friendly
              service that makes you feel like family.
            </p>
            <p className="mt-5 max-w-2xl text-base font-semibold leading-7 text-black/76">
              Come find Pot Rankinz, grab a plate, and experience the true taste
              of the Caribbean—one delicious bite at a time.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#050505] px-6 py-20 text-white md:px-8 md:py-28 lg:px-14">
        <div className="mx-auto max-w-[90rem]">
          <p className="font-ui text-[12px] font-bold uppercase tracking-[0.22em] text-[#4CAF50]">
            What guides us
          </p>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {values.map(({ title, body, Icon }, index) => (
              <article
                key={title}
                className="border border-white/12 bg-white/[0.05] p-6 shadow-[6px_8px_0_rgba(245,197,24,0.12)] md:p-8"
              >
                <span
                  className={`grid h-12 w-12 place-items-center text-black ${
                    index === 0
                      ? 'bg-[#C41E3A] text-white'
                      : index === 1
                        ? 'bg-[#F5C518]'
                        : 'bg-[#4CAF50]'
                  }`}
                >
                  <Icon size={22} />
                </span>
                <h2 className="mt-7 font-display text-4xl font-light uppercase leading-none text-white">
                  {title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-white/62">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <TornEdge variant={2} fill="#4CAF50" />

      <section className="bg-[#4CAF50] px-6 py-16 text-black md:px-8 md:py-20 lg:px-14">
        <div className="mx-auto flex max-w-[90rem] flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="flex items-center gap-2 font-ui text-[12px] font-bold uppercase tracking-[0.2em]">
              <Clock size={17} />
              Hours of operation
            </p>
            <h2 className="mt-3 font-display text-[clamp(3.2rem,7vw,7rem)] font-light uppercase leading-[0.86]">
              Every day.
              <br />
              6:00am until sold out.
            </h2>
          </div>
          <div className="flex flex-wrap gap-4">
            <HomepageLink
              href="/menu"
              className="inline-flex items-center gap-2 bg-black px-8 py-4 font-ui text-[12px] font-bold uppercase tracking-[0.16em] text-white"
              style={{ clipPath: ROUGH_BTN }}
            >
              View menu
              <ArrowRight size={16} />
            </HomepageLink>
            <HomepageLink
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#C41E3A] px-8 py-4 font-ui text-[12px] font-bold uppercase tracking-[0.16em] text-white"
              style={{ clipPath: ROUGH_BTN }}
            >
              Contact us
            </HomepageLink>
          </div>
        </div>
      </section>

      <Footer {...footer} />
      <MobileBottomBar />
    </main>
  )
}
