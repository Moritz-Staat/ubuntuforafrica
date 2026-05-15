import Image from 'next/image'
import { Link } from '@/i18n/routing'
import { client } from '@/sanity/lib/client'
import { projectsQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'

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

const hardcodedProjects = [
  {
    id: 'aftercare',
    title: 'Ubuntu Kids Aftercare',
    title_en: 'Ubuntu Kids Aftercare',
    subtitle: 'Nachmittagsbetreuung in Imizamo Yethu',
    subtitle_en: 'Afternoon care in Imizamo Yethu',
    description: 'Das Herzstück unserer Arbeit: Die Ubuntu Kids Aftercare bietet Kindern aus Imizamo Yethu einen sicheren Raum am Nachmittag. Hier bekommen sie Unterstützung bei den Hausaufgaben, eine warme Mahlzeit, sportliche Aktivitäten und kreative Förderung.',
    description_en: 'The heart of our work: Ubuntu Kids Aftercare offers children from Imizamo Yethu a safe space in the afternoons. Here they receive homework support, a warm meal, sporting activities and creative programmes.',
    details: [
      'Hausaufgabenhilfe und schulische Unterstützung',
      'Tägliche warme Mahlzeit',
      'Sport- und Bewegungsangebote',
      'Kreative Aktivitäten und Kunstprojekte',
      'Emotionale Begleitung und Beziehungsarbeit',
    ],
    details_en: [
      'Homework help and academic support',
      'Daily warm meal',
      'Sports and physical activities',
      'Creative activities and art projects',
      'Emotional support and relationship building',
    ],
    image: null,
    color: '#11aed1',
    icon: '🏠',
  },
  {
    id: 'schule',
    title: 'Schulkooperation',
    title_en: 'School Partnership',
    subtitle: 'Hout Bay Primary & Kronendal Primary',
    subtitle_en: 'Hout Bay Primary & Kronendal Primary',
    description: 'Wir kooperieren eng mit zwei Grundschulen in Hout Bay. Unsere Freiwilligen unterstützen Lehrerinnen im Unterricht, helfen einzelnen Kindern und bringen neue Impulse, Energie und internationale Perspektiven in den Schulalltag.',
    description_en: 'We work closely with two primary schools in Hout Bay. Our volunteers support teachers in the classroom, help individual children and bring fresh ideas, energy and international perspectives to everyday school life.',
    details: [
      'Unterrichtsunterstützung in Klassenzimmern',
      'Individuelle Förderung schwächerer Schüler:innen',
      'Einbringen von kreativen Unterrichtsmethoden',
      'Enge Zusammenarbeit mit dem Schulpersonal',
      'Regelmäßige Austausche und Fortbildungen',
    ],
    details_en: [
      'Classroom teaching support',
      'Individual support for weaker students',
      'Bringing in creative teaching methods',
      'Close collaboration with school staff',
      'Regular exchanges and training',
    ],
    image: null,
    color: '#ae64fd',
    icon: '📚',
  },
  {
    id: 'freiwillige',
    title: 'Freiwilligenprogramm',
    title_en: 'Volunteer Programme',
    subtitle: 'Internationaler Einsatz in Hout Bay',
    subtitle_en: 'International commitment in Hout Bay',
    description: 'Unser Freiwilligenprogramm ermöglicht es Menschen aus aller Welt, aktiv in unseren Projekten mitzuwirken. Mindestens drei Monate, 30–35 Stunden pro Woche, mit persönlicher Betreuung vor, während und nach dem Aufenthalt.',
    description_en: 'Our volunteer programme enables people from all over the world to actively participate in our projects. At least three months, 30–35 hours per week, with personal support before, during and after the stay.',
    details: [
      'Einsatz in Schule und Aftercare',
      'Persönliche Begleitung durch das lokale Team',
      'Unterkunft in Hout Bay inklusive',
      'Sprachkurse und Kultureinführung',
      'Vernetzung mit anderen Freiwilligen weltweit',
    ],
    details_en: [
      'Work in school and aftercare',
      'Personal support from the local team',
      'Accommodation in Hout Bay included',
      'Language courses and cultural orientation',
      'Networking with volunteers worldwide',
    ],
    image: null,
    color: '#f7a900',
    icon: '🤝',
  },
]

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

  return (
    <>
      <section className="py-32 bg-gradient-to-br from-[#212529] to-[#11aed1]/30 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
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
                    {project.mainImage && (
                      <div className={`relative rounded-2xl overflow-hidden aspect-[4/3] ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                        <Image
                          src={urlFor(project.mainImage).width(800).url()}
                          alt={project.mainImage.alt ?? title}
                          fill
                          className="object-cover"
                        />
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
                    <div className={`relative rounded-2xl overflow-hidden aspect-[4/3] ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                      <div className="absolute inset-0 flex items-center justify-center text-white/30">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  </div>
                    </div>
                  </div>
                </div>
              </section>
            )
          })}

      <section className="py-20 bg-[#11aed1]">
        <div className="mx-auto max-w-3xl px-6 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">{t('Unterstütze unsere Projekte', 'Support our projects')}</h2>
          <p className="text-xl text-white/90 mb-10">
            {t(
              'Jede Spende, jeder Einsatz als Freiwilliger trägt dazu bei, dass wir unsere Arbeit fortführen und ausbauen können.',
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
              {t('Als Freiwilliger engagieren', 'Volunteer with us')}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
