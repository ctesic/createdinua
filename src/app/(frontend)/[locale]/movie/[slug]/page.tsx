import type { Metadata } from 'next'
import Image from 'next/image'
import { getTranslations, getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { getMovieBySlug, getScreeningsForMovie } from '@/lib/payload'
import { MovieScreenings } from '@/components/MovieScreenings'
import { TrailerPlayer } from '@/components/TrailerPlayer'
import { StillsGallery, type Still } from '@/components/StillsGallery'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { rtlLocales, type Locale } from '@/i18n/routing'

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

function getYouTubeEmbedUrl(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^&?/]+)/)
  return match ? `https://www.youtube.com/embed/${match[1]}` : null
}

function richTextToPlain(node: any): string {
  if (!node) return ''
  if (Array.isArray(node)) return node.map(richTextToPlain).join('')
  if (typeof node !== 'object') return ''
  if (node.type === 'text') return node.text || ''
  if (node.type === 'linebreak') return '\n'
  const children = Array.isArray(node.children) ? node.children.map(richTextToPlain).join('') : ''
  if (node.root) return richTextToPlain(node.root)
  if (node.type === 'paragraph' || node.type === 'listitem') return children + '\n'
  return children
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const movie = await getMovieBySlug(slug, locale as Locale)
  if (!movie) return {}

  const messages = await getMessages({ locale })
  const meta = messages.meta as Record<string, string>
  const brand = meta?.brand || 'Created in Ukraine'
  const title = `${movie.title} | ${brand}`

  const horizontal = typeof movie.posterHorizontal === 'object' ? movie.posterHorizontal?.url : null
  const vertical = typeof movie.posterVertical === 'object' ? movie.posterVertical?.url : null
  const ogImage = horizontal || vertical

  return {
    title,
    openGraph: {
      title,
      ...(ogImage ? { images: [{ url: ogImage, alt: movie.title as string }] } : {}),
    },
    twitter: {
      card: ogImage ? 'summary_large_image' : 'summary',
      title,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  }
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
  const intlLocale = locale === 'he' ? 'he-IL' : locale === 'en' ? 'en-US' : 'uk-UA'

  const screenings = screeningsResult.docs.map((s: any) => {
    const dt = new Date(s.datetime)
    const place = typeof s.place === 'object' ? s.place : null
    const hePlace = place ? hebrewPlaces.get(place.id) : undefined
    const isPast = dt < now
    const dateStr = isPast
      ? dt.toLocaleDateString(intlLocale, { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'Asia/Jerusalem' })
      : dt.toLocaleDateString(intlLocale, { day: 'numeric', month: 'long', timeZone: 'Asia/Jerusalem' })
    return {
      id: s.id,
      date: dateStr,
      time: dt.toLocaleTimeString(intlLocale, { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Jerusalem' }),
      city: place?.city || '',
      venue: place?.name || '',
      address: place?.address || undefined,
      googleMapsUrl: place?.googleMapsUrl || undefined,
      mapQuery: hePlace ? [hePlace.name, hePlace.address, hePlace.city].filter(Boolean).join(', ') : undefined,
      hall: s.hall || undefined,
      note: s.notes || undefined,
      ticketUrl: s.ticketUrl || null,
      isPast,
      isCancelled: Boolean(s.isCancelled),
    }
  })

  const dir = rtlLocales.includes(locale as Locale) ? 'rtl' : 'ltr'
  const embedUrl = movie.trailerUrl ? getYouTubeEmbedUrl(movie.trailerUrl) : null
  const posterUrl = typeof movie.posterHorizontal === 'object' && movie.posterHorizontal?.url
    ? movie.posterHorizontal.url
    : null
  const verticalUrl = typeof movie.posterVertical === 'object' && movie.posterVertical?.url
    ? movie.posterVertical.url
    : null

  const stills: Still[] = (Array.isArray(movie.stills) ? movie.stills : [])
    .filter((s: any) => typeof s === 'object' && s?.url)
    .map((s: any) => ({
      id: s.id,
      url: s.url,
      alt: s.alt || undefined,
      width: s.width || undefined,
      height: s.height || undefined,
    }))

  const facts = [
    { label: t('directorLabel'), value: movie.director },
    { label: t('producerLabel'), value: movie.producer },
    { label: t('genreLabel'), value: movie.genre },
    { label: t('languageLabel'), value: movie.language },
    { label: t('ageRestrictionLabel'), value: movie.ageRestriction },
  ].filter((f): f is { label: string; value: string } => Boolean(f.value))

  const plainDescription = movie.description ? richTextToPlain(movie.description).trim() : undefined
  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Movie',
    name: movie.title,
    ...(plainDescription ? { description: plainDescription.slice(0, 5000) } : {}),
    ...(posterUrl || verticalUrl ? { image: posterUrl || verticalUrl } : {}),
    ...(movie.year ? { datePublished: String(movie.year) } : {}),
    ...(movie.director ? { director: { '@type': 'Person', name: movie.director } } : {}),
    ...(movie.duration ? { duration: `PT${movie.duration}M` } : {}),
    ...(movie.genre ? { genre: movie.genre } : {}),
    ...(movie.language ? { inLanguage: movie.language } : {}),
    ...(movie.ageRestriction ? { contentRating: movie.ageRestriction } : {}),
    ...(movie.trailerUrl ? { trailer: { '@type': 'VideoObject', url: movie.trailerUrl, name: movie.title } } : {}),
  }

  return (
    <div className="bg-[var(--color-surface)] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="flex flex-col items-center w-full">
        <div className="max-w-[var(--movie-container-max)] w-full md:px-[var(--container-side-paddings)] md:py-[var(--spacing-10)]">
          <div className="bg-[var(--color-background)] md:rounded-[32px] overflow-hidden w-full">
            {/* Trailer / Video embed */}
            <div className="aspect-video bg-[var(--color-border)] w-full">
              {embedUrl ? (
                <TrailerPlayer
                  embedUrl={embedUrl}
                  posterUrl={posterUrl}
                  title={movie.title as string}
                />
              ) : posterUrl ? (
                <div className="relative w-full h-full">
                  <Image
                    src={posterUrl}
                    alt={movie.title as string}
                    fill
                    priority
                    sizes="(max-width: 1320px) 100vw, 1320px"
                    className="object-cover"
                  />
                </div>
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
              movieTitle={movie.title as string}
              movieSlug={movie.slug as string}
              ageRestriction={(movie.ageRestriction as string) || undefined}
              labels={{
                title: t('screenings'),
                upcoming: t('upcoming'),
                past: t('past'),
                tickets: t('tickets'),
                soldOut: t('soldOut'),
                cancelled: t('cancelled'),
                noUpcomingScreenings: t('noUpcomingScreenings'),
                noPastScreenings: t('noPastScreenings'),
                directions: tCommon('directions'),
                hall: tCommon('hall'),
              }}
            />

          </div>

          {/* About — sits on the page background, outside the white card */}
          <div className="flex flex-col gap-[var(--spacing-10)] pb-[var(--spacing-16)] pt-[var(--spacing-8)] md:pt-[var(--spacing-10)] px-[var(--spacing-5)] md:px-0">
            <div className="flex flex-col md:grid md:grid-cols-[312px_minmax(0,1fr)] gap-[var(--spacing-8)] lg:gap-[var(--spacing-10)] w-full">
              {/* Info — poster on top, then the facts. Sits below the
                  description on mobile, left of it from md up. */}
              <div className="order-2 md:order-1 flex flex-col gap-[var(--spacing-6)] self-start">
                {verticalUrl && (
                  <div className="relative w-full aspect-[2/3] overflow-hidden rounded-[var(--radius-xl)] bg-[var(--color-border-subtle)]">
                    <Image
                      src={verticalUrl}
                      alt={movie.title as string}
                      fill
                      sizes="(max-width: 768px) 100vw, 312px"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex flex-col gap-[var(--spacing-5)] font-[family-name:var(--font-body)] text-[length:var(--text-lg)] leading-[var(--line-height-lg)]">
                  {(movie.country || movie.year) && (
                    <p className="text-[var(--color-text-primary)]">
                      {[movie.country, movie.year].filter(Boolean).join(' ')}
                    </p>
                  )}
                  {/* Label above, value below in bold */}
                  {facts.map(({ label, value }) => (
                    <div key={label} className="flex flex-col gap-[var(--spacing-2)]">
                      <p className="text-[var(--color-text-secondary)]">{label}</p>
                      <p className="font-[number:var(--font-weight-bold)] text-[var(--color-text-primary)] min-w-0 break-words">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              {movie.description && (
                <div dir={dir} className="order-1 md:order-2 flex flex-col gap-[var(--spacing-4)] self-start text-[length:var(--text-lg)] leading-[var(--line-height-lg)]">
                  <h2 className="font-[family-name:var(--font-heading)] font-[number:var(--font-weight-medium)] text-[length:var(--text-2xl)] leading-[var(--line-height-2xl)] text-[var(--color-text-primary)]">
                    {t('aboutTitle')}
                  </h2>
                  <RichText className="rich-text" data={movie.description} />
                </div>
              )}
            </div>

            {/* Stills gallery */}
            {stills.length > 0 && (
              <div dir={dir} className="flex flex-col gap-[var(--spacing-4)] w-full">
                <h2 className="font-[family-name:var(--font-heading)] font-[number:var(--font-weight-medium)] text-[length:var(--text-2xl)] leading-[var(--line-height-2xl)] text-[var(--color-text-primary)]">
                  {t('stillsTitle')}
                </h2>
                <StillsGallery
                  stills={stills}
                  dir={dir}
                  labels={{
                    close: tCommon('close'),
                    previous: tCommon('previous'),
                    next: tCommon('next'),
                    image: tCommon('image'),
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
