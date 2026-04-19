export const revalidate = 3600

import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { getAnnouncement, getRecentlyScreenedMovies, getFeaturedMovies } from '@/lib/payload'
import { AnnouncementBanner } from '@/components/AnnouncementBanner'
import { Button } from '@/components/Button'
import { HeroSlider } from '@/components/HeroSlider'
import { ImageGrid } from '@/components/ImageGrid'
import { MovieCard } from '@/components/MovieCard'
import type { Locale } from '@/i18n/routing'

type Props = {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations({ locale })
  const [announcement, recentMovies, featuredMovies] = await Promise.all([
    getAnnouncement(locale as Locale),
    getRecentlyScreenedMovies(locale as Locale, 4),
    getFeaturedMovies(locale as Locale),
  ])

  return (
    <div>
      {/* Announcement Banner */}
      {announcement?.isActive && announcement?.text && (
        <AnnouncementBanner
          text={announcement.text as string}
          type={(announcement.type as 'info' | 'warning' | 'urgent') || 'info'}
        />
      )}

      {/* Section — Featured */}
      {featuredMovies.length > 0 && (
        <section className="w-full">
          <div className="max-w-[1600px] mx-auto p-[var(--container-side-paddings)]">
            <HeroSlider
              slides={featuredMovies.map((f) => ({
                slug: f.movie.slug,
                title: f.movie.title,
                genre: f.movie.genre || '',
                ageRestriction: f.movie.ageRestriction || undefined,
                posterUrl: typeof f.movie.posterHorizontal === 'object' && f.movie.posterHorizontal?.url ? f.movie.posterHorizontal.url : (typeof f.movie.posterVertical === 'object' && f.movie.posterVertical?.url ? f.movie.posterVertical.url : ''),
                screenings: f.screenings,
                screeningsLabel: t('hero.screenings'),
              }))}
            />
          </div>
        </section>
      )}

      {/* Section — Past Events */}
      {recentMovies.length > 0 && (
        <section className="w-full">
          <div className="flex flex-col gap-[var(--spacing-10)] max-w-[1600px] mx-auto overflow-hidden px-[var(--container-side-paddings)] py-[var(--spacing-10)]">
            {/* Header row */}
            <div className="flex items-center gap-[var(--spacing-2)] w-full">
              <h2 className="flex-1 font-[family-name:var(--font-heading)] text-[length:var(--text-3xl)] leading-[var(--line-height-3xl)] font-[number:var(--font-weight-medium)] text-[var(--color-text-primary)]">
                {t('pastEvents.title')}
              </h2>
              <Link href="/schedule">
                <Button>{t('pastEvents.allEvents')}</Button>
              </Link>
            </div>

            {/* Movie cards: 1 col default, 2 col md, 4 col lg */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[var(--spacing-10)]">
              {recentMovies.map((movie: any) => {
                const posterUrl = typeof movie.posterVertical === 'object' && movie.posterVertical?.url
                  ? movie.posterVertical.url
                  : null
                return (
                  <MovieCard
                    key={movie.id}
                    slug={movie.slug}
                    title={movie.title}
                    posterUrl={posterUrl}
                  />
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Section — Stats */}
      <section className="w-full">
        <div className="max-w-[1600px] mx-auto flex flex-col gap-[var(--spacing-10)] overflow-hidden px-[var(--container-side-paddings)] py-[var(--spacing-10)]">
          <p className="font-[family-name:var(--font-heading)] font-[number:var(--font-weight-bold)] text-[length:var(--text-4xl)] leading-[var(--line-height-4xl)] text-[var(--color-primary)] text-center w-full">
            {t('nav.hashtag')}
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: '50 +', label: t('stats.films') },
              { value: '14', label: t('stats.cities') },
              { value: '3', label: t('stats.chains') },
              { value: '1+2', label: t('stats.festivals') },
            ].map((stat, i) => (
              <div
                key={i}
                className="flex flex-col gap-2 items-start p-[var(--spacing-5)] rounded-[var(--radius-xl)] bg-[var(--color-accent)]"
              >
                <p className="font-[family-name:var(--font-heading)] font-[number:var(--font-weight-bold)] text-[length:var(--text-5xl)] leading-[var(--line-height-5xl)] text-black w-full">
                  {stat.value}
                </p>
                <p className="font-[family-name:var(--font-heading)] font-[number:var(--font-weight-medium)] text-[length:var(--text-xl)] leading-[var(--line-height-xl)] text-[var(--color-text-secondary)] w-full">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section — Image Grid */}
      <section className="w-full">
        <div className="max-w-[1600px] mx-auto overflow-hidden p-[var(--container-side-paddings)]">
          <ImageGrid />
        </div>
      </section>
    </div>
  )
}
