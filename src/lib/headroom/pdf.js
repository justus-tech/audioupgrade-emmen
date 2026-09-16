/**
 * EEN PDF SCHRIJVEN — zonder hulppakketten.
 *
 * WAAROM ZELFGEMAAKT
 * Er bestaan kant-en-klare pakketten die dit doen. Die zijn groot (een halve
 * megabyte die de telefoon elke keer moet laden), ze worden regelmatig
 * bijgewerkt op manieren die iets stukmaken, en je haalt code van een ander
 * binnen in iets waar de prijzen van klanten doorheen lopen.
 *
 * Wat wij nodig hebben is klein: rechthoeken, lijnen en tekst in twee
 * diktes. Dat past in dit bestand, het is te lezen, en het kan niet stuk
 * gaan door iemand anders' update.
 *
 * HOE EEN PDF IN ELKAAR ZIT
 * Een pdf is gewoon tekst met een inhoudsopgave achterin. Bovenaan staan
 * genummerde "objecten" (de pagina's, de lettertypen, de tekeninstructies),
 * en onderaan staat een tabel die per object zegt op welke byte hij begint.
 * Klopt die tabel niet, dan weigert de lezer het bestand — vandaar dat we
 * hieronder bytes tellen en geen tekens.
 *
 * LINKSBOVEN IN PLAATS VAN LINKSONDER
 * In een pdf ligt het nulpunt linksónder, en dat leest niet prettig als je
 * een offerte van boven naar beneden opbouwt. Daarom rekent dit bestand met
 * een nulpunt linksbóven en draait het de y-as pas om bij het wegschrijven.
 */

/** A4 in punten (1 punt = 1/72 inch). */
export const A4 = { breedte: 595.28, hoogte: 841.89 };

/**
 * De letterbreedtes van Helvetica, in duizendsten van de lettergrootte.
 *
 * Die hebben we nodig om bedragen rechts uit te lijnen en om een lange
 * omschrijving op de goede plek af te breken. Helvetica zit in elke
 * pdf-lezer ingebouwd, dus er hoeft geen lettertype mee in het bestand —
 * dat scheelt honderden kilobytes en werkt overal hetzelfde.
 */
const BREED_GEWOON = [
  278, 278, 355, 556, 556, 889, 667, 191, 333, 333, 389, 584, 278, 333, 278, 278,
  556, 556, 556, 556, 556, 556, 556, 556, 556, 556, 278, 278, 584, 584, 584, 556,
  1015, 667, 667, 722, 722, 667, 611, 778, 722, 278, 500, 667, 556, 833, 722, 778,
  667, 778, 722, 667, 611, 722, 667, 944, 667, 667, 611, 278, 278, 278, 469, 556,
  333, 556, 556, 500, 556, 556, 278, 556, 556, 222, 222, 500, 222, 833, 556, 556,
  556, 556, 333, 500, 278, 556, 500, 722, 500, 500, 500, 334, 260, 334, 584,
];
const BREED_VET = [
  278, 333, 474, 556, 556, 889, 722, 238, 333, 333, 389, 584, 278, 333, 278, 278,
  556, 556, 556, 556, 556, 556, 556, 556, 556, 556, 333, 333, 584, 584, 584, 611,
  975, 722, 722, 722, 722, 667, 611, 778, 722, 278, 556, 722, 611, 833, 722, 778,
  667, 778, 722, 667, 611, 722, 667, 944, 667, 667, 611, 333, 278, 333, 584, 556,
  333, 556, 611, 556, 611, 556, 333, 611, 611, 278, 278, 556, 278, 889, 611, 611,
  611, 611, 389, 556, 333, 611, 556, 778, 556, 556, 500, 389, 280, 389, 584,
];

/** Tekens buiten het gewone alfabet waarvan we de breedte apart kennen. */
const BREED_EXTRA = {
  0x80: [556, 556], // euroteken
  0x91: [222, 238], 0x92: [222, 238], // ' '
  0x93: [333, 500], 0x94: [333, 500], // " "
  0x95: [350, 350], // bolletje
  0x96: [556, 556], 0x97: [1000, 1000], // - en --
  0xa0: [278, 278], 0xb0: [400, 400], 0xb1: [584, 584],
  0xb7: [278, 278], 0xd7: [584, 584], 0xdf: [611, 611],
  0xc6: [1000, 1000], 0xe6: [889, 889], 0xd8: [778, 778], 0xf8: [611, 611],
};

/**
 * Een letter met een accent is in Helvetica precies zo breed als dezelfde
 * letter zonder. Dat scheelt een tabel van honderd regels.
 */
const ZONDER_ACCENT = (() => {
  const kaart = {};
  const groepen = [
    [0xc0, 0xc5, 'A'], [0xc7, 0xc7, 'C'], [0xc8, 0xcb, 'E'], [0xcc, 0xcf, 'I'],
    [0xd1, 0xd1, 'N'], [0xd2, 0xd6, 'O'], [0xd9, 0xdc, 'U'], [0xdd, 0xdd, 'Y'],
    [0xe0, 0xe5, 'a'], [0xe7, 0xe7, 'c'], [0xe8, 0xeb, 'e'], [0xec, 0xef, 'i'],
    [0xf1, 0xf1, 'n'], [0xf2, 0xf6, 'o'], [0xf9, 0xfc, 'u'], [0xfd, 0xfd, 'y'],
    [0xff, 0xff, 'y'],
  ];
  for (const [van, tot, letter] of groepen) {
    for (let c = van; c <= tot; c++) kaart[c] = letter.charCodeAt(0);
  }
  return kaart;
})();

/**
 * De tekens tussen 128 en 159 staan in een pdf op andere plekken dan in de
 * rest van de computerwereld. Het euroteken is het belangrijkste geval: dat
 * staat hier op 128. Vergeet je deze omzetting, dan staat er op de offerte
 * een leeg vakje in plaats van een bedrag.
 */
const AFWIJKENDE_TEKENS = new Map([
  [0x20ac, 0x80], [0x201a, 0x82], [0x0192, 0x83], [0x201e, 0x84], [0x2026, 0x85],
  [0x2020, 0x86], [0x2021, 0x87], [0x02c6, 0x88], [0x2030, 0x89], [0x0160, 0x8a],
  [0x2039, 0x8b], [0x0152, 0x8c], [0x017d, 0x8e], [0x2018, 0x91], [0x2019, 0x92],
  [0x201c, 0x93], [0x201d, 0x94], [0x2022, 0x95], [0x2013, 0x96], [0x2014, 0x97],
  [0x02dc, 0x98], [0x2122, 0x99], [0x0161, 0x9a], [0x203a, 0x9b], [0x0153, 0x9c],
  [0x017e, 0x9e], [0x0178, 0x9f],
]);

/** Tekst omzetten naar de tekenset die de pdf gebruikt. */
export function naarPdfTekens(tekst) {
  let uit = '';
  for (const teken of String(tekst ?? '')) {
    const code = teken.codePointAt(0);
    if (code >= 32 && code <= 126) { uit += teken; continue; }
    if (code === 10 || code === 13 || code === 9) { uit += ' '; continue; }
    const anders = AFWIJKENDE_TEKENS.get(code);
    if (anders !== undefined) { uit += String.fromCharCode(anders); continue; }
    if (code >= 0xa0 && code <= 0xff) { uit += teken; continue; }
    /* Liever een vraagteken dan een pdf die niet opengaat. */
    uit += '?';
  }
  return uit;
}

/** Hoe breed een stuk tekst wordt, in punten. */
export function breedteVan(tekst, grootte = 10, vet = false) {
  const tabel = vet ? BREED_VET : BREED_GEWOON;
  let duizendsten = 0;
  for (const teken of naarPdfTekens(tekst)) {
    const code = teken.charCodeAt(0);
    if (code >= 32 && code <= 126) duizendsten += tabel[code - 32];
    else if (BREED_EXTRA[code]) duizendsten += BREED_EXTRA[code][vet ? 1 : 0];
    else if (ZONDER_ACCENT[code]) duizendsten += tabel[ZONDER_ACCENT[code] - 32];
    else duizendsten += tabel[('o').charCodeAt(0) - 32];
  }
  return (duizendsten * grootte) / 1000;
}

/**
 * Een lange zin in regels knippen die binnen `maxBreedte` passen.
 * Een woord dat in zijn eentje al te lang is blijft heel; liever een regel
 * die een millimeter uitsteekt dan een woord dat middenin doormidden valt.
 */
export function breekAf(tekst, maxBreedte, grootte = 10, vet = false) {
  const woorden = String(tekst ?? '').split(/\s+/).filter(Boolean);
  const regels = [];
  let regel = '';
  for (const woord of woorden) {
    const poging = regel ? `${regel} ${woord}` : woord;
    if (regel && breedteVan(poging, grootte, vet) > maxBreedte) {
      regels.push(regel);
      regel = woord;
    } else {
      regel = poging;
    }
  }
  if (regel) regels.push(regel);
  return regels.length ? regels : [''];
}

/**
 * Een kleurcode omzetten naar de drie waarden die een pdf wil zien:
 * rood, groen en blauw als getal tussen 0 en 1.
 *
 * Dit bestand kent de huisstijl niet en hoort die ook niet te kennen — het
 * schrijft pdf's, meer niet. De kleuren van Audio Upgrade Emmen staan in
 * src/data/brand.js en komen hier binnen via offerte-pdf.js.
 */
function kleurCode(hex) {
  const n = String(hex).replace('#', '');
  const vol = n.length === 3 ? n.split('').map((c) => c + c).join('') : n;
  const kanaal = (i) => (parseInt(vol.slice(i, i + 2), 16) / 255).toFixed(3);
  return `${kanaal(0)} ${kanaal(2)} ${kanaal(4)}`;
}

/** Haakjes en schuine strepen hebben in een pdf een eigen betekenis. */
function ontsnap(tekst) {
  return naarPdfTekens(tekst).replace(/([\\()])/g, '\\$1');
}

/**
 * De terugvalkleur van deze schrijver als een aanroep geen kleur meegeeft.
 * Zwarte inkt is geen huisstijlkleur maar de standaard van het medium; de
 * offerte geeft overal wél een kleur mee.
 */
const ZWART = '#000';

/** Getallen kort houden: 1.2345678 wordt 1.235. Scheelt bestandsgrootte. */
const g = (n) => (Math.round(Number(n) * 1000) / 1000).toString();

/**
 * Tekst die BUITEN de pagina staat: de titel van het bestand, zoals de
 * pdf-lezer hem in zijn titelbalk zet.
 *
 * Die tekst gebruikt een andere tekenset dan de tekst óp de pagina. Een
 * liggend streepje kwam er daardoor uit als een Š. Voor alles wat niet
 * gewoon ASCII is schrijven we daarom een hexadecimale UTF-16-tekst; dat
 * begrijpt elke lezer, en dan klopt ook een é of een euroteken.
 */
function metaTekst(tekst) {
  const inhoud = String(tekst ?? '');
  if (/^[\x20-\x7e]*$/.test(inhoud)) return `(${inhoud.replace(/([\\()])/g, '\\$1')})`;
  let hex = 'FEFF';
  for (const teken of inhoud) {
    for (let i = 0; i < teken.length; i++) {
      hex += teken.charCodeAt(i).toString(16).padStart(4, '0').toUpperCase();
    }
  }
  return `<${hex}>`;
}

/**
 * Een nieuw pdf-document. Teken erop met de methodes hieronder en vraag aan
 * het eind `naarBytes()` (of `naarBlob()` in de browser).
 */
export function nieuwPdf({ titel = 'Offerte', maker = '' } = {}) {
  const paginas = [];
  let huidig = null;

  const nieuwePagina = () => {
    huidig = [];
    paginas.push(huidig);
    return doc;
  };

  /** y omdraaien: wij tellen van boven, de pdf telt van onder. */
  const yy = (y) => A4.hoogte - y;

  const doc = {
    nieuwePagina,
    get paginas() { return paginas.length; },

    /** Een gevuld vlak. */
    vlak(x, y, breedte, hoogte, kleur) {
      huidig.push(`${kleurCode(kleur)} rg ${g(x)} ${g(yy(y + hoogte))} ${g(breedte)} ${g(hoogte)} re f`);
      return doc;
    },

    /** Een lijn. Standaard haarfijn, want een offerte is geen formulier. */
    lijn(x1, y1, x2, y2, kleur, dikte = 0.5) {
      huidig.push(
        `${kleurCode(kleur)} RG ${g(dikte)} w ${g(x1)} ${g(yy(y1))} m ${g(x2)} ${g(yy(y2))} l S`
      );
      return doc;
    },

    /**
     * Tekst. `y` is de onderkant van de letters (de schrijflijn).
     *   uitlijnen: 'links' | 'rechts' | 'midden'
     *   spatiering: extra ruimte tussen de letters, voor het woordmerk
     */
    tekst(tekst, x, y, {
      grootte = 10, vet = false, kleur = ZWART,
      uitlijnen = 'links', spatiering = 0,
    } = {}) {
      const inhoud = String(tekst ?? '');
      if (!inhoud) return doc;
      const letters = naarPdfTekens(inhoud).length;
      const breedte = breedteVan(inhoud, grootte, vet) + spatiering * Math.max(0, letters - 1);
      let links = x;
      if (uitlijnen === 'rechts') links = x - breedte;
      else if (uitlijnen === 'midden') links = x - breedte / 2;
      huidig.push(
        `BT ${kleurCode(kleur)} rg /${vet ? 'F2' : 'F1'} ${g(grootte)} Tf` +
        (spatiering ? ` ${g(spatiering)} Tc` : ' 0 Tc') +
        ` 1 0 0 1 ${g(links)} ${g(yy(y))} Tm (${ontsnap(inhoud)}) Tj ET`
      );
      return doc;
    },

    /** Het hele document als bytes. */
    naarBytes() {
      if (!paginas.length) nieuwePagina();

      /* Objectnummers: 1 catalogus, 2 paginalijst, 3 en 4 de lettertypen,
         5 de gegevens, daarna per pagina een paar (pagina + inhoud). */
      const objecten = [
        `<< /Type /Catalog /Pages 2 0 R >>`,
        null, // de paginalijst vullen we hieronder in, als we de nummers weten
        `<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>`,
        `<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>`,
        `<< /Title ${metaTekst(titel)} /Producer ${metaTekst(maker || titel)} >>`,
      ];

      const paginaNummers = [];
      paginas.forEach((regels) => {
        const inhoud = regels.join('\n');
        const paginaNr = objecten.length + 1;
        const inhoudNr = paginaNr + 1;
        paginaNummers.push(paginaNr);
        objecten.push(
          `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${g(A4.breedte)} ${g(A4.hoogte)}] ` +
          `/Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${inhoudNr} 0 R >>`
        );
        objecten.push(`<< /Length ${inhoud.length} >>\nstream\n${inhoud}\nendstream`);
      });

      objecten[1] =
        `<< /Type /Pages /Kids [${paginaNummers.map((n) => `${n} 0 R`).join(' ')}] ` +
        `/Count ${paginaNummers.length} >>`;

      /* Vanaf hier tellen we bytes. Elk teken hieronder is er precies één
         waard: alles is door naarPdfTekens() heen en zit dus onder de 256. */
      let uit = '%PDF-1.4\n';
      const beginBij = [];
      objecten.forEach((body, i) => {
        beginBij.push(uit.length);
        uit += `${i + 1} 0 obj\n${body}\nendobj\n`;
      });

      const kruisverwijzing = uit.length;
      uit += `xref\n0 ${objecten.length + 1}\n0000000000 65535 f \n`;
      for (const positie of beginBij) {
        uit += `${String(positie).padStart(10, '0')} 00000 n \n`;
      }
      uit +=
        `trailer\n<< /Size ${objecten.length + 1} /Root 1 0 R /Info 5 0 R >>\n` +
        `startxref\n${kruisverwijzing}\n%%EOF\n`;

      const bytes = new Uint8Array(uit.length);
      for (let i = 0; i < uit.length; i++) bytes[i] = uit.charCodeAt(i) & 0xff;
      return bytes;
    },

    /** Voor in de browser: een bestand om te delen of te bewaren. */
    naarBlob() {
      return new Blob([doc.naarBytes()], { type: 'application/pdf' });
    },
  };

  nieuwePagina();
  return doc;
}
