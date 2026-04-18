'use client'

import { useState } from 'react'
import { Link } from '@/i18n/navigation'
import { Button } from './Button'
import { LocationModal } from './LocationModal'

type Props = {
  date: string
  time: string
  city: string
  venue: string
  address?: string
  googleMapsUrl?: string
  note?: string
  ticketUrl?: string | null
  ticketLabel: string
  soldOutLabel?: string
  soldOut?: boolean
  isPast?: boolean
  movieTitle?: string
  movieSlug?: string
  directionsLabel?: string
}

export function ScreeningItem({ date, time, city, venue, address, googleMapsUrl, note, ticketUrl, ticketLabel, soldOutLabel = 'Продано', soldOut = false, isPast = false, movieTitle, movieSlug, directionsLabel = 'Directions' }: Props) {
  const [showLocation, setShowLocation] = useState(false)
  const showButton = !isPast

  const buttonEl = showButton && (
    soldOut ? (
      <Button disabled className="w-full md:w-auto">{soldOutLabel}</Button>
    ) : ticketUrl ? (
      <a href={ticketUrl} target="_blank" rel="noopener noreferrer" className="w-full md:w-auto">
        <Button className="w-full md:w-auto">{ticketLabel}</Button>
      </a>
    ) : (
      <Button className="w-full md:w-auto">{ticketLabel}</Button>
    )
  )

  const locationButton = (
    <Button variant="link" onClick={() => setShowLocation(true)}>
      {venue}, {city}
    </Button>
  )

  return (
    <>
      <div className="border border-[var(--color-border)] overflow-hidden px-[var(--spacing-6)] py-[var(--spacing-5)] rounded-[var(--radius-xl)]">
        {/* Desktop: single row */}
        <div className="hidden md:flex gap-2 items-start">
          <div className="flex flex-col items-start w-[80px] shrink-0 whitespace-nowrap">
            <p className="font-[family-name:var(--font-heading)] font-[number:var(--font-weight-medium)] text-[length:var(--text-2xl)] leading-[var(--line-height-2xl)] text-[var(--color-primary)]">
              {date}
            </p>
            <p className="font-[family-name:var(--font-body)] text-[length:var(--text-lg)] leading-[var(--line-height-lg)] text-[var(--color-text-secondary)]">
              {time}
            </p>
          </div>
          <div className="flex flex-col items-start flex-1 min-w-0">
            {movieTitle && movieSlug ? (
              <Link href={{ pathname: '/movie/[slug]', params: { slug: movieSlug } }} className="font-[family-name:var(--font-heading)] font-[number:var(--font-weight-medium)] text-[length:var(--text-2xl)] leading-[var(--line-height-2xl)] text-[var(--color-text-primary)] hover:text-[var(--color-primary)]">
                {movieTitle}
              </Link>
            ) : (
              <p className="font-[family-name:var(--font-heading)] font-[number:var(--font-weight-medium)] text-[length:var(--text-2xl)] leading-[var(--line-height-2xl)] text-[var(--color-text-primary)]">
                {city}
              </p>
            )}
            <div className="flex items-start gap-[var(--spacing-1)] font-[family-name:var(--font-body)] text-[length:var(--text-lg)] leading-[var(--line-height-lg)] text-[var(--color-text-secondary)] whitespace-nowrap">
              {locationButton}
              {note && (
                <>
                  <span>•</span>
                  <span>{note}</span>
                </>
              )}
            </div>
          </div>
          {buttonEl && <div className="shrink-0">{buttonEl}</div>}
        </div>

        {/* Mobile: stacked */}
        <div className="flex md:hidden flex-col gap-2">
          <div className="flex gap-2 items-start">
            <div className="flex flex-col items-start w-[80px] shrink-0 whitespace-nowrap">
              <p className="font-[family-name:var(--font-heading)] font-[number:var(--font-weight-medium)] text-[length:var(--text-2xl)] leading-[var(--line-height-2xl)] text-[var(--color-primary)]">
                {date}
              </p>
              <p className="font-[family-name:var(--font-body)] text-[length:var(--text-lg)] leading-[var(--line-height-lg)] text-[var(--color-text-secondary)]">
                {time}
              </p>
            </div>
            <div className="flex flex-col items-start flex-1 min-w-0">
              {movieTitle && movieSlug ? (
                <Link href={{ pathname: '/movie/[slug]', params: { slug: movieSlug } }} className="font-[family-name:var(--font-heading)] font-[number:var(--font-weight-medium)] text-[length:var(--text-2xl)] leading-[var(--line-height-2xl)] text-[var(--color-text-primary)] hover:text-[var(--color-primary)]">
                  {movieTitle}
                </Link>
              ) : (
                <p className="font-[family-name:var(--font-heading)] font-[number:var(--font-weight-medium)] text-[length:var(--text-2xl)] leading-[var(--line-height-2xl)] text-[var(--color-text-primary)]">
                  {city}
                </p>
              )}
              <div className="flex flex-col gap-[var(--spacing-1)] font-[family-name:var(--font-body)] text-[length:var(--text-lg)] leading-[var(--line-height-lg)] text-[var(--color-text-secondary)]">
                {locationButton}
                {note && <p>{note}</p>}
              </div>
            </div>
          </div>
          {buttonEl && <div className="w-full">{buttonEl}</div>}
        </div>
      </div>

      {showLocation && (
        <LocationModal
          venue={venue}
          city={city}
          address={address}
          googleMapsUrl={googleMapsUrl}
          onClose={() => setShowLocation(false)}
          directionsLabel={directionsLabel}
        />
      )}
    </>
  )
}
