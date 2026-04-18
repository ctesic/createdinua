import { revalidatePath } from 'next/cache'
import type { CollectionConfig } from 'payload'
import { locales } from '@/i18n/routing'

const revalidatePages = () => {
  try {
    for (const locale of locales) {
      revalidatePath(`/${locale}`)
      revalidatePath(`/${locale}/schedule`)
    }
  } catch {
    // revalidatePath may fail during build or seed
  }
}

export const Screening: CollectionConfig = {
  slug: 'screenings',
  admin: {
    useAsTitle: 'datetime',
    defaultColumns: ['movie', 'place', 'datetime', 'isCancelled'],
  },
  hooks: {
    afterChange: [() => revalidatePages()],
    afterDelete: [() => revalidatePages()],
  },
  fields: [
    {
      name: 'movie',
      type: 'relationship',
      relationTo: 'movies',
      required: true,
    },
    {
      name: 'place',
      type: 'relationship',
      relationTo: 'places',
      required: true,
    },
    {
      name: 'datetime',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
          displayFormat: 'dd/MM/yyyy HH:mm',
        },
      },
    },
    {
      name: 'hall',
      type: 'text',
      admin: {
        description: 'Screen/hall number, e.g. "2" or "Hall 5"',
      },
    },
    {
      name: 'ticketUrl',
      type: 'text',
      admin: {
        description: 'Link to buy tickets',
      },
    },
    {
      name: 'price',
      type: 'text',
      admin: {
        description: 'e.g. "50 ₪" or "Free"',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      localized: true,
      admin: {
        description: 'Additional notes about this screening',
      },
    },
    {
      name: 'isCancelled',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
