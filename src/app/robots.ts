import type { MetadataRoute } from 'next'

/**
 * Vor dem Launch: nichts indexieren lassen.
 *
 * Die Seite enthält noch rot markierte Platzhaltertexte, und Impressum wie
 * Datenschutzerklärung sind rechtlich ungeprüft (GitHub #14). Solange das so
 * ist, darf nichts davon in Suchergebnissen landen.
 *
 * Beim Launch ersetzen durch `allow: '/'` plus Sitemap-Eintrag – siehe #21.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      disallow: '/',
    },
  }
}
