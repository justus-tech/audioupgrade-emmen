#!/usr/bin/env node
/**
 * WHATSAPP-BERICHTEN OPHALEN — van de ontvanger naar één gesprek per klant.
 *
 * De ontvanger (map whatsapp-ontvanger/) vangt klantberichten op. Dit script
 * haalt op wat er sinds de vorige keer is binnengekomen en zet het per klant
 * onder elkaar in een tekstbestand, in dezelfde vorm als een WhatsApp-export:
 *
 *   [28-09-2026 09:14] Tonnie: Kan de sub ook onder de kofferbakmat?
 *   [28-09-2026 09:20] Justus: Ja, dat kan. Ik pas de offerte aan.
 *
 * Zo kan Claude er precies mee werken zoals met een export die jij stuurt.
 *
 * GEBRUIK
 *
 *   npm run whatsapp
 *   npm run whatsapp -- --map /mnt/project-files/whatsapp
 *
 * Nodig in de omgeving (nooit in deze map, die is openbaar):
 *   WHATSAPP_ADRES          bv. https://aue-whatsapp.<jouw-naam>.workers.dev
 *   WHATSAPP_OPHAALSLEUTEL  dezelfde als OPHAAL_SLEUTEL bij Cloudflare
 *
 * In de map komt:
 *   gesprekken/<nummer>.md   het gesprek met die klant, nieuwe berichten onderaan
 *   stand.json               tot waar we de vorige keer zijn gekomen
 *
 * BEWAARTERMIJN
 * De ontvanger wist berichten na 90 dagen, en deze kopieën moeten dat ook.
 * Anders klopt de termijn in de privacyverklaring niet. Daarom haalt elke
 * ophaalronde oudere regels uit de gesprekken, en een gesprek waar niets meer
 * in staat wordt helemaal gewist. Een andere termijn zet je met
 * WHATSAPP_BEWAAR_DAGEN; houd die gelijk aan BEWAAR_DAGEN bij de ontvanger.
 */
import {
  appendFileSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync,
} from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const TIJD = new Intl.DateTimeFormat('nl-NL', {
  timeZone: 'Europe/Amsterdam',
  day: '2-digit', month: '2-digit', year: 'numeric',
  hour: '2-digit', minute: '2-digit', hour12: false,
});

/** "28-09-2026 09:14" in Nederlandse tijd, ook als de computer ergens anders staat. */
export function tijdstip(seconden) {
  const d = Object.fromEntries(TIJD.formatToParts(new Date(seconden * 1000)).map((p) => [p.type, p.value]));
  return `${d.day}-${d.month}-${d.year} ${d.hour}:${d.minute}`;
}

/** Eén regel zoals in een WhatsApp-export. */
export function regelVoor(b) {
  const wie = b.richting === 'uit' ? 'Justus' : (b.naam || `+${b.klant}`);
  return `[${tijdstip(b.tijd)}] ${wie}: ${b.tekst}`;
}

/**
 * Berichten per klant bij elkaar, in de volgorde waarin ze verstuurd zijn.
 * De naam is wat de klant zelf in WhatsApp heeft ingesteld; die kan leeg zijn.
 */
export function perKlant(berichten) {
  const klanten = new Map();
  for (const b of berichten) {
    const k = klanten.get(b.klant) ?? { klant: b.klant, naam: '', berichten: [] };
    if (b.richting === 'in' && b.naam) k.naam = b.naam;
    k.berichten.push(b);
    klanten.set(b.klant, k);
  }
  for (const k of klanten.values()) k.berichten.sort((a, b) => a.tijd - b.tijd);
  return klanten;
}

const BERICHTREGEL = /^\[(\d{2})-(\d{2})-(\d{4}) (\d{2}):(\d{2})\] /;

/**
 * Berichten van vóór `grens` (seconden) uit een gesprek halen.
 *
 * De kop bovenaan blijft staan. Een bericht dat over meer regels loopt, gaat in
 * zijn geheel weg of blijft in zijn geheel staan. Geeft `null` terug als er
 * geen enkel bericht overblijft: dan kan het hele bestand weg.
 *
 * De tijd in de regel is Nederlandse tijd; we lezen hem als UTC. Dat scheelt
 * hoogstens twee uur, en bij een termijn van 90 dagen maakt dat niets uit.
 */
export function snoei(inhoud, grens) {
  const kop = [];
  const berichten = [];
  for (const regel of inhoud.replace(/\n$/, '').split('\n')) {
    const t = BERICHTREGEL.exec(regel);
    if (t) {
      const [, dag, maand, jaar, uur, minuut] = t.map(Number);
      berichten.push({ tijd: Date.UTC(jaar, maand - 1, dag, uur, minuut) / 1000, regels: [regel] });
    } else if (berichten.length > 0) {
      berichten.at(-1).regels.push(regel);
    } else {
      kop.push(regel);
    }
  }
  const over = berichten.filter((b) => b.tijd >= grens);
  if (over.length === 0) return null;
  return `${[...kop, ...over.flatMap((b) => b.regels)].join('\n')}\n`;
}

/** Alle gesprekken in de map langs, en ouder dan de termijn eruit. */
function snoeiAlles(map, dagen) {
  const grens = Date.now() / 1000 - dagen * 24 * 60 * 60;
  const gesprekken = join(map, 'gesprekken');
  for (const naam of readdirSync(gesprekken).filter((n) => n.endsWith('.md'))) {
    const bestand = join(gesprekken, naam);
    const oud = readFileSync(bestand, 'utf8');
    const nieuw = snoei(oud, grens);
    if (nieuw === null) {
      rmSync(bestand);
      console.log(`${naam}: alle berichten ouder dan ${dagen} dagen, gesprek gewist.`);
    } else if (nieuw !== oud) {
      writeFileSync(bestand, nieuw);
    }
  }
}

function stop(melding) {
  console.error(`\n${melding}\n`);
  process.exit(1);
}

async function haalOp(adres, sleutel, na) {
  let antwoord;
  try {
    antwoord = await fetch(`${adres.replace(/\/+$/, '')}/berichten?na=${na}`, {
      headers: { authorization: `Bearer ${sleutel}` },
    });
  } catch (fout) {
    stop(`De ontvanger is niet bereikbaar (${fout.cause?.code ?? fout.message}).\n`
      + 'Klopt WHATSAPP_ADRES, en staat dat adres bij Netwerktoegang in de instellingen van het project?');
  }
  if (antwoord.status === 401) stop('De ontvanger weigert de ophaalsleutel. Klopt WHATSAPP_OPHAALSLEUTEL?');
  if (!antwoord.ok) stop(`De ontvanger gaf een fout: ${antwoord.status} ${await antwoord.text()}`);
  return antwoord.json();
}

async function main() {
  const args = process.argv.slice(2);
  const i = args.indexOf('--map');
  const map = i === -1 ? '/mnt/project-files/whatsapp' : args[i + 1];
  const adres = process.env.WHATSAPP_ADRES;
  const sleutel = process.env.WHATSAPP_OPHAALSLEUTEL;
  if (!adres || !sleutel) stop('WHATSAPP_ADRES en WHATSAPP_OPHAALSLEUTEL moeten allebei ingesteld zijn.');

  mkdirSync(join(map, 'gesprekken'), { recursive: true });
  const standBestand = join(map, 'stand.json');
  const stand = existsSync(standBestand) ? JSON.parse(readFileSync(standBestand, 'utf8')) : { na: 0 };

  const nieuw = [];
  for (;;) {
    const { berichten, perKeer } = await haalOp(adres, sleutel, stand.na);
    nieuw.push(...berichten);
    if (berichten.length > 0) stand.na = berichten.at(-1).volgnr;
    if (berichten.length < perKeer) break;
  }

  const dagen = Math.max(1, Number(process.env.WHATSAPP_BEWAAR_DAGEN) || 90);
  if (nieuw.length === 0) console.log('Geen nieuwe WhatsApp-berichten.');

  for (const k of perKlant(nieuw).values()) {
    const bestand = join(map, 'gesprekken', `${k.klant}.md`);
    if (!existsSync(bestand)) {
      writeFileSync(bestand, `# WhatsApp-gesprek met ${k.naam || 'onbekend'} (+${k.klant})\n\n`
        + 'Opgehaald via de WhatsApp-ontvanger. Nieuwe berichten komen onderaan.\n'
        + "Foto's en spraakberichten staan hier als [foto] of [spraakbericht]; bekijk ze in de app.\n\n");
    }
    appendFileSync(bestand, `${k.berichten.map(regelVoor).join('\n')}\n`);
    const binnen = k.berichten.filter((b) => b.richting === 'in').length;
    console.log(`${k.naam || 'onbekend'} (+${k.klant}): ${binnen} van de klant, `
      + `${k.berichten.length - binnen} van jou → ${bestand}`);
  }
  // Pas na het wegschrijven de stand bijwerken: gaat er halverwege iets mis,
  // dan halen we het de volgende keer gewoon opnieuw op.
  writeFileSync(standBestand, `${JSON.stringify(stand, null, 2)}\n`);
  snoeiAlles(map, dagen);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) await main();
