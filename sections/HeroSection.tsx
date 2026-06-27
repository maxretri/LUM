'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

export function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section ref={ref} id="overview" className="relative h-[70vh] min-h-[480px] overflow-hidden">
      {/* Parallax image */}
      <motion.div className="absolute inset-0 scale-110" style={{ y }}>
        <Image
          src="/images/hero.jpg"
          alt="LUM LEV 01 — Taupe"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 h-full flex flex-col justify-end pb-12 px-8 max-w-[1440px] mx-auto"
        style={{ opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        >
          <p className="text-white/60 text-xs tracking-[0.4em] uppercase mb-4">
            Introducing
          </p>
          <h1 className="text-white font-extralight text-6xl md:text-8xl tracking-tight leading-none mb-4">
            LEV 01
          </h1>
          <p className="text-white/70 text-base font-light tracking-wide max-w-sm">
            The electric vehicle reimagined.<br />Pure range. Pure refinement.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
          className="mt-6 flex gap-4"
        >
          <a
            href="#specifications"
            className="text-xs tracking-[0.2em] uppercase text-white border border-white/50 px-6 py-3 hover:bg-white hover:text-stone-900 transition-all duration-300"
          >
            Explore
          </a>
          <a
            href="#quote"
            className="text-xs tracking-[0.2em] uppercase text-stone-900 bg-white px-6 py-3 hover:bg-stone-100 transition-all duration-300"
          >
            Request Quote
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="hidden md:flex absolute bottom-6 right-8 flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        style={{ opacity }}
      >
        <span className="text-white/40 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          className="w-px h-12 bg-white/30"
          animate={{ scaleY: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: 'top' }}
        />
      </motion.div>
    </section>
  )
}
