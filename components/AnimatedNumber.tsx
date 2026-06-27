'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface AnimatedNumberProps {
  target: string
  duration?: number
}

export function AnimatedNumber({ target, duration = 1800 }: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [display, setDisplay] = useState('0')

  const isNumeric = !isNaN(parseFloat(target)) && target !== ''

  useEffect(() => {
    if (!isInView || !isNumeric) {
      setDisplay(target)
      return
    }

    const end = parseFloat(target)
    const hasDecimal = target.includes('.')
    const decimals = hasDecimal ? target.split('.')[1].length : 0
    const startTime = performance.now()

    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 4)
      const current = end * eased
      setDisplay(hasDecimal ? current.toFixed(decimals) : Math.round(current).toString())
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [isInView, target, duration, isNumeric])

  return <span ref={ref}>{isNumeric ? display : target}</span>
}
