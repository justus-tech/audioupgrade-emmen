/**
 * DE PRIJS BEPALEN — van een stuklijst naar het bedrag op de offerte.
 *
 * WAAROM DIT BESTAND BESTAAT
 * De offerte-app rekent van een prijs náár een totaal. Dit bestand doet het
 * omgekeerde: van inkoop en uren naar de prijs die er mag staan. Dat werd tot
 * nu toe met de hand gedaan, en dan wordt er een van de twee ondergrenzen
 * vergeten. Dat is op 18 september 2026 twee keer gebeurd: de offerte haalde
 * de marge-eis wel, maar leverde veel te weinig per werkuur op.
 *
 * DE TWEE ONDERGRENZEN — ALLEBEI TOETSEN, ALTIJD
 *
 *   1. het uurtarief   (inkoop + uren x uurtarief) x 1,21
 *   2. de marge-eis    de prijs waarbij er genoeg winst over het bedrag
 *                      INCLUSIEF btw overblijft
 *
 * De prijs is de hoogste van die twee. Welke van de twee bindt hangt af van
 * hoe duur je per werkuur inkoopt: koop je per werkuur duur in, dan bindt de
 * marge-eis; koop je goedkoop in, dan bindt het uurtarief. Waar dat omslaat
 * rekent dit bestand zelf uit, want het hangt van je eigen tarief af.
 *
 * ALLES IN HELE CENTEN, om dezelfde reden als in rekenen.js: een offerte met
 * een cent verschil tussen de regels en het totaal is een telefoontje waard.
 *
 * WAT HIER NIET IN HOORT
 * Deze getallen zijn van Justus. Ze staan in de app en op zijn scherm, nooit
 * op een pdf. Dit bestand wordt dan ook door geen enkele pagina en door geen
 * enkele pdf-schrijver ingeladen.
 */

/**
 * WAAROM HIER GEEN ECHTE BEDRAGEN STAAN
 *
 * Deze map staat openbaar op GitHub. Wat Justus inkoopt, met welke korting en
 * met welke marge-eis, is precies wat een concurrent graag zou willen weten —
 * net als zijn rekeningnummer, dat om dezelfde reden niet in deze code staat.
 *
 * Dit bestand kent dus alleen de rekensom. Zijn eigen getallen (uurtarief,
 * marge-eis, de kortingsregel per merk en de inkoopprijzen) staan in een
 * apart instellingenbestand dat niet meegaat naar GitHub. `prijsinstellingen.
 * voorbeeld.json` laat zien hoe zo'n bestand eruitziet, met verzonnen
 * bedragen.
 *
 * De waarden hieronder zijn daarom neutrale terugvalwaarden, geen echte.
 */

/** Terugvalwaarde voor het uurtarief. Komt normaal uit de instellingen. */
export const UURTARIEF_CENT = 7500;

/** Terugvalwaarde: het percentage winst over het bedrag INCLUSIEF btw. */
export const MARGE_EIS_PCT = 30;

/** Terugvalwaarde voor het streven. Komt normaal uit de instellingen. */
export const MARGE_STREEF_PCT = 40;

/** Het btw-tarief waarmee een particuliere offerte rekent. */
export const BTW_PCT = 21;

/**
 * HOE JE VAN EEN PRIJSLIJST NAAR JE INKOOP KOMT — per merk anders.
 *
 * Elke leverancier drukt iets anders af. De een zet een adviesprijs met
 * Nederlandse btw op de lijst waar een dealerkorting af gaat, de ander een
 * Duitse adviesprijs met 19% btw, en een derde drukt zijn dealerprijs gewoon
 * af in een eigen kolom. Dat verschil door elkaar halen is precies wat op
 * 18 september 2026 een hele ronde herrekenen kostte.
 *
 * Een regel is daarom twee getallen: `deelDoor` haalt de btw of het valuta-
 * verschil eruit, `maal` is wat er daarna van het bedrag overblijft. Welke
 * regel bij welk merk hoort staat in het instellingenbestand, niet hier.
 *
 *     { deelDoor: 1.21, maal: 0.60 }   lijst met 21% btw, 40% korting
 *     { deelDoor: 1.19, maal: 0.50 }   lijst met 19% btw, de helft eraf
 *     { deelDoor: 1,    maal: 1    }   een kolom die al inkoop is
 */
export function inkoopUitLijst(regel, lijstCent) {
  const deelDoor = Number(regel?.deelDoor);
  const maal = Number(regel?.maal);
  if (!Number.isFinite(deelDoor) || deelDoor <= 0 || !Number.isFinite(maal) || maal <= 0) {
    throw new Error('een inkoopregel heeft een deelDoor en een maal, allebei groter dan nul');
  }
  return Math.round((Math.max(0, Math.round(Number(lijstCent) || 0)) / deelDoor) * maal);
}

/**
 * Wat een stuklijst in totaal aan inkoop kost.
 *
 * Een post is `{ regel, lijstCent, aantal }`. Het aantal vermenigvuldigt de
 * inkoop en niet de lijstprijs: twee speakersets is twee keer hetzelfde
 * afgeronde bedrag, en zo blijft de optelling gelijk aan wat er in een
 * handmatige tabel zou staan.
 */
export function inkoopVanStuklijst(posten = []) {
  let totaal = 0;
  for (const post of posten) {
    const aantal = Math.max(1, Math.round(Number(post.aantal) || 1));
    totaal += inkoopUitLijst(post.regel, post.lijstCent) * aantal;
  }
  return totaal;
}

/**
 * De factor waarmee je van inkoop naar de prijs gaat die een bepaald
 * winstpercentage oplevert.
 *
 * De som erachter: winst = prijs / 1,21 - inkoop, en die winst moet minstens
 * `pct` procent van de prijs zijn. Uitgewerkt levert dat
 * prijs = inkoop / (1/1,21 - pct/100).
 */
export function margeFactor(pct = MARGE_EIS_PCT, btwPct = BTW_PCT) {
  const deler = 1 / (1 + btwPct / 100) - pct / 100;
  if (deler <= 0) throw new Error(`een marge van ${pct}% over het bedrag inclusief btw kan niet`);
  return 1 / deler;
}

/**
 * DE TWEE ONDERGRENZEN EN HET STREVEN.
 *
 * `uren` is de montagetijd die je aanneemt. Dat getal bepaalt de ondergrens
 * net zo hard als de inkoop, dus het hoort altijd genoemd te worden bij een
 * voorstel — het is ook het getal dat Justus het snelst zelf nakijkt.
 */
export function ondergrenzen({
  inkoopCent,
  uren = 0,
  uurtariefCent = UURTARIEF_CENT,
  btwPct = BTW_PCT,
  margeEisPct = MARGE_EIS_PCT,
  margeStreefPct = MARGE_STREEF_PCT,
} = {}) {
  const inkoop = Math.max(0, Math.round(Number(inkoopCent) || 0));
  const u = Math.max(0, Number(uren) || 0);

  const uurgrensCent = Math.round((inkoop + u * uurtariefCent) * (1 + btwPct / 100));
  const margegrensCent = Math.round(inkoop * margeFactor(margeEisPct, btwPct));
  const streefCent = Math.round(inkoop * margeFactor(margeStreefPct, btwPct));

  return {
    inkoopCent: inkoop,
    uren: u,
    uurgrensCent,
    margegrensCent,
    streefCent,
    ondergrensCent: Math.max(uurgrensCent, margegrensCent),
    /** Welke van de twee bindt. Handig om te melden: het verklaart de prijs. */
    bindend: margegrensCent >= uurgrensCent ? 'marge' : 'uurtarief',
  };
}

/**
 * JUSTUS' PRIJSVORM: het bedrag eindigt op 45 of 95.
 *
 * EUR 995,-, EUR 1.245,-, EUR 1.595,-, EUR 2.195,-. Nooit EUR 1.250,- en
 * nooit EUR 1.200,-. Het is vijf euro onder een half of heel honderdtal, en
 * zo staan ook de pakketprijzen op de site.
 *
 * Een optelsom van twee pakketprijzen valt hier bewust buiten: EUR 695,- plus
 * EUR 995,- is EUR 1.690,- en dat mag blijven staan, want de klant kan het
 * zelf natellen.
 */
export function netteprijsBoven(cent) {
  const n = Math.max(0, Math.round(Number(cent) || 0));
  const stap = 5000; // EUR 50,-
  const rest = 500;  // ...45 of ...95 is vijf euro onder zo'n stap
  const boven = Math.ceil((n + rest) / stap) * stap - rest;
  return boven;
}

/** Dezelfde vorm, maar dan het eerstvolgende bedrag eronder. */
export function netteprijsOnder(cent) {
  const boven = netteprijsBoven(cent);
  return boven === Math.round(Number(cent) || 0) ? boven : boven - 5000;
}

/**
 * WAT DE BTW MET EEN ROND BEDRAG DOET.
 *
 * De offerte wordt opgebouwd uit bedragen EXCLUSIEF btw; de app telt de btw er
 * per regel weer bij op. Niet elk bedrag inclusief btw is zo terug te maken:
 * bij EUR 1.245,- komt er EUR 1.245,01 uit, want geen enkel bedrag exclusief
 * btw levert precies EUR 1.245,00 op. Dat valt de klant op.
 *
 * Nooit oplossen met een korting van een cent: die verschijnt zichtbaar als
 * regel "Korting -EUR 0,01" op de offerte.
 */
export function btwTerugrekenen(inclCent, btwPct = BTW_PCT) {
  const incl = Math.max(0, Math.round(Number(inclCent) || 0));
  const exclCent = Math.round(incl / (1 + btwPct / 100));
  const terugCent = exclCent + Math.round((exclCent * btwPct) / 100);
  return { inclCent: incl, exclCent, terugCent, exact: terugCent === incl };
}

/**
 * Een bedrag dat niet exact terug te rekenen is, opsplitsen in twee regels die
 * dat elk wél zijn en samen precies het totaal vormen.
 *
 * Dit is de oplossing die bij Juul werkte: EUR 1.245,- werd EUR 745,- voor het
 * aansluiten en inregelen plus EUR 500,- voor de demping. Twee regels die de
 * klant los begrijpt, en het totaal klopt op de cent.
 *
 * De ronde bedragen komen eerst aan de beurt, want "EUR 500,- demping" leest
 * nu eenmaal beter dan "EUR 512,35 demping".
 */
export function splitsExact(inclCent, btwPct = BTW_PCT) {
  const totaal = Math.max(0, Math.round(Number(inclCent) || 0));
  if (btwTerugrekenen(totaal, btwPct).exact) return null;
  const minimum = 5000; // onder de EUR 50,- wordt een losse regel raar
  for (const stap of [10000, 5000, 2500, 1000, 500, 100]) {
    for (let tweede = Math.floor((totaal - minimum) / stap) * stap; tweede >= minimum; tweede -= stap) {
      const eerste = totaal - tweede;
      if (eerste < minimum) continue;
      if (btwTerugrekenen(eerste, btwPct).exact && btwTerugrekenen(tweede, btwPct).exact) {
        return [eerste, tweede];
      }
    }
  }
  return null;
}

/**
 * EEN BEDRAG TOETSEN — wat blijft er onder de streep over.
 *
 * Dit is het antwoord op "mag deze prijs zo de deur uit". Het geeft allebei de
 * getallen waar het om draait: het percentage winst over het bedrag inclusief
 * btw, en wat er per werkuur overblijft.
 */
export function toets({
  prijsCent,
  inkoopCent,
  uren = 0,
  uurtariefCent = UURTARIEF_CENT,
  btwPct = BTW_PCT,
  margeEisPct = MARGE_EIS_PCT,
  margeStreefPct = MARGE_STREEF_PCT,
} = {}) {
  const prijs = Math.max(0, Math.round(Number(prijsCent) || 0));
  const grenzen = ondergrenzen({ inkoopCent, uren, uurtariefCent, btwPct, margeEisPct, margeStreefPct });
  const inkoop = grenzen.inkoopCent;
  const u = grenzen.uren;

  const exclCent = Math.round(prijs / (1 + btwPct / 100));
  const winstCent = exclCent - inkoop;
  const margePct = prijs > 0 ? (winstCent / prijs) * 100 : 0;
  const perUurCent = u > 0 ? Math.round(winstCent / u) : null;
  const apparaatAandeelPct = prijs > 0 ? (inkoop / prijs) * 100 : 0;

  const waarschuwingen = [];
  if (prijs < grenzen.margegrensCent) {
    waarschuwingen.push(
      `onder de marge-eis van ${margeEisPct}%: dit bedrag geeft ${margePct.toFixed(1)}%, de ondergrens ligt op ${euroKort(grenzen.margegrensCent)}`
    );
  }
  if (u > 0 && prijs < grenzen.uurgrensCent) {
    waarschuwingen.push(
      `onder het uurtarief van ${euroKort(uurtariefCent)}: er blijft ${euroKort(perUurCent)} per uur over, de ondergrens ligt op ${euroKort(grenzen.uurgrensCent)}`
    );
  }
  if (apparaatAandeelPct > 50) {
    waarschuwingen.push(`de apparatuur is ${apparaatAandeelPct.toFixed(1)}% van het bedrag, dat is meer dan de helft`);
  }
  if (prijs >= grenzen.ondergrensCent && prijs < grenzen.streefCent) {
    waarschuwingen.push(
      `haalt de eis van ${margeEisPct}% maar niet het streven van ${margeStreefPct}%; daarvoor zou het ${euroKort(grenzen.streefCent)} moeten zijn`
    );
  }
  const btw = btwTerugrekenen(prijs, btwPct);
  if (!btw.exact) {
    const split = splitsExact(prijs, btwPct);
    waarschuwingen.push(
      `dit bedrag komt op de pdf uit op ${euroKort(btw.terugCent)}; splits het over twee regels` +
      (split ? `, bijvoorbeeld ${euroKort(split[0])} plus ${euroKort(split[1])}` : '')
    );
  }

  return {
    ...grenzen,
    prijsCent: prijs,
    exclCent,
    winstCent,
    margePct,
    perUurCent,
    apparaatAandeelPct,
    haaltMarge: prijs >= grenzen.margegrensCent,
    haaltUurtarief: u === 0 || prijs >= grenzen.uurgrensCent,
    haaltStreven: prijs >= grenzen.streefCent,
    btwExact: btw.exact,
    btwOpPdfCent: btw.terugCent,
    splitsing: btw.exact ? null : splitsExact(prijs, btwPct),
    waarschuwingen,
  };
}

/**
 * HET VOORSTEL: de prijs die er mag staan, in Justus' eigen prijsvorm.
 *
 * Er komen twee bedragen uit. `prijsCent` is het eerstvolgende nette bedrag
 * BOVEN de ondergrens — dat is altijd veilig. `krapCent` is het nette bedrag
 * eronder, met erbij hoeveel je dan tekortkomt. Dat tweede is er omdat Justus
 * die keuze bewust maakt: hij koos een keer het nette bedrag eronder, twee
 * euro onder de ondergrens, en hield daarmee twintig cent per uur minder over.
 * Dat mag, als je het weet.
 */
export function prijsvoorstel(invoer = {}) {
  const grenzen = ondergrenzen(invoer);
  const prijsCent = netteprijsBoven(grenzen.ondergrensCent);
  const krapCent = prijsCent - 5000;
  const tekortCent = Math.max(0, grenzen.ondergrensCent - krapCent);

  /* Het bedrag eronder is alleen een echte keuze als het er vlak onder zit.
     Scheelt het tientjes, dan is het gewoon te goedkoop en hoort het hier
     niet als mogelijkheid te staan. */
  const bijnaGenoeg = krapCent > 0 && tekortCent <= 1000;

  return {
    ...grenzen,
    prijsCent,
    voorstel: toets({ ...invoer, prijsCent }),
    krapCent: bijnaGenoeg ? krapCent : null,
    krap: bijnaGenoeg ? toets({ ...invoer, prijsCent: krapCent }) : null,
    tekortCent,
  };
}

/** Cent naar tekst, kort: 124500 wordt "EUR 1.245,00". Alleen voor meldingen. */
export function euroKort(cent) {
  const n = Math.round(Number(cent) || 0);
  const teken = n < 0 ? '-' : '';
  const heel = String(Math.floor(Math.abs(n) / 100)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const rest = String(Math.abs(n) % 100).padStart(2, '0');
  return `${teken}€ ${heel},${rest}`;
}
