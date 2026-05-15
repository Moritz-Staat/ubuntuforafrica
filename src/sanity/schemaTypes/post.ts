import { defineField, defineType } from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Blog / News',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel (DE)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title_en',
      title: 'Title (EN)',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Veröffentlicht am',
      type: 'datetime',
    }),
    defineField({
      name: 'excerpt',
      title: 'Kurzbeschreibung (DE)',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'excerpt_en',
      title: 'Short description (EN)',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'mainImage',
      title: 'Hauptbild',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt-Text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'body',
      title: 'Inhalt (DE)',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'body_en',
      title: 'Content (EN)',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'categories',
      title: 'Kategorien',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'News', value: 'news' },
          { title: 'Volunteer', value: 'volunteer' },
          { title: 'Projekt', value: 'project' },
          { title: 'Event', value: 'event' },
        ],
      },
    }),
  ],
})
