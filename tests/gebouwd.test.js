/**
 * Controle op de site zoals hij écht wordt opgeleverd (de map dist/).
 *
 * Dit vangt wat je in losse bestanden niet ziet: een link naar een pagina die
 * niet gebouwd is, twee pagina's met dezelfde titel, een prijs die op één
 * plek is blijven hangen, of een emoji die er niet hoort te staan.
 *
 * Draait alleen als er gebouwd is. `npm test` doet dat voor je.
 */
import { test, describe, before } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
// Via fileURLToPath, niet via .pathname: op Windows levert dat "/C:/..." op,
// en een spatie in de mapnaam wordt "%20". Beide maken het pad onbruikbaar.
import { fileURLToPath } from 'node:url';
import { MODELS } from '../src/data/models.js';
import { MERKEN_MET_MODELLEN } from '../src/data/merken.js';
import { PACKAGES, SITE } from '../src/data/site.js';

const DIST = fileURLToPath(new URL('../dist/', import.meta.url));
const erIsGebouwd = existsSync(DIST);

/** Alle .html-bestanden in dist/, als webpad ('/upgrades', '/'). */
function allePaginas(map = DIST, uit = []) {
  for (const naam of readdirSync(map)) {
    const pad = join(map, naam);
    if (statSync(pad).isDirectory()) allePaginas(pad, uit);
    else if (naam.endsWith('.html')) uit.push(pad);
  }
  return uit;
}

const webpad = (bestand) => {
  const rel = relative(DIST, bestand).split(sep).join('/').replace(/\.html$/, '');
  return rel === 'index' ? '/' : `/${rel}`;
};

let paginas = [];
let inhoud = new Map();

before(() => {
  if (!erIsGebouwd) return;
  paginas = allePaginas();
  for (const p of paginas) inhoud.set(webpad(p), readFileSync(p, 'utf8'));
});

const alsGebouwd = { skip: erIsGebouwd ? false : 'nog niet gebouwd — draai npm run build' };

describe('opgeleverde pagina\'s', alsGebouwd, () => {
  test('elke modelpagina is gebouwd', () => {
    for (const m of MODELS) {
      assert.ok(inhoud.has(`/audio-upgrade/${m.slug}`), `ontbreekt: ${m.slug}`);
    }
  });

  test('elke merkpagina is gebouwd', () => {
    for (const m of MERKEN_MET_MODELLEN) {
      assert.ok(inhoud.has(`/merk/${m.slug}`), `ontbreekt: ${m.slug}`);
    }
  });

  test('de vaste pagina\'s staan er', () => {
    for (const pad of ['/', '/upgrades', '/werkwijze', '/contact', '/audio-upgrade']) {
      assert.ok(inhoud.has(pad), `ontbreekt: ${pad}`);
    }
  });

  test('geen enkele pagina is verdacht klein', () => {
    for (const [pad, html] of inhoud) {
      assert.ok(html.length > 2000, `${pad} is maar ${html.length} tekens — leeg gerenderd?`);
    }
  });
});

describe('titels en omschrijvingen', alsGebouwd, () => {
  const titelVan = (html) => (html.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '';
  const omschrijvingVan = (html) =>
    (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';

  test('elke pagina heeft een titel en een omschrijving', () => {
    for (const [pad, html] of inhoud) {
      assert.ok(titelVan(html).trim(), `${pad}: geen titel`);
      assert.ok(omschrijvingVan(html).trim(), `${pad}: geen omschrijving`);
    }
  });

  test('geen twee pagina\'s delen dezelfde titel', () => {
    // Dubbele titels laten Google denken dat het dezelfde pagina is.
    const gezien = new Map();
    for (const [pad, html] of inhoud) {
      const t = titelVan(html);
      assert.equal(gezien.has(t), false, `zelfde titel op ${gezien.get(t)} en ${pad}: "${t}"`);
      gezien.set(t, pad);
    }
  });

  test('geen twee pagina\'s delen dezelfde omschrijving', () => {
    const gezien = new Map();
    for (const [pad, html] of inhoud) {
      const d = omschrijvingVan(html);
      assert.equal(gezien.has(d), false, `zelfde omschrijving op ${gezien.get(d)} en ${pad}`);
      gezien.set(d, pad);
    }
  });

  test('elke pagina wijst naar zichzelf als canonical', () => {
    for (const [pad, html] of inhoud) {
      const canonical = (html.match(/<link rel="canonical" href="([^"]*)"/) || [])[1];
      assert.ok(canonical, `${pad}: geen canonical`);
      assert.ok(canonical.startsWith('https://audioupgradeemmen.nl'), `${pad}: ${canonical}`);
    }
  });
});

describe('interne links', alsGebouwd, () => {
  test('elke interne link wijst naar een pagina die bestaat', () => {
    const kapot = [];
    for (const [pad, html] of inhoud) {
      for (const m of html.matchAll(/href="(\/[^"#?]*)"/g)) {
        const doel = m[1].replace(/\/$/, '') || '/';
        // Bestanden in public/ (favicon, afbeeldingen) zijn geen pagina's.
        if (/\.[a-z0-9]{2,5}$/i.test(doel)) continue;
        if (!inhoud.has(doel)) kapot.push(`${pad} → ${doel}`);
      }
    }
    assert.deepEqual([...new Set(kapot)], []);
  });

  test('elk bestand waarnaar gelinkt wordt staat er ook echt', () => {
    const ontbreekt = [];
    for (const [pad, html] of inhoud) {
      for (const m of html.matchAll(/(?:href|src)="(\/[^"#?]*\.[a-z0-9]{2,5})"/gi)) {
        if (!existsSync(join(DIST, m[1]))) ontbreekt.push(`${pad} → ${m[1]}`);
      }
    }
    assert.deepEqual([...new Set(ontbreekt)], []);
  });
});

describe('gestructureerde gegevens voor Google', alsGebouwd, () => {
  test('elk JSON-LD-blok is geldige JSON', () => {
    for (const [pad, html] of inhoud) {
      for (const m of html.matchAll(
        /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g
      )) {
        assert.doesNotThrow(() => JSON.parse(m[1]), `${pad}: JSON-LD is stuk`);
      }
    }
  });

  test('elke pagina beschrijft het bedrijf met het juiste adres', () => {
    for (const [pad, html] of inhoud) {
      assert.ok(html.includes('"@type":"AutoRepair"'), `${pad}: bedrijfsgegevens ontbreken`);
      assert.ok(html.includes(SITE.street), `${pad}: adres ontbreekt`);
    }
  });

  test('elke modelpagina levert zijn drie vragen aan', () => {
    for (const m of MODELS) {
      const html = inhoud.get(`/audio-upgrade/${m.slug}`);
      const blok = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
        .map((x) => JSON.parse(x[1]))
        .find((x) => x['@type'] === 'FAQPage');
      assert.ok(blok, `${m.slug}: geen FAQPage`);
      assert.equal(blok.mainEntity.length, 3, `${m.slug}: verkeerd aantal vragen`);
    }
  });
});

describe('huisregels van Justus', alsGebouwd, () => {
  test('nergens een emoji', () => {
    // Afgesproken: geen emoji op de site. De oude site had chatwolkjes in de
    // knoppen staan.
    //
    // Emoji_Presentation en niet Extended_Pictographic: die tweede rekent ook
    // © en ™ mee, en het copyrightteken in de voettekst is geen emoji.
    const emoji = /\p{Emoji_Presentation}/u;
    const gevonden = [];
    for (const [pad, html] of inhoud) {
      const zichtbaar = html
        .replace(/<script[\s\S]*?<\/script>/g, ' ')
        .replace(/<style[\s\S]*?<\/style>/g, ' ');
      const treffer = zichtbaar.match(emoji);
      if (treffer) gevonden.push(`${pad}: ${treffer[0]}`);
    }
    assert.deepEqual(gevonden, []);
  });

  test('de prijzen staan er precies zoals in site.js', () => {
    const html = inhoud.get('/upgrades');
    for (const p of PACKAGES) {
      // & wordt in HTML als &amp; geschreven; de rest staat er letterlijk.
      assert.ok(html.includes(p.price), `prijs van ${p.slug} staat niet op /upgrades: ${p.price}`);
    }
  });

  test('de contactgegevens staan op elke pagina', () => {
    for (const [pad, html] of inhoud) {
      assert.ok(html.includes(SITE.phoneDisplay), `${pad}: telefoonnummer ontbreekt`);
      assert.ok(html.includes(SITE.email), `${pad}: e-mailadres ontbreekt`);
      assert.ok(html.includes(SITE.kvk), `${pad}: KvK-nummer ontbreekt`);
    }
  });

  test('elke pagina kan wisselen tussen licht en donker', () => {
    for (const [pad, html] of inhoud) {
      assert.ok(html.includes('id="thema-knop"'), `${pad}: geen themaknop`);
      assert.ok(html.includes('aue-thema'), `${pad}: de keuze wordt niet onthouden`);
    }
  });

  test('de kleuren komen uit brand.js en niet uit losse hexcodes', () => {
    // Uitzondering: de kentekenplaat en het logo. Dat zijn nagebootste
    // voorwerpen (geborsteld aluminium), geen vlakken van de site.
    const uitzonderingen = [
      'Kentekenplaat.astro', 'Logo.astro', 'audio-upgrade' + sep + '[slug].astro',
      'brand.js', 'kleuren.js', 'global.css', 'Golfvorm.astro',
    ];
    const bronMap = fileURLToPath(new URL('../src/', import.meta.url));
    const overtreders = [];

    const loop = (map) => {
      for (const naam of readdirSync(map)) {
        const pad = join(map, naam);
        if (statSync(pad).isDirectory()) { loop(pad); continue; }
        if (!/\.(astro|css|js)$/.test(naam)) continue;
        if (uitzonderingen.some((u) => pad.endsWith(u))) continue;
        const tekst = readFileSync(pad, 'utf8');
        for (const m of tekst.matchAll(/#[0-9a-fA-F]{6}\b/g)) {
          overtreders.push(`${relative(bronMap, pad)}: ${m[0]}`);
        }
      }
    };
    loop(bronMap);
    assert.deepEqual(overtreders, [], 'gebruik var(--...) in plaats van een losse kleurcode');
  });
});
