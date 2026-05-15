import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function HomePage() {
  const t = useTranslations();

  const projects = [
    {
      title: 'Ubuntu Kids Aftercare',
      description: 'Nachmittagsbetreuung für Kinder aus Imizamo Yethu – Hausaufgabenhilfe, Mahlzeiten, Sport und kreative Förderung.',
      icon: '🏠',
      href: '/projekte',
      color: '#11aed1',
    },
    {
      title: 'Schulkooperation',
      description: 'Enge Zusammenarbeit mit der Hout Bay Primary School und Kronendal Primary – Freiwillige unterstützen Lehrerinnen im Unterricht.',
      icon: '📚',
      href: '/projekte',
      color: '#ae64fd',
    },
    {
      title: 'Freiwilligenprogramm',
      description: 'Internationales Freiwilligenprogramm: 3 Monate Einsatz, 30–35 Stunden/Woche, intensive Begleitung vor und nach dem Aufenthalt.',
      icon: '🤝',
      href: '/freiwillige',
      color: '#f7a900',
    },
  ];

  const donationAmounts = [
    { amount: '10 €', impact: t('donate.10'), color: '#11aed1' },
    { amount: '25 €', impact: t('donate.25'), color: '#ae64fd' },
    { amount: '50 €', impact: t('donate.50'), color: '#f7a900' },
    { amount: '100 €', impact: t('donate.100'), color: '#11aed1' },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <Image
          src="/images/123123.jpeg"
          alt="Kinder in Hout Bay, Südafrika"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#212529]/70 via-[#212529]/50 to-[#212529]/80" />
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center text-white">
          <p className="mb-3 text-[#f7a900] text-sm font-semibold uppercase tracking-widest">
            Imizamo Yethu · Hout Bay · Kapstadt
          </p>
          <h1 className="mb-4 text-5xl font-bold leading-tight md:text-7xl">
            {t('hero.headline')}
          </h1>
          <p className="mb-6 text-2xl font-light italic text-[#f7a900]">
            {t('hero.subheadline')}
          </p>
          <p className="mb-10 text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed">
            {t('hero.description')}
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/spenden"
              className="inline-flex items-center gap-2 rounded-full bg-[#11aed1] px-8 py-4 text-lg font-semibold shadow-lg transition hover:bg-[#0e8fb5] hover:shadow-xl"
            >
              {t('hero.cta_donate')}
            </Link>
            <Link
              href="/ueber-uns"
              className="inline-flex items-center rounded-full border-2 border-white px-8 py-4 text-lg font-semibold transition hover:bg-white hover:text-[#212529]"
            >
              {t('hero.cta_learn')}
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
            {t('impact.title')}
          </p>
          <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3 mt-8">
            <div>
              <p className="text-6xl font-bold mb-2">200+</p>
              <p className="text-lg text-white/90">{t('impact.children')}</p>
            </div>
            <div>
              <p className="text-6xl font-bold mb-2">16</p>
              <p className="text-lg text-white/90">{t('impact.years')}</p>
            </div>
            <div>
              <p className="text-6xl font-bold mb-2">50k+</p>
              <p className="text-lg text-white/90">{t('impact.emergency')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Teaser */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <Image
                src="/images/WhatsApp_Image_2026-05-14_at_00.39.16.jpeg"
                alt="Unsere Arbeit in Südafrika"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-[#11aed1] text-sm font-semibold uppercase tracking-widest mb-3">
                Über uns
              </p>
              <h2 className="text-4xl font-bold text-[#212529] mb-6 leading-tight">
                Gemeinsam stark für Kinder in Südafrika
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Ubuntu for Africa ist ein in Deutschland eingetragener gemeinnütziger Verein, der Projekte in Hout Bay (Kapstadt, Südafrika) initiiert und begleitet. Seit 2008 setzen wir uns dafür ein, Kinder, Jugendliche und Familien darin zu stärken, ein selbstbestimmtes Leben zu führen.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Das südafrikanische Team gestaltet die operative Arbeit direkt vor Ort und ist täglich mit den Kindern und Familien im Einsatz. Das deutsche Team unterstützt diese Arbeit organisatorisch, strategisch und finanziell.
              </p>
              <Link
                href="/ueber-uns"
                className="inline-flex items-center gap-2 text-[#11aed1] font-semibold"
              >
                Mehr über uns erfahren →
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
              Unsere Arbeit
            </p>
            <h2 className="text-4xl font-bold text-[#212529]">Was wir tun</h2>
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
                  Mehr erfahren →
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
              Jetzt helfen
            </p>
            <h2 className="text-4xl font-bold text-[#212529] mb-4">{t('donate.title')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Mit Empathie, Engagement und Einfallsreichtum lässt sich viel bewegen – aber fast immer braucht es auch finanzielle Unterstützung.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {donationAmounts.map((item) => (
              <div
                key={item.amount}
                className="rounded-2xl border-2 p-6 text-center hover:shadow-lg transition-all hover:-translate-y-1"
                style={{ borderColor: item.color + '40' }}
              >
                <p className="text-3xl font-bold mb-3" style={{ color: item.color }}>
                  {item.amount}
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
              {t('donate.btn')}
            </Link>
          </div>
        </div>
      </section>

      {/* Volunteer Teaser */}
      <section className="py-20 bg-[#ae64fd]">
        <div className="mx-auto max-w-5xl px-6 text-center text-white">
          <p className="text-sm font-semibold uppercase tracking-widest mb-3 text-white/70">
            Freiwilligenprogramm
          </p>
          <h2 className="text-4xl font-bold mb-6">Werde Teil unseres Teams</h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Du möchtest dich sozial engagieren und praktische Erfahrungen sammeln? Dann werde Teil von Ubuntu for Africa! Mindestens 3 Monate, Vollzeit, mit persönlicher Begleitung.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/freiwillige"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-[#ae64fd] px-8 py-4 text-lg font-semibold hover:bg-white/90 transition-colors"
            >
              Mehr erfahren
            </Link>
            <Link
              href="/kontakt"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white text-white px-8 py-4 text-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Jetzt bewerben
            </Link>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-[#212529]">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Fragen? Wir sind für dich da.</h2>
          <p className="text-gray-400 mb-8 text-lg">
            Egal ob du spenden, freiwillig helfen oder einfach mehr erfahren möchtest – schreib uns.
          </p>
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-2 rounded-full bg-[#f7a900] text-[#212529] px-10 py-4 text-lg font-bold hover:bg-[#e09800] transition-colors"
          >
            Kontakt aufnehmen
          </Link>
        </div>
      </section>
    </>
  );
}
