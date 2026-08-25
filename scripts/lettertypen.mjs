/**
 * HAALT DE LETTERTYPEN OP EN ZET ZE IN public/fonts.
 *
 * Draaien met:  node scripts/lettertypen.mjs
 * Daarna de uitvoer bovenaan src/styles/global.css plakken.
 *
 * WAAROM ZELF HOSTEN
 * Bij de Google-variant haalt de browser van elke bezoeker de bestanden op
 * bij fonts.gstatic.com, en daarmee gaat zijn IP-adres naar Google. Dat staat
 * haaks op wat er in het cookiebeleid staat. Bovendien moet de browser dan
 * drie keer achter elkaar wachten — pagina, stylesheet, lettertype — en dat
 * kost op een telefoon makkelijk een halve seconde voordat er één letter
 * staat.
 *
 * TWEE DINGEN WAAR HET OP AANKOMT
 *
 *   Variabele bestanden   We vragen een bereik op (400..500) in plaats van
 *                         losse gewichten. Google levert dan één bestand dat
 *                         alle tussenliggende gewichten bevat. Met losse
 *                         gewichten kregen we vijf bestanden van samen 157 kB;
 *                         zo zijn het er twee van samen 68 kB.
 *   Alleen latin          De Griekse, Cyrillische en Vietnamese varianten zijn
 *                         goed voor vijf van de zeven bestanden per familie en
 *                         die heeft een Nederlandse site niet nodig. latin-ext
 *                         blijft wél staan: daar zitten tekens als š en ć in,
 *                         en we hebben merken als Škoda op de site.
 *
 * Inter en Oswald staan onder de SIL Open Font License; zelf hosten is
 * uitdrukkelijk toegestaan.
 */
import { writeFile, mkdir, readdir, unlink } from 'fs/promises';
import { join } from 'path';

/* Een moderne browser voordoen, anders krijgen we het oude woff-formaat. */
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36';

/* De bereiken (400..500) zijn wat het variabele bestand oplevert. */
const URL_CSS =
  'https://fonts.googleapis.com/css2?family=Inter:wght@400..500&family=Oswald:wght@400..600&display=swap';

const SUBSETS = ['latin', 'latin-ext'];
const MAP = './public/fonts';

const css = await (await fetch(URL_CSS, { headers: { 'User-Agent': UA } })).text();

/**
 * De stylesheet is een reeks blokken, elk voorafgegaan door een
 * commentaarregel met de naam van de subset. Die naam hebben we nodig om te
 * bepalen welk blok we willen houden.
 */
const blokken = css
  .split('/*')
  .slice(1)
  .map((stuk) => {
    const subset = stuk.slice(0, stuk.indexOf('*/')).trim();
    const rest = stuk.slice(stuk.indexOf('*/') + 2);
    return {
      subset,
      familie: /font-family:\s*'([^']+)'/.exec(rest)?.[1],
      gewicht: /font-weight:\s*([\d\s]+);/.exec(rest)?.[1]?.trim(),
      bron: /url\((https:[^)]+\.woff2)\)/.exec(rest)?.[1],
      bereik: /unicode-range:\s*([^;]+);/.exec(rest)?.[1],
    };
  })
  .filter((b) => b.bron && SUBSETS.includes(b.subset));

await mkdir(MAP, { recursive: true });

/* Oude bestanden weg, anders blijft er van een vorige ronde iets slingeren
   waar niets meer naar verwijst. */
for (const bestand of await readdir(MAP)) await unlink(join(MAP, bestand));

const regels = [];
let totaal = 0;

for (const b of blokken) {
  const naam = `${b.familie.toLowerCase()}-${b.subset}.woff2`;
  const data = Buffer.from(
    await (await fetch(b.bron, { headers: { 'User-Agent': UA } })).arrayBuffer()
  );
  await writeFile(join(MAP, naam), data);
  totaal += data.length;
  console.log(`${naam.padEnd(28)} ${(data.length / 1024).toFixed(0).padStart(4)} kB  (${b.gewicht})`);

  regels.push(
    `@font-face {\n` +
      `  font-family: '${b.familie}';\n` +
      `  font-style: normal;\n` +
      `  font-weight: ${b.gewicht};\n` +
      `  font-display: swap;\n` +
      `  src: url('/fonts/${naam}') format('woff2');\n` +
      `  unicode-range: ${b.bereik};\n` +
      `}`
  );
}

await writeFile(join(MAP, '_fontface.css'), regels.join('\n\n') + '\n');
console.log(`\n${blokken.length} bestanden, ${(totaal / 1024).toFixed(0)} kB in totaal.`);
console.log('De @font-face-regels staan in public/fonts/_fontface.css.');
