import { defineType, defineField, defineArrayMember } from 'sanity'
import { CogIcon } from '@sanity/icons'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Homepage & Site Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site Title / Branding',
      type: 'string',
      initialValue: 'Agora',
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
      initialValue: 'Explore Arts & Humanities.',
    }),
    defineField({
      name: 'heroSubheadline',
      title: 'Hero Subheadline',
      type: 'string',
      initialValue: 'What would you like to learn today?',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Sculpture / Campus Image',
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
      name: 'featuredSubjects',
      title: 'Featured Subjects on Homepage (4 Top Cards)',
      type: 'array',
      description: 'Select subjects displayed in the "Hello User" grid',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'subject' }],
        }),
      ],
    }),
    defineField({
      name: 'aboutSection',
      title: 'About Us Homepage Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          type: 'string',
          title: 'Section Title',
          initialValue: 'About Us',
        }),
        defineField({
          name: 'content',
          type: 'text',
          rows: 6,
          title: 'About Text',
        }),
        defineField({
          name: 'image',
          type: 'image',
          title: 'About Image',
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
          name: 'buttonText',
          type: 'string',
          title: 'Button Label',
          initialValue: 'Learn More About Us',
        }),
        defineField({
          name: 'buttonLink',
          type: 'string',
          title: 'Button Link',
          initialValue: '/about',
        }),
      ],
    }),
    defineField({
      name: 'featuredArticles',
      title: 'Featured Blogs & Articles on Homepage',
      type: 'array',
      description: 'Select articles to feature on the homepage',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'article' }],
        }),
      ],
    }),
    defineField({
      name: 'upcomingEvents',
      title: 'Upcoming Events on Homepage',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'event' }],
        }),
      ],
    }),
    defineField({
      name: 'bottomBanner',
      title: 'Bottom "Learn More" Banner',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          type: 'string',
          title: 'Banner Title',
          initialValue: 'Learn More',
        }),
        defineField({
          name: 'subtitle',
          type: 'string',
          title: 'Banner Subtitle',
          initialValue: 'Discover courses, resources, and opportunities to grow.',
        }),
        defineField({
          name: 'buttonText',
          type: 'string',
          title: 'Button Text',
          initialValue: 'Explore Now',
        }),
        defineField({
          name: 'buttonLink',
          type: 'string',
          title: 'Button Link',
          initialValue: '/subjects',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'siteTitle',
      headline: 'heroHeadline',
    },
    prepare({ title, headline }) {
      return {
        title: title || 'Site Settings',
        subtitle: headline || 'Homepage & Global configuration',
      }
    },
  },
})
