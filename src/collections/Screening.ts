import type { CollectionConfig } from 'payload'

export const Screening: CollectionConfig = {
  slug: 'screenings',
  admin: {
    useAsTitle: 'datetime',
    defaultColumns: ['movie', 'place', 'datetime', 'isCancelled'],
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
