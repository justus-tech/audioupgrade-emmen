/**
 * DE AANBETALINGSFACTUUR.
 *
 * WAAROM DIT GEEN BETAALVERZOEK IS
 * Een betaalverzoek uit een bankapp is een appje met een bedrag. Deze factuur
 * ziet eruit als de offerte die de klant net kreeg, en hij voldoet aan wat de
 * Belastingdienst van een factuur verlangt. Dat scheelt gedoe achteraf — bij
 * de klant die hem wil aftrekken, en bij Justus' eigen boekhouding.
 *
 * WAT ER VOLGENS DE BELASTINGDIENST OP MOET, EN WAAR HET STAAT
 *
 *   factuurnummer, doorlopend        rechtsboven, eigen reeks (2026-F014)
 *   factuurdatum                     rechtsboven
 *   naam en adres van de leverancier de voetregel
 *   KVK- en btw-nummer               de voetregel
 *   naam en adres van de klant       linksboven
 *   omschrijving van de dienst       de regels in het midden
 *   bedrag zonder btw                bij de totalen
 *   btw-tarief en btw-bedrag         bij de totalen
 *
 * Het adres van de klant is geen sierlijkheid: boven de honderd euro is een
 * factuur zonder adres van de afnemer niet geldig. De app waarschuwt als het
 * veld leeg is.
 *
 * OVER DE BTW BIJ VOORUITBETALING
 * Die is verschuldigd op het moment dat het geld binnenkomt, niet pas bij
 * oplevering. Daarom staat de btw hier gewoon op, en rekent de eindfactuur
 * straks alleen nog over het restant.
 */
import { nieuwPdf, breekAf } from './pdf.js';
import { SITE, ADRES } from '../../data/site.js';
import { formatteerKenteken } from '../match.js';
import {
  KLEUR, LINKS, RECHTS, ONDERGRENS,
  kopbalk, voetregel, blokkop, kentekenplaat,
} from './opmaak.js';
import { euro, aanbetaling, datumNl, geldigTot, STANDAARD_INSTELLINGEN } from './rekenen.js';

/** Waar de bedragen rechts uitgelijnd staan. */
const KOLOM_BEDRAG = RECHTS;

/**
 * De factuur tekenen.
 *
 * @param {object} offerte   de offerte waar deze aanbetaling bij hoort
 * @param {object} inst      de instellingen (btw, iban, betaaltermijn)
 * @param {object} opties    { nummer, datum, percentage }
 */
export function factuurPdf(offerte, inst = STANDAARD_INSTELLINGEN, opties = {}) {
  const datum = opties.datum || new Date();
  const nummer = opties.nummer || '2026-F001';
  const deel = aanbetaling(offerte.regels || [], inst, opties.percentage);
  const vervalt = geldigTot(datum, inst.betaaltermijnDagen ?? 14);

  const doc = nieuwPdf({
    titel: `Factuur ${nummer} - ${SITE.name}`,
    maker: SITE.name,
  });

  const kop = { soort: 'Factuur', nummer, datum };
  let paginaNr = 1;
  let y = kopbalk(doc, kop) + 30;

  const ruimte = (hoogte) => {
    if (y + hoogte > ONDERGRENS) {
      voetregel(doc, paginaNr);
      doc.nieuwePagina();
      paginaNr += 1;
      y = kopbalk(doc, { ...kop, vervolg: true }) + 26;
    }
  };

  /* ---- aan wie, en waarvoor ------------------------------------------- */
  const rechterKolom = LINKS + 292;

  blokkop(doc, 'Factuur aan', LINKS, y);
  let ky = y + 15;
  const klantRegels = [
    offerte.klant?.bedrijf,
    offerte.klant?.naam,
    offerte.klant?.adres,
    offerte.klant?.email,
  ].filter(Boolean);
  if (!klantRegels.length) klantRegels.push('—');
  klantRegels.forEach((regel, i) => {
    /* Een adres kan over twee regels lopen ("Hoofdstraat 1, 7811 AA Emmen"). */
    for (const stuk of breekAf(regel, rechterKolom - LINKS - 16, i === 0 ? 11 : 9.5, i === 0)) {
      doc.tekst(stuk, LINKS, ky, {
        grootte: i === 0 ? 11 : 9.5,
        vet: i === 0,
        kleur: i === 0 ? KLEUR.inkt : KLEUR.zacht,
      });
      ky += i === 0 ? 15 : 12;
    }
  });

  blokkop(doc, 'Betreft', rechterKolom, y);
  let ay = y + 6;
  if (offerte.auto?.kenteken) {
    ay += kentekenplaat(
      doc, formatteerKenteken(offerte.auto.kenteken, offerte.auto.bouwjaar), rechterKolom, ay
    ) + 14;
  } else {
    ay += 10;
  }
  const autoNaam = [offerte.auto?.merk, offerte.auto?.model].filter(Boolean).join(' ');
  if (autoNaam) {
    doc.tekst(autoNaam, rechterKolom, ay, { grootte: 11, vet: true, kleur: KLEUR.inkt });
    ay += 14;
  }
  doc.tekst(`Offerte ${offerte.nummer}`, rechterKolom, ay, { grootte: 9, kleur: KLEUR.zacht });
  ay += 12;
  doc.tekst(`Vervaldatum ${datumNl(vervalt)}`, rechterKolom, ay, { grootte: 9, kleur: KLEUR.zacht });
  ay += 12;

  y = Math.max(ky, ay) + 16;

  /* ---- waar de aanbetaling voor is ------------------------------------ */
  ruimte(70);
  doc.lijn(LINKS, y, RECHTS, y, KLEUR.lijn, 0.9);
  y += 12;
  doc.tekst('Omschrijving', LINKS, y, {
    grootte: 7.5, vet: true, kleur: KLEUR.zacht, spatiering: 0.8,
  });
  doc.tekst('Bedrag', KOLOM_BEDRAG, y, {
    grootte: 7.5, vet: true, kleur: KLEUR.zacht, uitlijnen: 'rechts', spatiering: 0.8,
  });
  y += 8;
  doc.lijn(LINKS, y, RECHTS, y, KLEUR.lijn, 0.9);
  y += 18;

  doc.tekst(`Aanbetaling ${deel.pct}% op offerte ${offerte.nummer}`, LINKS, y, {
    grootte: 10, vet: true, kleur: KLEUR.inkt,
  });
  doc.tekst(euro(deel.exclCent), KOLOM_BEDRAG, y, {
    grootte: 10, vet: true, kleur: KLEUR.inkt, uitlijnen: 'rechts',
  });
  y += 14;

  /**
   * Wat er voor het werk op de offerte stond, als opsomming. Zonder bedragen:
   * die staan op de offerte, en twee keer hetzelfde bedrag op twee papieren is
   * vragen om verwarring over wat er nu betaald moet worden.
   */
  const werk = (offerte.regels || []).map((r) => r.omschrijving).filter(Boolean);
  if (werk.length) {
    doc.tekst('Voor de werkzaamheden:', LINKS, y, { grootte: 8.5, kleur: KLEUR.zacht });
    y += 11;
    for (const stuk of werk) {
      for (const regel of breekAf(`·  ${stuk}`, RECHTS - LINKS - 10, 8.5)) {
        ruimte(14);
        doc.tekst(regel, LINKS + 6, y, { grootte: 8.5, kleur: KLEUR.zacht });
        y += 11;
      }
    }
  }
  y += 6;
  doc.lijn(LINKS, y, RECHTS, y, KLEUR.lijnZacht);
  y += 16;

  /* ---- de totalen ----------------------------------------------------- */
  ruimte(90);
  const labelX = RECHTS - 132;

  doc.tekst('Bedrag zonder btw', labelX, y, {
    grootte: 9.5, kleur: KLEUR.zacht, uitlijnen: 'rechts',
  });
  doc.tekst(euro(deel.exclCent), KOLOM_BEDRAG, y, {
    grootte: 9.5, kleur: KLEUR.inkt, uitlijnen: 'rechts',
  });
  y += 15;
  doc.tekst(`Btw ${inst.btwPct ?? 21}%`, labelX, y, {
    grootte: 9.5, kleur: KLEUR.zacht, uitlijnen: 'rechts',
  });
  doc.tekst(euro(deel.btwCent), KOLOM_BEDRAG, y, {
    grootte: 9.5, kleur: KLEUR.inkt, uitlijnen: 'rechts',
  });
  y += 12;

  doc.lijn(labelX - 40, y, RECHTS, y, KLEUR.accent, 1.4);
  y += 17;
  doc.tekst('Nu te betalen', labelX, y, {
    grootte: 11, vet: true, kleur: KLEUR.inkt, uitlijnen: 'rechts',
  });
  doc.tekst(euro(deel.inclCent), KOLOM_BEDRAG, y, {
    grootte: 15, vet: true, kleur: KLEUR.accentInkt, uitlijnen: 'rechts',
  });
  y += 14;
  doc.tekst(
    `Restant na oplevering: ${euro(deel.restInclCent)} — offertetotaal ${euro(deel.totaalInclCent)}.`,
    RECHTS, y, { grootte: 8, kleur: KLEUR.zacht, uitlijnen: 'rechts' }
  );
  y += 28;

  /* ---- hoe te betalen -------------------------------------------------- */
  ruimte(88);
  doc.vlak(LINKS, y - 12, RECHTS - LINKS, 74, KLEUR.vlakZacht);
  doc.vlak(LINKS, y - 12, 3, 74, KLEUR.accent);
  blokkop(doc, 'Betalen', LINKS + 14, y);
  y += 16;

  const betaalregels = [
    ['Rekeningnummer', inst.iban || 'nog niet ingevuld'],
    ['Ten name van', inst.tenaamstelling || SITE.name],
    ['Kenmerk', nummer],
    ['Vóór', datumNl(vervalt)],
  ];
  for (const [label, waarde] of betaalregels) {
    doc.tekst(label, LINKS + 14, y, { grootte: 8, kleur: KLEUR.zacht });
    doc.tekst(waarde, LINKS + 100, y, { grootte: 9.5, vet: true, kleur: KLEUR.inkt });
    y += 13;
  }
  y += 18;

  /* ---- de afspraken ---------------------------------------------------- */
  const afspraken = [
    'Deze factuur is een vooruitbetaling. De werkzaamheden worden ingepland zodra het bedrag binnen is.',
    'Het restant wordt gefactureerd bij oplevering van de auto.',
    'Alle prijzen zijn all-in: inclusief montage en btw.',
    'Je fabrieksgarantie blijft 100% behouden.',
  ];
  if (offerte.opmerking) afspraken.push(offerte.opmerking);

  const regels = afspraken.flatMap((zin) => breekAf(`·  ${zin}`, RECHTS - LINKS, 8.5));
  ruimte(regels.length * 12 + 26);
  blokkop(doc, 'Goed om te weten', LINKS, y);
  y += 15;
  for (const regel of regels) {
    doc.tekst(regel, LINKS, y, { grootte: 8.5, kleur: KLEUR.zacht });
    y += 12;
  }

  voetregel(doc, paginaNr);
  return doc;
}

/** Een nette bestandsnaam: factuur-2026-F014-XX99XX.pdf */
export function factuurBestandsnaam(nummer, offerte) {
  const kenteken = String(offerte?.auto?.kenteken || '').replace(/[^A-Za-z0-9]/g, '').toUpperCase();
  return ['factuur', nummer, kenteken].filter(Boolean).join('-') + '.pdf';
}

export { ADRES };
