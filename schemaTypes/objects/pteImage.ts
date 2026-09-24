import { defineType, defineField } from 'sanity'
import { ImageIcon } from '@sanity/icons'

export const pteImage = defineType({
  name: 'pteImage',
  title: 'Inline Image',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'image',
      title: 'Image Asset',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Alternative Text',
      type: 'string',
      description: 'Important for accessibility and SEO',
      validation: (rule) => rule.required().warning('Alt text is required for accessibility'),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'Optional caption displayed beneath the image',
    }),
    defineField({
      name: 'layout',
      title: 'Image Layout / Width',
      type: 'string',
      options: {
        list: [
          { title: 'Standard (Full Content Width)', value: 'standard' },
          { title: 'Wide (Extended Width)', value: 'wide' },
          { title: 'Compact (Centered)', value: 'compact' },
        ],
        layout: 'radio',
      },
      initialValue: 'standard',
    }),
  ],
  preview: {
    select: {
      title: 'caption',
      subtitle: 'alt',
      media: 'image',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || subtitle || 'Inline Image',
        subtitle: title ? subtitle : 'No caption',
        media,
      }
    },
  },
})
