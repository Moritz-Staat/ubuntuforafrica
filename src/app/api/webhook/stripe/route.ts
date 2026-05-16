import { NextRequest, NextResponse } from 'next/server'
import { getStripe, Stripe } from '@/lib/stripe'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!webhookSecret || !process.env.STRIPE_SECRET_KEY) {
    console.error('[Stripe Webhook] Not configured')
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 503 })
  }

  const signature = req.headers.get('stripe-signature')
  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 })
  }

  const rawBody = await req.text()
  const stripe = getStripe()

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret)
  } catch (err) {
    console.error('[Stripe Webhook] Signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      console.log('[Stripe] Checkout completed:', {
        id: session.id,
        amount: session.amount_total,
        currency: session.currency,
        customer_email: session.customer_details?.email,
      })
      // TODO: send confirmation email via Resend, update Sanity donation counter
      break
    }

    case 'payment_intent.succeeded': {
      const intent = event.data.object as Stripe.PaymentIntent
      console.log('[Stripe] Payment succeeded:', {
        id: intent.id,
        amount: intent.amount,
        currency: intent.currency,
      })
      break
    }

    case 'payment_intent.payment_failed': {
      const intent = event.data.object as Stripe.PaymentIntent
      console.error('[Stripe] Payment failed:', intent.last_payment_error?.message)
      break
    }

    default:
      console.log('[Stripe Webhook] Unhandled event type:', event.type)
  }

  return NextResponse.json({ received: true })
}
