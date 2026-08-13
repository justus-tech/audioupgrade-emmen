/**
 * Toetst de matchers uit src/data/autos.js tegen ECHTE RDW-data, met exact
 * dezelfde functie als de browser gebruikt (src/lib/match.js).
 *
 * Draaien:  npm run test:kenteken
 *
 * Draai dit altijd na het wijzigen van een matcher. De test let vooral op wat
 * NIET mag matchen: een Mercedes CLA is geen C-klasse, een BMW iX3 geen X3,
 * en een Range Rover Sport is geen gewone Range Rover.
 */
import { AUTOS } from '../src/data/autos.js';
import { matchAuto, normaliseerKenteken, isGeldigKenteken, netteNaam } from '../src/lib/match.js';

const groen = (s) => `\x1b[32m${s}\x1b[0m`;
const rood = (s) => `\x1b[31m${s}\x1b[0m`;
const grijs = (s) => `\x1b[90m${s}\x1b[0m`;
let fout = 0;

const slugVan = (merk, benaming, soort = 'Personenauto') => {
  const a = matchAuto({ merk, handelsbenaming: benaming, voertuigsoort: soort }, AUTOS);
  return a ? a.slug : null;
};

function check(oms, merk, benaming, verwacht, soort = 'Personenauto') {
  const kreeg = slugVan(merk, benaming, soort);
  const ok = kreeg === verwacht;
  if (!ok) fout++;
  console.log(
    `  ${ok ? groen('OK  ') : rood('MIS ')} ${oms.padEnd(44)}` +
      (ok ? '' : rood(` verwacht ${verwacht}, kreeg ${kreeg}`))
  );
}

console.log('\n=== Kenteken en naamweergave ===');
check.total = 0;
console.log(
  `  ${normaliseerKenteken('12-ab-3c') === '12AB3C' ? groen('OK  ') : rood('MIS ')} kenteken normaliseren`
);
console.log(
  `  ${isGeldigKenteken('12AB3') === false ? groen('OK  ') : rood('MIS ')} 5 tekens is ongeldig`
);
console.log(
  `  ${netteNaam('VOLKSWAGEN', 'GOLF') === 'Volkswagen Golf' ? groen('OK  ') : rood('MIS ')} nette naam: Volkswagen Golf`
);
console.log(
  `  ${netteNaam('BENTLEY', 'BENTLEY CONTINENTAL GT') === 'Bentley Continental GT' ? groen('OK  ') : rood('MIS ')} merk niet dubbel tonen`
);

console.log('\n=== Volumeauto\'s moeten matchen ===');
check('VW POLO', 'VOLKSWAGEN', 'POLO', 'volkswagen-polo');
check('KIA PICANTO', 'KIA', 'PICANTO', 'kia-picanto');
check('FORD FIESTA', 'FORD', 'FIESTA', 'ford-fiesta');
check('TOYOTA AYGO (merk dubbel)', 'TOYOTA', 'TOYOTA AYGO', 'toyota-aygo');
check('RENAULT CLIO', 'RENAULT', 'CLIO', 'renault-clio');
check('OPEL CORSA', 'OPEL', 'CORSA', 'opel-corsa');
check('PEUGEOT 208', 'PEUGEOT', '208', 'peugeot-208');
check('PEUGEOT 2008', 'PEUGEOT', '2008', 'peugeot-2008');
check('FIAT 500 (merk dubbel)', 'FIAT', 'FIAT 500', 'fiat-500');
check('CITROEN C1 (merk dubbel)', 'CITROEN', 'CITROEN C1', 'citroen-c1');
check('SKODA OCTAVIA', 'SKODA', 'OCTAVIA', 'skoda-octavia');
check('VW UP!', 'VOLKSWAGEN', 'UP!', 'volkswagen-up');
check('VW T-ROC', 'VOLKSWAGEN', 'T-ROC', 'volkswagen-t-roc');
check('HYUNDAI I10', 'HYUNDAI', 'I10', 'hyundai-i10');
check('NISSAN QASHQAI (merk dubbel)', 'NISSAN', 'NISSAN QASHQAI', 'nissan-qashqai');
check('VOLVO XC40', 'VOLVO', 'XC40', 'volvo-xc40');

console.log('\n=== Premium moet matchen ===');
check('BMW 3ER REIHE', 'BMW', '3ER REIHE', 'bmw-3-serie');
check('BMW 320I', 'BMW', '320I', 'bmw-3-serie');
check('BMW 118I', 'BMW', '118I', 'bmw-1-serie');
check('BMW 520D', 'BMW', '520D', 'bmw-5-serie');
check('BMW 740I', 'BMW', '740I', 'bmw-7-serie');
check('BMW X1 SDRIVE20I', 'BMW', 'X1 SDRIVE20I', 'bmw-x1');
check('BMW X5 XDRIVE40I', 'BMW', 'X5 XDRIVE40I', 'bmw-x5');
check('MB C 180', 'MERCEDES-BENZ', 'C 180', 'mercedes-c-klasse');
check('MB A 180', 'MERCEDES-BENZ', 'A 180', 'mercedes-a-klasse');
check('MB E 200', 'MERCEDES-BENZ', 'E 200', 'mercedes-e-klasse');
check('MB CLA 180', 'MERCEDES-BENZ', 'CLA 180', 'mercedes-cla');
check('MB GLC 300 E 4MATIC', 'MERCEDES-BENZ', 'GLC 300 E 4MATIC', 'mercedes-glc');
check('AUDI A3 SPORTBACK', 'AUDI', 'A3 SPORTBACK', 'audi-a3');
check('AUDI Q5', 'AUDI', 'Q5', 'audi-q5');
check('PORSCHE 911 CARRERA 4S', 'PORSCHE', '911 CARRERA 4S', 'porsche-911');
check('PORSCHE CAYENNE E-HYBRID', 'PORSCHE', 'CAYENNE E-HYBRID', 'porsche-cayenne');
check('RANGE ROVER SPORT', 'LAND ROVER', 'RANGE ROVER SPORT', 'range-rover-sport');
check('RANGE ROVER EVOQUE', 'LAND ROVER', 'RANGE ROVER EVOQUE', 'range-rover-evoque');
check('RANGE ROVER (kaal)', 'LAND ROVER', 'RANGE ROVER', 'range-rover');
check('DISCOVERY SPORT', 'LAND ROVER', 'DISCOVERY SPORT', 'land-rover-discovery-sport');
check('DISCOVERY (kaal)', 'LAND ROVER', 'DISCOVERY', 'land-rover-discovery');
check('BENTLEY CONTINENTAL GT (dubbel)', 'BENTLEY', 'BENTLEY CONTINENTAL GT', 'bentley-continental-gt');
check('BENTAYGA V8', 'BENTLEY', 'BENTAYGA V8', 'bentley-bentayga');
check('FERRARI 488', 'FERRARI', '488', 'ferrari-488');
check('FERRARI 812 SUPERFAST', 'FERRARI', '812 SUPERFAST', 'ferrari-812-superfast');
check('SAAB 9-3 (merk dubbel)', 'SAAB', 'SAAB 9-3', 'saab-9-3');
check('SAAB 9-3 kaal', 'SAAB', '9-3', 'saab-9-3');
check('SAAB 9-5', 'SAAB', 'SAAB 9-5', 'saab-9-5');
check('SAAB 900 S CV U9', 'SAAB', '900 S CV U9', 'saab-900');
check('SAAB 9000 is geen 900', 'SAAB', '9000 CS', 'saab-9000');
check('TESLA MODEL S', 'TESLA', 'MODEL S', 'tesla-model-s');
check('TESLA Model 3 (kleine letters)', 'TESLA', 'Model 3', 'tesla-model-3');

console.log('\n=== Valkuilen: dit mag JUIST NIET matchen ===');
check('MB CLS 350 is geen C-klasse', 'MERCEDES-BENZ', 'CLS 350', 'mercedes-cls');
check('MB SPRINTER', 'MERCEDES-BENZ', 'SPRINTER', null);
check('MB CITAN', 'MERCEDES-BENZ', 'CITAN', null);
check('BMW IX3 is geen X3', 'BMW', 'IX3', null);
check('BMW IX1 is geen X1', 'BMW', 'IX1 EDRIVE20', null);
check('BMW M3 is geen 3-serie', 'BMW', 'M3', null);
check('BMW motor R 1200 GS', 'BMW', 'R 1200 GS', null);
check('CITROEN C15 is geen C1', 'CITROEN', 'C15', null);
check('FIAT 500L is geen 500', 'FIAT', 'FIAT 500L', null);
check('FORD KUGA is geen Ka', 'FORD', 'KUGA', null);
check('LAND ROVER DEFENDER', 'LAND ROVER', 'DEFENDER', null);
check('PORSCHE TAYCAN', 'PORSCHE', 'TAYCAN', null);
check('TESLA MODEL Y is geen Model 3', 'TESLA', 'MODEL Y', 'tesla-model-y');
check('Vrachtwagen wordt geweigerd', 'VOLVO', 'V60', null, 'Vrachtauto');
console.log(
  `  ${slugVan('VOLVO', 'FH', 'Vrachtauto') === null ? groen('OK  ') : rood('MIS ')} Volvo FH vrachtwagen geweigerd`
);

// ---------------------------------------------------- live scan RDW
console.log('\n=== Live scan: wat matcht er per merk in de top-150? ===');
const merken = [
  'VOLKSWAGEN', 'AUDI', 'BMW', 'MERCEDES-BENZ', 'VOLVO', 'TESLA',
  'PORSCHE', 'LAND ROVER', 'BENTLEY', 'FERRARI',
  'KIA', 'FORD', 'TOYOTA', 'RENAULT', 'OPEL', 'PEUGEOT', 'CITROEN', 'FIAT',
];

let totaalGedekt = 0;
let totaalGezien = 0;

for (const merk of merken) {
  let rijen;
  try {
    rijen = await (
      await fetch(
        `https://opendata.rdw.nl/resource/m9d7-ebf2.json?$select=handelsbenaming,count(*) as n` +
          `&$where=merk='${encodeURIComponent(merk)}' AND voertuigsoort='Personenauto'` +
          `&$group=handelsbenaming&$order=n DESC&$limit=150`
      )
    ).json();
  } catch (err) {
    console.log(rood(`  ${merk}: niet bereikbaar`));
    continue;
  }

  let gedekt = 0, gezien = 0;
  const treffers = new Map();
  for (const r of rijen) {
    const n = Number(r.n) || 0;
    gezien += n;
    const a = matchAuto({ merk, handelsbenaming: r.handelsbenaming, voertuigsoort: 'Personenauto' }, AUTOS);
    if (a) {
      gedekt += n;
      if (!treffers.has(a.slug)) treffers.set(a.slug, []);
      const l = treffers.get(a.slug);
      if (l.length < 3) l.push(r.handelsbenaming);
    }
  }
  totaalGedekt += gedekt;
  totaalGezien += gezien;
  const pct = gezien ? ((gedekt / gezien) * 100).toFixed(0) : '0';
  console.log(
    `  ${merk.padEnd(15)} ${String(pct).padStart(3)}% gedekt  ${grijs(
      `${gedekt.toLocaleString('nl-NL')} van ${gezien.toLocaleString('nl-NL')} · ${treffers.size} modellen`
    )}`
  );
}

const totPct = totaalGezien ? ((totaalGedekt / totaalGezien) * 100).toFixed(1) : '0';
console.log(
  `\n  ${groen('TOTAAL')} ${totPct}% van de auto's van deze merken valt op een herkend model` +
    grijs(`  (${totaalGedekt.toLocaleString('nl-NL')} van ${totaalGezien.toLocaleString('nl-NL')})`)
);

console.log(fout ? rood(`\n${fout} test(s) mislukt.\n`) : groen('\nAlle tests geslaagd.\n'));
process.exit(fout ? 1 : 0);
