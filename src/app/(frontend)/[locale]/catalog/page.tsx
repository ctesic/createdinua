import { getTranslations, setRequestLocale } from 'next-intl/server'
import { getAllMovies } from '@/lib/payload'
import { MovieCard } from '@/components/MovieCard'
import type { Locale } from '@/i18n/routing'

type Props = {
  params: Promise<{ locale: string }>
}

export default async function CatalogPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: 'catalog' })
  const moviesResult = await getAllMovies(locale as Locale)

  return (
    <section className="py-[var(--spacing-16)]">
      <div className="mx-auto px-[var(--spacing-6)]" style={{ maxWidth: 'var(--max-width-content)' }}>
        <h1 className="text-[var(--text-4xl)] font-[var(--font-weight-bold)] text-[var(--color-text-primary)] mb-[var(--spacing-8)]">
          {t('title')}
        </h1>

        {moviesResult.docs.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-[var(--spacing-6)]">
            {moviesResult.docs.map((movie: any) => (
              <MovieCard
                key={movie.id}
                slug={movie.slug}
                title={movie.title}
                year={movie.year}
                poster={typeof movie.poster === 'object' ? movie.poster : null}
                director={movie.director}
              />
            ))}
          </div>
        ) : (
          <p className="text-[var(--color-text-muted)]">
            {locale === 'uk' ? 'Фільми з\'являться тут після додавання в адмін-панелі.' :
             locale === 'he' ? 'סרטים יופיעו כאן לאחר הוספה בפאנל הניהול.' :
             'Movies will appear here once added in the admin panel.'}
          </p>
        )}
      </div>
    </section>
  )
}
