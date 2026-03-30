import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getMovieBySlug, getScreeningsForMovie } from '@/lib/payload'
import { ScreeningCard } from '@/components/ScreeningCard'
import type { Locale } from '@/i18n/routing'

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

export default async function MoviePage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: 'movie' })
  const tCatalog = await getTranslations({ locale, namespace: 'catalog' })
  const movie = await getMovieBySlug(slug, locale as Locale)

  if (!movie) {
    notFound()
  }

  const screeningsResult = await getScreeningsForMovie(movie.id, locale as Locale)
  const upcomingScreenings = screeningsResult.docs.filter(
    (s: any) => new Date(s.datetime) > new Date()
  )

  const poster = typeof movie.poster === 'object' && movie.poster ? movie.poster : null
  const genres = Array.isArray(movie.genre) ? movie.genre : []

  return (
    <section className="py-[var(--spacing-16)]">
      <div className="mx-auto px-[var(--spacing-6)]" style={{ maxWidth: 'var(--max-width-content)' }}>
        <div className="flex flex-col md:flex-row gap-[var(--spacing-10)]">
          {/* Poster */}
          <div className="shrink-0 w-full md:w-[300px]">
            <div className="aspect-[2/3] relative rounded-[var(--radius-lg)] overflow-hidden bg-[var(--color-surface)]">
              {poster?.url ? (
                <Image
                  src={poster.url as string}
                  alt={(poster as any).alt || movie.title}
                  fill
                  className="object-cover"
                  sizes="300px"
                  priority
                />
              ) : (
                <div className="flex h-full items-center justify-center text-[var(--color-text-muted)]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="m10 8 6 4-6 4Z" />
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="flex-1">
            <h1 className="text-[var(--text-4xl)] font-[var(--font-weight-bold)] text-[var(--color-text-primary)] mb-[var(--spacing-4)]">
              {movie.title}
            </h1>

            <div className="flex flex-wrap gap-[var(--spacing-6)] mb-[var(--spacing-6)] text-[var(--text-sm)]">
              {movie.director && (
                <div>
                  <span className="text-[var(--color-text-muted)]">{t('director')}: </span>
                  <span className="text-[var(--color-text-primary)] font-[var(--font-weight-medium)]">{movie.director}</span>
                </div>
              )}
              <div>
                <span className="text-[var(--color-text-muted)]">{t('year')}: </span>
                <span className="text-[var(--color-text-primary)] font-[var(--font-weight-medium)]">{movie.year}</span>
              </div>
              {movie.duration && (
                <div>
                  <span className="text-[var(--color-text-muted)]">{t('duration')}: </span>
                  <span className="text-[var(--color-text-primary)] font-[var(--font-weight-medium)]">
                    {tCatalog('duration', { minutes: movie.duration })}
                  </span>
                </div>
              )}
            </div>

            {genres.length > 0 && (
              <div className="flex flex-wrap gap-[var(--spacing-2)] mb-[var(--spacing-6)]">
                {genres.map((genre: string) => (
                  <span
                    key={genre}
                    className="rounded-[var(--radius-full)] bg-[var(--color-primary-light)] px-[var(--spacing-3)] py-[var(--spacing-1)] text-[var(--text-xs)] font-[var(--font-weight-medium)] text-[var(--color-primary)]"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            )}

            {movie.trailerUrl && (
              <a
                href={movie.trailerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-[var(--spacing-2)] rounded-[var(--radius-full)] bg-[var(--color-primary)] px-[var(--spacing-6)] py-[var(--spacing-3)] text-[var(--text-sm)] font-[var(--font-weight-semibold)] text-[var(--color-text-on-primary)] hover:bg-[var(--color-primary-hover)] transition-colors mb-[var(--spacing-8)]"
                style={{ transitionDuration: 'var(--transition-fast)' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="m10 8 6 4-6 4Z" />
                </svg>
                {t('watchTrailer')}
              </a>
            )}

            {/* Description */}
            {movie.description && (
              <div className="prose text-[var(--color-text-secondary)] max-w-none">
                {/* Rich text content would be rendered here */}
              </div>
            )}
          </div>
        </div>

        {/* Upcoming Screenings for this movie */}
        {upcomingScreenings.length > 0 && (
          <div className="mt-[var(--spacing-16)]">
            <h2 className="text-[var(--text-2xl)] font-[var(--font-weight-bold)] text-[var(--color-text-primary)] mb-[var(--spacing-6)]">
              {t('upcomingScreenings')}
            </h2>
            <div className="flex flex-col gap-[var(--spacing-3)]">
              {upcomingScreenings.map((screening: any) => (
                <ScreeningCard
                  key={screening.id}
                  movie={{
                    title: movie.title as string,
                    slug: movie.slug,
                    poster: poster,
                  }}
                  place={{
                    name: typeof screening.place === 'object' ? screening.place.name : '',
                    city: typeof screening.place === 'object' ? screening.place.city : '',
                  }}
                  datetime={screening.datetime}
                  ticketUrl={screening.ticketUrl}
                  price={screening.price}
                  isCancelled={screening.isCancelled}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
