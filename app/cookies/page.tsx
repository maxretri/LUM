import type { Metadata } from 'next'
import { LegalPage } from '@/components/LegalPage'
import { COOKIES, LEGAL_UPDATED } from '@/lib/legal'

export const metadata: Metadata = {
  title: 'LUM — Cookie Policy',
  description: 'How LUM Automotive uses cookies.',
}

export default function CookiesPage() {
  return (
    <LegalPage
      title="Cookie Policy"
      updated={LEGAL_UPDATED}
      intro="This policy explains how we use cookies and similar technologies on this website."
      sections={COOKIES}
    />
  )
}
