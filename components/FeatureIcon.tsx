interface FeatureIconProps {
  /** Maps to a file in /public/icons/<name>.svg — swap that file to change the icon. */
  name: string
  size?: number
}

/**
 * Renders /public/icons/<name>.svg as a CSS mask tinted with the current text
 * colour, so the icon inherits hover/colour transitions AND can be replaced
 * simply by dropping a new SVG into public/icons/ (same filename).
 */
export function FeatureIcon({ name, size = 28 }: FeatureIconProps) {
  const url = `url(/icons/${name}.svg)`
  return (
    <span
      aria-hidden="true"
      style={{
        display: 'inline-block',
        width: size,
        height: size,
        backgroundColor: 'currentColor',
        WebkitMaskImage: url,
        maskImage: url,
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
      }}
    />
  )
}
