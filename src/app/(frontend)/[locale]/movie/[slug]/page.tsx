import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { getMovieBySlug, getScreeningsForMovie } from '@/lib/payload'
import { MovieScreenings } from '@/components/MovieScreenings'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { Locale } from '@/i18n/routing'

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

function getYouTubeEmbedUrl(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^&?/]+)/)
  return match ? `https://www.youtube.com/embed/${match[1]}` : null
}

export default async function MoviePage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: 'movie' })
  const movie = await getMovieBySlug(slug, locale as Locale)

  if (!movie) {
    notFound()
  }
  const screeningsResult = await getScreeningsForMovie(movie.id, locale as Locale)
  const now = new Date()

  const screenings = screeningsResult.docs.map((s: any) => {
    const dt = new Date(s.datetime)
    const place = typeof s.place === 'object' ? s.place : null
    return {
      id: s.id,
      date: `${dt.getDate().toString().padStart(2, '0')}.${(dt.getMonth() + 1).toString().padStart(2, '0')}`,
      time: `${dt.getHours().toString().padStart(2, '0')}:${dt.getMinutes().toString().padStart(2, '0')}`,
      city: place?.city || '',
      venue: place?.name || '',
      note: s.notes || undefined,
      ticketUrl: s.ticketUrl || null,
      isPast: dt < now,
    }
  })

  const embedUrl = movie.trailerUrl ? getYouTubeEmbedUrl(movie.trailerUrl) : null

  return (
    <div className="bg-[var(--color-surface)] min-h-screen">
      <div className="flex flex-col items-center w-full">
        <div className="max-w-[1440px] w-full md:px-[var(--container-side-paddings)] md:py-[var(--spacing-10)]">
          <div className="bg-[var(--color-background)] md:rounded-[32px] overflow-hidden w-full">
            {/* Trailer / Video embed */}
            <div className="aspect-[21/9] bg-[var(--color-border)] w-full">
              {embedUrl ? (
                <iframe
                  src={embedUrl}
                  title={movie.title as string}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-[var(--color-text-muted)]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="m10 8 6 4-6 4Z" />
                  </svg>
                </div>
              )}
            </div>

            {/* Screenings section */}
            <MovieScreenings
              screenings={screenings}
              labels={{
                title: t('screenings'),
                upcoming: t('upcoming'),
                past: t('past'),
                tickets: t('tickets'),
                soldOut: t('soldOut'),
                noUpcomingScreenings: t('noUpcomingScreenings'),
                noPastScreenings: t('noPastScreenings'),
              }}
            />

            {/* About section */}
            <div className="flex flex-col items-start pb-[var(--spacing-16)] pt-[var(--spacing-8)] px-[var(--spacing-8)]">
              <div className="flex flex-col md:grid md:grid-cols-[2fr_1fr] gap-6 w-full">
                {/* Info — on top for mobile, right column for desktop */}
                <div className="order-first md:order-last flex flex-col gap-[var(--spacing-1)] font-[family-name:var(--font-body)] text-[length:var(--text-lg)] leading-[var(--line-height-lg)] self-start">
                  {(movie.country || movie.year) && (
                    <p className="text-[var(--color-text-primary)]">
                      {[movie.country, movie.year].filter(Boolean).join(' ')}
                    </p>
                  )}
                  {movie.director && (
                    <div className="flex gap-[var(--spacing-1)] whitespace-nowrap overflow-hidden h-[28px] items-start">
                      <p className="text-[var(--color-text-primary)]">{t('directorLabel')}</p>
                      <p className="text-[var(--color-text-secondary)]">{movie.director}</p>
                    </div>
                  )}
                  {movie.producer && (
                    <div className="flex gap-[var(--spacing-1)] whitespace-nowrap overflow-hidden h-[28px] items-start">
                      <p className="text-[var(--color-text-primary)]">{t('producerLabel')}</p>
                      <p className="text-[var(--color-text-secondary)]">{movie.producer}</p>
                    </div>
                  )}
                  {Array.isArray(movie.genre) && movie.genre.length > 0 && (
                    <div className="flex gap-[var(--spacing-1)] whitespace-nowrap overflow-hidden h-[28px] items-start">
                      <p className="text-[var(--color-text-primary)]">{t('genreLabel')}</p>
                      <p className="text-[var(--color-text-secondary)]">{movie.genre.join(', ')}</p>
                    </div>
                  )}
                  {movie.language && (
                    <div className="flex gap-[var(--spacing-1)] whitespace-nowrap overflow-hidden h-[28px] items-start">
                      <p className="text-[var(--color-text-primary)]">{t('languageLabel')}</p>
                      <p className="text-[var(--color-text-secondary)]">{movie.language}</p>
                    </div>
                  )}
                  {movie.ageRestriction && (
                    <div className="flex gap-[var(--spacing-1)] whitespace-nowrap overflow-hidden h-[28px] items-start">
                      <p className="text-[var(--color-text-primary)]">{t('ageRestrictionLabel')}</p>
                      <p className="text-[var(--color-text-secondary)]">{movie.ageRestriction}</p>
                    </div>
                  )}
                </div>

                {/* Description text */}
                {movie.description && (
                  <div className="max-w-[600px] font-[family-name:var(--font-body)] text-[length:var(--text-lg)] leading-[var(--line-height-lg)] text-[var(--color-text-primary)] self-start">
                    <RichText data={movie.description} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
