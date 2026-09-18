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
import { AUTO, schetsVan, HULPLIJNEN, MATEN, METER, inMeters } from '../src/data/schets.js';
import { BRAND } from '../src/data/brand.js';

const nu = new Date();
const UITGAVE = `${nu.getFullYear()}.${String(nu.getMonth() + 1).padStart(2, '0')}`;

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
    const MAX = 132; // grootste gat tussen twee bijschriften
    if (lijst.length < 2) {
      return lijst.map((d) => ({ ...d, labelY: (top + bodem) / 2 }));
    }
    const op = lijst.slice().sort((a, b) => a.y - b.y);
    const stap = Math.min((bodem - top) / (op.length - 1), MAX);
    const hoog = stap * (op.length - 1);
    /* De hele stapel hangt om het zwaartepunt van de punten zelf, zodat de
       bijschriften in de buurt blijven van waar ze naar wijzen. */
    const midden = op.reduce((som, d) => som + d.y, 0) / op.length;
    const begin = Math.min(Math.max(midden - hoog / 2, top), bodem - hoog);
    return op.map((d, i) => ({ ...d, labelY: begin + i * stap }));
  };

  /* De kantlijn waarin de bijschriften staan. Deze maten bepalen samen de
     verhouding van de hele tekening, en dus hoe groot de auto op de poster
     wordt afgedrukt: hoe breder de kantlijn, hoe kleiner de auto. */
  const KOLOM = 178;   // ruimte voor de tekst zelf
  const KIER = 32;     // tussen de auto en de tekst
  /* Links en rechts van de auto zit lege ruimte in het tekenvlak; daar komen
     alleen de spiegels. Die lucht snijden we eraf, want elke millimeter die
     niet aan niets opgaat komt bij de auto zelf terecht. */
  const KADER = { x: 68, breedte: 304 };
  /* Zit een onderdeel links én rechts in de auto (tweeters, speakers), dan
     zetten we het nummer aan de kant waar het bijschrift hangt. Anders loopt
     de aanwijslijn dwars door de cabine heen. */
  const metAnker = (d, kant) => {
    const gespiegeld = kant === 'rechts' && d.spiegel;
    return { ...d, kant, ankerX: gespiegeld ? d.spiegel : d.x, stipX: gespiegeld ? d.x : d.spiegel };
  };
  const linksLabels = verdeel(links).map((d) => ({ ...metAnker(d, 'links'), labelX: KADER.x - KIER }));
  const rechtsLabels = verdeel(rechts).map((d) => ({ ...metAnker(d, 'rechts'), labelX: KADER.x + KADER.breedte + KIER }));
  const labels = [...linksLabels, ...rechtsLabels];

  const vlakken = genummerd
    .filter((d) => d.vlakken)
    .flatMap((d) => d.vlakken.map((vlak) => `<path d="${vlak}" class="zone" fill="url(#arcering${d.zacht ? '-zacht' : ''})"/>`))
    .join('');

  const spiegels = labels
    .filter((d) => d.stipX)
    .map((d) => `<circle cx="${d.stipX}" cy="${d.y}" r="7.5" class="bol aan"/>`)
    .join('');

  const lijnen = labels
    .map((d) => {
      const uitX = d.kant === 'links' ? d.labelX + 10 : d.labelX - 10;
      const knik = d.kant === 'links' ? d.ankerX - 30 : d.ankerX + 30;
      return `<path d="M ${d.ankerX} ${d.y} L ${knik} ${d.y} L ${knik} ${d.labelY} L ${uitX} ${d.labelY}" class="aanwijs"/>` +
        `<circle cx="${uitX}" cy="${d.labelY}" r="2.4" class="aanwijs-stip"/>`;
    })
    .join('');

  const punten = labels
    .map(
      (d) => `<g class="punt">
        <circle cx="${d.ankerX}" cy="${d.y}" r="16" class="halo"/>
        <circle cx="${d.ankerX}" cy="${d.y}" r="12.5" class="bol aan"/>
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
        .map((r, i) => `<text x="${x}" y="${d.labelY + 20 + i * 18}" text-anchor="${anker}" class="bij-plek">${r}</text>`)
        .join('');
      return `<g class="bijschrift">
        <text x="${x}" y="${d.labelY - 3}" text-anchor="${anker}" class="bij-naam">${d.nr}. ${d.naam}</text>
        ${regels}
      </g>`;
    })
    .join('');

  /* De viewBox: de auto met aan weerszijden precies de kantlijn erbij. Zo
     blijft de auto zo groot mogelijk en valt er niets buiten beeld. */
  const marge = KIER + KOLOM;
  const vakX = KADER.x - marge;
  const vakB = KADER.breedte + marge * 2;
  /* De maatvoering. De carrosserie is een referentie — elke auto is anders —
     maar de maten komen wel uit deze tekening, en niet uit de duim. */
  const maten = [
    maatStaand(74, MATEN.wielbasis.van, MATEN.wielbasis.tot, inMeters(MATEN.wielbasis.tot - MATEN.wielbasis.van), [
      `M 96 ${MATEN.wielbasis.van} L 68 ${MATEN.wielbasis.van}`,
      `M 96 ${MATEN.wielbasis.tot} L 68 ${MATEN.wielbasis.tot}`,
    ]),
    maatStaand(366, MATEN.lengte.van, MATEN.lengte.tot, inMeters(MATEN.lengte.tot - MATEN.lengte.van), [
      `M 228 ${MATEN.lengte.van} L 372 ${MATEN.lengte.van}`,
      `M 228 ${MATEN.lengte.tot} L 372 ${MATEN.lengte.tot}`,
    ]),
    maatLiggend(652, MATEN.breedte.van, MATEN.breedte.tot, inMeters(MATEN.breedte.tot - MATEN.breedte.van), [
      `M ${MATEN.breedte.van} 630 L ${MATEN.breedte.van} 658`,
      `M ${MATEN.breedte.tot} 630 L ${MATEN.breedte.tot} 658`,
    ]),
  ].join('');

  const hulplijnen = `<g class="hulp">
    <path d="${HULPLIJNEN.hart}" class="hart"/>
    ${HULPLIJNEN.assen.map((a) => `<path d="${a}" class="as"/>`).join('')}
    ${HULPLIJNEN.kruizen.map((k) => `<path d="${k}" class="as"/>`).join('')}
  </g>`;

  return `<svg class="schets" viewBox="${vakX} 0 ${vakB} ${AUTO.hoogte}">
    <!-- Ruitjespapier, arcering en pijlpunten. Zonder dit is het een tekening
         op een zwart vlak; met dit is het een werktekening, en dat is het. -->
    <defs>
      <pattern id="ruit-fijn" width="${METER / 4}" height="${METER / 4}" patternUnits="userSpaceOnUse"
               patternTransform="translate(220 ${MATEN.wielbasis.van})">
        <path d="M ${METER / 4} 0 L 0 0 0 ${METER / 4}" fill="none" stroke="${BRAND.accent}" stroke-opacity=".07" stroke-width=".7"/>
      </pattern>
      <pattern id="ruit-grof" width="${METER}" height="${METER}" patternUnits="userSpaceOnUse"
               patternTransform="translate(220 ${MATEN.wielbasis.van})">
        <path d="M ${METER} 0 L 0 0 0 ${METER}" fill="none" stroke="${BRAND.accent}" stroke-opacity=".15" stroke-width="1"/>
      </pattern>
      <pattern id="arcering" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <rect width="10" height="10" fill="rgba(255,94,31,.07)"/>
        <path d="M 0 0 L 0 10" stroke="${BRAND.accent}" stroke-opacity=".6" stroke-width="1.1"/>
      </pattern>
      <pattern id="arcering-zacht" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
        <rect width="20" height="20" fill="rgba(255,94,31,.035)"/>
        <path d="M 0 0 L 0 20" stroke="${BRAND.accent}" stroke-opacity=".3" stroke-width=".9"/>
      </pattern>
    </defs>
    <rect x="${vakX}" y="0" width="${vakB}" height="${AUTO.hoogte}" fill="url(#ruit-fijn)"/>
    <rect x="${vakX}" y="0" width="${vakB}" height="${AUTO.hoogte}" fill="url(#ruit-grof)"/>
    ${vlakken}
    <g class="carrosserie">
      ${AUTO.paden.map((v) => `<path d="${v.d}" class="${v.klasse}"/>`).join('')}
    </g>
    ${hulplijnen}${maten}${spiegels}${lijnen}${punten}${bijschriften}
  </svg>`;
}

/* ---------------------------------------------------------- maatlijn --- */
/**
 * Een maat zoals een tekenaar hem zet: twee hulplijntjes die van het
 * onderdeel af wijzen, een lijn met pijlpunten ertussen en de maat erbij.
 * De maat komt uit de tekening zelf, dus er kan nooit iets anders op papier
 * staan dan wat je ziet.
 */
const PIJL = 10;
function maatStaand(x, y1, y2, tekst, hulp = []) {
  return `<g class="maat">
    ${hulp.map((h) => `<path d="${h}" class="maat-hulp"/>`).join('')}
    <path d="M ${x} ${y1} L ${x} ${y2}" class="maat-lijn"/>
    <path d="M ${x} ${y1} L ${x - 3.2} ${y1 + PIJL} L ${x + 3.2} ${y1 + PIJL} Z" class="maat-punt"/>
    <path d="M ${x} ${y2} L ${x - 3.2} ${y2 - PIJL} L ${x + 3.2} ${y2 - PIJL} Z" class="maat-punt"/>
    <g transform="translate(${x} ${(y1 + y2) / 2}) rotate(-90)">
      <text x="0" y="-7" text-anchor="middle" class="maat-tekst">${tekst}</text>
    </g>
  </g>`;
}
function maatLiggend(y, x1, x2, tekst, hulp = []) {
  return `<g class="maat">
    ${hulp.map((h) => `<path d="${h}" class="maat-hulp"/>`).join('')}
    <path d="M ${x1} ${y} L ${x2} ${y}" class="maat-lijn"/>
    <path d="M ${x1} ${y} L ${x1 + PIJL} ${y - 3.2} L ${x1 + PIJL} ${y + 3.2} Z" class="maat-punt"/>
    <path d="M ${x2} ${y} L ${x2 - PIJL} ${y - 3.2} L ${x2 - PIJL} ${y + 3.2} Z" class="maat-punt"/>
    <text x="${(x1 + x2) / 2}" y="${y - 8}" text-anchor="middle" class="maat-tekst">${tekst}</text>
  </g>`;
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
    <div class="stempel">
      ${[
        ['Tekening', 'Doorsnede · bovenaanzicht'],
        ['Pakket', pkg.name],
        ['Blad', `${String(index + 1).padStart(2, '0')} / ${String(totaal).padStart(2, '0')}`],
        ['Maatvoering', 'Raster 1,00 m · indicatief'],
        ['Plaatsing', 'Verschilt per auto'],
        ['Uitgave', UITGAVE],
      ]
        .map(([kop, waarde]) => `<div class="vak"><span>${kop}</span><b>${waarde}</b></div>`)
        .join('')}
    </div>

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
  /* Het tekeningstempel: op een echte werktekening staat in de hoek wat je
     voor je hebt, welk blad het is en hoe hard de maten zijn. Hier staat het
     over de volle breedte, want het is ook het onderschrift bij de auto. */
  .stempel {
    display: flex; margin: 3mm 0 5mm;
    border: .35mm solid ${BRAND.line}; border-radius: .8mm; overflow: hidden;
  }
  .stempel .vak {
    flex: 1; padding: 2.4mm 3mm;
    border-left: .35mm solid ${BRAND.line};
  }
  .stempel .vak:first-child { border-left: 0 }
  .stempel span {
    display: block; font-family: 'Oswald'; text-transform: uppercase;
    letter-spacing: .22em; font-size: 2.5mm; color: ${BRAND.textDim};
    margin-bottom: 1mm;
  }
  .stempel b {
    display: block; font-family: 'Oswald'; font-weight: 400;
    letter-spacing: .06em; font-size: 3.4mm; color: ${BRAND.text};
  }
  /* De auto zelf. Zie src/data/schets.js voor de vormen. */
  .carrosserie path, .carrosserie rect {
    fill: none; stroke: ${BRAND.tekenLijn}; stroke-width: 1.7;
    stroke-linejoin: round; stroke-linecap: round;
  }
  .carrosserie .omtrek { stroke-width: 2.4; stroke: rgba(135,135,135,.75) }
  .carrosserie .paneel { stroke-width: 1.4; opacity: .75 }
  .carrosserie .detail { stroke-width: 1; opacity: .5 }
  .carrosserie .ruit { fill: rgba(245,245,245,.04) }
  .carrosserie .dak { opacity: .4 }
  .carrosserie .lamp { fill: rgba(135,135,135,.16); stroke-width: 1.1; opacity: .85 }
  .carrosserie .spiegelkap { fill: rgba(135,135,135,.28); stroke-width: 1.3 }
  .carrosserie .wiel { fill: rgba(135,135,135,.3); stroke: none }
  .carrosserie .stuur { stroke-width: 1.3; opacity: .8 }
  .carrosserie .console { opacity: .55; stroke-width: 1.2 }
  .carrosserie .stoel { stroke-width: 1.3; opacity: .9 }
  .carrosserie .vulling { fill: rgba(135,135,135,.26); stroke: none }
  .carrosserie .kussen { fill: rgba(135,135,135,.16); stroke-width: 1.2; opacity: .9 }
  /* De vlakken liggen onder de auto: de deurnaden en de stoelen lopen er
     overheen, zodat je ziet waar de demping tegenaan zit. */
  /* Gearceerd, zoals een behandeld oppervlak op een werktekening. De vulling
     komt uit het patroon in de defs; hier staat alleen de omlijning. */
  .zone { stroke: rgba(255,94,31,.55); stroke-width: 1.1 }

  /* Hulplijnen: streep-punt, zodat je ziet dat het geen onderdeel is. */
  .hulp path { fill: none; stroke: rgba(255,94,31,.42); stroke-width: .9 }
  .hulp .hart { stroke-dasharray: 22 5 3 5 }
  .hulp .as { stroke-dasharray: 16 4 2.5 4 }

  /* Maatvoering. */
  .maat-lijn, .maat-hulp { fill: none; stroke: rgba(235,235,235,.45); stroke-width: .8 }
  .maat-hulp { stroke-dasharray: 4 4; stroke: rgba(235,235,235,.28) }
  .maat-punt { fill: rgba(235,235,235,.6); stroke: none }
  .maat-tekst {
    font-family: 'Oswald'; font-weight: 400; font-size: 11px;
    letter-spacing: .14em; fill: rgba(235,235,235,.72);
  }
  .aanwijs { fill: none; stroke: rgba(255,94,31,.5); stroke-width: 1.2 }
  .aanwijs-stip { fill: ${BRAND.accent} }
  .halo { fill: rgba(255,94,31,.18) }
  /* Een donkere rand om de bol: zonder die onderbreking loopt hij vast in de
     arcering eronder. Op een tekening heet dat een uitsparing. */
  .bol { fill: rgba(135,135,135,.4); stroke: ${BRAND.bg}; stroke-width: 3 }
  .bol.aan { fill: ${BRAND.accent} }
  .nr {
    font-family: 'Oswald'; font-weight: 600; font-size: 14px;
    fill: ${BRAND.accentInk};
  }
  .bij-naam {
    font-family: 'Oswald'; font-weight: 600; text-transform: uppercase;
    letter-spacing: .08em; font-size: 13.5px; fill: ${BRAND.text};
  }
  .bij-plek { font-family: 'Inter'; font-size: 11.5px; fill: ${BRAND.textDim} }

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
