import type { Metadata } from 'next'
import { DetailPageView } from '@/components/DetailPageView'
import { PAGES } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'LUM — LEV 01 · Performance',
  description: 'Power, delivered instantly. 170 kW of refined electric drive.',
}

export default function PerformancePage() {
  return <DetailPageView data={PAGES.performance} />
}
