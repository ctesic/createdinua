import { defineRouting } from 'next-intl/routing'

export const locales = ['uk', 'en', 'he'] as const
export type Locale = (typeof locales)[number]

export const rtlLocales: Locale[] = ['he']

export const routing = defineRouting({
  locales,
  defaultLocale: 'uk',
  localePrefix: 'always',
  pathnames: {
    '/': '/',
    '/schedule': '/schedule',
    '/movies': '/movies',
    '/catalog': '/catalog',
    '/movie/[slug]': '/movie/[slug]',
    '/about': '/about',
  },
})
