import { Link } from '@/i18n/routing';

const PH: React.CSSProperties = {
  backgroundColor: '#fef9c3',
  borderLeft: '4px solid #f59e0b',
  borderRadius: '4px',
  padding: '6px 10px',
  display: 'block',
}

const PHLabel = () => (
  <span style={{ display: 'block', color: '#92400e', fontSize: '11px', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '4px' }}>
    ⚠ PLACEHOLDER – BITTE PRÜFEN / ERSETZEN
  </span>
)

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
            <span style={{ ...PH, display: 'inline-block', color: '#212529' }} title="⚠ Placeholder – bitte prüfen">
              <PHLabel />
              {t(
                'Wir zeigen offen, wie jeder Euro eingesetzt wird.',
                'We openly show how every euro is used.'
              )}
            </span>
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
              <div className="text-6xl font-extrabold mb-4">0 €</div>
              <p className="text-lg font-medium leading-snug">
                {t(
                  'Verwaltungsgehälter in Deutschland',
                  'Administrative salaries in Germany'
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
              'Deine Unterstützung fließt in vier konkrete Bereiche, die das Leben von Kindern und Familien in Imizamo Yethu verändern.',
              'Your support flows into four concrete areas that change the lives of children and families in Imizamo Yethu.'
            )}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-5 text-2xl"
                style={{ backgroundColor: '#11aed120' }}
              >
                🏫
              </div>
              <h3 className="text-xl font-bold text-[#212529] mb-3">
                {t('Aftercare-Programm', 'Aftercare Programme')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                <span style={PH} title="⚠ Placeholder – durch echte Projektbeschreibung ersetzen">
                  <PHLabel />
                  {t(
                    'Täglich frische Mahlzeiten, Lernmaterial, Hausaufgabenbetreuung und qualifiziertes Personal, das die Kinder nach der Schule begleitet und fördert.',
                    'Daily fresh meals, learning materials, homework support and qualified staff who accompany and nurture children after school.'
                  )}
                </span>
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-5 text-2xl"
                style={{ backgroundColor: '#ae64fd20' }}
              >
                📚
              </div>
              <h3 className="text-xl font-bold text-[#212529] mb-3">
                {t('Schulkooperationen', 'School Partnerships')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                <span style={PH} title="⚠ Placeholder – durch echte Projektbeschreibung ersetzen">
                  <PHLabel />
                  {t(
                    'Enge Zusammenarbeit mit der Hout Bay Primary und Kronendal Primary: Unterrichtsprojekte, Freiwilligeneinsätze und Unterstützung der Schulgemeinschaft.',
                    'Close cooperation with Hout Bay Primary and Kronendal Primary: classroom projects, volunteer placements and support for the school community.'
                  )}
                </span>
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-5 text-2xl"
                style={{ backgroundColor: '#f7a90020' }}
              >
                🏕️
              </div>
              <h3 className="text-xl font-bold text-[#212529] mb-3">
                {t('Ferienfreizeiten und Camps', 'Holiday Camps')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                <span style={PH} title="⚠ Placeholder – durch echte Projektbeschreibung ersetzen">
                  <PHLabel />
                  {t(
                    'In den Schulferien organisieren wir Freizeiten und Camps, die Kindern neue Erfahrungen, Sport, Kreativität und Gemeinschaft ermöglichen.',
                    'During school holidays we organise camps and holiday programmes that give children new experiences, sport, creativity and community.'
                  )}
                </span>
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-5 text-2xl"
                style={{ backgroundColor: '#21252920' }}
              >
                🤝
              </div>
              <h3 className="text-xl font-bold text-[#212529] mb-3">
                {t(
                  'Nothilfe für Familien',
                  'Emergency Aid for Families'
                )}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                <span style={PH} title="⚠ Placeholder – durch echte Projektbeschreibung ersetzen">
                  <PHLabel />
                  {t(
                    'Wenn Familien in akute Krisen geraten – durch Krankheit, Jobverlust oder andere Notlagen – helfen wir schnell und unbürokratisch mit gezielter Nothilfe.',
                    'When families face acute crises – through illness, job loss or other emergencies – we respond quickly and without red tape with targeted emergency aid.'
                  )}
                </span>
              </p>
            </div>
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
                  'Unser professionelles Team vor Ort in Imizamo Yethu, Hout Bay, wird fair aus den Spendengeldern bezahlt. Brenda Moloto, Andiswa Watsha, Zizipho Nyanga und Mzwandile Ntozini leiten die tägliche Projektarbeit mit Kindern und Familien.',
                  'Our professional on-the-ground team in Imizamo Yethu, Hout Bay, is fairly paid from donations. Brenda Moloto, Andiswa Watsha, Zizipho Nyanga and Mzwandile Ntozini lead the daily project work with children and families.'
                )}
              </p>
            </div>
          </div>
          <div className="mt-10 bg-gray-50 rounded-2xl p-8 text-center">
            <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto">
              <span style={PH} title="⚠ Placeholder – formulierung bitte bestätigen">
                <PHLabel />
                {t(
                  'Dieses Modell stellt sicher, dass Spendengelder dort ankommen, wo sie gebraucht werden – direkt bei den Menschen in Hout Bay.',
                  'This model ensures that donations reach where they are needed – directly with the people in Hout Bay.'
                )}
              </span>
            </p>
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
            href="mailto:pauline.schmiel@gmail.com?subject=Spendenquittung"
            className="inline-block bg-[#212529] text-white font-semibold px-8 py-4 rounded-full hover:bg-[#11aed1] transition-colors duration-200"
          >
            pauline.schmiel@gmail.com
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
