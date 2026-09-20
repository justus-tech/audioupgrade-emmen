/**
 * HET RAPPORT — hoe loopt het eigenlijk?
 *
 * WAAROM DIT BESTAAT
 * Per offerte zag Justus al wat hij eraan overhield. Wat hij niet zag: hoe de
 * maand loopt, waar de marge vandaan komt, en — het belangrijkste — wat er nog
 * moet binnenkomen. Een factuur die is verstuurd en nooit betaald valt in een
 * lijst van veertig offertes niet op.
 *
 * WAT DIT NIET IS
 * Geen boekhouding. Hier staat alleen wat er in Headroom is ingevoerd. Werk je
 * iets buiten de app om af, dan staat het hier niet in en klopt het bedrag dus
 * niet met je bankrekening. Het is een hulpmiddel om te zien hoe je draait en
 * om achterstallige betalingen op te sporen, niet iets om een btw-aangifte op
 * te baseren.
 *
 * OP WELKE DATUM
 * Op de inbouwdatum als die is ingevuld, anders op de datum van de offerte.
 * Dat is de dag waarop het werk gebeurde, en dat is wat je bedoelt als je
 * vraagt "wat heb ik in september gedraaid".
 */
import {
  totalen, marge, soortenIn, SOORTEN, STANDAARD_INSTELLINGEN, euro, datumNl,
} from './rekenen.js';
import { opMiddernacht } from './agenda.js';
import { nieuwPdf, breekAf } from './pdf.js';
import { KLEUR, LINKS, RECHTS, ONDERGRENS, kopbalk, voetregel, blokkop } from './opmaak.js';
import { SITE } from '../../data/site.js';

/** Statussen waarbij de klus is doorgegaan en er dus omzet is. */
const DOORGEGAAN = ['aanbetaald', 'gefactureerd', 'betaald'];

/** De dag waarop deze klus meetelt. */
export function telDatum(offerte = {}) {
  return opMiddernacht(offerte.inbouwdatum) || opMiddernacht(offerte.datum);
}

const MAANDEN = [
  'januari', 'februari', 'maart', 'april', 'mei', 'juni',
  'juli', 'augustus', 'september', 'oktober', 'november', 'december',
];

/**
 * De periodes die je kunt kiezen, met een begin en een eind.
 *
 * `tot` is de eerste dag ná de periode. Zo hoef je nergens te rekenen met
 * "de laatste dag van de maand", wat bij februari en bij een schrikkeljaar
 * precies het soort fout geeft dat je pas een jaar later ziet.
 */
export function periodes(vandaag = new Date()) {
  const jaar = vandaag.getFullYear();
  const maand = vandaag.getMonth();
  const kwartaal = Math.floor(maand / 3);
  const dag = (j, m, d = 1) => new Date(j, m, d, 0, 0, 0, 0);

  return [
    {
      id: 'maand',
      naam: 'Deze maand',
      kop: `${MAANDEN[maand]} ${jaar}`,
      van: dag(jaar, maand),
      tot: dag(jaar, maand + 1),
    },
    {
      id: 'vorige-maand',
      naam: 'Vorige maand',
      kop: `${MAANDEN[(maand + 11) % 12]} ${maand === 0 ? jaar - 1 : jaar}`,
      van: dag(jaar, maand - 1),
      tot: dag(jaar, maand),
    },
    {
      id: 'kwartaal',
      naam: 'Dit kwartaal',
      kop: `${kwartaal + 1}e kwartaal ${jaar}`,
      van: dag(jaar, kwartaal * 3),
      tot: dag(jaar, kwartaal * 3 + 3),
    },
    {
      id: 'jaar',
      naam: 'Dit jaar',
      kop: `${jaar}`,
      van: dag(jaar, 0),
      tot: dag(jaar + 1, 0),
    },
    { id: 'alles', naam: 'Alles', kop: 'alles bij elkaar', van: null, tot: null },
  ];
}

/** Valt deze klus binnen de periode? */
function binnen(offerte, periode) {
  if (!periode || (!periode.van && !periode.tot)) return true;
  const d = telDatum(offerte);
  if (!d) return false;
  if (periode.van && d < periode.van) return false;
  if (periode.tot && d >= periode.tot) return false;
  return true;
}

/** Eén klus doorrekenen. */
function doorrekenen(offerte, inst) {
  const korting = offerte.kortingExclCent || 0;
  const t = totalen(offerte.regels || [], inst, korting);
  const m = marge(offerte.regels || [], inst, korting);
  return { t, m };
}

/**
 * HET RAPPORT.
 *
 * Levert vier dingen op:
 *
 *   omzet        wat de klussen in deze periode hebben opgebracht
 *   openstaand   wat er nog moet binnenkomen — los van de periode, want geld
 *                dat je nog krijgt houdt zich niet aan een maandgrens
 *   perSoort     waar de marge vandaan komt
 *   conversie    hoeveel van je offertes doorgaan
 */
export function rapport(offertes = [], inst = STANDAARD_INSTELLINGEN, periode = null) {
  const inPeriode = offertes.filter((o) => binnen(o, periode));
  const gedaan = inPeriode.filter((o) => DOORGEGAAN.includes(o.status));

  const omzet = {
    aantal: gedaan.length,
    exclCent: 0,
    btwCent: 0,
    inclCent: 0,
    inkoopCent: 0,
    margeCent: 0,
    margePct: 0,
    uren: 0,
    gemiddeldInclCent: 0,
  };

  const perSoort = new Map();

  for (const o of gedaan) {
    const { t, m } = doorrekenen(o, inst);
    omzet.exclCent += t.exclCent;
    omzet.btwCent += t.btwCent;
    omzet.inclCent += t.inclCent;
    omzet.inkoopCent += m.kostprijsCent;
    omzet.margeCent += m.margeCent;
    omzet.uren += m.urenTotaal;

    /**
     * Een klus telt mee bij elk soort werk dat erin zit. Twee soorten op één
     * offerte betekent dus dat die omzet bij allebei staat; de kolom telt
     * daarom niet op tot het totaal. Dat staat er ook bij — anders gaat
     * iemand de kolom optellen en klopt er niets van.
     */
    for (const soort of soortenIn(o.regels || [])) {
      const staand = perSoort.get(soort) || { soort, aantal: 0, exclCent: 0, margeCent: 0 };
      staand.aantal += 1;
      staand.exclCent += t.exclCent;
      staand.margeCent += m.margeCent;
      perSoort.set(soort, staand);
    }
  }

  omzet.margePct = omzet.exclCent > 0 ? (omzet.margeCent / omzet.exclCent) * 100 : 0;
  omzet.gemiddeldInclCent = gedaan.length ? Math.round(omzet.inclCent / gedaan.length) : 0;

  /**
   * WAT ER NOG MOET BINNENKOMEN.
   *
   * Bewust over álle offertes en niet alleen over de gekozen periode: een
   * factuur van twee maanden geleden die nooit betaald is, is juist dán het
   * belangrijkste getal op dit scherm.
   */
  const openstaand = {
    verstuurd: { aantal: 0, inclCent: 0 },
    aanbetaald: { aantal: 0, inclCent: 0 },
    gefactureerd: { aantal: 0, inclCent: 0 },
  };

  for (const o of offertes) {
    const { t } = doorrekenen(o, inst);
    if (o.status === 'verstuurd') {
      openstaand.verstuurd.aantal += 1;
      openstaand.verstuurd.inclCent += t.inclCent;
    } else if (o.status === 'aanbetaald') {
      /* Al aanbetaald: alleen het restant moet nog komen. */
      openstaand.aanbetaald.aantal += 1;
      openstaand.aanbetaald.inclCent += Math.max(0, t.inclCent - (o.factuur?.inclCent || 0));
    } else if (o.status === 'gefactureerd') {
      openstaand.gefactureerd.aantal += 1;
      openstaand.gefactureerd.inclCent += Math.max(0, t.inclCent - (o.factuur?.inclCent || 0));
    }
  }

  const verstuurdOfVerder = inPeriode.filter((o) => o.status && o.status !== 'concept');
  const conversie = {
    gemaakt: inPeriode.length,
    verstuurd: verstuurdOfVerder.length,
    doorgegaan: gedaan.length,
    pct: verstuurdOfVerder.length
      ? (gedaan.length / verstuurdOfVerder.length) * 100
      : 0,
  };

  return {
    periode,
    omzet,
    openstaand,
    conversie,
    perSoort: [...perSoort.values()].sort((a, b) => b.margeCent - a.margeCent),
  };
}

/** De nette naam van een soort werk, voor op het scherm. */
export function soortNaam(id) {
  return SOORTEN.find((s) => s.id === id)?.naam || id;
}

/**
 * HET RAPPORT ALS PDF.
 *
 * Voor jezelf, of om aan je boekhouder te laten zien hoe de maand liep. Er
 * staan hier wél inkoopprijzen en marges op — dit stuk gaat nooit naar een
 * klant. Dat staat er ook groot op, want een pdf die per ongeluk in de
 * verkeerde WhatsApp belandt is precies de fout die je één keer maakt.
 */
export function rapportPdf(r, inst = STANDAARD_INSTELLINGEN, vandaag = new Date()) {
  const kop = { soort: 'Rapport', nummer: r.periode?.kop || 'alles', datum: vandaag };
  /* Hier staan inkoopprijzen en marges op. Dit stuk gaat nooit naar een klant,
     en dat moet op elke pagina staan. */
  const voet = { intern: true, waarschuwing: 'Alleen voor jezelf — hier staan je inkoop en je marge op.' };
  const doc = nieuwPdf({ titel: `Rapport ${r.periode?.kop || ''} — ${SITE.name}`, maker: SITE.name });
  let paginaNr = 1;
  let y = kopbalk(doc, kop) + 24;

  const ruimte = (hoogte) => {
    if (y + hoogte <= ONDERGRENS) return;
    voetregel(doc, paginaNr, voet);
    doc.nieuwePagina();
    paginaNr += 1;
    y = kopbalk(doc, { ...kop, vervolg: true }) + 24;
  };

  /** Eén regel: omschrijving links, bedrag rechts, toelichting eronder. */
  const regel = (wat, bedrag, bij = '') => {
    ruimte(bij ? 26 : 16);
    doc.tekst(wat, LINKS, y, { grootte: 9.5, kleur: KLEUR.inkt });
    doc.tekst(bedrag, RECHTS, y, { grootte: 9.5, vet: true, kleur: KLEUR.inkt, uitlijnen: 'rechts' });
    y += 13;
    if (bij) {
      for (const stuk of breekAf(bij, RECHTS - LINKS, 8)) {
        doc.tekst(stuk, LINKS, y, { grootte: 8, kleur: KLEUR.zacht });
        y += 10;
      }
      y += 2;
    }
  };

  const blok = (titel, regels) => {
    if (!regels.length) return;
    ruimte(40);
    blokkop(doc, titel, LINKS, y);
    y += 16;
    doc.lijn(LINKS, y - 4, RECHTS, y - 4, KLEUR.lijn, 0.6);
    y += 6;
    for (const [wat, bedrag, bij] of regels) regel(wat, bedrag, bij);
    y += 12;
  };

  const open = r.openstaand;
  blok('Moet nog binnenkomen', [
    open.gefactureerd.inclCent
      ? ['Gefactureerd, nog niet betaald', euro(open.gefactureerd.inclCent),
        `${open.gefactureerd.aantal} × — hier achteraan.`]
      : null,
    open.aanbetaald.inclCent
      ? ['Restant na de aanbetaling', euro(open.aanbetaald.inclCent),
        `${open.aanbetaald.aantal} × in de planning.`]
      : null,
    open.verstuurd.inclCent
      ? ['Offertes waar nog niets op binnen is', euro(open.verstuurd.inclCent),
        `${open.verstuurd.aantal} ×.`]
      : null,
  ].filter(Boolean));

  const o = r.omzet;
  blok(`Omzet ${r.periode?.kop || ''}`.trim(), o.aantal ? [
    ['Omzet excl. btw', euro(o.exclCent), `Over ${o.aantal} klus${o.aantal === 1 ? '' : 'sen'}.`],
    [`Btw ${inst.btwPct}%`, euro(o.btwCent)],
    ['Omzet incl. btw', euro(o.inclCent)],
    ['Inkoop', euro(o.inkoopCent)],
    ['Marge', euro(o.margeCent), `${o.margePct.toFixed(1).replace('.', ',')}% van de omzet.`],
    ['Gemiddeld per klus', euro(o.gemiddeldInclCent), 'Inclusief btw.'],
    ['Montage-uren', `${String(o.uren).replace('.', ',')} uur`],
  ] : [['Geen klus doorgegaan in deze periode', '—']]);

  blok('Waar de marge vandaan komt', r.perSoort.map((s) => [
    soortNaam(s.soort),
    euro(s.margeCent),
    `${s.aantal} klus${s.aantal === 1 ? '' : 'sen'} · omzet ${euro(s.exclCent)}.`,
  ]));

  const c = r.conversie;
  if (c.verstuurd) {
    blok('Hoeveel gaat er door', [
      ['Doorgegaan', `${c.doorgegaan} van ${c.verstuurd}`,
        `${c.pct.toFixed(0)}% van wat je verstuurde.`],
      ['Gemaakt in deze periode', String(c.gemaakt), 'Inclusief concepten.'],
    ]);
  }

  ruimte(50);
  doc.lijn(LINKS, y, RECHTS, y, KLEUR.lijn, 0.6);
  y += 14;
  for (const stuk of breekAf(
    'Dit is geen boekhouding. Hier staat alleen wat er in Headroom is ingevoerd; ' +
    'werk dat buiten de app om is afgehandeld staat er niet bij. Een klus telt mee op ' +
    'zijn inbouwdatum, en anders op de datum van de offerte.',
    RECHTS - LINKS, 8
  )) {
    doc.tekst(stuk, LINKS, y, { grootte: 8, kleur: KLEUR.zacht });
    y += 10;
  }

  voetregel(doc, paginaNr, voet);
  return doc;
}

/** rapport-september-2026.pdf */
export function rapportBestandsnaam(r) {
  const stuk = String(r.periode?.kop || 'alles')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return `rapport-${stuk}.pdf`;
}
