import type { Metadata } from 'next'
import { DetailPageView } from '@/components/DetailPageView'
import { PAGES } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'LUM — LEV 01 · Interior',
  description: 'A sanctuary in motion. Space that breathes, materials chosen with care.',
}

export default function InteriorPage() {
  return <DetailPageView data={PAGES.interior} />
}
