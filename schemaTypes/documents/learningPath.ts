import { defineType, defineField, defineArrayMember } from 'sanity'
import { OlistIcon } from '@sanity/icons'

export const learningPath = defineType({
  name: 'learningPath',
  title: 'Learning Path',
  type: 'document',
  icon: OlistIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Path Title',
      type: 'string',
      description: 'e.g. "Psychology Fundamentals", "Introduction to Philosophy"',
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
      description: 'Structured journey summary',
    }),
    defineField({
      name: 'subject',
      title: 'Associated Subject',
      type: 'reference',
      to: [{ type: 'subject' }],
      description: 'Parent subject for this learning path',
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
          title: 'Alt Text',
        }),
      ],
    }),
    defineField({
      name: 'estimatedDuration',
      title: 'Estimated Duration',
      type: 'string',
      placeholder: 'e.g. 4 Weeks, 10 Hours',
    }),
    defineField({
      name: 'steps',
      title: 'Learning Steps & Units',
      type: 'array',
      description: 'Define the sequential steps of this learning path',
      of: [
        defineArrayMember({
          type: 'learningStep',
        }),
      ],
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 1,
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Path',
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
      subjectTitle: 'subject.title',
      media: 'coverImage',
      steps: 'steps',
      isVisible: 'isVisible',
    },
    prepare({ title, subjectTitle, media, steps, isVisible }) {
      const stepCount = Array.isArray(steps) ? steps.length : 0
      return {
        title: `${isVisible === false ? '🚫 ' : ''}${title || 'Untitled Path'}`,
        subtitle: `${stepCount} step${stepCount === 1 ? '' : 's'}${subjectTitle ? ` • ${subjectTitle}` : ''}`,
        media,
      }
    },
  },
})
