import type { ColorOption, SpecItem, FeatureCard, ExploreCard, NavItem } from '@/types'

export const NAV_ITEMS: NavItem[] = [
  { label: 'Overview', href: '#overview' },
  { label: 'Performance', href: '#performance' },
  { label: 'Interior', href: '#interior' },
  { label: 'Technology', href: '#technology' },
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
  { id: 'desert-sand', name: 'Desert Sand', hex: '#C8B49A', image: '/images/car-sand.jpg' },
  { id: 'storm-grey', name: 'Storm Grey', hex: '#8A9099', image: '/images/car-grey.jpg' },
  { id: 'midnight', name: 'Midnight', hex: '#2A2D33', image: '/images/car-midnight.jpg' },
  { id: 'lunar-white', name: 'Lunar White', hex: '#E8E8E4', image: '/images/car-white.jpg' },
  { id: 'forest', name: 'Forest', hex: '#4A5C4E', image: '/images/car-forest.jpg' },
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
    icon: 'cpu',
    title: 'Technology',
    description: 'Smart features that keep\nyou ahead.',
  },
  {
    icon: 'armchair',
    title: 'Comfort',
    description: 'Spacious, refined and\ndesigned around you.',
  },
]

export const EXPLORE_CARDS: ExploreCard[] = [
  { title: 'Performance', image: '/images/explore-performance.jpg', href: '#performance' },
  { title: 'Interior', image: '/images/explore-interior.jpg', href: '#interior' },
  { title: 'Technology', image: '/images/explore-technology.jpg', href: '#technology' },
  { title: 'Safety', image: '/images/explore-safety.jpg', href: '#safety' },
  { title: 'Gallery', image: '/images/explore-gallery.jpg', href: '#gallery' },
]
