#!/usr/bin/env node
/**
 * OFFERTE — van een invulblad naar een verstuurbare pdf.
 *
 * Tot nu toe kreeg elke klant zijn eigen scriptje, met de bedragen exclusief
 * btw erin uitgerekend. Dat is precies waar het misgaat: de site en de klant
 * denken in bedragen INCLUSIEF btw, de generator rekent exclusief, en tussen
 * die twee valt een cent weg die de klant wel ziet staan.
 *
 * Dit script draait het om. Je schrijft één bestandje met de bedragen zoals de
 * klant ze leest, en het script doet de rest:
 *
 *   - het rekent elk bedrag netjes terug naar exclusief btw;
 *   - het weigert een bedrag dat door de afronding een cent verschuift, en
 *     stelt meteen een splitsing over twee regels voor;
 *   - het zet de aanbetalingszin met de echte bedragen erin;
 *   - het controleert dat het totaal is wat jij verwacht;
 *   - het geeft de pdf de naam met het offertenummer en het kenteken erin.
 *
 * GEBRUIK
 *
 *   node scripts/offerte.mjs --invoer offerte-tonnie.json
 *   node scripts/offerte.mjs --invoer offerte-tonnie.json --uit /mnt/project-files/offertes
 *
 * Hoe zo'n invoerbestand eruitziet staat in `offerte.voorbeeld.json`.
 */
import { writeFileSync, readFileSync, existsSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { offertePdf, pdfBestandsnaam } from '../src/lib/headroom/offerte-pdf.js';
import {
  STANDAARD_INSTELLINGEN, geldigTot, totalen, aanbetaling, euro, naarCent,
} from '../src/lib/headroom/rekenen.js';
import { btwTerugrekenen, splitsExact, euroKort } from '../src/lib/headroom/prijsbepaling.js';

const WORTEL = fileURLToPath(new URL('../', import.meta.url));

const argumenten = process.argv.slice(2);
const vlag = (naam) => {
  const i = argumenten.indexOf(`--${naam}`);
  return i === -1 ? null : argumenten[i + 1] ?? '';
};

/* Bedragen lezen we met naarCent() uit rekenen.js, zodat "1.234,56",
   "1234.56" en "EUR 895,-" hier hetzelfde betekenen als in de app zelf. */
export { naarCent };

/**
 * EEN REGEL OMREKENEN — van wat de klant leest naar wat de app wil.
 *
 * Een regel geef je met `incl` (wat de klant betaalt) of, als je het al hebt
 * uitgerekend, met `excl`. Bij `incl` controleren we of het bedrag exact terug
 * te maken is. Zo niet, dan stopt het script hier: een offerte waarop
 * EUR 1.245,01 staat terwijl jij EUR 1.245,- hebt afgesproken, is een
 * telefoontje waard, en het is met een splitsing zo opgelost.
 */
export function regelUit(regel, nr) {
  const basis = {
    omschrijving: regel.omschrijving || 'Werkzaamheden',
    toelichting: regel.toelichting || '',
    aantal: Math.max(1, Math.round(Number(regel.aantal) || 1)),
  };

  if (regel.excl != null) return { ...basis, vastExclCent: naarCent(regel.excl) };

  const inclCent = naarCent(regel.incl);
  if (!inclCent) throw new Error(`regel ${nr} ("${basis.omschrijving}") heeft geen bedrag: geef "incl" of "excl"`);

  const controle = btwTerugrekenen(inclCent);
  if (!controle.exact) {
    const split = splitsExact(inclCent);
    const tip = split
      ? `\n  Splits hem over twee regels die de klant los begrijpt, bijvoorbeeld ${euroKort(split[0])} en ${euroKort(split[1])}.`
      : '\n  Kies een bedrag dat een paar euro hoger of lager ligt.';
    throw new Error(
      `regel ${nr} ("${basis.omschrijving}") van ${euroKort(inclCent)} komt op de pdf uit op ` +
      `${euroKort(controle.terugCent)}.${tip}\n  Gebruik hiervoor nooit een korting van een cent: die ` +
      'verschijnt zichtbaar als regel "Korting" op de offerte.'
    );
  }
  return { ...basis, vastExclCent: controle.exclCent };
}

export function bouwOfferte(invoer) {
  const datum = invoer.datum ? new Date(invoer.datum) : new Date();
  if (Number.isNaN(datum.getTime())) throw new Error(`"${invoer.datum}" is geen datum; schrijf hem als 2026-09-18`);

  if (!invoer.nummer) throw new Error('geef een "nummer", bijvoorbeeld "2026-144"');
  if (/^2026-0\d\d$/.test(invoer.nummer)) {
    throw new Error(`"${invoer.nummer}" is een laag nummer; dat leest als je eerste offerte van het jaar`);
  }

  const regels = (invoer.regels || []).map(regelUit);
  if (!regels.length) throw new Error('een offerte zonder regels bestaat niet');

  /* Eigen apparatuur van de klant is een korting op het totaal, geen negatieve
     regel: een regelprijs klemt op nul. De korting verschijnt als eigen regel
     "Korting" op de pdf. */
  const kortingInclCent = naarCent(invoer.kortingIncl);
  const kortingExclCent = kortingInclCent ? Math.round(kortingInclCent / 1.21) : 0;

  const offerte = {
    nummer: invoer.nummer,
    datum,
    geldigTot: geldigTot(datum, Number(invoer.geldigDagen) || STANDAARD_INSTELLINGEN.geldigDagen),
    zakelijk: Boolean(invoer.zakelijk),
    klant: invoer.klant || {},
    auto: invoer.auto || {},
    regels,
    kortingExclCent,
    opAfstand: Boolean(invoer.opAfstand),
    startDirect: Boolean(invoer.startDirect),
    voorwaardenBijlage: invoer.voorwaardenBijlage !== false,
  };

  /* De aanbetalingszin hoort in `opmerking`, want dat is het enige vrije veld
     dat op de offerte belandt. Het bedrag moet er concreet in staan: alleen een
     percentage laat de klant zelf rekenen, en dan rekent hij het verkeerd. */
  const pct = Number(invoer.aanbetalingPct ?? 40);
  if (pct > 50) throw new Error(`een aanbetaling van ${pct}% mag niet: bij een consument is de helft het wettelijke maximum`);
  const stukken = [];
  if (pct > 0) {
    const a = aanbetaling(offerte.regels, STANDAARD_INSTELLINGEN, pct, kortingExclCent);
    stukken.push(
      `Bij akkoord vragen we ${pct}% aanbetaling, dat is ${euro(a.inclCent)}. ` +
      `Het restant van ${euro(a.restInclCent)} betaal je bij oplevering.`
    );
  }
  if (invoer.opmerking) stukken.push(invoer.opmerking);
  offerte.opmerking = stukken.join(' ');

  return offerte;
}

function main() {
  const pad = vlag('invoer');
  if (!pad) {
    console.log(readFileSync(fileURLToPath(import.meta.url), 'utf8').split('*/')[0].replace(/^.*?\n \*/s, ' *'));
    return;
  }
  if (!existsSync(pad)) throw new Error(`het invoerbestand "${pad}" bestaat niet`);

  const invoer = JSON.parse(readFileSync(pad, 'utf8'));
  const offerte = bouwOfferte(invoer);
  const t = totalen(offerte.regels, STANDAARD_INSTELLINGEN, offerte.kortingExclCent);

  /* De laatste controle: is dit het bedrag dat je met de klant hebt
     afgesproken? Zonder dit anker kan een typefout in een regel ongemerkt de
     hele offerte verschuiven. */
  if (invoer.verwachtTotaalIncl != null) {
    const verwacht = naarCent(invoer.verwachtTotaalIncl);
    if (t.inclCent !== verwacht) {
      throw new Error(`het totaal komt uit op ${euroKort(t.inclCent)} en niet op ${euroKort(verwacht)}`);
    }
  } else {
    console.log('Let op: geen "verwachtTotaalIncl" opgegeven, dus het totaal wordt niet gecontroleerd.\n');
  }

  const uit = vlag('uit') || invoer.uit || WORTEL;
  const bestand = invoer.bestand || pdfBestandsnaam(offerte);
  writeFileSync(`${uit.replace(/\/$/, '')}/${bestand}`, Buffer.from(offertePdf(offerte, STANDAARD_INSTELLINGEN).naarBytes()));

  const a = aanbetaling(offerte.regels, STANDAARD_INSTELLINGEN, Number(invoer.aanbetalingPct ?? 40), offerte.kortingExclCent);
  console.log(`${bestand}`);
  console.log(`  offerte      ${offerte.nummer}`);
  console.log(`  totaal       ${euro(t.inclCent)} incl. btw`);
  if (offerte.kortingExclCent) console.log(`  korting      ${euro(t.kortingInclCent)} incl. btw`);
  console.log(`  aanbetaling  ${euro(a.inclCent)}, restant ${euro(a.restInclCent)}`);
  console.log(`  geldig tot   ${offerte.geldigTot.toLocaleDateString('nl-NL')}`);
  console.log(`  regels       ${offerte.regels.length}`);
}

/* Alleen draaien als je dit bestand zelf aanroept. Zo kunnen de tests de
   functies hierboven gewoon importeren zonder dat er een pdf uit rolt. */
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    main();
  } catch (fout) {
    console.error(`\nFout: ${fout.message}\n`);
    process.exitCode = 1;
  }
}
