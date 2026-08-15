/**
 * Maakt van een intern adres het volledige pad.
 *
 * WAAROM DIT NODIG IS
 * Op het eigen domein staat de site op de wortel: /upgrades. Op de
 * voorbeeldsite van GitHub staat hij in een map: /audioupgrade-emmen/upgrades.
 * Astro past dat zelf aan voor zijn eigen bestanden (opmaak, afbeeldingen),
 * maar níét voor links die wij met de hand hebben getypt.
 *
 * Dus: gebruik pad('/upgrades') en nooit "/upgrades" rechtstreeks. Dan klopt
 * het op allebei de plekken en hoeft er bij verhuizen niets aangepast.
 *
 *   pad('/')          -> '/'                of '/audioupgrade-emmen'
 *   pad('/upgrades')  -> '/upgrades'        of '/audioupgrade-emmen/upgrades'
 *
 * Er staat een test op die klaagt zodra er weer een kaal adres in de bron
 * sluipt.
 */

/** De mapnaam waar de site in staat, zonder schuine streep aan het eind. */
const BASIS = (import.meta.env?.BASE_URL ?? '/').replace(/\/$/, '');

export function pad(adres = '/') {
  const schoon = String(adres).startsWith('/') ? adres : `/${adres}`;
  if (schoon === '/') return BASIS || '/';
  return BASIS + schoon;
}

export default pad;
