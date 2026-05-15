import { defineField, defineType } from 'sanity'

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Team',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Rolle (DE)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role_en',
      title: 'Role (EN)',
      type: 'string',
    }),
    defineField({
      name: 'team',
      title: 'Team',
      type: 'string',
      options: {
        list: [
          { title: 'Team Südafrika', value: 'sa' },
          { title: 'Vorstand Deutschland', value: 'de' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'bio',
      title: 'Biografie (DE)',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'bio_en',
      title: 'Biography (EN)',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'photo',
      title: 'Foto',
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
      name: 'order',
      title: 'Reihenfolge',
      type: 'number',
    }),
  ],
  orderings: [
    {
      title: 'Reihenfolge',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
