'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { LANDING_GALLERY } from '@/lib/constants'

const SPANS = [
  'lg:col-span-2 lg:row-span-2',
  'lg:col-span-1',
  'lg:col-span-1',
  'lg:col-span-1',
  'lg:col-span-1',
  'lg:col-span-2',
]

export function GallerySection() {
  return (
    <section id="gallery" className="bg-white py-24 lg:py-28 scroll-mt-16">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8">
        <motion.div
          className="flex items-end justify-between mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <p className="text-[10px] tracking-[0.4em] uppercase text-stone-400 mb-2">Gallery</p>
            <h2 className="text-3xl sm:text-4xl font-extralight text-stone-900">The LEV 01, in full.</h2>
          </div>
          <Link
            href="/gallery"
            className="hidden sm:inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-stone-500 hover:text-stone-900 transition-colors duration-300"
          >
            View all
            <ArrowRight size={16} />
          </Link>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[160px] sm:auto-rows-[220px] lg:auto-rows-[240px] gap-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
        >
          {LANDING_GALLERY.map((src, i) => (
            <motion.div
              key={src}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
              }}
              className={`group relative overflow-hidden bg-stone-100 ${SPANS[i % SPANS.length]}`}
            >
              <Image
                src={src}
                alt={`LUM LEV 01 gallery ${i + 1}`}
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
