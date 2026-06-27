import type { Metadata } from 'next'
import { DetailPageView } from '@/components/DetailPageView'
import { PAGES } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'LUM — LEV 01 · Gallery',
  description: 'The LEV 01, in full. Every angle of a vehicle designed to be looked at.',
}

export default function GalleryPage() {
  return <DetailPageView data={PAGES.gallery} />
}
