import type { Metadata } from 'next'
import { DetailPageView } from '@/components/DetailPageView'
import { PAGES } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'LUM — Energy',
  description: 'Home, villa and commercial charging — solar, storage and energy that drives for free.',
}

export default function EnergyPage() {
  return <DetailPageView data={PAGES.energy} />
}
