type UmamiApi = { track: (name: string, props?: Record<string, unknown>) => void }

export function trackTicketClick(props: { location: 'hero' | 'movie-page' | 'schedule'; movieSlug?: string; city?: string }) {
  if (typeof window === 'undefined') return
  const umami = (window as Window & { umami?: UmamiApi }).umami
  umami?.track?.('ticket-click', props)
}
