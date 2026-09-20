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

/**
 * Een datum een aantal dagen vanaf vandaag, als YYYY-MM-DD.
 *
 * Bewust niet via toISOString(): dat geeft de datum in Greenwich, en die loopt
 * hier tussen middernacht en twee uur 's nachts een dag achter. Een test die
 * "morgen" invulde kreeg dan vandaag, en viel om — maar alleen als je hem 's
 * nachts draaide. Dat is het soort test dat je een ochtend kost.
 */
const overDagen = (n) => {
  const d = new Date();
  d.setDate(d.getDate() + n);
  const twee = (x) => String(x).padStart(2, '0');
  return `${d.getFullYear()}-${twee(d.getMonth() + 1)}-${twee(d.getDate())}`;
};

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
  /* De kaarten komen bij het scrollen omhoog in beeld, en niet alle vier
     tegelijk: er zit 70 ms tussen. Wie tijdens die animatie meet, ziet
     verschillen die er een halve seconde later niet meer zijn — dat kostte
     ons een test die soms wel en soms niet omviel. Dus eerst afwachten.
     We kijken naar de doorzichtigheid en niet naar de verschuiving, want
     een kaart waar de muis toevallig op staat blijft verschoven. */
  const uitgeanimeerd = (p) =>
    p.waitForFunction(() =>
      [...document.querySelectorAll('.grid.vier > .card')]
        .every((kaart) => getComputedStyle(kaart).opacity === '1'));

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
    await uitgeanimeerd(p);

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

  /* De menubalk en de voettekst staan in kleine letters — dat hoort bij de
     opmaak. Het vlak waar je op kunt tikken hoeft niet even klein te zijn.
     Vandaar dat we hier niet het kadertje van de link meten maar prikken
     waar hij echt op reageert: het onzichtbare vlakje eromheen telt mee,
     en een schakelaar die er half overheen ligt telt juist niet mee. */
  test('de kleine links in kop en voet zijn te raken met een duim', async () => {
    const pagina = await browser.newPage(telefoon);
    await pagina.goto(paginaUrl(''));
    await pagina.evaluate(() => document.fonts.ready);

    const teKlein = await pagina.evaluate(() => {
      const raakhoogte = (el) => {
        // elementFromPoint kijkt alleen in het beeld dat nu op het scherm
        // staat. Wat eronder hangt moet dus eerst in beeld komen.
        // 'instant', want de site scrollt zacht: zonder dit meten we de
        // plek waar de link nog stond in plaats van waar hij nu is.
        el.scrollIntoView({ block: 'center', behavior: 'instant' });
        const r = el.getBoundingClientRect();
        const x = r.left + r.width / 2;
        const midden = r.top + r.height / 2;
        const raakt = (y) => {
          const doel = document.elementFromPoint(x, y);
          return doel === el || el.contains(doel)
            || (doel && doel.closest && doel.closest('a, button, summary') === el);
        };
        let boven = midden;
        let onder = midden;
        while (boven > midden - 60 && raakt(boven - 1)) boven -= 1;
        while (onder < midden + 60 && raakt(onder + 1)) onder += 1;
        return Math.round(onder - boven);
      };
      const uit = [];
      const kiezers = [
        '.logo', 'nav.main a', '.taalkiezer a', '.thema-knop',
        'footer.site .wrap a',
      ];
      for (const kiezer of kiezers) {
        for (const el of document.querySelectorAll(kiezer)) {
          const r = el.getBoundingClientRect();
          if (r.width === 0 || r.height === 0) continue;
          const hoog = raakhoogte(el);
          if (hoog < 30 || r.width < 24) {
            uit.push(`${kiezer} "${(el.textContent || el.getAttribute("aria-label") || "").trim().slice(0, 20)}" ${Math.round(r.width)} bij ${hoog}`);
          }
        }
      }
      return uit;
    });

    assert.deepEqual(teKlein, [], `te klein om te raken: ${teKlein.join(' | ')}`);
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
describe('Headroom', alsGebouwd, () => {
  const telefoon = { viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true };

  /** Headroom opent met een nagebootste RDW, net als de rest hierboven. */
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
    await pagina.goto(paginaUrl('headroom'));
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
    await pagina.goto(paginaUrl('headroom'));
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
      await pagina.goto(paginaUrl('headroom'));
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

  test('het rapport telt op wat er is doorgegaan en wat nog moet komen', async () => {
    const { pagina, fouten } = await openWerkbak();
    const dezeMaand = (d) => {
      const v = new Date();
      return `${v.getFullYear()}-${String(v.getMonth() + 1).padStart(2, '0')}-${d}`;
    };

    /* Drie klussen, elk een andere status: betaald, gefactureerd, verstuurd.
       De status tikt door van concept naar betaald in vier tikken. */
    for (const [naam, tikken, dag] of [['Mark', 4, '05'], ['Sanne', 3, '12'], ['Tim', 1, '20']]) {
      await pagina.click('#wb-nieuw');
      await pagina.click('#wb-pakketten .wb-toevoeg >> nth=0');
      await pagina.fill('#wb-naam', naam);
      await pagina.fill('#wb-inbouwdatum', dezeMaand(dag));
      await pagina.click('#wb-bewaar');
      for (let i = 0; i < tikken; i++) await pagina.click('#wb-bewaard .wb-status >> nth=0');
    }

    await pagina.click('[data-tab="rapport"]');

    // Twee klussen zijn doorgegaan (betaald en gefactureerd), de derde niet.
    const omzet = await pagina.textContent('#wb-r-omzet');
    assert.match(omzet, /2 klussen/);
    assert.match(omzet, /€ 1\.390,00/, 'de omzet inclusief btw klopt niet');

    /* Het belangrijkste blok: wat er nog moet binnenkomen. Een gefactureerde
       klus die nog niet betaald is hoort er bovenaan te staan. */
    const open = await pagina.textContent('#wb-r-openstaand');
    assert.match(open, /Gefactureerd, nog niet betaald/);
    assert.match(open, /Offertes waar nog niets op binnen is/);

    assert.deepEqual(fouten, []);
    await pagina.close();
  });

  test('het rapport blijft leeg zonder klussen, zonder rare getallen', async () => {
    const { pagina, fouten } = await openWerkbak();
    await pagina.click('[data-tab="rapport"]');
    const tekst = await pagina.textContent('[data-paneel="rapport"]');
    assert.match(tekst, /Nog geen klus die is doorgegaan/);
    assert.doesNotMatch(tekst, /NaN/);
    assert.equal((await pagina.textContent('#wb-r-openstaand')).trim(), '');
    assert.deepEqual(fouten, []);
    await pagina.close();
  });

  test('het rapport komt eruit als pdf', async () => {
    const { pagina, fouten } = await openWerkbak();
    await pagina.click('#wb-pakketten .wb-toevoeg >> nth=0');
    await pagina.fill('#wb-naam', 'Mark de Vries');
    await pagina.click('#wb-bewaar');
    await pagina.click('[data-tab="rapport"]');

    const [download] = await Promise.all([
      pagina.waitForEvent('download'),
      pagina.click('#wb-r-pdf'),
    ]);
    assert.match(download.suggestedFilename(), /^rapport-.*\.pdf$/);
    const pdf = readFileSync(await download.path(), 'latin1');
    // Hier staan inkoop en marge op; dat stuk gaat nooit naar een klant.
    assert.match(pdf, /Alleen voor jezelf/);
    assert.deepEqual(fouten, []);
    await pagina.close();
  });

  test('je Google-agenda verschijnt zodra je het adres invult', async () => {
    const { pagina, fouten } = await openWerkbak();
    await pagina.click('[data-tab="agenda"]');

    // Zonder adres geen leeg venstertje van Google op je scherm.
    assert.equal(await pagina.locator('#wb-google-venster iframe').count(), 0);
    assert.match(await pagina.textContent('#wb-google-venster'), /Instellingen/);

    await pagina.click('[data-tab="instellingen"]');
    await pagina.fill('#wb-i-googleagenda', 'justus@audioupgradeemmen.nl');
    await pagina.locator('#wb-i-googleagenda').blur();
    await pagina.click('[data-tab="agenda"]');

    const src = await pagina.getAttribute('#wb-google-venster iframe', 'src');
    assert.match(src, /^https:\/\/calendar\.google\.com\/calendar\/embed/);
    assert.match(src, /ctz=Europe%2FAmsterdam/);

    // En iets dat geen agenda-adres is komt er niet in.
    await pagina.click('[data-tab="instellingen"]');
    await pagina.fill('#wb-i-googleagenda', 'zomaar wat');
    await pagina.locator('#wb-i-googleagenda').blur();
    await pagina.click('[data-tab="agenda"]');
    assert.equal(await pagina.locator('#wb-google-venster iframe').count(), 0);
    assert.match(await pagina.textContent('#wb-google-venster'), /herken ik niet/i);

    assert.deepEqual(fouten, []);
    await pagina.close();
  });

  test('een klus gaat met twee tikken in Google Agenda', async () => {
    const { pagina, fouten } = await openWerkbak();
    await pagina.click('#wb-pakketten .wb-toevoeg >> nth=0');
    await pagina.fill('#wb-naam', 'Mark de Vries');
    await pagina.fill('#wb-inbouwdatum', '2026-10-07');
    await pagina.click('#wb-bewaar');
    await pagina.click('[data-tab="agenda"]');

    /* Twee afspraken, dus twee vensters: de inbouw en de dag dat er besteld
       moet zijn. Google kent geen link die er twee tegelijk aanmaakt. */
    const geopend = [];
    /* Google zelf niet echt aanroepen: we testen onze link, niet hun server. */
    await pagina.context().route('**://calendar.google.com/**', (route) =>
      route.fulfill({ status: 200, contentType: 'text/html', body: 'ok' }));
    pagina.context().on('page', async (pg) => {
      /* Een net geopend venster staat eerst nog op about:blank; pas na het
         laden weet je welk adres erin staat. */
      await pg.waitForLoadState('domcontentloaded').catch(() => {});
      geopend.push(pg.url());
    });
    await pagina.click('.wb-google');
    await pagina.waitForTimeout(1200);

    assert.equal(geopend.length, 2, 'er horen twee afspraken open te gaan');
    assert.ok(geopend.every((u) => u.startsWith('https://calendar.google.com/calendar/render')));
    /* Uitlezen via searchParams en niet met decodeURIComponent: in een
       webadres is een spatie een plusteken, en dat draait decodeURIComponent
       niet terug. */
    const titels = geopend.map((u) => new URL(u).searchParams.get('text'));
    assert.ok(titels.some((t) => t.startsWith('Inbouw Mark de Vries')), titels.join(' | '));
    assert.ok(titels.some((t) => t.startsWith('Onderdelen bestellen')), titels.join(' | '));

    assert.deepEqual(fouten, []);
    await pagina.close();
  });

  test('een luistersessie plannen en versturen', async () => {
    const { pagina, fouten } = await openWerkbak();
    await pagina.click('[data-tab="agenda"]');
    await pagina.fill('#wb-ls-voornaam', 'Mark de Vries');
    await pagina.fill('#wb-ls-kenteken', 'XX99XX');
    await pagina.fill('#wb-ls-datum', '2026-10-07');
    await pagina.fill('#wb-ls-tijd', '14:00');

    // Het bericht stelt zichzelf op terwijl je typt.
    const bericht = await pagina.inputValue('#wb-ls-bericht');
    assert.match(bericht, /^Hoi Mark,/, 'alleen de voornaam hoort erin');
    assert.match(bericht, /woensdag 7 oktober 2026/);
    assert.match(bericht, /14:00/);
    assert.match(bericht, /XX-99-XX/);
    assert.match(bericht, /Charles Darwinstraat 35/);
    assert.match(bericht, /hek/);
    assert.match(bericht, /44 37 98 44/);

    // Zonder datum wil hij niet versturen: dat is een half bericht.
    await pagina.fill('#wb-ls-datum', '');
    await pagina.click('#wb-ls-whatsapp');
    assert.match(await pagina.textContent('#wb-ls-melding'), /datum/i);

    await pagina.fill('#wb-ls-datum', '2026-10-07');
    await pagina.click('#wb-ls-bewaar');
    assert.match(await pagina.textContent('#wb-agenda-lijst'), /Luistersessie — Mark de Vries/);
    assert.match(await pagina.textContent('#wb-agenda-lijst'), /XX-99-XX/);

    assert.deepEqual(fouten, []);
    await pagina.close();
  });

  test('een luistersessie van morgen komt bovenaan bij Nu doen', async () => {
    // Een luistersessie duurt zo kort dat je hem vergeet. Juist daarom moet
    // hij de dag ervoor bovenaan staan.
    const { pagina, fouten } = await openWerkbak();
    await pagina.click('[data-tab="agenda"]');
    await pagina.fill('#wb-ls-voornaam', 'Mark');
    await pagina.fill('#wb-ls-datum', overDagen(1));
    await pagina.fill('#wb-ls-tijd', '14:00');
    await pagina.click('#wb-ls-bewaar');

    const nu = await pagina.textContent('#wb-agenda-nu');
    assert.match(nu, /Luistersessie met Mark/);
    assert.match(nu, /morgen om 14:00/);
    assert.match(nu, /hek/i, 'de instructie over het hek ontbreekt');
    assert.equal(await pagina.textContent('#wb-agenda-bel'), '1');
    assert.deepEqual(fouten, []);
    await pagina.close();
  });

  test('een sessie ver weg zeurt nog niet', async () => {
    const { pagina, fouten } = await openWerkbak();
    await pagina.click('[data-tab="agenda"]');
    await pagina.fill('#wb-ls-voornaam', 'Sanne');
    await pagina.fill('#wb-ls-datum', overDagen(9));
    await pagina.click('#wb-ls-bewaar');
    assert.equal(await pagina.isVisible('#wb-agenda-bel'), false);
    assert.equal((await pagina.textContent('#wb-agenda-nu')).trim(), '');
    assert.deepEqual(fouten, []);
    await pagina.close();
  });

  test('een bewaarde sessie kun je in je eigen agenda zetten', async () => {
    const { pagina, fouten } = await openWerkbak();
    await pagina.click('[data-tab="agenda"]');
    await pagina.fill('#wb-ls-voornaam', 'Mark');
    await pagina.fill('#wb-ls-datum', '2026-10-07');
    await pagina.fill('#wb-ls-tijd', '14:00');
    await pagina.click('#wb-ls-bewaar');

    const [download] = await Promise.all([
      pagina.waitForEvent('download'),
      pagina.click('.wb-ls-ics2'),
    ]);
    const tekst = readFileSync(await download.path(), 'utf8');
    assert.match(tekst, /DTSTART:20261007T140000/);
    // De wekker een dag van tevoren: dat is waar het om gaat.
    assert.match(tekst, /TRIGGER:-P1D/);
    assert.deepEqual(fouten, []);
    await pagina.close();
  });

  test('een luistersessie levert een agendabestand voor de klant', async () => {
    const { pagina, fouten } = await openWerkbak();
    await pagina.click('[data-tab="agenda"]');
    await pagina.fill('#wb-ls-voornaam', 'Mark');
    await pagina.fill('#wb-ls-datum', '2026-10-07');
    await pagina.fill('#wb-ls-tijd', '14:00');
    const [download] = await Promise.all([
      pagina.waitForEvent('download'),
      pagina.click('#wb-ls-ics'),
    ]);
    assert.match(download.suggestedFilename(), /^luistersessie-2026-10-07/);
    const tekst = readFileSync(await download.path(), 'utf8').replace(/\r\n /g, '');
    assert.match(tekst, /DTSTART:20261007T140000/);
    assert.match(tekst, /LOCATION:Charles Darwinstraat 35/);
    assert.match(tekst, /hek/);
    assert.deepEqual(fouten, []);
    await pagina.close();
  });

  test('een bewaarde luistersessie kun je weghalen', async () => {
    const { pagina, fouten } = await openWerkbak();
    pagina.on('dialog', (d) => d.accept());
    await pagina.click('[data-tab="agenda"]');
    await pagina.fill('#wb-ls-voornaam', 'Mark');
    await pagina.fill('#wb-ls-datum', '2026-10-07');
    await pagina.click('#wb-ls-bewaar');
    assert.equal(await pagina.locator('.wb-ls-weg').count(), 1);
    await pagina.click('.wb-ls-weg');
    assert.equal(await pagina.locator('.wb-ls-weg').count(), 0);
    assert.deepEqual(fouten, []);
    await pagina.close();
  });

  test('een klus met een datum komt in de agenda te staan', async () => {
    const { pagina, fouten } = await openWerkbak();

    await pagina.click('#wb-pakketten .wb-toevoeg >> nth=0');
    await pagina.fill('#wb-naam', 'Mark de Vries');
    await pagina.fill('#wb-inbouwdatum', overDagen(30));
    await pagina.click('#wb-bewaar');
    await pagina.click('[data-tab="agenda"]');

    // Zolang er niet is aanbetaald mag er nergens "bestellen" staan. Bestel je
    // op eigen kosten voor een klant die niet aanbetaalt, dan lig jij ermee.
    assert.match(await pagina.textContent('.wb-bestel'), /wacht op aanbetaling/);
    assert.equal(await pagina.isVisible('#wb-agenda-bel'), false, 'hij belt zonder reden');

    // Status doortikken naar aanbetaald: concept » verstuurd » aanbetaald.
    await pagina.click('[data-tab="offerte"]');
    await pagina.click('#wb-bewaard .wb-status >> nth=0');
    await pagina.click('#wb-bewaard .wb-status >> nth=0');
    await pagina.click('[data-tab="agenda"]');

    // Het geld is binnen, maar de besteldag is nog ver weg: dan zeurt hij niet.
    assert.match(await pagina.textContent('.wb-bestel'), /nog even tijd/);
    assert.equal(await pagina.isVisible('#wb-agenda-bel'), false);

    // De klus naar voren halen: nu is de besteldag wél gepasseerd.
    await pagina.click('[data-tab="offerte"]');
    await pagina.fill('#wb-inbouwdatum', overDagen(10));
    await pagina.click('[data-tab="agenda"]');
    assert.match(await pagina.textContent('.wb-bestel'), /nu bestellen/);
    assert.equal(await pagina.textContent('#wb-agenda-bel'), '1');
    assert.match(await pagina.textContent('#wb-agenda-nu'), /Bestellen voor Mark de Vries/);

    // De twee voorbereidingslijstjes staan eronder.
    assert.equal(await pagina.locator('.wb-voorbereiding').count(), 2);
    assert.ok(await pagina.locator('.wb-voorbereiding .wb-vink').count() >= 8);

    // Afvinken dat er besteld is haalt hem van de lijst met dringende dingen.
    await pagina.check('.wb-besteld input');
    assert.equal(await pagina.isVisible('#wb-agenda-bel'), false);
    assert.match(await pagina.textContent('.wb-bestel'), /geregeld/);

    assert.deepEqual(fouten, []);
    await pagina.close();
  });

  test('een afgevinkte voorbereidingsstap blijft staan', async () => {
    const { pagina, fouten } = await openWerkbak();
    await pagina.click('#wb-pakketten .wb-toevoeg >> nth=0');
    await pagina.fill('#wb-naam', 'Mark de Vries');
    await pagina.fill('#wb-inbouwdatum', overDagen(20));
    await pagina.click('#wb-bewaar');
    await pagina.click('[data-tab="agenda"]');
    await pagina.locator('.wb-voorbereiding .wb-vink input').first().check();

    // Herladen: in de werkplaats gaat de telefoon uit en weer aan.
    await pagina.reload();
    await pagina.click('[data-tab="agenda"]');
    assert.equal(
      await pagina.locator('.wb-voorbereiding .wb-vink input').first().isChecked(),
      true,
      'het vinkje is weg na het herladen'
    );
    assert.deepEqual(fouten, []);
    await pagina.close();
  });

  test('de agenda levert een bestand dat je telefoon snapt', async () => {
    const { pagina, fouten } = await openWerkbak();
    await pagina.click('#wb-pakketten .wb-toevoeg >> nth=0');
    await pagina.fill('#wb-naam', 'Mark de Vries');
    await pagina.fill('#wb-kenteken', 'XX99XX');
    await pagina.fill('#wb-inbouwdatum', overDagen(20));
    await pagina.click('#wb-bewaar');
    await pagina.click('[data-tab="agenda"]');

    const [download] = await Promise.all([
      pagina.waitForEvent('download'),
      pagina.click('.wb-ics'),
    ]);
    assert.match(download.suggestedFilename(), /^inbouw-.*\.ics$/);
    const tekst = readFileSync(await download.path(), 'utf8');
    assert.match(tekst, /BEGIN:VCALENDAR/);
    // De twee wekkers waar het Justus om te doen is.
    assert.match(tekst, /TRIGGER:-P7D/);
    assert.match(tekst, /TRIGGER:-P1D/);
    // En de tweede afspraak: de dag dat er besteld moet zijn.
    assert.equal(tekst.match(/BEGIN:VEVENT/g).length, 2);

    assert.deepEqual(fouten, []);
    await pagina.close();
  });

  test('wat je aan het invullen was overleeft een afgesloten tabblad', async () => {
    /**
     * Android sluit een tabblad op de achtergrond af zodra hij geheugen nodig
     * heeft. Ga je even naar WhatsApp of naar de camera — de hele dag door —
     * dan kwam je terug op een leeg scherm met je werk eraf.
     */
    const { pagina, fouten } = await openWerkbak();
    await pagina.click('#wb-pakketten .wb-toevoeg >> nth=0');
    await pagina.fill('#wb-naam', 'Mark de Vries');
    await pagina.fill('#wb-kenteken', 'XX99XX');
    await pagina.fill('#wb-opmerking', 'inbouw in overleg');
    await pagina.fill('#wb-inbouwdatum', '2026-10-07');
    await pagina.locator('#wb-naam').blur();

    // Zonder op Bewaren te drukken: het tabblad gaat naar de achtergrond.
    await pagina.evaluate(() => document.dispatchEvent(new Event('visibilitychange')));
    await pagina.reload();

    assert.equal(await pagina.inputValue('#wb-naam'), 'Mark de Vries');
    assert.equal(await pagina.inputValue('#wb-kenteken'), 'XX99XX');
    assert.equal(await pagina.inputValue('#wb-opmerking'), 'inbouw in overleg');
    assert.equal(await pagina.inputValue('#wb-inbouwdatum'), '2026-10-07');
    assert.equal(await pagina.locator('#wb-regels .wb-regel').count(), 1);
    assert.equal(await pagina.textContent('#wb-totaal'), '€ 695,00');

    // En hij is er niet stiekem ook in je lijst bij gezet.
    const staat = await pagina.evaluate(() =>
      JSON.parse(localStorage.getItem('aue-werkbak-v1')));
    assert.equal(staat.offertes.length, 0, 'een niet-bewaarde offerte hoort niet in de lijst');

    assert.deepEqual(fouten, []);
    await pagina.close();
  });

  test('een lege offerte laat niets achter', async () => {
    // Anders sta je bij het openen naar een leeg formulier te kijken dat
    // zogenaamd hersteld is.
    const { pagina, fouten } = await openWerkbak();
    await pagina.evaluate(() => document.dispatchEvent(new Event('visibilitychange')));
    const staat = await pagina.evaluate(() =>
      JSON.parse(localStorage.getItem('aue-werkbak-v1') || 'null'));
    assert.ok(!staat?.concept, 'er staat een leeg concept opgeslagen');
    assert.deepEqual(fouten, []);
    await pagina.close();
  });

  test('een nieuwe beginnen vraagt eerst als er werk in staat', async () => {
    // Deze knop staat vlak onder Bewaren; met een vette duim zit je ernaast.
    const { pagina, fouten } = await openWerkbak();
    const gevraagd = [];
    pagina.on('dialog', (d) => { gevraagd.push(d.message()); d.dismiss(); });

    await pagina.click('#wb-pakketten .wb-toevoeg >> nth=0');
    await pagina.fill('#wb-naam', 'Mark de Vries');
    await pagina.click('#wb-nieuw');

    assert.match(gevraagd.join(' '), /nog niet in je lijst/i);
    // Afgewezen, dus alles staat er nog.
    assert.equal(await pagina.inputValue('#wb-naam'), 'Mark de Vries');
    assert.equal(await pagina.locator('#wb-regels .wb-regel').count(), 1);

    assert.deepEqual(fouten, []);
    await pagina.close();
  });

  test('is de offerte bewaard, dan vraagt hij niets', async () => {
    const { pagina, fouten } = await openWerkbak();
    const gevraagd = [];
    pagina.on('dialog', (d) => { gevraagd.push(d.message()); d.accept(); });

    await pagina.click('#wb-pakketten .wb-toevoeg >> nth=0');
    await pagina.fill('#wb-naam', 'Mark de Vries');
    await pagina.click('#wb-bewaar');
    await pagina.click('#wb-nieuw');

    assert.deepEqual(gevraagd, [], 'er valt niets te verliezen, dus niets te vragen');
    assert.equal(await pagina.inputValue('#wb-naam'), '');
    assert.deepEqual(fouten, []);
    await pagina.close();
  });

  test('twee offertes achter elkaar overschrijven elkaar niet', async () => {
    /**
     * Dit ging mis en het kostte werk.
     *
     * Het offertenummer kwam van de teller uit Instellingen, en die schoof pas
     * op als je de offerte had verstuurd. Maakte Justus er twee achter elkaar
     * zonder er een te versturen — op een autoshow, of gewoon op een drukke
     * dag — dan droegen ze allebei nummer 2026-001. Bewaren ging op nummer,
     * dus de tweede ging boven op de eerste. Die klant was weg, zonder melding.
     */
    const { pagina, fouten } = await openWerkbak();
    const bewaard = () => pagina.evaluate(() =>
      JSON.parse(localStorage.getItem('aue-werkbak-v1')).offertes
        .map((o) => `${o.nummer} ${o.klant?.naam || ''}`)
    );

    for (const naam of ['Mark de Vries', 'Sanne Bakker', 'Tim Jansen']) {
      await pagina.click('#wb-nieuw');
      await pagina.click('#wb-pakketten .wb-toevoeg >> nth=0');
      await pagina.fill('#wb-naam', naam);
      await pagina.click('#wb-bewaar');
    }

    assert.deepEqual(await bewaard(), [
      '2026-003 Tim Jansen',
      '2026-002 Sanne Bakker',
      '2026-001 Mark de Vries',
    ]);

    // De teller wijst naar het eerste vrije nummer, niet verder.
    await pagina.click('[data-tab="instellingen"]');
    assert.equal(await pagina.inputValue('#wb-i-volgnummer'), '4');

    assert.deepEqual(fouten, []);
    await pagina.close();
  });

  test('dezelfde offerte nog eens bewaren verandert niets', async () => {
    // Anders staat hij dubbel in je lijst, of springt je nummerreeks vooruit
    // met nummers die nooit bij een offerte hebben gehoord.
    const { pagina, fouten } = await openWerkbak();
    await pagina.click('#wb-pakketten .wb-toevoeg >> nth=0');
    await pagina.fill('#wb-naam', 'Mark de Vries');
    await pagina.click('#wb-bewaar');
    await pagina.click('#wb-bewaar');
    await pagina.click('#wb-bewaar');

    const staat = await pagina.evaluate(() =>
      JSON.parse(localStorage.getItem('aue-werkbak-v1')));
    assert.equal(staat.offertes.length, 1);
    assert.equal(staat.offertes[0].nummer, '2026-001');
    assert.equal(staat.instellingen.volgnummer, 2);
    assert.deepEqual(fouten, []);
    await pagina.close();
  });

  test('een bewaarde offerte openen en wijzigen houdt hetzelfde nummer', async () => {
    const { pagina, fouten } = await openWerkbak();
    for (const naam of ['Mark', 'Sanne']) {
      await pagina.click('#wb-nieuw');
      await pagina.click('#wb-pakketten .wb-toevoeg >> nth=0');
      await pagina.fill('#wb-naam', naam);
      await pagina.click('#wb-bewaar');
    }
    // De onderste in de lijst is de oudste: Mark, met 2026-001.
    await pagina.click('#wb-bewaard .wb-open-offerte >> nth=1');
    await pagina.fill('#wb-naam', 'Mark de Vries');
    await pagina.click('#wb-bewaar');

    const staat = await pagina.evaluate(() =>
      JSON.parse(localStorage.getItem('aue-werkbak-v1')));
    assert.equal(staat.offertes.length, 2, 'er is er een bij gekomen of verdwenen');
    const mark = staat.offertes.find((o) => o.klant.naam === 'Mark de Vries');
    assert.equal(mark.nummer, '2026-001', 'het nummer is veranderd bij het wijzigen');
    assert.deepEqual(fouten, []);
    await pagina.close();
  });

  test('je kunt rechtstreeks in een tabblad binnenkomen', async () => {
    // Dit is wat een snelkoppeling op het beginscherm doet: meteen de agenda,
    // zonder eerst langs de offerte.
    const pagina = await browser.newPage(telefoon);
    await pagina.goto(`${paginaUrl('headroom')}?tab=agenda`);
    assert.equal(await pagina.isVisible('[data-paneel="agenda"]'), true);
    assert.equal(await pagina.isHidden('[data-paneel="offerte"]'), true);
    await pagina.close();
  });

  test('een onbekend tabblad valt terug op de offerte', async () => {
    // Liever de offerte dan een leeg scherm als er ooit een oud adres rondzwerft.
    const pagina = await browser.newPage(telefoon);
    await pagina.goto(`${paginaUrl('headroom')}?tab=bestaatniet`);
    assert.equal(await pagina.isVisible('[data-paneel="offerte"]'), true);
    await pagina.close();
  });

  test('de terugknop van je telefoon gaat een tabblad terug', async () => {
    // Zonder dit sluit de terugknop de app af, en dat is precies wat je niet
    // wilt als je even in Onderdelen hebt gekeken.
    const pagina = await browser.newPage(telefoon);
    await pagina.goto(`${paginaUrl('headroom')}?tab=agenda`);
    await pagina.click('[data-tab="autos"]');
    assert.match(pagina.url(), /\?tab=autos$/);
    await pagina.goBack();
    assert.match(pagina.url(), /\?tab=agenda$/);
    assert.equal(await pagina.isVisible('[data-paneel="agenda"]'), true);
    await pagina.close();
  });

  test('bij Instellingen staat een link naar elk tabblad', async () => {
    // Die links zet Justus op zijn beginscherm. Chrome kan alleen een echte
    // link op het startscherm zetten, geen knop met javascript eronder.
    const pagina = await browser.newPage(telefoon);
    await pagina.goto(paginaUrl('headroom'));
    await pagina.click('[data-tab="instellingen"]');
    const links = await pagina.$$eval('#wb-tabkoppelingen a', (as) =>
      as.map((a) => ({ href: a.getAttribute('href'), h: a.getBoundingClientRect().height }))
    );
    assert.ok(links.length >= 4, 'er staan geen koppelingen');
    for (const l of links) {
      assert.match(l.href, /^\?tab=[a-z]+$/, `raar adres: ${l.href}`);
      assert.ok(l.h >= 38, `te klein voor een duim: ${l.h}`);
    }
    await pagina.close();
  });

  test('de afspraken staan standaard goed en onthouden zich', async () => {
    const { pagina, fouten } = await openWerkbak();

    // Standaard: op afstand afgesproken en de voorwaarden gaan mee. Dat is
    // wat er gebeurt als een offerte via WhatsApp de deur uit gaat.
    assert.equal(await pagina.isChecked('#wb-op-afstand'), true);
    assert.equal(await pagina.isChecked('#wb-bijlage'), true);
    assert.equal(await pagina.isChecked('#wb-start-direct'), false);

    // Zet je 'op afstand' uit, dan verdwijnt 'direct beginnen': zonder
    // bedenktijd valt er niets binnen die bedenktijd te beginnen.
    await pagina.check('#wb-start-direct');
    await pagina.uncheck('#wb-op-afstand');
    assert.equal(await pagina.isHidden('#wb-start-veld'), true);
    assert.equal(await pagina.isChecked('#wb-start-direct'), false);

    // Bewaren en terughalen: de vinkjes moeten staan zoals je ze liet staan.
    await pagina.click('#wb-pakketten .wb-toevoeg >> nth=0');
    await pagina.fill('#wb-naam', 'Mark de Vries');
    await pagina.click('#wb-bewaar');
    await pagina.click('#wb-nieuw');
    assert.equal(await pagina.isChecked('#wb-op-afstand'), true, 'een nieuwe offerte begint schoon');
    await pagina.click('#wb-bewaard .wb-open-offerte >> nth=0');
    assert.equal(await pagina.isChecked('#wb-op-afstand'), false);

    assert.deepEqual(fouten, []);
    await pagina.close();
  });

  test('alles waar je op tikt is groot genoeg voor een duim', async () => {
    const pagina = await browser.newPage(telefoon);
    await pagina.goto(paginaUrl('headroom'));
    await pagina.click('#wb-pakketten .wb-toevoeg >> nth=0');
    const teKlein = await pagina.$$eval('button, input, select, textarea', (elementen) =>
      elementen
        .map((e) => {
          /* Zit het veld in een label, dan is dat hele label het tikvlak: je
             raakt een vinkje van 22 pixels net zo goed door naast de tekst te
             tikken. Meet dus waar je echt op kunt tikken. */
          const vlak = e.closest('label') || e;
          return {
            wat: (e.textContent || e.getAttribute('aria-label') || e.id || '').trim().slice(0, 30),
            h: vlak.getBoundingClientRect().height,
          };
        })
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
    await pagina.goto(paginaUrl('headroom'));
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
      await pagina.goto(paginaUrl('headroom'));
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

/**
 * EEN PRIJSLIJST INLEZEN.
 *
 * Zo komen de leveranciersprijzen in Headroom: als bestand dat Justus zelf
 * inleest. Twee dingen mogen daarbij nooit gebeuren — zijn instellingen en
 * zijn eigen werk wissen, en alles dubbel in de lijst zetten.
 */
describe('een prijslijst inlezen', alsGebouwd, () => {
  const telefoon = { viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true };

  /** Een aangeleverde lijst: alleen onderdelen en auto's, geen instellingen. */
  const PRIJSLIJST = {
    catalogus: [
      { omschrijving: '13W7AE-D1.5', soort: 'subwoofer', merk: 'JL Audio',
        leverancier: 'JL Audio', artikelnummer: '010-03032-00', inkoopCent: 98926, uren: 0, toebehoren: [] },
      { omschrijving: 'MSS 6', soort: 'speakers-voor', merk: 'STEG',
        leverancier: 'STEG', artikelnummer: 'MSS6', inkoopCent: 32182, uren: 0, toebehoren: [] },
    ],
    dossiers: [
      { sleutel: 'bmw-3-serie', naam: 'BMW 3er (E90)', vanJaar: '2005', totJaar: '2011',
        chassis: 'E90', pastVoor: 'ONE 202 BMW', bron: 'Gladen compatibiliteitslijst BMW, december 2020' },
    ],
  };

  async function lees(pagina, bestand) {
    await pagina.setInputFiles('#wb-import', {
      name: 'lijst.json',
      mimeType: 'application/json',
      buffer: Buffer.from(JSON.stringify(bestand)),
    });
    await pagina.waitForTimeout(300);
  }

  const opslag = (pagina) =>
    pagina.evaluate(() => JSON.parse(localStorage.getItem('aue-werkbak-v1') || '{}'));

  async function open() {
    const pagina = await browser.newPage(telefoon);
    const fouten = [];
    pagina.on('pageerror', (e) => fouten.push(e.message));
    pagina.on('dialog', (venster) => venster.accept());
    await pagina.goto(paginaUrl('headroom'));
    await pagina.evaluate(() => document.fonts.ready);
    return { pagina, fouten };
  }

  test('een prijslijst komt erbij en wist niets', async () => {
    const { pagina, fouten } = await open();
    // Eerst iets eigens neerzetten: een uurtarief en een eigen onderdeel.
    await pagina.click('[data-tab="instellingen"]');
    await pagina.fill('#wb-i-uurtarief', '82,50');
    await pagina.locator('#wb-i-uurtarief').blur();
    await pagina.click('[data-tab="catalogus"]');
    await pagina.fill('#wb-o-naam', 'Eigen rol butyl');
    await pagina.fill('#wb-o-inkoop', '39,00');
    await pagina.click('#wb-o-bewaar');

    await lees(pagina, PRIJSLIJST);

    const na = await opslag(pagina);
    assert.equal(na.catalogus.length, 3, 'de lijst is niet toegevoegd maar vervangen');
    assert.equal(na.dossiers.length, 1);
    assert.equal(na.instellingen.uurtariefCent, 8250, 'het uurtarief is gewist');
    assert.ok(
      na.catalogus.some((o) => o.omschrijving === 'Eigen rol butyl'),
      'het eigen onderdeel is verdwenen'
    );
    assert.deepEqual(fouten, []);
    await pagina.close();
  });

  test('twee keer inlezen zet niets dubbel in de lijst', async () => {
    const { pagina } = await open();
    await pagina.click('[data-tab="catalogus"]');
    await lees(pagina, PRIJSLIJST);
    await lees(pagina, PRIJSLIJST);
    const na = await opslag(pagina);
    assert.equal(na.catalogus.length, 2, 'de artikelen staan dubbel');
    assert.equal(na.dossiers.length, 1, 'de auto\'s staan dubbel');
    await pagina.close();
  });

  test('een reservekopie vervangt wél — dat is waar hij voor is', async () => {
    const { pagina } = await open();
    await pagina.click('[data-tab="instellingen"]');
    await pagina.fill('#wb-i-uurtarief', '82,50');
    await pagina.locator('#wb-i-uurtarief').blur();
    await pagina.click('[data-tab="catalogus"]');
    await lees(pagina, {
      soort: 'reservekopie',
      instellingen: { uurtariefCent: 6000, margePct: 45, btwPct: 21, geldigDagen: 14, volgnummer: 7 },
      catalogus: [PRIJSLIJST.catalogus[0]],
      dossiers: [],
      offertes: [],
    });
    const na = await opslag(pagina);
    assert.equal(na.catalogus.length, 1);
    assert.equal(na.instellingen.uurtariefCent, 6000, 'de reservekopie heeft de instellingen niet teruggezet');
    await pagina.close();
  });

  test('de ingelezen auto wordt bij het kenteken teruggevonden', async () => {
    // Een BMW 320i uit 2009 hoort het E90-dossier te vinden (2005-2011).
    const pagina = await browser.newPage(telefoon);
    pagina.on('dialog', (venster) => venster.accept());
    await pagina.route(RDW_VOERTUIG, (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([{
          kenteken: 'XX99XX', merk: 'BMW', handelsbenaming: '320I',
          voertuigsoort: 'Personenauto', datum_eerste_toelating: '20090417',
        }]),
      })
    );
    await pagina.goto(paginaUrl('headroom'));
    await pagina.click('[data-tab="catalogus"]');
    await lees(pagina, PRIJSLIJST);
    await pagina.click('[data-tab="offerte"]');
    await pagina.fill('#wb-kenteken', 'XX99XX');
    await pagina.click('#wb-kenteken-form button[type=submit]');
    await pagina.waitForFunction(() =>
      document.querySelector('#wb-auto-melding').textContent.includes('Gevonden')
    );
    await pagina.waitForTimeout(200);
    const melding = await pagina.textContent('#wb-dossier-melding');
    assert.match(melding, /BMW 3er \(E90\)/);
    // En hij blijft eerlijk over wat er nog niet is nagemeten.
    assert.match(melding, /Speakermaat voor/);
    await pagina.close();
  });

  test('een bestand dat niet uit Headroom komt wordt geweigerd', async () => {
    const pagina = await browser.newPage(telefoon);
    let gemeld = '';
    pagina.on('dialog', (venster) => { gemeld = venster.message(); venster.accept(); });
    await pagina.goto(paginaUrl('headroom'));
    await pagina.click('[data-tab="catalogus"]');
    await pagina.setInputFiles('#wb-import', {
      name: 'iets-anders.json',
      mimeType: 'application/json',
      buffer: Buffer.from(JSON.stringify({ zomaar: 'iets' })),
    });
    await pagina.waitForTimeout(300);
    assert.match(gemeld, /kon ik niet lezen/);
    await pagina.close();
  });
});

/**
 * DE AANBETALINGSFACTUUR IN DE APP.
 *
 * Dit is het enige document dat om geld vraagt. Twee dingen mogen hier nooit
 * misgaan: een factuur zonder rekeningnummer of naam de deur uit, en een
 * factuurnummer dat twee keer bestaat.
 */
describe('de aanbetaling', alsGebouwd, () => {
  const telefoon = { viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true };

  async function open({ iban = 'NL91 KNAB 0417 1643 00', klant = true } = {}) {
    const pagina = await browser.newPage(telefoon);
    const fouten = [];
    const meldingen = [];
    pagina.on('pageerror', (e) => fouten.push(e.message));
    pagina.on('dialog', (venster) => { meldingen.push(venster.message()); venster.accept(); });
    await pagina.route(RDW_VOERTUIG, (route) =>
      route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(SAAB) })
    );
    await pagina.goto(paginaUrl('headroom'));
    await pagina.evaluate(() => document.fonts.ready);

    await pagina.click('[data-tab="instellingen"]');
    if (iban) {
      await pagina.fill('#wb-i-iban', iban);
      await pagina.locator('#wb-i-iban').blur();
    }
    await pagina.click('[data-tab="offerte"]');
    // Een echte factuur hoort bij een echte auto: kenteken er dus in.
    await pagina.fill('#wb-kenteken', '92DJHG');
    await pagina.click('#wb-kenteken-form button[type=submit]');
    await pagina.waitForFunction(() =>
      document.querySelector('#wb-auto-melding').textContent.includes('Gevonden')
    );
    if (klant) {
      await pagina.fill('#wb-naam', 'Mark de Vries');
      await pagina.fill('#wb-adres', 'Hoofdstraat 12, 7811 AA Emmen');
    }
    await pagina.click('#wb-pakketten .wb-toevoeg >> nth=0');
    await pagina.waitForTimeout(150);
    return { pagina, fouten, meldingen };
  }

  test('het percentage rekent meteen mee', async () => {
    const { pagina, fouten } = await open();
    // Het CarPlay-pakket is € 695,00. Dertig procent is € 208,50.
    assert.match(await pagina.textContent('#wb-aanbetaling'), /€ 208,50/);
    await pagina.fill('#wb-aanbetaling-pct', '50');
    await pagina.waitForTimeout(150);
    const tekst = await pagina.textContent('#wb-aanbetaling');
    assert.match(tekst, /€ 347,50/);
    // Aanbetaling en restant samen zijn precies het offertetotaal.
    assert.equal((tekst.match(/€ 347,50/g) || []).length, 2, 'restant klopt niet met de aanbetaling');
    assert.deepEqual(fouten, []);
    await pagina.close();
  });

  test('de factuur komt eruit met een eigen nummerreeks', async () => {
    const { pagina, fouten } = await open();
    const wachten = pagina.waitForEvent('download');
    await pagina.click('#wb-factuur');
    const bestand = await wachten;
    assert.match(bestand.suggestedFilename(), /^factuur-\d{4}-F\d{3}-92DJHG\.pdf$/);

    // Het factuurnummer schuift één op, en niet meer dan één.
    await pagina.click('[data-tab="instellingen"]');
    assert.equal(await pagina.inputValue('#wb-i-factuurnummer'), '2');
    // De twee reeksen tellen los van elkaar. Het offertenummer staat ook op 2,
    // maar om een andere reden: bij het factureren is deze offerte bewaard, en
    // daarmee is 2026-001 vergeven. De teller wijst dus naar het eerste nummer
    // dat nog vrij is. Bleef hij op 1 staan, dan kreeg de volgende klant
    // hetzelfde nummer en overschreef die deze offerte.
    assert.equal(await pagina.inputValue('#wb-i-volgnummer'), '2');
    assert.deepEqual(fouten, []);
    await pagina.close();
  });

  test('zonder rekeningnummer komt er geen factuur', async () => {
    // Een factuur waar de klant niet op kan betalen is erger dan geen factuur.
    const { pagina, meldingen } = await open({ iban: '' });
    await pagina.click('#wb-factuur');
    await pagina.waitForTimeout(250);
    assert.match(meldingen.join(' '), /rekeningnummer/i);
    await pagina.close();
  });

  test('en de app zegt het ook al vóór je op de knop drukt', async () => {
    const { pagina } = await open({ iban: '' });
    assert.match(await pagina.textContent('#wb-aanbetaling'), /rekeningnummer staat nog niet/i);
    await pagina.close();
  });

  test('zonder naam van de klant ook niet', async () => {
    const { pagina, meldingen } = await open({ klant: false });
    await pagina.click('#wb-factuur');
    await pagina.waitForTimeout(250);
    assert.match(meldingen.join(' '), /naam van de klant/i);
    await pagina.close();
  });

  test('zonder adres vraagt hij het eerst, want dat is wettelijk vereist', async () => {
    const pagina = await browser.newPage(telefoon);
    const meldingen = [];
    pagina.on('dialog', (venster) => { meldingen.push(venster.message()); venster.dismiss(); });
    await pagina.goto(paginaUrl('headroom'));
    await pagina.click('[data-tab="instellingen"]');
    await pagina.fill('#wb-i-iban', 'NL91 KNAB 0417 1643 00');
    await pagina.locator('#wb-i-iban').blur();
    await pagina.click('[data-tab="offerte"]');
    await pagina.fill('#wb-naam', 'Mark de Vries');
    await pagina.click('#wb-pakketten .wb-toevoeg >> nth=0');
    await pagina.waitForTimeout(150);
    await pagina.click('#wb-factuur');
    await pagina.waitForTimeout(250);
    assert.match(meldingen.join(' '), /geen adres/i);
    assert.match(meldingen.join(' '), /honderd euro/i);

    // Afgewezen: dan geen factuur, en het nummer schuift niet op.
    await pagina.click('[data-tab="instellingen"]');
    assert.equal(await pagina.inputValue('#wb-i-factuurnummer'), '1');
    await pagina.close();
  });

  test('het rekeningnummer blijft staan als je de app opnieuw opent', async () => {
    const { pagina } = await open();
    await pagina.reload();
    await pagina.click('[data-tab="instellingen"]');
    assert.equal(await pagina.inputValue('#wb-i-iban'), 'NL91 KNAB 0417 1643 00');
    await pagina.close();
  });

  test('de aanbetalingskaart past ook op een smal scherm', async () => {
    const pagina = await browser.newPage({ ...telefoon, viewport: { width: 320, height: 844 } });
    await pagina.goto(paginaUrl('headroom'));
    await pagina.evaluate(() => document.fonts.ready);
    await pagina.click('#wb-pakketten .wb-toevoeg >> nth=0');
    await pagina.fill('#wb-aanbetaling-pct', '33,5');
    await pagina.waitForTimeout(150);
    const overloop = await pagina.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    );
    assert.equal(overloop, 0);
    await pagina.close();
  });
});

/**
 * KORTING, DE DRIE SOORTEN FACTUUR, EN JE OFFERTES TERUGVINDEN.
 */
describe('korting en eindfactuur', alsGebouwd, () => {
  const telefoon = { viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true };

  async function open() {
    const pagina = await browser.newPage(telefoon);
    const fouten = [];
    pagina.on('pageerror', (e) => fouten.push(e.message));
    pagina.on('dialog', (venster) => venster.accept());
    await pagina.route(RDW_VOERTUIG, (route) =>
      route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(SAAB) })
    );
    await pagina.goto(paginaUrl('headroom'));
    await pagina.evaluate(() => document.fonts.ready);
    await pagina.click('[data-tab="instellingen"]');
    await pagina.fill('#wb-i-iban', 'NL84KNAB0776239147');
    await pagina.locator('#wb-i-iban').blur();
    await pagina.click('[data-tab="offerte"]');
    await pagina.fill('#wb-kenteken', '92DJHG');
    await pagina.click('#wb-kenteken-form button[type=submit]');
    await pagina.waitForFunction(() =>
      document.querySelector('#wb-auto-melding').textContent.includes('Gevonden')
    );
    await pagina.fill('#wb-naam', 'Mark de Vries');
    await pagina.fill('#wb-adres', 'Hoofdstraat 12, 7811 AA Emmen');
    // Het CarPlay-pakket: € 695,00.
    await pagina.click('#wb-pakketten .wb-toevoeg >> nth=0');
    await pagina.waitForTimeout(150);
    return { pagina, fouten };
  }

  test('een korting in euro gaat er meteen af', async () => {
    const { pagina, fouten } = await open();
    assert.equal(await pagina.textContent('#wb-totaal'), '€ 695,00');
    await pagina.fill('#wb-korting', '50');
    await pagina.waitForTimeout(200);
    assert.equal(await pagina.textContent('#wb-totaal'), '€ 645,00');
    assert.match(await pagina.textContent('#wb-korting-uitleg'), /-€ 50,00/);
    assert.deepEqual(fouten, []);
    await pagina.close();
  });

  test('een korting in procenten ook', async () => {
    const { pagina } = await open();
    await pagina.fill('#wb-korting', '10%');
    await pagina.waitForTimeout(200);
    // Tien procent van € 695,00 is € 69,50.
    assert.equal(await pagina.textContent('#wb-totaal'), '€ 625,50');
    await pagina.close();
  });

  test('de korting gaat ook van je marge af', async () => {
    const { pagina } = await open();
    const voor = await pagina.textContent('#wb-marge');
    await pagina.fill('#wb-korting', '50');
    await pagina.waitForTimeout(200);
    const na = await pagina.textContent('#wb-marge');
    assert.notEqual(voor, na, 'de marge is niet meeveranderd');
    await pagina.close();
  });

  test('en de aanbetaling rekent over het bedrag ná korting', async () => {
    const { pagina } = await open();
    await pagina.fill('#wb-korting', '50');
    await pagina.fill('#wb-aanbetaling-pct', '50');
    await pagina.waitForTimeout(200);
    // Vijftig procent van € 645,00 is € 322,50.
    assert.match(await pagina.textContent('#wb-aanbetaling'), /€ 322,50/);
    await pagina.close();
  });

  test('de eindfactuur trekt de aanbetaling eraf', async () => {
    const { pagina, fouten } = await open();
    await pagina.fill('#wb-aanbetaling-pct', '30');
    await pagina.waitForTimeout(150);

    const eerste = pagina.waitForEvent('download');
    await pagina.click('#wb-factuur');
    await eerste;

    await pagina.click('[data-factuur="eind"]');
    await pagina.waitForTimeout(200);
    const tekst = await pagina.textContent('#wb-aanbetaling');
    // € 695,00 min 30% (€ 208,50) is € 486,50.
    assert.match(tekst, /Al aanbetaald/);
    assert.match(tekst, /€ 208,50/);
    assert.match(tekst, /€ 486,50/);

    const tweede = pagina.waitForEvent('download');
    await pagina.click('#wb-factuur');
    assert.match((await tweede).suggestedFilename(), /^factuur-\d{4}-F002-92DJHG\.pdf$/);
    assert.deepEqual(fouten, []);
    await pagina.close();
  });

  test('het percentage verdwijnt als je geen aanbetaling maakt', async () => {
    const { pagina } = await open();
    assert.equal(await pagina.isVisible('#wb-pct-veld'), true);
    await pagina.click('[data-factuur="volledig"]');
    await pagina.waitForTimeout(150);
    assert.equal(await pagina.isVisible('#wb-pct-veld'), false);
    await pagina.close();
  });

  test('een eindfactuur zonder aanbetaling waarschuwt', async () => {
    // Anders stuur je per ongeluk het hele bedrag als "eindfactuur".
    const { pagina } = await open();
    await pagina.click('[data-factuur="eind"]');
    await pagina.waitForTimeout(200);
    assert.match(await pagina.textContent('#wb-aanbetaling'), /nog geen aanbetaling/i);
    await pagina.close();
  });

  test('een offerte staat één keer in je lijst, niet vier keer', async () => {
    /**
     * Bewaren, factureren en afrekenen zetten allemaal dezelfde offerte weg.
     * Zonder bijwerken-op-nummer stond hij daarna vier keer in de lijst.
     */
    const { pagina } = await open();
    await pagina.click('#wb-bewaar');
    await pagina.waitForTimeout(150);
    const eerste = pagina.waitForEvent('download');
    await pagina.click('#wb-factuur');
    await eerste;
    await pagina.click('#wb-bewaar');
    await pagina.waitForTimeout(200);
    const aantal = await pagina.evaluate(
      () => JSON.parse(localStorage.getItem('aue-werkbak-v1')).offertes.length
    );
    assert.equal(aantal, 1);
    await pagina.close();
  });

  test('de status schuift mee en je kunt hem zelf verzetten', async () => {
    const { pagina } = await open();
    const eerste = pagina.waitForEvent('download');
    await pagina.click('#wb-factuur');
    await eerste;
    await pagina.waitForTimeout(200);
    assert.match(await pagina.textContent('#wb-bewaard'), /aanbetaald/);
    await pagina.click('.wb-status');
    await pagina.waitForTimeout(150);
    assert.match(await pagina.textContent('#wb-bewaard'), /gefactureerd/);
    await pagina.close();
  });

  test('je vindt een offerte terug op kenteken of naam', async () => {
    const { pagina } = await open();
    await pagina.click('#wb-bewaar');
    await pagina.waitForTimeout(150);
    await pagina.fill('#wb-zoek', '92DJHG');
    await pagina.waitForTimeout(150);
    assert.match(await pagina.textContent('#wb-bewaard'), /Mark de Vries/);
    await pagina.fill('#wb-zoek', 'Vries');
    await pagina.waitForTimeout(150);
    assert.match(await pagina.textContent('#wb-bewaard'), /Mark de Vries/);
    await pagina.fill('#wb-zoek', 'bestaatniet');
    await pagina.waitForTimeout(150);
    assert.match(await pagina.textContent('#wb-bewaard'), /0 van de 1/);
    await pagina.close();
  });

  test('Headroom gedraagt zich als een app op je beginscherm', async () => {
    const pagina = await browser.newPage(telefoon);
    await pagina.goto(paginaUrl('headroom'));
    const manifest = await pagina.evaluate(async () => {
      const link = document.querySelector('link[rel=manifest]');
      if (!link) return null;
      return (await fetch(link.href)).json();
    });
    assert.ok(manifest, 'er hangt geen app-bestand aan de pagina');
    // Twaalf tekens is het maximum dat Android onder een icoon toont.
    assert.equal(manifest.short_name, 'Headroom');
    assert.ok(manifest.short_name.length <= 12, 'Android kapt de naam af');
    assert.equal(manifest.display, 'standalone', 'hij opent met een adresbalk');
    assert.ok(manifest.start_url.endsWith('/headroom'), 'hij start op de verkeerde pagina');
    assert.ok(manifest.icons.length >= 2, 'te weinig iconen');
    await pagina.close();
  });

  test('de oude adressen komen allebei op Headroom uit', async () => {
    // Het icoon op Justus zijn beginscherm wijst nog naar een oud adres. Dat
    // mag niet op een foutmelding uitkomen. De app heeft er twee gehad.
    for (const oud of ['werkbak', 'deck']) {
      const pagina = await browser.newPage(telefoon);
      await pagina.goto(paginaUrl(oud));
      await pagina.waitForURL(/\/headroom$/, { timeout: 5000 });
      assert.ok(await pagina.isVisible('#wb-kenteken'), `/${oud} opent de app niet`);
      await pagina.close();
    }
  });

  test('op een laptop wordt het scherm gebruikt in plaats van verspild', async () => {
    // Justus werkt ook op de computer. Een kolom van 640 pixels midden op een
    // breed scherm is zonde van de ruimte.
    const pagina = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await pagina.goto(`${paginaUrl('headroom')}?tab=agenda`);
    await pagina.evaluate(() => document.fonts.ready);

    const kolommen = await pagina.evaluate(
      () => getComputedStyle(document.querySelector('.wb-veldrij')).gridTemplateColumns.split(' ').length
    );
    assert.equal(kolommen, 3, 'de velden staan niet met drie naast elkaar');

    const breed = await pagina.evaluate(
      () => document.querySelector('main').getBoundingClientRect().width
    );
    assert.ok(breed > 800, `de kolom is nog maar ${Math.round(breed)} pixels breed`);

    // En nog steeds niets dat opzij uitsteekt.
    const overloop = await pagina.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    );
    assert.equal(overloop, 0);
    await pagina.close();
  });

  test('alles past nog op 320 pixels', async () => {
    const pagina = await browser.newPage({ ...telefoon, viewport: { width: 320, height: 844 } });
    await pagina.goto(paginaUrl('headroom'));
    await pagina.evaluate(() => document.fonts.ready);
    await pagina.click('#wb-pakketten .wb-toevoeg >> nth=0');
    await pagina.fill('#wb-korting', '10%');
    await pagina.click('[data-factuur="eind"]');
    await pagina.click('#wb-bewaar');
    await pagina.waitForTimeout(200);
    const overloop = await pagina.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    );
    assert.equal(overloop, 0);
    await pagina.close();
  });
});

describe('instellingen uit een aangeleverd bestand', alsGebouwd, () => {
  const telefoon = { viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true };

  /** Een bestand zoals ik het aanlever: onderdelen plus een paar instellingen. */
  const LIJST = {
    catalogus: [{
      omschrijving: 'Testonderdeel', soort: 'overig', merk: 'Test',
      leverancier: 'Test', artikelnummer: 'T-1', inkoopCent: 1000, uren: 0, toebehoren: [],
    }],
    instellingen: { iban: 'NL84KNAB0776239147', tenaamstelling: 'Audio Upgrade Emmen' },
  };

  async function lees(pagina, bestand) {
    await pagina.setInputFiles('#wb-import', {
      name: 'lijst.json', mimeType: 'application/json',
      buffer: Buffer.from(JSON.stringify(bestand)),
    });
    await pagina.waitForTimeout(300);
  }

  test('een leeg rekeningnummer wordt ingevuld', async () => {
    const pagina = await browser.newPage(telefoon);
    pagina.on('dialog', (v) => v.accept());
    await pagina.goto(paginaUrl('headroom'));
    await pagina.click('[data-tab="catalogus"]');
    await lees(pagina, LIJST);
    await pagina.click('[data-tab="instellingen"]');
    assert.equal(await pagina.inputValue('#wb-i-iban'), 'NL84KNAB0776239147');
    assert.equal(await pagina.inputValue('#wb-i-tenaamstelling'), 'Audio Upgrade Emmen');
    await pagina.close();
  });

  test('maar wat je zelf hebt ingevuld blijft staan', async () => {
    /**
     * Dit is de hele reden dat het alleen lege velden vult. Een prijslijst die
     * je rekeningnummer of je uurtarief overschrijft is een stille fout die je
     * pas ziet als er een factuur de deur uit is.
     */
    const pagina = await browser.newPage(telefoon);
    pagina.on('dialog', (v) => v.accept());
    await pagina.goto(paginaUrl('headroom'));
    await pagina.click('[data-tab="instellingen"]');
    await pagina.fill('#wb-i-iban', 'NL00 EIGEN 0000 0000 00');
    await pagina.locator('#wb-i-iban').blur();
    await pagina.click('[data-tab="catalogus"]');
    await lees(pagina, LIJST);
    await pagina.click('[data-tab="instellingen"]');
    assert.equal(await pagina.inputValue('#wb-i-iban'), 'NL00 EIGEN 0000 0000 00');
    await pagina.close();
  });
});
