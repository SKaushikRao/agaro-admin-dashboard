import { defineType, defineField } from 'sanity'
import { HashIcon } from '@sanity/icons'

export const tag = defineType({
  name: 'tag',
  title: 'Tag',
  type: 'document',
  icon: HashIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Tag Title',
      type: 'string',
      description: 'e.g. "Intro", "Cognition", "Virtue", "Ethics", "Brain"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: `#${title || 'untitled'}`,
      }
    },
  },
})
