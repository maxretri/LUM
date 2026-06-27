import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Navigation } from '@/components/Navigation'
import { FooterSection } from '@/sections/FooterSection'

export interface LegalSection {
  heading: string
  body: string[]
}

interface LegalPageProps {
  title: string
  updated: string
  intro: string
  sections: LegalSection[]
}

export function LegalPage({ title, updated, intro, sections }: LegalPageProps) {
  return (
    <>
      <Navigation />
      <main className="bg-white">
        {/* Spacer for the fixed nav */}
        <div className="h-16" />

        <article className="max-w-3xl mx-auto px-6 sm:px-8 pt-16 pb-24">
          <p className="text-[10px] tracking-[0.4em] uppercase text-stone-400 mb-4">Legal</p>
          <h1 className="text-4xl md:text-5xl font-extralight text-stone-900 tracking-tight mb-4">
            {title}
          </h1>
          <p className="text-xs uppercase tracking-[0.2em] text-stone-400 mb-10">
            Last updated · {updated}
          </p>

          <p className="text-stone-600 font-light leading-relaxed mb-12">{intro}</p>

          <div className="space-y-10">
            {sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-lg font-medium text-stone-900 mb-3">{section.heading}</h2>
                {section.body.map((p, i) => (
                  <p key={i} className="text-stone-500 font-light leading-relaxed mb-3">
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-stone-100">
            <Link
              href="/#overview"
              className="inline-flex items-center gap-3 text-xs tracking-[0.2em] uppercase text-stone-500 hover:text-stone-900 transition-colors duration-300"
            >
              <ArrowLeft size={16} />
              Back to overview
            </Link>
          </div>
        </article>
      </main>
      <FooterSection />
    </>
  )
}
