/**
 * WHATSAPP-LINKS MET EEN BERICHT ER AL IN.
 *
 * WAAROM DIT BESTAAT
 * Elke WhatsApp-knop op de site ging naar hetzelfde lege gesprek. Iemand die
 * net zijn Golf uit 2018 had opgezocht, kwam in een leeg venster terecht en
 * moest zelf gaan bedenken wat hij zou schrijven. Dat is precies het moment
 * waarop mensen afhaken.
 *
 * Nu staat het bericht er al in. De bezoeker hoeft alleen op verzenden te
 * drukken, en Justus ziet meteen om welke auto het gaat.
 *
 * WAAROM NIET DE KORTE LINK
 * SITE.whatsapp is de korte vorm (wa.me/message/CODE) die aan het
 * bedrijfsprofiel hangt. Die kán geen tekst meekrijgen; alleen de vorm met
 * het telefoonnummer kan dat. Vandaar dat we hier het nummer gebruiken.
 *
 * WAT HIER NIET IN MAG
 * Persoonsgegevens die wij zelf bewaren. Alles wat hier in het bericht komt,
 * typt de bezoeker net zo goed zelf; wij slaan niets op en versturen niets.
 * Het bericht staat pas in WhatsApp als de bezoeker zelf op verzenden drukt.
 */
import { SITE } from '../data/site.js';

/** wa.me wil het nummer zonder plus, spaties of streepjes. */
const NUMMER = SITE.phone.replace(/[^0-9]/g, '');

/** De aanhef. Staat hier één keer, zodat elk bericht hetzelfde begint. */
const AANHEF = 'Hoi Justus,';

/**
 * Een WhatsApp-link. Zonder bericht krijg je gewoon een leeg gesprek.
 *
 *   whatsappLink()                        → leeg gesprek
 *   whatsappLink('ik heb een Golf.')      → "Hoi Justus, ik heb een Golf."
 */
export function whatsappLink(zin) {
  if (!zin) return `https://wa.me/${NUMMER}`;
  return `https://wa.me/${NUMMER}?text=${encodeURIComponent(`${AANHEF} ${zin}`)}`;
}

/**
 * Het standaardbericht als we alleen de auto weten en verder niets.
 * `auto` is bijvoorbeeld "Volkswagen Golf" of "Volkswagen Golf uit 2018".
 */
export function berichtOverAuto(auto) {
  return auto
    ? `ik heb een ${auto}. Ik ben benieuwd wat er voor mijn auto mogelijk is.`
    : 'ik ben benieuwd wat er voor mijn auto mogelijk is. Ik stuur zo een foto van mijn dashboard.';
}

/** Het bericht bij een pakket, bijvoorbeeld vanaf een prijskaart. */
export function berichtOverPakket(pakket, auto) {
  const wat = auto ? ` voor mijn ${auto}` : '';
  return `ik ben geïnteresseerd in ${pakket}${wat}. Kun je me daar meer over vertellen?`;
}

/**
 * Het kale telefoonnummer, voor scripts die zelf een link moeten bouwen.
 * Een `<script>` in een Astro-pagina wordt apart gebundeld en kan dit bestand
 * niet altijd importeren, dus geven we het nummer daar als gegeven mee.
 */
export const WA_NUMMER = NUMMER;

export default whatsappLink;
