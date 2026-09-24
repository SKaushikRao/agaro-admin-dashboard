import { defineType, defineField } from 'sanity'
import { BlockquoteIcon } from '@sanity/icons'

export const quote = defineType({
  name: 'quote',
  title: 'Quote',
  type: 'object',
  icon: BlockquoteIcon,
  fields: [
    defineField({
      name: 'text',
      title: 'Quote Text',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author / Speaker',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Author Role / Label',
      type: 'string',
      placeholder: 'e.g. Philosopher, Professor of Ethics',
    }),
    defineField({
      name: 'image',
      title: 'Author Portrait Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        }),
      ],
    }),
  ],
})
