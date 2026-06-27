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
    icon: 'bolt',
    title: 'Performance',
    description: 'Instant power delivery\nfor every drive.',
  },
  {
    icon: 'wheel',
    title: 'Safety',
    description: 'Engineered for maximum\nprotection and peace of mind.',
  },
  {
    icon: 'seat',
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
      {
        id: 'int-cockpit',
        eyebrow: 'Cockpit',
        title: 'Everything,\nwithin reach.',
        description:
          'A clean, driver-focused cockpit puts a large central display and the essentials at your fingertips, with physical controls kept where they matter.',
        image: '/images/page-interior-2.jpg',
        stats: [
          { label: 'Display', value: '15.6"' },
          { label: 'Interface', value: 'Voice + Touch' },
          { label: 'HUD', value: 'Available' },
        ],
        reverse: true,
      },
      {
        id: 'int-materials',
        eyebrow: 'Materials',
        title: 'Considered\nin the detail.',
        description:
          'Soft-touch surfaces, tactile switchgear and a restrained palette make the cabin feel crafted rather than assembled — calm in every finish.',
        image: '/images/page-interior-3.jpg',
        stats: [
          { label: 'Finish', value: 'Soft-Touch' },
          { label: 'Ambient', value: 'Multi-Zone' },
          { label: 'Roof', value: 'Panoramic' },
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
        title: 'Built around\na strong core.',
        description:
          'A high-strength steel safety cage and engineered crumple zones form a protective shell around every occupant, channelling energy away from the cabin in an impact.',
        image: '/images/showcase-safety.jpg',
        stats: [
          { label: 'Body', value: 'High-Strength' },
          { label: 'Airbags', value: '7' },
          { label: 'Rating', value: '5-Star Target' },
        ],
        reverse: false,
      },
      {
        id: 'safe-adas',
        eyebrow: 'Driver Assistance',
        title: 'A second pair\nof eyes.',
        description:
          'L2+ ADAS combines adaptive cruise, lane keeping, automatic emergency braking and blind-spot monitoring to support the driver and reduce the chance of a collision before it happens.',
        image: '/images/page-safety-2.jpg',
        stats: [
          { label: 'ADAS', value: 'L2+' },
          { label: 'Cameras', value: 'Surround' },
          { label: 'Radar', value: 'Front + Corner' },
        ],
        reverse: true,
      },
      {
        id: 'safe-braking',
        eyebrow: 'Braking',
        title: 'Stops that\ninspire trust.',
        description:
          'The OneBox brake-by-wire system delivers active, high-efficiency braking with shorter stopping distances and precise, redundant control — confidence in every condition.',
        image: '/images/page-safety-3.jpg',
        stats: [
          { label: 'System', value: 'OneBox' },
          { label: 'Control', value: 'Brake-by-Wire' },
          { label: 'Redundancy', value: 'Dual-Path' },
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
