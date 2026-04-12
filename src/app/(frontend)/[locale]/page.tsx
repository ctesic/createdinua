import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { getAnnouncement, getRecentlyScreenedMovies, getFeaturedMovie } from '@/lib/payload'
import { AnnouncementBanner } from '@/components/AnnouncementBanner'
import { Button } from '@/components/Button'
import { HeroMovie } from '@/components/HeroMovie'
import { MovieCard } from '@/components/MovieCard'
import type { Locale } from '@/i18n/routing'

type Props = {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations({ locale })
  const [announcement, recentMovies, featured] = await Promise.all([
    getAnnouncement(locale as Locale),
    getRecentlyScreenedMovies(locale as Locale, 4),
    getFeaturedMovie(locale as Locale),
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
      {featured && (
        <section className="w-full">
          <div className="max-w-[1600px] mx-auto p-[var(--container-side-paddings)]">
            <HeroMovie
              slug={featured.movie.slug}
              title={featured.movie.title}
              genre={Array.isArray(featured.movie.genre) ? featured.movie.genre.join(', ') : ''}
              posterUrl={typeof featured.movie.posterHorizontal === 'object' && featured.movie.posterHorizontal?.url ? featured.movie.posterHorizontal.url : (typeof featured.movie.posterVertical === 'object' && featured.movie.posterVertical?.url ? featured.movie.posterVertical.url : '')}
              screenings={featured.screenings}
              screeningsLabel={t('hero.screenings')}
              detailLabel={t('hero.details')}
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
