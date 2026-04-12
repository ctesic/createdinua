import { Link } from '@/i18n/navigation'
import { Button } from './Button'
import { ScreeningChip } from './ScreeningChip'

type Screening = {
  date: string
  time: string
  city: string
  soldOut?: boolean
}

type Props = {
  slug: string
  title: string
  genre: string
  posterUrl: string
  screenings: Screening[]
  detailLabel: string
  screeningsLabel: string
}

export function HeroMovie({ slug, title, genre, posterUrl, screenings, detailLabel, screeningsLabel }: Props) {
  return (
    <div
      className="relative flex flex-col gap-[var(--spacing-4)] items-start justify-end min-h-[520px] overflow-hidden pt-[var(--spacing-24)] pb-[var(--spacing-5)] px-[var(--spacing-5)] md:pb-[var(--spacing-8)] md:px-[var(--spacing-8)] rounded-[var(--radius-2xl)] w-full"
    >
      {/* Background image + gradient */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[var(--radius-2xl)]">
        {posterUrl && (
          <img
            src={posterUrl}
            alt=""
            className="absolute w-full h-full object-cover rounded-[var(--radius-2xl)]"
          />
        )}
        <div
          className="absolute inset-0 rounded-[var(--radius-2xl)]"
          style={{ backgroundImage: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.5) 75%, rgba(0,0,0,0.8) 100%)' }}
        />
      </div>

      {/* Title */}
      <div className="relative text-[var(--color-text-inverse)] w-full">
        <p className="font-[family-name:var(--font-body)] text-[length:var(--text-lg)] leading-[var(--line-height-lg)] opacity-80">
          {genre}
        </p>
        <p className="font-[family-name:var(--font-heading)] font-[number:var(--font-weight-bold)] text-[length:var(--text-5xl)] leading-[var(--line-height-5xl)]">
          {title}
        </p>
      </div>

      {/* Action row */}
      <div className="relative flex flex-col md:flex-row md:items-end gap-[var(--spacing-3)] w-full">
        {/* Screenings */}
        <div className="flex flex-col gap-2 flex-1 overflow-hidden">
          <p className="font-[family-name:var(--font-heading)] font-[number:var(--font-weight-bold)] text-[length:var(--text-lg)] leading-[var(--line-height-lg)] text-[var(--color-text-inverse)] opacity-80">
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
                className="md:shrink-0"
              />
            ))}
          </div>
        </div>

        {/* Detail button */}
        <div className="shrink-0">
          <Link href={{ pathname: '/movie/[slug]', params: { slug } }}>
            <Button variant="inverse">{detailLabel}</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
