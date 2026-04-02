'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'
import { LocaleSwitcher } from './LocaleSwitcher'
import { NavLink } from './NavLink'

export function Header() {
  const t = useTranslations('nav')
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const navItems = [
    { href: '/schedule' as const, label: t('schedule') },
    { href: '/catalog' as const, label: t('catalog') },
    { href: '/about' as const, label: t('about') },
  ]

  return (
    <header className="sticky top-0 z-50 bg-[var(--color-background)]/95 backdrop-blur-sm border-b border-[var(--color-border)]">
      <div
        className="mx-auto flex items-center justify-between px-[var(--spacing-6)] py-[var(--spacing-3)]"
        style={{ maxWidth: 'var(--max-width-content)' }}
      >
        {/* Logo */}
        <Link
          href="/"
          className="text-[length:var(--text-lg)] font-[number:var(--font-weight-bold)] text-[var(--color-text-primary)] hover:text-[var(--color-primary)] transition-colors whitespace-nowrap"
          style={{ transitionDuration: 'var(--transition-fast)' }}
        >
          Created in UA
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-[var(--spacing-1)]">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              surface="on-light"
              active={pathname === item.href || pathname.startsWith(item.href + '/')}
            >
              {item.label}
            </NavLink>
          ))}
          <div className="ml-[var(--spacing-2)]">
            <LocaleSwitcher />
          </div>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-[var(--radius-md)] hover:bg-[var(--color-state-hover-on-light)] transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {mobileOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="4" y1="8" x2="20" y2="8" />
                <line x1="4" y1="16" x2="20" y2="16" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-[var(--color-border)] bg-[var(--color-background)] px-[var(--spacing-6)] py-[var(--spacing-4)] flex flex-col gap-[var(--spacing-1)]">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              surface="on-light"
              active={pathname === item.href || pathname.startsWith(item.href + '/')}
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
          <div className="pt-[var(--spacing-2)]">
            <LocaleSwitcher />
          </div>
        </nav>
      )}
    </header>
  )
}
