import type { Metadata } from 'next';
import { Geist } from 'next/font/google';

const geist = Geist({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ubuntu for Africa',
  description: 'Kinder, Jugend- und Familienhilfe e.V. – Imizamo Yethu, Kapstadt',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
