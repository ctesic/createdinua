'use client'

import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: ReactNode
  size?: 'md' | 'sm'
  variant?: 'blue' | 'yellow'
  label: string
}

const sizeStyles = {
  md: 'w-10 h-10 [&>*]:size-6',
  sm: 'w-8 h-8 [&>*]:size-4',
}

const variantStyles = {
  blue: [
    'bg-[var(--color-primary)] text-[var(--color-text-inverse)]',
    'hover:bg-[image:linear-gradient(var(--color-state-hover-on-light),var(--color-state-hover-on-light)),linear-gradient(var(--color-primary),var(--color-primary))]',
    'active:bg-[image:linear-gradient(var(--color-state-pressed-on-light),var(--color-state-pressed-on-light)),linear-gradient(var(--color-primary),var(--color-primary))]',
  ].join(' '),
  yellow: [
    'bg-transparent text-[var(--color-text-primary)]',
    'hover:bg-[var(--color-accent)]',
    'active:bg-[image:linear-gradient(var(--color-state-pressed-on-light),var(--color-state-pressed-on-light)),linear-gradient(var(--color-accent),var(--color-accent))]',
  ].join(' '),
} as const

export function IconButton({ icon, size = 'md', variant = 'blue', label, className, ...props }: Props) {
  return (
    <button
      aria-label={label}
      className={`inline-flex items-center justify-center rounded-[var(--radius-full)] p-[var(--spacing-2)] transition-colors cursor-pointer ${sizeStyles[size]} ${variantStyles[variant]} ${className ?? ''}`}
      {...props}
    >
      {icon}
    </button>
  )
}
