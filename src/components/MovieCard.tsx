import Image from 'next/image'
import { Link } from '@/i18n/navigation'

type Props = {
  slug: string
  title: string
  year: number
  poster?: {
    url?: string
    alt?: string
  } | null
  director?: string
}

export function MovieCard({ slug, title, year, poster, director }: Props) {
  return (
    <Link
      href={{ pathname: '/movie/[slug]', params: { slug } }}
      className="group block overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)] transition-shadow hover:shadow-[var(--shadow-md)]"
      style={{ transitionDuration: 'var(--transition-normal)' }}
    >
      <div className="aspect-[2/3] relative bg-[var(--color-border-subtle)]">
        {poster?.url ? (
          <Image
            src={poster.url}
            alt={poster.alt || title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-[var(--color-text-muted)]">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="m10 8 6 4-6 4Z" />
            </svg>
          </div>
        )}
      </div>
      <div className="p-[var(--spacing-4)]">
        <h3 className="text-[length:var(--text-base)] font-[number:var(--font-weight-semibold)] text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)]" style={{ transitionDuration: 'var(--transition-fast)' }}>
          {title}
        </h3>
        <p className="mt-[var(--spacing-1)] text-[length:var(--text-sm)] text-[var(--color-text-secondary)]">
          {director && `${director} · `}{year}
        </p>
      </div>
    </Link>
  )
}
