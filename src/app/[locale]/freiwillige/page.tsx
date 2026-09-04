import type { Metadata } from 'next'
import { Link } from '@/i18n/routing'
import { client } from '@/sanity/lib/client'
import { pageQuery } from '@/sanity/lib/queries'
import { VOLUNTEER_EMAIL, mailto } from '@/lib/site-config'

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
      : 'Freiwillige & Praktikum | Ubuntu for Africa',
    description: isEn
      ? 'Volunteer with Ubuntu for Africa in Cape Town: school, aftercare, from two months, with personal support.'
      : 'Freiwilligenarbeit und Praktikum bei Ubuntu for Africa in Kapstadt: Schule, Aftercare, ab zwei Monaten, mit persönlicher Begleitung.',
    openGraph: {
      title: isEn
        ? 'Volunteer Programme | Ubuntu for Africa'
        : 'Freiwillige & Praktikum | Ubuntu for Africa',
      description: isEn
        ? 'Volunteer with Ubuntu for Africa in Cape Town: school, aftercare, from two months, with personal support.'
        : 'Freiwilligenarbeit und Praktikum bei Ubuntu for Africa in Kapstadt: Schule, Aftercare, ab zwei Monaten, mit persönlicher Begleitung.',
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
    ? (locale === 'en' ? pageContent.title_en : pageContent.title_de) ?? t('Wir suchen Volunteers!', 'We are looking for volunteers!')
    : t('Wir suchen Volunteers!', 'We are looking for volunteers!')

  const pageSubtitle = pageContent
    ? (locale === 'en' ? pageContent.hero_subtitle_en : pageContent.hero_subtitle_de) ?? ''
    : t(
        'Du möchtest dich sozial engagieren und praktische Erfahrungen sammeln? Dann werde Teil von Ubuntu for Africa!',
        'Want to get involved and gain practical experience? Then become part of Ubuntu for Africa!'
      )

  const requirements = locale === 'en'
    ? [
        'You are of legal age',
        'You can present an extended police clearance certificate',
        'Studies or training in an educational or social field are an advantage, but not a requirement',
        'The minimum duration of an internship is two months',
      ]
    : [
        'Du bist volljährig',
        'Du kannst ein erweitertes Führungszeugnis vorlegen',
        'Ein Studium oder eine Ausbildung im pädagogischen oder sozialen Bereich ist von Vorteil, aber keine Voraussetzung',
        'Die Mindestdauer eines Praktikums beträgt zwei Monate',
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
          description: 'Homework, meals, sport, creative activities and excursions – you are right in the middle of it.',
        },
      ]
    : [
        {
          icon: '📚',
          title: 'Hout Bay Primary School',
          description: 'Du unterstützt die Lehrkräfte im Unterricht, hilfst einzelnen Kindern und bringst neue Impulse in den Schulalltag.',
        },
        {
          icon: '🏫',
          title: 'Kronendal Primary',
          description: 'Weitere Schulkooperation: Freiwillige werden als wertvolle Unterstützung im Klassenraum eingesetzt.',
        },
        {
          icon: '🏠',
          title: 'Ubuntu Kids Aftercare',
          description: 'Hausaufgaben, Mahlzeiten, Sport, kreative Aktivitäten und Ausflüge – du bist mittendrin.',
        },
      ]

  const costItems = locale === 'en'
    ? [
        { label: 'Accommodation', amount: '€ 400', description: 'Per month, safe accommodation shared with other volunteers in Hout Bay' },
        { label: 'Project support', amount: '€ 595', description: 'Per month, goes directly into the work on the ground' },
      ]
    : [
        { label: 'Unterkunft', amount: '400 €', description: 'Pro Monat, sichere Unterkunft gemeinsam mit anderen Freiwilligen in Hout Bay' },
        { label: 'Projektunterstützung', amount: '595 €', description: 'Pro Monat, fließt direkt in die Arbeit vor Ort' },
      ]

  const services = locale === 'en'
    ? [
        'Personal support before, during and after your stay',
        'Pick-up and drop-off service to and from the airport',
        'Help finding your feet in Hout Bay and the surrounding area',
        'Safe accommodation shared with other volunteers',
      ]
    : [
        'Persönliche Betreuung vor, während und nach deinem Aufenthalt',
        'Abhol- und Bringservice zum Flughafen',
        'Hilfe bei der Orientierung in Hout Bay und Umgebung',
        'Sichere Unterkunft mit anderen Freiwilligen',
      ]

  // Erfahrungsberichte von ubuntuforafrica.com übernommen (gekürzt).
  const reports = locale === 'en'
    ? [
        {
          name: 'Jarla (18)',
          meta: 'Volunteer, had to stop after 8 months because of Covid',
          text: 'The whole time was incredibly beautiful and intense. In the morning I was woken either by my alarm or by the sunshine – my flatmates were as keen on yoga as I was, so we started the day with a small yoga session. After breakfast we set off together for the project: Hout Bay Primary School, right next to the township of Imizamo Yethu. After school the aftercare started. You experience wonderful moments there every day. Dancing, playing, painting or simply chatting with the children lets you feel their energy and joy of life – and it is contagious.',
        },
        {
          name: 'Marc Wältermann (20)',
          meta: 'Studies rehabilitation education in Dortmund, internship August–October 2022',
          text: 'I liked walking the two kilometres to Hout Bay Primary School: you get some fresh air and can enjoy the landscape. In the classroom I first talked to the teachers about the current material and about the pupils who needed the most help. With a handful of children we then went to the prepared room. Around 1 pm I moved on to the aftercare next door. At half past one the first children arrived, the first-graders, who pulled us straight into playing after a short hello. Then we sat down in a circle, everyone talked about their day and we ate together.',
        },
      ]
    : [
        {
          name: 'Jarla (18)',
          meta: 'Freiwillige, musste wegen Corona nach 8 Monaten abbrechen',
          text: 'Die ganze Zeit war unglaublich schön und intensiv. Morgens wurde ich entweder von meinem Wecker oder von den Sonnenstrahlen geweckt – meine WG-Bewohner waren genau wie ich Yoga-begeistert, also haben wir mit einer kleinen Yoga-Session in den Tag gestartet. Nach dem Frühstück ging es zusammen mit den anderen Freiwilligen los zur Hout Bay Primary School, die neben dem Township Imizamo Yethu liegt. Nach Schulschluss geht die Aftercare los. Hier erlebt man jeden Tag tolle Momente: Zusammen mit den Kindern zu tanzen, zu spielen, zu malen oder einfach nur zu quatschen, lässt einen die Lebensfreude der Kinder spüren – und die ist ansteckend.',
        },
        {
          name: 'Marc Wältermann (20)',
          meta: 'Studiert Rehabilitationspädagogik in Dortmund, Praktikum August bis Oktober 2022',
          text: 'Die zwei Kilometer bis zur Hout Bay Primary School ging ich gerne zu Fuß, da man so ein bisschen Luft schnappen und die Landschaft genießen konnte. Im Klassenraum sprach ich zunächst mit den Lehrer:innen über den aktuellen Stoff und über die Schüler:innen, die dabei am meisten Hilfe benötigen. Mit einer Handvoll Kinder ging es dann zurück zum vorbereiteten Raum. Gegen 13 Uhr ging es für mich weiter zur Aftercare direkt nebenan. Um halb zwei kamen die ersten Kinder, die Erstklässler:innen, die uns nach einer kurzen Begrüßung direkt ins Spielen verwickelten. Danach setzten wir uns in einen Kreis, jeder berichtete von seinem Tag und wir aßen gemeinsam.',
        },
      ]

  return (
    <>
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#212529] via-[#1a3a4a] to-[#ae64fd]/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#212529]/80 to-[#212529]/60" />
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center text-white">
          <p className="text-[#f7a900] text-sm font-semibold uppercase tracking-widest mb-4">
            {t('Mitarbeiten', 'Get involved')}
          </p>
          <h1 className="text-5xl font-bold mb-6 md:text-6xl">{pageTitle}</h1>
          <p className="text-xl text-gray-200 leading-relaxed max-w-2xl mx-auto mb-8">{pageSubtitle}</p>
          <a
            href={mailto(VOLUNTEER_EMAIL, locale === 'en' ? 'Volunteer application' : 'Bewerbung als Freiwillige:r')}
            className="inline-flex items-center gap-2 rounded-full bg-[#f7a900] text-[#212529] px-8 py-4 text-lg font-bold hover:bg-[#e09800] transition-colors"
          >
            {t('Jetzt bewerben', 'Apply now')}
          </a>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-lg text-gray-700 leading-relaxed">
            {t(
              'Ganz nach unserem Leitgedanken „I am because we are and we are because I am“ unterstützt du gemeinsam mit unserem Team Menschen vor Ort dabei, eine bessere Zukunft zu gestalten und Kindern einen sicheren Ort zum Aufwachsen zu schenken – und kannst dabei deine eigenen Ideen einbringen.',
              'True to our guiding principle “I am because we are and we are because I am”, you and our team support people on the ground in building a better future and giving children a safe place to grow up – and you can bring in your own ideas along the way.'
            )}
          </p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-14">
            <p className="text-[#11aed1] text-sm font-semibold uppercase tracking-widest mb-3">
              {t('Dein Einsatz', 'Your role')}
            </p>
            <h2 className="text-4xl font-bold text-[#212529]">{t('Was du machst', 'What you do')}</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              {t(
                'In der Regel beträgt die Arbeitszeit 30 bis 35 Stunden pro Woche, Montag bis Freitag. Individuelle Absprachen sind möglich – wir legen viel Wert auf Flexibilität und gegenseitige Rücksichtnahme. Die Wochenenden bleiben frei, um Kapstadt und die Umgebung zu entdecken.',
                'Working hours are usually 30 to 35 hours per week, Monday to Friday. Individual arrangements are possible – we value flexibility and mutual consideration. Weekends are free to explore Cape Town and the surrounding area.'
              )}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {activities.map((activity) => (
              <div key={activity.title} className="bg-white rounded-2xl p-8 shadow-sm">
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

      <section className="py-20 bg-white">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-14">
            <p className="text-[#11aed1] text-sm font-semibold uppercase tracking-widest mb-3">
              {t('Was wir uns wünschen', 'What we are looking for')}
            </p>
            <h2 className="text-4xl font-bold text-[#212529]">{t('Voraussetzungen', 'Requirements')}</h2>
          </div>
          <div className="bg-gray-50 rounded-2xl p-10">
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

      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center mb-14">
            <p className="text-[#ae64fd] text-sm font-semibold uppercase tracking-widest mb-3">
              {t('Finanzierung', 'Financing')}
            </p>
            <h2 className="text-4xl font-bold text-[#212529]">{t('Leistungen & Kosten', 'Services & costs')}</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              {t(
                'Als gemeinnützige Organisation finanzieren wir uns über die Beiträge unserer Volunteers: 995 € pro Monat, inklusive Spendenquittung.',
                'As a non-profit organisation we are financed through the contributions of our volunteers: €995 per month, including a donation receipt.'
              )}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {costItems.map((item) => (
              <div key={item.label} className="rounded-2xl border-2 border-[#ae64fd]/20 bg-white p-8">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-[#212529] text-lg">{item.label}</h3>
                  <span className="text-2xl font-bold text-[#ae64fd]">{item.amount}</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-2xl p-10 shadow-sm">
            <h3 className="text-xl font-bold text-[#212529] mb-6">
              {t('Unsere Leistungen', 'What we provide')}
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

      {/* Erfahrungsberichte – von der alten Website übernommen. */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center mb-14">
            <p className="text-[#f7a900] text-sm font-semibold uppercase tracking-widest mb-3">
              {t('Erfahrungsberichte', 'Volunteer stories')}
            </p>
            <h2 className="text-4xl font-bold text-[#212529]">
              {t('Ein Tag als Ubuntu-Freiwillige:r', 'A day as an Ubuntu volunteer')}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reports.map((report) => (
              <blockquote key={report.name} className="rounded-2xl bg-gray-50 p-8 flex flex-col">
                <p className="text-gray-700 leading-relaxed italic flex-1">„{report.text}“</p>
                <footer className="mt-6">
                  <p className="font-bold text-[#212529]">{report.name}</p>
                  <p className="text-sm text-gray-500">{report.meta}</p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#ae64fd]">
        <div className="mx-auto max-w-3xl px-6 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">
            {t('Neugierig geworden?', 'Curious?')}
          </h2>
          <p className="text-xl text-white/90 mb-6 leading-relaxed">
            {t(
              'Du möchtest bei uns ein Praktikum machen oder weitere Informationen haben? Schreib uns – wir freuen uns, von dir zu hören!',
              'Would you like to do an internship with us or get more information? Write to us – we look forward to hearing from you!'
            )}
          </p>
          <a
            href={mailto(VOLUNTEER_EMAIL, locale === 'en' ? 'Volunteer application' : 'Bewerbung als Freiwillige:r')}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-[#ae64fd] px-10 py-4 text-lg font-bold hover:bg-white/90 transition-colors mb-4"
          >
            {VOLUNTEER_EMAIL}
          </a>
          <p className="text-white/70 text-sm">
            {t('Oder nutze unser Kontaktformular:', 'Or use our contact form:')}
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
