import type { Metadata } from 'next'
import { Link } from '@/i18n/routing'
import { client } from '@/sanity/lib/client'
import { pageQuery } from '@/sanity/lib/queries'
import { VOLUNTEER_EMAIL, mailto } from '@/lib/site-config'
import { PH, PHLabel } from '@/components/Placeholder'

interface PageContent {
  title_de?: string
  title_en?: string
  hero_subtitle_de?: string
  hero_subtitle_en?: string
}

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params
  const isEn = locale === 'en'
  return {
    title: isEn
      ? 'Volunteer Programme | Ubuntu for Africa'
      : 'Freiwilligenprogramm | Ubuntu for Africa',
    description: isEn
      ? 'Become a volunteer with Ubuntu for Africa in Cape Town. Full-time placement with personal support.'
      : 'Werde Freiwillige:r bei Ubuntu for Africa in Kapstadt. Vollzeit-Einsatz mit persönlicher Begleitung.',
    openGraph: {
      title: isEn
        ? 'Volunteer Programme | Ubuntu for Africa'
        : 'Freiwilligenprogramm | Ubuntu for Africa',
      description: isEn
        ? 'Become a volunteer with Ubuntu for Africa in Cape Town. Full-time placement with personal support.'
        : 'Werde Freiwillige:r bei Ubuntu for Africa in Kapstadt. Vollzeit-Einsatz mit persönlicher Begleitung.',
      images: [{ url: 'https://ubuntuforafrica.com/images/Ubuntu_Logo.png' }],
      locale: isEn ? 'en_GB' : 'de_DE',
    },
  }
}

export default async function FreiwilligePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = (de: string, en: string) => locale === 'en' ? en : de

  let pageContent: PageContent | null = null
  try {
    pageContent = await client.fetch(pageQuery, { pageId: 'freiwillige' })
  } catch {
    // Sanity unavailable
  }

  const pageTitle = pageContent
    ? (locale === 'en' ? pageContent.title_en : pageContent.title_de) ?? t('Mach einen Unterschied', 'Make a Difference')
    : t('Mach einen Unterschied', 'Make a Difference')

  const pageSubtitle = pageContent
    ? (locale === 'en' ? pageContent.hero_subtitle_en : pageContent.hero_subtitle_de) ?? ''
    : t(
        'Du möchtest dich sozial engagieren und praktische Erfahrungen sammeln? Dann werde Teil von Ubuntu for Africa!',
        'Want to get involved and gain practical experience? Then become part of Ubuntu for Africa!'
      )

  const requirements = locale === 'en'
    ? [
        'At least 18 years old',
        'Extended police clearance certificate (can be applied for after acceptance)',
        'Minimum commitment — duration to be confirmed',
        'Willingness to work full-time, Mon–Fri',
        'Openness, curiosity and teamwork skills',
        'Basic English (working language on-site)',
      ]
    : [
        'Volljährigkeit (mind. 18 Jahre)',
        'Erweitertes Führungszeugnis (kann nach Zusage beantragt werden)',
        'Mindestdauer – wird noch festgelegt',
        'Bereitschaft, Vollzeit zu arbeiten, Mo–Fr',
        'Offenheit, Neugier und Teamfähigkeit',
        'Grundkenntnisse in Englisch (vor Ort Arbeitssprache)',
      ]

  const activities = locale === 'en'
    ? [
        {
          icon: '📚',
          title: 'Hout Bay Primary School',
          description: 'You support teachers in the classroom, help individual children and bring new ideas and energy to everyday school life.',
        },
        {
          icon: '🏫',
          title: 'Kronendal Primary',
          description: 'A second school partnership: volunteers are deployed as valuable classroom support.',
        },
        {
          icon: '🏠',
          title: 'Ubuntu Kids Aftercare',
          description: 'Afternoon care: homework, meals, sport, creative activities – you are right in the middle of it.',
        },
      ]
    : [
        {
          icon: '📚',
          title: 'Hout Bay Primary School',
          description: 'Du unterstützt Lehrerinnen im Unterricht, hilfst einzelnen Kindern und bringst neue Impulse in den Schulalltag.',
        },
        {
          icon: '🏫',
          title: 'Kronendal Primary',
          description: 'Weitere Schulkooperation: Freiwillige werden als wertvolle Unterstützung im Klassenraum eingesetzt.',
        },
        {
          icon: '🏠',
          title: 'Ubuntu Kids Aftercare',
          description: 'Nachmittagsbetreuung: Hausaufgaben, Mahlzeiten, Sport, kreative Aktivitäten – du bist mittendrin.',
        },
      ]

  const costItems = locale === 'en'
    ? [
        { label: 'Accommodation', amount: '€ 400', description: 'Monthly, incl. shared room in a flat-share in Hout Bay' },
        { label: 'Project support', amount: '€ 595', description: 'Goes directly into on-site work: materials, programme, coordination' },
      ]
    : [
        { label: 'Unterkunft', amount: '400 €', description: 'Monatlich, inklusive geteiltes Zimmer in einer WG in Hout Bay' },
        { label: 'Projektunterstützung', amount: '595 €', description: 'Fließt direkt in die Arbeit vor Ort: Materialien, Programm, Koordination' },
      ]

  const services = locale === 'en'
    ? [
        'Personal support before your stay',
        'Introduction to the work and environment',
        'Accompanying support throughout your time',
        'After-care and exchange on your return',
        'Certificate for your commitment',
        'Membership of our alumni network',
      ]
    : [
        'Persönliche Betreuung vor dem Aufenthalt',
        'Einführung in die Arbeit und das Umfeld',
        'Begleitung während des gesamten Einsatzes',
        'Nachbetreuung und Austausch nach der Rückkehr',
        'Zertifikat über deinen Einsatz',
        'Aufnahme in unser Netzwerk ehemaliger Freiwilliger',
      ]

  return (
    <>
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#212529] via-[#1a3a4a] to-[#ae64fd]/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#212529]/80 to-[#212529]/60" />
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center text-white">
          <p className="text-[#f7a900] text-sm font-semibold uppercase tracking-widest mb-4">
            {t('Freiwilligenprogramm', 'Volunteer Programme')}
          </p>
          <h1 className="text-5xl font-bold mb-6 md:text-6xl">{pageTitle}</h1>
          <p className="text-xl text-gray-200 leading-relaxed max-w-2xl mx-auto mb-8">{pageSubtitle}</p>
          <a
            href={mailto(VOLUNTEER_EMAIL)}
            className="inline-flex items-center gap-2 rounded-full bg-[#f7a900] text-[#212529] px-8 py-4 text-lg font-bold hover:bg-[#e09800] transition-colors"
          >
            {t('Jetzt bewerben', 'Apply now')}
          </a>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-14">
            <p className="text-[#11aed1] text-sm font-semibold uppercase tracking-widest mb-3">
              {t('Dein Einsatz', 'Your role')}
            </p>
            <h2 className="text-4xl font-bold text-[#212529]">{t('Was du machst', 'What you do')}</h2>
            <p className="text-gray-600 mt-4 max-w-xl mx-auto">
              {t(
                'Als Freiwillige:r arbeitest du Vollzeit, Montag bis Freitag, in einem oder mehreren unserer Projekte. Der genaue Stundenumfang wird noch festgelegt.',
                'As a volunteer you work full-time, Monday to Friday, in one or more of our projects. The exact number of hours is still to be confirmed.'
              )}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {activities.map((activity) => (
              <div key={activity.title} className="bg-gray-50 rounded-2xl p-8">
                <div className="w-14 h-14 rounded-xl bg-[#11aed1]/10 flex items-center justify-center text-2xl mb-6">
                  {activity.icon}
                </div>
                <h3 className="text-xl font-bold text-[#212529] mb-3">{activity.title}</h3>
                <p className="text-gray-600 leading-relaxed">{activity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-14">
            <p className="text-[#11aed1] text-sm font-semibold uppercase tracking-widest mb-3">
              {t('Was wir uns wünschen', 'What we are looking for')}
            </p>
            <h2 className="text-4xl font-bold text-[#212529]">{t('Voraussetzungen', 'Requirements')}</h2>
          </div>
          <div className="bg-white rounded-2xl p-10 shadow-sm">
            <ul className="space-y-4">
              {requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-[#11aed1] flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700 leading-relaxed">{req}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center mb-14">
            <p className="text-[#ae64fd] text-sm font-semibold uppercase tracking-widest mb-3">
              {t('Finanzierung', 'Financing')}
            </p>
            <h2 className="text-4xl font-bold text-[#212529]">{t('Kosten & Leistungen', 'Costs & Services')}</h2>
            <p className="text-gray-600 mt-4 max-w-xl mx-auto">
              <span style={PH}>
                <PHLabel />
                {t(
                  'Der monatliche Beitrag teilt sich in Unterkunft und direkte Projektunterstützung. Die Höhe wird vom Verein noch bestätigt.',
                  'The monthly contribution is split between accommodation and direct project support. The amount is still to be confirmed by the association.'
                )}
              </span>
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {costItems.map((item) => (
              <div key={item.label} className="rounded-2xl border-2 border-[#ae64fd]/20 p-8">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-[#212529] text-lg">{item.label}</h3>
                  <span className="text-2xl font-bold text-[#ae64fd]">{item.amount}</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="bg-gray-50 rounded-2xl p-10">
            <h3 className="text-xl font-bold text-[#212529] mb-6">
              {t('Was du von uns bekommst', 'What you get from us')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {services.map((service, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#f7a900] flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700 text-sm">{service}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#ae64fd]">
        <div className="mx-auto max-w-3xl px-6 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">
            {t('Bereit für das Abenteuer?', 'Ready for the adventure?')}
          </h2>
          <p className="text-xl text-white/90 mb-6 leading-relaxed">
            {t(
              'Schreib uns – wir melden uns zeitnah und klären alle offenen Fragen. Der nächste Schritt ist einfach: eine kurze E-Mail.',
              'Write to us – we will get back to you promptly and answer all open questions. The next step is easy: just a short email.'
            )}
          </p>
          <a
            href={mailto(VOLUNTEER_EMAIL)}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-[#ae64fd] px-10 py-4 text-lg font-bold hover:bg-white/90 transition-colors mb-4"
          >
            {VOLUNTEER_EMAIL}
          </a>
          <p className="text-white/70 text-sm">
            {t(
              'Oder nutze unser Kontaktformular:',
              'Or use our contact form:'
            )}
          </p>
          <Link
            href="/kontakt"
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white text-white px-8 py-3 text-base font-semibold hover:bg-white/10 transition-colors mt-3"
          >
            {t('Zum Kontaktformular', 'Contact form')}
          </Link>
        </div>
      </section>
    </>
  )
}
