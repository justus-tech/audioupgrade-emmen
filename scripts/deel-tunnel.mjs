/**
 * Zet een tijdelijke publieke link op de site die op deze computer draait.
 *
 * Draaien:  npm run deel
 * Stoppen:  Ctrl+C
 *
 * WAAROM DIT SCRIPT BESTAAT
 * De tunnel zelf is één regel ssh. Maar de gratis dienst sluit een tunnel
 * zodra er een tijdje geen verkeer overheen gaat — in het logboek stond
 * letterlijk "tunnel inactivity timeout". Kijk je er een half uur niet naar,
 * dan is je link dood.
 *
 * Dit script lost twee dingen op:
 *
 *   Wakker houden   Elke twee minuten wordt de site één keer opgehaald, zodat
 *                   de tunnel nooit stil staat.
 *   Opnieuw opzetten Valt hij tóch weg (wifi eruit, laptop in slaap, dienst
 *                   die herstart), dan komt er automatisch een nieuwe. Het
 *                   adres verandert dan wel; dat hoort bij een gratis tunnel.
 *
 * Het huidige adres staat altijd in het bestand .tunnel-adres, zodat je het
 * kunt opzoeken zonder terug te scrollen.
 *
 * WIL JE EEN LINK DIE ECHT BLIJFT STAAN?
 * Dan is dit niet de goede weg. Een tunnel loopt altijd door je eigen
 * computer, dus hij is per definitie weg als je laptop uit is. Zet de site
 * dan op Cloudflare Pages: dat is gratis, blijft staan, en je eigen domein
 * blijft gewoon naar de oude site wijzen tot je zegt dat het over mag.
 */
import { spawn } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const POORT = process.argv[2] || '4322';
const WAKKER_INTERVAL = 120_000;
const ADRES_BESTAND = fileURLToPath(new URL('../.tunnel-adres', import.meta.url));

const groen = (s) => `\x1b[32m${s}\x1b[0m`;
const grijs = (s) => `\x1b[90m${s}\x1b[0m`;
const rood = (s) => `\x1b[31m${s}\x1b[0m`;

let adres = null;
let wakkerTimer = null;
let stoppen = false;

/** Haalt de site één keer op, zodat de tunnel niet als "stil" geldt. */
async function houdWakker() {
  if (!adres) return;
  try {
    await fetch(adres, { method: 'HEAD', signal: AbortSignal.timeout(20_000) });
    process.stdout.write(grijs('.'));
  } catch {
    process.stdout.write(rood('x'));
  }
}

function start() {
  if (stoppen) return;

  const ssh = spawn('ssh', [
    '-o', 'StrictHostKeyChecking=accept-new',
    '-o', 'ServerAliveInterval=30',
    '-o', 'ServerAliveCountMax=3',
    '-o', 'ExitOnForwardFailure=yes',
    '-R', `80:localhost:${POORT}`,
    'nokey@localhost.run',
  ]);

  const lees = (data) => {
    const tekst = String(data);
    const gevonden = tekst.match(/https:\/\/[a-z0-9-]+\.lhr\.life/);
    if (gevonden && gevonden[0] !== adres) {
      adres = gevonden[0];
      writeFileSync(ADRES_BESTAND, adres + '\n');
      console.log('\n' + groen('  ' + adres));
      console.log(grijs('  (staat ook in .tunnel-adres — elke stip is een keer wakker houden)\n'));
    }
    // De reden van een verbroken verbinding is nuttig om te zien.
    if (/inactivity|disconnect|reset|refused/i.test(tekst)) {
      console.log('\n' + grijs('  ' + tekst.trim().split('\n').pop()));
    }
  };

  ssh.stdout.on('data', lees);
  ssh.stderr.on('data', lees);

  ssh.on('exit', () => {
    if (stoppen) return;
    adres = null;
    console.log(grijs('\n  Tunnel weg. Over 5 seconden een nieuwe (met een ander adres).'));
    setTimeout(start, 5000);
  });
}

process.on('SIGINT', () => {
  stoppen = true;
  clearInterval(wakkerTimer);
  console.log(grijs('\n\n  Tunnel gesloten.\n'));
  process.exit(0);
});

console.log(grijs(`\n  Tunnel opzetten naar poort ${POORT}…`));
start();
wakkerTimer = setInterval(houdWakker, WAKKER_INTERVAL);
