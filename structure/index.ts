import type { StructureResolver } from 'sanity/structure'
import {
  CogIcon,
  BookIcon,
  OlistIcon,
  DocumentTextIcon,
  LinkIcon,
  UserIcon,
  TagIcon,
  HashIcon,
  CalendarIcon,
} from '@sanity/icons'

// Types to exclude from generic list
const SINGLETONS = ['siteSettings']

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Agora Content Manager')
    .items([
      // 1. Singleton Settings
      S.listItem()
        .title('Homepage & Site Settings')
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Homepage & Site Settings')
        ),

      S.divider(),

      // 2. Core Content
      S.listItem()
        .title('Subjects & Disciplines')
        .icon(BookIcon)
        .child(
          S.documentTypeList('subject')
            .title('Subjects')
            .defaultOrdering([{ field: 'order', direction: 'asc' }])
        ),

      S.listItem()
        .title('Learning Paths')
        .icon(OlistIcon)
        .child(
          S.documentTypeList('learningPath')
            .title('Learning Paths')
            .defaultOrdering([{ field: 'order', direction: 'asc' }])
        ),

      S.listItem()
        .title('Articles & Essays')
        .icon(DocumentTextIcon)
        .child(
          S.documentTypeList('article')
            .title('Articles & Essays')
            .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
        ),

      S.listItem()
        .title('Resources & Materials')
        .icon(LinkIcon)
        .child(
          S.documentTypeList('resource')
            .title('Educational Resources')
            .defaultOrdering([{ field: 'order', direction: 'asc' }])
        ),

      S.divider(),

      // 3. Authors & Faculty
      S.listItem()
        .title('Authors & Providers')
        .icon(UserIcon)
        .child(
          S.documentTypeList('author')
            .title('Authors & Institutions')
        ),

      // 4. Events & Calendar
      S.listItem()
        .title('Events & Webinars')
        .icon(CalendarIcon)
        .child(
          S.documentTypeList('event')
            .title('Events & Calendar')
            .defaultOrdering([{ field: 'order', direction: 'asc' }])
        ),

      S.divider(),

      // 5. Taxonomy Folder
      S.listItem()
        .title('Taxonomy')
        .icon(TagIcon)
        .child(
          S.list()
            .title('Taxonomy Management')
            .items([
              S.listItem()
                .title('Categories')
                .icon(TagIcon)
                .child(S.documentTypeList('category').title('Categories')),
              S.listItem()
                .title('Tags')
                .icon(HashIcon)
                .child(S.documentTypeList('tag').title('Tags')),
            ])
        ),

      // 6. Any other document types (filtered)
      ...S.documentTypeListItems().filter((item) => {
        const id = item.getId()
        return (
          id &&
          !SINGLETONS.includes(id) &&
          !['subject', 'learningPath', 'article', 'resource', 'author', 'event', 'category', 'tag'].includes(id)
        )
      }),
    ])
