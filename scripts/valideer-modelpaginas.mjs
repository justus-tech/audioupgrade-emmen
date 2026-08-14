/**
 * Toetst de `matchers` uit src/data/models.js tegen echte RDW-data.
 *
 * Deze matchers worden gebruikt door de kenteken-check op de homepage, die
 * de bezoeker doorstuurt naar de juiste modelpagina. Ze draaien op de RUWE
 * handelsbenaming (hoofdletters), niet op de genormaliseerde versie — dat is
 * een ander systeem dan autos.js, dus ze worden hier apart getoetst.
 *
 * Draaien:  npm run test:modellen
 *
 * De volgorde in models.js telt: de eerste match wint. Deze test laat per merk
 * zien wat waar terechtkomt, zodat je ziet of een patroon te breed is.
 */
import { MODELS } from '../src/data/models.js';

const groen = (s) => `\x1b[32m${s}\x1b[0m`;
const rood = (s) => `\x1b[31m${s}\x1b[0m`;
const grijs = (s) => `\x1b[90m${s}\x1b[0m`;

/** Zelfde logica als KentekenCheck.astro op de homepage. */
function slugVan(merk, benaming) {
  const M = String(merk).toUpperCase();
  const B = String(benaming).toUpperCase();
  const hit = MODELS.find((x) => M.includes(x.matchers.merk) && x.matchers.model.test(B));
  return hit ? hit.slug : null;
}

let fout = 0;
function check(merk, benaming, verwacht) {
  const kreeg = slugVan(merk, benaming);
  const ok = kreeg === verwacht;
  if (!ok) fout++;
  console.log(
    `  ${ok ? groen('OK  ') : rood('MIS ')} ${(merk + ' ' + benaming).padEnd(30)}` +
      (ok ? '' : rood(` verwacht ${verwacht}, kreeg ${kreeg}`))
  );
}

console.log('\n=== BMW: series en X-modellen mogen elkaar niet vangen ===');
check('BMW', '3ER REIHE', 'bmw-3-serie');
check('BMW', '320I', 'bmw-3-serie');
check('BMW', '330E', 'bmw-3-serie');
check('BMW', '118I', 'bmw-1-serie');
check('BMW', '116D', 'bmw-1-serie');
check('BMW', '1ER REIHE', 'bmw-1-serie');
check('BMW', '218I ACTIVE TOURER', 'bmw-2-serie');
check('BMW', '420D', 'bmw-4-serie');
check('BMW', '520D', 'bmw-5-serie');
check('BMW', '530E', 'bmw-5-serie');
check('BMW', '640I', 'bmw-6-serie');
check('BMW', '730D', 'bmw-7-serie');
check('BMW', '840I', 'bmw-8-serie');
check('BMW', 'X1 SDRIVE18I', 'bmw-x1');
check('BMW', 'X3 XDRIVE30D', 'bmw-x3');
check('BMW', 'X5 XDRIVE40I', 'bmw-x5');
check('BMW', 'X7 XDRIVE40I', 'bmw-x7');

console.log('\n=== Mag NIET matchen ===');
check('BMW', 'IX3', null);
check('BMW', 'I3', null);
check('BMW', 'R 1200 GS', null);

console.log('\n=== Overige merken ===');
check('VOLKSWAGEN', 'GOLF', 'volkswagen-golf');
check('VOLKSWAGEN', 'PASSAT VARIANT', 'volkswagen-passat');
check('SAAB', 'SAAB 9-3', 'saab-9-3');
// De 2008 heeft sinds kort een eigen pagina; hij mag alleen niet op de 208
// uitkomen. Dat is de valkuil die we hier bewaken.
check('PEUGEOT', '208', 'peugeot-208');
check('PEUGEOT', '2008', 'peugeot-2008');
check('FIAT', 'FIAT 500L', null);

// ------------------------------------------------ live scan per merk
console.log('\n=== Live scan: waar komt wat terecht? ===');
const merken = ['BMW', 'VOLKSWAGEN', 'MERCEDES-BENZ', 'AUDI'];

for (const merk of merken) {
  const url =
    `https://opendata.rdw.nl/resource/m9d7-ebf2.json?$select=handelsbenaming,count(*) as n` +
    `&$where=merk='${encodeURIComponent(merk)}' AND voertuigsoort='Personenauto'` +
    `&$group=handelsbenaming&$order=n DESC&$limit=90`;

  let rijen;
  try {
    const res = await fetch(url);
    rijen = await res.json();
    if (!Array.isArray(rijen)) throw new Error(JSON.stringify(rijen).slice(0, 120));
  } catch (err) {
    console.log(rood(`  ${merk}: ${err.message}`));
    continue;
  }

  const per = new Map();
  let gedekt = 0;
  let totaal = 0;
  const nietHerkend = [];

  for (const r of rijen) {
    const n = Number(r.n) || 0;
    totaal += n;
    const slug = slugVan(merk, r.handelsbenaming);
    if (slug) {
      gedekt += n;
      if (!per.has(slug)) per.set(slug, []);
      const l = per.get(slug);
      if (l.length < 4) l.push(r.handelsbenaming);
    } else if (nietHerkend.length < 8) {
      nietHerkend.push(r.handelsbenaming);
    }
  }

  console.log(`\n  ${merk} — ${((gedekt / totaal) * 100).toFixed(0)}% van de top-90 herkend`);
  for (const [slug, l] of [...per].sort()) {
    console.log(`    ${slug.padEnd(24)} ${grijs(l.join(', '))}`);
  }
  if (nietHerkend.length) {
    console.log(`    ${grijs('nog geen pagina: ' + nietHerkend.join(', '))}`);
  }
}

console.log(fout ? rood(`\n${fout} test(s) mislukt.\n`) : groen('\nAlle tests geslaagd.\n'));
process.exit(fout ? 1 : 0);
