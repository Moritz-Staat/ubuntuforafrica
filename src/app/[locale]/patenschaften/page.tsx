import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params
  const isEn = locale === 'en'
  return {
    title: isEn ? 'Sponsorships | Ubuntu for Africa' : 'Patenschaften | Ubuntu for Africa',
    description: isEn
      ? 'Become a school sponsor for 25 per month and give a child in Imizamo Yethu access to education.'
      : 'Werde Schulpate fuer 25 im Monat und ermoeglche einem Kind in Imizamo Yethu Zugang zu Bildung.',
    openGraph: {
      title: isEn ? 'Sponsorships | Ubuntu for Africa' : 'Patenschaften | Ubuntu for Africa',
      images: [{ url: 'https://ubuntuforafrica.com/images/Ubuntu_Logo.png' }],
    },
  }
}

import { Link } from '@/i18n/routing';

const PH: React.CSSProperties = {
  backgroundColor: '#fef9c3',
  borderLeft: '4px solid #f59e0b',
  borderRadius: '4px',
  padding: '6px 10px',
  display: 'block',
}

const PHInline: React.CSSProperties = {
  backgroundColor: '#fef9c3',
  borderBottom: '2px solid #f59e0b',
  padding: '0 3px',
  borderRadius: '2px',
}

const PHLabel = () => (
  <span style={{ display: 'block', color: '#92400e', fontSize: '11px', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '4px' }}>
    ⚠ PLACEHOLDER – BITTE PRÜFEN / ERSETZEN
  </span>
)

export default async function PatenschaftenPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = (de: string, en: string) => (locale === 'en' ? en : de);

  return (
    <main>
      {/* Hero */}
      <section className="bg-[#212529] text-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">
            {t('Patenschaften', 'Sponsorships')}
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            <span style={{ ...PH, display: 'inline-block', color: '#212529' }} title="⚠ Placeholder">
              <PHLabel />
              {t(
                'Werde Pat:in und ermögliche Bildung.',
                'Become a sponsor and enable education.'
              )}
            </span>
          </p>
        </div>
      </section>

      {/* Sektion 1: Was ist eine Patenschaft? */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#212529] mb-6">
                {t('Was ist eine Schulpatenschaft?', 'What is a school sponsorship?')}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                {t(
                  'Für 25 € im Monat übernimmst du die Schulpatenschaft für ein Kind in Imizamo Yethu, Hout Bay. Das bedeutet: Du sicherst einem Kind regelmäßigen Zugang zu Lernmaterialien, qualifizierter Nachhilfe und der Unterstützung durch unser Team vor Ort.',
                  'For €25 per month you take on a school sponsorship for a child in Imizamo Yethu, Hout Bay. This means: you secure a child regular access to learning materials, qualified tutoring and the support of our on-the-ground team.'
                )}
              </p>
              <ul className="space-y-4">
                {[
                  t(
                    'Lernmaterialien (Hefte, Stifte, Bücher)',
                    'Learning materials (notebooks, pens, books)'
                  ),
                  t(
                    'Tägliche Hausaufgabenbetreuung im Aftercare',
                    'Daily homework support in the aftercare programme'
                  ),
                  t(
                    'Individuelle Förderung durch Freiwillige und lokale Fachkräfte',
                    'Individual support from volunteers and local professionals'
                  ),
                  t(
                    'Teilnahme an Ferienfreizeiten und Sonderprogrammen',
                    'Participation in holiday camps and special programmes'
                  ),
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1 w-5 h-5 rounded-full bg-[#11aed1] flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">
                      ✓
                    </span>
                    <span style={PHInline} title="⚠ Placeholder – bitte prüfen" className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#11aed1] rounded-2xl p-10 text-white text-center">
              <div className="text-7xl font-extrabold mb-2">25 €</div>
              <div className="text-xl font-medium mb-4">
                {t('pro Monat', 'per month')}
              </div>
              <p className="text-white/80 text-sm leading-relaxed">
                <span style={{ ...PH, color: '#212529', display: 'inline-block' }} title="⚠ Placeholder – bitte prüfen">
                  <PHLabel />
                  {t(
                    'Das entspricht weniger als einem Euro pro Tag – und verändert die Bildungschancen eines Kindes nachhaltig.',
                    "That is less than one euro per day – and sustainably changes a child's educational opportunities."
                  )}
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sektion 2: Wie funktioniert es? */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#212529] mb-4">
            {t('Wie funktioniert es?', 'How does it work?')}
          </h2>
          <p className="text-center text-gray-500 mb-14 max-w-2xl mx-auto">
            {t(
              'Eine Patenschaft beginnt ganz einfach – in drei Schritten.',
              'A sponsorship starts simply – in three steps.'
            )}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
              <div className="w-14 h-14 rounded-full bg-[#11aed1] text-white text-2xl font-bold flex items-center justify-center mx-auto mb-6">
                1
              </div>
              <h3 className="text-lg font-bold text-[#212529] mb-3">
                {t('Kontakt aufnehmen', 'Get in touch')}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                <span style={PH} title="⚠ Placeholder – bitte prüfen">
                  <PHLabel />
                  {t(
                    'Schreib uns über unser Kontaktformular oder per E-Mail. Kurz erklären, dass du Interesse an einer Patenschaft hast – fertig.',
                    "Write to us via our contact form or by email. Briefly explain that you are interested in a sponsorship – that's it."
                  )}
                </span>
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
              <div className="w-14 h-14 rounded-full bg-[#ae64fd] text-white text-2xl font-bold flex items-center justify-center mx-auto mb-6">
                2
              </div>
              <h3 className="text-lg font-bold text-[#212529] mb-3">
                {t('Wir stellen die Verbindung her', 'We make the connection')}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                <span style={PH} title="⚠ Placeholder – bitte prüfen">
                  <PHLabel />
                  {t(
                    'Unser Team in Deutschland koordiniert die Patenschaft und richtet den monatlichen Dauerauftrag ein. Du erhältst alle nötigen Bankdaten.',
                    'Our team in Germany coordinates the sponsorship and sets up the monthly standing order. You receive all the necessary bank details.'
                  )}
                </span>
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
              <div className="w-14 h-14 rounded-full bg-[#f7a900] text-white text-2xl font-bold flex items-center justify-center mx-auto mb-6">
                3
              </div>
              <h3 className="text-lg font-bold text-[#212529] mb-3">
                {t('Regelmäßige Updates', 'Regular updates')}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                <span style={PH} title="⚠ Placeholder – bitte prüfen">
                  <PHLabel />
                  {t(
                    'Du bekommst regelmäßig Berichte über die Projektarbeit – was deine Unterstützung bewirkt und wie sich das Programm entwickelt.',
                    'You will regularly receive reports about the project work – what your support achieves and how the programme is developing.'
                  )}
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sektion 3: DSGVO-Hinweis */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-[#212529] text-white rounded-2xl p-10">
            <div className="flex items-start gap-6">
              <div className="text-4xl flex-shrink-0">🔒</div>
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  {t('Datenschutz hat Priorität', 'Privacy comes first')}
                </h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  {t(
                    'Aus Datenschutzgründen (DSGVO) können wir keine personalisierten Kinderprofile mit echten Namen, genauen Altersangaben oder erkennbaren Fotos teilen. Der Schutz der Persönlichkeitsrechte der Kinder geht vor.',
                    'For data protection reasons (GDPR) we cannot share personalised child profiles with real names, exact ages or recognisable photos. Protecting the children\'s personal rights comes first.'
                  )}
                </p>
                <p className="text-gray-300 leading-relaxed">
                  {t(
                    'Stattdessen erhältst du regelmäßige Updates über die allgemeine Projektarbeit: Berichte aus dem Aftercare, Fotos vom Programm (ohne identifizierbare Kinder) und Einblicke in unsere tägliche Arbeit vor Ort.',
                    'Instead you receive regular updates about the general project work: reports from the aftercare, photos from the programme (without identifiable children) and insights into our daily on-the-ground work.'
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sektion 4: Andere Spendenmöglichkeiten */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#212529] mb-4">
            {t('Andere Wege zu helfen', 'Other ways to help')}
          </h2>
          <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
            {t(
              'Auch einmalige Spenden machen einen großen Unterschied – jeder Betrag hilft.',
              'One-off donations also make a big difference – every amount helps.'
            )}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                amount: '10 €',
                label: t(
                  'Deckt eine Woche Aftercare-Material',
                  'Covers one week of aftercare materials'
                ),
                color: '#11aed1',
              },
              {
                amount: '25 €',
                label: t(
                  'Ermöglicht 1 Monat Schulpatenschaft',
                  'Enables 1 month of school sponsorship'
                ),
                color: '#ae64fd',
              },
              {
                amount: '50 €',
                label: t(
                  'Finanziert ein Yoga-/Therapieprogramm',
                  'Funds a yoga/therapy programme'
                ),
                color: '#f7a900',
              },
              {
                amount: '100 €',
                label: t(
                  'Trägt zum Container-Bau bei',
                  'Contributes to container construction'
                ),
                color: '#212529',
              },
            ].map((item) => (
              <div
                key={item.amount}
                className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100"
              >
                <div
                  className="text-3xl font-extrabold mb-3"
                  style={{ color: item.color }}
                >
                  {item.amount}
                </div>
                <p className="text-gray-600 text-sm leading-snug">{item.label}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/spenden"
              className="inline-block bg-[#11aed1] text-white font-semibold px-10 py-4 rounded-full hover:bg-[#0e9bb9] transition-colors duration-200"
            >
              {t('Jetzt einmalig spenden', 'Make a one-off donation')}
            </Link>
          </div>
        </div>
      </section>

      {/* CTA: Kontaktformular-Banner */}
      <section className="py-24 bg-[#ae64fd] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            {t('Interesse an einer Patenschaft?', 'Interested in a sponsorship?')}
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
            <span style={{ ...PH, color: '#212529', display: 'inline-block' }} title="⚠ Placeholder – Reaktionszeit bitte bestätigen">
              <PHLabel />
              {t(
                'Schreib uns – wir melden uns innerhalb weniger Tage bei dir und erklären alle Details persönlich.',
                'Write to us – we will get back to you within a few days and explain all the details personally.'
              )}
            </span>
          </p>
          <Link
            href="/kontakt?subject=patenschaft"
            className="inline-block bg-white text-[#ae64fd] font-bold px-12 py-5 rounded-full hover:bg-[#f7a900] hover:text-white transition-colors duration-200 text-lg"
          >
            {t('Jetzt Kontakt aufnehmen', 'Get in touch now')}
          </Link>
        </div>
      </section>
    </main>
  );
}
