import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  fields: [
    {
      name: 'heroTitle',
      type: 'text',
      localized: true,
    },
    {
      name: 'heroTagline',
      type: 'text',
      localized: true,
    },
    {
      name: 'socialLinks',
      type: 'group',
      fields: [
        { name: 'facebook', type: 'text' },
        { name: 'telegram', type: 'text' },
        { name: 'instagram', type: 'text' },
      ],
    },
    {
      name: 'stats',
      type: 'array',
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
          admin: { description: 'e.g. "50+"' },
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
          admin: { description: 'e.g. "Ukrainian films screened"' },
        },
      ],
    },
  ],
}
