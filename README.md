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
| Testumgebung | https://ubuntu.staatsprojekte.uk | Aktueller Stand, Docker auf 192.168.178.166 |
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
| `INSTAGRAM_ACCESS_TOKEN` | ⬜ Code steht, Token fehlt — siehe „Instagram" unten |
| `INSTAGRAM_USER_ID` | optional, nur bei Facebook-Login-Token |
| `INSTAGRAM_REFRESH_SECRET` | optional, schützt `/api/instagram/refresh` |
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

Stand 14.08.2026, nachdem die Texte von Hanna eingepflegt sind:

| Seite | Offen |
|---|---|
| Startseite | 4 Spendenbeträge mit Wirkungstexten, 1 Foto |
| Über uns | 1 Foto (Sylke Funk oder Team), Teamfotos |
| Projekte | 3 Fotos |
| Spenden | IBAN, Wirkungstexte, **„100 % direkt in Projekte" belegen oder streichen** |
| Förderpartner | Kompletter Seitentext (Issue #20) |
| Kontakt | Antwortzeiten in den FAQ |

**Quelle der Wahrheit sind die Dokumente von Hanna** (`Website - Text …docx`), nicht ältere Notizen. Daraus stammen unter anderem: Mindestdauer drei Monate, 995 € pro Monat (400 Unterkunft + 595 Projekt), 30–35 Stunden pro Woche, rund 50 Kinder in der Aftercare von 13:30 bis 17:00 Uhr.

**Nicht mehr vorhanden:** Familienprogramm/Nothilfe für Familien und Patenschaften. Beides ist aus dem Code entfernt, `/patenschaften` gibt es nicht mehr.

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

### Wer bekommt welche Nachricht

`CONTACT_ROUTING` in `src/lib/site-config.ts` ist die einzige Stelle dafür — sie speist die Themenauswahl im Kontaktformular **und** den Empfänger in `/api/contact`. Der Empfänger wird serverseitig aus dem Schlüssel abgeleitet, das Formular kann keine beliebige Adresse ansteuern.

| Thema | geht an |
|---|---|
| Freiwillige & Praktikum | `volunteers.ubuntuforafrica@gmx.de` |
| Spendenquittung | `pauline.schmiel@gmail.com` |
| Spenden, Fördermitgliedschaft, Presse, Sonstiges | `info@ubuntuforafrica.com` |

`pauline.schmiel@gmail.com` ist **nur** für Spendenquittungen richtig — so steht es im freigegebenen Spenden-Text. Nicht wieder pauschal durch `info@` ersetzen.

---

## Instagram

Der Feed hängt an **@ubuntuforafrica** und erscheint an zwei Stellen: als Kachelraster auf der Startseite (6 Posts) und chronologisch einsortiert zwischen den Blogartikeln (9 Posts). Code: `src/lib/instagram.ts` und `src/components/InstagramFeed.tsx`.

**Ohne Token passiert nichts** — die Sektion wird nicht gerendert, die Seiten funktionieren normal. Genauso, wenn der Abruf scheitert; der Fehler landet nur im Log.

### Token besorgen

Die alte **Basic Display API ist seit dem 4.12.2024 abgeschaltet**, alte Tokens funktionieren nicht mehr. Aktuell gibt es zwei Wege:

| Weg | Voraussetzung | Env |
|---|---|---|
| Instagram API with Instagram Login | Instagram-Konto ist Professional (Business oder Creator) | nur `INSTAGRAM_ACCESS_TOKEN` |
| Instagram API with Facebook Login | IG-Konto hängt an einer Facebook-Seite | zusätzlich `INSTAGRAM_USER_ID` (IG-Business-ID) |

Der Code erkennt den Fall an `INSTAGRAM_USER_ID`: ist die gesetzt, läuft die Abfrage über `graph.facebook.com`, sonst über `graph.instagram.com/me/media`.

### Der Token läuft nach 60 Tagen ab

Danach ist der Feed still weg — kein Fehler auf der Seite, nur keine Bilder mehr. Zum Verlängern (Token muss älter als 24 Stunden sein):

```
GET /api/instagram/refresh?secret=<INSTAGRAM_REFRESH_SECRET>
```

Die Route gibt den **neuen** Token zurück; der muss von Hand in Vercel unter `INSTAGRAM_ACCESS_TOKEN` eingetragen und neu deployt werden. Ein laufender Prozess kann seine eigenen Env-Werte nicht überschreiben. Ohne gesetztes `INSTAGRAM_REFRESH_SECRET` antwortet die Route mit 404.

> Am besten eine Kalendererinnerung alle ~50 Tage. Wer das automatisieren will, braucht die Vercel-API zum Schreiben der Env-Variable — das ist bewusst nicht eingebaut.

---

## Deployment

Push auf `main` löst automatisch ein Production-Deployment aus (verbunden seit 14. Mai).

```bash
npx vercel --prod --yes          # manuell
npx vercel curl <url>            # geschützte Deployments prüfen
```

### Testumgebung aktualisieren

Läuft als Docker-Container auf `moritz@192.168.178.166` unter `~/projects/ubuntu-for-africa`, erreichbar über den Nginx Proxy als https://ubuntu.staatsprojekte.uk.

```bash
# Code auf den Server bringen (aus dem Projektverzeichnis)
tar -czf - --exclude=node_modules --exclude=.next --exclude=.git . \
  | ssh moritz@192.168.178.166 "cd ~/projects/ubuntu-for-africa && tar -xzf -"

ssh moritz@192.168.178.166 "cd ~/projects/ubuntu-for-africa && docker compose up -d --build"
```

**Der Container baut produktiv (`next build` + `next start`) — bitte nicht auf `next dev` zurückstellen.** Im Dev-Modus scheitert hinter dem Proxy der HMR-WebSocket, die Seite hydriert nie, und dann funktioniert nichts, was JavaScript braucht: mobiles Menü, Sprachumschalter, Formulare. Das sah lange wie ein Layout-Bug aus.

`.env.local` liegt nur auf dem Server und wird **nicht** ins Image kopiert (`.dockerignore`). Die beiden `NEXT_PUBLIC_SANITY_*`-Werte gehen als Build-Args aus der `docker-compose.yml` in den Build.

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
