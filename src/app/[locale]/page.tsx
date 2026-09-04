import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/routing'
import { VOLUNTEER_EMAIL, mailto } from '@/lib/site-config'
import InstagramFeed from '@/components/InstagramFeed'
import { PHNumber, PhotoSlot } from '@/components/Placeholder'

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params
  const isEn = locale === 'en'
  return {
    title: isEn
      ? 'Ubuntu for Africa – Children, Youth & Family Support | Cape Town, South Africa'
      : 'Ubuntu for Africa – Kinder, Jugend- und Familienhilfe | Kapstadt, Südafrika',
    description: isEn
      ? 'Ubuntu for Africa supports children, young people and families in Imizamo Yethu, Hout Bay, Cape Town. On the ground since 2008.'
      : 'Ubuntu for Africa unterstützt Kinder, Jugendliche und Familien in Imizamo Yethu, Hout Bay, Kapstadt. Seit 2008 vor Ort.',
    openGraph: {
      title: isEn
        ? 'Ubuntu for Africa – Children, Youth & Family Support | Cape Town, South Africa'
        : 'Ubuntu for Africa – Kinder, Jugend- und Familienhilfe | Kapstadt, Südafrika',
      description: isEn
        ? 'Ubuntu for Africa supports children, young people and families in Imizamo Yethu, Hout Bay, Cape Town. On the ground since 2008.'
        : 'Ubuntu for Africa unterstützt Kinder, Jugendliche und Familien in Imizamo Yethu, Hout Bay, Kapstadt. Seit 2008 vor Ort.',
      images: [{ url: 'https://ubuntuforafrica.com/images/Ubuntu_Logo.png' }],
      locale: isEn ? 'en_GB' : 'de_DE',
    },
  }
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = (de: string, en: string) => locale === 'en' ? en : de

  const projects = [
    {
      title: 'Ubuntu Kids Aftercare',
      description: t(
        'Nachmittagsbetreuung für Kinder aus Imizamo Yethu – Hausaufgabenhilfe, Mahlzeiten, Sport und kreative Förderung.',
        'Afternoon care for children from Imizamo Yethu – homework support, meals, sports and creative activities.'
      ),
      icon: '🏠',
      href: '/projekte' as const,
      color: '#11aed1',
    },
    {
      title: t('Schulkooperation', 'School Partnership'),
      description: t(
        'Enge Zusammenarbeit mit der Hout Bay Primary School und Kronendal Primary – Freiwillige unterstützen Lehrerinnen im Unterricht.',
        'Close cooperation with Hout Bay Primary School and Kronendal Primary – volunteers support teachers in the classroom.'
      ),
      icon: '📚',
      href: '/projekte' as const,
      color: '#ae64fd',
    },
    {
      title: t('Freiwilligenprogramm', 'Volunteer Programme'),
      description: t(
        'Freiwillige und Praktikant:innen arbeiten in Schule und Aftercare mit – ab zwei Monaten, mit persönlicher Begleitung vor, während und nach dem Aufenthalt.',
        'Volunteers and interns work in the school and aftercare – from two months, with personal support before, during and after the stay.'
      ),
      icon: '🤝',
      href: '/freiwillige' as const,
      color: '#f7a900',
    },
  ]

  // Betraege bewusst als Platzhalter: Hanna hat am 22.07.2026 verfuegt, dass
  // keine Geldbetraege in den Texten stehen, bis der Verein sie freigibt (#10).
  // `was` zeigt den bisherigen Wert durchgestrichen, damit nichts verlorengeht.
  const donationAmounts = [
    { was: '10 €',  impact: t('Deckt eine Woche Aftercare-Material', 'Covers one week of aftercare materials'), color: '#11aed1' },
    { was: '25 €',  impact: t('Ermöglicht 1 Monat Schulpatenschaft', 'Enables 1 month school sponsorship'), color: '#ae64fd' },
    { was: '50 €',  impact: t('Finanziert ein Yoga-/Therapieprogramm', 'Funds a yoga/therapy programme'), color: '#f7a900' },
    { was: '100 €', impact: t('Trägt zum Container-Bau bei', 'Contributes to container construction'), color: '#11aed1' },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#212529] via-[#1a3a4a] to-[#11aed1]/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#212529]/70 via-[#212529]/50 to-[#212529]/80" />
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center text-white">
          <p className="mb-3 text-[#f7a900] text-sm font-semibold uppercase tracking-widest">
            Imizamo Yethu · Hout Bay · {t('Kapstadt', 'Cape Town')}
          </p>
          <h1 className="mb-4 text-5xl font-bold leading-tight md:text-7xl">
            Umuntu Ngumntu Ngabantu
          </h1>
          <p className="mb-6 text-2xl font-light italic text-[#f7a900]">
            {t('Ich bin, weil wir sind.', 'I am because we are.')}
          </p>
          <p className="mb-10 text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed">
            {t(
              'Ubuntu for Africa unterstützt Kinder, Jugendliche und Familien in Imizamo Yethu, Hout Bay, Kapstadt.',
              'Ubuntu for Africa supports children, young people and families in Imizamo Yethu, Hout Bay, Cape Town.'
            )}
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/spenden"
              className="inline-flex items-center gap-2 rounded-full bg-[#11aed1] px-8 py-4 text-lg font-semibold shadow-lg transition hover:bg-[#0e8fb5] hover:shadow-xl"
            >
              {t('Jetzt spenden', 'Donate now')}
            </Link>
            <Link
              href="/ueber-uns"
              className="inline-flex items-center rounded-full border-2 border-white px-8 py-4 text-lg font-semibold transition hover:bg-white hover:text-[#212529]"
            >
              {t('Mehr erfahren', 'Learn more')}
            </Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/60">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* Impact Counter */}
      <section className="bg-[#11aed1] py-20 text-white">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-center text-sm font-semibold uppercase tracking-widest mb-2 text-white/70">
            {t('Unsere Wirkung', 'Our Impact')}
          </p>
          <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3 mt-8">
            {/* Alle drei Zahlen stammen aus den freigegebenen Texten
                (Aftercare-Beschreibung, Vereinsgeschichte) – keine Platzhalter. */}
            <div>
              <p className="text-6xl font-bold mb-2">40</p>
              <p className="text-lg text-white/90">
                {t('Kinder täglich in der Aftercare', 'children in aftercare every day')}
              </p>
            </div>
            <div>
              <p className="text-6xl font-bold mb-2">2008</p>
              <p className="text-lg text-white/90">
                {t('seit diesem Jahr vor Ort', 'on the ground since')}
              </p>
            </div>
            <div>
              <p className="text-6xl font-bold mb-2">5</p>
              <p className="text-lg text-white/90">
                {t('Tage pro Woche Betreuung', 'days of care per week')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Teaser */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <PhotoSlot describe={t('Team oder Kinder vor Ort in Imizamo Yethu', 'Team or children on site in Imizamo Yethu')} />
            <div>
              <p className="text-[#11aed1] text-sm font-semibold uppercase tracking-widest mb-3">
                {t('Über uns', 'About Us')}
              </p>
              <h2 className="text-4xl font-bold text-[#212529] mb-6 leading-tight">
                {t('Gemeinsam stark für Kinder in Südafrika', 'Together for children in South Africa')}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {t(
                  'Ubuntu for Africa ist ein in Deutschland eingetragener gemeinnütziger Verein, der Projekte in Hout Bay (Kapstadt, Südafrika) initiiert und begleitet. Seit 2008 setzen wir uns dafür ein, Kinder, Jugendliche und Familien darin zu stärken, ein selbstbestimmtes Leben zu führen.',
                  'Ubuntu for Africa is a registered non-profit association in Germany that initiates and accompanies projects in Hout Bay (Cape Town, South Africa). Since 2008, we have been committed to empowering children, young people and families to lead self-determined lives.'
                )}
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                {t(
                  'Das südafrikanische Team gestaltet die operative Arbeit direkt vor Ort und ist täglich mit den Kindern und Familien im Einsatz. Das deutsche Team unterstützt diese Arbeit organisatorisch, strategisch und finanziell.',
                  'The South African team carries out the operational work directly on the ground and is daily engaged with children and families. The German team provides organisational, strategic and financial support.'
                )}
              </p>
              <Link
                href="/ueber-uns"
                className="inline-flex items-center gap-2 text-[#11aed1] font-semibold"
              >
                {t('Mehr über uns erfahren →', 'Learn more about us →')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-14">
            <p className="text-[#11aed1] text-sm font-semibold uppercase tracking-widest mb-3">
              {t('Unsere Arbeit', 'Our Work')}
            </p>
            <h2 className="text-4xl font-bold text-[#212529]">{t('Was wir tun', 'What we do')}</h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {projects.map((project) => (
              <Link
                key={project.title}
                href={project.href}
                className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-6"
                  style={{ backgroundColor: project.color + '20' }}
                >
                  {project.icon}
                </div>
                <h3 className="text-xl font-bold text-[#212529] mb-3">{project.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-6">{project.description}</p>
                <span
                  className="text-sm font-semibold"
                  style={{ color: project.color }}
                >
                  {t('Mehr erfahren →', 'Learn more →')}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Donate Teaser */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-14">
            <p className="text-[#11aed1] text-sm font-semibold uppercase tracking-widest mb-3">
              {t('Jetzt helfen', 'Help now')}
            </p>
            <h2 className="text-4xl font-bold text-[#212529] mb-4">{t('Jetzt spenden', 'Donate now')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t(
                'Mit Empathie, Engagement und Einfallsreichtum lässt sich viel bewegen – aber fast immer braucht es auch finanzielle Unterstützung.',
                'Empathy, commitment and creativity can move mountains – but almost always financial support is also needed.'
              )}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {donationAmounts.map((item) => (
              <div
                key={item.was}
                className="rounded-2xl border-2 p-6 text-center hover:shadow-lg transition-all hover:-translate-y-1"
                style={{ borderColor: item.color + '40' }}
              >
                <p className="text-3xl font-bold mb-3" style={{ color: item.color }}>
                  <PHNumber was={item.was} />
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">{item.impact}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link
              href="/spenden"
              className="inline-flex items-center gap-2 rounded-full bg-[#11aed1] px-10 py-4 text-lg font-semibold text-white hover:bg-[#0e8fb5] transition-colors shadow-lg"
            >
              {t('Spenden', 'Donate')}
            </Link>
          </div>
        </div>
      </section>

      {/* Instagram – erscheint nur, wenn ein gültiger Token gesetzt ist */}
      <InstagramFeed locale={locale} limit={6} />

      {/* Volunteer Teaser */}
      <section className="py-20 bg-[#ae64fd]">
        <div className="mx-auto max-w-5xl px-6 text-center text-white">
          <p className="text-sm font-semibold uppercase tracking-widest mb-3 text-white/70">
            {t('Freiwilligenprogramm', 'Volunteer Programme')}
          </p>
          <h2 className="text-4xl font-bold mb-6">{t('Werde Teil unseres Teams', 'Join our team')}</h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            {t(
              'Du möchtest dich sozial engagieren und praktische Erfahrungen sammeln? Dann werde Teil von Ubuntu for Africa – in der Schule, in der Aftercare und mit deinen eigenen Ideen.',
              'Want to make a social impact and gain hands-on experience? Join Ubuntu for Africa – in the school, in the aftercare and with your own ideas.'
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/freiwillige"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-[#ae64fd] px-8 py-4 text-lg font-semibold hover:bg-white/90 transition-colors"
            >
              {t('Mehr erfahren', 'Learn more')}
            </Link>
            {/* Bewerbungen sollen direkt bei der Freiwilligen-Koordination
                landen, nicht im allgemeinen Kontaktformular. */}
            <a
              href={mailto(
                VOLUNTEER_EMAIL,
                locale === 'en' ? 'Volunteer application' : 'Bewerbung als Freiwillige:r'
              )}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white text-white px-8 py-4 text-lg font-semibold hover:bg-white/10 transition-colors"
            >
              {t('Jetzt bewerben', 'Apply now')}
            </a>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-[#212529]">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            {t('Fragen? Wir sind für dich da.', 'Questions? We are here for you.')}
          </h2>
          <p className="text-gray-400 mb-8 text-lg">
            {t(
              'Egal ob du spenden, freiwillig helfen oder einfach mehr erfahren möchtest – schreib uns.',
              'Whether you want to donate, volunteer or simply learn more – get in touch.'
            )}
          </p>
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-2 rounded-full bg-[#f7a900] text-[#212529] px-10 py-4 text-lg font-bold hover:bg-[#e09800] transition-colors"
          >
            {t('Kontakt aufnehmen', 'Get in touch')}
          </Link>
        </div>
      </section>
    </>
  )
}
