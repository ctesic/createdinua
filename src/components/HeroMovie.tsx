import { Link } from '@/i18n/navigation'
import { ScreeningChip } from './ScreeningChip'

type Screening = {
  date: string
  time: string
  city: string
  soldOut?: boolean
  ticketUrl?: string
}

type Props = {
  slug: string
  title: string
  genre: string
  ageRestriction?: string
  posterUrl: string
  screenings: Screening[]
  screeningsLabel: string
  className?: string
  priority?: boolean
}

export function HeroMovie({ slug, title, genre, ageRestriction, posterUrl, screenings, screeningsLabel, className, priority = false }: Props) {
  return (
    <div
      className={`relative flex flex-col gap-[var(--spacing-4)] items-start justify-end min-h-[520px] overflow-hidden pt-[var(--spacing-24)] pb-[var(--spacing-5)] px-[var(--spacing-5)] md:pb-[var(--spacing-8)] md:px-[var(--spacing-8)] rounded-[var(--radius-2xl)] w-full ${className ?? ''}`}
    >
      {/* Background image + gradient */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[var(--radius-2xl)]">
        {posterUrl && (
          <img
            src={posterUrl}
            alt=""
            fetchPriority={priority ? 'high' : 'auto'}
            loading={priority ? 'eager' : 'lazy'}
            className="absolute w-full h-full object-cover rounded-[var(--radius-2xl)]"
          />
        )}
        <div
          className="absolute inset-0 rounded-[var(--radius-2xl)]"
          style={{ backgroundImage: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.5) 75%, rgba(0,0,0,0.8) 100%)' }}
        />
      </div>

      {/* Stretched link — whole card navigates to the movie page. Sits
          behind interactive children (chips) via z-index. */}
      <Link
        href={{ pathname: '/movie/[slug]', params: { slug } }}
        aria-label={title}
        className="absolute inset-0 z-[1] rounded-[var(--radius-2xl)]"
      />

      {/* Age restriction badge — top-right on all breakpoints */}
      {ageRestriction && (
        <div className="pointer-events-none absolute top-[var(--spacing-5)] right-[var(--spacing-5)] md:top-[var(--spacing-8)] md:right-[var(--spacing-8)] z-[2] px-[var(--spacing-3)] py-[var(--spacing-1)] rounded-full bg-black/50 backdrop-blur-sm text-[var(--color-text-inverse)] font-[family-name:var(--font-body)] text-[length:var(--text-sm)] font-[number:var(--font-weight-medium)]">
          {ageRestriction}
        </div>
      )}

      {/* Title (non-interactive, lets clicks pass through to the card link) */}
      <div className="pointer-events-none relative z-[1] text-[var(--color-text-inverse)] w-full">
        <p className="font-[family-name:var(--font-body)] text-[length:var(--text-lg)] leading-[var(--line-height-lg)] opacity-80">
          {genre}
        </p>
        <p className="font-[family-name:var(--font-heading)] font-[number:var(--font-weight-bold)] text-[length:var(--text-5xl)] leading-[var(--line-height-5xl)]">
          {title}
        </p>
      </div>

      {/* Action row — screenings. Above the card link so chip clicks hit the chip, not the card. */}
      <div className="relative z-[2] flex flex-col md:flex-row md:items-end gap-[var(--spacing-3)] w-full">
        <div className="flex flex-col gap-2 flex-1 overflow-hidden">
          <p className="pointer-events-none font-[family-name:var(--font-heading)] font-[number:var(--font-weight-bold)] text-[length:var(--text-lg)] leading-[var(--line-height-lg)] text-[var(--color-text-inverse)] opacity-80">
            {screeningsLabel}
          </p>
          <div className="flex flex-col md:flex-row gap-2 w-full">
            {screenings.map((s, i) => (
              <ScreeningChip
                key={i}
                date={s.date}
                time={s.time}
                city={s.city}
                soldOut={s.soldOut}
                ticketUrl={s.ticketUrl}
                className="md:shrink-0"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
