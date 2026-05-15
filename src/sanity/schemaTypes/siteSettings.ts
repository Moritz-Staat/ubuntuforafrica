import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Website-Einstellungen',
  type: 'document',
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Website-Titel',
      type: 'string',
    }),
    defineField({
      name: 'siteDescription_de',
      title: 'Website-Beschreibung (DE)',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'siteDescription_en',
      title: 'Site description (EN)',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'contactEmail',
      title: 'Kontakt-E-Mail',
      type: 'string',
    }),
    defineField({
      name: 'donationIban',
      title: 'Spenden-IBAN',
      type: 'string',
      description: 'IBAN für Banküberweisung auf der Spendenseite',
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Instagram-URL',
      type: 'url',
    }),
    defineField({
      name: 'facebookUrl',
      title: 'Facebook-URL',
      type: 'url',
    }),
    defineField({
      name: 'footerText_de',
      title: 'Footer-Text (DE)',
      type: 'string',
    }),
    defineField({
      name: 'footerText_en',
      title: 'Footer text (EN)',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'siteTitle',
    },
    prepare() {
      return { title: 'Website-Einstellungen' }
    },
  },
})
