'use client'

// This file replaces the original page.tsx content.
// It must be saved on the server as:
//   src/app/[locale]/spenden/_ClientPage.tsx
// The new server page.tsx (seo_spenden_page.tsx) imports and renders this.

import { useState } from 'react'
import { useLocale } from 'next-intl'
import { Link } from '@/i18n/routing'

type LoadingKey = number | 'custom' | null

export default function SpendenClientPage() {
  const locale = useLocale()
  const t = (de: string, en: string) => locale === 'en' ? en : de

  const [loadingKey, setLoadingKey] = useState<LoadingKey>(null)
  const [customAmount, setCustomAmount] = useState('')
  const [error, setError] = useState('')

  const amounts = [
    {
      amount: 10,
      label: '10 €',
      impact: t('Deckt eine Woche Aftercare-Material', 'Covers one week of aftercare materials'),
      color: '#11aed1',
    },
    {
      amount: 25,
      label: '25 €',
      impact: t('Ermöglicht 1 Monat Schulpatenschaft', 'Enables 1 month school sponsorship'),
      color: '#ae64fd',
    },
    {
      amount: 50,
      label: '50 €',
      impact: t('Finanziert ein Yoga-/Therapieprogramm', 'Funds a yoga/therapy program'),
      color: '#f7a900',
    },
    {
      amount: 100,
      label: '100 €',
      impact: t('Trägt zum Container-Bau bei', 'Contributes to container construction'),
      color: '#11aed1',
    },
  ]

  async function startCheckout(amountEur: number, key: LoadingKey) {
    setLoadingKey(key)
    setError('')
    try {
      const res = await fetch('/api/donate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: amountEur * 100, locale }),
      })
      const data = await res.json() as { url?: string; error?: string }
      if (!res.ok || !data.url) {
        throw new Error(data.error ?? 'Stripe not configured')
      }
      window.location.href = data.url
    } catch (err) {
      console.error(err)
      setError(
        t(
          'Online-Zahlung aktuell nicht verfügbar. Bitte nutze die Banküberweisung.',
          'Online payment currently unavailable. Please use bank transfer.'
        )
      )
      setLoadingKey(null)
    }
  }

  function handleCustomDonate() {
    const val = parseFloat(customAmount.replace(',', '.'))
    if (!val || val < 1) {
      setError(t('Bitte gib einen Betrag von mindestens 1 € ein.', 'Please enter an amount of at least €1.'))
      return
    }
    startCheckout(Math.round(val), 'custom')
  }

  return (
    <>
      <section className="py-32 bg-[#11aed1] text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest mb-4 text-white/70">
            {t('Jetzt helfen', 'Help now')}
          </p>
          <h1 className="text-5xl font-bold mb-6 md:text-6xl">{t('Spenden', 'Donate')}</h1>
          <p className="text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
            {t(
              'Mit deiner Spende hilfst du direkt dabei, Kindern und Jugendlichen in Südafrika neue Chancen zu eröffnen. Jeder Euro kommt ohne Umwege bei unserer südafrikanischen Partner-NGO an.',
              'Your donation directly helps open up new opportunities for children and young people in South Africa. Every euro reaches our South African partner NGO without detours.'
            )}
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-[#212529] mb-6">
              {t('Was deine Spende bewirkt', 'What your donation achieves')}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {amounts.map((item) => (
              <div
                key={item.amount}
                className="rounded-2xl border-2 p-8 hover:shadow-lg transition-all hover:-translate-y-1 flex flex-col"
                style={{ borderColor: item.color + '30' }}
              >
                <p className="text-4xl font-bold mb-3" style={{ color: item.color }}>
                  {item.label}
                </p>
                <p className="text-gray-700 leading-relaxed flex-1">{item.impact}</p>
                <button
                  onClick={() => startCheckout(item.amount, item.amount)}
                  disabled={loadingKey !== null}
                  className="mt-6 w-full rounded-full py-3 font-semibold text-white transition-all disabled:opacity-60 disabled:cursor-not-allowed hover:opacity-90"
                  style={{ backgroundColor: item.color }}
                >
                  {loadingKey === item.amount
                    ? t('Weiterleitung...', 'Redirecting...')
                    : t(`${item.label} spenden`, `Donate ${item.label}`)}
                </button>
              </div>
            ))}
          </div>

          {/* Custom amount */}
          <div className="mt-10 bg-gray-50 rounded-2xl p-8 border border-gray-100">
            <h3 className="text-xl font-bold text-[#212529] mb-4">
              {t('Anderen Betrag eingeben', 'Enter a different amount')}
            </h3>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">€</span>
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  placeholder="25"
                  className="w-full rounded-xl border border-gray-200 pl-9 pr-4 py-3 text-[#212529] focus:border-[#11aed1] focus:outline-none focus:ring-2 focus:ring-[#11aed1]/20 transition-all"
                />
              </div>
              <button
                onClick={handleCustomDonate}
                disabled={loadingKey !== null}
                className="rounded-full bg-[#11aed1] px-8 py-3 font-semibold text-white hover:bg-[#0e8fb5] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loadingKey === 'custom'
                  ? t('Weiterleitung...', 'Redirecting...')
                  : t('Spenden', 'Donate')}
              </button>
            </div>
            {error && (
              <p className="mt-3 text-sm text-red-600 bg-red-50 rounded-lg px-4 py-2">{error}</p>
            )}
            <p className="mt-3 text-xs text-gray-400">
              {t(
                'Zahlung per Kreditkarte, PayPal oder SEPA-Lastschrift über Stripe.',
                'Payment by credit card, PayPal or SEPA direct debit via Stripe.'
              )}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-3xl px-6">
          <div className="text-center mb-12">
            <p className="text-[#11aed1] text-sm font-semibold uppercase tracking-widest mb-3">
              {t('Banküberweisung', 'Bank Transfer')}
            </p>
            <h2 className="text-4xl font-bold text-[#212529]">{t('Spende überweisen', 'Transfer a donation')}</h2>
          </div>
          <div className="bg-white rounded-2xl p-10 shadow-sm">
            <div className="space-y-6">
              <div className="border-b border-gray-100 pb-5">
                <p className="text-sm text-gray-500 mb-1">{t('Empfänger', 'Recipient')}</p>
                <p className="font-semibold text-[#212529] text-lg">
                  UBUNTU for Africa Kinder, Jugend- und Familienhilfe e.V.
                </p>
              </div>
              <div className="border-b border-gray-100 pb-5">
                <p className="text-sm text-gray-500 mb-1">IBAN</p>
                <p className="font-mono font-semibold text-[#212529] text-lg tracking-wider">
                  {t('wird in Kürze veröffentlicht', 'to be published shortly')}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">{t('Verwendungszweck', 'Reference')}</p>
                <p className="font-semibold text-[#212529]">{t('Spende Ubuntu for Africa', 'Donation Ubuntu for Africa')}</p>
              </div>
            </div>
            <div className="mt-8 p-5 bg-[#11aed1]/5 rounded-xl border border-[#11aed1]/20">
              <p className="text-sm text-gray-600 leading-relaxed">
                <span className="font-semibold text-[#11aed1]">
                  {t('Spendenquittung:', 'Donation receipt:')}
                </span>{' '}
                {t(
                  'Als gemeinnütziger Verein stellen wir gerne Spendenquittungen aus. Bitte sende uns dazu eine E-Mail an',
                  'As a registered non-profit we are happy to issue donation receipts. Please send an email to'
                )}{' '}
                <a href="mailto:pauline.schmiel@gmail.com" className="text-[#11aed1] hover:underline font-medium">
                  pauline.schmiel@gmail.com
                </a>{' '}
                {t('mit deiner Postadresse.', 'with your postal address.')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-[#11aed1] text-sm font-semibold uppercase tracking-widest mb-3">
            {t('Transparenz', 'Transparency')}
          </p>
          <h2 className="text-4xl font-bold text-[#212529] mb-6">
            {t('100 % direkt vor Ort', '100 % directly on the ground')}
          </h2>
          <p className="text-gray-600 leading-relaxed text-lg max-w-2xl mx-auto mb-10">
            {t(
              'Jeder Euro deiner Spende kommt ohne Umwege bei unserer südafrikanischen Partner-NGO an. Wir arbeiten ehrenamtlich – kein Geld fließt in Verwaltungsgehälter in Deutschland.',
              'Every euro of your donation reaches our South African partner NGO directly. We work on a voluntary basis – no money goes into administrative salaries in Germany.'
            )}
          </p>
          <div className="grid grid-cols-3 gap-8">
            {[
              { value: '100%', label: t('Direkt in Projekte', 'Directly into projects') },
              { value: '0 €', label: t('Verwaltungsgehälter', 'Administrative salaries') },
              { value: t('seit 2008', 'since 2008'), label: t('Erfahrung vor Ort', 'Experience on the ground') },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-bold text-[#11aed1] mb-1">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#212529]">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {t('Noch Fragen zur Spende?', 'Questions about donating?')}
          </h2>
          <p className="text-gray-400 mb-8">
            {t(
              'Wir helfen gerne weiter – ob zu Spendenquittungen, Patenschaften oder anderen Wegen zu helfen.',
              'We are happy to help – whether about donation receipts, sponsorships or other ways to contribute.'
            )}
          </p>
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-2 rounded-full bg-[#11aed1] text-white px-8 py-3 font-semibold hover:bg-[#0e8fb5] transition-colors"
          >
            {t('Kontakt aufnehmen', 'Get in touch')}
          </Link>
        </div>
      </section>
    </>
  )
}
