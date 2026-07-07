'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { COLORS, CAR_VIEWS } from '@/lib/constants'
import type { ColorOption, CarView } from '@/types'
import { useLanguage } from '@/lib/LanguageContext'

export function ConfiguratorSection() {
  const { t } = useLanguage()
  const [active, setActive] = useState<ColorOption>(COLORS[0])
  const [view, setView] = useState<CarView>('side')

  const src = active.images[view]

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
          <p className="text-[10px] tracking-[0.4em] uppercase text-stone-400 mb-2">{t('Configure')}</p>
          <h2 className="text-3xl sm:text-4xl font-extralight text-stone-900">{t('Choose your colour')}</h2>
        </motion.div>

        {/* Vehicle — crossfades on both colour and angle change */}
        <div className="relative w-full max-w-[1100px] mx-auto aspect-[16/10]">
          <AnimatePresence mode="wait">
            <motion.div
              key={src}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: 'easeInOut' }}
            >
              <Image
                src={src}
                alt={`LUM LEV 01 in ${active.name} — ${view} view`}
                fill
                priority
                className="object-contain object-center"
                sizes="(max-width: 1100px) 100vw, 1100px"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Angle switcher — sits just under the car */}
        <motion.div
          className="flex justify-center mt-1"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-1 border border-stone-200 rounded-full p-1">
            {CAR_VIEWS.map((v) => {
              const activeView = v.id === view
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setView(v.id)}
                  aria-pressed={activeView}
                  className={`relative px-4 py-1.5 rounded-full text-[11px] tracking-[0.15em] uppercase transition-colors duration-300 ${
                    activeView ? 'text-white' : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  {activeView && (
                    <motion.span
                      layoutId="view-pill"
                      className="absolute inset-0 rounded-full bg-stone-900"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{t(v.label)}</span>
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* Colour selector */}
        <motion.div
          className="flex flex-col items-center gap-4 mt-6"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs tracking-[0.25em] uppercase text-stone-500">{t(active.name)}</p>

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
