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
import { PADEN, padVan } from '../i18n/talen.js';

/** De vaste pagina's, met hoe belangrijk ze zijn. */
const VAST = [
  ['/', 1.0],
  ['/upgrades', 0.9],
  ['/audio-upgrade', 0.8],
  ['/werkwijze', 0.7],
  ['/over-ons', 0.7],
  ['/contact', 0.7],
  ['/oldtimer-audio', 0.8],
  // Eigen doelgroep: autobedrijven die een derde optie willen aanbieden.
  ['/voor-autobedrijven', 0.6],
  // Hoog, want dit is de pagina die op losse vragen moet ranken.
  ['/veelgestelde-vragen', 0.8],
  // De juridische pagina's horen wel in de sitemap — mensen zoeken er soms
  // gericht op — maar hoeven niet hoog te scoren.
  ...JURIDISCHE_PAGINAS.map((d) => [`/${d.slug}`, 0.3]),
];

/**
 * De Duitse en Engelse pagina's.
 *
 * Ze staan wat lager dan hun Nederlandse tegenhangers: het Nederlands is de
 * hoofdtaal en heeft veruit de meeste inhoud. Dat is geen oordeel over hun
 * belang maar een hint over waar Google zijn tijd het beste besteedt.
 */
const VERTAALDE_PADEN = ['de', 'en'].flatMap((taal) =>
  Object.keys(PADEN).map((sleutel) => [padVan(sleutel, taal), sleutel === 'home' ? 0.8 : 0.6])
);

export async function GET() {
  /* Geen lastmod meer.
     Hier stond de datum van de bouw, op alle 204 adressen tegelijk. Daarmee
     vertelde de sitemap elke keer dat de hele site die dag veranderd was —
     ook als er alleen een komma was verzet. Een zoekmachine die dat een paar
     keer ziet, gaat de datum negeren, en dan werkt hij ook niet meer op de
     momenten dat er écht iets veranderd is. Geen datum is eerlijker dan een
     datum die niet klopt. Wil je ze per pagina kloppend maken, dan moet de
     bouwstraat de volledige geschiedenis ophalen (fetch-depth: 0) en de
     datum van de laatste wijziging per bestand uit git komen. */
  const paden = [
    ...VAST,
    ...VERTAALDE_PADEN,
    ...MERKEN_MET_MODELLEN.map((m) => [`/merk/${m.slug}`, 0.7]),
    ...MODELS.map((m) => [`/audio-upgrade/${m.slug}`, 0.8]),
  ];

  const regels = paden
    .map(
      ([pad, prioriteit]) =>
        `  <url>\n` +
        `    <loc>${SITE.url}${pad}</loc>\n` +
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
