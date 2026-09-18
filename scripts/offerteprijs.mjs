#!/usr/bin/env node
/**
 * OFFERTEPRIJS — het rekenhulpje naast de offertegenerator.
 *
 * Je geeft het de onderdelen en de uren, en het geeft je het bedrag dat er op
 * de offerte mag staan. Het toetst altijd allebei de ondergrenzen, dus je kunt
 * er niet meer eentje vergeten.
 *
 * VOORBEELDEN
 *
 *   Wat mag deze klus kosten?
 *     node scripts/offerteprijs.mjs --uren 8 pico6-8 gs10-slim kabelset-dsp
 *
 *   Mag dit bedrag zo de deur uit?
 *     node scripts/offerteprijs.mjs --uren 8 --prijs 1595 pico6-8 gs10-slim kabelset-dsp
 *
 *   Een onderdeel dat nog niet in de lijst staat, direct van de prijslijst:
 *     node scripts/offerteprijs.mjs --uren 6 gladen:449 mosconi:729 vast:60
 *
 *   Alles wat er in de lijst staat:
 *     node scripts/offerteprijs.mjs --lijst
 *
 *   Nakijken of de rekenhulp nog dezelfde uitkomsten geeft als de rekenbasis:
 *     node scripts/offerteprijs.mjs --controle
 *
 * WAAR DE BEDRAGEN VANDAAN KOMEN
 * Niet uit deze map. Inkoopprijzen, kortingen, het uurtarief en de marge-eis
 * staan in `prijsinstellingen.json`, en dat bestand gaat niet mee naar GitHub —
 * deze map staat openbaar. `prijsinstellingen.voorbeeld.json` laat zien hoe het
 * eruitziet, met verzonnen bedragen.
 */
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import {
  inkoopUitLijst, ondergrenzen, prijsvoorstel, toets, netteprijsBoven, euroKort,
} from '../src/lib/headroom/prijsbepaling.js';

const WORTEL = fileURLToPath(new URL('../', import.meta.url));

/* ------------------------------------------------------------------ *
 * De invoer van de opdrachtregel
 * ------------------------------------------------------------------ */

const argumenten = process.argv.slice(2);
const vlag = (naam) => {
  const i = argumenten.indexOf(`--${naam}`);
  return i === -1 ? null : argumenten[i + 1] ?? '';
};
const heeft = (naam) => argumenten.includes(`--${naam}`);

/** "1.245,50", "1245.5" en "1245" leveren allemaal het juiste aantal centen. */
function naarCent(tekst) {
  let t = String(tekst ?? '').replace(/[^0-9,.-]/g, '').trim();
  if (!t) return 0;
  const komma = t.lastIndexOf(',');
  const punt = t.lastIndexOf('.');
  if (komma > punt) t = t.replace(/\./g, '').replace(',', '.');
  else t = t.replace(/,/g, '');
  const n = Number(t);
  return Number.isFinite(n) ? Math.round(n * 100) : 0;
}

function instellingen() {
  const eigen = vlag('instellingen')
    || process.env.OFFERTEPRIJS_INSTELLINGEN
    || `${WORTEL}prijsinstellingen.json`;
  const voorbeeld = `${WORTEL}prijsinstellingen.voorbeeld.json`;
  const pad = existsSync(eigen) ? eigen : voorbeeld;
  if (pad === voorbeeld) {
    console.log('Let op: er is geen prijsinstellingen.json, dus dit rekent met de');
    console.log('verzonnen bedragen uit het voorbeeldbestand. De uitkomst klopt niet.\n');
  }
  return { ...JSON.parse(readFileSync(pad, 'utf8')), pad };
}

/* ------------------------------------------------------------------ *
 * Van een lijstje namen naar een stuklijst met inkoopprijzen
 * ------------------------------------------------------------------ */

/**
 * Een post is of een naam uit de catalogus ("pico6-8"), of een bedrag recht
 * van de prijslijst met het merk ervoor ("gladen:449"). Achter allebei mag een
 * aantal: "aero-butyl x2" schrijf je als "aero-butyl:2" — maar omdat een merk
 * ook met een dubbele punt werkt, is het aantal een eigen achtervoegsel: "*2".
 */
function leesPost(tekst, inst) {
  const [kern, aantalTekst] = String(tekst).split('*');
  const aantal = Math.max(1, Math.round(Number(aantalTekst) || 1));

  if (kern.includes(':')) {
    const [merk, bedrag] = kern.split(':');
    const regel = inst.inkoopregels[merk];
    if (!regel) {
      throw new Error(`onbekend merk "${merk}" — kies uit: ${Object.keys(inst.inkoopregels).join(', ')}`);
    }
    const lijstCent = naarCent(bedrag);
    return {
      naam: `${regel.naam} ${euroKort(lijstCent)} van de lijst`,
      merk, regel, lijstCent, aantal,
      inkoopCent: inkoopUitLijst(regel, lijstCent) * aantal,
    };
  }

  const artikel = inst.catalogus[kern];
  if (!artikel) {
    throw new Error(`"${kern}" staat niet in de lijst — bekijk hem met --lijst, of geef het bedrag als merk:bedrag`);
  }
  const regel = inst.inkoopregels[artikel.merk];
  if (!regel) throw new Error(`"${kern}" verwijst naar het onbekende merk "${artikel.merk}"`);
  return {
    naam: artikel.naam,
    merk: artikel.merk, regel, lijstCent: artikel.lijstCent, aantal,
    inkoopCent: inkoopUitLijst(regel, artikel.lijstCent) * aantal,
  };
}

function stuklijstVan(namen, inst) {
  const posten = namen.map((n) => leesPost(n, inst));
  return { posten, inkoopCent: posten.reduce((s, p) => s + p.inkoopCent, 0) };
}

/* ------------------------------------------------------------------ *
 * Wat er op het scherm komt
 * ------------------------------------------------------------------ */

const pct = (n) => `${n.toFixed(1)}%`;

function toonStuklijst(posten, inkoopCent) {
  console.log('Stuklijst');
  for (const p of posten) {
    const maal = p.aantal > 1 ? ` (${p.aantal}x)` : '';
    const naam = `  ${p.naam}${maal}`;
    console.log((naam.length > 50 ? `${naam.slice(0, 49)}\u2026` : naam).padEnd(52) + euroKort(p.inkoopCent).padStart(12));
  }
  console.log('  '.padEnd(52, ' ') + ''.padStart(12, '-'));
  console.log('  inkoop totaal, exclusief btw'.padEnd(52) + euroKort(inkoopCent).padStart(12));
  console.log('');
}

function toonGrenzen(g, inst) {
  console.log('Ondergrenzen');
  console.log(`  uurtarief (${euroKort(inst.uurtariefCent)} x ${g.uren} uur)`.padEnd(52) + euroKort(g.uurgrensCent).padStart(12));
  console.log(`  marge-eis (${inst.margeEisPct}% van het bedrag incl. btw)`.padEnd(52) + euroKort(g.margegrensCent).padStart(12));
  console.log(`  bindend is: het ${g.bindend}`.padEnd(52) + euroKort(g.ondergrensCent).padStart(12));
  console.log(`  streven: ${inst.margeStreefPct}% marge (geen eis)`.padEnd(52) + euroKort(g.streefCent).padStart(12));
  console.log('');
}

function toonToets(t, kop) {
  console.log(kop.padEnd(52) + euroKort(t.prijsCent).padStart(12));
  console.log(`  winst`.padEnd(52) + `${euroKort(t.winstCent)}`.padStart(12));
  console.log(`  winst in procenten van het bedrag incl. btw`.padEnd(52) + pct(t.margePct).padStart(12));
  console.log(`  apparatuur als deel van het bedrag`.padEnd(52) + pct(t.apparaatAandeelPct).padStart(12));
  if (t.perUurCent != null) {
    console.log(`  blijft over per werkuur`.padEnd(52) + euroKort(t.perUurCent).padStart(12));
  }
  if (t.waarschuwingen.length) {
    console.log('');
    for (const w of t.waarschuwingen) console.log(`  LET OP: ${w}`);
  }
  console.log('');
}

/* ------------------------------------------------------------------ *
 * De drie dingen die dit script kan
 * ------------------------------------------------------------------ */

function toonCatalogus(inst) {
  console.log(`Prijslijst uit ${inst.pad}\n`);
  for (const [merk, regel] of Object.entries(inst.inkoopregels)) {
    const artikelen = Object.entries(inst.catalogus).filter(([, a]) => a.merk === merk);
    if (!artikelen.length) continue;
    console.log(`${regel.naam} — ${regel.toelichting || `lijst / ${regel.deelDoor} x ${regel.maal}`}`);
    for (const [id, a] of artikelen) {
      console.log(`  ${id.padEnd(22)} ${a.naam.padEnd(44)} ${euroKort(inkoopUitLijst(regel, a.lijstCent)).padStart(11)}`);
    }
    console.log('');
  }
}

/**
 * De controle: dezelfde som nog een keer over de offertes die al de deur uit
 * zijn. Wijkt er iets af, dan is of de rekenhulp veranderd of de prijslijst —
 * en dan wil je dat weten voordat je er een nieuwe offerte mee maakt.
 */
function controle(inst) {
  const marge = 5; // vijf cent speling: de rekenbasis is met de hand opgeteld
  let fout = 0;
  console.log('Controle op de offertes die al verstuurd zijn\n');
  console.log('nummer    klant                     inkoop      winst%   per uur   ondergrens  uitkomst');
  for (const g of inst.controle || []) {
    const { inkoopCent } = stuklijstVan(g.stuklijst, inst);
    const t = toets({
      prijsCent: g.prijsCent, inkoopCent, uren: g.uren,
      uurtariefCent: inst.uurtariefCent, btwPct: inst.btwPct,
      margeEisPct: inst.margeEisPct, margeStreefPct: inst.margeStreefPct,
    });
    const afwijkingen = [];
    if (Math.abs(inkoopCent - g.verwacht.inkoopCent) > marge) {
      afwijkingen.push(`inkoop ${euroKort(inkoopCent)} i.p.v. ${euroKort(g.verwacht.inkoopCent)}`);
    }
    if (Math.abs(t.margePct - g.verwacht.margePct) > 0.15) {
      afwijkingen.push(`winst ${pct(t.margePct)} i.p.v. ${pct(g.verwacht.margePct)}`);
    }
    if (g.verwacht.perUurCent != null && Math.abs(t.perUurCent - g.verwacht.perUurCent) > marge) {
      afwijkingen.push(`per uur ${euroKort(t.perUurCent)} i.p.v. ${euroKort(g.verwacht.perUurCent)}`);
    }
    if (g.verwacht.ondergrensCent != null && Math.abs(t.ondergrensCent - g.verwacht.ondergrensCent) > 500) {
      afwijkingen.push(`ondergrens ${euroKort(t.ondergrensCent)} i.p.v. ${euroKort(g.verwacht.ondergrensCent)}`);
    }
    if (afwijkingen.length) fout += 1;
    console.log(
      `${(g.nummer || '').padEnd(10)}${(g.klant || '').padEnd(24)}` +
      `${euroKort(inkoopCent).padStart(11)}${pct(t.margePct).padStart(10)}` +
      `${(t.perUurCent == null ? '-' : euroKort(t.perUurCent)).padStart(10)}` +
      `${euroKort(t.ondergrensCent).padStart(13)}  ` +
      (afwijkingen.length ? `AFWIJKING: ${afwijkingen.join('; ')}` : 'gelijk')
    );
  }
  console.log('');
  if (fout) {
    console.log(`${fout} van de ${inst.controle.length} wijken af van de rekenbasis. Zoek dat eerst uit.`);
    process.exitCode = 1;
  } else {
    console.log(`Alle ${(inst.controle || []).length} komen uit op dezelfde bedragen als de rekenbasis.`);
  }
}

function main() {
  const inst = instellingen();

  if (heeft('lijst')) return toonCatalogus(inst);
  if (heeft('controle')) return controle(inst);

  const namen = argumenten.filter((a, i) => !a.startsWith('--') && !String(argumenten[i - 1] || '').startsWith('--'));
  if (!namen.length) {
    console.log(readFileSync(fileURLToPath(import.meta.url), 'utf8').split('*/')[0].replace(/^.*?\n \*/s, ' *'));
    return;
  }

  const uren = Number(vlag('uren') || 0);
  if (!uren) console.log('Let op: geen --uren opgegeven, dus alleen de marge-eis wordt getoetst.\n');

  const { posten, inkoopCent } = stuklijstVan(namen, inst);
  const gemeen = {
    inkoopCent, uren,
    uurtariefCent: inst.uurtariefCent, btwPct: inst.btwPct,
    margeEisPct: inst.margeEisPct, margeStreefPct: inst.margeStreefPct,
  };

  toonStuklijst(posten, inkoopCent);
  toonGrenzen(ondergrenzen(gemeen), inst);

  const opgegeven = vlag('prijs');
  if (opgegeven != null && opgegeven !== '') {
    toonToets(toets({ ...gemeen, prijsCent: naarCent(opgegeven) }), 'Dit bedrag');
    const v = prijsvoorstel(gemeen);
    if (naarCent(opgegeven) < v.ondergrensCent) {
      console.log(`Het eerstvolgende bedrag in jouw prijsvorm dat het wel haalt: ${euroKort(v.prijsCent)}.`);
    }
    return;
  }

  const v = prijsvoorstel(gemeen);
  toonToets(v.voorstel, 'Voorstel');
  if (v.krap && v.tekortCent > 0) {
    console.log(`Het nette bedrag eronder, ${euroKort(v.krapCent)}, zit er maar ${euroKort(v.tekortCent)} onder:`);
    console.log(`${pct(v.krap.margePct)} winst en ${euroKort(v.krap.perUurCent)} per uur. Dat mag, als je het weet.`);
    console.log('');
  }
  console.log('De uren zijn een aanname. Ze bepalen de ondergrens net zo hard als de inkoop,');
  console.log('dus noem ze erbij als je dit bedrag voorlegt.');
}

try {
  main();
} catch (fout) {
  console.error(`\nFout: ${fout.message}\n`);
  process.exitCode = 1;
}
