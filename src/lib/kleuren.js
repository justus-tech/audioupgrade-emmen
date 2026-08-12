/**
 * RDW-kleurnamen omzetten naar een kleur die je op onze donkere site ziet.
 *
 * De RDW registreert maar dertien kleuren (`eerste_kleur`), dus dit is een
 * complete lijst — geen steekproef. Aantallen zijn personenauto's, aug 2026.
 *
 * De tinten zijn bewust iets opgehelderd ten opzichte van "echt": een zwarte
 * auto op een bijna zwarte achtergrond zie je anders niet. De omtreklijn van
 * de schets blijft licht, zodat elke auto herkenbaar blijft.
 */

/**
 * `naam` is de kale kleur, `bijvoeglijk` de verbogen vorm. In het Nederlands
 * krijgt het bijvoeglijk naamwoord een -e na "jouw": het is "jouw zwarte
 * Octavia", niet "jouw zwart Octavia". Kleuren die op -e eindigen (oranje,
 * beige, roze) blijven ongewijzigd.
 */
export const KLEUREN = {
  GRIJS:  { hex: '#9a9a9a', naam: 'grijs',  bijvoeglijk: 'grijze' },  // 3.600.207
  ZWART:  { hex: '#242424', naam: 'zwart',  bijvoeglijk: 'zwarte' },  // 2.637.976
  WIT:    { hex: '#e8e8e8', naam: 'wit',    bijvoeglijk: 'witte' },   // 1.642.831
  BLAUW:  { hex: '#2f5fb8', naam: 'blauw',  bijvoeglijk: 'blauwe' },  // 1.382.280
  ROOD:   { hex: '#c62b26', naam: 'rood',   bijvoeglijk: 'rode' },    //   653.810
  GROEN:  { hex: '#2f7d4f', naam: 'groen',  bijvoeglijk: 'groene' },  //   332.968
  BRUIN:  { hex: '#6b4a30', naam: 'bruin',  bijvoeglijk: 'bruine' },  //   240.782
  GEEL:   { hex: '#ddb52c', naam: 'geel',   bijvoeglijk: 'gele' },    //    96.483
  ORANJE: { hex: '#d4661a', naam: 'oranje', bijvoeglijk: 'oranje' },  //    74.219
  BEIGE:  { hex: '#c9b995', naam: 'beige',  bijvoeglijk: 'beige' },   //    74.058
  PAARS:  { hex: '#6b3f8f', naam: 'paars',  bijvoeglijk: 'paarse' },  //    40.632
  CREME:  { hex: '#dbd0b2', naam: 'crème',  bijvoeglijk: 'crème' },   //     5.884
  ROSE:   { hex: '#cf7f96', naam: 'roze',   bijvoeglijk: 'roze' },    //     3.404
};

/** Als de kleur onbekend of niet geregistreerd is. */
export const STANDAARD = { hex: '#6f6f6f', naam: null, bijvoeglijk: null };

/**
 * @param {string} rdwKleur waarde uit het veld `eerste_kleur`
 * @returns {{hex: string, naam: string|null}}
 */
export function kleurVan(rdwKleur) {
  const sleutel = String(rdwKleur || '').toUpperCase().trim();
  return KLEUREN[sleutel] ?? STANDAARD;
}

/**
 * Een zinnetje als "je zwarte Škoda Octavia". Geeft de naam zonder kleur
 * terug als de kleur niet geregistreerd staat, zodat er nooit "je  Octavia"
 * met een gat komt te staan.
 */
export function metKleur(naam, rdwKleur) {
  const kleur = kleurVan(rdwKleur);
  return kleur.bijvoeglijk ? `${kleur.bijvoeglijk} ${naam}` : naam;
}
