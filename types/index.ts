export type CarView = 'front' | 'threequarter' | 'side' | 'back'

export interface ViewOption {
  id: CarView
  label: string
}

export interface ColorOption {
  id: string
  name: string
  hex: string
  images: Record<CarView, string>
}

export interface SpecItem {
  label: string
  value: string
  unit: string
}

export interface FeatureCard {
  icon: string
  title: string
  description: string
}

export interface ExploreCard {
  title: string
  image: string
  href: string
}

export interface ShowcaseStat {
  label: string
  value: string
}

export interface ShowcaseItem {
  id: string
  eyebrow: string
  title: string
  description: string
  image: string
  stats: ShowcaseStat[]
  reverse: boolean
}

export type DetailSlug = 'performance' | 'interior' | 'safety' | 'gallery'

export interface DetailPageData {
  slug: DetailSlug
  eyebrow: string
  title: string
  subtitle: string
  heroImage: string
  blocks: ShowcaseItem[]
  gallery?: string[]
}

export interface NavItem {
  label: string
  href: string
}
