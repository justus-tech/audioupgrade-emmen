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

  test('toont niets bij iemand die daar rechtstreeks binnenkomt', async () => {
    const p = await open('audio-upgrade/saab-9-3');
    await p.waitForTimeout(400);
    assert.equal(await p.getAttribute('#jouw-auto', 'hidden'), '');
    await p.close();
  });

  test('toont het blok niet op de pagina van een ándere auto', async () => {
    const p = await open('');
    await p.fill('#kenteken-input', '92DJHG');
    await p.click('#kenteken-form button[type=submit]');
    await p.waitForFunction(() => sessionStorage.getItem('aue-auto'), null, { timeout: 5000 });
    await p.goto(paginaUrl('audio-upgrade/volkswagen-golf'));
    await p.waitForTimeout(400);
    assert.equal(await p.getAttribute('#jouw-auto', 'hidden'), '');
    await p.close();
  });

  test('overleeft rommel in de opslag', async () => {
    const p = await open('audio-upgrade/saab-9-3');
    const fouten = [];
    p.on('pageerror', (e) => fouten.push(e.message));
    await p.evaluate(() => sessionStorage.setItem('aue-auto', 'dit is geen json'));
    await p.reload();
    await p.waitForTimeout(400);
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
    pagina.on('console', (m) => { if (m.type() === 'error') fouten.push(m.text()); });
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
