'use client'

import { Link } from '@/i18n/navigation'
import type { ComponentProps } from 'react'

type Props = ComponentProps<typeof Link> & {
  surface?: 'on-light' | 'on-dark'
  active?: boolean
}

export function NavLink({ surface = 'on-light', active, className, children, ...props }: Props) {
  const textClass = surface === 'on-dark'
    ? 'text-[var(--color-text-inverse)]'
    : active
      ? 'text-[var(--color-text-primary)]'
      : 'text-[var(--color-text-secondary)]'

  const hoverClass = surface === 'on-dark'
    ? 'hover:bg-[var(--color-state-hover-on-dark)] active:bg-[var(--color-state-pressed-on-dark)]'
    : 'hover:bg-[var(--color-state-hover-on-light)] active:bg-[var(--color-state-pressed-on-light)]'

  return (
    <Link
      className={`inline-flex items-center justify-center px-[var(--spacing-4)] py-[var(--spacing-2)] rounded-[var(--radius-sm)] text-[length:var(--text-base)] font-[number:var(--font-weight-regular)] leading-[length:var(--line-height-base)] transition-colors ${hoverClass} ${textClass} ${className ?? ''}`}
      {...props}
    >
      {children}
    </Link>
  )
}
