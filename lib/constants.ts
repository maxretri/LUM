import type {
  ColorOption,
  SpecItem,
  FeatureCard,
  ExploreCard,
  NavItem,
  DetailPageData,
} from '@/types'

export const NAV_ITEMS: NavItem[] = [
  { label: 'LEV 01', href: '/#overview' },
  { label: 'Performance', href: '/performance' },
  { label: 'Interior', href: '/interior' },
  { label: 'Safety', href: '/safety' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Specifications', href: '/#specifications' },
]

export const SPECS: SpecItem[] = [
  { label: 'Range', value: '1000', unit: 'km' },
  { label: 'Power', value: '170', unit: 'kW' },
  { label: '0–100 km/h', value: '8.5', unit: 's' },
  { label: 'Battery', value: '40', unit: 'kWh' },
  { label: 'Drive', value: 'FWD', unit: '' },
]

export const COLORS: ColorOption[] = [
  { id: 'taupe', name: 'Taupe', hex: '#C8B49A', image: '/images/car-taupe.jpg' },
  { id: 'graphite', name: 'Graphite Grey', hex: '#6E7073', image: '/images/car-grey.jpg' },
  { id: 'obsidian', name: 'Obsidian Black', hex: '#1A1A1C', image: '/images/car-black.jpg' },
  { id: 'lunar-white', name: 'Lunar White', hex: '#E8E8E4', image: '/images/car-white.jpg' },
]

export const FEATURES: FeatureCard[] = [
  {
    icon: 'road',
    title: 'Long Range',
    description: 'Go further with confidence.\nUp to 1000 km of range.',
  },
  {
    icon: 'zap',
    title: 'Performance',
    description: 'Instant power delivery\nfor every drive.',
  },
  {
    icon: 'shield',
    title: 'Safety',
    description: 'Engineered for maximum\nprotection and peace of mind.',
  },
  {
    icon: 'armchair',
    title: 'Comfort',
    description: 'Spacious, refined and\ndesigned around you.',
  },
]

export const EXPLORE_CARDS: ExploreCard[] = [
  { title: 'Performance', image: '/images/explore-performance.jpg', href: '/performance' },
  { title: 'Interior', image: '/images/explore-interior.jpg', href: '/interior' },
  { title: 'Safety', image: '/images/explore-safety.jpg', href: '/safety' },
  { title: 'Gallery', image: '/images/explore-gallery.jpg', href: '/gallery' },
]

// ── Detail pages (separate routes linked from nav + explore cards) ──────────
export const PAGE_SLUGS = ['performance', 'interior', 'safety', 'gallery'] as const

export const PAGES: Record<DetailPageData['slug'], DetailPageData> = {
  performance: {
    slug: 'performance',
    eyebrow: 'Performance',
    title: 'Power, delivered instantly.',
    subtitle: '170 kW of refined electric drive — effortless from the first metre.',
    heroImage: '/images/page-performance-hero.jpg',
    blocks: [
      {
        id: 'perf-drive',
        eyebrow: 'Electric Drive',
        title: 'Calm, immediate\nacceleration.',
        description:
          'A high-efficiency flat-wire motor delivers 170 kW and 320 N·m the moment you ask. No lag, no drama — just smooth, confident motion.',
        image: '/images/showcase-performance.jpg',
        stats: [
          { label: 'Power', value: '170 kW' },
          { label: '0–100 km/h', value: '8.5 s' },
          { label: 'Top Speed', value: '160 km/h' },
        ],
        reverse: false,
      },
      {
        id: 'perf-chassis',
        eyebrow: 'Chassis',
        title: 'Composed at\nevery speed.',
        description:
          'MacPherson front and multi-link rear suspension, tuned across highway, mountain and rough-road testing, keep the LEV 01 planted and precise.',
        image: '/images/page-performance-2.jpg',
        stats: [
          { label: 'Front', value: 'MacPherson' },
          { label: 'Rear', value: 'Multi-Link' },
          { label: 'Steering', value: 'D-EPS' },
        ],
        reverse: true,
      },
    ],
  },
  interior: {
    slug: 'interior',
    eyebrow: 'Interior',
    title: 'A sanctuary in motion.',
    subtitle: 'Space that breathes, materials chosen for the hand as much as the eye.',
    heroImage: '/images/page-interior-hero.jpg',
    blocks: [
      {
        id: 'int-cabin',
        eyebrow: 'Cabin',
        title: 'Room to\nbreathe.',
        description:
          'A 2760 mm wheelbase opens a cabin built around calm. Five adults, generous light, and a layout that makes every arrival feel unhurried.',
        image: '/images/showcase-interior.jpg',
        stats: [
          { label: 'Wheelbase', value: '2760 mm' },
          { label: 'Seating', value: '5 Adults' },
          { label: 'Display', value: '15.6"' },
        ],
        reverse: false,
      },
    ],
  },
  safety: {
    slug: 'safety',
    eyebrow: 'Safety',
    title: 'Protection, built in.',
    subtitle: 'A high-strength body and intelligent assistance, working as one.',
    heroImage: '/images/page-safety-hero.jpg',
    blocks: [
      {
        id: 'safe-body',
        eyebrow: 'Structure',
        title: 'Engineered to\nprotect.',
        description:
          'A high-strength safety cage, seven airbags and an OneBox brake-by-wire system shorten distances and keep everyone aboard secure.',
        image: '/images/showcase-safety.jpg',
        stats: [
          { label: 'ADAS', value: 'L2+' },
          { label: 'Airbags', value: '7' },
          { label: 'Braking', value: 'OneBox' },
        ],
        reverse: false,
      },
    ],
  },
  gallery: {
    slug: 'gallery',
    eyebrow: 'Gallery',
    title: 'The LEV 01, in full.',
    subtitle: 'Every angle of a vehicle designed to be looked at.',
    heroImage: '/images/page-gallery-hero.jpg',
    blocks: [],
    gallery: [
      '/images/gallery-1.jpg',
      '/images/gallery-2.jpg',
      '/images/gallery-3.jpg',
      '/images/gallery-4.jpg',
      '/images/gallery-5.jpg',
      '/images/gallery-6.jpg',
    ],
  },
}
