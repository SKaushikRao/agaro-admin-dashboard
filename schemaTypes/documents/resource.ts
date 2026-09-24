import { defineType, defineField, defineArrayMember } from 'sanity'
import { LinkIcon } from '@sanity/icons'

export const resource = defineType({
  name: 'resource',
  title: 'Learning Resource',
  type: 'document',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Resource Title',
      type: 'string',
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
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'type',
      title: 'Resource Type',
      type: 'string',
      options: {
        list: [
          { title: 'Article', value: 'article' },
          { title: 'Video Lecture', value: 'video' },
          { title: 'Book / Publication', value: 'book' },
          { title: 'Paper / Essay', value: 'paper' },
          { title: 'Online Course', value: 'course' },
          { title: 'Podcast / Audio', value: 'podcast' },
          { title: 'External Website', value: 'website' },
          { title: 'PDF / Document', value: 'pdf' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'article',
    }),
    defineField({
      name: 'url',
      title: 'Resource Link / URL',
      type: 'url',
      description: 'External link, video link, or reading link',
      validation: (rule) =>
        rule.uri({
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover / Thumbnail Image',
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
      name: 'author',
      title: 'Author / Provider / Institution',
      type: 'reference',
      to: [{ type: 'author' }],
    }),
    defineField({
      name: 'subject',
      title: 'Associated Subject',
      type: 'reference',
      to: [{ type: 'subject' }],
    }),
    defineField({
      name: 'durationOrReadTime',
      title: 'Duration / Read Time',
      type: 'string',
      placeholder: 'e.g. 15 min, 45 min video, 300 pages',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'order',
      title: 'Order Priority',
      type: 'number',
      initialValue: 10,
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Resource',
      type: 'boolean',
      initialValue: false,
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
      type: 'type',
      authorName: 'author.name',
      media: 'coverImage',
      isVisible: 'isVisible',
    },
    prepare({ title, type, authorName, media, isVisible }) {
      return {
        title: `${isVisible === false ? '🚫 ' : ''}${title || 'Untitled Resource'}`,
        subtitle: [type, authorName].filter(Boolean).join(' • '),
        media,
      }
    },
  },
})
