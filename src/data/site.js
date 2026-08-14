export const SITE = {
  name: 'Audio Upgrade Emmen',
  phone: '+31644379844',
  phoneDisplay: '06 44 37 98 44',
  email: 'info@audioupgradeemmen.nl',
  whatsapp: 'https://wa.me/message/RDCWOKTCKSPIF1',
  kvk: '96356723',
  btw: 'NL005205204B66',
  street: 'Charles Darwinstraat 35',
  postalCode: '7825 AB',
  city: 'Emmen',
  region: 'Drenthe',
  country: 'NL',
  /** Voor de kaartknop en de routelink. */
  mapsQuery: 'Charles Darwinstraat 35, 7825 AB Emmen',
};

/** Het volledige adres op één regel, voor als dat handiger uitkomt. */
export const ADRES = `${SITE.street}, ${SITE.postalCode} ${SITE.city}`;

/**
 * De vijf pakketten, LETTERLIJK overgenomen van audioupgradeemmen.nl.
 *
 * Prijzen, kopregels, omschrijvingen, opsommingen, knopteksten en de
 * scorebalkjes komen woord voor woord van de oude site. Verander hier niets
 * zonder dat Justus het zegt: dit is de prijslijst waar klanten op afgaan.
 *
 *   tagline    de kopregel boven de omschrijving (upgradepagina)
 *   short      de één-regelsamenvatting (homepage)
 *   body       de volledige omschrijving (upgradepagina)
 *   features   het lijstje "Dit zit erin" (homepage)
 *   scores     de balkjes van de oude site, op een schaal van 5
 *   populair   het label "Meest Gekozen"
 */
export const PACKAGES = [
  {
    slug: 'carplay-upgrade',
    name: 'CarPlay Upgrade',
    tagline: 'Apple CarPlay & Android Auto',
    price: 'Vanaf € 695,00',
    priceNote: 'Inclusief BTW & Montage',
    priceExcl: '€ 574,- excl. btw',
    short: 'Apple CarPlay & Android Auto naadloos in je originele scherm.',
    body: 'Het perfecte pakket om af te rekenen met verouderde autonavigatie en lelijke losse telefoonhouders. Wij integreren Apple CarPlay en Android Auto 100% naadloos in je huidige systeem. Je bedient Flitsmeister, Spotify en Google Maps gewoon via het originele beeldscherm en stuurwiel.',
    features: [
      'Draadloze Apple CarPlay & Android Auto integratie.',
      'Op je originele fabrieksscherm (of nieuw high-end display).',
      'Bediening via je originele stuurwielknoppen of touchpad.',
      '100% behoud van fabriekssysteem en boordcomputer.',
      'Inclusief carkit-functie voor kraakhelder bellen.',
    ],
    cta: 'Kies CarPlay',
    scores: [
      { label: 'Integratie', waarde: 5 },
      { label: 'Snelheid', waarde: 5 },
      { label: 'Audio', waarde: 3 },
    ],
  },
  {
    slug: 'akoestische-basis',
    name: 'Akoestische Basis',
    tagline: 'Rust in de cabine, helder aan de telefoon.',
    price: '€ 995,00',
    priceNote: 'Inclusief BTW & Montage',
    priceExcl: '€ 822,- excl. btw',
    short: 'De perfecte upgrade voor rust in de cabine en loepzuivere details.',
    body: 'Het perfecte pakket om de zwakke papieren fabrieksspeakers te elimineren. We vervangen de luidsprekers voorin door een krachtige 2-weg composet. Maar we doen meer dan dat: de deuren worden voorzien van tweelaags premium ontdreuningsmateriaal.',
    features: [
      'Premium 2-weg composet luidsprekers.',
      'Hoogwaardige tweelaags akoestische deurdemping.',
      'Massieve, onverslijtbare montage-ringen.',
      '100% onzichtbare OEM integratie.',
    ],
    cta: 'Kies Basis',
    scores: [
      { label: 'Volume', waarde: 3 },
      { label: 'Bass', waarde: 4 },
      { label: 'Zuiverheid', waarde: 4 },
    ],
  },
  {
    slug: 'oem-plus-executive',
    name: 'The OEM+ Executive',
    tagline: '0% laadruimteverlies. 100% dynamiek.',
    price: '€ 2.195,00',
    priceNote: 'Inclusief BTW & Montage',
    priceExcl: '€ 1.814,- excl. btw',
    populair: true,
    short: 'Voor de veelrijder en echte autoliefhebber die het maximale eist met 0% laadruimteverlies.',
    body: 'Voor de veelrijder en ondernemer. Dit is niet zomaar een speaker-upgrade; dit is een totale herziening van uw akoestiek. Het hart van dit systeem is een geavanceerde Digitale Sound Processor (DSP). Hiermee sturen we elke luidspreker actief aan en corrigeren we de looptijden van het geluid, zodat u letterlijk in het midden van de muziek zit. Aangevuld met een onzichtbare, voelbare subwoofer.',
    features: [
      'Geavanceerde DSP-versterker (Digitale Sound Processor).',
      'Voertuigspecifieke High-End luidsprekerset.',
      'Onzichtbare, ultra-compacte actieve subwoofer.',
      'Extreme drielaags ontdreuning van deuren.',
      'Volledig akoestisch op maat ingemeten.',
    ],
    cta: 'Kies Executive',
    scores: [
      { label: 'Volume', waarde: 4 },
      { label: 'Bass', waarde: 5 },
      { label: 'Zuiverheid', waarde: 5 },
    ],
  },
  {
    slug: 'reference-edition',
    name: 'The Reference Edition',
    tagline: 'Compromisloze audiofiele perfectie.',
    price: 'Vanaf € 3.695,00',
    priceNote: 'Inclusief BTW & Montage',
    priceExcl: 'Vanaf € 3.053,- excl. btw',
    short: 'Ongeëvenaarde audiofiele perfectie voor wie weigert concessies te doen.',
    body: 'Voor de purist die weigert concessies te doen. Dit pakket wordt volledig rondom uw voertuig en muzieksmaak ontworpen. We combineren de absolute wereldtop in versterking en luidsprekers met urenlange, specialistische fase-tuning via de laptop. Inclusief maatwerk subwoofer-behuizingen.',
    features: [
      'High-End 8-kanaals versterker met geïntegreerde DSP.',
      'Absolute wereldtop luidsprekercomponenten.',
      'Op maat gebouwde en beklede subwoofer-behuizing.',
      'Totale ontdreuning (buitenschaal, binnenschaal, paneel).',
      'Urenlange specialistische fase-tuning via laptop.',
    ],
    cta: 'Bespreek maatwerk',
    scores: [
      { label: 'Volume', waarde: 5 },
      { label: 'Bass', waarde: 5 },
      { label: 'Zuiverheid', waarde: 5 },
    ],
  },
  {
    slug: 'akoestische-isolatie',
    name: 'Akoestische Isolatie',
    tagline: 'Alleen op zoek naar stilte?',
    // De oude site toont hier "€ 0,00" — een placeholder van Squarespace.
    price: 'Prijs op aanvraag',
    priceNote: '',
    short: 'Losse, extreme akoestische isolatie-pakketten voor deuren, vloeren en daken.',
    body: 'Heeft u al een premium audiosysteem (zoals Harman Kardon of Dynaudio) maar stoort u zich aan windgeruis, rolgeluiden en rammelende plastic panelen? Wij bieden ook losse, extreme akoestische isolatie-pakketten aan voor deuren, vloeren en daken.',
    features: [],
    cta: 'Informeer naar geluidsisolatie',
    scores: [],
  },
];
