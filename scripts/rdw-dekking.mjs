/**
 * Hoeveel van de auto's in Nederland herkent de site?
 *
 * Dit script praat met de RDW en is dus afhankelijk van internet én van een
 * dienst die er soms uit ligt. Daarom staat het hier en niet bij de tests:
 * `npm test` moet altijd werken, ook in de trein.
 *
 * Draaien:  npm run rdw
 *
 * Wat het níét doet: controleren of losse patronen kloppen. Dat gebeurt
 * offline in tests/matchers.test.js, met de gevallen uit tests/gevallen.js.
 *
 * Eerder waren dit twee scripts (valideer-kenteken en valideer-modelpaginas)
 * die allebei hun eigen kopie van de testgevallen hadden. Die zijn hierin
 * samengevoegd, want twee lijsten die uiteen kunnen lopen zijn erger dan geen.
 */
import { MODELS } from '../src/data/models.js';
import { AUTOS } from '../src/data/autos.js';
import { matchAuto } from '../src/lib/match.js';

const groen = (s) => `\x1b[32m${s}\x1b[0m`;
const rood = (s) => `\x1b[31m${s}\x1b[0m`;
const grijs = (s) => `\x1b[90m${s}\x1b[0m`;

const modelSlug = (merk, benaming) => {
  const M = String(merk).toUpperCase();
  const B = String(benaming).toUpperCase();
  const hit = MODELS.find((x) => M.includes(x.matchers.merk) && x.matchers.model.test(B));
  return hit ? hit.slug : null;
};

const autoSlug = (merk, benaming) => {
  const a = matchAuto({ merk, handelsbenaming: benaming, voertuigsoort: 'Personenauto' }, AUTOS);
  return a ? a.slug : null;
};

/** Haalt op met een paar pogingen: de RDW ligt er geregeld even uit. */
async function haal(url, pogingen = 3) {
  for (let i = 1; i <= pogingen; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) return res.json();
      if (i === pogingen) throw new Error(`RDW gaf ${res.status}`);
    } catch (err) {
      if (i === pogingen) throw err;
    }
    console.log(grijs(`  poging ${i} mislukt, opnieuw over ${i * 5}s…`));
    await new Promise((r) => setTimeout(r, i * 5000));
  }
}

const URL_TOP =
  'https://opendata.rdw.nl/resource/m9d7-ebf2.json' +
  '?$select=merk,handelsbenaming,count(*) as n' +
  "&$where=voertuigsoort='Personenauto'" +
  '&$group=merk,handelsbenaming&$order=n DESC&$limit=4000';

console.log('\nRDW ophalen…');

let rijen;
try {
  rijen = await haal(URL_TOP);
} catch (err) {
  console.log(rood(`\nDe RDW is niet bereikbaar (${err.message}).`));
  console.log('Dit zegt niets over de site zelf — probeer het later opnieuw.');
  console.log(grijs('De patronen zelf worden offline getoetst met: npm test\n'));
  process.exit(0);
}

let gezien = 0;
let metModel = 0;
let metNaam = 0;
const gatenPerMerk = new Map();

for (const r of rijen) {
  const n = Number(r.n) || 0;
  gezien += n;
  if (modelSlug(r.merk, r.handelsbenaming)) metModel += n;
  else {
    const merk = String(r.merk || '').toUpperCase();
    if (!gatenPerMerk.has(merk)) gatenPerMerk.set(merk, { n: 0, top: [] });
    const g = gatenPerMerk.get(merk);
    g.n += n;
    g.top.push([r.handelsbenaming, n]);
  }
  if (autoSlug(r.merk, r.handelsbenaming)) metNaam += n;
}

const pct = (deel) => ((deel / gezien) * 100).toFixed(1);

console.log(`\n${gezien.toLocaleString('nl-NL')} personenauto's bekeken\n`);
console.log(`  ${groen('Eigen modelpagina')}   ${pct(metModel)}%  ${grijs(metModel.toLocaleString('nl-NL'))}`);
console.log(`  ${groen('Herkend bij naam')}    ${pct(metNaam)}%  ${grijs(metNaam.toLocaleString('nl-NL'))}`);
console.log(grijs('\n  De rest komt op de upgradepagina met de naam rechtstreeks uit de RDW.'));

console.log('\nGrootste gaten (merken zonder modelpagina voor deze auto\'s):\n');
for (const [merk, g] of [...gatenPerMerk].sort((a, b) => b[1].n - a[1].n).slice(0, 12)) {
  const top = g.top
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([b, n]) => `${b} (${n.toLocaleString('nl-NL')})`)
    .join(', ');
  console.log(`  ${merk.padEnd(16)} ${String(g.n.toLocaleString('nl-NL')).padStart(9)}   ${grijs(top)}`);
}
console.log();
