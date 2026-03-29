import { useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'

type Props = {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return <HomeContent />
}

function HomeContent() {
  const t = useTranslations()

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-[var(--color-surface)] py-[var(--spacing-20)]">
        <div className="mx-auto px-[var(--spacing-6)] text-center" style={{ maxWidth: 'var(--max-width-content)' }}>
          <h1 className="text-[var(--text-5xl)] font-[var(--font-weight-bold)] text-[var(--color-text-primary)] mb-[var(--spacing-4)]">
            {t('hero.title')}
          </h1>
          <p className="text-[var(--text-xl)] text-[var(--color-text-secondary)] mb-[var(--spacing-2)]">
            {t('hero.tagline')}
          </p>
          <p className="text-[var(--text-lg)] text-[var(--color-primary)] font-[var(--font-weight-semibold)]">
            {t('hero.hashtag')}
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-[var(--spacing-16)]">
        <div className="mx-auto px-[var(--spacing-6)]" style={{ maxWidth: 'var(--max-width-content)' }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-[var(--spacing-8)] text-center">
            <div>
              <div className="text-[var(--text-4xl)] font-[var(--font-weight-bold)] text-[var(--color-primary)]">50+</div>
              <div className="text-[var(--text-sm)] text-[var(--color-text-secondary)] mt-[var(--spacing-2)]">
                Ukrainian films
              </div>
            </div>
            <div>
              <div className="text-[var(--text-4xl)] font-[var(--font-weight-bold)] text-[var(--color-primary)]">14</div>
              <div className="text-[var(--text-sm)] text-[var(--color-text-secondary)] mt-[var(--spacing-2)]">
                Israeli cities
              </div>
            </div>
            <div>
              <div className="text-[var(--text-4xl)] font-[var(--font-weight-bold)] text-[var(--color-primary)]">3</div>
              <div className="text-[var(--text-sm)] text-[var(--color-text-secondary)] mt-[var(--spacing-2)]">
                Cinema chains
              </div>
            </div>
            <div>
              <div className="text-[var(--text-4xl)] font-[var(--font-weight-bold)] text-[var(--color-primary)]">1</div>
              <div className="text-[var(--text-sm)] text-[var(--color-text-secondary)] mt-[var(--spacing-2)]">
                Festival
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
