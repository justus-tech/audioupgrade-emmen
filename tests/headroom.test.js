/**
 * HEADROOM — de offerte-app.
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
  stuklijst, soortenIn, aanbetaling, eindafrekening, kortingNaarExcl, factuurnummer,
  STANDAARD_INSTELLINGEN, SOORTEN, BTW_PCT,
} from '../src/lib/headroom/rekenen.js';
import { nieuwPdf, naarPdfTekens, breedteVan, breekAf } from '../src/lib/headroom/pdf.js';
import { offertePdf, pdfBestandsnaam } from '../src/lib/headroom/offerte-pdf.js';
import { werkbonPdf, werkbonBestandsnaam } from '../src/lib/headroom/werkbon.js';
import { factuurPdf, factuurBestandsnaam } from '../src/lib/headroom/factuur.js';
import { blokkenVoor, stappenlijst, WERKBLOKKEN } from '../src/lib/headroom/stappen.js';
import {
  kernpunten, volledigeVoorwaarden, annuleertermijn, zonderOpmaak,
} from '../src/lib/headroom/voorwaarden.js';
import {
  agenda, agendaItem, bestelUiterlijk, dagenTussen, opMiddernacht, hoeLangNog,
  icsVoorKlus, icsBestandsnaam, icsTekst, vouwOp, ontvouw,
} from '../src/lib/headroom/agenda.js';
import { voorbereiding, voorbereidingMetWaarom } from '../src/lib/headroom/voorbereiding.js';
import {
  DOSSIER_VELDEN, autoSleutel, zoekDossier, dossierStand, leegDossier, dossierNaam,
} from '../src/lib/headroom/autos.js';
import { MODELS } from '../src/data/models.js';
import { TABBLADEN } from '../src/data/app.js';

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

  test('een kapotte datum levert niets op, geen NaN-NaN-NaN', () => {
    // Dat stond anders zo op een offerte die naar een klant gaat.
    assert.equal(datumNl('geen datum'), '');
    assert.equal(datumNl(undefined) !== '', true, 'zonder datum hoort vandaag te zijn');
  });

  test('de geldigheid telt de dagen er netjes bij op', () => {
    assert.equal(datumNl(geldigTot(new Date('2026-09-15'), 30)), '15-10-2026');
    // Ook over een maandgrens en een jaargrens heen.
    assert.equal(datumNl(geldigTot(new Date('2026-12-20'), 30)), '19-01-2027');
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
  /* Dezelfde offerte, maar zonder de bijlage met de algemene voorwaarden.
     Daarin staat "tegen het geldende uurtarief" — dat is een afspraak, geen
     bedrag. Het woord mag daar staan, maar niet in de offerte zelf. */
  const zonderBijlage = () => Buffer.from(
    offertePdf({ ...offerte, voorwaardenBijlage: false }, INST).naarBytes()
  ).toString('latin1');

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
    assert.doesNotMatch(pdf, /\d\s*uur/i, 'de montage-uren staan erop');
    assert.doesNotMatch(zonderBijlage(), /uurtarief/i);
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

describe('Headroom blijft buiten de zoekresultaten', alsGebouwd, () => {
  const headroomPagina = () => readFileSync(`${DIST}headroom.html`, 'utf8');

  test('de pagina is gebouwd', () => {
    assert.ok(existsSync(`${DIST}headroom.html`));
  });

  test('hij zegt tegen Google dat hij niet opgenomen mag worden', () => {
    assert.match(headroomPagina(), /<meta name="robots" content="noindex, nofollow"/);
  });

  test('hij staat niet in de sitemap', () => {
    // De sitemap is de lijst die je zelf bij Google aanmeldt. Wat daar in
    // staat, wordt gevonden — en dit is geen pagina voor klanten.
    assert.doesNotMatch(readFileSync(`${DIST}sitemap.xml`, 'utf8'), /headroom/);
  });

  test('geen enkele pagina van de site linkt ernaartoe', () => {
    // Zonder link komt er ook niemand per ongeluk terecht.
    const paginas = ['index', 'upgrades', 'contact', 'over-ons', 'werkwijze'];
    for (const naam of paginas) {
      const bestand = `${DIST}${naam}.html`;
      if (!existsSync(bestand)) continue;
      assert.doesNotMatch(readFileSync(bestand, 'utf8'), /href="[^"]*headroom/, `${naam} linkt ernaartoe`);
    }
  });

  test('er staat geen inkoopprijs in de code van de pagina', () => {
    /**
     * Deze map staat openbaar op GitHub en de gebouwde pagina staat op het
     * internet. De catalogus van Justus hoort dus in zijn telefoon en niet
     * hier. Deze test let erop dat er nooit "even" een prijslijst in de
     * code wordt gezet.
     */
    const html = headroomPagina();
    assert.doesNotMatch(html, /inkoopCent\s*:\s*[1-9]/, 'er staat een inkoopbedrag in de pagina');
  });
});

/* ======================================================================
   ELK KABELTJE MOET KLOPPEN
   ====================================================================== */
describe('wat er verplicht bij een onderdeel hoort', () => {
  const composet = {
    omschrijving: 'Premium 2-weg composet voor',
    artikelnummer: 'GL-165-2W',
    leverancier: 'Gladen',
    soort: 'speakers-voor',
    inkoopCent: 24000, margePct: 60, uren: 3, aantal: 1,
    toebehoren: [
      { omschrijving: 'Adapterringen VW 165 mm', artikelnummer: 'ACV-271120-05', leverancier: 'ACV', aantal: 2, inkoopCent: 1450 },
      { omschrijving: 'Speakeradapterkabel VW', artikelnummer: 'ACV-51-1210-03', leverancier: 'ACV', aantal: 2, inkoopCent: 650 },
    ],
  };

  test('de kabels tellen mee in de inkoop', () => {
    // 240,00 + 2x 14,50 + 2x 6,50 = 282,00. Tellen ze niet mee, dan lijkt de
    // marge 42 euro hoger dan hij is — elke klus opnieuw.
    const p = regelPrijs(composet, INST);
    assert.equal(p.kostprijsCent, 28200);
  });

  test('en dus ook in de verkoopprijs', () => {
    const zonder = regelPrijs({ ...composet, toebehoren: [] }, INST);
    const met = regelPrijs(composet, INST);
    assert.ok(met.exclCent > zonder.exclCent, 'de kabels zitten niet in de prijs');
    // 282,00 + 60% = 451,20, plus 3 uur à 75 = 225. Samen 676,20 excl.
    assert.equal(met.perStukExcl, 67620);
  });

  test('de marge klopt met de kabels erin', () => {
    const m = marge([composet], INST);
    assert.equal(m.kostprijsCent, 28200);
    assert.equal(m.margeCent, m.omzetCent - 28200);
  });

  test('twee composets betekent vier ringen', () => {
    const lijst = stuklijst([{ ...composet, aantal: 2 }]);
    const ringen = lijst.find((r) => r.artikelnummer === 'ACV-271120-05');
    assert.equal(ringen.aantal, 4, 'het aantal per stuk is niet vermenigvuldigd');
    assert.equal(lijst[0].aantal, 2);
  });

  test('de stuklijst noemt elk artikel met zijn nummer en leverancier', () => {
    const lijst = stuklijst([composet]);
    assert.equal(lijst.length, 3, 'niet elk artikel staat erin');
    assert.equal(lijst[0].hoofd, true);
    assert.equal(lijst[1].hoofd, false, 'toebehoren horen niet als hoofdartikel te tellen');
    for (const artikel of lijst) {
      assert.ok(artikel.omschrijving, 'artikel zonder omschrijving');
      assert.ok(artikel.artikelnummer, 'artikel zonder artikelnummer');
      assert.ok(artikel.leverancier, 'artikel zonder leverancier');
    }
  });

  test('een onderdeel zonder toebehoren levert gewoon één regel', () => {
    assert.equal(stuklijst([{ omschrijving: 'Losse rol butyl', aantal: 1 }]).length, 1);
  });
});

describe('welk werk hoort bij deze offerte', () => {
  test('losse onderdelen leveren hun eigen soort', () => {
    assert.deepEqual(
      soortenIn([{ soort: 'carplay' }, { soort: 'demping' }, { soort: 'carplay' }]).sort(),
      ['carplay', 'demping']
    );
  });

  test('een pakket raakt meerdere soorten tegelijk', () => {
    // De Akoestische Basis is speakers én demping: allebei de blokken moeten
    // op de werkbon komen, anders sla je de halve klus over.
    const soorten = soortenIn([{ soorten: ['speakers-voor', 'demping'] }]);
    assert.deepEqual(soorten.sort(), ['demping', 'speakers-voor']);
  });

  test('regels zonder soort doen geen kwaad', () => {
    assert.deepEqual(soortenIn([{ omschrijving: 'Eigen regel' }]), []);
  });
});

describe('de werkinstructie', () => {
  test('voorbereiding en afronden staan er altijd op', () => {
    const namen = blokkenVoor([]).map((b) => b.id);
    assert.deepEqual(namen, ['voorbereiding', 'afronden']);
  });

  test('alleen de blokken die bij dit werk horen', () => {
    const ids = blokkenVoor(['carplay']).map((b) => b.id);
    assert.ok(ids.includes('carplay'));
    assert.ok(!ids.includes('demping'), 'demping hoort hier niet bij');
    assert.ok(!ids.includes('speakers'), 'speakers horen hier niet bij');
  });

  test('de volgorde is die van de inbouw, niet die van de offerte', () => {
    // Deur open vóór demping, demping vóór speakers erin, afronden als laatste.
    const ids = blokkenVoor(['speakers-voor', 'demping']).map((b) => b.id);
    assert.ok(ids.indexOf('deur-open') < ids.indexOf('demping'));
    assert.ok(ids.indexOf('demping') < ids.indexOf('speakers'));
    assert.equal(ids[ids.length - 1], 'afronden');
  });

  test('de stappen zijn doorlopend genummerd over de blokken heen', () => {
    const blokken = stappenlijst(['speakers-voor', 'demping'], {});
    const nummers = blokken.flatMap((b) => b.stappen).map((s) => s.nummer);
    assert.deepEqual(nummers, nummers.map((_, i) => i + 1));
  });

  test('een vastgelegd gegeven komt in de stap te staan', () => {
    const blokken = stappenlijst(['speakers-voor'], { speakerVoor: '165 mm' });
    const stap = blokken.flatMap((b) => b.stappen).find((s) => s.veld === 'speakerVoor');
    assert.equal(stap.waarde, '165 mm');
    assert.equal(stap.invullen, false);
  });

  test('en wat niet vastligt wordt een lege regel, geen gok', () => {
    /**
     * Dit is de belangrijkste test van dit blok. Een verzonnen speakermaat of
     * stekkertype kost een middag; een verzonnen draadkleur kost de
     * fabrieksgarantie van de klant. De app hoort te zwijgen waar ze het niet
     * weet.
     */
    const blokken = stappenlijst(['speakers-voor'], {});
    const stap = blokken.flatMap((b) => b.stappen).find((s) => s.veld === 'speakerVoor');
    assert.equal(stap.waarde, '', 'er staat een waarde die nergens vandaan komt');
    assert.equal(stap.invullen, true, 'er komt geen invulregel op de bon');
  });

  test('elk blok heeft stappen en elke stap een tekst', () => {
    for (const blok of WERKBLOKKEN) {
      assert.ok(blok.naam, `${blok.id} heeft geen naam`);
      assert.ok(blok.stappen.length, `${blok.id} heeft geen stappen`);
      assert.ok(blok.soorten.length, `${blok.id} hoort bij geen enkel soort werk`);
      for (const stap of blok.stappen) assert.ok(stap.tekst, `lege stap in ${blok.id}`);
    }
  });

  test('elk veld waar een stap naar verwijst bestaat ook echt', () => {
    // Anders vraagt de werkbon om iets wat je nergens kunt invullen.
    const bekend = new Set(DOSSIER_VELDEN.map((v) => v.id));
    for (const blok of WERKBLOKKEN) {
      for (const stap of blok.stappen) {
        if (stap.meet) assert.ok(bekend.has(stap.meet), `onbekend veld: ${stap.meet}`);
      }
    }
  });
});

describe('het autodossier', () => {
  const golf = { merk: 'VOLKSWAGEN', handelsbenaming: 'GOLF VII 1.4 TSI', voertuigsoort: 'Personenauto' };

  test('de RDW-naam wordt herleid tot het model van de site', () => {
    // "GOLF VII 1.4 TSI" en "GOLF PLUS" horen bij hetzelfde dossier.
    assert.equal(autoSleutel(golf, MODELS), 'volkswagen-golf');
    assert.equal(
      autoSleutel({ ...golf, handelsbenaming: 'GOLF PLUS' }, MODELS),
      'volkswagen-golf'
    );
  });

  test('een model dat de site niet kent krijgt toch een sleutel', () => {
    assert.equal(autoSleutel({ merk: 'PROTON', handelsbenaming: 'SAVVY' }, MODELS), 'proton-savvy');
  });

  test('het bouwjaar kiest de juiste generatie', () => {
    // Een Golf 7 is geen Golf 4: andere speakers, ander scherm, andere stekker.
    const dossiers = [
      { ...leegDossier('volkswagen-golf', 'Volkswagen Golf'), vanJaar: 2013, totJaar: 2020, speakerVoor: '165 mm' },
      { ...leegDossier('volkswagen-golf', 'Volkswagen Golf'), vanJaar: 2003, totJaar: 2012, speakerVoor: '165 mm oud' },
    ];
    assert.equal(zoekDossier(dossiers, 'volkswagen-golf', 2018).vanJaar, 2013);
    assert.equal(zoekDossier(dossiers, 'volkswagen-golf', 2008).vanJaar, 2003);
  });

  test('een dossier zonder jaren geldt voor alle jaren', () => {
    const dossiers = [{ ...leegDossier('saab-9-3', 'Saab 9-3'), speakerVoor: '165 mm' }];
    assert.ok(zoekDossier(dossiers, 'saab-9-3', 1999));
    assert.ok(zoekDossier(dossiers, 'saab-9-3', 2010));
  });

  test('een onbekend model levert niets in plaats van iets willekeurigs', () => {
    assert.equal(zoekDossier([], 'volkswagen-golf', 2018), null);
    const dossiers = [{ ...leegDossier('volkswagen-golf'), vanJaar: 2013, totJaar: 2020 }];
    assert.equal(zoekDossier(dossiers, 'bmw-3-serie', 2018), null);
  });

  test('de stand zegt eerlijk wat er nog ontbreekt', () => {
    const leeg = dossierStand(null);
    assert.equal(leeg.deel, 0);
    assert.ok(leeg.ontbreekt.length, 'een leeg dossier zou compleet lijken');

    const half = dossierStand({ ...leegDossier('x'), speakerVoor: '165 mm', radio: 'MIB2' });
    assert.deepEqual(half.ontbreekt, ['stekker']);
  });

  test('opgave van de leverancier staat los van wat je zelf nameet', () => {
    /**
     * "Past volgens de leverancier" en "zelf nagemeten" zijn twee
     * verschillende dingen. Een compatibiliteitslijst van vijf jaar oud kent
     * de auto van vorig jaar niet, en een opgave is geen maat. Daarom eigen
     * velden, plus een bronveld zodat op de werkbon staat waar het vandaan
     * komt.
     */
    const ids = DOSSIER_VELDEN.map((v) => v.id);
    for (const veld of ['pastVoor', 'pastAchter', 'pastCenter', 'chassis', 'bron']) {
      assert.ok(ids.includes(veld), `${veld} ontbreekt`);
    }
    // De opgave van de leverancier telt niet mee als "zelf nagemeten": een
    // dossier met alleen die velden mag niet compleet lijken.
    const alleenOpgave = {
      ...leegDossier('bmw-3-serie'),
      pastVoor: 'ONE 202 BMW', chassis: 'E90', bron: 'lijst 2020',
    };
    assert.deepEqual(dossierStand(alleenOpgave).ontbreekt, ['speakerVoor', 'radio', 'stekker']);
  });

  test('de naam laat de bouwjaren zien', () => {
    assert.equal(
      dossierNaam({ sleutel: 'volkswagen-golf', naam: 'Volkswagen Golf', vanJaar: 2013, totJaar: 2020 }),
      'Volkswagen Golf (2013-2020)'
    );
    assert.equal(dossierNaam({ sleutel: 'x', naam: 'Zonder jaren' }), 'Zonder jaren');
  });
});

describe('de werkbon', () => {
  const datum = new Date('2026-09-15');
  const offerte = {
    nummer: '2026-014', datum,
    klant: { naam: 'Mark de Vries', telefoon: '06 12 34 56 78' },
    auto: { kenteken: 'XX99XX', merk: 'Volkswagen', model: 'Golf VII', bouwjaar: '2018' },
    regels: [
      {
        omschrijving: 'Premium 2-weg composet voor', artikelnummer: 'GL-165-2W', leverancier: 'Gladen',
        soort: 'speakers-voor', aantal: 1, inkoopCent: 24000, margePct: 63, uren: 3,
        toebehoren: [
          { omschrijving: 'Adapterringen VW 165 mm', artikelnummer: 'ACV-271120-05', leverancier: 'ACV', aantal: 2, inkoopCent: 1450 },
        ],
      },
    ],
  };
  const dossier = {
    ...leegDossier('volkswagen-golf', 'Volkswagen Golf'),
    vanJaar: 2013, totJaar: 2020,
    speakerVoor: '165 mm (6,5")', radio: 'Composition Media', stekker: 'Quadlock',
    stroom: 'Rubber doorvoer linksonder schutbord, achter de zekeringkast',
  };
  const tekst = (d = dossier) => Buffer.from(werkbonPdf(offerte, d).naarBytes()).toString('latin1');

  test('elk artikel staat erop, met artikelnummer', () => {
    const pdf = tekst();
    assert.match(pdf, /Premium 2-weg composet voor/);
    assert.match(pdf, /GL-165-2W/);
    assert.match(pdf, /Adapterringen VW 165 mm/, 'de ringen staan niet op de bon');
    assert.match(pdf, /ACV-271120-05/, 'het artikelnummer van de ringen ontbreekt');
    assert.match(pdf, /2x/, 'het aantal ringen ontbreekt');
  });

  test('de vastgelegde gegevens staan erop', () => {
    const pdf = tekst();
    assert.match(pdf, /Composition Media/);
    assert.match(pdf, /Quadlock/);
    assert.match(pdf, /165 mm/);
  });

  test('zonder dossier zegt hij dat, in plaats van iets te verzinnen', () => {
    const pdf = tekst(null);
    assert.match(pdf, /nog niets vastgelegd/i);
    assert.match(pdf, /Meet na en noteer/, 'er komen geen invulregels op de bon');
  });

  test('er staat GEEN prijs op', () => {
    /**
     * Een werkbon ligt op de bumper en gaat mee de werkplaats in. Daar hoort
     * geen inkoopprijs, geen marge en geen verkoopprijs op te liggen.
     */
    const pdf = tekst();
    for (const verboden of ['240,00', '14,50', '63\\s*%', 'marge', 'Totaal', 'btw']) {
      assert.doesNotMatch(pdf, new RegExp(verboden, 'i'), `"${verboden}" staat op de werkbon`);
    }
    assert.doesNotMatch(pdf, /€/, 'er staat een bedrag op de werkbon');
  });

  test('de bron van de gegevens staat erbij', () => {
    // Zelf nagemeten weegt zwaarder dan een lijst van vijf jaar oud. Dat
    // verschil moet je op de bon kunnen zien.
    const metBron = { ...dossier, bron: 'Gladen compatibiliteitslijst BMW, december 2020' };
    assert.match(tekst(metBron), /Bron: Gladen compatibiliteitslijst BMW, december 2020/);
  });

  test('hij zegt zelf dat hij niet naar de klant mag', () => {
    assert.match(tekst(), /niet aan de klant/i);
  });

  test('de stappen staan erop, genummerd', () => {
    const pdf = tekst();
    // De kopjes staan in hoofdletters op de bon, vandaar de i.
    assert.match(pdf, /Stap voor stap/i);
    assert.match(pdf, /Deurpaneel eruit/);
    assert.match(pdf, /Speakers monteren/);
    assert.match(pdf, /Afronden en controleren/);
  });

  test('geen enkele tekst wordt onderweg verminkt', () => {
    /**
     * De tekenset van een pdf kent geen pijl en geen vinkje. Zulke tekens
     * worden een vraagteken, en op papier zie je dat pas als het document al
     * bij de auto ligt.
     *
     * We tellen daarom vraagtekens vóór en ná de omzetting. Een stap die
     * eindigt op een échte vraag ("past de magneet vrij achter het raam?")
     * mag zijn vraagteken houden; alleen een vraagteken dat erbíj komt is
     * een verminkt teken.
     */
    const teksten = WERKBLOKKEN.flatMap((blok) =>
      blok.stappen.flatMap((stap) => [stap.tekst, stap.let].filter(Boolean))
    );
    for (const regel of teksten) {
      const voor = (regel.match(/\?/g) || []).length;
      const na = (naarPdfTekens(regel).match(/\?/g) || []).length;
      assert.equal(na, voor, `verminkt teken in: ${regel}`);
    }
  });

  test('het teken voor een vastgelegd gegeven komt er goed uit', () => {
    // Hier stond een pijl, en die bestaat niet in een pdf: op papier werd het
    // "? 165 mm" in plaats van "» 165 mm".
    const pdf = tekst();
    assert.match(pdf, /\xbb 165 mm/, 'het gegeven staat er niet netjes op');
    assert.doesNotMatch(pdf, /\? 165 mm/, 'er staat een verminkt teken voor');
  });

  test('de bon loopt netjes door over meerdere bladzijden', () => {
    const doc = werkbonPdf(offerte, dossier);
    assert.ok(doc.paginas >= 2, 'alles op één blad — dat kan niet met deze instructie');
  });

  test('de bestandsnaam zegt om welke auto het gaat', () => {
    assert.equal(werkbonBestandsnaam(offerte), 'werkbon-2026-014-XX99XX.pdf');
  });
});

/* ======================================================================
   DE AANBETALING EN DE FACTUUR
   ====================================================================== */
describe('de aanbetaling uitrekenen', () => {
  const regels = [{ vastExclCent: 57438 }, { inkoopCent: 24000, margePct: 63, uren: 3 }];
  const totaal = totalen(regels, INST);

  test('het percentage gaat over het bedrag dat de klant overmaakt', () => {
    // 30% van het totaal inclusief btw, want dat is wat er op de rekening komt.
    const a = aanbetaling(regels, INST, 30);
    assert.equal(a.inclCent, Math.round(totaal.inclCent * 0.3));
  });

  test('aanbetaling plus restant is exact het totaal', () => {
    /**
     * Hier gaat het mis als je het restant apart uitrekent in plaats van
     * aftrekt: twee keer afronden laat er een cent tussen vallen, en dan
     * klopt de eindfactuur niet met wat er al betaald is.
     */
    for (const pct of [0, 1, 7, 30, 33.3, 50, 66.67, 99, 100]) {
      const a = aanbetaling(regels, INST, pct);
      assert.equal(a.inclCent + a.restInclCent, totaal.inclCent, `bij ${pct}%`);
    }
  });

  test('bedrag zonder btw plus btw is exact de aanbetaling', () => {
    for (const pct of [7, 30, 33.3, 50, 66.67, 100]) {
      const a = aanbetaling(regels, INST, pct);
      assert.equal(a.exclCent + a.btwCent, a.inclCent, `bij ${pct}%`);
    }
  });

  test('zonder percentage geldt de standaard uit de instellingen', () => {
    const inst = { ...INST, aanbetalingPct: 40 };
    assert.equal(aanbetaling(regels, inst).pct, 40);
  });

  test('een onmogelijk percentage wordt teruggebracht tot iets mogelijks', () => {
    // Een typefout mag geen factuur van min duizend euro opleveren.
    assert.equal(aanbetaling(regels, INST, -20).pct, 0);
    assert.equal(aanbetaling(regels, INST, 500).pct, 100);
    assert.equal(aanbetaling(regels, INST, 500).inclCent, totaal.inclCent);
  });

  test('een lege offerte rekent niet stuk', () => {
    const a = aanbetaling([], INST, 30);
    assert.equal(a.inclCent, 0);
    assert.equal(a.restInclCent, 0);
  });

  test('het factuurnummer is een eigen reeks, los van de offertes', () => {
    // Anders zitten er gaten in je factuurreeks zodra een offerte niet doorgaat.
    assert.equal(factuurnummer(14, new Date('2026-09-16')), '2026-F014');
    assert.equal(factuurnummer(1, new Date('2026-01-02')), '2026-F001');
    assert.notEqual(factuurnummer(14, new Date('2026-09-16')), offertenummer(14, new Date('2026-09-16')));
  });
});

describe('de aanbetalingsfactuur', () => {
  const datum = new Date('2026-09-16');
  const inst = {
    ...INST,
    iban: 'NL91 KNAB 0417 1643 00',
    tenaamstelling: 'Audio Upgrade Emmen',
    betaaltermijnDagen: 14,
  };
  const offerte = {
    nummer: '2026-014',
    datum,
    klant: {
      naam: 'Mark de Vries',
      adres: 'Hoofdstraat 12, 7811 AA Emmen',
      email: 'mark@example.nl',
    },
    auto: { kenteken: 'XX99XX', merk: 'Volkswagen', model: 'Golf VII', bouwjaar: '2018' },
    regels: [
      { omschrijving: 'Draadloze CarPlay Upgrade', aantal: 1, vastExclCent: 57438, inkoopCent: 22222 },
      { omschrijving: 'Premium 2-weg composet voor', aantal: 1, inkoopCent: 24444, margePct: 63, uren: 3 },
    ],
  };
  const maak = (opties = {}) =>
    factuurPdf(offerte, inst, { nummer: '2026-F014', datum, percentage: 30, ...opties });
  const tekst = (opties) => Buffer.from(maak(opties).naarBytes()).toString('latin1');

  test('alles staat erop wat er volgens de Belastingdienst op moet', () => {
    const pdf = tekst();
    assert.match(pdf, /2026-F014/, 'geen factuurnummer');
    assert.match(pdf, /16-09-2026/, 'geen factuurdatum');
    assert.match(pdf, /Mark de Vries/, 'geen naam van de klant');
    assert.match(pdf, /Hoofdstraat 12/, 'geen adres van de klant');
    assert.match(pdf, /KVK 96356723/, 'geen KVK-nummer');
    assert.match(pdf, /NL005205204B66/, 'geen btw-nummer');
    assert.match(pdf, /Charles Darwinstraat/, 'geen adres van het bedrijf');
    assert.match(pdf, /Btw 21%/, 'geen btw-tarief');
  });

  test('het bedrag klopt met de rekensom van de app', () => {
    const a = aanbetaling(offerte.regels, inst, 30);
    const pdf = tekst();
    assert.ok(pdf.includes(euro(a.inclCent).replace('€ ', '')), 'het te betalen bedrag ontbreekt');
    assert.ok(pdf.includes(euro(a.exclCent).replace('€ ', '')), 'het bedrag zonder btw ontbreekt');
    assert.ok(pdf.includes(euro(a.btwCent).replace('€ ', '')), 'het btw-bedrag ontbreekt');
    assert.ok(pdf.includes(euro(a.restInclCent).replace('€ ', '')), 'het restant ontbreekt');
  });

  test('de klant kan zien hoe hij moet betalen', () => {
    const pdf = tekst();
    assert.match(pdf, /NL91 KNAB 0417 1643 00/, 'geen rekeningnummer');
    assert.match(pdf, /Audio Upgrade Emmen/, 'geen tenaamstelling');
    assert.match(pdf, /Kenmerk/, 'geen betaalkenmerk');
    assert.match(pdf, /30-09-2026/, 'geen vervaldatum (14 dagen)');
  });

  test('en waar de aanbetaling voor is', () => {
    const pdf = tekst();
    assert.match(pdf, /Aanbetaling 30% op offerte 2026-014/);
    assert.match(pdf, /Draadloze CarPlay Upgrade/);
    assert.match(pdf, /vooruitbetaling/i);
  });

  test('er staat GEEN inkoopprijs, marge of uurtarief op', () => {
    // Dezelfde regel als bij de offerte: dit gaat naar een klant toe.
    const pdf = tekst();
    for (const verboden of ['222,22', '244,44', '63\\s*%', 'marge', '75,00']) {
      assert.doesNotMatch(pdf, new RegExp(verboden, 'i'), `"${verboden}" staat op de factuur`);
    }
    // Het woord "uurtarief" hoort alleen in de voorwaarden achterin thuis.
    const zonderBijlage = Buffer.from(
      factuurPdf({ ...offerte, voorwaardenBijlage: false }, inst,
        { nummer: '2026-F014', datum, percentage: 30 }).naarBytes()
    ).toString('latin1');
    assert.doesNotMatch(zonderBijlage, /uurtarief/i);
  });

  test('zonder rekeningnummer zegt de factuur dat met zoveel woorden', () => {
    // De app blokkeert dit, maar mocht er ooit toch een doorheen glippen, dan
    // moet er geen lege regel staan waar de klant overheen leest.
    const pdf = Buffer.from(
      factuurPdf(offerte, { ...inst, iban: '' }, { nummer: '2026-F014', datum }).naarBytes()
    ).toString('latin1');
    assert.match(pdf, /nog niet ingevuld/);
  });

  test('geen enkele tekst raakt onderweg verminkt', () => {
    const zichtbaar = [...tekst().matchAll(/\(([^)]*)\) Tj/g)].map((m) => m[1]);
    const verdacht = zichtbaar.filter((regel) => /\?/.test(regel) && !/\?$/.test(regel));
    assert.deepEqual(verdacht, []);
  });

  test('de bestandsnaam zegt om welke factuur het gaat', () => {
    assert.equal(factuurBestandsnaam('2026-F014', offerte), 'factuur-2026-F014-XX99XX.pdf');
  });

  test('een offerte met veel regels loopt netjes door', () => {
    const veel = Array.from({ length: 30 }, (_, i) => ({
      omschrijving: `Onderdeel met een tamelijk lange naam nummer ${i + 1}`,
      inkoopCent: 5000, margePct: 50, uren: 1,
    }));
    const doc = factuurPdf({ ...offerte, regels: veel }, inst, { nummer: '2026-F014', datum });
    assert.ok(doc.paginas >= 1);
    const pdf = Buffer.from(doc.naarBytes()).toString('latin1');
    assert.match(pdf, /Kenmerk/, 'het betaalblok is van het blad gevallen');
  });
});

/* ======================================================================
   KORTING, EINDFACTUUR EN DE HELE KLUS IN ÉÉN KEER
   ====================================================================== */
describe('korting geven', () => {
  const regels = [{ vastExclCent: 57438, inkoopCent: 22000 }, { inkoopCent: 24000, margePct: 60, uren: 3 }];
  const kaal = totalen(regels, INST);

  test('een bedrag bij een particulier is inclusief btw', () => {
    /**
     * Typt Justus "50", dan bedoelt hij vijftig euro van het bedrag dat de
     * klant ziet. Zou de app die vijftig van het bedrag zónder btw aftrekken,
     * dan geeft hij € 60,50 weg en loopt hij 21% mis op elke korting.
     */
    const korting = kortingNaarExcl('50', kaal.exclCent, false, 21);
    const t = totalen(regels, INST, korting);
    assert.equal(t.kortingInclCent, 5000, 'de klant ziet geen vijftig euro korting');
    assert.equal(t.inclCent, kaal.inclCent - 5000);
  });

  test('bij een bedrijf is hetzelfde bedrag exclusief btw', () => {
    const korting = kortingNaarExcl('50', kaal.exclCent, true, 21);
    assert.equal(korting, 5000);
    assert.equal(totalen(regels, INST, korting).exclCent, kaal.exclCent - 5000);
  });

  test('een percentage kan ook', () => {
    const korting = kortingNaarExcl('10%', kaal.exclCent, false, 21);
    assert.equal(korting, Math.round(kaal.exclCent * 0.1));
    assert.equal(kortingNaarExcl('10 %', kaal.exclCent, false, 21), korting, 'spatie maakt niet uit');
  });

  test('onzin levert geen korting op', () => {
    for (const invoer of ['', '   ', 'abc', '0', '-20', null, undefined]) {
      assert.equal(kortingNaarExcl(invoer, kaal.exclCent, false, 21), 0, `bij ${JSON.stringify(invoer)}`);
    }
  });

  test('de korting wordt nooit groter dan de offerte zelf', () => {
    // Een typefout mag geen offerte met een negatief totaal opleveren.
    const veel = kortingNaarExcl('99999', kaal.exclCent, false, 21);
    const t = totalen(regels, INST, veel);
    assert.equal(t.exclCent, 0);
    assert.equal(t.inclCent, 0);
    assert.equal(kortingNaarExcl('500%', kaal.exclCent, false, 21), kaal.exclCent);
  });

  test('na korting klopt bedrag zonder btw plus btw nog steeds met het totaal', () => {
    for (const invoer of ['50', '10%', '1,23', '33,33%', '999']) {
      const korting = kortingNaarExcl(invoer, kaal.exclCent, false, 21);
      const t = totalen(regels, INST, korting);
      assert.equal(t.exclCent + t.btwCent, t.inclCent, `bij korting ${invoer}`);
    }
  });

  test('de korting gaat van je marge af, niet van je inkoop', () => {
    // Anders lijkt een klus met korting even winstgevend als een zonder.
    const zonder = marge(regels, INST, 0);
    const met = marge(regels, INST, 5000);
    assert.equal(met.kostprijsCent, zonder.kostprijsCent, 'de inkoop is veranderd');
    assert.equal(met.margeCent, zonder.margeCent - 5000, 'de korting komt niet van de marge af');
  });
});

describe('de eindafrekening', () => {
  const regels = [{ vastExclCent: 57438 }, { inkoopCent: 24000, margePct: 63, uren: 3 }];

  test('aanbetaling plus eindfactuur is exact het offertetotaal', () => {
    /**
     * De klant legt straks twee facturen naast elkaar. Schelen ze samen één
     * cent met de offerte, dan belt hij. Getest met en zonder korting.
     */
    for (const korting of [0, 5000, 12345]) {
      for (const pct of [0, 25, 30, 50, 66.67, 100]) {
        const a = aanbetaling(regels, INST, pct, korting);
        const e = eindafrekening(regels, INST, korting, a.inclCent);
        assert.equal(
          a.inclCent + e.teBetalenInclCent, e.totaalInclCent,
          `bij ${pct}% en korting ${korting}`
        );
        assert.equal(e.teBetalenExclCent + e.teBetalenBtwCent, e.teBetalenInclCent);
        assert.equal(e.reedsBetaaldBtwCent + e.teBetalenBtwCent, e.totaalBtwCent);
      }
    }
  });

  test('zonder aanbetaling is de eindfactuur de hele klus', () => {
    const e = eindafrekening(regels, INST, 0, 0);
    const t = totalen(regels, INST);
    assert.equal(e.teBetalenInclCent, t.inclCent);
    assert.equal(e.reedsBetaaldInclCent, 0);
  });

  test('er kan nooit meer af dan er staat', () => {
    // Een negatieve factuur bestaat niet, ook niet na een tikfout.
    const e = eindafrekening(regels, INST, 0, 99999999);
    assert.equal(e.teBetalenInclCent, 0);
    assert.equal(e.reedsBetaaldInclCent, e.totaalInclCent);
  });
});

describe('de drie soorten factuur', () => {
  const datum = new Date('2026-09-20');
  const inst = { ...INST, iban: 'NL84KNAB0776239147', tenaamstelling: 'Audio Upgrade Emmen' };
  const basis = {
    nummer: '2026-014', datum, kortingExclCent: 5000,
    klant: { naam: 'Mark de Vries', adres: 'Hoofdstraat 12, 7811 AA Emmen' },
    auto: { kenteken: 'XX99XX', merk: 'Volkswagen', model: 'Golf VII' },
    regels: [{ omschrijving: 'CarPlay', aantal: 1, vastExclCent: 57438, inkoopCent: 22222 }],
  };
  const deel = aanbetaling(basis.regels, inst, 30, basis.kortingExclCent);
  const metAanbetaling = { ...basis, factuur: { nummer: '2026-F014', inclCent: deel.inclCent } };
  const tekst = (soort, offerte = basis) => Buffer.from(
    factuurPdf(offerte, inst, { soort, nummer: '2026-F015', datum, percentage: 30 }).naarBytes()
  ).toString('latin1');

  test('de eindfactuur laat zien wat er al betaald is', () => {
    const pdf = tekst('eind', metAanbetaling);
    assert.match(pdf, /Eindafrekening offerte 2026-014/);
    // De haakjes staan in een pdf met een schuine streep ervoor, dus daar
    // zoeken we niet op.
    assert.match(pdf, /Al betaald/, 'de aanbetaling wordt niet verantwoord');
    assert.match(pdf, /2026-F014/, 'het nummer van de aanbetalingsfactuur ontbreekt');
    assert.ok(pdf.includes(euro(deel.inclCent).replace('€ ', '')), 'het betaalde bedrag ontbreekt');
    const e = eindafrekening(basis.regels, inst, basis.kortingExclCent, deel.inclCent);
    assert.ok(pdf.includes(euro(e.teBetalenInclCent).replace('€ ', '')), 'het restbedrag ontbreekt');
  });

  test('en dat de klus daarmee is afgerekend', () => {
    assert.match(tekst('eind', metAanbetaling), /volledig afgerekend/i);
    assert.match(tekst('eind', metAanbetaling), /uitgevoerd en de auto is opgeleverd/i);
  });

  test('alles ineens rekent geen aanbetaling af', () => {
    const pdf = tekst('volledig');
    assert.doesNotMatch(pdf, /Al betaald/);
    const e = eindafrekening(basis.regels, inst, basis.kortingExclCent, 0);
    assert.ok(pdf.includes(euro(e.teBetalenInclCent).replace('€ ', '')));
  });

  test('de korting staat op elke soort factuur', () => {
    for (const soort of ['eind', 'volledig']) {
      assert.match(tekst(soort, metAanbetaling), /Korting/, `ontbreekt bij ${soort}`);
    }
  });

  test('een onbekende soort valt terug op de aanbetaling', () => {
    // Liever een aanbetalingsfactuur dan een lege pagina.
    assert.match(tekst('zomaariets'), /Aanbetaling 30%/);
  });

  test('ook een eindfactuur verklapt geen inkoop of marge', () => {
    const pdf = tekst('eind', metAanbetaling);
    for (const verboden of ['222,22', 'marge', '75,00']) {
      assert.doesNotMatch(pdf, new RegExp(verboden, 'i'), `"${verboden}" staat erop`);
    }
    // Zonder de voorwaarden achterin komt het woord "uurtarief" er niet op voor.
    assert.doesNotMatch(
      tekst('eind', { ...metAanbetaling, voorwaardenBijlage: false }),
      /uurtarief/i
    );
  });
});

/**
 * DE AFSPRAKEN OP PAPIER.
 *
 * Justus appte deze dingen los na elke offerte: hoe lang hij geldig is,
 * wanneer je kosteloos kunt afzeggen, wat de garantie inhoudt. Eén vergeten
 * en het staat nergens zwart op wit. Nu staan ze op de pdf, dus moeten ze er
 * ook echt op staan — en niet per ongeluk een belofte doen die niet geldt.
 */
describe('de afspraken op de offerte en de factuur', () => {
  test('sterretjes van de site horen niet in een pdf', () => {
    assert.equal(zonderOpmaak('een **vette** kop'), 'een vette kop');
    assert.equal(zonderOpmaak(''), '');
    assert.equal(zonderOpmaak(undefined), '');
  });

  test('de annuleertermijn komt uit de eigen voorwaarden', () => {
    // Staat er in artikel 9 ineens een ander aantal dagen, dan schuift dat
    // hier vanzelf mee. Twee verschillende termijnen op één stuk papier is
    // precies de ruzie die je niet wilt.
    const dagen = annuleertermijn();
    assert.ok(Number.isInteger(dagen) && dagen > 0, `rare termijn: ${dagen}`);
    const punten = kernpunten({ annuleerDagen: dagen }).join(' ');
    assert.ok(punten.includes(`${dagen} dagen voor de afgesproken dag`));
  });

  test('op afstand afgesproken: dan staat de bedenktijd erop', () => {
    const punten = kernpunten({ opAfstand: true }).join(' ');
    assert.match(punten, /14 dagen bedenktijd/);
  });

  test('in de werkplaats afgesproken: dan juist niet', () => {
    // Er is dan geen wettelijke bedenktijd. Hem toch beloven kost Justus geld.
    const punten = kernpunten({ opAfstand: false }).join(' ');
    assert.doesNotMatch(punten, /bedenktijd/i);
    assert.doesNotMatch(punten, /herroep/i);
  });

  test('vraagt de klant om direct te beginnen, dan staat dat er ook op', () => {
    // Zonder die zin moet Justus bij afzeggen álles terugbetalen, ook het
    // werk dat er al in zit. Mét die zin alleen wat er al gedaan is.
    const met = kernpunten({ opAfstand: true, startDirect: true }).join(' ');
    assert.match(met, /uitdrukkelijk/);
    const zonder = kernpunten({ opAfstand: true, startDirect: false }).join(' ');
    assert.doesNotMatch(zonder, /uitdrukkelijk/);
  });

  test('"direct beginnen" kan niet zonder bedenktijd', () => {
    // Anders staat er een zin over 14 dagen die nergens op slaat.
    const punten = kernpunten({ opAfstand: false, startDirect: true }).join(' ');
    assert.doesNotMatch(punten, /uitdrukkelijk/);
  });

  test('een zakelijke klant krijgt geen bedenktijd en geen btw-belofte', () => {
    // De bedenktijd is een consumentenrecht, en bij een bedrijf staan de
    // bedragen exclusief btw. "Inclusief btw" zou er dan pertinent naast zitten.
    const punten = kernpunten({ opAfstand: true, startDirect: true, zakelijk: true }).join(' ');
    assert.doesNotMatch(punten, /bedenktijd/i);
    assert.doesNotMatch(punten, /inclusief montage en btw/i);
    assert.match(punten, /btw staat er apart bij/i);
  });

  test('werken op afspraak staat er nog steeds op', () => {
    // Stond op de oude offerte en hoort er nog steeds op: alles gaat op afspraak.
    assert.match(kernpunten().join(' '), /uitsluitend op afspraak/i);
  });

  test('de drie conversietroeven staan er altijd op', () => {
    for (const opties of [{ opAfstand: true }, { opAfstand: false }]) {
      const punten = kernpunten(opties).join(' ');
      assert.match(punten, /all-in/i, 'de all-in prijs ontbreekt');
      assert.match(punten, /fabrieksgarantie/i, 'de fabrieksgarantie ontbreekt');
      assert.match(punten, /levenslange garantie/i, 'de garantie op montage ontbreekt');
    }
  });

  test('op een factuur staat het eigendomsvoorbehoud, op een offerte niet', () => {
    assert.match(kernpunten({ soort: 'factuur' }).join(' '), /eigendom totdat/i);
    assert.doesNotMatch(kernpunten({ soort: 'offerte' }).join(' '), /eigendom totdat/i);
  });

  test('de geldigheidsdatum en de vervaldatum staan op het juiste stuk', () => {
    assert.match(kernpunten({ soort: 'offerte', geldigTot: '30-09-2026' }).join(' '), /30-09-2026/);
    assert.match(kernpunten({ soort: 'factuur', vervaldatum: '14-10-2026' }).join(' '), /14-10-2026/);
  });

  test('het blijven er weinig genoeg om te lezen', () => {
    // Wie vijf regels ziet leest ze, wie twintig regels ziet leest er geen een.
    assert.ok(kernpunten({ opAfstand: true, startDirect: true }).length <= 10);
  });

  test('de bijlage is één op één de voorwaarden van de site', () => {
    const v = volledigeVoorwaarden();
    assert.ok(v.artikelen.length >= 10, 'er ontbreken artikelen');
    assert.ok(v.kop && v.bijgewerkt, 'kop of datum ontbreekt');
    // Geen sterretjes meer: die betekenen in een pdf niets.
    const alles = v.artikelen.flatMap((a) => a.punten).join(' ');
    assert.doesNotMatch(alles, /\*\*/);
    // Elk artikel heeft tekst; een lege kop in een bijlage is slordig.
    for (const a of v.artikelen) {
      assert.ok(a.punten.length > 0, `${a.kop} is leeg`);
    }
  });
});

/**
 * DE VOORWAARDEN OP DE PDF ZELF.
 *
 * Voorwaarden gelden pas als de klant ze ook echt gekregen heeft. Staan ze
 * er niet op, dan kun je je er achteraf niet op beroepen.
 */
describe('de voorwaarden op de pdf', () => {
  const offerte = {
    nummer: '2026-020',
    datum: new Date('2026-09-16T10:00:00'),
    geldigTot: '30-09-2026',
    klant: { naam: 'Mark de Vries', adres: 'Hoofdstraat 12, 7811 AA Emmen' },
    auto: { kenteken: 'XX99XX', merk: 'Volkswagen', model: 'Golf VII' },
    regels: [{ omschrijving: 'CarPlay', aantal: 1, vastExclCent: 57438 }],
  };
  const lees = (extra = {}) => Buffer.from(
    offertePdf({ ...offerte, ...extra }, INST).naarBytes()
  ).toString('latin1');

  test('de korte punten staan op de offerte', () => {
    const pdf = lees();
    assert.match(pdf, /14 dagen bedenktijd/);
    assert.match(pdf, /levenslange garantie/);
    assert.match(pdf, /fabrieksgarantie/);
  });

  test('de volledige voorwaarden gaan als bijlage mee', () => {
    const pdf = lees();
    assert.match(pdf, /Artikel 1/, 'de bijlage ontbreekt');
    assert.match(pdf, /Herroeping/, 'het herroepingsrecht ontbreekt in de bijlage');
    assert.ok(pdf.match(/\/Type \/Page[^s]/g).length >= 2, 'de bijlage past niet op een pagina');
  });

  test('zet je de bijlage uit, dan is het weer één blaadje', () => {
    const pdf = lees({ voorwaardenBijlage: false });
    assert.equal(pdf.match(/\/Type \/Page[^s]/g).length, 1);
    assert.doesNotMatch(pdf, /Artikel 1/);
  });

  test('in de werkplaats afgesproken: geen bedenktijd op de offerte', () => {
    const pdf = lees({ opAfstand: false, voorwaardenBijlage: false });
    assert.doesNotMatch(pdf, /bedenktijd/i);
  });

  test('een offerte van voor deze versie krijgt gewoon de voorwaarden', () => {
    // Zonder de velden: dan gelden de standaarden, en die staan aan.
    const oud = { ...offerte };
    delete oud.opAfstand;
    delete oud.voorwaardenBijlage;
    const pdf = Buffer.from(offertePdf(oud, INST).naarBytes()).toString('latin1');
    assert.match(pdf, /14 dagen bedenktijd/);
    assert.match(pdf, /Artikel 1/);
  });

  test('de factuur krijgt dezelfde afspraken mee', () => {
    const pdf = Buffer.from(
      factuurPdf(offerte, { ...INST, iban: 'NL00BANK0123456789' },
        { nummer: '2026-F020', datum: offerte.datum, percentage: 30 }).naarBytes()
    ).toString('latin1');
    assert.match(pdf, /14 dagen bedenktijd/);
    assert.match(pdf, /eigendom totdat/i);
    assert.match(pdf, /Artikel 1/);
  });
});

/**
 * DE AGENDA.
 *
 * Een inbouw gaat niet mis op de dag zelf, maar twee weken eerder toen de
 * onderdelen nog niet besteld waren. Daarom moeten deze datums kloppen — en
 * moet er nooit "bestellen" staan bij een klant die nog niet aanbetaald heeft.
 */
describe('de agenda', () => {
  const inst = { bestelDagen: 14 };
  const vandaag = new Date(2026, 8, 16);   // 16 september 2026
  const klus = (extra = {}) => ({
    nummer: '2026-014',
    klant: { naam: 'Mark de Vries', telefoon: '0612345678' },
    auto: { merk: 'Volkswagen', model: 'Golf VII', kenteken: 'XX99XX' },
    regels: [{ omschrijving: 'CarPlay', soort: 'carplay', aantal: 1, vastExclCent: 57438 }],
    inbouwdatum: '2026-10-07',
    inbouwtijd: '09:00',
    status: 'verstuurd',
    ...extra,
  });

  test('een datum schuift niet op door de tijdzone', () => {
    // new Date('2026-10-07') is middernacht in Greenwich. Links van ons is dat
    // 6 oktober, en dan staat de klant een dag te vroeg voor de deur.
    const d = opMiddernacht('2026-10-07');
    assert.equal(d.getDate(), 7);
    assert.equal(d.getMonth(), 9);
    assert.equal(d.getFullYear(), 2026);
  });

  test('dagen tellen gaat over de zomertijd heen goed', () => {
    // In de nacht van 25 oktober 2026 gaat de klok een uur terug. Reken je in
    // uren, dan kom je er een dag naast te zitten.
    assert.equal(dagenTussen('2026-10-20', '2026-11-03'), 14);
    assert.equal(dagenTussen('2026-03-25', '2026-04-08'), 14);
  });

  test('de besteldag ligt het ingestelde aantal dagen ervoor', () => {
    assert.equal(datumNl(bestelUiterlijk('2026-10-07', 14)), '23-09-2026');
    assert.equal(datumNl(bestelUiterlijk('2026-10-07', 21)), '16-09-2026');
    // Ook over een maandgrens heen.
    assert.equal(datumNl(bestelUiterlijk('2026-01-05', 14)), '22-12-2025');
  });

  test('hoe lang nog staat er in gewone taal', () => {
    assert.equal(hoeLangNog(0), 'vandaag');
    assert.equal(hoeLangNog(1), 'morgen');
    assert.equal(hoeLangNog(-1), 'gisteren');
    assert.equal(hoeLangNog(9), 'over 9 dagen');
    assert.equal(hoeLangNog(-4), '4 dagen geleden');
  });

  test('zonder aanbetaling zegt de app: nog niet bestellen', () => {
    // De belangrijkste regel van dit hele scherm. Bestel je op eigen kosten
    // voor een klant die niet aanbetaalt, dan lig jij met de onderdelen.
    const i = agendaItem(klus({ status: 'verstuurd' }), inst, vandaag);
    assert.equal(i.aanbetaald, false);
    assert.equal(i.bestellen, 'wacht');
  });

  test('met aanbetaling en de besteldag bereikt: nu bestellen', () => {
    const i = agendaItem(klus({ status: 'aanbetaald' }), inst, new Date(2026, 8, 23));
    assert.equal(i.bestellen, 'nu');
    assert.equal(i.bestelDagenTot, 0);
  });

  test('met aanbetaling en nog tijd zeurt hij niet', () => {
    const i = agendaItem(klus({ status: 'aanbetaald' }), inst, vandaag);
    assert.equal(i.bestellen, 'straks');
  });

  test('besteldag voorbij zonder aanbetaling is te laat', () => {
    const i = agendaItem(klus({ status: 'verstuurd' }), inst, new Date(2026, 8, 30));
    assert.equal(i.bestellen, 'te-laat');
  });

  test('is er besteld, dan houdt hij erover op', () => {
    const i = agendaItem(klus({ status: 'aanbetaald', besteld: true }), inst, new Date(2026, 8, 30));
    assert.equal(i.bestellen, 'gedaan');
  });

  test('een klus zonder datum staat niet in de agenda', () => {
    assert.equal(agendaItem(klus({ inbouwdatum: '' }), inst, vandaag), null);
    assert.equal(agenda([klus({ inbouwdatum: '' }), klus()], inst, vandaag).length, 1);
  });

  test('de eerstvolgende klus staat bovenaan', () => {
    const lijst = agenda([
      klus({ nummer: 'a', inbouwdatum: '2026-11-02' }),
      klus({ nummer: 'b', inbouwdatum: '2026-09-20' }),
      klus({ nummer: 'c', inbouwdatum: '2026-10-07' }),
    ], inst, vandaag);
    assert.deepEqual(lijst.map((i) => i.nummer), ['b', 'c', 'a']);
  });
});

/**
 * HET AGENDABESTAND.
 *
 * Dit is wat de melding daadwerkelijk geeft: de app kan dat zelf niet, de
 * agenda op de telefoon wel. Gaat hier iets mis, dan piept er niets en staat
 * Justus op een dinsdag zonder onderdelen.
 */
describe('het agendabestand', () => {
  const item = agendaItem({
    nummer: '2026-014',
    klant: { naam: 'Mark, de Vries; en zoon', telefoon: '0612345678' },
    auto: { merk: 'Volkswagen', model: 'Golf VII', kenteken: 'XX99XX' },
    inbouwdatum: '2026-10-07',
    inbouwtijd: '09:00',
    status: 'aanbetaald',
  }, { bestelDagen: 14 }, new Date(2026, 8, 16));
  const ics = () => icsVoorKlus(item, { voorbereiding: voorbereiding({ regels: [] }) });
  /* Een lange regel staat in stukken in het bestand. Een agenda plakt hem bij
     het inlezen weer aan elkaar; om te controleren wat er staat doen wij dat
     hier ook. */
  const gelezen = (t = ics()) => ontvouw(t);

  test('het is een geldig agendabestand', () => {
    const t = ics();
    assert.match(t, /^BEGIN:VCALENDAR\r\n/);
    assert.match(t, /END:VCALENDAR\r\n$/);
    assert.match(t, /VERSION:2\.0/);
    // Regeleindes met een wagenretour: zonder dat weigeren sommige agenda's hem.
    assert.ok(!/[^\r]\n/.test(t), 'er staat een regeleinde zonder wagenretour in');
  });

  test('er staan twee afspraken in: de inbouw en het bestellen', () => {
    const t = ics();
    assert.equal(t.match(/BEGIN:VEVENT/g).length, 2);
    assert.match(t, /DTSTART:20261007T090000/, 'de inbouwdag klopt niet');
    assert.match(t, /DTSTART:20260923T080000/, 'de besteldag klopt niet');
  });

  test('de wekkers staan een week en een dag van tevoren', () => {
    const t = ics();
    assert.match(t, /TRIGGER:-P7D/, 'de wekker van een week vooraf ontbreekt');
    assert.match(t, /TRIGGER:-P1D/, 'de wekker van een dag vooraf ontbreekt');
    assert.equal(t.match(/BEGIN:VALARM/g).length, 3);
  });

  test('een komma in een klantnaam breekt het bestand niet', () => {
    // Zonder ontsnappen houdt de agenda de helft van de regel over.
    assert.match(gelezen(), /Mark\\, de Vries\\; en zoon/);
    assert.equal(icsTekst('a,b;c\\d\ne'), 'a\\,b\\;c\\\\d\\ne');
  });

  test('geen regel langer dan 75 tekens', () => {
    // Dat is de grens die de norm stelt; erboven weigeren agenda's het bestand.
    for (const regel of ics().split('\r\n')) {
      assert.ok(regel.length <= 75, `te lang (${regel.length}): ${regel.slice(0, 40)}...`);
    }
    // En wat opgevouwen is moet met een spatie beginnen, anders is het een
    // nieuwe regel in plaats van een vervolg.
    assert.deepEqual(vouwOp('x'.repeat(150)).slice(1).map((r) => r[0]), [' ', ' ']);
    // En na het weer aan elkaar plakken moet er hetzelfde staan als ervoor.
    assert.equal(ontvouw(vouwOp('x'.repeat(150)).join('\r\n')), 'x'.repeat(150));
  });

  test('de voorbereiding gaat mee in de afspraak', () => {
    const t = gelezen(icsVoorKlus(item, { voorbereiding: voorbereiding({ regels: [{ soort: 'dsp' }] }) }));
    assert.match(t, /Werkbon uitgedraaid/);
    assert.match(t, /tuningsoftware/, 'de dsp-stap ontbreekt');
  });

  test('de bestandsnaam zegt om welke auto het gaat', () => {
    assert.equal(icsBestandsnaam(item), 'inbouw-2026-014-XX99XX.ics');
  });
});

/**
 * DE VOORBEREIDING.
 *
 * Twee lijstjes: een week vooraf en de dag ervoor. Ze moeten meebewegen met
 * wat er op de offerte staat — een dsp-stap bij een klus zonder dsp is ruis,
 * en ruis is hoe je stopt met lezen.
 */
describe('de voorbereiding', () => {
  test('altijd-stappen staan er bij elke klus op', () => {
    const v = voorbereiding({ regels: [] });
    assert.ok(v.week.some((t) => /Onderdelen besteld/.test(t)));
    assert.ok(v.dag.some((t) => /uitgepakt en gecontroleerd/.test(t)));
    assert.ok(v.dag.some((t) => /Werkbon/.test(t)));
  });

  test('stappen die er niet bij horen blijven weg', () => {
    const zonder = voorbereiding({ regels: [{ soort: 'carplay' }] });
    assert.ok(!zonder.dag.some((t) => /tuningsoftware/.test(t)), 'dsp-stap bij een klus zonder dsp');
    const met = voorbereiding({ regels: [{ soort: 'dsp' }] });
    assert.ok(met.dag.some((t) => /tuningsoftware/.test(t)));
  });

  test('bij carplay wordt naar het fabrieksscherm gevraagd', () => {
    const v = voorbereiding({ regels: [{ soort: 'carplay' }] });
    assert.ok(v.week.some((t) => /fabrieksscherm/i.test(t)));
  });

  test('het blijven lijstjes die je nog leest', () => {
    const v = voorbereiding({ regels: [{ soort: 'carplay' }, { soort: 'dsp' }, { soort: 'demping' }] });
    assert.ok(v.week.length <= 9, `te lang: ${v.week.length}`);
    assert.ok(v.dag.length <= 10, `te lang: ${v.dag.length}`);
  });

  test('op het scherm staat er uitleg bij waar dat helpt', () => {
    const v = voorbereidingMetWaarom({ regels: [] });
    assert.ok(v.dag.every((s) => typeof s.tekst === 'string'));
    assert.ok(v.dag.some((s) => s.waarom), 'nergens uitleg');
  });
});

/**
 * DE SNELKOPPELINGEN NAAR ELK TABBLAD.
 *
 * Justus wil de agenda rechtstreeks vanaf zijn beginscherm kunnen openen.
 * Daarvoor moet elk tabblad een eigen adres hebben, en moeten die adressen in
 * het app-bestand staan. Klopt er één niet, dan kom je op de offerte uit.
 */
describe('elk tabblad heeft een eigen adres', alsGebouwd, () => {
  const manifest = () => JSON.parse(readFileSync(`${DIST}headroom-manifest.json`, 'utf8'));

  test('de snelkoppelingen staan in het app-bestand', () => {
    const kort = manifest().shortcuts;
    assert.ok(Array.isArray(kort) && kort.length >= 4, 'er staan geen snelkoppelingen in');
    // Agenda bovenaan: Samsung toont er maar een paar, en dit is wat je
    // 's ochtends wilt zien.
    assert.equal(kort[0].name, 'Agenda');
  });

  test('elke snelkoppeling wijst naar een bestaand tabblad', () => {
    const html = readFileSync(`${DIST}headroom.html`, 'utf8');
    for (const kort of manifest().shortcuts) {
      const tab = new URL(kort.url, 'https://audioupgradeemmen.nl').searchParams.get('tab');
      assert.ok(tab, `geen tabblad in ${kort.url}`);
      assert.ok(TABBLADEN.some((t) => t.id === tab), `onbekend tabblad: ${tab}`);
      assert.match(html, new RegExp(`data-paneel="${tab}"`), `het paneel ${tab} bestaat niet`);
      assert.ok(kort.icons?.length, `${kort.name} heeft geen icoon`);
    }
  });

  test('elke snelkoppeling begint binnen de app', () => {
    // Valt een adres buiten het bereik van de app, dan opent hij in een
    // browservenster met adresbalk in plaats van als app.
    const m = manifest();
    for (const kort of m.shortcuts) {
      assert.ok(kort.url.startsWith(m.scope), `${kort.url} valt buiten ${m.scope}`);
    }
  });
});
