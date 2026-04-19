import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #2b80d1 0%, #33b5ff 100%)',
          color: '#ffd700',
          fontSize: 120,
          fontWeight: 700,
          fontFamily: 'sans-serif',
          letterSpacing: '-4px',
        }}
      >
        CU
      </div>
    ),
    { ...size },
  )
}
