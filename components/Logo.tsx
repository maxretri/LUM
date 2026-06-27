interface LogoProps {
  /** Height in px; width scales with the SVG aspect ratio. */
  height?: number
  className?: string
}

/**
 * Renders /public/logo.svg as a CSS mask tinted with the current text colour,
 * so a single monochrome logo file works on both the transparent hero (white)
 * and the scrolled white nav (dark). Replace public/logo.svg to update it.
 */
export function Logo({ height = 20, className }: LogoProps) {
  const url = 'url(/logo.svg)'
  return (
    <span
      aria-label="LUM"
      role="img"
      className={className}
      style={{
        display: 'inline-block',
        height,
        width: height * 4.2, // matches logo.svg viewBox ratio (168/40)
        backgroundColor: 'currentColor',
        WebkitMaskImage: url,
        maskImage: url,
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'left center',
        maskPosition: 'left center',
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
      }}
    />
  )
}
