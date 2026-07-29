import Image from 'next/image'

const banners: Record<string, string> = {
  uk: '/images/kuzma/kuzma-16x9-Israel-uk.jpg',
  en: '/images/kuzma/kuzma-16x9-Israel-en.jpg',
  he: '/images/kuzma/kuzma-16x9-Israel-he.jpg',
}

type Props = {
  locale: string
  alt: string
}

export function PromoBanner({ locale, alt }: Props) {
  const src = banners[locale] || banners.en

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-[var(--radius-xl)]">
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes="(max-width: 1600px) 100vw, 1600px"
        className="object-cover"
      />
    </div>
  )
}
