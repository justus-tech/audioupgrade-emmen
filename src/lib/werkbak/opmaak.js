/**
 * DE GEDEELDE OPMAAK VAN DE PAPIEREN STUKKEN.
 *
 * Er gaan twee documenten de deur uit, en ze moeten op elkaar lijken:
 *
 *   de offerte   naar de klant   — wat het kost
 *   de werkbon   voor de bank    — wat erin gaat en hoe het gemonteerd wordt
 *
 * Wat ze delen staat hier: de kopbalk, de voetregel, de kleuren, de marges
 * en de kentekenplaat. Zonder dit bestand zouden ze uit elkaar groeien zodra
 * er één iets aan de ene verandert.
 */
import { A4 } from './pdf.js';
import { PALETTE, LICHT } from '../../data/brand.js';
import { SITE, ADRES } from '../../data/site.js';
import { datumNl } from './rekenen.js';
import { breekAf } from './pdf.js';
import { volledigeVoorwaarden } from './voorwaarden.js';

/**
 * Een kleur met doorzichtigheid bestaat in een pdf niet zomaar. Lijnen op
 * de site zijn grijs op lage dekking; hier rekenen we diezelfde grijstint
 * vast uit tegen wit. Zo blijft brand.js de enige bron van de kleur.
 */
export function overWit(hex, dekking) {
  const n = hex.replace('#', '');
  const kanaal = (i) => {
    const kleur = parseInt(n.slice(i, i + 2), 16);
    return Math.round(kleur * dekking + 255 * (1 - dekking));
  };
  return `#${[0, 2, 4].map((i) => kanaal(i).toString(16).padStart(2, '0')).join('')}`;
}

export const KLEUR = {
  /* Geen kleur voor het papier: een pdf-pagina is al wit. */
  inkt: LICHT.text,
  zacht: LICHT.textDim,
  accent: PALETTE.orange,        // als vlak
  accentInkt: LICHT.accentText,  // als tekst — oranje op wit leest niet
  lijn: overWit(PALETTE.grey, 0.32),
  lijnZacht: overWit(PALETTE.grey, 0.16),
  vlakZacht: overWit(PALETTE.grey, 0.08),
  band: PALETTE.black,
  bandTekst: PALETTE.white,
  bandZacht: PALETTE.grey,
  plaat: overWit(PALETTE.grey, 0.1),
};

export const MARGE = 46;
export const LINKS = MARGE;
export const RECHTS = A4.breedte - MARGE;
export const ONDERGRENS = A4.hoogte - 78;

/**
 * De donkere kopbalk met het woordmerk.
 * `soort` is het woord rechtsboven: OFFERTE of WERKBON.
 */
export function kopbalk(doc, { soort, nummer, datum, vervolg = false }) {
  const hoogte = vervolg ? 58 : 104;
  doc.vlak(0, 0, A4.breedte, hoogte, KLEUR.band);
  doc.vlak(0, hoogte, A4.breedte, 3, KLEUR.accent);

  doc.tekst('AUDIO UPGRADE EMMEN', LINKS, vervolg ? 34 : 46, {
    grootte: vervolg ? 12 : 15, vet: true, kleur: KLEUR.bandTekst,
    spatiering: vervolg ? 1.2 : 1.6,
  });

  if (!vervolg) {
    doc.tekst('Premium car audio  ·  CarPlay  ·  DSP-tuning  ·  Emmen', LINKS, 63, {
      grootte: 7.5, kleur: KLEUR.bandZacht, spatiering: 0.5,
    });
    doc.tekst(soort.toUpperCase(), RECHTS, 48, {
      grootte: 20, vet: true, kleur: KLEUR.accent, uitlijnen: 'rechts', spatiering: 1,
    });
    doc.tekst(`Nr. ${nummer}`, RECHTS, 64, {
      grootte: 8.5, kleur: KLEUR.bandTekst, uitlijnen: 'rechts',
    });
    doc.tekst(datumNl(datum), RECHTS, 76, {
      grootte: 8.5, kleur: KLEUR.bandZacht, uitlijnen: 'rechts',
    });
  } else {
    doc.tekst(`${soort} ${nummer}  ·  vervolg`, RECHTS, 34, {
      grootte: 8.5, kleur: KLEUR.bandZacht, uitlijnen: 'rechts',
    });
  }
  return hoogte + 3;
}

/**
 * De voetregel. Op de offerte staan de bedrijfsgegevens (die hoort een klant
 * te kunnen nalezen); op de werkbon alleen het paginanummer en een
 * waarschuwing, want die hoort de deur niet uit te gaan.
 */
export function voetregel(doc, paginaNr, { intern = false } = {}) {
  const y = A4.hoogte - 46;
  doc.lijn(LINKS, y - 20, RECHTS, y - 20, KLEUR.lijnZacht);
  if (intern) {
    doc.tekst('Interne werkbon — niet aan de klant meegeven.', LINKS, y - 8, {
      grootte: 7.5, vet: true, kleur: KLEUR.accentInkt,
    });
    doc.tekst(`${SITE.name}  ·  ${SITE.phoneDisplay}`, LINKS, y + 3, {
      grootte: 7.5, kleur: KLEUR.zacht,
    });
  } else {
    doc.tekst(`${SITE.name}  ·  ${ADRES}  ·  ${SITE.phoneDisplay}  ·  ${SITE.email}`, LINKS, y - 8, {
      grootte: 7.5, kleur: KLEUR.zacht,
    });
    doc.tekst(`KVK ${SITE.kvk}  ·  Btw ${SITE.btw}`, LINKS, y + 3, {
      grootte: 7.5, kleur: KLEUR.zacht,
    });
  }
  doc.tekst(`Pagina ${paginaNr}`, RECHTS, y + 3, {
    grootte: 7.5, kleur: KLEUR.zacht, uitlijnen: 'rechts',
  });
}

/** Een kopje boven een blokje gegevens. */
export function blokkop(doc, tekst, x, y) {
  doc.tekst(tekst.toUpperCase(), x, y, {
    grootte: 7, vet: true, kleur: KLEUR.accentInkt, spatiering: 1.1,
  });
}

/**
 * De kentekenplaat, nagetekend zoals hij op de site staat: licht metaal met
 * de oranje band van het merk ervoor. Bewust niet de Nederlandse geel/blauw
 * — zie de uitleg in Kentekenplaat.astro.
 */
export function kentekenplaat(doc, kenteken, x, y) {
  const breedte = 104;
  const hoogte = 23;
  doc.vlak(x, y, breedte, hoogte, KLEUR.plaat);
  doc.vlak(x, y, 17, hoogte, KLEUR.accent);
  doc.lijn(x, y, x + breedte, y, KLEUR.lijn, 0.7);
  doc.lijn(x, y + hoogte, x + breedte, y + hoogte, KLEUR.lijn, 0.7);
  doc.lijn(x, y, x, y + hoogte, KLEUR.lijn, 0.7);
  doc.lijn(x + breedte, y, x + breedte, y + hoogte, KLEUR.lijn, 0.7);
  doc.tekst(kenteken || '—', x + 17 + (breedte - 17) / 2, y + 16, {
    grootte: 12, vet: true, kleur: KLEUR.inkt, uitlijnen: 'midden', spatiering: 1.4,
  });
  return hoogte;
}

/** Een leeg vakje om af te vinken. */
export function vakje(doc, x, y, zijde = 9) {
  doc.lijn(x, y, x + zijde, y, KLEUR.lijn, 0.8);
  doc.lijn(x, y + zijde, x + zijde, y + zijde, KLEUR.lijn, 0.8);
  doc.lijn(x, y, x, y + zijde, KLEUR.lijn, 0.8);
  doc.lijn(x + zijde, y, x + zijde, y + zijde, KLEUR.lijn, 0.8);
}

/** Een stippellijn om met de hand op te schrijven. */
export function invulregel(doc, x, y, breedte) {
  doc.lijn(x, y, x + breedte, y, KLEUR.lijn, 0.6);
}

/**
 * DE VOLLEDIGE VOORWAARDEN ALS BIJLAGE ACHTERIN.
 *
 * Waarom ze meegaan en niet alleen op de site staan: algemene voorwaarden
 * gelden pas als ze vóór of bij het sluiten van de overeenkomst aan de klant
 * ter hand zijn gesteld. Een verwijzing naar een webadres is zwakker dan ze
 * gewoon meesturen — en meesturen kost hier niets.
 *
 * Twee kolommen, kleine letter. Niemand leest dit van A tot Z, maar wie iets
 * opzoekt moet het snel kunnen vinden, en het mag de offerte niet drie
 * pagina's langer maken dan nodig.
 *
 * Levert het aantal pagina's op dat erbij is gekomen.
 */
export function voorwaardenBijlage(doc, kop, beginPagina) {
  const v = volledigeVoorwaarden();
  const kolomBreedte = (RECHTS - LINKS - 22) / 2;
  const kolomX = [LINKS, LINKS + kolomBreedte + 22];

  let paginaNr = beginPagina;
  let kolom = 0;
  let y = 0;

  const nieuweBladzijde = () => {
    doc.nieuwePagina();
    paginaNr += 1;
    y = kopbalk(doc, { ...kop, vervolg: true }) + 24;
    kolom = 0;
    blokkop(doc, `${v.kop} — bijgewerkt in ${v.bijgewerkt}`, LINKS, y);
    y += 16;
  };

  nieuweBladzijde();
  const bovenkant = y;

  /** Ruimte maken: eerst de tweede kolom, dan pas een nieuwe bladzijde. */
  const ruimte = (hoogte) => {
    if (y + hoogte <= ONDERGRENS) return;
    if (kolom === 0) {
      kolom = 1;
      y = bovenkant;
      return;
    }
    voetregel(doc, paginaNr);
    nieuweBladzijde();
    y = bovenkant;
  };

  for (const art of v.artikelen) {
    const kopRegels = breekAf(art.kop, kolomBreedte, 7.5, true);
    ruimte(kopRegels.length * 10 + 18);
    kopRegels.forEach((regel, i) => {
      doc.tekst(regel, kolomX[kolom], y + i * 10, {
        grootte: 7.5, vet: true, kleur: KLEUR.inkt,
      });
    });
    y += kopRegels.length * 10 + 3;

    for (const punt of art.punten) {
      const regels = breekAf(punt, kolomBreedte - 6, 6.5);
      ruimte(regels.length * 8 + 4);
      regels.forEach((regel, i) => {
        doc.tekst(regel, kolomX[kolom] + (i === 0 ? 0 : 6), y + i * 8, {
          grootte: 6.5, kleur: KLEUR.zacht,
        });
      });
      y += regels.length * 8 + 3;
    }
    y += 5;
  }

  voetregel(doc, paginaNr);
  return paginaNr - beginPagina;
}
