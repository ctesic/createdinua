'use client'

import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: ReactNode
  size?: 'md' | 'sm'
  surface?: 'on-light' | 'on-dark'
  label: string
}

const sizeStyles = {
  md: 'w-10 h-10',
  sm: 'w-8 h-8',
}

export function IconButton({ icon, size = 'md', surface = 'on-light', label, className, ...props }: Props) {
  const hoverClass = surface === 'on-dark'
    ? 'hover:bg-[var(--color-state-hover-on-dark)] active:bg-[var(--color-state-pressed-on-dark)]'
    : 'hover:bg-[var(--color-state-hover-on-light)] active:bg-[var(--color-state-pressed-on-light)]'

  const colorClass = surface === 'on-dark'
    ? 'text-[var(--color-text-inverse)]'
    : 'text-[var(--color-text-secondary)]'

  return (
    <button
      aria-label={label}
      className={`inline-flex items-center justify-center rounded-[var(--radius-sm)] transition-colors ${sizeStyles[size]} ${hoverClass} ${colorClass} ${className ?? ''}`}
      {...props}
    >
      {icon}
    </button>
  )
}
