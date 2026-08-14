/**
 * Zentrale Kontaktdaten der Website.
 *
 * Aktuell die einzige Quelle: `siteSettings.contactEmail` wird in
 * `siteSettingsQuery` zwar mitgeladen, aber von keiner Komponente ausgewertet.
 * Wer das auf CMS-Pflege umstellt, ersetzt die Importe hier durch den
 * geladenen Wert und behält diese Konstanten als Fallback.
 *
 * Adressen nicht direkt in Seiten schreiben, sondern immer von hier importieren.
 */

/** Allgemeine Kontaktadresse. Alias, wird an birgittaclatz@hotmail.com weitergeleitet. */
export const CONTACT_EMAIL = 'info@ubuntuforafrica.com'

/** Bewerbungen und Fragen von Freiwilligen. */
export const VOLUNTEER_EMAIL = 'volunteers.ubuntuforafrica@gmx.de'

/**
 * Spendenbescheinigungen. Die einzige Stelle, an der pauline.schmiel@gmail.com
 * richtig ist – so steht es im freigegebenen Spenden-Text und auf der alten
 * Website. Nicht durch info@ ersetzen (siehe GitHub #9).
 */
export const RECEIPT_EMAIL = 'pauline.schmiel@gmail.com'

/** Absender für automatisch versendete Mails (Kontaktformular, Newsletter). */
export const NOREPLY_EMAIL = 'noreply@ubuntuforafrica.com'

/**
 * Kategorien des Kontaktformulars und die Adresse, an die sie gehen.
 * Der Schlüssel wird als `subject` übertragen und in `/api/contact` erneut
 * gegen diese Tabelle geprüft – der Client bestimmt den Empfänger nicht.
 */
export const CONTACT_ROUTING = {
  freiwillig: { email: VOLUNTEER_EMAIL, label_de: 'Freiwillige & Praktikum', label_en: 'Volunteering & internship' },
  spenden: { email: CONTACT_EMAIL, label_de: 'Spenden', label_en: 'Donations' },
  spendenquittung: { email: RECEIPT_EMAIL, label_de: 'Spendenquittung', label_en: 'Donation receipt' },
  foerderpartner: { email: CONTACT_EMAIL, label_de: 'Fördermitgliedschaft', label_en: 'Supporting membership' },
  presse: { email: CONTACT_EMAIL, label_de: 'Presse & Kooperationen', label_en: 'Press & partnerships' },
  sonstiges: { email: CONTACT_EMAIL, label_de: 'Sonstiges', label_en: 'Other' },
} as const

export type ContactCategory = keyof typeof CONTACT_ROUTING

export function isContactCategory(value: string): value is ContactCategory {
  return value in CONTACT_ROUTING
}

/** Offizielle Social-Media-Profile (von ubuntuforafrica.com übernommen). */
export const SOCIAL = {
  instagram: 'https://www.instagram.com/ubuntuforafrica/',
  facebook: 'https://www.facebook.com/Ubuntu4AllGermany/',
} as const

/** Satzung als PDF, liegt in public/dokumente/. */
export const SATZUNG_PDF = '/dokumente/satzung.pdf'

/** `mailto:`-Link, optional mit vorbelegtem Betreff. */
export function mailto(address: string, subject?: string) {
  return subject
    ? `mailto:${address}?subject=${encodeURIComponent(subject)}`
    : `mailto:${address}`
}
