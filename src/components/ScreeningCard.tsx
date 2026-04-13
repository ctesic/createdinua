import { useLocale, useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

type Props = {
  movie: {
    title: string
    slug: string
    poster?: { url?: string } | null
  }
  place: {
    name: string
    city: string
  }
  datetime: string
  ticketUrl?: string | null
  price?: string | null
  isCancelled: boolean
}

export function ScreeningCard({ movie, place, datetime, ticketUrl, price, isCancelled }: Props) {
  const t = useTranslations('schedule')
  const locale = useLocale()
  const intlLocale = locale === 'he' ? 'he-IL' : locale === 'en' ? 'en-US' : 'uk-UA'
  const date = new Date(datetime)

  const formattedDate = date.toLocaleDateString(intlLocale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
  const formattedTime = date.toLocaleTimeString(intlLocale, {
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className={`flex items-center gap-[var(--spacing-4)] rounded-[var(--radius-lg)] border border-[var(--color-border)] p-[var(--spacing-4)] ${isCancelled ? 'opacity-60' : ''}`}>
      <div className="shrink-0 text-center">
        <div className="text-[length:var(--text-2xl)] font-[number:var(--font-weight-bold)] text-[var(--color-primary)]">
          {formattedTime}
        </div>
        <div className="text-[length:var(--text-xs)] text-[var(--color-text-muted)]">
          {formattedDate}
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <Link
          href={{ pathname: '/movie/[slug]', params: { slug: movie.slug } }}
          className="text-[length:var(--text-base)] font-[number:var(--font-weight-semibold)] text-[var(--color-text-primary)] hover:text-[var(--color-primary)]"
        >
          {movie.title}
        </Link>
        <p className="text-[length:var(--text-sm)] text-[var(--color-text-secondary)] mt-[var(--spacing-1)]">
          {place.name}, {place.city}
        </p>
        {isCancelled && (
          <span className="inline-block mt-[var(--spacing-1)] text-[length:var(--text-xs)] font-[number:var(--font-weight-semibold)] text-[var(--color-error)]">
            {t('cancelled')}
          </span>
        )}
      </div>

      <div className="shrink-0 flex flex-col items-end gap-[var(--spacing-2)]">
        {price && (
          <span className="text-[length:var(--text-sm)] text-[var(--color-text-secondary)]">{price}</span>
        )}
        {ticketUrl && !isCancelled && (
          <a
            href={ticketUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-[var(--radius-full)] bg-[var(--color-primary)] px-[var(--spacing-4)] py-[var(--spacing-2)] text-[length:var(--text-xs)] font-[number:var(--font-weight-semibold)] text-[var(--color-text-on-primary)] hover:bg-[var(--color-primary-hover)] transition-colors"
            style={{ transitionDuration: 'var(--transition-fast)' }}
          >
            {t('buyTicket')}
          </a>
        )}
      </div>
    </div>
  )
}
