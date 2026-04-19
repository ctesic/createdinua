import { ImageResponse } from 'next/og'
import { getMessages } from 'next-intl/server'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

type Props = {
  params: Promise<{ locale: string }>
}

export default async function OgImage({ params }: Props) {
  const { locale } = await params
  const messages = await getMessages({ locale })
  const meta = (messages.meta as Record<string, string>) || {}
  const brand = meta.brand || 'Created in Ukraine'
  const description = meta.description || ''
  const dir = locale === 'he' ? 'rtl' : 'ltr'

  return new ImageResponse(
    (
      <div
        dir={dir}
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: 'linear-gradient(135deg, #222425 0%, #1a3a5f 100%)',
          color: '#ffffff',
        }}
      >
        <div
          style={{
            fontSize: 120,
            fontWeight: 700,
            lineHeight: 1.05,
            color: '#33b5ff',
            letterSpacing: '-2px',
          }}
        >
          {brand}
        </div>
        <div
          style={{
            marginTop: 32,
            fontSize: 40,
            color: '#e2e5ea',
            lineHeight: 1.25,
          }}
        >
          {description}
        </div>
        <div
          style={{
            marginTop: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            fontSize: 28,
            color: '#ffd700',
          }}
        >
          createdinua.org
        </div>
      </div>
    ),
    { ...size },
  )
}
