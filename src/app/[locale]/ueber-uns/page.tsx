import Image from 'next/image'
import { Link } from '@/i18n/routing'
import { client } from '@/sanity/lib/client'
import { teamMembersQuery, pageQuery } from '@/sanity/lib/queries'

interface TeamMember {
  _id: string
  name: string
  role: string
  role_en?: string
  team: 'sa' | 'de'
  bio?: string
  bio_en?: string
}

interface PageContent {
  title_de?: string
  title_en?: string
  hero_subtitle_de?: string
  hero_subtitle_en?: string
}

const hardcodedTeamSA = [
  {
    name: 'Brenda Moloto',
    role: 'Project Manager & Freiwilligenkoordinatorin',
    role_en: 'Project Manager & Volunteer Coordinator',
    description: 'Brenda koordiniert das gesamte Projekt vor Ort und ist die zentrale Ansprechperson für Freiwillige und Partner.',
    description_en: 'Brenda coordinates the entire project on-site and is the central contact for volunteers and partners.',
  },
  {
    name: 'Andiswa Watsha',
    role: 'Aftercare Management',
    role_en: 'Aftercare Management',
    description: 'Andiswa leitet das allgemeine Management der After Care und sorgt für einen reibungslosen Tagesablauf.',
    description_en: 'Andiswa manages the aftercare program and ensures a smooth daily routine.',
  },
  {
    name: 'Zizipho Nyanga',
    role: 'Lehrerin',
    role_en: 'Teacher',
    description: 'Zizipho unterstützt die Kinder in ihrer schulischen Entwicklung und führt Nachhilfeprogramme durch.',
    description_en: 'Zizipho supports children in their academic development and runs tutoring programs.',
  },
  {
    name: 'Mzwandile (Zwaai) Ntozini',
    role: 'Sportpädagoge',
    role_en: 'Sports Educator',
    description: 'Zwaai betreut die sportlichen Aktivitäten und nutzt Sport als Mittel zur Persönlichkeitsentwicklung.',
    description_en: 'Zwaai runs sporting activities and uses sport as a tool for personal development.',
  },
]

const hardcodedTeamDE = [
  {
    name: 'Birgitta Latz',
    role: '1. Vorsitzende',
    role_en: 'Chair',
    description: 'Sozialpädagogin in Hamburg, ehemalige weltwärts-Freiwillige (09/2015–12/2016). Birgitta leitet den Verein seit ihrer Rückkehr aus Südafrika.',
    description_en: 'Social educator in Hamburg, former weltwärts volunteer (09/2015–12/2016). Birgitta has led the association since her return from South Africa.',
  },
  {
    name: 'Hanna Zabel',
    role: '2. Vorsitzende',
    role_en: 'Vice Chair',
    description: 'Pädagogin in Herne, ehemalige Freiwillige (01–03/2023). Hanna bringt wertvolle Erfahrungen aus ihrer eigenen Zeit in Hout Bay mit.',
    description_en: 'Educator in Herne, former volunteer (01–03/2023). Hanna brings valuable experience from her own time in Hout Bay.',
  },
]

export default async function UeberUnsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = (de: string, en: string) => locale === 'en' ? en : de

  let sanityMembers: TeamMember[] = []
  let pageContent: PageContent | null = null
  try {
    ;[sanityMembers, pageContent] = await Promise.all([
      client.fetch(teamMembersQuery),
      client.fetch(pageQuery, { pageId: 'ueber-uns' }),
    ])
  } catch {
    // Sanity unavailable - use hardcoded fallbacks
  }

  const useSanity = sanityMembers.length > 0

  const displayTeamSA = useSanity
    ? sanityMembers.filter((m) => m.team === 'sa').map((m) => ({
        name: m.name,
        role: locale === 'en' ? (m.role_en ?? m.role) : m.role,
        description: locale === 'en' ? (m.bio_en ?? m.bio ?? '') : (m.bio ?? ''),
      }))
    : hardcodedTeamSA.map((m) => ({
        name: m.name,
        role: locale === 'en' ? m.role_en : m.role,
        description: locale === 'en' ? m.description_en : m.description,
      }))

  const displayTeamDE = useSanity
    ? sanityMembers.filter((m) => m.team === 'de').map((m) => ({
        name: m.name,
        role: locale === 'en' ? (m.role_en ?? m.role) : m.role,
        description: locale === 'en' ? (m.bio_en ?? m.bio ?? '') : (m.bio ?? ''),
      }))
    : hardcodedTeamDE.map((m) => ({
        name: m.name,
        role: locale === 'en' ? m.role_en : m.role,
        description: locale === 'en' ? m.description_en : m.description,
      }))

  const pageTitle = pageContent
    ? (locale === 'en' ? pageContent.title_en : pageContent.title_de) ?? t('Über uns', 'About Us')
    : t('Über uns', 'About Us')

  const pageSubtitle = pageContent
    ? (locale === 'en' ? pageContent.hero_subtitle_en : pageContent.hero_subtitle_de) ?? ''
    : t(
        'Ein gemeinnütziger Verein mit Herz – gegründet aus Überzeugung, geleitet von Menschen, die selbst erlebt haben, was Ubuntu bedeutet.',
        'A non-profit association with heart – founded out of conviction, led by people who have experienced first-hand what Ubuntu means.'
      )

  return (
    <>
      <section className="relative py-32 bg-[#212529] text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#11aed1]/20 to-[#ae64fd]/10" />
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <p className="text-[#f7a900] text-sm font-semibold uppercase tracking-widest mb-4">
            {t('Wer wir sind', 'Who we are')}
          </p>
          <h1 className="text-5xl font-bold mb-6 md:text-6xl">{pageTitle}</h1>
          <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">{pageSubtitle}</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#11aed1] text-sm font-semibold uppercase tracking-widest mb-3">
                {t('Unsere Geschichte', 'Our Story')}
              </p>
              <h2 className="text-4xl font-bold text-[#212529] mb-6">
                {t('Seit 2008 in Hout Bay', 'In Hout Bay since 2008')}
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  {t(
                    'Ubuntu for Africa wurde 2008 von Sylke Funk ins Leben gerufen – einer Sozialarbeiterin und Familientherapeutin, die erkannte, wie viel Potenzial in den Kindern und Familien von Imizamo Yethu steckt und wie viel mit dem richtigen Angebot möglich ist.',
                    'Ubuntu for Africa was founded in 2008 by Sylke Funk – a social worker and family therapist who recognised the enormous potential in the children and families of Imizamo Yethu.'
                  )}
                </p>
                <p>
                  {t(
                    '2015 wurde der Verein in Deutschland offiziell eingetragen, um die Arbeit auf solidere Füße zu stellen und langfristig zu finanzieren. Seitdem ist Ubuntu for Africa gewachsen – im Team, in der Reichweite und in der Wirkung.',
                    'In 2015 the association was officially registered in Germany to put the work on a more solid footing and secure long-term funding. Since then Ubuntu for Africa has grown – in team size, reach and impact.'
                  )}
                </p>
                <p>
                  {t(
                    'Ende 2024 ist Sylke Funk offiziell aus dem Verein ausgetreten. Seit 2025 übernimmt Marina Vucurevic die Leitung vor Ort in Kapstadt und führt die Arbeit mit neuem Schwung weiter.',
                    'At the end of 2024 Sylke Funk officially stepped down. Since 2025, Marina Vucurevic has taken over the on-site leadership in Cape Town, continuing the work with fresh energy.'
                  )}
                </p>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <Image
                src="/images/WhatsApp_Image_2026-05-14_at_00.39.17.jpeg"
                alt={t('Geschichte Ubuntu for Africa', 'History of Ubuntu for Africa')}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#11aed1] text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest mb-4 text-white/70">
            {t('Unsere Philosophie', 'Our Philosophy')}
          </p>
          <blockquote className="text-3xl font-bold italic mb-6 md:text-4xl">
            &ldquo;Umuntu Ngumntu Ngabantu&rdquo;
          </blockquote>
          <p className="text-2xl mb-8 text-white/90">
            {t('Ich bin, weil wir sind.', 'I am because we are.')}
          </p>
          <p className="text-lg text-white/80 leading-relaxed max-w-2xl mx-auto">
            {t(
              'Ubuntu ist mehr als ein Wort – es ist eine Lebensphilosophie aus dem südlichen Afrika, die Gemeinschaft, gegenseitige Verantwortung und Menschlichkeit in den Mittelpunkt stellt. Dieser Gedanke trägt unsere gesamte Arbeit.',
              'Ubuntu is more than a word – it is a life philosophy from southern Africa that places community, mutual responsibility and humanity at its centre. This idea drives all of our work.'
            )}
          </p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-14">
            <p className="text-[#11aed1] text-sm font-semibold uppercase tracking-widest mb-3">
              {t('Was uns antreibt', 'What drives us')}
            </p>
            <h2 className="text-4xl font-bold text-[#212529]">{t('Unser Ziel', 'Our Mission')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🌱',
                title: t('Selbstbestimmung stärken', 'Empowering self-determination'),
                text: t(
                  'Kinder, Jugendliche und Familien befähigen, ein selbstbestimmtes Leben zu führen und langfristige Perspektiven zu entwickeln.',
                  'Empowering children, youth and families to lead self-determined lives and develop long-term prospects.'
                ),
                color: '#11aed1',
              },
              {
                icon: '🤝',
                title: t('Vor Ort wirken', 'Impact on the ground'),
                text: t(
                  'Das südafrikanische Team ist täglich im Einsatz. Wir unterstützen – strategisch, finanziell und durch Freiwillige.',
                  'The South African team is on the ground every day. We support – strategically, financially and through volunteers.'
                ),
                color: '#ae64fd',
              },
              {
                icon: '💡',
                title: t('Chancen schaffen', 'Creating opportunities'),
                text: t(
                  'Bildung, Sport, Kreativität und emotionale Unterstützung – wir schaffen Räume, in denen Kinder aufblühen können.',
                  'Education, sport, creativity and emotional support – we create spaces where children can flourish.'
                ),
                color: '#f7a900',
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-8 shadow-sm">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-6"
                  style={{ backgroundColor: item.color + '20' }}
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

      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-14">
            <p className="text-[#11aed1] text-sm font-semibold uppercase tracking-widest mb-3">
              {t('Direkt vor Ort', 'On the ground')}
            </p>
            <h2 className="text-4xl font-bold text-[#212529]">{t('Team Südafrika', 'South Africa Team')}</h2>
            <p className="text-gray-600 mt-4 max-w-xl mx-auto">
              {t(
                'Das Team in Hout Bay ist das Herz von Ubuntu for Africa – täglich im Einsatz für und mit den Kindern.',
                'The team in Hout Bay is the heart of Ubuntu for Africa – on duty every day for and with the children.'
              )}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayTeamSA.map((member) => (
              <div key={member.name} className="text-center group">
                <div className="w-24 h-24 rounded-full bg-[#11aed1]/10 flex items-center justify-center mx-auto mb-4 text-3xl group-hover:bg-[#11aed1]/20 transition-colors">
                  👤
                </div>
                <h3 className="font-bold text-[#212529] text-lg mb-1">{member.name}</h3>
                <p className="text-[#11aed1] text-sm font-semibold mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-14">
            <p className="text-[#ae64fd] text-sm font-semibold uppercase tracking-widest mb-3">
              {t('Vereinsvorstand', 'Board of Directors')}
            </p>
            <h2 className="text-4xl font-bold text-[#212529]">{t('Team Deutschland', 'Germany Team')}</h2>
            <p className="text-gray-600 mt-4 max-w-xl mx-auto">
              {t(
                'Der deutsche Vorstand unterstützt die Arbeit in Südafrika organisatorisch, strategisch und finanziell.',
                'The German board supports the work in South Africa organisationally, strategically and financially.'
              )}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {displayTeamDE.map((member) => (
              <div key={member.name} className="bg-white rounded-2xl p-8 shadow-sm text-center">
                <div className="w-20 h-20 rounded-full bg-[#ae64fd]/10 flex items-center justify-center mx-auto mb-4 text-3xl">
                  👤
                </div>
                <h3 className="font-bold text-[#212529] text-xl mb-1">{member.name}</h3>
                <p className="text-[#ae64fd] text-sm font-semibold mb-4">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#212529]">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {t('Werde Teil der Gemeinschaft', 'Become part of the community')}
          </h2>
          <p className="text-gray-400 mb-8">
            {t(
              'Unterstütze unsere Arbeit – durch eine Spende, als Freiwilliger oder einfach durch das Teilen unserer Geschichte.',
              'Support our work – through a donation, as a volunteer or simply by sharing our story.'
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/spenden"
              className="inline-flex items-center justify-center rounded-full bg-[#11aed1] px-8 py-3 font-semibold text-white hover:bg-[#0e8fb5] transition-colors"
            >
              {t('Jetzt spenden', 'Donate now')}
            </Link>
            <Link
              href="/freiwillige"
              className="inline-flex items-center justify-center rounded-full border-2 border-white text-white px-8 py-3 font-semibold hover:bg-white/10 transition-colors"
            >
              {t('Freiwillig engagieren', 'Volunteer with us')}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
