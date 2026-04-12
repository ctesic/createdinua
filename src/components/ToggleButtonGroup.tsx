'use client'

type ToggleOption<T extends string> = {
  value: T
  label: string
}

type Props<T extends string> = {
  options: ToggleOption<T>[]
  value: T
  onChange: (value: T) => void
  className?: string
}

export function ToggleButtonGroup<T extends string>({ options, value, onChange, className }: Props<T>) {
  return (
    <div className={`flex items-start rounded-[100px] bg-[var(--color-surface)] p-[var(--spacing-1)] ${className ?? ''}`}>
      <div className="flex items-center gap-[var(--spacing-1)]">
        {options.map((option) => {
          const isActive = option.value === value
          return (
            <button
              key={option.value}
              onClick={() => onChange(option.value)}
              className={`flex items-center justify-center rounded-[100px] px-[var(--spacing-3)] font-[family-name:var(--font-body)] text-[length:var(--text-base)] leading-[var(--line-height-base)] whitespace-nowrap transition-colors cursor-pointer ${
                isActive
                  ? 'bg-[var(--color-primary)] text-[var(--color-text-inverse)] hover:bg-[image:linear-gradient(var(--color-state-hover-on-light),var(--color-state-hover-on-light)),linear-gradient(var(--color-primary),var(--color-primary))] active:bg-[image:linear-gradient(var(--color-state-pressed-on-light),var(--color-state-pressed-on-light)),linear-gradient(var(--color-primary),var(--color-primary))]'
                  : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-state-hover-on-light)] active:bg-[var(--color-state-pressed-on-light)]'
              }`}
            >
              {option.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
