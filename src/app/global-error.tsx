'use client'

type Props = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ reset }: Props) {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily: "'Mariupol', system-ui, sans-serif",
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          backgroundColor: '#ffffff',
          color: '#222425',
          textAlign: 'center',
          padding: '2rem',
          margin: 0,
        }}
      >
        <h1 style={{ fontSize: '3rem', fontWeight: 700, color: '#dc2626', margin: 0, lineHeight: 1 }}>
          Something went wrong
        </h1>
        <p style={{ fontSize: '1.125rem', color: '#4b5563', margin: '1rem 0 2rem' }}>
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '9999px',
            padding: '0.5rem 1.5rem',
            backgroundColor: '#ffd700',
            color: '#222425',
            border: 'none',
            fontSize: '1rem',
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          Try again
        </button>
      </body>
    </html>
  )
}
