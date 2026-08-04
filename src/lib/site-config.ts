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

/** Absender für automatisch versendete Mails (Kontaktformular, Newsletter). */
export const NOREPLY_EMAIL = 'noreply@ubuntuforafrica.com'

/** `mailto:`-Link, optional mit vorbelegtem Betreff. */
export function mailto(address: string, subject?: string) {
  return subject
    ? `mailto:${address}?subject=${encodeURIComponent(subject)}`
    : `mailto:${address}`
}
