'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

interface PageHeroProps {
  eyebrow: string
  title: string
  subtitle: string
  image: string
}

export function PageHero({ eyebrow, title, subtitle, image }: PageHeroProps) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section ref={ref} className="relative h-[68vh] min-h-[460px] overflow-hidden">
      <motion.div className="absolute inset-0 scale-110" style={{ y }}>
        <Image src={image} alt={title} fill priority className="object-cover object-center" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />
      </motion.div>

      <motion.div
        className="relative z-10 h-full flex flex-col justify-end pb-16 px-8 max-w-[1440px] mx-auto"
        style={{ opacity }}
      >
        <motion.p
          className="text-white/60 text-xs tracking-[0.4em] uppercase mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          className="text-white font-extralight text-5xl md:text-7xl tracking-tight leading-[1.05] max-w-3xl mb-5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        >
          {title}
        </motion.h1>
        <motion.p
          className="text-white/70 text-base md:text-lg font-light max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
        >
          {subtitle}
        </motion.p>
      </motion.div>
    </section>
  )
}
