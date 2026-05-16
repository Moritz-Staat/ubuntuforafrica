import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(10).max(5000),
})

const RECIPIENT = process.env.CONTACT_EMAIL ?? 'pauline.schmiel@gmail.com'

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten() }, { status: 422 })
  }

  const { name, email, subject, message } = parsed.data

  const subjectLabels: Record<string, string> = {
    freiwillig: 'Freiwilligenprogramm',
    spenden: 'Spenden',
    patenschaft: 'Patenschaft',
    presse: 'Presse & Kooperationen',
    sonstiges: 'Sonstiges',
  }
  const subjectLabel = subjectLabels[subject] ?? subject

  if (!process.env.RESEND_API_KEY) {
    // Dev fallback: just log and return success
    console.log('[Contact Form]', { name, email, subject: subjectLabel, message })
    return NextResponse.json({ ok: true })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  const { error } = await resend.emails.send({
    from: 'Ubuntu for Africa <noreply@ubuntuforafrica.com>',
    to: RECIPIENT,
    replyTo: email,
    subject: `Kontaktanfrage: ${subjectLabel} – ${name}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
        <h2 style="color:#11aed1">Neue Kontaktanfrage – Ubuntu for Africa</h2>
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:8px 0;color:#666;width:120px">Name</td><td style="padding:8px 0;font-weight:600">${name}</td></tr>
          <tr><td style="padding:8px 0;color:#666">E-Mail</td><td style="padding:8px 0"><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding:8px 0;color:#666">Betreff</td><td style="padding:8px 0">${subjectLabel}</td></tr>
        </table>
        <hr style="margin:16px 0;border:none;border-top:1px solid #eee">
        <p style="white-space:pre-wrap;color:#212529">${message}</p>
      </div>
    `,
  })

  if (error) {
    console.error('[Resend error]', error)
    return NextResponse.json({ error: 'Email could not be sent' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
