'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { NAV_ITEMS } from '@/lib/constants'

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-md border-b border-stone-200/60'
          : 'bg-transparent'
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="max-w-[1440px] mx-auto px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className={`text-xl font-light tracking-[0.3em] uppercase transition-colors duration-300 ${scrolled ? 'text-stone-900' : 'text-white'}`}>
          LUM
        </Link>

        {/* Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-xs tracking-[0.15em] uppercase transition-colors duration-300 hover:opacity-60 ${
                scrolled ? 'text-stone-700' : 'text-white/90'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="#quote"
          className={`hidden lg:block text-xs tracking-[0.15em] uppercase px-5 py-2.5 border transition-all duration-300 ${
            scrolled
              ? 'border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white'
              : 'border-white/70 text-white hover:bg-white hover:text-stone-900'
          }`}
        >
          Request Quote
        </a>
      </div>
    </motion.header>
  )
}
