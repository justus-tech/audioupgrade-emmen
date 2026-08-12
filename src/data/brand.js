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
};

/**
 * Lijnen en subtiele vlakken: het grijs op lage dekking, zodat ook die
 * binnen het palet blijven in plaats van een zesde kleur te worden.
 */
export const LINES = {
  line: 'rgba(135, 135, 135, .22)',
  lineStrong: 'rgba(135, 135, 135, .4)',
};

/**
 * De echte Nederlandse kentekenplaat in de kenteken-check. Bewust GEEN
 * huisstijlkleur: bezoekers moeten in één oogopslag herkennen dat daar hun
 * kenteken in moet. Dit is herkenning, geen branding.
 */
export const PLATE = {
  yellow: '#f8b500',
  blue: '#003399',
  ink: '#111111',
};

/** Zet de kleuren om naar CSS-variabelen voor in <style> op :root. */
export const cssVariables = [
  `--bg: ${BRAND.bg}`,
  `--bg-alt: ${BRAND.bgAlt}`,
  `--panel: ${BRAND.panel}`,
  `--text: ${BRAND.text}`,
  `--text-dim: ${BRAND.textDim}`,
  `--accent: ${BRAND.accent}`,
  `--accent-ink: ${BRAND.accentInk}`,
  `--line: ${LINES.line}`,
  `--line-strong: ${LINES.lineStrong}`,
  `--plate-yellow: ${PLATE.yellow}`,
  `--plate-blue: ${PLATE.blue}`,
  `--plate-ink: ${PLATE.ink}`,
].join('; ');

export default BRAND;
