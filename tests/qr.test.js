/**
 * DE QR-CODE, NAGEREKEND.
 *
 * Een QR-code op papier dat de klant meekrijgt, moet het doen. Zie je pas dat
 * hij niet scant als de klant hem voor zijn neus houdt, dan ben je te laat —
 * het papier ligt dan al in vijftig mappen.
 *
 * Daarom staat hier een LEZER die niets van de schrijver weet: hij haalt de
 * opmaakinformatie uit het vierkant, maskeert uit, leest de modules terug in
 * de voorgeschreven volgorde, ontvlecht de blokken, rekent de syndromen na en
 * zet de bits weer om naar tekst. Komt er niet precies uit wat erin ging, dan
 * valt deze test om.
 *
 * Wat deze test NIET kan: de camera van een telefoon nadoen. Scan de code één
 * keer met je eigen toestel voordat het eerste rapport de deur uit gaat.
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { qrMatrix, qrSvg, opmaakBits, foutcorrectie, MASKERS } from '../src/lib/qr.js';

/* ================= DE LEZER ================= */

/** Dezelfde rekentabellen als de schrijver; hier opnieuw opgebouwd. */
const EXP = new Uint8Array(512);
const LOG = new Uint8Array(256);
(() => {
  let x = 1;
  for (let i = 0; i < 255; i += 1) {
    EXP[i] = x; LOG[x] = i;
    x = (x << 1) ^ (x & 0x80 ? 0x11d : 0);
  }
  for (let i = 255; i < 512; i += 1) EXP[i] = EXP[i - 255];
})();
const maal = (a, b) => (a === 0 || b === 0 ? 0 : EXP[LOG[a] + LOG[b]]);

const VERSIES = {
  1: [10, 1, 16, 0, 0], 2: [16, 1, 28, 0, 0], 3: [26, 1, 44, 0, 0],
  4: [18, 2, 32, 0, 0], 5: [24, 2, 43, 0, 0], 6: [16, 4, 27, 0, 0],
  7: [18, 4, 31, 0, 0], 8: [22, 2, 38, 2, 39], 9: [22, 3, 36, 2, 37],
  10: [26, 4, 43, 1, 44],
};
const UITLIJN = {
  1: [], 2: [6, 18], 3: [6, 22], 4: [6, 26], 5: [6, 30],
  6: [6, 34], 7: [6, 22, 38], 8: [6, 24, 42], 9: [6, 26, 46], 10: [6, 28, 50],
};

/**
 * Welke plekken horen bij het vaste patroon en dragen dus geen gegevens?
 * Los opgeschreven van de schrijver, zodat een verschrijving daar hier opvalt.
 */
function vastePlekken(versie) {
  const maat = versie * 4 + 17;
  const vast = Array.from({ length: maat }, () => new Array(maat).fill(false));
  const blok = (rij, kolom, hoogte, breedte) => {
    for (let r = rij; r < rij + hoogte; r += 1) {
      for (let k = kolom; k < kolom + breedte; k += 1) {
        if (r >= 0 && k >= 0 && r < maat && k < maat) vast[r][k] = true;
      }
    }
  };
  /* De drie zoekers met hun witrand, en de opmaakinformatie ernaast. */
  blok(0, 0, 9, 9);
  blok(0, maat - 8, 9, 8);
  blok(maat - 8, 0, 8, 9);
  /* De twee streepjeslijnen. */
  blok(6, 0, 1, maat);
  blok(0, 6, maat, 1);
  /* De uitlijnvierkantjes. */
  for (const rij of UITLIJN[versie]) {
    for (const kolom of UITLIJN[versie]) {
      if ((rij === 6 && kolom === 6)
        || (rij === 6 && kolom === maat - 7)
        || (rij === maat - 7 && kolom === 6)) continue;
      blok(rij - 2, kolom - 2, 5, 5);
    }
  }
  return vast;
}

/** De opmaakinformatie terugzoeken: welk masker en welk niveau staan erin? */
function leesOpmaak(m) {
  let bits = 0;
  for (let i = 0; i <= 5; i += 1) bits |= m[8][i] << (14 - i);
  bits |= m[8][7] << 8;
  bits |= m[8][8] << 7;
  bits |= m[7][8] << 6;
  for (let i = 9; i <= 14; i += 1) bits |= m[14 - i][8] << (14 - i);

  /* Terugzoeken in de 32 mogelijke waarden. Zo hoeft de lezer de BCH-som niet
     over te doen en controleert hij meteen dat er een geldige waarde staat. */
  for (let niveau = 0; niveau < 4; niveau += 1) {
    for (let masker = 0; masker < 8; masker += 1) {
      if (opmaakBits(masker, niveau) === bits) return { masker, niveau, bits };
    }
  }
  throw new Error(`onbekende opmaakinformatie: ${bits.toString(2)}`);
}

/** De modules terugvolgen in de voorgeschreven volgorde. */
function leesBits(m, vast) {
  const maat = m.length;
  const bits = [];
  let omhoog = true;
  for (let rechts = maat - 1; rechts > 0; rechts -= 2) {
    if (rechts === 6) rechts -= 1;
    for (let n = 0; n < maat; n += 1) {
      const rij = omhoog ? maat - 1 - n : n;
      for (const kolom of [rechts, rechts - 1]) {
        if (!vast[rij][kolom]) bits.push(m[rij][kolom]);
      }
    }
    omhoog = !omhoog;
  }
  return bits;
}

/** Het syndroom van een blok. Hoort nul te zijn als er niets stuk is. */
function syndromen(codewoord, aantal) {
  const uit = [];
  for (let i = 0; i < aantal; i += 1) {
    let som = 0;
    for (const byte of codewoord) som = maal(som, EXP[i]) ^ byte;
    uit.push(som);
  }
  return uit;
}

/** Het hele vierkant terug naar tekst. */
function lees(m) {
  const maat = m.length;
  const versie = (maat - 17) / 4;
  assert.ok(Number.isInteger(versie) && versie >= 1 && versie <= 10, `rare maat: ${maat}`);

  const { masker, niveau } = leesOpmaak(m);
  assert.equal(niveau, 0b00, 'het rapport gebruikt foutcorrectieniveau M');

  const vast = vastePlekken(versie);
  const schoon = m.map((rij, r) => rij.map((waarde, k) => (
    vast[r][k] ? waarde : waarde ^ (MASKERS[masker](r, k) ? 1 : 0)
  )));

  const bits = leesBits(schoon, vast);
  const woorden = [];
  for (let i = 0; i + 8 <= bits.length; i += 8) {
    woorden.push(bits.slice(i, i + 8).reduce((n, b) => (n << 1) | b, 0));
  }

  /* Ontvlechten: eerst de gegevens, daarna de foutcorrectie. */
  const [eccPer, n1, b1, n2, b2] = VERSIES[versie];
  const maten = [...new Array(n1).fill(b1), ...new Array(n2).fill(b2)];
  const blokken = maten.map(() => []);
  let p = 0;
  for (let i = 0; i < Math.max(...maten); i += 1) {
    for (let b = 0; b < blokken.length; b += 1) {
      if (i < maten[b]) { blokken[b].push(woorden[p]); p += 1; }
    }
  }
  const eccBlokken = blokken.map(() => []);
  for (let i = 0; i < eccPer; i += 1) {
    for (let b = 0; b < blokken.length; b += 1) { eccBlokken[b].push(woorden[p]); p += 1; }
  }

  /* De foutcorrectie narekenen: zonder fouten zijn alle syndromen nul. */
  blokken.forEach((blok, i) => {
    const heel = [...blok, ...eccBlokken[i]];
    assert.deepEqual(
      syndromen(heel, eccPer), new Array(eccPer).fill(0),
      `blok ${i} klopt niet met zijn foutcorrectie`
    );
  });

  /* En de bits weer naar tekst. */
  const alle = blokken.flat();
  const gegevens = [];
  for (const w of alle) for (let i = 7; i >= 0; i -= 1) gegevens.push((w >> i) & 1);
  const pak = (begin, aantal) =>
    gegevens.slice(begin, begin + aantal).reduce((n, b) => (n << 1) | b, 0);

  assert.equal(pak(0, 4), 0b0100, 'er hoort bytemodus in te staan');
  const lengteBits = versie <= 9 ? 8 : 16;
  const lengte = pak(4, lengteBits);
  const bytes = [];
  for (let i = 0; i < lengte; i += 1) bytes.push(pak(4 + lengteBits + i * 8, 8));
  return new TextDecoder().decode(new Uint8Array(bytes));
}

/* ================= DE TESTS ================= */
describe('de QR-code', () => {
  test('de opmaakinformatie klopt met de tabel uit de norm', () => {
    /**
     * Deze twee reeksen staan in ISO/IEC 18004 en zijn overal na te kijken.
     * Kloppen ze, dan klopt de foutcorrectie over de opmaak én het vaste
     * patroon dat er overheen gaat.
     */
    const M = [0x5412, 0x5125, 0x5e7c, 0x5b4b, 0x45f9, 0x40ce, 0x4f97, 0x4aa0];
    const L = [0x77c4, 0x72f3, 0x7daa, 0x789d, 0x662f, 0x6318, 0x6c41, 0x6976];
    M.forEach((waarde, masker) => assert.equal(opmaakBits(masker, 0b00), waarde));
    L.forEach((waarde, masker) => assert.equal(opmaakBits(masker, 0b01), waarde));
  });

  test('de foutcorrectie klopt met het voorbeeld uit de norm', () => {
    /* Het standaardvoorbeeld: "HELLO WORLD" in versie 1-M levert deze tien
       bytes foutcorrectie op. Staat zo in de handleidingen bij de norm. */
    const gegevens = [32, 91, 11, 120, 209, 114, 220, 77, 67, 64, 236, 17, 236, 17, 236, 17];
    assert.deepEqual(
      foutcorrectie(gegevens, 10),
      [196, 35, 39, 119, 235, 215, 231, 226, 93, 23]
    );
  });

  test('het vierkant heeft drie zoekers op de goede plek', () => {
    const m = qrMatrix('https://audioupgradeemmen.nl');
    const maat = m.length;
    for (const [rij, kolom] of [[0, 0], [0, maat - 7], [maat - 7, 0]]) {
      assert.equal(m[rij][kolom], 1, 'de hoek van de zoeker hoort donker te zijn');
      assert.equal(m[rij + 1][kolom + 1], 0, 'daaromheen hoort een witte ring');
      assert.equal(m[rij + 3][kolom + 3], 1, 'en in het midden een blokje');
    }
  });

  test('de streepjeslijn tussen de zoekers klopt', () => {
    const m = qrMatrix('test');
    for (let i = 8; i < m.length - 8; i += 1) {
      assert.equal(m[6][i], i % 2 === 0 ? 1 : 0);
      assert.equal(m[i][6], i % 2 === 0 ? 1 : 0);
    }
  });

  test('DE CODE IS WEER TERUG TE LEZEN', () => {
    /* De belangrijkste test: erin stoppen, er weer uithalen. */
    const adressen = [
      'https://wa.me/31644379844?text=Hoi%20Justus',
      'https://audioupgradeemmen.nl',
      'tel:+31644379844',
      'a',
      'Hoi Justus, mijn systeem is gemeten op 23-09-2026 en ik heb een vraag over de preset.',
    ];
    for (const adres of adressen) {
      assert.equal(lees(qrMatrix(adres)), adres, adres);
    }
  });

  test('ook een code die net over een versiegrens gaat blijft leesbaar', () => {
    /* Elke lengte van 1 tot 120 tekens: zo komen alle versies langs, inclusief
       de sprong waar het lengteveld van 8 naar 16 bits gaat. */
    for (let n = 1; n <= 120; n += 1) {
      const tekst = 'https://audioupgradeemmen.nl/?x='.slice(0, Math.min(n, 32))
        + 'a'.repeat(Math.max(0, n - 32));
      assert.equal(lees(qrMatrix(tekst)), tekst, `lengte ${n}`);
    }
  });

  test('tekens met een accent of een euroteken overleven het ook', () => {
    for (const tekst of ['café', 'Bäckerstraße', '€ 1.234,56', 'Ünïcøde']) {
      assert.equal(lees(qrMatrix(tekst)), tekst);
    }
  });

  test('een tekst die er niet in past geeft een nette foutmelding', () => {
    assert.throws(() => qrMatrix('a'.repeat(400)), /te lang/);
  });

  test('de svg heeft een stille rand, anders vindt een telefoon hem niet', () => {
    const svg = qrSvg('https://audioupgradeemmen.nl');
    const maat = Number(svg.match(/viewBox="0 0 (\d+)/)[1]);
    const modules = qrMatrix('https://audioupgradeemmen.nl').length;
    assert.equal(maat, modules + 8, 'vier modules rand aan elke kant');
    assert.ok(svg.includes('shape-rendering="crispEdges"'), 'anders wordt hij wazig');
  });

  test('de svg tekent evenveel vierkantjes als er donkere modules zijn', () => {
    const tekst = 'https://wa.me/31644379844';
    const donker = qrMatrix(tekst).flat().filter((x) => x === 1).length;
    const svg = qrSvg(tekst);
    assert.equal((svg.match(/M\d+ \d+h1v1h-1z/g) || []).length, donker);
  });
});
