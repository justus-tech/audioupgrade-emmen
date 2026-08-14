/**
 * DE HUISSTIJLKLEUREN — dit bestand is de enige bron van waarheid.
 *
 * Wil je een kleur wijzigen? Doe het hier, en alleen hier. De hele site
 * (CSS, componenten, scripts) haalt de kleuren hiervandaan, dus je hoeft
 * nergens anders te zoeken.
 *
 * Gebruik in CSS:      color: var(--accent);
 * Gebruik in Astro/JS: import { BRAND } from '../data/brand.js';
 *
 * Voeg nooit een losse kleurcode toe in een .css- of .astro-bestand.
 * Staat een kleur er niet bij, voeg hem dan hier toe met een duidelijke naam.
 *
 * TWEE STANDEN
 * De site heeft een donkere en een lichte stand. Beide gebruiken hetzelfde
 * palet; alleen de rollen wisselen. Donker is de standaard, want dat is de
 * huisstijl. De bezoeker kan wisselen met de knop rechtsboven en die keuze
 * wordt onthouden.
 */

/** Het kale palet, precies zoals afgesproken. */
export const PALETTE = {
  orange: '#ff5e1f', // signatuurkleur
  white: '#f5f5f5',
  grey: '#878787',
  darkGrey: '#1a1a1a',
  black: '#121212',
};

/**
 * Twee kleuren die niet in het palet staan maar niet te vermijden zijn.
 * Ze bestaan alléén voor de lichte stand — zie de uitleg bij LICHT.
 */
const LICHT_EXTRA = {
  paper: '#ffffff',   // kaarten en afwisselende secties op een lichte ondergrond
  greyInk: '#5a5a5a', // bodytekst; #878787 is op wit te licht om te lezen
  orangeInk: '#c8410c', // oranje als tékst; #ff5e1f is op wit te licht
};

/**
 * Wat elke kleur op de site betekent. Gebruik deze namen, niet de kale codes:
 * dan blijft duidelijk waaróm een kleur ergens staat.
 */
export const BRAND = {
  bg: PALETTE.black,        // ondergrond van de pagina
  bgAlt: PALETTE.darkGrey,  // afwisselende secties
  panel: PALETTE.darkGrey,  // kaarten en blokken
  text: PALETTE.white,      // koppen en belangrijke tekst
  textDim: PALETTE.grey,    // bodytekst en bijschriften
  accent: PALETTE.orange,   // accenten en de belangrijkste knoppen
  accentInk: PALETTE.black, // tekst óp een oranje vlak
  accentText: PALETTE.orange, // oranje als tekstkleur — zie LICHT
  line: 'rgba(135, 135, 135, .22)',
  lineStrong: 'rgba(135, 135, 135, .4)',
  schaduw: 'rgba(0, 0, 0, .5)',
  korrel: '.04',
  // Voor de pakkettekeningen: zie de uitleg bij LICHT hieronder.
  tekenLijn: 'rgba(135, 135, 135, .5)',
  tekenVlak: 'rgba(245, 245, 245, .05)',
  tekenVul: 'rgba(135, 135, 135, .28)',
  tekenDiep: 'rgba(18, 18, 18, .8)',
  tekenGloed: '.22',
};

/**
 * De lichte stand. Dezelfde rollen, andere invulling.
 *
 * Twee dingen kunnen hier níét één op één uit het palet komen:
 *
 * 1. Grijs #878787 op wit haalt maar 3,0:1 aan contrast. Dat is te weinig om
 *    prettig te lezen (de norm is 4,5:1), dus de bodytekst wordt #5a5a5a.
 * 2. Oranje #FF5E1F op wit haalt 3,1:1. Als vlák (knoppen, balkjes, randen)
 *    blijft het gewoon #FF5E1F — daar geldt die eis niet en dat is je merk.
 *    Alleen waar het oranje zélf de letters zijn, gebruiken we een donkerder
 *    oranje: #C8410C, goed voor 5,0:1.
 *
 * Op de donkere ondergrond speelt dit niet: daar haalt #FF5E1F ruim 5:1.
 */
export const LICHT = {
  bg: PALETTE.white,
  bgAlt: LICHT_EXTRA.paper,
  panel: LICHT_EXTRA.paper,
  text: PALETTE.black,
  textDim: LICHT_EXTRA.greyInk,
  accent: PALETTE.orange,
  accentInk: PALETTE.black,
  accentText: LICHT_EXTRA.orangeInk,
  line: 'rgba(26, 26, 26, .13)',
  lineStrong: 'rgba(26, 26, 26, .26)',
  schaduw: 'rgba(0, 0, 0, .18)',
  korrel: '.02',
  /**
   * De pakkettekeningen hebben eigen kleuren nodig.
   *
   * Ze zijn opgebouwd uit lijnen en vlakken, en die kunnen niet dezelfde
   * --line gebruiken als de rest van de site: een randje om een kaart mag
   * nauwelijks zichtbaar zijn, maar een speaker die je nauwelijks ziet is
   * geen tekening meer. Op wit hebben ze dus meer contrast nodig.
   */
  tekenLijn: 'rgba(18, 18, 18, .38)',
  tekenVlak: 'rgba(18, 18, 18, .05)',
  tekenVul: 'rgba(18, 18, 18, .17)',
  tekenDiep: 'rgba(18, 18, 18, .13)',
  tekenGloed: '.13',
};

/** Voor terugwaartse compatibiliteit met code die LINES importeert. */
export const LINES = { line: BRAND.line, lineStrong: BRAND.lineStrong };

/**
 * De AUE-plaat gebruikt gewoon het huisstijloranje en een aluminiumverloop
 * in CSS. De Nederlandse geel/blauw hebben we losgelaten: die was wel
 * herkenbaar maar vloekte met de rest van de site. De herkenning komt nu uit
 * de vórm van de plaat en de gekleurde band links. De plaat blijft in beide
 * standen zilver — het is een fysiek voorwerp, geen vlak van de site.
 */

/** Zet één set kleuren om naar CSS-variabelen. */
function naarVariabelen(set) {
  return [
    `--bg: ${set.bg}`,
    `--bg-alt: ${set.bgAlt}`,
    `--panel: ${set.panel}`,
    `--text: ${set.text}`,
    `--text-dim: ${set.textDim}`,
    `--accent: ${set.accent}`,
    `--accent-ink: ${set.accentInk}`,
    `--accent-text: ${set.accentText}`,
    `--line: ${set.line}`,
    `--line-strong: ${set.lineStrong}`,
    `--schaduw: ${set.schaduw}`,
    `--korrel: ${set.korrel}`,
    `--teken-lijn: ${set.tekenLijn}`,
    `--teken-vlak: ${set.tekenVlak}`,
    `--teken-vul: ${set.tekenVul}`,
    `--teken-diep: ${set.tekenDiep}`,
    `--teken-gloed: ${set.tekenGloed}`,
  ].join('; ');
}

/**
 * Drie regels, in deze volgorde — de volgorde bepaalt wie wint:
 *
 * 1. Donker is de basis. Wie niets kiest en geen voorkeur heeft, krijgt dit.
 * 2. Staat de telefoon of laptop op licht, dan volgen we dat. Behalve als de
 *    bezoeker zelf donker heeft aangeklikt: dan blijft het donker.
 * 3. Heeft de bezoeker zelf licht aangeklikt, dan wint dat van alles.
 *
 * Regel 2 en 3 zijn even "zwaar" voor de browser, dus regel 3 moet als
 * laatste staan. Draai je ze om, dan werkt de knop niet meer op een
 * apparaat dat op donker staat.
 */
export const cssVariables = naarVariabelen(BRAND);
export const cssThema =
  `:root{${naarVariabelen(BRAND)}}` +
  `@media (prefers-color-scheme: light){` +
  `:root:not([data-thema="donker"]){${naarVariabelen(LICHT)}}` +
  `}` +
  `:root[data-thema="licht"]{${naarVariabelen(LICHT)}}`;

export default BRAND;
