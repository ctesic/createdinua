'use client'

import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { MapPin } from 'lucide-react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'outline' | 'inverse' | 'link'
  children: ReactNode
}

const base =
  'inline-flex items-center justify-center rounded-[var(--radius-full)] px-[var(--spacing-6)] py-[var(--spacing-2)] h-10 font-[family-name:var(--font-body)] text-[length:var(--text-base)] leading-[var(--line-height-base)] whitespace-nowrap transition-colors cursor-pointer'

const variants = {
  default: [
    'bg-[var(--color-accent)] text-[var(--color-text-on-accent)]',
    'hover:bg-[image:linear-gradient(var(--color-state-hover-on-light),var(--color-state-hover-on-light)),linear-gradient(var(--color-accent),var(--color-accent))]',
    'active:bg-[image:linear-gradient(var(--color-state-pressed-on-light),var(--color-state-pressed-on-light)),linear-gradient(var(--color-accent),var(--color-accent))]',
  ].join(' '),
  outline: [
    'border border-[var(--color-text-primary)] text-[var(--color-text-primary)] bg-[rgba(255,255,255,0.2)]',
    'hover:border-[var(--color-text-primary)] hover:text-[var(--color-text-primary)] hover:bg-[image:linear-gradient(var(--color-state-hover-on-light),var(--color-state-hover-on-light)),linear-gradient(rgba(255,255,255,0.2),rgba(255,255,255,0.2))]',
    'active:border-[var(--color-text-primary)] active:text-[var(--color-text-primary)] active:bg-[image:linear-gradient(var(--color-state-pressed-on-light),var(--color-state-pressed-on-light)),linear-gradient(white,white)]',
  ].join(' '),
  inverse: [
    'bg-[var(--color-background)] text-[var(--color-text-primary)]',
    'hover:bg-[image:linear-gradient(var(--color-state-hover-on-light),var(--color-state-hover-on-light)),linear-gradient(white,white)]',
    'active:bg-[image:linear-gradient(var(--color-state-pressed-on-light),var(--color-state-pressed-on-light)),linear-gradient(white,white)]',
  ].join(' '),
} as const

const disabledVariants = {
  default: 'bg-[var(--color-accent-light)] text-[var(--color-text-muted)] cursor-not-allowed',
  outline: 'border border-[var(--color-border)] bg-[#e2e5ea] text-[var(--color-text-muted)] cursor-not-allowed',
  inverse: 'bg-[var(--color-surface)] text-[var(--color-text-muted)] cursor-not-allowed',
} as const

export function Button({ variant = 'default', children, className, disabled, ...props }: Props) {
  if (variant === 'link') {
    return (
      <button
        className={`inline-flex items-center gap-[var(--spacing-1)] px-[var(--spacing-1)] rounded-[var(--radius-sm)] font-[family-name:var(--font-body)] text-[length:var(--text-lg)] leading-[var(--line-height-lg)] whitespace-nowrap cursor-pointer transition-colors ${
          disabled
            ? 'text-[var(--color-text-muted)] bg-[var(--color-surface)]'
            : 'text-[var(--color-text-primary)] hover:bg-[image:linear-gradient(var(--color-state-hover-on-light),var(--color-state-hover-on-light)),linear-gradient(white,white)] active:bg-[image:linear-gradient(var(--color-state-pressed-on-light),var(--color-state-pressed-on-light)),linear-gradient(white,white)]'
        } ${className ?? ''}`}
        disabled={disabled}
        {...props}
      >
        <MapPin size={16} />
        {children}
      </button>
    )
  }

  return (
    <button
      className={`${base} ${disabled ? disabledVariants[variant] : variants[variant]} ${className ?? ''}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
