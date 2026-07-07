'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { TextReveal } from '@/components/TextReveal'

interface PageHeroProps {
  eyebrow: string
  title: string
  subtitle: string
  image: string
  align?: 'top' | 'bottom'
}

export function PageHero({ eyebrow, title, subtitle, image, align = 'bottom' }: PageHeroProps) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section ref={ref} className="relative h-[68vh] min-h-[460px] overflow-hidden">
      {/* Background parallax and load zoom-out animation */}
      <motion.div className="absolute inset-0 overflow-hidden" style={{ y }}>
        <motion.div
          className="relative w-full h-full"
          initial={{ scale: 1.15 }}
          animate={{ scale: 1.05 }}
          transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image src={image} alt={title} fill priority className="object-cover object-center" sizes="100vw" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />
      </motion.div>

      <motion.div
        className={`relative z-10 h-full flex flex-col px-8 max-w-[1440px] mx-auto ${
          align === 'top' ? 'justify-start pt-28 sm:pt-32' : 'justify-end pb-16'
        }`}
        style={{ opacity }}
      >
        <motion.p
          className="text-white/60 text-xs tracking-[0.4em] uppercase mb-4"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          {eyebrow}
        </motion.p>
        
        <h1 className="text-white font-extralight text-5xl md:text-7xl tracking-tight leading-[1.05] max-w-3xl mb-5">
          <TextReveal text={title} delay={0.2} />
        </h1>

        <motion.p
          className="text-white/70 text-base md:text-lg font-light max-w-md"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        >
          {subtitle}
        </motion.p>
      </motion.div>
    </section>
  )
}
