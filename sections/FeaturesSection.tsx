'use client'

import { motion } from 'framer-motion'
import { FeatureIcon } from '@/components/FeatureIcon'
import { FEATURES } from '@/lib/constants'

export function FeaturesSection() {
  return (
    <section className="bg-stone-50 py-28">
      <div className="max-w-[1440px] mx-auto px-8">
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {FEATURES.map((feature) => (
            <motion.div
              key={feature.title}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
              }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="group flex flex-col items-center text-center py-12 px-6 bg-white hover:bg-stone-900 transition-colors duration-500 cursor-default"
            >
              <div className="text-stone-400 group-hover:text-stone-200 transition-colors duration-500 mb-6">
                <FeatureIcon name={feature.icon} size={28} />
              </div>
              <h3 className="text-sm font-medium tracking-wide text-stone-800 group-hover:text-white transition-colors duration-500 mb-3">
                {feature.title}
              </h3>
              <p className="text-xs text-stone-400 group-hover:text-stone-300 transition-colors duration-500 leading-relaxed whitespace-pre-line">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
