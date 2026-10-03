/**
 * HET BEDRADINGSPLAN — kabeldiktes, zekeringen en impedanties narekenen.
 *
 * Dit gaat over brandveiligheid, niet over smaak. Een zekering die groter is
 * dan de kabel aankan, of een massa die dunner is dan de plus, ziet er op
 * een tekening prima uit en smelt in de auto. Elke test hieronder legt een
 * regel vast die zo'n fout tegenhoudt.
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  VOEDING, ZEKERINGEN, kiesZekering, kiesVoeding, kiesLuidspreker, verlies,
  subImpedantie, eindImpedantie, versterkerStroom, leesVermogen, leesSpoelen,
  leegPlan, nieuwComponent, planUitOfferte, bouwPlan, stroomSchema, audioSchema,
  zoekDing, bedradingHtml, kabellijst,
} from '../src/lib/headroom/bedrading.js';

/** Een plan met een 4-kanaals versterker, een monoblok en een sub. */
function standaardPlan() {
  const plan = planUitOfferte({
    regels: [
      { id: 'r1', soort: 'carplay', omschrijving: 'Alpine iLX-705D', aantal: 1 },
      { id: 'r2', soort: 'versterker', omschrijving: 'Musway M4 4x100W', aantal: 1 },
      { id: 'r3', soort: 'versterker', omschrijving: 'JL Audio monoblok', aantal: 1 },
      { id: 'r4', soort: 'subwoofer', omschrijving: 'JL 12W3v3-D4', aantal: 1 },
      { id: 'r5', soort: 'speakers-voor', omschrijving: 'Gladen composet', aantal: 1 },
    ],
  });
  plan.componenten.find((c) => c.regelId === 'r3').wattPerKanaal = '800';
  return plan;
}

describe('de zekering beschermt de kabel', () => {
  test('een zekering is altijd een waarde die je kunt kopen', () => {
    assert.equal(kiesZekering(54.3), 60);
    assert.equal(kiesZekering(60), 60);
    assert.equal(kiesZekering(108.7), 125);
    assert.equal(kiesZekering(301), null, 'boven 300 A bestaat er geen enkele zekering meer voor');
  });

  test('geen enkele kabel krijgt een zekering die groter is dan hij aankan', () => {
    const u = bouwPlan(standaardPlan());
    for (const k of u.kabels.filter((x) => x.soort === 'plus' && x.maat)) {
      const zek = k.zekeringA ?? u.zekeringen.find((z) => z.id === 'hoofdzekering').waardeA;
      assert.ok(zek <= k.maat.maxA, `${k.id}: ${zek} A op een kabel van ${k.maat.maxA} A`);
    }
  });

  test('een dikkere kabel draagt altijd meer', () => {
    for (let i = 1; i < VOEDING.length; i += 1) {
      assert.ok(VOEDING[i].mm2 > VOEDING[i - 1].mm2);
      assert.ok(VOEDING[i].maxA > VOEDING[i - 1].maxA);
    }
  });

  test('de zekeringen staan op volgorde, zonder dubbele', () => {
    assert.deepEqual([...ZEKERINGEN].sort((a, b) => a - b), ZEKERINGEN);
    assert.equal(new Set(ZEKERINGEN).size, ZEKERINGEN.length);
  });

  test('CCA moet dikker dan OFC voor dezelfde klus', () => {
    const ofc = kiesVoeding({ zekeringA: 100, stroomA: 100, lengteM: 5, maxVerlies: 0.4, koper: 'ofc' });
    const cca = kiesVoeding({ zekeringA: 100, stroomA: 100, lengteM: 5, maxVerlies: 0.4, koper: 'cca' });
    assert.ok(cca.mm2 > ofc.mm2);
  });

  test('een langere kabel moet dikker', () => {
    const kort = kiesVoeding({ zekeringA: 80, stroomA: 80, lengteM: 1.5, maxVerlies: 0.4 });
    const lang = kiesVoeding({ zekeringA: 80, stroomA: 80, lengteM: 6, maxVerlies: 0.4 });
    assert.ok(lang.mm2 > kort.mm2, `${kort.awg} AWG kort, ${lang.awg} AWG lang`);
  });

  test('spanningsverlies volgt de wet van Ohm', () => {
    // 100 A over 5 m koper van 21,2 mm²: 100 × 0,0175 × 5 / 21,2 = 0,41 V.
    assert.equal(Math.round(verlies(100, 5, 21.2) * 100) / 100, 0.41);
  });
});

describe('de massa', () => {
  test('is overal precies even dik als de plus ernaast', () => {
    // De fout uit het schema op internet: 4 AWG massa naast 8 AWG plus.
    const u = bouwPlan(standaardPlan());
    for (const massa of u.kabels.filter((k) => k.soort === 'massa' && k.van !== 'accu')) {
      const plus = u.kabels.find((k) => k.id === `plus-${massa.van}`);
      assert.equal(massa.maat.mm2, plus.maat.mm2, massa.id);
    }
  });

  test('een lange massa krijgt een waarschuwing', () => {
    const plan = standaardPlan();
    const amp = plan.componenten.find((c) => c.soort === 'versterker');
    plan.lengtes[`massa-${amp.id}`] = 2;
    const u = bouwPlan(plan);
    assert.ok(u.waarschuwingen.some((w) => w.bij === `massa-${amp.id}`));
  });
});

describe('de stroom van een versterker', () => {
  test('rekent met rendement en de spanning bij draaiende motor', () => {
    // 4 × 100 W in klasse D: 400 / 0,8 / 13,8 = 36 A.
    assert.equal(Math.round(versterkerStroom({ kanalen: 4, wattPerKanaal: 100, klasse: 'D' })), 36);
    // Klasse A/B verstookt meer: zelfde vermogen, meer stroom.
    assert.ok(versterkerStroom({ kanalen: 4, wattPerKanaal: 100, klasse: 'AB' }) > 36);
  });

  test('de zekering in de versterker gaat voor op de rekensom', () => {
    const plan = standaardPlan();
    const amp = plan.componenten.find((c) => c.regelId === 'r2');
    amp.zekeringIntern = '50';
    const u = bouwPlan(plan);
    assert.equal(u.zekeringen.find((z) => z.id === `zek-${amp.id}`).waardeA, 50);
  });

  test('zonder vermogen geen getal, maar een melding', () => {
    // Een gok tekenen is erger dan niets tekenen: een te kleine kabel ziet
    // er op papier net zo netjes uit.
    const plan = standaardPlan();
    plan.componenten.find((c) => c.regelId === 'r3').wattPerKanaal = '';
    const u = bouwPlan(plan);
    assert.equal(u.zekeringen.find((z) => z.id === 'hoofdzekering').waardeA, null);
    assert.equal(u.kabels.find((k) => k.id === 'plus-voeding').maat, null);
    assert.ok(u.waarschuwingen.some((w) => w.ernst === 'fout' && /vermogen niet/.test(w.tekst)));
  });

  test('hoofdzekering bij de accu en verdeelblok bij meer dan één versterker', () => {
    const u = bouwPlan(standaardPlan());
    const hoofd = u.zekeringen.find((z) => z.id === 'hoofdzekering');
    assert.equal(hoofd.waardeA, 125);
    assert.match(hoofd.plek, /45 cm/);
    assert.ok(u.knopen.some((k) => k.id === 'verdeelblok'));
    assert.equal(u.zekeringen.filter((z) => z.id.startsWith('zek-')).length, 2);
  });

  test('één versterker: geen verdeelblok, de hoofdzekering beschermt hem', () => {
    const plan = leegPlan();
    nieuwComponent(plan, 'versterker', { kanalen: '4', wattPerKanaal: '75' });
    const u = bouwPlan(plan);
    assert.equal(u.knopen.some((k) => k.id === 'verdeelblok'), false);
    assert.equal(u.zekeringen.length, 1);
  });

  test('alleen speakers en CarPlay: niets aan de voeding', () => {
    const plan = planUitOfferte({ regels: [{ id: 'a', soort: 'carplay', omschrijving: 'CarPlay' }, { id: 'b', soort: 'speakers-voor', omschrijving: 'Composet' }] });
    const u = bouwPlan(plan);
    assert.equal(u.zekeringen.length, 0);
    assert.equal(u.kabels.filter((k) => k.soort === 'plus').length, 0);
  });

  test('boven de 100 A komt de Big 3 op tafel', () => {
    const u = bouwPlan(standaardPlan());
    assert.ok(u.kabels.find((k) => k.id === 'massa-accu').advies);
  });
});

describe('de subwoofer', () => {
  test('spoelen parallel halveren, in serie verdubbelen', () => {
    assert.equal(subImpedantie({ spoelen: 2, ohmPerSpoel: 4, schakeling: 'parallel' }), 2);
    assert.equal(subImpedantie({ spoelen: 2, ohmPerSpoel: 4, schakeling: 'serie' }), 8);
    assert.equal(subImpedantie({ spoelen: 1, ohmPerSpoel: 4 }), 4);
    // Twee dual-2Ω subs parallel: 1 Ω per sub, samen 0,5 Ω.
    assert.equal(eindImpedantie({ aantal: 2, spoelen: 2, ohmPerSpoel: 2, schakeling: 'parallel' }), 0.5);
  });

  test('onder de impedantie van de versterker is een fout', () => {
    const plan = standaardPlan();
    const sub = plan.componenten.find((c) => c.soort === 'subwoofer');
    Object.assign(sub, { aantal: '2', spoelen: '2', ohmPerSpoel: '2', schakeling: 'parallel' });
    const u = bouwPlan(plan);
    assert.ok(u.waarschuwingen.some((w) => w.bij === sub.id && w.ernst === 'fout'));
    // In serie komen ze op 2 Ω: dat kan de monoblok (1 Ω) gewoon aan.
    sub.schakeling = 'serie';
    assert.equal(bouwPlan(plan).waarschuwingen.some((w) => w.bij === sub.id && w.ernst === 'fout'), false);
  });

  test('zonder spoelen geen impedantie, en dat staat erbij', () => {
    const plan = standaardPlan();
    Object.assign(plan.componenten.find((c) => c.soort === 'subwoofer'), { spoelen: '', ohmPerSpoel: '' });
    assert.ok(bouwPlan(plan).waarschuwingen.some((w) => /spoelen niet/.test(w.tekst)));
  });
});

describe('kanalen en luidsprekerkabel', () => {
  test('een monoblok stuurt geen speakers aan', () => {
    const plan = standaardPlan();
    const mono = plan.componenten.find((c) => c.regelId === 'r3');
    plan.componenten.find((c) => c.soort === 'speakers').door = mono.id;
    assert.ok(bouwPlan(plan).waarschuwingen.some((w) => w.bij === mono.id && /monoblok/.test(w.tekst)));
  });

  test('te weinig kanalen is een fout', () => {
    const plan = standaardPlan();
    const vier = plan.componenten.find((c) => c.regelId === 'r2');
    nieuwComponent(plan, 'speakers', { positie: 'achter', door: vier.id });
    nieuwComponent(plan, 'speakers', { positie: 'center', door: vier.id });
    assert.ok(bouwPlan(plan).waarschuwingen.some((w) => w.bij === vier.id && /kanalen/.test(w.tekst)));
  });

  test('meer vermogen en lagere impedantie vragen dikkere kabel', () => {
    const dun = kiesLuidspreker({ watt: 75, ohm: 4, lengteM: 4 });
    const dik = kiesLuidspreker({ watt: 800, ohm: 1, lengteM: 1.5 });
    assert.ok(dik.mm2 > dun.mm2);
    assert.ok(dun.mm2 >= 1.5, 'nooit dunner dan 1,5 mm² achter een versterker');
  });

  test('speakers op de fabrieksradio houden hun fabrieksbedrading', () => {
    const plan = planUitOfferte({ regels: [{ id: 'b', soort: 'speakers-voor', omschrijving: 'Composet' }] });
    const kabel = bouwPlan(plan).kabels.find((k) => k.soort === 'speaker');
    assert.equal(kabel.status, 'bestaand');
    assert.equal(kabel.maat, null);
  });
});

describe('uit de offerte', () => {
  test('vermogen en spoelen uit de naam, en verder niets verzonnen', () => {
    assert.deepEqual(leesVermogen('Musway M4 4x100W'), { kanalen: 4, watt: 100 });
    assert.deepEqual(leesVermogen('Monoblok 800 W'), { kanalen: 1, watt: 800 });
    assert.equal(leesVermogen('Versterker'), null);
    assert.deepEqual(leesSpoelen('JL 12W3v3-D4'), { spoelen: 2, ohmPerSpoel: 4 });
    assert.deepEqual(leesSpoelen('Alpine S2'), { spoelen: 1, ohmPerSpoel: 2 });
    assert.equal(leesSpoelen('Subwoofer 30 cm'), null);
  });

  test('CarPlay vervangt de radio, speakers voor worden vervangen, de rest is nieuw', () => {
    const plan = standaardPlan();
    const bron = plan.componenten.find((c) => c.soort === 'bron');
    assert.equal(bron.status, 'vervangen');
    assert.equal(plan.componenten.find((c) => c.soort === 'speakers').status, 'vervangen');
    assert.ok(plan.componenten.filter((c) => c.soort === 'versterker').every((c) => c.status === 'nieuw'));
  });

  test('de sub gaat naar de monoblok, de speakers naar de 4-kanaals', () => {
    const plan = standaardPlan();
    const mono = plan.componenten.find((c) => c.regelId === 'r3');
    const vier = plan.componenten.find((c) => c.regelId === 'r2');
    assert.equal(plan.componenten.find((c) => c.soort === 'subwoofer').door, mono.id);
    assert.equal(plan.componenten.find((c) => c.soort === 'speakers').door, vier.id);
  });

  test('het autodossier vult de fabrieksversterker en de speakers achter', () => {
    const plan = planUitOfferte({ regels: [] }, { versterker: 'Dynaudio', speakerAchter: '165 mm' });
    assert.ok(plan.componenten.some((c) => c.soort === 'fabrieksversterker' && c.status === 'bestaand'));
    assert.ok(plan.componenten.some((c) => c.soort === 'speakers' && c.positie === 'achter' && c.status === 'bestaand'));
    // "nee" is geen versterker.
    assert.equal(planUitOfferte({ regels: [] }, { versterker: 'nee' }).componenten.length, 1);
  });
});

describe('de tekening', () => {
  test('elke kabel, zekering en elk onderdeel is aan te tikken en heeft een popup', () => {
    const plan = standaardPlan();
    const u = bouwPlan(plan);
    const svg = stroomSchema(u, plan) + audioSchema(u);
    const dingen = [...svg.matchAll(/data-ding="([^"]+)"/g)].map((m) => m[1]);
    assert.ok(dingen.length > 15);
    for (const ding of dingen) {
      const gevonden = zoekDing(u, ding);
      assert.ok(gevonden, `geen popup voor ${ding}`);
      assert.ok(gevonden.rijen.length, `${ding} heeft geen waarden`);
    }
    assert.ok(dingen.includes('zekering:hoofdzekering') || dingen.includes('knoop:hoofdzekering'));
    assert.ok(dingen.some((d) => d.startsWith('zekering:zek-')), 'de takzekeringen staan in de tekening');
  });

  test('tekst van de gebruiker komt nooit rauw in de tekening', () => {
    const plan = leegPlan();
    nieuwComponent(plan, 'versterker', { naam: '<img src=x onerror=alert(1)>', kanalen: '4', wattPerKanaal: '50' });
    const u = bouwPlan(plan);
    const html = stroomSchema(u, plan) + audioSchema(u) + bedradingHtml(u, plan, { klant: { naam: '<b>' } });
    assert.equal(html.includes('<img'), false);
    assert.equal(html.includes('<b>'), false);
  });

  test('de tekening past op een telefoon: 360 breed', () => {
    const u = bouwPlan(standaardPlan());
    assert.match(audioSchema(u), /viewBox="0 0 360 /);
  });

  test('geen losse kleuren: alles via de stijl', () => {
    const plan = standaardPlan();
    const u = bouwPlan(plan);
    assert.equal(/#[0-9a-f]{3,6}\b/i.test(stroomSchema(u, plan) + audioSchema(u)), false);
  });
});

describe('de kabellijst', () => {
  test('telt alleen wat er nieuw bij komt, met speling', () => {
    const lijst = kabellijst([
      { soort: 'plus', status: 'nieuw', maat: VOEDING[6], lengteM: 5, aantal: 1 },
      { soort: 'plus', status: 'nieuw', maat: VOEDING[6], lengteM: 0.3, aantal: 1 },
      { soort: 'massa', status: 'bestaand', maat: VOEDING[6], lengteM: 0.5, aantal: 1 },
    ]);
    assert.equal(lijst.length, 1);
    assert.equal(lijst[0].klaarleggen, 8, '5,3 m plus een meter per stuk, naar boven afgerond');
  });
});
