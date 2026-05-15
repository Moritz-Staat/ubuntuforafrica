import { defineField, defineType } from 'sanity'

export const page = defineType({
  name: 'page',
  title: 'Seiteninhalte',
  type: 'document',
  fields: [
    defineField({
      name: 'pageId',
      title: 'Seiten-ID',
      type: 'slug',
      options: {
        source: 'title_de',
        slugify: (input: string) => input.toLowerCase().replace(/\s+/g, '-'),
      },
      validation: (Rule) => Rule.required(),
      description: 'z.B. ueber-uns, freiwillige, spenden, kontakt, home',
    }),
    defineField({
      name: 'title_de',
      title: 'Seitentitel (DE)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title_en',
      title: 'Page title (EN)',
      type: 'string',
    }),
    defineField({
      name: 'hero_subtitle_de',
      title: 'Hero-Untertitel (DE)',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'hero_subtitle_en',
      title: 'Hero subtitle (EN)',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'body_de',
      title: 'Seiteninhalt (DE)',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } },
      ],
    }),
    defineField({
      name: 'body_en',
      title: 'Page content (EN)',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title_de',
      subtitle: 'pageId.current',
    },
  },
})
