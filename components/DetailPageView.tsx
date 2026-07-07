'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Navigation } from '@/components/Navigation'
import { PageHero } from '@/components/PageHero'
import { ShowcaseSection } from '@/sections/ShowcaseSection'
import { GalleryGrid } from '@/sections/GalleryGrid'
import { FooterSection } from '@/sections/FooterSection'
import type { DetailPageData } from '@/types'
import { useLanguage } from '@/lib/LanguageContext'

interface DetailPageViewProps {
  data: DetailPageData
}

export function DetailPageView({ data }: DetailPageViewProps) {
  const { t } = useLanguage()

  const translatedData = {
    ...data,
    eyebrow: t(data.eyebrow),
    title: t(data.title),
    subtitle: t(data.subtitle),
    blocks: data.blocks.map((block) => ({
      ...block,
      eyebrow: t(block.eyebrow),
      title: t(block.title),
      description: t(block.description),
      stats: block.stats.map((stat) => ({
        label: t(stat.label),
        value: t(stat.value),
      })),
      cta: block.cta ? { label: t(block.cta.label), href: block.cta.href } : undefined,
    })),
  }

  return (
    <>
      <Navigation />
      <main>
        <PageHero
          eyebrow={translatedData.eyebrow}
          title={translatedData.title}
          subtitle={translatedData.subtitle}
          image={data.heroImage}
          align={data.slug === 'energy' || data.slug === 'performance' ? 'top' : 'bottom'}
        />

        {translatedData.blocks.map((item) => (
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
              {t('Back to overview')}
            </Link>
          </div>
        </div>
      </main>
      <FooterSection />
    </>
  )
}
