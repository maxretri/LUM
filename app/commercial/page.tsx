import type { Metadata } from 'next'
import { DetailPageView } from '@/components/DetailPageView'
import { PAGES } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'LUM — Commercial',
  description: 'Scalable B2B charging infrastructure for fleets, developments and large-scale sites.',
}

export default function CommercialPage() {
  return <DetailPageView data={PAGES.commercial} />
}
