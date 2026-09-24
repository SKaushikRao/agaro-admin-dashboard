import { defineType, defineField, defineArrayMember } from 'sanity'
import { BookIcon } from '@sanity/icons'

export const subject = defineType({
  name: 'subject',
  title: 'Subject / Discipline',
  type: 'document',
  icon: BookIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Subject Name',
      type: 'string',
      description: 'e.g. Psychology, Philosophy, Economics, Liberal Arts',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL path component (e.g. "psychology", "philosophy")',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Short Subtitle / Hero Tagline',
      type: 'text',
      rows: 2,
      description: 'Concise summary shown under the subject title',
    }),
    defineField({
      name: 'aboutText',
      title: 'About Subject (Long Description)',
      type: 'text',
      rows: 5,
      description: 'Detailed overview of this discipline for the sidebar & about section',
    }),
    defineField({
      name: 'iconType',
      title: 'Subject Icon',
      type: 'string',
      options: {
        list: [
          { title: 'Brain (Psychology / Mind)', value: 'brain' },
          { title: 'Landmark / Temple (Philosophy / Classical)', value: 'landmark' },
          { title: 'Book / Open Book (Liberal Arts / Humanities)', value: 'book' },
          { title: 'Trending / Chart (Economics / Markets)', value: 'trending' },
          { title: 'History / Scroll', value: 'history' },
          { title: 'Literature / Feather / Pen', value: 'literature' },
          { title: 'Sociology / Users / Network', value: 'sociology' },
        ],
      },
      initialValue: 'landmark',
    }),
    defineField({
      name: 'colorTheme',
      title: 'Visual Color Theme',
      type: 'string',
      options: {
        list: [
          { title: 'Space Cadet (Navy Blue #25344F)', value: 'space-cadet' },
          { title: 'Warm Brown (Agora Classic #5C3B22)', value: 'warm-brown' },
          { title: 'Golden Ochre (#B78B4A)', value: 'golden-ochre' },
        ],
        layout: 'radio',
      },
      initialValue: 'space-cadet',
    }),
    defineField({
      name: 'bannerImage',
      title: 'Banner / Cover Image',
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
      name: 'stats',
      title: 'Display Statistics',
      type: 'object',
      fields: [
        defineField({ name: 'paths', type: 'string', title: 'Guided Paths Count', initialValue: '10' }),
        defineField({ name: 'resources', type: 'string', title: 'Resources Count', initialValue: '100+' }),
        defineField({ name: 'articles', type: 'string', title: 'Articles Count', initialValue: '70+' }),
        defineField({ name: 'videos', type: 'string', title: 'Videos Count', initialValue: '50+' }),
      ],
    }),
    defineField({
      name: 'topics',
      title: 'Popular Topics',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      description: 'Topics shown in the sidebar badges (e.g. Cognitive Psychology, Ethics, Metaphysics)',
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'learningSteps',
      title: 'Guided Learning Steps',
      type: 'array',
      description: 'Configurable sequence of steps with articles for this subject',
      of: [
        defineArrayMember({
          type: 'learningStep',
        }),
      ],
    }),
    defineField({
      name: 'recommended',
      title: 'Recommended For You',
      type: 'array',
      description: 'Curated articles or resources recommended in the sidebar',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'article' }, { type: 'resource' }],
        }),
      ],
    }),
    defineField({
      name: 'quote',
      title: 'Featured Subject Quote',
      type: 'quote',
    }),
    defineField({
      name: 'order',
      title: 'Display Order Priority',
      type: 'number',
      description: 'Lower numbers appear first on the Home & Subjects pages',
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
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'bannerImage',
      isVisible: 'isVisible',
      isFeatured: 'isFeatured',
    },
    prepare({ title, subtitle, media, isVisible, isFeatured }) {
      const flags = [
        isVisible === false ? '🚫 Hidden' : null,
        isFeatured ? '⭐ Featured' : null,
      ].filter(Boolean).join(' | ')
      return {
        title: `${flags ? `[${flags}] ` : ''}${title || 'Untitled Subject'}`,
        subtitle: subtitle || 'No subtitle',
        media,
      }
    },
  },
})
