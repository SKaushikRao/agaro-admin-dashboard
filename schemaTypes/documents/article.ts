import { defineType, defineField, defineArrayMember } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'

export const article = defineType({
  name: 'article',
  title: 'Article & Post',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Article headline',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Unique URL identifier',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary / Excerpt',
      type: 'text',
      rows: 3,
      description: 'Short summary shown in cards, previews, and meta description',
      validation: (rule) => rule.max(300).warning('Keep summaries concise for cards'),
    }),
    defineField({
      name: 'type',
      title: 'Content Type',
      type: 'string',
      options: {
        list: [
          { title: 'Article / Essay', value: 'article' },
          { title: 'Video Lecture', value: 'video' },
          { title: 'Book / Publication', value: 'book' },
          { title: 'Research Paper', value: 'paper' },
        ],
        layout: 'radio',
      },
      initialValue: 'article',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video Embed URL (YouTube/Vimeo)',
      type: 'url',
      hidden: ({ parent }) => parent?.type !== 'video',
    }),
    defineField({
      name: 'author',
      title: 'Author / Provider',
      type: 'reference',
      to: [{ type: 'author' }],
      description: 'Author or institution who created or published this content',
    }),
    defineField({
      name: 'subject',
      title: 'Primary Subject',
      type: 'reference',
      to: [{ type: 'subject' }],
      description: 'Subject discipline this article belongs to (e.g. Psychology, Philosophy, Economics)',
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'category' }],
        }),
      ],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'string',
        }),
      ],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          validation: (rule) => rule.required().warning('Alt text is recommended for accessibility'),
        }),
        defineField({
          name: 'caption',
          type: 'string',
          title: 'Image Caption',
        }),
      ],
    }),
    defineField({
      name: 'readTime',
      title: 'Estimated Read Time / Duration',
      type: 'string',
      placeholder: 'e.g. 10 min read, 12 min video',
      initialValue: '8 min read',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Publication Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order priority in lists (lower numbers appear first)',
      initialValue: 10,
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Content',
      type: 'boolean',
      description: 'Highlight on the homepage and subject showcases',
      initialValue: false,
    }),
    defineField({
      name: 'isVisible',
      title: 'Published / Visible on Public Website',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'submissionType',
      title: 'Submission Type',
      type: 'string',
      options: {
        list: [
          { title: 'Editorial', value: 'editorial' },
          { title: 'Community Submission', value: 'community' },
        ],
        layout: 'radio',
      },
      initialValue: 'editorial',
      description: 'Editorial articles are written by staff. Community submissions are from visitors.',
    }),
    defineField({
      name: 'submitterName',
      title: 'Submitter Name',
      type: 'string',
      description: 'Name of the person who submitted this (for community submissions)',
      hidden: ({ parent }) => parent?.submissionType !== 'community',
    }),
    defineField({
      name: 'submitterEmail',
      title: 'Submitter Email',
      type: 'string',
      description: 'Email of the person who submitted this (for community submissions)',
      hidden: ({ parent }) => parent?.submissionType !== 'community',
    }),
    defineField({
      name: 'body',
      title: 'Article Body',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
            { title: 'Heading 4', value: 'h4' },
            { title: 'Quote Block', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Underline', value: 'underline' },
              { title: 'Code', value: 'code' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'URL Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (rule) =>
                      rule.uri({
                        scheme: ['http', 'https', 'mailto', 'tel'],
                      }),
                  },
                  {
                    name: 'blank',
                    type: 'boolean',
                    title: 'Open in new tab',
                    initialValue: true,
                  },
                ],
              },
            ],
          },
        }),
        defineArrayMember({
          type: 'pteImage',
        }),
        defineArrayMember({
          type: 'quote',
        }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      authorName: 'author.name',
      subjectTitle: 'subject.title',
      media: 'coverImage',
      type: 'type',
      isVisible: 'isVisible',
    },
    prepare({ title, authorName, subjectTitle, media, type, isVisible }) {
      const parts = [subjectTitle, authorName, type].filter(Boolean).join(' • ')
      return {
        title: `${isVisible === false ? '🚫 [Hidden] ' : ''}${title || 'Untitled'}`,
        subtitle: parts || 'No details',
        media,
      }
    },
  },
})
