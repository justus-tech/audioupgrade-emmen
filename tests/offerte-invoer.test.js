/**
 * HET INVULBLAD — van bedragen zoals de klant ze leest naar een offerte.
 *
 * De bedragen op een invulblad staan inclusief btw, want zo staan ze op de site
 * en zo leest de klant ze. De app rekent exclusief. Daartussen valt een cent
 * weg als je niet oplet, en die cent staat wel zichtbaar op de pdf.
 *
 * Deze tests bewaken de controles die dat tegenhouden. Ze roepen `main()` niet
 * aan, dus er rolt geen pdf uit.
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { bouwOfferte, regelUit, naarCent } from '../scripts/offerte.mjs';
import { totalen, STANDAARD_INSTELLINGEN } from '../src/lib/headroom/rekenen.js';

const regel = (incl, omschrijving = 'Werk') => ({ omschrijving, incl });

describe('bedragen inlezen', () => {
  test('een bedrag mag op alle manieren geschreven worden', () => {
    assert.equal(naarCent('1.234,56'), 123456);
    assert.equal(naarCent('1234.56'), 123456);
    assert.equal(naarCent('€ 895,-'), 89500);
    assert.equal(naarCent(895), 89500);
    assert.equal(naarCent(''), 0);
  });

  test('een bedrag inclusief btw wordt netjes teruggerekend', () => {
    assert.deepEqual(regelUit(regel('895,00')).vastExclCent, Math.round(89500 / 1.21));
  });

  test('een bedrag exclusief btw wordt overgenomen zoals het staat', () => {
    assert.equal(regelUit({ omschrijving: 'Werk', excl: '1318,18' }).vastExclCent, 131818);
  });

  test('een regel zonder bedrag is een fout', () => {
    assert.throws(() => regelUit({ omschrijving: 'Werk' }, 1), /geen bedrag/);
  });
});

describe('de btw-afronding wordt tegengehouden', () => {
  test('een bedrag dat een cent verschuift, komt er niet doorheen', () => {
    // EUR 1.245,- wordt op de pdf EUR 1.245,01. Dat is het bekende geval.
    assert.throws(() => regelUit(regel('1245,00'), 1), /komt op de pdf uit op/);
  });

  test('en de foutmelding stelt meteen een splitsing voor', () => {
    try {
      regelUit(regel('1245,00'), 1);
      assert.fail('had moeten stoppen');
    } catch (fout) {
      assert.match(fout.message, /Splits hem over twee regels/);
      assert.match(fout.message, /nooit een korting van een cent/);
    }
  });

  test('een bedrag dat wel klopt gaat gewoon door', () => {
    for (const bedrag of ['995,00', '1495,00', '1595,00', '2195,00']) {
      assert.ok(regelUit(regel(bedrag)).vastExclCent > 0, `${bedrag} hoort te kunnen`);
    }
  });
});

describe('de offerte opbouwen', () => {
  const basis = {
    nummer: '2026-144',
    datum: '2026-09-18',
    klant: { naam: 'Voorbeeld' },
    regels: [regel('895,00'), regel('495,00'), regel('205,00')],
  };

  test('het totaal is precies de som van de bedragen zoals je ze opschreef', () => {
    const offerte = bouwOfferte(basis);
    const t = totalen(offerte.regels, STANDAARD_INSTELLINGEN, offerte.kortingExclCent);
    assert.equal(t.inclCent, 159500);
  });

  test('de aanbetalingszin noemt het bedrag, niet alleen het percentage', () => {
    // Alleen een percentage laat de klant zelf rekenen, en dan rekent hij het
    // verkeerd.
    const offerte = bouwOfferte(basis);
    assert.match(offerte.opmerking, /40% aanbetaling, dat is € 638,00/);
    assert.match(offerte.opmerking, /restant van € 957,00/);
  });

  test('een eigen opmerking komt achter de aanbetalingszin', () => {
    const offerte = bouwOfferte({ ...basis, opmerking: 'Tot woensdag.' });
    assert.ok(offerte.opmerking.endsWith('Tot woensdag.'));
    assert.match(offerte.opmerking, /aanbetaling/);
  });

  test('meer dan de helft vooruit vragen mag niet', () => {
    // Bij een consumentenkoop is de helft het wettelijke maximum.
    assert.throws(() => bouwOfferte({ ...basis, aanbetalingPct: 60 }), /wettelijke maximum/);
    assert.doesNotThrow(() => bouwOfferte({ ...basis, aanbetalingPct: 50 }));
  });

  test('eigen apparatuur van de klant wordt een korting, geen negatieve regel', () => {
    // Een regelprijs klemt op nul, dus een negatieve regel verdwijnt stilletjes.
    const offerte = bouwOfferte({ ...basis, kortingIncl: '300,00' });
    assert.equal(offerte.kortingExclCent, Math.round(30000 / 1.21));
    const t = totalen(offerte.regels, STANDAARD_INSTELLINGEN, offerte.kortingExclCent);
    assert.equal(t.inclCent, 159500 - 30000);
  });

  test('een laag offertenummer wordt geweigerd', () => {
    // 2026-001 leest alsof het zijn eerste offerte van het jaar is.
    assert.throws(() => bouwOfferte({ ...basis, nummer: '2026-001' }), /laag nummer/);
  });

  test('zonder nummer of zonder regels komt er niets uit', () => {
    assert.throws(() => bouwOfferte({ ...basis, nummer: undefined }), /nummer/);
    assert.throws(() => bouwOfferte({ ...basis, regels: [] }), /zonder regels/);
  });

  test('een onleesbare datum is een fout en geen stilzwijgend vandaag', () => {
    assert.throws(() => bouwOfferte({ ...basis, datum: 'volgende week' }), /geen datum/);
  });

  test('de bedenktijd staat standaard uit', () => {
    const offerte = bouwOfferte(basis);
    assert.equal(offerte.opAfstand, false);
    assert.equal(offerte.startDirect, false);
  });
});

describe('het voorbeeldbestand', () => {
  test('doet het nog', () => {
    // Het staat in de repo als uitleg; dan moet het ook werken.
    const pad = fileURLToPath(new URL('../offerte.voorbeeld.json', import.meta.url));
    const invoer = JSON.parse(readFileSync(pad, 'utf8'));
    const offerte = bouwOfferte(invoer);
    const t = totalen(offerte.regels, STANDAARD_INSTELLINGEN, offerte.kortingExclCent);
    assert.equal(t.inclCent, naarCent(invoer.verwachtTotaalIncl));
  });
});
