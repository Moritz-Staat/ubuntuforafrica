import type { Metadata } from 'next'
import { Link } from '@/i18n/routing'
import { client } from '@/sanity/lib/client'
import { teamMembersQuery, pageQuery } from '@/sanity/lib/queries'
import { usable } from '@/sanity/lib/usable'
import { PhotoSlot } from '@/components/Placeholder'

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

type Person = {
  name: string
  role: string
  role_en: string
  description: string
  description_en: string
}

/**
 * Beide Teams stehen vollständig im Code, weil sie in den freigegebenen Texten
 * vollständig aufgeführt sind ("Website - Text über uns und Team SA.docx",
 * "Website - Text Verein.docx").
 *
 * Sanity darf einzelne Personen überschreiben oder ergänzen, aber niemanden
 * verschwinden lassen – vorher ersetzten drei unvollständige Sanity-Dokumente
 * die komplette Liste, dadurch fehlten auf der Seite Menschen.
 */
const teamSA: Person[] = [
  {
    name: 'Marina Vucurevic',
    role: 'Projektleitung & Fundraising',
    role_en: 'Project lead & fundraising',
    description:
      'Marina lebt seit 1997 in Kapstadt und leitet seit 2025 die Projekte vor Ort. Sie verbindet die Arbeit in Hout Bay mit dem Verein und dem Vorstand in Deutschland.',
    description_en:
      'Marina has lived in Cape Town since 1997 and has led the projects on the ground since 2025. She connects the work in Hout Bay with the association and the board in Germany.',
  },
  {
    name: 'Brenda Moloto',
    role: 'Leitung der Aftercare',
    role_en: 'Head of aftercare',
    description:
      'Brenda leitet die Aftercare, koordiniert die Freiwilligen und begleitet sie während ihres gesamten Aufenthalts.',
    description_en:
      'Brenda runs the aftercare, coordinates the volunteers and supports them throughout their stay.',
  },
  {
    name: 'Andiswa Watsha',
    role: 'Allgemeine Betreuung',
    role_en: 'General care',
    description:
      'Andiswa verantwortet das allgemeine Management der Aftercare und sorgt dafür, dass der Nachmittag für rund 40 Kinder verlässlich läuft.',
    description_en:
      'Andiswa is responsible for the general management of the aftercare and makes sure the afternoon runs reliably for around 40 children.',
  },
  {
    name: 'Zizipho Nyanga',
    role: 'Pädagogische Betreuung',
    role_en: 'Educational support',
    description:
      'Zizipho ist Lehrerin und begleitet die Kinder bei Hausaufgaben, Nachhilfe und der Sprachförderung in isiXhosa.',
    description_en:
      'Zizipho is a teacher and supports the children with homework, tutoring and isiXhosa language learning.',
  },
  {
    name: 'Mzwandile „Zwaai“ Ntozini',
    role: 'Sportliche Betreuung',
    role_en: 'Sports coaching',
    description:
      'Zwaai ist Sportpädagoge, gestaltet die Bewegungsangebote und trainiert die Fußballmannschaft der Ubuntu Kids.',
    description_en:
      'Zwaai is a sports educator, runs the physical activities and coaches the Ubuntu Kids football team.',
  },
]

const teamDE: Person[] = [
  {
    name: 'Birgitta Latz',
    role: '1. Vorsitzende',
    role_en: 'Chair',
    description:
      'Sozialpädagogin in Hamburg und ehemalige weltwärts-Freiwillige (09/2015–12/2016). Sie kennt die Arbeit vor Ort aus eigener Erfahrung.',
    description_en:
      'Social educator in Hamburg and former weltwärts volunteer (09/2015–12/2016). She knows the work on the ground from her own experience.',
  },
  {
    name: 'Hanna Zabel',
    role: '2. Vorsitzende',
    role_en: 'Vice chair',
    description:
      'Pädagogin in Herne und ehemalige Freiwillige (01–03/2023). Sie bringt ihre Erfahrungen aus Hout Bay in die Vereinsarbeit ein.',
    description_en:
      'Educator in Herne and former volunteer (01–03/2023). She brings her experience from Hout Bay into the work of the association.',
  },
]

/**
 * Sanity-Einträge über die Liste aus dem Code legen: gleiche Namen werden
 * überschrieben, unbekannte Namen kommen hinten dazu.
 */
function mergeTeam(base: Person[], fromSanity: TeamMember[], locale: string) {
  const merged = base.map((person) => {
    const match = fromSanity.find((m) => m.name.trim() === person.name.trim())
    if (!match) return person
    const role = locale === 'en'
      ? usable(match.role_en) ?? usable(match.role)
      : usable(match.role)
    const bio = locale === 'en'
      ? usable(match.bio_en) ?? usable(match.bio)
      : usable(match.bio)
    return {
      ...person,
      role: role ?? person.role,
      description: bio ?? person.description,
    }
  })

  const extra = fromSanity
    .filter((m) => !base.some((person) => person.name.trim() === m.name.trim()))
    .map((m) => ({
      name: m.name,
      role: locale === 'en' ? (m.role_en ?? m.role) : m.role,
      role_en: m.role_en ?? m.role,
      description: locale === 'en' ? (m.bio_en ?? m.bio ?? '') : (m.bio ?? ''),
      description_en: m.bio_en ?? m.bio ?? '',
    }))

  return [...merged, ...extra]
}

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params
  const isEn = locale === 'en'
  return {
    title: isEn ? 'About Us & Team | Ubuntu for Africa e.V.' : 'Über uns & Team | Ubuntu for Africa e.V.',
    description: isEn
      ? 'Meet the Ubuntu for Africa e.V. team – active in Hout Bay, Cape Town since 2008. Founded by Sylke Funk, driven by volunteers.'
      : 'Lerne das Team von Ubuntu for Africa e.V. kennen – seit 2008 in Hout Bay, Kapstadt aktiv. Gegründet von Sylke Funk, getragen von Ehrenamtlichen.',
    openGraph: {
      title: isEn ? 'About Us & Team | Ubuntu for Africa e.V.' : 'Über uns & Team | Ubuntu for Africa e.V.',
      description: isEn
        ? 'Meet the Ubuntu for Africa e.V. team – active in Hout Bay, Cape Town since 2008. Founded by Sylke Funk, driven by volunteers.'
        : 'Lerne das Team von Ubuntu for Africa e.V. kennen – seit 2008 in Hout Bay, Kapstadt aktiv. Gegründet von Sylke Funk, getragen von Ehrenamtlichen.',
      images: [{ url: 'https://ubuntuforafrica.com/images/Ubuntu_Logo.png' }],
      locale: isEn ? 'en_GB' : 'de_DE',
    },
  }
}

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
    // Sanity nicht erreichbar – die Liste aus dem Code trägt die Seite allein.
  }

  const displayTeamSA = mergeTeam(teamSA, sanityMembers.filter((m) => m.team === 'sa'), locale)
  const displayTeamDE = mergeTeam(teamDE, sanityMembers.filter((m) => m.team === 'de'), locale)

  const pageTitle =
    usable(locale === 'en' ? pageContent?.title_en : pageContent?.title_de)
    ?? t('Über uns', 'About Us')

  const pageSubtitle =
    usable(locale === 'en' ? pageContent?.hero_subtitle_en : pageContent?.hero_subtitle_de)
    ?? t(
      'Seit 2008 im Einsatz für Kinder in Südafrika.',
      'Working for children in South Africa since 2008.'
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

      {/* Einstieg: derselbe Text wie der Teaser auf der Startseite, damit der
          Faden nicht abreißt – und danach geht es in die Tiefe. */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-3xl px-6">
          <p className="text-[#11aed1] text-sm font-semibold uppercase tracking-widest mb-3">
            {t('Gemeinsam stark für Kinder in Südafrika', 'Together for children in South Africa')}
          </p>
          <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
            <p>
              {t(
                'Ubuntu for Africa e.V. ist ein in Deutschland eingetragener gemeinnütziger Verein, der Projekte in Hout Bay (Kapstadt, Südafrika) initiiert und begleitet. Unser Ziel ist ein sicherer Ort für den Nachmittag: ein Raum, in dem Kinder sich entwickeln und entfalten können, in dem soziale und schulische Kompetenzen gefördert werden – und in dem sie einfach Kind sein dürfen.',
                'Ubuntu for Africa e.V. is a registered non-profit association in Germany that initiates and accompanies projects in Hout Bay (Cape Town, South Africa). Our goal is a safe place for the afternoon: a space where children can grow and develop, where social and academic skills are nurtured – and where they can simply be children.'
              )}
            </p>
            <p>
              {t(
                'Die Organisation wird von zwei eng miteinander verbundenen Teams getragen: Das südafrikanische Team gestaltet die operative Arbeit direkt vor Ort und ist täglich mit den Kindern im Einsatz. Das deutsche Team unterstützt diese Arbeit vor allem organisatorisch, strategisch und finanziell.',
                'The organisation is carried by two closely connected teams: the South African team does the operational work directly on the ground and is with the children every day. The German team supports this work organisationally, strategically and financially.'
              )}
            </p>
            <p>
              {t(
                'Gemeinsam arbeiten wir daran, Bildungsangebote, Betreuung und Unterstützung dort zu ermöglichen, wo sie am dringendsten gebraucht werden – im Township Imizamo Yethu in Hout Bay.',
                'Together we work to provide education, care and support where they are needed most – in the township of Imizamo Yethu in Hout Bay.'
              )}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-[#11aed1] text-sm font-semibold uppercase tracking-widest mb-3">
                {t('Unsere Geschichte', 'Our Story')}
              </p>
              <h2 className="text-4xl font-bold text-[#212529] mb-6">
                {t('Wie alles begann', 'How it all began')}
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  {t(
                    'Sylke Funk gründete Ubuntu for Africa e.V. 2008 aus einer einfachen, aber dringenden Erkenntnis heraus: Die Not vieler Kinder und Familien ist groß – und es braucht Menschen, die handeln. Als Sozialarbeiterin und Familientherapeutin arbeitete sie täglich ehrenamtlich in der Townshipschule in Imizamo Yethu mit Kindern, die Armut, Gewalt oder Vernachlässigung erfahren mussten.',
                    'Sylke Funk founded Ubuntu for Africa e.V. in 2008 out of a simple but urgent realisation: the hardship of many children and families is great – and it takes people who act. As a social worker and family therapist she worked every day, on a voluntary basis, at the township school in Imizamo Yethu with children who had experienced poverty, violence or neglect.'
                  )}
                </p>
                <p>
                  <strong className="text-[#212529]">{t('Unsere Anfänge. ', 'Our beginnings. ')}</strong>
                  {t(
                    'Ohne finanzielle Mittel begann alles mit dem, was verfügbar war – Engagement und Mitgefühl. Sylke gewann Freiwillige, die sie in der Betreuung der Kinder unterstützten. Gemeinsam mit lokalen Partnern entstanden aus dieser Arbeit erste Strukturen und Organisationen vor Ort.',
                    'With no funding, everything started with what was available – commitment and compassion. Sylke found volunteers who supported her in caring for the children. Together with local partners, the first structures and organisations emerged from this work.'
                  )}
                </p>
                <p>
                  <strong className="text-[#212529]">{t('Wachstum und Entwicklung. ', 'Growth and development. ')}</strong>
                  {t(
                    'Um die Projekte nachhaltig zu stärken, wurde 2015 der Verein Ubuntu 4 All Kinder-, Jugend- und Familienhilfe e.V. gegründet – als Unterstützungsbasis für die südafrikanischen Initiativen. Heute sind alle Aktivitäten unter einem gemeinsamen Namen vereint: UBUNTU for Africa Kinder-, Jugend- und Familienhilfe e.V.',
                    'To strengthen the projects sustainably, the association Ubuntu 4 All Kinder-, Jugend- und Familienhilfe e.V. was founded in 2015 as a support base for the South African initiatives. Today all activities are united under one name: UBUNTU for Africa Kinder-, Jugend- und Familienhilfe e.V.'
                  )}
                </p>
                <p>
                  <strong className="text-[#212529]">{t('Wer wir sind. ', 'Who we are. ')}</strong>
                  {t(
                    'Unser Vorstand in Deutschland besteht aus Menschen, die die Arbeit vor Ort selbst über einen längeren Zeitraum erlebt haben – darunter ehemalige Freiwillige. Seit 2025 hat Marina Vucurevic die Verantwortung in Kapstadt übernommen. Sie lebt seit 1997 vor Ort und bildet die zentrale Brücke zwischen den Projekten in Südafrika und dem Verein in Deutschland.',
                    'Our board in Germany consists of people who have experienced the work on the ground themselves over a longer period – among them former volunteers. Since 2025 Marina Vucurevic has taken over responsibility in Cape Town. She has lived there since 1997 and forms the central bridge between the projects in South Africa and the association in Germany.'
                  )}
                </p>
              </div>
            </div>
            <PhotoSlot describe={t('Gründerin Sylke Funk oder Team vor Ort', 'Founder Sylke Funk or team on site')} />
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-[#f7a900] text-sm font-semibold uppercase tracking-widest mb-3">
            {t('Unsere Motivation', 'What motivates us')}
          </p>
          <h2 className="text-3xl font-bold text-[#212529] mb-6">
            {t('Jede Zukunft beginnt mit einer Chance', 'Every future begins with a chance')}
          </h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              {t(
                'Wir haben über Jahre miterlebt, wie herausfordernd der Alltag vieler Kinder in Imizamo Yethu ist. Genau deshalb setzen wir uns mit voller Überzeugung für bessere Lebens- und Lernbedingungen ein.',
                'Over the years we have seen how challenging everyday life is for many children in Imizamo Yethu. That is exactly why we are fully committed to better living and learning conditions.'
              )}
            </p>
            <p>
              {t(
                'Wir glauben daran, dass Veränderung möglich ist – durch Gemeinschaft, Engagement und nachhaltige Unterstützung. Jede Hilfe zählt.',
                'We believe that change is possible – through community, commitment and sustainable support. Every bit of help counts.'
              )}
            </p>
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
              'Diese afrikanische Lebensphilosophie bildet die Grundlage unserer Arbeit. Sie steht für Gemeinschaft, gegenseitige Unterstützung und die Überzeugung, dass nachhaltige Veränderung nur gemeinsam entstehen kann.',
              'This African life philosophy is the foundation of our work. It stands for community, mutual support and the conviction that lasting change can only be created together.'
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
            <h2 className="text-4xl font-bold text-[#212529]">{t('Unsere Ziele', 'Our Goals')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🌱',
                title: t('Selbstbestimmung stärken', 'Empowering self-determination'),
                text: t(
                  'Kindern einen verlässlichen Rahmen geben, in dem sie ihre Stärken entdecken und langfristige Perspektiven entwickeln können.',
                  'Giving children a reliable framework in which they can discover their strengths and develop long-term prospects.'
                ),
                color: '#11aed1',
              },
              {
                icon: '🤝',
                title: t('Vor Ort wirken', 'Impact on the ground'),
                text: t(
                  'Das südafrikanische Team ist täglich im Einsatz. Der Verein unterstützt organisatorisch, strategisch und finanziell.',
                  'The South African team is on the ground every day. The association supports organisationally, strategically and financially.'
                ),
                color: '#ae64fd',
              },
              {
                icon: '💡',
                title: t('Chancen schaffen', 'Creating opportunities'),
                text: t(
                  'Bildung, Englischförderung, Sport und Gemeinschaft – wir schaffen Räume, in denen Kinder lernen, wachsen und einfach Kind sein dürfen.',
                  'Education, English support, sport and community – we create spaces where children can learn, grow and simply be children.'
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
                'Unser Team in Kapstadt arbeitet täglich daran, Kindern in schwierigen Lebenssituationen Perspektiven zu schaffen.',
                'Our team in Cape Town works every day to create prospects for children in difficult circumstances.'
              )}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
          <p className="mt-10 text-center text-sm text-gray-500">
            {t('Teamfotos folgen.', 'Team photos to follow.')}
          </p>
        </div>
      </section>

      {/* Marina ausführlich: sie ist Ansprechperson für Projekte und Fundraising. */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-4xl px-6">
          <div className="bg-white rounded-2xl p-10 shadow-sm">
            <p className="text-[#f7a900] text-sm font-semibold uppercase tracking-widest mb-3">
              {t('Ansprechpartnerin vor Ort', 'Contact on the ground')}
            </p>
            <h2 className="text-3xl font-bold text-[#212529] mb-6">Marina Vucurevic</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                {t(
                  'Gebürtig aus Bad Dürkheim, lebt Marina seit 1997 in Kapstadt und ist seit 2010 Assistentin der Schulleitung an der Deutschen Internationalen Schule Kapstadt. Schon früh setzte sie sich intensiv mit den sozialen Herausforderungen und der Armut in Kapstadt auseinander – mit dem klaren Ziel, einen nachhaltigen Beitrag zu leisten.',
                  'Originally from Bad Dürkheim, Marina has lived in Cape Town since 1997 and has been assistant to the school management at the German International School Cape Town since 2010. Early on she engaged intensively with the social challenges and poverty in Cape Town – with the clear aim of making a lasting contribution.'
                )}
              </p>
              <p>
                {t(
                  'Ihre ersten praktischen Erfahrungen sammelte sie als Freiwillige in einer Organisation für Straßenkinder. 2001 gründete sie die Initiative „Reisen mit Herz“ und ermöglichte Besucher:innen, durch gezielte Spenden Kindern aus schwierigsten Lebensverhältnissen den Schulbesuch zu finanzieren – vom Schultransport über Schulkleidung bis zur Versorgung von Familien mit Lebensmitteln.',
                  'She gained her first practical experience as a volunteer in an organisation for street children. In 2001 she founded the initiative “Reisen mit Herz”, enabling visitors to fund schooling for children from the most difficult circumstances through targeted donations – from school transport and school clothing to providing families with food.'
                )}
              </p>
              <p>
                {t(
                  'Seit 2025 leitet Marina die Projekte von Ubuntu for Africa e.V. in Kapstadt und verantwortet Projektkoordination wie Fundraising. Für diesen Einsatz erhält sie eine Aufwandsentschädigung.',
                  'Since 2025 Marina has led the Ubuntu for Africa e.V. projects in Cape Town and is responsible for project coordination as well as fundraising. She receives an expense allowance for this work.'
                )}
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-1 text-sm">
              <a href="mailto:marina.vucurevic@gmx.de" className="text-[#11aed1] font-semibold hover:underline">
                marina.vucurevic@gmx.de
              </a>
              <a href="tel:+27722780171" className="text-[#11aed1] font-semibold hover:underline">
                +27 72 2780171
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-14">
            <p className="text-[#ae64fd] text-sm font-semibold uppercase tracking-widest mb-3">
              {t('Vereinsvorstand', 'Board of Directors')}
            </p>
            <h2 className="text-4xl font-bold text-[#212529]">{t('Team Deutschland', 'Germany Team')}</h2>
            <p className="text-gray-600 mt-4 max-w-xl mx-auto">
              {t(
                'Im deutschen Verein sind ehemalige Freiwillige und enge Freund:innen der Organisation tätig – alle ehrenamtlich.',
                'The German association is run by former volunteers and close friends of the organisation – all on a voluntary basis.'
              )}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {displayTeamDE.map((member) => (
              <div key={member.name} className="bg-gray-50 rounded-2xl p-8 shadow-sm text-center">
                <div className="w-20 h-20 rounded-full bg-[#ae64fd]/10 flex items-center justify-center mx-auto mb-4 text-3xl">
                  👤
                </div>
                <h3 className="font-bold text-[#212529] text-xl mb-1">{member.name}</h3>
                <p className="text-[#ae64fd] text-sm font-semibold mb-4">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>

          {/* Gründerin: gehört laut Überarbeitungsvorschlägen in den Bereich Team DE. */}
          <div className="mt-10 max-w-2xl mx-auto rounded-2xl border-2 border-[#f7a900]/30 p-8 text-center">
            <p className="text-[#f7a900] text-sm font-semibold uppercase tracking-widest mb-2">
              {t('Gründerin', 'Founder')}
            </p>
            <h3 className="font-bold text-[#212529] text-xl mb-3">Sylke Funk</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {t(
                'Sylke hat Ubuntu for Africa e.V. 2008 gegründet und über viele Jahre geprägt. Ende 2024 ist sie offiziell aus dem Verein ausgetreten – sie hat ihr Privatleben auf ein Segelschiff verlegt und bereist seitdem die Weltmeere. Dem Verein bleibt sie eng verbunden und unterstützt ihn weiterhin mit Rat und Tat.',
                'Sylke founded Ubuntu for Africa e.V. in 2008 and shaped it for many years. At the end of 2024 she officially left the association – she has moved her private life onto a sailing boat and has been travelling the oceans ever since. She remains closely connected to the association and continues to support it with advice and practical help.'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Verweis auf die Transparenz-Seite: dort stehen Mittelverwendung und
          Struktur im Detail. Vorher war die Seite nur über den Footer zu finden. */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-2xl font-bold text-[#212529] mb-3">
            {t('Wie wir arbeiten und wofür Spenden verwendet werden', 'How we work and what donations are used for')}
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            {t(
              'Der Vorstand in Deutschland arbeitet vollständig ehrenamtlich, das Team in Südafrika wird fair aus Spenden vergütet. Alle Details dazu stehen auf der Transparenz-Seite.',
              'The board in Germany works entirely on a voluntary basis, the team in South Africa is fairly paid from donations. All the details are on the transparency page.'
            )}
          </p>
          <Link
            href="/transparenz"
            className="inline-flex items-center justify-center rounded-full border-2 border-[#11aed1] text-[#11aed1] px-8 py-3 font-semibold hover:bg-[#11aed1] hover:text-white transition-colors"
          >
            {t('Zur Transparenz-Seite', 'To the transparency page')}
          </Link>
        </div>
      </section>

      <section className="py-16 bg-[#212529]">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {t('Werde Teil der Gemeinschaft', 'Become part of the community')}
          </h2>
          <p className="text-gray-400 mb-8">
            {t(
              'Unterstütze unsere Arbeit – durch eine Spende, als Freiwillige:r oder einfach durch das Teilen unserer Geschichte.',
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
