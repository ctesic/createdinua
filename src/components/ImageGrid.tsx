'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'

const sizes = '(max-width: 768px) 40vw, (max-width: 1024px) 18vw, 16vw'

type GridItem = {
  src: string
  width: number
  height: number
  /** Placement on the 7-column mobile grid and the 11-column grid from md up. */
  area: string
}

// The mosaic is hand-tuned: every mobile row spans exactly 7 columns and every
// md row spans exactly 11, so the grid stays flush on both sides at any width.
const items: GridItem[] = [
  // Row 1 (mobile) / Row 1 (md)
  { src: '/images/grid-imgs/1.webp.avif', width: 1200, height: 801, area: 'col-[1/3] row-[1] md:col-[1/3] md:row-[1]' },
  { src: '/images/grid-imgs/2.avif', width: 1200, height: 800, area: 'col-[3/6] row-[1] md:col-[3/7] md:row-[1]' },
  { src: '/images/grid-imgs/3.avif', width: 1080, height: 721, area: 'col-[6/8] row-[1] md:col-[7/9] md:row-[1]' },
  // Row 2 (mobile) / Row 1–2 (md)
  { src: '/images/grid-imgs/4.avif', width: 1200, height: 808, area: 'col-[1/5] row-[2] md:col-[9/12] md:row-[1]' },
  { src: '/images/grid-imgs/5.avif', width: 1080, height: 721, area: 'col-[5/8] row-[2] md:col-[1/5] md:row-[2]' },
  // The square cinema-hall shot sits in a ~1:1 slot so it barely crops.
  { src: '/images/grid-imgs/17.avif', width: 1440, height: 1440, area: 'col-[1/4] row-[3] md:col-[5/8] md:row-[2]' },
  { src: '/images/grid-imgs/6.avif', width: 1200, height: 901, area: 'col-[4/6] row-[3] md:col-[8/12] md:row-[2]' },
  // Row 3–4 (mobile) / Row 3 (md)
  { src: '/images/grid-imgs/7.avif', width: 1200, height: 801, area: 'col-[6/8] row-[3] md:col-[1/5] md:row-[3]' },
  { src: '/images/grid-imgs/8.avif', width: 1080, height: 721, area: 'col-[1/4] row-[4] md:col-[5/7] md:row-[3]' },
  { src: '/images/grid-imgs/9.jpeg', width: 1080, height: 720, area: 'col-[4/8] row-[4] md:col-[7/9] md:row-[3]' },
  { src: '/images/grid-imgs/10.jpeg', width: 1080, height: 721, area: 'col-[1/3] row-[5] md:col-[9/12] md:row-[3]' },
  // Row 5 (mobile) / Row 4 (md)
  { src: '/images/grid-imgs/11.avif', width: 1080, height: 721, area: 'col-[3/5] row-[5] md:col-[1/5] md:row-[4]' },
  { src: '/images/grid-imgs/18.avif', width: 1600, height: 1066, area: 'col-[5/8] row-[5] md:col-[5/9] md:row-[4]' },
  { src: '/images/grid-imgs/12.avif', width: 1200, height: 800, area: 'col-[1/5] row-[6] md:col-[9/12] md:row-[4]' },
  // Row 6–7 (mobile) / Row 5 (md)
  { src: '/images/grid-imgs/13.avif', width: 1080, height: 721, area: 'col-[5/8] row-[6] md:col-[1/4] md:row-[5]' },
  { src: '/images/grid-imgs/14.avif', width: 1080, height: 721, area: 'col-[1/3] row-[7] md:col-[4/6] md:row-[5]' },
  { src: '/images/grid-imgs/15.avif', width: 1080, height: 721, area: 'col-[3/5] row-[7] md:col-[6/8] md:row-[5]' },
  { src: '/images/grid-imgs/16.webp', width: 2048, height: 1367, area: 'col-[5/8] row-[7] md:col-[8/12] md:row-[5]' },
]

type Props = {
  dir?: 'ltr' | 'rtl'
  labels: {
    close: string
    previous: string
    next: string
    image: string
  }
}

export function ImageGrid({ dir = 'ltr', labels }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const isOpen = openIndex !== null

  const close = useCallback(() => setOpenIndex(null), [])
  const step = useCallback(
    (delta: number) =>
      setOpenIndex((i) => (i === null ? i : (i + delta + items.length) % items.length)),
    [],
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

  const current = openIndex === null ? null : items[openIndex]
  const position = (openIndex ?? 0) + 1

  return (
    <>
      <div className="grid grid-cols-[repeat(7,minmax(0,1fr))] auto-rows-[120px] md:grid-cols-[repeat(11,minmax(0,1fr))] md:auto-rows-[200px] lg:auto-rows-[400px] gap-4 overflow-hidden">
        {items.map((item, i) => (
          <button
            key={item.src}
            type="button"
            onClick={() => setOpenIndex(i)}
            aria-label={`${labels.image} ${i + 1}`}
            className={`group relative rounded-[16px] overflow-hidden cursor-pointer bg-[var(--color-border-subtle)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)] ${item.area}`}
          >
            <Image
              src={item.src}
              alt=""
              fill
              sizes={sizes}
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

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-full max-w-[1200px] flex-col items-center gap-[var(--spacing-4)]"
          >
            {/* Sized by the intrinsic ratio so the square and landscape shots both fit. */}
            <Image
              key={current.src}
              src={current.src}
              alt={`${labels.image} ${position}`}
              width={current.width}
              height={current.height}
              sizes="100vw"
              priority
              className="max-h-[80vh] w-auto max-w-full rounded-[var(--radius-lg)] object-contain"
            />
            <p className="text-[length:var(--text-sm)] leading-[var(--line-height-sm)] text-white/70 tabular-nums">
              {position} / {items.length}
            </p>
          </div>
        </div>
      )}
    </>
  )
}
