# Ubuntu for Africa – Website Dokumentation

> Stand: Mai 2026 (zuletzt aktualisiert: 16.05.2026, Session 3) | Tech-Lead: Claude Code | Projekt: ubuntuforafrica.com Rebuild

---

## Inhaltsverzeichnis

1. [Projektübersicht](#1-projektübersicht)
2. [Tech Stack](#2-tech-stack)
3. [Architektur & Verzeichnisstruktur](#3-architektur--verzeichnisstruktur)
4. [Seiten & Routen](#4-seiten--routen)
5. [API-Routen](#5-api-routen)
6. [Sanity CMS](#6-sanity-cms)
7. [Zweisprachigkeit (DE/EN)](#7-zweisprachigkeit-deen)
8. [Design-System](#8-design-system)
9. [Environment Variables](#9-environment-variables)
10. [Lokale Testumgebung (Docker)](#10-lokale-testumgebung-docker)
11. [Deployment (Vercel)](#11-deployment-vercel)
12. [Offene Aufgaben & Roadmap](#12-offene-aufgaben--roadmap)

---

## 1. Projektübersicht

**Organisation:** UBUNTU for Africa Kinder, Jugend- und Familienhilfe e.V.
**Slogan:** „Umuntu Ngumntu Ngabantu – Ich bin, weil weil wir sind."
**Ziel:** Kompletter Rebuild von [ubuntuforafrica.com](https://ubuntuforafrica.com)
**Gründung:** 2008 (Sylke Funk), Vereinsgründung Deutschland 2015
**Standort Projekt:** Imizamo Yethu, Hout Bay, Kapstadt, Südafrika

### Team

| Person | Rolle |
|--------|-------|
| Birgitta Latz | 1. Vorsitzende, Sozialpädagogin Hamburg (weltwärts 09/2015–12/2016) |
| Hanna Zabel | 2. Vorsitzende, Pädagogin Herne (Freiwillige 01–03/2023) |
| Marina Vucurevic | Operative Leitung vor Ort, lebt in Hout Bay, verbindet DE + SA |
| Brenda Moloto | Project Manager & Freiwilligenkoordinatorin (Südafrika) |
| Andiswa Watsha | Aftercare Management (Südafrika) |
| Zizipho Nyanga | Lehrerin (Südafrika) |
| Mzwandile (Zwaai) Ntozini | Sportpädagoge (Südafrika) |

---

## 2. Tech Stack

| Bereich | Technologie | Version |
|---------|-------------|---------|
| Framework | Next.js (App Router) | 16.2.6 |
| Sprache | TypeScript | 5.x |
| Styling | Tailwind CSS | v4 |
| UI-Komponenten | shadcn/ui + Base UI | aktuell |
| CMS | Sanity Studio (eingebettet) | v5 |
| Zahlungen | Stripe Checkout | v22 |
| E-Mail | Resend | v6 |
| Newsletter | Mailchimp (REST API) | v3 |
| i18n | next-intl | v4 |
| Formulare | react-hook-form + zod | aktuell |
| Icons | lucide-react | aktuell |
| Fonts | Geist (Google Fonts via next/font) | – |
| Deployment | Vercel | – |
| Testumgebung | Docker + Docker Compose | – |

---

## 3. Architektur & Verzeichnisstruktur

```
ubuntu-for-africa/
├── src/
│   ├── app/
│   │   ├── layout.tsx                    ← Root Layout (kein locale)
│   │   ├── page.tsx                      ← Redirect → /de
│   │   ├── globals.css                   ← Globale Styles / Tailwind
│   │   ├── [locale]/                     ← Alle öffentlichen Seiten
│   │   │   ├── layout.tsx                ← Locale-Layout (Navbar + Footer)
│   │   │   ├── page.tsx                  ← Homepage
│   │   │   ├── ueber-uns/page.tsx        ← Über uns & Team
│   │   │   ├── projekte/page.tsx         ← Projektübersicht
│   │   │   ├── freiwillige/page.tsx      ← Volunteer-Programm
│   │   │   ├── spenden/page.tsx          ← Spenden (Server, generateMetadata)
│   │   │   ├── spenden/_ClientPage.tsx   ← Spenden Client Component (Stripe)
│   │   │   ├── kontakt/page.tsx          ← Kontakt (Server, generateMetadata)
│   │   │   ├── kontakt/_ClientPage.tsx   ← Kontakt Client Component (Formular)
│   │   │   ├── transparenz/page.tsx      ← Transparenz & Mittelverwendung
│   │   │   ├── patenschaften/page.tsx    ← Schulpatenschaften (25€/Monat)
│   │   │   ├── impressum/page.tsx        ← Impressum (§5 TMG)
│   │   │   ├── datenschutz/page.tsx      ← Datenschutzerklärung (DSGVO)
│   │   │   └── blog/
│   │   │       ├── page.tsx              ← Blog-Übersicht
│   │   │       └── [slug]/page.tsx       ← Blog-Einzelartikel
│   │   ├── api/
│   │   │   ├── contact/route.ts          ← POST Kontaktformular → Resend
│   │   │   ├── donate/route.ts           ← POST Stripe Checkout Session
│   │   │   ├── newsletter/route.ts       ← POST Mailchimp Anmeldung
│   │   │   └── webhook/stripe/route.ts   ← POST Stripe Webhook
│   │   └── studio/[[...tool]]/page.tsx   ← Sanity Studio (eingebettet)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx                ← Fixierte Navigation + Sprachschalter
│   │   │   └── Footer.tsx                ← 4-spaltig + Transparenz/Patenschaften Links
│   │   ├── CookieBanner.tsx              ← DSGVO Cookie-Consent (localStorage)
│   │   └── ui/
│   │       └── button.tsx                ← shadcn Button
│   ├── i18n/
│   │   ├── routing.ts                    ← Locales: ['de', 'en'], default: 'de'
│   │   └── request.ts                    ← next-intl Server-Konfiguration
│   ├── lib/
│   │   ├── sanity.ts                     ← Sanity Client-Export
│   │   ├── stripe.ts                     ← Stripe lazy-init (getStripe())
│   │   ├── sanity-locale.ts              ← Locale-Hilfsfunktionen
│   │   └── utils.ts                      ← cn() Tailwind-Merge Util
│   ├── messages/
│   │   ├── de.json                       ← Deutsche Übersetzungen
│   │   └── en.json                       ← Englische Übersetzungen
│   └── sanity/
│       ├── lib/
│       │   ├── client.ts                 ← createClient (CDN aktiviert)
│       │   ├── image.ts                  ← urlFor() Bild-Builder
│       │   └── queries.ts                ← GROQ Queries (alle Typen)
│       └── schemaTypes/
│           ├── index.ts                  ← Schema-Registrierung
│           ├── post.ts                   ← Blog-Artikel
│           ├── project.ts                ← Projekte
│           ├── teamMember.ts             ← Team-Mitglieder
│           ├── page.ts                   ← Generische Seiten
│           └── siteSettings.ts           ← Globale Einstellungen
├── public/
│   └── images/
│       └── Ubuntu_Logo.png               ← Offizielles Logo
├── Dockerfile                            ← Node 20 Alpine
├── docker-compose.yml                    ← Dev-Container mit Hot Reload
├── next.config.ts                        ← output: standalone, Sanity CDN
├── .env.local                            ← Umgebungsvariablen (nicht im Repo)
└── CLAUDE.md                             ← Arbeitsanweisungen für Claude Code
```

---

## 4. Seiten & Routen

Alle Seiten sind unter `/{locale}/...` erreichbar. Die Root-URL `/` leitet automatisch auf `/de` weiter. Sprache wechseln: DE/EN-Schalter in der Navbar.

### 4.1 Homepage (`/[locale]`)

**Datei:** `src/app/[locale]/page.tsx`
**Typ:** Async Server Component – locale aus `params`, kein `useTranslations`

**Sektionen (Reihenfolge):**
1. **Hero** – Vollbild-Gradient + Headline „Umuntu Ngumntu Ngabantu" + zwei CTAs (Spenden, Mehr erfahren)
2. **Impact Counter** – Türkiser Balken mit 3 Kennzahlen: Kinder betreut / Jahre aktiv / € Nothilfe
3. **Über-uns-Teaser** – Text + Bild-Placeholder
4. **Projekte-Grid** – 3 Karten: Ubuntu Kids Aftercare, Schulkooperation, Freiwilligenprogramm
5. **Spenden-Beträge** – 4 Karten mit Betrag + konkreter Wirkung (10/25/50/100 €)
6. **Volunteer-Teaser** – Lila Banner mit Bewerbungs-CTA
7. **Kontakt-CTA** – Dunkler Abschluss-Banner

### 4.2 Über uns (`/[locale]/ueber-uns`)

**Datei:** `src/app/[locale]/ueber-uns/page.tsx`
**Typ:** Server Component (Sanity-fetch mit Fallback auf Hardcode)

**Inhalte:**
- Geschichte (seit 2008, Gründerin Sylke Funk)
- Ubuntu-Philosophie / Vereinsgründung 2015
- Team Südafrika (4 Personen, hardcoded + optional Sanity)
- Vorstand Deutschland (Birgitta Latz, Hanna Zabel, hardcoded)

**Sanity-Integration:** Lädt Team-Mitglieder via `teamMembersQuery`. Falls Sanity nicht erreichbar → Fallback auf hardcodierte Daten.

### 4.3 Projekte (`/[locale]/projekte`)

**Datei:** `src/app/[locale]/projekte/page.tsx`
**Typ:** Server Component

**Projekte (hardcoded + optional Sanity):**
- Ubuntu Kids Aftercare (Nachmittagsbetreuung)
- Schulkooperation (Hout Bay Primary, Kronendal Primary)
- Freiwilligenprogramm
- Ubuntu Family (Familienhilfe)
- Ubuntu Community (Gemeinschaftsprojekte)

Jede Projektkarte zeigt: Titel, Beschreibung, Detailliste, Bild (falls vorhanden).

### 4.4 Freiwillige (`/[locale]/freiwillige`)

**Datei:** `src/app/[locale]/freiwillige/page.tsx`
**Typ:** Server Component

**Inhalte:**
- Voraussetzungen (18 Jahre, Führungszeugnis, mind. 3 Monate, 30–35h/Woche)
- Aktivitäten vor Ort (Schule, Aftercare, Community)
- Kosten: **995 €/Monat** (400 € Unterkunft + 595 € Projektbeitrag)
- Bewerbungsprozess
- CTA: Link zur Kontaktseite

**Sanity:** Lädt `pageQuery` mit `pageId: 'freiwillige'` für Titel/Untertitel.

### 4.5 Spenden (`/[locale]/spenden`)

**Datei:** `src/app/[locale]/spenden/page.tsx` + `_ClientPage.tsx`
**Typ:** Server Component (Metadata) + Client Component (Stripe-Interaktion)

> **Muster:** Da `useState`/`useLocale` kein `generateMetadata` erlauben, ist die Seite aufgeteilt: `page.tsx` ist ein Server Component das Metadata exportiert und `_ClientPage.tsx` rendert. `_ClientPage.tsx` enthält die gesamte Interaktionslogik.

**Funktionen:**
- **Betrag-Buttons** (10/25/50/100 €) – triggern Stripe Checkout via `POST /api/donate`
- **Freitext-Eingabe** – beliebiger Betrag (min. 1 €)
- **Stripe-Redirect** – bei Erfolg: `?success=1`, bei Abbruch: `?canceled=1`
- **Fallback** – wenn Stripe nicht konfiguriert: Fehlermeldung + Hinweis auf Banküberweisung
- **IBAN-Sektion** – Bankverbindung (Wert aus Sanity `siteSettings` oder Fallback-Text)
- **Transparenz-Sektion** – 100% direkt, 0€ Verwaltungsgehälter, seit 2008

**Zahlungsarten über Stripe:** Kreditkarte, PayPal, SEPA-Lastschrift

### 4.6 Kontakt (`/[locale]/kontakt`)

**Datei:** `src/app/[locale]/kontakt/page.tsx` + `_ClientPage.tsx`
**Typ:** Server Component (Metadata) + Client Component (Formular)

**Formularfelder:** Name, E-Mail, Betreff (Dropdown), Nachricht
**Betreff-Optionen:** Freiwilligenprogramm, Spenden, Patenschaft, Presse & Kooperationen, Sonstiges

**Submit-Flow:**
1. `POST /api/contact` mit JSON-Body
2. Loading-State während der Anfrage (Inputs disabled)
3. Success → Dankeschön-Anzeige
4. Error → rote Fehlermeldung unterhalb des Formulars

**Kontaktinfo-Sektion:** E-Mail, Projektstandort, Vereinssitz, FAQ

> **Volunteer-Bewerbungen:** `volunteers.ubuntuforafrica@gmx.de` (nicht die allgemeine Kontakt-Mail)

### 4.7 Transparenz (`/[locale]/transparenz`)

**Datei:** `src/app/[locale]/transparenz/page.tsx`
**Typ:** Server Component

**Sektionen:** Stat-Karten (100% / 0€ / seit 2008), Mittelverwendungs-Grid (Aftercare, Schulen, Camps, Nothilfe), Vereinsstruktur SA/DE, Spendenquittung-Info + CTA zu /spenden.

### 4.8 Patenschaften (`/[locale]/patenschaften`)

**Datei:** `src/app/[locale]/patenschaften/page.tsx`
**Typ:** Server Component

**Sektionen:** Erklärung 25€/Monat Schulpatenschaft, 3-Schritte-Prozess (Kontakt → Verbindung → Updates), DSGVO-Hinweis (keine personalisierten Kinderprofile), Betragsübersicht, CTA zu /kontakt.

### 4.9 Impressum (`/[locale]/impressum`)

**Datei:** `src/app/[locale]/impressum/page.tsx`
**Typ:** Server Component

§5 TMG, DE/EN. **TODO:** Vereinsadresse + Registernummer sind als gelbe Platzhalter markiert – müssen eingetragen werden.

### 4.10 Datenschutz (`/[locale]/datenschutz`)

**Datei:** `src/app/[locale]/datenschutz/page.tsx`
**Typ:** Server Component

DSGVO-konform für alle Dienste: Vercel (Hosting), Stripe (Zahlungen), Resend (E-Mail), Mailchimp (Newsletter), Sanity (CMS). Cookie-Tabelle, alle Betroffenenrechte nach Art. 15–21 DSGVO. DE/EN.

### 4.11 Blog (`/[locale]/blog`)

**Datei:** `src/app/[locale]/blog/page.tsx`
**Typ:** Server Component

Lädt alle Posts via `postsQuery` aus Sanity (sortiert nach `publishedAt desc`). Zeigt Titel, Datum, Teaser. Link auf Einzelartikel `/blog/[slug]`.

### 4.12 Blog-Artikel (`/[locale]/blog/[slug]`)

**Datei:** `src/app/[locale]/blog/[slug]/page.tsx`
**Typ:** Server Component

Lädt Artikel via `postBySlugQuery`. Rendert Body via `@portabletext/react`.

### 4.13 Sanity Studio (`/studio`)

**Datei:** `src/app/studio/[[...tool]]/page.tsx`
**Zugang:** Nur für Admins – direkt über `/studio` erreichbar
**Projekt-ID:** `u9u79lmd` | **Dataset:** `production`

---

## 5. API-Routen

Alle Routen liegen unter `src/app/api/`.

### 5.1 `POST /api/contact`

**Datei:** `src/app/api/contact/route.ts`
**Zweck:** Kontaktformular-Nachrichten per E-Mail versenden

**Request Body:**
```json
{
  "name": "Max Mustermann",
  "email": "max@example.com",
  "subject": "freiwillig",
  "message": "Ich interessiere mich für das Freiwilligenprogramm..."
}
```

**Validierung (zod):**
- `name`: min 2, max 100 Zeichen
- `email`: gültiges E-Mail-Format
- `subject`: einer der Dropdown-Werte
- `message`: min 10, max 5000 Zeichen

**Verhalten:**
- Mit `RESEND_API_KEY`: Sendet HTML-E-Mail an `CONTACT_EMAIL` (Standard: `pauline.schmiel@gmail.com`) mit `Reply-To: absender`
- Ohne Key: Loggt ins Terminal, gibt `{"ok":true}` zurück (Dev-Modus)

**Responses:**
| Status | Body | Bedeutung |
|--------|------|-----------|
| 200 | `{"ok":true}` | Erfolgreich |
| 422 | `{"error":"Validation failed","details":{...}}` | Validierungsfehler |
| 500 | `{"error":"Email could not be sent"}` | Resend-Fehler |

### 5.2 `POST /api/donate`

**Datei:** `src/app/api/donate/route.ts`
**Zweck:** Stripe Checkout Session erstellen und URL zurückgeben

**Request Body:**
```json
{
  "amount": 2500,
  "locale": "de"
}
```
> `amount` in Cent (2500 = 25,00 €)

**Verhalten:**
- Mit `STRIPE_SECRET_KEY`: Erstellt Checkout Session, gibt `{"url":"https://checkout.stripe.com/..."}` zurück
- Ohne Key: `{"error":"Stripe not configured"}` mit Status 503

**Stripe Session-Einstellungen:**
- Mode: `payment` (Einmalzahlung)
- Zahlungsarten: Kreditkarte, SEPA-Lastschrift, PayPal
- Success URL: `/{locale}/spenden?success=1`
- Cancel URL: `/{locale}/spenden?canceled=1`
- Locale: `de` oder `en`

**Responses:**
| Status | Body | Bedeutung |
|--------|------|-----------|
| 200 | `{"url":"https://..."}` | Session erstellt |
| 422 | Validierungsfehler | Ungültiger Betrag |
| 503 | `{"error":"Stripe not configured"}` | Key fehlt |

### 5.3 `POST /api/webhook/stripe`

**Datei:** `src/app/api/webhook/stripe/route.ts`
**Zweck:** Stripe Webhook-Events verarbeiten

**Konfiguration:**
- `export const dynamic = 'force-dynamic'` – Body-Parsing deaktiviert (Pflicht für Stripe-Signatur)
- Verifiziert Anfragen via `STRIPE_WEBHOOK_SECRET`

**Behandelte Events:**
| Event | Aktion |
|-------|--------|
| `checkout.session.completed` | Loggt Zahlung (TODO: Bestätigungs-E-Mail) |
| `payment_intent.succeeded` | Loggt Erfolg |
| `payment_intent.payment_failed` | Loggt Fehler |

**Webhook in Stripe einrichten:**
```
URL: https://ubuntuforafrica.com/api/webhook/stripe
Events: checkout.session.completed, payment_intent.succeeded, payment_intent.payment_failed
```

### 5.4 `POST /api/newsletter`

**Datei:** `src/app/api/newsletter/route.ts`
**Zweck:** E-Mail-Adresse bei Mailchimp anmelden (Double-Opt-In, DSGVO-konform)

**Request Body:**
```json
{
  "email": "user@example.com",
  "locale": "de"
}
```

**Verhalten:**
- Mit `MAILCHIMP_API_KEY` + `MAILCHIMP_AUDIENCE_ID`: PUT-Request an Mailchimp API (Upsert)
  - Neuer Subscriber → Status `pending` (Double-Opt-In-E-Mail geht raus)
  - Bereits angemeldet → `{"ok":true,"already":true}`
- Ohne Keys: Loggt ins Terminal, `{"ok":true}` (Dev-Modus)

**Mailchimp Datacenter** wird automatisch aus dem API-Key extrahiert (Format: `key-dc1`).

---

## 6. Sanity CMS

**Projekt-ID:** `u9u79lmd`
**Dataset:** `production`
**Studio URL (Produktion):** `https://ubuntuforafrica.com/studio`
**Studio URL (Dev):** `http://192.168.178.166:3000/studio`
**Sanity-Manage:** [sanity.io/manage](https://sanity.io/manage) → Projekt `u9u79lmd`

### 6.1 Schema-Typen

#### `post` – Blog-Artikel
| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `title` | string | Titel (DE) |
| `title_en` | string | Titel (EN) |
| `slug` | slug | URL-Slug |
| `publishedAt` | datetime | Veröffentlichungsdatum |
| `excerpt` | text | Teaser-Text (DE) |
| `excerpt_en` | text | Teaser-Text (EN) |
| `mainImage` | image | Titelbild |
| `body` | array (PortableText) | Inhalt (DE) |
| `body_en` | array (PortableText) | Inhalt (EN) |
| `categories` | array of strings | Kategorien |

#### `project` – Projekte
| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `title` | string | Titel (DE) |
| `title_en` | string | Titel (EN) |
| `slug` | slug | URL-Slug |
| `description` | text | Beschreibung (DE) |
| `description_en` | text | Beschreibung (EN) |
| `mainImage` | image | Projektbild |
| `active` | boolean | Sichtbar auf Website |
| `order` | number | Sortierreihenfolge |

#### `teamMember` – Team-Mitglieder
| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `name` | string | Name |
| `role` | string | Rolle (DE) |
| `role_en` | string | Rolle (EN) |
| `team` | string (`'sa'` / `'de'`) | Team-Zugehörigkeit |
| `bio` | text | Biografie (DE) |
| `bio_en` | text | Biografie (EN) |
| `photo` | image | Profilfoto |
| `order` | number | Sortierreihenfolge |

#### `page` – Generische Seiten
| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `pageId` | slug | Eindeutige Seiten-ID (z.B. `freiwillige`) |
| `title_de` | string | Seitentitel (DE) |
| `title_en` | string | Seitentitel (EN) |
| `hero_subtitle_de` | text | Hero-Untertitel (DE) |
| `hero_subtitle_en` | text | Hero-Untertitel (EN) |
| `body_de` | array (PortableText) | Inhalt (DE) |
| `body_en` | array (PortableText) | Inhalt (EN) |

#### `siteSettings` – Globale Einstellungen (Singleton)
| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `siteTitle` | string | Website-Titel |
| `siteDescription_de` | text | Meta-Beschreibung (DE) |
| `siteDescription_en` | text | Meta-Beschreibung (EN) |
| `contactEmail` | string | Kontakt-E-Mail |
| `donationIban` | string | IBAN für Überweisungen |
| `instagramUrl` | url | Instagram-Link |
| `facebookUrl` | url | Facebook-Link |
| `footerText_de` | text | Footer-Tagline (DE) |
| `footerText_en` | text | Footer-Tagline (EN) |

### 6.2 GROQ Queries

```groq
# Alle aktiven Projekte sortiert nach Reihenfolge
*[_type == "project" && active == true] | order(order asc) { ... }

# Blog-Posts neueste zuerst
*[_type == "post"] | order(publishedAt desc) { ... }

# Team nach Reihenfolge
*[_type == "teamMember"] | order(order asc) { ... }

# Generische Seite per ID
*[_type == "page" && pageId.current == $pageId][0] { ... }

# Globale Einstellungen
*[_type == "siteSettings"][0] { ... }
```

### 6.3 Sanity-Fallback-Strategie

Alle Server-Components fetchen Sanity in einem `try/catch`. Bei Verbindungsfehler werden hardcodierte Daten aus den Content-Dateien verwendet. Die Website bleibt so auch ohne Sanity vollständig funktionsfähig.

---

## 7. Zweisprachigkeit (DE/EN)

**Bibliothek:** next-intl v4
**Locales:** `de` (Standard), `en`
**URL-Struktur:** `/de/...` und `/en/...`
**Middleware/Proxy:** `src/proxy.ts` (Next.js 16 Konvention, ehemals `middleware.ts`)

### Routing-Konfiguration

```typescript
// src/i18n/routing.ts
export const routing = defineRouting({
  locales: ['de', 'en'],
  defaultLocale: 'de'
})
```

### Kritisch: `setRequestLocale` in Layout und Pages

In Next.js 16 + next-intl v4 muss `setRequestLocale(locale)` explizit aufgerufen werden, **bevor** irgendwelche next-intl-APIs (`getMessages`, `getTranslations`, `useTranslations`) genutzt werden. Ohne diesen Aufruf lädt next-intl immer die Default-Locale (DE).

```typescript
// src/app/[locale]/layout.tsx
import { getMessages, setRequestLocale } from 'next-intl/server'

export default async function LocaleLayout({ params }) {
  const { locale } = await params
  setRequestLocale(locale)       // ← MUSS zuerst kommen!
  const messages = await getMessages()
  // ...
}
```

Gleiches gilt für alle async Page-Components:
```typescript
export default async function MyPage({ params }) {
  const { locale } = await params
  setRequestLocale(locale)       // ← In jeder Page wiederholen
  const t = (de, en) => locale === 'en' ? en : de
  // ...
}
```

### Übersetzungs-Keys (messages/de.json + en.json)

```
nav.*               → Navigation-Links (home, about, projects, donate, volunteers, blog, contact, sponsorship, navigation)
hero.*              → Homepage Hero-Sektion
impact.*            → Impact Counter
donate.*            → Spenden-Beträge und Labels
footer.*            → Footer-Texte (tagline, contact, legal, privacy, participate, sponsorship_link, transparency, engage)
```

### Verwendung in Komponenten

**Async Server Components** (alle Pages außer _ClientPage):
```typescript
const { locale } = await params
setRequestLocale(locale)
const t = (de: string, en: string) => locale === 'en' ? en : de
// direkte Inline-Übersetzung – kein Import aus messages nötig
```

**Client Components** (`_ClientPage.tsx`, `Navbar.tsx`, `Footer.tsx`):
```typescript
const t = useTranslations('nav')   // Liest aus NextIntlClientProvider
const locale = useLocale()
```

**Footer** verwendet `useTranslations('nav')` + `useTranslations('footer')` für alle Labels – kein hardcodiertes Deutsch mehr.

**Sprachschalter in Navbar:**
```tsx
<Link href={pathname} locale="de">DE</Link>
<Link href={pathname} locale="en">EN</Link>
```

### Placeholder-Texte (gelb markiert im Browser)

Erfundene Inhalte sind visuell mit `⚠ PLACEHOLDER`-Boxen markiert auf:
- `/transparenz` – Mittelverwendungs-Beschreibungen, Hero-Subtitle, Struktur-Text
- `/patenschaften` – Feature-Liste, Preistagline, 3-Schritte-Texte, Reaktionszeit
- `/kontakt` – FAQ-Antworten (Reaktionszeit, Volunteer-Start)

---

## 8. Design-System

### Markenfarben
| Name | Hex | Verwendung |
|------|-----|------------|
| Primary (Türkis) | `#11aed1` | CTAs, Links, Akzente, Navbar-Highlights |
| Accent (Lila) | `#ae64fd` | Sekundäre Highlights, Projektkarten |
| Highlight (Orange) | `#f7a900` | Labels, Zitate, Subheadlines |
| Dark | `#212529` | Fließtext, Hero-Hintergrund, Footer |

### Typografie
- **Font:** Geist (Google Fonts via `next/font/google`)
- **Headlines:** `font-bold`, responsive (`text-4xl md:text-6xl`)
- **Body:** Standard-Gewicht, `leading-relaxed`

### Layout-Prinzipien
- Max-Width: `max-w-7xl` (Container) / `max-w-4xl` (Content-Seiten)
- Padding: `px-6` horizontal
- Sections: `py-20` vertikal
- Rounded: `rounded-2xl` für Karten, `rounded-full` für Buttons/Badges

### Navbar
- Fixed top, `z-50`, `bg-white/95 backdrop-blur-sm`
- Höhe: `h-16` → `pt-16` auf `<main>`
- Desktop: Horizontal-Nav + DE/EN-Schalter + Spenden-CTA
- Mobile: Hamburger-Menü (Sliding Dropdown)

### Footer
- 4-spaltig: Logo/Tagline | Navigation | Mitmachen | Kontakt
- Social Icons: Instagram + Facebook (Placeholder-Links)
- Copyright + Impressum/Datenschutz-Links

---

## 9. Environment Variables

**Datei:** `.env.local` auf dem Server (`~/projects/ubuntu-for-africa/.env.local`)

```env
# Sanity CMS (bereits konfiguriert)
NEXT_PUBLIC_SANITY_PROJECT_ID=u9u79lmd
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=skjgPQZU...       # Sanity Write-Token

# Stripe (noch einzutragen)
STRIPE_SECRET_KEY=sk_live_...      # Stripe Dashboard → Entwickler → API-Schlüssel
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...    # Nach Webhook-Einrichtung in Stripe

# E-Mail (noch einzutragen)
RESEND_API_KEY=re_...              # resend.com → API Keys

# Newsletter (noch einzutragen)
MAILCHIMP_API_KEY=...              # Mailchimp → Profil → Extras → API-Schlüssel
MAILCHIMP_AUDIENCE_ID=...          # Mailchimp → Zielgruppen → ID der Liste

# Optional
INSTAGRAM_ACCESS_TOKEN=...         # Für Instagram-Feed Integration (Task #9)
CONTACT_EMAIL=pauline.schmiel@gmail.com  # Standard-Empfänger Kontaktformular

# Deployment
NEXT_PUBLIC_BASE_URL=http://192.168.178.166:3000  # Dev; auf Vercel: https://ubuntuforafrica.com
```

### API-Schlüssel beschaffen

| Service | URL |
|---------|-----|
| Stripe (Test-Keys) | dashboard.stripe.com → Entwickler → API-Schlüssel |
| Stripe (Live-Keys) | Nach Aktivierung des Kontos |
| Resend | resend.com → API Keys (kostenlos bis 3.000/Monat) |
| Mailchimp | mailchimp.com → Profil → Extras → API-Schlüssel |
| Sanity Token | sanity.io/manage → Projekt → API → Tokens |

---

## 10. Lokale Testumgebung (Docker)

**Server:** `moritz@192.168.178.166`
**Port:** `3000`
**URL (lokal):** `http://192.168.178.166:3000`
**URL (extern):** `https://ubuntu.staatsprojekte.uk` (via Nginx Proxy Manager)

### Projektpfad auf Server

```
~/projects/ubuntu-for-africa/
```

### Docker-Setup

**Dockerfile:**
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
```

**docker-compose.yml:**
```yaml
services:
  web:
    build: .
    ports:
      - "3000:3000"
    env_file: .env.local
    volumes:
      - .:/app
      - /app/node_modules
      - /app/.next
    command: npm run dev
```

### Wichtige Befehle

```bash
# Container neu bauen und starten
docker compose up -d --build

# Logs verfolgen
docker compose logs -f web

# Container neustarten (nach Code-Änderungen via SCP/rsync)
docker compose restart web

# Status prüfen
docker compose ps

# App testen
curl http://localhost:3000
```

### Dateien auf Server übertragen (von Windows)

```bash
# Einzelne Datei
scp "C:/Pfad/zur/Datei.tsx" "moritz@192.168.178.166:/home/moritz/projects/ubuntu-for-africa/src/pfad/Datei.tsx"

# Ganzes Verzeichnis (ohne node_modules)
rsync -avz --exclude node_modules --exclude .next \
  /pfad/zum/projekt/ \
  moritz@192.168.178.166:~/projects/ubuntu-for-africa/
```

---

## 11. Deployment (Vercel)

**Geplant für:** Nach finalem Testing und Content-Einpflege
**DNS-Ziel:**
- A-Record `@` → `76.76.21.21`
- CNAME `www` → `cname.vercel-dns.com`
- **MX-Records NICHT ändern** (E-Mail bleibt auf ALL-INKL!)

### Vercel-Setup-Schritte

1. Repo auf GitHub pushen
2. Vercel-Konto verknüpfen, Projekt importieren
3. Framework: **Next.js** automatisch erkannt
4. Environment Variables in Vercel Dashboard eintragen (alle aus `.env.local`)
5. `NEXT_PUBLIC_BASE_URL=https://ubuntuforafrica.com` setzen
6. Stripe Webhook-URL auf `https://ubuntuforafrica.com/api/webhook/stripe` umstellen
7. DNS umstellen

### next.config.ts – Deployment-relevante Einstellungen

```typescript
const nextConfig: NextConfig = {
  output: 'standalone',          // Für optimiertes Vercel-Deployment
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },  // Sanity-Bilder erlaubt
    ],
  },
}
```

---

## 12. Offene Aufgaben & Roadmap

Stand: Mai 2026 | Vikunja Projekt-ID: 11

### Erledigt ✅

| Task | Beschreibung |
|------|--------------|
| #18 | Lokale Testumgebung (Docker auf 192.168.178.166) |
| #2 | Sitemap & Seitenstruktur (alle Routen vorhanden) |
| #3 | Design-System (Farben, Navbar, Footer, Tailwind) |
| #4 | Sanity CMS Schema (5 Typen + GROQ Queries) |
| #5 | Next.js Projekt aufsetzen (TypeScript, Tailwind, shadcn) |
| #6 | Zweisprachigkeit DE/EN mit next-intl |
| #7 | Homepage (Hero, Impact, Projekte, Spenden-CTA) |
| #8 | Stripe Spenden-Integration (Checkout + Webhook Route) |
| #10 | Kontaktformular (mit echter API-Anbindung via Resend) |
| #11 | Newsletter-API (Mailchimp Double-Opt-In Route) |
| #12 | Projektseiten & Team-Seiten |
| #13 | Blog-Seiten (Übersicht + Einzelartikel) |
| #91 | Impressum-Seite (§5 TMG, DE/EN) |
| #92 | Datenschutzerklärung (DSGVO, alle Dienste) |
| #93 | Cookie-Consent-Banner (localStorage, kein externes Tool) |
| #95 | SEO generateMetadata für alle Seiten |
| #96 | Transparenz-Seite /transparenz |
| #97 | Patenschaften-Seite /patenschaften |
| #98 | Inhalte aus .docx-Dateien eingearbeitet |
| #99 | Footer: Transparenz + Patenschaften Links |
| #100 | Volunteer-E-Mail volunteers.ubuntuforafrica@gmx.de eingetragen |
| #94 | SEO Meta-Tags: generateMetadata DE/EN auf allen Seiten |
| i18n | EN-Sprachschalter vollständig repariert (setRequestLocale, Footer i18n, Homepage async) |
| NGINX | Domain ubuntu.staatsprojekte.uk für Testumgebung |
| GitHub | Repo: github.com/Moritz-Staat/ubuntuforafrica, Branch: main |

### Offen 🔲

| Task | Beschreibung | Priorität |
|------|--------------|-----------|
| #68 | Hosting & Domain bei ALL-INKL klären (Sylke Funk) | Hoch |
| #76 | Instagram Feed Integration (`INSTAGRAM_ACCESS_TOKEN`) | Mittel |
| #81 | Vercel Deployment einrichten | Hoch |
| #82 | Inhalte in Sanity Studio einpflegen (Fotos, IBAN, Blog) | Hoch |
| #83 | Testing, Launch & DNS-Umzug | Hoch |
| #84 | Vercel Environment Variables setzen | Hoch |
| – | Placeholder-Texte (gelbe Boxen) durch echte Inhalte ersetzen | Hoch |
| – | Vereinsadresse + Registernummer ins Impressum | Hoch |
| – | Stripe Keys eintragen (warten auf neue Kontodaten) | Hoch |
| – | Resend API Key eintragen | Hoch |
| – | Sanity CORS für ubuntuforafrica.com + *.vercel.app erweitern | Hoch |

### Was beim Launch noch zu tun ist

1. **Impressum vervollständigen** – Vereinsadresse + Registernummer eintragen
2. **API-Keys** in Vercel Environment Variables:
   - `STRIPE_SECRET_KEY` + `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (warten auf neue Kontodaten)
   - `RESEND_API_KEY` (resend.com)
   - `MAILCHIMP_API_KEY` + `MAILCHIMP_AUDIENCE_ID`
3. **Stripe Webhook** einrichten: `https://ubuntuforafrica.com/api/webhook/stripe`
4. **Sanity CORS** erweitern: `ubuntuforafrica.com` + `*.vercel.app` unter sanity.io/manage → API → CORS
5. **Sanity Studio befüllen:** Team-Fotos, Projektbilder, IBAN, Social Links, erste Blog-Artikel
6. **DNS-Umzug** (nur nach vollständigem Testing!): A-Record → `76.76.21.21`, CNAME www → `cname.vercel-dns.com`, MX-Records NICHT anfassen

---

## Anhang: Wichtige Kontakte & Zugänge

| Was | Wer / Wo |
|-----|----------|
| Domain ubuntuforafrica.com | ALL-INKL, Zugangsdaten bei Sylke Funk |
| Sanity CMS | sanity.io → Projekt `u9u79lmd` |
| Stripe | dashboard.stripe.com |
| Resend | resend.com |
| Mailchimp | mailchimp.com |
| Vikunja (Projektmanagement) | http://192.168.178.166:3456 / https://vikunja.staatsprojekte.uk |
| Testserver | SSH: `moritz@192.168.178.166` |
| Dev-URL | http://192.168.178.166:3000 |
| Extern Dev-URL | https://ubuntu.staatsprojekte.uk |
| Kontakt Spenden | pauline.schmiel@gmail.com |
| Kontakt Volunteers | volunteers.ubuntuforafrica@gmx.de |
| GitHub Repo | github.com/Moritz-Staat/ubuntuforafrica |

---

*Dokumentation erstellt mit Claude Code · Ubuntu for Africa Website Rebuild · Zuletzt aktualisiert: 16.05.2026 (Session 3: EN-Sprachschalter, SEO Meta-Tags, Footer i18n, Homepage-Rewrite)*
