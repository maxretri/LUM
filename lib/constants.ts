import type { ColorOption, SpecItem, FeatureCard, ExploreCard, NavItem, ShowcaseItem } from '@/types'

export const NAV_ITEMS: NavItem[] = [
  { label: 'Overview', href: '#overview' },
  { label: 'Performance', href: '#performance' },
  { label: 'Interior', href: '#interior' },
  { label: 'Safety', href: '#safety' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Specifications', href: '#specifications' },
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

export const SHOWCASES: ShowcaseItem[] = [
  {
    id: 'performance',
    eyebrow: 'Performance',
    title: 'Power, delivered\ninstantly.',
    description:
      '170 kW of refined electric power moves the LEV 01 from rest to motion with effortless calm. Every input answered the moment you ask.',
    image: '/images/showcase-performance.jpg',
    stats: [
      { label: 'Power', value: '170 kW' },
      { label: '0–100 km/h', value: '8.5 s' },
      { label: 'Top Speed', value: '160 km/h' },
    ],
    reverse: false,
  },
  {
    id: 'interior',
    eyebrow: 'Interior',
    title: 'A sanctuary\nin motion.',
    description:
      'Space that breathes. Materials chosen for the hand as much as the eye. The cabin of the LEV 01 is built to make every journey feel shorter and every arrival calmer.',
    image: '/images/showcase-interior.jpg',
    stats: [
      { label: 'Wheelbase', value: '2760 mm' },
      { label: 'Seating', value: '5 Adults' },
      { label: 'Display', value: '15.6"' },
    ],
    reverse: true,
  },
  {
    id: 'safety',
    eyebrow: 'Safety',
    title: 'Protection,\nbuilt in.',
    description:
      'A high-strength body, intelligent driver assistance and an OneBox brake-by-wire system work together to shorten distances and keep everyone aboard secure.',
    image: '/images/showcase-safety.jpg',
    stats: [
      { label: 'ADAS', value: 'L2+' },
      { label: 'Airbags', value: '7' },
      { label: 'Body', value: 'High-Strength' },
    ],
    reverse: false,
  },
]

export const EXPLORE_CARDS: ExploreCard[] = [
  { title: 'Performance', image: '/images/explore-performance.jpg', href: '#performance' },
  { title: 'Interior', image: '/images/explore-interior.jpg', href: '#interior' },
  { title: 'Safety', image: '/images/explore-safety.jpg', href: '#safety' },
  { title: 'Gallery', image: '/images/explore-gallery.jpg', href: '#gallery' },
]
