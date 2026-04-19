'use client'

import { useState, useEffect, useCallback, type ComponentProps } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
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

  const prev = useCallback(() => {
    setActive((i) => (i - 1 + slides.length) % slides.length)
  }, [slides.length])

  useEffect(() => {
    if (slides.length <= 1 || paused) return
    const id = setInterval(next, 20000)
    return () => clearInterval(id)
  }, [slides.length, paused, next])

  // Single slide — render directly, no slider UI
  if (slides.length <= 1) {
    return slides[0] ? <HeroMovie {...slides[0]} priority /> : null
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides container */}
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
            <HeroMovie {...slide} priority={i === 0} />
          </div>
        ))}

        {/* Arrow buttons */}
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-[rgba(0,0,0,0.3)] text-white cursor-pointer transition-colors hover:bg-[rgba(0,0,0,0.5)]"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={next}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-[rgba(0,0,0,0.3)] text-white cursor-pointer transition-colors hover:bg-[rgba(0,0,0,0.5)]"
        >
          <ChevronRight size={24} />
        </button>
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
