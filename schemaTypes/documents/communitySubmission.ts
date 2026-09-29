import { defineType, defineField } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'

export const communitySubmission = defineType({
  name: 'communitySubmission',
  title: 'Community Submission',
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
        {
          type: 'reference',
          to: [{ type: 'category' }],
        },
      ],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [
        {
          type: 'string',
        },
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
      title: 'Submission Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'status',
      title: 'Approval Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending Review', value: 'pending' },
          { title: 'Approved', value: 'approved' },
          { title: 'Rejected', value: 'rejected' },
        ],
        layout: 'radio',
      },
      initialValue: 'pending',
      description: 'Pending submissions are awaiting review. Approved submissions are visible on the website. Rejected submissions are hidden.',
    }),
    defineField({
      name: 'submitterName',
      title: 'Submitter Name',
      type: 'string',
      description: 'Name of the person who submitted this',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'submitterEmail',
      title: 'Submitter Email',
      type: 'string',
      description: 'Email of the person who submitted this',
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'body',
      title: 'Article Body',
      type: 'array',
      of: [
        {
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
        },
        {
          type: 'pteImage',
        },
        {
          type: 'quote',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subjectTitle: 'subject.title',
      media: 'coverImage',
      type: 'type',
      status: 'status',
      submitterName: 'submitterName',
    },
    prepare({ title, subjectTitle, media, type, status, submitterName }) {
      const parts = [subjectTitle, submitterName, type].filter(Boolean).join(' • ')
      const statusEmoji = status === 'pending' ? '⏳' : status === 'approved' ? '✅' : status === 'rejected' ? '❌' : ''
      return {
        title: `${statusEmoji} ${title || 'Untitled'}`,
        subtitle: parts || 'No details',
        media,
      }
    },
  },
})
