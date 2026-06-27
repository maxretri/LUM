import type { Metadata } from 'next'
import { LegalPage } from '@/components/LegalPage'
import { TERMS, LEGAL_UPDATED } from '@/lib/legal'

export const metadata: Metadata = {
  title: 'LUM — Terms & Conditions',
  description: 'Terms and conditions for the LUM Automotive website.',
}

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      updated={LEGAL_UPDATED}
      intro="These terms govern your use of the LUM Automotive website. Please read them carefully."
      sections={TERMS}
    />
  )
}
