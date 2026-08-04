# Ubuntu for Africa – Website

**Offizielle Website** für Ubuntu for Africa – Kinder, Jugend- und Familienhilfe e.V.

> „Umuntu Ngumntu Ngabantu – Ich bin, weil wir sind."

**Stand: 4. August 2026**

---

## Wo läuft was

| | URL | Zustand |
|---|---|---|
| **Produktion** | https://ubuntuforafrica.vercel.app | Live, öffentlich erreichbar, `noindex` |
| Studio (CMS) | https://ubuntuforafrica.vercel.app/studio | Sanity-Login nötig |
| Alte Testumgebung | https://ubuntu.staatsprojekte.uk | Läuft noch, **veralteter Stand** |
| Zieldomain | ubuntuforafrica.com | Noch nicht umgezogen, Issue #21 |

Die Produktions-URL ist **ohne Login erreichbar**. Auf dem Vercel-Hobby-Plan lässt sich das nicht ändern (`Vercel Authentication is not available on your plan for production deployments`). Deshalb sind `robots.txt` mit `Disallow: /` und `noindex, nofollow` gesetzt — die Seite ist erreichbar, aber nicht auffindbar. Beides beim Launch entfernen.

## Aufgabenverfolgung

**GitHub Issues sind die führende Quelle:** https://github.com/Moritz-Staat/ubuntuforafrica/issues

Vikunja (Projekt 11) bleibt als Übersicht für den Verein bestehen, wird aber nicht mehr gepflegt. Die Zuordnung steht in der Vikunja-Projektbeschreibung.

Labels: `blocked:extern` (wartet auf Hanna, Sylke oder den Verein) · `infra` · `content` · `legal` · `security` · `launch-blocker`

---

## Tech Stack

| Komponente | Technologie |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Sprache | TypeScript |
| Styling | Tailwind CSS v4 + shadcn/ui |
| CMS | Sanity, Projekt `u9u79lmd`, Dataset `production` |
| i18n | next-intl (DE / EN), Default `de` |
| Zahlungen | Stripe – vorbereitet, **nicht aktiv** |
| E-Mail | Resend – vorbereitet, **nicht aktiv** |
| Newsletter | Mailchimp – Formular fertig, **Versand nicht aktiv** |
| Hosting | Vercel, Auto-Deploy aus `main` |

> **Achtung bei Next.js 16:** Diese Version hat Breaking Changes gegenüber älteren. Vor dem Schreiben von Code den passenden Guide unter `node_modules/next/dist/docs/` lesen. Steht auch in `AGENTS.md`.

---

## Loslegen

```bash
git clone https://github.com/Moritz-Staat/ubuntuforafrica.git
cd ubuntuforafrica
npm install
cp .env.local.example .env.local   # Sanity-Werte eintragen
npm run dev                        # http://localhost:3000
```

Für Vercel-Zugriff zusätzlich `npx vercel login` und `npx vercel link --project ubuntuforafrica`.

### Environment Variables

| Variable | Status |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | ✅ gesetzt (`u9u79lmd`) |
| `NEXT_PUBLIC_SANITY_DATASET` | ✅ gesetzt (`production`) |
| `SANITY_API_TOKEN` | ✅ gesetzt — **nur Leserechte** (Robot „Claude", Access Manager) |
| `STRIPE_SECRET_KEY` · `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` · `STRIPE_WEBHOOK_SECRET` | ⬜ Issue #13 |
| `RESEND_API_KEY` | ⬜ ohne den verschickt das Kontaktformular nichts |
| `MAILCHIMP_API_KEY` · `MAILCHIMP_AUDIENCE_ID` | ⬜ Issue #17 |
| `INSTAGRAM_ACCESS_TOKEN` | ⬜ Issue #18 |
| `CONTACT_EMAIL` | ⬜ Issue #9 |

Alle API-Routen haben Fallbacks — fehlende Keys lassen den Build nicht scheitern, die Funktion bleibt nur aus. `/api/newsletter` loggt dann nur in die Konsole.

---

## Seitenstruktur

Alle Seiten unter `src/app/[locale]/`, Locales `de` und `en`.

`/` · `/ueber-uns` · `/projekte` · `/freiwillige` · `/spenden` · `/patenschaften` · `/foerderpartner` · `/transparenz` · `/blog` · `/blog/[slug]` · `/kontakt` · `/impressum` · `/datenschutz`

API-Routen: `/api/contact` · `/api/donate` · `/api/newsletter` · `/api/webhook/stripe`

---

## Platzhalter-System

**Rot hinterlegter Text ist nicht freigegeben.** Er stammt entweder von mir und ist erfunden, oder er ist veraltet und widerspricht Hannas Vorgaben vom 22.07.2026.

Alles dafür liegt in `src/components/Placeholder.tsx` — **nie neu definieren, immer von dort importieren**:

| Element | Wofür |
|---|---|
| `PH` | Block-Markierung für ganze Absätze |
| `PHInline` | Inline-Markierung für einzelne Wörter im Fließtext |
| `PHLabel` | Warnhinweis „⚠ PLACEHOLDER – BITTE PRÜFEN / ERSETZEN" |
| `PhotoSlot` | Rot gestrichelter Kasten, wo ein Foto fehlt. `describe` sagt welches |
| `PHNumber` | Unbelegte Zahl, zeigt den alten Wert durchgestrichen daneben |

### Was konkret ersetzt werden muss

| Seite | Offen |
|---|---|
| Startseite | 3 Wirkungszahlen (200+, 16, 50k+), 4 Spendenbeträge, 1 Foto |
| Über uns | 1 Foto (Sylke Funk oder Team) |
| Freiwillige | Mindestdauer, Wochenstunden, Monatsbeitrag |
| Projekte | Projektbeschreibungen prüfen |
| Spenden | **„100 % direkt in Projekte" und „0 € Verwaltungsgehälter" — belegen oder streichen**, Wirkungstexte, IBAN |
| Patenschaften | Kosten, Leistungen, Abgrenzung zu Förderpartner |
| Förderpartner | Kompletter Seitentext |
| Transparenz | Zahlen und Projektbeschreibungen |

**Entfernt, weil Hanna es so vorgegeben hat:** alle Geldbeträge aus Fließtexten, „mindestens 3 Monate" (soll 2 werden), „30–35 Stunden/Woche", „995 €/Monat". Die alten Werte stehen durchgestrichen daneben, damit nichts verlorengeht.

### Beim Launch entfernen

1. `src/app/robots.ts` löschen oder auf `allow: '/'` stellen
2. `robots: { index: false, follow: false }` aus `src/app/[locale]/layout.tsx`
3. Alle `PH*`-Importe und `PhotoSlot`-Verwendungen — wenn die noch drin sind, ist die Seite nicht launchreif

---

## Inhalte pflegen

Über das Sanity Studio unter `/studio`. Aktuell stehen dort **6 Dokumente**: 3 Team-Mitglieder, 2 Seiten, 1 siteSettings. Keine Projekte, keine Blogbeiträge, keine Bilder.

Schema-Typen: `page` · `post` · `project` · `siteSettings` · `teamMember` (in `src/sanity/schemaTypes/`)

**Bekannte Baustelle:** `siteSettings.contactEmail` steht noch auf `pauline.schmiel@gmail.com`. Der Wert wird von keiner Komponente ausgewertet — die Adressen kommen aus `src/lib/site-config.ts`. Siehe Issue #4.

**Kontaktadressen niemals direkt in Seiten schreiben**, immer aus `src/lib/site-config.ts` importieren. Sie standen schon einmal 15× hartcodiert in 7 Dateien.

---

## Deployment

Push auf `main` löst automatisch ein Production-Deployment aus (verbunden seit 14. Mai).

```bash
npx vercel --prod --yes          # manuell
npx vercel curl <url>            # geschützte Deployments prüfen
```

**Wichtig:** Zwischen dem 14. Mai und dem 4. August sind **alle** Builds fehlgeschlagen. Ursache war Versions-Drift der `^`-Ranges: `@sanity/image-url` hatte den Pfad `lib/types/types` entfernt, das Stripe-SDK verlangte eine neue `apiVersion`. Behoben in `4c11fcc`. Wenn Builds wieder rot werden, zuerst dort nachsehen.

---

## Sicherheitshinweise

- **Sanity-CORS steht auf `https://*.vercel.app` mit `Allow credentials`.** Damit darf jede Vercel-Subdomain — auch fremde Projekte — authentifizierte Requests im Namen eines eingeloggten Studio-Users senden. Vor dem Launch eingrenzen, Issue #22.
- **Nie einen Token in die Git-Remote-URL schreiben.** Stattdessen `gh auth login`. Es lagen bereits zwei PATs im Klartext herum.
- Der Sanity-Token in `.env.local` kann **nur lesen**. Zum Schreiben braucht es einen Editor-Token, Issue #4.
- Impressum und Datenschutz sind selbst erstellt und **rechtlich ungeprüft**, Issue #14. Da die Seite öffentlich erreichbar ist, ist das keine reine Launch-Frage mehr.

---

## Konventionen

- **Keine `Co-Authored-By: Claude`-Trailer** in Commits.
- Commit-Messages auf Deutsch, Präfixe `feat:` `fix:` `style:` `content:` `docs:`.
- Vor Next.js-spezifischem Code die Doku unter `node_modules/next/dist/docs/` lesen (siehe `AGENTS.md`).
- Deprecation-Warnungen im Build beheben, nicht ignorieren.

---

## Weiterführend

- `AGENTS.md` — Arbeitsanweisung für KI-Agenten
- `DOKUMENTATION.md` — ausführliche Projektdoku (Stand Juli 2026, teilweise veraltet)
- GitHub Issues — aktueller Stand aller offenen Punkte
