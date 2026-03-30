type Props = {
  text: string
  type: 'info' | 'warning' | 'urgent'
}

const typeStyles = {
  info: 'bg-[var(--color-info)] text-[var(--color-text-inverse)]',
  warning: 'bg-[var(--color-warning)] text-[var(--color-text-on-accent)]',
  urgent: 'bg-[var(--color-error)] text-[var(--color-text-inverse)]',
}

export function AnnouncementBanner({ text, type }: Props) {
  return (
    <div className={`${typeStyles[type]} py-[var(--spacing-3)] px-[var(--spacing-6)]`}>
      <div className="mx-auto text-center text-[var(--text-sm)] font-[var(--font-weight-medium)]" style={{ maxWidth: 'var(--max-width-content)' }}>
        {text}
      </div>
    </div>
  )
}
