import { getTranslations, setRequestLocale } from 'next-intl/server'
import { getCatalogMovies } from '@/lib/payload'
import { MovieCard } from '@/components/MovieCard'
import type { Locale } from '@/i18n/routing'

type Props = {
  params: Promise<{ locale: string }>
}

export default async function CatalogPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: 'catalog' })
  const moviesResult = await getCatalogMovies(locale as Locale)

  return (
    <section className="py-[var(--spacing-16)]">
      <div className="mx-auto px-[var(--spacing-6)]" style={{ maxWidth: 'var(--max-width-content)' }}>
        <h1 className="text-[length:var(--text-4xl)] font-[number:var(--font-weight-bold)] text-[var(--color-text-primary)] mb-[var(--spacing-8)]">
          {t('title')}
        </h1>

        {moviesResult.docs.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-[var(--spacing-6)] gap-y-[var(--spacing-8)]">
            {moviesResult.docs.map((movie: any) => (
              <MovieCard
                key={movie.id}
                slug={movie.slug}
                title={movie.title}
                posterUrl={typeof movie.posterVertical === 'object' ? movie.posterVertical?.url : null}
              />
            ))}
          </div>
        ) : (
          <p className="text-[var(--color-text-muted)]">
            {t('empty')}
          </p>
        )}
      </div>
    </section>
  )
}
