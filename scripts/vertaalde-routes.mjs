/**
 * Schrijft de routebestanden voor /de en /en.
 *
 * Twaalf bestanden die alleen verschillen in taal en welk component ze laden.
 * Met de hand getypt zouden er onvermijdelijk twee uit elkaar lopen.
 */
import { writeFile, mkdir } from 'fs/promises';

const PAGINAS = [
  { sleutel: 'prijzen', comp: 'Prijzen', de: 'preise', en: 'pricing', veld: 'prijzen' },
  { sleutel: 'werkwijze', comp: 'Werkwijze', de: 'ablauf', en: 'how-it-works', veld: 'werkwijze' },
  { sleutel: 'vragen', comp: 'Vragen', de: 'fragen', en: 'faq', veld: 'vragen' },
  { sleutel: 'over', comp: 'OverOns', de: 'ueber-uns', en: 'about', veld: 'over' },
  { sleutel: 'contact', comp: 'Contact', de: 'kontakt', en: 'contact', veld: 'contact' },
  { sleutel: 'oldtimer', comp: 'Oldtimer', de: 'oldtimer', en: 'classics', veld: 'oldtimer' },
];

for (const taal of ['de', 'en']) {
  await mkdir(`./src/pages/${taal}`, { recursive: true });
  for (const p of PAGINAS) {
    const bestand = `./src/pages/${taal}/${p[taal]}.astro`;
    const inhoud = `---
/**
 * Gegenereerd door scripts/vertaalde-routes.mjs — niet met de hand aanpassen.
 *
 * De inhoud staat in src/components/vertaald/${p.comp}.astro, de teksten in
 * src/i18n/paginas.js. Dit bestand koppelt alleen het adres aan de taal.
 */
import Base from '../../layouts/Base.astro';
import ${p.comp} from '../../components/vertaald/${p.comp}.astro';
import { paginasVan } from '../../i18n/paginas.js';
import { PADEN } from '../../i18n/talen.js';

const t = paginasVan('${taal}').${p.veld};
---
<Base
  title={t.titel}
  description={t.omschrijving}
  path={PADEN.${p.sleutel}.${taal}}
  sleutel="${p.sleutel}"
  taal="${taal}"
>
  <${p.comp} taal="${taal}" />
</Base>
`;
    await writeFile(bestand, inhoud);
    console.log('geschreven:', bestand);
  }
}
