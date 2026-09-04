import type { Metadata } from 'next'
import SpendenClientPage from './_ClientPage'

// Server component wrapper – exports generateMetadata, renders the client component.
// Deploy steps:
//   1. Save seo_spenden_ClientPage.tsx as: src/app/[locale]/spenden/_ClientPage.tsx
//   2. Save this file as:                  src/app/[locale]/spenden/page.tsx
//      (replacing the original page.tsx)

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params
  const isEn = locale === 'en'
  return {
    title: isEn ? 'Donate | Ubuntu for Africa e.V.' : 'Spenden | Ubuntu for Africa e.V.',
    description: isEn
      ? 'Every euro helps directly on the ground. Donate now for children and young people in Imizamo Yethu, Hout Bay, Cape Town.'
      : 'Jeder Euro hilft direkt vor Ort. Spende jetzt für Kinder und Jugendliche in Imizamo Yethu, Hout Bay, Kapstadt.',
    openGraph: {
      title: isEn ? 'Donate | Ubuntu for Africa e.V.' : 'Spenden | Ubuntu for Africa e.V.',
      description: isEn
        ? 'Every euro helps directly on the ground. Donate now for children and young people in Imizamo Yethu, Hout Bay, Cape Town.'
        : 'Jeder Euro hilft direkt vor Ort. Spende jetzt für Kinder und Jugendliche in Imizamo Yethu, Hout Bay, Kapstadt.',
      images: [{ url: 'https://ubuntuforafrica.com/images/Ubuntu_Logo.png' }],
      locale: isEn ? 'en_GB' : 'de_DE',
    },
  }
}

export default function SpendenPage() {
  return <SpendenClientPage />
}
