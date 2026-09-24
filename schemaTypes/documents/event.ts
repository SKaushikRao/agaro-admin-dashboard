import { defineType, defineField } from 'sanity'
import { CalendarIcon } from '@sanity/icons'

export const event = defineType({
  name: 'event',
  title: 'Event & Webinar',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Event Title',
      type: 'string',
      description: 'e.g. "The Ethics of AI", "The Republic by Plato"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Event Category',
      type: 'string',
      description: 'e.g. "Online Lecture", "Reading Group", "Philosophy Café"',
      initialValue: 'Online Lecture',
    }),
    defineField({
      name: 'dateDay',
      title: 'Day Number (e.g. 24, 30, 05)',
      type: 'string',
      placeholder: '24',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'dateMonth',
      title: 'Month Abbreviation (e.g. MAY, JUN, JUL)',
      type: 'string',
      placeholder: 'MAY',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'eventDate',
      title: 'Full Date & Time (for sorting)',
      type: 'datetime',
    }),
    defineField({
      name: 'time',
      title: 'Time Display String',
      type: 'string',
      placeholder: '11:00 AM (EST)',
      initialValue: '11:00 AM (EST)',
    }),
    defineField({
      name: 'locationOrPlatform',
      title: 'Location or Platform',
      type: 'string',
      placeholder: 'Zoom / Agora Virtual Hall',
    }),
    defineField({
      name: 'link',
      title: 'Registration / Details Link',
      type: 'url',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 1,
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured on Homepage',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'isVisible',
      title: 'Visible on Site',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      day: 'dateDay',
      month: 'dateMonth',
      category: 'category',
      time: 'time',
    },
    prepare({ title, day, month, category, time }) {
      return {
        title: title || 'Untitled Event',
        subtitle: `${day || ''} ${month || ''} • ${category || ''} • ${time || ''}`,
      }
    },
  },
})
