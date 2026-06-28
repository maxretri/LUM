import type {
  ColorOption,
  CarView,
  ViewOption,
  SpecItem,
  FeatureCard,
  ExploreCard,
  NavItem,
  DetailPageData,
} from '@/types'

export const NAV_ITEMS: NavItem[] = [
  { label: 'LEV 01', href: '/#overview' },
  { label: 'Energy', href: '/energy' },
  { label: 'Performance', href: '/performance' },
  { label: 'Interior', href: '/interior' },
  { label: 'Safety', href: '/safety' },
  { label: 'Gallery', href: '/#gallery' },
]

export const SPECS: SpecItem[] = [
  { label: 'Range', value: '1000', unit: 'km' },
  { label: 'Power', value: '170', unit: 'kW' },
  { label: '0–100 km/h', value: '8.5', unit: 's' },
  { label: 'Battery', value: '40', unit: 'kWh' },
  { label: 'Drive', value: 'FWD', unit: '' },
]

export const CAR_VIEWS: ViewOption[] = [
  { id: 'front', label: 'Front' },
  { id: 'threequarter', label: '45°' },
  { id: 'side', label: 'Side' },
  { id: 'back', label: 'Back' },
]

const carImages = (file: string): Record<CarView, string> => ({
  front: `/images/home/car-${file}-front.jpg`,
  threequarter: `/images/home/car-${file}-threequarter.jpg`,
  side: `/images/home/car-${file}-side.jpg`,
  back: `/images/home/car-${file}-back.jpg`,
})

export const COLORS: ColorOption[] = [
  { id: 'taupe', name: 'Taupe', hex: '#C8B49A', images: carImages('taupe') },
  { id: 'graphite', name: 'Graphite Grey', hex: '#6E7073', images: carImages('grey') },
  { id: 'obsidian', name: 'Obsidian Black', hex: '#1A1A1C', images: carImages('black') },
  { id: 'pearl-white', name: 'Pearl White', hex: '#E8E8E4', images: carImages('white') },
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
  { title: 'Performance', image: '/images/home/explore-performance.jpg', href: '/performance' },
  { title: 'Interior', image: '/images/home/explore-interior.jpg', href: '/interior' },
  { title: 'Safety', image: '/images/home/explore-safety.jpg', href: '/safety' },
  { title: 'Energy', image: '/images/home/explore-gallery.jpg', href: '/energy' },
]

// Landing gallery strip (links to the full /gallery page)
export const LANDING_GALLERY: string[] = [
  '/images/gallery/1.jpg',
  '/images/gallery/2.jpg',
  '/images/gallery/3.jpg',
  '/images/gallery/4.jpg',
  '/images/gallery/5.jpg',
  '/images/gallery/6.jpg',
]

// ── Detail pages (separate routes linked from nav + explore cards) ──────────
export const PAGE_SLUGS = ['performance', 'interior', 'safety', 'gallery'] as const

export const PAGES: Record<DetailPageData['slug'], DetailPageData> = {
  performance: {
    slug: 'performance',
    eyebrow: 'Performance',
    title: 'Power, delivered instantly.',
    subtitle: '170 kW of refined electric drive — effortless from the first metre.',
    heroImage: '/images/performance/hero.jpg',
    blocks: [
      {
        id: 'perf-drive',
        eyebrow: 'Electric Drive',
        title: 'Calm, immediate\nacceleration.',
        description:
          'A high-efficiency flat-wire motor delivers 170 kW and 320 N·m the moment you ask. No lag, no drama — just smooth, confident motion.',
        image: '/images/performance/block-1.jpg',
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
        image: '/images/performance/block-2.jpg',
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
    heroImage: '/images/interior/hero.jpg',
    blocks: [
      {
        id: 'int-cabin',
        eyebrow: 'Cabin',
        title: 'Room to\nbreathe.',
        description:
          'A 2760 mm wheelbase opens a cabin built around calm. Five adults, generous light, and a layout that makes every arrival feel unhurried.',
        image: '/images/interior/block-1.jpg',
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
        image: '/images/interior/block-2.jpg',
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
        image: '/images/interior/block-3.jpg',
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
    heroImage: '/images/safety/hero.jpg',
    blocks: [
      {
        id: 'safe-body',
        eyebrow: 'Structure',
        title: 'Built around\na strong core.',
        description:
          'A high-strength steel safety cage and engineered crumple zones form a protective shell around every occupant, channelling energy away from the cabin in an impact.',
        image: '/images/safety/block-1.jpg',
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
        image: '/images/safety/block-2.jpg',
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
        image: '/images/safety/block-3.jpg',
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
    heroImage: '/images/gallery/hero.jpg',
    blocks: [],
    gallery: [
      '/images/gallery/1.jpg',
      '/images/gallery/2.jpg',
      '/images/gallery/3.jpg',
      '/images/gallery/4.jpg',
      '/images/gallery/5.jpg',
      '/images/gallery/6.jpg',
    ],
  },
  energy: {
    slug: 'energy',
    eyebrow: 'LUM Energy',
    title: 'Energy independence.\nPowered by the sun.',
    subtitle: 'One system — solar, storage and your LUM — that powers your drive and your home. Mobility. Energy. Freedom.',
    heroImage: '/images/energy/hero.jpg',
    blocks: [
      {
        id: 'energy-home',
        eyebrow: 'Home Package',
        title: 'Smart and simple\nhome charging.',
        description:
          'Your LUM, a premium smart charger and the mobile app — everything you need to charge safely at home with real-time control, scheduling and energy insights. Professional installation included.',
        image: '/images/energy/home.jpg',
        stats: [
          { label: 'Includes', value: 'Charger + App' },
          { label: 'Charging', value: 'At Home' },
          { label: 'Emissions', value: 'Zero' },
        ],
        reverse: false,
      },
      {
        id: 'energy-villa',
        eyebrow: 'Villa Package',
        title: 'Complete energy\nindependence.',
        description:
          'A solar carport generates clean energy, storage holds it for day and night, and a bi-directional V2H charger lets your LUM power the home at peak hours. Self-generated energy means you drive, in effect, for free — around €4,000 saved per year, paying back in about 5.5 years.',
        image: '/images/energy/villa.jpg',
        stats: [
          { label: 'Solar Carport', value: '6 kWp' },
          { label: 'Storage', value: '10 kWh' },
          { label: 'Savings', value: '€4,000/yr' },
        ],
        reverse: true,
      },
      {
        id: 'energy-community',
        eyebrow: 'Community Solution',
        title: 'Shared clean energy\nfor communities.',
        description:
          'Solar canopies, a community ESS network and smart charging for residential developments, hotels and office complexes — reliable, affordable and sustainable energy for residents, facilities and developers alike.',
        image: '/images/energy/commercial.jpg',
        stats: [
          { label: 'For', value: 'Developments' },
          { label: 'Network', value: 'Solar + ESS' },
          { label: 'Scale', value: 'Community' },
        ],
        reverse: false,
        cta: { label: 'For business — talk to us', href: '/commercial' },
      },
    ],
  },
  commercial: {
    slug: 'commercial',
    eyebrow: 'Community Solution',
    title: 'Shared energy\nfor communities.',
    subtitle: 'Solar canopy, community storage and smart charging for residential developments, hotels and office complexes.',
    heroImage: '/images/commercial/hero.jpg',
    blocks: [
      {
        id: 'com-infra',
        eyebrow: 'Infrastructure',
        title: 'Clean energy,\non-site.',
        description:
          'Solar canopies generate energy where it is used, a community ESS network stores it for maximum efficiency, and intelligent charging distributes it dynamically — lowering bills through shared renewable energy.',
        image: '/images/commercial/block-1.jpg',
        stats: [
          { label: 'Generation', value: 'Solar Canopy' },
          { label: 'Storage', value: 'Community ESS' },
          { label: 'Charging', value: 'Smart Network' },
        ],
        reverse: false,
      },
      {
        id: 'com-scale',
        eyebrow: 'Future-Ready',
        title: 'Scalable and\nsustainable.',
        description:
          'Backup power and grid stability for peace of mind, a smaller carbon footprint to support ESG goals, and scalable infrastructure that grows with the community.',
        image: '/images/commercial/block-2.jpg',
        stats: [
          { label: 'Resilience', value: 'Backup Power' },
          { label: 'Impact', value: 'Lower CO₂' },
          { label: 'Infrastructure', value: 'Scalable' },
        ],
        reverse: true,
        cta: { label: 'Request a consultation', href: '/#quote' },
      },
    ],
  },
}
