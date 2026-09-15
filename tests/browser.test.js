/**
 * De site in een echte browser, precies zoals een bezoeker hem krijgt.
 *
 * De RDW wordt hier NAGEBOOTST. Dat is met opzet: een test die het internet
 * op moet, faalt vroeg of laat door iets waar wij niets aan kunnen doen. Nu
 * kunnen we bovendien dingen afdwingen die in het echt zeldzaam zijn — een
 * server die plat ligt, een kenteken dat niet bestaat, of een merknaam met
 * kwaadaardige code erin.
 *
 * Draaien:  npm run test:browser   (bouwt zelf, geen server nodig)
 */
import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { createServer } from 'node:http';
import { join, extname } from 'node:path';
import { chromium } from 'playwright';

const DIST = fileURLToPath(new URL('../dist/', import.meta.url));

/**
 * Een piepklein servertje voor de gebouwde site.
 *
 * Waarom niet gewoon file:// gebruiken: de site verwijst naar /_astro/... en
 * /upgrades met een schuine streep vooraan. Onder file:// wijst dat naar de
 * wortel van de harde schijf, dus dan laadt het opmaakbestand niet en werkt
 * geen enkele doorverwijzing. Bovendien weigert de browser modules te laden
 * vanaf een bestandspad. Over http klopt alles wél.
 */
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
};

let server;
let basis = '';

function startServer() {
  return new Promise((klaar) => {
    server = createServer((verzoek, antwoord) => {
      let pad = decodeURIComponent(new URL(verzoek.url, 'http://x').pathname);
      if (pad.endsWith('/')) pad += 'index.html';
      let bestand = join(DIST, pad);
      // De site wordt gebouwd als losse bestanden: /upgrades -> upgrades.html.
      // Let op de mapcontrole: /audio-upgrade bestaat óók als MAP (met de
      // modelpagina's erin). Zonder die controle probeert de server die map
      // te lezen, blijft het verzoek hangen en loopt elke test in een limiet.
      if (!extname(bestand) && (!existsSync(bestand) || statSync(bestand).isDirectory())) {
        bestand += '.html';
      }
      if (!existsSync(bestand) || statSync(bestand).isDirectory()) {
        antwoord.writeHead(404).end('niet gevonden');
        return;
      }
      antwoord.writeHead(200, { 'content-type': TYPES[extname(bestand)] || 'application/octet-stream' });
      antwoord.end(readFileSync(bestand));
    });
    server.listen(0, '127.0.0.1', () => {
      basis = `http://127.0.0.1:${server.address().port}`;
      klaar();
    });
  });
}

const paginaUrl = (pad) => `${basis}/${pad}`;

const RDW_VOERTUIG = 'https://opendata.rdw.nl/resource/m9d7-ebf2.json*';
const RDW_BRANDSTOF = 'https://opendata.rdw.nl/resource/8ys7-d773.json*';

const SAAB = [{
  kenteken: '92DJHG',
  voertuigsoort: 'Personenauto',
  merk: 'SAAB',
  handelsbenaming: 'SAAB 9-3',
  inrichting: 'hatchback',
  eerste_kleur: 'BLAUW',
  datum_eerste_toelating: '19990906',
  aantal_zitplaatsen: '5',
  aantal_deuren: '4',
}];

const ONBEKEND_MERK = [{
  ...SAAB[0],
  merk: 'PROTON',
  handelsbenaming: 'SAVVY',
}];

let browser;
before(async () => {
  if (!existsSync(DIST)) return;
  await startServer();
  browser = await chromium.launch();
});
after(async () => {
  await browser?.close();
  server?.close();
});

/**
 * Opent een pagina met een nagebootste RDW.
 * `voertuig` en `brandstof` mogen ook een status zijn: { status: 500 }.
 */
async function open(pad, { voertuig = SAAB, brandstof = [{ brandstof_omschrijving: 'Benzine' }] } = {}) {
  const pagina = await browser.newPage();
  const antwoord = (data) => (route) =>
    data && data.status
      ? route.fulfill({ status: data.status, body: 'stuk' })
      : route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(data) });

  await pagina.route(RDW_VOERTUIG, antwoord(voertuig));
  await pagina.route(RDW_BRANDSTOF, antwoord(brandstof));
  await pagina.goto(paginaUrl(pad));
  return pagina;
}

const alsGebouwd = { skip: existsSync(DIST) ? false : 'nog niet gebouwd — draai npm run build' };

describe('de kenteken-check op de homepage', alsGebouwd, () => {
  test('een bekend model stuurt door naar zijn eigen pagina', async () => {
    const p = await open('');
    await p.fill('#kenteken-input', '92DJHG');
    await p.click('#kenteken-form button[type=submit]');
    await p.waitForFunction(() => location.href.includes('/audio-upgrade/'), null, { timeout: 5000 });
    assert.match(p.url(), /saab-9-3/);
    await p.close();
  });

  test('een onbekend model stuurt door naar de upgradepagina in plaats van doodlopend', async () => {
    const p = await open('', { voertuig: ONBEKEND_MERK });
    await p.fill('#kenteken-input', '92DJHG');
    await p.click('#kenteken-form button[type=submit]');
    await p.waitForFunction(() => location.href.includes('/upgrades'), null, { timeout: 5000 });
    await p.close();
  });

  test('het kenteken wordt onthouden voor de volgende pagina', async () => {
    const p = await open('');
    await p.fill('#kenteken-input', '92-dj-hg');
    await p.click('#kenteken-form button[type=submit]');
    await p.waitForFunction(() => sessionStorage.getItem('aue-auto'), null, { timeout: 5000 });
    const bewaard = JSON.parse(await p.evaluate(() => sessionStorage.getItem('aue-auto')));
    assert.equal(bewaard.kenteken, '92DJHG', 'streepjes horen eraf te gaan');
    assert.equal(bewaard.slug, 'saab-9-3');
    await p.close();
  });

  test('een te kort kenteken geeft een nette melding en gaat nergens heen', async () => {
    const p = await open('');
    await p.fill('#kenteken-input', '12AB');
    await p.click('#kenteken-form button[type=submit]');
    await p.waitForFunction(() => document.getElementById('kenteken-result').textContent.trim(), null, { timeout: 3000 });
    const melding = await p.textContent('#kenteken-result');
    assert.match(melding, /geldig kenteken/i);
    assert.doesNotMatch(p.url(), /audio-upgrade|upgrades/, 'er is toch doorgestuurd');
    await p.close();
  });

  test('een onbekend kenteken geeft een melding met een uitweg', async () => {
    const p = await open('', { voertuig: [] });
    await p.fill('#kenteken-input', '99XX99');
    await p.click('#kenteken-form button[type=submit]');
    await p.waitForFunction(() => /niet gevonden/i.test(document.getElementById('kenteken-result').textContent), null, { timeout: 5000 });
    assert.ok(await p.$('#kenteken-result a[href*="wa.me"]'), 'geen WhatsApp-uitweg geboden');
    await p.close();
  });

  test('een RDW die plat ligt breekt de pagina niet', async () => {
    const p = await open('', { voertuig: { status: 503 } });
    const fouten = [];
    p.on('pageerror', (e) => fouten.push(e.message));
    await p.fill('#kenteken-input', '92DJHG');
    await p.click('#kenteken-form button[type=submit]');
    await p.waitForFunction(() => /niet bereikbaar|niet gevonden/i.test(document.getElementById('kenteken-result').textContent), null, { timeout: 5000 });
    assert.deepEqual(fouten, [], 'de pagina gooide een fout');
    await p.close();
  });

  test('RDW-tekst wordt nooit als code uitgevoerd', async () => {
    // Wij bepalen niet wat er in de RDW staat. Zou daar ooit iets met een
    // scripttag in staan, dan mag dat nooit in onze pagina belanden.
    const gemeen = [{ ...SAAB[0], merk: 'X<img src=x onerror="window.GEHACKT=1">', handelsbenaming: 'Y' }];
    const p = await open('', { voertuig: gemeen });
    await p.fill('#kenteken-input', '92DJHG');
    await p.click('#kenteken-form button[type=submit]');
    await p.waitForTimeout(600);
    assert.equal(await p.evaluate(() => window.GEHACKT), undefined);
    await p.close();
  });
});

describe('de upgradepagina', alsGebouwd, () => {
  test('toont de auto, het kenteken met streepjes en de inzichten', async () => {
    const p = await open('upgrades');
    await p.fill('#upgrade-kenteken', '92DJHG');
    await p.click('#upgrade-form button[type=submit]');
    await p.waitForSelector('#auto-blok:not([hidden])', { timeout: 5000 });

    assert.equal(await p.textContent('#upgrade-titel'), 'Upgrades voor jouw Saab 9-3');
    assert.equal(await p.textContent('#plaat-tekst'), '92-DJ-HG');
    assert.equal(await p.textContent('#plaat-details'), 'blauw · hatchback · benzine · 1999');

    const koppen = await p.$$eval('#auto-inzichten li strong', (n) => n.map((x) => x.textContent));
    assert.deepEqual(koppen, ['Benzine', '27 jaar oud', 'Hatchback']);
    await p.close();
  });

  test('de kop van een inzicht staat op een eigen regel', async () => {
    // Deze elementen maakt het script aan, dus Astro's scoped CSS pakt er
    // niet op zonder :global(). Ging al twee keer mis: dan lees je
    // "20 jaar oudDe schuimrand rond een speakerconus...".
    const p = await open('upgrades');
    await p.fill('#upgrade-kenteken', '92DJHG');
    await p.click('#upgrade-form button[type=submit]');
    await p.waitForSelector('#auto-blok:not([hidden])', { timeout: 5000 });

    const kop = await p.$('#auto-inzichten li strong');
    assert.equal(await kop.evaluate((e) => getComputedStyle(e).display), 'block');

    // Extra zekerheid: de kop en de tekst mogen elkaar niet raken.
    const raakt = await p.$eval('#auto-inzichten li', (li) => {
      const k = li.querySelector('strong').getBoundingClientRect();
      const t = li.querySelector('span').getBoundingClientRect();
      return t.top < k.bottom;
    });
    assert.equal(raakt, false, 'kop en tekst staan op dezelfde regel');
    await p.close();
  });

  test('een elektrische auto krijgt een ander verhaal', async () => {
    const p = await open('upgrades', {
      voertuig: [{ ...SAAB[0], merk: 'TESLA', handelsbenaming: 'MODEL 3', datum_eerste_toelating: '20220101' }],
      brandstof: [{ brandstof_omschrijving: 'Elektriciteit' }],
    });
    await p.fill('#upgrade-kenteken', '92DJHG');
    await p.click('#upgrade-form button[type=submit]');
    await p.waitForSelector('#auto-blok:not([hidden])', { timeout: 5000 });
    const koppen = await p.$$eval('#auto-inzichten li strong', (n) => n.map((x) => x.textContent));
    assert.equal(koppen[0], 'Volledig elektrisch');
    await p.close();
  });

  test('werkt ook voor een auto zonder eigen modelpagina', async () => {
    const p = await open('upgrades', { voertuig: ONBEKEND_MERK });
    await p.fill('#upgrade-kenteken', '92DJHG');
    await p.click('#upgrade-form button[type=submit]');
    await p.waitForSelector('#auto-blok:not([hidden])', { timeout: 5000 });
    assert.match(await p.textContent('#upgrade-titel'), /Proton Savvy/);
    await p.close();
  });

  test('zonder brandstofgegevens valt alleen dat punt weg', async () => {
    const p = await open('upgrades', { brandstof: { status: 500 } });
    await p.fill('#upgrade-kenteken', '92DJHG');
    await p.click('#upgrade-form button[type=submit]');
    await p.waitForSelector('#auto-blok:not([hidden])', { timeout: 5000 });
    const koppen = await p.$$eval('#auto-inzichten li strong', (n) => n.map((x) => x.textContent));
    assert.deepEqual(koppen, ['27 jaar oud', 'Hatchback']);
    assert.equal(await p.textContent('#plaat-details'), 'blauw · hatchback · 1999');
    await p.close();
  });
});

/**
 * De vier pakketten naast elkaar.
 *
 * Dit is de rij waar de bezoeker zijn keuze maakt, en dat werkt alleen als
 * de vier kaarten regel voor regel op één lijn liggen: alle prijzen op
 * dezelfde hoogte, alle balkjes, alle knoppen. Anders vergelijk je vier
 * bedragen die op vier verschillende plekken staan.
 *
 * Dat wordt geregeld door `subgrid` in global.css, en dat is precies het
 * soort constructie dat je stilletjes kwijtraakt: er komt een regel bij in
 * de kaart, het aantal rijen klopt niet meer, en de uitlijning schuift een
 * beetje. Je ziet het niet in de code en op een klein scherm ook niet.
 * Daarom meten we het hier op de pagina zelf.
 */
describe('de pakketten naast elkaar', alsGebouwd, () => {
  /* De bovenkant van een onderdeel in elke kaart, afgerond op hele pixels. */
  const hoogtes = (p, kies) =>
    p.$$eval(`.grid.vier > .card ${kies}`, (els) =>
      els.map((el) => Math.round(el.getBoundingClientRect().top)));

  test('prijzen, balkjes, doorlooptijd en knoppen liggen op één lijn', async () => {
    const p = await open('upgrades');
    await p.setViewportSize({ width: 1280, height: 900 });

    for (const onderdeel of ['.price', '.scores', '.duur', '.btn']) {
      const rij = await hoogtes(p, onderdeel);
      assert.equal(rij.length, 4, `${onderdeel}: ${rij.length} kaarten in plaats van 4`);
      const verschil = Math.max(...rij) - Math.min(...rij);
      assert.ok(verschil <= 1, `${onderdeel} staat ${verschil}px uit elkaar: ${rij.join(', ')}`);
    }
    await p.close();
  });

  test('de knoppen zijn even hoog en even breed', async () => {
    const p = await open('upgrades');
    await p.setViewportSize({ width: 1280, height: 900 });
    const maten = await p.$$eval('.grid.vier > .card .btn', (els) =>
      els.map((el) => {
        const r = el.getBoundingClientRect();
        return { h: Math.round(r.height), b: Math.round(r.width) };
      }));
    const hoog = new Set(maten.map((m) => m.h));
    const breed = new Set(maten.map((m) => m.b));
    assert.equal(hoog.size, 1, `knophoogtes lopen uiteen: ${[...hoog].join(', ')}`);
    assert.equal(breed.size, 1, `knopbreedtes lopen uiteen: ${[...breed].join(', ')}`);
    await p.close();
  });

  /* De vlag hoort een vlag te zijn. In een raster betekent align-self iets
     anders dan in een flex-kolom, en daardoor liep hij ooit over de volle
     breedte van de kaart — dan leest hij als een balk en niet als een label. */
  test('het label is een vlaggetje en geen balk over de hele kaart', async () => {
    const p = await open('upgrades');
    await p.setViewportSize({ width: 1280, height: 900 });
    const { label, kaart } = await p.$eval('.grid.vier > .card-populair', (el) => ({
      label: el.querySelector('.badge').getBoundingClientRect().width,
      kaart: el.getBoundingClientRect().width,
    }));
    assert.ok(label < kaart * 0.8, `het label is ${Math.round(label)}px van ${Math.round(kaart)}px breed`);
    await p.close();
  });

  /* Eén uitklapper openen trok de andere drie mee omhoog in hoogte, met een
     leeg gat van honderden pixels tot gevolg. Ze bewegen nu samen. */
  test('één uitklapper openen klapt de hele rij open', async () => {
    const p = await open('upgrades');
    await p.setViewportSize({ width: 1280, height: 900 });
    assert.equal(await p.locator('.grid.vier details[open]').count(), 0);

    await p.locator('.grid.vier > .card summary').nth(1).click();
    await p.waitForFunction(() => document.querySelectorAll('.grid.vier details[open]').length === 4);

    await p.locator('.grid.vier > .card summary').nth(1).click();
    await p.waitForFunction(() => document.querySelectorAll('.grid.vier details[open]').length === 0);
    await p.close();
  });

  test('ook opengeklapt staan de knoppen nog op één lijn', async () => {
    const p = await open('upgrades');
    await p.setViewportSize({ width: 1280, height: 900 });
    await p.locator('.grid.vier > .card summary').first().click();
    await p.waitForFunction(() => document.querySelectorAll('.grid.vier details[open]').length === 4);

    const rij = await hoogtes(p, '.btn');
    assert.ok(Math.max(...rij) - Math.min(...rij) <= 1, `knoppen staan uit elkaar: ${rij.join(', ')}`);
    await p.close();
  });

  /* Op een telefoon staan de kaarten onder elkaar. De lege plekken die de
     rijen openhouden mogen daar niet als gaten opduiken. */
  test('op een telefoon staan er geen lege plekken in de kaart', async () => {
    const p = await open('upgrades');
    await p.setViewportSize({ width: 390, height: 844 });
    const zichtbaar = await p.$$eval('.grid.vier > .card .plek', (els) =>
      els.filter((el) => el.getBoundingClientRect().height > 0).length);
    assert.equal(zichtbaar, 0, `${zichtbaar} lege plekken nemen ruimte in op een telefoon`);
    await p.close();
  });
});

describe('de modelpagina', alsGebouwd, () => {
  test('toont het kenteken van de bezoeker als bevestiging', async () => {
    const p = await open('');
    await p.fill('#kenteken-input', '92DJHG');
    await p.click('#kenteken-form button[type=submit]');
    await p.waitForFunction(() => sessionStorage.getItem('aue-auto'), null, { timeout: 5000 });
    await p.goto(paginaUrl('audio-upgrade/saab-9-3'));
    await p.waitForSelector('#jouw-auto:not([hidden])', { timeout: 3000 });
    assert.equal(await p.textContent('#jouw-plaat'), '92-DJ-HG');
    await p.close();
  });

  /**
   * "Het blok blijft verborgen" kun je niet afwachten — er gebeurt juist
   * niets. Daarom wacht dit op het vlaggetje dat het script achterlaat als
   * het klaar is met beslissen. Stond hier eerst een vaste wachttijd van 400
   * milliseconden, en die viel om zodra de laptop het druk had.
   */
  const wachtTotBeslist = (p) =>
    p.waitForFunction(
      () => document.getElementById('jouw-auto')?.dataset.klaar === 'ja',
      null,
      { timeout: 5000 }
    );

  test('zet het kenteken van de bezoeker in de WhatsApp-knoppen', async () => {
    /**
     * Dit is het hele punt van de kenteken-check voor Justus: hij krijgt geen
     * "ik heb een Saab" maar "ik heb een Saab 9-3 uit 1999 (92-DJ-HG)", en
     * weet meteen om welke auto het gaat. De server kan dat niet meesturen —
     * die weet het kenteken niet — dus dit gebeurt in de browser, en alleen
     * hier valt te zien of het echt werkt.
     */
    const p = await open('');
    await p.fill('#kenteken-input', '92DJHG');
    await p.click('#kenteken-form button[type=submit]');
    await p.waitForFunction(() => sessionStorage.getItem('aue-auto'), null, { timeout: 5000 });
    await p.goto(paginaUrl('audio-upgrade/saab-9-3'));
    await p.waitForSelector('#jouw-auto:not([hidden])', { timeout: 3000 });

    const teksten = await p.$$eval('a.wa-link', (links) =>
      links.map((a) => new URL(a.href).searchParams.get('text'))
    );
    assert.ok(teksten.length > 0, 'geen enkele WhatsApp-knop op de modelpagina');
    for (const t of teksten) {
      assert.match(t, /92-DJ-HG/, `kenteken ontbreekt in: ${t}`);
      assert.match(t, /Saab 9-3/, `auto ontbreekt in: ${t}`);
    }
    await p.close();
  });

  test('toont niets bij iemand die daar rechtstreeks binnenkomt', async () => {
    const p = await open('audio-upgrade/saab-9-3');
    await wachtTotBeslist(p);
    assert.equal(await p.getAttribute('#jouw-auto', 'hidden'), '');
    await p.close();
  });

  test('toont het blok niet op de pagina van een ándere auto', async () => {
    const p = await open('');
    await p.fill('#kenteken-input', '92DJHG');
    await p.click('#kenteken-form button[type=submit]');
    await p.waitForFunction(() => sessionStorage.getItem('aue-auto'), null, { timeout: 5000 });
    await p.goto(paginaUrl('audio-upgrade/volkswagen-golf'));
    await wachtTotBeslist(p);
    assert.equal(await p.getAttribute('#jouw-auto', 'hidden'), '');
    await p.close();
  });

  test('overleeft rommel in de opslag', async () => {
    const p = await open('audio-upgrade/saab-9-3');
    const fouten = [];
    p.on('pageerror', (e) => fouten.push(e.message));
    await p.evaluate(() => sessionStorage.setItem('aue-auto', 'dit is geen json'));
    await p.reload();
    await wachtTotBeslist(p);
    assert.deepEqual(fouten, []);
    await p.close();
  });
});

describe('de modelzoeker', alsGebouwd, () => {
  /** Zet een zoekopdracht en geef terug wat er overblijft. */
  async function zoek(p, vraag) {
    await p.fill('#kiezer-invoer', vraag);
    await p.waitForTimeout(120);
    return {
      merken: await p.$$eval('#kiezer-lijst .merk:not([hidden])', (n) => n.map((x) => x.dataset.merk)),
      modellen: await p.$$eval('#kiezer-lijst li[data-model]:not([hidden])', (n) => n.map((x) => x.dataset.model)),
      telling: (await p.textContent('#kiezer-telling')).trim(),
    };
  }

  test('zoeken op model laat alleen dat model zien', async () => {
    const p = await open('audio-upgrade');
    const uit = await zoek(p, 'golf');
    assert.deepEqual(uit.merken, ['Volkswagen']);
    assert.deepEqual(uit.modellen, ['Golf']);
    assert.equal(uit.telling, '1 model gevonden');
    await p.close();
  });

  test('zoeken op merk laat alle modellen van dat merk zien', async () => {
    const p = await open('audio-upgrade');
    const uit = await zoek(p, 'saab');
    assert.deepEqual(uit.merken, ['Saab']);
    assert.ok(uit.modellen.length >= 1);
    await p.close();
  });

  test('accenten hoef je niet te typen', async () => {
    // Niemand typt Š. "skoda" moet Škoda vinden.
    const p = await open('audio-upgrade');
    assert.deepEqual((await zoek(p, 'skoda')).merken, ['Škoda']);
    assert.deepEqual((await zoek(p, 'citroen')).merken, ['Citroën']);
    await p.close();
  });

  test('geen treffer geeft een nette melding', async () => {
    const p = await open('audio-upgrade');
    const uit = await zoek(p, 'zeppelin');
    assert.deepEqual(uit.merken, []);
    assert.equal(await p.isVisible('#kiezer-leeg'), true);
    await p.close();
  });

  test('leegmaken zet alles terug en klapt alles dicht', async () => {
    const p = await open('audio-upgrade');
    await zoek(p, 'golf');
    const uit = await zoek(p, '');
    assert.ok(uit.merken.length >= 25, `maar ${uit.merken.length} merken terug`);
    assert.equal(uit.modellen.length, 150);
    const open_ = await p.$$eval('#kiezer-lijst .merk[open]', (n) => n.length);
    assert.equal(open_, 0);
    await p.close();
  });

  test('een merk aantikken klapt zijn modellen uit', async () => {
    // Geen hover: op een telefoon bestaat dat niet. Eén tik moet genoeg zijn.
    const p = await open('audio-upgrade');
    await p.click('#kiezer-lijst .merk:first-of-type summary');
    assert.equal(await p.$eval('#kiezer-lijst .merk:first-of-type', (e) => e.open), true);
    await p.close();
  });

  test('elke modellink wijst naar een bestaande pagina', async () => {
    const p = await open('audio-upgrade');
    const links = await p.$$eval('#kiezer-lijst a', (n) => n.map((a) => a.getAttribute('href')));
    assert.ok(links.length > 150);
    for (const href of links) {
      assert.match(href, /^\/(audio-upgrade|merk)\/[a-z0-9-]+$/, `raar adres: ${href}`);
    }
    await p.close();
  });

  test('werkt ook zonder JavaScript', async () => {
    // Dan is er geen zoekveld, maar de merken klappen nog gewoon uit.
    const context = await browser.newContext({ javaScriptEnabled: false });
    const p = await context.newPage();
    await p.goto(paginaUrl('audio-upgrade'));
    assert.equal(await p.isVisible('#kiezer-zoek'), false, 'zoekveld hoort verborgen te zijn');
    assert.ok(await p.$$eval('#kiezer-lijst .merk', (n) => n.length > 20));
    await context.close();
  });
});

describe('de contactpagina', alsGebouwd, () => {
  test('de drie knoppen staan op exact dezelfde hoogte', async () => {
    // Ze staan naast elkaar, dus een knop die een regel hoger hangt omdat
    // zijn tekst korter is, valt meteen op.
    const p = await open('contact');
    await p.setViewportSize({ width: 1280, height: 900 });
    await p.evaluate(() => document.fonts.ready);

    /**
     * Meten binnen de kaart, niet op het scherm.
     *
     * De kaarten komen bij het scrollen omhoog geschoven in beeld, met 70
     * milliseconden verschil per kaart (zie [data-reveal] in global.css).
     * Meet je de knoppen ten opzichte van het scherm, dan sta je middenin die
     * beweging drie verschillende waarden te vergelijken en valt de test
     * willekeurig om. Het gaat er niet om waar de knop op het scherm staat,
     * maar of hij in elke kaart even ver van de bovenkant zit — en dat is
     * hetzelfde antwoord, of de kaart nu al op zijn plek staat of niet.
     */
    const afstanden = await p.$$eval('.contact-kaart', (kaarten) =>
      kaarten.map((kaart) => {
        const knop = kaart.querySelector('.btn');
        return Math.round(
          knop.getBoundingClientRect().top - kaart.getBoundingClientRect().top
        );
      })
    );
    assert.equal(afstanden.length, 3);
    assert.equal(
      new Set(afstanden).size,
      1,
      `knoppen staan op ${afstanden.join(', ')} vanaf de bovenkant van hun kaart`
    );
    await p.close();
  });
});

/**
 * De herkomstmarkering: ?bron=google zet "(via google)" achter het
 * voorgetypte WhatsApp-bericht, zodat Justus in zijn eigen WhatsApp ziet welk
 * gesprek uit een advertentie komt. Geen cookie, geen tag, geen toestemming.
 *
 * De laatste twee gevallen zijn het belangrijkst: wat er uit de adresbalk komt
 * mag nooit zomaar in het bericht van een bezoeker belanden. Anders stuurt
 * iemand een link rond waarmee er onzin in andermans WhatsApp verschijnt.
 */
describe('herkomst uit de adresbalk', alsGebouwd, () => {
  const eersteBericht = (p) =>
    p.$$eval('a[href*="wa.me"]', (as) => new URL(as[0].href).searchParams.get('text'));

  test('zonder bron blijft het bericht ongewijzigd', async () => {
    const p = await open('upgrades');
    assert.doesNotMatch(await eersteBericht(p), /\(via /);
    await p.close();
  });

  test('met een bron komt die achter het bericht te staan', async () => {
    const p = await browser.newPage();
    await p.goto(`${paginaUrl('upgrades')}?bron=google`);
    await p.waitForFunction(() =>
      document.querySelector('a[href*="wa.me"]')?.href.includes('via')
    , null, { timeout: 5000 });
    assert.match(await eersteBericht(p), /\(via google\)$/);
    await p.close();
  });

  for (const [wat, waarde] of [
    ['een script', '<script>alert(1)</script>'],
    ['een lange lap tekst', 'a'.repeat(40)],
    ['een spatie met tekst', 'bel nu 0900'],
  ]) {
    test(`${wat} in de adresbalk wordt genegeerd`, async () => {
      const p = await browser.newPage();
      await p.goto(`${paginaUrl('upgrades')}?bron=${encodeURIComponent(waarde)}`);
      await p.waitForTimeout(400);
      assert.doesNotMatch(await eersteBericht(p), /\(via /);
      await p.close();
    });
  }
});

describe('licht en donker', alsGebouwd, () => {
  test('volgt standaard de instelling van het apparaat', async () => {
    for (const stand of ['light', 'dark']) {
      const pagina = await browser.newPage({ colorScheme: stand });
      await pagina.goto(paginaUrl(''));
      const bg = await pagina.evaluate(() => getComputedStyle(document.body).backgroundColor);
      assert.equal(bg, stand === 'light' ? 'rgb(245, 245, 245)' : 'rgb(18, 18, 18)', `stand ${stand}`);
      await pagina.close();
    }
  });

  test('de knop wint van de instelling van het apparaat, in beide richtingen', async () => {
    for (const stand of ['light', 'dark']) {
      const pagina = await browser.newPage({ colorScheme: stand });
      await pagina.goto(paginaUrl(''));
      await pagina.click('#thema-knop');
      const bg = await pagina.evaluate(() => getComputedStyle(document.body).backgroundColor);
      assert.equal(bg, stand === 'light' ? 'rgb(18, 18, 18)' : 'rgb(245, 245, 245)', `stand ${stand}`);
      await pagina.close();
    }
  });

  test('de keuze blijft staan op de volgende pagina', async () => {
    const pagina = await browser.newPage({ colorScheme: 'dark' });
    await pagina.goto(paginaUrl(''));
    await pagina.click('#thema-knop');
    await pagina.goto(paginaUrl('upgrades'));
    const bg = await pagina.evaluate(() => getComputedStyle(document.body).backgroundColor);
    assert.equal(bg, 'rgb(245, 245, 245)');
    await pagina.close();
  });
});

describe('op een telefoon', alsGebouwd, () => {
  const telefoon = { viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true };

  test('niets loopt over de zijkant heen — ook niet op 320 pixels', async () => {
    for (const breedte of [320, 390]) {
      const pagina = await browser.newPage({ ...telefoon, viewport: { width: breedte, height: 844 } });
      for (const pad of ['', 'upgrades', 'audio-upgrade/saab-9-3', 'contact']) {
        await pagina.goto(paginaUrl(pad));
        // Wachten tot de letters er zijn: zolang de terugvalletter nog in
        // gebruik is, meet je een andere breedte dan de bezoeker uiteindelijk
        // ziet. Zonder dit slaat deze test af en toe zomaar aan.
        await pagina.evaluate(() => document.fonts.ready);
        const overloop = await pagina.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth
        );
        assert.ok(overloop <= 1, `${pad} op ${breedte}px loopt ${overloop}px over`);
      }
      await pagina.close();
    }
  });

  test('elke pagina laadt zonder fouten in de console', async () => {
    const pagina = await browser.newPage(telefoon);
    const fouten = [];
    pagina.on('pageerror', (e) => fouten.push(e.message));
    // De melding van de browser is "Failed to load resource" zonder te zeggen
    // wát er misging. Daarom hier het adres erbij: anders zoek je je scheel.
    pagina.on('response', (r) => {
      if (r.status() >= 400) fouten.push(`${r.status()} op ${r.url()}`);
    });
    pagina.on('requestfailed', (r) => {
      fouten.push(`mislukt: ${r.url()} (${r.failure()?.errorText})`);
    });
    pagina.on('console', (m) => {
      // De kale "Failed to load resource" laten we weg: het adres staat al
      // in de regel die de response-melding hierboven toevoegt.
      if (m.type() === 'error' && !m.text().startsWith('Failed to load resource')) {
        fouten.push(m.text());
      }
    });
    for (const pad of ['', 'upgrades', 'werkwijze', 'contact', 'merk/saab']) {
      await pagina.goto(paginaUrl(pad));
      await pagina.waitForTimeout(200);
    }
    assert.deepEqual(fouten, []);
    await pagina.close();
  });

  test('de belangrijkste knoppen zijn groot genoeg voor een duim', async () => {
    const pagina = await browser.newPage(telefoon);
    await pagina.goto(paginaUrl(''));
    const teKlein = await pagina.$$eval('.btn, .thema-knop, button', (knoppen) =>
      knoppen
        .map((k) => ({ tekst: (k.textContent || k.getAttribute('aria-label') || '').trim().slice(0, 30), h: k.getBoundingClientRect().height }))
        .filter((k) => k.h > 0 && k.h < 32)
    );
    assert.deepEqual(teKlein, []);
    await pagina.close();
  });
});

/**
 * DE WERKBAK — de offerte-app van Justus zelf.
 *
 * Dit is de enige pagina van dit project waar de gebruiker geen bezoeker is
 * maar Justus, met olie aan zijn handen, op zijn telefoon, naast de auto.
 * Het hele nut van deze app is dat een offerte in een paar tikken klaar is;
 * gaat er onderweg iets stuk, dan pakt hij Word er weer bij en zijn we terug
 * bij af. Daarom loopt deze test de hele route af: kenteken, klant,
 * onderdelen, pdf.
 */
describe('de werkbak', alsGebouwd, () => {
  const telefoon = { viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true };

  /** De werkbak opent met een nagebootste RDW, net als de rest hierboven. */
  async function openWerkbak() {
    const pagina = await browser.newPage(telefoon);
    const fouten = [];
    pagina.on('pageerror', (e) => fouten.push(e.message));
    pagina.on('console', (m) => {
      if (m.type() === 'error' && !m.text().startsWith('Failed to load resource')) {
        fouten.push(m.text());
      }
    });
    await pagina.route(RDW_VOERTUIG, (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(SAAB),
      })
    );
    await pagina.goto(paginaUrl('werkbak'));
    await pagina.evaluate(() => document.fonts.ready);
    return { pagina, fouten };
  }

  /** Zet één onderdeel in de catalogus, zoals Justus dat één keer doet. */
  async function vulCatalogus(pagina, { inkoop = '240,00', marge = '60', uren = '3' } = {}) {
    await pagina.click('[data-tab="catalogus"]');
    await pagina.fill('#wb-o-naam', 'Premium 2-weg composet voor');
    await pagina.selectOption('#wb-o-soort', 'speakers-voor');
    await pagina.fill('#wb-o-inkoop', inkoop);
    await pagina.fill('#wb-o-marge', marge);
    await pagina.fill('#wb-o-uren', uren);
    await pagina.click('#wb-o-bewaar');
    await pagina.click('[data-tab="offerte"]');
  }

  test('het kenteken haalt de auto op bij de RDW', async () => {
    const { pagina, fouten } = await openWerkbak();
    await pagina.fill('#wb-kenteken', '92DJHG');
    await pagina.click('#wb-kenteken-form button[type=submit]');
    await pagina.waitForFunction(() =>
      document.querySelector('#wb-auto-melding').textContent.includes('Gevonden')
    );
    // De RDW schrijft alles in hoofdletters; op een offerte hoort dat niet.
    assert.equal(await pagina.inputValue('#wb-merk'), 'Saab');
    assert.equal(await pagina.inputValue('#wb-bouwjaar'), '1999');
    assert.deepEqual(fouten, []);
    await pagina.close();
  });

  test('een onbekend kenteken laat je het met de hand invullen', async () => {
    // Doodlopende weg voorkomen: een oldtimer of een import staat soms niet
    // in de open gegevens van de RDW, en dan moet de offerte gewoon door.
    const pagina = await browser.newPage(telefoon);
    await pagina.route(RDW_VOERTUIG, (route) =>
      route.fulfill({ status: 200, contentType: 'application/json', body: '[]' })
    );
    await pagina.goto(paginaUrl('werkbak'));
    await pagina.fill('#wb-kenteken', '99ZZ99');
    await pagina.click('#wb-kenteken-form button[type=submit]');
    await pagina.waitForFunction(() =>
      document.querySelector('#wb-auto-melding').textContent.includes('hand')
    );
    assert.equal(await pagina.isVisible('#wb-merk'), true, 'de velden blijven verborgen');
    await pagina.close();
  });

  test('een pakket van de site komt er voor de juiste prijs op', async () => {
    const { pagina } = await openWerkbak();
    await pagina.click('#wb-pakketten .wb-toevoeg >> nth=0');
    // De site belooft € 695,00 inclusief btw voor het CarPlay-pakket. Rekent
    // de app daar btw overheen, dan staat er ineens € 840 op de offerte.
    assert.equal(await pagina.textContent('#wb-totaal'), '€ 695,00');
    await pagina.close();
  });

  test('een eigen onderdeel rekent inkoop, marge en montage bij elkaar op', async () => {
    const { pagina, fouten } = await openWerkbak();
    await vulCatalogus(pagina);
    await pagina.click('#wb-onderdelen .wb-toevoeg >> nth=0');
    // 240 + 60% = 384, plus 3 uur à 75 = 225. Samen 609 excl, 736,89 incl.
    assert.equal(await pagina.textContent('#wb-totaal'), '€ 736,89');
    assert.deepEqual(fouten, []);
    await pagina.close();
  });

  test('de schakelaar zakelijk haalt de btw uit de bedragen', async () => {
    const { pagina } = await openWerkbak();
    await pagina.click('#wb-pakketten .wb-toevoeg >> nth=0');
    await pagina.click('[data-klant="zakelijk"]');
    assert.equal(await pagina.textContent('#wb-totaal'), '€ 574,38');
    // En het bedrijfsnaamveld hoort er dan bij te staan.
    assert.equal(await pagina.isVisible('#wb-bedrijf'), true);
    await pagina.close();
  });

  test('het marge-overzicht waarschuwt als er geen inkoopprijs staat', async () => {
    // Zonder die waarschuwing lijkt een pakket volledig winst en gaat Justus
    // varen op een percentage dat niet klopt.
    const { pagina } = await openWerkbak();
    await pagina.click('#wb-pakketten .wb-toevoeg >> nth=0');
    assert.match(await pagina.textContent('#wb-marge'), /nog geen inkoopprijs/);
    await pagina.close();
  });

  test('de catalogus blijft staan als je de app opnieuw opent', async () => {
    // Anders zou hij zijn hele prijslijst elke ochtend opnieuw moeten typen.
    const { pagina } = await openWerkbak();
    await vulCatalogus(pagina);
    await pagina.reload();
    await pagina.waitForSelector('#wb-onderdelen .wb-toevoeg');
    const knoppen = await pagina.$$('#wb-onderdelen .wb-toevoeg');
    assert.equal(knoppen.length, 1);
    await pagina.close();
  });

  test('de knop levert een pdf op met de naam van de offerte erin', async () => {
    const { pagina, fouten } = await openWerkbak();
    await pagina.fill('#wb-kenteken', '92DJHG');
    await pagina.click('#wb-kenteken-form button[type=submit]');
    await pagina.waitForFunction(() =>
      document.querySelector('#wb-auto-melding').textContent.includes('Gevonden')
    );
    await pagina.fill('#wb-naam', 'Mark de Vries');
    await pagina.click('#wb-pakketten .wb-toevoeg >> nth=0');

    const wachten = pagina.waitForEvent('download');
    await pagina.click('#wb-pdf');
    const bestand = await wachten;
    assert.match(bestand.suggestedFilename(), /^offerte-\d{4}-\d{3}-92DJHG\.pdf$/);
    assert.deepEqual(fouten, []);
    await pagina.close();
  });

  test('een lege offerte levert geen pdf op maar een melding', async () => {
    const { pagina } = await openWerkbak();
    let gemeld = '';
    pagina.on('dialog', (venster) => {
      gemeld = venster.message();
      venster.dismiss();
    });
    await pagina.click('#wb-pdf');
    await pagina.waitForTimeout(200);
    assert.match(gemeld, /eerst iets/);
    await pagina.close();
  });

  test('niets loopt over de zijkant heen, ook niet op 320 pixels', async () => {
    for (const breedte of [320, 390]) {
      const pagina = await browser.newPage({ ...telefoon, viewport: { width: breedte, height: 844 } });
      await pagina.goto(paginaUrl('werkbak'));
      await pagina.evaluate(() => document.fonts.ready);
      // Ook mét regels erop: dan staan de langste teksten pas op het scherm.
      await pagina.click('#wb-pakketten .wb-toevoeg >> nth=0');
      await pagina.click('#wb-eigen-regel');
      const overloop = await pagina.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth
      );
      assert.equal(overloop, 0, `bij ${breedte} pixels steekt er iets uit`);
      await pagina.close();
    }
  });

  test('alles waar je op tikt is groot genoeg voor een duim', async () => {
    const pagina = await browser.newPage(telefoon);
    await pagina.goto(paginaUrl('werkbak'));
    await pagina.click('#wb-pakketten .wb-toevoeg >> nth=0');
    const teKlein = await pagina.$$eval('button, input, select, textarea', (elementen) =>
      elementen
        .map((e) => ({
          wat: (e.textContent || e.getAttribute('aria-label') || e.id || '').trim().slice(0, 30),
          h: e.getBoundingClientRect().height,
        }))
        .filter((e) => e.h > 0 && e.h < 38)
    );
    assert.deepEqual(teKlein, []);
    await pagina.close();
  });
});

/**
 * DE WERKBON EN HET AUTODOSSIER.
 *
 * Hier draait het om wat er in de werkplaats gebeurt: klopt elk kabeltje, en
 * staat er op de bon wat er over deze auto is vastgelegd. Twee dingen mogen
 * hier nooit misgaan — een prijs op de werkbon, en een verzonnen speakermaat.
 */
describe('de werkbon en het autodossier', alsGebouwd, () => {
  const telefoon = { viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true };

  const GOLF = [{
    kenteken: 'XX99XX',
    voertuigsoort: 'Personenauto',
    merk: 'VOLKSWAGEN',
    handelsbenaming: 'GOLF VII 1.4 TSI',
    eerste_kleur: 'ZWART',
    datum_eerste_toelating: '20180417',
  }];

  async function openWerkbak(voertuig = GOLF) {
    const pagina = await browser.newPage(telefoon);
    const fouten = [];
    pagina.on('pageerror', (e) => fouten.push(e.message));
    await pagina.route(RDW_VOERTUIG, (route) =>
      route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(voertuig) })
    );
    await pagina.goto(paginaUrl('werkbak'));
    await pagina.evaluate(() => document.fonts.ready);
    return { pagina, fouten };
  }

  /** Een composet met de ringen en kabels die erbij horen. */
  async function vulOnderdeelMetKabels(pagina) {
    await pagina.click('[data-tab="catalogus"]');
    await pagina.fill('#wb-o-naam', 'Premium 2-weg composet voor');
    await pagina.selectOption('#wb-o-soort', 'speakers-voor');
    await pagina.fill('#wb-o-artikelnummer', 'GL-165-2W');
    await pagina.fill('#wb-o-leverancier', 'Gladen');
    await pagina.fill('#wb-o-inkoop', '240,00');
    await pagina.fill('#wb-o-marge', '60');
    await pagina.fill('#wb-o-uren', '3');
    await pagina.click('#wb-o-toebehoren-erbij');
    const rij = pagina.locator('.wb-toebehoren').last();
    await rij.locator('.wb-t-naam').fill('Adapterringen VW 165 mm');
    await rij.locator('.wb-t-artikel').fill('ACV-271120-05');
    await rij.locator('.wb-t-leverancier').fill('ACV');
    await rij.locator('.wb-t-aantal').fill('2');
    await rij.locator('.wb-t-inkoop').fill('14,50');
    await rij.locator('.wb-t-inkoop').blur();
    await pagina.click('#wb-o-bewaar');
    await pagina.click('[data-tab="offerte"]');
  }

  test('de kabels tellen mee in de prijs die de klant betaalt', async () => {
    const { pagina, fouten } = await openWerkbak();
    await vulOnderdeelMetKabels(pagina);
    await pagina.click('#wb-onderdelen .wb-toevoeg >> nth=0');
    // 240 + 2x 14,50 = 269 inkoop, +60% = 430,40, plus 3 uur à 75 = 225.
    // Samen 655,40 excl, 793,03 incl. Zonder de ringen zou het 736,89 zijn:
    // die 56 euro liep je elke klus mis.
    assert.equal(await pagina.textContent('#wb-totaal'), '€ 793,03');
    assert.deepEqual(fouten, []);
    await pagina.close();
  });

  test('de app zegt het als er over deze auto nog niets vastligt', async () => {
    const { pagina } = await openWerkbak();
    await pagina.fill('#wb-kenteken', 'XX99XX');
    await pagina.click('#wb-kenteken-form button[type=submit]');
    await pagina.waitForFunction(() =>
      document.querySelector('#wb-auto-melding').textContent.includes('Gevonden')
    );
    assert.match(await pagina.textContent('#wb-dossier-melding'), /nog niets vastgelegd/);
    await pagina.close();
  });

  test('de RDW-naam wordt netjes geschreven, met de Romeinse cijfers heel', async () => {
    // "GOLF VII 1.4 TSI" mag geen "Golf Vii 1.4 Tsi" worden: dat staat zo op
    // de offerte van de klant.
    const { pagina } = await openWerkbak();
    await pagina.fill('#wb-kenteken', 'XX99XX');
    await pagina.click('#wb-kenteken-form button[type=submit]');
    await pagina.waitForFunction(() =>
      document.querySelector('#wb-auto-melding').textContent.includes('Gevonden')
    );
    assert.equal(await pagina.inputValue('#wb-model'), 'Golf VII 1.4 TSI');
    await pagina.close();
  });

  test('een model vastleggen doe je vanaf de offerte, en het blijft staan', async () => {
    const { pagina, fouten } = await openWerkbak();
    await pagina.fill('#wb-kenteken', 'XX99XX');
    await pagina.click('#wb-kenteken-form button[type=submit]');
    await pagina.waitForFunction(() =>
      document.querySelector('#wb-auto-melding').textContent.includes('Gevonden')
    );
    await pagina.click('#wb-dossier-melding .wb-link');
    await pagina.waitForTimeout(150);

    // Het dossier hoort op de modelnaam te staan, niet op de uitvoering: de
    // speakermaat van een 1.4 TSI is dezelfde als die van een 2.0 TDI.
    assert.equal(await pagina.inputValue('#wb-a-naam'), 'Volkswagen Golf');
    // En de bouwjaren blijven leeg: 2018 is deze auto, niet de generatie.
    assert.equal(await pagina.inputValue('#wb-a-van'), '');

    await pagina.fill('[data-dossier="speakerVoor"]', '165 mm (6,5")');
    await pagina.fill('[data-dossier="radio"]', 'Composition Media');
    await pagina.fill('[data-dossier="stekker"]', 'Quadlock');
    await pagina.click('#wb-a-bewaar');
    await pagina.click('[data-tab="offerte"]');
    await pagina.waitForTimeout(150);
    assert.match(await pagina.textContent('#wb-dossier-melding'), /Vastgelegd: Volkswagen Golf/);

    // Na opnieuw openen staat het er nog.
    await pagina.reload();
    await pagina.waitForSelector('#wb-a-lijst', { state: 'attached' });
    await pagina.click('[data-tab="autos"]');
    assert.match(await pagina.textContent('#wb-a-lijst'), /Volkswagen Golf/);
    assert.deepEqual(fouten, []);
    await pagina.close();
  });

  test('de werkbon komt eruit met de auto in de bestandsnaam', async () => {
    const { pagina, fouten } = await openWerkbak();
    await vulOnderdeelMetKabels(pagina);
    await pagina.fill('#wb-kenteken', 'XX99XX');
    await pagina.click('#wb-kenteken-form button[type=submit]');
    await pagina.waitForFunction(() =>
      document.querySelector('#wb-auto-melding').textContent.includes('Gevonden')
    );
    await pagina.click('#wb-onderdelen .wb-toevoeg >> nth=0');

    const wachten = pagina.waitForEvent('download');
    await pagina.click('#wb-werkbon');
    const bestand = await wachten;
    assert.match(bestand.suggestedFilename(), /^werkbon-\d{4}-\d{3}-XX99XX\.pdf$/);
    assert.deepEqual(fouten, []);
    await pagina.close();
  });

  test('een lege offerte levert geen werkbon op', async () => {
    const { pagina } = await openWerkbak();
    let gemeld = '';
    pagina.on('dialog', (venster) => { gemeld = venster.message(); venster.dismiss(); });
    await pagina.click('#wb-werkbon');
    await pagina.waitForTimeout(200);
    assert.match(gemeld, /eerst iets/);
    await pagina.close();
  });

  test('het tabblad Auto\'s past ook op een smal scherm', async () => {
    for (const breedte of [320, 390]) {
      const pagina = await browser.newPage({ ...telefoon, viewport: { width: breedte, height: 844 } });
      await pagina.goto(paginaUrl('werkbak'));
      await pagina.evaluate(() => document.fonts.ready);
      for (const tab of ['autos', 'catalogus']) {
        await pagina.click(`[data-tab="${tab}"]`);
        if (tab === 'catalogus') await pagina.click('#wb-o-toebehoren-erbij');
        const overloop = await pagina.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth
        );
        assert.equal(overloop, 0, `${tab} bij ${breedte} pixels: er steekt iets uit`);
      }
      await pagina.close();
    }
  });
});
