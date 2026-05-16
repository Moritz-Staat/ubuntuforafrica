import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { z } from 'zod'

const schema = z.object({
  amount: z.number().int().min(1).max(100000), // cents
  locale: z.enum(['de', 'en']).default('de'),
})

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'

export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 503 })
  }

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

  const { amount, locale } = parsed.data
  const amountEur = amount / 100
  const stripe = getStripe()

  const productName =
    locale === 'en'
      ? `Donation Ubuntu for Africa – ${amountEur} €`
      : `Spende Ubuntu for Africa – ${amountEur} €`

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card', 'sepa_debit', 'paypal'],
    line_items: [
      {
        price_data: {
          currency: 'eur',
          product_data: {
            name: productName,
            description:
              locale === 'en'
                ? 'Your donation supports children and families in Imizamo Yethu, Hout Bay, Cape Town.'
                : 'Deine Spende unterstützt Kinder und Familien in Imizamo Yethu, Hout Bay, Kapstadt.',
            images: [`${BASE_URL}/ubuntu-logo.png`],
          },
          unit_amount: amount,
        },
        quantity: 1,
      },
    ],
    payment_intent_data: {
      metadata: {
        source: 'ubuntuforafrica.com',
        amount_eur: String(amountEur),
      },
    },
    success_url: `${BASE_URL}/${locale}/spenden?success=1`,
    cancel_url: `${BASE_URL}/${locale}/spenden?canceled=1`,
    locale: locale === 'en' ? 'en' : 'de',
  })

  return NextResponse.json({ url: session.url })
}
