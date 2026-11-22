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

  test('bij een bedrijf is de korting al exclusief btw', () => {
    /**
     * Hier stond een deling door 1,21, altijd. Dat klopt bij een particulier,
     * want die leest zijn bedragen inclusief btw. Een bedrijf leest ze
     * exclusief, en dan haalde die deling er nog een keer 21% af.
     *
     * Nagerekend: op een zakelijke offerte met 500,00 korting kwam € 413,22
     * op de pdf, € 86,78 te weinig. Met een ingevuld verwachtTotaalIncl liep
     * je tegen een melding aan die de oorzaak niet noemde; zonder dat anker
     * ging het verschil mee de deur uit.
     */
    const particulier = bouwOfferte({ ...basis, kortingIncl: '500,00' });
    assert.equal(particulier.kortingExclCent, Math.round(50000 / 1.21));

    const bedrijf = bouwOfferte({ ...basis, zakelijk: true, kortingIncl: '500,00' });
    assert.equal(bedrijf.kortingExclCent, 50000, 'bij een bedrijf hoort er geen btw meer af');

    /* En wat de klant op zijn pdf ziet, is in beide gevallen vijfhonderd euro
       in de maat die hij leest. */
    const tP = totalen(particulier.regels, STANDAARD_INSTELLINGEN, particulier.kortingExclCent);
    assert.equal(tP.kortingInclCent, 50000);
    const tB = totalen(bedrijf.regels, STANDAARD_INSTELLINGEN, bedrijf.kortingExclCent);
    assert.equal(tB.kortingExclCent, 50000);
  });

  /**
   * DE KORTING KOMT ER OOK EXACT OP, OF HET SCRIPT STOPT.
   *
   * Voor een regel deed het script dat al: wijkt het bedrag op de pdf een
   * cent af van wat je intikte, dan stopt het en stelt het een splitsing
   * voor. Voor de korting niet, en die staat net zo zichtbaar op de offerte.
   *
   * Een korting die je inclusief btw intikt wordt teruggerekend naar
   * exclusief, en op de pdf komt daar weer btw bij. Die heen-en-terugweg valt
   * niet altijd op hetzelfde bedrag uit. Nagerekend met kortingen van vijf
   * euro tot het offertetotaal: 55 van de 319 kwamen anders op de offerte, en
   * daar zitten de allergewoonste bedragen bij:
   *
   *   korting EUR 10,00  ->  op de offerte EUR 9,99
   *   korting EUR 100,00 ->  op de offerte EUR 99,99
   *   korting EUR 170,00 ->  op de offerte EUR 170,01
   *
   * Met 21% btw bestaat EUR 100,00 niet als korting: het dichtstbij haalbare
   * is EUR 99,99 of EUR 100,01. Daar is niets aan te rekenen, maar je hoort
   * het te weten voordat de offerte de deur uit gaat.
   */
  test('een korting die een cent verschuift komt er niet doorheen', () => {
    assert.throws(
      () => bouwOfferte({ ...basis, kortingIncl: '100,00' }),
      (fout) => {
        assert.match(fout.message, /korting van € 100,00/);
        assert.match(fout.message, /€ 99,99/, 'de melding noemt niet welk bedrag wél kan');
        assert.match(fout.message, /€ 100,01/);
        return true;
      }
    );
  });

  test('en het bedrag dat hij voorstelt werkt ook echt', () => {
    const offerte = bouwOfferte({ ...basis, kortingIncl: '99,99' });
    const t = totalen(offerte.regels, STANDAARD_INSTELLINGEN, offerte.kortingExclCent);
    assert.equal(t.kortingInclCent, 9999, 'de voorgestelde korting komt zelf niet exact uit');
    assert.equal(t.inclCent, 159500 - 9999);
  });

  test('een korting die wel klopt gaat gewoon door', () => {
    // Anders zou "altijd weigeren" ook groen staan.
    for (const bedrag of ['50,00', '300,00', '500,00']) {
      const offerte = bouwOfferte({ ...basis, kortingIncl: bedrag });
      const t = totalen(offerte.regels, STANDAARD_INSTELLINGEN, offerte.kortingExclCent);
      assert.equal(t.kortingInclCent, naarCent(bedrag), `${bedrag} komt er niet exact op`);
    }
  });

  test('een percentage, een bedrag zonder btw en een bedrijf gaan altijd door', () => {
    /* Bij een percentage is er geen afgesproken bedrag om aan vast te houden,
       bij kortingExcl zet je het zelf vast, en een bedrijf leest zijn
       bedragen exclusief btw — dan is er geen heen-en-terugweg. */
    assert.ok(bouwOfferte({ ...basis, kortingIncl: '10%' }).kortingExclCent > 0);
    assert.ok(bouwOfferte({ ...basis, kortingExcl: '82,64' }).kortingExclCent > 0);
    assert.ok(bouwOfferte({ ...basis, zakelijk: true, kortingIncl: '100,00' }).kortingExclCent > 0);
  });

  test('een korting groter dan de offerte wordt afgetopt, niet geweigerd', () => {
    /* Dat is geen afrondingsverschil maar een terechte begrenzing. */
    const offerte = bouwOfferte({ ...basis, kortingIncl: '9999,00' });
    const t = totalen(offerte.regels, STANDAARD_INSTELLINGEN, offerte.kortingExclCent);
    assert.equal(t.inclCent, 0);
  });

  test('geen enkele korting komt stilletjes anders op de offerte', () => {
    /* Het hele veld: elke ronde korting van vijf euro tot het offertetotaal.
       Elk bedrag gaat óf exact door, óf het script stopt. Een derde uitkomst
       — er stilletjes een cent naast — mag niet bestaan. */
    let doorgelaten = 0;
    let geweigerd = 0;
    for (let cent = 500; cent <= 159500; cent += 500) {
      const bedrag = `${Math.floor(cent / 100)},${String(cent % 100).padStart(2, '0')}`;
      let offerte = null;
      try {
        offerte = bouwOfferte({ ...basis, kortingIncl: bedrag });
      } catch (fout) {
        geweigerd += 1;
        assert.match(fout.message, /korting/, `de melding gaat niet over de korting: ${fout.message}`);
        continue;
      }
      doorgelaten += 1;
      const t = totalen(offerte.regels, STANDAARD_INSTELLINGEN, offerte.kortingExclCent);
      assert.equal(t.kortingInclCent, cent,
        `korting ${bedrag} werd doorgelaten maar komt op de offerte uit op ${t.kortingInclCent} cent`);
    }
    assert.ok(doorgelaten > 200, `te weinig kortingen doorgelaten (${doorgelaten})`);
    /* Zonder weigeringen bewaakt deze test niets: dan zou elk bedrag toevallig
       exact uitkomen en meet hij de controle niet. */
    assert.ok(geweigerd > 20,
      `maar ${geweigerd} kortingen geweigerd; de test meet de controle niet`);
  });

  test('met kortingExcl schrijf je het bedrag zonder twijfel op', () => {
    const offerte = bouwOfferte({ ...basis, kortingExcl: '250,00' });
    assert.equal(offerte.kortingExclCent, 25000);
    /* Nooit meer korting dan er aan regels staat. */
    const alles = bouwOfferte({ ...basis, kortingExcl: '99999,00' });
    const t = totalen(alles.regels, STANDAARD_INSTELLINGEN, alles.kortingExclCent);
    assert.equal(t.inclCent, 0, 'een korting groter dan het totaal hoort op nul uit te komen');
  });

  test('opAfstand laat zich wel uitzetten als je in de werkplaats afspreekt', () => {
    assert.equal(bouwOfferte({ ...basis, opAfstand: false }).opAfstand, false);
    assert.equal(bouwOfferte({ ...basis, opAfstand: true }).opAfstand, true);
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

  test('direct beginnen staat standaard uit, op afstand staat standaard aan', () => {
    /**
     * Twee standaarden die de andere kant op moeten staan, en daarom staan ze
     * hier bij elkaar.
     *
     * `startDirect` uit: direct beginnen laat de klant een deel van zijn
     * bedenktijd opgeven, en dat mag je nooit aannemen. Dat moet hij zelf
     * zeggen.
     *
     * `opAfstand` aan: bijna alles gaat per WhatsApp de deur uit, en dat is
     * een overeenkomst op afstand. Hier stond Boolean(invoer.opAfstand), dus
     * stond dit standaard uit — en dan liet een vergeten regel op het
     * invulblad de bedenktijd én het modelformulier stil wegvallen. Dat is de
     * onveilige kant: vergeet je het formulier bij een klant die er recht op
     * heeft, dan loopt zijn termijn door tot maximaal een jaar. De app leest
     * een ontbrekend veld al als op afstand; dit script doet dat nu ook.
     */
    const offerte = bouwOfferte(basis);
    assert.equal(offerte.startDirect, false);
    assert.equal(offerte.opAfstand, true);
  });

  test('alleen werk gaat mee naar de offerte', () => {
    // Dan begint de bedenktijd bij het akkoord, en dat moet er zo op staan.
    assert.equal(bouwOfferte(basis).alleenWerk, false);
    assert.equal(bouwOfferte({ ...basis, alleenWerk: true }).alleenWerk, true);
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
