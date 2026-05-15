// Helper to pick the right language field from a Sanity document
export function localeField<T>(
  doc: Record<string, T>,
  field: string,
  locale: string
): T | undefined {
  const localeSuffix = locale === 'en' ? '_en' : '_de'
  // For fields without a suffix (like 'title' vs 'title_en'), try both patterns
  const localizedKey = `${field}${localeSuffix}`
  if (doc[localizedKey] !== undefined) return doc[localizedKey]
  // Fallback: for 'de' locale, field name without suffix (e.g. 'title', 'bio', 'role')
  if (locale === 'de' && doc[field] !== undefined) return doc[field]
  // Final fallback: try the other language
  const otherSuffix = locale === 'en' ? '_de' : '_en'
  if (doc[`${field}${otherSuffix}`] !== undefined) return doc[`${field}${otherSuffix}`]
  return doc[field]
}
