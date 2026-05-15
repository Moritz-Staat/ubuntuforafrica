# Ubuntu for Africa – Website

**Offizielle Website** für [Ubuntu for Africa – Kinder, Jugend- und Familienhilfe e.V.](https://ubuntuforafrica.com)

> „Umuntu Ngumntu Ngabantu – Ich bin, weil wir sind."

Testumgebung: **https://ubuntu.staatsprojekte.uk**  
Sanity Studio (CMS): **https://ubuntu.staatsprojekte.uk/studio**

---

## Tech Stack

| Komponente | Technologie |
|---|---|
| Framework | Next.js 16 (App Router) |
| Sprache | TypeScript |
| Styling | Tailwind CSS v4 + shadcn/ui |
| CMS | Sanity (Projekt-ID: `u9u79lmd`) |
| Internationalisierung | next-intl (DE 🇩🇪 / EN 🇬🇧) |
| Hosting (Produktion) | Vercel |
| Hosting (Test) | Docker auf Homeserver |

### Geplante Integrationen
- **Stripe** – Online-Spenden (ausstehend: API Keys)
- **Instagram Graph API** – Feed auf Startseite (ausstehend: Access Token)
- **Mailchimp** – Newsletter (ausstehend: API Key)

---

## Seiten

| Route | Inhalt |
|---|---|
| `/de` / `/en` | Startseite mit Hero, Impact Counter, Projekten, Spenden-CTA |
| `/de/ueber-uns` | Geschichte, Team Südafrika, Vorstand Deutschland |
| `/de/projekte` | Projektübersicht (Aftercare, Schulkooperation, Freiwillige) |
| `/de/freiwillige` | Volunteer-Programm, Voraussetzungen, Kosten |
| `/de/spenden` | Spendenaufruf, Bankverbindung, Spendenbeträge |
| `/de/kontakt` | Kontaktformular |
| `/de/blog` | Blog-Übersicht (aus Sanity) |
| `/de/blog/[slug]` | Blog-Beitrag mit Rich Text |
| `/studio` | Sanity Studio – CMS für das Team |

Alle Seiten sind vollständig zweisprachig (DE/EN).

---

## Lokale Entwicklung

```bash
# Abhängigkeiten installieren
npm install

# Umgebungsvariablen anlegen
cp .env.example .env.local
# → Werte in .env.local eintragen

# Entwicklungsserver starten
npm run dev
```

Öffne [http://localhost:3000](http://localhost:3000) im Browser.

### Mit Docker

```bash
docker compose up -d --build
```

Erreichbar unter [http://localhost:3000](http://localhost:3000).

---

## Umgebungsvariablen

Kopiere `.env.example` zu `.env.local` und fülle die Werte aus:

```env
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=u9u79lmd
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=

# Stripe (Online-Spenden)
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=

# Resend (E-Mail)
RESEND_API_KEY=

# Mailchimp (Newsletter)
MAILCHIMP_API_KEY=
MAILCHIMP_AUDIENCE_ID=

# Instagram
INSTAGRAM_ACCESS_TOKEN=

# Basis-URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

---

## Projektstruktur

```
src/
├── app/
│   ├── [locale]/          # Alle Seiten (DE/EN)
│   │   ├── page.tsx       # Startseite
│   │   ├── ueber-uns/
│   │   ├── projekte/
│   │   ├── freiwillige/
│   │   ├── spenden/
│   │   ├── kontakt/
│   │   └── blog/
│   ├── studio/            # Eingebettetes Sanity Studio
│   └── api/               # API Routes (Kontakt, Newsletter, Stripe)
├── components/
│   ├── layout/            # Navbar, Footer
│   ├── sections/          # Hero, Impact, etc.
│   └── ui/                # shadcn/ui Komponenten
├── sanity/
│   ├── schemaTypes/       # Sanity Schemas (post, project, teamMember, page, siteSettings)
│   └── lib/               # Client, Queries, Image Helper
├── i18n/                  # next-intl Routing & Request Config
├── lib/                   # Sanity Locale Helper, Stripe Client
└── messages/
    ├── de.json            # Deutsche UI-Strings
    └── en.json            # Englische UI-Strings
```

---

## Sanity CMS

Das Team kann Inhalte direkt unter `/studio` bearbeiten:

- **Beiträge** – Blog/News in DE + EN
- **Projekte** – Projektbeschreibungen in DE + EN
- **Team** – Team SA und Vorstand DE mit Fotos
- **Seiteninhalt** – Titel/Untertitel pro Seite in DE + EN
- **Einstellungen** – IBAN, Kontakt-E-Mail, Social Links, Footer-Text

---

## Markenfarben

| Name | Hex |
|---|---|
| Primary (Türkis) | `#11aed1` |
| Accent (Lila) | `#ae64fd` |
| Highlight (Orange) | `#f7a900` |
| Dark | `#212529` |

---

## Deployment (Vercel)

```bash
vercel deploy
```

Alle Umgebungsvariablen müssen im Vercel-Dashboard unter **Settings → Environment Variables** eingetragen sein.

**DNS (ALL-INKL) – erst beim finalen Launch:**
```
A-Record:  @    →  76.76.21.21
CNAME:     www  →  cname.vercel-dns.com
```
> ⚠️ MX-Records **nicht** ändern – E-Mail bleibt auf ALL-INKL!

---

## Organisation

**UBUNTU for Africa – Kinder, Jugend- und Familienhilfe e.V.**  
Gegründet 2008 von Sylke Funk | Verein seit 2015  
Standort: Imizamo Yethu, Hout Bay, Kapstadt, Südafrika  
Kontakt: pauline.schmiel@gmail.com
