/**
 * Toetst de `matchers` uit src/data/models.js tegen ECHTE RDW-data, met exact
 * dezelfde matchlogica als KentekenCheck.astro gebruikt:
 *     merk.includes(m) && re.test(handelsbenaming)
 *
 * Draaien:  npm run test:kenteken
 *
 * Draai dit altijd na het wijzigen van een `matchers`-patroon. De test let niet
 * alleen op wat moet matchen, maar vooral op wat NIET mag matchen: een Mercedes
 * CLA is geen C-klasse, een BMW iX3 is geen 3-serie.
 */
import { MODELS } from '../src/data/models.js';

const tabel = MODELS.map((m) => [m.slug, m.matchers.merk, m.matchers.model]);

function matchZip(merkRuw, benamingRuw) {
  const merk = (merkRuw || '').toUpperCase();
  const model = (benamingRuw || '').toUpperCase();
  const hit = tabel.find(([, m, re]) => merk.includes(m) && re.test(model));
  return hit ? hit[0] : null;
}

const groen = (s) => `\x1b[32m${s}\x1b[0m`;
const rood = (s) => `\x1b[31m${s}\x1b[0m`;
let fout = 0;

function check(oms, merk, benaming, verwacht) {
  const kreeg = matchZip(merk, benaming);
  const ok = kreeg === verwacht;
  if (!ok) fout++;
  console.log(
    `  ${ok ? groen('OK  ') : rood('MIS ')} ${oms.padEnd(46)} ${
      ok ? '' : rood(`verwacht ${verwacht}, kreeg ${kreeg}`)
    }`
  );
}

console.log('\n=== Moet matchen ===');
check('VW GOLF', 'VOLKSWAGEN', 'GOLF', 'volkswagen-golf');
check('VW POLO', 'VOLKSWAGEN', 'POLO', 'volkswagen-polo');
check('VW TRANSPORTER', 'VOLKSWAGEN', 'TRANSPORTER', 'volkswagen-transporter');
check('VW TIGUAN', 'VOLKSWAGEN', 'TIGUAN', 'volkswagen-tiguan');
check('AUDI A3 SPORTBACK', 'AUDI', 'A3 SPORTBACK', 'audi-a3');
check('AUDI A4 AVANT', 'AUDI', 'A4 AVANT', 'audi-a4');
check('BMW 3ER REIHE', 'BMW', '3ER REIHE', 'bmw-3-serie');
check('BMW 320I', 'BMW', '320I', 'bmw-3-serie');
check('BMW 330E', 'BMW', '330E', 'bmw-3-serie');
check('MB C 180', 'MERCEDES-BENZ', 'C 180', 'mercedes-c-klasse');
check('MB C 180 KOMPRESSOR', 'MERCEDES-BENZ', 'C 180 KOMPRESSOR', 'mercedes-c-klasse');
check('VOLVO V60', 'VOLVO', 'V60', 'volvo-v60');
check('TESLA MODEL 3', 'TESLA', 'MODEL 3', 'tesla-model-3');
check('TESLA Model 3 kleine letters', 'TESLA', 'Model 3', 'tesla-model-3');

console.log('\n=== Mag NIET matchen ===');
check('MB CLA 180', 'MERCEDES-BENZ', 'CLA 180', null);
check('MB GLC 300 E 4MATIC', 'MERCEDES-BENZ', 'GLC 300 E 4MATIC', null);
check('MB CITAN', 'MERCEDES-BENZ', 'CITAN', null);
check('MB SPRINTER', 'MERCEDES-BENZ', 'SPRINTER', null);
check('BMW IX3', 'BMW', 'IX3', null);
check('BMW M3', 'BMW', 'M3', null);
check('BMW X3', 'BMW', 'X3', null);
check('BMW 1ER REIHE', 'BMW', '1ER REIHE', null);
check('BMW X1 SDRIVE20I', 'BMW', 'X1 SDRIVE20I', null);
check('BMW motor R 1200 GS', 'BMW', 'R 1200 GS', null);
check('TESLA MODEL Y', 'TESLA', 'MODEL Y', null);
check('VOLVO XC60', 'VOLVO', 'XC60', null);
check('VOLVO V40', 'VOLVO', 'V40', null);
check('VW CADDY', 'VOLKSWAGEN', 'CADDY', null);
check('VW CRAFTER', 'VOLKSWAGEN', 'CRAFTER', null);
check('VW UP', 'VOLKSWAGEN', 'UP', null);

// --------------------------------------------------- live scan op valse hits
console.log('\n=== Live scan: valse treffers in de top-200 per merk ===');
const merken = ['VOLKSWAGEN', 'AUDI', 'BMW', 'MERCEDES-BENZ', 'VOLVO', 'TESLA'];
for (const merk of merken) {
  const url =
    `https://opendata.rdw.nl/resource/m9d7-ebf2.json?$select=handelsbenaming,count(*) as n` +
    `&$where=merk='${encodeURIComponent(merk)}'&$group=handelsbenaming&$order=n DESC&$limit=200`;
  const rijen = await (await fetch(url)).json();
  const verdacht = [];
  for (const r of rijen) {
    const slug = matchZip(merk, r.handelsbenaming);
    if (!slug) continue;
    // Ruwe controle: hoort de modelnaam echt bij deze slug?
    const kern = slug.split('-').slice(1).join(' ').toUpperCase();
    const b = r.handelsbenaming.toUpperCase();
    const plausibel =
      b.includes(kern.split(' ')[0]) ||
      /^3ER|^3\d{2}/.test(b) ||
      /^C ?\d{3}/.test(b) ||
      /MODEL ?3/.test(b) ||
      /TRANSPORTER|MULTIVAN|CARAVELLE/.test(b);
    if (!plausibel) verdacht.push(`${r.handelsbenaming}  -> ${slug}  (${r.n}x)`);
  }
  console.log(`  ${merk}:`);
  if (verdacht.length) verdacht.forEach((v) => console.log(rood(`      ${v}`)));
  else console.log(groen('      geen verdachte treffers'));
}

console.log(fout ? rood(`\n${fout} testgeval(len) fout.\n`) : groen('\nAlles goed.\n'));
