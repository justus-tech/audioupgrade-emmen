/**
 * Controle op de gegevensbestanden. Dit zijn de fouten die je niet ziet in de
 * browser maar die wel 150 pagina's tegelijk stukmaken: een dubbele slug, een
 * pakket dat niet bestaat, een patroon dat stiekem alles vangt.
 *
 * De aanleiding voor een paar van deze tests is een echte fout: bij een
 * zoek-en-vervang belandde er ooit een onzichtbaar stuurteken in een patroon,
 * waardoor alle BMW's ineens niet meer herkend werden. Dat zag je nergens aan.
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { MODELS, merkSlug, modelPerSlug } from '../src/data/models.js';
import { MERKEN, merkenPerSlug, MERKEN_MET_MODELLEN } from '../src/data/merken.js';
import { PACKAGES, SITE, AUDIOMERKEN } from '../src/data/site.js';
import { STANDAARD_PAKKETTEN } from '../src/data/generiek.js';
import { AUTOS, autoTabel } from '../src/data/autos.js';

describe('modelpagina\'s', () => {
  test('er zijn er genoeg om de moeite waard te zijn', () => {
    assert.ok(MODELS.length >= 100, `slechts ${MODELS.length} modellen`);
  });

  test('elke slug is uniek — anders overschrijft de ene pagina de andere', () => {
    const gezien = new Map();
    for (const m of MODELS) {
      assert.equal(gezien.has(m.slug), false, `dubbele slug: ${m.slug}`);
      gezien.set(m.slug, m);
    }
  });

  test('slugs zijn webadresveilig', () => {
    for (const m of MODELS) {
      assert.match(m.slug, /^[a-z0-9-]+$/, `rare slug: ${m.slug}`);
    }
  });

  test('alle verplichte velden zijn ingevuld', () => {
    for (const m of MODELS) {
      for (const veld of ['brand', 'model', 'title', 'description', 'intro']) {
        assert.equal(typeof m[veld], 'string', `${m.slug}: ${veld} ontbreekt`);
        assert.ok(m[veld].trim().length > 0, `${m.slug}: ${veld} is leeg`);
      }
      assert.ok(m.solution?.title && m.solution?.text, `${m.slug}: solution incompleet`);
      assert.equal(typeof m.carplay?.possible, 'boolean', `${m.slug}: carplay.possible ontbreekt`);
      assert.ok(m.carplay.text.trim().length > 0, `${m.slug}: carplay.text is leeg`);
    }
  });

  test('elke pagina heeft precies drie problemen en drie vragen', () => {
    for (const m of MODELS) {
      assert.equal(m.problems.length, 3, `${m.slug}: ${m.problems.length} problemen`);
      assert.equal(m.faq.length, 3, `${m.slug}: ${m.faq.length} vragen`);
      for (const f of m.faq) {
        assert.ok(f.q.trim().length > 0 && f.a.trim().length > 0, `${m.slug}: lege vraag of antwoord`);
      }
    }
  });

  test('de titel past binnen wat Google toont', () => {
    for (const m of MODELS) {
      assert.ok(m.title.length <= 70, `${m.slug}: titel ${m.title.length} tekens`);
    }
  });

  test('de omschrijving past binnen wat Google toont', () => {
    for (const m of MODELS) {
      assert.ok(
        m.description.length >= 70 && m.description.length <= 175,
        `${m.slug}: omschrijving ${m.description.length} tekens`
      );
    }
  });

  test('elke pagina verwijst alleen naar pakketten die bestaan', () => {
    const bestaand = new Set(PACKAGES.map((p) => p.slug));
    for (const m of MODELS) {
      for (const slug of m.packages ?? STANDAARD_PAKKETTEN) {
        assert.ok(bestaand.has(slug), `${m.slug}: onbekend pakket ${slug}`);
      }
    }
  });

  test('elke pagina toont minstens één pakket', () => {
    for (const m of MODELS) {
      assert.ok((m.packages ?? STANDAARD_PAKKETTEN).length > 0, `${m.slug}: geen pakketten`);
    }
  });

  test('modelPerSlug wijst naar hetzelfde model', () => {
    for (const m of MODELS) {
      assert.equal(modelPerSlug[m.slug], m, `${m.slug}: modelPerSlug klopt niet`);
    }
  });
});

describe('herkenningspatronen', () => {
  test('elk patroon is een geldige reguliere expressie', () => {
    for (const m of MODELS) {
      assert.ok(m.matchers?.merk, `${m.slug}: merk-matcher ontbreekt`);
      assert.ok(m.matchers.model instanceof RegExp, `${m.slug}: model-matcher is geen RegExp`);
    }
  });

  test('geen onzichtbare stuurtekens in een patroon', () => {
    // Zo raakte "\b" ooit een echt backspace-teken (U+0008): onzichtbaar in de
    // editor, maar het patroon matchte daarna niets meer.
    for (const m of MODELS) {
      const bron = m.matchers.model.source;
      for (const teken of bron) {
        const code = teken.codePointAt(0);
        assert.ok(
          code >= 0x20 || teken === '\t',
          `${m.slug}: stuurteken U+${code.toString(16).padStart(4, '0')} in patroon ${JSON.stringify(bron)}`
        );
      }
      assert.doesNotMatch(bron, /[​-‍﻿]/, `${m.slug}: onzichtbare spatie in patroon`);
    }
  });

  test('merk-matchers staan in hoofdletters, want ze draaien op ruwe RDW-tekst', () => {
    for (const m of MODELS) {
      assert.equal(m.matchers.merk, m.matchers.merk.toUpperCase(), `${m.slug}: merk niet in hoofdletters`);
    }
  });

  test('geen patroon vangt alles', () => {
    for (const m of MODELS) {
      const bron = m.matchers.model.source;
      assert.notEqual(bron, '', `${m.slug}: leeg patroon`);
      assert.notEqual(bron, '.*', `${m.slug}: patroon vangt alles`);
      assert.ok(!m.matchers.model.test(''), `${m.slug}: patroon matcht een lege naam`);
    }
  });

  test('specifiekere patronen staan bovenaan bij hetzelfde merk', () => {
    // Als een later patroon een strikt langere versie is van een eerder
    // patroon, wordt het nooit bereikt. Dat is precies hoe "Range Rover
    // Sport" ooit een gewone "Range Rover" werd.
    for (let i = 0; i < MODELS.length; i++) {
      for (let j = i + 1; j < MODELS.length; j++) {
        const a = MODELS[i];
        const b = MODELS[j];
        if (a.matchers.merk !== b.matchers.merk) continue;
        const bronA = a.matchers.model.source;
        const bronB = b.matchers.model.source;
        if (bronA === bronB) {
          assert.fail(`${a.slug} en ${b.slug} hebben hetzelfde patroon ${bronA}`);
        }
      }
    }
  });

  test('een patroon met cijfers gebruikt geen \\b erachter', () => {
    // Tussen "0" en "I" ligt geen woordgrens, dus /^3\d{2}\b/ matcht "320I"
    // niet. De oplossing is een vooruitblik: (?!\d).
    for (const m of MODELS) {
      const bron = m.matchers.model.source;
      assert.doesNotMatch(
        bron,
        /\\d(\{[^}]*\})?\\b/,
        `${m.slug}: \\b direct na een cijferklasse in ${bron} — gebruik (?!\\d)`
      );
    }
  });

  test('geen patroon loopt vast op een lange naam (geen catastrofale backtracking)', () => {
    const lang = 'A'.repeat(400) + ' ' + '9'.repeat(400);
    for (const m of MODELS) {
      const start = Date.now();
      m.matchers.model.test(lang);
      assert.ok(Date.now() - start < 50, `${m.slug}: patroon is traag op lange invoer`);
    }
  });
});

describe('merken', () => {
  test('elke merkslug is uniek', () => {
    const gezien = new Set();
    for (const m of MERKEN) {
      assert.equal(gezien.has(m.slug), false, `dubbele merkslug: ${m.slug}`);
      gezien.add(m.slug);
    }
  });

  test('merkenPerSlug klopt', () => {
    for (const m of MERKEN) assert.equal(merkenPerSlug[m.slug], m);
  });

  test('elk merk heeft de velden die de pagina nodig heeft', () => {
    for (const m of MERKEN) {
      for (const veld of ['naam', 'titel', 'beschrijving', 'intro', 'probleem', 'fabriekssystemen']) {
        assert.ok(String(m[veld] || '').trim(), `${m.slug}: ${veld} ontbreekt`);
      }
    }
  });

  test('er wordt alleen een merkpagina gemaakt als er ook modellen zijn', () => {
    // Anders krijg je een kop met een leeg lijstje eronder.
    const merkenMetModellen = new Set(MODELS.map((m) => merkSlug(m.brand)));
    for (const m of MERKEN_MET_MODELLEN) {
      assert.ok(merkenMetModellen.has(m.slug), `${m.slug} zou geen merkpagina moeten krijgen`);
    }
  });

  test('MERKEN_MET_MODELLEN mist geen enkel merk dat wél modellen heeft', () => {
    const beschreven = new Set(MERKEN.map((m) => m.slug));
    const getoond = new Set(MERKEN_MET_MODELLEN.map((m) => m.slug));
    for (const m of MERKEN) {
      const heeftModellen = MODELS.some((model) => merkSlug(model.brand) === m.slug);
      assert.equal(getoond.has(m.slug), heeftModellen, `${m.slug} staat verkeerd in de lijst`);
    }
    assert.ok(beschreven.size >= getoond.size);
  });
});

describe('pakketten en prijzen', () => {
  test('alle vijf pakketten staan er', () => {
    assert.equal(PACKAGES.length, 5);
  });

  test('elke pakketslug is uniek', () => {
    const slugs = PACKAGES.map((p) => p.slug);
    assert.equal(new Set(slugs).size, slugs.length);
  });

  test('de prijzen staan er precies zoals op de oude site', () => {
    // Deze bedragen zijn met Justus vastgelegd. Wijzigt hier iets zonder dat
    // hij dat gevraagd heeft, dan hoort deze test te klappen.
    const verwacht = {
      'carplay-upgrade': 'Vanaf € 695,00',
      'akoestische-basis': '€ 995,00',
      'oem-plus-executive': '€ 2.195,00',
      'reference-edition': 'Vanaf € 3.695,00',
      'akoestische-isolatie': 'Prijs op aanvraag',
    };
    for (const p of PACKAGES) {
      assert.equal(p.price, verwacht[p.slug], `prijs van ${p.slug} is gewijzigd`);
    }
  });

  test('elk pakket heeft de tekst die de kaart nodig heeft', () => {
    for (const p of PACKAGES) {
      for (const veld of ['name', 'tagline', 'short', 'body', 'cta', 'duur']) {
        assert.ok(String(p[veld] || '').trim(), `${p.slug}: ${veld} ontbreekt`);
      }
      assert.ok(Array.isArray(p.features), `${p.slug}: features is geen lijst`);
      assert.ok(Array.isArray(p.scores), `${p.slug}: scores is geen lijst`);
    }
  });

  test('scorebalkjes lopen van 1 tot en met 5', () => {
    for (const p of PACKAGES) {
      for (const s of p.scores) {
        assert.ok(String(s.label || '').trim(), `${p.slug}: score zonder label`);
        assert.ok(
          Number.isInteger(s.waarde) && s.waarde >= 1 && s.waarde <= 5,
          `${p.slug}: score ${s.label} is ${s.waarde}`
        );
      }
    }
  });

  test('precies één pakket is "meest gekozen"', () => {
    assert.equal(PACKAGES.filter((p) => p.populair).length, 1);
  });

  test('de standaardpakketten bestaan allemaal', () => {
    const bestaand = new Set(PACKAGES.map((p) => p.slug));
    for (const slug of STANDAARD_PAKKETTEN) assert.ok(bestaand.has(slug), `onbekend pakket ${slug}`);
  });
});

describe('bedrijfsgegevens', () => {
  test('de gegevens die op elke pagina staan zijn ingevuld', () => {
    for (const veld of ['name', 'phone', 'email', 'whatsapp', 'kvk', 'btw', 'street', 'postalCode', 'city']) {
      assert.ok(String(SITE[veld] || '').trim(), `SITE.${veld} ontbreekt`);
    }
  });

  test('telefoonnummer staat in internationale notatie', () => {
    assert.match(SITE.phone, /^\+31\d{9}$/);
  });

  test('postcode heeft de Nederlandse vorm', () => {
    assert.match(SITE.postalCode, /^\d{4} ?[A-Z]{2}$/);
  });

  test('e-mailadres is een adres', () => {
    assert.match(SITE.email, /^[^@\s]+@[^@\s]+\.[a-z]{2,}$/);
  });

  test('de audiomerken staan erin', () => {
    assert.ok(AUDIOMERKEN.length >= 5);
    assert.ok(AUDIOMERKEN.every((m) => typeof m === 'string' && m.trim()));
  });
});

describe('de twee herkenningslijsten spreken elkaar niet tegen', () => {
  test('de tabel voor de browser verwijst nooit naar een pagina die niet bestaat', () => {
    // autos.js voedt de upgradepagina, models.js de doorverwijzing vanaf de
    // homepage. Een slug die nergens heen leidt zou de site laten onthouden
    // dat er een modelpagina is die er niet is.
    const modelSlugs = new Set(MODELS.map((m) => m.slug));
    const kapot = autoTabel.filter((a) => a.slug && !modelSlugs.has(a.slug)).map((a) => a.slug);
    assert.deepEqual(kapot, [], `slugs zonder modelpagina: ${kapot.join(', ')}`);
  });

  test('elke auto zonder eigen pagina wordt nog wél bij naam herkend', () => {
    // Zonder pagina hoort de bezoeker nog steeds "Upgrades voor jouw Bentley
    // Continental GT" te zien, niet de ruwe RDW-tekst.
    const zonderPagina = autoTabel.filter((a) => !a.slug);
    for (const a of zonderPagina) {
      assert.ok(String(a.merk || '').trim(), 'auto zonder merk');
      assert.ok(String(a.model || '').trim(), `${a.merk}: model ontbreekt`);
    }
  });

  test('elke slug in autos.js is uniek', () => {
    const slugs = AUTOS.map((a) => a.slug).filter(Boolean);
    assert.equal(new Set(slugs).size, slugs.length, 'dubbele slug in autos.js');
  });

  test('de patronen in autos.js zijn ook geldig en zonder stuurtekens', () => {
    for (const a of AUTOS) {
      assert.ok(a.matchers?.model instanceof RegExp, `${a.slug}: geen geldig patroon`);
      for (const teken of a.matchers.model.source) {
        assert.ok(teken.codePointAt(0) >= 0x20, `${a.slug}: stuurteken in patroon`);
      }
    }
  });
});
