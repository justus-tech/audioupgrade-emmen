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
import { JURIDISCHE_PAGINAS } from '../src/data/juridisch.js';
import { PACKAGES, SITE, SCHEMA_SOORT } from '../src/data/site.js';
import { DEALERS } from '../src/data/dealers.js';
import { VRAGEN } from '../src/data/vragen.js';
import { OVER } from '../src/data/generiek.js';
import { REVIEWS } from '../src/data/reviews.js';
import { PADEN, padVan } from '../src/i18n/talen.js';
import { berichtOverAuto } from '../src/lib/whatsapp.js';

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

  test('de drie juridische pagina\'s staan er en zijn compleet', () => {
    // Zonder privacyverklaring voldoe je niet aan de AVG. Deze test is er
    // om te voorkomen dat ze ooit stilletjes verdwijnen.
    for (const doc of JURIDISCHE_PAGINAS) {
      const html = inhoud.get(`/${doc.slug}`);
      assert.ok(html, `ontbreekt: /${doc.slug}`);
      // Elk artikel moet ook echt op de pagina terechtkomen.
      for (const artikel of doc.artikelen) {
        assert.ok(html.includes(artikel.kop), `/${doc.slug}: "${artikel.kop}" ontbreekt`);
      }
    }
  });

  test('elke pagina linkt naar de juridische pagina\'s', () => {
    for (const [pad, html] of inhoud) {
      for (const doc of JURIDISCHE_PAGINAS) {
        assert.ok(html.includes(`href="/${doc.slug}"`), `${pad}: geen link naar /${doc.slug}`);
      }
    }
  });

  /**
   * De pagina voor autobedrijven.
   *
   * Die staat bewust niet in het menu — dat is voor de klant met een auto —
   * maar moet wel vanaf elke Nederlandse pagina te vinden zijn, en op de
   * Duitse en Engelse juist niet: het gaat over dealers in Drenthe.
   */
  test('de dealerpagina staat er en is vanaf elke Nederlandse pagina te vinden', () => {
    const adres = `/${DEALERS.slug}`;
    assert.ok(inhoud.has(adres), `ontbreekt: ${adres}`);

    for (const [pad, html] of inhoud) {
      const vertaald = pad === '/de' || pad === '/en' || pad.startsWith('/de/') || pad.startsWith('/en/');
      const linkt = html.includes(`href="${adres}"`);
      if (vertaald) {
        assert.equal(linkt, false, `${pad}: verwijst naar een Nederlandse pagina`);
      } else {
        assert.ok(linkt, `${pad}: geen link naar ${adres}`);
      }
    }
  });

  /**
   * Twee dingen die op deze pagina niet thuishoren, en allebei om een reden
   * die je pas merkt als het misgaat.
   *
   * Inkoopprijzen: die spreekt Justus per bedrijf af, en zijn particuliere
   * klanten kunnen deze pagina gewoon lezen. Staat er een handelsprijs op,
   * dan weet iedereen wat de marge is.
   *
   * Namen van autobedrijven: er is er nog geen een. Een logo of een "wij
   * werken samen met" is dan gewoon niet waar.
   */
  test('de dealerpagina noemt geen bedragen', () => {
    const html = inhoud.get(`/${DEALERS.slug}`);
    // Alleen in de eigenlijke tekst kijken: de gestructureerde gegevens en de
    // voettekst van de site staan er ook in.
    const tekst = (html.match(/<main[\s\S]*?<\/main>/) || [html])[0];
    assert.doesNotMatch(tekst, /€\s?\d/, 'er staat een bedrag op de dealerpagina');
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

  /**
   * Precies één h1 per pagina.
   *
   * De pagina /audio-upgrade had er nul: die begon met de kenteken-check en
   * daarna meteen een h2. Voor Google is de h1 de zin die vertelt waar de
   * pagina over gaat, en een schermlezer leest de koppen als inhoudsopgave —
   * die begon daar dus halverwege. Met het blote oog zie je het niet, want
   * een h2 ziet er ook uit als een kop.
   */
  test('elke pagina heeft precies één h1', () => {
    for (const [pad, html] of inhoud) {
      const aantal = (html.match(/<h1[\s>]/g) || []).length;
      assert.equal(aantal, 1, `${pad}: ${aantal} h1-koppen`);
    }
  });

  test('de koppen slaan geen niveau over', () => {
    for (const [pad, html] of inhoud) {
      const niveaus = [...html.matchAll(/<h([1-4])[\s>]/g)].map((m) => Number(m[1]));
      for (let i = 1; i < niveaus.length; i++) {
        assert.ok(
          niveaus[i] - niveaus[i - 1] <= 1,
          `${pad}: van h${niveaus[i - 1]} naar h${niveaus[i]}`
        );
      }
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
      assert.ok(
        html.includes(`"@type":"${SCHEMA_SOORT}"`),
        `${pad}: bedrijfsgegevens ontbreken`
      );
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

  /**
   * De vragenpagina is de enige plek waar hetzelfde antwoord twee keer in de
   * opgeleverde bestanden terechtkomt: één keer als leesbare tekst en één
   * keer in het FAQPage-blok voor Google. Lopen die uiteen, dan toont Google
   * iets anders dan er op je scherm staat — en dat is precies waar hij op
   * afrekent. Deze tests houden ze aan elkaar vast.
   */
  test('de vragenpagina toont elke vraag met zijn eigen antwoord', () => {
    const html = inhoud.get('/veelgestelde-vragen');
    assert.ok(html, 'de vragenpagina is niet gebouwd');

    /* Astro schrijft tekens als & en ' weg als &#38; en &#39;. Terugvertalen
       is betrouwbaarder dan raden hoe een zin er ontsnapt uitziet. */
    const leesbaar = html
      .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>');

    for (const v of VRAGEN) {
      assert.ok(leesbaar.includes(v.vraag), `vraag ontbreekt: ${v.vraag}`);
      assert.ok(leesbaar.includes(v.antwoord), `antwoord ontbreekt bij: ${v.vraag}`);
    }
  });

  test('het FAQPage-blok zegt exact hetzelfde als de pagina', () => {
    const html = inhoud.get('/veelgestelde-vragen');
    const blok = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
      .map((x) => JSON.parse(x[1]))
      .find((x) => x['@type'] === 'FAQPage');
    assert.ok(blok, 'geen FAQPage op de vragenpagina');
    assert.equal(blok.mainEntity.length, VRAGEN.length);
    blok.mainEntity.forEach((item, i) => {
      assert.equal(item.name, VRAGEN[i].vraag);
      assert.equal(item.acceptedAnswer.text, VRAGEN[i].antwoord);
    });
  });

  /**
   * De modelpagina's moeten van elkaar verschillen.
   *
   * Er stond op alle 150 pagina's dezelfde garantiealinea en dezelfde
   * slotoproep. Gemeten was daardoor maar 44% van de tekst eigen aan die ene
   * pagina; nu 65%. De rest is de prijslijst, en die ligt vast — die is woord
   * voor woord overgenomen van de oude site en mag niet veranderen.
   *
   * Zonder deze test glijdt dat zo terug: het is verleidelijk om een mooie
   * alinea één keer te schrijven en overal neer te zetten.
   */
  test('de garantietekst verschilt per model', () => {
    const teksten = MODELS.slice(0, 20).map((m) => {
      const html = inhoud.get(`/audio-upgrade/${m.slug}`);
      /* De h2 heeft attributen van Astro erop staan, dus [^>]* ertussen. */
      return /<h2[^>]*>Je fabrieksgarantie[^<]*<\/h2>\s*<p[^>]*>([^<]+)</.exec(html)?.[1];
    });
    assert.ok(teksten.every(Boolean), 'op een modelpagina ontbreekt de garantietekst');
    assert.equal(
      new Set(teksten).size,
      teksten.length,
      'twee modelpagina\'s delen woord voor woord dezelfde garantietekst'
    );
  });

  /**
   * Het blok over Justus staat op twee pagina's: kort op de homepage, volledig
   * op /over-ons. Dat mag, maar de teksten moeten dan wél van elkaar
   * verschillen — anders staat dezelfde alinea twee keer op de site en heeft
   * niemand een reden om door te klikken.
   */
  test('het korte en het volledige verhaal over Justus overlappen niet', () => {
    const home = inhoud.get('/');
    const overOns = inhoud.get('/over-ons');
    assert.ok(home && overOns, 'een van de twee pagina\'s ontbreekt');

    for (const regel of OVER.alineas) {
      assert.ok(!home.includes(regel), `deze alinea staat ook op de homepage: ${regel.slice(0, 50)}`);
    }
    for (const regel of OVER.kort) {
      assert.ok(home.includes(regel), `de korte tekst ontbreekt op de homepage: ${regel.slice(0, 50)}`);
      assert.ok(!overOns.includes(regel), `de korte tekst staat ook op /over-ons: ${regel.slice(0, 50)}`);
    }
    assert.ok(home.includes('Lees het hele verhaal'), 'de homepage linkt niet door');
  });

  /**
   * Zolang er geen reviews zijn, mag er nergens een leeg blok staan. Dit is
   * precies het soort ding dat je zelf niet ziet omdat je weet dat het er hoort
   * te staan: een kop "Wat klanten zeggen" met niets eronder, of een sectie
   * zonder inhoud die een gat van honderd pixels in de pagina slaat.
   */
  test('een leeg reviewblok komt nergens op de site', () => {
    if (REVIEWS.length > 0) return; // gevuld: dan hoort het er juist wél te staan
    for (const [pad, html] of inhoud) {
      assert.ok(!html.includes('Wat klanten zeggen'), `${pad}: lege reviewkop`);
      assert.ok(!html.includes('class="reviews"'), `${pad}: leeg reviewblok`);
    }
  });

  test('elke modelpagina wijst naar andere modellen van hetzelfde merk', () => {
    for (const m of MODELS) {
      const familie = MODELS.filter((x) => x.brand === m.brand && x.slug !== m.slug);
      if (familie.length === 0) continue; // een merk met één model: niets om heen te wijzen
      const html = inhoud.get(`/audio-upgrade/${m.slug}`);
      const wijst = familie.some((x) => html.includes(`/audio-upgrade/${x.slug}"`));
      assert.ok(wijst, `${m.slug}: geen link naar een ander ${m.brand}-model`);
    }
  });

  test('elke vraag is een vraag, en staat er maar één keer', () => {
    for (const v of VRAGEN) {
      assert.match(v.vraag, /\?$/, `mist een vraagteken: ${v.vraag}`);
      assert.ok(v.antwoord.trim().length > 40, `antwoord te kort bij: ${v.vraag}`);
    }
    const uniek = new Set(VRAGEN.map((v) => v.vraag.toLowerCase()));
    assert.equal(uniek.size, VRAGEN.length, 'er staat een dubbele vraag in');
  });
});

/**
 * De WhatsApp-knoppen.
 *
 * Elke knop hoort het bericht al ingevuld te hebben. Valt er ergens eentje
 * terug op de korte wa.me/message-link, dan komt die bezoeker in een leeg
 * gesprek terecht en weet Justus niet waar het over gaat — precies het
 * probleem dat we hiermee oplosten. Zo'n terugval zie je niet met het blote
 * oog, want de knop werkt gewoon.
 */
/**
 * Alles wat de bezoeker binnenhaalt, komt van deze site.
 *
 * De lettertypen stonden eerst bij Google. Daarmee ging het IP-adres van elke
 * bezoeker naar Google — terwijl in het cookiebeleid staat dat er geen
 * koppeling met Google is. Het is ook precies het soort regel dat er per
 * ongeluk weer in sluipt, want zo staat het in elk voorbeeld op internet.
 */
describe('niets van buiten de site', alsGebouwd, () => {
  /* Deze mogen wél: de bezoeker klikt er zelf op, of ze staan er bewust. */
  const TOEGESTAAN = [
    'wa.me',                        // de WhatsApp-knoppen
    'google.com/maps',              // de kaart, en pas ná een klik
    'opendata.rdw.nl',              // de kenteken-check, vanuit de browser
    'cloudflareinsights.com',       // de bezoekersteller
    'schema.org',                   // alleen een naam in de gegevens, geen verzoek
    'wikipedia.org',                // idem
    'w3.org',                       // de xmlns van elke SVG; er gaat niets heen
    'audioupgradeemmen.nl',         // wijzelf
  ];

  test('geen enkele pagina haalt lettertypen bij Google', () => {
    for (const [pad, html] of inhoud) {
      assert.ok(!html.includes('fonts.googleapis.com'), `${pad}: stylesheet bij Google`);
      assert.ok(!html.includes('fonts.gstatic.com'), `${pad}: lettertype bij Google`);
    }
  });

  test('elk adres van buiten staat op de lijst van toegestane', () => {
    /* Op het hele adres vergelijken en niet alleen op de domeinnaam: de kaart
       mag naar google.com/maps, maar google.com zonder meer niet. */
    for (const [pad, html] of inhoud) {
      for (const m of html.matchAll(/https?:\/\/[^"'\s)<>\\]+/gi)) {
        const adres = m[0].toLowerCase();
        assert.ok(
          TOEGESTAAN.some((t) => adres.includes(t)),
          `${pad}: onverwacht adres van buiten — ${adres.slice(0, 70)}`
        );
      }
    }
  });

  test('de lettertypen staan er ook echt', () => {
    for (const naam of ['inter-latin.woff2', 'oswald-latin.woff2']) {
      assert.ok(existsSync(join(DIST, 'fonts', naam)), `${naam} ontbreekt`);
    }
  });

  test('elke pagina begint met een overslaan-link naar de inhoud', () => {
    for (const [pad, html] of inhoud) {
      assert.ok(html.includes('class="overslaan"'), `${pad}: geen overslaan-link`);
      assert.ok(html.includes('id="inhoud"'), `${pad}: geen doel om heen te springen`);
    }
  });
});

/**
 * De drie talen.
 *
 * Het gevaarlijkste in een meertalige site is niet een verkeerde vertaling —
 * dat zie je. Het gevaarlijke is een taalknop die naar een pagina wijst die
 * in die taal niet bestaat, of een Duitse pagina die zich als Nederlands
 * aanmeldt bij Google. Beide zie je met het blote oog niet.
 */
describe('drie talen', alsGebouwd, () => {
  test('de Duitse en de Engelse pagina zijn gebouwd', () => {
    for (const p of ['/de', '/en']) {
      assert.ok(inhoud.get(p), `${p} ontbreekt`);
    }
  });

  test('elke pagina meldt zich aan in de juiste taal', () => {
    /* De taal volgt uit het pad: alles onder /de is Duits, alles onder /en
       Engels, de rest Nederlands. Zo hoeft deze test niet bijgewerkt te
       worden als er een pagina bijkomt. */
    const taalVan = (p) =>
      p === '/de' || p.startsWith('/de/') ? 'de-DE'
      : p === '/en' || p.startsWith('/en/') ? 'en'
      : 'nl-NL';

    for (const [pad, html] of inhoud) {
      const lang = /<html lang="([^"]+)"/.exec(html)?.[1];
      assert.equal(lang, taalVan(pad), `${pad}: lang=${lang}`);
    }
  });

  /**
   * Precies de fout die Justus zelf zag: de Duitse en Engelse pakketkaarten
   * hadden geen tekening, geen oranje kopregel en geen scorebalkjes. Oorzaak
   * was een tweede, vereenvoudigde kaart die alleen voor die twee talen
   * bestond. Er is er nu nog één (PackageCard.astro), en deze test houdt dat
   * zo: zodra er ergens weer een eigen kaart bijkomt, valt die door de mand
   * omdat een van deze onderdelen ontbreekt.
   */
  test('de vertaalde pakketkaarten zien er hetzelfde uit als de Nederlandse', () => {
    const paren = [
      ['/', '/de', '/en'],
      ['/upgrades', '/de/preise', '/en/pricing'],
    ];
    const tel = (html, patroon) => (html.match(patroon) ?? []).length;

    for (const [nl, ...vertaald] of paren) {
      const bron = inhoud.get(nl);
      assert.ok(bron, `${nl} ontbreekt`);
      const verwacht = {
        tekening: tel(bron, /class="beeld"/g),
        tagline: tel(bron, /class="tagline/g),
        label: tel(bron, /class="badge/g),
        scorebalk: tel(bron, /class="blokjes"/g),
      };
      /* Als het Nederlands zelf niets meer toont, meet deze test niets. */
      assert.ok(verwacht.tekening >= 4, `${nl}: maar ${verwacht.tekening} tekeningen`);
      assert.equal(verwacht.label, 1, `${nl}: het label hoort op precies één kaart`);

      for (const p of vertaald) {
        const html = inhoud.get(p);
        assert.ok(html, `${p} ontbreekt`);
        for (const [wat, aantal] of Object.entries(verwacht)) {
          const gevonden = tel(html, {
            tekening: /class="beeld"/g,
            tagline: /class="tagline/g,
            label: /class="badge/g,
            scorebalk: /class="blokjes"/g,
          }[wat]);
          assert.equal(gevonden, aantal, `${p}: ${gevonden}× ${wat}, ${nl} heeft er ${aantal}`);
        }
      }
    }
  });

  test('elke vertaalde pagina bestaat in beide talen', () => {
    for (const sleutel of Object.keys(PADEN)) {
      for (const taal of ['de', 'en']) {
        const p = padVan(sleutel, taal);
        assert.ok(inhoud.get(p), `${p} ontbreekt (${sleutel} in ${taal})`);
      }
    }
  });

  test('de taalknop wijst nooit naar een pagina die niet bestaat', () => {
    /* Precies de fout die hier ooit in zat: /upgrades stond als vertaald
       gemarkeerd terwijl /de/upgrades niet bestond. */
    const kapot = [];
    for (const [pad, html] of inhoud) {
      const kiezer = /<nav class="taalkiezer"[\s\S]*?<\/nav>/.exec(html)?.[0] ?? '';
      for (const m of kiezer.matchAll(/href="([^"]+)"/g)) {
        const doel = m[1].replace(/\/$/, '') || '/';
        if (!inhoud.has(doel)) kapot.push(`${pad} → ${m[1]}`);
      }
    }
    assert.deepEqual(kapot, []);
  });

  test('elke pagina noemt zijn tegenhangers in de andere talen', () => {
    for (const [pad, html] of inhoud) {
      if (html.includes('noindex')) continue; // de foutpagina hoort er niet bij
      for (const code of ['nl', 'de', 'en', 'x-default']) {
        assert.ok(
          html.includes(`rel="alternate" hreflang="${code}"`),
          `${pad}: geen hreflang voor ${code}`
        );
      }
    }
  });

  test('op de Duitse en Engelse pagina staat geen kenteken-veld', () => {
    /* De kenteken-check werkt op de open data van de RDW en kent alleen
       Nederlandse kentekens. Voor deze bezoekers zou het veld altijd "niet
       gevonden" zeggen. */
    for (const p of ['/de', '/en']) {
      assert.ok(!inhoud.get(p).includes('kenteken-input'), `${p}: kenteken-veld staat erop`);
    }
  });

  /**
   * Geen Nederlandse tekst op een vertaalde pagina.
   *
   * Dit gaat over wat de bezoeker ziet, dus scripts, stijlen en attributen
   * gaan er eerst uit. Zonder dat filter slaat de test alarm op dingen als
   * `id="akoestische-basis-grond"` (een SVG-kleurverloop) en de hreflang-link
   * naar /veelgestelde-vragen — allebei precies goed, allebei onzichtbaar.
   */
  test('op een vertaalde pagina staat geen Nederlandse tekst', () => {
    const NL = [
      'Vanaf', 'excl. btw', 'Uitsluitend', 'Stuur foto', 'Veelgestelde vragen',
      'Klaar in', 'Draadloze', 'Akoestische', 'Prijs op aanvraag',
      'Wie zijn wij', 'Fabriekssysteem', 'Naar de inhoud',
    ];

    for (const [pad, html] of inhoud) {
      if (!/^\/(de|en)(\/|$)/.test(pad)) continue;
      const zichtbaar = html
        .replace(/<script[\s\S]*?<\/script>/g, '')
        .replace(/<style[\s\S]*?<\/style>/g, '')
        .replace(/<[^>]+>/g, ' ');
      for (const woord of NL) {
        assert.ok(!zichtbaar.includes(woord), `${pad}: hier staat nog "${woord}"`);
      }
    }
  });
});

describe('WhatsApp-knoppen', alsGebouwd, () => {
  const links = (html) =>
    [...html.matchAll(/href="(https:\/\/wa\.me\/[^"]*)"/g)].map((m) =>
      m[1].replace(/&#38;/g, '&')
    );

  test('geen enkele knop gebruikt nog de korte link zonder bericht', () => {
    for (const [pad, html] of inhoud) {
      assert.ok(
        !html.includes('wa.me/message'),
        `${pad}: hier staat nog een WhatsApp-link zonder bericht`
      );
    }
  });

  test('elke knop heeft een bericht dat met de aanhef begint', () => {
    /* Drie aanhefjes, één per taal. Een Duitse bezoeker die op de knop tikt
       hoort geen Nederlands bericht in zijn WhatsApp te zien staan. */
    const aanhef = /^(Hoi|Hallo|Hi) Justus, /;
    for (const [pad, html] of inhoud) {
      for (const link of links(html)) {
        const tekst = new URL(link).searchParams.get('text');
        assert.ok(tekst, `${pad}: WhatsApp-link zonder bericht — ${link}`);
        assert.match(tekst, aanhef, `${pad}: bericht begint verkeerd`);
      }
    }
  });

  test('op een modelpagina staat de auto al in het bericht', () => {
    /* De zwevende knop en de link in de voettekst komen uit de layout. Die
       staan op élke pagina en kunnen het model dus niet weten; hun bericht is
       bewust algemeen. Alles wat de pagina zélf neerzet — de pakketkaarten en
       de knop onderaan — hoort de auto wel te noemen. */
    const algemeen = `Hoi Justus, ${berichtOverAuto()}`;

    for (const m of MODELS.slice(0, 25)) {
      const html = inhoud.get(`/audio-upgrade/${m.slug}`);
      const eigen = links(html)
        .map((l) => new URL(l).searchParams.get('text'))
        .filter((t) => t !== algemeen);

      assert.ok(eigen.length >= 2, `${m.slug}: te weinig eigen WhatsApp-knoppen`);
      assert.ok(
        eigen.every((t) => t.includes(m.model)),
        `${m.slug}: het model staat niet in elk eigen bericht`
      );
    }
  });
});

describe('vindbaar voor zoekmachines en AI-assistenten', alsGebouwd, () => {
  const lees = (naam) => readFileSync(join(DIST, naam), 'utf8');

  test('robots.txt bestaat en laat de AI-crawlers toe', () => {
    const robots = lees('robots.txt');
    // Sommige crawlers trekken zich terug als er geen regel over ze staat.
    for (const agent of ['GPTBot', 'OAI-SearchBot', 'ClaudeBot', 'PerplexityBot', 'Googlebot']) {
      assert.ok(robots.includes(`User-agent: ${agent}`), `${agent} staat er niet in`);
    }
    assert.ok(robots.includes(`Sitemap: ${SITE.url}/sitemap.xml`), 'de sitemap wordt niet genoemd');
  });

  /**
   * Het favicon: het rondje naast de naam in Google.
   *
   * Daar stond eerst een onherkenbaar donker rondje. Er was alleen een SVG
   * met een wit logo op een donker vlak, en /favicon.ico gaf een 404 —
   * precies het adres waar Google als eerste kijkt. Zie scripts/favicon.mjs.
   */
  test('het favicon bestaat in alle maten die Google en telefoons vragen', () => {
    /* De maat van een PNG staat altijd op byte 16 tot en met 23. */
    const pngMaat = (naam) => {
      const b = readFileSync(join(DIST, naam));
      return [b.readUInt32BE(16), b.readUInt32BE(20)];
    };

    // Google wil een veelvoud van 48 pixels; 192 is 4 × 48.
    assert.deepEqual(pngMaat('icon-192.png'), [192, 192]);
    // Het beginschermicoon van een iPhone is vierkant, 180 × 180.
    assert.deepEqual(pngMaat('apple-touch-icon.png'), [180, 180]);

    /* Een .ico begint met 0, 1 en dan het aantal plaatjes; per plaatje staat
       de breedte op een vaste plek. Er moet een van 48 bij zitten. */
    const ico = readFileSync(join(DIST, 'favicon.ico'));
    assert.equal(ico.readUInt16LE(0), 0, 'favicon.ico is geen icoonbestand');
    assert.equal(ico.readUInt16LE(2), 1, 'favicon.ico is geen icoonbestand');
    const maten = Array.from({ length: ico.readUInt16LE(4) }, (_, i) => ico.readUInt8(6 + 16 * i));
    assert.ok(maten.includes(48), `favicon.ico heeft geen 48 × 48, alleen ${maten.join(', ')}`);

    /* Zwart op wit, zoals Justus vroeg: een wit vlak eronder. */
    const svg = lees('favicon.svg');
    assert.match(svg, /<rect[^>]*fill="#ffffff"/, 'favicon.svg heeft geen witte ondergrond');
  });

  test('elke pagina wijst naar het favicon, en het aanraakicoon is vierkant', () => {
    for (const [pad, html] of inhoud) {
      assert.ok(html.includes('href="/favicon.ico"'), `${pad}: geen favicon.ico in de kop`);
      assert.ok(html.includes('href="/favicon.svg"'), `${pad}: geen favicon.svg in de kop`);
      const aanraak = /<link rel="apple-touch-icon" href="([^"]+)"/.exec(html)?.[1];
      assert.equal(aanraak, '/apple-touch-icon.png', `${pad}: aanraakicoon wijst naar ${aanraak}`);
    }
  });

  test('de foutpagina staat er, en blijft uit de zoekresultaten', () => {
    /* GitHub Pages toont /404.html bij elk onbekend adres. Die pagina moet er
       zijn — anders krijgt iemand die via Google op een oud Squarespace-adres
       landt een kale Engelse foutmelding van GitHub te zien. Zelf mag hij
       nooit in de zoekresultaten komen. */
    const html = lees('404.html');
    assert.match(html, /noindex/, 'de foutpagina mag niet indexeerbaar zijn');
    assert.ok(html.includes('kenteken'), 'op de foutpagina hoort de kenteken-check');
    assert.ok(!lees('sitemap.xml').includes('/404'), '404 hoort niet in de sitemap');
  });

  test('de sitemap bevat elke pagina die gevonden mag worden', () => {
    const sitemap = lees('sitemap.xml');
    for (const m of MODELS) {
      assert.ok(sitemap.includes(`${SITE.url}/audio-upgrade/${m.slug}<`), `mist ${m.slug}`);
    }
    for (const m of MERKEN_MET_MODELLEN) {
      assert.ok(sitemap.includes(`${SITE.url}/merk/${m.slug}<`), `mist merk ${m.slug}`);
    }
    for (const pad of ['/', '/upgrades', '/werkwijze', '/contact', '/audio-upgrade']) {
      assert.ok(sitemap.includes(`${SITE.url}${pad}<`), `mist ${pad}`);
    }
  });

  test('de sitemap bevat niets wat verboden is', () => {
    assert.ok(!lees('sitemap.xml').includes('/schetsen'));
  });

  test('elk adres in de sitemap bestaat ook echt', () => {
    const adressen = [...lees('sitemap.xml').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    assert.ok(adressen.length > 150, `maar ${adressen.length} adressen`);
    for (const adres of adressen) {
      const pad = adres.replace(SITE.url, '') || '/';
      assert.ok(inhoud.has(pad), `sitemap wijst naar ${pad}, die pagina bestaat niet`);
    }
  });

  test('llms.txt vertelt hetzelfde als de site', () => {
    const llms = lees('llms.txt');
    assert.ok(llms.startsWith('# Audio Upgrade Emmen'));
    // De prijzen moeten hier één op één kloppen met site.js. Lopen ze uiteen,
    // dan noemt een AI-assistent een bedrag dat de klant niet terugvindt.
    for (const p of PACKAGES) {
      assert.ok(llms.includes(p.name), `${p.name} ontbreekt`);
      assert.ok(llms.includes(p.price), `prijs van ${p.slug} klopt niet: ${p.price}`);
    }
    for (const veld of [SITE.street, SITE.city, SITE.phoneDisplay, SITE.email, SITE.kvk]) {
      assert.ok(llms.includes(veld), `${veld} ontbreekt`);
    }
  });

  test('llms.txt noemt elk merk waar we modellen van hebben', () => {
    const llms = lees('llms.txt');
    for (const m of MERKEN_MET_MODELLEN) {
      assert.ok(llms.includes(m.naam), `${m.naam} ontbreekt`);
    }
  });

  test('nergens een verzonnen beoordelingscijfer', () => {
    // Een aggregateRating opgeven zonder échte beoordelingen is in strijd met
    // de regels van Google en misleidt de klant. Zodra er echte recensies
    // zijn, mag dit erin — en dan moet deze test worden aangepast.
    for (const [pad, html] of inhoud) {
      assert.ok(!html.includes('aggregateRating'), `${pad} claimt een beoordeling`);
      assert.ok(!html.includes('"reviewCount"'), `${pad} claimt beoordelingen`);
    }
  });

  test('elke modelpagina heeft een kruimelpad en een dienstbeschrijving', () => {
    for (const m of MODELS.slice(0, 20)) {
      const html = inhoud.get(`/audio-upgrade/${m.slug}`);
      const blokken = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
        .map((x) => JSON.parse(x[1]));
      assert.ok(blokken.some((b) => b['@type'] === 'BreadcrumbList'), `${m.slug}: geen kruimelpad`);
      assert.ok(blokken.some((b) => b['@type'] === 'Service'), `${m.slug}: geen dienstbeschrijving`);
    }
  });

  test('de bedrijfsgegevens noemen prijzen in euro', () => {
    const html = inhoud.get('/');
    const bedrijf = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
      .map((x) => JSON.parse(x[1]))
      .find((b) => b['@type'] === SCHEMA_SOORT);
    assert.ok(bedrijf.makesOffer.length === PACKAGES.length);
    assert.equal(bedrijf.currenciesAccepted, 'EUR');
    assert.ok(bedrijf.priceRange);
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

  test('de klant wordt overal met "je" aangesproken, nooit met "u"', () => {
    /**
     * Op de oude site wisselde dat per pakket. Nu is het overal "je", en deze
     * test houdt dat zo.
     *
     * ALLEEN OP DE NEDERLANDSE PAGINA'S. In het Duits is "Sie" juist de norm
     * tussen vreemden; daar zou tutoyeren vertrouwen kósten. En de regex
     * struikelde over Duits: in "Außenhaut" valt de ß buiten het letterbereik
     * à-ÿ, dus las hij de "u" ervoor als los woord.
     */
    const uVorm = /(^|[^a-zà-ÿ])(uw|u)([^a-zà-ÿ])/;
    const fouten = [];
    for (const [pad, html] of inhoud) {
      if (/^\/(de|en)(\/|$)/.test(pad)) continue;
      const zichtbaar = html
        .replace(/<script[\s\S]*?<\/script>/g, ' ')
        .replace(/<style[\s\S]*?<\/style>/g, ' ')
        .replace(/<[^>]+>/g, ' ');
      const treffer = zichtbaar.match(uVorm);
      if (treffer) fouten.push(`${pad}: "...${treffer[0].trim()}..."`);
    }
    assert.deepEqual(fouten, []);
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

  test('ook doorverwijzingen in het script lopen via pad()', () => {
    // De kenteken-check stuurt de bezoeker met JavaScript door. Zonder pad()
    // kwam hij op de voorbeeldsite op een pagina van GitHub terecht in plaats
    // van op zijn eigen auto — de links in de HTML waren wél goed, maar deze
    // niet, en dat zie je aan de bron niet.
    const bronMap = fileURLToPath(new URL('../src/', import.meta.url));
    const overtreders = [];

    const loop = (map) => {
      for (const naam of readdirSync(map)) {
        const p = join(map, naam);
        if (statSync(p).isDirectory()) { loop(p); continue; }
        if (!/\.(astro|js)$/.test(naam) || p.includes(`lib${sep}pad.js`)) continue;
        // Goed is pad("/...") of basisPad + "/..."; fout is een kaal "/...".
        for (const m of readFileSync(p, 'utf8').matchAll(
          /location(?:\.href)?\s*=\s*(?!pad\(|basisPad)['"`]?\/[a-z]/gi
        )) {
          overtreders.push(`${relative(bronMap, p)}: ${m[0].trim()}`);
        }
      }
    };
    loop(bronMap);
    assert.deepEqual(overtreders, [], 'gebruik location.href = pad("/...")');
  });

  test('interne links lopen via pad(), niet als kaal adres', () => {
    // Op de voorbeeldsite staat de site in een map. Een link die "/upgrades"
    // zegt komt daar op de wortel van github.io terecht en geeft een
    // foutmelding. pad() zet de mapnaam ervoor. Deze test vangt het als er
    // ooit weer een kaal adres in de bron sluipt.
    const bronMap = fileURLToPath(new URL('../src/', import.meta.url));
    const overtreders = [];

    const loop = (map) => {
      for (const naam of readdirSync(map)) {
        const p = join(map, naam);
        if (statSync(p).isDirectory()) { loop(p); continue; }
        if (!naam.endsWith('.astro')) continue;
        const tekst = readFileSync(p, 'utf8');
        for (const m of tekst.matchAll(/href=(?:"|\{`)(\/[^"`{}]*)/g)) {
          overtreders.push(`${relative(bronMap, p)}: href="${m[1]}"`);
        }
      }
    };
    loop(bronMap);
    assert.deepEqual(overtreders, [], 'gebruik href={pad("/...")}');
  });

  test('de kleuren komen uit brand.js en niet uit losse hexcodes', () => {
    // Uitzondering: de kentekenplaat en het logo. Dat zijn nagebootste
    // voorwerpen (geborsteld aluminium), geen vlakken van de site.
    const uitzonderingen = [
      'Kentekenplaat.astro', 'Logo.astro', 'audio-upgrade' + sep + '[slug].astro',
      'brand.js', 'kleuren.js', 'global.css', 'Golflijn.astro',
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
