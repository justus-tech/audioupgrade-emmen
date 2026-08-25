/**
 * MAAKT public/og-image.png — de afbeelding die je ziet als iemand de site
 * deelt via WhatsApp, Facebook of LinkedIn.
 *
 * Draaien met:  node scripts/deelplaatje.mjs
 *
 * WAAROM DIT ZO BELANGRIJK IS
 * Justus stuurt alles via WhatsApp. Deze afbeelding is daarmee waarschijnlijk
 * het meest bekeken beeld van het hele bedrijf: elke keer dat hij of een klant
 * de link deelt, is dit wat er in beeld komt voordat iemand iets gelezen heeft.
 *
 * WAT ER MIS WAS
 * Er stond een vierkant logo. Twee problemen:
 *   1. WhatsApp en Facebook rekenen op 1200 bij 630. Een vierkant beeld wordt
 *      bijgesneden, dus er ging boven en onder een stuk van het logo af.
 *   2. Er stond alleen "AUE" op. Wie dat krijgt toegestuurd, weet nog steeds
 *      niet wat voor bedrijf het is.
 *
 * HOE HET GEMAAKT WORDT
 * Als gewone HTML met de lettertypen en kleuren van de site zelf, en dan
 * gefotografeerd. Zo kan het beeld nooit uit de pas lopen met de huisstijl:
 * verandert het oranje in brand.js, dan verandert dit mee zodra je dit script
 * opnieuw draait.
 */
import { chromium } from 'playwright';
import { readFile, writeFile } from 'fs/promises';
import { BRAND } from '../src/data/brand.js';
import { SITE } from '../src/data/site.js';

const BREEDTE = 1200;
const HOOGTE = 630;

/* De lettertypen als data-uri erin, want de pagina draait van schijf en kan
   dan nergens iets ophalen. */
const naarUri = async (pad) =>
  `data:font/woff2;base64,${(await readFile(pad)).toString('base64')}`;

const oswald = await naarUri('./public/fonts/oswald-latin.woff2');
const inter = await naarUri('./public/fonts/inter-latin.woff2');
const logo = (await readFile('./src/assets/logo.svg', 'utf8')).replace(
  /<svg /,
  '<svg style="height:74px;width:auto;fill:currentColor" '
);

/* Dezelfde golf als op de homepage, maar stil: één moment eruit gelicht. */
const PUNTEN = 150;
const bel = (u, mid, br) => Math.exp(-(((u - mid) / br) ** 2));
const curve = (u) =>
  0.2 + 4.2 * bel(u, 0.118, 0.15) + 0.9 * bel(u, 0.69, 0.15) - 2.4 * bel(u, 1.02, 0.13);

const punten = [];
for (let i = 0; i < PUNTEN; i++) {
  const u = i / (PUNTEN - 1);
  punten.push([(u * 1200).toFixed(1), (((7 - curve(u)) / 18) * 112).toFixed(1)]);
}
const pad = punten.map(([x, y], i) => (i ? `L${x} ${y}` : `M${x} ${y}`)).join(' ');

const html = `<!doctype html>
<meta charset="utf-8">
<style>
  @font-face { font-family: Oswald; src: url('${oswald}') format('woff2'); font-weight: 400 600; }
  @font-face { font-family: Inter;  src: url('${inter}')  format('woff2'); font-weight: 400 500; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: ${BREEDTE}px; height: ${HOOGTE}px;
    background: ${BRAND.bg};
    color: ${BRAND.text};
    font-family: Inter, sans-serif;
    position: relative;
    overflow: hidden;
    display: flex; flex-direction: column; justify-content: center;
    /* Onderin ruimte vrijhouden: daar ligt de curve, en die mag niet door de
       kleine hoofdletters van de onderste regel heen lopen. */
    padding: 0 76px 74px;
  }
  .merk {
    display: flex; align-items: center; gap: 20px;
    color: ${BRAND.text};
  }
  .merk span {
    font-family: Oswald, sans-serif; font-weight: 500;
    text-transform: uppercase; letter-spacing: .2em; font-size: 27px;
  }
  .merk em { font-style: normal; color: ${BRAND.accent}; }
  h1 {
    font-family: Oswald, sans-serif; font-weight: 600;
    text-transform: uppercase; letter-spacing: .045em;
    font-size: 76px; line-height: 1.04;
    margin-top: 46px;
  }
  h1 b { color: ${BRAND.accent}; font-weight: 600; }
  p {
    margin-top: 26px; font-size: 25px; color: ${BRAND.textDim};
    max-width: 30ch; line-height: 1.5;
  }
  .streep {
    display: flex; gap: 30px; margin-top: 40px;
    font-family: Oswald, sans-serif; text-transform: uppercase;
    letter-spacing: .17em; font-size: 15px; color: ${BRAND.textDim};
  }
  .streep i { font-style: normal; color: ${BRAND.accent}; margin-right: 11px; }
  svg.golf { position: absolute; left: 0; right: 0; bottom: 0; width: 100%; height: 112px; }
</style>

<div class="merk">${logo}<span>Audio Upgrade <em>Emmen</em></span></div>

<h1>Groots geluid.<br><b>Onzichtbaar ingebouwd.</b></h1>
<p>Premium car audio en draadloze CarPlay, weggewerkt achter je originele panelen.</p>

<div class="streep">
  <span><i>—</i>Emmen &amp; Drenthe</span>
  <span><i>—</i>All-in prijzen</span>
  <span><i>—</i>Levenslange garantie</span>
</div>

<svg class="golf" viewBox="0 0 1200 112" preserveAspectRatio="none">
  <path d="${pad} L1200 112 L0 112 Z" fill="${BRAND.accent}" opacity=".13"/>
  <path d="${pad}" fill="none" stroke="${BRAND.accent}" stroke-width="3"/>
</svg>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: BREEDTE, height: HOOGTE } });
await page.setContent(html, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: './public/og-image.png' });
await browser.close();

const { size } = await import('fs').then((m) => m.promises.stat('./public/og-image.png'));
console.log(`public/og-image.png — ${BREEDTE}x${HOOGTE}, ${(size / 1024).toFixed(0)} kB`);
console.log(`Controleer hem daarna op ${SITE.url} met de deel-voorbeeldweergave van WhatsApp.`);
