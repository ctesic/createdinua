'use client'

type Props = {
  date: string
  time?: string
  city: string
  soldOut?: boolean
  ticketUrl?: string
  onClick?: () => void
  className?: string
}

export function ScreeningChip({ date, time, city, soldOut = false, ticketUrl, onClick, className }: Props) {
  const interactive = !soldOut && (!!onClick || !!ticketUrl)

  const content = (
    <>
      <div className="flex items-center gap-[var(--spacing-1)] text-[length:var(--text-lg)] leading-[var(--line-height-lg)] whitespace-nowrap">
        <span className={`font-[family-name:var(--font-heading)] font-[number:var(--font-weight-bold)] ${soldOut ? 'text-[var(--color-text-inverse)]' : 'text-[var(--color-accent)]'}`}>
          {date}
        </span>
        <span className="text-[var(--color-text-inverse)] opacity-80">•</span>
        <span className={`font-[family-name:var(--font-body)] opacity-80 ${soldOut ? 'text-[var(--color-warning)]' : 'text-[var(--color-text-inverse)]'}`}>
          {soldOut ? 'продано' : time}
        </span>
      </div>
      <p className="font-[family-name:var(--font-body)] text-[length:var(--text-base)] leading-[var(--line-height-base)] text-[var(--color-text-inverse)] opacity-80">
        {city}
      </p>
    </>
  )

  const classes = `flex flex-col items-start overflow-hidden py-[var(--spacing-2)] rounded-[var(--radius-md)] ${
    soldOut
      ? 'bg-[rgba(0,0,0,0.1)] px-[var(--spacing-3)]'
      : 'bg-[rgba(0,0,0,0.1)] ps-[var(--spacing-3)] pe-[var(--spacing-6)]'
  } ${
    interactive
      ? 'cursor-pointer hover:border hover:border-[rgba(255,255,255,0.4)] hover:bg-[image:linear-gradient(var(--color-state-hover-on-light),var(--color-state-hover-on-light)),linear-gradient(rgba(0,0,0,0.1),rgba(0,0,0,0.1))] active:border active:border-[rgba(255,255,255,0.4)] active:bg-[image:linear-gradient(var(--color-state-pressed-on-light),var(--color-state-pressed-on-light)),linear-gradient(rgba(0,0,0,0.1),rgba(0,0,0,0.1))]'
      : ''
  } ${className ?? ''}`

  if (ticketUrl && !soldOut) {
    return (
      <a href={ticketUrl} target="_blank" rel="noopener noreferrer" className={classes}>
        {content}
      </a>
    )
  }

  return (
    <div
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      onClick={interactive ? onClick : undefined}
      className={classes}
    >
      {content}
    </div>
  )
}
