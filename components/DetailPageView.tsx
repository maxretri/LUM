import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Navigation } from '@/components/Navigation'
import { PageHero } from '@/components/PageHero'
import { ShowcaseSection } from '@/sections/ShowcaseSection'
import { GalleryGrid } from '@/sections/GalleryGrid'
import { FooterSection } from '@/sections/FooterSection'
import type { DetailPageData } from '@/types'

interface DetailPageViewProps {
  data: DetailPageData
}

export function DetailPageView({ data }: DetailPageViewProps) {
  return (
    <>
      <Navigation />
      <main>
        <PageHero
          eyebrow={data.eyebrow}
          title={data.title}
          subtitle={data.subtitle}
          image={data.heroImage}
          align={data.slug === 'energy' || data.slug === 'performance' ? 'top' : 'bottom'}
        />

        {data.blocks.map((item) => (
          <ShowcaseSection key={item.id} item={item} />
        ))}

        {data.gallery && data.gallery.length > 0 && <GalleryGrid images={data.gallery} />}

        {/* Back to overview */}
        <div className="bg-white pb-24">
          <div className="max-w-[1440px] mx-auto px-8">
            <Link
              href="/#overview"
              className="inline-flex items-center gap-3 text-xs tracking-[0.2em] uppercase text-stone-500 hover:text-stone-900 transition-colors duration-300"
            >
              <ArrowLeft size={16} />
              Back to overview
            </Link>
          </div>
        </div>
      </main>
      <FooterSection />
    </>
  )
}
