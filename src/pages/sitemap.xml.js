/**
 * De sitemap: één lijst met elke pagina die gevonden mag worden.
 *
 * Zonder dit bestand moet een zoekmachine alle 184 pagina's zelf zien te
 * vinden door links te volgen. Met dit bestand krijgt hij ze in één keer.
 * Google, Bing én de AI-crawlers gebruiken hem allemaal.
 *
 * De `priority` is een hint over wat het belangrijkst is. De modelpagina's
 * krijgen bewust een hoge waarde: die moeten ranken op "BMW X5 audio
 * upgrade", en dat is waar het bezoek vandaan komt.
 */
import { MODELS } from '../data/models.js';
import { MERKEN_MET_MODELLEN } from '../data/merken.js';
import { JURIDISCHE_PAGINAS } from '../data/juridisch.js';
import { SITE } from '../data/site.js';

/** De vaste pagina's, met hoe belangrijk ze zijn. */
const VAST = [
  ['/', 1.0],
  ['/upgrades', 0.9],
  ['/audio-upgrade', 0.8],
  ['/werkwijze', 0.7],
  ['/contact', 0.7],
  // De juridische pagina's horen wel in de sitemap — mensen zoeken er soms
  // gericht op — maar hoeven niet hoog te scoren.
  ...JURIDISCHE_PAGINAS.map((d) => [`/${d.slug}`, 0.3]),
];

export async function GET() {
  const vandaag = new Date().toISOString().slice(0, 10);

  const paden = [
    ...VAST,
    ...MERKEN_MET_MODELLEN.map((m) => [`/merk/${m.slug}`, 0.7]),
    ...MODELS.map((m) => [`/audio-upgrade/${m.slug}`, 0.8]),
  ];

  const regels = paden
    .map(
      ([pad, prioriteit]) =>
        `  <url>\n` +
        `    <loc>${SITE.url}${pad}</loc>\n` +
        `    <lastmod>${vandaag}</lastmod>\n` +
        `    <priority>${prioriteit.toFixed(1)}</priority>\n` +
        `  </url>`
    )
    .join('\n');

  const xml =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    regels +
    '\n</urlset>\n';

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
