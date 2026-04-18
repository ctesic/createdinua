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
  note?: string
  ticketUrl?: string | null
  isPast: boolean
}

type Props = {
  screenings: Screening[]
  labels: {
    title: string
    upcoming: string
    past: string
    tickets: string
    soldOut: string
    noUpcomingScreenings: string
    noPastScreenings: string
    directions: string
  }
}

export function MovieScreenings({ screenings, labels }: Props) {
  const upcoming = screenings.filter((s) => !s.isPast)
  const past = screenings.filter((s) => s.isPast)
  const defaultTab = upcoming.length > 0 ? 'upcoming' : 'past'
  const [tab, setTab] = useState<'upcoming' | 'past'>(defaultTab)

  const visible = tab === 'upcoming' ? upcoming : past

  return (
    <div className="flex flex-col gap-[var(--spacing-4)] p-[var(--spacing-8)]">
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
              note={s.note}
              ticketUrl={s.ticketUrl}
              ticketLabel={labels.tickets}
              soldOutLabel={labels.soldOut}
              isPast={s.isPast}
              directionsLabel={labels.directions}
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
