import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  // Kein `output: 'standalone'`: Vercel braucht es nicht und die Testumgebung
  // startet mit `next start` – damit warnt Next sonst bei jedem Start.
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      // Instagram liefert Bilder über wechselnde CDN-Hosts aus.
      { protocol: 'https', hostname: '**.cdninstagram.com' },
      { protocol: 'https', hostname: '**.fbcdn.net' },
    ],
  },
  // Adressen der alten WordPress-Seite (Sitemap und Redirection-Export vom
  // 06.11.2026), damit Google-Treffer und alte Links nach dem DNS-Umzug nicht
  // ins Leere laufen. Ziele immer mit Sprachpräfix, sonst kommt noch ein
  // Umweg über die next-intl-Middleware dazu. Gleichnamige Pfade wie
  // /kontakt oder /impressum braucht es hier nicht, die leitet die Middleware
  // ohnehin auf /de um. Shop, Produkte und Events stammen aus der Theme-Demo
  // und laufen bewusst ins 404.
  async redirects() {
    const to = (sources: string[], destination: string) =>
      sources.map((source) => ({ source, destination, permanent: true }));

    return [
      // Projekte und Freiwillige – Volunteers zuerst, weil es auch unter
      // /unsere-projekte/ lag.
      ...to(
        ['/ubuntu-volunteers', '/unsere-projekte/ubuntu-volunteers'],
        '/de/freiwillige'
      ),
      ...to(['/unsere-projekte', '/unsere-projekte/:path*'], '/de/projekte'),
      ...to(['/wir-helfen-vor-ort'], '/de'),

      // Spenden
      ...to(
        [
          '/ubuntu-spenden',
          '/ubuntu-spenden-2',
          '/ubuntu-funding',
          '/spendenquittung',
          '/campaigns/:path*',
        ],
        '/de/spenden'
      ),

      // Über uns und Rechtliches
      ...to(['/wer-sind-wir', '/de/wer-sind-wir'], '/de/ueber-uns'),
      ...to(['/datenschutzerklaerung'], '/de/datenschutz'),

      // Blog: Die alten Beiträge gibt es in Sanity nicht, also auf die Übersicht.
      ...to(
        [
          '/aktuelles',
          '/blog-2',
          '/herzlich-willkommen',
          '/1-station-st-helena',
          '/3-wochen-lock-down-und-noch-2-wochen-vor-uns',
          '/corona-update',
          '/endlich-level-3',
          '/endlich-mehr-positives-und-nicht-nur-drama-ueber-20-000-euro-spenden',
          '/erster-covid-19-fall-in-iy',
          '/heute-ist-der-27ste-april-heute-ist-freedomday',
          '/notsituation-corona',
          '/suedafrika-blutet',
          '/segeltour-elitsha',
          '/sailing-elitsha-2',
          '/category/:path*',
          '/tag/:path*',
          '/author/:path*',
        ],
        '/de/blog'
      ),

      // Englisch
      ...to(
        ['/en/ubuntu-volunteers-2', '/en/our-projects/ubuntu-volunteers'],
        '/en/freiwillige'
      ),
      ...to(['/en/our-projects', '/en/our-projects/:path*'], '/en/projekte'),
      ...to(
        [
          '/en/ubuntu-donation',
          '/en/ubuntu-funding-2',
          '/en/donation-receipt',
        ],
        '/en/spenden'
      ),
      ...to(['/en/about-us'], '/en/ueber-uns'),
      ...to(['/en/contact-us', '/en/contact-us/:path*'], '/en/kontakt'),
      ...to(['/en/legal-notice'], '/en/impressum'),
      ...to(['/en/data-protection', '/en/datenschutzerklaerung'], '/en/datenschutz'),
      ...to(['/en/home-2'], '/en'),
      ...to(
        [
          '/en/news',
          '/en/welcome-to-our-blog',
          '/en/1-station-st-helena-2',
          '/en/3-weeks-lockdown-and-2-weeks-before-us',
          '/en/corona-update',
          '/en/emergency-situation-corona',
          '/en/first-covid-19-case-in-iy',
          '/en/sailing-elitsha',
          '/en/today-is-april-27th-today-is-freedomday',
          '/en/update',
          '/en/update-corona',
          '/en/category/:path*',
          '/en/tag/:path*',
        ],
        '/en/blog'
      ),

      // Kaputter Mail-Link der alten Kontaktseite (980 Aufrufe im 404-Log).
      ...to(['/kontakt/:path+'], '/de/kontakt'),
    ];
  },
};

export default withNextIntl(nextConfig);
