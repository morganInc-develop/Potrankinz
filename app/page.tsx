import NavBar from '@/components/layout/NavBar'
import HeroSection from '@/components/sections/HeroSection'
import FeatureBar from '@/components/sections/FeatureBar'
import { HomepageCompletionSections } from '@/components/sections/HomepageSections'
import Footer from '@/components/sections/Footer'
import { footer } from '@/lib/kindred-home-data'

export default function Home() {
  return (
    <main className="overflow-x-hidden bg-[#0D0A06]">
      <NavBar />
      <HeroSection />
      <FeatureBar />
      <HomepageCompletionSections />
      <Footer {...footer} />
    </main>
  )
}
