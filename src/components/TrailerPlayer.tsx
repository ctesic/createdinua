'use client'

import { useState } from 'react'
import Image from 'next/image'

type Props = {
  embedUrl: string
  posterUrl: string | null
  title: string
}

export function TrailerPlayer({ embedUrl, posterUrl, title }: Props) {
  const [playing, setPlaying] = useState(false)

  if (playing) {
    return (
      <iframe
        src={`${embedUrl}?autoplay=1`}
        title={title}
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    )
  }

  const videoId = embedUrl.match(/embed\/([^?&]+)/)?.[1]
  const thumbnail = posterUrl || (videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null)

  return (
    <button
      onClick={() => setPlaying(true)}
      className="relative w-full h-full cursor-pointer group"
      aria-label={`Play ${title}`}
    >
      {thumbnail && (
        <Image
          src={thumbnail}
          alt={title}
          fill
          priority
          sizes="(max-width: 1440px) 100vw, 1440px"
          className="object-cover"
        />
      )}
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/90 group-hover:bg-white flex items-center justify-center transition-colors shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="var(--color-text-primary)" className="w-8 h-8 md:w-10 md:h-10 ms-1">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </button>
  )
}
