/**
 * HET APP-BESTAND VAN HEADROOM.
 *
 * Dit vertelt de telefoon hoe Headroom zich moet gedragen als hij op het
 * beginscherm staat: welke naam eronder komt, welk icoon, en dat hij zonder
 * adresbalk opent. Zonder dit bestand krijg je een bladwijzer die de browser
 * opent; mét dit bestand voelt het als een app.
 *
 * ALLEEN VOOR HEADROOM
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
import { APP, TABBLADEN } from '../data/app.js';

export async function GET() {
  const manifest = {
    name: `${APP.naam} — ${SITE.name}`,
    short_name: APP.kortenaam,
    description: APP.omschrijving,
    start_url: pad(APP.pad),
    scope: pad(APP.pad),
    display: 'standalone',
    orientation: 'portrait',
    /* De kleuren van het merk: de balk bovenin en het opstartscherm. */
    theme_color: BRAND.bg,
    background_color: BRAND.bg,
    lang: 'nl',
    dir: 'ltr',
    /**
     * De snelkoppelingen onder het icoon.
     *
     * Houd je op Android het icoon ingedrukt, dan klapt dit lijstje open.
     * Samsung toont er een stuk of vier; de belangrijkste staat daarom
     * bovenaan. Agenda eerst: dat is wat je 's ochtends wilt zien.
     */
    shortcuts: [
      { id: 'agenda', naam: 'Agenda' },
      { id: 'offerte', naam: 'Nieuwe offerte' },
      { id: 'autos', naam: "Auto's" },
      { id: 'catalogus', naam: 'Onderdelen' },
    ].map(({ id, naam }) => ({
      name: naam,
      short_name: naam,
      description: TABBLADEN.find((t) => t.id === id)?.wat || naam,
      url: `${pad(APP.pad)}?tab=${id}`,
      icons: [{ src: pad('/icon-192.png'), sizes: '192x192', type: 'image/png' }],
    })),
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
