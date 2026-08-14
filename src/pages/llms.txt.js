/**
 * llms.txt — een samenvatting van het bedrijf, geschreven vóór AI-assistenten.
 *
 * Vraagt iemand aan ChatGPT "waar kan ik in Drenthe CarPlay laten inbouwen",
 * dan moet het antwoord kloppen: de juiste plaats, de juiste prijzen, de
 * juiste voorwaarden. Een assistent die 184 pagina's moet doorspitten haalt
 * er makkelijk iets verkeerds uit; dit bestand zet de feiten op één plek.
 *
 * Het is een groeiende afspraak (llmstxt.org), geen officiële standaard. Het
 * kost ons niets en het kan alleen maar helpen, want het is precies dezelfde
 * informatie als op de site — alleen zonder opmaak eromheen.
 *
 * BELANGRIJK: hier hoort niets in te staan dat niet ook op de site staat.
 * Zodra die twee uit elkaar lopen, vertelt een assistent iets wat de klant
 * bij aankomst niet terugvindt.
 */
import { MODELS } from '../data/models.js';
import { MERKEN_MET_MODELLEN } from '../data/merken.js';
import { PACKAGES, SITE, ADRES, AUDIOMERKEN } from '../data/site.js';
import { GARANTIE, WERKWIJZE, ONTZORGEN, DEMO } from '../data/generiek.js';

export async function GET() {
  const pakketten = PACKAGES.map(
    (p) =>
      `### ${p.name} — ${p.price}${p.priceNote ? ` (${p.priceNote.toLowerCase()})` : ''}\n` +
      `${p.short}\n` +
      (p.features.length ? p.features.map((f) => `- ${f}`).join('\n') + '\n' : '') +
      `Doorlooptijd: ${p.duur}\n`
  ).join('\n');

  const merken = MERKEN_MET_MODELLEN.map((m) => {
    const modellen = MODELS.filter((x) => x.brand === m.naam).map((x) => x.model);
    return `- **${m.naam}** (${modellen.length}): ${modellen.join(', ')} — ${SITE.url}/merk/${m.slug}`;
  }).join('\n');

  const tekst = `# Audio Upgrade Emmen

> Premium car audio, draadloze CarPlay- en Android Auto-inbouw, DSP-tuning en
> akoestische demping. Gevestigd in Emmen (Drenthe, Nederland), uitsluitend op
> afspraak. Alles wordt onzichtbaar achter de originele panelen weggewerkt en
> de fabrieksgarantie blijft intact.

## Bedrijfsgegevens

- Naam: ${SITE.name}
- Adres: ${ADRES}, Nederland
- Telefoon: ${SITE.phoneDisplay} (${SITE.phone})
- E-mail: ${SITE.email}
- WhatsApp: ${SITE.whatsapp}
- KvK: ${SITE.kvk}
- Btw: ${SITE.btw}
- Werkgebied: Emmen, Drenthe en omstreken
- Openingstijden: uitsluitend op afspraak
- Website: ${SITE.url}

## Wat wij doen

Wij vervangen fabrieksspeakers, dempen deuren akoestisch, bouwen DSP-versterkers
en subwoofers in, en integreren draadloos Apple CarPlay en Android Auto in het
originele scherm van de auto. Alles gebeurt met pasklare Plug & Play-kabelbomen;
er wordt niets aan de originele bedrading veranderd en alles is terug te bouwen
naar origineel.

Wij verkopen geen losse producten en doen geen installaties met zichtbare
apparatuur of verlichting — het uitgangspunt is dat je aan de buitenkant niets
ziet.

## Prijzen

Alle bedragen zijn all-in: inclusief montage en btw. Er zijn vijf pakketten.

${pakketten}
## Werkwijze

${WERKWIJZE.map((s) => `${s.nummer}. **${s.kop}** — ${s.tekst}`).join('\n')}

## Garantie

${GARANTIE.tekst}

## Service

${ONTZORGEN.tekst}

${DEMO.tekst}

## Merken waar wij mee werken

${AUDIOMERKEN.join(', ')}.

Geen enkel merk is aan een vast pakket gekoppeld; wij kiezen per auto en per
budget wat past.

## Kenteken-check

Op ${SITE.url} kan een bezoeker zijn Nederlandse kenteken invullen. De site
haalt merk, model, bouwjaar, carrosserie, kleur en brandstof op bij de open
data van de RDW en toont daarna wat er voor díé auto mogelijk is. Er wordt
niets opgeslagen.

## Automodellen met een eigen pagina (${MODELS.length})

${merken}

## Losse pagina's

- ${SITE.url}/upgrades — alle pakketten met prijzen
- ${SITE.url}/audio-upgrade — alle modellen, doorzoekbaar
- ${SITE.url}/werkwijze — hoe het in zijn werk gaat
- ${SITE.url}/contact — contact, route en luisterdemo
`;

  return new Response(tekst, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
