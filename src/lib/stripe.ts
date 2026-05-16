import Stripe from 'stripe';

// Lazy init so missing key doesn't crash module load
let _stripe: Stripe | null = null

export function getStripe(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not set')
  }
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-04-30.basil',
    })
  }
  return _stripe
}

// Keep named export for webhook route which needs raw stripe instance
export { Stripe }
