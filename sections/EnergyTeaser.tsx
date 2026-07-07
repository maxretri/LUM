'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'

export function EnergyTeaser() {
  const { t } = useLanguage()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1])

  return (
    <section ref={ref} className="relative h-[80vh] min-h-[520px] overflow-hidden bg-stone-950">
      <motion.div className="absolute inset-0" style={{ scale }}>
        <Image
          src="/images/energy/teaser.jpg"
          alt="LUM Energy — charging ecosystem"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />
      </motion.div>

      <div className="relative z-10 h-full flex items-center">
        <motion.div
          className="w-full max-w-[1440px] mx-auto px-6 sm:px-8"
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-emerald-200/70 text-[10px] sm:text-xs tracking-[0.4em] uppercase mb-5">
            {t('Introducing · LUM Energy')}
          </p>
          <h2 className="text-white font-extralight text-4xl sm:text-6xl md:text-7xl tracking-tight leading-[1.05] max-w-3xl mb-6">
            {t("We don't just build the car.")}<br />{t("We power it.")}
          </h2>
          <p className="text-white/70 font-light text-base sm:text-lg max-w-xl mb-10">
            {t('Home, villa and commercial charging — solar, storage and energy that, in effect, drives for free.')}
          </p>
          <Link
            href="/energy"
            className="inline-flex items-center gap-3 text-xs tracking-[0.2em] uppercase text-stone-900 bg-white px-7 py-4 hover:bg-stone-100 transition-colors duration-300"
          >
            {t('Explore LUM Energy')}
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
