/**
 * De vertaling van RDW-gegevens naar wat ze betekenen voor het geluid.
 *
 * Belangrijk hier: de site mag NOOIT iets beweren wat niet uit de gegevens
 * volgt. Ontbreekt een veld, dan hoort dat punt gewoon weg te vallen — niet
 * een halve zin of een "undefined" op het scherm.
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  bouwjaar,
  leeftijd,
  brandstofSoort,
  inzichten,
  kenmerken,
} from '../src/lib/voertuig.js';

/** Vaste datum, anders veranderen de uitkomsten elk jaar. */
const NU = new Date('2026-08-14T12:00:00Z');

describe('bouwjaar', () => {
  test('leest het jaar uit een RDW-datum', () => {
    assert.equal(bouwjaar('19990906'), 1999);
    assert.equal(bouwjaar('20240101'), 2024);
  });

  test('geeft null bij onzin in plaats van een raar jaartal', () => {
    for (const invoer of ['', null, undefined, 'abcd', '0', '18500101', '99999999', {}]) {
      assert.equal(bouwjaar(invoer), null, `${JSON.stringify(invoer)} hoort null te geven`);
    }
  });
});

describe('leeftijd', () => {
  test('rekent in hele jaren', () => {
    assert.equal(leeftijd('19990906', NU), 27);
    assert.equal(leeftijd('20260101', NU), 0);
  });

  test('wordt nooit negatief bij een toekomstige datum', () => {
    assert.equal(leeftijd('20300101', NU), 0);
  });

  test('geeft null als het jaar onbekend is', () => {
    assert.equal(leeftijd(null, NU), null);
  });
});

describe('brandstofSoort', () => {
  const regel = (o) => ({ brandstof_omschrijving: o });

  test('herkent de vier soorten die voor ons uitmaken', () => {
    assert.equal(brandstofSoort([regel('Benzine')]), 'benzine');
    assert.equal(brandstofSoort([regel('Diesel')]), 'diesel');
    assert.equal(brandstofSoort([regel('Elektriciteit')]), 'elektrisch');
    assert.equal(brandstofSoort([regel('Waterstof')]), 'elektrisch');
  });

  test('twee regels betekent hybride — de RDW zet elke brandstof apart', () => {
    assert.equal(brandstofSoort([regel('Benzine'), regel('Elektriciteit')]), 'hybride');
    assert.equal(brandstofSoort([regel('Elektriciteit'), regel('Diesel')]), 'hybride');
  });

  test('let niet op hoofdletters', () => {
    assert.equal(brandstofSoort([regel('ELEKTRICITEIT')]), 'elektrisch');
    assert.equal(brandstofSoort([regel('benzine')]), 'benzine');
  });

  test('LPG en CNG tellen als verbrandingsmotor', () => {
    assert.equal(brandstofSoort([regel('LPG')]), 'benzine');
    assert.equal(brandstofSoort([regel('LPG'), regel('Elektriciteit')]), 'hybride');
  });

  test('geeft null als er niets bekend is', () => {
    assert.equal(brandstofSoort([]), null);
    assert.equal(brandstofSoort(null), null);
    assert.equal(brandstofSoort(undefined), null);
    assert.equal(brandstofSoort('geen array'), null);
    assert.equal(brandstofSoort([{}]), null);
  });
});

describe('inzichten', () => {
  const saab = {
    datum_eerste_toelating: '19990906',
    inrichting: 'hatchback',
    aantal_zitplaatsen: '5',
  };

  test('de Saab van Justus krijgt brandstof, leeftijd en carrosserie', () => {
    const uit = inzichten(saab, [{ brandstof_omschrijving: 'Benzine' }], NU);
    assert.deepEqual(uit.map((i) => i.kop), ['Benzine', '27 jaar oud', 'Hatchback']);
  });

  test('een elektrische auto krijgt een ander verhaal dan een diesel', () => {
    const ev = inzichten({ inrichting: 'sedan' }, [{ brandstof_omschrijving: 'Elektriciteit' }], NU);
    const diesel = inzichten({ inrichting: 'sedan' }, [{ brandstof_omschrijving: 'Diesel' }], NU);
    assert.notEqual(ev[0].tekst, diesel[0].tekst);
    assert.match(ev[0].kop, /elektrisch/i);
  });

  test('zeven zitplaatsen leveren een extra punt op', () => {
    const uit = inzichten(
      { datum_eerste_toelating: '20060711', inrichting: 'MPV', aantal_zitplaatsen: '7' },
      [{ brandstof_omschrijving: 'Benzine' }],
      NU
    );
    assert.ok(uit.some((i) => i.kop === '7 zitplaatsen'));
  });

  test('vijf zitplaatsen leveren dat punt niet op', () => {
    const uit = inzichten({ aantal_zitplaatsen: '5' }, [], NU);
    assert.equal(uit.some((i) => i.kop.includes('zitplaatsen')), false);
  });

  test('nooit meer dan vier punten', () => {
    const uit = inzichten(
      { datum_eerste_toelating: '19900101', inrichting: 'stationwagen', aantal_zitplaatsen: '9' },
      [{ brandstof_omschrijving: 'Diesel' }],
      NU
    );
    assert.ok(uit.length <= 4, `kreeg er ${uit.length}`);
  });

  test('zonder gegevens komt er niets in plaats van halve zinnen', () => {
    assert.deepEqual(inzichten({}, [], NU), []);
    assert.deepEqual(inzichten(undefined, undefined, NU), []);
  });

  test('"Niet geregistreerd" levert geen carrosseriepunt op', () => {
    const uit = inzichten({ inrichting: 'Niet geregistreerd' }, [], NU);
    assert.deepEqual(uit, []);
  });

  test('een onbekende carrosserie wordt overgeslagen, niet geraden', () => {
    const uit = inzichten({ inrichting: 'lijkwagen' }, [], NU);
    assert.deepEqual(uit, []);
  });

  test('elk punt heeft een kop en een tekst zonder gaten', () => {
    const uit = inzichten(
      { datum_eerste_toelating: '20200929', inrichting: 'cabriolet', aantal_zitplaatsen: '4' },
      [{ brandstof_omschrijving: 'Elektriciteit' }],
      NU
    );
    for (const punt of uit) {
      assert.equal(typeof punt.kop, 'string');
      assert.ok(punt.kop.trim().length > 0);
      assert.ok(punt.tekst.trim().length > 20);
      assert.doesNotMatch(punt.kop + punt.tekst, /undefined|null|NaN/);
    }
  });

  test('de leeftijdstekst past bij de leeftijd', () => {
    const oud = inzichten({ datum_eerste_toelating: '19950101' }, [], NU)[0];
    assert.match(oud.tekst, /schuimrand/);

    const nieuw = inzichten({ datum_eerste_toelating: '20250101' }, [], NU)[0];
    assert.match(nieuw.tekst, /garantie/);
  });
});

describe('kenmerken (de regel onder de plaat)', () => {
  test('zet op volgorde wat bekend is', () => {
    const uit = kenmerken(
      { inrichting: 'hatchback', datum_eerste_toelating: '19990906' },
      [{ brandstof_omschrijving: 'Benzine' }],
      'blauw'
    );
    assert.deepEqual(uit, ['blauw', 'hatchback', 'benzine', '1999']);
  });

  test('laat weg wat de RDW niet weet, zonder lege stukken', () => {
    const uit = kenmerken({ inrichting: 'Niet geregistreerd' }, [], '');
    assert.deepEqual(uit, []);
  });

  test('geeft altijd een array terug', () => {
    assert.ok(Array.isArray(kenmerken()));
    assert.ok(Array.isArray(kenmerken(null, null, null)));
  });
});
