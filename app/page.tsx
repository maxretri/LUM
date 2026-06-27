import { Navigation } from '@/components/Navigation'
import { HeroSection } from '@/sections/HeroSection'
import { SpecsSection } from '@/sections/SpecsSection'
import { ConfiguratorSection } from '@/sections/ConfiguratorSection'
import { ShowcaseSection } from '@/sections/ShowcaseSection'
import { FeaturesSection } from '@/sections/FeaturesSection'
import { LifestyleSection } from '@/sections/LifestyleSection'
import { ExploreSection } from '@/sections/ExploreSection'
import { FooterSection } from '@/sections/FooterSection'
import { SHOWCASES } from '@/lib/constants'

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <SpecsSection />
        <ConfiguratorSection />
        {SHOWCASES.map((item) => (
          <ShowcaseSection key={item.id} item={item} />
        ))}
        <FeaturesSection />
        <LifestyleSection />
        <ExploreSection />
      </main>
      <FooterSection />
    </>
  )
}
