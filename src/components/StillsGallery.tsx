'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'

export type Still = {
  id: string | number
  url: string
  alt?: string
  width?: number
  height?: number
}

type Props = {
  stills: Still[]
  dir?: 'ltr' | 'rtl'
  labels: {
    close: string
    previous: string
    next: string
    image: string
  }
}

export function StillsGallery({ stills, dir = 'ltr', labels }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const isOpen = openIndex !== null

  const close = useCallback(() => setOpenIndex(null), [])
  const step = useCallback(
    (delta: number) =>
      setOpenIndex((i) => (i === null ? i : (i + delta + stills.length) % stills.length)),
    [stills.length],
  )

  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') return close()
      // In RTL the visual "next" sits to the left, so mirror the arrow keys.
      const forward = dir === 'rtl' ? 'ArrowLeft' : 'ArrowRight'
      const back = dir === 'rtl' ? 'ArrowRight' : 'ArrowLeft'
      if (e.key === forward) step(1)
      if (e.key === back) step(-1)
    }

    // Keep the page behind the lightbox from scrolling.
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = overflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, dir, close, step])

  if (stills.length === 0) return null

  const current = openIndex === null ? null : stills[openIndex]
  const position = (openIndex ?? 0) + 1

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[var(--spacing-4)]">
        {stills.map((still, i) => (
          <button
            key={still.id}
            type="button"
            onClick={() => setOpenIndex(i)}
            aria-label={`${labels.image} ${i + 1}`}
            className="group relative aspect-video w-full overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-border-subtle)] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
          >
            <Image
              src={still.url}
              alt={still.alt || `${labels.image} ${i + 1}`}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 320px"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={labels.image}
          onClick={close}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-[var(--spacing-4)] md:p-[var(--spacing-10)]"
        >
          <button
            type="button"
            onClick={close}
            aria-label={labels.close}
            className="absolute top-[var(--spacing-4)] end-[var(--spacing-4)] flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 cursor-pointer"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>

          {stills.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  step(-1)
                }}
                aria-label={labels.previous}
                className="absolute start-[var(--spacing-2)] md:start-[var(--spacing-5)] flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 cursor-pointer rtl:rotate-180"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  step(1)
                }}
                aria-label={labels.next}
                className="absolute end-[var(--spacing-2)] md:end-[var(--spacing-5)] flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 cursor-pointer rtl:rotate-180"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </>
          )}

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-full max-w-[1200px] flex-col items-center gap-[var(--spacing-4)]"
          >
            {/* Sized by the intrinsic ratio so portrait and landscape stills both fit. */}
            <Image
              key={current.id}
              src={current.url}
              alt={current.alt || `${labels.image} ${position}`}
              width={current.width || 1600}
              height={current.height || 900}
              sizes="100vw"
              priority
              className="max-h-[80vh] w-auto max-w-full rounded-[var(--radius-lg)] object-contain"
            />
            {stills.length > 1 && (
              <p className="text-[length:var(--text-sm)] leading-[var(--line-height-sm)] text-white/70 tabular-nums">
                {position} / {stills.length}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  )
}
