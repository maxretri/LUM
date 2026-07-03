'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

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
  const [activeIdx, setActiveIdx] = useState<number | null>(null)

  const handleNext = useCallback(() => {
    if (activeIdx === null) return
    setActiveIdx((prev) => (prev !== null && prev < images.length - 1 ? prev + 1 : 0))
  }, [activeIdx, images.length])

  const handlePrev = useCallback(() => {
    if (activeIdx === null) return
    setActiveIdx((prev) => (prev !== null && prev > 0 ? prev - 1 : images.length - 1))
  }, [activeIdx, images.length])

  const handleClose = useCallback(() => {
    setActiveIdx(null)
  }, [])

  // Keyboard navigation
  useEffect(() => {
    if (activeIdx === null) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
      if (e.key === 'ArrowRight') handleNext()
      if (e.key === 'ArrowLeft') handlePrev()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeIdx, handleClose, handleNext, handlePrev])

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (activeIdx !== null) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [activeIdx])

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
              onClick={() => setActiveIdx(i)}
              className={`group relative overflow-hidden bg-stone-100 cursor-zoom-in ${SPANS[i % SPANS.length]}`}
            >
              <Image
                src={src}
                alt={`LUM LEV 01 gallery ${i + 1}`}
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-103"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {activeIdx !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/95 backdrop-blur-sm p-4 select-none">
            {/* Backdrop click to close */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="absolute inset-0 cursor-zoom-out"
            />

            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 text-white/70 hover:text-white transition-colors p-2 bg-stone-900/50 rounded-full backdrop-blur cursor-pointer"
              aria-label="Close gallery lightbox"
            >
              <X size={20} strokeWidth={1.5} />
            </button>

            {/* Navigation Left */}
            <button
              onClick={handlePrev}
              className="absolute left-3 sm:left-6 z-10 text-white/70 hover:text-white transition-colors p-2 sm:p-2.5 bg-stone-900/50 rounded-full backdrop-blur cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
            </button>

            {/* Main Image Container */}
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative w-full max-w-4xl h-[65vh] sm:h-[75vh] max-h-[460px] sm:max-h-[600px] flex items-center justify-center"
            >
              <Image
                src={images[activeIdx]}
                alt={`LUM LEV 01 gallery expanded ${activeIdx + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </motion.div>

            {/* Navigation Right */}
            <button
              onClick={handleNext}
              className="absolute right-3 sm:right-6 z-10 text-white/70 hover:text-white transition-colors p-2 sm:p-2.5 bg-stone-900/50 rounded-full backdrop-blur cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
            </button>

            {/* Index Counter at bottom */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-[10px] tracking-[0.25em] uppercase font-semibold">
              {activeIdx + 1} / {images.length}
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
