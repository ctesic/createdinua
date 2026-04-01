import { getTranslations, setRequestLocale } from 'next-intl/server'
import { getSiteSettings } from '@/lib/payload'
import type { Locale } from '@/i18n/routing'

type Props = {
  params: Promise<{ locale: string }>
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: 'about' })
  const siteSettings = await getSiteSettings(locale as Locale)

  const socialLinks = siteSettings?.socialLinks as {
    facebook?: string
    telegram?: string
    instagram?: string
  } | undefined

  return (
    <section className="py-[var(--spacing-16)]">
      <div className="mx-auto px-[var(--spacing-6)]" style={{ maxWidth: 'var(--max-width-narrow)' }}>
        <h1 className="text-[length:var(--text-4xl)] font-[number:var(--font-weight-bold)] text-[var(--color-text-primary)] mb-[var(--spacing-8)]">
          {t('title')}
        </h1>

        <div className="prose text-[var(--color-text-secondary)] leading-[var(--leading-relaxed)]">
          {locale === 'uk' && (
            <>
              <p className="text-[length:var(--text-lg)] mb-[var(--spacing-6)]">
                <strong>«Знято в Україні»</strong> — це культурна ініціатива, яка просуває українське кіно в Ізраїлі.
              </p>
              <p className="mb-[var(--spacing-6)]">
                Ми організовуємо покази сучасного українського кіно в кінотеатрах по всьому Ізраїлю, створюючи простір для культурного діалогу та взаємного збагачення.
              </p>
              <p className="mb-[var(--spacing-6)]">
                За час існування проєкту ми показали понад 50 українських фільмів у 14 містах Ізраїлю, співпрацюючи з 3 мережами кінотеатрів.
              </p>
            </>
          )}
          {locale === 'en' && (
            <>
              <p className="text-[length:var(--text-lg)] mb-[var(--spacing-6)]">
                <strong>Created in Ukraine</strong> is a cultural initiative promoting Ukrainian cinema in Israel.
              </p>
              <p className="mb-[var(--spacing-6)]">
                We organize screenings of contemporary Ukrainian films in cinemas across Israel, creating a space for cultural dialogue and mutual enrichment.
              </p>
              <p className="mb-[var(--spacing-6)]">
                Since our inception, we have screened over 50 Ukrainian films in 14 Israeli cities, partnering with 3 cinema chains.
              </p>
            </>
          )}
          {locale === 'he' && (
            <>
              <p className="text-[length:var(--text-lg)] mb-[var(--spacing-6)]">
                <strong>נוצר באוקראינה</strong> היא יוזמה תרבותית לקידום הקולנוע האוקראיני בישראל.
              </p>
              <p className="mb-[var(--spacing-6)]">
                אנו מארגנים הקרנות של סרטים אוקראיניים עכשוויים בבתי קולנוע ברחבי ישראל, ויוצרים מרחב לדיאלוג תרבותי והעשרה הדדית.
              </p>
              <p className="mb-[var(--spacing-6)]">
                מאז הקמתנו, הקרנו למעלה מ-50 סרטים אוקראיניים ב-14 ערים בישראל, בשיתוף פעולה עם 3 רשתות קולנוע.
              </p>
            </>
          )}
        </div>

        {/* Social Links */}
        {socialLinks && (
          <div className="mt-[var(--spacing-12)] flex gap-[var(--spacing-4)]">
            {socialLinks.facebook && (
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-[var(--spacing-2)] rounded-[var(--radius-lg)] border border-[var(--color-border)] px-[var(--spacing-4)] py-[var(--spacing-3)] text-[length:var(--text-sm)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
                style={{ transitionDuration: 'var(--transition-fast)' }}
              >
                Facebook
              </a>
            )}
            {socialLinks.telegram && (
              <a
                href={socialLinks.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-[var(--spacing-2)] rounded-[var(--radius-lg)] border border-[var(--color-border)] px-[var(--spacing-4)] py-[var(--spacing-3)] text-[length:var(--text-sm)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
                style={{ transitionDuration: 'var(--transition-fast)' }}
              >
                Telegram
              </a>
            )}
            {socialLinks.instagram && (
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-[var(--spacing-2)] rounded-[var(--radius-lg)] border border-[var(--color-border)] px-[var(--spacing-4)] py-[var(--spacing-3)] text-[length:var(--text-sm)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
                style={{ transitionDuration: 'var(--transition-fast)' }}
              >
                Instagram
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
