'use client'

import { Button } from './Button'

type Props = {
  date: string
  time: string
  city: string
  venue: string
  note?: string
  ticketUrl?: string | null
  ticketLabel: string
  soldOutLabel?: string
  soldOut?: boolean
  isPast?: boolean
}

export function ScreeningItem({ date, time, city, venue, note, ticketUrl, ticketLabel, soldOutLabel = 'Продано', soldOut = false, isPast = false }: Props) {
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

  return (
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
          <p className="font-[family-name:var(--font-heading)] font-[number:var(--font-weight-medium)] text-[length:var(--text-2xl)] leading-[var(--line-height-2xl)] text-[var(--color-text-primary)]">
            {city}
          </p>
          <div className="flex gap-[var(--spacing-1)] font-[family-name:var(--font-body)] text-[length:var(--text-lg)] leading-[var(--line-height-lg)] text-[var(--color-text-secondary)] whitespace-nowrap">
            <p>{venue}</p>
            {note && (
              <>
                <p>•</p>
                <p>{note}</p>
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
            <p className="font-[family-name:var(--font-heading)] font-[number:var(--font-weight-medium)] text-[length:var(--text-2xl)] leading-[var(--line-height-2xl)] text-[var(--color-text-primary)]">
              {city}
            </p>
            <div className="flex flex-col gap-[var(--spacing-1)] font-[family-name:var(--font-body)] text-[length:var(--text-lg)] leading-[var(--line-height-lg)] text-[var(--color-text-secondary)]">
              <p>{venue}</p>
              {note && <p>{note}</p>}
            </div>
          </div>
        </div>
        {buttonEl && <div className="w-full">{buttonEl}</div>}
      </div>
    </div>
  )
}
