'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'
import { Menu, X } from 'lucide-react'
import { LocaleSwitcher } from './LocaleSwitcher'
import { NavLink } from './NavLink'
import { IconButton } from './IconButton'

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
  </svg>
)

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
)

const TelegramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
)

function SocialIcons() {
  return (
    <div className="flex items-center gap-[var(--spacing-2)]">
      <IconButton icon={<InstagramIcon />} label="Instagram" variant="yellow" size="sm" />
      <IconButton icon={<FacebookIcon />} label="Facebook" variant="yellow" size="sm" />
      <IconButton icon={<TelegramIcon />} label="Telegram" variant="yellow" size="sm" />
    </div>
  )
}

function NavLinks({ pathname, navItems, onClick }: { pathname: string; navItems: { href: any; label: string }[]; onClick?: () => void }) {
  return (
    <nav className="flex items-start">
      {navItems.map((item) => (
        <NavLink
          key={item.href}
          href={item.href}
          active={pathname === item.href || pathname.startsWith(item.href + '/')}
          onClick={onClick}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  )
}

function RightCol() {
  return (
    <div className="flex items-center gap-[var(--spacing-4)]">
      <SocialIcons />
      <div className="w-2" />
      <LocaleSwitcher />
    </div>
  )
}

export function Header() {
  const t = useTranslations('nav')
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const navItems = [
    { href: '/catalog' as const, label: t('catalog') },
    { href: '/about' as const, label: t('about') },
    { href: '/schedule' as const, label: t('schedule') },
  ]

  return (
    <header className="sticky top-0 z-50 bg-[var(--color-background)] border-b border-[var(--color-border)]">
      {/* lg — full desktop: nav | logo + text + hashtag | social + locale */}
      <div className="hidden lg:flex items-center justify-between px-[var(--spacing-6)] py-[var(--spacing-4)]">
        <NavLinks pathname={pathname} navItems={navItems} />

        <Link href="/" className="flex items-center gap-[var(--spacing-3)]">
          <img src="/images/service/logo-footer.svg" alt="Created in UA" className="w-8 h-8 shrink-0" />
          <div className="flex flex-col whitespace-nowrap">
            <span className="font-[family-name:var(--font-heading)] font-[number:var(--font-weight-bold)] text-[14px] leading-[20px] text-[var(--color-text-primary)]">
              {t('siteTitle')}
            </span>
            <div className="flex gap-[var(--spacing-1)] items-start">
              <span className="font-[family-name:var(--font-body)] text-[length:var(--text-sm)] leading-[var(--line-height-sm)] text-[var(--color-text-primary)]">
                {t('siteTagline')}
              </span>
              <span className="font-[family-name:var(--font-body)] text-[14px] leading-[20px] text-[var(--color-primary)]">
                {t('hashtag')}
              </span>
            </div>
          </div>
        </Link>

        <RightCol />
      </div>

      {/* md — compact desktop: nav | logo icon only | social + locale */}
      <div className="hidden md:flex lg:hidden items-center justify-between px-[var(--spacing-6)] py-[var(--spacing-4)]">
        <NavLinks pathname={pathname} navItems={navItems} />

        <Link href="/">
          <img src="/images/service/logo-footer.svg" alt="Created in UA" className="w-8 h-8 shrink-0" />
        </Link>

        <RightCol />
      </div>

      {/* default — mobile: logo + name | hamburger */}
      <div className="flex md:hidden items-center justify-between px-[var(--spacing-6)] py-[var(--spacing-4)]">
        <Link href="/" className="flex items-center gap-[var(--spacing-3)]">
          <img src="/images/service/logo-footer.svg" alt="Created in UA" className="w-8 h-8 shrink-0" />
          <div className="flex flex-col whitespace-nowrap">
            <span className="font-[family-name:var(--font-heading)] font-[number:var(--font-weight-bold)] text-[14px] leading-[20px] text-[var(--color-text-primary)]">
              {t('siteTitle')}
            </span>
            <span className="font-[family-name:var(--font-body)] text-[length:var(--text-sm)] leading-[var(--line-height-sm)] text-[var(--color-text-primary)]">
              {t('siteTagline')}
            </span>
          </div>
        </Link>
        <IconButton
          icon={mobileOpen ? <X /> : <Menu />}
          label={mobileOpen ? 'Close menu' : 'Open menu'}
          variant="blue"
          size="md"
          onClick={() => setMobileOpen(!mobileOpen)}
        />
      </div>

      {/* Mobile — expanded menu */}
      {mobileOpen && (
        <div className="md:hidden flex flex-col gap-[var(--spacing-6)] px-[var(--spacing-6)] py-[var(--spacing-5)]">
          <nav className="flex flex-col w-full">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                active={pathname === item.href || pathname.startsWith(item.href + '/')}
                onClick={() => setMobileOpen(false)}
                className="w-full"
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center justify-center gap-[var(--spacing-4)]">
            <SocialIcons />
            <div className="w-2" />
            <LocaleSwitcher />
          </div>
        </div>
      )}
    </header>
  )
}
