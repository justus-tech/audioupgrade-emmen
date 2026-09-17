/**
 * DE DOORKIJKTEKENING: WAT KOMT WAAR IN DE AUTO.
 *
 * Eén bovenaanzicht van een auto, met per onderdeel een plek en een uitleg.
 * Welke onderdelen oplichten hangt af van het pakket.
 *
 * ==========================================================================
 * WAAROM DIT EEN APART BESTAND IS
 * ==========================================================================
 * Deze gegevens stonden in PakketSchets.astro. Ze staan nu hier, omdat de
 * posters voor aan de muur in het kantoor dezelfde tekening gebruiken — zie
 * scripts/posters.mjs. Twee keer dezelfde auto natekenen betekent dat de
 * poster en de site vroeg of laat iets anders vertellen. Nu komt alles uit
 * één bron: verplaats je hier een speaker, dan verschuift hij op allebei.
 */

/**
 * De carrosserie, van boven gezien met de neus omhoog. Alles binnen een
 * vlak van 440 bij 640, met het midden van de auto op x=220.
 */
export const AUTO = {
  viewBox: '0 0 440 640',
  breedte: 440,
  hoogte: 640,
  omtrek:
    'M 220,28 C 152,32 118,64 114,118 L 108,320 L 112,532 ' +
    'C 116,574 150,596 200,600 L 240,600 ' +
    'C 290,596 324,574 328,532 L 332,320 L 326,118 ' +
    'C 322,64 288,32 220,28 Z',
  /** Voorruit en achterruit. */
  ruiten: [
    'M 152,120 L 288,120 L 272,166 L 168,166 Z',
    'M 168,470 L 272,470 L 292,516 L 148,516 Z',
  ],
  /** Motorkapnaad en de deurnaden links en rechts. */
  dun: [
    'M 138,104 L 302,104',
    'M 108,196 L 128,196 M 108,306 L 128,306 M 110,436 L 130,436',
    'M 332,196 L 312,196 M 332,306 L 312,306 M 330,436 L 310,436',
  ],
  /** Voorstoelen en de achterbank. */
  stoelen: [
    { x: 152, y: 212, breedte: 56, hoogte: 72, rond: 16 },
    { x: 232, y: 212, breedte: 56, hoogte: 72, rond: 16 },
    { x: 152, y: 346, breedte: 136, hoogte: 72, rond: 16 },
  ],
};

/**
 * De onderdelen, met hun plek in de tekening en een uitleg van een paar
 * regels.
 *
 * `spiegel` betekent: teken ook een punt op deze plek aan de andere kant,
 * zonder eigen nummer. Links en rechts horen bij hetzelfde onderdeel.
 */
export const ONDERDELEN = [
  {
    id: 'accu',
    naam: 'Accu en voeding',
    plek: 'In de motorruimte',
    uitleg:
      'Een versterker met subwoofer vraagt stroom die de fabrieksbedrading niet is gaan leveren. Een gezonde accu, een dikkere hoofdkabel met zekering en een goede massaverbinding zorgen dat de spanning niet inzakt — dat hoor je als vastere bas en je ziet het niet terug in dimmende koplampen.',
    x: 166, y: 76,
    pakketten: ['accu-voeding', 'competitie-show'],
  },
  {
    id: 'carplay',
    naam: 'Draadloos CarPlay',
    plek: 'In je originele scherm',
    uitleg:
      'Apple CarPlay en Android Auto draadloos in het scherm dat er al zit. Je stuurknoppen, navigatie en parkeersensoren blijven precies zoals ze waren — er verandert niets zichtbaars aan je dashboard.',
    x: 220, y: 138,
    pakketten: ['carplay-upgrade', 'oem-plus-executive', 'reference-edition', 'competitie-show'],
  },
  {
    id: 'tweeters',
    naam: 'Tweeters',
    plek: 'In de spiegeldriehoek',
    uitleg:
      'De hoge tonen komen los van de deur en gaan naar de spiegeldriehoek. Daardoor zit het geluidsbeeld ineens vóór je op het dashboard in plaats van bij je knieën. Dit is het verschil dat mensen het eerst horen.',
    x: 152, y: 176, spiegel: 288,
    pakketten: ['akoestische-basis', 'oem-plus-executive', 'reference-edition', 'competitie-show'],
  },
  {
    id: 'front',
    naam: 'Speakers voorin',
    plek: 'In beide voordeuren',
    uitleg:
      'Een echte componentenset vervangt de papieren fabrieksspeakers. Wij monteren ze op CNC-gefreesde ringen op de originele bevestigingspunten, dus er wordt niet geboord of gezaagd.',
    x: 140, y: 240, spiegel: 300,
    pakketten: ['akoestische-basis', 'oem-plus-executive', 'reference-edition', 'competitie-show'],
  },
  {
    id: 'rear',
    naam: 'Speakers achterin',
    plek: 'In beide achterdeuren',
    uitleg:
      'Voor wie ook achterin passagiers heeft. Wij stemmen ze bewust terughoudend af, zodat ze het beeld vóór je aanvullen in plaats van het naar achteren trekken.',
    x: 140, y: 370, spiegel: 300,
    pakketten: ['reference-edition', 'competitie-show'],
  },
  {
    id: 'dsp',
    naam: 'DSP-versterker',
    plek: 'Onder de stoel of in de zijwand',
    uitleg:
      'Het hart van de installatie. Geeft de speakers het vermogen waarvoor ze gemaakt zijn en corrigeert met tijdcorrectie het feit dat je dichter bij de linkerdeur zit dan bij de rechter. Onzichtbaar weggewerkt.',
    x: 286, y: 318,
    pakketten: ['oem-plus-executive', 'reference-edition', 'competitie-show'],
  },
  {
    id: 'sub',
    naam: 'Subwoofer',
    plek: 'Onder de stoel of in de reservewielbak',
    uitleg:
      'Het fundament dat de fabriek weglaat. Compact uitgevoerd, zodat je laadvloer vlak blijft en je bagageruimte volledig bruikbaar. Waar hij precies komt hangt van je auto af.',
    x: 220, y: 528,
    pakketten: ['oem-plus-executive', 'reference-edition', 'competitie-show'],
  },
];

/**
 * Dempingszones. Die tonen we als opgelicht paneel in plaats van als punt,
 * want demping zit óp een vlak en niet op één plek.
 */
export const ZONES = [
  {
    id: 'demp-voor',
    naam: 'Demping voordeuren',
    plek: 'Buiten- en binnenblik',
    uitleg:
      'Je deur is een holle bak met open gaten. De achterkant van de speaker straalt daarin en heft de bas grotendeels op. Dichtmaken en dempen levert direct hoorbaar meer bas op, zonder dat er één watt bij komt.',
    x: 120, y: 292,
    vlak: 'M 110,200 L 130,200 L 130,312 L 112,312 Z',
    spiegelVlak: 'M 330,200 L 310,200 L 310,312 L 328,312 Z',
    pakketten: ['akoestische-basis', 'oem-plus-executive', 'reference-edition', 'competitie-show', 'akoestische-isolatie'],
  },
  {
    id: 'demp-achter',
    naam: 'Demping achterdeuren',
    plek: 'Buiten- en binnenblik',
    uitleg:
      'Dezelfde behandeling als voorin. Naast betere bas maakt dit de auto merkbaar stiller op de snelweg, ook als je de muziek uit laat.',
    x: 120, y: 422,
    vlak: 'M 112,332 L 130,332 L 130,442 L 114,442 Z',
    spiegelVlak: 'M 328,332 L 310,332 L 310,442 L 326,442 Z',
    pakketten: ['oem-plus-executive', 'reference-edition', 'competitie-show', 'akoestische-isolatie'],
  },
  {
    id: 'demp-kap',
    naam: 'Demping motorkap',
    plek: 'Tegen motorgeluid',
    uitleg:
      'Houdt motorgeluid buiten de cabine. Vooral merkbaar bij een dieselmotor of als je veel stad rijdt met veel optrekken.',
    x: 220, y: 74,
    vlak: 'M 150,64 L 290,64 L 290,86 L 150,86 Z',
    pakketten: ['akoestische-isolatie'],
  },
  {
    id: 'demp-vloer',
    naam: 'Demping vloer',
    plek: 'Tegen rolgeluid van de banden',
    uitleg:
      'De grootste bron van herrie op de snelweg komt van onderen. Vloerdemping haalt daar hoorbaar wat vanaf, waardoor je zachter kunt luisteren en toch alles hoort.',
    x: 178, y: 446,
    vlak: 'M 140,430 L 300,430 L 300,462 L 140,462 Z',
    pakketten: ['akoestische-isolatie', 'reference-edition', 'competitie-show'],
  },
  {
    id: 'demp-klep',
    naam: 'Demping achterklep',
    plek: 'Tegen resonantie en rammel',
    uitleg:
      'De achterklep werkt als een trommelvel: hij dreunt mee op elke basnoot. Dat klinkt als bas maar het is resonantie, en het maskeert juist de echte lage tonen.',
    x: 220, y: 574,
    vlak: 'M 150,562 L 290,562 L 290,586 L 150,586 Z',
    pakketten: ['reference-edition', 'competitie-show', 'akoestische-isolatie'],
  },
];

/** Nummering loopt van voor naar achter door de auto. */
export const VOLGORDE = [
  'demp-kap', 'accu', 'carplay', 'tweeters', 'front', 'demp-voor',
  'rear', 'demp-achter', 'dsp', 'demp-vloer', 'sub', 'demp-klep',
];

/** Alles bij elkaar, voor wie op id wil opzoeken. */
export const ALLES = [...ONDERDELEN, ...ZONES];

/** De onderdelen van één pakket, in de volgorde van voor naar achter. */
export const schetsVan = (slug) =>
  VOLGORDE.map((id) => ALLES.find((o) => o.id === id))
    .filter((o) => o && o.pakketten.includes(slug));

export default { AUTO, ONDERDELEN, ZONES, VOLGORDE, ALLES, schetsVan };
