import type { GlobalConfig } from 'payload'

export const Announcement: GlobalConfig = {
  slug: 'announcement',
  fields: [
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'type',
      type: 'select',
      options: [
        { label: 'Info', value: 'info' },
        { label: 'Warning', value: 'warning' },
        { label: 'Urgent', value: 'urgent' },
      ],
      defaultValue: 'info',
    },
    {
      name: 'text',
      type: 'textarea',
      required: true,
      localized: true,
    },
  ],
}
