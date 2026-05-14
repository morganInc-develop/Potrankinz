import AnnouncementBar from '@/components/layout/AnnouncementBar'
import Header from '@/components/layout/Header'
import MobileBottomBar from '@/components/layout/MobileBottomBar'
import CategoryRail from '@/components/sections/CategoryRail'
import CategoryTypography from '@/components/sections/CategoryTypography'
import Footer from '@/components/sections/Footer'
import HandmadeInIreland from '@/components/sections/HandmadeInIreland'
import Hero from '@/components/sections/Hero'
import HouseSignatures from '@/components/sections/HouseSignatures'
import InstagramCollage from '@/components/sections/InstagramCollage'
import Mission from '@/components/sections/Mission'
import RainbowRestock from '@/components/sections/RainbowRestock'
import StoriesEvents from '@/components/sections/StoriesEvents'
import TornEdge from '@/components/ui/TornEdge'
import {
  announcementMessages,
  categoryRail,
  footer,
  giantCategories,
  handmadeInIrelandSlides,
  hero,
  houseSignatures,
  instagramImages,
  mission,
  navLinks,
  rainbowRestock,
  stories,
} from '@/lib/kindred-home-data'

export default function Home() {
  return (
    <main className="overflow-x-hidden bg-warm-white pb-16 md:pb-0">
      <AnnouncementBar messages={announcementMessages} />
      <Header leftLinks={navLinks.left} rightLinks={navLinks.right} />
      <Hero {...hero} />
      <TornEdge variant={1} />
      <Mission {...mission} />
      <CategoryRail {...categoryRail} />
      <TornEdge variant={2} />
      <CategoryTypography {...giantCategories} />
      <RainbowRestock {...rainbowRestock} />
      <HouseSignatures {...houseSignatures} />
      <TornEdge variant={3} />
      <HandmadeInIreland slides={handmadeInIrelandSlides} />
      <StoriesEvents stories={stories} />
      <TornEdge variant={1} />
      <InstagramCollage images={instagramImages} />
      <Footer {...footer} />
      <MobileBottomBar />
    </main>
  )
}
