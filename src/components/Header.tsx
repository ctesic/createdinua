'use client'

import { useTranslations } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'
import { LocaleSwitcher } from './LocaleSwitcher'

export function Header() {
  const t = useTranslations('nav')
  const pathname = usePathname()

  const navItems = [
    { href: '/schedule' as const, label: t('schedule') },
    { href: '/catalog' as const, label: t('catalog') },
    { href: '/about' as const, label: t('about') },
  ]

  return (
    <header className="border-b border-[var(--color-border)]">
      <div className="mx-auto flex items-center justify-between px-[var(--spacing-6)] py-[var(--spacing-4)]" style={{ maxWidth: 'var(--max-width-content)' }}>
        <Link href="/" className="text-[var(--text-xl)] font-[var(--font-weight-bold)] text-[var(--color-text-primary)] hover:text-[var(--color-primary)] transition-colors" style={{ transitionDuration: 'var(--transition-fast)' }}>
          Created in UA
        </Link>

        <nav className="flex items-center gap-[var(--spacing-6)]">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-[var(--text-sm)] font-[var(--font-weight-medium)] transition-colors hover:text-[var(--color-primary)] ${
                pathname === item.href
                  ? 'text-[var(--color-primary)]'
                  : 'text-[var(--color-text-secondary)]'
              }`}
              style={{ transitionDuration: 'var(--transition-fast)' }}
            >
              {item.label}
            </Link>
          ))}
          <LocaleSwitcher />
        </nav>
      </div>
    </header>
  )
}
