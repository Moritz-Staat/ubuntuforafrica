import type { Metadata } from 'next'
import { Link } from '@/i18n/routing'
import { PH, PHInline, PHLabel } from '@/components/Placeholder'
import { CONTACT_EMAIL, mailto } from '@/lib/site-config'

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params
  const isEn = locale === 'en'
  return {
    title: isEn ? 'Become a Supporting Partner | Ubuntu for Africa' : 'Förderpartner werden | Ubuntu for Africa',
    description: isEn
      ? 'Support our work in Imizamo Yethu long-term as a company, club or private supporting partner.'
      : 'Unterstütze unsere Arbeit in Imizamo Yethu langfristig als Unternehmen, Verein oder privater Förderpartner.',
    openGraph: {
      title: isEn ? 'Become a Supporting Partner | Ubuntu for Africa' : 'Förderpartner werden | Ubuntu for Africa',
      images: [{ url: 'https://ubuntuforafrica.com/images/Ubuntu_Logo.png' }],
    },
  }
}

export default async function FoerderpartnerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params
  const t = (de: string, en: string) => (locale === 'en' ? en : de)

  const steps = [
    {
      title: t('Kennenlernen', 'Getting to know each other'),
      body: t(
        'Du meldest dich bei uns und wir besprechen, was zu dir oder deinem Unternehmen passt.',
        'You get in touch and we discuss what suits you or your company.',
      ),
    },
    {
      title: t('Fördervereinbarung', 'Partnership agreement'),
      body: t(
        'Wir halten Laufzeit, Höhe und Verwendung des Beitrags schriftlich fest.',
        'We put duration, amount and use of the contribution in writing.',
      ),
    },
    {
      title: t('Regelmäßige Berichte', 'Regular reports'),
      body: t(
        'Du bekommst Berichte darüber, was mit deiner Unterstützung vor Ort passiert ist.',
        'You receive reports on what your support achieved on the ground.',
      ),
    },
  ]

  return (
    <main>
      {/* Hero */}
      <section className="bg-[#212529] text-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">
            {t('Jetzt Förderpartner werden', 'Become a Supporting Partner')}
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {t(
              'Verlässliche Unterstützung, die unsere Arbeit in Imizamo Yethu planbar macht.',
              'Reliable support that makes our work in Imizamo Yethu plannable.',
            )}
          </p>
        </div>
      </section>

      {/* Was ist ein Foerderpartner */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-[#212529]">
            {t('Was ist eine Förderpartnerschaft?', 'What is a supporting partnership?')}
          </h2>
          <div style={PH}>
            <PHLabel />
            <p className="text-lg text-gray-700 leading-relaxed">
              {t(
                'Als Förderpartner unterstützt du uns nicht einmalig, sondern über einen längeren Zeitraum. Das gibt uns Planungssicherheit für Projekte, die nicht nach wenigen Wochen enden — Bildung und verlässliche Betreuung brauchen Kontinuität. Förderpartner können Unternehmen, Vereine, Stiftungen oder Privatpersonen sein.',
                'As a supporting partner you back us over a longer period rather than with a one-off gift. That gives us planning certainty for projects that do not end after a few weeks — education and reliable care need continuity. Supporting partners can be companies, clubs, foundations or private individuals.',
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Ablauf */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-[#212529] text-center">
            {t('So läuft es ab', 'How it works')}
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((step, i) => (
              <div key={step.title} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-[#11aed1] text-white font-bold flex items-center justify-center mb-4">
                  {i + 1}
                </div>
                <h3 className="font-bold text-lg mb-2 text-[#212529]">{step.title}</h3>
                <p className="text-gray-700" style={PHInline}>{step.body}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-center text-gray-500 mt-8">
            <PHLabel />
            {t(
              'Ablauf, Laufzeiten und Gegenleistungen sind noch nicht mit dem Verein abgestimmt.',
              'Process, terms and benefits have not yet been agreed with the association.',
            )}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-[#212529]">
            {t('Interesse?', 'Interested?')}
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            {t(
              'Schreib uns — wir melden uns und besprechen alles Weitere persönlich.',
              'Write to us — we will get back to you and discuss the details personally.',
            )}
          </p>
          <a
            href={mailto(CONTACT_EMAIL, locale === 'en' ? 'Supporting Partnership' : 'Förderpartnerschaft')}
            className="inline-block bg-[#f7a900] text-[#212529] font-bold px-8 py-4 rounded-full hover:bg-[#e09800] transition-colors duration-200"
          >
            {t('Förderpartner werden', 'Become a supporting partner')}
          </a>
          <p className="mt-6 text-gray-600">
            {t('Lieber einmalig spenden? ', 'Prefer a one-off donation? ')}
            <Link href="/spenden" className="text-[#11aed1] hover:underline font-medium">
              {t('Zur Spendenseite', 'To the donation page')}
            </Link>
          </p>
        </div>
      </section>
    </main>
  )
}
