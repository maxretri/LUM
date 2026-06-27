import type { Metadata } from 'next'
import { DetailPageView } from '@/components/DetailPageView'
import { PAGES } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'LUM — LEV 01 · Safety',
  description: 'Protection, built in. A high-strength body and intelligent assistance.',
}

export default function SafetyPage() {
  return <DetailPageView data={PAGES.safety} />
}
