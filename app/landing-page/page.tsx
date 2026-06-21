import AmbientMusicPlayer from '@/components/audio/AmbientMusicPlayer'
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
    <main className="overflow-x-hidden bg-[#0D0A06] pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-0">
      <AnnouncementBar messages={announcementMessages} />
      <Header leftLinks={navLinks.left} rightLinks={navLinks.right} />
      <AmbientMusicPlayer
        src="/audio/riddim-at-pot-rankin-kitchen.mp3"
        title="Riddim at Pot Rankin Kitchen"
      />
      <HeroSection />
      <FeatureBar />
      <HomepageCompletionSections />
      <Footer {...footer} />
      <MobileBottomBar />
    </main>
  )
}
