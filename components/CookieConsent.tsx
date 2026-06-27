'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'

const STORAGE_KEY = 'lum-cookie-consent'

export function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true)
    } catch {
      // localStorage unavailable — fail quietly, don't block the page
    }
  }, [])

  const decide = (value: 'accepted' | 'declined') => {
    try {
      localStorage.setItem(STORAGE_KEY, value)
    } catch {
      // ignore
    }
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-label="Cookie consent"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-[60] sm:max-w-md bg-stone-900 text-white p-6 shadow-2xl"
        >
          <p className="text-sm font-light leading-relaxed text-white/80">
            We use cookies to operate this site and understand how it is used. See our{' '}
            <Link href="/cookies" className="underline underline-offset-2 hover:text-white">
              Cookie Policy
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="underline underline-offset-2 hover:text-white">
              Privacy Policy
            </Link>
            .
          </p>
          <div className="mt-5 flex gap-3">
            <button
              type="button"
              onClick={() => decide('accepted')}
              className="text-xs tracking-[0.15em] uppercase px-5 py-2.5 bg-white text-stone-900 hover:bg-stone-200 transition-colors duration-300"
            >
              Accept
            </button>
            <button
              type="button"
              onClick={() => decide('declined')}
              className="text-xs tracking-[0.15em] uppercase px-5 py-2.5 border border-white/40 text-white hover:bg-white/10 transition-colors duration-300"
            >
              Decline
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
