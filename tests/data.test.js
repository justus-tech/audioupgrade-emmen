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
import { ALGEMENE_VOORWAARDEN } from '../src/data/juridisch.js';
import { STANDAARD_PAKKETTEN } from '../src/data/generiek.js';
import { AUTOS, autoTabel } from '../src/data/autos.js';
import { REVIEWS, reviewsOpDatum, maandVan, GOOGLE_REVIEWS } from '../src/data/reviews.js';
import * as SCHETS from '../src/data/schets.js';
import { AUTO, ONDERDELEN, ZONES, ALLES, VOLGORDE, schetsVan, spiegelPad, MATEN, METER, HULPLIJNEN } from '../src/data/schets.js';
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
  test('alle zeven pakketten staan er', () => {
    assert.equal(PACKAGES.length, 7);
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
      // Losse optie, met een vaste prijs: 'prijs op aanvraag' kost Justus werk
      // en klanten haken erop af.
      'accu-voeding': '€ 395,00',
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

/**
 * EEN PRIJS DIE IN EEN MODELTEKST STAAT, MOET DIE VAN HET PAKKET ZIJN.
 *
 * De pakketprijzen staan in site.js, en dat hoort de enige bron te zijn.
 * Maar in de teksten van de modelpagina's staan ze ook letterlijk:
 * "De Akoestische Basis: premium speakers voorin plus deurdemping,
 * € 995 all-in" staat op vijfentwintig modelpagina's, en de CarPlay-prijs
 * en die van The OEM+ Executive elk op één.
 *
 * Vandaag kloppen ze alle zevenentwintig. Het gevaar zit in de dag erna:
 * verandert Justus een pakketprijs in site.js, dan veranderen die teksten
 * niet mee en staan er twee prijzen voor hetzelfde pakket op zijn eigen
 * site. Dat ziet een klant eerder dan wij.
 *
 * Deze test kost vandaag niets en valt om op precies het moment waarop het
 * uitmaakt. Zet je bewust een andere prijs in een tekst, dan hoort die eerst
 * in site.js te staan.
 */
describe('prijzen in de modelteksten', () => {
  /** Elk bedrag dat ergens in de tekst van een modelpagina staat. */
  const bedragenIn = (model) => {
    const alles = [
      model.intro,
      model.description,
      model.solution?.text,
      model.carplay?.text,
      ...(model.problems || []),
      ...(model.faq || []).flatMap((f) => [f.q, f.a]),
    ].filter(Boolean).join(' ');
    return [...alles.matchAll(/€\s?[\d.,]+/g)].map((t) => t[0]);
  };

  /* "€ 2.195,00" en "€ 2.195" zijn hetzelfde bedrag; nullen achter de komma
     en punten in het duizendtal doen er niet toe. */
  const kaal = (bedrag) => String(bedrag)
    .replace(/[€\s.]/g, '')
    .replace(/,00$/, '')
    .replace(/,$/, '');

  test('elk bedrag in een modeltekst is een echte pakketprijs', () => {
    const bekend = new Set(PACKAGES.map((p) => kaal(String(p.price).replace(/[^\d.,]/g, ''))));
    const vreemd = [];
    for (const model of MODELS) {
      for (const bedrag of bedragenIn(model)) {
        if (!bekend.has(kaal(bedrag))) {
          vreemd.push(`${model.slug}: "${bedrag}" staat niet bij de pakketten in site.js`);
        }
      }
    }
    assert.deepEqual(vreemd, [], 'een modelpagina noemt een prijs die niet meer klopt');
  });

  test('de test kijkt echt naar bedragen en niet naar niets', () => {
    /* Zonder deze ondergrens blijft bovenstaande test groen op de dag dat
       niemand meer een prijs in een modeltekst zet — of, erger, op de dag
       dat de bedragen anders geschreven worden en de zoeker ze mist. */
    const totaal = MODELS.reduce((som, m) => som + bedragenIn(m).length, 0);
    assert.ok(totaal >= 20, `er zijn maar ${totaal} bedragen gevonden in de modelteksten`);
  });
});

/**
 * GEEN SJABLOONTEKST OP DE MODELPAGINA'S — EN HET MAG NIET ERGER WORDEN.
 *
 * CLAUDE.md is er duidelijk over: elke modelpagina heeft eigen tekst, nooit
 * een sjabloon waarin alleen de modelnaam verschilt, want dat rankt niet en
 * leest als spam.
 *
 * Nagemeten op 19 oktober 2026 en dat is niet goed: 189 teksten staan
 * letterlijk op meer dan één modelpagina, samen 648 keer, verspreid over 142
 * van de 150 pagina's. De zwaarste gevallen:
 *
 *   22x  faq-vraag  "Verlies ik bagageruimte?"
 *   13x  probleem   "De achterklep resoneert hoorbaar mee zodra er echte bas bij komt."
 *    9x  antwoord   "De Akoestische Basis: premium speakers voorin plus deurdemping, € 995 all-in."
 *
 * Sinds 24 oktober worden de probleemteksten uitgeschreven. Het houvast per
 * pagina komt uit het record zelf — de generaties, de variant, of het
 * fabriekssysteem dat die pagina al noemde — zodat er niets bij verzonnen is.
 * Gedaan tot nu toe: de zitpositie op twaalf SUV's, de achterklep op dertien
 * crossovers, het bagageruimte-antwoord op veertien pagina's, en een reeks
 * losse groepen van vijf tot zeven.
 *
 * WAAR DIT VASTLOOPT, EN DAT IS GEEN ONWIL
 * Wat overblijft zijn vooral zinnen die een natuurkundig feit noemen dat voor
 * vijf vergelijkbare auto's even waar is: dat je hoog zit, dat rechte panelen
 * nagalmen. Die vijf keer anders opschrijven levert vijf formuleringen van
 * hetzelfde op, en dat is hetzelfde sjabloon in andere woorden — precies wat
 * CLAUDE.md verbiedt. Daarvoor is kennis van die auto nodig die niet in dit
 * databestand staat: wat je bij dát model aantreft als je de deur opent.
 * Zulke groepen blijven staan tot Justus die kennis erbij geeft.
 *
 * Een vraag die terugkomt is niet het ergste — "blijft mijn fabrieksgarantie
 * geldig?" is bij elke auto een echte vraag. Een letterlijk gelijk antwoord
 * of probleem is dat wel: dat is wat een zoekmachine als dubbele tekst leest.
 *
 * Dit uitschrijven is werk voor meer dan één ronde en vraagt per auto echte
 * kennis, geen synonymenjacht. Tot die tijd houdt deze test de stand vast.
 * HET GETAL HIERONDER MAG ALLEEN OMLAAG. Valt deze test om, dan is er
 * sjabloontekst bijgekomen in plaats van afgegaan.
 */
describe('sjabloontekst op de modelpagina\'s', () => {
  const normaliseer = (tekst) => String(tekst || '')
    .toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

  /** Elk stuk tekst van een modelpagina, met het soort erbij. */
  const stukkenVan = (model) => [
    ...(model.problems || []).map((t) => ['probleem', t]),
    ...(model.faq || []).flatMap((f) => [['faq-vraag', f.q], ['faq-antwoord', f.a]]),
    ['carplay', model.carplay?.text],
    ['oplossing', model.solution?.text],
    ['intro', model.intro],
    ['description', model.description],
  ].filter(([, t]) => t && String(t).trim());

  const dubbeleTeksten = () => {
    const kaart = new Map();
    for (const model of MODELS) {
      for (const [soort, tekst] of stukkenVan(model)) {
        const sleutel = `${soort}|${normaliseer(tekst)}`;
        if (!kaart.has(sleutel)) kaart.set(sleutel, []);
        kaart.get(sleutel).push(model.slug);
      }
    }
    return [...kaart.values()].filter((paginas) => paginas.length > 1);
  };

  /**
   * De stand van 19 oktober 2026, en wat hier geteld wordt.
   *
   * NIET het aantal verschillende dubbele teksten, maar het aantal
   * PLAATSINGEN daarvan. Dat verschil is precies de valkuil waar deze test
   * zelf eerst in trapte: zet je een zin die al op dertien pagina's staat op
   * een veertiende, dan blijft het aantal verschillende teksten 189 en merkt
   * niemand iets. Het aantal plaatsingen gaat dan van 648 naar 649, en dat
   * is wat er feitelijk slechter wordt.
   *
   * Alleen omlaag bijstellen. Stand: 648 op 19 oktober, 636 op 24 oktober,
   * 608 op 25 oktober, 599 op 26 oktober, 585 op 28 oktober, 572 op
   * 29 oktober, 557 op 30 oktober, 552 op 31 oktober. De probleemteksten gaan het eerst, want die staan
   * bovenaan de pagina en zijn het meest zichtbaar.
   */
  const PLAATSINGEN = 552;

  test('er komt geen sjabloontekst bij', () => {
    const dubbel = dubbeleTeksten();
    const plaatsingen = dubbel.reduce((som, paginas) => som + paginas.length, 0);
    assert.ok(
      plaatsingen <= PLAATSINGEN,
      `geleende tekst staat nu ${plaatsingen} keer op een modelpagina; dat was ${PLAATSINGEN}. `
      + 'Schrijf voor deze pagina eigen tekst in plaats van een bestaande zin te kopiëren.'
    );
    /* Ging het omlaag, dan hoort het getal hierboven mee te zakken, anders
       sluipt de boel er later weer ongemerkt in. */
    assert.ok(
      plaatsingen >= PLAATSINGEN - 20,
      `mooi: nog ${plaatsingen} plaatsingen (was ${PLAATSINGEN}). `
      + `Zet PLAATSINGEN in deze test op ${plaatsingen}.`
    );
  });

  test('geen enkele modelpagina bestaat alléén uit geleende tekst', () => {
    /* Het ergste geval: een pagina waarvan élk stuk tekst ook ergens anders
       staat. Dan is er niets eigen aan en heeft hij geen reden om te
       bestaan naast die andere pagina. */
    const geleend = new Set(dubbeleTeksten().flatMap((paginas) => paginas));
    const kaal = [];
    for (const model of MODELS) {
      const stukken = stukkenVan(model);
      if (!stukken.length) continue;
      const eigen = stukken.filter(([soort, tekst]) => {
        const sleutel = `${soort}|${normaliseer(tekst)}`;
        let keer = 0;
        for (const ander of MODELS) {
          for (const [s2, t2] of stukkenVan(ander)) {
            if (`${s2}|${normaliseer(t2)}` === sleutel) keer += 1;
          }
        }
        return keer === 1;
      });
      if (!eigen.length) kaal.push(model.slug);
    }
    assert.deepEqual(kaal, [], 'deze pagina heeft geen enkele eigen zin');
    assert.ok(geleend.size > 0, 'de meting werkt niet meer');
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

  /* Het stempel bij een review noemt het pakket. Een tikfout daarin staat
     dan als feit onder de woorden van een klant. */
  test('een genoemd pakket bestaat echt', () => {
    const namen = PACKAGES.map((p) => p.name);
    for (const r of REVIEWS) {
      if (r.pakket === undefined) continue;
      assert.ok(namen.includes(r.pakket), `onbekend pakket "${r.pakket}" bij ${r.naam}`);
    }
  });

  /* Sterren alleen als de klant ze zelf op Google gaf. Een review uit
     WhatsApp heeft er geen, en die verzinnen we er ook niet bij. */
  test('sterren alleen bij een Google-review, en zoals gegeven', () => {
    for (const r of REVIEWS) {
      if (r.bron !== undefined) {
        assert.ok(['google', 'whatsapp'].includes(r.bron), `onbekende bron "${r.bron}" bij ${r.naam}`);
      }
      if (r.sterren === undefined) continue;
      assert.equal(r.bron, 'google', `${r.naam}: sterren zonder dat de review van Google komt`);
      assert.ok(Number.isInteger(r.sterren) && r.sterren >= 1 && r.sterren <= 5, `${r.naam}: sterren moet 1 t/m 5 zijn`);
    }
  });

  test('de maand in het stempel', () => {
    assert.equal(maandVan('2026-09'), 'september 2026');
    assert.equal(maandVan('2027-01'), 'januari 2027');
  });

  test('de link naar Google is leeg of een echt adres', () => {
    if (!GOOGLE_REVIEWS) return;
    assert.match(GOOGLE_REVIEWS, /^https:\/\//);
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


describe('de algemene voorwaarden', () => {
  test('de artikelen lopen door van 1 tot en met het laatste', () => {
    /**
     * Bij het toevoegen van het herroepingsrecht schoven alle artikelen
     * daarachter een nummer op, en toen stonden er twee artikelen 6. In een
     * juridisch stuk is dat geen schoonheidsfoutje: je kunt er niet meer naar
     * verwijzen.
     */
    const nummers = ALGEMENE_VOORWAARDEN.artikelen.map((a) => {
      const m = a.kop.match(/^Artikel (\d+) — /);
      assert.ok(m, `geen artikelnummer in: ${a.kop}`);
      return Number(m[1]);
    });
    assert.deepEqual(nummers, nummers.map((_, i) => i + 1));
  });

  test('het herroepingsrecht staat erin, met de termijn erbij', () => {
    // Wettelijk verplichte informatie bij verkoop op afstand. Staat hij er
    // niet in, dan loopt de bedenktijd niet 14 dagen maar twaalf maanden.
    const artikel = ALGEMENE_VOORWAARDEN.artikelen.find((a) => /Herroeping/i.test(a.kop));
    assert.ok(artikel, 'er staat geen artikel over het herroepingsrecht in');
    const tekst = (artikel.lijst || []).join(' ');
    assert.match(tekst, /14 dagen/);
    assert.match(tekst, /werkplaats/, 'het verschil met een afspraak in de werkplaats ontbreekt');
    assert.match(tekst, /uitdrukkelijk/, 'het uitdrukkelijke verzoek om eerder te beginnen ontbreekt');
  });

  test('de FAQ noemt dezelfde afzegtermijn als artikel 9', () => {
    /**
     * De voorwaarden schrijven het als "14 dagen", de FAQ als "veertien
     * dagen". Twee plekken, twee schrijfwijzen — dus precies het soort
     * verschil dat er ongemerkt in sluipt als er ooit een ander aantal dagen
     * wordt afgesproken. Een klant die de FAQ leest en een klant die de
     * voorwaarden leest moeten hetzelfde te horen krijgen.
     */
    const WOORD = {
      1: 'een', 2: 'twee', 3: 'drie', 4: 'vier', 5: 'vijf', 6: 'zes', 7: 'zeven',
      8: 'acht', 9: 'negen', 10: 'tien', 14: 'veertien', 21: 'eenentwintig', 30: 'dertig',
    };
    const artikel = ALGEMENE_VOORWAARDEN.artikelen.find((a) => /Annulering/i.test(a.kop));
    const dagen = Number((artikel.lijst.join(' ').match(/tot uiterlijk (\d+) dagen/) || [])[1]);
    assert.ok(dagen > 0, 'geen afzegtermijn gevonden in artikel 9');

    const vraag = VRAGEN.find((v) => /verzetten/i.test(v.vraag));
    assert.ok(vraag, 'de vraag over het verzetten van een afspraak is weg');
    assert.ok(
      vraag.antwoord.includes(`${WOORD[dagen] || dagen} dagen`) ||
      vraag.antwoord.includes(`${dagen} dagen`),
      `de FAQ zegt iets anders dan de ${dagen} dagen uit artikel 9: ${vraag.antwoord}`
    );
  });

  test('er staat nergens nog een stukje code in de tekst', () => {
    // Een ontsnapte ${...} kwam als code op de pagina én op de pdf te staan.
    const alles = [
      ALGEMENE_VOORWAARDEN.intro,
      ...ALGEMENE_VOORWAARDEN.artikelen.flatMap((a) => [
        a.kop, ...(a.alineas || []), ...(a.lijst || []),
      ]),
    ].join(' ');
    assert.doesNotMatch(alles, /\$\{/, 'er staat letterlijk ${...} in de voorwaarden');
  });
});

/**
 * De doorkijktekening. De auto is met de hand getekend in coördinaten, en dat
 * is precies het soort bestand waarin een verschoven getal niemand opvalt —
 * tot er een bol half over een andere heen staat op een poster van A1.
 */
describe('de doorkijktekening van de auto', () => {
  /* De bol op de site is 16 breed, de halo 26. Twee bollen die dichter dan
     50 bij elkaar staan raken elkaar dus zichtbaar. */
  const MINSTENS = 50;
  const afstand = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

  test('elk onderdeel staat binnen de carrosserie', () => {
    for (const o of ALLES) {
      assert.ok(o.x > 100 && o.x < 340, `${o.id} staat met x=${o.x} naast de auto`);
      assert.ok(o.y > 24 && o.y < 616, `${o.id} staat met y=${o.y} buiten de auto`);
    }
  });

  test('een gespiegeld punt staat precies aan de andere kant', () => {
    for (const o of ONDERDELEN.filter((d) => d.spiegel)) {
      assert.equal(
        o.spiegel, AUTO.breedte - o.x,
        `${o.id} hangt scheef: ${o.spiegel} is niet de spiegeling van ${o.x}`
      );
    }
  });

  test('binnen één pakket raken twee bollen elkaar nooit', () => {
    for (const pakket of PACKAGES) {
      const punten = schetsVan(pakket.slug).flatMap((o) =>
        o.spiegel ? [{ id: o.id, x: o.x, y: o.y }, { id: `${o.id} (gespiegeld)`, x: o.spiegel, y: o.y }]
                  : [{ id: o.id, x: o.x, y: o.y }]
      );
      for (let i = 0; i < punten.length; i += 1) {
        for (let j = i + 1; j < punten.length; j += 1) {
          const d = afstand(punten[i], punten[j]);
          assert.ok(
            d >= MINSTENS,
            `bij ${pakket.slug} staan ${punten[i].id} en ${punten[j].id} maar ${d.toFixed(0)} uit elkaar`
          );
        }
      }
    }
  });

  test('elk pakket heeft iets te laten zien', () => {
    for (const pakket of PACKAGES) {
      assert.ok(schetsVan(pakket.slug).length > 0, `${pakket.slug} levert een lege tekening op`);
    }
  });

  test('de volgorde noemt elk onderdeel precies één keer', () => {
    assert.deepEqual([...VOLGORDE].sort(), [...new Set(VOLGORDE)].sort());
    assert.equal(VOLGORDE.length, ALLES.length);
    for (const o of ALLES) assert.ok(VOLGORDE.includes(o.id), `${o.id} staat niet in de volgorde`);
  });

  /* Alle getallen uit een pad, als paren. */
  const punten = (d) => {
    const getallen = d.replace(/[MLCZ]/g, ' ').split(/[ ,]+/).filter(Boolean).map(Number);
    return getallen.reduce((rij, n, i) => {
      if (i % 2 === 0) rij.push({ x: n, y: getallen[i + 1] });
      return rij;
    }, []);
  };

  test('de paden gebruiken alleen wat gespiegeld kan worden', () => {
    /* Een boog (A) klapt bij het spiegelen de verkeerde kant op. M, L, C en
       Z kunnen wel, en meer hebben we niet nodig. */
    for (const p of AUTO.paden) {
      assert.match(p.d, /^[MLCZ0-9. -]+$/, `pad met klasse ${p.klasse} gebruikt een letter die niet gespiegeld kan worden`);
    }
  });

  test('twee keer spiegelen levert hetzelfde pad op', () => {
    const heen = 'M 331 214 C 318 213 304 211 291 210 Z';
    assert.equal(spiegelPad(spiegelPad(heen)), heen);
  });

  test('de auto staat precies in het midden', () => {
    /* Elk pad hoort een tegenhanger aan de andere kant te hebben. We
       vergelijken de punten en niet de tekst, want een gespiegeld pad loopt
       de andere kant op: dezelfde vorm, andere schrijfwijze.

       Wat overblijft hoort scheef te zijn: het stuur met zijn spaken en de
       tellerbak zitten links, en de ruitenwisser achter en de tankklep zijn
       er maar één. */
    /* Het beginpunt staat in een gesloten pad twee keer; daarom tellen we
       elk punt maar één keer mee. */
    const sleutel = (lijst) => [...new Set(lijst.map((p) => `${p.x},${p.y}`))].sort().join(' ');
    const sleutels = new Set(AUTO.paden.map((p) => sleutel(punten(p.d))));
    const scheef = AUTO.paden.filter((p) => {
      const omgekeerd = punten(p.d).map((q) => ({ x: AUTO.breedte - q.x, y: q.y }));
      return !sleutels.has(sleutel(omgekeerd));
    });
    const mag = new Set(['stuur', 'detail']);
    const fout = scheef.filter((p) => !mag.has(p.klasse));
    assert.equal(fout.length, 0, `deze horen symmetrisch te zijn: ${fout.map((p) => p.klasse).join(', ')}`);
    assert.ok(
      scheef.length <= 8,
      `${scheef.length} paden staan scheef: ${scheef.map((p) => p.klasse).join(', ')}`
    );
  });

  test('de maten op de tekening kloppen met de tekening zelf', () => {
    const omtrek = AUTO.paden.find((p) => p.klasse === 'omtrek');
    const pt = punten(omtrek.d);
    const bijna = (a, b, speling, wat) =>
      assert.ok(Math.abs(a - b) <= speling, `${wat}: ${a} tegenover ${b} in de tekening`);

    bijna(MATEN.lengte.van, Math.min(...pt.map((p) => p.y)), 6, 'de neus');
    bijna(MATEN.lengte.tot, Math.max(...pt.map((p) => p.y)), 6, 'de achterbumper');
    bijna(MATEN.breedte.van, Math.min(...pt.map((p) => p.x)), 2, 'de linkerflank');
    bijna(MATEN.breedte.tot, Math.max(...pt.map((p) => p.x)), 2, 'de rechterflank');

    /* De aslijnen horen door het hart van de wielen te lopen. */
    const wielen = AUTO.paden.filter((p) => p.klasse === 'wiel').map((p) => {
      const y = punten(p.d).map((q) => q.y);
      return (Math.min(...y) + Math.max(...y)) / 2;
    });
    for (const as of [MATEN.wielbasis.van, MATEN.wielbasis.tot]) {
      assert.ok(wielen.some((w) => Math.abs(w - as) <= 1), `geen wiel op as ${as}`);
    }
  });

  test('de referentiecarrosserie levert geen maat voor op de pagina', () => {
    /**
     * WAAROM DEZE TEST VERANDERD IS
     * Hier stond een test op inMeters(), een hulpje dat tekeneenheden naar
     * meters omrekende. Dat hulpje is weg, en dit bewaakt dat het wegblijft.
     *
     * De reden: deze carrosserie is met de hand getekend, niet opgemeten. De
     * omrekening gaf 4,87 m lang bij een wielbasis van 2,63 m, en die auto
     * bestaat niet — de verhouding is 0,54 waar echte auto's tussen 0,58 en
     * 0,61 zitten. Een getal uit zo'n tekening hoort nergens te staan, ook
     * niet met "indicatief" erbij.
     *
     * De maten in MATEN blijven wél bestaan: die zetten de hulplijnen en de
     * wielen op hun plek. Wat niet meer mag, is er meters van maken.
     *
     * Komt er ooit een tekening die uit een opgemeten auto komt, dan mag de
     * omrekening terug — met dat voertuig erbij genoemd. Deze test slaat dan
     * aan en dwingt je die afweging bewust te maken.
     */
    assert.equal(
      SCHETS.inMeters,
      undefined,
      'zolang de carrosserie niet is opgemeten, hoort er geen omrekening naar meters te zijn',
    );
    assert.equal(
      typeof SCHETS.default?.inMeters,
      'undefined',
      'ook niet via de verzamelexport',
    );
  });

  test('de hulplijnen lopen over de hele tekening', () => {
    assert.ok(HULPLIJNEN.hart.includes('M 220 '), 'de hartlijn staat niet op het midden');
    assert.equal(HULPLIJNEN.assen.length, 2, 'er horen twee aslijnen te zijn');
    assert.equal(HULPLIJNEN.kruizen.length, 4, 'er horen vier wielhartten te zijn');
  });

  test('elke dempingszone heeft een vlak en elk onderdeel een uitleg', () => {
    for (const z of ZONES) assert.ok(z.vlakken && z.vlakken.length, `${z.id} heeft geen vlak om op te lichten`);
    for (const o of ALLES) {
      assert.ok(o.naam && o.plek && o.uitleg, `${o.id} mist een naam, plek of uitleg`);
      assert.ok(o.uitleg.length > 80, `de uitleg bij ${o.id} is wel erg kort`);
    }
  });
});
