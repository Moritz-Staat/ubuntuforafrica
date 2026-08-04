/**
 * Markierung für erfundenen oder veralteten Text, der noch vom Verein
 * geprüft werden muss. Rot hinterlegt, damit beim Durchklicken sofort
 * auffällt, was noch nicht freigegeben ist.
 *
 * Eingeführt in f9e447d (damals gelb und pro Seite dupliziert), seit
 * 04.08.2026 zentral hier. Immer von hier importieren, nie neu definieren –
 * sonst muss die Farbe wieder an vier Stellen geändert werden.
 *
 * - `PH`         Block-Markierung für ganze Absätze
 * - `PHInline`   Inline-Markierung für einzelne Wörter/Zahlen im Fließtext
 * - `PHLabel`    Warnhinweis über einem Block
 * - `PhotoSlot`  Platzhalter für ein noch fehlendes Foto
 * - `PHNumber`   Platzhalter für eine unbelegte Zahl (Statistik, Betrag)
 */

export const PH: React.CSSProperties = {
  backgroundColor: '#fee2e2',
  borderLeft: '4px solid #dc2626',
  borderRadius: '4px',
  padding: '6px 10px',
  display: 'block',
}

export const PHInline: React.CSSProperties = {
  backgroundColor: '#fee2e2',
  borderBottom: '2px solid #dc2626',
  padding: '0 3px',
  borderRadius: '2px',
}

export const PHLabel = () => (
  <span
    style={{
      display: 'block',
      color: '#991b1b',
      fontSize: '11px',
      fontWeight: 700,
      letterSpacing: '0.05em',
      marginBottom: '4px',
    }}
  >
    ⚠ PLACEHOLDER – BITTE PRÜFEN / ERSETZEN
  </span>
)

/**
 * Platzhalter für ein Foto, das noch fehlt.
 *
 * `describe` beschreibt, was hier hingehört – das ist die Einkaufsliste für
 * Hanna. Sobald das Bild da ist, diese Komponente durch <Image> ersetzen.
 */
export const PhotoSlot = ({
  describe,
  aspect = 'aspect-[4/3]',
}: {
  describe: string
  aspect?: string
}) => (
  <div className={`relative overflow-hidden rounded-2xl ${aspect}`}>
    <div className="absolute inset-0 flex items-center justify-center bg-[#fee2e2] border-2 border-dashed border-[#dc2626]">
      <div className="px-6 text-center text-[#991b1b]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto mb-3 h-12 w-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <p className="text-[11px] font-bold uppercase tracking-[0.05em]">
          ⚠ Foto fehlt
        </p>
        <p className="mt-1 text-sm">{describe}</p>
      </div>
    </div>
  </div>
)

/**
 * Platzhalter für eine Zahl, die noch niemand belegt hat – Statistiken,
 * Beträge, Laufzeiten. Zeigt den bisherigen Wert durchgestrichen daneben,
 * damit klar ist, was zu prüfen ist und nicht einfach verschwindet.
 */
export const PHNumber = ({ was }: { was?: string }) => (
  <span style={PHInline} className="whitespace-nowrap">
    ?
    {was && (
      <span className="ml-1 text-[0.6em] align-middle line-through opacity-60">
        {was}
      </span>
    )}
  </span>
)
