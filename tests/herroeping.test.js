/**
 * HET MODELFORMULIER VOOR HERROEPING.
 *
 * Twee dingen moeten kloppen. Het formulier moet meegaan wanneer de wet het
 * vraagt en wegblijven wanneer ze dat niet doet — een zakelijke klant heeft
 * geen bedenktijd, en hem er een beloven is een recht weggeven. En de
 * wettelijke modeltekst moet er letterlijk op staan: dat blad is er niet om
 * mooi te lezen maar om te kloppen.
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  herroepingPdf, herroepingBestandsnaam, hoortErBij,
} from '../src/lib/headroom/herroeping.js';
import { kernpunten, volledigeVoorwaarden } from '../src/lib/headroom/voorwaarden.js';
import { SITE, ADRES } from '../src/data/site.js';

const OFFERTE = {
  nummer: '2026-145',
  datum: new Date('2026-09-28'),
  opAfstand: true,
  zakelijk: false,
  klant: { naam: 'Arjen van der Veen', telefoon: '06 12 34 56 78' },
  auto: { kenteken: 'XX99XX', merk: 'Ford', model: 'Focus', bouwjaar: '2016' },
};

const tekstVan = (offerte) =>
  Buffer.from(herroepingPdf(offerte).naarBytes()).toString('latin1');

describe('wanneer het formulier meegaat', () => {
  test('bij een consument die op afstand afspreekt', () => {
    assert.equal(hoortErBij({ opAfstand: true }), true);
    assert.equal(hoortErBij({ opAfstand: true, zakelijk: false }), true);
  });

  test('niet bij een zakelijke klant: die heeft geen bedenktijd', () => {
    assert.equal(hoortErBij({ opAfstand: true, zakelijk: true }), false);
  });

  test('niet als de afspraak in de werkplaats is gemaakt', () => {
    assert.equal(hoortErBij({ opAfstand: false }), false);
    assert.equal(hoortErBij({}), false);
  });

  test('dezelfde twee voorwaarden als de bedenktijd op de offerte', () => {
    /* Gaan die twee uit elkaar lopen, dan belooft de offerte een bedenktijd
       zonder formulier of andersom. */
    for (const geval of [
      { opAfstand: true, zakelijk: false },
      { opAfstand: true, zakelijk: true },
      { opAfstand: false, zakelijk: false },
      { opAfstand: false, zakelijk: true },
    ]) {
      const punten = kernpunten({ ...geval, geldigTot: '28-10-2026' }).join(' ');
      assert.equal(
        hoortErBij(geval),
        /bedenktijd/.test(punten),
        `formulier en bedenktijd lopen uit elkaar bij ${JSON.stringify(geval)}`
      );
    }
  });

  test('de offerte noemt het formulier zodra het meegaat', () => {
    const met = kernpunten({ opAfstand: true, zakelijk: false }).join(' ');
    assert.match(met, /modelformulier voor herroeping/i);
    const zonder = kernpunten({ opAfstand: true, zakelijk: true }).join(' ');
    assert.doesNotMatch(zonder, /modelformulier/i);
  });

  test('de voorwaarden beloven het formulier ook', () => {
    const alles = volledigeVoorwaarden().artikelen
      .flatMap((a) => a.punten).join(' ');
    assert.match(alles, /modelformulier voor herroeping/i);
  });
});

describe('het blad zelf', () => {
  test('past op één pagina', () => {
    assert.equal(herroepingPdf(OFFERTE).paginas, 1);
  });

  test('de wettelijke modeltekst staat er letterlijk op', () => {
    const pdf = tekstVan(OFFERTE);
    assert.match(pdf, /Modelformulier voor herroeping/);
    assert.match(pdf, /dit formulier alleen invullen en terugzenden/);
    assert.match(pdf, /Ik\/Wij \\\(\*\\\) deel\/delen \\\(\*\\\) u hierbij mede/);
    assert.match(pdf, /herroep\/herroepen \\\(\*\\\)/);
    assert.match(pdf, /Doorhalen wat niet van toepassing is/);
    for (const veld of [
      'Naam consument', 'Adres consument', 'Handtekening van consument',
      'Offerte- of ordernummer', 'IBAN voor de terugbetaling',
    ]) {
      assert.ok(pdf.includes(veld), `het veld "${veld}" ontbreekt`);
    }
  });

  test('de klant kan zien naar wie hij het moet sturen', () => {
    const pdf = tekstVan(OFFERTE);
    assert.ok(pdf.includes(SITE.name), 'de bedrijfsnaam staat er niet op');
    assert.ok(pdf.includes(ADRES), 'het adres staat er niet op');
    assert.ok(pdf.includes(SITE.email), 'het e-mailadres staat er niet op');
  });

  test('nummer en naam staan voorgevuld', () => {
    const pdf = tekstVan(OFFERTE);
    assert.match(pdf, /2026-145/);
    assert.match(pdf, /Arjen van der Veen/);
  });

  test('het zegt erbij dat het formulier niet verplicht is', () => {
    /* Een consument mag ook gewoon een berichtje sturen. Suggereren dat
       dit blad de enige weg is, maakt het hem moeilijker dan de wet doet. */
    assert.match(tekstVan(OFFERTE), /hoeft dit formulier niet te gebruiken/i);
  });

  test('zonder nummer of klant loopt hij niet stuk', () => {
    const doc = herroepingPdf({});
    assert.equal(doc.paginas, 1);
    assert.ok(doc.naarBytes().length > 0);
  });
});

describe('de bestandsnaam', () => {
  test('draagt het offertenummer, zodat twee bladen niet op elkaar vallen', () => {
    assert.equal(herroepingBestandsnaam(OFFERTE), 'modelformulier-herroeping-2026-145.pdf');
  });

  test('is verschillend van die van de offerte', () => {
    assert.notEqual(herroepingBestandsnaam(OFFERTE), 'offerte-2026-145-XX99XX.pdf');
  });

  test('blijft een geldige naam zonder nummer', () => {
    assert.equal(herroepingBestandsnaam({}), 'modelformulier-herroeping.pdf');
  });
});
