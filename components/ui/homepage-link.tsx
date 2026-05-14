import Link from 'next/link'

import { cn } from '@/lib/utils'

interface HomepageLinkProps {
  href: string
  className?: string
  children: React.ReactNode
  homepageOnly?: boolean
}

function isInternalTarget(href: string) {
  return href.startsWith('/') || href.includes('potrankinz.vercel.app')
}

export default function HomepageLink({
  href,
  className,
  children,
  homepageOnly = false,
}: HomepageLinkProps) {
  if (homepageOnly && isInternalTarget(href) && href !== '/') {
    return (
      <span
        aria-disabled="true"
        title="Homepage focus mode"
        className={cn('cursor-default', className)}
      >
        {children}
      </span>
    )
  }

  if (href === '/') {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    )
  }

  return (
    <a href={href} className={className}>
      {children}
    </a>
  )
}
