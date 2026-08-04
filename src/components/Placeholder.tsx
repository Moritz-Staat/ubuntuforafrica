/**
 * Markierung für erfundenen Text, der noch vom Verein geprüft werden muss.
 *
 * Eingeführt in f9e447d, dort noch pro Seite dupliziert (patenschaften,
 * transparenz, kontakt). Neue Seiten importieren stattdessen von hier.
 *
 * - `PH`      Block-Markierung für ganze Absätze
 * - `PHInline` Inline-Markierung für einzelne Wörter/Zahlen im Fließtext
 * - `PHLabel` Warnhinweis über einem Block
 */

export const PH: React.CSSProperties = {
  backgroundColor: '#fef9c3',
  borderLeft: '4px solid #f59e0b',
  borderRadius: '4px',
  padding: '6px 10px',
  display: 'block',
}

export const PHInline: React.CSSProperties = {
  backgroundColor: '#fef9c3',
  borderBottom: '2px solid #f59e0b',
  padding: '0 3px',
  borderRadius: '2px',
}

export const PHLabel = () => (
  <span
    style={{
      display: 'block',
      color: '#92400e',
      fontSize: '11px',
      fontWeight: 700,
      letterSpacing: '0.05em',
      marginBottom: '4px',
    }}
  >
    ⚠ PLACEHOLDER – BITTE PRÜFEN / ERSETZEN
  </span>
)
