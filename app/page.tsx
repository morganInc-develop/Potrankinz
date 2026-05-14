import NavBar from '@/components/layout/NavBar'
import HeroSection from '@/components/sections/HeroSection'
import FeatureBar from '@/components/sections/FeatureBar'

export default function Home() {
  return (
    <main className="overflow-x-hidden bg-[#0D0A06]">
      <NavBar />
      <HeroSection />
      <FeatureBar />
    </main>
  )
}
