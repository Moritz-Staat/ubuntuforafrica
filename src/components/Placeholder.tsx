/**
 * Markierung für erfundenen oder veralteten Text, der noch vom Verein
 * geprüft werden muss. Rot hinterlegt, damit beim Durchklicken sofort
 * auffällt, was noch nicht freigegeben ist.
 *
 * Eingeführt in f9e447d (damals gelb und pro Seite dupliziert), seit
 * 04.08.2026 zentral hier. Immer von hier importieren, nie neu definieren –
 * sonst muss die Farbe wieder an vier Stellen geändert werden.
 *
 * - `PH`       Block-Markierung für ganze Absätze
 * - `PHInline` Inline-Markierung für einzelne Wörter/Zahlen im Fließtext
 * - `PHLabel`  Warnhinweis über einem Block
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
