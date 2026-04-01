'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'
import { locales, type Locale } from '@/i18n/routing'

const localeLabels: Record<Locale, string> = {
  uk: 'UA',
  en: 'EN',
  he: 'HE',
}

export function LocaleSwitcher() {
  const locale = useLocale() as Locale
  const router = useRouter()
  const pathname = usePathname()

  function switchLocale(nextLocale: Locale) {
    router.replace(
      // @ts-expect-error — pathname is valid
      { pathname },
      { locale: nextLocale }
    )
  }

  return (
    <div className="flex items-center gap-[var(--spacing-1)] rounded-[var(--radius-full)] bg-[var(--color-surface)] p-[var(--spacing-1)]">
      {locales.map((l) => (
        <button
          key={l}
          onClick={() => switchLocale(l)}
          className={`rounded-[var(--radius-full)] px-[var(--spacing-3)] py-[var(--spacing-1)] text-[length:var(--text-xs)] font-[number:var(--font-weight-medium)] transition-colors ${
            locale === l
              ? 'bg-[var(--color-primary)] text-[var(--color-text-inverse)]'
              : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
          }`}
          style={{ transitionDuration: 'var(--transition-fast)' }}
        >
          {localeLabels[l]}
        </button>
      ))}
    </div>
  )
}
