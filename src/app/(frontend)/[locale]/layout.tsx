import type { Metadata } from 'next'
import Script from 'next/script'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing, rtlLocales, type Locale } from '@/i18n/routing'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import '../globals.css'

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const messages = await getMessages({ locale })
  const meta = messages.meta as Record<string, string>

  return {
    title: meta?.title || 'Created in Ukraine',
    description: meta?.description,
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  if (!routing.locales.includes(locale as Locale)) {
    notFound()
  }

  setRequestLocale(locale)
  const messages = await getMessages()
  const dir = rtlLocales.includes(locale as Locale) ? 'rtl' : 'ltr'

  const umamiSrc = process.env.NEXT_PUBLIC_UMAMI_URL
  const umamiId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID

  return (
    <html lang={locale} dir={dir}>
      <body className="min-h-screen flex flex-col">
        {umamiSrc && umamiId && (
          <Script
            defer
            src={umamiSrc}
            data-website-id={umamiId}
            strategy="afterInteractive"
          />
        )}
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer locale={locale as Locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
