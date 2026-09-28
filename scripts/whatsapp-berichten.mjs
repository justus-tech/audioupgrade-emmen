#!/usr/bin/env node
/**
 * WHATSAPP-BERICHTEN OPHALEN — van de ontvanger naar één gesprek per persoon.
 *
 * De ontvanger (map whatsapp-ontvanger/) vangt de WhatsApp-berichten op het
 * zakelijke nummer op. Dit script haalt op wat er sinds de vorige keer is
 * binnengekomen en zet het per persoon onder elkaar in een tekstbestand, in
 * dezelfde vorm als een WhatsApp-export:
 *
 *   [28-09-2026 09:14] Tonnie (+31612345678): Kan de sub ook onder de kofferbakmat?
 *   [28-09-2026 09:20] Justus: Ja, dat kan. Ik pas de offerte aan.
 *
 * Zo kan Claude er precies mee werken zoals met een export die jij stuurt.
 *
 * WAT JIJ SCHREEF EN WAT DE KLANT SCHREEF
 * Alleen jouw eigen berichten staan er als "Justus:". Bij iedereen anders staat
 * altijd het telefoonnummer achter de naam, en een bericht over meer regels
 * springt vanaf de tweede regel in. Zo kan een klant nooit een regel maken die
 * eruitziet alsof jij iets hebt toegezegd, ook niet als hij zichzelf in WhatsApp
 * "Justus" noemt of een stuk van een oud gesprek plakt.
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
 *   gesprekken/<nummer>.md   het gesprek met die persoon, op volgorde van tijd
 *   stand.json               tot waar we de vorige keer zijn gekomen
 *
 * BEWAARTERMIJN
 * De ontvanger wist berichten 90 dagen na het versturen, en deze kopieën moeten
 * dat ook. Anders klopt de termijn in de privacyverklaring niet. Daarom haalt
 * elk rondje eerst oudere berichten uit de gesprekken, ook als het ophalen
 * daarna mislukt, en een gesprek waar niets meer in staat wordt helemaal
 * gewist. Een andere termijn zet je met WHATSAPP_BEWAAR_DAGEN; houd die gelijk
 * aan BEWAAR_DAGEN bij de ontvanger.
 */
import {
  closeSync, existsSync, mkdirSync, openSync, readdirSync, readFileSync, realpathSync,
  renameSync, rmSync, statSync, writeFileSync,
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

/** Alle soorten regeleindes, ook de zeldzame die een telefoon soms meestuurt. */
const REGELEINDE = /\r\n|[\r\n\v\f\u0085\u2028\u2029]/g;

/** Een naam op één regel, zonder tekens die een regel nep kunnen laten lijken. */
function schoneNaam(naam) {
  return String(naam ?? '').replace(REGELEINDE, ' ').replace(/[:[\]]/g, ' ')
    .replace(/\s+/g, ' ').trim().slice(0, 60);
}

/** "+31612345678" voor een telefoonnummer, anders het id zoals het is. */
function nummer(klant) {
  return /^\d+$/.test(klant) ? `+${klant}` : klant;
}

/** Eén bericht zoals in een WhatsApp-export, met ingesprongen vervolgregels. */
export function regelVoor(b) {
  const naam = schoneNaam(b.naam);
  const wie = b.richting === 'uit' ? 'Justus' : (naam ? `${naam} (${nummer(b.klant)})` : nummer(b.klant));
  const tekst = String(b.tekst ?? '').replace(REGELEINDE, '\n    ');
  return `[${tijdstip(b.tijd)}] ${wie}: ${tekst}`;
}

/**
 * Berichten per persoon bij elkaar, in de volgorde waarin ze verstuurd zijn.
 * De naam is wat iemand zelf in WhatsApp heeft ingesteld; die kan leeg zijn.
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
const MERKTEKEN = /^<!-- ontvanger (\S+) tot (\d+) -->$/;

/**
 * Een gesprek uit elkaar halen: de kop bovenaan, en daaronder de berichten,
 * elk met zijn tijd en al zijn regels.
 *
 * De tijd in de regel is Nederlandse tijd; we lezen hem als UTC. Dat scheelt
 * hoogstens twee uur. Voor de volgorde maakt dat niets uit (alles wordt op
 * dezelfde manier gelezen) en voor een termijn van 90 dagen ook niet.
 */
export function leesGesprek(inhoud) {
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
  return { kop, berichten };
}

function schrijfGesprek(kop, berichten) {
  return `${[...kop, ...berichten.flatMap((b) => b.regels)].join('\n')}\n`;
}

/**
 * Berichten van vóór `grens` (seconden) uit een gesprek halen.
 *
 * De kop bovenaan blijft staan. Een bericht dat over meer regels loopt, gaat in
 * zijn geheel weg of blijft in zijn geheel staan. Geeft `null` terug als er
 * geen enkel bericht overblijft: dan kan het hele bestand weg.
 */
export function snoei(inhoud, grens) {
  const { kop, berichten } = leesGesprek(inhoud);
  const over = berichten.filter((b) => b.tijd >= grens);
  if (over.length === 0) return null;
  return schrijfGesprek(kop, over);
}

/**
 * Nieuwe berichten in een gesprek zetten, op de goede plek.
 *
 * Berichten komen niet altijd op volgorde binnen: de geschiedenis bij het
 * aansluiten, of een melding die 360dialog later opnieuw stuurt. Daarom sorteren
 * we het hele gesprek op tijd in plaats van alleen onderaan bij te schrijven.
 *
 * In de kop staat een merkteken met de ontvanger en het hoogste volgnummer dat
 * al in dit gesprek staat. Berichten tot en met dat nummer slaan we over, zodat
 * een rondje dat halverwege afbrak niets dubbel zet.
 *
 * `inhoud` is het bestaande gesprek, of null voor een nieuw gesprek; dan komt
 * `kopVoorNieuw` bovenaan. Geeft de nieuwe inhoud terug en welke berichten er
 * echt bij zijn gekomen.
 */
export function voegToe(inhoud, kopVoorNieuw, berichten, bak) {
  const { kop, berichten: oud } = leesGesprek(inhoud ?? kopVoorNieuw);
  const plek = kop.findIndex((r) => MERKTEKEN.test(r));
  const [, merkBak, merkTot] = plek === -1 ? [] : MERKTEKEN.exec(kop[plek]);
  const al = merkBak === bak ? Number(merkTot) : 0;

  const nieuw = berichten.filter((b) => b.volgnr > al);
  if (nieuw.length === 0) return { inhoud, nieuw };

  const merk = `<!-- ontvanger ${bak} tot ${Math.max(al, ...nieuw.map((b) => b.volgnr))} -->`;
  if (plek !== -1) kop[plek] = merk;
  else if (kop.at(-1) === '') kop.splice(kop.length - 1, 0, merk);
  else kop.push(merk);

  const erbij = nieuw.map((b) => leesGesprek(regelVoor(b)).berichten[0]);
  const alles = [...oud, ...erbij].sort((a, b) => a.tijd - b.tijd);
  return { inhoud: schrijfGesprek(kop, alles), nieuw };
}

/** Eerst naar een tijdelijk bestand, dan in één keer op zijn plek: nooit half. */
function schrijfVeilig(bestand, inhoud) {
  const tijdelijk = `${bestand}.tmp`;
  writeFileSync(tijdelijk, inhoud);
  renameSync(tijdelijk, bestand);
}

/** Alle gesprekken in de map langs, en ouder dan de termijn eruit. Geeft terug hoeveel er helemaal weg zijn. */
export function snoeiAlles(map, dagen, nu = Date.now()) {
  const gesprekken = join(map, 'gesprekken');
  if (!existsSync(gesprekken)) return 0;
  const grens = nu / 1000 - dagen * 24 * 60 * 60;
  let gewist = 0;
  for (const naam of readdirSync(gesprekken).filter((n) => n.endsWith('.md'))) {
    const bestand = join(gesprekken, naam);
    const oud = readFileSync(bestand, 'utf8');
    const nieuw = snoei(oud, grens);
    if (nieuw === null) {
      rmSync(bestand);
      gewist++;
    } else if (nieuw !== oud) {
      schrijfVeilig(bestand, nieuw);
    }
  }
  return gewist;
}

/**
 * Klopt wat de ontvanger terugstuurt? We schrijven niets weg voordat alles
 * gecontroleerd is. Een verkeerd adres of een vreemde server kan zo nooit iets
 * buiten de map met gesprekken zetten. Geeft null als alles klopt, anders wat
 * er mis is.
 */
export function controleerAntwoord(a) {
  if (typeof a?.bak !== 'string' || !/^[0-9a-f-]{8,64}$/i.test(a.bak)) return 'geen geldige naam van de opslagbak';
  if (!Number.isInteger(a.perKeer) || a.perKeer < 1) return 'geen geldig aantal per keer';
  if (!Array.isArray(a.berichten)) return 'geen lijst met berichten';
  for (const b of a.berichten) {
    if (!/^[0-9A-Za-z_-]{1,64}$/.test(String(b?.klant))) return `ongeldig klantnummer ${JSON.stringify(b?.klant)}`;
    if (!Number.isInteger(b.volgnr) || b.volgnr < 1) return 'ongeldig volgnummer';
    if (!Number.isInteger(b.tijd) || b.tijd < 0) return 'ongeldige tijd';
    if (b.richting !== 'in' && b.richting !== 'uit') return 'ongeldige richting';
    if (typeof b.tekst !== 'string') return 'bericht zonder tekst';
  }
  return null;
}

/** Een fout met een uitleg voor mensen. We gooien hem, zodat het slot altijd netjes loskomt. */
class Stop extends Error {}
function stop(melding) {
  throw new Stop(melding);
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
  if (!antwoord.ok) stop(`De ontvanger gaf een fout: ${antwoord.status}`);
  let a;
  try {
    a = await antwoord.json();
  } catch {
    stop('De ontvanger stuurde iets terug dat geen lijst met berichten is. Klopt WHATSAPP_ADRES?');
  }
  const fout = controleerAntwoord(a);
  if (fout) stop(`Het antwoord van de ontvanger klopt niet (${fout}). Er is niets weggeschreven.`);
  return a;
}

/** Eén rondje tegelijk. Blijft er na een crash een slot liggen, dan telt dat na een uur niet meer. */
function neemSlot(map) {
  const slot = join(map, '.bezig');
  try {
    closeSync(openSync(slot, 'wx'));
  } catch {
    if (Date.now() - statSync(slot).mtimeMs < 60 * 60 * 1000) {
      stop('Er loopt al een ophaalrondje (of er is er net een afgebroken). Probeer het straks opnieuw.');
    }
    writeFileSync(slot, '');
  }
  return () => rmSync(slot, { force: true });
}

async function main() {
  const args = process.argv.slice(2);
  const i = args.indexOf('--map');
  const map = i === -1 ? '/mnt/project-files/whatsapp' : args[i + 1];
  const dagen = Math.max(1, Number(process.env.WHATSAPP_BEWAAR_DAGEN) || 90);

  // Eerst opruimen, vóór alles wat mis kan gaan. Zo geldt de bewaartermijn ook
  // als de ontvanger uit staat of de sleutel niet meer klopt.
  const gewist = snoeiAlles(map, dagen);
  if (gewist > 0) console.log(`${gewist} gesprek(ken) gewist: alles ouder dan ${dagen} dagen.`);

  const adres = process.env.WHATSAPP_ADRES;
  const sleutel = process.env.WHATSAPP_OPHAALSLEUTEL;
  if (!adres || !sleutel) stop('WHATSAPP_ADRES en WHATSAPP_OPHAALSLEUTEL moeten allebei ingesteld zijn.');
  if (!/^https:\/\//.test(adres) && !/^http:\/\/(127\.0\.0\.1|localhost)(:\d+)?(\/|$)/.test(adres)) {
    stop('WHATSAPP_ADRES moet met https:// beginnen, anders gaat de ophaalsleutel onversleuteld over het internet.');
  }

  mkdirSync(join(map, 'gesprekken'), { recursive: true });
  const laatSlotLos = neemSlot(map);
  try {
    const standBestand = join(map, 'stand.json');
    let stand = { bak: null, na: 0 };
    if (existsSync(standBestand)) {
      try {
        stand = { ...stand, ...JSON.parse(readFileSync(standBestand, 'utf8')) };
      } catch {
        console.warn('stand.json was onleesbaar; we halen alles opnieuw op. Er komt niets dubbel in de gesprekken.');
      }
    }

    // Alles ophalen. Is de ontvanger opnieuw opgezet (een andere opslagbak),
    // dan beginnen de volgnummers weer bij 1 en halen we alles vanaf het begin.
    let nieuw = [];
    for (;;) {
      const a = await haalOp(adres, sleutel, stand.na);
      if (stand.bak !== null && a.bak !== stand.bak) {
        console.warn('Dit is een andere ontvanger dan de vorige keer; we halen alles vanaf het begin op.');
        stand = { bak: a.bak, na: 0 };
        nieuw = [];
        continue;
      }
      stand.bak = a.bak;
      nieuw.push(...a.berichten);
      if (a.berichten.length > 0) stand.na = a.berichten.at(-1).volgnr;
      if (a.berichten.length < a.perKeer) break;
    }

    let aantal = 0;
    for (const k of perKlant(nieuw).values()) {
      const bestand = join(map, 'gesprekken', `${k.klant}.md`);
      const bestaand = existsSync(bestand) ? readFileSync(bestand, 'utf8') : null;
      const kop = `# WhatsApp-gesprek met ${schoneNaam(k.naam) || 'onbekend'} (${nummer(k.klant)})\n\n`
        + 'Opgehaald via de WhatsApp-ontvanger, op volgorde van tijd.\n'
        + 'Alleen regels die beginnen met "[tijd] Justus:" zijn van Justus zelf; ingesprongen regels horen bij het bericht erboven.\n'
        + "Foto's en spraakberichten staan hier als [foto] of [spraakbericht]; bekijk ze in de app.\n\n";
      const { inhoud, nieuw: erbij } = voegToe(bestaand, kop, k.berichten, stand.bak);
      if (erbij.length === 0) continue;
      schrijfVeilig(bestand, inhoud);
      aantal += erbij.length;
      console.log(`gesprekken/${k.klant}.md: ${erbij.length} nieuw`);
    }
    if (aantal === 0) console.log('Geen nieuwe WhatsApp-berichten.');

    // Pas na het wegschrijven de stand bijwerken. Gaat er halverwege iets mis,
    // dan halen we het de volgende keer opnieuw op; het merkteken in elk
    // gesprek zorgt dat er niets dubbel in komt.
    schrijfVeilig(standBestand, `${JSON.stringify(stand, null, 2)}\n`);

    // Nog een keer opruimen: de geschiedenis bij het aansluiten kan berichten
    // bevatten die al ouder zijn dan de termijn.
    snoeiAlles(map, dagen);
  } finally {
    laatSlotLos();
  }
}

// Alleen draaien als dit bestand zelf gestart is (niet als de tests het inladen).
// realpath, zodat het ook werkt als de map via een snelkoppeling bereikt wordt.
const alsProgramma = (() => {
  try {
    return Boolean(process.argv[1]) && realpathSync(process.argv[1]) === fileURLToPath(import.meta.url);
  } catch {
    return false;
  }
})();
if (alsProgramma) {
  try {
    await main();
  } catch (fout) {
    if (!(fout instanceof Stop)) throw fout;
    console.error(`\n${fout.message}\n`);
    process.exitCode = 1;
  }
}
