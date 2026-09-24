import { defineType, defineField } from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'SEO & Social',
  type: 'object',
  fields: [
    defineField({
      name: 'seoTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Title used for search engines and browser tabs',
      validation: (rule) => rule.max(70).warning('Keep meta title under 70 characters for best SEO'),
    }),
    defineField({
      name: 'seoDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Description used for search engine snippets and social sharing',
      validation: (rule) => rule.max(160).warning('Keep meta description under 160 characters for best SEO'),
    }),
    defineField({
      name: 'seoImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Image displayed when shared on social media',
      options: {
        hotspot: true,
      },
    }),
  ],
})
