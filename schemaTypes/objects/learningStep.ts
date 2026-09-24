import { defineType, defineField, defineArrayMember } from 'sanity'
import { CheckmarkCircleIcon } from '@sanity/icons'

export const learningStep = defineType({
  name: 'learningStep',
  title: 'Learning Step',
  type: 'object',
  icon: CheckmarkCircleIcon,
  fields: [
    defineField({
      name: 'stepNumber',
      title: 'Step Number',
      type: 'number',
      description: 'e.g. 1, 2, 3...',
      validation: (rule) => rule.required().positive().integer(),
    }),
    defineField({
      name: 'title',
      title: 'Step Title',
      type: 'string',
      description: 'e.g. "What is Psychology?", "Axiology & Ethics"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 2,
      description: 'Brief explanation of what this step covers',
    }),
    defineField({
      name: 'articles',
      title: 'Articles in this Step',
      type: 'array',
      description: 'Select articles associated with this step',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'article' }],
        }),
      ],
    }),
    defineField({
      name: 'resources',
      title: 'Additional Resources',
      type: 'array',
      description: 'Optional additional resources for this step',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'resource' }],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      stepNumber: 'stepNumber',
      title: 'title',
      description: 'description',
      articles: 'articles',
    },
    prepare({ stepNumber, title, description, articles }) {
      const count = Array.isArray(articles) ? articles.length : 0
      return {
        title: `${stepNumber ? `Step ${stepNumber}: ` : ''}${title || 'Untitled Step'}`,
        subtitle: `${count} article${count === 1 ? '' : 's'}${description ? ` • ${description}` : ''}`,
      }
    },
  },
})
