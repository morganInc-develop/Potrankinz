import AnnouncementBar from '@/components/layout/AnnouncementBar'
import Header from '@/components/layout/Header'
import MobileBottomBar from '@/components/layout/MobileBottomBar'
import HeroSection from '@/components/sections/HeroSection'
import FeatureBar from '@/components/sections/FeatureBar'
import { HomepageCompletionSections } from '@/components/sections/HomepageSections'
import Footer from '@/components/sections/Footer'
import { announcementMessages, footer, navLinks } from '@/lib/kindred-home-data'

export default function Home() {
  return (
    <main className="overflow-x-hidden bg-[#0D0A06]">
      <AnnouncementBar messages={announcementMessages} />
      <Header leftLinks={navLinks.left} rightLinks={navLinks.right} />
      <HeroSection />
      <FeatureBar />
      <HomepageCompletionSections />
      <Footer {...footer} />
      <MobileBottomBar />
    </main>
  )
}
