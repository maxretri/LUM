interface FeatureIconProps {
  name: string
  size?: number
}

const COMMON = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.4,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

// Monoline icons matching the supplied set: road, bolt, steering wheel, seat.
function Road() {
  return (
    <>
      <path d="M7 21 L10 4" {...COMMON} />
      <path d="M17 21 L14 4" {...COMMON} />
      <path d="M12 5 v3 M12 11 v3 M12 17 v2.5" {...COMMON} />
    </>
  )
}

function Bolt() {
  return <path d="M13.5 3 L6 13 h4 l-1.5 8 L18 10 h-4 l1.5-7 Z" {...COMMON} />
}

function Wheel() {
  return (
    <>
      <circle cx="12" cy="12" r="9" {...COMMON} />
      <circle cx="12" cy="12" r="2.4" {...COMMON} />
      <path d="M4 9.5 C8 8 16 8 20 9.5" {...COMMON} />
      <path d="M10.3 14 C8.6 15 6.4 16.4 5 19" {...COMMON} />
      <path d="M13.7 14 C15.4 15 17.6 16.4 19 19" {...COMMON} />
    </>
  )
}

function Seat() {
  return (
    <>
      <path d="M8 4 C7 4 6.6 4.6 6.6 5.6 L6.8 12.5 C6.9 13.6 7.6 14 8.4 14 L10.6 14" {...COMMON} />
      <path d="M7 13.5 C7.4 16 8.4 17.2 10.5 17.4 L18 17.6 C19.3 17.6 20 18.4 20 19.6 L20 20" {...COMMON} />
      <path d="M6.8 12 C5.6 13 5 14.4 5 16 L5 19.4 C5 20 5.5 20.4 6 20.4 L6.5 20.4" {...COMMON} />
    </>
  )
}

const ICONS: Record<string, () => React.ReactElement> = {
  road: Road,
  bolt: Bolt,
  wheel: Wheel,
  seat: Seat,
}

export function FeatureIcon({ name, size = 28 }: FeatureIconProps) {
  const Glyph = ICONS[name]
  if (!Glyph) return null
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <Glyph />
    </svg>
  )
}
