/**
 * De carrosserievormen voor de schetsen — één bron voor alle tekeningen.
 *
 * Zowel de losse autoschets als de doorkijk per pakket tekent hiermee, zodat
 * een aanpassing aan een vorm overal tegelijk doorwerkt.
 *
 * Tekengebied: viewBox "0 0 400 170", auto met de neus naar LINKS.
 */

export const WIELEN = [
  { x: 112, r: 27 },
  { x: 296, r: 27 },
];
export const GROND = 128; // hart van de wielen
export const ONDER = 120; // onderkant carrosserie
export const ARCH = 34;   // straal van de wielkast

/** RDW-waarde (`inrichting`) -> onze tekening. */
export const TYPE_KAART = {
  hatchback: 'hatchback',
  stationwagen: 'stationwagen',
  sedan: 'sedan',
  mpv: 'mpv',
  coupe: 'coupe',
  cabriolet: 'cabriolet',
  terreinvoertuig: 'mpv',
  kampeerwagen: 'bus',
  bus: 'bus',
  'pick-up truck': 'bus',
  limousine: 'sedan',
};

export function normaliseerType(inrichting) {
  const sleutel = String(inrichting || '').toLowerCase().trim();
  return TYPE_KAART[sleutel] ?? 'hatchback';
}

/** Van het einde van de motorkap over het dak naar de achterkant. */
const DAKEN = {
  hatchback:    'L 132,50 L 232,48 L 258,56 L 286,92',
  stationwagen: 'L 132,50 L 268,48 L 300,52 L 306,92',
  sedan:        'L 132,52 L 226,50 L 262,78 L 300,86',
  mpv:          'L 126,40 L 250,38 L 288,52 L 300,92',
  coupe:        'L 140,54 L 214,54 L 268,84 L 300,92',
  cabriolet:    'L 134,60 L 152,58 L 300,86',
  bus:          'L 122,32 L 316,32 L 320,92',
};

/**
 * Eén doorlopend pad: voorbumper omhoog, over de motorkap, het dak, de
 * achterkant omlaag, en langs de onderkant terug mét de twee wielkasten erin.
 * Die wielkasten horen ín de omtrek, anders loopt de carrosserielijn dwars
 * door de wielen heen.
 */
export function carrosseriePad(type) {
  const soort = DAKEN[type] ? type : 'hatchback';
  return [
    `M 26,${ONDER}`,
    'C 26,104 32,99 44,97',
    'L 86,90',
    DAKEN[soort],
    'L 352,97',
    `C 366,99 372,104 372,${ONDER}`,
    `L ${WIELEN[1].x + ARCH},${ONDER}`,
    `A ${ARCH},${ARCH} 0 0 1 ${WIELEN[1].x - ARCH},${ONDER}`,
    `L ${WIELEN[0].x + ARCH},${ONDER}`,
    `A ${ARCH},${ARCH} 0 0 1 ${WIELEN[0].x - ARCH},${ONDER}`,
    'Z',
  ].join(' ');
}

/** Hoogte van de B-stijl, zodat de ruitscheiding op het dak aansluit. */
export function stijlHoogte(type) {
  return type === 'mpv' || type === 'bus' ? 39 : 49;
}

/**
 * Waar zitten de onderdelen in het ZIJAANZICHT? Dit verschilt per carrosserie:
 * in een bestelbus of camper kan de subwoofer niet in een reservewielbak, en
 * bij een cabriolet is er achterin nauwelijks ruimte.
 */
export const ZIJ_POSITIES = {
  // `klep` volgt exact de achterkant uit DAKEN hierboven, anders zweeft de
  // gemarkeerde klep naast de carrosserie in plaats van erop.
  hatchback:    { sub: [322, 96],  versterker: [200, 104], klep: 'M 258,56 L 286,92' },
  stationwagen: { sub: [330, 92],  versterker: [200, 104], klep: 'M 300,52 L 306,92' },
  sedan:        { sub: [318, 96],  versterker: [200, 104], klep: 'M 262,78 L 300,86' },
  mpv:          { sub: [320, 92],  versterker: [200, 104], klep: 'M 288,52 L 300,92' },
  coupe:        { sub: [304, 98],  versterker: [200, 104], klep: 'M 268,84 L 300,92' },
  cabriolet:    { sub: [292, 98],  versterker: [200, 104], klep: 'M 262,80 L 300,86' },
  bus:          { sub: [332, 88],  versterker: [210, 104], klep: 'M 316,32 L 320,92' },
};

/** De motorkap loopt van de voorbumper tot de voorruit; bij elke vorm gelijk. */
export const MOTORKAP = 'M 48,96 L 86,90';
