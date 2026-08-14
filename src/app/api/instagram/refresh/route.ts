import { NextRequest, NextResponse } from 'next/server'
import { refreshInstagramToken } from '@/lib/instagram'

/**
 * Verlängert den Instagram-Token um 60 Tage.
 *
 * Aufruf: `GET /api/instagram/refresh?secret=<INSTAGRAM_REFRESH_SECRET>`
 *
 * Der neue Token steht in der Antwort und muss **von Hand** in die
 * Umgebungsvariablen (Vercel und `.env.local` auf dem Testserver) eingetragen
 * werden – eine laufende Instanz kann ihre eigenen Env-Werte nicht ändern.
 *
 * Ohne gesetztes `INSTAGRAM_REFRESH_SECRET` antwortet die Route mit 404: sonst
 * könnte jeder den Token-Umlauf auslösen.
 */
export async function GET(req: NextRequest) {
  const secret = process.env.INSTAGRAM_REFRESH_SECRET
  if (!secret) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  if (req.nextUrl.searchParams.get('secret') !== secret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const result = await refreshInstagramToken()
  if (!result) {
    return NextResponse.json({ error: 'Refresh failed – siehe Server-Logs' }, { status: 502 })
  }

  const daysValid = Math.round(result.expiresIn / 86400)
  return NextResponse.json({
    ok: true,
    hinweis: 'Neuen Token in Vercel unter INSTAGRAM_ACCESS_TOKEN eintragen und neu deployen.',
    gueltig_bis_in_tagen: daysValid,
    access_token: result.token,
  })
}
