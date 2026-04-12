import Image from 'next/image'
import { Link } from '@/i18n/navigation'

type Props = {
  slug: string
  title: string
  posterUrl?: string | null
}

export function MovieCard({ slug, title, posterUrl }: Props) {
  return (
    <Link
      href={{ pathname: '/movie/[slug]', params: { slug } }}
      className="group block"
    >
      <div className="relative aspect-[350/525] overflow-hidden rounded-[16px] bg-[var(--color-background-inverted)] transition-all duration-300 ease-out group-hover:scale-[1.03] group-hover:shadow-[0_16px_40px_-8px_rgba(0,0,0,0.2)]">
        {posterUrl ? (
          <Image
            src={posterUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-[var(--color-text-muted)]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="m10 8 6 4-6 4Z" />
            </svg>
          </div>
        )}
      </div>
      <h3 className="mt-[var(--spacing-3)] text-center font-[family-name:var(--font-heading)] text-[length:var(--text-2xl)] leading-[var(--line-height-2xl)] font-[number:var(--font-weight-medium)] text-[var(--color-text-primary)] transition-colors duration-200 group-hover:text-[var(--color-primary)]">
        {title}
      </h3>
    </Link>
  )
}
