'use client'

import { useTranslations } from 'next-intl'

export function Footer() {
  const t = useTranslations('footer')

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <div
        className="mx-auto flex items-center justify-between px-[var(--spacing-6)] py-[var(--spacing-8)]"
        style={{ maxWidth: 'var(--max-width-content)' }}
      >
        <p className="text-[var(--text-sm)] text-[var(--color-text-muted)]">
          {t('rights', { year: new Date().getFullYear() })}
        </p>

        <div className="flex items-center gap-[var(--spacing-4)]">
          {/* Social links will be populated from SiteSettings */}
        </div>
      </div>
    </footer>
  )
}
