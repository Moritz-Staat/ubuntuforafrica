import type { Metadata } from 'next'
import Image from 'next/image'
import { Link } from '@/i18n/routing'
import { client } from '@/sanity/lib/client'
import { projectsQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { PhotoSlot } from '@/components/Placeholder'
import { Photo, HeroPhoto } from '@/components/Photo'

interface Project {
  _id: string
  title: string
  title_en?: string
  slug: { current: string }
  description?: string
  description_en?: string
  mainImage?: { asset: { _ref: string }; alt?: string }
  active: boolean
}

/**
 * Inhalte aus den freigegebenen Texten (Aftercare-Beschreibung, Volunteers).
 * Solange in Sanity keine Projekte gepflegt sind, trägt diese Liste die Seite.
 */
const hardcodedProjects = [
  {
    id: 'aftercare',
    title: 'Ubuntu Kids Aftercare',
    title_en: 'Ubuntu Kids Aftercare',
    subtitle: 'Ein sicherer Ort nach der Schule',
    subtitle_en: 'A safe place after school',
    description:
      'Unsere Aftercare ist eine Nachmittagsbetreuung für Kinder aus dem Township Imizamo Yethu in Hout Bay. Viele Kinder sind nach der Schule mehrere Stunden auf sich allein gestellt, weil ihre Eltern arbeiten – und verbringen den Nachmittag auf der Straße, wo sie auf sich gestellt und möglichen Gefahren ausgesetzt sind. Genau hier setzt unser Angebot an: Von Montag bis Freitag betreuen wir rund 40 Kinder im Alter von etwa 6 bis 10 Jahren, täglich von 13:30 bis 17:00 Uhr.',
    description_en:
      'Our aftercare is an afternoon programme for children from the township of Imizamo Yethu in Hout Bay. Many children are left on their own for hours after school because their parents work – and spend the afternoon on the street, left to themselves and exposed to possible dangers. This is exactly where our programme comes in: from Monday to Friday we care for around 40 children aged roughly 6 to 10, daily from 1:30 to 5:00 pm.',
    details: [
      'Hausaufgabenbetreuung in altersgerechten Gruppen',
      'Eine warme Mahlzeit an jedem Tag',
      'Kreative Aktivitäten wie Malen und gemeinsames Spielen',
      'Freies Spiel, zum Beispiel Fußball oder Gruppenspiele',
      'Ein verlässlicher Ort mit fester Routine, an dem Kinder einfach Kind sein dürfen',
    ],
    details_en: [
      'Homework support in age-appropriate groups',
      'A warm meal every day',
      'Creative activities such as painting and playing together',
      'Free play, for example football or group games',
      'A reliable place with a fixed routine where children can simply be children',
    ],
    image: '/images/fotos/hausaufgaben.jpg',
    imageAspect: 'aspect-[3/4]',
    photo: 'Kind bei den Hausaufgaben in der Ubuntu Kids Aftercare',
    photo_en: 'Child doing homework at Ubuntu Kids Aftercare',
    color: '#11aed1',
    icon: '🏠',
  },
  {
    id: 'schule',
    title: 'Schulkooperation',
    title_en: 'School Partnership',
    subtitle: 'Hout Bay Primary & Kronendal Primary',
    subtitle_en: 'Hout Bay Primary & Kronendal Primary',
    description:
      'Wir arbeiten eng mit zwei Grundschulen in Hout Bay zusammen. Unsere Freiwilligen unterstützen die Lehrkräfte im Unterricht, fördern einzelne Kinder gezielt und bringen neue Impulse in den Schulalltag. Ein Schwerpunkt ist die Förderung in Englisch: Viele unserer Kinder sind mit ihren Familien aus Simbabwe und Malawi nach Südafrika gekommen und lernen in einer Sprache, die zu Hause niemand spricht. Dazu kommt isiXhosa als eigenes Unterrichtsfach – eine zusätzliche Hürde.',
    description_en:
      'We work closely with two primary schools in Hout Bay. Our volunteers support teachers in the classroom, give individual children targeted help and bring fresh impulses into everyday school life. One focus is English: many of our children came to South Africa from Zimbabwe and Malawi with their families and learn in a language nobody speaks at home. On top of that isiXhosa is a school subject in its own right – another hurdle.',
    details: [
      'Unterrichtsunterstützung in den Klassenzimmern',
      'Gezielte Förderung in Englisch durch intensive Nachhilfe in kleinen Gruppen',
      'Individuelle Förderung einzelner Kinder',
      'Enge Zusammenarbeit mit dem Schulpersonal',
      'Mehr Sicherheit im Unterricht – und eigene Lernerfolge',
    ],
    details_en: [
      'Classroom teaching support',
      'Targeted English support through intensive tutoring in small groups',
      'Individual support for single children',
      'Close cooperation with school staff',
      'More confidence in class – and their own learning successes',
    ],
    image: '/images/fotos/freiwillige-mit-kindern.jpg',
    imageAspect: 'aspect-[3/4]',
    photo: 'Freiwillige lernt gemeinsam mit Kindern auf dem Boden sitzend',
    photo_en: 'Volunteer learning together with children, sitting on the floor',
    color: '#ae64fd',
    icon: '📚',
  },
  {
    id: 'freiwillige',
    title: 'Freiwilligenprogramm',
    title_en: 'Volunteer Programme',
    subtitle: 'Internationaler Einsatz in Hout Bay',
    subtitle_en: 'International commitment in Hout Bay',
    description:
      'Unsere Freiwilligen helfen in allen Projekten mit und arbeiten eng mit dem multiprofessionellen Team vor Ort zusammen – ob in der Hout Bay Primary School, der Kronendal Primary oder bei Ubuntu Kids Aftercare. Sie unterstützen die Lehrkräfte, helfen bei den Hausaufgaben, planen Freizeitaktivitäten und begleiten Ausflüge – und bringen dabei ihre eigenen Ideen und Stärken ein.',
    description_en:
      'Our volunteers help in all our projects and work closely with the multi-professional team on site – whether at Hout Bay Primary School, Kronendal Primary or Ubuntu Kids Aftercare. They support the teachers, help with homework, plan leisure activities and accompany excursions – bringing in their own ideas and strengths.',
    details: [
      'Einsatz in Schule und Aftercare',
      'In der Regel 30 bis 40 Stunden pro Woche, Montag bis Freitag',
      'Mindestdauer: zwei Monate',
      'Persönliche Begleitung vor, während und nach dem Aufenthalt',
      'Sichere Unterkunft mit anderen Freiwilligen',
    ],
    details_en: [
      'Placement in school and aftercare',
      'Usually 30 to 40 hours per week, Monday to Friday',
      'Minimum duration: two months',
      'Personal support before, during and after the stay',
      'Safe accommodation shared with other volunteers',
    ],
    image: '/images/fotos/freiwillige-am-strand.jpg',
    imageAspect: 'aspect-[3/2]',
    photo: 'Freiwillige mit Kindern am Strand von Hout Bay',
    photo_en: 'Volunteer with children on the beach in Hout Bay',
    color: '#f7a900',
    icon: '🤝',
  },
]

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params
  const isEn = locale === 'en'
  return {
    title: isEn ? 'Our Projects | Ubuntu for Africa e.V.' : 'Unsere Projekte | Ubuntu for Africa e.V.',
    description: isEn
      ? 'Ubuntu Kids Aftercare, school partnership, volunteer programme – our projects in Imizamo Yethu, Hout Bay.'
      : 'Ubuntu Kids Aftercare, Schulkooperation, Freiwilligenprogramm – unsere Projekte in Imizamo Yethu, Hout Bay.',
    openGraph: {
      title: isEn ? 'Our Projects | Ubuntu for Africa e.V.' : 'Unsere Projekte | Ubuntu for Africa e.V.',
      description: isEn
        ? 'Ubuntu Kids Aftercare, school partnership, volunteer programme – our projects in Imizamo Yethu, Hout Bay.'
        : 'Ubuntu Kids Aftercare, Schulkooperation, Freiwilligenprogramm – unsere Projekte in Imizamo Yethu, Hout Bay.',
      images: [{ url: 'https://ubuntuforafrica.com/images/Ubuntu_Logo.png' }],
      locale: isEn ? 'en_GB' : 'de_DE',
    },
  }
}

export default async function ProjektePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = (de: string, en: string) => locale === 'en' ? en : de

  let sanityProjects: Project[] = []
  try {
    sanityProjects = await client.fetch(projectsQuery)
  } catch {
    // Sanity unavailable
  }

  const useSanity = sanityProjects.length > 0

  const week = [
    { day: t('Mittwoch & Donnerstag', 'Wednesday & Thursday'), text: t('Computerkurs für die Klassen 3 bis 5', 'Computer course for grades 3 to 5') },
    { day: t('Freitag', 'Friday'), text: t('Ausflüge zum Strand oder zum Spielplatz', 'Trips to the beach or the playground') },
    { day: t('Samstag', 'Saturday'), text: t('Training der Fußballmannschaft „Ubuntu Kids“', 'Training of the “Ubuntu Kids” football team') },
  ]

  return (
    <>
      <section className="relative py-32 overflow-hidden text-white">
        <HeroPhoto src="/images/fotos/hero-projekte.jpg" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#212529]/85 to-[#11aed1]/40" />
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <p className="text-[#f7a900] text-sm font-semibold uppercase tracking-widest mb-4">
            {t('Was wir tun', 'What we do')}
          </p>
          <h1 className="text-5xl font-bold mb-6 md:text-6xl">{t('Unsere Projekte', 'Our Projects')}</h1>
          <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
            {t(
              'Drei Bereiche, ein Ziel: Kindern und Jugendlichen in Imizamo Yethu echte Chancen eröffnen.',
              'Three areas, one goal: giving children and young people in Imizamo Yethu real opportunities.'
            )}
          </p>
        </div>
      </section>

      {useSanity
        ? sanityProjects.map((project, i) => {
            const title = locale === 'en' ? (project.title_en ?? project.title) : project.title
            const description = locale === 'en' ? (project.description_en ?? project.description) : project.description
            return (
              <section key={project._id} className={`py-20 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                <div className="mx-auto max-w-7xl px-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                      <h2 className="text-4xl font-bold text-[#212529] mb-5">{title}</h2>
                      {description && <p className="text-gray-600 leading-relaxed mb-8">{description}</p>}
                    </div>
                    {project.mainImage ? (
                      <div className={`relative rounded-2xl overflow-hidden aspect-[4/3] ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                        <Image
                          src={urlFor(project.mainImage).width(800).url()}
                          alt={project.mainImage.alt ?? title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                        <PhotoSlot describe={t('Foto zu diesem Projekt', 'Photo for this project')} />
                      </div>
                    )}
                  </div>
                </div>
              </section>
            )
          })
        : hardcodedProjects.map((project, i) => {
            const title = locale === 'en' ? project.title_en : project.title
            const subtitle = locale === 'en' ? project.subtitle_en : project.subtitle
            const description = locale === 'en' ? project.description_en : project.description
            const details = locale === 'en' ? project.details_en : project.details
            const photo = locale === 'en' ? project.photo_en : project.photo
            return (
              <section key={project.id} className={`py-20 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                <div className="mx-auto max-w-7xl px-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-6"
                        style={{ backgroundColor: project.color + '20' }}
                      >
                        {project.icon}
                      </div>
                      <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: project.color }}>
                        {subtitle}
                      </p>
                      <h2 className="text-4xl font-bold text-[#212529] mb-5">{title}</h2>
                      <p className="text-gray-600 leading-relaxed mb-8">{description}</p>
                      <ul className="space-y-3 mb-8">
                        {details.map((detail, j) => (
                          <li key={j} className="flex items-start gap-3">
                            <div
                              className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                              style={{ backgroundColor: project.color }}
                            >
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <span className="text-gray-700 text-sm">{detail}</span>
                          </li>
                        ))}
                      </ul>
                      {project.id === 'freiwillige' && (
                        <Link
                          href="/freiwillige"
                          className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-white transition-colors"
                          style={{ backgroundColor: project.color }}
                        >
                          {t('Zum Freiwilligenprogramm →', 'To Volunteer Programme →')}
                        </Link>
                      )}
                    </div>
                    <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                      <Photo src={project.image} alt={photo} aspect={project.imageAspect} />
                    </div>
                  </div>
                </div>
              </section>
            )
          })}

      {/* Wochenplan und digitale Förderung: gehören zur Aftercare, waren in den
          Texten aber bisher nirgends auf der Website abgebildet. */}
      <section className="py-20 bg-[#212529] text-white">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center mb-14">
            <p className="text-[#f7a900] text-sm font-semibold uppercase tracking-widest mb-3">
              {t('Aftercare im Detail', 'Aftercare in detail')}
            </p>
            <h2 className="text-4xl font-bold">{t('Besondere Aktivitäten', 'Special activities')}</h2>
            <p className="text-gray-400 mt-4 max-w-xl mx-auto">
              {t('Jeder Tag bringt neue Impulse.', 'Every day brings something new.')}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {week.map((item) => (
              <div key={item.day} className="rounded-2xl bg-white/5 border border-white/10 p-6">
                <p className="text-[#11aed1] text-sm font-semibold uppercase tracking-widest mb-2">{item.day}</p>
                <p className="text-gray-200">{item.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 rounded-2xl bg-white/5 border border-white/10 p-8">
            <h3 className="text-xl font-bold mb-3">{t('Digitale Förderung', 'Digital learning')}</h3>
            <p className="text-gray-300 leading-relaxed">
              {t(
                'Dank unserer Sponsoren nehmen Schüler:innen der Klassen 3 bis 5 seit 2025 regelmäßig an einem Computerkurs teil und arbeiten mit Tablets. Die digitalen Hilfsmittel unterstützen sie bei den Hausaufgaben, beim Verbessern der Sprachkenntnisse und beim Erlernen grundlegender Computerfähigkeiten.',
                'Thanks to our sponsors, pupils in grades 3 to 5 have taken part in a regular computer course since 2025 and work with tablets. The digital tools help them with homework, with improving their language skills and with learning basic computer skills.'
              )}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#11aed1]">
        <div className="mx-auto max-w-3xl px-6 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">{t('Unterstütze unsere Projekte', 'Support our projects')}</h2>
          <p className="text-xl text-white/90 mb-10">
            {t(
              'Jede Spende, jeder Einsatz als Freiwillige:r trägt dazu bei, dass wir unsere Arbeit fortführen und ausbauen können.',
              'Every donation, every volunteer commitment helps us continue and expand our work.'
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/spenden"
              className="inline-flex items-center justify-center rounded-full bg-white text-[#11aed1] px-8 py-4 text-lg font-bold hover:bg-white/90 transition-colors"
            >
              {t('Jetzt spenden', 'Donate now')}
            </Link>
            <Link
              href="/freiwillige"
              className="inline-flex items-center justify-center rounded-full border-2 border-white text-white px-8 py-4 text-lg font-semibold hover:bg-white/10 transition-colors"
            >
              {t('Als Freiwillige:r engagieren', 'Volunteer with us')}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
