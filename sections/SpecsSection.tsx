'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { AnimatedNumber } from '@/components/AnimatedNumber'
import { SPECS } from '@/lib/constants'

export function SpecsSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} id="specifications" className="bg-stone-50 py-20 border-t border-stone-100">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 divide-x divide-stone-200">
          {SPECS.map((spec, i) => (
            <motion.div
              key={spec.label}
              className="flex flex-col items-center py-10 px-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[10px] tracking-[0.25em] uppercase text-stone-400 mb-3">
                {spec.label}
              </p>
              <p className="text-5xl font-extralight text-stone-900 leading-none tabular-nums">
                <AnimatedNumber target={spec.value} />
              </p>
              {spec.unit && (
                <p className="text-sm text-stone-400 font-light mt-2">{spec.unit}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
