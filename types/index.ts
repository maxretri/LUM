export interface ColorOption {
  id: string
  name: string
  hex: string
  image: string
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

export interface NavItem {
  label: string
  href: string
}
