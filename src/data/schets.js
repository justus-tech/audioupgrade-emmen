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
 * WAAROM ER GEEN RECHTHOEK MEER IN ZIT
 * ==========================================================================
 * De eerste twee versies waren opgebouwd uit blokjes met ronde hoeken: een
 * blokje voor een stoel, een blokje voor een wiel. Dat tekent snel, maar je
 * ziet het meteen — een auto heeft nergens een rechte hoek, en een tekening
 * die daar wel vol mee staat ziet eruit als een plattegrond.
 *
 * Alles hieronder is daarom een pad met bochten. Geen enkele rechthoek. De
 * stoelen hebben zijwangen en een hoofdsteun, de spiegels hebben glas, de
 * banden hebben een spoor en de deuren hebben grepen. Juist die details
 * maken het verschil tussen een schets en een tekening.
 *
 * ==========================================================================
 * SPIEGELEN IN PLAATS VAN TWEE KEER TEKENEN
 * ==========================================================================
 * Een auto is symmetrisch, en niets verraadt handwerk zo hard als een
 * rechterstoel die drie eenheden lager staat dan de linker. Daarom tekenen
 * we alles wat dubbel voorkomt maar één keer, aan de rechterkant, met
 * `helft: true`. De linkerkant rolt er vanzelf uit via spiegelPad().
 *
 * Dat werkt alleen als de paden zich aan de afspraak houden: uitsluitend
 * M, L, C en Z, met absolute coördinaten. Een boog (A) zou bij het spiegelen
 * de verkeerde kant op bollen, dus die gebruiken we nergens.
 *
 * Het blijft een röntgenfoto: het dak is er wel, maar je kijkt er doorheen.
 * Anders kun je niet laten zien wat er ónder de bekleding gebeurt, en daar
 * gaat deze hele tekening over.
 */

const BREEDTE = 440;
const HOOGTE = 680;

/**
 * Spiegelt een pad om de middenas van de auto: elke x wordt 440 min x, elke
 * y blijft staan. Werkt op M, L en C; Z blijft gewoon Z.
 */
export const spiegelPad = (d) =>
  d
    .replace(/([MLC])([^MLCZ]*)/g, (_, letter, rest) => {
      const getallen = rest.trim().split(/[\s,]+/).filter(Boolean).map(Number);
      const om = getallen.map((n, i) => (i % 2 === 0 ? BREEDTE - n : n));
      return `${letter} ${om.join(' ')} `;
    })
    .replace(/\s+/g, ' ')
    .trim();

/**
 * De auto van boven, met de neus omhoog. `klasse` bepaalt de lijndikte en de
 * doorzichtigheid; die staan in PakketSchets.astro en in scripts/posters.mjs.
 * `helft: true` betekent: dit pad hoort ook aan de andere kant.
 */
const VORMEN = [
  /* ---------------------------------------------------------- buitenkant */
  /* De carrosserie. Smal bij de neus, het breedst bij de voordeuren, met
     bumperhoeken in plaats van een ovaal. */
  {
    klasse: 'omtrek',
    d:
      'M 220 18 C 250 18 272 22 286 30 C 304 40 316 60 321 86 ' +
      'C 326 112 329 142 330 176 C 332 220 333 266 333 320 ' +
      'C 333 374 332 424 330 464 C 329 498 326 528 321 554 ' +
      'C 316 580 304 600 286 610 C 272 618 250 622 220 622 ' +
      'C 190 622 168 618 154 610 C 136 600 124 580 119 554 ' +
      'C 114 528 111 498 110 464 C 108 424 107 374 107 320 ' +
      'C 107 266 108 220 110 176 C 111 142 114 112 119 86 ' +
      'C 124 60 136 40 154 30 C 168 22 190 18 220 18 Z',
  },

  /* Voorbumper, grille en motorkap. */
  { klasse: 'paneel', d: 'M 116 106 C 120 76 140 54 170 44 C 186 39 254 39 270 44 C 300 54 320 76 324 106' },
  { klasse: 'detail', d: 'M 190 32 C 206 28 234 28 250 32 L 248 44 C 234 40 206 40 192 44 Z' },
  { klasse: 'paneel', d: 'M 128 158 C 131 116 148 84 178 70 C 192 64 248 64 262 70 C 292 84 309 116 312 158 Z' },
  { klasse: 'detail', helft: true, d: 'M 266 78 C 288 96 300 126 302 156' },
  { klasse: 'lamp', helft: true, d: 'M 284 58 C 300 68 313 86 318 106 L 308 110 C 303 92 292 76 278 66 Z' },

  /* Voorruit, met de wisser op de schutplaat ervoor. */
  {
    klasse: 'ruit',
    d:
      'M 146 162 C 176 153 264 153 294 162 C 292 180 290 196 289 212 ' +
      'C 244 205 196 205 151 212 C 150 196 148 180 146 162 Z',
  },
  { klasse: 'detail', helft: true, d: 'M 292 168 C 272 178 248 185 226 187' },

  /* Het dak, de achterruit en de hoedenplank eronder. */
  {
    klasse: 'dak',
    d:
      'M 151 212 C 147 262 147 362 151 412 C 196 404 244 404 289 412 ' +
      'C 293 362 293 262 289 212 C 244 205 196 205 151 212 Z',
  },
  {
    klasse: 'ruit',
    d:
      'M 151 412 C 196 404 244 404 289 412 C 293 432 297 452 300 470 ' +
      'C 246 461 194 461 140 470 C 143 452 147 432 151 412 Z',
  },
  { klasse: 'detail', d: 'M 146 466 C 196 458 244 458 294 466' },
  { klasse: 'detail', d: 'M 238 424 C 232 440 224 450 212 456' },
  { klasse: 'detail', d: 'M 316 451 C 320 451 323 454 323 458 C 323 462 320 465 316 465 C 312 465 309 462 309 458 C 309 454 312 451 316 451 Z' },

  /* Achterklep, achterbumper, achterlichten en uitlaten. */
  {
    klasse: 'paneel',
    d:
      'M 134 480 C 180 471 260 471 306 480 C 308 516 306 550 300 574 ' +
      'C 250 566 190 566 140 574 C 134 550 132 516 134 480 Z',
  },
  { klasse: 'paneel', d: 'M 116 544 C 120 574 140 596 170 606 C 186 611 254 611 270 606 C 300 596 320 574 324 544' },
  { klasse: 'lamp', helft: true, d: 'M 286 594 C 302 584 314 566 319 546 L 309 542 C 304 560 293 576 279 586 Z' },
  {
    klasse: 'vulling', helft: true,
    d: 'M 250 611 C 258 611 262 613 262 616 C 262 619 258 621 250 621 C 242 621 238 619 238 616 C 238 613 242 611 250 611 Z',
  },

  /* De deurnaden lopen van de carrosserie naar de raamlijn. */
  { klasse: 'paneel', helft: true, d: 'M 331 214 C 318 213 304 211 291 210' },
  { klasse: 'paneel', helft: true, d: 'M 333 330 C 320 330 305 329 291 328' },
  { klasse: 'paneel', helft: true, d: 'M 331 444 C 319 444 304 443 290 442' },

  /* Deurgrepen. Klein detail, maar je oog leest er meteen 'auto' in. */
  {
    klasse: 'vulling', helft: true,
    d: 'M 322 296 C 326 296 328 299 328 302 C 328 305 326 308 322 308 L 310 308 C 306 308 304 305 304 302 C 304 299 306 296 310 296 Z',
  },
  {
    klasse: 'vulling', helft: true,
    d: 'M 320 404 C 324 404 326 407 326 410 C 326 413 324 416 320 416 L 308 416 C 304 416 302 413 302 410 C 302 407 304 404 308 404 Z',
  },

  /* De buitenspiegels, met het glas erin. */
  {
    klasse: 'spiegelkap', helft: true,
    d: 'M 331 202 C 344 197 357 198 362 204 C 366 209 366 219 362 224 C 357 230 344 231 331 226 C 333 218 333 210 331 202 Z',
  },
  { klasse: 'detail', helft: true, d: 'M 340 206 C 350 204 357 206 360 210' },

  /* De banden komen onder de wielkasten vandaan. */
  {
    klasse: 'wiel', helft: true,
    d: 'M 327 126 C 338 126 344 132 344 142 L 344 174 C 344 184 338 190 327 190 C 329 168 329 148 327 126 Z',
  },
  {
    klasse: 'wiel', helft: true,
    d: 'M 327 452 C 338 452 344 458 344 468 L 344 500 C 344 510 338 516 327 516 C 329 494 329 474 327 452 Z',
  },
  { klasse: 'detail', helft: true, d: 'M 324 122 C 318 142 318 174 324 194' },
  { klasse: 'detail', helft: true, d: 'M 324 448 C 318 468 318 500 324 520' },
  { klasse: 'detail', helft: true, d: 'M 336 134 L 336 182' },
  { klasse: 'detail', helft: true, d: 'M 336 460 L 336 508' },

  /* ---------------------------------------------------------- binnenkant */
  /* Het dashboard, met de tellerbak en het stuur links erachter. */
  { klasse: 'detail', d: 'M 152 214 C 196 226 244 226 288 214' },
  { klasse: 'detail', d: 'M 155 232 C 196 242 244 242 285 232' },
  { klasse: 'detail', d: 'M 166 228 C 172 224 196 224 202 228 C 202 236 198 240 184 240 C 170 240 166 236 166 228 Z' },
  { klasse: 'detail', d: 'M 208 216 C 214 215 226 215 232 216 C 233 220 233 224 232 228 C 226 229 214 229 208 228 C 207 224 207 220 208 216 Z' },
  { klasse: 'stuur', d: 'M 184 236 C 193 236 200 243 200 252 C 200 261 193 268 184 268 C 175 268 168 261 168 252 C 168 243 175 236 184 236 Z' },
  { klasse: 'stuur', d: 'M 184 246 C 187 246 190 249 190 252 C 190 255 187 258 184 258 C 181 258 178 255 178 252 C 178 249 181 246 184 246 Z' },
  { klasse: 'stuur', d: 'M 178 249 L 172 245' },
  { klasse: 'stuur', d: 'M 190 249 L 196 245' },
  { klasse: 'stuur', d: 'M 184 258 L 184 266' },

  /* De middenconsole met de pook en twee bekerhouders. */
  { klasse: 'console', d: 'M 208 234 C 214 232 226 232 232 234 C 234 262 234 292 232 312 C 226 314 214 314 208 312 C 206 292 206 262 208 234 Z' },
  { klasse: 'detail', d: 'M 220 266 C 223 266 226 269 226 272 C 226 275 223 278 220 278 C 217 278 214 275 214 272 C 214 269 217 266 220 266 Z' },
  { klasse: 'detail', helft: true, d: 'M 226 288 C 229 288 231 290 231 293 C 231 296 229 298 226 298 C 223 298 221 296 221 293 C 221 290 223 288 226 288 Z' },

  /* De voorstoelen: zitting, rugleuning met zijwangen, en de hoofdsteun. */
  {
    klasse: 'stoel', helft: true,
    d: 'M 234 240 C 234 235 237 232 242 232 L 270 232 C 275 232 278 235 278 240 C 280 252 280 266 278 278 L 234 278 C 232 266 232 252 234 240 Z',
  },
  {
    klasse: 'stoel', helft: true,
    d:
      'M 231 280 C 231 276 234 274 238 274 L 274 274 C 278 274 281 276 281 280 ' +
      'C 282 292 282 304 280 314 C 279 318 275 320 271 320 L 241 320 ' +
      'C 237 320 233 318 232 314 C 230 304 230 292 231 280 Z',
  },
  { klasse: 'detail', helft: true, d: 'M 240 280 C 238 292 238 304 240 314' },
  { klasse: 'detail', helft: true, d: 'M 272 280 C 274 292 274 304 272 314' },
  {
    klasse: 'kussen', helft: true,
    d: 'M 244 313 C 244 310 246 308 250 307 C 254 306 258 306 262 307 C 266 308 268 310 268 313 ' +
       'C 269 319 269 325 268 329 C 267 331 264 332 261 332 L 251 332 C 248 332 245 331 244 329 ' +
       'C 243 325 243 319 244 313 Z',
  },

  /* De achterbank, met de deling erin en drie hoofdsteunen. */
  {
    klasse: 'stoel',
    d: 'M 158 346 C 158 342 161 340 166 340 L 274 340 C 279 340 282 342 282 346 C 283 358 283 370 282 378 L 158 378 C 157 370 157 358 158 346 Z',
  },
  {
    klasse: 'stoel',
    d:
      'M 156 380 C 156 376 159 374 163 374 L 277 374 C 281 374 284 376 284 380 ' +
      'C 285 392 285 402 283 410 C 282 413 278 415 274 415 L 166 415 ' +
      'C 162 415 158 413 157 410 C 155 402 155 392 156 380 Z',
  },
  { klasse: 'detail', helft: true, d: 'M 242 344 L 242 412' },
  {
    klasse: 'kussen', helft: true,
    d: 'M 246 396 C 246 393 248 391 252 390 C 256 389 260 389 264 390 C 268 391 270 393 270 396 ' +
       'C 271 401 271 407 270 411 C 269 413 266 414 263 414 L 253 414 C 250 414 247 413 246 411 ' +
       'C 245 407 245 401 246 396 Z',
  },
  {
    klasse: 'kussen',
    d: 'M 212 398 C 212 395 214 393 217 393 L 223 393 C 226 393 228 395 228 398 ' +
       'C 229 403 229 408 228 411 C 227 413 225 414 222 414 L 218 414 C 215 414 213 413 212 411 ' +
       'C 211 408 211 403 212 398 Z',
  },

  /* De kofferbakvloer. */
  { klasse: 'detail', d: 'M 140 498 C 190 490 250 490 300 498' },
];

/* De linkerhelft rolt hier uit de rechterhelft. */
const paden = [];
for (const vorm of VORMEN) {
  paden.push({ klasse: vorm.klasse, d: vorm.d });
  if (vorm.helft) paden.push({ klasse: vorm.klasse, d: spiegelPad(vorm.d) });
}

export const AUTO = {
  viewBox: `0 0 ${BREEDTE} ${HOOGTE}`,
  breedte: BREEDTE,
  hoogte: HOOGTE,
  paden,
};

/**
 * ==========================================================================
 * DE WERKTEKENING: HARTLIJN, ASSEN EN MAATVOERING
 * ==========================================================================
 * Een tekening van een onderdeel dat nog gebouwd moet worden ziet er anders
 * uit dan een plaatje van iets dat al bestaat: er staan hartlijnen in, de
 * assen zijn aangegeven, en de maten staan erbij met pijlen. Dat is precies
 * wat deze installatie is — hij bestaat nog niet, hij wordt gebouwd.
 *
 * De maten hieronder zijn uit de tekening zelf gerekend. Verplaats je een
 * as, dan verspringt de maat mee; er staat dus nooit iets anders op papier
 * dan wat je ziet.
 */

/** Tekeneenheden per meter. De carrosserie is 226 breed, oftewel 1,82 m. */
export const METER = 124;

/** Een maat in meters, zoals wij hem schrijven: 2,63 m. */
export const inMeters = (eenheden) => `${(eenheden / METER).toFixed(2).replace('.', ',')} m`;

/** De maten van de referentiecarrosserie, in tekeneenheden. */
export const MATEN = {
  lengte: { van: 18, tot: 622 },
  breedte: { van: 107, tot: 333 },
  wielbasis: { van: 158, tot: 484 },
};

/**
 * Hartlijn, aslijnen en de kruisjes op de wielhartten. Streep-punt, zoals
 * het hoort: zo zie je meteen dat het hulplijnen zijn en geen onderdelen.
 */
export const HULPLIJNEN = {
  hart: `M 220 4 L 220 ${HOOGTE - 24}`,
  assen: [
    `M 92 ${MATEN.wielbasis.van} L 348 ${MATEN.wielbasis.van}`,
    `M 92 ${MATEN.wielbasis.tot} L 348 ${MATEN.wielbasis.tot}`,
  ],
  kruizen: [
    'M 105 146 L 105 170', 'M 335 146 L 335 170',
    'M 105 472 L 105 496', 'M 335 472 L 335 496',
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
    x: 168, y: 112,
    pakketten: ['accu-voeding', 'competitie-show'],
  },
  {
    id: 'carplay',
    naam: 'Draadloos CarPlay',
    plek: 'In je originele scherm',
    uitleg:
      'Apple CarPlay en Android Auto draadloos in het scherm dat er al zit. Je stuurknoppen, navigatie en parkeersensoren blijven precies zoals ze waren — er verandert niets zichtbaars aan je dashboard.',
    x: 220, y: 224,
    /* Alleen bij de losse optie. Justus, 26 september 2026: CarPlay blijft
       iets dat je erbij kiest, geen onderdeel van de grote pakketten. */
    pakketten: ['carplay-upgrade'],
  },
  {
    id: 'tweeters',
    naam: 'Tweeters',
    plek: 'In de spiegeldriehoek',
    uitleg:
      'De hoge tonen komen los van de deur en gaan naar de spiegeldriehoek. Daardoor zit het geluidsbeeld ineens vóór je op het dashboard in plaats van bij je knieën. Dit is het verschil dat mensen het eerst horen.',
    x: 150, y: 214, spiegel: 290,
    pakketten: ['akoestische-basis', 'oem-plus-executive', 'reference-edition', 'competitie-show'],
  },
  {
    id: 'front',
    naam: 'Speakers voorin',
    plek: 'In beide voordeuren',
    uitleg:
      'Een echte componentenset vervangt de papieren fabrieksspeakers. Wij monteren ze op CNC-gefreesde ringen op de originele bevestigingspunten, dus er wordt niet geboord of gezaagd.',
    x: 128, y: 268, spiegel: 312,
    pakketten: ['akoestische-basis', 'oem-plus-executive', 'reference-edition', 'competitie-show'],
  },
  {
    id: 'rear',
    naam: 'Speakers achterin',
    plek: 'In beide achterdeuren',
    uitleg:
      'Voor wie ook achterin passagiers heeft. Wij stemmen ze bewust terughoudend af, zodat ze het beeld vóór je aanvullen in plaats van het naar achteren trekken.',
    x: 128, y: 380, spiegel: 312,
    pakketten: ['reference-edition', 'competitie-show'],
  },
  {
    id: 'dsp',
    naam: 'DSP-versterker',
    plek: 'Onder de stoel of in de zijwand',
    /* Bij een showopbouw is de versterker juist het pronkstuk; zo staat het
       ook in de tekst van dat pakket. */
    plekPer: {
      'competitie-show': 'Zichtbaar achter plexiglas, in de kofferbak',
    },
    uitleg:
      'Het hart van de installatie. Geeft de speakers het vermogen waarvoor ze gemaakt zijn en corrigeert met tijdcorrectie het feit dat je dichter bij de linkerdeur zit dan bij de rechter. Onzichtbaar weggewerkt.',
    x: 302, y: 486,
    pakketten: ['oem-plus-executive', 'reference-edition', 'competitie-show'],
  },
  {
    id: 'sub',
    naam: 'Subwoofer',
    /**
     * DE SUBWOOFER IS NIET IN ELK PAKKET DEZELFDE.
     *
     * De compacte variant onder de stoel hoort bij de Executive. Bij de
     * Reference komt er een eigen behuizing, en bij een showopbouw is die
     * behuizing juist onderdeel van het ontwerp. Stond hier één tekst voor
     * alle drie, dan beloofde de site bij de Reference een vlakke laadvloer
     * die daar niet altijd te geven is.
     */
    plek: 'Onder de stoel of in de reservewielbak',
    plekPer: {
      'reference-edition': 'In een eigen behuizing, de plek verschilt per auto',
      'competitie-show': 'In een eigen behuizing in de kofferbak',
    },
    uitleg:
      'Het fundament dat de fabriek weglaat. Compact uitgevoerd, zodat je laadvloer vlak blijft en je bagageruimte volledig bruikbaar. Waar hij precies komt hangt van je auto af.',
    uitlegPer: {
      'reference-edition': 'Het fundament dat de fabriek weglaat. Bij dit pakket komt hij in een eigen behuizing, op maat gebouwd voor jouw auto. Waar hij precies komt hangt van je auto af, en reken erop dat hij ruimte in de kofferbak vraagt.',
      'competitie-show': 'Het fundament dat de fabriek weglaat. Bij een showopbouw is de behuizing onderdeel van het ontwerp: hij staat in de kofferbak, in het zicht, en sluit in vorm en bekleding aan op je interieur.',
    },
    x: 220, y: 494,
    pakketten: ['oem-plus-executive', 'reference-edition', 'competitie-show'],
  },
];

/* De deurstroken staan apart, want links is precies de spiegeling van
   rechts en dat willen we niet twee keer intikken. */
const DEUR_VOOR = 'M 112 224 C 110 256 109 292 109 326 L 137 328 C 138 292 139 256 141 226 Z';
const DEUR_ACHTER = 'M 109 340 C 108 374 109 408 111 440 L 139 438 C 138 406 137 374 138 342 Z';

/**
 * Dempingszones. Die tonen we als opgelicht vlak in plaats van als punt,
 * en met `zacht: true` een tint lichter: een deurstrook is een handbreedte
 * breed, maar de motorkap en de vloer beslaan een halve auto. Even hard
 * inkleuren zou de tekening eronder bedelven.
 * want demping zit óp een vlak en niet op één plek. De vlakken worden ónder
 * de auto getekend, zodat de lijnen van de deur en de stoelen er dwars
 * overheen blijven lopen — precies zoals het in het echt zit.
 */
export const ZONES = [
  {
    id: 'demp-voor',
    naam: 'Demping voordeuren',
    plek: 'Buiten- en binnenblik',
    uitleg:
      'Je deur is een holle bak met open gaten. De achterkant van de speaker straalt daarin en heft de bas grotendeels op. Dichtmaken en dempen levert direct hoorbaar meer bas op, zonder dat er één watt bij komt.',
    x: 128, y: 326,
    vlakken: [DEUR_VOOR, spiegelPad(DEUR_VOOR)],
    pakketten: ['akoestische-basis', 'oem-plus-executive', 'reference-edition', 'competitie-show', 'akoestische-isolatie'],
  },
  {
    id: 'demp-achter',
    naam: 'Demping achterdeuren',
    plek: 'Buiten- en binnenblik',
    uitleg:
      'Dezelfde behandeling als voorin. Naast betere bas maakt dit de auto merkbaar stiller op de snelweg, ook als je de muziek uit laat.',
    x: 128, y: 438,
    vlakken: [DEUR_ACHTER, spiegelPad(DEUR_ACHTER)],
    pakketten: ['oem-plus-executive', 'reference-edition', 'competitie-show', 'akoestische-isolatie'],
  },
  {
    id: 'demp-kap',
    zacht: true,
    naam: 'Demping motorkap',
    plek: 'Tegen motorgeluid',
    uitleg:
      'Houdt motorgeluid buiten de cabine. Vooral merkbaar bij een dieselmotor of als je veel stad rijdt met veel optrekken.',
    x: 262, y: 112,
    vlakken: [
      'M 140 102 C 150 86 172 76 190 74 C 206 72 234 72 250 74 C 268 76 290 86 300 102 ' +
      'C 304 120 306 138 307 154 L 133 154 C 134 138 136 120 140 102 Z',
    ],
    pakketten: ['akoestische-isolatie'],
  },
  {
    id: 'demp-vloer',
    zacht: true,
    naam: 'Demping vloer',
    plek: 'Tegen rolgeluid van de banden',
    uitleg:
      'De grootste bron van herrie op de snelweg komt van onderen. Vloerdemping haalt daar hoorbaar wat vanaf, waardoor je zachter kunt luisteren en toch alles hoort.',
    x: 220, y: 334,
    vlakken: [
      'M 154 240 C 150 300 150 360 154 412 C 196 404 244 404 286 412 ' +
      'C 290 360 290 300 286 240 C 244 232 196 232 154 240 Z',
    ],
    pakketten: ['akoestische-isolatie', 'reference-edition', 'competitie-show'],
  },
  {
    id: 'demp-klep',
    naam: 'Demping achterklep',
    plek: 'Tegen resonantie en rammel',
    uitleg:
      'De achterklep werkt als een trommelvel: hij dreunt mee op elke basnoot. Dat klinkt als bas maar het is resonantie, en het maskeert juist de echte lage tonen.',
    x: 220, y: 552,
    vlakken: [
      'M 152 526 C 194 518 246 518 288 526 C 290 542 289 558 286 572 ' +
      'C 244 564 196 564 154 572 C 151 558 150 542 152 526 Z',
    ],
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

export default {
  AUTO, ONDERDELEN, ZONES, VOLGORDE, ALLES, schetsVan, spiegelPad,
  METER, MATEN, HULPLIJNEN, inMeters,
};
