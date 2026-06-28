'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { ShowcaseItem } from '@/types'

interface ShowcaseSectionProps {
  item: ShowcaseItem
}

export function ShowcaseSection({ item }: ShowcaseSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1])

  return (
    <section ref={ref} id={item.id} className="bg-white py-24 lg:py-32">
      <div className="max-w-[1440px] mx-auto px-8">
        <div
          className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
            item.reverse ? 'lg:[&>*:first-child]:order-2' : ''
          }`}
        >
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
            <motion.div className="absolute inset-0" style={{ scale }}>
              <Image
                src={item.image}
                alt={`LUM LEV 01 — ${item.eyebrow}`}
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[10px] tracking-[0.4em] uppercase text-stone-400 mb-4">
              {item.eyebrow}
            </p>
            <h2 className="text-4xl lg:text-5xl font-extralight text-stone-900 leading-[1.1] tracking-tight whitespace-pre-line mb-6">
              {item.title}
            </h2>
            <p className="text-stone-500 font-light leading-relaxed max-w-md mb-10">
              {item.description}
            </p>

            <div className="grid grid-cols-3 gap-6 border-t border-stone-100 pt-8">
              {item.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-stone-400 mb-2">
                    {stat.label}
                  </p>
                  <p className="text-xl font-light text-stone-900">{stat.value}</p>
                </div>
              ))}
            </div>

            {item.cta && (
              <Link
                href={item.cta.href}
                className="inline-flex items-center gap-3 mt-10 text-xs tracking-[0.2em] uppercase text-stone-900 border border-stone-900 px-6 py-3.5 hover:bg-stone-900 hover:text-white transition-colors duration-300"
              >
                {item.cta.label}
                <ArrowRight size={16} />
              </Link>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
