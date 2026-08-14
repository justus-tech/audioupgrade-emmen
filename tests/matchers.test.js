/**
 * De herkenningspatronen, getoetst tegen echte RDW-schrijfwijzen.
 *
 * Dit is de belangrijkste test van het project. De patronen bepalen op welke
 * pagina een bezoeker terechtkomt, en een patroon dat net iets te breed wordt
 * merk je nergens aan — behalve dat iedereen ineens op dezelfde pagina komt.
 *
 * De gevallen staan in tests/gevallen.js, samen met de reden waarom ze er
 * staan. Deze test draait offline; de live dekkingsscan zit in
 * scripts/valideer-kenteken.mjs.
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { MODELS } from '../src/data/models.js';
import { AUTOS } from '../src/data/autos.js';
import { matchAuto } from '../src/lib/match.js';
import { GEVALLEN, GEWEIGERDE_SOORTEN } from './gevallen.js';

/** Zoals de kenteken-check op de homepage: ruwe tekst, eerste treffer wint. */
export function modelSlug(merk, benaming) {
  const M = String(merk).toUpperCase();
  const B = String(benaming).toUpperCase();
  const hit = MODELS.find((x) => M.includes(x.matchers.merk) && x.matchers.model.test(B));
  return hit ? hit.slug : null;
}

/** Zoals de upgradepagina: genormaliseerde tekst via src/lib/match.js. */
export function autoSlug(merk, benaming, soort = 'Personenauto') {
  const a = matchAuto({ merk, handelsbenaming: benaming, voertuigsoort: soort }, AUTOS);
  return a ? a.slug : null;
}

describe('de kenteken-check op de homepage (models.js)', () => {
  for (const g of GEVALLEN.filter((x) => x.model !== undefined)) {
    const naam = `${g.merk} ${g.benaming} → ${g.model ?? 'niets'}${g.waarom ? ` (${g.waarom})` : ''}`;
    test(naam, () => {
      assert.equal(modelSlug(g.merk, g.benaming), g.model);
    });
  }
});

describe('de upgradepagina (autos.js)', () => {
  for (const g of GEVALLEN.filter((x) => x.auto !== undefined)) {
    const naam = `${g.merk} ${g.benaming} → ${g.auto ?? 'niets'}${g.waarom ? ` (${g.waarom})` : ''}`;
    test(naam, () => {
      assert.equal(autoSlug(g.merk, g.benaming), g.auto);
    });
  }
});

describe('voertuigen die we weigeren', () => {
  for (const g of GEWEIGERDE_SOORTEN) {
    test(`${g.soort}: ${g.merk} ${g.benaming}`, () => {
      assert.equal(autoSlug(g.merk, g.benaming, g.soort), null);
    });
  }
});

describe('de gevallenlijst zelf', () => {
  test('elke verwachte slug bestaat ook echt', () => {
    const modelSlugs = new Set(MODELS.map((m) => m.slug));
    const autoSlugs = new Set(AUTOS.map((a) => a.slug));
    for (const g of GEVALLEN) {
      if (g.model) assert.ok(modelSlugs.has(g.model), `onbekende modelpagina: ${g.model}`);
      if (g.auto) assert.ok(autoSlugs.has(g.auto), `onbekende auto: ${g.auto}`);
    }
  });

  test('er staan genoeg "mag niet matchen"-gevallen in', () => {
    // Die zijn belangrijker dan de treffers: een te breed patroon is
    // schadelijker dan een ontbrekend patroon.
    const negatief = GEVALLEN.filter((g) => g.model === null || g.auto === null);
    assert.ok(negatief.length >= 12, `slechts ${negatief.length} negatieve gevallen`);
  });
});
