'use client'

import { useState } from 'react'
import { ToggleButtonGroup } from './ToggleButtonGroup'
import { ScreeningItem } from './ScreeningItem'

type Screening = {
  id: string | number
  date: string
  time: string
  city: string
  venue: string
  address?: string
  googleMapsUrl?: string
  mapQuery?: string
  hall?: string
  note?: string
  ticketUrl?: string | null
  isPast: boolean
  isCancelled?: boolean
}

type Props = {
  screenings: Screening[]
  movieTitle: string
  movieSlug: string
  ageRestriction?: string
  labels: {
    title: string
    upcoming: string
    past: string
    tickets: string
    soldOut: string
    cancelled: string
    noUpcomingScreenings: string
    noPastScreenings: string
    directions: string
    hall: string
  }
}

export function MovieScreenings({ screenings, movieTitle, movieSlug, ageRestriction, labels }: Props) {
  const upcoming = screenings.filter((s) => !s.isPast)
  const past = screenings.filter((s) => s.isPast)
  const defaultTab = upcoming.length > 0 ? 'upcoming' : 'past'
  const [tab, setTab] = useState<'upcoming' | 'past'>(defaultTab)

  const visible = tab === 'upcoming' ? upcoming : past

  return (
    <div className="flex flex-col gap-[var(--spacing-4)] px-[var(--spacing-5)] py-[var(--spacing-8)] md:px-[var(--spacing-8)]">
      {/* Title centred in the row, age badge parked on the trailing edge. The
          side padding keeps long titles from running under it. */}
      <div className="relative flex items-center justify-center px-[var(--spacing-12)]">
        <h1 className="text-center font-[family-name:var(--font-heading)] font-[number:var(--font-weight-medium)] md:font-[number:var(--font-weight-bold)] text-[length:var(--text-3xl)] leading-[var(--line-height-3xl)] md:text-[length:var(--text-4xl)] md:leading-[var(--line-height-4xl)] lg:text-[length:var(--text-5xl)] lg:leading-[var(--line-height-5xl)] text-[var(--color-text-primary)]">
          {movieTitle}
        </h1>
        {ageRestriction && (
          <span className="absolute end-0 top-1/2 -translate-y-1/2 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-border-subtle)] font-[family-name:var(--font-body)] text-[length:var(--text-sm)] leading-[var(--line-height-sm)] font-[number:var(--font-weight-medium)] text-[var(--color-text-secondary)]">
            {ageRestriction}
          </span>
        )}
      </div>
      <div className="flex items-start gap-2">
        <h2 className="flex-1 font-[family-name:var(--font-heading)] font-[number:var(--font-weight-medium)] text-[length:var(--text-2xl)] leading-[var(--line-height-2xl)] text-[var(--color-text-primary)]">
          {labels.title}
        </h2>
        <ToggleButtonGroup
          options={[
            { value: 'upcoming' as const, label: labels.upcoming },
            { value: 'past' as const, label: labels.past },
          ]}
          value={tab}
          onChange={setTab}
        />
      </div>

      {visible.length > 0 ? (
        <div className="flex flex-col gap-[var(--spacing-4)]">
          {visible.map((s) => (
            <ScreeningItem
              key={s.id}
              date={s.date}
              time={s.time}
              city={s.city}
              venue={s.venue}
              address={s.address}
              googleMapsUrl={s.googleMapsUrl}
              mapQuery={s.mapQuery}
              hall={s.hall}
              hallLabel={labels.hall}
              note={s.note}
              ticketUrl={s.ticketUrl}
              ticketLabel={labels.tickets}
              soldOutLabel={labels.soldOut}
              cancelledLabel={labels.cancelled}
              isCancelled={s.isCancelled}
              isPast={s.isPast}
              directionsLabel={labels.directions}
              movieSlug={movieSlug}
              trackingLocation="movie-page"
            />
          ))}
        </div>
      ) : (
        <p className="text-[var(--color-text-muted)] font-[family-name:var(--font-body)] text-[length:var(--text-base)] leading-[var(--line-height-base)]">
          {tab === 'upcoming' ? labels.noUpcomingScreenings : labels.noPastScreenings}
        </p>
      )}
    </div>
  )
}
