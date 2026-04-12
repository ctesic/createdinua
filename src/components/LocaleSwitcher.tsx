'use client'

import { useState, useRef, useEffect } from 'react'
import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'
import { locales, type Locale } from '@/i18n/routing'
import { ChevronDown } from 'lucide-react'

const localeLabels: Record<Locale, { short: string; full: string }> = {
  uk: { short: 'UK', full: 'UK – Українська' },
  en: { short: 'EN', full: 'EN - English' },
  he: { short: 'HE', full: 'HE - עברית' },
}

export function LocaleSwitcher() {
  const locale = useLocale() as Locale
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  function switchLocale(nextLocale: Locale) {
    setOpen(false)
    router.replace(
      // @ts-expect-error — pathname is valid
      { pathname },
      { locale: nextLocale },
    )
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={ref}>
      {/* Trigger */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-start rounded-[var(--radius-full)] bg-[var(--color-surface)] p-[var(--spacing-1)] transition-colors cursor-pointer hover:bg-[image:linear-gradient(var(--color-state-hover-on-light),var(--color-state-hover-on-light)),linear-gradient(var(--color-surface),var(--color-surface))]"
      >
        <span className="flex items-center gap-[var(--spacing-1)] rounded-[var(--radius-full)] bg-[var(--color-primary)] px-[var(--spacing-3)] font-[family-name:var(--font-body)] text-[length:var(--text-base)] leading-[var(--line-height-base)] text-[var(--color-text-inverse)] whitespace-nowrap">
          {localeLabels[locale].short}
          <ChevronDown size={16} />
        </span>
      </button>

      {/* Dropdown menu */}
      {open && (
        <div className="absolute end-0 top-full mt-[var(--spacing-2)] bg-[var(--color-surface-elevated)] rounded-[var(--radius-lg)] p-[var(--spacing-1)] shadow-[var(--shadow-md)] z-50 min-w-[144px]">
          {locales.map((l) => (
            <button
              key={l}
              onClick={() => switchLocale(l)}
              className={`flex w-full items-center px-[var(--spacing-2)] py-[var(--spacing-1)] rounded-[var(--radius-md)] font-[family-name:var(--font-body)] text-[length:var(--text-base)] leading-[var(--line-height-base)] text-[var(--color-text-primary)] whitespace-nowrap cursor-pointer transition-colors hover:bg-[var(--color-state-hover-on-light)] active:bg-[var(--color-state-pressed-on-light)] ${l === 'he' ? 'justify-end' : ''}`}
            >
              {localeLabels[l].full}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
