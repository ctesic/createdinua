import { getTranslations, setRequestLocale } from 'next-intl/server'

type Props = {
  params: Promise<{ locale: string }>
}

const CONTACT_EMAIL = 'contact@createdinua.org'

const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/created.in.ukraine',
  facebook: 'https://www.facebook.com/createdinua',
  telegram: 'https://t.me/createdinUkraine',
} as const

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
  </svg>
)

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
)

const TelegramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
)

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex items-center justify-center w-10 h-10 rounded-[var(--radius-full)] bg-[var(--color-primary)] text-[var(--color-text-inverse)] hover:opacity-90 transition-opacity shrink-0"
    >
      {children}
    </a>
  )
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'contact' })

  return (
    <div className="bg-[var(--color-surface)]">
      <section className="flex flex-col items-center overflow-hidden w-full">
        <div className="flex flex-col items-center max-w-[1600px] w-full overflow-hidden mx-auto md:px-[var(--container-side-paddings)] md:py-[var(--spacing-10)]">
          <div className="bg-[var(--color-background)] flex flex-col gap-[var(--spacing-8)] max-w-[800px] w-full px-[var(--spacing-6)] py-[var(--spacing-12)] md:px-[var(--spacing-12)] md:rounded-[32px]">
            {/* Title + intro */}
            <div className="flex flex-col gap-[var(--spacing-4)]">
              <h1 className="font-[family-name:var(--font-heading)] font-[number:var(--font-weight-bold)] text-[length:var(--text-5xl)] leading-[var(--line-height-5xl)] text-[var(--color-text-primary)]">
                {t('title')}
              </h1>
              <p className="font-[family-name:var(--font-body)] text-[length:var(--text-lg)] leading-[var(--line-height-lg)] text-[var(--color-text-secondary)]">
                {t('intro')}
              </p>
            </div>

            {/* Email */}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-[family-name:var(--font-heading)] font-[number:var(--font-weight-bold)] text-[length:var(--text-2xl)] leading-[var(--line-height-2xl)] text-[var(--color-primary)] hover:underline w-fit break-all"
            >
              {CONTACT_EMAIL}
            </a>

            {/* Social */}
            <div className="flex flex-col gap-[var(--spacing-4)] pt-[var(--spacing-2)]">
              <span className="font-[family-name:var(--font-heading)] font-[number:var(--font-weight-medium)] text-[length:var(--text-xl)] leading-[var(--line-height-xl)] text-[var(--color-text-primary)]">
                {t('social')}
              </span>
              <div className="flex items-center gap-[var(--spacing-3)]">
                <SocialLink href={SOCIAL_LINKS.instagram} label="Instagram"><InstagramIcon /></SocialLink>
                <SocialLink href={SOCIAL_LINKS.facebook} label="Facebook"><FacebookIcon /></SocialLink>
                <SocialLink href={SOCIAL_LINKS.telegram} label="Telegram"><TelegramIcon /></SocialLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
