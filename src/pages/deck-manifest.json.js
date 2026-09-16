/**
 * HET APP-BESTAND VAN DECK.
 *
 * Dit vertelt de telefoon hoe Deck zich moet gedragen als hij op het
 * beginscherm staat: welke naam eronder komt, welk icoon, en dat hij zonder
 * adresbalk opent. Zonder dit bestand krijg je een bladwijzer die de browser
 * opent; mét dit bestand voelt het als een app.
 *
 * ALLEEN VOOR DECK
 * Dit bestand hangt aan die ene pagina en niet aan de site. Bezoekers merken
 * er dus niets van — die krijgen gewoon de website.
 *
 * WAAROM HIER EN NIET IN public/
 * Zo komen de kleuren uit brand.js en het pad uit pad(). Op de voorbeeldsite
 * staat alles in een submap, en een handgeschreven bestand zou daar naar de
 * verkeerde plek wijzen.
 */
import { BRAND } from '../data/brand.js';
import { SITE } from '../data/site.js';
import { pad } from '../lib/pad.js';

export async function GET() {
  const manifest = {
    name: `Deck — ${SITE.name}`,
    /* Wat er onder het icoon past. Twaalf tekens is het maximum voordat
       Android hem afkapt met drie puntjes. */
    short_name: 'Deck',
    description: 'Offertes, werkbonnen en facturen vanaf het kenteken.',
    start_url: pad('/deck'),
    scope: pad('/deck'),
    display: 'standalone',
    orientation: 'portrait',
    /* De kleuren van het merk: de balk bovenin en het opstartscherm. */
    theme_color: BRAND.bg,
    background_color: BRAND.bg,
    lang: 'nl',
    dir: 'ltr',
    icons: [
      {
        src: pad('/favicon.svg'),
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: pad('/icon-192.png'),
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: pad('/apple-touch-icon.png'),
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };

  return new Response(JSON.stringify(manifest, null, 2), {
    headers: { 'Content-Type': 'application/manifest+json; charset=utf-8' },
  });
}
