'use client'

import { ElementType, useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface TypewriterTextProps {
  text: string // plain text or HTML string
  speed?: number // ms per character
  delay?: number // ms before first keystroke
  className?: string
  style?: React.CSSProperties
  as?: ElementType
  onDone?: () => void // fires when typing finishes
}

/**
 * Walk through an HTML string counting only visible characters (not tag/entity bytes).
 * Returns the substring that shows exactly `visibleCount` characters.
 */
function buildRevealedHtml(html: string, visibleCount: number): string {
  let seen = 0
  let i = 0
  let result = ''

  while (i < html.length) {
    if (seen >= visibleCount) break

    // HTML tag — include whole tag without counting visible chars
    if (html[i] === '<') {
      const end = html.indexOf('>', i)
      if (end !== -1) {
        result += html.slice(i, end + 1)
        i = end + 1
        continue
      }
    }

    // HTML entity (e.g. &amp;) — count as one visible character
    if (html[i] === '&') {
      const semi = html.indexOf(';', i)
      if (semi !== -1 && semi - i <= 8) {
        result += html.slice(i, semi + 1)
        i = semi + 1
        seen++
        continue
      }
    }

    result += html[i]
    seen++
    i++
  }

  return result
}

function getPlainLength(html: string): number {
  return html
    .replace(/<[^>]*>/g, '') // strip tags
    .replace(/&[^;]{1,7};/g, 'x').length // count entities as 1 char
}

export default function TypewriterText({
  text,
  speed = 22,
  delay = 0,
  className = '',
  style,
  as: Tag = 'p',
  onDone,
}: TypewriterTextProps) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, {
    once: true,
    margin: '-60px',
  })
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const total = getPlainLength(text)
  const done = count >= total

  // Wait for the optional delay before starting
  useEffect(() => {
    if (!isInView) return
    const t = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(t)
  }, [isInView, delay])

  // Advance one character at a time
  useEffect(() => {
    if (!started || done) return
    const t = setTimeout(() => setCount((c) => c + 1), speed)
    return () => clearTimeout(t)
  }, [started, count, done, speed])

  // Notify parent when done
  useEffect(() => {
    if (done && started) onDone?.()
  }, [done, started, onDone])

  const revealedHtml = buildRevealedHtml(text, count)

  return (
    // `typewriting` class drives the blinking cursor via CSS ::after
    <Tag
      ref={ref as React.RefObject<HTMLParagraphElement>}
      className={`${className} ${!done && started ? 'typewriting' : ''}`.trim()}
      style={style}
      dangerouslySetInnerHTML={{ __html: revealedHtml }}
    />
  )
}
