import { defineType, defineField } from 'sanity'
import { UserIcon } from '@sanity/icons'

export const author = defineType({
  name: 'author',
  title: 'Author / Provider',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name / Organization Name',
      type: 'string',
      description: 'e.g. "Aristotle", "Daniel Kahneman", "The School of Life", "Yale University"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role / Designation',
      type: 'string',
      placeholder: 'e.g. Philosopher, Cognitive Psychologist, Educator',
    }),
    defineField({
      name: 'organization',
      title: 'Affiliation / Institution',
      type: 'string',
      placeholder: 'e.g. University of Athens, Harvard University',
    }),
    defineField({
      name: 'image',
      title: 'Profile Image / Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
        }),
      ],
    }),
    defineField({
      name: 'bio',
      title: 'Short Biography',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'website',
      title: 'External Profile / Website URL',
      type: 'url',
      validation: (rule) =>
        rule.uri({
          scheme: ['http', 'https'],
        }),
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
      title: 'name',
      role: 'role',
      org: 'organization',
      media: 'image',
    },
    prepare({ title, role, org, media }) {
      const subtitle = [role, org].filter(Boolean).join(' • ')
      return {
        title: title || 'Unnamed Author',
        subtitle: subtitle || 'No details provided',
        media,
      }
    },
  },
})
