'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface GalleryGridProps {
  images: string[]
}

// Varied tile spans for an editorial, gallery-like rhythm.
const SPANS = [
  'lg:col-span-2 lg:row-span-2',
  'lg:col-span-1',
  'lg:col-span-1',
  'lg:col-span-1',
  'lg:col-span-1',
  'lg:col-span-2',
]

export function GalleryGrid({ images }: GalleryGridProps) {
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="max-w-[1440px] mx-auto px-8">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[220px] lg:auto-rows-[260px] gap-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {images.map((src, i) => (
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
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
