import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { getUpcomingScreenings, getAnnouncement, getSiteSettings, getRecentlyScreenedMovies } from '@/lib/payload'
import { AnnouncementBanner } from '@/components/AnnouncementBanner'
import { Button } from '@/components/Button'
import { MovieCard } from '@/components/MovieCard'
import { ScreeningCard } from '@/components/ScreeningCard'
import type { Locale } from '@/i18n/routing'

type Props = {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations({ locale })
  const [screeningsResult, announcement, siteSettings, recentMovies] = await Promise.all([
    getUpcomingScreenings(locale as Locale, 5),
    getAnnouncement(locale as Locale),
    getSiteSettings(locale as Locale),
    getRecentlyScreenedMovies(locale as Locale, 4),
  ])

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

      {/* Section — Featured (placeholder) */}
      <section className="w-full">
        <div className="h-[80px] max-w-[1600px] mx-auto" />
      </section>

      {/* Section — Past Events */}
      {recentMovies.length > 0 && (
        <section className="w-full">
          <div className="flex flex-col gap-[var(--spacing-10)] p-[var(--spacing-10)] max-w-[1600px] mx-auto overflow-hidden">
            {/* Header row */}
            <div className="flex items-center gap-[var(--spacing-2)] w-full">
              <h2 className="flex-1 font-[family-name:var(--font-heading)] text-[length:var(--text-3xl)] leading-[var(--line-height-3xl)] font-[number:var(--font-weight-medium)] text-[var(--color-text-primary)]">
                {t('pastEvents.title')}
              </h2>
              <Link href="/schedule">
                <Button>{t('pastEvents.allEvents')}</Button>
              </Link>
            </div>

            {/* Movie cards row */}
            <div className="flex gap-[var(--spacing-10)] w-full">
              {recentMovies.map((movie: any) => {
                const posterUrl = typeof movie.poster === 'object' && movie.poster?.url
                  ? movie.poster.url
                  : null
                return (
                  <div key={movie.id} className="flex-1 min-w-0">
                    <MovieCard
                      slug={movie.slug}
                      title={movie.title}
                      posterUrl={posterUrl}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Section — Stats */}
      {stats.length > 0 ? (
        <section className="w-full bg-[var(--color-surface)]">
          <div className="max-w-[1600px] mx-auto py-[var(--spacing-16)] px-[var(--spacing-10)]">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-[var(--spacing-8)] text-center">
              {stats.map((stat, i) => (
                <div key={i}>
                  <div className="text-[length:var(--text-4xl)] font-[number:var(--font-weight-bold)] text-[var(--color-primary)]">
                    {stat.value}
                  </div>
                  <div className="text-[length:var(--text-sm)] text-[var(--color-text-secondary)] mt-[var(--spacing-2)]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="w-full bg-[var(--color-surface)]">
          <div className="max-w-[1600px] mx-auto py-[var(--spacing-16)] px-[var(--spacing-10)]">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-[var(--spacing-8)] text-center">
              <div>
                <div className="text-[length:var(--text-4xl)] font-[number:var(--font-weight-bold)] text-[var(--color-primary)]">50+</div>
                <div className="text-[length:var(--text-sm)] text-[var(--color-text-secondary)] mt-[var(--spacing-2)]">Ukrainian films</div>
              </div>
              <div>
                <div className="text-[length:var(--text-4xl)] font-[number:var(--font-weight-bold)] text-[var(--color-primary)]">14</div>
                <div className="text-[length:var(--text-sm)] text-[var(--color-text-secondary)] mt-[var(--spacing-2)]">Israeli cities</div>
              </div>
              <div>
                <div className="text-[length:var(--text-4xl)] font-[number:var(--font-weight-bold)] text-[var(--color-primary)]">3</div>
                <div className="text-[length:var(--text-sm)] text-[var(--color-text-secondary)] mt-[var(--spacing-2)]">Cinema chains</div>
              </div>
              <div>
                <div className="text-[length:var(--text-4xl)] font-[number:var(--font-weight-bold)] text-[var(--color-primary)]">1</div>
                <div className="text-[length:var(--text-sm)] text-[var(--color-text-secondary)] mt-[var(--spacing-2)]">Festival</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Section — Image Grid */}
      <section className="w-full">
        <div className="max-w-[1600px] mx-auto overflow-hidden p-[var(--spacing-10)]">
          <div className="grid grid-cols-[repeat(7,minmax(0,1fr))] auto-rows-[120px] md:grid-cols-[repeat(11,minmax(0,1fr))] md:auto-rows-[200px] lg:auto-rows-[400px] gap-4 overflow-hidden">
            {/* 1 */}
            <div className="rounded-[16px] overflow-hidden col-[1/5] row-[1] md:col-[1/3] md:row-[1]">
              <img src="/images/grid-imgs/1.webp.avif" alt="" className="w-full h-full object-cover" />
            </div>
            {/* 2 */}
            <div className="rounded-[16px] overflow-hidden col-[5/8] row-[1] md:col-[3/7] md:row-[1]">
              <img src="/images/grid-imgs/2.avif" alt="" className="w-full h-full object-cover" />
            </div>
            {/* 3 */}
            <div className="rounded-[16px] overflow-hidden col-[1/3] row-[2] md:col-[7/9] md:row-[1]">
              <img src="/images/grid-imgs/3.avif" alt="" className="w-full h-full object-cover" />
            </div>
            {/* 4 */}
            <div className="rounded-[16px] overflow-hidden col-[3/6] row-[2] md:col-[9/12] md:row-[1]">
              <img src="/images/grid-imgs/4.avif" alt="" className="w-full h-full object-cover" />
            </div>
            {/* 5 */}
            <div className="rounded-[16px] overflow-hidden col-[6/8] row-[2] md:col-[1/4] md:row-[2]">
              <img src="/images/grid-imgs/5.avif" alt="" className="w-full h-full object-cover" />
            </div>
            {/* 6 */}
            <div className="rounded-[16px] overflow-hidden col-[1/5] row-[3] md:col-[4/6] md:row-[2]">
              <img src="/images/grid-imgs/6.avif" alt="" className="w-full h-full object-cover" />
            </div>
            {/* 7 */}
            <div className="rounded-[16px] overflow-hidden col-[5/8] row-[3] md:col-[6/10] md:row-[2]">
              <img src="/images/grid-imgs/7.avif" alt="" className="w-full h-full object-cover" />
            </div>
            {/* 8 */}
            <div className="rounded-[16px] overflow-hidden col-[1/4] row-[4] md:col-[10/12] md:row-[2]">
              <img src="/images/grid-imgs/8.avif" alt="" className="w-full h-full object-cover" />
            </div>
            {/* 9 */}
            <div className="rounded-[16px] overflow-hidden col-[4/6] row-[4] md:col-[1/5] md:row-[3]">
              <img src="/images/grid-imgs/9.jpeg" alt="" className="w-full h-full object-cover" />
            </div>
            {/* 10 */}
            <div className="rounded-[16px] overflow-hidden col-[6/8] row-[4] md:col-[5/7] md:row-[3]">
              <img src="/images/grid-imgs/10.jpeg" alt="" className="w-full h-full object-cover" />
            </div>
            {/* 11 */}
            <div className="rounded-[16px] overflow-hidden col-[1/3] row-[5] md:col-[7/9] md:row-[3]">
              <img src="/images/grid-imgs/11.avif" alt="" className="w-full h-full object-cover" />
            </div>
            {/* 12 */}
            <div className="rounded-[16px] overflow-hidden col-[3/6] row-[5] md:col-[9/12] md:row-[3]">
              <img src="/images/grid-imgs/12.avif" alt="" className="w-full h-full object-cover" />
            </div>
            {/* 13 */}
            <div className="rounded-[16px] overflow-hidden col-[6/8] row-[5] md:col-[1/4] md:row-[4]">
              <img src="/images/grid-imgs/13.avif" alt="" className="w-full h-full object-cover" />
            </div>
            {/* 14 */}
            <div className="rounded-[16px] overflow-hidden col-[1/4] row-[6] md:col-[4/7] md:row-[4]">
              <img src="/images/grid-imgs/14.avif" alt="" className="w-full h-full object-cover" />
            </div>
            {/* 15 */}
            <div className="rounded-[16px] overflow-hidden col-[4/6] row-[6] md:col-[7/10] md:row-[4]">
              <img src="/images/grid-imgs/15.avif" alt="" className="w-full h-full object-cover" />
            </div>
            {/* 16 */}
            <div className="rounded-[16px] overflow-hidden col-[6/8] row-[6] md:col-[10/12] md:row-[4]">
              <img src="/images/grid-imgs/16.webp" alt="" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
