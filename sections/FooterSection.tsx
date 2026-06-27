'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Logo } from '@/components/Logo'

const FOOTER_LINKS: { label: string; href: string }[] = [
  { label: 'LEV 01', href: '/#overview' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/#quote' },
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'Terms', href: '/terms' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Cookies', href: '/cookies' },
]

export function FooterSection() {
  return (
    <footer className="bg-white border-t border-stone-100 py-10">
      <motion.div
        className="max-w-[1440px] mx-auto px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <Link href="/" aria-label="LUM — home" className="text-stone-700">
          <Logo height={16} />
        </Link>

        <nav className="flex flex-wrap justify-center gap-x-7 gap-y-3">
          {FOOTER_LINKS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-xs tracking-[0.15em] uppercase text-stone-400 hover:text-stone-700 transition-colors duration-300"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <p className="text-[10px] text-stone-300 tracking-wider whitespace-nowrap">
          © {new Date().getFullYear()} LUM Automotive
        </p>
      </motion.div>
    </footer>
  )
}
