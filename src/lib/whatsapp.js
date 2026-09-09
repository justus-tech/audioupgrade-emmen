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

/**
 * De aanhef per taal. Schrijft een Duitser je aan, dan krijgt hij ook een
 * Duits bericht voorgetypt — anders staat er ineens Nederlands in zijn
 * WhatsApp en denkt hij dat hij op de verkeerde knop heeft gedrukt.
 */
const AANHEF = {
  nl: 'Hoi Justus,',
  de: 'Hallo Justus,',
  en: 'Hi Justus,',
};

/**
 * Een WhatsApp-link. Zonder bericht krijg je gewoon een leeg gesprek.
 *
 *   whatsappLink()                          → leeg gesprek
 *   whatsappLink('ik heb een Golf.')        → "Hoi Justus, ik heb een Golf."
 *   whatsappLink('ich habe einen Golf.','de') → "Hallo Justus, ich habe ..."
 */
export function whatsappLink(zin, taal = 'nl') {
  if (!zin) return `https://wa.me/${NUMMER}`;
  const aanhef = AANHEF[taal] ?? AANHEF.nl;
  return `https://wa.me/${NUMMER}?text=${encodeURIComponent(`${aanhef} ${zin}`)}`;
}

/**
 * Het standaardbericht als we alleen de auto weten en verder niets.
 * `auto` is bijvoorbeeld "Volkswagen Golf" of "Volkswagen Golf uit 2018".
 */
export function berichtOverAuto(auto, taal = 'nl') {
  if (taal === 'de') {
    return auto
      ? `ich fahre einen ${auto}. Was wäre für dieses Auto möglich?`
      : 'ich interessiere mich für eine Audio-Aufrüstung. Ich schicke gleich ein Foto von meinem Armaturenbrett.';
  }
  if (taal === 'en') {
    return auto
      ? `I drive a ${auto}. I would like to know what is possible for this car.`
      : 'I am interested in an audio upgrade. I will send a photo of my dashboard shortly.';
  }
  return auto
    ? `ik heb een ${auto}. Ik ben benieuwd wat er voor mijn auto mogelijk is.`
    : 'ik ben benieuwd wat er voor mijn auto mogelijk is. Ik stuur zo een foto van mijn dashboard.';
}

/** Het bericht bij een pakket, bijvoorbeeld vanaf een prijskaart. */
export function berichtOverPakket(pakket, auto, taal = 'nl') {
  if (taal === 'de') {
    const wat = auto ? ` für meinen ${auto}` : '';
    return `ich interessiere mich für ${pakket}${wat}. Können Sie mir dazu mehr sagen?`;
  }
  if (taal === 'en') {
    const wat = auto ? ` for my ${auto}` : '';
    return `I am interested in ${pakket}${wat}. Could you tell me more about it?`;
  }
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
