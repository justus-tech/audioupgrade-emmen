/**
 * Splitst src/data/models.js op in één bestand per merk.
 *
 * Dit script is eenmalig gebruikt en blijft staan als verantwoording: het
 * laat zien dat de splitsing mechanisch is gebeurd en niet met de hand, en
 * dat er onderweg geen tekst is aangeraakt.
 *
 * WAAROM DIT MAG
 * De volgorde van de modellen bepaalt welke pagina wint bij een treffer,
 * dus zomaar herschikken is gevaarlijk. Maar het merk wordt eerst
 * gecontroleerd, en geen van de 28 merknamen zit in een andere (getest).
 * Daardoor kunnen twee modellen van verschillende merken elkaar nooit
 * afvangen en telt alleen de volgorde bínnen een merk. Die blijft hier
 * ongewijzigd.
 *
 * Draaien:  node scripts/splits-modellen.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const bron = fileURLToPath(new URL('../src/data/models.js', import.meta.url));
const doelMap = fileURLToPath(new URL('../src/data/modellen/', import.meta.url));

const tekst = readFileSync(bron, 'utf8');

const start = tekst.indexOf('export const MODELS = [');
const beginArray = tekst.indexOf('[', start) + 1;
const eindArray = tekst.indexOf('\n];', beginArray);
if (start < 0 || eindArray < 0) throw new Error('kan het MODELS-blok niet vinden');

const kop = tekst.slice(0, start);
const body = tekst.slice(beginArray, eindArray);
const staart = tekst.slice(eindArray + 3);

/**
 * Knipt de array-inhoud in losse stukken. Elk stuk begint bij een `{` op
 * inspringniveau 2 en eindigt bij de bijbehorende `},`. Commentaar dat
 * boven een model staat gaat mee met dat model.
 */
function knip(inhoud) {
  const regels = inhoud.split('\n');
  const stukken = [];
  let huidig = [];
  let diepte = 0;

  for (const regel of regels) {
    huidig.push(regel);
    for (const teken of regel.replace(/'(?:[^'\\]|\\.)*'/g, '').replace(/\/\/.*$/, '')) {
      if (teken === '{' || teken === '[') diepte++;
      if (teken === '}' || teken === ']') diepte--;
    }
    if (diepte === 0 && /^\s*\},?\s*$/.test(regel)) {
      stukken.push(huidig.join('\n'));
      huidig = [];
    }
  }
  if (huidig.join('').trim()) stukken.push(huidig.join('\n'));
  return stukken;
}

const stukken = knip(body);

/** merkSlug, hier los omdat models.js straks anders in elkaar zit. */
const slugVan = (naam) =>
  naam.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const perMerk = new Map();
const volgorde = [];

for (const stuk of stukken) {
  const m = stuk.match(/^\s*brand: '((?:[^'\\]|\\.)*)'/m);
  if (!m) {
    if (stuk.trim()) throw new Error('stuk zonder merk:\n' + stuk.slice(0, 200));
    continue;
  }
  const merk = m[1].replace(/\\'/g, "'");
  if (!perMerk.has(merk)) {
    perMerk.set(merk, []);
    volgorde.push(merk);
  }
  perMerk.get(merk).push(stuk.replace(/\n+$/, ''));
}

mkdirSync(doelMap, { recursive: true });

for (const [merk, lijst] of perMerk) {
  const bestand = join(doelMap, `${slugVan(merk)}.js`);
  const inhoud =
    `/**\n` +
    ` * ${merk} — ${lijst.length} model${lijst.length === 1 ? '' : 'len'}.\n` +
    ` *\n` +
    ` * DE VOLGORDE IN DIT BESTAND TELT. De kenteken-check pakt de eerste\n` +
    ` * treffer, dus een specifiek model hoort bóven een algemener model te\n` +
    ` * staan: "Range Rover Sport" vóór "Range Rover".\n` +
    ` *\n` +
    ` * Gebruik geen \\b direct achter een cijfer: tussen de 0 en de I van\n` +
    ` * "320I" ligt geen woordgrens. Gebruik daar (?!\\d).\n` +
    ` */\n\n` +
    `export default [\n${lijst.join('\n')}\n];\n`;
  writeFileSync(bestand, inhoud);
}

// ---- het verzamelbestand ----------------------------------------------
const regels = volgorde.map((merk) => `import ${slugVan(merk).replace(/-/g, '_')} from './${slugVan(merk)}.js';`);
const namen = volgorde.map((merk) => `  ...${slugVan(merk).replace(/-/g, '_')},`);

writeFileSync(
  join(doelMap, 'index.js'),
  `/**\n` +
    ` * Alle modelpagina's, per merk gebundeld.\n` +
    ` *\n` +
    ` * Eén bestand per merk, want 150 modellen in één bestand van ruim 6000\n` +
    ` * regels was niet meer te overzien. Wil je iets aan een BMW veranderen,\n` +
    ` * dan open je bmw.js en niets anders.\n` +
    ` *\n` +
    ` * De volgorde hieronder is de volgorde waarin de merken vroeger in het\n` +
    ` * grote bestand stonden. Tussen merken maakt die volgorde niet uit — het\n` +
    ` * merk wordt eerst gecontroleerd en geen merknaam zit in een andere — maar\n` +
    ` * zo blijft de vergelijking met vroeger eenvoudig.\n` +
    ` */\n` +
    regels.join('\n') +
    `\n\nexport const ALLE_MODELLEN = [\n${namen.join('\n')}\n];\n\nexport default ALLE_MODELLEN;\n`
);

console.log(`${stukken.length} stukken → ${perMerk.size} merkbestanden`);
for (const [merk, lijst] of perMerk) console.log(`  ${slugVan(merk).padEnd(16)} ${lijst.length}`);
console.log('\nKop en staart van models.js zijn NIET aangeraakt; die moet je met de hand omzetten.');
console.log(`kop: ${kop.split('\n').length} regels, staart: ${staart.split('\n').length} regels`);
