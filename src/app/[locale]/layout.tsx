import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CookieBanner from '@/components/CookieBanner';
import '../globals.css';

const geist = Geist({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ubuntu for Africa – Kinder, Jugend- und Familienhilfe e.V.',
  description: 'Ubuntu for Africa unterstützt Kinder, Jugendliche und Familien in Imizamo Yethu, Hout Bay, Kapstadt, Südafrika.',
  // Vor dem Launch nichts indexieren lassen: die Seite enthält noch
  // Platzhaltertexte, Impressum und Datenschutz sind ungeprüft (GitHub #14).
  // Die Unterseiten erben das, weil keine von ihnen `robots` selbst setzt.
  // Beim Launch zusammen mit src/app/robots.ts entfernen – siehe #21.
  robots: { index: false, follow: false },
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'de' | 'en')) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={geist.className}>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="pt-16">
            {children}
          </main>
          <Footer />
          <CookieBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
