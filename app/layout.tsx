import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import { CookieConsent } from '@/components/CookieConsent'
import { QuoteModal } from '@/components/QuoteModal'
import { AIChatWidget } from '@/components/AIChatWidget'

const geist = Geist({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['200', '300', '400', '500'],
})

export const metadata: Metadata = {
  title: 'LUM — LEV 01',
  description: 'The electric vehicle reimagined. Pure range. Pure refinement.',
  openGraph: {
    title: 'LUM — LEV 01',
    description: 'The electric vehicle reimagined. Up to 1000 km of range.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={geist.variable}>
      <body className="antialiased bg-white text-stone-900 font-sans">
        {children}
        <CookieConsent />
        <QuoteModal />
        <AIChatWidget />
      </body>
    </html>
  )
}

