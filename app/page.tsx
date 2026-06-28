import { Navigation } from '@/components/Navigation'
import { HeroSection } from '@/sections/HeroSection'
import { SpecsSection } from '@/sections/SpecsSection'
import { ConfiguratorSection } from '@/sections/ConfiguratorSection'
import { EnergyTeaser } from '@/sections/EnergyTeaser'
import { FeaturesSection } from '@/sections/FeaturesSection'
import { LifestyleSection } from '@/sections/LifestyleSection'
import { ExploreSection } from '@/sections/ExploreSection'
import { GallerySection } from '@/sections/GallerySection'
import { FooterSection } from '@/sections/FooterSection'

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <SpecsSection />
        <ConfiguratorSection />
        <EnergyTeaser />
        <FeaturesSection />
        <LifestyleSection />
        <ExploreSection />
        <GallerySection />
      </main>
      <FooterSection />
    </>
  )
}
