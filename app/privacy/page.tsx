import type { Metadata } from 'next'
import { LegalPage } from '@/components/LegalPage'
import { PRIVACY, LEGAL_UPDATED } from '@/lib/legal'

export const metadata: Metadata = {
  title: 'LUM — Privacy Policy',
  description: 'How LUM Automotive collects and uses your personal data.',
}

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated={LEGAL_UPDATED}
      intro="This policy explains what personal data we collect, how we use it, and the rights you have over it."
      sections={PRIVACY}
    />
  )
}
