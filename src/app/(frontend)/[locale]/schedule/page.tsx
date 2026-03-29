import { useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'

type Props = {
  params: Promise<{ locale: string }>
}

export default async function SchedulePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return <ScheduleContent />
}

function ScheduleContent() {
  const t = useTranslations('schedule')

  return (
    <section className="py-[var(--spacing-16)]">
      <div className="mx-auto px-[var(--spacing-6)]" style={{ maxWidth: 'var(--max-width-content)' }}>
        <h1 className="text-[var(--text-4xl)] font-[var(--font-weight-bold)] text-[var(--color-text-primary)] mb-[var(--spacing-8)]">
          {t('title')}
        </h1>
        <p className="text-[var(--color-text-muted)]">{t('noUpcoming')}</p>
      </div>
    </section>
  )
}
