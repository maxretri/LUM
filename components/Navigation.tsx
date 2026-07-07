'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Logo } from '@/components/Logo'
import { NAV_ITEMS } from '@/lib/constants'
import { useLanguage } from '@/lib/LanguageContext'

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const dark = scrolled || open

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled && !open
          ? 'bg-white/80 backdrop-blur-md border-b border-stone-200/60'
          : open
            ? 'bg-white'
            : 'bg-transparent'
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          onClick={() => setOpen(false)}
          aria-label="LUM — home"
          className={`transition-colors duration-300 ${dark ? 'text-stone-900' : 'text-white'}`}
        >
          <Logo height={18} />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-xs tracking-[0.15em] uppercase transition-colors duration-300 hover:opacity-60 ${
                scrolled ? 'text-stone-700' : 'text-white/90'
              }`}
            >
              {t(item.label)}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA + Language Switcher */}
        <div className="hidden lg:flex items-center gap-8">
          {/* Language Switcher */}
          <div className="flex items-center gap-2.5 text-[10px] tracking-[0.2em] font-semibold">
            <button
              onClick={() => setLanguage('en')}
              className={`transition-colors cursor-pointer ${
                language === 'en'
                  ? scrolled ? 'text-stone-900' : 'text-white'
                  : scrolled ? 'text-stone-300 hover:text-stone-500' : 'text-white/40 hover:text-white/70'
              }`}
            >
              EN
            </button>
            <span className={scrolled ? 'text-stone-200' : 'text-white/20'}>/</span>
            <button
              onClick={() => setLanguage('es')}
              className={`transition-colors cursor-pointer ${
                language === 'es'
                  ? scrolled ? 'text-stone-900' : 'text-white'
                  : scrolled ? 'text-stone-300 hover:text-stone-500' : 'text-white/40 hover:text-white/70'
              }`}
            >
              ES
            </button>
          </div>

          <a
            href="#quote"
            className={`text-xs tracking-[0.15em] uppercase px-5 py-2.5 border transition-all duration-300 ${
              scrolled
                ? 'border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white'
                : 'border-white/70 text-white hover:bg-white hover:text-stone-900'
            }`}
          >
            {t('Request Quote')}
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className={`lg:hidden -mr-2 p-2 transition-colors duration-300 ${dark ? 'text-stone-900' : 'text-white'}`}
        >
          {open ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
        </button>
      </div>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {open && (
          <motion.nav
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden bg-white border-t border-stone-100"
          >
            <div className="px-6 py-6 flex flex-col">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="py-3 text-sm tracking-[0.15em] uppercase text-stone-700 border-b border-stone-100 last:border-0"
                >
                  {t(item.label)}
                </Link>
              ))}

              {/* Mobile Language Switcher */}
              <div className="flex items-center gap-3 py-4 border-b border-stone-100">
                <span className="text-[10px] tracking-wider uppercase text-stone-400 font-semibold">Language:</span>
                <div className="flex items-center gap-2 text-xs tracking-widest font-semibold uppercase">
                  <button
                    onClick={() => { setLanguage('en'); setOpen(false); }}
                    className={`transition-colors cursor-pointer ${language === 'en' ? 'text-stone-900' : 'text-stone-300'}`}
                  >
                    English
                  </button>
                  <span className="text-stone-200">/</span>
                  <button
                    onClick={() => { setLanguage('es'); setOpen(false); }}
                    className={`transition-colors cursor-pointer ${language === 'es' ? 'text-stone-900' : 'text-stone-300'}`}
                  >
                    Español
                  </button>
                </div>
              </div>

              <a
                href="#quote"
                onClick={() => setOpen(false)}
                className="mt-6 text-center text-xs tracking-[0.15em] uppercase px-5 py-3.5 bg-stone-900 text-white"
              >
                {t('Request Quote')}
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
