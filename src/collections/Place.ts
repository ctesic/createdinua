import type { CollectionConfig } from 'payload'

export const Place: CollectionConfig = {
  slug: 'places',
  admin: {
    useAsTitle: 'displayTitle',
    defaultColumns: ['name', 'city'],
  },
  hooks: {
    afterRead: [
      ({ doc }) => {
        if (!doc.displayTitle && doc.name) {
          doc.displayTitle = doc.city ? `${doc.name} — ${doc.city}` : doc.name
        }
        return doc
      },
    ],
    beforeChange: [
      ({ data }) => {
        if (data?.name) {
          data.displayTitle = data.city ? `${data.name} — ${data.city}` : data.name
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'displayTitle',
      type: 'text',
      localized: true,
      admin: { hidden: true },
    },
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'city',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'address',
      type: 'text',
      localized: true,
    },
    {
      name: 'googleMapsUrl',
      type: 'text',
      admin: {
        description: 'Google Maps link',
      },
    },
  ],
}
