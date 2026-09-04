import type { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import { postsQuery } from '@/sanity/lib/queries'
import { routing } from '@/i18n/routing'

/**
 * Sitemap für ubuntuforafrica.com.
 *
 * **Wirkt erst beim Launch.** `robots.ts` sperrt aktuell noch alles aus
 * (`disallow: '/'`), solange rote Platzhaltertexte auf der Seite stehen und
 * die Rechtstexte ungeprüft sind (#14). Eine Sitemap zu liefern, die niemand
 * crawlen darf, schadet nicht – aber sie ersetzt nicht den Schritt in #21,
 * `robots.ts` beim Launch auf `allow` umzustellen und die Sitemap dort
 * einzutragen.
 *
 * Jede Seite steht einmal drin, mit `alternates.languages` für die jeweils
 * andere Sprache. So versteht Google die beiden Fassungen als Übersetzungen
 * voneinander statt als doppelten Inhalt.
 */

const BASE_URL = 'https://ubuntuforafrica.com'

/** Statische Seiten mit ihrer relativen Wichtigkeit. */
const PAGES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '',                priority: 1.0, changeFrequency: 'monthly' },
  { path: '/ueber-uns',      priority: 0.8, changeFrequency: 'monthly' },
  { path: '/projekte',       priority: 0.8, changeFrequency: 'monthly' },
  { path: '/spenden',        priority: 0.9, changeFrequency: 'monthly' },
  { path: '/freiwillige',    priority: 0.8, changeFrequency: 'monthly' },
  { path: '/foerderpartner', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/transparenz',    priority: 0.6, changeFrequency: 'yearly' },
  { path: '/blog',           priority: 0.6, changeFrequency: 'weekly' },
  { path: '/kontakt',        priority: 0.5, changeFrequency: 'yearly' },
  { path: '/impressum',      priority: 0.2, changeFrequency: 'yearly' },
  { path: '/datenschutz',    priority: 0.2, changeFrequency: 'yearly' },
]

interface PostRef {
  slug?: { current?: string }
  publishedAt?: string
}

/** `{ de: '…/de/pfad', en: '…/en/pfad' }` für den `alternates`-Block. */
function languageAlternates(path: string) {
  return Object.fromEntries(
    routing.locales.map((locale) => [locale, `${BASE_URL}/${locale}${path}`])
  )
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticEntries: MetadataRoute.Sitemap = PAGES.map(({ path, priority, changeFrequency }) => ({
    url: `${BASE_URL}/${routing.defaultLocale}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
    alternates: { languages: languageAlternates(path) },
  }))

  // Blogbeiträge kommen aus Sanity. Ist das CMS nicht erreichbar, liefern wir
  // lieber eine Sitemap ohne Beiträge als gar keine – ein Fehler hier würde
  // sonst die gesamte /sitemap.xml auf 500 setzen.
  let posts: PostRef[] = []
  try {
    posts = await client.fetch(postsQuery)
  } catch {
    posts = []
  }

  const postEntries: MetadataRoute.Sitemap = posts
    .filter((post) => post.slug?.current)
    .map((post) => {
      const path = `/blog/${post.slug!.current}`
      return {
        url: `${BASE_URL}/${routing.defaultLocale}${path}`,
        lastModified: post.publishedAt ? new Date(post.publishedAt) : now,
        changeFrequency: 'yearly' as const,
        priority: 0.4,
        alternates: { languages: languageAlternates(path) },
      }
    })

  return [...staticEntries, ...postEntries]
}
