import type { CollectionConfig } from 'payload'

export const Place: CollectionConfig = {
  slug: 'places',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'city', 'cinemaChain'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Include city for clarity, e.g. "HOT Cinema, Hall 5 — Haifa"',
      },
    },
    {
      name: 'city',
      type: 'text',
      required: true,
    },
    {
      name: 'address',
      type: 'text',
    },
    {
      name: 'googleMapsUrl',
      type: 'text',
      admin: {
        description: 'Google Maps link',
      },
    },
    {
      name: 'cinemaChain',
      type: 'text',
      admin: {
        description: 'e.g. "Yes Planet", "Cinema City"',
        position: 'sidebar',
      },
    },
  ],
}
