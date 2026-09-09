/**
 * DE DRIE TALEN VAN DE SITE.
 *
 * ==========================================================================
 * WAAROM NEDERLANDS OP DE WORTEL BLIJFT
 * ==========================================================================
 * audioupgradeemmen.nl/upgrades staat in Google en in WhatsApp-gesprekken.
 * Die adressen verplaatsen naar /nl/upgrades zou elke bestaande link breken
 * en de site maanden terugzetten in de zoekresultaten. Nederlands heeft dus
 * geen voorvoegsel; Duits en Engels wel.
 *
 * ==========================================================================
 * WAAROM NIET DE HELE SITE VERTAALD IS
 * ==========================================================================
 * De 150 modelpagina's zijn samen bijna 380.000 tekens. Die vertalen kost
 * niet alleen veel, het levert ook weinig op: ze bestaan om te ranken op
 * "volkswagen golf audio upgrade" — een Nederlandse zoekopdracht. Een Duitser
 * zoekt op "carplay nachrüsten", niet op een Nederlandse modelpagina.
 *
 * En er is een harder argument: de kenteken-check werkt op de open data van
 * de RDW. Die kent alleen Nederlandse kentekens. Voor een Duitse bezoeker is
 * dat veld dus kapot, en daarom staat het niet op de Duitse pagina's.
 *
 * Wat een Duitse of Engelse bezoeker wél nodig heeft: wat je doet, wat het
 * kost, welke garantie je geeft en hoe hij je bereikt. Dat zijn de pagina's
 * in VERTAALD hieronder.
 */

export const TALEN = {
  nl: {
    code: 'nl',
    label: 'NL',
    naam: 'Nederlands',
    /* Voor het lang-attribuut op <html>. Bepaalt hoe een schermlezer de tekst
       uitspreekt en welke afbreekregels de browser gebruikt. */
    htmlLang: 'nl-NL',
    prefix: '',
    /* Voor hreflang: nl-NL zou de site alleen aan Nederlanders koppelen, maar
       Vlamingen zoeken in hetzelfde Nederlands. Daarom zonder land. */
    hreflang: 'nl',
  },
  de: {
    code: 'de',
    label: 'DE',
    naam: 'Deutsch',
    htmlLang: 'de-DE',
    prefix: '/de',
    hreflang: 'de',
  },
  en: {
    code: 'en',
    label: 'EN',
    naam: 'English',
    htmlLang: 'en',
    prefix: '/en',
    hreflang: 'en',
  },
};

/** De volgorde in de schakelaar. Nederlands eerst: dat is de hoofdtaal. */
export const TAALVOLGORDE = ['nl', 'en', 'de'];

export const STANDAARDTAAL = 'nl';

/**
 * DE ROUTEKAART.
 *
 * Elke rij is één pagina in drie talen. De sleutel links (bijvoorbeeld
 * `prijzen`) is de naam die we in de code gebruiken; de adressen erachter
 * zijn wat de bezoeker ziet.
 *
 * WAAROM DE ADRESSEN VERTAALD ZIJN
 * /de/preise en niet /de/upgrades. Een Duitser die "preise" in zijn adresbalk
 * ziet staan begrijpt waar hij is, en Google weegt het woord in het adres mee
 * bij een Duitse zoekopdracht. Het kost niets extra en het is meteen goed —
 * een adres later veranderen kost je wél je plek in de zoekresultaten.
 *
 * Nederlands staat op de wortel: die adressen bestaan al en staan in Google
 * en in WhatsApp-gesprekken. Die raken we niet aan.
 */
export const PADEN = {
  home: { nl: '/', de: '/', en: '/' },
  prijzen: { nl: '/upgrades', de: '/preise', en: '/pricing' },
  werkwijze: { nl: '/werkwijze', de: '/ablauf', en: '/how-it-works' },
  vragen: { nl: '/veelgestelde-vragen', de: '/fragen', en: '/faq' },
  over: { nl: '/over-ons', de: '/ueber-uns', en: '/about' },
  contact: { nl: '/contact', de: '/kontakt', en: '/contact' },
  oldtimer: { nl: '/oldtimer-audio', de: '/oldtimer', en: '/classics' },
};

/**
 * Zet een pad om naar de versie in een bepaalde taal.
 *
 *   taalPad('de', '/preise')  ->  '/de/preise'
 *   taalPad('nl', '/upgrades') ->  '/upgrades'
 *   taalPad('de', '/')         ->  '/de'
 */
export function taalPad(taal, pad) {
  const prefix = TALEN[taal]?.prefix ?? '';
  if (pad === '/') return prefix || '/';
  return `${prefix}${pad}`;
}

/**
 * Waar de taalknop naartoe wijst vanaf de pagina waar je nu staat.
 *
 * Sta je op /de/preise en klik je op EN, dan ga je naar /en/pricing — niet
 * naar de Engelse startpagina. Alleen als de pagina in die taal niet bestaat
 * (een modelpagina, de voorwaarden) val je terug op de startpagina. Beter dan
 * een dood adres, en beter dan een knop die niets doet.
 */
export function wisselPad(naarTaal, sleutel) {
  const rij = PADEN[sleutel];
  if (!rij || !rij[naarTaal]) return taalPad(naarTaal, '/');
  return taalPad(naarTaal, rij[naarTaal]);
}

/** Het pad van een pagina in een bepaalde taal, mét voorvoegsel. */
export const padVan = (sleutel, taal) => taalPad(taal, PADEN[sleutel]?.[taal] ?? '/');
