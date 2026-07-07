'use client'

import { motion } from 'framer-motion'

interface TextRevealProps {
  text: string
  className?: string
  delay?: number
}

export function TextReveal({ text, className = '', delay = 0 }: TextRevealProps) {
  const words = text.split(' ')

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: delay,
      },
    },
  }

  const childVariants = {
    hidden: { y: '100%' },
    visible: {
      y: 0,
      transition: {
        duration: 0.95,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number], // apple/leica-style cinematic ease out
      },
    },
  }

  return (
    <motion.span
      className={`inline-flex flex-wrap ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.22em] py-[0.1em] -my-[0.1em]">
          <motion.span className="inline-block" variants={childVariants}>
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}
