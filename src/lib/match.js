/**
 * Koppelt RDW-gegevens aan een auto uit onze lijst.
 *
 * Dit bestand wordt door TWEE dingen gebruikt:
 *   1. de kenteken-check in de browser
 *   2. de test (npm run test:kenteken)
 * Zo kan de test nooit iets anders controleren dan wat bezoekers krijgen.
 *
 * Waarom normaliseren nodig is: de RDW schrijft handelsbenamingen slordig.
 *   "BENTLEY CONTINENTAL GT"  merk staat er dubbel in
 *   "Range Rover Evoque"      wisselende kapitalisatie
 *   "UP!"                     leestekens
 *   "C 180 KOMPRESSOR"        uitvoering erachter geplakt
 */

/** "12-AB-3C" -> "12AB3C" */
export function normaliseerKenteken(invoer) {
  return String(invoer || '')
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
    .slice(0, 6);
}

/** Een Nederlands kenteken is altijd precies 6 tekens. */
export function isGeldigKenteken(invoer) {
  return /^[A-Z0-9]{6}$/.test(normaliseerKenteken(invoer));
}

/**
 * Hoofdletters, leestekens eruit, spaties samengevoegd, en het merk eraf als
 * dat vooraan herhaald wordt. Daarna kunnen patronen betrouwbaar op het begin
 * van de tekst matchen.
 */
export function normaliseerBenaming(merk, handelsbenaming) {
  let s = String(handelsbenaming || '')
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, ' ')
    .trim();

  const merkTokens = String(merk || '')
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, ' ')
    .trim()
    .split(' ')
    .filter((t) => t.length >= 3);

  for (const token of merkTokens) {
    if (s === token) return '';
    if (s.startsWith(token + ' ')) {
      s = s.slice(token.length + 1);
      break;
    }
  }
  return s;
}

export function normaliseerMerk(merk) {
  return String(merk || '')
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, ' ')
    .trim();
}

/** Voertuigsoorten waarvoor wij iets kunnen betekenen. */
const TOEGESTANE_SOORTEN = ['PERSONENAUTO', 'BEDRIJFSAUTO'];

/**
 * Zoekt de auto die bij een RDW-voertuig hoort.
 *
 * @param {{merk:string, handelsbenaming:string, voertuigsoort?:string}} voertuig
 * @param {Array<{slug:string, matchers:{merk:string, model:RegExp|string}}>} lijst
 *        Let op: de volgorde telt. Zet specifieke modellen bovenaan
 *        ("Range Rover Sport" vóór "Range Rover").
 * @returns {object|null}
 */
export function matchAuto(voertuig, lijst) {
  if (!voertuig) return null;

  const soort = normaliseerMerk(voertuig.voertuigsoort);
  if (soort && !TOEGESTANE_SOORTEN.includes(soort)) return null;

  const merk = normaliseerMerk(voertuig.merk);
  const benaming = normaliseerBenaming(voertuig.merk, voertuig.handelsbenaming);
  if (!benaming) return null;

  for (const auto of lijst) {
    const m = auto.matchers;
    if (!m) continue;
    if (!merk.includes(m.merk)) continue;
    const re = m.model instanceof RegExp ? m.model : new RegExp(m.model);
    if (re.test(benaming)) return auto;
  }
  return null;
}

/**
 * Zet "92DJHG" om naar "92-DJ-HG".
 *
 * Nederlandse kentekens hebben hun streepjes op vaste plekken, afhankelijk van
 * het patroon van cijfers en letters (de zogeheten sidecode). Er zijn er maar
 * veertien, dus die staan hier gewoon uitgeschreven. Herkennen we het patroon
 * niet, dan tonen we het kenteken ongewijzigd — beter geen streepje dan een
 * streepje op de verkeerde plek.
 */
const GROEPEN = {
  DDLLDD: [2, 2, 2], LLDDLL: [2, 2, 2], LLDDDD: [2, 2, 2],
  DDDDLL: [2, 2, 2], LLLLDD: [2, 2, 2], DDLLLL: [2, 2, 2],
  DDLLLD: [2, 3, 1], LLDDDL: [2, 3, 1],
  DLLLDD: [1, 3, 2], LDDDLL: [1, 3, 2],
  LLLDDL: [3, 2, 1], DDDLLD: [3, 2, 1],
  LDDLLL: [1, 2, 3], DLLDDD: [1, 2, 3],
};

export function formatteerKenteken(invoer) {
  const k = normaliseerKenteken(invoer);
  if (k.length !== 6) return k;

  const patroon = [...k].map((c) => (/\d/.test(c) ? 'D' : 'L')).join('');
  const groepen = GROEPEN[patroon];
  if (!groepen) return k;

  const delen = [];
  let i = 0;
  for (const lengte of groepen) {
    delen.push(k.slice(i, i + lengte));
    i += lengte;
  }
  return delen.join('-');
}

/** Afkortingen die hoofdletters houden, ook al zijn ze langer dan twee tekens. */
const AFKORTINGEN = new Set([
  'TDI', 'TSI', 'TFSI', 'GTI', 'GTE', 'GTD', 'AMG', 'BMW', 'SUV', 'CDI',
  'HDI', 'DCI', 'CVT', 'AWD', 'FWD', 'RWD', 'PHEV', 'BEV', 'LPG', 'CNG',
  'XDRIVE', 'QUATTRO', 'AUT',
]);

/**
 * Maakt van een RDW-schrijfwijze een leesbare naam.
 * "VOLKSWAGEN GOLF PLUS" -> "Volkswagen Golf Plus"
 *
 * Woorden met een cijfer erin blijven ongemoeid ("ID.3", "150", "4S"),
 * net als korte codes ("GT", "KW") en bekende afkortingen ("TDI").
 * Zonder die uitzondering wordt "ID.3 PRO 150 KW" namelijk "Id.3 Pro 150 Kw".
 */
function kapitaliseer(tekst) {
  return String(tekst || '')
    .trim()
    .split(/\s+/)
    .map((woord) => {
      const kaal = woord.replace(/[^A-Za-z0-9]/g, '');
      if (/\d/.test(woord)) return woord;                  // ID.3, 150, 4S
      if (kaal.length <= 2) return woord.toUpperCase();    // GT, KW, S
      if (AFKORTINGEN.has(kaal.toUpperCase())) return woord.toUpperCase();
      return woord.charAt(0).toUpperCase() + woord.slice(1).toLowerCase();
    })
    .join(' ');
}

export function netteNaam(merk, handelsbenaming) {
  const merkNet = kapitaliseer(merk);
  const benamingNet = kapitaliseer(handelsbenaming);

  // Merk niet dubbel tonen: "Bentley Bentley Continental GT"
  if (benamingNet.toUpperCase().startsWith(merkNet.toUpperCase())) return benamingNet;
  return `${merkNet} ${benamingNet}`.replace(/\s+/g, ' ').trim();
}
