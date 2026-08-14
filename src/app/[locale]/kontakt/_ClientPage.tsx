'use client'

// This file replaces the original page.tsx content.
// It must be saved on the server as:
//   src/app/[locale]/kontakt/_ClientPage.tsx
// The new server page.tsx (seo_kontakt_page.tsx) imports and renders this.

import { useState } from 'react'
import { useLocale } from 'next-intl'
import {
  CONTACT_EMAIL,
  CONTACT_ROUTING,
  RECEIPT_EMAIL,
  VOLUNTEER_EMAIL,
  isContactCategory,
  mailto,
} from '@/lib/site-config'
import { PH, PHLabel } from '@/components/Placeholder'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function KontaktClientPage() {
  const locale = useLocale()
  const t = (de: string, en: string) => locale === 'en' ? en : de

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const data = await res.json() as { error?: string }
        throw new Error(data.error ?? 'Unknown error')
      }

      setStatus('success')
    } catch (err) {
      console.error(err)
      setErrorMsg(
        t(
          'Deine Nachricht konnte nicht gesendet werden. Bitte versuche es später erneut.',
          'Your message could not be sent. Please try again later.'
        )
      )
      setStatus('error')
    }
  }

  // Kategorien und Empfänger kommen aus derselben Tabelle wie in /api/contact.
  const subjectOptions = Object.entries(CONTACT_ROUTING).map(([value, route]) => ({
    value,
    label: locale === 'en' ? route.label_en : route.label_de,
    email: route.email,
  }))

  const selectedRoute = isContactCategory(formData.subject)
    ? CONTACT_ROUTING[formData.subject]
    : null

  return (
    <>
      <section className="py-32 bg-[#212529] text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-[#f7a900] text-sm font-semibold uppercase tracking-widest mb-4">
            {t('Wir freuen uns von dir zu hören', 'We look forward to hearing from you')}
          </p>
          <h1 className="text-5xl font-bold mb-6 md:text-6xl">{t('Kontakt', 'Contact')}</h1>
          <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
            {t(
              'Ob Fragen zum Freiwilligenprogramm, zur Spende oder einfach Interesse an unserer Arbeit – wir antworten gerne.',
              'Whether you have questions about the volunteer programme, donations or simply want to learn more about our work – we are happy to respond.'
            )}
          </p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-2xl p-10 shadow-sm">
              <h2 className="text-2xl font-bold text-[#212529] mb-8">
                {t('Nachricht senden', 'Send a message')}
              </h2>
              {status === 'success' ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-[#11aed1]/10 flex items-center justify-center mx-auto mb-6 text-3xl">
                    ✅
                  </div>
                  <h3 className="text-xl font-bold text-[#212529] mb-2">{t('Vielen Dank!', 'Thank you!')}</h3>
                  <p className="text-gray-600">
                    {t(
                      'Deine Nachricht wurde gesendet. Wir melden uns so schnell wie möglich bei dir.',
                      'Your message has been sent. We will get back to you as soon as possible.'
                    )}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-[#212529] mb-2">
                        {t('Name', 'Name')} *
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        disabled={status === 'loading'}
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-[#212529] focus:border-[#11aed1] focus:outline-none focus:ring-2 focus:ring-[#11aed1]/20 transition-all disabled:opacity-60"
                        placeholder={t('Dein Name', 'Your name')}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-[#212529] mb-2">
                        {t('E-Mail', 'Email')} *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        disabled={status === 'loading'}
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-[#212529] focus:border-[#11aed1] focus:outline-none focus:ring-2 focus:ring-[#11aed1]/20 transition-all disabled:opacity-60"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-[#212529] mb-2">
                      {t('Thema', 'Topic')} *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      disabled={status === 'loading'}
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-[#212529] focus:border-[#11aed1] focus:outline-none focus:ring-2 focus:ring-[#11aed1]/20 transition-all bg-white disabled:opacity-60"
                    >
                      <option value="">{t('Bitte wählen...', 'Please select...')}</option>
                      {subjectOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                    <p className="mt-2 text-xs text-gray-500">
                      {selectedRoute
                        ? <>
                            {t('Deine Nachricht geht direkt an ', 'Your message goes directly to ')}
                            <span className="font-semibold text-[#212529]">{selectedRoute.email}</span>
                          </>
                        : t(
                            'Je nach Thema landet deine Nachricht direkt bei der richtigen Ansprechperson.',
                            'Depending on the topic your message goes straight to the right person.'
                          )}
                    </p>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-[#212529] mb-2">
                      {t('Nachricht', 'Message')} *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      disabled={status === 'loading'}
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-[#212529] focus:border-[#11aed1] focus:outline-none focus:ring-2 focus:ring-[#11aed1]/20 transition-all resize-none disabled:opacity-60"
                      placeholder={t('Deine Nachricht...', 'Your message...')}
                    />
                  </div>
                  {status === 'error' && (
                    <p className="text-red-600 text-sm rounded-lg bg-red-50 px-4 py-3">{errorMsg}</p>
                  )}
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full rounded-full bg-[#11aed1] py-4 font-semibold text-white hover:bg-[#0e8fb5] transition-colors shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'loading'
                      ? t('Wird gesendet...', 'Sending...')
                      : t('Nachricht senden', 'Send message')}
                  </button>
                  <p className="text-xs text-gray-400 text-center">
                    {t(
                      'Mit dem Absenden stimmst du unserer Datenschutzerklärung zu.',
                      'By submitting you agree to our privacy policy.'
                    )}
                  </p>
                </form>
              )}
            </div>

            <div className="space-y-8">
              <div>
                <p className="text-[#11aed1] text-sm font-semibold uppercase tracking-widest mb-4">
                  {t('Direkt erreichen', 'Direct contact')}
                </p>
                <h2 className="text-3xl font-bold text-[#212529] mb-6">
                  {t('Kontaktinformationen', 'Contact information')}
                </h2>
                <div className="space-y-6">
                  {[
                    {
                      icon: '📧',
                      label: t('E-Mail (Allgemein)', 'Email (General)'),
                      value: CONTACT_EMAIL,
                      href: mailto(CONTACT_EMAIL),
                    },
                    {
                      icon: '📧',
                      label: t('E-Mail (Freiwillige & Praktikum)', 'Email (Volunteers & internships)'),
                      value: VOLUNTEER_EMAIL,
                      href: mailto(VOLUNTEER_EMAIL),
                    },
                    {
                      icon: '🧾',
                      label: t('E-Mail (Spendenquittung)', 'Email (Donation receipt)'),
                      value: RECEIPT_EMAIL,
                      href: mailto(RECEIPT_EMAIL, locale === 'en' ? 'Donation receipt' : 'Spendenquittung'),
                    },
                    {
                      icon: '📍',
                      label: t('Projektstandort', 'Project location'),
                      value: 'Imizamo Yethu, Hout Bay, Cape Town, South Africa',
                    },
                    {
                      icon: '🏛️',
                      label: t('Vereinssitz', 'Registered office'),
                      value: t(
                        'Deutschland (eingetragener gemeinnütziger Verein)',
                        'Germany (registered non-profit association)'
                      ),
                    },
                  ].map((item) => (
                    <div key={item.label} className="flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#11aed1]/10 flex items-center justify-center text-xl shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-0.5">{item.label}</p>
                        {item.href ? (
                          <a href={item.href} className="text-[#212529] font-semibold hover:text-[#11aed1] transition-colors">
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-[#212529] font-semibold">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#11aed1]/5 rounded-2xl p-8 border border-[#11aed1]/10">
                <h3 className="font-bold text-[#212529] mb-4">
                  {t('Häufige Fragen', 'Frequently asked questions')}
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      q: t('Wie schnell bekomme ich eine Antwort?', 'How quickly will I get a response?'),
                      a: t('In der Regel innerhalb von 3–5 Werktagen.', 'Usually within 3–5 working days.'),
                    },
                    {
                      q: t('Wann kann ich als Freiwillige:r starten?', 'When can I start as a volunteer?'),
                      a: t(
                        'Zu Beginn jedes Quartals – nach individueller Absprache.',
                        'At the start of each quarter – after individual consultation.'
                      ),
                    },
                  ].map((faq) => (
                    <div key={faq.q}>
                      <p className="font-semibold text-[#212529] text-sm mb-1">{faq.q}</p>
                      <p className="text-sm" style={PH}>
                        <PHLabel />
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
