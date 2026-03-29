import { useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'

type Props = {
  params: Promise<{ locale: string }>
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return <AboutContent />
}

function AboutContent() {
  const t = useTranslations('about')

  return (
    <section className="py-[var(--spacing-16)]">
      <div className="mx-auto px-[var(--spacing-6)]" style={{ maxWidth: 'var(--max-width-narrow)' }}>
        <h1 className="text-[var(--text-4xl)] font-[var(--font-weight-bold)] text-[var(--color-text-primary)] mb-[var(--spacing-8)]">
          {t('title')}
        </h1>
        <div className="prose text-[var(--color-text-secondary)]">
          <p>Content coming soon...</p>
        </div>
      </div>
    </section>
  )
}
