'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { COLORS } from '@/lib/constants'
import type { ColorOption } from '@/types'

export function ConfiguratorSection() {
  const [active, setActive] = useState<ColorOption>(COLORS[0])

  return (
    <section className="bg-white py-28">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: picker */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[10px] tracking-[0.4em] uppercase text-stone-400 mb-2">
              Configure
            </p>
            <h2 className="text-4xl font-extralight text-stone-900 mb-2">
              Choose your colour
            </h2>
            <p className="text-stone-400 font-light text-sm mb-10">
              {active.name}
            </p>

            <div className="flex gap-4">
              {COLORS.map((color) => (
                <button
                  key={color.id}
                  onClick={() => setActive(color)}
                  aria-label={color.name}
                  className="relative w-10 h-10 rounded-full transition-all duration-300 focus:outline-none"
                  style={{ backgroundColor: color.hex }}
                >
                  {active.id === color.id && (
                    <motion.span
                      layoutId="color-ring"
                      className="absolute inset-0 rounded-full ring-2 ring-offset-2 ring-stone-400"
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="mt-16 pt-8 border-t border-stone-100">
              <div className="grid grid-cols-3 gap-8">
                {[
                  { label: 'Starting from', value: 'AED 89,000' },
                  { label: 'Delivery', value: 'Q2 2026' },
                  { label: 'Warranty', value: '8 Years' },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-stone-400 mb-1">{item.label}</p>
                    <p className="text-lg font-light text-stone-800">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: car image */}
          <div className="relative h-72 lg:h-[420px]">
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
                  alt={`LUM LEV 1 in ${active.name}`}
                  fill
                  className="object-contain object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
