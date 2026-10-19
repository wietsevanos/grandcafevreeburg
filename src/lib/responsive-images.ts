/**
 * Responsive WebP-varianten uit src/assets/img (bestandsnaam: <naam>-<breedte>.webp).
 * Vite geeft elk bestand een gehashte naam, zodat het met de build meegaat naar DirectAdmin.
 * De originele foto's staan als bronmateriaal in design-sources/originals en worden niet meegeleverd.
 */
const files = import.meta.glob("/src/assets/img/*.webp", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

export type ResponsiveImage = { url: string; srcSet: string };

export function responsiveImage(name: string): ResponsiveImage {
  const variants = Object.entries(files)
    .map(([path, url]) => {
      const m = path.match(/\/([^/]+)-(\d+)\.webp$/);
      return m && m[1] === name ? { w: Number(m[2]), url } : null;
    })
    .filter((v): v is { w: number; url: string } => v !== null)
    .sort((a, b) => a.w - b.w);
  if (variants.length === 0) throw new Error(`Geen afbeelding gevonden: ${name}`);
  return {
    url: variants[variants.length - 1].url,
    srcSet: variants.map((v) => `${v.url} ${v.w}w`).join(", "),
  };
}
