/**
 * DE KLANTENLIJST — welke offertes bij welke klant horen.
 *
 * Gaat dit mis, dan staat Henk twee keer in je lijst, of erger: zie je bij
 * Henk de offerte van een andere Henk. Daarom vooral tests op het samenvoegen.
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { kaalNummer, klantSleutels, klantenUit, klantPast, zoekKlant } from '../src/lib/headroom/klanten.js';

const o = (id, datum, klant, extra = {}) => ({ id, nummer: id, datum, klant, regels: [], ...extra });

describe('de klantenlijst', () => {
  test('een telefoonnummer is hetzelfde, hoe je het ook schrijft', () => {
    assert.equal(kaalNummer('06-12345678'), '612345678');
    assert.equal(kaalNummer('+31 6 1234 5678'), '612345678');
    assert.equal(kaalNummer('0031612345678'), '612345678');
    assert.equal(kaalNummer('1234'), '');
  });

  test('offertes met hetzelfde nummer zijn één klant', () => {
    const k = klantenUit([
      o('a', '2026-01-01', { naam: 'Henk', telefoon: '06-12345678' }),
      o('b', '2026-02-01', { naam: 'Henk de Vries', telefoon: '+31612345678' }),
    ]);
    assert.equal(k.length, 1);
    assert.equal(k[0].offertes.length, 2);
    assert.equal(k[0].naam, 'Henk de Vries', 'de nieuwste naam gaat voor');
    assert.equal(k[0].offertes[0].id, 'b', 'de nieuwste offerte bovenaan');
  });

  test('twee keer Jan met een ander nummer zijn twee mensen', () => {
    const k = klantenUit([
      o('a', '2026-01-01', { naam: 'Jan', telefoon: '0611111111' }),
      o('b', '2026-01-02', { naam: 'Jan', telefoon: '0622222222' }),
    ]);
    assert.equal(k.length, 2);
  });

  test('via een derde: nummer van A bij B, e-mail van B bij C', () => {
    const k = klantenUit([
      o('a', '2026-01-01', { naam: 'Piet', telefoon: '0612345678' }),
      o('b', '2026-01-02', { naam: 'Piet', telefoon: '0612345678', email: 'piet@voorbeeld.nl' }),
      o('c', '2026-01-03', { naam: 'P.', email: 'Piet@Voorbeeld.nl ' }),
    ]);
    assert.equal(k.length, 1);
    assert.equal(k[0].offertes.length, 3);
    assert.equal(k[0].telefoon, '0612345678', 'nummer van een oudere offerte als de nieuwste er geen heeft');
  });

  test('zonder nummer of e-mail telt de naam', () => {
    assert.deepEqual(klantSleutels(o('a', '', { naam: '  Karel  Jansen ' })), ['naam:karel jansen']);
    const k = klantenUit([
      o('a', '2026-01-01', { naam: 'Karel Jansen' }),
      o('b', '2026-01-02', { naam: 'karel jansen' }),
      o('c', '2026-01-03', {}),
    ]);
    assert.equal(k.length, 1, 'een offerte zonder klant komt er niet in');
    assert.equal(k[0].offertes.length, 2);
  });

  test("auto's één keer, op kenteken", () => {
    const k = klantenUit([
      o('a', '2026-01-01', { telefoon: '0612345678' }, { auto: { kenteken: '92-DJH-G', merk: 'Volkswagen', model: 'Golf' } }),
      o('b', '2026-01-02', { telefoon: '0612345678' }, { auto: { kenteken: '92DJHG', merk: 'Volkswagen', model: 'Golf' } }),
    ]);
    assert.equal(k[0].autos.length, 1);
    assert.equal(k[0].autos[0].kenteken, '92DJHG');
  });

  test('omzet telt alleen wat doorging', () => {
    const regel = { id: 'r', soort: 'overig', omschrijving: 'x', aantal: 1, vastExclCent: 10000, inkoopCent: 0, uren: 0 };
    const k = klantenUit([
      o('a', '2026-01-01', { telefoon: '0612345678' }, { status: 'concept', regels: [regel] }),
      o('b', '2026-01-02', { telefoon: '0612345678' }, { status: 'betaald', regels: [regel] }),
    ], {});
    const een = klantenUit([o('b', '2026-01-02', { telefoon: '0612345678' }, { status: 'betaald', regels: [regel] })], {});
    assert.ok(een[0].omzetCent >= 10000, 'een betaalde offerte telt mee');
    assert.equal(k[0].omzetCent, een[0].omzetCent, 'het concept telt niet mee');
  });

  test('de nieuwste klant bovenaan, en terug te vinden op elke sleutel', () => {
    const k = klantenUit([
      o('a', '2026-01-01', { naam: 'Oud', telefoon: '0611111111' }),
      o('b', '2026-05-01', { naam: 'Nieuw', telefoon: '0622222222', email: 'n@v.nl' }),
    ]);
    assert.equal(k[0].naam, 'Nieuw');
    assert.equal(zoekKlant(k, 'mail:n@v.nl').naam, 'Nieuw');
    assert.equal(zoekKlant(k, 'tel:999999999'), null);
  });

  test('zoeken op naam, kenteken, offertenummer en nummer', () => {
    const [k] = klantenUit([
      o('2026-014', '2026-01-01', { naam: 'Henk de Vries', telefoon: '06-12345678' }, { auto: { kenteken: '92DJHG' } }),
    ]);
    assert.ok(klantPast(k, ''));
    assert.ok(klantPast(k, 'henk'));
    assert.ok(klantPast(k, '92-djh-g'));
    assert.ok(klantPast(k, '2026-014'));
    assert.ok(klantPast(k, '+31 6 1234 5678'));
    assert.ok(!klantPast(k, 'piet'));
  });
});
