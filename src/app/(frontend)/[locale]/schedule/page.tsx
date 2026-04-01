import { getTranslations, setRequestLocale } from 'next-intl/server'
import { getUpcomingScreenings } from '@/lib/payload'
import { ScreeningCard } from '@/components/ScreeningCard'
import type { Locale } from '@/i18n/routing'

type Props = {
  params: Promise<{ locale: string }>
}

export default async function SchedulePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: 'schedule' })
  const screeningsResult = await getUpcomingScreenings(locale as Locale, 50)

  // Group screenings by date
  const grouped: Record<string, typeof screeningsResult.docs> = {}
  for (const screening of screeningsResult.docs) {
    const date = new Date(screening.datetime).toLocaleDateString('uk-UA', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
    if (!grouped[date]) grouped[date] = []
    grouped[date].push(screening)
  }

  return (
    <section className="py-[var(--spacing-16)]">
      <div className="mx-auto px-[var(--spacing-6)]" style={{ maxWidth: 'var(--max-width-content)' }}>
        <h1 className="text-[length:var(--text-4xl)] font-[number:var(--font-weight-bold)] text-[var(--color-text-primary)] mb-[var(--spacing-8)]">
          {t('title')}
        </h1>

        {screeningsResult.docs.length > 0 ? (
          <div className="flex flex-col gap-[var(--spacing-10)]">
            {Object.entries(grouped).map(([date, screenings]) => (
              <div key={date}>
                <h2 className="text-[length:var(--text-lg)] font-[number:var(--font-weight-semibold)] text-[var(--color-text-secondary)] mb-[var(--spacing-4)] capitalize">
                  {date}
                </h2>
                <div className="flex flex-col gap-[var(--spacing-3)]">
                  {screenings.map((screening: any) => (
                    <ScreeningCard
                      key={screening.id}
                      movie={{
                        title: typeof screening.movie === 'object' ? screening.movie.title : '',
                        slug: typeof screening.movie === 'object' ? screening.movie.slug : '',
                        poster: typeof screening.movie === 'object' ? screening.movie.poster : null,
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
            ))}
          </div>
        ) : (
          <p className="text-[var(--color-text-muted)]">{t('noUpcoming')}</p>
        )}
      </div>
    </section>
  )
}
