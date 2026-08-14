/**
 * Instagram-Feed (@ubuntuforafrica).
 *
 * Läuft über die **Instagram API with Instagram Login** (`graph.instagram.com`).
 * Die alte Basic-Display-API wurde am 4.12.2024 abgeschaltet, deren Tokens
 * funktionieren nicht mehr.
 *
 * Zwei Betriebsarten, je nachdem woher der Token kommt:
 *
 * - **Instagram-Login-Token** (Standard): nur `INSTAGRAM_ACCESS_TOKEN` setzen,
 *   die Posts kommen von `graph.instagram.com/me/media`.
 * - **Facebook-Login-Token** (Token gehört zu einer Facebook-Seite, mit der der
 *   Instagram-Account verknüpft ist): zusätzlich `INSTAGRAM_USER_ID` mit der
 *   IG-Business-Account-ID setzen, dann läuft die Abfrage über
 *   `graph.facebook.com/v21.0/<id>/media`.
 *
 * Ohne Token liefert die Funktion eine leere Liste – die Seite bleibt heil,
 * der Feed wird einfach nicht gerendert. Gleiches Verhalten wie bei Stripe,
 * Resend und Mailchimp.
 *
 * **Der Token läuft nach 60 Tagen ab** und muss verlängert werden, sonst ist
 * der Feed still weg. Siehe `refreshInstagramToken()` und README.
 */

export type InstagramPost = {
  id: string
  caption?: string
  mediaType: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
  /** Bei Videos das Vorschaubild, sonst das Bild selbst. */
  imageUrl: string
  permalink: string
  timestamp: string
}

type ApiMedia = {
  id: string
  caption?: string
  media_type: InstagramPost['mediaType']
  media_url?: string
  thumbnail_url?: string
  permalink: string
  timestamp: string
}

const FIELDS = 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp'

/** Wie lange Next die Antwort cached, bevor neu abgefragt wird (1 Stunde). */
const REVALIDATE_SECONDS = 3600

function endpoint(token: string, limit: number) {
  const userId = process.env.INSTAGRAM_USER_ID
  const base = userId
    ? `https://graph.facebook.com/v21.0/${userId}/media`
    : 'https://graph.instagram.com/me/media'
  return `${base}?fields=${FIELDS}&limit=${limit}&access_token=${encodeURIComponent(token)}`
}

/**
 * Die letzten Posts. Wirft nicht – im Fehlerfall gibt es eine leere Liste und
 * einen Log-Eintrag, damit ein abgelaufener Token nicht die ganze Seite kippt.
 */
export async function getInstagramPosts(limit = 6): Promise<InstagramPost[]> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN
  if (!token) return []

  try {
    const res = await fetch(endpoint(token, limit), {
      next: { revalidate: REVALIDATE_SECONDS },
    })

    if (!res.ok) {
      const detail = await res.text()
      console.error('[Instagram] Abruf fehlgeschlagen', res.status, detail.slice(0, 300))
      return []
    }

    const data = (await res.json()) as { data?: ApiMedia[] }

    return (data.data ?? []).map((item) => ({
      id: item.id,
      caption: item.caption,
      mediaType: item.media_type,
      imageUrl: item.media_type === 'VIDEO' ? (item.thumbnail_url ?? '') : (item.media_url ?? ''),
      permalink: item.permalink,
      timestamp: item.timestamp,
    })).filter((post) => post.imageUrl !== '')
  } catch (error) {
    console.error('[Instagram] Abruf fehlgeschlagen', error)
    return []
  }
}

/**
 * Verlängert einen langlebigen Instagram-Login-Token um 60 Tage. Der Token muss
 * mindestens 24 Stunden alt sein. Gibt den **neuen** Token zurück – der muss
 * danach von Hand in die Umgebungsvariablen eingetragen werden, ein laufender
 * Prozess kann seine eigenen Env-Werte nicht überschreiben.
 *
 * Wird von `/api/instagram/refresh` aufgerufen.
 */
export async function refreshInstagramToken(): Promise<{ token: string; expiresIn: number } | null> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN
  if (!token) return null

  const url =
    'https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token' +
    `&access_token=${encodeURIComponent(token)}`

  const res = await fetch(url, { cache: 'no-store' })
  if (!res.ok) {
    console.error('[Instagram] Token-Verlängerung fehlgeschlagen', res.status, (await res.text()).slice(0, 300))
    return null
  }

  const data = (await res.json()) as { access_token: string; expires_in: number }
  return { token: data.access_token, expiresIn: data.expires_in }
}

/** Erste Zeile der Caption, gekürzt – als Titel für Blog-Kacheln. */
export function captionTitle(caption: string | undefined, maxLength = 80) {
  if (!caption) return ''
  const firstLine = caption.split('\n').find((line) => line.trim().length > 0)?.trim() ?? ''
  const withoutHashtags = firstLine.replace(/#\S+/g, '').replace(/\s+/g, ' ').trim()
  const text = withoutHashtags || firstLine
  return text.length > maxLength ? `${text.slice(0, maxLength).trimEnd()}…` : text
}
