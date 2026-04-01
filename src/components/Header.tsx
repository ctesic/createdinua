'use client'

import { useTranslations } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'
import { LocaleSwitcher } from './LocaleSwitcher'
import { NavLink } from './NavLink'

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
        <Link href="/" className="text-[length:var(--text-xl)] font-[number:var(--font-weight-bold)] text-[var(--color-text-primary)] hover:text-[var(--color-primary)] transition-colors" style={{ transitionDuration: 'var(--transition-fast)' }}>
          Created in UA
        </Link>

        <nav className="flex items-center gap-[var(--spacing-2)]">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              surface="on-light"
              active={pathname === item.href}
            >
              {item.label}
            </NavLink>
          ))}
          <LocaleSwitcher />
        </nav>
      </div>
    </header>
  )
}
