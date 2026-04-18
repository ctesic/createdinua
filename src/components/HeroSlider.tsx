'use client'

import { useState, useEffect, useCallback, type ComponentProps } from 'react'
import { HeroMovie } from './HeroMovie'

type Slide = ComponentProps<typeof HeroMovie>

type Props = {
  slides: Slide[]
}

export function HeroSlider({ slides }: Props) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  const next = useCallback(() => {
    setActive((i) => (i + 1) % slides.length)
  }, [slides.length])

  useEffect(() => {
    if (slides.length <= 1 || paused) return
    const id = setInterval(next, 6000)
    return () => clearInterval(id)
  }, [slides.length, paused, next])

  // Single slide — render directly, no slider UI
  if (slides.length <= 1) {
    return slides[0] ? <HeroMovie {...slides[0]} /> : null
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides container — height set by content of active slide */}
      <div className="relative min-h-[520px]">
        {slides.map((slide, i) => (
          <div
            key={slide.slug}
            aria-hidden={i !== active}
            className={`transition-opacity duration-500 ease-in-out ${
              i === active
                ? 'opacity-100'
                : 'opacity-0 pointer-events-none'
            } ${i === 0 ? 'relative' : 'absolute inset-0'}`}
          >
            <HeroMovie {...slide} />
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-[var(--spacing-2)] mt-[var(--spacing-3)]">
        {slides.map((slide, i) => (
          <button
            key={slide.slug}
            onClick={() => setActive(i)}
            aria-label={`Slide ${i + 1}: ${slide.title}`}
            className={`w-2 h-2 rounded-full transition-colors cursor-pointer ${
              i === active
                ? 'bg-[var(--color-accent)]'
                : 'bg-[var(--color-text-muted)]'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
