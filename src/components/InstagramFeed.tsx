import Image from 'next/image'
import { getInstagramPosts, captionTitle } from '@/lib/instagram'
import { SOCIAL } from '@/lib/site-config'

/**
 * Die letzten Instagram-Posts als Kachelraster.
 *
 * Rendert **nichts**, solange kein Token gesetzt ist oder der Abruf scheitert –
 * lieber keine Sektion als eine leere.
 */
export default async function InstagramFeed({
  locale,
  limit = 6,
}: {
  locale: string
  limit?: number
}) {
  const posts = await getInstagramPosts(limit)
  if (posts.length === 0) return null

  const t = (de: string, en: string) => (locale === 'en' ? en : de)

  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-14">
          <p className="text-[#11aed1] text-sm font-semibold uppercase tracking-widest mb-3">
            {t('Aus Hout Bay', 'From Hout Bay')}
          </p>
          <h2 className="text-4xl font-bold text-[#212529] mb-4">
            {t('Aktuelles auf Instagram', 'Latest on Instagram')}
          </h2>
          <a
            href={SOCIAL.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#11aed1] font-semibold hover:underline"
          >
            @ubuntuforafrica
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-2xl bg-gray-100"
            >
              <Image
                src={post.imageUrl}
                alt={captionTitle(post.caption) || t('Instagram-Beitrag', 'Instagram post')}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {post.caption && (
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                  <p className="p-4 text-sm text-white line-clamp-3">{captionTitle(post.caption, 120)}</p>
                </div>
              )}
              {post.mediaType === 'VIDEO' && (
                <span className="absolute right-3 top-3 rounded-full bg-black/60 p-1.5" aria-hidden="true">
                  <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
