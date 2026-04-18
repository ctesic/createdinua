'use client'

import { useTranslations } from 'next-intl'

type Props = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorPage({ reset }: Props) {
  const t = useTranslations('error')

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-[var(--spacing-6)] text-center">
      <h1 className="font-bold text-[length:var(--text-5xl)] leading-[var(--line-height-5xl)] text-[var(--color-error)]">
        !
      </h1>
      <h2 className="font-medium text-[length:var(--text-2xl)] leading-[var(--line-height-2xl)] text-[var(--color-text-primary)] mt-[var(--spacing-4)]">
        {t('genericTitle')}
      </h2>
      <p className="text-[length:var(--text-lg)] leading-[var(--line-height-lg)] text-[var(--color-text-secondary)] mt-[var(--spacing-2)] max-w-[480px]">
        {t('genericDescription')}
      </p>
      <button
        onClick={reset}
        className="inline-flex items-center justify-center rounded-[var(--radius-full)] px-[var(--spacing-6)] py-[var(--spacing-2)] h-10 bg-[var(--color-accent)] text-[var(--color-text-on-accent)] text-[length:var(--text-base)] leading-[var(--line-height-base)] whitespace-nowrap transition-colors cursor-pointer mt-[var(--spacing-8)]"
      >
        {t('tryAgain')}
      </button>
    </div>
  )
}
