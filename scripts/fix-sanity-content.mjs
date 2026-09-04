/**
 * Repariert die kaputt kodierten und veralteten Sanity-Dokumente.
 *
 * Hintergrund: GitHub #25 und #26. Zwei `page`-Dokumente enthalten das
 * Unicode-Ersatzzeichen U+FFFD statt Umlauten, drei `teamMember`-Dokumente
 * transliterierte Umlaute (fuer, Sozialpaedagogin, Suedafrika) und dazu
 * veraltete Rollenbezeichnungen. Beide ueberschreiben auf der Website den
 * freigegebenen Text aus dem Code.
 *
 * Der Text unten ist derselbe, der im Code steht - Quelle sind Hannas
 * freigegebene .docx. Hier wird nichts neu erfunden.
 *
 * Aufruf:
 *   SANITY_API_TOKEN=<editor-token> node scripts/fix-sanity-content.mjs
 *   SANITY_API_TOKEN=<editor-token> node scripts/fix-sanity-content.mjs --dry-run
 *
 * Der Token in .env.local ist nur lesend (Viewer). Es braucht einen Token mit
 * Editor-Rechten - siehe #4. Sanity behaelt eine Revisionshistorie, ein Lauf
 * laesst sich im Studio also rueckgaengig machen.
 */

import { readFileSync } from 'node:fs'

const DRY_RUN = process.argv.includes('--dry-run')

// .env.local einlesen, ohne eine Dependency dafuer zu ziehen
const env = {}
try {
  for (const line of readFileSync(new URL('../.env.local', import.meta.url), 'utf8').split('\n')) {
    const match = /^([A-Z0-9_]+)=(.*)$/.exec(line.trim())
    if (match) env[match[1]] = match[2].replace(/^["']|["']$/g, '')
  }
} catch {
  // kein .env.local - dann muss alles aus der Umgebung kommen
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_TOKEN ?? env.SANITY_API_TOKEN

if (!projectId || !dataset || !token) {
  console.error('Fehlt: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET oder SANITY_API_TOKEN')
  process.exit(1)
}

const mutations = [
  {
    patch: {
      id: 'page-ueber-uns',
      set: {
        title_de: 'Über uns',
        title_en: 'About Us',
        // "und Familien" faellt raus: Zielgruppe sind heute Kinder (#27)
        hero_subtitle_de: 'Seit 2008 im Einsatz für Kinder in Südafrika',
        hero_subtitle_en: 'Working for children in South Africa since 2008',
      },
    },
  },
  {
    patch: {
      id: 'page-freiwillige',
      set: {
        title_de: 'Mitarbeiten – Wir suchen Volunteers!',
        title_en: 'Volunteer – Join Our Team!',
      },
    },
  },
  {
    patch: {
      id: 'B3hgisuX0nPvTJut010hTb', // Brenda Moloto
      set: {
        role: 'Leitung der Aftercare',
        role_en: 'Head of aftercare',
        bio: 'Brenda leitet die Aftercare, koordiniert die Freiwilligen und begleitet sie während ihres gesamten Aufenthalts.',
        bio_en: 'Brenda runs the aftercare, coordinates the volunteers and supports them throughout their stay.',
      },
    },
  },
  {
    patch: {
      id: 'B3hgisuX0nPvTJut010hWp', // Andiswa Watsha
      set: {
        role: 'Allgemeine Betreuung',
        role_en: 'General care',
        bio: 'Andiswa verantwortet das allgemeine Management der Aftercare und sorgt dafür, dass der Nachmittag für rund 40 Kinder verlässlich läuft.',
        bio_en: 'Andiswa is responsible for the general management of the aftercare and makes sure the afternoon runs reliably for around 40 children.',
      },
    },
  },
  {
    patch: {
      id: 'B3hgisuX0nPvTJut010ha3', // Birgitta Latz
      set: {
        role: '1. Vorsitzende',
        role_en: 'Chair',
        bio: 'Sozialpädagogin in Hamburg und ehemalige weltwärts-Freiwillige (09/2015–12/2016). Sie kennt die Arbeit vor Ort aus eigener Erfahrung.',
        bio_en: 'Social educator in Hamburg and former weltwärts volunteer (09/2015–12/2016). She knows the work on the ground from her own experience.',
      },
    },
  },
]

if (DRY_RUN) {
  console.log(`Dry run – ${mutations.length} Dokumente, es wird nichts geschrieben:\n`)
  for (const { patch } of mutations) {
    console.log(patch.id)
    for (const [key, value] of Object.entries(patch.set)) {
      console.log(`  ${key.padEnd(18)} ${value}`)
    }
    console.log()
  }
  process.exit(0)
}

const res = await fetch(
  `https://${projectId}.api.sanity.io/v2024-01-01/data/mutate/${dataset}`,
  {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ mutations }),
  }
)

const body = await res.json()

if (!res.ok || body.error) {
  console.error('Fehlgeschlagen:', JSON.stringify(body.error ?? body, null, 2))
  if (body.error?.type === 'insufficientPermissionsError') {
    console.error('\nDer Token darf nur lesen. Es braucht einen Editor-Token – siehe GitHub #4.')
  }
  process.exit(1)
}

console.log(`${mutations.length} Dokumente aktualisiert (transactionId ${body.transactionId}).`)
