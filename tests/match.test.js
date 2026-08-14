/**
 * Het kentekenwerk: invoer opschonen, controleren, streepjes zetten en de
 * juiste auto zoeken. Dit is de kern van de kentekenfunctie, dus hier zit
 * ook de meeste aandacht voor rare invoer.
 *
 * Draaien: npm test
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  normaliseerKenteken,
  isGeldigKenteken,
  normaliseerBenaming,
  normaliseerMerk,
  formatteerKenteken,
  matchAuto,
  netteNaam,
} from '../src/lib/match.js';

describe('normaliseerKenteken', () => {
  test('haalt streepjes en spaties weg en maakt hoofdletters', () => {
    assert.equal(normaliseerKenteken('12-ab-3c'), '12AB3C');
    assert.equal(normaliseerKenteken(' 92 dj hg '), '92DJHG');
    assert.equal(normaliseerKenteken('xx.99.xx'), 'XX99XX');
  });

  test('overleeft lege en rare invoer', () => {
    for (const invoer of ['', null, undefined, 0, false, NaN, {}, []]) {
      assert.equal(typeof normaliseerKenteken(invoer), 'string');
    }
    assert.equal(normaliseerKenteken(null), '');
    assert.equal(normaliseerKenteken('---'), '');
    assert.equal(normaliseerKenteken('!@#$%^&*()'), '');
  });

  test('knipt niet af, zodat te lange invoer ongeldig blijft', () => {
    assert.equal(normaliseerKenteken('12AB34XY'), '12AB34XY');
  });
});

describe('isGeldigKenteken', () => {
  test('precies zes tekens is goed', () => {
    assert.equal(isGeldigKenteken('92DJHG'), true);
    assert.equal(isGeldigKenteken('92-DJ-HG'), true);
    assert.equal(isGeldigKenteken('92 dj hg'), true);
  });

  test('te kort, te lang of leeg is fout', () => {
    assert.equal(isGeldigKenteken('12AB3'), false);
    assert.equal(isGeldigKenteken('12AB345'), false);
    assert.equal(isGeldigKenteken('12AB34XY'), false);
    assert.equal(isGeldigKenteken(''), false);
    assert.equal(isGeldigKenteken(null), false);
    assert.equal(isGeldigKenteken('------'), false);
  });
});

describe('formatteerKenteken — alle veertien sidecodes', () => {
  // Elk Nederlands kenteken volgt een van deze veertien patronen.
  const gevallen = [
    ['12AB34', '12-AB-34'],  // DDLLDD
    ['AB12CD', 'AB-12-CD'],  // LLDDLL
    ['AB1234', 'AB-12-34'],  // LLDDDD
    ['1234AB', '12-34-AB'],  // DDDDLL
    ['ABCD12', 'AB-CD-12'],  // LLLLDD
    ['12ABCD', '12-AB-CD'],  // DDLLLL
    ['12ABC3', '12-ABC-3'],  // DDLLLD
    ['AB123C', 'AB-123-C'],  // LLDDDL
    ['1ABC23', '1-ABC-23'],  // DLLLDD
    ['A123BC', 'A-123-BC'],  // LDDDLL
    ['ABC12D', 'ABC-12-D'],  // LLLDDL
    ['123AB4', '123-AB-4'],  // DDDLLD
    ['A12BCD', 'A-12-BCD'],  // LDDLLL
    ['1AB234', '1-AB-234'],  // DLLDDD
  ];

  for (const [invoer, verwacht] of gevallen) {
    test(`${invoer} wordt ${verwacht}`, () => {
      assert.equal(formatteerKenteken(invoer), verwacht);
    });
  }

  test('het kenteken van de Saab van Justus', () => {
    assert.equal(formatteerKenteken('92DJHG'), '92-DJ-HG');
  });

  test('onbekend patroon blijft ongewijzigd — liever geen streepje dan een verkeerd streepje', () => {
    assert.equal(formatteerKenteken('123456'), '123456');
    assert.equal(formatteerKenteken('ABCDEF'), 'ABCDEF');
  });

  test('verkeerde lengte geeft de opgeschoonde invoer terug', () => {
    assert.equal(formatteerKenteken('12AB3'), '12AB3');
    assert.equal(formatteerKenteken(''), '');
    assert.equal(formatteerKenteken(null), '');
  });
});

describe('normaliseerBenaming', () => {
  test('haalt het merk eraf als de RDW het dubbel opschrijft', () => {
    assert.equal(normaliseerBenaming('SAAB', 'SAAB 9-3'), '9 3');
    assert.equal(normaliseerBenaming('BENTLEY', 'BENTLEY CONTINENTAL GT'), 'CONTINENTAL GT');
    assert.equal(normaliseerBenaming('TOYOTA', 'TOYOTA AYGO'), 'AYGO');
  });

  test('laat de benaming staan als het merk er niet in zit', () => {
    assert.equal(normaliseerBenaming('VOLKSWAGEN', 'GOLF'), 'GOLF');
  });

  test('geeft leeg terug als de benaming alleen het merk is', () => {
    assert.equal(normaliseerBenaming('TESLA', 'TESLA'), '');
  });

  test('korte merkdelen worden niet weggeknipt', () => {
    // "MG" is maar twee tekens; anders zou "MG ZS" zijn model kwijtraken.
    assert.equal(normaliseerBenaming('MG', 'MG ZS EV'), 'MG ZS EV');
  });

  test('leestekens worden spaties', () => {
    assert.equal(normaliseerBenaming('VOLKSWAGEN', 'UP!'), 'UP');
    assert.equal(normaliseerBenaming('VOLKSWAGEN', 'T-ROC'), 'T ROC');
  });

  test('overleeft lege invoer', () => {
    assert.equal(normaliseerBenaming(null, null), '');
    assert.equal(normaliseerBenaming(undefined, undefined), '');
  });
});

describe('normaliseerMerk', () => {
  test('maakt er een vergelijkbare tekst van', () => {
    assert.equal(normaliseerMerk('mercedes-benz'), 'MERCEDES BENZ');
    assert.equal(normaliseerMerk(' Škoda '), 'KODA'); // diakriet valt weg, dat mag
    assert.equal(normaliseerMerk(null), '');
  });
});

describe('matchAuto', () => {
  const lijst = [
    { slug: 'range-rover-sport', matchers: { merk: 'LAND ROVER', model: /^RANGE ROVER SPORT/ } },
    { slug: 'range-rover', matchers: { merk: 'LAND ROVER', model: /^RANGE ROVER/ } },
    { slug: 'golf', matchers: { merk: 'VOLKSWAGEN', model: /^GOLF/ } },
  ];

  test('de eerste treffer wint, dus specifiek moet bovenaan staan', () => {
    const sport = matchAuto(
      { merk: 'LAND ROVER', handelsbenaming: 'RANGE ROVER SPORT', voertuigsoort: 'Personenauto' },
      lijst
    );
    assert.equal(sport.slug, 'range-rover-sport');

    const kaal = matchAuto(
      { merk: 'LAND ROVER', handelsbenaming: 'RANGE ROVER', voertuigsoort: 'Personenauto' },
      lijst
    );
    assert.equal(kaal.slug, 'range-rover');
  });

  test('weigert voertuigen waar wij niets mee doen', () => {
    assert.equal(
      matchAuto({ merk: 'VOLKSWAGEN', handelsbenaming: 'GOLF', voertuigsoort: 'Vrachtauto' }, lijst),
      null
    );
    assert.equal(
      matchAuto({ merk: 'VOLKSWAGEN', handelsbenaming: 'GOLF', voertuigsoort: 'Aanhangwagen' }, lijst),
      null
    );
  });

  test('accepteert personenauto en bedrijfsauto', () => {
    for (const soort of ['Personenauto', 'Bedrijfsauto']) {
      assert.ok(matchAuto({ merk: 'VOLKSWAGEN', handelsbenaming: 'GOLF', voertuigsoort: soort }, lijst));
    }
  });

  test('geeft null bij ontbrekende gegevens in plaats van te struikelen', () => {
    assert.equal(matchAuto(null, lijst), null);
    assert.equal(matchAuto({}, lijst), null);
    assert.equal(matchAuto({ merk: 'VOLKSWAGEN' }, lijst), null);
    assert.equal(matchAuto({ merk: 'VOLKSWAGEN', handelsbenaming: '' }, lijst), null);
  });

  test('een lege lijst geeft gewoon null', () => {
    assert.equal(matchAuto({ merk: 'VOLKSWAGEN', handelsbenaming: 'GOLF' }, []), null);
  });

  test('slaat regels zonder matchers over in plaats van te crashen', () => {
    const rommel = [{ slug: 'stuk' }, ...lijst];
    assert.equal(matchAuto({ merk: 'VOLKSWAGEN', handelsbenaming: 'GOLF' }, rommel).slug, 'golf');
  });
});

describe('netteNaam', () => {
  test('maakt van geschreeuw een leesbare naam', () => {
    assert.equal(netteNaam('VOLKSWAGEN', 'GOLF'), 'Volkswagen Golf');
    assert.equal(netteNaam('MERCEDES-BENZ', 'C 180'), 'Mercedes-benz C 180');
  });

  test('toont het merk niet dubbel', () => {
    assert.equal(netteNaam('BENTLEY', 'BENTLEY CONTINENTAL GT'), 'Bentley Continental GT');
    assert.equal(netteNaam('SAAB', 'SAAB 9-3'), 'Saab 9-3');
  });

  test('laat woorden met cijfers met rust', () => {
    // Zonder deze regel werd "ID.3 PRO 150 KW" ineens "Id.3 Pro 150 Kw".
    // "Pro" mág netjes worden, "ID.3", "150" en "KW" niet.
    assert.equal(netteNaam('VOLKSWAGEN', 'ID.3 PRO 150 KW'), 'Volkswagen ID.3 Pro 150 KW');
  });

  test('houdt bekende afkortingen in hoofdletters', () => {
    assert.equal(netteNaam('AUDI', 'A4 TDI QUATTRO'), 'Audi A4 TDI QUATTRO');
    assert.equal(netteNaam('BENTLEY', 'BENTLEY CONTINENTAL GT').endsWith('GT'), true);
  });

  test('overleeft lege invoer', () => {
    assert.equal(netteNaam('', ''), '');
    assert.equal(netteNaam(null, null), '');
  });
});
