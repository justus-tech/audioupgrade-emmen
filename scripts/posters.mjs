/**
 * MAAKT DE POSTERS VOOR AAN DE MUUR IN HET KANTOOR.
 *
 * Draaien met:  node scripts/posters.mjs
 *
 * Eén poster per audiopakket, op A1 (594 bij 841 mm), staand. Ze komen naast
 * elkaar te hangen, dus ze zijn precies hetzelfde opgebouwd: alleen de auto
 * erop verschilt, en dat is nou juist het punt. Iemand die van links naar
 * rechts loopt ziet in één oogopslag hoeveel er per trede bij komt.
 *
 * ==========================================================================
 * ALLES KOMT UIT DE SITE
 * ==========================================================================
 * Prijzen en kenmerken uit src/data/site.js, de tekening uit
 * src/data/schets.js, de kleuren uit src/data/brand.js en de lettertypen uit
 * public/fonts. Verandert er een prijs op de site, dan draai je dit script
 * opnieuw en klopt de poster weer. Niets hieronder is overgetypt.
 *
 * Uitvoer: vier PDF's op ware grootte om te laten drukken, en vier PNG's om
 * even snel te bekijken.
 */
import { chromium } from 'playwright';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { AUDIOPAKKETTEN, pakkettenVan, SITE } from '../src/data/site.js';
import { AUTO, schetsVan } from '../src/data/schets.js';
import { BRAND } from '../src/data/brand.js';

const UIT = process.argv[2] || './posters';
await mkdir(UIT, { recursive: true });

/* ------------------------------------------------------------ maten --- */
const BREED = 594;   // A1 staand, in millimeters
const HOOG = 841;
const RAND = 34;     // witruimte rondom

/* De lettertypen als data-uri, want de pagina draait van schijf en kan
   nergens iets ophalen. Dezelfde bestanden als op de site. */
const naarUri = async (pad) =>
  `data:font/woff2;base64,${(await readFile(pad)).toString('base64')}`;
const oswald = await naarUri('./public/fonts/oswald-latin.woff2');
const inter = await naarUri('./public/fonts/inter-latin.woff2');
const logo = (await readFile('./src/assets/logo.svg', 'utf8'))
  .replace(/<svg /, '<svg style="height:13mm;width:auto;fill:currentColor" ');

/* ---------------------------------------------------------- tekening --- */
/**
 * De auto met de onderdelen van dit pakket, plus bijschriften in de kantlijn.
 *
 * De nummers lopen van voor naar achter door de auto. Elk nummer krijgt links
 * of rechts een bijschrift, met een lijntje ernaartoe — zoals op een
 * technische tekening. Dat is meteen de reden dat dit een poster is en geen
 * lijstje: je ziet wáár het zit.
 */
function tekening(slug) {
  const delen = schetsVan(slug);
  const genummerd = delen.map((d, i) => ({ ...d, nr: i + 1 }));

  /**
   * Links of rechts van de auto, op grond van waar het onderdeel zit — en
   * daarna rechtgetrokken.
   *
   * Bij de Akoestische Basis zitten alle drie de onderdelen links in de auto.
   * Zonder deze correctie staat die hele poster scheef, met een lege
   * rechterhelft. De onderdelen die het dichtst bij het midden liggen
   * verhuizen dan naar de andere kant.
   */
  const links = genummerd.filter((d) => d.x < 220);
  const rechts = genummerd.filter((d) => d.x >= 220);
  while (links.length - rechts.length > 1) {
    /* Bij voorkeur iets dat ook een rechterkant heeft (tweeters, speakers):
       dat verhuist naar de overkant zonder dat de lijn de auto doorkruist. */
    links.sort((a, b) => (b.spiegel ? 1 : 0) - (a.spiegel ? 1 : 0) || b.x - a.x);
    rechts.push(links.shift());
  }
  while (rechts.length - links.length > 1) {
    rechts.sort((a, b) => a.x - b.x);
    links.push(rechts.shift());
  }

  /* De bijschriften netjes over de hoogte verdelen, zodat ze elkaar nooit
     overlappen ook al zitten twee onderdelen vlak bij elkaar. */
  const verdeel = (lijst) => {
    const top = 60;
    const bodem = AUTO.hoogte - 40;
    const stap = lijst.length > 1 ? (bodem - top) / (lijst.length - 1) : 0;
    return lijst
      .slice()
      .sort((a, b) => a.y - b.y)
      .map((d, i) => ({ ...d, labelY: lijst.length > 1 ? top + i * stap : (top + bodem) / 2 }));
  };

  /* De kantlijn waarin de bijschriften staan. Deze maten bepalen samen de
     verhouding van de hele tekening, en dus hoe groot de auto op de poster
     wordt afgedrukt: hoe breder de kantlijn, hoe kleiner de auto. */
  const KOLOM = 250;   // ruimte voor de tekst zelf
  const KIER = 45;     // tussen de auto en de tekst
  /* Zit een onderdeel links én rechts in de auto (tweeters, speakers), dan
     zetten we het nummer aan de kant waar het bijschrift hangt. Anders loopt
     de aanwijslijn dwars door de cabine heen. */
  const metAnker = (d, kant) => {
    const gespiegeld = kant === 'rechts' && d.spiegel;
    return { ...d, kant, ankerX: gespiegeld ? d.spiegel : d.x, stipX: gespiegeld ? d.x : d.spiegel };
  };
  const linksLabels = verdeel(links).map((d) => ({ ...metAnker(d, 'links'), labelX: -KIER }));
  const rechtsLabels = verdeel(rechts).map((d) => ({ ...metAnker(d, 'rechts'), labelX: AUTO.breedte + KIER }));
  const labels = [...linksLabels, ...rechtsLabels];

  const vlakken = genummerd
    .filter((d) => d.vlak)
    .map((d) => `<path d="${d.vlak}" class="zone"/>${d.spiegelVlak ? `<path d="${d.spiegelVlak}" class="zone"/>` : ''}`)
    .join('');

  const spiegels = labels
    .filter((d) => d.stipX)
    .map((d) => `<circle cx="${d.stipX}" cy="${d.y}" r="9" class="bol"/>`)
    .join('');

  const lijnen = labels
    .map((d) => {
      const uitX = d.kant === 'links' ? d.labelX + 12 : d.labelX - 12;
      const knik = d.kant === 'links' ? d.ankerX - 34 : d.ankerX + 34;
      return `<path d="M ${d.ankerX} ${d.y} L ${knik} ${d.y} L ${knik} ${d.labelY} L ${uitX} ${d.labelY}" class="aanwijs"/>`;
    })
    .join('');

  const punten = labels
    .map(
      (d) => `<g class="punt">
        <circle cx="${d.ankerX}" cy="${d.y}" r="19" class="halo"/>
        <circle cx="${d.ankerX}" cy="${d.y}" r="15" class="bol aan"/>
        <text x="${d.ankerX}" y="${d.y}" class="nr" text-anchor="middle" dominant-baseline="central">${d.nr}</text>
      </g>`
    )
    .join('');

  /* De plek is soms een hele zin ("Onder de stoel of in de reservewielbak").
     Die breken we over twee regels af, anders loopt hij de poster uit. */
  const afbreken = (tekst, max = 26) => {
    const regels = [''];
    for (const woord of String(tekst).split(' ')) {
      const laatste = regels[regels.length - 1];
      const kandidaat = laatste ? `${laatste} ${woord}` : woord;
      if (kandidaat.length > max && laatste) regels.push(woord);
      else regels[regels.length - 1] = kandidaat;
    }
    return regels.slice(0, 2);
  };

  const bijschriften = labels
    .map((d) => {
      const anker = d.kant === 'links' ? 'end' : 'start';
      const x = d.labelX;
      const regels = afbreken(d.plek)
        .map((r, i) => `<text x="${x}" y="${d.labelY + 24 + i * 22}" text-anchor="${anker}" class="bij-plek">${r}</text>`)
        .join('');
      return `<g class="bijschrift">
        <text x="${x}" y="${d.labelY - 4}" text-anchor="${anker}" class="bij-naam">${d.nr}. ${d.naam}</text>
        ${regels}
      </g>`;
    })
    .join('');

  /* De viewBox: de auto met aan weerszijden precies de kantlijn erbij. Zo
     blijft de auto zo groot mogelijk en valt er niets buiten beeld. */
  const marge = KIER + KOLOM;
  return `<svg class="schets" viewBox="${-marge} 0 ${AUTO.breedte + marge * 2} ${AUTO.hoogte}">
    <!-- Het ruitjespapier eronder. Zonder dit is het een tekening op een zwart
         vlak; met dit is het een werktekening, en dat is het ook. -->
    <defs>
      <pattern id="ruit" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="${BRAND.accent}" stroke-opacity=".1" stroke-width="1"/>
      </pattern>
    </defs>
    <rect x="${-marge}" y="0" width="${AUTO.breedte + marge * 2}" height="${AUTO.hoogte}" fill="url(#ruit)"/>
    <g class="carrosserie">
      <path d="${AUTO.omtrek}"/>
      ${AUTO.ruiten.map((d) => `<path d="${d}" class="ruit"/>`).join('')}
      ${AUTO.dun.map((d) => `<path d="${d}" class="dun"/>`).join('')}
      ${AUTO.stoelen.map((s) => `<rect x="${s.x}" y="${s.y}" width="${s.breedte}" height="${s.hoogte}" rx="${s.rond}" class="stoel"/>`).join('')}
    </g>
    ${vlakken}${spiegels}${lijnen}${punten}${bijschriften}
  </svg>`;
}

/* ------------------------------------------------------------ poster --- */
function poster(pkg, index, totaal) {
  const balkjes = pkg.scores.length
    ? `<div class="balkjes">${pkg.scores
        .map(
          (s) => `<div class="balk">
            <span>${s.label}</span>
            <i>${[1, 2, 3, 4, 5].map((n) => `<b class="${n <= s.waarde ? 'aan' : ''}"></b>`).join('')}</i>
          </div>`
        )
        .join('')}</div>`
    : `<div class="balkjes">${(pkg.uitgelicht || [])
        .map((u) => `<div class="balk tekst"><span>${u.label}</span><em>${u.waarde}</em></div>`)
        .join('')}</div>`;

  return `<section class="poster">
    <div class="rand"></div>
    <header>
      <div class="merk">${logo}<span>Audio Upgrade <b>Emmen</b></span></div>
      <div class="blad">${String(index + 1).padStart(2, '0')} <i>/ ${String(totaal).padStart(2, '0')}</i></div>
    </header>

    <div class="titel">
      ${pkg.populair ? '<span class="vlag">Onze aanrader</span>' : ''}
      ${pkg.vlag ? `<span class="vlag open">${pkg.vlag}</span>` : ''}
      <h1>${pkg.name}</h1>
      <p class="tagline">${pkg.tagline}</p>
      <p class="prijs">${pkg.price}<small>${pkg.priceNote}</small></p>
      <p class="kort">${pkg.short}</p>
    </div>

    ${tekening(pkg.slug)}
    <p class="onderschrift">Bovenaanzicht · plaatsing verschilt per auto</p>

    <div class="onder">
      <div class="kenmerken">
        <h2>Wat er in zit</h2>
        <ul>${pkg.features.map((f) => `<li>${f}</li>`).join('')}</ul>
      </div>
      <div class="meta">
        ${balkjes}
        <p class="duur">${pkg.duur}</p>
      </div>
    </div>

    <footer>
      <span>Levenslange garantie op ons inbouwwerk</span>
      <span>${SITE.url.replace('https://', '')} · ${SITE.phoneDisplay}</span>
    </footer>
  </section>`;
}

const stijl = `
  @font-face { font-family: 'Oswald'; src: url(${oswald}) format('woff2'); font-weight: 400 600; }
  @font-face { font-family: 'Inter'; src: url(${inter}) format('woff2'); font-weight: 400 600; }
  @page { size: ${BREED}mm ${HOOG}mm; margin: 0 }
  * { box-sizing: border-box; margin: 0; padding: 0 }
  body { font-family: 'Inter', system-ui, sans-serif; }

  .poster {
    position: relative; width: ${BREED}mm; height: ${HOOG}mm;
    padding: ${RAND}mm;
    background:
      radial-gradient(ellipse at 50% 34%, rgba(255,94,31,.10) 0%, rgba(255,94,31,0) 62%),
      ${BRAND.bg};
    color: ${BRAND.text};
    display: flex; flex-direction: column;
    overflow: hidden;
  }
  /* De dunne kaderlijn met hoekjes: de poster leest als een werktekening. */
  .rand {
    position: absolute; inset: ${RAND - 12}mm;
    border: .35mm solid rgba(255,94,31,.35);
  }
  .rand::before, .rand::after {
    content: ''; position: absolute; width: 8mm; height: 8mm;
    border: .8mm solid ${BRAND.accent};
  }
  .rand::before { top: -.35mm; left: -.35mm; border-right: 0; border-bottom: 0 }
  .rand::after { bottom: -.35mm; right: -.35mm; border-left: 0; border-top: 0 }

  header { display: flex; justify-content: space-between; align-items: center; }
  .merk { display: flex; align-items: center; gap: 5mm; color: ${BRAND.text} }
  .merk span {
    font-family: 'Oswald'; font-weight: 600; text-transform: uppercase;
    letter-spacing: .2em; font-size: 6mm;
  }
  .merk b { color: ${BRAND.accent}; font-weight: 600 }
  .blad {
    font-family: 'Oswald'; font-size: 7mm; letter-spacing: .1em;
    color: ${BRAND.text};
  }
  .blad i { color: ${BRAND.textDim}; font-style: normal; font-size: 5mm }

  .titel { margin-top: 12mm; }
  .vlag {
    display: inline-block;
    font-family: 'Oswald'; text-transform: uppercase; letter-spacing: .18em;
    font-size: 3.6mm; background: ${BRAND.accent}; color: ${BRAND.accentInk};
    padding: 1.6mm 4mm; margin-bottom: 4mm;
  }
  .vlag.open { background: transparent; color: ${BRAND.accent}; box-shadow: inset 0 0 0 .4mm ${BRAND.accent} }
  h1 {
    font-family: 'Oswald'; font-weight: 600; text-transform: uppercase;
    font-size: 19mm; line-height: 1.02; letter-spacing: .01em;
  }
  .tagline {
    font-family: 'Oswald'; text-transform: uppercase; letter-spacing: .14em;
    font-size: 5mm; color: ${BRAND.accent}; margin-top: 3mm;
  }
  .prijs {
    font-family: 'Oswald'; font-size: 13mm; margin-top: 6mm; line-height: 1.1;
  }
  .prijs small {
    display: block; font-size: 3.6mm; letter-spacing: .12em;
    color: ${BRAND.textDim}; margin-top: 1.5mm; text-transform: uppercase;
  }

  .kort {
    max-width: 120mm; margin-top: 6mm;
    font-size: 4.6mm; line-height: 1.45; color: ${BRAND.textDim};
  }

  /* ---- de tekening ---- */
  .schets { flex: 1; width: 100%; margin: 4mm 0 0; min-height: 0 }
  .onderschrift {
    text-align: center; margin-bottom: 4mm;
    font-family: 'Oswald'; text-transform: uppercase; letter-spacing: .2em;
    font-size: 3.2mm; color: ${BRAND.textDim};
  }
  .carrosserie path { fill: none; stroke: ${BRAND.tekenLijn}; stroke-width: 2.5 }
  .carrosserie .ruit { fill: rgba(245,245,245,.04) }
  .carrosserie .dun { stroke-width: 1.5; opacity: .7 }
  .stoel { fill: rgba(135,135,135,.14); stroke: ${BRAND.tekenLijn}; stroke-width: 1.5 }
  .zone { fill: rgba(255,94,31,.30); stroke: ${BRAND.accent}; stroke-width: 1.5 }
  .aanwijs { fill: none; stroke: rgba(255,94,31,.5); stroke-width: 1.4 }
  .halo { fill: rgba(255,94,31,.18) }
  .bol { fill: rgba(135,135,135,.4) }
  .bol.aan { fill: ${BRAND.accent} }
  .nr {
    font-family: 'Oswald'; font-weight: 600; font-size: 17px;
    fill: ${BRAND.accentInk};
  }
  .bij-naam {
    font-family: 'Oswald'; font-weight: 600; text-transform: uppercase;
    letter-spacing: .08em; font-size: 16px; fill: ${BRAND.text};
  }
  .bij-plek { font-family: 'Inter'; font-size: 14px; fill: ${BRAND.textDim} }

  /* ---- onderste band ---- */
  .onder {
    display: grid; grid-template-columns: 1.45fr 1fr; gap: 12mm;
    border-top: .4mm solid rgba(135,135,135,.3);
    padding-top: 7mm; margin-top: 2mm;
  }
  h2 {
    font-family: 'Oswald'; text-transform: uppercase; letter-spacing: .18em;
    font-size: 4mm; color: ${BRAND.textDim}; font-weight: 500; margin-bottom: 4mm;
  }
  .kenmerken ul { list-style: none }
  .kenmerken li {
    position: relative; padding-left: 7mm; margin-bottom: 3.4mm;
    font-size: 4.2mm; line-height: 1.35; color: ${BRAND.text};
  }
  .kenmerken li::before {
    content: ''; position: absolute; left: 0; top: 2.4mm;
    width: 4mm; height: .6mm; background: ${BRAND.accent};
  }
  .balk { display: flex; align-items: center; gap: 4mm; margin-bottom: 3.5mm }
  .balk span {
    flex: none; width: 26mm;
    font-family: 'Oswald'; text-transform: uppercase; letter-spacing: .14em;
    font-size: 3.4mm; color: ${BRAND.textDim};
  }
  .balk i { display: flex; gap: 1.6mm; flex: 1 }
  .balk b { flex: 1; height: 2.2mm; border-radius: 1mm; background: rgba(135,135,135,.3) }
  .balk b.aan { background: ${BRAND.accent} }
  .balk.tekst { align-items: flex-start }
  .balk em { font-style: normal; font-size: 3.8mm; line-height: 1.3; color: ${BRAND.text} }
  .duur {
    margin-top: 6mm; padding-top: 4mm;
    border-top: .3mm solid rgba(135,135,135,.25);
    font-size: 3.8mm; color: ${BRAND.textDim};
  }

  footer {
    display: flex; justify-content: space-between;
    margin-top: 7mm;
    font-family: 'Oswald'; text-transform: uppercase; letter-spacing: .14em;
    font-size: 3.4mm; color: ${BRAND.textDim};
  }
`;

/* ------------------------------------------------------------ maken --- */
const pakketten = pakkettenVan(AUDIOPAKKETTEN);
const browser = await chromium.launch();

for (const [i, pkg] of pakketten.entries()) {
  const html = `<!doctype html><html lang="nl"><head><meta charset="utf-8">
    <style>${stijl}</style></head><body>${poster(pkg, i, pakketten.length)}</body></html>`;

  const naam = `${String(i + 1).padStart(2, '0')}-${pkg.slug}`;
  const pagina = await browser.newPage({ viewport: { width: 1200, height: 1700 } });
  await pagina.setContent(html, { waitUntil: 'networkidle' });
  await pagina.pdf({ path: `${UIT}/${naam}.pdf`, width: `${BREED}mm`, height: `${HOOG}mm`, printBackground: true });
  await pagina.locator('.poster').screenshot({ path: `${UIT}/${naam}.png` });
  await pagina.close();
  console.log(`${naam}: ${pkg.name}`);
}

await browser.close();
console.log(`\nVier posters van ${BREED} bij ${HOOG} mm staan in ${UIT}`);
