/**
 * Schutz gegen kaputt kodierte Sanity-Inhalte.
 *
 * Mehrere Dokumente in Sanity enthalten das Unicode-Ersatzzeichen U+FFFD (�)
 * statt Umlauten – `"�ber uns"` statt `"Über uns"`, `"Mitarbeiten �"`
 * statt eines Gedankenstrichs. Das entsteht, wenn Latin-1-Bytes als UTF-8
 * gelesen werden; das ursprüngliche Zeichen ist dabei verloren und lässt sich
 * nicht zurückrechnen.
 *
 * Solche Werte dürfen den freigegebenen Text aus dem Code nicht überschreiben.
 * `usable()` gibt sie als `undefined` zurück, damit der Fallback greift.
 *
 * Das ist eine Notbremse, keine Lösung: die Dokumente selbst gehören
 * repariert, sobald ein Editor-Token vorliegt (siehe GitHub #25, #26 und #4).
 * `scripts/fix-sanity-content.mjs` erledigt das dann in einem Rutsch.
 */
export function usable(value?: string | null): string | undefined {
  if (!value) return undefined
  return value.includes('�') ? undefined : value
}
