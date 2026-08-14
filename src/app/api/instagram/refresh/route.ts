import { timingSafeEqual } from 'node:crypto'
import { NextRequest, NextResponse } from 'next/server'
import { refreshInstagramToken } from '@/lib/instagram'

/**
 * Verlängert den Instagram-Token um 60 Tage.
 *
 * Aufruf (Secret im Header, nicht in der URL – Query-Strings landen in
 * Zugriffs-Logs und im Browser-Verlauf):
 *
 * ```
 * curl -X POST https://.../api/instagram/refresh \
 *   -H "Authorization: Bearer $INSTAGRAM_REFRESH_SECRET"
 * ```
 *
 * Die Antwort enthält den **neuen** Token. Der muss von Hand in Vercel unter
 * `INSTAGRAM_ACCESS_TOKEN` eingetragen werden – eine laufende Instanz kann ihre
 * eigenen Env-Werte nicht ändern. Antwort deshalb `no-store` und nur über
 * HTTPS abrufen.
 *
 * Ohne gesetztes `INSTAGRAM_REFRESH_SECRET` antwortet die Route mit 404.
 */

const noStore = { 'Cache-Control': 'no-store, max-age=0' }

function secretMatches(provided: string, expected: string) {
  const a = Buffer.from(provided)
  const b = Buffer.from(expected)
  // timingSafeEqual verlangt gleiche Länge – Länge selbst ist kein Geheimnis.
  return a.length === b.length && timingSafeEqual(a, b)
}

export async function POST(req: NextRequest) {
  const expected = process.env.INSTAGRAM_REFRESH_SECRET
  if (!expected) {
    return NextResponse.json({ error: 'Not found' }, { status: 404, headers: noStore })
  }

  const header = req.headers.get('authorization') ?? ''
  const provided = header.startsWith('Bearer ') ? header.slice(7) : ''
  if (!provided || !secretMatches(provided, expected)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: noStore })
  }

  const result = await refreshInstagramToken()
  if (!result) {
    return NextResponse.json(
      { error: 'Refresh fehlgeschlagen – siehe Server-Logs' },
      { status: 502, headers: noStore }
    )
  }

  return NextResponse.json(
    {
      ok: true,
      hinweis: 'Neuen Token in Vercel unter INSTAGRAM_ACCESS_TOKEN eintragen und neu deployen.',
      gueltig_noch_tage: Math.round(result.expiresIn / 86400),
      access_token: result.token,
    },
    { headers: noStore }
  )
}

/** GET nur als Hinweis, damit niemand das Secret in die URL schreibt. */
export async function GET() {
  if (!process.env.INSTAGRAM_REFRESH_SECRET) {
    return NextResponse.json({ error: 'Not found' }, { status: 404, headers: noStore })
  }
  return NextResponse.json(
    { error: 'Nur POST mit "Authorization: Bearer <secret>"' },
    { status: 405, headers: noStore }
  )
}
