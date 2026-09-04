import type { Metadata } from 'next'
import Image from 'next/image'
import { client } from '@/sanity/lib/client'
import { postsQuery } from '@/sanity/lib/queries'
import { Link } from '@/i18n/routing'
import { getInstagramPosts, captionTitle } from '@/lib/instagram'
import { SOCIAL } from '@/lib/site-config'

interface Post {
  _id: string
  title: string
  title_en?: string
  slug: { current: string }
  publishedAt?: string
  excerpt?: string
  excerpt_en?: string
  categories?: string[]
}

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params
  const isEn = locale === 'en'
  return {
    title: isEn ? 'Blog & News | Ubuntu for Africa e.V.' : 'Blog & Neuigkeiten | Ubuntu for Africa e.V.',
    description: isEn
      ? 'News from Hout Bay, volunteer reports and updates from Ubuntu for Africa e.V..'
      : 'Neuigkeiten aus Hout Bay, Berichte von Freiwilligen und Updates aus dem Ubuntu for Africa e.V..',
    openGraph: {
      title: isEn ? 'Blog & News | Ubuntu for Africa e.V.' : 'Blog & Neuigkeiten | Ubuntu for Africa e.V.',
      description: isEn
        ? 'News from Hout Bay, volunteer reports and updates from Ubuntu for Africa e.V..'
        : 'Neuigkeiten aus Hout Bay, Berichte von Freiwilligen und Updates aus dem Ubuntu for Africa e.V..',
      images: [{ url: 'https://ubuntuforafrica.com/images/Ubuntu_Logo.png' }],
      locale: isEn ? 'en_GB' : 'de_DE',
    },
  }
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = (de: string, en: string) => locale === 'en' ? en : de

  let posts: Post[] = []
  try {
    posts = await client.fetch(postsQuery)
  } catch {
    // Sanity unavailable
  }

  // Instagram-Beiträge stehen gleichberechtigt zwischen den Blogartikeln,
  // chronologisch einsortiert. Ohne Token kommt hier eine leere Liste zurück.
  const instagramPosts = await getInstagramPosts(9)

  type Entry =
    | { kind: 'post'; key: string; date: string; post: Post }
    | { kind: 'instagram'; key: string; date: string; ig: (typeof instagramPosts)[number] }

  const entries: Entry[] = [
    ...posts.map((post): Entry => ({
      kind: 'post',
      key: post._id,
      date: post.publishedAt ?? '',
      post,
    })),
    ...instagramPosts.map((ig): Entry => ({
      kind: 'instagram',
      key: ig.id,
      date: ig.timestamp,
      ig,
    })),
  ].sort((a, b) => (a.date < b.date ? 1 : -1))

  const dateLocale = locale === 'en' ? 'en-GB' : 'de-DE'
  const formatDate = (value: string) =>
    new Date(value).toLocaleDateString(dateLocale, { year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <>
      <section className="relative py-32 bg-[#212529] text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#11aed1]/20 to-[#ae64fd]/10" />
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <p className="text-[#f7a900] text-sm font-semibold uppercase tracking-widest mb-4">
            {t('Aktuelles', 'Latest News')}
          </p>
          <h1 className="text-5xl font-bold mb-6 md:text-6xl">{t('Blog & News', 'Blog & News')}</h1>
          <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
            {t(
              'Neuigkeiten aus Hout Bay, Berichte von Freiwilligen und Updates aus dem Verein.',
              'News from Hout Bay, volunteer reports and updates from the association.'
            )}
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          {entries.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg mb-4">
                {t('Noch keine Beiträge vorhanden.', 'No posts yet.')}
              </p>
              <p className="text-gray-500 text-sm">
                {t('Inhalte können im ', 'Content can be added in the ')}{' '}
                <a href="/studio" className="text-[#11aed1] underline">CMS Studio</a>
                {t(' eingetragen werden.', '.')}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {entries.map((entry) => {
                if (entry.kind === 'instagram') {
                  const { ig } = entry
                  const title = captionTitle(ig.caption)
                  return (
                    <a
                      key={entry.key}
                      href={ig.permalink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                    >
                      <div className="relative aspect-[4/3] bg-gray-100">
                        <Image
                          src={ig.imageUrl}
                          alt={title || 'Instagram'}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-6">
                        <span className="inline-block text-xs font-semibold uppercase tracking-wide text-[#ae64fd] bg-[#ae64fd]/10 px-2 py-1 rounded-full mb-3">
                          Instagram
                        </span>
                        {title && (
                          <h2 className="text-lg font-bold text-[#212529] mb-2 group-hover:text-[#11aed1] transition-colors">
                            {title}
                          </h2>
                        )}
                        {ig.caption && (
                          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{ig.caption}</p>
                        )}
                        <p className="text-gray-400 text-xs mt-4">{formatDate(ig.timestamp)}</p>
                      </div>
                    </a>
                  )
                }

                const { post } = entry
                const title = locale === 'en' ? (post.title_en ?? post.title) : post.title
                const excerpt = locale === 'en' ? (post.excerpt_en ?? post.excerpt) : post.excerpt
                return (
                  <Link
                    key={entry.key}
                    href={`/blog/${post.slug.current}`}
                    className="group block bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                  >
                    <div className="p-6">
                      {post.categories && post.categories.length > 0 && (
                        <div className="flex gap-2 mb-3 flex-wrap">
                          {post.categories.map((cat) => (
                            <span
                              key={cat}
                              className="text-xs font-semibold uppercase tracking-wide text-[#11aed1] bg-[#11aed1]/10 px-2 py-1 rounded-full"
                            >
                              {cat}
                            </span>
                          ))}
                        </div>
                      )}
                      <h2 className="text-xl font-bold text-[#212529] mb-3 group-hover:text-[#11aed1] transition-colors">
                        {title}
                      </h2>
                      {excerpt && (
                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{excerpt}</p>
                      )}
                      {post.publishedAt && (
                        <p className="text-gray-400 text-xs mt-4">{formatDate(post.publishedAt)}</p>
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>
          )}

          {entries.length > 0 && (
            <p className="mt-12 text-center text-sm text-gray-500">
              {t('Mehr Bilder und Kurznachrichten auf ', 'More pictures and short updates on ')}
              <a
                href={SOCIAL.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#11aed1] font-semibold hover:underline"
              >
                @ubuntuforafrica
              </a>
            </p>
          )}
        </div>
      </section>
    </>
  )
}
