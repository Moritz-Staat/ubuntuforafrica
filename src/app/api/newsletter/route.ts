import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import crypto from 'crypto'

const schema = z.object({
  email: z.string().email(),
  locale: z.enum(['de', 'en']).default('de'),
})

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed' }, { status: 422 })
  }

  const { email, locale } = parsed.data

  const apiKey = process.env.MAILCHIMP_API_KEY
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID

  if (!apiKey || !audienceId) {
    // Dev fallback
    console.log('[Newsletter] Would subscribe:', email, locale)
    return NextResponse.json({ ok: true })
  }

  // Mailchimp API key format: <key>-<datacenter>
  const datacenter = apiKey.split('-').pop()
  const emailHash = crypto.createHash('md5').update(email.toLowerCase()).digest('hex')
  const url = `https://${datacenter}.api.mailchimp.com/3.0/lists/${audienceId}/members/${emailHash}`

  const res = await fetch(url, {
    method: 'PUT', // upsert – re-subscribes if previously unsubscribed
    headers: {
      Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString('base64')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email_address: email,
      status_if_new: 'pending', // Double-Opt-In (DSGVO)
      status: 'pending',
      language: locale,
      merge_fields: {},
    }),
  })

  const data = await res.json() as { status?: string | number; title?: string }

  if (!res.ok) {
    console.error('[Mailchimp error]', data)
    // Already subscribed is not an error from the user's perspective
    if (data.title === 'Member Exists') {
      return NextResponse.json({ ok: true, already: true })
    }
    return NextResponse.json({ error: 'Newsletter subscription failed' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
