'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { COLORS } from '@/lib/constants'
import type { ColorOption } from '@/types'

export function ConfiguratorSection() {
  const [active, setActive] = useState<ColorOption>(COLORS[0])

  return (
    <section className="bg-white pt-16 pb-14 sm:pt-20 sm:pb-16">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-8">
        {/* Heading — compact */}
        <motion.div
          className="text-center mb-1"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[10px] tracking-[0.4em] uppercase text-stone-400 mb-2">Configure</p>
          <h2 className="text-3xl sm:text-4xl font-extralight text-stone-900">Choose your colour</h2>
        </motion.div>

        {/* Vehicle — aspect-ratio box hugs the car so there is no empty space */}
        <div className="relative w-full max-w-[1100px] mx-auto aspect-[16/10]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <Image
                src={active.image}
                alt={`LUM LEV 01 in ${active.name}`}
                fill
                priority
                className="object-contain object-center"
                sizes="(max-width: 1100px) 100vw, 1100px"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Minimal controls — sit just under the car */}
        <motion.div
          className="flex flex-col items-center gap-4 mt-2"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs tracking-[0.25em] uppercase text-stone-500">{active.name}</p>

          <div className="flex gap-4">
            {COLORS.map((color) => (
              <button
                key={color.id}
                onClick={() => setActive(color)}
                aria-label={color.name}
                aria-pressed={active.id === color.id}
                className="relative w-7 h-7 rounded-full transition-transform duration-300 hover:scale-110 focus:outline-none"
                style={{ backgroundColor: color.hex, boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.12)' }}
              >
                {active.id === color.id && (
                  <motion.span
                    layoutId="color-ring"
                    className="absolute -inset-1.5 rounded-full ring-1 ring-stone-400"
                  />
                )}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
