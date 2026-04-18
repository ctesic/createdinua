export default function RootNotFound() {
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
        <h1 style={{ fontSize: '6rem', fontWeight: 700, color: '#33b5ff', margin: 0, lineHeight: 1 }}>
          404
        </h1>
        <p style={{ fontSize: '1.25rem', color: '#4b5563', margin: '1rem 0 2rem' }}>
          Page not found / Сторінку не знайдено
        </p>
        <a
          href="/uk"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '9999px',
            padding: '0.5rem 1.5rem',
            backgroundColor: '#ffd700',
            color: '#222425',
            textDecoration: 'none',
            fontWeight: 500,
            fontSize: '1rem',
          }}
        >
          Go home / На головну
        </a>
      </body>
    </html>
  )
}
