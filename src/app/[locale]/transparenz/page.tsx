import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params
  const isEn = locale === 'en'
  return {
    title: isEn ? 'Transparency | Ubuntu for Africa' : 'Transparenz | Ubuntu for Africa',
    description: isEn
      ? '100% of donations go directly to projects on the ground. Learn how Ubuntu for Africa uses your support.'
      : '100% der Spenden fließen direkt in Projekte vor Ort. Erfahre, wie Ubuntu for Africa deine Unterstützung einsetzt.',
    openGraph: {
      title: isEn ? 'Transparency | Ubuntu for Africa' : 'Transparenz | Ubuntu for Africa',
      images: [{ url: 'https://ubuntuforafrica.com/images/Ubuntu_Logo.png' }],
    },
  }
}

import { Link } from '@/i18n/routing';
import { RECEIPT_EMAIL, SATZUNG_PDF, mailto } from '@/lib/site-config'

export default async function TransparenzPage({
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
            {t('Transparenz', 'Transparency')}
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {t(
              'Wir zeigen offen, wie wir arbeiten und wofür Spenden eingesetzt werden.',
              'We openly show how we work and what donations are used for.'
            )}
          </p>
        </div>
      </section>

      {/* Sektion 1: Kernaussagen */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#212529] mb-12">
            {t('Unsere Versprechen', 'Our Commitments')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#11aed1] text-white rounded-2xl p-10 text-center shadow-lg">
              <div className="text-6xl font-extrabold mb-4">100%</div>
              <p className="text-lg font-medium leading-snug">
                {t(
                  'Jeder Euro geht direkt in Projekte vor Ort',
                  'Every euro goes directly into on-the-ground projects'
                )}
              </p>
            </div>
            <div className="bg-[#ae64fd] text-white rounded-2xl p-10 text-center shadow-lg">
              <div className="text-5xl font-extrabold mb-4">{t('ehrenamtlich', 'voluntary')}</div>
              <p className="text-lg font-medium leading-snug">
                {t(
                  'Der Vorstand in Deutschland arbeitet ohne Bezahlung – von deiner Spende wird nichts für Gehälter oder Verwaltung abgezogen',
                  'The board in Germany works unpaid – nothing is deducted from your donation for salaries or administration'
                )}
              </p>
            </div>
            <div className="bg-[#f7a900] text-white rounded-2xl p-10 text-center shadow-lg">
              <div className="text-6xl font-extrabold mb-4">
                {t('seit 2008', 'since 2008')}
              </div>
              <p className="text-lg font-medium leading-snug">
                {t(
                  'Erfahrung und Vertrauen',
                  'Years of experience and trust'
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sektion 2: Mittelverwendung */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#212529] mb-4">
            {t('Wie deine Spende verwendet wird', 'How your donation is used')}
          </h2>
          <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
            {t(
              'Deine Unterstützung fließt in konkrete Bereiche, die den Alltag von Kindern in Imizamo Yethu verändern.',
              'Your support flows into concrete areas that change everyday life for children in Imizamo Yethu.'
            )}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: '🏫',
                color: '#11aed120',
                title: t('Ubuntu Kids Aftercare', 'Ubuntu Kids Aftercare'),
                text: t(
                  'Täglich eine warme Mahlzeit, Lernmaterial, Hausaufgabenbetreuung und ein Team, das rund 40 Kinder von Montag bis Freitag nach der Schule begleitet.',
                  'A warm meal every day, learning materials, homework support and a team that looks after around 40 children after school from Monday to Friday.'
                ),
              },
              {
                icon: '📚',
                color: '#ae64fd20',
                title: t('Schulkooperationen & Englischförderung', 'School partnerships & language support'),
                text: t(
                  'Zusammenarbeit mit der Hout Bay Primary und der Kronendal Primary: Unterstützung im Unterricht und gezielte Nachhilfe in Englisch für Kinder, deren Familien aus Simbabwe und Malawi zugewandert sind.',
                  'Cooperation with Hout Bay Primary and Kronendal Primary: support in the classroom and targeted English tutoring for children whose families migrated from Zimbabwe and Malawi.'
                ),
              },
              {
                icon: '💻',
                color: '#21252920',
                title: t('Digitale Förderung', 'Digital learning'),
                text: t(
                  'Computerkurs und Tablets für die Klassen 3 bis 5 – finanziert über Sponsoren, seit 2025 fester Bestandteil der Woche.',
                  'A computer course and tablets for grades 3 to 5 – funded by sponsors and a fixed part of the week since 2025.'
                ),
              },
              {
                icon: '🏕️',
                color: '#f7a90020',
                title: t('Ferien-Camps und Ausflüge', 'Holiday camps and excursions'),
                text: t(
                  'Ferienfreizeiten, Ausflüge zum Strand und zum Spielplatz sowie Fußballtraining – Erfahrungen, die im Township sonst nicht möglich wären.',
                  'Holiday programmes, trips to the beach and the playground as well as football training – experiences that would otherwise not be possible in the township.'
                ),
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-5 text-2xl"
                  style={{ backgroundColor: item.color }}
                >
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-[#212529] mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sektion 3: Unsere Struktur */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#212529] mb-12">
            {t('Unsere Struktur', 'Our Structure')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="border-l-4 border-[#11aed1] pl-8">
              <h3 className="text-xl font-bold text-[#212529] mb-3">
                {t('Team Deutschland', 'Team Germany')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t(
                  'Unser Vorstand und alle Mitglieder in Deutschland arbeiten vollständig ehrenamtlich. Es fallen keine Verwaltungsgehälter an. Der Verein UBUNTU for Africa Kinder, Jugend- und Familienhilfe e.V. wurde 2015 gegründet und ist als gemeinnützig anerkannt.',
                  'Our board and all members in Germany work entirely on a voluntary basis. No administrative salaries are paid. The association UBUNTU for Africa Kinder, Jugend- und Familienhilfe e.V. was founded in 2015 and is recognised as a non-profit organisation.'
                )}
              </p>
            </div>
            <div className="border-l-4 border-[#ae64fd] pl-8">
              <h3 className="text-xl font-bold text-[#212529] mb-3">
                {t('Team Südafrika', 'Team South Africa')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t(
                  'Unser professionelles Team vor Ort in Imizamo Yethu, Hout Bay, wird fair aus den Spendengeldern bezahlt. Brenda Moloto, Andiswa Watsha, Zizipho Nyanga und Mzwandile Ntozini gestalten die tägliche Arbeit mit den Kindern. Die Projektleitung liegt bei Marina Vucurevic, die dafür eine Aufwandsentschädigung erhält.',
                  'Our professional on-the-ground team in Imizamo Yethu, Hout Bay, is fairly paid from donations. Brenda Moloto, Andiswa Watsha, Zizipho Nyanga and Mzwandile Ntozini shape the daily work with the children. Project management is led by Marina Vucurevic, who receives an expense allowance for this work.'
                )}
              </p>
            </div>
          </div>
          <div className="mt-10 bg-gray-50 rounded-2xl p-8 text-center">
            <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto mb-6">
              {t(
                'Dieses Modell stellt sicher, dass Spendengelder dort ankommen, wo sie gebraucht werden – direkt bei den Menschen in Hout Bay.',
                'This model ensures that donations reach where they are needed – directly with the people in Hout Bay.'
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/ueber-uns"
                className="inline-flex items-center justify-center rounded-full border-2 border-[#212529] text-[#212529] px-6 py-2.5 text-sm font-semibold hover:bg-[#212529] hover:text-white transition-colors"
              >
                {t('Das Team kennenlernen', 'Meet the team')}
              </Link>
              <a
                href={SATZUNG_PDF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border-2 border-[#212529] text-[#212529] px-6 py-2.5 text-sm font-semibold hover:bg-[#212529] hover:text-white transition-colors"
              >
                {t('Satzung als PDF', 'Statutes as PDF')}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Sektion 4: Spendenquittung */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-[#212529] mb-6">
            {t('Spendenquittung', 'Donation Receipt')}
          </h2>
          <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto mb-8">
            {t(
              'Als gemeinnütziger Verein stellen wir auf Anfrage Spendenquittungen aus, die du bei deiner Steuererklärung einreichen kannst. Schreibe uns einfach eine E-Mail mit deiner Postanschrift und dem gespendeten Betrag.',
              'As a registered non-profit association we issue donation receipts on request, which you can submit with your tax return. Simply send us an email with your postal address and the donated amount.'
            )}
          </p>
          <a
            href={mailto(RECEIPT_EMAIL, locale === 'en' ? 'Donation Receipt' : 'Spendenquittung')}
            className="inline-block bg-[#212529] text-white font-semibold px-8 py-4 rounded-full hover:bg-[#11aed1] transition-colors duration-200"
          >
            {RECEIPT_EMAIL}
          </a>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-[#11aed1] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {t('Jetzt spenden', 'Donate now')}
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            {t(
              'Du weißt, wie dein Geld eingesetzt wird. Mach den nächsten Schritt.',
              'You know how your money is used. Take the next step.'
            )}
          </p>
          <Link
            href="/spenden"
            className="inline-block bg-white text-[#11aed1] font-bold px-10 py-4 rounded-full hover:bg-[#f7a900] hover:text-white transition-colors duration-200 text-lg"
          >
            {t('Zur Spendenseite', 'Go to donation page')}
          </Link>
        </div>
      </section>
    </main>
  );
}
