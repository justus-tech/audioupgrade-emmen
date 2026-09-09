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
 * De pagina's die in alle drie de talen bestaan.
 *
 * Alles wat hier niet in staat, bestaat alleen in het Nederlands. Sta je op
 * zo'n pagina en klik je op DE, dan kom je op de Duitse startpagina uit — dat
 * is beter dan een 404, en beter dan een knop die niets doet.
 *
 * LET OP BIJ UITBREIDEN: zet een pad hier pas bij als /de en /en die pagina
 * ook echt hebben. Anders wijst de taalknop naar een adres dat niet bestaat.
 * Er staat een test op (tests/gebouwd.test.js) die daarop let, en die heeft
 * precies deze fout al een keer gevangen.
 */
export const VERTAALD = ['/'];

/**
 * Zet een pad om naar de versie in een bepaalde taal.
 *
 *   taalPad('de', '/upgrades')  ->  '/de/upgrades'
 *   taalPad('nl', '/upgrades')  ->  '/upgrades'
 *   taalPad('de', '/')          ->  '/de'
 */
export function taalPad(taal, pad) {
  const prefix = TALEN[taal]?.prefix ?? '';
  if (pad === '/') return prefix || '/';
  return `${prefix}${pad}`;
}

/**
 * Waar de schakelaar naartoe wijst vanaf de pagina waar je nu staat.
 *
 * Bestaat deze pagina niet in die taal, dan gaat hij naar de startpagina van
 * die taal. Zo loopt niemand tegen een dood adres aan.
 */
export function wisselPad(naarTaal, huidigPad) {
  return VERTAALD.includes(huidigPad) ? taalPad(naarTaal, huidigPad) : taalPad(naarTaal, '/');
}
