/**
 * De huisstijl: kleuren, de twee standen (licht/donker) en de leesbaarheid.
 *
 * Het contrast wordt hier écht uitgerekend volgens de WCAG-formule. Dat is
 * geen luxe: #878787 op wit haalt maar 3,0:1 en dat leest niet. Deze test
 * vangt het als iemand ooit de lichte stand "even mooier" maakt.
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { BRAND, LICHT, PALETTE, cssThema } from '../src/data/brand.js';
import { KLEUREN, STANDAARD, kleurVan, metKleur } from '../src/lib/kleuren.js';

/** Zet #rrggbb om naar de relatieve helderheid volgens WCAG. */
function helderheid(hex) {
  const n = hex.replace('#', '');
  const kanalen = [0, 2, 4].map((i) => {
    const c = parseInt(n.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * kanalen[0] + 0.7152 * kanalen[1] + 0.0722 * kanalen[2];
}

/** Contrastverhouding tussen twee kleuren: 1 (gelijk) tot 21 (zwart op wit). */
function contrast(a, b) {
  const l1 = helderheid(a);
  const l2 = helderheid(b);
  const [licht, donker] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (licht + 0.05) / (donker + 0.05);
}

describe('het palet', () => {
  test('bestaat uit de vijf afgesproken kleuren', () => {
    assert.deepEqual(Object.values(PALETTE).sort(), [
      '#121212', '#1a1a1a', '#878787', '#f5f5f5', '#ff5e1f',
    ]);
  });

  test('het signatuuroranje is onveranderd', () => {
    assert.equal(PALETTE.orange, '#ff5e1f');
    assert.equal(BRAND.accent, '#ff5e1f');
    assert.equal(LICHT.accent, '#ff5e1f', 'oranje als vlak blijft in beide standen het merk');
  });
});

describe('de twee standen', () => {
  const rollen = [
    'bg', 'bgAlt', 'panel', 'text', 'textDim', 'accent', 'accentInk',
    'accentText', 'line', 'lineStrong', 'schaduw', 'korrel',
    'tekenLijn', 'tekenVlak', 'tekenVul', 'tekenDiep', 'tekenGloed',
    'tekstOpFoto',
  ];

  test('beide standen vullen exact dezelfde rollen in', () => {
    for (const rol of rollen) {
      assert.ok(BRAND[rol] !== undefined, `donker mist ${rol}`);
      assert.ok(LICHT[rol] !== undefined, `licht mist ${rol}`);
    }
    // Geen rol die maar in één van de twee bestaat.
    assert.deepEqual(Object.keys(BRAND).sort(), Object.keys(LICHT).sort());
  });

  test('licht is licht en donker is donker', () => {
    assert.ok(helderheid(BRAND.bg) < 0.1, 'donkere ondergrond is niet donker');
    assert.ok(helderheid(LICHT.bg) > 0.7, 'lichte ondergrond is niet licht');
  });
});

describe('leesbaarheid (WCAG)', () => {
  const eis = 4.5; // norm voor gewone tekst

  test('koptekst op de ondergrond — donkere stand', () => {
    assert.ok(contrast(BRAND.text, BRAND.bg) >= 7, 'koppen moeten ruim contrasteren');
  });

  test('bodytekst op de ondergrond — donkere stand', () => {
    const c = contrast(BRAND.textDim, BRAND.bg);
    assert.ok(c >= eis, `${c.toFixed(2)}:1 is te weinig`);
  });

  test('bodytekst op de ondergrond — lichte stand', () => {
    const c = contrast(LICHT.textDim, LICHT.bg);
    assert.ok(c >= eis, `${c.toFixed(2)}:1 is te weinig`);
  });

  test('bodytekst op een kaart — lichte stand', () => {
    const c = contrast(LICHT.textDim, LICHT.panel);
    assert.ok(c >= eis, `${c.toFixed(2)}:1 is te weinig`);
  });

  test('oranje als tekstkleur haalt de norm in beide standen', () => {
    const donker = contrast(BRAND.accentText, BRAND.bg);
    const licht = contrast(LICHT.accentText, LICHT.bg);
    assert.ok(donker >= eis, `donker: ${donker.toFixed(2)}:1`);
    assert.ok(licht >= eis, `licht: ${licht.toFixed(2)}:1`);
  });

  test('en dat is precies waarom de lichte stand een eigen oranje heeft', () => {
    // Het merkoranje op wit zou het níét halen. Deze test legt vast waarom
    // die tweede tint bestaat, zodat niemand hem "opruimt".
    const merkoranjeOpWit = contrast(PALETTE.orange, LICHT.bg);
    assert.ok(merkoranjeOpWit < eis, 'als dit slaagt, mag accentText weer gewoon het merkoranje zijn');
  });

  test('tekst op een foto is in beide standen licht', () => {
    // Een foto blijft donker, ook als de site licht staat. Zou deze kleur
    // meeveranderen, dan komt er zwarte tekst op een donkere foto.
    assert.equal(BRAND.tekstOpFoto, LICHT.tekstOpFoto);
    assert.ok(helderheid(BRAND.tekstOpFoto) > 0.7, 'tekst op foto moet licht zijn');
  });

  test('tekst op een oranje knop is leesbaar', () => {
    assert.ok(contrast(BRAND.accentInk, BRAND.accent) >= eis);
    assert.ok(contrast(LICHT.accentInk, LICHT.accent) >= eis);
  });
});

describe('de uitgestuurde CSS', () => {
  test('de eigen keuze staat als laatste, anders werkt de knop niet', () => {
    const naSysteem = cssThema.indexOf('prefers-color-scheme');
    const naKeuze = cssThema.lastIndexOf('[data-thema="licht"]');
    assert.ok(naSysteem > 0, 'de systeemvoorkeur ontbreekt');
    assert.ok(naKeuze > naSysteem, 'de eigen keuze staat vóór de systeemvoorkeur en verliest dan');
  });

  test('donker staat op :root, dus dat is de basis', () => {
    assert.ok(cssThema.startsWith(':root{'));
    assert.ok(cssThema.includes(`--bg: ${BRAND.bg}`));
  });

  test('de systeemvoorkeur laat een eigen keuze voor donker met rust', () => {
    assert.ok(cssThema.includes(':root:not([data-thema="donker"])'));
  });

  test('elke variabele komt in beide blokken voor', () => {
    const namen = [...cssThema.matchAll(/--[a-z-]+(?=:)/g)].map((m) => m[0]);
    const uniek = [...new Set(namen)];
    for (const naam of uniek) {
      const aantal = namen.filter((n) => n === naam).length;
      assert.equal(aantal, 3, `${naam} staat ${aantal}x in plaats van 3x (basis, systeem, keuze)`);
    }
  });
});

describe('RDW-kleuren', () => {
  test('alle dertien kleuren die de RDW kent staan erin', () => {
    assert.equal(Object.keys(KLEUREN).length, 13);
  });

  test('elke kleur heeft een geldige hexcode', () => {
    for (const [naam, k] of Object.entries(KLEUREN)) {
      assert.match(k.hex, /^#[0-9a-f]{6}$/, `${naam}: ${k.hex}`);
    }
  });

  test('elke kleur heeft een verbogen vorm voor "jouw ... auto"', () => {
    // "jouw zwart Octavia" is fout Nederlands; het moet "zwarte" zijn.
    for (const [naam, k] of Object.entries(KLEUREN)) {
      assert.ok(k.naam && k.bijvoeglijk, `${naam} mist een vorm`);
    }
    assert.equal(KLEUREN.ZWART.bijvoeglijk, 'zwarte');
    assert.equal(KLEUREN.ROOD.bijvoeglijk, 'rode');
  });

  test('kleuren die op -e eindigen blijven ongewijzigd', () => {
    assert.equal(KLEUREN.ORANJE.bijvoeglijk, 'oranje');
    assert.equal(KLEUREN.BEIGE.bijvoeglijk, 'beige');
    assert.equal(KLEUREN.ROSE.bijvoeglijk, 'roze');
  });

  test('kleurVan let niet op hoofdletters of spaties', () => {
    assert.equal(kleurVan('blauw'), KLEUREN.BLAUW);
    assert.equal(kleurVan(' BLAUW '), KLEUREN.BLAUW);
  });

  test('een onbekende kleur valt terug in plaats van te crashen', () => {
    for (const invoer of ['', null, undefined, 'Niet geregistreerd', 'TURQUOISE']) {
      assert.equal(kleurVan(invoer), STANDAARD);
    }
  });

  test('metKleur laat geen dubbele spatie achter als de kleur onbekend is', () => {
    assert.equal(metKleur('Saab 9-3', 'BLAUW'), 'blauwe Saab 9-3');
    assert.equal(metKleur('Saab 9-3', 'Niet geregistreerd'), 'Saab 9-3');
    assert.doesNotMatch(metKleur('Saab 9-3', null), / {2}/);
  });
});
