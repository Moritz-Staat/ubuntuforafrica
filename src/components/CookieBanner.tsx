'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'

const STORAGE_KEY = 'cookie_consent'

export default function CookieBanner() {
  const locale = useLocale()
  const t = (de: string, en: string) => locale === 'en' ? en : de
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY)
    if (!consent) setVisible(true)
  }, [])

  function accept() {
    localStorage.setItem(STORAGE_KEY, 'accepted')
    setVisible(false)
  }

  function decline() {
    localStorage.setItem(STORAGE_KEY, 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label={t('Cookie-Einstellungen', 'Cookie settings')}
      className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
    >
      <div className="mx-auto max-w-4xl bg-[#212529] text-white rounded-2xl shadow-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
        <div className="flex-1 text-sm leading-relaxed">
          <p className="font-semibold mb-1">
            {t('Diese Website verwendet Cookies', 'This website uses cookies')}
          </p>
          <p className="text-gray-300 text-xs">
            {t(
              'Wir nutzen technisch notwendige Cookies. Beim Spenden werden Cookies von Stripe gesetzt. Keine Tracking- oder Werbe-Cookies.',
              'We use technically necessary cookies. When donating, cookies are set by Stripe. No tracking or advertising cookies.'
            )}{' '}
            <Link
              href={`/${locale}/datenschutz`}
              className="text-[#11aed1] hover:underline"
            >
              {t('Mehr erfahren', 'Learn more')}
            </Link>
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={decline}
            className="rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold hover:bg-white/10 transition-colors"
          >
            {t('Ablehnen', 'Decline')}
          </button>
          <button
            onClick={accept}
            className="rounded-full bg-[#11aed1] px-5 py-2.5 text-sm font-semibold hover:bg-[#0e8fb5] transition-colors"
          >
            {t('Akzeptieren', 'Accept')}
          </button>
        </div>
      </div>
    </div>
  )
}
