/**
 * MAAKT HET FAVICON — het logootje in het tabblad, en het rondje naast de
 * naam in de zoekresultaten van Google.
 *
 * Draaien met:  node scripts/favicon.mjs
 *
 * WAT ER MIS WAS
 * Er stond alleen een SVG: wit logo op een donker vlak, met het logo klein in
 * het midden. Google snijdt een favicon rond af en toont hem op 28 pixels.
 * Wat daar overbleef was een donker rondje waar je niets in herkende. En
 * /favicon.ico gaf een 404 — dat is precies het adres waar Google en veel
 * andere diensten als eerste gaan kijken.
 *
 * WAT HET NU IS
 * Zwart AUE op wit, zo groot als past zonder dat Google er een stuk van
 * afsnijdt, in alle formaten die ertoe doen:
 *
 *   favicon.svg          het tabblad in een moderne browser
 *   favicon.ico          16, 32 en 48 px in één bestand — voor Google en
 *                        alles wat op het vaste adres /favicon.ico kijkt
 *   icon-192.png         een scherpe PNG voor Google; die vraagt een
 *                        veelvoud van 48 pixels, en 192 is 4 × 48
 *   apple-touch-icon.png 180 px, als iemand de site op zijn beginscherm zet.
 *                        Hier stond eerst het deelplaatje van 1200 × 630,
 *                        en dat werd door de iPhone platgedrukt tot een
 *                        vierkant.
 *
 * Alles komt uit src/assets/logo.svg. Verandert het logo, draai dit dan
 * opnieuw.
 */
import sharp from 'sharp';
import { readFile, writeFile } from 'fs/promises';

const INKT = '#121212';   // het zwart van de site zelf, zie brand.js
const PAPIER = '#ffffff';

/* De werkelijke inhoud van logo.svg, op pixelniveau gemeten — zie de uitleg
   in src/components/Logo.astro. De SVG zelf is een vierkant van 1500 met veel
   lege ruimte eromheen. */
const LOGO = { x: 110, y: 419, b: 1251, h: 505 };

/**
 * HOE GROOT HET LOGO IN HET VIERKANT STAAT
 *
 * Google knipt het favicon uit als een cirkel. Een breed woordmerk als AUE
 * past daar alleen in als de hoeken van het logo binnen de cirkel blijven.
 * Op 84% van de breedte liggen die hoeken op ruim 90% van de straal: zo groot
 * als het kan, met nog een randje lucht.
 */
const BREEDTE = 0.84;
const VAK = 1500;

const bron = await readFile('./src/assets/logo.svg', 'utf8');
const binnen = bron
  .replace(/^[\s\S]*?<svg[^>]*>/, '')
  .replace(/<\/svg>\s*$/, '')
  .replaceAll('currentColor', INKT);

const schaal = (VAK * BREEDTE) / LOGO.b;
const midX = LOGO.x + LOGO.b / 2;
const midY = LOGO.y + LOGO.h / 2;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VAK} ${VAK}">
<rect width="${VAK}" height="${VAK}" fill="${PAPIER}"/>
<g transform="translate(${VAK / 2} ${VAK / 2}) scale(${schaal.toFixed(5)}) translate(${-midX} ${-midY})">${binnen}</g>
</svg>
`;

await writeFile('./public/favicon.svg', svg);

/* Van de SVG naar een PNG van n bij n. Eerst groot getekend en dan verkleind:
   dat geeft op 16 pixels een scherper resultaat dan direct klein tekenen. */
const png = (n) =>
  sharp(Buffer.from(svg), { density: 300 })
    .resize(n, n, { kernel: 'lanczos3' })
    .flatten({ background: PAPIER })
    .png({ compressionLevel: 9 })
    .toBuffer();

await writeFile('./public/icon-192.png', await png(192));
await writeFile('./public/apple-touch-icon.png', await png(180));

/**
 * favicon.ico met drie maten erin.
 *
 * Een .ico is een doosje met plaatjes. Sinds Windows Vista mogen dat gewone
 * PNG's zijn, en elke browser leest dat. Het doosje is zes bytes kop, zestien
 * bytes per plaatje met maat en plek, en dan de plaatjes zelf.
 */
const maten = [16, 32, 48];
const plaatjes = await Promise.all(maten.map(png));

const kop = Buffer.alloc(6);
kop.writeUInt16LE(0, 0);             // gereserveerd
kop.writeUInt16LE(1, 2);             // 1 = icoon
kop.writeUInt16LE(maten.length, 4);  // aantal plaatjes

let plek = 6 + 16 * maten.length;
const inhoud = maten.map((n, i) => {
  const r = Buffer.alloc(16);
  r.writeUInt8(n, 0);                     // breedte
  r.writeUInt8(n, 1);                     // hoogte
  r.writeUInt8(0, 2);                     // geen kleurenpalet
  r.writeUInt8(0, 3);                     // gereserveerd
  r.writeUInt16LE(1, 4);                  // kleurvlakken
  r.writeUInt16LE(32, 6);                 // bits per pixel
  r.writeUInt32LE(plaatjes[i].length, 8); // grootte
  r.writeUInt32LE(plek, 12);              // waar het plaatje begint
  plek += plaatjes[i].length;
  return r;
});

await writeFile('./public/favicon.ico', Buffer.concat([kop, ...inhoud, ...plaatjes]));

console.log('favicon.svg, favicon.ico (16/32/48), icon-192.png en apple-touch-icon.png staan in public/');
