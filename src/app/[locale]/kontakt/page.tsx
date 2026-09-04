import type { Metadata } from 'next'
import KontaktClientPage from './_ClientPage'

// Server component wrapper – exports generateMetadata, renders the client component.
// Deploy steps:
//   1. Save seo_kontakt_ClientPage.tsx as: src/app/[locale]/kontakt/_ClientPage.tsx
//   2. Save this file as:                  src/app/[locale]/kontakt/page.tsx
//      (replacing the original page.tsx)

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params
  const isEn = locale === 'en'
  return {
    title: isEn ? 'Contact | Ubuntu for Africa e.V.' : 'Kontakt | Ubuntu for Africa e.V.',
    description: isEn
      ? 'Get in touch with Ubuntu for Africa e.V. – questions about volunteering, donations, supporting membership or partnerships.'
      : 'Kontaktiere Ubuntu for Africa e.V. – Fragen zu Freiwilligenarbeit, Spenden, Fördermitgliedschaft oder Kooperationen.',
    openGraph: {
      title: isEn ? 'Contact | Ubuntu for Africa e.V.' : 'Kontakt | Ubuntu for Africa e.V.',
      description: isEn
        ? 'Get in touch with Ubuntu for Africa e.V. – questions about volunteering, donations, supporting membership or partnerships.'
        : 'Kontaktiere Ubuntu for Africa e.V. – Fragen zu Freiwilligenarbeit, Spenden, Fördermitgliedschaft oder Kooperationen.',
      images: [{ url: 'https://ubuntuforafrica.com/images/Ubuntu_Logo.png' }],
      locale: isEn ? 'en_GB' : 'de_DE',
    },
  }
}

export default function KontaktPage() {
  return <KontaktClientPage />
}
