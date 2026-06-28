'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

export function LifestyleSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1])

  return (
    <section ref={ref} className="relative h-[70vh] overflow-hidden">
      <motion.div className="absolute inset-0" style={{ scale }}>
        <Image
          src="/images/lifestyle.jpg"
          alt="LUM LEV 01 on the open road"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Scrim only along the bottom so the vehicle stays clear */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
      </motion.div>

      <div className="relative z-10 h-full flex items-end">
        <motion.div
          className="w-full max-w-[1440px] mx-auto px-6 sm:px-8 pb-10 sm:pb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-white/60 text-[10px] sm:text-xs tracking-[0.4em] uppercase mb-3">
            Designed for the journey
          </p>
          <h2 className="text-white font-extralight text-4xl sm:text-6xl md:text-7xl tracking-tight leading-[1.05]">
            Drive further.<br />Live better.
          </h2>
        </motion.div>
      </div>
    </section>
  )
}
