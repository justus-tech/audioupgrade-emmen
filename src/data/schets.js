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
 *
 * ==========================================================================
 * DE TWEEDE TEKENING
 * ==========================================================================
 * De eerste auto was een afgeronde rechthoek met drie blokjes erin. Hij was
 * duidelijk, maar hij leek niet op een auto — en bij een upgrade van 3.695
 * euro hoort geen tekening die eruitziet als een plattegrond van een schuur.
 *
 * Wat deze wél heeft, en wat hem leesbaar maakt als auto:
 *   - een carrosserie met bumperhoeken in plaats van een ovaal;
 *   - buitenspiegels, het detail waaraan je een auto van bovenaf herkent;
 *   - wielen die onder de wielkasten vandaan piepen;
 *   - een dashboard met het stuur links erachter, zodat je meteen ziet waar
 *     de bestuurder zit;
 *   - stoelen met de hoofdsteun aan de achterkant, want daar kijk je van
 *     bovenaf op neer.
 *
 * Het blijft een röntgenfoto: het dak is er wel, maar je kijkt er doorheen.
 * Anders kun je niet laten zien wat er ónder de bekleding gebeurt, en daar
 * gaat deze hele tekening over.
 */

/**
 * De auto, van boven gezien met de neus omhoog. Alles binnen een vlak van
 * 440 bij 640, met het midden van de auto op x=220.
 *
 * `vormen` zijn paden, `blokken` zijn rechthoeken met ronde hoeken. De
 * klasse bepaalt hoe dik en hoe licht een lijn wordt getekend; die staan in
 * PakketSchets.astro en in scripts/posters.mjs.
 */
export const AUTO = {
  viewBox: '0 0 440 640',
  breedte: 440,
  hoogte: 640,

  vormen: [
    /* De carrosserie. Smal bij de neus, het breedst bij de voordeuren, en
       naar achteren weer iets smaller — dat is wat een auto een auto maakt. */
    {
      klasse: 'omtrek',
      d:
        'M 172 24 C 196 16 244 16 268 24 C 296 32 314 56 320 92 ' +
        'C 326 128 330 170 331 220 C 333 280 333 360 331 420 ' +
        'C 330 470 326 512 320 548 C 314 584 296 608 268 616 ' +
        'C 244 624 196 624 172 616 C 144 608 126 584 120 548 ' +
        'C 114 512 110 470 109 420 C 107 360 107 280 109 220 ' +
        'C 110 170 114 128 120 92 C 126 56 144 32 172 24 Z',
    },

    /* Voorruit en achterruit: allebei smaller bij het dak dan bij de kap. */
    { klasse: 'ruit', d: 'M 140 166 L 300 166 L 290 216 L 150 216 Z' },
    { klasse: 'ruit', d: 'M 150 416 L 290 416 L 302 470 L 138 470 Z' },

    /* Het dak ertussen. */
    { klasse: 'dak', d: 'M 150 216 C 148 280 148 352 150 416 L 290 416 C 292 352 292 280 290 216 Z' },

    /* Bumpers, motorkapnaad en de naad van de achterklep. */
    { klasse: 'dun', d: 'M 128 70 C 152 40 288 40 312 70' },
    { klasse: 'dun', d: 'M 130 578 C 154 606 286 606 310 578' },
    { klasse: 'dun', d: 'M 142 94 C 174 80 266 80 298 94' },
    { klasse: 'dun', d: 'M 146 536 C 176 548 264 548 294 536' },

    /* Koplampen. Twee streepjes, maar ze doen veel voor de herkenbaarheid. */
    { klasse: 'dun', d: 'M 134 88 C 144 68 160 54 180 46' },
    { klasse: 'dun', d: 'M 306 88 C 296 68 280 54 260 46' },

    /* De deurnaden: alleen op de dorpel, tussen carrosserie en dak. */
    { klasse: 'dun', d: 'M 108 216 L 150 216 M 107 340 L 149 340 M 109 452 L 149 452' },
    { klasse: 'dun', d: 'M 332 216 L 290 216 M 333 340 L 291 340 M 331 452 L 291 452' },

    /* De buitenspiegels. */
    { klasse: 'spiegelkap', d: 'M 110 212 L 88 206 C 83 205 80 208 80 213 L 80 222 C 80 227 83 230 88 229 L 111 224 Z' },
    { klasse: 'spiegelkap', d: 'M 330 212 L 352 206 C 357 205 360 208 360 213 L 360 222 C 360 227 357 230 352 229 L 329 224 Z' },

    /* Het stuur, links. Meteen duidelijk welke kant de voorkant is. */
    /* Het dashboard, met het stuur er links achter. */
    { klasse: 'dun', d: 'M 152 218 C 190 230 250 230 288 218' },
    { klasse: 'stuur', d: 'M 184 244 m -14 0 a 14 14 0 1 0 28 0 a 14 14 0 1 0 -28 0' },
    { klasse: 'stuur', d: 'M 170 246 L 198 246' },
    /* De deling in de achterbank. */
    { klasse: 'dun', d: 'M 208 356 L 208 408' },
  ],

  /* Wielen, stoelen, hoofdsteunen en de middenconsole. */
  blokken: [
    { klasse: 'wiel', x: 101, y: 124, breedte: 16, hoogte: 66, rond: 8 },
    { klasse: 'wiel', x: 323, y: 124, breedte: 16, hoogte: 66, rond: 8 },
    { klasse: 'wiel', x: 101, y: 450, breedte: 16, hoogte: 66, rond: 8 },
    { klasse: 'wiel', x: 323, y: 450, breedte: 16, hoogte: 66, rond: 8 },

    { klasse: 'stoel', x: 158, y: 240, breedte: 52, hoogte: 62, rond: 12 },
    { klasse: 'hoofdsteun', x: 168, y: 292, breedte: 32, hoogte: 14, rond: 6 },
    { klasse: 'stoel', x: 230, y: 240, breedte: 52, hoogte: 62, rond: 12 },
    { klasse: 'hoofdsteun', x: 240, y: 292, breedte: 32, hoogte: 14, rond: 6 },

    { klasse: 'console', x: 212, y: 250, breedte: 16, hoogte: 52, rond: 6 },

    { klasse: 'stoel', x: 160, y: 352, breedte: 120, hoogte: 60, rond: 12 },
    { klasse: 'hoofdsteun', x: 170, y: 398, breedte: 28, hoogte: 13, rond: 5 },
    { klasse: 'hoofdsteun', x: 242, y: 398, breedte: 28, hoogte: 13, rond: 5 },
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
    x: 168, y: 118,
    pakketten: ['accu-voeding', 'competitie-show'],
  },
  {
    id: 'carplay',
    naam: 'Draadloos CarPlay',
    plek: 'In je originele scherm',
    uitleg:
      'Apple CarPlay en Android Auto draadloos in het scherm dat er al zit. Je stuurknoppen, navigatie en parkeersensoren blijven precies zoals ze waren — er verandert niets zichtbaars aan je dashboard.',
    x: 222, y: 228,
    pakketten: ['carplay-upgrade', 'oem-plus-executive', 'reference-edition', 'competitie-show'],
  },
  {
    id: 'tweeters',
    naam: 'Tweeters',
    plek: 'In de spiegeldriehoek',
    uitleg:
      'De hoge tonen komen los van de deur en gaan naar de spiegeldriehoek. Daardoor zit het geluidsbeeld ineens vóór je op het dashboard in plaats van bij je knieën. Dit is het verschil dat mensen het eerst horen.',
    x: 148, y: 216, spiegel: 292,
    pakketten: ['akoestische-basis', 'oem-plus-executive', 'reference-edition', 'competitie-show'],
  },
  {
    id: 'front',
    naam: 'Speakers voorin',
    plek: 'In beide voordeuren',
    uitleg:
      'Een echte componentenset vervangt de papieren fabrieksspeakers. Wij monteren ze op CNC-gefreesde ringen op de originele bevestigingspunten, dus er wordt niet geboord of gezaagd.',
    x: 128, y: 264, spiegel: 312,
    pakketten: ['akoestische-basis', 'oem-plus-executive', 'reference-edition', 'competitie-show'],
  },
  {
    id: 'rear',
    naam: 'Speakers achterin',
    plek: 'In beide achterdeuren',
    uitleg:
      'Voor wie ook achterin passagiers heeft. Wij stemmen ze bewust terughoudend af, zodat ze het beeld vóór je aanvullen in plaats van het naar achteren trekken.',
    x: 128, y: 378, spiegel: 312,
    pakketten: ['reference-edition', 'competitie-show'],
  },
  {
    id: 'dsp',
    naam: 'DSP-versterker',
    plek: 'Onder de stoel of in de zijwand',
    uitleg:
      'Het hart van de installatie. Geeft de speakers het vermogen waarvoor ze gemaakt zijn en corrigeert met tijdcorrectie het feit dat je dichter bij de linkerdeur zit dan bij de rechter. Onzichtbaar weggewerkt.',
    x: 302, y: 500,
    pakketten: ['oem-plus-executive', 'reference-edition', 'competitie-show'],
  },
  {
    id: 'sub',
    naam: 'Subwoofer',
    plek: 'Onder de stoel of in de reservewielbak',
    uitleg:
      'Het fundament dat de fabriek weglaat. Compact uitgevoerd, zodat je laadvloer vlak blijft en je bagageruimte volledig bruikbaar. Waar hij precies komt hangt van je auto af.',
    x: 220, y: 510,
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
    x: 128, y: 322,
    vlak: 'M 116 224 L 142 224 L 142 332 L 114 332 Z',
    spiegelVlak: 'M 324 224 L 298 224 L 298 332 L 326 332 Z',
    pakketten: ['akoestische-basis', 'oem-plus-executive', 'reference-edition', 'competitie-show', 'akoestische-isolatie'],
  },
  {
    id: 'demp-achter',
    naam: 'Demping achterdeuren',
    plek: 'Buiten- en binnenblik',
    uitleg:
      'Dezelfde behandeling als voorin. Naast betere bas maakt dit de auto merkbaar stiller op de snelweg, ook als je de muziek uit laat.',
    x: 128, y: 434,
    vlak: 'M 115 348 L 141 348 L 141 448 L 117 448 Z',
    spiegelVlak: 'M 325 348 L 299 348 L 299 448 L 323 448 Z',
    pakketten: ['oem-plus-executive', 'reference-edition', 'competitie-show', 'akoestische-isolatie'],
  },
  {
    id: 'demp-kap',
    naam: 'Demping motorkap',
    plek: 'Tegen motorgeluid',
    uitleg:
      'Houdt motorgeluid buiten de cabine. Vooral merkbaar bij een dieselmotor of als je veel stad rijdt met veel optrekken.',
    x: 258, y: 118,
    vlak: 'M 150 96 L 290 96 L 290 140 L 150 140 Z',
    pakketten: ['akoestische-isolatie'],
  },
  {
    id: 'demp-vloer',
    naam: 'Demping vloer',
    plek: 'Tegen rolgeluid van de banden',
    uitleg:
      'De grootste bron van herrie op de snelweg komt van onderen. Vloerdemping haalt daar hoorbaar wat vanaf, waardoor je zachter kunt luisteren en toch alles hoort.',
    x: 200, y: 440,
    vlak: 'M 162 424 L 278 424 L 278 456 L 162 456 Z',
    pakketten: ['akoestische-isolatie', 'reference-edition', 'competitie-show'],
  },
  {
    id: 'demp-klep',
    naam: 'Demping achterklep',
    plek: 'Tegen resonantie en rammel',
    uitleg:
      'De achterklep werkt als een trommelvel: hij dreunt mee op elke basnoot. Dat klinkt als bas maar het is resonantie, en het maskeert juist de echte lage tonen.',
    x: 220, y: 566,
    vlak: 'M 152 546 L 288 546 L 288 586 L 152 586 Z',
    pakketten: ['reference-edition', 'competitie-show', 'akoestische-isolatie'],
  },
];

/** Nummering loopt van voor naar achter door de auto. */
export const VOLGORDE = [
  'demp-kap', 'accu', 'carplay', 'tweeters', 'front', 'demp-voor',
  'rear', 'demp-achter', 'demp-vloer', 'dsp', 'sub', 'demp-klep',
];

/** Alles bij elkaar, voor wie op id wil opzoeken. */
export const ALLES = [...ONDERDELEN, ...ZONES];

/** De onderdelen van één pakket, in de volgorde van voor naar achter. */
export const schetsVan = (slug) =>
  VOLGORDE.map((id) => ALLES.find((o) => o.id === id))
    .filter((o) => o && o.pakketten.includes(slug));

export default { AUTO, ONDERDELEN, ZONES, VOLGORDE, ALLES, schetsVan };
