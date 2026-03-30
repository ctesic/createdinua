import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { getUpcomingScreenings, getAnnouncement, getSiteSettings } from '@/lib/payload'
import { AnnouncementBanner } from '@/components/AnnouncementBanner'
import { ScreeningCard } from '@/components/ScreeningCard'
import type { Locale } from '@/i18n/routing'

type Props = {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations({ locale })
  const [screeningsResult, announcement, siteSettings] = await Promise.all([
    getUpcomingScreenings(locale as Locale, 5),
    getAnnouncement(locale as Locale),
    getSiteSettings(locale as Locale),
  ])

  const heroTitle = siteSettings?.heroTitle || t('hero.title')
  const heroTagline = siteSettings?.heroTagline || t('hero.tagline')
  const stats = (siteSettings?.stats as Array<{ value: string; label: string }>) || []

  return (
    <div>
      {/* Announcement Banner */}
      {announcement?.isActive && announcement?.text && (
        <AnnouncementBanner
          text={announcement.text as string}
          type={(announcement.type as 'info' | 'warning' | 'urgent') || 'info'}
        />
      )}

      {/* Hero Section */}
      <section className="bg-[var(--color-surface)] py-[var(--spacing-20)]">
        <div className="mx-auto px-[var(--spacing-6)] text-center" style={{ maxWidth: 'var(--max-width-content)' }}>
          <h1 className="text-[var(--text-5xl)] font-[var(--font-weight-bold)] text-[var(--color-text-primary)] mb-[var(--spacing-4)]">
            {heroTitle}
          </h1>
          <p className="text-[var(--text-xl)] text-[var(--color-text-secondary)] mb-[var(--spacing-2)]">
            {heroTagline}
          </p>
          <p className="text-[var(--text-lg)] text-[var(--color-primary)] font-[var(--font-weight-semibold)]">
            {t('hero.hashtag')}
          </p>
        </div>
      </section>

      {/* Upcoming Screenings */}
      <section className="py-[var(--spacing-16)]">
        <div className="mx-auto px-[var(--spacing-6)]" style={{ maxWidth: 'var(--max-width-content)' }}>
          <div className="flex items-center justify-between mb-[var(--spacing-8)]">
            <h2 className="text-[var(--text-3xl)] font-[var(--font-weight-bold)] text-[var(--color-text-primary)]">
              {t('schedule.title')}
            </h2>
            <Link
              href="/schedule"
              className="text-[var(--text-sm)] font-[var(--font-weight-medium)] text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
            >
              {t('common.learnMore')}
            </Link>
          </div>

          {screeningsResult.docs.length > 0 ? (
            <div className="flex flex-col gap-[var(--spacing-4)]">
              {screeningsResult.docs.map((screening: any) => (
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
          ) : (
            <p className="text-[var(--color-text-muted)]">{t('schedule.noUpcoming')}</p>
          )}
        </div>
      </section>

      {/* Stats Section */}
      {stats.length > 0 ? (
        <section className="py-[var(--spacing-16)] bg-[var(--color-surface)]">
          <div className="mx-auto px-[var(--spacing-6)]" style={{ maxWidth: 'var(--max-width-content)' }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-[var(--spacing-8)] text-center">
              {stats.map((stat, i) => (
                <div key={i}>
                  <div className="text-[var(--text-4xl)] font-[var(--font-weight-bold)] text-[var(--color-primary)]">
                    {stat.value}
                  </div>
                  <div className="text-[var(--text-sm)] text-[var(--color-text-secondary)] mt-[var(--spacing-2)]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="py-[var(--spacing-16)] bg-[var(--color-surface)]">
          <div className="mx-auto px-[var(--spacing-6)]" style={{ maxWidth: 'var(--max-width-content)' }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-[var(--spacing-8)] text-center">
              <div>
                <div className="text-[var(--text-4xl)] font-[var(--font-weight-bold)] text-[var(--color-primary)]">50+</div>
                <div className="text-[var(--text-sm)] text-[var(--color-text-secondary)] mt-[var(--spacing-2)]">Ukrainian films</div>
              </div>
              <div>
                <div className="text-[var(--text-4xl)] font-[var(--font-weight-bold)] text-[var(--color-primary)]">14</div>
                <div className="text-[var(--text-sm)] text-[var(--color-text-secondary)] mt-[var(--spacing-2)]">Israeli cities</div>
              </div>
              <div>
                <div className="text-[var(--text-4xl)] font-[var(--font-weight-bold)] text-[var(--color-primary)]">3</div>
                <div className="text-[var(--text-sm)] text-[var(--color-text-secondary)] mt-[var(--spacing-2)]">Cinema chains</div>
              </div>
              <div>
                <div className="text-[var(--text-4xl)] font-[var(--font-weight-bold)] text-[var(--color-primary)]">1</div>
                <div className="text-[var(--text-sm)] text-[var(--color-text-secondary)] mt-[var(--spacing-2)]">Festival</div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
