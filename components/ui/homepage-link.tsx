import Link from 'next/link'
import type { CSSProperties } from 'react'

import { cn } from '@/lib/utils'

interface HomepageLinkProps {
  href: string
  className?: string
  style?: CSSProperties
  children: React.ReactNode
  homepageOnly?: boolean
}

function isInternalTarget(href: string) {
  return href.startsWith('/') || href.includes('potrankinz.vercel.app')
}

export default function HomepageLink({
  href,
  className,
  style,
  children,
  homepageOnly = false,
}: HomepageLinkProps) {
  if (homepageOnly && isInternalTarget(href) && href !== '/') {
    return (
      <span
        aria-disabled="true"
        title="Homepage focus mode"
        className={cn('cursor-default', className)}
        style={style}
      >
        {children}
      </span>
    )
  }

  if (href === '/') {
    return (
      <Link href={href} className={className} style={style}>
        {children}
      </Link>
    )
  }

  return (
    <a href={href} className={className} style={style}>
      {children}
    </a>
  )
}
