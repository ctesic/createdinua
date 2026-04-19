import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { getMovieBySlug, getScreeningsForMovie } from '@/lib/payload'
import { MovieScreenings } from '@/components/MovieScreenings'
import { TrailerPlayer } from '@/components/TrailerPlayer'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { rtlLocales, type Locale } from '@/i18n/routing'

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
  const tCommon = await getTranslations({ locale, namespace: 'common' })
  const movie = await getMovieBySlug(slug, locale as Locale)

  if (!movie) {
    notFound()
  }
  // Fetch screenings + Hebrew place names for Google Maps
  const payload = await (await import('@/lib/payload')).getPayloadClient()
  const [screeningsResult, hePlacesResult] = await Promise.all([
    getScreeningsForMovie(movie.id, locale as Locale),
    payload.find({ collection: 'places', limit: 100, locale: 'he', depth: 0 }),
  ])
  const hebrewPlaces = new Map<number | string, { name: string; city: string; address?: string }>()
  for (const p of hePlacesResult.docs) hebrewPlaces.set(p.id, { name: p.name as string, city: p.city as string, address: p.address as string || undefined })

  const now = new Date()

  const screenings = screeningsResult.docs.map((s: any) => {
    const dt = new Date(s.datetime)
    const place = typeof s.place === 'object' ? s.place : null
    const hePlace = place ? hebrewPlaces.get(place.id) : undefined
    return {
      id: s.id,
      date: dt.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', timeZone: 'Asia/Jerusalem' }).replace('/', '.'),
      time: dt.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Jerusalem' }),
      city: place?.city || '',
      venue: place?.name || '',
      address: place?.address || undefined,
      googleMapsUrl: place?.googleMapsUrl || undefined,
      mapQuery: hePlace ? [hePlace.name, hePlace.address, hePlace.city].filter(Boolean).join(', ') : undefined,
      note: s.notes || undefined,
      ticketUrl: s.ticketUrl || null,
      isPast: dt < now,
    }
  })

  const dir = rtlLocales.includes(locale as Locale) ? 'rtl' : 'ltr'
  const embedUrl = movie.trailerUrl ? getYouTubeEmbedUrl(movie.trailerUrl) : null
  const posterUrl = typeof movie.posterHorizontal === 'object' && movie.posterHorizontal?.url
    ? movie.posterHorizontal.url
    : null

  return (
    <div className="bg-[var(--color-surface)] min-h-screen">
      <div className="flex flex-col items-center w-full">
        <div className="max-w-[1440px] w-full md:px-[var(--container-side-paddings)] md:py-[var(--spacing-10)]">
          <div className="bg-[var(--color-background)] md:rounded-[32px] overflow-hidden w-full">
            {/* Trailer / Video embed */}
            <div className="aspect-[21/9] bg-[var(--color-border)] w-full">
              {embedUrl ? (
                <TrailerPlayer
                  embedUrl={embedUrl}
                  posterUrl={posterUrl}
                  title={movie.title as string}
                />
              ) : posterUrl ? (
                <img
                  src={posterUrl}
                  alt={movie.title as string}
                  className="w-full h-full object-cover"
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
                directions: tCommon('directions'),
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
                  {movie.genre && (
                    <div className="flex gap-[var(--spacing-1)] whitespace-nowrap overflow-hidden h-[28px] items-start">
                      <p className="text-[var(--color-text-primary)]">{t('genreLabel')}</p>
                      <p className="text-[var(--color-text-secondary)]">{movie.genre}</p>
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
                  <div dir={dir} className="max-w-[600px] font-[family-name:var(--font-body)] text-[length:var(--text-lg)] leading-[var(--line-height-lg)] text-[var(--color-text-primary)] self-start">
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
