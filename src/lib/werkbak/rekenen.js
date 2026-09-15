/**
 * REKENEN AAN EEN OFFERTE — van inkoop naar de prijs die de klant betaalt.
 *
 * ALLES IN HELE CENTEN
 * Geld en kommagetallen gaan in een computer niet samen: 0.1 + 0.2 wordt
 * 0.30000000000000004. Bij één regel zie je dat niet, bij een offerte van
 * twaalf regels staat er ineens een cent verschil tussen de regels en het
 * totaal — en dat is precies het soort fout waar een klant over belt.
 * Daarom rekenen we in hele centen en zetten we pas op het laatste moment
 * om naar een bedrag met een komma.
 *
 * DE REKENSOM, ZOALS JUSTUS HEM MAAKT
 * Per regel: het onderdeel met zijn eigen marge, plus de montagetijd tegen
 * het uurtarief. Die twee bij elkaar is de prijs exclusief btw.
 *
 *     onderdeel   inkoop × (1 + marge%)
 *     arbeid      uren × uurtarief
 *     regel       (onderdeel + arbeid) × aantal
 *
 * De klant ziet die opsplitsing NIET. Op de offerte staat één bedrag per
 * regel waar montage en (bij particulieren) btw al in zitten — precies wat
 * de site belooft: de prijs die je ziet is de prijs die je betaalt.
 *
 * WAAROM DE MARGE HIER WEL UITGEREKEND WORDT
 * Justus moet vóór het versturen kunnen zien wat er onder de streep
 * overblijft. Die cijfers blijven in de app; ze komen nooit op de pdf.
 */

/** Het btw-tarief in Nederland. Staat apart, want tarieven veranderen. */
export const BTW_PCT = 21;

/**
 * De soorten onderdelen. De volgorde is de volgorde waarin ze in de app
 * staan, en die loopt gelijk met de volgorde van een inbouw: eerst de bron,
 * dan de speakers, dan wat eromheen zit.
 */
export const SOORTEN = [
  { id: 'carplay', naam: 'CarPlay / bron' },
  { id: 'speakers-voor', naam: 'Speakers voor' },
  { id: 'speakers-achter', naam: 'Speakers achter' },
  { id: 'subwoofer', naam: 'Subwoofer' },
  { id: 'versterker', naam: 'Versterker' },
  { id: 'dsp', naam: 'DSP & tuning' },
  { id: 'demping', naam: 'Deurdemping' },
  { id: 'kabels', naam: 'Kabels & montage' },
  { id: 'overig', naam: 'Overig' },
];

/** Cent → euro als tekst: 69500 wordt "€ 695,00". */
export function euro(cent) {
  const n = Math.round(Number(cent) || 0);
  const teken = n < 0 ? '-' : '';
  const heel = Math.floor(Math.abs(n) / 100);
  const rest = String(Math.abs(n) % 100).padStart(2, '0');
  // Duizendtallen met een punt, zoals het in Nederland hoort: € 1.234,56.
  const metPunten = String(heel).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${teken}€ ${metPunten},${rest}`;
}

/**
 * Euro als tekst → centen. Slikt wat iemand op een telefoon intypt:
 * "1.234,56", "1234.56", "€ 89,-" en "89" leveren allemaal het juiste getal.
 */
export function naarCent(invoer) {
  if (typeof invoer === 'number') return Math.round(invoer * 100);
  let t = String(invoer ?? '').replace(/[^0-9,.-]/g, '').trim();
  if (!t) return 0;
  /* Een minteken telt alleen vooraan. Het streepje in "€ 89,-" betekent
     "en nul cent" en is geen aftrekking; zonder deze regel leest de rest
     van deze functie er NaN in en wordt het bedrag stilletjes 0. */
  const negatief = t.startsWith('-');
  t = t.replace(/-/g, '');
  if (negatief) t = `-${t}`;
  const laatsteKomma = t.lastIndexOf(',');
  const laatstePunt = t.lastIndexOf('.');
  // Welk teken het laatst staat, is het decimaalteken. De ander scheidt
  // duizendtallen en mag weg. Zo gaat "1.234,56" én "1,234.56" goed.
  if (laatsteKomma > laatstePunt) t = t.replace(/\./g, '').replace(',', '.');
  else t = t.replace(/,/g, '');
  const n = Number(t);
  return Number.isFinite(n) ? Math.round(n * 100) : 0;
}

/** De instellingen zoals ze staan als Justus nog niets heeft aangepast. */
export const STANDAARD_INSTELLINGEN = {
  /** Wat een uur montage kost. Hij zet dit zelf goed bij het eerste gebruik. */
  uurtariefCent: 7500,
  /** De marge die een nieuw onderdeel meekrijgt zolang er niets anders staat. */
  margePct: 60,
  btwPct: BTW_PCT,
  /** Hoe lang een offerte geldig blijft, in dagen. */
  geldigDagen: 30,
  /** Het nummer dat de eerstvolgende offerte krijgt. */
  volgnummer: 1,
};

/**
 * Eén regel doorrekenen.
 *
 * Een regel is óf een onderdeel uit de catalogus (inkoop + marge + uren),
 * óf een vaste prijs — dat laatste zijn de vijf pakketten van de site, die
 * hebben hun prijs al en daar mag niets aan gerekend worden.
 */
export function regelPrijs(regel, inst = STANDAARD_INSTELLINGEN) {
  const aantal = Math.max(1, Math.round(Number(regel.aantal) || 1));
  const inkoopCent = Math.max(0, Math.round(Number(regel.inkoopCent) || 0));
  const uren = Math.max(0, Number(regel.uren) || 0);
  const margePct = Number.isFinite(Number(regel.margePct))
    ? Number(regel.margePct)
    : Number(inst.margePct) || 0;
  const uurtariefCent = Math.max(0, Math.round(Number(inst.uurtariefCent) || 0));
  const btwPct = Number(inst.btwPct) ?? BTW_PCT;

  const onderdeelCent = Math.round(inkoopCent * (1 + margePct / 100));
  const arbeidCent = Math.round(uren * uurtariefCent);

  /* Een vaste prijs overrulet de rekensom, maar de inkoop blijft wél staan:
     anders lijkt een pakket in het marge-overzicht gratis ingekocht. */
  const perStukExcl = regel.vastExclCent != null
    ? Math.max(0, Math.round(Number(regel.vastExclCent)))
    : onderdeelCent + arbeidCent;

  const exclCent = perStukExcl * aantal;
  const btwCent = Math.round((exclCent * btwPct) / 100);

  return {
    aantal,
    perStukExcl,
    exclCent,
    btwCent,
    inclCent: exclCent + btwCent,
    /* Voor het marge-overzicht: wat deze regel Justus zelf kost. */
    kostprijsCent: inkoopCent * aantal,
    arbeidCent: arbeidCent * aantal,
    urenTotaal: uren * aantal,
  };
}

/** Alle regels bij elkaar: wat er onder de offerte komt te staan. */
export function totalen(regels = [], inst = STANDAARD_INSTELLINGEN) {
  const uit = {
    exclCent: 0, btwCent: 0, inclCent: 0,
    kostprijsCent: 0, arbeidCent: 0, urenTotaal: 0,
  };
  for (const regel of regels) {
    const p = regelPrijs(regel, inst);
    uit.exclCent += p.exclCent;
    uit.btwCent += p.btwCent;
    uit.inclCent += p.inclCent;
    uit.kostprijsCent += p.kostprijsCent;
    uit.arbeidCent += p.arbeidCent;
    uit.urenTotaal += p.urenTotaal;
  }
  return uit;
}

/**
 * Het marge-overzicht — alleen voor Justus, nooit op de pdf.
 *
 * `margePct` is de marge op de vérkoopprijs, niet de opslag op de inkoop.
 * Dat verschil is groot en wordt vaak door elkaar gehaald: koop je voor 100
 * en verkoop je voor 200, dan is de opslag 100% maar de marge 50%. De bank
 * en de boekhouder rekenen met dat tweede getal, dus dat tonen we.
 */
export function marge(regels = [], inst = STANDAARD_INSTELLINGEN) {
  const t = totalen(regels, inst);
  const margeCent = t.exclCent - t.kostprijsCent;
  return {
    omzetCent: t.exclCent,
    kostprijsCent: t.kostprijsCent,
    margeCent,
    margePct: t.exclCent > 0 ? (margeCent / t.exclCent) * 100 : 0,
    arbeidCent: t.arbeidCent,
    urenTotaal: t.urenTotaal,
  };
}

/**
 * Het offertenummer: 2026-014.
 *
 * Het jaartal erin scheelt zoeken zodra er een tweede jaar bij komt, en een
 * doorlopend nummer is wat de Belastingdienst van een factuur verlangt —
 * offertes worden vaak één op één facturen, dus we beginnen goed.
 */
export function offertenummer(volgnummer, datum = new Date()) {
  const n = Math.max(1, Math.round(Number(volgnummer) || 1));
  return `${datum.getFullYear()}-${String(n).padStart(3, '0')}`;
}

/** Datum als 15-09-2026 — hoe iedereen in Nederland hem leest. */
export function datumNl(datum = new Date()) {
  const d = new Date(datum);
  return [
    String(d.getDate()).padStart(2, '0'),
    String(d.getMonth() + 1).padStart(2, '0'),
    d.getFullYear(),
  ].join('-');
}

/** De datum waarop de offerte verloopt. */
export function geldigTot(datum, dagen) {
  const d = new Date(datum);
  d.setDate(d.getDate() + (Math.round(Number(dagen)) || 0));
  return d;
}
