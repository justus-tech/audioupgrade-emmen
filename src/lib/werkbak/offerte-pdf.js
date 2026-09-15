/**
 * DE OFFERTE ALS PDF — de opmaak.
 *
 * Dit bestand weet hoe een offerte eruitziet; pdf.js weet hoe je een pdf
 * schrijft. Die scheiding is met opzet: wil je de offerte anders indelen,
 * dan hoef je alleen hier te zijn.
 *
 * WAT ER WEL EN NIET OP STAAT
 * Op de offerte staat per regel één bedrag, met montage er al in — en bij
 * een particulier ook de btw. Dat is dezelfde belofte als op de site: de
 * prijs die je ziet is de prijs die je betaalt.
 *
 * Wat er NOOIT op mag: inkoopprijzen, marges en het uurtarief. Die staan
 * alleen in de app, op Justus' eigen telefoon. Er is een test die hierop
 * let, want dit is het soort fout dat je één keer maakt en dan bij een
 * klant op tafel ligt.
 */
import { nieuwPdf, A4, breekAf, breedteVan } from './pdf.js';
import { PALETTE, LICHT } from '../../data/brand.js';
import { SITE, ADRES } from '../../data/site.js';
import { euro, regelPrijs, totalen, datumNl, STANDAARD_INSTELLINGEN } from './rekenen.js';

/**
 * Een kleur met doorzichtigheid bestaat in een pdf niet zomaar. Lijnen op
 * de site zijn grijs op lage dekking; hier rekenen we diezelfde grijstint
 * vast uit tegen wit. Zo blijft brand.js de enige bron van de kleur.
 */
function overWit(hex, dekking) {
  const n = hex.replace('#', '');
  const kanaal = (i) => {
    const kleur = parseInt(n.slice(i, i + 2), 16);
    return Math.round(kleur * dekking + 255 * (1 - dekking));
  };
  return `#${[0, 2, 4].map((i) => kanaal(i).toString(16).padStart(2, '0')).join('')}`;
}

const KLEUR = {
  /* Geen kleur voor het papier: een pdf-pagina is al wit. Dat scheelt een
     vlak over de hele pagina in elk bestand. */
  inkt: LICHT.text,
  zacht: LICHT.textDim,
  accent: PALETTE.orange,      // als vlak
  accentInkt: LICHT.accentText, // als tekst — oranje op wit leest niet
  lijn: overWit(PALETTE.grey, 0.32),
  lijnZacht: overWit(PALETTE.grey, 0.16),
  band: PALETTE.black,
  bandTekst: PALETTE.white,
  bandZacht: PALETTE.grey,
  plaat: overWit(PALETTE.grey, 0.1),
};

const MARGE = 46;
const LINKS = MARGE;
const RECHTS = A4.breedte - MARGE;
/** Waar de kolom met bedragen begint, zodat omschrijvingen daar stoppen. */
const KOLOM_AANTAL = RECHTS - 118;
const ONDERGRENS = A4.hoogte - 78;

/** De donkere kopbalk met het woordmerk. */
function kopbalk(doc, offerte, vervolg = false) {
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
    doc.tekst('OFFERTE', RECHTS, 48, {
      grootte: 20, vet: true, kleur: KLEUR.accent, uitlijnen: 'rechts', spatiering: 1,
    });
    doc.tekst(`Nr. ${offerte.nummer}`, RECHTS, 64, {
      grootte: 8.5, kleur: KLEUR.bandTekst, uitlijnen: 'rechts',
    });
    doc.tekst(datumNl(offerte.datum), RECHTS, 76, {
      grootte: 8.5, kleur: KLEUR.bandZacht, uitlijnen: 'rechts',
    });
  } else {
    doc.tekst(`Offerte ${offerte.nummer}  ·  vervolg`, RECHTS, 34, {
      grootte: 8.5, kleur: KLEUR.bandZacht, uitlijnen: 'rechts',
    });
  }
  return hoogte + 3;
}

/** De voetregel met de bedrijfsgegevens. Staat op elke pagina. */
function voetregel(doc, paginaNr) {
  const y = A4.hoogte - 46;
  doc.lijn(LINKS, y - 20, RECHTS, y - 20, KLEUR.lijnZacht);
  doc.tekst(`${SITE.name}  ·  ${ADRES}  ·  ${SITE.phoneDisplay}  ·  ${SITE.email}`, LINKS, y - 8, {
    grootte: 7.5, kleur: KLEUR.zacht,
  });
  doc.tekst(`KVK ${SITE.kvk}  ·  Btw ${SITE.btw}`, LINKS, y + 3, {
    grootte: 7.5, kleur: KLEUR.zacht,
  });
  doc.tekst(`Pagina ${paginaNr}`, RECHTS, y + 3, {
    grootte: 7.5, kleur: KLEUR.zacht, uitlijnen: 'rechts',
  });
}

/** Een kopje boven een blokje gegevens. */
function blokkop(doc, tekst, x, y) {
  doc.tekst(tekst.toUpperCase(), x, y, {
    grootte: 7, vet: true, kleur: KLEUR.accentInkt, spatiering: 1.1,
  });
}

/**
 * De kentekenplaat, nagetekend zoals hij op de site staat: licht metaal met
 * de oranje band van het merk ervoor. Bewust niet de Nederlandse geel/blauw
 * — zie de uitleg in Kentekenplaat.astro.
 */
function kentekenplaat(doc, kenteken, x, y) {
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

/**
 * DE STREEPJES IN EEN KENTEKEN.
 *
 * De RDW levert het kenteken kaal aan: XX99XX. Op de plaat horen streepjes,
 * en waar die staan verschilt per "sidecode" — de indeling die gold in het
 * jaar dat het kenteken werd uitgegeven. Er zijn er inmiddels veertien.
 *
 * Hieronder staat per indeling het patroon: L is een letter, C een cijfer.
 * Bij bijna elke indeling hoort een eigen vorm, dus aan de vorm zie je waar
 * de streepjes moeten staan.
 *
 * TWEE VORMEN BESTAAN TWEE KEER, EN DAAR HELPT HET BOUWJAAR
 *   CCLLLL   99-XX-XX (vanaf 1991)  of  99-XXX-X (vanaf 2005)
 *   LLLLCC   XX-XX-99 (vanaf 1999)  of  X-XXX-99 (vanaf 2008)
 * Aan het kenteken alleen is niet te zien welke van de twee het is. Het
 * bouwjaar hebben we al van de RDW, dus dat geeft de doorslag. Weten we het
 * jaar niet, dan kiezen we de nieuwste vorm: de meeste auto's die hier op de
 * brug staan zijn van na die grens.
 */
const INDELINGEN = [
  { vorm: 'LLCCCC', knip: [2, 4] },   // XX-99-99
  { vorm: 'CCCCLL', knip: [2, 4] },   // 99-99-XX
  { vorm: 'CCLLCC', knip: [2, 4] },   // 99-XX-99
  { vorm: 'LLCCLL', knip: [2, 4] },   // XX-99-XX
  { vorm: 'CCLLLL', knip: [2, 4], tot: 2005 },  // 99-XX-XX
  { vorm: 'CCLLLL', knip: [2, 5] },             // 99-XXX-X
  { vorm: 'LLLLCC', knip: [2, 4], tot: 2007 },  // XX-XX-99
  { vorm: 'LLLLCC', knip: [1, 4] },             // X-XXX-99
  { vorm: 'LLCCCL', knip: [2, 5] },   // XX-999-X
  { vorm: 'LCCCLL', knip: [1, 4] },   // X-999-XX
  { vorm: 'LLLCCL', knip: [3, 5] },   // XXX-99-X
  { vorm: 'LCCLLL', knip: [1, 3] },   // X-99-XXX
  { vorm: 'CLLLCC', knip: [1, 4] },   // 9-XXX-99
  { vorm: 'CCLLLC', knip: [2, 5] },   // 99-XXX-9
];

/** Het kenteken met streepjes op de juiste plek: XX-99-XX. */
export function kentekenMetStreepjes(kenteken, bouwjaar = null) {
  const kaal = String(kenteken || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
  if (kaal.length !== 6) return kaal;

  const vorm = [...kaal].map((teken) => (/[0-9]/.test(teken) ? 'C' : 'L')).join('');
  const jaar = Number(bouwjaar);
  const gevonden = INDELINGEN.find(
    (i) => i.vorm === vorm && (!i.tot || (Number.isFinite(jaar) && jaar > 0 && jaar < i.tot))
  );
  /* Een vorm die we niet kennen (een buitenlandse plaat, een typefout) laten
     we staan zoals hij is. Liever geen streepjes dan streepjes op de
     verkeerde plek. */
  if (!gevonden) return kaal;

  const [een, twee] = gevonden.knip;
  return `${kaal.slice(0, een)}-${kaal.slice(een, twee)}-${kaal.slice(twee)}`;
}

/**
 * De offerte tekenen. Levert een pdf-document op; vraag daar `naarBlob()`
 * of `naarBytes()` aan.
 */
export function offertePdf(offerte, inst = STANDAARD_INSTELLINGEN) {
  const zakelijk = !!offerte.zakelijk;
  const doc = nieuwPdf({
    titel: `Offerte ${offerte.nummer} — ${SITE.name}`,
    maker: SITE.name,
  });

  let paginaNr = 1;
  let y = kopbalk(doc, offerte) + 34;

  /* ---- aan wie, en welke auto ---------------------------------------- */
  const rechterKolom = LINKS + 292;

  blokkop(doc, 'Voor', LINKS, y);
  const klantRegels = [
    offerte.klant?.bedrijf,
    offerte.klant?.naam,
    offerte.klant?.adres,
    offerte.klant?.telefoon,
    offerte.klant?.email,
  ].filter(Boolean);
  let ky = y + 15;
  if (!klantRegels.length) {
    doc.tekst('—', LINKS, ky, { grootte: 9.5, kleur: KLEUR.zacht });
    ky += 13;
  }
  klantRegels.forEach((regel, i) => {
    doc.tekst(regel, LINKS, ky, {
      grootte: i === 0 ? 11 : 9.5,
      vet: i === 0,
      kleur: i === 0 ? KLEUR.inkt : KLEUR.zacht,
    });
    ky += i === 0 ? 15 : 12;
  });

  blokkop(doc, 'De auto', rechterKolom, y);
  let ay = y + 6;
  if (offerte.auto?.kenteken) {
    ay += kentekenplaat(doc, kentekenMetStreepjes(offerte.auto.kenteken, offerte.auto.bouwjaar), rechterKolom, ay) + 13;
  } else {
    ay += 9;
  }
  const autoNaam = [offerte.auto?.merk, offerte.auto?.model].filter(Boolean).join(' ');
  if (autoNaam) {
    doc.tekst(autoNaam, rechterKolom, ay, { grootte: 11, vet: true, kleur: KLEUR.inkt });
    ay += 14;
  }
  const autoExtra = [
    offerte.auto?.bouwjaar && `Bouwjaar ${offerte.auto.bouwjaar}`,
    offerte.auto?.kleur,
    offerte.auto?.brandstof,
  ].filter(Boolean).join('  ·  ');
  if (autoExtra) {
    doc.tekst(autoExtra, rechterKolom, ay, { grootte: 9, kleur: KLEUR.zacht });
    ay += 12;
  }

  y = Math.max(ky, ay) + 16;

  /* ---- de regels ------------------------------------------------------ */
  const tabelkop = () => {
    doc.lijn(LINKS, y, RECHTS, y, KLEUR.lijn, 0.9);
    y += 12;
    doc.tekst('Omschrijving', LINKS, y, { grootte: 7.5, vet: true, kleur: KLEUR.zacht, spatiering: 0.8 });
    doc.tekst('Aantal', KOLOM_AANTAL, y, {
      grootte: 7.5, vet: true, kleur: KLEUR.zacht, uitlijnen: 'rechts', spatiering: 0.8,
    });
    doc.tekst(zakelijk ? 'Bedrag excl. btw' : 'Bedrag', RECHTS, y, {
      grootte: 7.5, vet: true, kleur: KLEUR.zacht, uitlijnen: 'rechts', spatiering: 0.8,
    });
    y += 8;
    doc.lijn(LINKS, y, RECHTS, y, KLEUR.lijn, 0.9);
    y += 18;
  };

  const nieuweBladzijde = () => {
    voetregel(doc, paginaNr);
    doc.nieuwePagina();
    paginaNr += 1;
    y = kopbalk(doc, offerte, true) + 26;
    tabelkop();
  };

  tabelkop();

  const regels = Array.isArray(offerte.regels) ? offerte.regels : [];
  for (const regel of regels) {
    const prijs = regelPrijs(regel, inst);
    const titelRegels = breekAf(regel.omschrijving || 'Werkzaamheden', KOLOM_AANTAL - LINKS - 16, 10, true);
    const uitleg = regel.toelichting
      ? breekAf(regel.toelichting, KOLOM_AANTAL - LINKS - 16, 8.5)
      : [];
    const hoogte = titelRegels.length * 13 + uitleg.length * 11 + 14;

    if (y + hoogte > ONDERGRENS) nieuweBladzijde();

    const bovenkant = y;
    titelRegels.forEach((tekst, i) => {
      doc.tekst(tekst, LINKS, y + i * 13, { grootte: 10, vet: true, kleur: KLEUR.inkt });
    });
    let onder = y + (titelRegels.length - 1) * 13;
    uitleg.forEach((tekst, i) => {
      doc.tekst(tekst, LINKS, onder + 12 + i * 11, { grootte: 8.5, kleur: KLEUR.zacht });
    });
    if (uitleg.length) onder += 12 + (uitleg.length - 1) * 11;

    doc.tekst(String(prijs.aantal), KOLOM_AANTAL, bovenkant, {
      grootte: 10, kleur: KLEUR.zacht, uitlijnen: 'rechts',
    });
    doc.tekst(euro(zakelijk ? prijs.exclCent : prijs.inclCent), RECHTS, bovenkant, {
      grootte: 10, vet: true, kleur: KLEUR.inkt, uitlijnen: 'rechts',
    });

    y = onder + 14;
    doc.lijn(LINKS, y - 5, RECHTS, y - 5, KLEUR.lijnZacht);
    y += 5;
  }

  if (!regels.length) {
    doc.tekst('Nog geen regels toegevoegd.', LINKS, y, { grootte: 9.5, kleur: KLEUR.zacht });
    y += 20;
  }

  /* ---- de totalen ----------------------------------------------------- */
  const t = totalen(regels, inst);
  const totaalHoogte = zakelijk ? 78 : 62;
  if (y + totaalHoogte > ONDERGRENS) nieuweBladzijde();

  y += 8;
  const labelX = RECHTS - 132;

  if (zakelijk) {
    doc.tekst('Subtotaal excl. btw', labelX, y, { grootte: 9.5, kleur: KLEUR.zacht, uitlijnen: 'rechts' });
    doc.tekst(euro(t.exclCent), RECHTS, y, { grootte: 9.5, kleur: KLEUR.inkt, uitlijnen: 'rechts' });
    y += 15;
    doc.tekst(`Btw ${inst.btwPct}%`, labelX, y, { grootte: 9.5, kleur: KLEUR.zacht, uitlijnen: 'rechts' });
    doc.tekst(euro(t.btwCent), RECHTS, y, { grootte: 9.5, kleur: KLEUR.inkt, uitlijnen: 'rechts' });
    y += 12;
  }

  doc.lijn(labelX - 40, y, RECHTS, y, KLEUR.accent, 1.4);
  y += 17;
  doc.tekst(zakelijk ? 'Totaal incl. btw' : 'Totaal', labelX, y, {
    grootte: 11, vet: true, kleur: KLEUR.inkt, uitlijnen: 'rechts',
  });
  doc.tekst(euro(t.inclCent), RECHTS, y, {
    grootte: 15, vet: true, kleur: KLEUR.accentInkt, uitlijnen: 'rechts',
  });
  y += 14;
  doc.tekst(
    zakelijk
      ? `Inclusief montage. Btw ${inst.btwPct}%: ${euro(t.btwCent)}.`
      : `Inclusief montage en ${inst.btwPct}% btw (${euro(t.btwCent)}).`,
    RECHTS, y, { grootte: 8, kleur: KLEUR.zacht, uitlijnen: 'rechts' }
  );
  y += 30;

  /* ---- de afspraken --------------------------------------------------- */
  const afspraken = [
    `Deze offerte is geldig tot en met ${datumNl(offerte.geldigTot)}.`,
    'Alle genoemde prijzen zijn all-in: inclusief montage' +
      (zakelijk ? '.' : ' en btw.'),
    'Je fabrieksgarantie blijft 100% behouden; er wordt niet in de originele bedrading geknipt.',
    'Werk gebeurt uitsluitend op afspraak. Levertijd van onderdelen in overleg.',
  ];
  if (offerte.opmerking) afspraken.push(offerte.opmerking);

  const afsprakenRegels = afspraken.flatMap((zin) => breekAf(`·  ${zin}`, RECHTS - LINKS, 8.5));
  if (y + afsprakenRegels.length * 12 + 26 > ONDERGRENS) nieuweBladzijde();

  blokkop(doc, 'Goed om te weten', LINKS, y);
  y += 15;
  for (const regel of afsprakenRegels) {
    doc.tekst(regel, LINKS, y, { grootte: 8.5, kleur: KLEUR.zacht });
    y += 12;
  }

  voetregel(doc, paginaNr);
  return doc;
}

/** Een nette bestandsnaam: offerte-2026-014-XX99XX.pdf */
export function pdfBestandsnaam(offerte) {
  const kenteken = String(offerte.auto?.kenteken || '').replace(/[^A-Za-z0-9]/g, '').toUpperCase();
  return ['offerte', offerte.nummer, kenteken].filter(Boolean).join('-') + '.pdf';
}

export { breedteVan };
