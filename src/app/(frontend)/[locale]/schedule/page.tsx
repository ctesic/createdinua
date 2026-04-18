export const revalidate = 3600

import { getTranslations, setRequestLocale } from 'next-intl/server'
import { getUpcomingScreenings } from '@/lib/payload'
import { ScreeningItem } from '@/components/ScreeningItem'
import type { Locale } from '@/i18n/routing'

type Props = {
  params: Promise<{ locale: string }>
}

export default async function SchedulePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: 'schedule' })
  const tCommon = await getTranslations({ locale, namespace: 'common' })
  const screeningsResult = await getUpcomingScreenings(locale as Locale, 50)

  const intlLocale = locale === 'he' ? 'he-IL' : locale === 'en' ? 'en-US' : 'uk-UA'

  // Group screenings by date
  const grouped: Record<string, any[]> = {}
  for (const screening of screeningsResult.docs) {
    const dt = new Date(screening.datetime)
    const dateKey = dt.toLocaleDateString(intlLocale, {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    })
    if (!grouped[dateKey]) grouped[dateKey] = []

    const movie = typeof screening.movie === 'object' ? screening.movie : null
    const place = typeof screening.place === 'object' ? screening.place : null

    grouped[dateKey].push({
      id: screening.id,
      time: dt.toLocaleTimeString(intlLocale, { hour: '2-digit', minute: '2-digit' }),
      date: dt.toLocaleDateString(intlLocale, { day: '2-digit', month: '2-digit' }),
      city: place?.city || '',
      venue: place?.name || '',
      address: place?.address || undefined,
      googleMapsUrl: place?.googleMapsUrl || undefined,
      note: screening.notes || undefined,
      ticketUrl: screening.ticketUrl || null,
      movieTitle: movie?.title || '',
      movieSlug: movie?.slug || '',
      isCancelled: screening.isCancelled,
    })
  }

  return (
    <section className="py-[var(--spacing-16)]">
      <div className="mx-auto px-[var(--spacing-6)]" style={{ maxWidth: 'var(--max-width-content)' }}>
        <h1 className="text-[length:var(--text-4xl)] font-[number:var(--font-weight-bold)] text-[var(--color-text-primary)] mb-[var(--spacing-8)]">
          {t('title')}
        </h1>

        {screeningsResult.docs.length > 0 ? (
          <div className="flex flex-col gap-[var(--spacing-10)]">
            {Object.entries(grouped).map(([dateLabel, screenings]) => (
              <div key={dateLabel}>
                <h2 className="text-[length:var(--text-lg)] font-[number:var(--font-weight-semibold)] text-[var(--color-text-secondary)] mb-[var(--spacing-4)] capitalize">
                  {dateLabel}
                </h2>
                <div className="flex flex-col gap-[var(--spacing-4)]">
                  {screenings.map((s: any) => (
                    <ScreeningItem
                      key={s.id}
                      date={s.time}
                      time={s.date}
                      city={s.city}
                      venue={s.venue}
                      address={s.address}
                      googleMapsUrl={s.googleMapsUrl}
                      note={s.note}
                      ticketUrl={s.isCancelled ? null : s.ticketUrl}
                      ticketLabel={t('buyTicket')}
                      isPast={false}
                      movieTitle={s.movieTitle}
                      movieSlug={s.movieSlug}
                      directionsLabel={tCommon('directions')}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[var(--color-text-muted)]">{t('noUpcoming')}</p>
        )}
      </div>
    </section>
  )
}
