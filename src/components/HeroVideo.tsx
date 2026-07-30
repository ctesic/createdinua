'use client'

import { useEffect, useRef, useState } from 'react'

type Props = {
  src: string
  /** Only the visible slide downloads and plays. */
  active?: boolean
}

/**
 * Silent hero loop. Nothing is requested until the page itself has finished
 * loading, and the video only becomes visible once it can play through, so it
 * never competes with the poster image or stutters on first paint.
 */
export function HeroVideo({ src, active = true }: Props) {
  const ref = useRef<HTMLVideoElement>(null)
  const [mounted, setMounted] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!active || mounted) return

    // Skip where motion is unwanted, data is metered, or the screen is small
    // enough that the vertical image is the better experience anyway.
    const skip =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !window.matchMedia('(min-width: 768px)').matches
    if (skip) return

    const connection = (navigator as { connection?: { saveData?: boolean; effectiveType?: string } }).connection
    if (connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType ?? '')) return

    let timer: number | undefined
    // A beat after load so the image, fonts and hydration land first.
    const start = () => {
      timer = window.setTimeout(() => setMounted(true), 500)
    }

    if (document.readyState === 'complete') start()
    else window.addEventListener('load', start, { once: true })

    return () => {
      window.removeEventListener('load', start)
      if (timer) window.clearTimeout(timer)
    }
  }, [active, mounted])

  // Pause when the slider moves on, resume when it comes back.
  useEffect(() => {
    const video = ref.current
    if (!video || !ready) return
    if (active) video.play().catch(() => {})
    else video.pause()
  }, [active, ready])

  if (!mounted) return null

  return (
    <video
      ref={ref}
      src={src}
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
      tabIndex={-1}
      onCanPlayThrough={() => setReady(true)}
      className={`absolute inset-0 h-full w-full rounded-[var(--radius-2xl)] object-cover transition-opacity duration-1000 ${
        ready ? 'opacity-100' : 'opacity-0'
      }`}
    />
  )
}
