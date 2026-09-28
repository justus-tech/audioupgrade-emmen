#!/usr/bin/env node
/**
 * DE ONTVANGER AANMELDEN BIJ 360DIALOG — één keer, op je eigen computer.
 *
 * 360dialog moet weten naar welk adres het nieuwe WhatsApp-berichten stuurt.
 * Dat vertel je met de API-sleutel van 360dialog. Die sleutel kan ook berichten
 * VERSTUREN namens jouw nummer, en daarom mag hij nergens anders staan dan in
 * je wachtwoordmanager: niet bij GitHub, niet bij Cloudflare, niet bij Claude.
 *
 * Dit script vraagt de sleutel, gebruikt hem één keer en vergeet hem weer. Er
 * wordt niets opgeslagen.
 *
 * GEBRUIK (in de map van de site, op je eigen computer)
 *
 *   npm run whatsapp:aanmelden
 *
 * Het vraagt om:
 *   1. het adres van de ontvanger   (bv. https://aue-whatsapp.justus.workers.dev)
 *   2. je eerste eigen sleutel       (WHATSAPP_WEBHOOK_SLEUTEL bij GitHub)
 *   3. de API-sleutel van 360dialog  (uit de 360dialog Hub)
 *
 * Het vraagt alles eerst. Dan controleert het of de ontvanger die sleutel
 * accepteert, en pas daarna meldt het het adres aan en laat het zien wat
 * 360dialog nu heeft staan.
 */
import { realpathSync } from 'node:fs';
import { createInterface } from 'node:readline';
import { fileURLToPath } from 'node:url';

const D360 = 'https://waba-v2.360dialog.io/v1/configs/webhook';

/** Een vraag stellen. Bij `verborgen` zie je sterretjes in plaats van wat je typt of plakt. */
function vraag(tekst, verborgen = false) {
  return new Promise((klaar) => {
    const rl = createInterface({ input: process.stdin, output: process.stdout, terminal: true });
    if (verborgen) {
      rl._writeToOutput = (s) => {
        rl.output.write(s.startsWith(tekst) ? tekst + '*'.repeat(s.length - tekst.length) : '*'.repeat(s.length));
      };
    }
    rl.question(tekst, (antwoord) => {
      rl.close();
      if (verborgen) process.stdout.write('\n');
      klaar(antwoord.trim());
    });
  });
}

function stop(melding) {
  console.error(`\n${melding}\n`);
  process.exit(1);
}

/** Het adres waar 360dialog naartoe moet: de sleutel zit in het adres zelf. */
export function webhookAdres(adres, sleutel) {
  return `${adres.replace(/\/+$/, '')}/webhook/${encodeURIComponent(sleutel)}`;
}

/** Laat alleen het begin van een geheim adres zien. */
export function verberg(url) {
  return String(url).replace(/(\/webhook\/)(.{0,4}).*$/, '$1$2…');
}

async function main() {
  // Sleutels typ of plak je zelf, zodat ze nergens in een bestand of in de
  // geschiedenis van de terminal belanden.
  if (!process.stdin.isTTY) stop('Start dit in een terminal en typ of plak de antwoorden zelf.');
  console.log('De ontvanger aanmelden bij 360dialog. Er wordt niets opgeslagen.\n');
  const adres = (await vraag('Adres van de ontvanger (https://…workers.dev): ')).replace(/\/+$/, '');
  if (!/^https:\/\/[a-z0-9.-]+$/i.test(adres)) stop('Dat is geen geldig adres. Het begint met https:// en eindigt op workers.dev.');
  const sleutel = await vraag('Je eerste eigen sleutel (WHATSAPP_WEBHOOK_SLEUTEL): ', true);
  if (sleutel.length < 20) stop('Die sleutel is te kort. Gebruik dezelfde lange sleutel als bij GitHub.');
  const apiSleutel = await vraag('API-sleutel van 360dialog: ', true);
  if (!apiSleutel) stop('Geen API-sleutel ingevuld. Er is niets aangemeld.');
  const url = webhookAdres(adres, sleutel);

  // 1. Accepteert de ontvanger deze sleutel? Een lege melding bewaart niets.
  let proef;
  try {
    proef = await fetch(url, { method: 'POST', headers: { 'content-type': 'application/json' }, body: '{}' });
  } catch (fout) {
    stop(`De ontvanger is niet bereikbaar (${fout.cause?.code ?? fout.message}). Klopt het adres, en is de GitHub-stap groen geworden?`);
  }
  if (proef.status === 401) stop('De ontvanger weigert deze sleutel. Is het dezelfde als WHATSAPP_WEBHOOK_SLEUTEL bij GitHub, en is de GitHub-stap daarna opnieuw gedraaid?');
  if (!proef.ok) stop(`De ontvanger gaf een fout: ${proef.status}. Er is niets aangemeld.`);
  console.log('✓ De ontvanger accepteert de sleutel.');

  // 2. Aanmelden bij 360dialog.
  const kop = { 'D360-API-KEY': apiSleutel, 'content-type': 'application/json' };
  let aanmelding;
  try {
    aanmelding = await fetch(D360, { method: 'POST', headers: kop, body: JSON.stringify({ url }) });
  } catch (fout) {
    stop(`360dialog is niet bereikbaar (${fout.cause?.code ?? fout.message}). Er is niets aangemeld.`);
  }
  if (!aanmelding.ok) {
    stop(`360dialog weigerde de aanmelding: ${aanmelding.status} ${(await aanmelding.text()).slice(0, 300)}`);
  }

  // 3. Nakijken wat 360dialog nu heeft staan.
  const nu = await fetch(D360, { headers: kop }).catch(() => null);
  const staat = nu?.ok ? (await nu.json().catch(() => ({}))).url : null;
  if (staat && staat !== url) stop(`360dialog heeft een ander adres staan: ${verberg(staat)}. Probeer het opnieuw of kijk in de Hub.`);
  console.log(`✓ Aangemeld. 360dialog stuurt nieuwe berichten nu naar ${verberg(url)}`);
  console.log('\nStuur jezelf vanaf een ander nummer een WhatsApp en laat het Claude weten; die kijkt of het binnenkomt.');
}

// Alleen draaien als dit bestand zelf gestart is (niet als de tests het inladen).
const alsProgramma = (() => {
  try {
    return Boolean(process.argv[1]) && realpathSync(process.argv[1]) === fileURLToPath(import.meta.url);
  } catch {
    return false;
  }
})();
if (alsProgramma) await main();
