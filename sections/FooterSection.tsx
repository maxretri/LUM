'use client'

import { motion } from 'framer-motion'

const FOOTER_NAV = ['LEV 01', 'Contact', 'Instagram', 'Privacy']

export function FooterSection() {
  return (
    <footer className="bg-white border-t border-stone-100 py-10">
      <motion.div
        className="max-w-[1440px] mx-auto px-8 flex flex-col sm:flex-row items-center justify-between gap-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <span className="text-sm font-light tracking-[0.3em] uppercase text-stone-700">LUM</span>

        <nav className="flex gap-8">
          {FOOTER_NAV.map((item) => (
            <a
              key={item}
              href="#"
              className="text-xs tracking-[0.15em] uppercase text-stone-400 hover:text-stone-700 transition-colors duration-300"
            >
              {item}
            </a>
          ))}
        </nav>

        <p className="text-[10px] text-stone-300 tracking-wider">
          © {new Date().getFullYear()} LUM Automotive
        </p>
      </motion.div>
    </footer>
  )
}
