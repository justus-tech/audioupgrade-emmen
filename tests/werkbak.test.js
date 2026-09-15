/**
 * DE WERKBAK — de offerte-app.
 *
 * Twee dingen moeten hier altijd kloppen, en allebei om geld.
 *
 *   1. De rekensom. Een fout van een cent per regel valt niemand op tot een
 *      klant zijn factuur naast de offerte legt.
 *   2. Wat er NIET op de pdf staat. Inkoopprijzen, marges en het uurtarief
 *      zijn van Justus. Belanden die op een offerte, dan weet een klant —
 *      of een concurrent — precies wat hij verdient. Die test staat
 *      onderaan en is de belangrijkste van dit bestand.
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import {
  euro, naarCent, regelPrijs, totalen, marge, offertenummer, datumNl, geldigTot,
  STANDAARD_INSTELLINGEN, SOORTEN, BTW_PCT,
} from '../src/lib/werkbak/rekenen.js';
import { nieuwPdf, naarPdfTekens, breedteVan, breekAf } from '../src/lib/werkbak/pdf.js';
import { offertePdf, pdfBestandsnaam, kentekenMetStreepjes } from '../src/lib/werkbak/offerte-pdf.js';

const INST = { ...STANDAARD_INSTELLINGEN, uurtariefCent: 7500, margePct: 60, btwPct: 21 };

describe('bedragen lezen en schrijven', () => {
  test('centen worden nette euro\'s', () => {
    assert.equal(euro(69500), '€ 695,00');
    assert.equal(euro(0), '€ 0,00');
    assert.equal(euro(5), '€ 0,05');
    assert.equal(euro(123456789), '€ 1.234.567,89');
    assert.equal(euro(-1250), '-€ 12,50');
  });

  test('ingetypte bedragen worden goed gelezen', () => {
    // Alle vormen die iemand op een telefoon intypt moeten hetzelfde opleveren.
    assert.equal(naarCent('1.234,56'), 123456);
    assert.equal(naarCent('1,234.56'), 123456);
    assert.equal(naarCent('1234,56'), 123456);
    assert.equal(naarCent(1234.56), 123456);
  });

  test('"€ 89,-" is negenentachtig euro en geen nul', () => {
    // Het streepje betekent "en nul cent". Werd dat als minteken gelezen,
    // dan kwam er NaN uit en stond er stilletjes € 0,00 op de offerte.
    assert.equal(naarCent('€ 89,-'), 8900);
    assert.equal(naarCent('89,-'), 8900);
  });

  test('onzin levert nul op in plaats van een foutmelding', () => {
    for (const invoer of ['', '   ', 'abc', null, undefined]) {
      assert.equal(naarCent(invoer), 0);
    }
  });
});

describe('een regel doorrekenen', () => {
  const composet = { omschrijving: 'Composet voor', inkoopCent: 20000, margePct: 60, uren: 2 };

  test('onderdeel met marge plus montage-uren', () => {
    const p = regelPrijs(composet, INST);
    assert.equal(p.perStukExcl, 32000 + 15000, '200 + 60% = 320, plus 2 uur à 75 = 150');
    assert.equal(p.exclCent, 47000);
    assert.equal(p.btwCent, 9870);
    assert.equal(p.inclCent, 56870);
  });

  test('het aantal vermenigvuldigt alles', () => {
    const p = regelPrijs({ ...composet, aantal: 3 }, INST);
    assert.equal(p.exclCent, 47000 * 3);
    assert.equal(p.kostprijsCent, 20000 * 3);
    assert.equal(p.urenTotaal, 6);
  });

  test('een aantal van nul of min kan niet bestaan', () => {
    assert.equal(regelPrijs({ ...composet, aantal: 0 }, INST).aantal, 1);
    assert.equal(regelPrijs({ ...composet, aantal: -4 }, INST).aantal, 1);
  });

  test('zonder eigen marge geldt de marge uit de instellingen', () => {
    const zonder = regelPrijs({ inkoopCent: 10000 }, INST);
    assert.equal(zonder.perStukExcl, 16000);
  });

  test('een marge van 0% mag, en is niet hetzelfde als geen marge', () => {
    // Zou 0 hier als "niets ingevuld" gelden, dan kreeg een onderdeel dat
    // bewust zonder opslag gaat er stilletjes 60% bij.
    assert.equal(regelPrijs({ inkoopCent: 10000, margePct: 0 }, INST).perStukExcl, 10000);
  });

  test('een vaste prijs overrulet de rekensom', () => {
    // Zo staan de pakketten van de site erin: die hebben hun prijs al.
    const p = regelPrijs({ vastExclCent: 57438, inkoopCent: 22000, uren: 9 }, INST);
    assert.equal(p.exclCent, 57438);
    assert.equal(p.kostprijsCent, 22000, 'de inkoop telt nog wel mee voor de marge');
  });

  test('een pakketprijs van de site komt precies weer uit', () => {
    // € 695,00 inclusief btw moet na het rekenen weer € 695,00 zijn.
    const exclCent = Math.round(69500 / 1.21);
    assert.equal(regelPrijs({ vastExclCent: exclCent }, INST).inclCent, 69500);
  });
});

describe('de offerte bij elkaar', () => {
  const regels = [
    { vastExclCent: 57438, inkoopCent: 22000 },
    { inkoopCent: 24000, margePct: 60, uren: 3 },
  ];

  test('de totalen tellen op zoals de regels', () => {
    const t = totalen(regels, INST);
    const som = regels.reduce((n, r) => n + regelPrijs(r, INST).exclCent, 0);
    assert.equal(t.exclCent, som);
    assert.equal(t.inclCent, t.exclCent + t.btwCent);
  });

  test('het totaal wijkt geen cent af van de regels bij elkaar', () => {
    // De reden dat er in centen gerekend wordt. Met kommagetallen loopt dit
    // na een stuk of tien regels mis.
    const veel = Array.from({ length: 17 }, () => ({ inkoopCent: 3333, margePct: 33, uren: 0.7 }));
    const t = totalen(veel, INST);
    const perRegel = veel.reduce((n, r) => n + regelPrijs(r, INST).inclCent, 0);
    assert.equal(t.inclCent, perRegel);
  });

  test('de marge is de marge op de verkoopprijs', () => {
    const m = marge([{ inkoopCent: 10000, margePct: 100, uren: 0 }], INST);
    assert.equal(m.omzetCent, 20000);
    assert.equal(m.kostprijsCent, 10000);
    assert.equal(m.margeCent, 10000);
    // 100% opslag is 50% marge. Die twee door elkaar halen kost geld.
    assert.equal(Math.round(m.margePct), 50);
  });

  test('een lege offerte rekent niet stuk', () => {
    const m = marge([], INST);
    assert.equal(m.omzetCent, 0);
    assert.equal(m.margePct, 0);
  });
});

describe('nummers en datums', () => {
  test('het offertenummer heeft het jaar en drie cijfers', () => {
    assert.equal(offertenummer(14, new Date('2026-09-15')), '2026-014');
    assert.equal(offertenummer(1, new Date('2026-01-02')), '2026-001');
    assert.equal(offertenummer(999, new Date('2027-01-02')), '2027-999');
  });

  test('datums staan zoals iedereen ze in Nederland leest', () => {
    assert.equal(datumNl(new Date('2026-09-15')), '15-09-2026');
  });

  test('de geldigheid telt de dagen er netjes bij op', () => {
    assert.equal(datumNl(geldigTot(new Date('2026-09-15'), 30)), '15-10-2026');
    // Ook over een maandgrens en een jaargrens heen.
    assert.equal(datumNl(geldigTot(new Date('2026-12-20'), 30)), '19-01-2027');
  });
});

describe('het kenteken met streepjes', () => {
  const gevallen = [
    ['XX9999', null, 'XX-99-99'],
    ['9999XX', null, '99-99-XX'],
    ['99XX99', null, '99-XX-99'],
    ['XX99XX', null, 'XX-99-XX'],
    ['XX999X', null, 'XX-999-X'],
    ['X999XX', null, 'X-999-XX'],
    ['XXX99X', null, 'XXX-99-X'],
    ['X99XXX', null, 'X-99-XXX'],
    ['9XXX99', null, '9-XXX-99'],
    ['99XXX9', null, '99-XXX-9'],
  ];

  for (const [kaal, jaar, verwacht] of gevallen) {
    test(`${kaal} wordt ${verwacht}`, () => {
      assert.equal(kentekenMetStreepjes(kaal, jaar), verwacht);
    });
  }

  test('bij twee mogelijke indelingen geeft het bouwjaar de doorslag', () => {
    // 99XXXX kan 99-XX-XX (vanaf 1991) of 99-XXX-X (vanaf 2005) zijn.
    assert.equal(kentekenMetStreepjes('99XXXX', 1996), '99-XX-XX');
    assert.equal(kentekenMetStreepjes('99XXXX', 2012), '99-XXX-X');
    // XXXX99 kan XX-XX-99 (vanaf 1999) of X-XXX-99 (vanaf 2008) zijn.
    assert.equal(kentekenMetStreepjes('XXXX99', 2002), 'XX-XX-99');
    assert.equal(kentekenMetStreepjes('XXXX99', 2011), 'X-XXX-99');
  });

  test('zonder bouwjaar kiest hij de nieuwste indeling', () => {
    assert.equal(kentekenMetStreepjes('99XXXX'), '99-XXX-X');
  });

  test('wat geen Nederlands kenteken is blijft met rust', () => {
    // Liever geen streepjes dan streepjes op de verkeerde plek.
    assert.equal(kentekenMetStreepjes('ABCDEF'), 'ABCDEF');
    assert.equal(kentekenMetStreepjes('12345'), '12345');
    assert.equal(kentekenMetStreepjes(''), '');
  });

  test('streepjes en kleine letters in de invoer maken niet uit', () => {
    assert.equal(kentekenMetStreepjes('xx-99-xx'), 'XX-99-XX');
  });
});

describe('de pdf-schrijver', () => {
  test('het euroteken komt op de juiste plek terecht', () => {
    // Staat dit verkeerd, dan zie je een leeg vakje in plaats van een bedrag.
    assert.equal(naarPdfTekens('€').charCodeAt(0), 128);
    assert.equal(naarPdfTekens('ë').charCodeAt(0), 235);
  });

  test('een teken dat de pdf niet kent wordt een vraagteken', () => {
    // Liever een vraagteken dan een bestand dat niet opengaat.
    assert.equal(naarPdfTekens('emoji 😀'), 'emoji ?');
  });

  test('breedtes kloppen met de letters', () => {
    assert.ok(breedteVan('WWW', 10) > breedteVan('iii', 10));
    assert.ok(breedteVan('tekst', 10, true) > breedteVan('tekst', 10, false), 'vet is breder');
    assert.equal(breedteVan('', 10), 0);
  });

  test('afbreken houdt woorden heel', () => {
    const regels = breekAf('een tamelijk lange omschrijving van het werk', 100, 9);
    assert.ok(regels.length > 1);
    assert.equal(regels.join(' '), 'een tamelijk lange omschrijving van het werk');
    for (const regel of regels) assert.ok(breedteVan(regel, 9) <= 100 || !regel.includes(' '));
  });

  test('een leeg document levert nog steeds een geldige pdf', () => {
    const bytes = nieuwPdf().naarBytes();
    assert.ok(bytes.length > 0);
  });

  test('de inhoudsopgave achterin wijst naar de juiste bytes', () => {
    /**
     * Dit is waar een zelfgemaakte pdf op stukgaat. Achterin staat per
     * object op welke byte hij begint; klopt dat niet, dan weigert de lezer
     * het bestand. Deze test loopt die tabel na en controleert of daar ook
     * echt "<nummer> 0 obj" staat.
     */
    const doc = nieuwPdf({ titel: 'Controle' });
    doc.vlak(0, 0, 100, 20, '#ff5e1f').tekst('Test € 1.234,56', 10, 40, { grootte: 12 });
    const tekst = Buffer.from(doc.naarBytes()).toString('latin1');

    assert.ok(tekst.startsWith('%PDF-'), 'begint niet als pdf');
    assert.ok(tekst.trimEnd().endsWith('%%EOF'), 'eindigt niet als pdf');

    const startxref = Number(tekst.match(/startxref\s+(\d+)/)[1]);
    assert.equal(tekst.slice(startxref, startxref + 4), 'xref', 'startxref wijst niet naar de tabel');

    const tabel = tekst.slice(startxref);
    const posities = [...tabel.matchAll(/^(\d{10}) 00000 n/gm)].map((m) => Number(m[1]));
    assert.ok(posities.length >= 5, 'te weinig objecten in de tabel');
    posities.forEach((positie, i) => {
      assert.match(
        tekst.slice(positie, positie + 12),
        new RegExp(`^${i + 1} 0 obj`),
        `object ${i + 1} staat niet op byte ${positie}`
      );
    });
  });

  test('de bestandstitel verminkt geen leestekens', () => {
    // Een liggend streepje in de titel kwam er als "Š" uit: buiten de pagina
    // gebruikt een pdf een andere tekenset dan erop.
    const tekst = Buffer.from(nieuwPdf({ titel: 'Offerte — proef' }).naarBytes()).toString('latin1');
    assert.match(tekst, /\/Title <FEFF[0-9A-F]+>/, 'de titel is niet als UTF-16 geschreven');
    assert.doesNotMatch(tekst, /\/Title \(Offerte/, 'de titel staat nog in de verkeerde tekenset');
  });
});

/* ======================================================================
   DE BELANGRIJKSTE TEST VAN DIT BESTAND
   ====================================================================== */
describe('wat er niet op de offerte mag staan', () => {
  const datum = new Date('2026-09-15');
  const offerte = {
    nummer: '2026-014',
    datum,
    geldigTot: geldigTot(datum, 30),
    zakelijk: false,
    klant: { naam: 'Mark de Vries', telefoon: '06 12 34 56 78' },
    auto: { kenteken: 'XX99XX', merk: 'Volkswagen', model: 'Golf', bouwjaar: '2018' },
    regels: [
      { omschrijving: 'Draadloze CarPlay Upgrade', aantal: 1, vastExclCent: 57438, inkoopCent: 22222 },
      { omschrijving: 'Composet voor', aantal: 1, inkoopCent: 24444, margePct: 63, uren: 3 },
    ],
  };
  const tekst = () => Buffer.from(offertePdf(offerte, INST).naarBytes()).toString('latin1');

  test('geen inkoopprijs', () => {
    const pdf = tekst();
    for (const bedrag of ['222,22', '244,44', '22222', '24444']) {
      assert.doesNotMatch(pdf, new RegExp(bedrag.replace('.', '\\.')), `inkoop ${bedrag} staat erop`);
    }
  });

  test('geen marge', () => {
    const pdf = tekst();
    const m = marge(offerte.regels, INST);
    assert.doesNotMatch(pdf, /63\s*%/, 'het margepercentage staat erop');
    assert.doesNotMatch(pdf, /marge/i, 'het woord marge staat erop');
    // Ook het bedrag zelf mag nergens opduiken.
    assert.ok(m.margeCent > 0);
    assert.ok(!pdf.includes(euro(m.margeCent).replace('€ ', '')), 'het margebedrag staat erop');
  });

  test('geen uurtarief en geen aantal uren', () => {
    const pdf = tekst();
    assert.doesNotMatch(pdf, /75,00/, 'het uurtarief staat erop');
    assert.doesNotMatch(pdf, /uurtarief/i);
    assert.doesNotMatch(pdf, /\d\s*uur/i, 'de montage-uren staan erop');
  });

  test('wat er wél op staat: de klant, de auto en het bedrag', () => {
    const pdf = tekst();
    assert.match(pdf, /Mark de Vries/);
    assert.match(pdf, /Volkswagen Golf/);
    assert.match(pdf, /XX-99-XX/, 'het kenteken staat er niet netjes op');
    // Het bedrag op de pdf moet hetzelfde zijn als wat de app uitrekent.
    const totaal = totalen(offerte.regels, INST);
    assert.ok(
      pdf.includes(euro(totaal.inclCent).replace('€ ', '')),
      `het totaal ${euro(totaal.inclCent)} staat niet op de offerte`
    );
  });

  test('bij een particulier staan de bedragen inclusief btw', () => {
    const pdf = tekst();
    assert.match(pdf, /Inclusief montage en 21% btw/);
  });

  test('bij een zakelijke klant staan ze exclusief, met de btw apart', () => {
    const pdf = Buffer.from(
      offertePdf({ ...offerte, zakelijk: true }, INST).naarBytes()
    ).toString('latin1');
    assert.match(pdf, /Subtotaal excl\. btw/);
    assert.match(pdf, /Btw 21%/);
    assert.match(pdf, /Totaal incl\. btw/);
  });

  test('de beloftes van de site staan er ook op', () => {
    const pdf = tekst();
    assert.match(pdf, /all-in/i, 'de all-in belofte ontbreekt');
    assert.match(pdf, /fabrieksgarantie/i, 'de garantiebelofte ontbreekt');
    assert.match(pdf, /geldig tot en met 15-10-2026/);
  });

  test('een offerte met veel regels loopt door naar een tweede blad', () => {
    const veel = Array.from({ length: 22 }, (_, i) => ({
      omschrijving: `Onderdeel ${i + 1}`,
      toelichting: 'Met een toelichting die over twee regels heen loopt zodat er echt hoogte in zit.',
      inkoopCent: 5000, margePct: 50, uren: 1,
    }));
    const doc = offertePdf({ ...offerte, regels: veel }, INST);
    assert.ok(doc.paginas >= 2, `alles op ${doc.paginas} pagina — de regels vallen van het blad`);
  });

  test('de bestandsnaam zegt om welke offerte het gaat', () => {
    assert.equal(pdfBestandsnaam(offerte), 'offerte-2026-014-XX99XX.pdf');
    assert.equal(pdfBestandsnaam({ nummer: '2026-001', auto: {} }), 'offerte-2026-001.pdf');
  });
});

describe('de soorten onderdelen', () => {
  test('elke soort heeft een eigen id en een naam', () => {
    const ids = SOORTEN.map((s) => s.id);
    assert.equal(new Set(ids).size, ids.length, 'dubbele id');
    for (const soort of SOORTEN) assert.ok(soort.naam, `${soort.id} heeft geen naam`);
  });

  test('het btw-tarief staat op één plek', () => {
    assert.equal(BTW_PCT, 21);
    assert.equal(STANDAARD_INSTELLINGEN.btwPct, BTW_PCT);
  });
});

/* ====================================================================== */
const DIST = fileURLToPath(new URL('../dist/', import.meta.url));
const erIsGebouwd = existsSync(DIST);
const alsGebouwd = { skip: erIsGebouwd ? false : 'nog niet gebouwd — draai npm run build' };

describe('de werkbak blijft buiten de zoekresultaten', alsGebouwd, () => {
  const werkbak = () => readFileSync(`${DIST}werkbak.html`, 'utf8');

  test('de pagina is gebouwd', () => {
    assert.ok(existsSync(`${DIST}werkbak.html`));
  });

  test('hij zegt tegen Google dat hij niet opgenomen mag worden', () => {
    assert.match(werkbak(), /<meta name="robots" content="noindex, nofollow"/);
  });

  test('hij staat niet in de sitemap', () => {
    // De sitemap is de lijst die je zelf bij Google aanmeldt. Wat daar in
    // staat, wordt gevonden — en dit is geen pagina voor klanten.
    assert.doesNotMatch(readFileSync(`${DIST}sitemap.xml`, 'utf8'), /werkbak/);
  });

  test('geen enkele pagina van de site linkt ernaartoe', () => {
    // Zonder link komt er ook niemand per ongeluk terecht.
    const paginas = ['index', 'upgrades', 'contact', 'over-ons', 'werkwijze'];
    for (const naam of paginas) {
      const bestand = `${DIST}${naam}.html`;
      if (!existsSync(bestand)) continue;
      assert.doesNotMatch(readFileSync(bestand, 'utf8'), /href="[^"]*werkbak/, `${naam} linkt ernaartoe`);
    }
  });

  test('er staat geen inkoopprijs in de code van de pagina', () => {
    /**
     * Deze map staat openbaar op GitHub en de gebouwde pagina staat op het
     * internet. De catalogus van Justus hoort dus in zijn telefoon en niet
     * hier. Deze test let erop dat er nooit "even" een prijslijst in de
     * code wordt gezet.
     */
    const html = werkbak();
    assert.doesNotMatch(html, /inkoopCent\s*:\s*[1-9]/, 'er staat een inkoopbedrag in de pagina');
  });
});
