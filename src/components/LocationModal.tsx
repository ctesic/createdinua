'use client'

import { useEffect, useRef } from 'react'
import { X, Navigation } from 'lucide-react'
import { Button } from './Button'

type Props = {
  venue: string
  city: string
  address?: string
  googleMapsUrl?: string
  onClose: () => void
  directionsLabel: string
}

function getEmbedUrl(googleMapsUrl: string): string | null {
  // Extract coordinates or place from Google Maps URL for embed
  // Support formats: maps.google.com, goo.gl/maps, google.com/maps
  try {
    const url = new URL(googleMapsUrl)
    const q = url.searchParams.get('q') || url.searchParams.get('query')
    if (q) return `https://maps.google.com/maps?q=${encodeURIComponent(q)}&output=embed`

    // Try to extract from @lat,lng in path
    const coordMatch = googleMapsUrl.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/)
    if (coordMatch) return `https://maps.google.com/maps?q=${coordMatch[1]},${coordMatch[2]}&output=embed`

    // Try place name from path
    const placeMatch = url.pathname.match(/\/place\/([^/]+)/)
    if (placeMatch) return `https://maps.google.com/maps?q=${encodeURIComponent(placeMatch[1].replace(/\+/g, ' '))}&output=embed`

    // Fallback: use the whole URL as a query
    return `https://maps.google.com/maps?q=${encodeURIComponent(googleMapsUrl)}&output=embed`
  } catch {
    return null
  }
}

export function LocationModal({ venue, city, address, googleMapsUrl, onClose, directionsLabel }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEsc)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const embedUrl = googleMapsUrl ? getEmbedUrl(googleMapsUrl) : null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
      onClick={(e) => { if (e.target === overlayRef.current) onClose() }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Modal */}
      <div className="relative bg-[var(--color-background)] rounded-t-[var(--radius-2xl)] md:rounded-[var(--radius-2xl)] w-full max-w-[560px] md:mx-[var(--spacing-4)] overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between p-[var(--spacing-6)] pb-0">
          <div className="flex-1 min-w-0">
            <h3 className="font-[family-name:var(--font-heading)] font-[number:var(--font-weight-medium)] text-[length:var(--text-2xl)] leading-[var(--line-height-2xl)] text-[var(--color-text-primary)]">
              {venue}
            </h3>
            <p className="font-[family-name:var(--font-body)] text-[length:var(--text-lg)] leading-[var(--line-height-lg)] text-[var(--color-text-secondary)]">
              {[address, city].filter(Boolean).join(', ')}
            </p>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full cursor-pointer text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface)] transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Map embed */}
        {embedUrl && (
          <div className="mx-[var(--spacing-6)] mt-[var(--spacing-4)] rounded-[var(--radius-xl)] overflow-hidden">
            <iframe
              src={embedUrl}
              width="100%"
              height="240"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Map: ${venue}`}
            />
          </div>
        )}

        {/* Actions */}
        <div className="p-[var(--spacing-6)]">
          {googleMapsUrl && (
            <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="w-full">
              <Button className="w-full gap-[var(--spacing-2)]">
                <Navigation size={16} />
                {directionsLabel}
              </Button>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
