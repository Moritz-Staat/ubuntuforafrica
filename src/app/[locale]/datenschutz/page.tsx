import type { Metadata } from 'next'
import { CONTACT_EMAIL, mailto } from '@/lib/site-config'

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params
  const isEn = locale === 'en'
  return {
    title: isEn ? 'Privacy Policy | Ubuntu for Africa' : 'Datenschutz | Ubuntu for Africa',
    description: isEn
      ? 'Privacy policy for the Ubuntu for Africa website - GDPR compliant.'
      : 'Datenschutzerklaerung der Ubuntu for Africa Website - DSGVO-konform.',
  }
}

export default async function DatenschutzPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = (de: string, en: string) => locale === 'en' ? en : de

  return (
    <>
      <section className="py-24 bg-[#212529] text-white">
        <div className="mx-auto max-w-4xl px-6">
          <h1 className="text-4xl font-bold mb-3">{t('Datenschutzerklärung', 'Privacy Policy')}</h1>
          <p className="text-gray-400">
            {t('Gemäß DSGVO, BDSG und TMG', 'Pursuant to GDPR, BDSG and TMG')}
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-6 space-y-10 text-gray-700 leading-relaxed">

          {/* 1. Verantwortlicher */}
          <div>
            <h2 className="text-2xl font-bold text-[#212529] mb-4">
              {t('1. Verantwortlicher', '1. Controller')}
            </h2>
            <p>
              {t(
                'Verantwortlicher im Sinne der DSGVO ist:',
                'The controller within the meaning of the GDPR is:'
              )}
            </p>
            <div className="mt-3 space-y-1">
              <p className="font-semibold">UBUNTU for Africa Kinder, Jugend- und Familienhilfe e.V.</p>
              <p>1. Vorsitzende: Birgitta Latz</p>
              <p>
                E-Mail:{' '}
                <a href={mailto(CONTACT_EMAIL)} className="text-[#11aed1] hover:underline">
                  {CONTACT_EMAIL}
                </a>
              </p>
            </div>
          </div>

          {/* 2. Hosting */}
          <div>
            <h2 className="text-2xl font-bold text-[#212529] mb-4">
              {t('2. Hosting & technischer Betrieb', '2. Hosting & Technical Operation')}
            </h2>
            <p>
              {t(
                'Diese Website wird gehostet von Vercel Inc., 340 Pine Street, Suite 701, San Francisco, CA 94104, USA. Vercel verarbeitet Verbindungsdaten (IP-Adresse, Zeitstempel, aufgerufene URL) zur Bereitstellung des Dienstes. Grundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse am Betrieb der Website). Mehr Informationen: ',
                'This website is hosted by Vercel Inc., 340 Pine Street, Suite 701, San Francisco, CA 94104, USA. Vercel processes connection data (IP address, timestamp, requested URL) to provide the service. The legal basis is Art. 6(1)(f) GDPR (legitimate interest in operating the website). More information: '
              )}
              <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#11aed1] hover:underline">
                vercel.com/legal/privacy-policy
              </a>
            </p>
          </div>

          {/* 3. Kontaktformular */}
          <div>
            <h2 className="text-2xl font-bold text-[#212529] mb-4">
              {t('3. Kontaktformular', '3. Contact Form')}
            </h2>
            <p>
              {t(
                'Wenn du uns über das Kontaktformular eine Nachricht sendest, verarbeiten wir folgende Daten: Name, E-Mail-Adresse, Betreff und Nachrichteninhalt. Diese Daten werden ausschließlich zur Bearbeitung deiner Anfrage verwendet und anschließend gelöscht.',
                'When you send us a message via the contact form, we process the following data: name, email address, subject and message content. This data is used exclusively to process your enquiry and is then deleted.'
              )}
            </p>
            <p className="mt-3">
              {t(
                'Für den E-Mail-Versand nutzen wir Resend (Resend Inc., USA). Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung/Anfragenbearbeitung). Mehr: ',
                'We use Resend (Resend Inc., USA) for email delivery. Legal basis: Art. 6(1)(b) GDPR (pre-contractual measures/processing of enquiries). More: '
              )}
              <a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#11aed1] hover:underline">
                resend.com/legal/privacy-policy
              </a>
            </p>
          </div>

          {/* 4. Spenden / Stripe */}
          <div>
            <h2 className="text-2xl font-bold text-[#212529] mb-4">
              {t('4. Online-Spenden & Zahlungsabwicklung (Stripe)', '4. Online Donations & Payment Processing (Stripe)')}
            </h2>
            <p>
              {t(
                'Für die Abwicklung von Online-Spenden nutzen wir Stripe (Stripe Payments Europe, Ltd., 1 Grand Canal Street Lower, Grand Canal Dock, Dublin, D02 H210, Irland). Bei einer Spende wirst du auf die sichere Zahlungsseite von Stripe weitergeleitet. Stripe verarbeitet dort deine Zahlungsdaten (Kreditkartennummer, IBAN o.ä.) und Kontaktdaten. Wir erhalten von Stripe lediglich eine Bestätigung des Zahlungseingangs.',
                'We use Stripe (Stripe Payments Europe, Ltd., 1 Grand Canal Street Lower, Grand Canal Dock, Dublin, D02 H210, Ireland) to process online donations. When making a donation you are redirected to Stripe\'s secure payment page. Stripe processes your payment details (credit card number, IBAN etc.) and contact data. We only receive a payment confirmation from Stripe.'
              )}
            </p>
            <p className="mt-3">
              {t(
                'Stripe setzt auf seiner Zahlungsseite technisch notwendige Cookies. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung). Datenschutzerklärung Stripe: ',
                'Stripe sets technically necessary cookies on its payment page. Legal basis: Art. 6(1)(b) GDPR (performance of contract). Stripe\'s privacy policy: '
              )}
              <a href="https://stripe.com/de/privacy" target="_blank" rel="noopener noreferrer" className="text-[#11aed1] hover:underline">
                stripe.com/de/privacy
              </a>
            </p>
          </div>

          {/* 5. Newsletter */}
          <div>
            <h2 className="text-2xl font-bold text-[#212529] mb-4">
              {t('5. Newsletter (Mailchimp)', '5. Newsletter (Mailchimp)')}
            </h2>
            <p>
              {t(
                'Wenn du dich für unseren Newsletter anmeldest, speichern wir deine E-Mail-Adresse und Sprache. Die Anmeldung erfolgt über ein Double-Opt-In-Verfahren: Du erhältst zunächst eine Bestätigungs-E-Mail und wirst erst nach Bestätigung in die Mailingliste aufgenommen.',
                'When you sign up for our newsletter, we store your email address and language preference. Registration uses a double opt-in process: you first receive a confirmation email and are only added to the mailing list after confirmation.'
              )}
            </p>
            <p className="mt-3">
              {t(
                'Für den Newsletter-Versand nutzen wir Mailchimp (The Rocket Science Group, LLC, 675 Ponce de Leon Ave NE, Suite 5000, Atlanta, GA 30308, USA). Du kannst dich jederzeit über den Abmeldelink im Newsletter oder per E-Mail abmelden. Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung). Datenschutzerklärung Mailchimp: ',
                'We use Mailchimp (The Rocket Science Group, LLC, 675 Ponce de Leon Ave NE, Suite 5000, Atlanta, GA 30308, USA) for newsletter delivery. You can unsubscribe at any time via the unsubscribe link in the newsletter or by email. Legal basis: Art. 6(1)(a) GDPR (consent). Mailchimp\'s privacy policy: '
              )}
              <a href="https://mailchimp.com/legal/privacy/" target="_blank" rel="noopener noreferrer" className="text-[#11aed1] hover:underline">
                mailchimp.com/legal/privacy
              </a>
            </p>
          </div>

          {/* 6. Sanity CMS */}
          <div>
            <h2 className="text-2xl font-bold text-[#212529] mb-4">
              {t('6. Content-Management (Sanity)', '6. Content Management (Sanity)')}
            </h2>
            <p>
              {t(
                'Inhalte dieser Website werden über Sanity (Sanity AS, Stenersgata 8, 0184 Oslo, Norwegen) verwaltet. Bilder und Medieninhalte werden über das Sanity CDN ausgeliefert. Dabei werden technisch notwendige Verbindungsdaten verarbeitet. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO. Mehr: ',
                'Content on this website is managed via Sanity (Sanity AS, Stenersgata 8, 0184 Oslo, Norway). Images and media are delivered via the Sanity CDN. Technically necessary connection data is processed. Legal basis: Art. 6(1)(f) GDPR. More: '
              )}
              <a href="https://www.sanity.io/legal/privacy" target="_blank" rel="noopener noreferrer" className="text-[#11aed1] hover:underline">
                sanity.io/legal/privacy
              </a>
            </p>
          </div>

          {/* 7. Cookies */}
          <div>
            <h2 className="text-2xl font-bold text-[#212529] mb-4">
              {t('7. Cookies', '7. Cookies')}
            </h2>
            <p>
              {t(
                'Diese Website verwendet nur technisch notwendige Cookies. Es werden keine Tracking- oder Analyse-Cookies eingesetzt. Folgende Cookies werden gesetzt:',
                'This website uses only technically necessary cookies. No tracking or analytics cookies are used. The following cookies are set:'
              )}
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left p-3 border border-gray-200 font-semibold text-[#212529]">Cookie</th>
                    <th className="text-left p-3 border border-gray-200 font-semibold text-[#212529]">{t('Zweck', 'Purpose')}</th>
                    <th className="text-left p-3 border border-gray-200 font-semibold text-[#212529]">{t('Anbieter', 'Provider')}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border border-gray-200 font-mono text-xs">cookie_consent</td>
                    <td className="p-3 border border-gray-200">{t('Speichert deine Cookie-Einwilligung (localStorage)', 'Stores your cookie consent (localStorage)')}</td>
                    <td className="p-3 border border-gray-200">ubuntuforafrica.com</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="p-3 border border-gray-200 font-mono text-xs">__stripe_*</td>
                    <td className="p-3 border border-gray-200">{t('Technisch notwendig für Zahlungsabwicklung (nur während Checkout)', 'Technically necessary for payment processing (only during checkout)')}</td>
                    <td className="p-3 border border-gray-200">Stripe</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 8. Deine Rechte */}
          <div>
            <h2 className="text-2xl font-bold text-[#212529] mb-4">
              {t('8. Deine Rechte', '8. Your Rights')}
            </h2>
            <p className="mb-3">
              {t(
                'Du hast gegenüber uns folgende Rechte hinsichtlich deiner personenbezogenen Daten:',
                'You have the following rights with regard to your personal data:'
              )}
            </p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              {(locale === 'en' ? [
                'Right of access (Art. 15 GDPR)',
                'Right to rectification (Art. 16 GDPR)',
                'Right to erasure (Art. 17 GDPR)',
                'Right to restriction of processing (Art. 18 GDPR)',
                'Right to data portability (Art. 20 GDPR)',
                'Right to object to processing (Art. 21 GDPR)',
                'Right to withdraw consent at any time (Art. 7(3) GDPR)',
                'Right to lodge a complaint with a supervisory authority (Art. 77 GDPR)',
              ] : [
                'Auskunftsrecht (Art. 15 DSGVO)',
                'Recht auf Berichtigung (Art. 16 DSGVO)',
                'Recht auf Löschung (Art. 17 DSGVO)',
                'Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)',
                'Recht auf Datenübertragbarkeit (Art. 20 DSGVO)',
                'Widerspruchsrecht (Art. 21 DSGVO)',
                'Recht auf Widerruf einer Einwilligung (Art. 7 Abs. 3 DSGVO)',
                'Beschwerderecht bei einer Aufsichtsbehörde (Art. 77 DSGVO)',
              ]).map((right) => (
                <li key={right}>{right}</li>
              ))}
            </ul>
            <p className="mt-4 text-sm">
              {t(
                'Zur Ausübung deiner Rechte wende dich bitte an: ',
                'To exercise your rights, please contact: '
              )}
              <a href={mailto(CONTACT_EMAIL)} className="text-[#11aed1] hover:underline">
                {CONTACT_EMAIL}
              </a>
            </p>
          </div>

          {/* Stand */}
          <div className="pt-6 border-t border-gray-100">
            <p className="text-sm text-gray-400">
              {t('Stand: Mai 2026', 'Last updated: May 2026')}
            </p>
          </div>

        </div>
      </section>
    </>
  )
}
