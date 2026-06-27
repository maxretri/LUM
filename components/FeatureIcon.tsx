import { Route, Zap, Shield, Cpu, Armchair } from 'lucide-react'

const ICON_MAP = {
  road: Route,
  zap: Zap,
  shield: Shield,
  cpu: Cpu,
  armchair: Armchair,
} as const

type IconKey = keyof typeof ICON_MAP

interface FeatureIconProps {
  name: string
  size?: number
}

export function FeatureIcon({ name, size = 24 }: FeatureIconProps) {
  const Icon = ICON_MAP[name as IconKey]
  if (!Icon) return null
  return <Icon size={size} strokeWidth={1} />
}
