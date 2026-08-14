'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { useLocale } from 'next-intl';

export default function Navbar() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const locale = useLocale();
  const [menuOpen, setMenuOpen] = useState(false);

  // Sicherheitsnetz: bei jedem Seitenwechsel schließen, damit das Menü nicht
  // offen über der neuen Seite stehen bleibt.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: '/', label: t('home') },
    { href: '/ueber-uns', label: t('about') },
    { href: '/projekte', label: t('projects') },
    { href: '/freiwillige', label: t('volunteers') },
    { href: '/transparenz', label: t('transparency') },
    { href: '/kontakt', label: t('contact') },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <Image
              src="/images/Ubuntu_Logo.png"
              alt="Ubuntu for Africa Logo"
              width={40}
              height={40}
              className="h-10 w-auto"
            />
            <span className="font-bold text-[#212529] text-sm leading-tight hidden sm:block">
              Ubuntu<br />for Africa
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-[#11aed1] bg-[#11aed1]/10'
                    : 'text-[#212529] hover:text-[#11aed1] hover:bg-[#11aed1]/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <div className="flex items-center gap-1 border border-[#11aed1] rounded-full overflow-hidden text-xs font-semibold">
              <Link
                href={pathname}
                locale="de"
                className={`px-2.5 py-1 transition-colors ${
                  locale === 'de'
                    ? 'bg-[#11aed1] text-white'
                    : 'text-[#11aed1] hover:bg-[#11aed1]/10'
                }`}
              >
                DE
              </Link>
              <Link
                href={pathname}
                locale="en"
                className={`px-2.5 py-1 transition-colors ${
                  locale === 'en'
                    ? 'bg-[#11aed1] text-white'
                    : 'text-[#11aed1] hover:bg-[#11aed1]/10'
                }`}
              >
                EN
              </Link>
            </div>

            {/* Spenden CTA - desktop */}
            <Link
              href="/spenden"
              className="hidden lg:inline-flex items-center px-4 py-2 rounded-full bg-[#11aed1] text-white text-sm font-semibold hover:bg-[#0e8fb5] transition-colors"
            >
              {t('donate')}
            </Link>

            {/* Hamburger */}
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 rounded-md text-[#212529] hover:bg-gray-100"
              aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            id="mobile-menu"
            className="lg:hidden border-t border-gray-100 py-3 pb-4 max-h-[calc(100dvh-4rem)] overflow-y-auto"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`block px-4 py-2.5 text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-[#11aed1] bg-[#11aed1]/10'
                    : 'text-[#212529] hover:text-[#11aed1] hover:bg-[#11aed1]/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="px-4 pt-3">
              <Link
                href="/spenden"
                onClick={() => setMenuOpen(false)}
                className="block text-center px-4 py-3 rounded-full bg-[#11aed1] text-white text-sm font-semibold hover:bg-[#0e8fb5] transition-colors"
              >
                {t('donate')}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
