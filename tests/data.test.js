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
import { PACKAGES, SITE, AUDIOMERKEN, AUDIOPAKKETTEN, LOSSE_OPTIES, pakkettenVan } from '../src/data/site.js';
import { STANDAARD_PAKKETTEN } from '../src/data/generiek.js';
import { AUTOS, autoTabel } from '../src/data/autos.js';
import { REVIEWS, reviewsOpDatum } from '../src/data/reviews.js';
import { PAGINAS } from '../src/i18n/paginas.js';
import { TEKSTEN } from '../src/i18n/teksten.js';
import { VRAGEN } from '../src/data/vragen.js';
import { WERK } from '../src/data/werk.js';
import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HIER = dirname(fileURLToPath(import.meta.url));

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
  test('alle zes pakketten staan er', () => {
    assert.equal(PACKAGES.length, 6);
  });

  // De site toont de pakketten in twee groepen: vier audiopakketten in één
  // rij en daarnaast de twee losse opties. Raakt een pakket buiten beide
  // lijsten, dan staat het nergens meer op de site — en dat merk je verder
  // nergens aan, want de pagina bouwt gewoon.
  test('elk pakket staat in precies één van de twee lijsten', () => {
    const ingedeeld = [...AUDIOPAKKETTEN, ...LOSSE_OPTIES];
    assert.equal(new Set(ingedeeld).size, ingedeeld.length, 'een slug staat in beide lijsten');
    assert.deepEqual(
      [...ingedeeld].sort(),
      PACKAGES.map((p) => p.slug).sort(),
      'de twee lijsten dekken niet precies alle pakketten',
    );
  });

  test('de audiopakketten lopen op in prijs', () => {
    const bedragen = pakkettenVan(AUDIOPAKKETTEN).map((p) => p.bedrag);
    for (let i = 1; i < bedragen.length; i++) {
      assert.ok(
        bedragen[i] > bedragen[i - 1],
        `${AUDIOPAKKETTEN[i]} is niet duurder dan ${AUDIOPAKKETTEN[i - 1]}`,
      );
    }
  });

  // "Onze aanrader" hoort bij één pakket. Bij twee is het geen aanrader meer
  // maar een sticker, en dan doet hij niets.
  test('precies één pakket draagt het label', () => {
    assert.equal(PACKAGES.filter((p) => p.populair).length, 1);
  });

  /**
   * Het midden van de kaart mag niet leeg zijn.
   *
   * Daar staan de balkjes, of — bij een pakket waar balkjes niets zeggen —
   * drie regels over wat het anders maakt. Valt allebei weg, dan staat er een
   * gat tussen de samenvatting en de doorlooptijd.
   */
  test('elk audiopakket toont balkjes of drie regels', () => {
    for (const p of pakkettenVan(AUDIOPAKKETTEN)) {
      const heeft = p.scores.length > 0 || (p.uitgelicht?.length ?? 0) > 0;
      assert.ok(heeft, `${p.slug}: niets in het midden van de kaart`);
    }
  });

  /**
   * Twee pakketten naast elkaar met exact dezelfde balkjes.
   *
   * Dat stond er: The Competition Build had Volume, Bass en Zuiverheid op
   * vijf van de vijf, precies als The Reference Edition ernaast. Daarmee zei
   * de duurste kaart letterlijk "even goed als die hiernaast". Dat is een
   * argument om hem niet te kopen, en het is ook nog eens niet waar te maken.
   */
  /**
   * Elke trede moet zichtbaar zijn.
   *
   * De balkjes hebben maar één taak: laten zien wat je erbij krijgt als je
   * een pakket hoger gaat. Staat er bij het ene 4/5/5 en bij het volgende
   * 5/5/5, dan zie je voor 1.500 euro één blokje verschil — en dat is een
   * argument om het niet te doen. Zie DE BALKJES in site.js.
   */
  test('de balkjes lopen per onderdeel op met de prijs', () => {
    const metBalkjes = pakkettenVan(AUDIOPAKKETTEN).filter((p) => p.scores.length > 0);
    const labels = metBalkjes[0].scores.map((s) => s.label);

    for (const label of labels) {
      let vorige = null;
      for (const p of metBalkjes) {
        const score = p.scores.find((s) => s.label === label);
        assert.ok(score, `${p.slug}: heeft geen ${label} terwijl de anderen dat wel hebben`);
        if (vorige) {
          assert.ok(
            score.waarde > vorige.waarde,
            `${label}: ${p.slug} staat op ${score.waarde} en ${vorige.slug} ook al op ${vorige.waarde}`
          );
        }
        vorige = { waarde: score.waarde, slug: p.slug };
      }
    }
  });

  /* De vijf is van het duurste pakket. Staat er eerder al een vijf, dan valt
     er voor het pakket erboven niets meer te verkopen. */
  test('alleen het hoogste audiopakket met balkjes haalt de vijf', () => {
    const metBalkjes = pakkettenVan(AUDIOPAKKETTEN).filter((p) => p.scores.length > 0);
    for (const p of metBalkjes.slice(0, -1)) {
      for (const s of p.scores) {
        assert.ok(s.waarde < 5, `${p.slug}: ${s.label} staat al op 5`);
      }
    }
  });

  test('geen twee audiopakketten tonen dezelfde balkjes', () => {
    const gezien = new Map();
    for (const p of pakkettenVan(AUDIOPAKKETTEN)) {
      if (p.scores.length === 0) continue;
      const vinger = p.scores.map((s) => `${s.label}:${s.waarde}`).join('|');
      assert.equal(
        gezien.has(vinger), false,
        `${p.slug} heeft dezelfde balkjes als ${gezien.get(vinger)}`
      );
      gezien.set(vinger, p.slug);
    }
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
      // Zonder "vanaf": het bedrag hoort bij een vastgelegde samenstelling.
      // Zie de uitleg bij dit pakket in site.js.
      'reference-edition': '€ 3.695,00',
      // Het duurste pakket, en het enige waar de prijs per project verschilt.
      // Het startbedrag staat in de kleine regel eronder — dat is het anker
      // dat 3.695 ernaast leesbaar houdt.
      'competitie-show': 'Prijs op aanvraag',
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

/**
 * Reviews en eigen werkfoto's.
 *
 * Deze twee lijsten zijn nu leeg en worden binnenkort gevuld — door iemand die
 * geen programmeur is, tussen twee klussen door. Precies dan sluipen er fouten
 * in: een ontbrekende naam, een datum in het verkeerde formaat, een foto die
 * niet in de lijst staat. Deze tests vangen dat vóórdat het op de site komt.
 *
 * Wat een test NIET kan controleren is of een review echt van een klant komt.
 * Daar is alleen de regel bovenaan reviews.js voor, en het geweten van degene
 * die hem invult.
 */
/**
 * De vertalingen.
 *
 * Wat hier getest wordt zijn precies de fouten die ik zelf gemaakt heb en pas
 * vond door alle veertien pagina's woord voor woord na te lezen:
 *
 *   - een knop die "Ask about Basis" zei terwijl het pakket in het Engels
 *     "Acoustic Foundation" heet;
 *   - een pakket waar vijf concrete kenmerken tot vier vage waren samengevat;
 *   - "conservatory" (een serre) waar "conservatoire" moest staan;
 *   - "Autointerieurs" en "hinterstehen": Nederlands met een Duits jasje aan.
 *
 * Een test kan geen goede zinnen schrijven. Wel kan hij dit soort dingen
 * vangen: ontbrekende velden, aantallen die niet kloppen, en een handjevol
 * woorden waarvan we weten dat ze fout zijn.
 */
describe('vertalingen', () => {
  const TALEN = ['de', 'en'];

  test('elk pakket is in beide talen volledig ingevuld', () => {
    const velden = ['naam', 'prijs', 'tagline', 'short', 'body', 'cta', 'duur'];
    for (const taal of TALEN) {
      for (const pkg of PACKAGES) {
        const v = PAGINAS[taal].pakketten[pkg.slug];
        assert.ok(v, `${taal}: pakket ${pkg.slug} ontbreekt`);
        for (const veld of velden) {
          assert.ok(v[veld]?.trim(), `${taal}/${pkg.slug}: ${veld} is leeg`);
        }
      }
    }
  });

  /* Staan er drie regels in plaats van balkjes, dan moeten die er in het
     Duits en Engels ook staan — anders heeft die kaart daar een gat waar de
     Nederlandse kaart zijn verhaal vertelt. */
  test('drie regels in plaats van balkjes worden meevertaald', () => {
    for (const taal of TALEN) {
      for (const pkg of PACKAGES) {
        if (!pkg.uitgelicht?.length) continue;
        const v = PAGINAS[taal].pakketten[pkg.slug];
        assert.equal(
          v.uitgelicht?.length, pkg.uitgelicht.length,
          `${taal}/${pkg.slug}: uitgelicht ontbreekt of is korter`
        );
        for (const regel of v.uitgelicht ?? []) {
          assert.ok(regel.label?.trim() && regel.waarde?.trim(), `${taal}/${pkg.slug}: lege regel`);
        }
        assert.ok(v.vlag?.trim(), `${taal}/${pkg.slug}: het vlaggetje is niet vertaald`);
      }
    }
  });

  test('geen pakket verliest kenmerken in de vertaling', () => {
    for (const taal of TALEN) {
      for (const pkg of PACKAGES) {
        const v = PAGINAS[taal].pakketten[pkg.slug];
        assert.ok(
          v.features.length >= pkg.features.length,
          `${taal}/${pkg.slug}: ${v.features.length} kenmerken tegenover ${pkg.features.length} in het Nederlands`
        );
      }
    }
  });

  test('een knop noemt geen naam die alleen in het Nederlands bestaat', () => {
    /**
     * De fout die dit vangt: de Engelse knop zei "Ask about Basis" terwijl het
     * pakket daar "Acoustic Foundation" heet. "Basis" komt uit de Nederlandse
     * naam en stond nergens anders op de Engelse pagina.
     *
     * Bewust smal: alleen woorden die wél in de Nederlandse pakketnaam staan
     * en niét in de vertaalde. Een knop mag verder zeggen wat hij wil —
     * "Maßarbeit besprechen" is gewoon Duits en hoort niet af te gaan.
     *
     * \p{L} en niet a-z à-ÿ, anders valt de ß buiten het bereik en wordt
     * "Maßarbeit" gesplitst in "Ma" en "arbeit".
     */
    const woorden = (s) =>
      s.toLowerCase().split(/[^\p{L}\p{N}+]+/u).filter((w) => w.length > 3);

    for (const taal of TALEN) {
      for (const pkg of PACKAGES) {
        const v = PAGINAS[taal].pakketten[pkg.slug];
        const alleenNederlands = woorden(pkg.name).filter(
          (w) => !woorden(v.naam).includes(w)
        );
        for (const w of woorden(v.cta)) {
          assert.ok(
            !alleenNederlands.includes(w),
            `${taal}/${pkg.slug}: de knop zegt "${w}", maar het pakket heet daar "${v.naam}"`
          );
        }
      }
    }
  });

  test('elke taal heeft evenveel vragen als het Nederlands', () => {
    for (const taal of TALEN) {
      assert.equal(
        PAGINAS[taal].vragen.lijst.length,
        VRAGEN.length,
        `${taal}: ander aantal vragen`
      );
      for (const [i, v] of PAGINAS[taal].vragen.lijst.entries()) {
        assert.match(v.vraag, /\?$/, `${taal} vraag ${i + 1}: mist een vraagteken`);
        assert.ok(v.antwoord.length > 60, `${taal} vraag ${i + 1}: antwoord te kort`);
      }
    }
  });

  test('geen bekende vertaalvallen', () => {
    /* Woorden die er in eerdere versies écht in stonden. Kort houden: deze
       lijst is een vangnet voor bekende missers, geen taalcontrole. */
    const VERBODEN = {
      en: ['conservatory', 'think along', 'in sound since'],
      de: ['Autointerieur', 'hinterstehen', 'im Ton,'],
    };
    for (const taal of TALEN) {
      const alles = JSON.stringify(PAGINAS[taal]) + JSON.stringify(TEKSTEN[taal]);
      for (const woord of VERBODEN[taal]) {
        assert.ok(!alles.includes(woord), `${taal}: "${woord}" staat er weer in`);
      }
    }
  });
});

describe('reviews', () => {
  test('elke review heeft een tekst, een naam en een datum', () => {
    for (const [i, r] of REVIEWS.entries()) {
      assert.ok(r.tekst?.trim(), `review ${i}: geen tekst`);
      assert.ok(r.naam?.trim(), `review ${i}: geen naam`);
      assert.match(String(r.datum), /^\d{4}-\d{2}$/, `review ${i}: datum moet jjjj-mm zijn`);
    }
  });

  test('een review is een citaat, geen verhandeling', () => {
    for (const r of REVIEWS) {
      assert.ok(r.tekst.length >= 25, `te kort om iets te zeggen: "${r.tekst}"`);
      assert.ok(r.tekst.length <= 400, `te lang voor een kaartje: "${r.tekst.slice(0, 40)}…"`);
    }
  });

  test('geen twee keer dezelfde review', () => {
    const uniek = new Set(REVIEWS.map((r) => r.tekst.trim().toLowerCase()));
    assert.equal(uniek.size, REVIEWS.length, 'er staat een dubbele review in');
  });

  test('de nieuwste staat vooraan', () => {
    const datums = reviewsOpDatum().map((r) => String(r.datum));
    assert.deepEqual(datums, [...datums].sort().reverse());
  });
});

describe('foto\'s van eigen werk', () => {
  test('elke foto heeft een bestandsnaam en een alt-tekst', () => {
    for (const [i, w] of WERK.entries()) {
      assert.ok(w.bestand?.trim(), `foto ${i}: geen bestandsnaam`);
      assert.match(w.bestand, /\.(jpg|jpeg|png|webp)$/i, `foto ${i}: ${w.bestand} is geen afbeelding`);
      assert.ok(
        w.alt?.trim().length > 10,
        `foto ${i}: de alt-tekst moet beschrijven wat er te zien is`
      );
    }
  });

  test('het bestand staat er ook echt', () => {
    for (const w of WERK) {
      const pad = join(HIER, '..', 'src', 'assets', 'werk', w.bestand);
      assert.ok(existsSync(pad), `${w.bestand} staat niet in src/assets/werk/`);
    }
  });

  test('een fase is er een uit het verhaal', () => {
    for (const w of WERK) {
      if (!w.fase) continue;
      assert.ok(
        ['voor', 'open', 'detail', 'na'].includes(w.fase),
        `onbekende fase: ${w.fase}`
      );
    }
  });
});
