import type { Metadata } from 'next'
import { CONTACT_EMAIL, mailto } from '@/lib/site-config'

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params
  const isEn = locale === 'en'
  return {
    title: isEn ? 'Legal Notice | Ubuntu for Africa e.V.' : 'Impressum | Ubuntu for Africa e.V.',
    description: isEn
      ? 'Legal notice for UBUNTU for Africa Kinder, Jugend- und Familienhilfe e.V.'
      : 'Impressum von UBUNTU for Africa Kinder, Jugend- und Familienhilfe e.V.',
  }
}

export default async function ImpressumPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = (de: string, en: string) => locale === 'en' ? en : de

  return (
    <>
      <section className="py-24 bg-[#212529] text-white">
        <div className="mx-auto max-w-4xl px-6">
          <h1 className="text-4xl font-bold mb-3">{t('Impressum', 'Legal Notice')}</h1>
          <p className="text-gray-400">{t('Angaben gemäß § 5 TMG', 'Information according to § 5 TMG')}</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-6">
          <div className="prose prose-gray max-w-none space-y-10">

            {/* Anbieter */}
            <div>
              <h2 className="text-2xl font-bold text-[#212529] mb-4">{t('Anbieter', 'Provider')}</h2>
              <div className="text-gray-700 leading-relaxed space-y-1">
                <p className="font-semibold">UBUNTU for Africa Kinder, Jugend- und Familienhilfe e.V.</p>
                <p>{t('Eingetragener gemeinnütziger Verein', 'Registered non-profit association')}</p>
                {/* TODO: Vereinsadresse eintragen */}
                <p className="mt-3 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2 inline-block">
                  {t('Vereinsadresse wird nach Bekanntgabe eingetragen.', 'Association address to be added upon notification.')}
                </p>
              </div>
            </div>

            {/* Vorstand */}
            <div>
              <h2 className="text-2xl font-bold text-[#212529] mb-4">
                {t('Vertretungsberechtigter Vorstand', 'Authorized Board')}
              </h2>
              <div className="text-gray-700 space-y-1">
                <p><span className="font-semibold">Birgitta Latz</span> – {t('1. Vorsitzende', '1st Chair')}</p>
                <p><span className="font-semibold">Hanna Zabel</span> – {t('2. Vorsitzende', '2nd Chair')}</p>
              </div>
            </div>

            {/* Registereintrag */}
            <div>
              <h2 className="text-2xl font-bold text-[#212529] mb-4">{t('Registereintrag', 'Register Entry')}</h2>
              <div className="text-gray-700 space-y-1">
                <p>
                  {t('Eingetragen im Vereinsregister.', 'Registered in the association register.')}
                </p>
                <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2 inline-block mt-2">
                  {t('Registernummer und Registergericht werden nachgetragen.', 'Register number and court to be added.')}
                </p>
              </div>
            </div>

            {/* Kontakt */}
            <div>
              <h2 className="text-2xl font-bold text-[#212529] mb-4">{t('Kontakt', 'Contact')}</h2>
              <div className="text-gray-700 space-y-1">
                <p>
                  E-Mail:{' '}
                  <a href={mailto(CONTACT_EMAIL)} className="text-[#11aed1] hover:underline">
                    {CONTACT_EMAIL}
                  </a>
                </p>
              </div>
            </div>

            {/* Gemeinnützigkeit */}
            <div>
              <h2 className="text-2xl font-bold text-[#212529] mb-4">{t('Gemeinnützigkeit', 'Non-profit Status')}</h2>
              <p className="text-gray-700 leading-relaxed">
                {t(
                  'UBUNTU for Africa Kinder, Jugend- und Familienhilfe e.V. ist als gemeinnützig anerkannt. Spenden sind steuerlich absetzbar. Spendenquittungen werden auf Anfrage ausgestellt.',
                  'UBUNTU for Africa Kinder, Jugend- und Familienhilfe e.V. is recognised as a non-profit organisation. Donations are tax-deductible. Donation receipts are issued upon request.'
                )}
              </p>
            </div>

            {/* Haftungsausschluss */}
            <div>
              <h2 className="text-2xl font-bold text-[#212529] mb-4">{t('Haftungsausschluss', 'Disclaimer')}</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <div>
                  <h3 className="font-semibold text-[#212529] mb-1">{t('Haftung für Inhalte', 'Liability for Content')}</h3>
                  <p className="text-sm">
                    {t(
                      'Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.',
                      'The content of our pages has been created with the utmost care. However, we cannot guarantee the accuracy, completeness or topicality of the content.'
                    )}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#212529] mb-1">{t('Haftung für Links', 'Liability for Links')}</h3>
                  <p className="text-sm">
                    {t(
                      'Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.',
                      'Our website contains links to external third-party websites over whose content we have no influence. We therefore cannot accept any liability for this external content.'
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Urheberrecht */}
            <div>
              <h2 className="text-2xl font-bold text-[#212529] mb-4">{t('Urheberrecht', 'Copyright')}</h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                {t(
                  'Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.',
                  'The content and works created by the site operators on these pages are subject to German copyright law. Duplication, processing, distribution and any form of commercialisation of such material beyond the scope of the copyright law shall require the prior written consent of its respective author or creator.'
                )}
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
