/**
 * DE PRIJSBEPALING — de rekensom van inkoop en uren naar het bedrag op de offerte.
 *
 * Wat hier getest wordt is de rekensom, niet Justus' eigen bedragen. Die staan
 * met opzet niet in deze map (zie prijsbepaling.js), dus alle getallen hieronder
 * zijn verzonnen en rond gekozen, zodat je de som in je hoofd kunt narekenen.
 *
 * Het echte nakijkwerk — geeft de rekenhulp dezelfde uitkomsten als de
 * rekenbasis voor de offertes die al verstuurd zijn — zit in het script zelf:
 *
 *     node scripts/offerteprijs.mjs --controle
 *
 * Dat draait op de inkoopprijzen uit prijsinstellingen.json en hoort dus niet
 * in een openbare test thuis.
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  inkoopUitLijst, inkoopVanStuklijst, margeFactor, ondergrenzen, netteprijsBoven,
  netteprijsOnder, btwTerugrekenen, splitsExact, toets, prijsvoorstel, euroKort,
} from '../src/lib/headroom/prijsbepaling.js';

/* Een verzonnen leverancier: lijst met 21% btw en 40% korting. */
const KORTING = { deelDoor: 1.21, maal: 0.6 };
/* En een die zijn dealerprijs al afdrukt. */
const KAAL = { deelDoor: 1, maal: 1 };

describe('van de prijslijst naar je inkoop', () => {
  test('btw eraf en dan de korting', () => {
    // 121,00 met 21% btw is 100,00; daar 40% af is 60,00.
    assert.equal(inkoopUitLijst(KORTING, 12100), 6000);
  });

  test('een dealerkolom wordt overgenomen zoals hij staat', () => {
    assert.equal(inkoopUitLijst(KAAL, 27450), 27450);
  });

  test('een regel zonder deelDoor of maal is een fout, geen stil verkeerd getal', () => {
    assert.throws(() => inkoopUitLijst({}, 10000), /deelDoor/);
    assert.throws(() => inkoopUitLijst({ deelDoor: 0, maal: 1 }, 10000), /deelDoor/);
  });

  test('het aantal vermenigvuldigt de inkoop, niet de lijstprijs', () => {
    // Zo blijft de optelling gelijk aan wat er in een handmatige tabel staat:
    // twee keer hetzelfde afgeronde bedrag.
    const een = inkoopUitLijst(KORTING, 1990);
    assert.equal(inkoopVanStuklijst([{ regel: KORTING, lijstCent: 1990, aantal: 2 }]), een * 2);
  });

  test('een stuklijst telt gewoon op', () => {
    assert.equal(inkoopVanStuklijst([
      { regel: KORTING, lijstCent: 12100 },
      { regel: KAAL, lijstCent: 5000 },
    ]), 11000);
  });
});

describe('de marge-eis', () => {
  test('de factor klopt met de som erachter', () => {
    // Bij 35% winst over het bedrag inclusief btw: 1 / (1/1,21 - 0,35).
    assert.ok(Math.abs(margeFactor(35, 21) - 2.0989) < 0.0005);
    assert.ok(Math.abs(margeFactor(45, 21) - 2.6564) < 0.0005);
  });

  test('een marge die niet kan, is een fout', () => {
    // Meer dan 82,6% winst over het bedrag inclusief btw kan niet: dan is er
    // niets meer over voor de btw zelf.
    assert.throws(() => margeFactor(90, 21), /kan niet/);
  });

  test('op de factor gerekend blijft er precies het gevraagde percentage over', () => {
    const inkoopCent = 50000;
    const prijs = Math.round(inkoopCent * margeFactor(35, 21));
    const winst = Math.round(prijs / 1.21) - inkoopCent;
    assert.ok(Math.abs((winst / prijs) * 100 - 35) < 0.01);
  });
});

describe('de twee ondergrenzen', () => {
  test('bij goedkope inkoop en veel uren bindt het uurtarief', () => {
    const g = ondergrenzen({ inkoopCent: 10000, uren: 8, uurtariefCent: 7500, margeEisPct: 30 });
    // (100 + 8 x 75) x 1,21 = 847,00
    assert.equal(g.uurgrensCent, 84700);
    assert.equal(g.bindend, 'uurtarief');
    assert.equal(g.ondergrensCent, 84700);
  });

  test('bij dure inkoop en weinig uren bindt de marge-eis', () => {
    const g = ondergrenzen({ inkoopCent: 100000, uren: 1, uurtariefCent: 7500, margeEisPct: 30 });
    assert.equal(g.bindend, 'marge');
    assert.equal(g.ondergrensCent, g.margegrensCent);
    assert.ok(g.margegrensCent > g.uurgrensCent);
  });

  test('zonder uren blijft alleen de marge-eis over', () => {
    const g = ondergrenzen({ inkoopCent: 100000, uren: 0, margeEisPct: 30 });
    assert.equal(g.uurgrensCent, Math.round(100000 * 1.21));
    assert.equal(g.bindend, 'marge');
  });
});

describe('de prijsvorm: het bedrag eindigt op 45 of 95', () => {
  test('naar boven naar het eerstvolgende nette bedrag', () => {
    assert.equal(netteprijsBoven(120000), 124500);
    assert.equal(netteprijsBoven(124600), 129500);
    assert.equal(netteprijsBoven(100100), 104500);
    assert.equal(netteprijsBoven(99000), 99500);
  });

  test('een bedrag dat de vorm al heeft, blijft staan', () => {
    assert.equal(netteprijsBoven(124500), 124500);
    assert.equal(netteprijsBoven(219500), 219500);
    assert.equal(netteprijsOnder(124500), 124500);
  });

  test('het nette bedrag eronder ligt er vijftig euro onder', () => {
    assert.equal(netteprijsOnder(124600), 124500);
    assert.equal(netteprijsOnder(120000), 119500);
  });

  test('een rond bedrag komt er nooit uit', () => {
    for (let c = 50000; c <= 400000; c += 1300) {
      assert.ok(netteprijsBoven(c) % 10000 === 4500 || netteprijsBoven(c) % 10000 === 9500,
        `${euroKort(netteprijsBoven(c))} heeft niet de goede vorm`);
    }
  });
});

describe('de btw-afronding', () => {
  test('niet elk bedrag is exact terug te rekenen', () => {
    // 1.245,00 is het bekende geval: de app maakt er 1.245,01 van.
    const a = btwTerugrekenen(124500);
    assert.equal(a.exact, false);
    assert.equal(a.terugCent, 124501);
  });

  test('en de meeste wel', () => {
    assert.equal(btwTerugrekenen(159500).exact, true);
    assert.equal(btwTerugrekenen(99500).exact, true);
  });

  test('splitsen geeft twee bedragen die elk wel kloppen en samen het totaal zijn', () => {
    const split = splitsExact(124500);
    assert.ok(split, 'er hoort een splitsing te zijn');
    assert.equal(split[0] + split[1], 124500);
    assert.ok(btwTerugrekenen(split[0]).exact);
    assert.ok(btwTerugrekenen(split[1]).exact);
    // Ronde bedragen krijgen voorrang, want die leggen zich beter uit.
    assert.equal(split[1] % 10000, 0);
  });

  test('een bedrag dat al klopt, hoeft niet gesplitst', () => {
    assert.equal(splitsExact(159500), null);
  });
});

describe('een bedrag toetsen', () => {
  const basis = { inkoopCent: 50000, uren: 8, uurtariefCent: 7500, margeEisPct: 30, margeStreefPct: 40 };

  test('een bedrag dat allebei de grenzen haalt geeft geen waarschuwing over de grenzen', () => {
    const t = toets({ ...basis, prijsCent: 159500 });
    assert.equal(t.haaltMarge, true);
    assert.equal(t.haaltUurtarief, true);
    assert.equal(t.waarschuwingen.filter((w) => /ondergrens/.test(w)).length, 0);
  });

  test('de marge halen is niet genoeg: het uurtarief wordt apart genoemd', () => {
    // Dit is de fout die op 18 september 2026 twee keer gemaakt is.
    const t = toets({ inkoopCent: 20000, uren: 10, uurtariefCent: 8000, margeEisPct: 30, prijsCent: 99500 });
    assert.equal(t.haaltMarge, true);
    assert.equal(t.haaltUurtarief, false);
    assert.ok(t.waarschuwingen.some((w) => /uurtarief/.test(w)), t.waarschuwingen.join(' | '));
  });

  test('apparatuur boven de helft van het bedrag wordt gemeld', () => {
    const t = toets({ inkoopCent: 60000, uren: 1, margeEisPct: 30, prijsCent: 110000 });
    assert.ok(t.apparaatAandeelPct > 50);
    assert.ok(t.waarschuwingen.some((w) => /meer dan de helft/.test(w)));
  });

  test('winst en het bedrag per uur rekenen over hetzelfde', () => {
    const t = toets({ ...basis, prijsCent: 159500 });
    assert.equal(t.winstCent, Math.round(159500 / 1.21) - 50000);
    assert.equal(t.perUurCent, Math.round(t.winstCent / 8));
    assert.ok(Math.abs(t.margePct - (t.winstCent / 159500) * 100) < 0.0001);
  });

  test('een bedrag dat niet exact terug te rekenen is, wordt gemeld met een splitsing', () => {
    const t = toets({ ...basis, prijsCent: 124500 });
    assert.equal(t.btwExact, false);
    assert.equal(t.btwOpPdfCent, 124501);
    assert.ok(t.splitsing);
    assert.ok(t.waarschuwingen.some((w) => /splits/.test(w)));
  });
});

describe('het voorstel', () => {
  test('het voorstel ligt boven de ondergrens en heeft de goede vorm', () => {
    const v = prijsvoorstel({ inkoopCent: 50000, uren: 8, uurtariefCent: 7500, margeEisPct: 30 });
    assert.ok(v.prijsCent >= v.ondergrensCent);
    assert.ok(v.prijsCent % 10000 === 4500 || v.prijsCent % 10000 === 9500);
    assert.equal(v.voorstel.haaltMarge, true);
    assert.equal(v.voorstel.haaltUurtarief, true);
  });

  test('het bedrag eronder komt alleen in beeld als het er vlak onder zit', () => {
    // Ondergrens net boven een net bedrag: dan is het bedrag eronder een keuze.
    const dichtbij = prijsvoorstel({ inkoopCent: 41322, uren: 0, margeEisPct: 0.0001, uurtariefCent: 0 });
    assert.ok(dichtbij.tekortCent <= 1000);
    assert.ok(dichtbij.krapCent, 'vlak onder de grens hoort het bedrag eronder genoemd te worden');

    // En als het er tientjes onder zit, is het geen keuze maar te goedkoop.
    const verweg = prijsvoorstel({ inkoopCent: 12000, uren: 8, uurtariefCent: 7500, margeEisPct: 30 });
    assert.ok(verweg.tekortCent > 1000);
    assert.equal(verweg.krapCent, null);
  });
});

describe('wat hier niet in hoort', () => {
  test('er staan geen echte inkoopprijzen of tarieven in deze map', async () => {
    // De map staat openbaar op GitHub. Het instellingenbestand met de echte
    // bedragen hoort daarom in .gitignore te staan, net als het rekeningnummer
    // dat om dezelfde reden nergens in de code voorkomt.
    const { readFileSync } = await import('node:fs');
    const { fileURLToPath } = await import('node:url');
    const negeer = readFileSync(fileURLToPath(new URL('../.gitignore', import.meta.url)), 'utf8');
    assert.ok(/^prijsinstellingen\.json$/m.test(negeer),
      'prijsinstellingen.json hoort in .gitignore te staan');
  });
});
