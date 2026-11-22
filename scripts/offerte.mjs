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
  herroepingPdf, herroepingBestandsnaam, hoortErBij,
} from '../src/lib/headroom/herroeping.js';
import {
  STANDAARD_INSTELLINGEN, geldigTot, totalen, aanbetaling, euro, naarCent,
  kortingNaarExcl, BTW_PCT,
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

  /**
   * Eigen apparatuur van de klant is een korting op het totaal, geen negatieve
   * regel: een regelprijs klemt op nul. De korting verschijnt als eigen regel
   * "Korting" op de pdf.
   *
   * HIER STOND EEN DELING DOOR 1,21, ALTIJD.
   *
   * Dat klopt bij een particulier, want die leest zijn bedragen inclusief
   * btw. Bij een bedrijf niet: dat leest ze exclusief, en dan haalde die
   * deling er nog een keer 21% af. Nagerekend op een zakelijke offerte met
   * 500,00 korting: er kwam € 413,22 op de pdf, € 86,78 te weinig. Met een
   * ingevuld `verwachtTotaalIncl` liep je dan tegen een melding aan die de
   * oorzaak niet noemde; zonder dat anker ging het verschil gewoon mee de
   * deur uit.
   *
   * Nu gaat het via kortingNaarExcl() uit rekenen.js — dezelfde functie die
   * de app gebruikt, die de maat van de klant kent en het btw-percentage uit
   * één bron haalt. En wie geen twijfel wil, schrijft `kortingExcl`.
   */
  const subtotaalExclCent = totalen(regels, STANDAARD_INSTELLINGEN, 0).exclCent;
  const kortingExclCent = invoer.kortingExcl != null
    ? Math.min(subtotaalExclCent, Math.max(0, naarCent(invoer.kortingExcl)))
    : kortingNaarExcl(invoer.kortingIncl, subtotaalExclCent, Boolean(invoer.zakelijk), BTW_PCT);

  /**
   * DE KORTING MOET ER OOK EXACT OP KOMEN.
   *
   * Voor een regel controleert dit script dat al: wijkt het bedrag op de pdf
   * een cent af van wat je hebt ingetikt, dan stopt het en stelt het een
   * splitsing voor. Voor de korting deed het dat niet, en die staat net zo
   * zichtbaar op de offerte.
   *
   * Hoe dat misgaat: een korting die je inclusief btw intikt wordt
   * teruggerekend naar exclusief, en op de pdf komt daar weer btw bij. Die
   * heen-en-terugweg valt niet altijd op hetzelfde bedrag uit. Nagerekend met
   * kortingen van vijf euro tot het offertetotaal: 55 van de 319 kwamen
   * anders op de offerte te staan — en daar zitten de allergewoonste
   * bedragen bij:
   *
   *   korting EUR 10,00  ->  op de offerte EUR 9,99
   *   korting EUR 100,00 ->  op de offerte EUR 99,99
   *   korting EUR 170,00 ->  op de offerte EUR 170,01
   *
   * Met 21% btw bestaat EUR 100,00 gewoon niet als korting: het dichtstbij
   * haalbare is EUR 99,99 of EUR 100,01. Daar is niets aan te rekenen, maar
   * je hoort het wel te weten voordat de offerte de deur uit gaat. Stond er
   * een `verwachtTotaalIncl` in het invulblad, dan liep je verderop tegen een
   * melding over het totaal aan die de oorzaak niet noemde; stond die er
   * niet, dan ging het verschil mee de deur uit.
   *
   * Een zakelijke klant leest zijn bedragen exclusief btw, en dan is er geen
   * heen-en-terugweg: die controle slaan we over. Net als bij een percentage,
   * want daar is geen bedrag afgesproken om aan vast te houden.
   */
  const kortingTekst = String(invoer.kortingIncl ?? '');
  if (invoer.kortingExcl == null && kortingTekst.trim() && !kortingTekst.includes('%') && !invoer.zakelijk) {
    const bedoeld = naarCent(kortingTekst);
    const subtotaalInclCent = totalen(regels, STANDAARD_INSTELLINGEN, 0).inclCent;
    /* Meer korting dan de offerte groot is wordt terecht afgetopt; dat is
       geen afrondingsverschil. */
    if (bedoeld > 0 && bedoeld <= subtotaalInclCent) {
      /* Wat er straks echt op de pdf komt te staan. */
      const opDeOfferte = (cent) => totalen(
        regels, STANDAARD_INSTELLINGEN,
        kortingNaarExcl(String(cent / 100).replace('.', ','), subtotaalExclCent, false, BTW_PCT)
      ).kortingInclCent;
      const komtUitOp = opDeOfferte(bedoeld);
      if (komtUitOp !== bedoeld) {
        /* De naaste bedragen die wél precies op de offerte komen. */
        const haalbaar = [];
        for (let stap = 1; stap <= 10 && !haalbaar.length; stap += 1) {
          for (const kandidaat of [bedoeld - stap, bedoeld + stap]) {
            if (kandidaat > 0 && kandidaat <= subtotaalInclCent && opDeOfferte(kandidaat) === kandidaat) {
              haalbaar.push(kandidaat);
            }
          }
        }
        throw new Error(
          `de korting van ${euroKort(bedoeld)} komt op de offerte uit op ${euroKort(komtUitOp)}.`
          + (haalbaar.length
            ? `\n  Met ${BTW_PCT}% btw bestaat dat bedrag niet als korting; neem ${haalbaar.map(euroKort).join(' of ')}.`
            : '\n  Kies een korting die een paar cent hoger of lager ligt.')
          + '\n  Of schrijf "kortingExcl" als je het bedrag zonder btw wilt vastzetten.'
        );
      }
    }
  }

  const offerte = {
    nummer: invoer.nummer,
    datum,
    geldigTot: geldigTot(datum, Number(invoer.geldigDagen) || STANDAARD_INSTELLINGEN.geldigDagen),
    zakelijk: Boolean(invoer.zakelijk),
    klant: invoer.klant || {},
    auto: invoer.auto || {},
    regels,
    kortingExclCent,
    /* Een ontbrekend veld geldt als "op afstand", net als in de app: bijna
       alles gaat per WhatsApp de deur uit. Stond hier Boolean(), en dan liet
       een vergeten regel de bedenktijd en het modelformulier stil wegvallen. */
    opAfstand: invoer.opAfstand !== false,
    startDirect: Boolean(invoer.startDirect),
    alleenWerk: Boolean(invoer.alleenWerk),
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
  const map = uit.replace(/\/$/, '');
  const bestand = invoer.bestand || pdfBestandsnaam(offerte);
  writeFileSync(`${map}/${bestand}`, Buffer.from(offertePdf(offerte, STANDAARD_INSTELLINGEN).naarBytes()));

  /* Het modelformulier hoort erbij bij een consument op afstand, en de offerte
     zegt op de voorkant dat het meegaat. De deelknop in de app deed dat al,
     dit script niet: dan verstuur je een offerte die iets belooft wat er niet
     bij zit, en juist die belofte is wat de wet van je vraagt. Eén bron voor
     de vraag of het erbij hoort: hoortErBij() uit herroeping.js, dezelfde die
     de app gebruikt. */
  let formulier = null;
  if (hoortErBij(offerte)) {
    formulier = herroepingBestandsnaam(offerte);
    writeFileSync(`${map}/${formulier}`, Buffer.from(herroepingPdf(offerte).naarBytes()));
  }

  const a = aanbetaling(offerte.regels, STANDAARD_INSTELLINGEN, Number(invoer.aanbetalingPct ?? 40), offerte.kortingExclCent);
  console.log(`${bestand}`);
  if (formulier) console.log(`${formulier}`);
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
