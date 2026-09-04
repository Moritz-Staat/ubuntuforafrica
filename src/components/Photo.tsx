import Image from 'next/image'

/**
 * Foto in einem festen Seitenverhältnis. Ersetzt die `PhotoSlot`-Platzhalter
 * aus `Placeholder.tsx`, sobald ein Bild vorliegt (#12).
 *
 * Die Bilder liegen in `public/images/fotos/`, verkleinert und ohne
 * EXIF-Daten. Sie gehören mittelfristig nach Sanity, damit Hanna sie selbst
 * tauschen kann – das braucht aber einen Editor-Token (#4).
 *
 * `next/image` liefert automatisch WebP und passende Größen aus. Deshalb ist
 * `sizes` wichtig: ohne die Angabe lädt der Browser immer die volle Breite.
 *
 * Hinweis zu Next 16: `priority` ist abgekündigt. Für das LCP-Bild einer Seite
 * stattdessen `eager` setzen – das rendert `loading="eager"` und
 * `fetchPriority="high"`.
 */
export function Photo({
  src,
  alt,
  aspect = 'aspect-[4/3]',
  className = '',
  sizes = '(min-width: 1024px) 50vw, 100vw',
  eager = false,
}: {
  src: string
  alt: string
  aspect?: string
  className?: string
  sizes?: string
  eager?: boolean
}) {
  return (
    <div className={`relative overflow-hidden rounded-2xl ${aspect} ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover"
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={eager ? 'high' : 'auto'}
      />
    </div>
  )
}

/**
 * Hintergrundbild für einen Hero-Bereich. Liegt hinter den Farbverläufen, die
 * den Text lesbar halten – die Section braucht dafür `relative` und
 * `overflow-hidden`.
 *
 * `alt` ist bewusst leer: das Bild ist Dekoration, der Inhalt steht als Text
 * darüber. Screenreader sollen es überspringen.
 */
export function HeroPhoto({ src }: { src: string }) {
  return (
    <Image
      src={src}
      alt=""
      fill
      sizes="100vw"
      className="object-cover"
      loading="eager"
      fetchPriority="high"
      aria-hidden="true"
    />
  )
}
