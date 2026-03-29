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
    '/schedule': {
      uk: '/afisha',
      en: '/schedule',
      he: '/luach',
    },
    '/catalog': {
      uk: '/kataloh',
      en: '/catalog',
      he: '/katalog',
    },
    '/movie/[slug]': {
      uk: '/film/[slug]',
      en: '/movie/[slug]',
      he: '/seret/[slug]',
    },
    '/about': {
      uk: '/pro-nas',
      en: '/about',
      he: '/odot',
    },
  },
})
