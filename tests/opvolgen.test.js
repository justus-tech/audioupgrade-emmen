/**
 * OPVOLGEN — wie er vandaag een bericht krijgt.
 *
 * Twee fouten zijn hier duur: iemand vergeten die moet betalen, en iemand
 * twee keer per dag lastigvallen. De tests hieronder leggen allebei vast.
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  opvolgLijst, opvolgBericht, waLink, dagenTussen, klantenCsv,
  OFFERTE_DAGEN, FACTUUR_DAGEN, NAZORG_DAGEN, NOG_EENS_DAGEN,
} from '../src/lib/headroom/opvolgen.js';
import { klantenUit } from '../src/lib/headroom/klanten.js';

const NU = new Date('2026-10-20T12:00:00');
const dagenTerug = (n) => new Date(NU.getTime() - n * 86400000).toISOString();
const o = (extra) => ({
  id: 'x', nummer: '2026-040', datum: dagenTerug(30), klant: { naam: 'Henk de Vries', telefoon: '06-12345678' },
  auto: { merk: 'Volkswagen', model: 'Golf' }, regels: [], ...extra,
});
const soorten = (lijst) => lijst.map((p) => p.soort);

describe('opvolgen', () => {
  test('dagen tellen op de kalender, niet op uren', () => {
    assert.equal(dagenTussen('2026-10-19T23:00:00', '2026-10-20T01:00:00'), 1);
    assert.equal(dagenTussen('onzin', NU), null);
  });

  test('een verstuurde offerte pas na een paar dagen stilte', () => {
    assert.deepEqual(soorten(opvolgLijst([o({ status: 'verstuurd', statusSinds: dagenTerug(OFFERTE_DAGEN - 1) })], { nu: NU })), []);
    const [p] = opvolgLijst([o({ status: 'verstuurd', statusSinds: dagenTerug(OFFERTE_DAGEN) })], { nu: NU });
    assert.equal(p.soort, 'offerte');
    assert.match(p.bericht, /^Hoi Henk, /);
    assert.match(p.bericht, /Volkswagen Golf/);
  });

  test('zonder statusdatum telt de datum van de offerte', () => {
    assert.deepEqual(soorten(opvolgLijst([o({ status: 'verstuurd' })], { nu: NU })), ['offerte']);
  });

  test('een open factuur na twee weken, met nummer en bedrag', () => {
    const f = { nummer: '2026-F007', inclCent: 123450, datum: dagenTerug(FACTUUR_DAGEN) };
    const [p] = opvolgLijst([o({ status: 'gefactureerd', facturen: [f] })], { nu: NU });
    assert.equal(p.soort, 'factuur');
    assert.match(p.bericht, /2026-F007/);
    assert.match(p.bericht, /€ 1\.234,50/);
    assert.deepEqual(opvolgLijst([o({ status: 'gefactureerd', facturen: [{ ...f, datum: dagenTerug(3) }] })], { nu: NU }), []);
  });

  test('ingebouwd maar nog op aanbetaald: eindfactuur, zonder bericht', () => {
    const [p] = opvolgLijst([o({ status: 'aanbetaald', inbouwdatum: dagenTerug(2).slice(0, 10) })], { nu: NU });
    assert.equal(p.soort, 'eindfactuur');
    assert.equal(p.bericht, undefined);
    assert.deepEqual(opvolgLijst([o({ status: 'aanbetaald', inbouwdatum: dagenTerug(-3).slice(0, 10) })], { nu: NU }), []);
  });

  test('nazorg alleen bij een betaalde klus, en maar één keer', () => {
    const klus = o({ status: 'betaald', inbouwdatum: dagenTerug(NAZORG_DAGEN).slice(0, 10) });
    assert.deepEqual(soorten(opvolgLijst([klus], { nu: NU })), ['nazorg']);
    assert.deepEqual(opvolgLijst([{ ...klus, status: 'gefactureerd', facturen: [{ datum: dagenTerug(1) }] }], { nu: NU }), []);
    assert.deepEqual(opvolgLijst([{ ...klus, opgevolgd: { nazorg: dagenTerug(40) } }], { nu: NU }), []);
    assert.deepEqual(opvolgLijst([{ ...klus, inbouwdatum: dagenTerug(90).slice(0, 10) }], { nu: NU }), [], 'na twee maanden niet meer');
  });

  test('net een bericht gestuurd: een week rust, daarna weer', () => {
    const stil = o({ status: 'verstuurd', statusSinds: dagenTerug(20) });
    assert.deepEqual(opvolgLijst([{ ...stil, opgevolgd: { offerte: dagenTerug(NOG_EENS_DAGEN - 1) } }], { nu: NU }), []);
    assert.equal(opvolgLijst([{ ...stil, opgevolgd: { offerte: dagenTerug(NOG_EENS_DAGEN) } }], { nu: NU }).length, 1);
  });

  test('geld eerst', () => {
    const lijst = opvolgLijst([
      o({ id: 'a', status: 'betaald', inbouwdatum: dagenTerug(25).slice(0, 10) }),
      o({ id: 'b', status: 'verstuurd', statusSinds: dagenTerug(10) }),
      o({ id: 'c', status: 'gefactureerd', facturen: [{ datum: dagenTerug(20) }] }),
    ], { nu: NU });
    assert.deepEqual(soorten(lijst), ['factuur', 'offerte', 'nazorg']);
  });

  test('concepten en klussen zonder status komen er niet op', () => {
    assert.deepEqual(opvolgLijst([o({ status: 'concept' }), o({})], { nu: NU }), []);
  });

  test('WhatsApp-link: elk nummer naar 316..., zonder nummer kies je zelf', () => {
    assert.equal(waLink('0031 6 1234 5678', 'hoi'), 'https://wa.me/31612345678?text=hoi');
    assert.equal(waLink('+31612345678', 'a b'), 'https://wa.me/31612345678?text=a%20b');
    assert.equal(waLink('', 'hoi'), 'https://wa.me/?text=hoi');
  });

  test('zonder naam begint het bericht gewoon met Hoi', () => {
    assert.match(opvolgBericht('offerte', o({ klant: {} })), /^Hoi, /);
  });

  test('de klantenlijst als spreadsheet', () => {
    const csv = klantenCsv(klantenUit([
      o({ status: 'betaald', klant: { naam: 'Jansen; "De Garage"', telefoon: '0612345678' }, auto: { kenteken: '92DJHG', merk: 'VW', model: 'Golf' }, regels: [{ id: 'r', soort: 'overig', aantal: 1, vastExclCent: 10000, inkoopCent: 0, uren: 0 }] }),
    ]));
    assert.ok(csv.startsWith('﻿Naam;Bedrijf;'));
    assert.match(csv, /"Jansen; ""De Garage"""/);
    assert.match(csv, /92DJHG/);
    assert.match(csv, /121,00\r\n$/);
  });
});
