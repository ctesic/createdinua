import Image from 'next/image'

const src = '/images/kuzma/kuzma-16x9-Israel-en.jpg'

type Props = {
  alt: string
}

export function PromoBanner({ alt }: Props) {
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
