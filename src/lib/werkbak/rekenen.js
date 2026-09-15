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

  /* ---- voor de aanbetalingsfactuur ---- */
  /**
   * Het nummer dat de eerstvolgende factuur krijgt.
   *
   * Bewust een EIGEN reeks, los van de offertes. De Belastingdienst wil dat
   * factuurnummers doorlopen en niet dubbel voorkomen; deel je één teller met
   * je offertes, dan zitten er gaten in je factuurreeks zodra een offerte
   * niet doorgaat. Een offerte heet 2026-014, een factuur 2026-F014.
   */
  factuurVolgnummer: 1,
  /** Welk deel je vooraf vraagt. Justus kan dit per factuur aanpassen. */
  aanbetalingPct: 30,
  /** Binnen hoeveel dagen de factuur betaald moet zijn. */
  betaaltermijnDagen: 14,
  /**
   * Rekeningnummer en tenaamstelling.
   *
   * Leeg bij het begin, en met opzet: dit staat nergens in deze code. De map
   * staat openbaar op GitHub. Justus vult ze één keer in bij Instellingen,
   * en dan blijven ze in zijn telefoon.
   */
  iban: '',
  tenaamstelling: '',
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
  /**
   * De inkoop is het onderdeel zélf plus alles wat er verplicht bij hoort:
   * adapterringen, stekkerkabels, butyl, zekeringhouder.
   *
   * Waarom dat hier bij elkaar geteld wordt en niet als losse regels op de
   * offerte staat: de klant koopt "speakers voorin", geen zes artikelen. Maar
   * die zes artikelen kosten wél geld, en tellen ze niet mee, dan lijkt de
   * marge hoger dan hij is en loop je elke klus een paar tientjes mis.
   *
   * Op de werkbon staan ze wél allemaal apart — daar moet elk kabeltje
   * kloppen, want daar werk je mee.
   */
  const toebehorenCent = (regel.toebehoren || []).reduce(
    (som, t) => som + Math.max(0, Math.round(Number(t.inkoopCent) || 0)) * Math.max(1, Math.round(Number(t.aantal) || 1)),
    0
  );
  const inkoopCent = Math.max(0, Math.round(Number(regel.inkoopCent) || 0)) + toebehorenCent;
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

/**
 * Alle regels bij elkaar: wat er onder de offerte komt te staan.
 *
 * `kortingExclCent` is een korting op het bedrag exclusief btw. Die komt er
 * hier af en niet ergens later, want alles wat hierna komt — de btw, de
 * marge, de aanbetaling, de facturen — rekent met deze uitkomst. Zou je de
 * korting pas op de offerte aftrekken, dan klopt je marge niet meer en vraag
 * je een aanbetaling over een bedrag dat de klant nooit gaat betalen.
 *
 * De korting wordt nooit groter dan het bedrag zelf: een offerte met een
 * negatief totaal bestaat niet.
 */
export function totalen(regels = [], inst = STANDAARD_INSTELLINGEN, kortingExclCent = 0) {
  const uit = {
    exclCent: 0, btwCent: 0, inclCent: 0,
    kostprijsCent: 0, arbeidCent: 0, urenTotaal: 0,
    kortingExclCent: 0, kortingInclCent: 0,
  };
  for (const regel of regels) {
    const p = regelPrijs(regel, inst);
    uit.exclCent += p.exclCent;
    uit.btwCent += p.btwCent;
    uit.kostprijsCent += p.kostprijsCent;
    uit.arbeidCent += p.arbeidCent;
    uit.urenTotaal += p.urenTotaal;
  }

  /**
   * De btw is de som van de btw per regel, en niet de btw over het totaal.
   *
   * Dat is geen detail. Op de offerte staat per regel een bedrag inclusief
   * btw, en de klant telt die op. Rondt de app de btw over het totaal af, dan
   * scheelt dat bij een stuk of tien regels zomaar een paar cent met wat er
   * onderaan staat — en dan zit je die aan de telefoon uit te leggen.
   *
   * De korting krijgt om dezelfde reden zijn eigen btw. Zo blijft gelden:
   * regels bij elkaar, min de korting, is precies het totaal.
   */
  const btwPct = Number(inst.btwPct) ?? BTW_PCT;
  const korting = Math.min(uit.exclCent, Math.max(0, Math.round(Number(kortingExclCent) || 0)));
  if (korting) {
    const kortingBtw = Math.round((korting * btwPct) / 100);
    uit.kortingExclCent = korting;
    uit.kortingInclCent = korting + kortingBtw;
    uit.exclCent -= korting;
    uit.btwCent -= kortingBtw;
  }

  uit.inclCent = uit.exclCent + uit.btwCent;
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
export function marge(regels = [], inst = STANDAARD_INSTELLINGEN, kortingExclCent = 0) {
  const t = totalen(regels, inst, kortingExclCent);
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
 * DE STUKLIJST — elk artikel apart, voor de werkbon.
 *
 * Waar de offerte één regel toont ("Premium composet voor"), moet de werkbon
 * elk artikel noemen: de speakers, de ringen, de adapterkabels, de rol butyl.
 * Anders sta je bij de auto en mis je één kabeltje.
 *
 * Elke regel levert dus het hoofdartikel plus zijn toebehoren op, met het
 * aantal al vermenigvuldigd met het aantal van de regel: twee composets
 * betekent vier ringen.
 */
export function stuklijst(regels = []) {
  const uit = [];
  for (const regel of regels) {
    const aantal = Math.max(1, Math.round(Number(regel.aantal) || 1));
    uit.push({
      omschrijving: regel.omschrijving || 'Onbenoemd artikel',
      artikelnummer: regel.artikelnummer || '',
      leverancier: regel.leverancier || '',
      aantal,
      hoofd: true,
    });
    for (const toebehoren of regel.toebehoren || []) {
      uit.push({
        omschrijving: toebehoren.omschrijving || 'Onbenoemd artikel',
        artikelnummer: toebehoren.artikelnummer || '',
        leverancier: toebehoren.leverancier || '',
        aantal: Math.max(1, Math.round(Number(toebehoren.aantal) || 1)) * aantal,
        hoofd: false,
      });
    }
  }
  return uit;
}

/**
 * Welke soorten werk zitten er in deze offerte? Bepaalt de werkinstructie.
 *
 * Een los onderdeel heeft één soort ("speakers-voor"). Een pakket van de site
 * raakt er meerdere tegelijk: bij de Akoestische Basis gaan de deuren open,
 * komt er demping in én komen er speakers. Daarom mag een regel ook een lijst
 * `soorten` hebben; dan verschijnen alle bijbehorende blokken op de werkbon.
 */
export function soortenIn(regels = []) {
  const uit = new Set();
  for (const regel of regels) {
    if (regel.soort) uit.add(regel.soort);
    for (const soort of regel.soorten || []) if (soort) uit.add(soort);
  }
  return [...uit];
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

/**
 * DE AANBETALING UITREKENEN.
 *
 * Het percentage gaat over het bedrag INCLUSIEF btw, want dat is het bedrag
 * dat de klant overmaakt. Zegt Justus 30% van € 1.488,63, dan komt er
 * € 446,59 op zijn rekening — niet 30% van een bedrag zonder btw dat de klant
 * nergens ziet staan.
 *
 * TWEE DINGEN MOETEN TOT DE CENT KLOPPEN
 *
 * 1. Aanbetaling plus restant is precies het totaal. Daarom trekken we het
 *    restant af in plaats van het apart uit te rekenen: twee keer afronden
 *    laat er anders een cent tussen vallen, en dan klopt de eindfactuur niet
 *    met de aanbetaling die al betaald is.
 *
 * 2. Bedrag zonder btw plus btw is precies de aanbetaling. Ook hier: eerst
 *    het bedrag zonder btw afronden, dan de btw als het verschil nemen.
 *    Andersom kan er een cent verschil ontstaan tussen de regel en het
 *    totaal op de factuur, en dat is precies waar een boekhouder over belt.
 *
 * Over de btw zelf: bij een vooruitbetaling is de btw verschuldigd op het
 * moment dat het geld binnenkomt. De aanbetalingsfactuur vermeldt hem dus,
 * en de eindfactuur rekent alleen nog over het restant.
 */
export function aanbetaling(regels = [], inst = STANDAARD_INSTELLINGEN, percentage, kortingExclCent = 0) {
  const t = totalen(regels, inst, kortingExclCent);
  const pct = Math.min(100, Math.max(0, Number(
    percentage ?? inst.aanbetalingPct ?? STANDAARD_INSTELLINGEN.aanbetalingPct
  ) || 0));
  const btwPct = Number(inst.btwPct) ?? BTW_PCT;

  const inclCent = Math.round((t.inclCent * pct) / 100);
  const exclCent = Math.round((inclCent * 100) / (100 + btwPct));

  return {
    pct,
    inclCent,
    exclCent,
    btwCent: inclCent - exclCent,
    restInclCent: t.inclCent - inclCent,
    totaalInclCent: t.inclCent,
    totaalExclCent: t.exclCent,
  };
}

/**
 * EEN KORTING LEZEN ZOALS JUSTUS HEM INTIKT.
 *
 *   "50"     vijftig euro korting
 *   "50,-"   ook vijftig euro
 *   "10%"    tien procent van het offertebedrag
 *
 * Een bedrag typt hij in de maat die de klant op de offerte ziet: inclusief
 * btw bij een particulier, exclusief bij een bedrijf. Binnen de app rekent
 * alles exclusief btw, dus daar zetten we het hier naartoe om. Zou je dat
 * niet doen, dan geeft "50 euro korting" een particulier € 60,50 korting en
 * loop je 21% mis op elke korting die je geeft.
 *
 * Een percentage gaat altijd over het bedrag zonder btw — dat maakt niet uit,
 * want een percentage van het geheel is hetzelfde percentage van elk deel.
 */
export function kortingNaarExcl(invoer, exclCent, zakelijk = false, btwPct = BTW_PCT) {
  const tekst = String(invoer ?? '').trim();
  if (!tekst) return 0;

  if (tekst.includes('%')) {
    const pct = Number(tekst.replace('%', '').replace(',', '.').trim());
    if (!Number.isFinite(pct) || pct <= 0) return 0;
    return Math.min(exclCent, Math.round((exclCent * Math.min(100, pct)) / 100));
  }

  const bedrag = naarCent(tekst);
  if (bedrag <= 0) return 0;
  const excl = zakelijk ? bedrag : Math.round((bedrag * 100) / (100 + btwPct));
  return Math.min(exclCent, excl);
}

/**
 * DE EINDAFREKENING — wat er na de aanbetaling nog open staat.
 *
 * Op de aanbetalingsfactuur staat met zoveel woorden: "het restant wordt
 * gefactureerd bij oplevering". Dat restant moet dan wel kloppen met wat er
 * al betaald is, tot de cent, anders krijg je een klant aan de lijn met twee
 * papieren naast elkaar.
 *
 * Daarom trekken we ook hier af in plaats van opnieuw uit te rekenen: het
 * reeds betaalde bedrag gaat er in zijn geheel af, en de btw over het restant
 * is de totale btw min de btw die al op de aanbetalingsfactuur stond.
 *
 * `reedsBetaaldInclCent` is nul bij een klus zonder aanbetaling. Dan is dit
 * gewoon de hele factuur.
 */
export function eindafrekening(
  regels = [], inst = STANDAARD_INSTELLINGEN, kortingExclCent = 0, reedsBetaaldInclCent = 0
) {
  const t = totalen(regels, inst, kortingExclCent);
  const btwPct = Number(inst.btwPct) ?? BTW_PCT;

  /* Nooit meer aftrekken dan er staat: een negatieve eindfactuur bestaat niet. */
  const betaaldIncl = Math.min(t.inclCent, Math.max(0, Math.round(Number(reedsBetaaldInclCent) || 0)));
  const betaaldExcl = Math.round((betaaldIncl * 100) / (100 + btwPct));

  const teBetalenIncl = t.inclCent - betaaldIncl;
  const teBetalenExcl = t.exclCent - betaaldExcl;

  return {
    totaalExclCent: t.exclCent,
    totaalBtwCent: t.btwCent,
    totaalInclCent: t.inclCent,
    kortingExclCent: t.kortingExclCent,
    kortingInclCent: t.kortingInclCent,
    reedsBetaaldInclCent: betaaldIncl,
    reedsBetaaldExclCent: betaaldExcl,
    reedsBetaaldBtwCent: betaaldIncl - betaaldExcl,
    teBetalenExclCent: teBetalenExcl,
    teBetalenBtwCent: teBetalenIncl - teBetalenExcl,
    teBetalenInclCent: teBetalenIncl,
  };
}

/**
 * Het factuurnummer: 2026-F014.
 *
 * De F zit ertussen zodat een factuur nooit te verwarren is met een offerte
 * van hetzelfde nummer — op papier niet, en in je boekhouding niet.
 */
export function factuurnummer(volgnummer, datum = new Date()) {
  const n = Math.max(1, Math.round(Number(volgnummer) || 1));
  return `${datum.getFullYear()}-F${String(n).padStart(3, '0')}`;
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
