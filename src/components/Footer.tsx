import { getTranslations } from 'next-intl/server'
import { getSiteSettings } from '@/lib/payload'
import Image from 'next/image'
import type { Locale } from '@/i18n/routing'
import { NavLink } from './NavLink'

type Props = {
  locale: Locale
}

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

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
  </svg>
)

function SocialButton({ href, label, children }: { href?: string; label: string; children: React.ReactNode }) {
  const cls = "flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-primary)] text-[var(--color-text-inverse)] hover:opacity-90 transition-opacity shrink-0"
  if (href) {
    return <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className={cls}>{children}</a>
  }
  return <span aria-label={label} className={cls}>{children}</span>
}

const navItems = [
  { href: '/schedule' as const, labelKey: 'schedule' as const },
  { href: '/about' as const, labelKey: 'about' as const },
  { href: '/catalog' as const, labelKey: 'catalog' as const },
]

export async function Footer({ locale }: Props) {
  const [t, tNav] = await Promise.all([
    getTranslations({ locale, namespace: 'footer' }),
    getTranslations({ locale, namespace: 'nav' }),
  ])

  let socialLinks: { facebook?: string; telegram?: string; instagram?: string } = {}
  try {
    const settings = await getSiteSettings(locale)
    socialLinks = (settings?.socialLinks as typeof socialLinks) || {}
  } catch {
    // Settings may not exist yet
  }

  const Logo = () => (
    <Image
      src="/images/service/logo-footer.svg"
      alt="Created in UA"
      width={40}
      height={40}
      className="shrink-0"
    />
  )

  const BrandText = () => (
    <div className="flex flex-col items-start shrink-0">
      <span className="text-[length:var(--text-sm)] leading-[length:var(--line-height-sm)] font-[number:var(--font-weight-bold)] text-[var(--color-text-inverse)] whitespace-nowrap">
        Знято в Україні / Created in Ukraine
      </span>
      <div className="flex gap-[var(--spacing-1)] items-center flex-wrap">
        <span className="text-[length:var(--text-sm)] leading-[length:var(--line-height-sm)] text-[var(--color-text-muted)]">
          Українське кіно в Ізраїлі
        </span>
        <span className="text-[length:var(--text-sm)] leading-[length:var(--line-height-sm)] text-[var(--color-accent)]">
          #більшеніжкіно
        </span>
      </div>
    </div>
  )

  return (
    <footer className="relative bg-[var(--color-background-inverted)]">
      {/* Blue + gold top stripes */}
      <div className="h-[2px] bg-[var(--color-primary)]" />
      <div className="h-[2px] bg-[var(--color-accent)]" />

      {/* Desktop */}
      <div className="hidden md:flex items-center justify-between gap-[var(--spacing-3)] px-[var(--spacing-10)] py-[var(--spacing-8)]">
        {/* Left: logo + brand + social */}
        <div className="flex items-center gap-[var(--spacing-3)]">
          <Logo />
          <BrandText />
          <div className="flex items-center gap-[var(--spacing-2)]">
            <SocialButton href={socialLinks.instagram} label="Instagram"><InstagramIcon /></SocialButton>
            <SocialButton href={socialLinks.facebook} label="Facebook"><FacebookIcon /></SocialButton>
            <SocialButton href={socialLinks.telegram} label="Telegram"><TelegramIcon /></SocialButton>
          </div>
        </div>

        {/* Right: nav links */}
        <nav className="flex items-center">
          {navItems.map(({ href, labelKey }) => (
            <NavLink key={href} href={href} surface="on-dark">
              {tNav(labelKey)}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Mobile */}
      <div className="flex md:hidden flex-col gap-[var(--spacing-4)] px-[var(--spacing-10)] py-[var(--spacing-8)]">
        <div className="flex gap-[var(--spacing-3)] items-start pb-[var(--spacing-4)] border-b border-[var(--color-border)]">
          <Logo />
          <BrandText />
        </div>
        <nav className="flex flex-col w-full">
          {navItems.map(({ href, labelKey }) => (
            <NavLink key={href} href={href} surface="on-dark" className="justify-center w-full">
              {tNav(labelKey)}
            </NavLink>
          ))}
        </nav>
      </div>
    </footer>
  )
}
