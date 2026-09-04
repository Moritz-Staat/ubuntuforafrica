import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { postBySlugQuery } from '@/sanity/lib/queries'
import { PortableText } from '@portabletext/react'
import { Link } from '@/i18n/routing'
import { notFound } from 'next/navigation'

interface Post {
  _id: string
  title: string
  title_en?: string
  slug: { current: string }
  publishedAt?: string
  excerpt?: string
  excerpt_en?: string
  body?: unknown[]
  body_en?: unknown[]
  categories?: string[]
}

interface Props {
  params: Promise<{ slug: string; locale: string }>
}

/**
 * Als einzige Seite hatte die Blog-Detailseite kein `generateMetadata` – jeder
 * Artikel ging mit dem Titel des Root-Layouts und ohne OG-Tags raus. Beim
 * Teilen in Social Media stand dort für alle Beiträge dasselbe.
 *
 * Der Artikel wird hier ein zweites Mal geladen. Das ist kein Fehler: Next
 * dedupliziert `fetch`-Aufrufe innerhalb eines Requests, und der Sanity-Client
 * nutzt darunter `fetch`. Es geht also eine Anfrage raus, nicht zwei.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params
  const isEn = locale === 'en'

  let post: Post | null = null
  try {
    post = await client.fetch(postBySlugQuery, { slug })
  } catch {
    // Sanity nicht erreichbar – dann trägt der Fallback unten.
  }

  if (!post) {
    return {
      title: isEn ? 'Article | Ubuntu for Africa e.V.' : 'Beitrag | Ubuntu for Africa e.V.',
    }
  }

  const title = isEn ? (post.title_en ?? post.title) : post.title
  const excerpt = isEn ? (post.excerpt_en ?? post.excerpt) : post.excerpt
  const description = excerpt ?? (isEn
    ? 'News from Hout Bay, Cape Town.'
    : 'Neuigkeiten aus Hout Bay, Kapstadt.')

  return {
    title: `${title} | Ubuntu for Africa e.V.`,
    description,
    openGraph: {
      type: 'article',
      title,
      description,
      publishedTime: post.publishedAt,
      images: [{ url: 'https://ubuntuforafrica.com/images/Ubuntu_Logo.png' }],
      locale: isEn ? 'en_GB' : 'de_DE',
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug, locale } = await params
  const t = (de: string, en: string) => locale === 'en' ? en : de

  let post: Post | null = null
  try {
    post = await client.fetch(postBySlugQuery, { slug })
  } catch {
    // Sanity unavailable
  }

  if (!post) {
    notFound()
  }

  const title = locale === 'en' ? (post.title_en ?? post.title) : post.title
  const excerpt = locale === 'en' ? (post.excerpt_en ?? post.excerpt) : post.excerpt
  const body = locale === 'en' ? (post.body_en ?? post.body) : post.body
  const dateLocale = locale === 'en' ? 'en-GB' : 'de-DE'

  return (
    <>
      <section className="relative py-32 bg-[#212529] text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#11aed1]/20 to-[#ae64fd]/10" />
        <div className="relative z-10 mx-auto max-w-4xl px-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[#f7a900] text-sm font-semibold uppercase tracking-widest mb-8 hover:text-[#f7a900]/80 transition-colors"
          >
            {t('← Zurück zum Blog', '← Back to Blog')}
          </Link>
          {post.categories && post.categories.length > 0 && (
            <div className="flex gap-2 mb-4 flex-wrap">
              {post.categories.map((cat) => (
                <span
                  key={cat}
                  className="text-xs font-semibold uppercase tracking-wide text-[#11aed1] bg-[#11aed1]/20 px-2 py-1 rounded-full"
                >
                  {cat}
                </span>
              ))}
            </div>
          )}
          <h1 className="text-4xl font-bold mb-4 md:text-5xl">{title}</h1>
          {post.publishedAt && (
            <p className="text-gray-400 text-sm">
              {new Date(post.publishedAt).toLocaleDateString(dateLocale, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          )}
          {excerpt && (
            <p className="text-xl text-gray-300 leading-relaxed mt-4 max-w-2xl">{excerpt}</p>
          )}
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="mx-auto max-w-3xl px-6">
          {body && body.length > 0 ? (
            <div className="prose prose-lg max-w-none prose-headings:text-[#212529] prose-a:text-[#11aed1]">
              <PortableText value={body as Parameters<typeof PortableText>[0]['value']} />
            </div>
          ) : (
            <p className="text-gray-400 text-center py-10">
              {t('Kein Inhalt vorhanden.', 'No content available.')}
            </p>
          )}
        </div>
      </section>
    </>
  )
}
