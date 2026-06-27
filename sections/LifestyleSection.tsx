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
          alt="LUM LEV 1 on the open road"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/30" />
      </motion.div>

      <div className="relative z-10 h-full flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-white/50 text-xs tracking-[0.4em] uppercase mb-4">
            Designed for the journey
          </p>
          <h2 className="text-white font-extralight text-5xl md:text-7xl tracking-tight">
            Drive further.<br />Live better.
          </h2>
        </motion.div>
      </div>
    </section>
  )
}
