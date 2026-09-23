/**
 * EEN QR-CODE, ZELF GETEKEND.
 *
 * WAAROM NIET GEWOON EEN DIENST DIE ER EEN MAAKT
 * Er zijn websites die een plaatje van een QR-code teruggeven. Daar zit een
 * adres in van een klant of een kenteken, en dat gaat dan naar een server
 * waar wij niets over te zeggen hebben. Bovendien staat zo'n plaatje op het
 * papier van de klant, dus als die dienst ooit ophoudt of het adres verandert,
 * krijg je dat nooit meer teruggedraaid. Dit rekent de code hier uit, op de
 * telefoon of de laptop zelf, zonder dat er iets de deur uit gaat.
 *
 * WAT HIJ KAN, EN WAT NIET
 * Alleen bytemodus (kan alles, ook een webadres met hoofdletters en tekens),
 * foutcorrectie M, versie 1 tot en met 10. Dat is ruim genoeg voor een
 * WhatsApp-adres van een regel of twee. Past het niet, dan zegt hij dat met
 * een foutmelding in plaats van stilletjes iets onleesbaars te maken.
 *
 * DE NORM
 * ISO/IEC 18004. De onderdelen zijn in volgorde: de gegevens in bits zetten,
 * er foutcorrectie bij rekenen (Reed-Solomon over GF(256)), de blokken door
 * elkaar vlechten, de modules in het vierkant leggen, acht maskers proberen en
 * de minst opvallende kiezen, en de opmaakinformatie erin zetten.
 *
 * NAGEREKEND
 * In tests/qr.test.js staat een LEZER die de matrix weer uitleest: uitmaskeren,
 * de modules in dezelfde volgorde teruglezen, de blokken ontvlechten en de
 * foutcorrectie narekenen. Wat erin gaat moet er weer uitkomen. Ook de
 * syndromen van elk blok worden nagerekend; die horen nul te zijn.
 */

/* De inkt komt uit de huisstijl, net als overal. Zwart op wit, want een
   QR-code moet contrast hebben; oranje modules scannen op papier slecht. */
import { LICHT } from '../data/brand.js';

/* ================= REKENEN IN GF(256) ================= */
/**
 * Reed-Solomon rekent in een lichaam van 256 waarden. Vermenigvuldigen doe je
 * daar via logaritmen, precies zoals met een rekenliniaal: tel de logaritmen
 * op en zoek terug. Deze twee tabellen zijn die rekenliniaal.
 */
const EXP = new Uint8Array(512);
const LOG = new Uint8Array(256);
(() => {
  let x = 1;
  for (let i = 0; i < 255; i += 1) {
    EXP[i] = x;
    LOG[x] = i;
    x <<= 1;
    /* Boven 255 uitkomen kan niet, dus dan delen we door de vaste veelterm
       x^8 + x^4 + x^3 + x^2 + 1 — dat is 0x11d. */
    if (x & 0x100) x ^= 0x11d;
  }
  for (let i = 255; i < 512; i += 1) EXP[i] = EXP[i - 255];
})();

const maal = (a, b) => (a === 0 || b === 0 ? 0 : EXP[LOG[a] + LOG[b]]);

/** De veelterm waar je mee deelt om `aantal` foutcorrectiebytes te krijgen. */
function generator(aantal) {
  let g = [1];
  for (let i = 0; i < aantal; i += 1) {
    const volgende = new Array(g.length + 1).fill(0);
    for (let j = 0; j < g.length; j += 1) {
      volgende[j] ^= g[j];
      volgende[j + 1] ^= maal(g[j], EXP[i]);
    }
    g = volgende;
  }
  return g;
}

/** De foutcorrectiebytes bij één blok gegevens. */
export function foutcorrectie(gegevens, aantal) {
  const g = generator(aantal);
  const rest = new Array(aantal).fill(0);
  for (const byte of gegevens) {
    const factor = byte ^ rest[0];
    rest.shift();
    rest.push(0);
    if (factor !== 0) {
      for (let i = 0; i < aantal; i += 1) rest[i] ^= maal(g[i + 1], factor);
    }
  }
  return rest;
}

/* ================= DE MATEN PER VERSIE ================= */
/**
 * Per versie (1 tot en met 10) bij foutcorrectie M:
 *   [ totaal aantal bytes, foutcorrectiebytes per blok, aantal blokken groep 1,
 *     bytes per blok in groep 1, aantal blokken groep 2, bytes per blok groep 2 ]
 *
 * Deze getallen staan in de norm; ze zijn niet uit te rekenen.
 */
const VERSIES = {
  1: [26, 10, 1, 16, 0, 0],
  2: [44, 16, 1, 28, 0, 0],
  3: [70, 26, 1, 44, 0, 0],
  4: [100, 18, 2, 32, 0, 0],
  5: [134, 24, 2, 43, 0, 0],
  6: [172, 16, 4, 27, 0, 0],
  7: [196, 18, 4, 31, 0, 0],
  8: [242, 22, 2, 38, 2, 39],
  9: [292, 22, 3, 36, 2, 37],
  10: [346, 26, 4, 43, 1, 44],
};

/** Waar de uitlijnvierkantjes staan, per versie. */
const UITLIJN = {
  1: [], 2: [6, 18], 3: [6, 22], 4: [6, 26], 5: [6, 30],
  6: [6, 34], 7: [6, 22, 38], 8: [6, 24, 42], 9: [6, 26, 46], 10: [6, 28, 50],
};

/** Hoeveel bytes er aan gegevens in passen bij deze versie. */
function ruimte(versie) {
  const [, ecc, n1, b1, n2, b2] = VERSIES[versie];
  return n1 * b1 + n2 * b2;
}

/** De kleinste versie waar deze tekst in past. */
function kleinsteVersie(bytes) {
  for (let v = 1; v <= 10; v += 1) {
    /* 4 bits voor de modus, 8 of 16 bits voor de lengte, dan de gegevens. */
    const lengteBits = v <= 9 ? 8 : 16;
    if (bytes.length + Math.ceil((4 + lengteBits) / 8) <= ruimte(v)) return v;
  }
  return 0;
}

/* ================= DE GEGEVENS IN BITS ================= */
function naarCodewoorden(bytes, versie) {
  const bits = [];
  const zet = (waarde, aantal) => {
    for (let i = aantal - 1; i >= 0; i -= 1) bits.push((waarde >> i) & 1);
  };
  zet(0b0100, 4);                       // modus: bytes
  zet(bytes.length, versie <= 9 ? 8 : 16);
  for (const b of bytes) zet(b, 8);

  const nodig = ruimte(versie) * 8;
  /* Afsluiten met maximaal vier nullen, dan aanvullen tot een hele byte. */
  for (let i = 0; i < 4 && bits.length < nodig; i += 1) bits.push(0);
  while (bits.length % 8 !== 0) bits.push(0);

  const woorden = [];
  for (let i = 0; i < bits.length; i += 8) {
    woorden.push(bits.slice(i, i + 8).reduce((n, b) => (n << 1) | b, 0));
  }
  /* De rest opvullen met twee vaste bytes, om en om. Dat schrijft de norm zo
     voor, zodat er geen groot leeg vlak in de code ontstaat. */
  const vulling = [0xec, 0x11];
  let i = 0;
  while (woorden.length < ruimte(versie)) {
    woorden.push(vulling[i % 2]);
    i += 1;
  }
  return woorden;
}

/** De blokken door elkaar vlechten, zoals de norm het wil. */
function vlecht(woorden, versie) {
  const [, eccPer, n1, b1, n2, b2] = VERSIES[versie];
  const blokken = [];
  let p = 0;
  for (let i = 0; i < n1; i += 1) { blokken.push(woorden.slice(p, p + b1)); p += b1; }
  for (let i = 0; i < n2; i += 1) { blokken.push(woorden.slice(p, p + b2)); p += b2; }
  const ecc = blokken.map((blok) => foutcorrectie(blok, eccPer));

  const uit = [];
  const langste = Math.max(...blokken.map((b) => b.length));
  for (let i = 0; i < langste; i += 1) {
    for (const blok of blokken) if (i < blok.length) uit.push(blok[i]);
  }
  for (let i = 0; i < eccPer; i += 1) {
    for (const blok of ecc) uit.push(blok[i]);
  }
  return uit;
}

/* ================= HET VIERKANT ================= */
/** Een leeg vierkant: null betekent "hier mag nog iets komen". */
function leegVierkant(maat) {
  return Array.from({ length: maat }, () => new Array(maat).fill(null));
}

function zetZoeker(m, rij, kolom) {
  for (let r = -1; r <= 7; r += 1) {
    for (let k = -1; k <= 7; k += 1) {
      const y = rij + r;
      const x = kolom + k;
      if (y < 0 || x < 0 || y >= m.length || x >= m.length) continue;
      const rand = r === 0 || r === 6 || k === 0 || k === 6;
      const kern = r >= 2 && r <= 4 && k >= 2 && k <= 4;
      m[y][x] = rand || kern ? 1 : 0;
    }
  }
}

function zetVaste(m, versie) {
  const maat = m.length;
  zetZoeker(m, 0, 0);
  zetZoeker(m, 0, maat - 7);
  zetZoeker(m, maat - 7, 0);

  /* De streepjeslijn tussen de zoekers. */
  for (let i = 8; i < maat - 8; i += 1) {
    m[6][i] = i % 2 === 0 ? 1 : 0;
    m[i][6] = i % 2 === 0 ? 1 : 0;
  }

  /* De kleine uitlijnvierkantjes, behalve waar een zoeker al staat. */
  const plekken = UITLIJN[versie];
  for (const rij of plekken) {
    for (const kolom of plekken) {
      if ((rij === 6 && kolom === 6)
        || (rij === 6 && kolom === maat - 7)
        || (rij === maat - 7 && kolom === 6)) continue;
      for (let r = -2; r <= 2; r += 1) {
        for (let k = -2; k <= 2; k += 1) {
          const buitenrand = Math.abs(r) === 2 || Math.abs(k) === 2;
          m[rij + r][kolom + k] = buitenrand || (r === 0 && k === 0) ? 1 : 0;
        }
      }
    }
  }

  /* Eén module die altijd donker is. */
  m[maat - 8][8] = 1;

  /* De plekken van de opmaakinformatie vast bezet houden. */
  for (let i = 0; i <= 8; i += 1) {
    if (m[8][i] === null) m[8][i] = 0;
    if (m[i][8] === null) m[i][8] = 0;
  }
  for (let i = 0; i < 8; i += 1) {
    if (m[8][maat - 1 - i] === null) m[8][maat - 1 - i] = 0;
    if (m[maat - 1 - i][8] === null) m[maat - 1 - i][8] = 0;
  }
}

/**
 * De gegevens in het vierkant leggen: van rechtsonder naar boven, in kolommen
 * van twee breed, om en om omhoog en omlaag. De kolom van de streepjeslijn
 * wordt overgeslagen.
 */
function legGegevens(m, woorden, bezet) {
  const maat = m.length;
  const bits = [];
  for (const w of woorden) for (let i = 7; i >= 0; i -= 1) bits.push((w >> i) & 1);

  let bit = 0;
  let omhoog = true;
  for (let rechts = maat - 1; rechts > 0; rechts -= 2) {
    if (rechts === 6) rechts -= 1;
    for (let stap = 0; stap < maat; stap += 1) {
      const rij = omhoog ? maat - 1 - stap : stap;
      for (const kolom of [rechts, rechts - 1]) {
        if (bezet[rij][kolom]) continue;
        m[rij][kolom] = bit < bits.length ? bits[bit] : 0;
        bit += 1;
      }
    }
    omhoog = !omhoog;
  }
}

/** De acht maskers. Geeft terug of deze module omgedraaid moet worden. */
export const MASKERS = [
  (r, k) => (r + k) % 2 === 0,
  (r) => r % 2 === 0,
  (r, k) => k % 3 === 0,
  (r, k) => (r + k) % 3 === 0,
  (r, k) => (Math.floor(r / 2) + Math.floor(k / 3)) % 2 === 0,
  (r, k) => ((r * k) % 2) + ((r * k) % 3) === 0,
  (r, k) => (((r * k) % 2) + ((r * k) % 3)) % 2 === 0,
  (r, k) => (((r + k) % 2) + ((r * k) % 3)) % 2 === 0,
];

/** Hoe opvallend een gemaskerd vierkant is. Lager is beter. */
function strafpunten(m) {
  const maat = m.length;
  let straf = 0;

  /* Regel 1: rijtjes van vijf of meer dezelfde modules. */
  for (let i = 0; i < maat; i += 1) {
    for (const langs of ['rij', 'kolom']) {
      let vorige = -1;
      let aantal = 0;
      for (let j = 0; j < maat; j += 1) {
        const waarde = langs === 'rij' ? m[i][j] : m[j][i];
        if (waarde === vorige) {
          aantal += 1;
          if (aantal === 5) straf += 3;
          else if (aantal > 5) straf += 1;
        } else {
          vorige = waarde;
          aantal = 1;
        }
      }
    }
  }

  /* Regel 2: blokjes van twee bij twee. */
  for (let r = 0; r < maat - 1; r += 1) {
    for (let k = 0; k < maat - 1; k += 1) {
      const a = m[r][k];
      if (a === m[r][k + 1] && a === m[r + 1][k] && a === m[r + 1][k + 1]) straf += 3;
    }
  }

  /* Regel 3: het patroon dat op een zoeker lijkt. */
  const patroon = [1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0];
  const omgekeerd = [...patroon].reverse();
  for (let r = 0; r < maat; r += 1) {
    for (let k = 0; k <= maat - 11; k += 1) {
      const rij = m[r].slice(k, k + 11);
      const kolom = Array.from({ length: 11 }, (_, i) => m[k + i][r]);
      for (const reeks of [rij, kolom]) {
        if (patroon.every((p, i) => p === reeks[i])) straf += 40;
        if (omgekeerd.every((p, i) => p === reeks[i])) straf += 40;
      }
    }
  }

  /* Regel 4: te veel of te weinig donker. */
  const donker = m.flat().filter((x) => x === 1).length;
  const deel = (donker * 100) / (maat * maat);
  straf += Math.floor(Math.abs(deel - 50) / 5) * 10;

  return straf;
}

/**
 * De opmaakinformatie: twee bits voor het niveau foutcorrectie, drie voor het
 * masker, en tien bits foutcorrectie daarover. Er gaat nog een vast patroon
 * overheen, zodat een code met alleen nullen niet uit het niets ontstaat.
 */
export function opmaakBits(masker, niveau = 0b00) {
  const gegevens = (niveau << 3) | masker;
  let rest = gegevens << 10;
  for (let i = 4; i >= 0; i -= 1) {
    if (rest & (1 << (i + 10))) rest ^= 0b10100110111 << i;
  }
  return ((gegevens << 10) | rest) ^ 0b101010000010010;
}

function zetOpmaak(m, masker) {
  const maat = m.length;
  const bits = opmaakBits(masker);
  const bit = (i) => (bits >> i) & 1;

  /* De ene kopie loopt om de zoeker linksboven heen. */
  for (let i = 0; i <= 5; i += 1) m[8][i] = bit(14 - i);
  m[8][7] = bit(8);
  m[8][8] = bit(7);
  m[7][8] = bit(6);
  for (let i = 9; i <= 14; i += 1) m[14 - i][8] = bit(14 - i);

  /* De andere kopie staat langs de twee andere zoekers. */
  for (let i = 0; i <= 7; i += 1) m[maat - 1 - i][8] = bit(i);
  for (let i = 8; i <= 14; i += 1) m[8][maat - 15 + i] = bit(i);
}

/**
 * De hele code als matrix van nullen en enen.
 *
 * @param {string} tekst   wat erin moet, bijvoorbeeld een webadres
 * @returns {number[][]}   het vierkant, rij voor rij
 */
export function qrMatrix(tekst) {
  const bytes = [...new TextEncoder().encode(String(tekst ?? ''))];
  const versie = kleinsteVersie(bytes);
  if (!versie) throw new Error('Deze tekst is te lang voor een QR-code van deze maat.');

  const maat = versie * 4 + 17;
  const grond = leegVierkant(maat);
  zetVaste(grond, versie);
  const bezet = grond.map((rij) => rij.map((x) => x !== null));

  const woorden = vlecht(naarCodewoorden(bytes, versie), versie);
  const metGegevens = grond.map((rij) => [...rij]);
  legGegevens(metGegevens, woorden, bezet);

  /* Acht maskers proberen en de minst opvallende kiezen. */
  let beste = null;
  let besteStraf = Infinity;
  for (let masker = 0; masker < 8; masker += 1) {
    const kandidaat = metGegevens.map((rij, r) => rij.map((waarde, k) => (
      bezet[r][k] ? waarde : waarde ^ (MASKERS[masker](r, k) ? 1 : 0)
    )));
    zetOpmaak(kandidaat, masker);
    const straf = strafpunten(kandidaat);
    if (straf < besteStraf) {
      besteStraf = straf;
      beste = kandidaat;
    }
  }
  return beste;
}

/**
 * De code als svg, klaar om in een pagina te zetten.
 *
 * De stille rand van vier modules eromheen is geen opsmuk: zonder die rand
 * vindt een telefoon de code niet terug tussen de rest van het papier.
 */
export function qrSvg(tekst, { rand = 4, kleur = LICHT.text, titel = '' } = {}) {
  const m = qrMatrix(tekst);
  const maat = m.length + rand * 2;
  const paden = [];
  for (let r = 0; r < m.length; r += 1) {
    for (let k = 0; k < m.length; k += 1) {
      if (m[r][k]) paden.push(`M${k + rand} ${r + rand}h1v1h-1z`);
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${maat} ${maat}" `
    + `shape-rendering="crispEdges" role="img"${titel ? ` aria-label="${titel}"` : ' aria-hidden="true"'}>`
    + `<path fill="${kleur}" d="${paden.join('')}"/></svg>`;
}

export default qrSvg;
