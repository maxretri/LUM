'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { EXPLORE_CARDS } from '@/lib/constants'

const MotionLink = motion.create(Link)

export function ExploreSection() {
  return (
    <section className="bg-white py-28" id="gallery">
      <div className="max-w-[1440px] mx-auto px-8">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[10px] tracking-[0.4em] uppercase text-stone-400 mb-2">Discover</p>
          <h2 className="text-4xl font-extralight text-stone-900">Explore LEV 01</h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {EXPLORE_CARDS.map((card) => (
            <MotionLink
              key={card.title}
              href={card.href}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
              }}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="group relative aspect-[3/4] overflow-hidden bg-stone-900 block"
            >
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 50vw, 20vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
                <span className="text-white text-sm font-light tracking-wide">{card.title}</span>
                <ArrowRight
                  size={16}
                  className="text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all duration-300"
                />
              </div>
            </MotionLink>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
