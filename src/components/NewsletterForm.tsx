'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/routing'

export default function NewsletterForm() {
  const t = useTranslations('newsletter')
  const locale = useLocale()
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!consent) return
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // locale steuert die Sprache der Mailchimp-Kontakte
        body: JSON.stringify({ email, locale }),
      })
      setStatus(res.ok ? 'success' : 'error')
      if (res.ok) setEmail('')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return <p className="text-sm font-medium text-[#11aed1]">{t('success')}</p>
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="flex gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('placeholder')}
          aria-label={t('placeholder')}
          className="flex-1 min-w-0 px-4 py-2.5 rounded-full border border-gray-600 bg-transparent text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#11aed1]"
        />
        <button
          type="submit"
          disabled={status === 'loading' || !consent}
          className="shrink-0 bg-[#11aed1] text-white font-semibold px-5 py-2.5 rounded-full text-sm hover:bg-[#0d8ba8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? '…' : t('button')}
        </button>
      </div>

      <label className="flex items-start gap-2 text-xs text-gray-400 cursor-pointer">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 accent-[#11aed1]"
        />
        <span>
          {t('consent')}{' '}
          <Link href="/datenschutz" className="underline hover:text-[#11aed1]">
            {t('privacy_link')}
          </Link>
        </span>
      </label>

      {status === 'error' && (
        <p role="alert" className="text-red-400 text-xs">{t('error')}</p>
      )}
    </form>
  )
}
