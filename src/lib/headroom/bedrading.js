/**
 * HET BEDRADINGSPLAN — stroom en audio per auto, per offerte.
 *
 * WAAR DIT VOOR IS
 * Bij de inbouw moet je drie dingen zeker weten voordat je de eerste kabel
 * trekt: hoe dik elke kabel moet, welke zekering waar komt, en wat er al in
 * de auto zit en blijft. Dat stond tot nu toe in je hoofd of op een
 * achterkant van een bon. Dit bestand rekent het uit en tekent het, zodat
 * het voor elke klus op papier staat — ook voor wie er na jou aan werkt.
 *
 * WAT HIJ ZELF UITREKENT
 *   - de stroom die elke versterker bij vol vermogen trekt
 *   - de zekering per kabel, en de kabeldikte die bij die zekering hoort
 *   - het spanningsverlies over de lengte, want een lange kabel moet dikker
 *   - de massa, altijd even dik als de plus ernaast
 *   - de impedantie van de subwoofer(s), getoetst aan wat de versterker aankan
 *   - of een versterker genoeg kanalen heeft voor wat hij moet aansturen
 *
 * WAT HIJ NIET VERZINT
 * Het vermogen van een versterker of de spoelen van een subwoofer zijn niet
 * te raden. Staat het niet in de naam op de offerte ("4x100W", "D4"), dan
 * moet je het invullen. Tot die tijd zegt het plan dat de kabel nog niet te
 * berekenen is, in plaats van een gok te tekenen.
 *
 * WAAROM DE REGELS ZO ZIJN
 * Op internet gaan veel schema's rond die er strak uitzien maar niet
 * kloppen: een dikke massa met een dunne plus ernaast, een zekering die
 * groter is dan de kabel aankan, een subwoofer die op een impedantie
 * uitkomt waar de versterker van afslaat. Elke regel hieronder staat er om
 * precies zo'n fout te voorkomen.
 *
 * Een zekering beschermt de KABEL, niet de versterker. Hij moet dus altijd
 * kleiner zijn dan wat de kabel aankan, en zo dicht mogelijk bij de accu
 * zitten: alles tussen de accupool en de zekering is onbeveiligd.
 *
 * Dit bestand is puur rekenwerk en tekenwerk, zonder scherm. Daardoor kan
 * tests/bedrading.test.js elke regel narekenen.
 */

/* ================= VASTE GEGEVENS ================= */

export const STATUSSEN = [
  { id: 'bestaand', naam: 'Bestaand', uitleg: 'Zit er al in en blijft zitten.' },
  { id: 'nieuw', naam: 'Nieuw', uitleg: 'Voegen wij toe.' },
  { id: 'vervangen', naam: 'Vervangen', uitleg: 'Zit erin; wij zetten er iets nieuws voor in de plaats.' },
];

export const SOORTEN_COMPONENT = {
  bron: 'Bron',
  fabrieksversterker: 'Fabrieksversterker',
  dsp: 'DSP',
  versterker: 'Versterker',
  speakers: 'Speakers',
  subwoofer: 'Subwoofer',
};

/**
 * Voedingskabel (plus én massa), echte koperdoorsnede per AWG-maat.
 *
 * `maxA` is de grootste zekering die je op die kabel mag zetten bij OFC
 * (puur koper), in een bundel in de auto. Dat is wat in de car-audio
 * gangbaar is en wat Stinger, JL en Audison zelf opgeven.
 *
 * Let op: in de winkel heet 4 AWG vaak "20 mm²" en 8 AWG "10 mm²". Zo'n
 * kabel is vaak CCA (koperbeklede aluminium) en dan klopt de rekensom niet
 * meer — zie de keuze OFC/CCA in het plan.
 */
export const VOEDING = [
  { awg: '16', mm2: 1.31, maxA: 15 },
  { awg: '14', mm2: 2.08, maxA: 20 },
  { awg: '12', mm2: 3.31, maxA: 30 },
  { awg: '10', mm2: 5.26, maxA: 50 },
  { awg: '8', mm2: 8.37, maxA: 80 },
  { awg: '6', mm2: 13.3, maxA: 100 },
  { awg: '4', mm2: 21.2, maxA: 150 },
  { awg: '2', mm2: 33.6, maxA: 200 },
  { awg: '1/0', mm2: 53.5, maxA: 300 },
];

/** Luidsprekerkabel. Hier rekent iedereen in mm². */
export const LUIDSPREKER = [
  { mm2: 0.75, awg: '18' },
  { mm2: 1.5, awg: '16' },
  { mm2: 2.5, awg: '14' },
  { mm2: 4, awg: '12' },
];

/** De zekeringwaarden die je echt kunt kopen. */
export const ZEKERINGEN = [5, 10, 15, 20, 25, 30, 40, 50, 60, 70, 80, 100, 125, 150, 175, 200, 250, 300];

/** Soortelijke weerstand in Ω·mm²/m. CCA geleidt ruim een derde slechter. */
export const KOPER = {
  ofc: { naam: 'OFC (puur koper)', rho: 0.0175, belast: 1 },
  cca: { naam: 'CCA (koperbeklede aluminium)', rho: 0.028, belast: 0.8 },
};

/** De spanning terwijl de motor draait. Daarmee rekent de stroom. */
export const SPANNING = 13.8;

/** Rendement per klasse: wat er van de stroom uit de accu als geluid uitkomt. */
export const RENDEMENT = { D: 0.8, AB: 0.6 };

/**
 * Maximaal spanningsverlies. Over de lange kabel naar achter mag er meer
 * af dan over het stukje van verdeelblok naar versterker.
 */
export const MAX_VERLIES = { hoofd: 0.4, tak: 0.15, enkel: 0.5 };

/** De hoofdzekering zit uiterlijk zo ver van de pluspool. */
export const HOOFDZEKERING_MAX_CM = 45;

/** Vanaf deze stroom loont de "Big 3" en hoort de dynamo nagemeten. */
export const BIG3_VANAF_A = 100;
export const ACCU_METEN_VANAF_A = 150;

/** Een losse DSP trekt weinig; dit is de zekering die fabrikanten opgeven. */
const DSP_ZEKERING_A = 5;
const DSP_STROOM_A = 2;

/* ================= HULPJES ================= */

const getal = (w) => {
  const n = Number(String(w ?? '').replace(',', '.'));
  return Number.isFinite(n) && n > 0 ? n : null;
};

/** 21.2 → "21,2"; 1.5 → "1,5"; 4 → "4". */
export const komma = (n, decimalen = 1) => {
  const r = Math.round(n * 10 ** decimalen) / 10 ** decimalen;
  return String(r).replace('.', ',');
};

export const voedingNaam = (maat) => (maat ? `${komma(maat.mm2)} mm² (${maat.awg === '1/0' ? '0' : maat.awg} AWG)` : '—');
export const luidsprekerNaam = (maat) => (maat ? `${komma(maat.mm2, 2)} mm²` : '—');

/** Tekst van een gebruiker nooit rauw in een tekening of pagina zetten. */
export function ontsnap(tekst) {
  return String(tekst ?? '').replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}

/** De kleinste zekering die je kunt kopen en die deze stroom doorlaat. */
export function kiesZekering(stroomA) {
  const a = Math.max(0, Number(stroomA) || 0);
  return ZEKERINGEN.find((z) => z >= a) ?? null;
}

/** Welk soort zekering(houder) bij die waarde hoort. */
export function zekeringType(waardeA, rol = 'tak') {
  if (rol === 'hoofd') return waardeA >= 100 ? 'ANL' : 'mini-ANL';
  return waardeA <= 40 ? 'ATC-steekzekering' : 'mini-ANL';
}

/** Spanningsverlies in volt over een stuk kabel heen en terug. */
export function verlies(stroomA, lengteM, mm2, koper = 'ofc') {
  const rho = (KOPER[koper] || KOPER.ofc).rho;
  return (stroomA * rho * lengteM) / mm2;
}

/**
 * De dunste voedingskabel die deze zekering mag dragen én niet te veel
 * spanning verliest over deze lengte.
 *
 * `lengteM` is plus en massa samen: de stroom gaat heen én terug.
 */
export function kiesVoeding({ zekeringA, stroomA, lengteM, maxVerlies, koper = 'ofc', minimaal = null }) {
  const belast = (KOPER[koper] || KOPER.ofc).belast;
  const vanaf = minimaal ? VOEDING.findIndex((m) => m.awg === minimaal.awg) : 0;
  for (const maat of VOEDING.slice(Math.max(0, vanaf))) {
    if (maat.maxA * belast < zekeringA) continue;
    if (verlies(stroomA, lengteM, maat.mm2, koper) > maxVerlies) continue;
    return maat;
  }
  return null;
}

/**
 * De luidsprekerkabel.
 *
 * Twee eisen: genoeg koper voor het vermogen, en niet meer dan 3% van het
 * vermogen kwijt in de kabel zelf. Bij een lage impedantie (een sub op 1 Ω)
 * telt die tweede zwaar: dan is elke milliohm kabel een merkbaar deel.
 */
export function kiesLuidspreker({ watt, ohm, lengteM, koper = 'ofc' }) {
  const rho = (KOPER[koper] || KOPER.ofc).rho;
  const minimaal = !watt ? 1.5 : watt <= 100 ? 1.5 : watt <= 300 ? 2.5 : 4;
  for (const maat of LUIDSPREKER) {
    if (maat.mm2 < minimaal) continue;
    const r = (2 * rho * lengteM) / maat.mm2;
    if (ohm && r / (ohm + r) > 0.03) continue;
    return maat;
  }
  return LUIDSPREKER[LUIDSPREKER.length - 1];
}

/** De impedantie van één subwoofer, met zijn spoelen geschakeld. */
export function subImpedantie({ spoelen, ohmPerSpoel, schakeling }) {
  const ohm = getal(ohmPerSpoel);
  if (!ohm) return null;
  if (Number(spoelen) === 2) return schakeling === 'serie' ? ohm * 2 : ohm / 2;
  return ohm;
}

/** De impedantie die de versterker ziet: alle subs op dat kanaal parallel. */
export function eindImpedantie(sub) {
  const een = subImpedantie(sub);
  if (!een) return null;
  return een / Math.max(1, Number(sub.aantal) || 1);
}

/**
 * De stroom die een versterker bij vol vermogen uit de accu trekt.
 * Vermogen eruit gedeeld door rendement is vermogen erin; gedeeld door de
 * spanning is stroom.
 */
export function versterkerStroom(v) {
  const w = getal(v.wattPerKanaal);
  const k = getal(v.kanalen);
  if (!w || !k) return null;
  return (w * k) / (RENDEMENT[v.klasse] || RENDEMENT.D) / SPANNING;
}

/* ================= HET PLAN ZELF ================= */

export const leegPlan = () => ({
  versie: 1,
  teller: 0,
  koper: 'ofc',
  accu: { plek: 'motorruimte', ah: '' },
  versterkerPlek: 'kofferbak',
  /* Lengtes die je zelf hebt aangepast, per kabel. De rest rekent het plan. */
  lengtes: {},
  componenten: [
    { id: 'bron', soort: 'bron', status: 'bestaand', naam: 'Fabrieksradio', rca: false, remote: false },
  ],
});

/** Een nieuw onderdeel met de velden die bij zijn soort horen. */
export function nieuwComponent(plan, soort, extra = {}) {
  plan.teller = (Number(plan.teller) || 0) + 1;
  const id = `c${plan.teller}`;
  const basis = { id, soort, status: 'nieuw', naam: '' };
  const perSoort = {
    fabrieksversterker: { status: 'bestaand', naam: 'Fabrieksversterker' },
    dsp: { naam: 'DSP', ingang: 'hoog' },
    versterker: {
      naam: 'Versterker', kanalen: '', wattPerKanaal: '', klasse: 'D',
      zekeringIntern: '', minOhm: '2', dsp: false,
    },
    speakers: { naam: 'Speakers voor', positie: 'voor', type: 'compo', ohm: '4', actief: false, door: '' },
    subwoofer: {
      naam: 'Subwoofer', aantal: '1', spoelen: '', ohmPerSpoel: '', schakeling: 'parallel', door: '',
    },
  }[soort] || {};
  const nieuw = { ...basis, ...perSoort, ...extra, id, soort };
  plan.componenten.push(nieuw);
  return nieuw;
}

/* ---- uit de offerte ---- */

const soortenVan = (regel) => [regel.soort, ...(regel.soorten || [])].filter(Boolean);

/** "4x100W", "4 x 100 Watt" → { kanalen: 4, watt: 100 }. */
export function leesVermogen(naam) {
  const t = String(naam || '');
  const keer = t.match(/(\d)\s*[x×]\s*(\d{2,4})\s*(w|watt)?\b/i);
  if (keer) return { kanalen: Number(keer[1]), watt: Number(keer[2]) };
  const kanalen = t.match(/\b(\d)\s*-?\s*(kanaals?|ch|channel)\b/i);
  const mono = /\b(mono(blok)?|1\s*-?\s*kanaals?)\b/i.test(t) || /\b\d{3,4}\.1\b/.test(t);
  const watt = t.match(/\b(\d{2,4})\s*(w|watt)\b/i);
  const k = mono ? 1 : kanalen ? Number(kanalen[1]) : null;
  if (k || watt) return { kanalen: k, watt: watt && k === 1 ? Number(watt[1]) : null };
  return null;
}

/** "D4", "DVC 2 ohm", "S2" → spoelen en ohm per spoel. */
export function leesSpoelen(naam) {
  const t = String(naam || '');
  const code = t.match(/\b([SD])\s?([124])\b/i) || t.match(/-([SD])?([124])\b/i);
  const dubbel = /\b(dvc|dual)\b/i.test(t);
  const ohm = t.match(/\b([124])\s*(Ω|ohm)\b/i);
  if (code && code[1]) return { spoelen: code[1].toUpperCase() === 'D' ? 2 : 1, ohmPerSpoel: Number(code[2]) };
  if (ohm || dubbel) return { spoelen: dubbel ? 2 : '', ohmPerSpoel: ohm ? Number(ohm[1]) : '' };
  return null;
}

const nietsAanwezig = (t) => !String(t || '').trim() || /^(nee|geen|nvt|n\.v\.t\.?|-|—)\b/i.test(String(t).trim());

/**
 * Een plan opbouwen uit wat er op de offerte staat en wat er over de auto
 * is vastgelegd.
 *
 * Zo hoef je bij een gewone klus niets met de hand te zetten: de CarPlay op
 * de offerte vervangt de radio, de versterker en de sub komen erbij, en de
 * speakers voor worden vervangen. Wat je daarna aanpast, blijft staan.
 */
export function planUitOfferte(offerte = {}, dossier = null) {
  const plan = leegPlan();
  const regels = offerte.regels || [];
  const heeft = (soort) => regels.filter((r) => soortenVan(r).includes(soort));
  const bron = plan.componenten[0];

  const carplay = heeft('carplay')[0];
  if (carplay) {
    Object.assign(bron, { status: 'vervangen', naam: carplay.omschrijving || 'Nieuwe radio', rca: true, remote: true, regelId: carplay.id });
  } else if (dossier?.radio) {
    bron.naam = dossier.radio;
  }

  if (dossier && !nietsAanwezig(dossier.versterker)) {
    nieuwComponent(plan, 'fabrieksversterker', { naam: dossier.versterker });
  }

  const versterkers = [];
  for (const regel of [...heeft('dsp'), ...heeft('versterker')]) {
    if (versterkers.some((v) => v.regelId === regel.id && regel.id)) continue;
    const naam = regel.omschrijving || '';
    const isDsp = soortenVan(regel).includes('dsp');
    const isAmp = soortenVan(regel).includes('versterker') || /versterker|amp|kanaal|\d\s*[x×]\s*\d/i.test(naam);
    if (isDsp && !isAmp) {
      nieuwComponent(plan, 'dsp', { naam: naam || 'DSP', regelId: regel.id });
      continue;
    }
    const vermogen = leesVermogen(naam) || {};
    for (let i = 0; i < Math.max(1, Number(regel.aantal) || 1); i += 1) {
      versterkers.push(nieuwComponent(plan, 'versterker', {
        naam: naam || 'Versterker',
        regelId: regel.id,
        kanalen: vermogen.kanalen ? String(vermogen.kanalen) : '',
        wattPerKanaal: vermogen.watt ? String(vermogen.watt) : '',
        minOhm: vermogen.kanalen === 1 ? '1' : '2',
        dsp: isDsp,
      }));
    }
  }

  const voor = heeft('speakers-voor')[0];
  if (voor) {
    nieuwComponent(plan, 'speakers', { naam: voor.omschrijving || 'Speakers voor', positie: 'voor', status: 'vervangen', regelId: voor.id });
  } else if (dossier?.speakerVoor) {
    nieuwComponent(plan, 'speakers', { naam: `Fabrieksspeakers voor (${dossier.speakerVoor})`, positie: 'voor', status: 'bestaand', type: 'coax' });
  }
  const achter = heeft('speakers-achter')[0];
  if (achter) {
    nieuwComponent(plan, 'speakers', { naam: achter.omschrijving || 'Speakers achter', positie: 'achter', status: 'vervangen', type: 'coax', regelId: achter.id });
  } else if (dossier?.speakerAchter && !nietsAanwezig(dossier.speakerAchter)) {
    nieuwComponent(plan, 'speakers', { naam: `Fabrieksspeakers achter (${dossier.speakerAchter})`, positie: 'achter', status: 'bestaand', type: 'coax' });
  }
  for (const regel of heeft('subwoofer')) {
    const spoelen = leesSpoelen(regel.omschrijving) || {};
    nieuwComponent(plan, 'subwoofer', {
      naam: regel.omschrijving || 'Subwoofer',
      aantal: String(Math.max(1, Number(regel.aantal) || 1)),
      spoelen: spoelen.spoelen ? String(spoelen.spoelen) : '',
      ohmPerSpoel: spoelen.ohmPerSpoel ? String(spoelen.ohmPerSpoel) : '',
      regelId: regel.id,
    });
  }

  verdeelAansturing(plan);
  return plan;
}

/**
 * Wie stuurt welke speaker aan, voor alles waar dat nog niet bij staat.
 *
 * Subs naar een monoblok als die er is; speakers naar de eerste
 * meerkanaalsversterker; anders blijven ze op de radio of de
 * fabrieksversterker, zoals ze uit de fabriek komen.
 */
export function verdeelAansturing(plan) {
  const lijst = plan.componenten;
  const amps = lijst.filter((c) => c.soort === 'versterker');
  const mono = amps.find((a) => Number(a.kanalen) === 1);
  const meer = amps.find((a) => Number(a.kanalen) !== 1);
  const fabriek = lijst.find((c) => c.soort === 'fabrieksversterker');
  const geldig = new Set(stuurders(plan).map((s) => s.id));
  for (const c of lijst) {
    if (c.soort !== 'speakers' && c.soort !== 'subwoofer') continue;
    if (c.door && geldig.has(c.door)) continue;
    if (c.soort === 'subwoofer') c.door = (mono || meer || fabriek || lijst[0]).id;
    else c.door = (meer || fabriek || lijst[0]).id;
  }
  return plan;
}

/** Wat een speaker kan aansturen: de radio, de fabrieksversterker, elke versterker. */
export function stuurders(plan) {
  return plan.componenten.filter((c) => ['bron', 'fabrieksversterker', 'versterker'].includes(c.soort));
}

/** Hoeveel kanalen een speakerset of sub vraagt. */
export function kanalenVoor(c, versterker) {
  if (c.soort === 'subwoofer') return versterker && Number(versterker.kanalen) > 1 ? 2 : 1;
  if (c.positie === 'center') return 1;
  return c.type === 'compo' && c.actief ? 4 : 2;
}

/* ================= DE AUTO ZELF: PLEK, MATEN EN LENGTES =================
   Waar elk onderdeel echt zit, in deze auto. Daaruit volgt de lengte van
   elke kabel: langs de dorpel, door de deur, door het schutbord. De maten
   van de auto komen van de RDW (lengte, breedte, wielbasis); staan die er
   niet, dan rekent het plan met een gemiddelde auto en zegt het dat erbij.

   Coördinaten zijn fracties van de auto: x van de voorbumper (0) naar de
   achterbumper (1), y van links (0, de bestuurderskant) naar rechts (1). */

export const LOCATIES = [
  { id: 'motorruimte-links', naam: 'Motorruimte links', x: 0.12, y: 0.25 },
  { id: 'motorruimte-rechts', naam: 'Motorruimte rechts', x: 0.12, y: 0.75 },
  { id: 'dashboard', naam: 'Dashboard, midden', x: 0.31, y: 0.5 },
  { id: 'dashboard-hoeken', naam: 'Dashboardhoeken / A-stijlen', x: 0.29, y: 0.1, paar: true },
  { id: 'handschoenenkastje', naam: 'Achter het handschoenenkastje', x: 0.32, y: 0.76 },
  { id: 'deuren-voor', naam: 'Voordeuren', x: 0.4, y: 0.03, paar: true },
  { id: 'middenconsole', naam: 'Middenconsole', x: 0.42, y: 0.5 },
  { id: 'onder-stoel-bestuurder', naam: 'Onder de bestuurdersstoel', x: 0.46, y: 0.28 },
  { id: 'onder-stoel-passagier', naam: 'Onder de passagiersstoel', x: 0.46, y: 0.72 },
  { id: 'deuren-achter', naam: 'Achterdeuren', x: 0.6, y: 0.03, paar: true },
  { id: 'achterbank', naam: 'Onder of achter de achterbank', x: 0.64, y: 0.5 },
  { id: 'hoedenplank', naam: 'Hoedenplank', x: 0.77, y: 0.24, paar: true },
  { id: 'kofferbak-achterwand', naam: 'Kofferbak, tegen de achterbank', x: 0.78, y: 0.5 },
  { id: 'kofferbak-links', naam: 'Kofferbak, zijpaneel links', x: 0.86, y: 0.1 },
  { id: 'kofferbak-rechts', naam: 'Kofferbak, zijpaneel rechts', x: 0.86, y: 0.9 },
  { id: 'kofferbak-vloer', naam: 'Kofferbakvloer', x: 0.87, y: 0.5 },
  { id: 'reservewielkuip', naam: 'Reservewielkuip', x: 0.92, y: 0.5 },
];

const locatie = (id) => LOCATIES.find((l) => l.id === id) || null;
const inMotorruimte = (id) => String(id || '').startsWith('motorruimte');

/** Een gemiddelde hatchback, voor als de RDW de maten niet geeft. */
export const GEMIDDELDE_AUTO = { lengte: 430, breedte: 180, wielbasis: 265 };

/**
 * De maten van deze auto in centimeters. Wat je zelf in het plan hebt
 * ingevuld gaat voor, dan wat de RDW gaf, dan het gemiddelde.
 */
export function autoMaten(auto = {}, plan = {}) {
  const uit = {};
  let geschat = false;
  for (const sleutel of ['lengte', 'breedte', 'wielbasis']) {
    const eigen = getal(plan.maten?.[sleutel]);
    const rdw = getal(auto?.[sleutel]);
    uit[sleutel] = eigen ?? rdw ?? GEMIDDELDE_AUTO[sleutel];
    if (!eigen && !rdw) geschat = true;
  }
  return { ...uit, geschat, inrichting: auto?.inrichting || '' };
}

/** Waar een onderdeel standaard komt als je niets kiest. */
export function standaardPlek(c, plan) {
  const amps = plan.componenten.filter((x) => x.soort === 'versterker');
  switch (c.soort) {
    case 'bron': return 'dashboard';
    case 'fabrieksversterker': return 'kofferbak-links';
    case 'dsp': return 'onder-stoel-passagier';
    case 'versterker': return ['kofferbak-achterwand', 'kofferbak-vloer', 'kofferbak-rechts', 'kofferbak-links'][Math.max(0, amps.indexOf(c)) % 4];
    case 'speakers': return { voor: 'deuren-voor', achter: 'deuren-achter', center: 'dashboard' }[c.positie] || 'deuren-voor';
    case 'subwoofer': return 'kofferbak-vloer';
    default: return 'kofferbak-vloer';
  }
}

/** De vaste onderdelen van de stroomkant: die staan niet in de lijst componenten. */
export const VASTE_ONDERDELEN = [
  { id: 'accu', naam: 'Accu' },
  { id: 'hoofdzekering', naam: 'Hoofdzekering' },
  { id: 'verdeelblok', naam: 'Zekeringverdeelblok' },
  { id: 'massapunt', naam: 'Massapunt' },
];

/** De inbouwgegevens van één ding: plek, exacte plaats, afmetingen. */
export function inbouwVan(plan, id) {
  const c = plan.componenten.find((x) => x.id === id);
  if (c) return c;
  return (plan.plekken && plan.plekken[id]) || {};
}

/** De plek (een id uit LOCATIES) van elk ding in het plan, ook de vaste. */
export function plekkenVan(plan) {
  const verbruiker = plan.componenten.find((c) => c.soort === 'versterker' || c.soort === 'dsp');
  const accuStandaard = { motorruimte: 'motorruimte-links', kofferbak: 'kofferbak-rechts', interieur: 'onder-stoel-passagier' }[plan.accu?.plek || 'motorruimte'] || 'motorruimte-links';
  const plekVan = (id) => {
    const eigen = inbouwVan(plan, id).plek;
    if (eigen && locatie(eigen)) return eigen;
    const c = plan.componenten.find((x) => x.id === id);
    if (c) return standaardPlek(c, plan);
    if (id === 'accu' || id === 'accumassa') return accuStandaard;
    if (id === 'hoofdzekering') return plekVan('accu');
    if (id === 'verdeelblok' || id === 'massapunt') return verbruiker ? plekVan(verbruiker.id) : 'kofferbak-vloer';
    return 'kofferbak-vloer';
  };
  return plekVan;
}

/** De punten van een plek: één, of twee bij een paar (links en rechts). */
export function puntenVan(plekId) {
  const l = locatie(plekId) || locatie('kofferbak-vloer');
  return l.paar ? [[l.x, l.y], [l.x, 1 - l.y]] : [[l.x, l.y]];
}

/**
 * De route van een kabel en zijn lengte in meters.
 *
 * `kant` is waar hij langs loopt: de plus langs de linkerdorpel, signaal en
 * remote langs de rechter. Zo liggen ze nooit naast elkaar en hoor je geen
 * brom. `direct` is voor korte stukjes, zoals massa en takken.
 *
 * Er komt een halve meter bij voor omhoog en omlaag naar de montageplek, en
 * nog eens veertig centimeter als hij door het schutbord moet.
 */
export function routeTussen(van, naar, kant, maten) {
  const L = maten.lengte / 100;
  const B = maten.breedte / 100;
  const a = puntenVan(van);
  const b = puntenVan(naar);
  const paren = b.length === 2 ? b.map((pb, i) => [a[Math.min(i, a.length - 1)], pb])
    : a.length === 2 ? a.map((pa) => [pa, b[0]]) : [[a[0], b[0]]];
  let langste = 0;
  const routes = paren.map(([pa, pb]) => {
    let punten;
    /* Vlak bij elkaar, bijvoorbeeld allebei in de kofferbak: dan niet eerst
       naar de dorpel en terug, maar rechtstreeks. */
    const dichtbij = a.length === 1 && b.length === 1 && Math.abs(pa[0] - pb[0]) < 0.2;
    if (kant === 'direct' || dichtbij) {
      punten = [pa, [pa[0], pb[1]], pb];
    } else {
      /* Een paar loopt elk langs zijn eigen kant; de rest langs de dorpel. */
      const ys = b.length === 2 || a.length === 2 ? (pb[1] < 0.5 || pa[1] < 0.5 ? 0.07 : 0.93) : (kant === 'links' ? 0.07 : 0.93);
      punten = [pa, [pa[0], ys], [pb[0], ys], pb];
    }
    let m = 0;
    for (let i = 1; i < punten.length; i += 1) {
      m += Math.abs(punten[i][0] - punten[i - 1][0]) * L + Math.abs(punten[i][1] - punten[i - 1][1]) * B;
    }
    if (m > 0.05) m += 0.5;
    if (inMotorruimte(van) !== inMotorruimte(naar)) m += 0.4;
    langste = Math.max(langste, m);
    return punten;
  });
  return { routes, lengteM: Math.ceil(langste * 2) / 2 };
}

/* ================= DE UITKOMST =================
   bouwPlan() maakt van het plan de dingen die je ziet: knopen (onderdelen),
   kabels en zekeringen, elk met de waarden en de uitleg voor de popup. */

const STANDAARD_LENGTE = {
  voeding: { motorruimte: 5, kofferbak: 1.5, interieur: 2.5 },
  tak: 0.5,
  massa: 0.5,
  accuZekering: 0.3,
  remoteVanVoor: 5,
  remoteAchter: 1,
  rcaVanVoor: 5,
  rcaAchter: 1,
  hoogVanVoor: 5,
  speaker: { voor: 4, achter: 3, center: 4.5 },
  sub: 1.5,
};

/** Waar een onderdeel zit: voorin bij het dashboard of achterin bij de versterkers. */
const zitVoorin = (c) => c.soort === 'bron' || c.soort === 'fabrieksversterker';

export function bouwPlan(plan, { dossier = null, auto = {} } = {}) {
  const p = plan && Array.isArray(plan.componenten) ? plan : leegPlan();
  const koper = KOPER[p.koper] ? p.koper : 'ofc';
  const maten = autoMaten(auto, p);
  const plekVan = plekkenVan(p);
  /* De routes door de auto, per kabel. De tekening van de auto tekent ze. */
  const routes = {};
  const route = (id, van, naar, kant, minimaal = 0.5) => {
    const r = routeTussen(plekVan(van), plekVan(naar), kant, maten);
    routes[id] = r.routes;
    return Math.max(minimaal, r.lengteM);
  };
  const lengteVan = (id, standaard) => getal(p.lengtes?.[id]) ?? standaard;
  const knopen = [];
  const kabels = [];
  const zekeringen = [];
  const waarschuwingen = [];
  const meld = (ernst, tekst, bij = null) => waarschuwingen.push({ ernst, tekst, bij });
  const comp = (id) => p.componenten.find((c) => c.id === id);

  const bron = p.componenten.find((c) => c.soort === 'bron') || leegPlan().componenten[0];
  const fabriek = p.componenten.find((c) => c.soort === 'fabrieksversterker');
  const dsps = p.componenten.filter((c) => c.soort === 'dsp');
  const amps = p.componenten.filter((c) => c.soort === 'versterker');
  const luid = p.componenten.filter((c) => c.soort === 'speakers' || c.soort === 'subwoofer');
  const dspAmp = amps.find((a) => a.dsp);
  const dsp = dsps[0];

  /* ---------- de stroomkant ---------- */
  const verbruikers = [
    ...dsps.map((d) => ({ c: d, stroomA: DSP_STROOM_A, ontwerpA: DSP_STROOM_A, vast: DSP_ZEKERING_A })),
    ...amps.map((a) => {
      const stroomA = versterkerStroom(a);
      const intern = getal(a.zekeringIntern);
      return { c: a, stroomA, intern, ontwerpA: intern ?? stroomA };
    }),
  ].filter((v) => v.c.status !== 'vervalt');

  const bekend = verbruikers.filter((v) => v.ontwerpA);
  const onbekend = verbruikers.filter((v) => !v.ontwerpA);
  const totaalA = bekend.reduce((s, v) => s + v.ontwerpA, 0);
  const volStroomA = bekend.reduce((s, v) => s + (v.stroomA ?? v.ontwerpA), 0);
  const metBlok = verbruikers.length > 1;
  const nieuwStroom = verbruikers.some((v) => v.c.status !== 'bestaand');
  const statusStroom = nieuwStroom ? 'nieuw' : 'bestaand';
  const accuPlek = p.accu?.plek || 'motorruimte';
  const eersteVerbruiker = p.componenten.find((c) => c.soort === 'dsp' || c.soort === 'versterker');
  const voedingLengte = lengteVan('plus-voeding', route('plus-voeding', 'hoofdzekering', verbruikers.length > 1 ? 'verdeelblok' : (eersteVerbruiker?.id || 'verdeelblok'), 'links', 1));

  for (const v of onbekend) {
    meld('fout', `Van ${v.c.naam || 'de versterker'} weet het plan het vermogen niet. Vul kanalen en watt per kanaal in, of de zekering die in de versterker zit; tot dan is zijn kabel niet te berekenen.`, v.c.id);
  }

  knopen.push({
    id: 'accu', soort: 'accu', naam: 'Accu', status: 'bestaand', laag: 'stroom',
    kort: p.accu?.ah ? `${p.accu.ah} Ah` : accuPlek,
    rijen: [
      ['Plek', accuPlek],
      ['Capaciteit', p.accu?.ah ? `${p.accu.ah} Ah` : 'niet ingevuld'],
      ['Doorvoer naar binnen', dossier?.stroom || 'niet vastgelegd in het autodossier'],
      ['Gevraagd bij vol vermogen', bekend.length ? `ca. ${Math.round(volStroomA)} A` : '—'],
    ],
    uitleg: [
      'De accu blijft zitten. Alles wat er nieuw bij komt, loopt via één hoofdzekering vlak bij de pluspool.',
      volStroomA >= ACCU_METEN_VANAF_A
        ? 'Bij deze stroom: meet de accu en de dynamo eerst door (tabblad Meting → Accu en voeding). Een zwakke accu of een dynamo zonder reserve geeft dimmende lampen en een versterker die afslaat.'
        : 'Meet de rustspanning en de laadspanning toch even, dan staat het op het meetrapport.',
    ],
  });

  /* De massa van de accu naar de carrosserie: die zit er al. Bij een flinke
     stroom is dat de zwakke schakel — dat is de "Big 3". */
  knopen.push({
    id: 'accumassa', soort: 'massa', naam: 'Carrosserie', status: 'bestaand', laag: 'stroom',
    kort: 'accu-min',
    rijen: [['Wat', 'De min van de accu aan de carrosserie (fabriek)']],
    uitleg: ['Dit is de terugweg van alle stroom. Wat de versterkers achterin aan massa krijgen, komt hier weer bij de accu.'],
  });

  if (verbruikers.length) {
    /* Weet het plan van één versterker het vermogen niet, dan is ook het
       totaal niet bekend. Dan liever geen getal dan een te kleine zekering. */
    const compleet = !onbekend.length;
    const hoofdA = compleet ? kiesZekering(totaalA) : null;
    const hoofdKabel = !compleet ? null : kiesVoeding({
      zekeringA: hoofdA || 0, stroomA: volStroomA, lengteM: voedingLengte,
      maxVerlies: metBlok ? MAX_VERLIES.hoofd : MAX_VERLIES.enkel, koper,
    });
    if (compleet && (totaalA > 300 || !hoofdKabel)) {
      meld('fout', `Samen vragen de versterkers ${Math.round(totaalA)} A. Dat is meer dan één 0 AWG-kabel veilig draagt: dit vraagt een eigen ontwerp met twee voedingskabels of een tweede accu.`, 'hoofdzekering');
    }
    const maat = compleet ? (hoofdKabel || VOEDING[VOEDING.length - 1]) : null;
    const hoofdVerlies = maat ? verlies(volStroomA, voedingLengte, maat.mm2, koper) : null;

    knopen.push({
      id: 'hoofdzekering', soort: 'zekering', naam: 'Hoofdzekering', status: statusStroom, laag: 'stroom',
      kort: hoofdA ? `${hoofdA} A ${zekeringType(hoofdA, 'hoofd')}` : '—',
      rijen: [
        ['Waarde', hoofdA ? `${hoofdA} A` : 'nog niet te berekenen'],
        ['Soort', hoofdA ? `${zekeringType(hoofdA, 'hoofd')}-zekering in een waterdichte houder` : '—'],
        ['Plek', `Uiterlijk ${HOOFDZEKERING_MAX_CM} cm van de pluspool`],
        ['Beschermt', maat ? `de voedingskabel van ${voedingNaam(maat)}` : 'de voedingskabel'],
        ['Rekent met', `${Math.round(totaalA)} A samen${onbekend.length ? ` (zonder ${onbekend.length} onbekende)` : ''}`],
      ],
      uitleg: [
        'Deze zekering beschermt de kabel, niet de versterker. Schuurt de kabel ooit door tegen de carrosserie, dan moet deze zekering springen voordat de kabel gaat smelten.',
        'Daarom zo dicht bij de accu als het kan: alles tussen de pluspool en de zekering is onbeveiligd.',
        'Plaats hem pas als laatste en haal hem eruit zolang je aan de rest werkt.',
      ],
    });
    zekeringen.push({
      id: 'hoofdzekering', waardeA: hoofdA, type: zekeringType(hoofdA || 0, 'hoofd'),
      plek: `bij de accu, max. ${HOOFDZEKERING_MAX_CM} cm van de pluspool`,
      beschermt: `voedingskabel ${voedingNaam(maat)}`, status: statusStroom,
    });

    kabels.push({
      id: 'plus-accu', soort: 'plus', van: 'accu', naar: 'hoofdzekering', laag: 'stroom', status: statusStroom,
      maat, lengteM: lengteVan('plus-accu', route('plus-accu', 'accu', 'hoofdzekering', 'direct', STANDAARD_LENGTE.accuZekering)), aantal: 1,
      naam: 'Pluspool naar hoofdzekering',
      rijen: [['Dikte', maat ? voedingNaam(maat) : 'nog niet te berekenen'], ['Lengte', 'zo kort mogelijk']],
      uitleg: [`Dit stuk is onbeveiligd. Houd het onder de ${HOOFDZEKERING_MAX_CM} cm en leg het zo dat het nergens kan schuren.`],
    });

    kabels.push({
      id: 'plus-voeding', soort: 'plus', van: 'hoofdzekering', naar: metBlok ? 'verdeelblok' : verbruikers[0].c.id,
      laag: 'stroom', status: statusStroom, maat, lengteM: voedingLengte, aantal: 1,
      naam: 'Voedingskabel naar achter', lengteAanpasbaar: true,
      rijen: [
        ['Dikte', maat ? voedingNaam(maat) : 'nog niet te berekenen: vul eerst het vermogen van elke versterker in'],
        ['Koper', KOPER[koper].naam],
        ['Lengte', `${komma(voedingLengte)} m`],
        ['Zekering', hoofdA ? `${hoofdA} A bij de accu` : '—'],
        ['Stroom bij vol vermogen', `ca. ${Math.round(volStroomA)} A`],
        ['Spanningsverlies', hoofdVerlies != null ? `${komma(hoofdVerlies, 2)} V` : '—'],
        ['Route', dossier?.stroom ? `door ${dossier.stroom}` : 'door het schutbord, met een rubber doorvoer'],
      ],
      uitleg: [
        'Dikte gekozen op twee eisen: hij moet de hoofdzekering kunnen dragen, en er mag over deze lengte niet meer dan een paar tienden volt verloren gaan.',
        'Leg hem aan de andere kant van de auto dan de signaalkabels (RCA en remote). Naast elkaar geeft dat brom.',
        koper === 'cca' ? 'Je rekent met CCA. Dat geleidt ruim een derde slechter, daarom valt de kabel dikker uit dan bij OFC.' : 'Gerekend met OFC (puur koper). Is de kabel CCA, zet dat dan om in het plan: dan moet hij dikker.',
      ],
    });

    if (metBlok) {
      knopen.push({
        id: 'verdeelblok', soort: 'verdeelblok', naam: 'Zekeringverdeelblok', status: statusStroom, laag: 'stroom',
        kort: `1 → ${verbruikers.length}`,
        rijen: [
          ['Ingang', voedingNaam(maat)],
          ['Uitgangen', `${verbruikers.length}, elk met een eigen zekering`],
          ['Plek', 'vlak bij de versterkers, vastgeschroefd op het montagebord'],
        ],
        uitleg: [
          'Verdeelt de ene dikke kabel over de versterkers. Elke uitgang krijgt een eigen zekering, want elke dunnere kabel moet apart beschermd zijn.',
          'Net als het Stinger-bord: plus en massa gebundeld, elk met een eigen blok, alles met klemmen vast.',
        ],
      });
    }

    verbruikers.forEach((v, i) => {
      const c = v.c;
      const takLengte = lengteVan(`plus-${c.id}`, route(`plus-${c.id}`, 'verdeelblok', c.id, 'direct', STANDAARD_LENGTE.tak));
      const massaLengte = lengteVan(`massa-${c.id}`, route(`massa-${c.id}`, c.id, 'massapunt', 'direct', STANDAARD_LENGTE.massa));
      const zekA = v.vast ?? kiesZekering(v.ontwerpA || 0);
      let takMaat = null;
      if (v.ontwerpA) {
        takMaat = metBlok
          ? kiesVoeding({ zekeringA: zekA, stroomA: v.stroomA ?? v.ontwerpA, lengteM: takLengte + massaLengte, maxVerlies: MAX_VERLIES.tak, koper })
          : maat;
      }
      const status = c.status === 'bestaand' && !nieuwStroom ? 'bestaand' : 'nieuw';
      if (metBlok) {
        zekeringen.push({
          id: `zek-${c.id}`, waardeA: v.ontwerpA ? zekA : null, type: v.ontwerpA ? zekeringType(zekA) : '—',
          plek: 'op het verdeelblok', beschermt: `kabel naar ${c.naam}`, status,
        });
        kabels.push({
          id: `plus-${c.id}`, soort: 'plus', van: 'verdeelblok', naar: c.id, laag: 'stroom', status,
          maat: takMaat, lengteM: takLengte, aantal: 1, zekeringA: v.ontwerpA ? zekA : null,
          zekeringId: `zek-${c.id}`, naam: `Plus naar ${c.naam}`, lengteAanpasbaar: true,
          rijen: [
            ['Dikte', takMaat ? voedingNaam(takMaat) : 'nog niet te berekenen'],
            ['Lengte', `${komma(takLengte)} m`],
            ['Zekering op het blok', v.ontwerpA ? `${zekA} A ${zekeringType(zekA)}` : '—'],
            ['Spanningsverlies', takMaat ? `${komma(verlies(v.stroomA ?? v.ontwerpA, takLengte + massaLengte, takMaat.mm2, koper), 2)} V` : '—'],
          ],
          uitleg: ['Een korte tak van het verdeelblok naar één versterker. Dunner dan de hoofdkabel mag, zolang de zekering op het blok erbij past.'],
        });
      }
      kabels.push({
        id: `massa-${c.id}`, soort: 'massa', van: c.id, naar: 'massapunt', laag: 'stroom', status,
        maat: takMaat, lengteM: massaLengte, aantal: 1, naam: `Massa van ${c.naam}`, lengteAanpasbaar: true,
        rijen: [
          ['Dikte', takMaat ? `${voedingNaam(takMaat)} — even dik als de plus` : 'even dik als de plus'],
          ['Lengte', `${komma(massaLengte)} m (zo kort mogelijk)`],
          ['Naar', dossier?.massa || 'het massapunt op de carrosserie'],
        ],
        uitleg: [
          'De massa voert precies dezelfde stroom terug als de plus aanvoert. Een dunnere massa is dus de zwakste schakel, en een slechte massa is de nummer één oorzaak van brom en een versterker die afslaat.',
        ],
      });
      if (massaLengte > 1) meld('let', `De massa van ${c.naam} is ${komma(massaLengte)} m. Zoek een massapunt dichterbij; onder de 50 cm is het doel.`, `massa-${c.id}`);
      if (!metBlok && i === 0 && v.intern && hoofdA && hoofdA < v.intern) {
        meld('fout', `De hoofdzekering (${hoofdA} A) is kleiner dan de zekering in ${c.naam} (${v.intern} A).`, 'hoofdzekering');
      }
    });

    knopen.push({
      id: 'massapunt', soort: 'massa', naam: 'Massapunt', status: statusStroom, laag: 'stroom',
      kort: 'carrosserie',
      rijen: [
        ['Waar', dossier?.massa || 'niet vastgelegd in het autodossier'],
        ['Hoe', 'kale plaat, lak weggeschuurd, kabelschoen met tandveerring'],
      ],
      uitleg: [
        'Een bout van de gordel of de stoel is géén goed massapunt: daar zit borgmiddel en vaak lak tussen.',
        'Schuur tot blank metaal, zet de kabelschoen met een tandveerring vast en kit of vet het daarna in tegen roest.',
      ],
    });

    if (maat && volStroomA >= BIG3_VANAF_A) {
      kabels.push({
        id: 'massa-accu', soort: 'massa', van: 'accu', naar: 'accumassa', laag: 'stroom', status: 'bestaand',
        maat, lengteM: 0.5, aantal: 1, naam: 'Accu-min naar carrosserie (Big 3)', advies: true,
        rijen: [['Nu', 'fabriekskabel'], ['Advies', `vervangen door ${voedingNaam(maat)}`]],
        uitleg: [
          `Bij ${Math.round(volStroomA)} A loont de "Big 3": de accu-min naar de carrosserie, de motor naar de carrosserie en de dynamo-plus naar de accu vervangen door kabel even dik als je voedingskabel.`,
          'Dan komt de stroom die de versterkers vragen ook echt aan, en houdt de spanning beter stand bij een basnoot.',
        ],
      });
      meld('let', `Samen ca. ${Math.round(volStroomA)} A bij vol vermogen. Overweeg de Big 3 en meet accu en dynamo door.`, 'accu');
    } else {
      kabels.push({
        id: 'massa-accu', soort: 'massa', van: 'accu', naar: 'accumassa', laag: 'stroom', status: 'bestaand',
        maat: null, lengteM: 0.5, aantal: 1, naam: 'Accu-min naar carrosserie (fabriek)',
        rijen: [['Wat', 'fabriekskabel, blijft']],
        uitleg: ['Bij deze stroom is de fabrieksmassa ruim genoeg.'],
      });
    }
  } else {
    kabels.push({
      id: 'massa-accu', soort: 'massa', van: 'accu', naar: 'accumassa', laag: 'stroom', status: 'bestaand',
      maat: null, lengteM: 0.5, aantal: 1, naam: 'Accu-min naar carrosserie (fabriek)',
      rijen: [['Wat', 'fabriekskabel, blijft']],
      uitleg: ['Er komt geen versterker bij, dus er hoeft niets aan de voeding te veranderen.'],
    });
  }

  /* ---------- de knopen van de audiokant ---------- */
  const rijenVan = {
    bron: (c) => [
      ['Voorversterkeruitgangen (RCA)', c.rca ? 'ja' : 'nee'],
      ['Remote-draad', c.remote ? 'ja' : 'nee'],
      ['Stekker', dossier?.stekker || 'niet vastgelegd'],
    ],
    fabrieksversterker: () => [['Systeem', dossier?.versterker || '—']],
    dsp: (c) => [
      ['Ingang', { hoog: 'hoog niveau (luidsprekersignaal)', rca: 'RCA (laag niveau)', optisch: 'optisch' }[c.ingang] || '—'],
      ['Zekering', `${DSP_ZEKERING_A} A ATC`],
      ['Voeding', voedingNaam(VOEDING[0])],
    ],
    versterker: (c) => {
      const v = verbruikers.find((x) => x.c.id === c.id) || {};
      return [
        ['Kanalen', c.kanalen || 'niet ingevuld'],
        ['Vermogen', getal(c.wattPerKanaal) ? `${c.kanalen || '?'} × ${c.wattPerKanaal} W RMS` : 'niet ingevuld'],
        ['Klasse', c.klasse === 'AB' ? 'A/B' : 'D'],
        ['Stroom bij vol vermogen', v.stroomA ? `ca. ${Math.round(v.stroomA)} A` : '—'],
        ['Zekering in de versterker', v.intern ? `${v.intern} A` : 'niet ingevuld'],
        ['Laagste impedantie', c.minOhm ? `${c.minOhm} Ω per kanaal` : '—'],
        ['Ingebouwde DSP', c.dsp ? 'ja' : 'nee'],
      ];
    },
    speakers: (c) => [
      ['Plek', c.positie],
      ['Soort', { compo: 'composet (woofer + tweeter)', coax: 'coaxiaal', breedband: 'breedband' }[c.type] || c.type],
      ['Impedantie', c.ohm ? `${c.ohm} Ω` : '—'],
      ['Filter', c.type === 'compo' ? (c.actief ? 'actief via de DSP, elk een eigen kanaal' : 'passief filter in de deur') : '—'],
      ['Maat', (c.positie === 'voor' ? dossier?.speakerVoor : c.positie === 'achter' ? dossier?.speakerAchter : '') || '—'],
      ['Adapterring', (c.positie === 'voor' ? dossier?.ringVoor : c.positie === 'achter' ? dossier?.ringAchter : '') || '—'],
    ],
    subwoofer: (c) => {
      const een = subImpedantie(c);
      const eind = eindImpedantie(c);
      return [
        ['Aantal', c.aantal || '1'],
        ['Spoelen', c.spoelen ? (Number(c.spoelen) === 2 ? 'dubbel (DVC)' : 'enkel (SVC)') : 'niet ingevuld'],
        ['Per spoel', c.ohmPerSpoel ? `${c.ohmPerSpoel} Ω` : 'niet ingevuld'],
        ['Spoelen geschakeld', Number(c.spoelen) === 2 ? c.schakeling : '—'],
        ['Per sub', een ? `${komma(een, 2)} Ω` : '—'],
        ['Eindimpedantie', eind ? `${komma(eind, 2)} Ω` : '—'],
      ];
    },
  };
  const uitlegVan = {
    bron: (c) => [
      c.status === 'vervangen' ? 'De fabrieksradio gaat eruit; de nieuwe zit op de fabrieksstekker met een adapter, zodat er niets aan de kabelboom wordt geknipt.' : 'De fabrieksradio blijft. Het signaal halen we eraf zonder in de kabelboom te knippen.',
      c.rca ? 'Hij heeft voorversterkeruitgangen: daar gaat een schoon RCA-signaal naar achter.' : 'Geen voorversterkeruitgangen: het signaal gaat als luidsprekersignaal (hoog niveau) naar de DSP of versterker.',
    ],
    fabrieksversterker: () => ['Zit al in de auto. Hij blijft; het signaal nemen we af op zijn uitgangen als hoog niveau.'],
    dsp: () => ['De DSP verdeelt het signaal over de kanalen en regelt de filters, de looptijd en de EQ per speaker.'],
    versterker: (c) => [
      'De kabeldikte en de zekering hiervoor rekent het plan uit het vermogen. Staat de zekering die in de versterker zit erbij, dan rekent hij daarmee: dat is wat de fabrikant zegt dat hij maximaal trekt.',
      c.dsp ? 'Met ingebouwde DSP: het signaal komt rechtstreeks van de radio en de filters zitten in de versterker zelf.' : '',
    ].filter(Boolean),
    speakers: (c) => [
      c.status === 'bestaand' ? 'Dit zijn de fabrieksspeakers; ze blijven zitten.' : c.status === 'vervangen' ? 'De fabrieksspeakers gaan eruit, deze komen ervoor in de plaats.' : 'Nieuwe speakers op een plek waar er nu geen zitten.',
    ],
    subwoofer: () => [
      'Eindimpedantie = wat de versterker ziet. Twee spoelen parallel halveren de impedantie, in serie verdubbelen ze hem; meerdere subs op één kanaal staan parallel.',
      'Kies de schakeling zo dat je op of net boven de laagste impedantie van de versterker uitkomt. Lager en hij slaat af of wordt heet.',
    ],
  };

  const zichtbaar = p.componenten.filter((c) => c.status !== 'vervalt');
  for (const c of zichtbaar) {
    const kortVan = {
      bron: () => (c.rca ? 'RCA-uit' : 'hoog niveau'),
      fabrieksversterker: () => 'fabriek',
      dsp: () => ({ hoog: 'hoog in', rca: 'RCA in', optisch: 'optisch in' }[c.ingang] || ''),
      versterker: () => (getal(c.wattPerKanaal) && c.kanalen ? `${c.kanalen} × ${c.wattPerKanaal} W` : (c.kanalen ? `${c.kanalen}-kanaals` : 'vermogen?')),
      speakers: () => `${c.ohm || '?'} Ω${c.type === 'compo' ? (c.actief ? ' · actief' : ' · passief') : ''}`,
      subwoofer: () => { const z = eindImpedantie(c); return z ? `${komma(z, 2)} Ω eind` : 'impedantie?'; },
    }[c.soort];
    knopen.push({
      id: c.id, soort: c.soort, naam: c.naam || SOORTEN_COMPONENT[c.soort], status: c.status,
      laag: ['dsp', 'versterker'].includes(c.soort) ? 'beide' : (c.soort === 'bron' ? 'beide' : 'audio'),
      kort: kortVan ? kortVan() : '',
      rijen: [...(rijenVan[c.soort]?.(c) || [])],
      uitleg: uitlegVan[c.soort]?.(c) || [],
    });
  }

  /* ---------- het signaal ---------- */
  const luisterBron = fabriek || bron;
  const signaalVan = (doel) => {
    if (doel.soort === 'dsp') {
      const soort = doel.ingang === 'rca' ? 'rca' : 'hoog';
      if (soort === 'rca' && !bron.rca) meld('fout', `${doel.naam} staat op RCA-ingang, maar de bron heeft geen voorversterkeruitgangen. Kies hoog niveau.`, doel.id);
      return { van: soort === 'rca' ? bron : luisterBron, soort };
    }
    if (doel.dsp) return { van: bron.rca ? bron : luisterBron, soort: bron.rca ? 'rca' : 'hoog' };
    const regelaar = dsp || (dspAmp && dspAmp.id !== doel.id ? dspAmp : null);
    if (regelaar) return { van: regelaar, soort: 'rca' };
    return { van: bron.rca ? bron : luisterBron, soort: bron.rca ? 'rca' : 'hoog' };
  };

  if (fabriek) {
    kabels.push({
      id: `sig-${fabriek.id}`, soort: 'fabriek', van: bron.id, naar: fabriek.id, laag: 'audio', status: 'bestaand',
      maat: null, lengteM: null, aantal: 1, naam: 'Radio naar fabrieksversterker',
      rijen: [['Wat', 'fabrieksbedrading, blijft']],
      uitleg: ['Deze verbinding zit al in de auto en raken we niet aan.'],
    });
  }

  for (const doel of [...dsps, ...amps]) {
    const { van, soort } = signaalVan(doel);
    const achter = !zitVoorin(van);
    const lengte = lengteVan(`sig-${doel.id}`, route(`sig-${doel.id}`, van.id, doel.id, achter ? 'direct' : 'rechts', 1));
    const paren = Math.max(1, Math.ceil((Number(doel.soort === 'dsp' ? 4 : (doel.dsp ? 4 : Math.min(4, Number(doel.kanalen) || 2))) || 2) / 2));
    kabels.push({
      id: `sig-${doel.id}`, soort, van: van.id, naar: doel.id, laag: 'audio',
      status: doel.status === 'bestaand' ? 'bestaand' : 'nieuw',
      maat: null, lengteM: lengte, aantal: soort === 'rca' ? paren : 1, lengteAanpasbaar: true,
      naam: `${soort === 'rca' ? 'RCA' : 'Hoog niveau'}: ${van.naam} → ${doel.naam}`,
      rijen: soort === 'rca'
        ? [['Kabel', `${paren}× afgeschermde stereo-RCA`], ['Lengte', `${komma(lengte)} m`], ['Route', 'andere kant van de auto dan de plus']]
        : [['Kabel', 'luidsprekersignaal, 0,5–0,75 mm² per kanaal'], ['Lengte', `${komma(lengte)} m`], ['Afnemen', 'met een plug & play-kabel op de fabrieksstekker, niet knippen']],
      uitleg: soort === 'rca'
        ? ['Laag-niveausignaal. Gevoelig voor storing: leg hem nooit naast de voedingskabel, en kruis die kabel als het moet haaks.']
        : ['Het luidsprekersignaal van de fabriek, afgenomen als ingang. Met een plug & play-kabelset blijft de kabelboom heel en de fabrieksgarantie staan.'],
    });
  }

  /* De remote zet alles tegelijk aan en uit. */
  const regelaarRemote = dsp || dspAmp;
  const remoteVan = regelaarRemote || (bron.remote ? bron : null);
  const remoteNodig = amps.filter((a) => a !== remoteVan);
  if (bron.remote && regelaarRemote) remoteNodig.unshift(regelaarRemote);
  for (const doel of remoteNodig) {
    const van = doel === regelaarRemote ? bron : remoteVan;
    if (!van) continue;
    const lengte = lengteVan(`remote-${doel.id}`, route(`remote-${doel.id}`, van.id, doel.id, zitVoorin(van) ? 'rechts' : 'direct', 1));
    kabels.push({
      id: `remote-${doel.id}`, soort: 'remote', van: van.id, naar: doel.id, laag: 'stroom',
      status: doel.status === 'bestaand' ? 'bestaand' : 'nieuw', maat: { mm2: 0.75, awg: '18' },
      lengteM: lengte, aantal: 1, lengteAanpasbaar: true, naam: `Remote naar ${doel.naam}`,
      rijen: [['Dikte', '0,75 mm²'], ['Lengte', `${komma(lengte)} m`], ['Van', `remote-uitgang van ${van.naam}`]],
      uitleg: ['De remote is een stuurdraad: 12 V als het systeem aan moet. Er loopt bijna geen stroom door, daarom is hij dun.'],
    });
  }
  if (amps.length && !remoteVan) {
    const zonder = amps.length > 1 || dsps.length;
    meld(zonder ? 'let' : 'info', zonder
      ? 'Er is geen remote-draad: de bron heeft er geen en er zit geen DSP met remote-uitgang in. Laat de versterkers opstarten op het luidsprekersignaal, of neem het contact (ACC) af via een relais met een 5 A zekering.'
      : 'Geen remote-draad: de versterker start op het luidsprekersignaal (auto-turn-on). Controleer of hij dat kan.', amps[0].id);
  }

  /* ---------- naar de speakers ---------- */
  const gebruikt = new Map();
  for (const s of luid.filter((c) => c.status !== 'vervalt')) {
    const door = comp(s.door) || bron;
    const isAmp = door.soort === 'versterker';
    const k = kanalenVoor(s, isAmp ? door : null);
    gebruikt.set(door.id, (gebruikt.get(door.id) || 0) + k);
    const isSub = s.soort === 'subwoofer';
    const z = isSub ? eindImpedantie(s) : getal(s.ohm);
    const lengte = lengteVan(`spk-${s.id}`, route(`spk-${s.id}`, door.id, s.id, 'rechts', isSub ? 1 : 1.5));
    const watt = isAmp ? (getal(door.wattPerKanaal) || 0) * (isSub && k === 2 ? 2 : 1) : 0;
    const fabrieksDraad = !isAmp;
    const maat = fabrieksDraad ? null : kiesLuidspreker({ watt, ohm: z, lengteM: lengte, koper });
    const runs = isSub ? 1 : k;
    const status = fabrieksDraad || (s.status === 'bestaand' && door.status === 'bestaand') ? 'bestaand' : 'nieuw';

    if (isAmp && z) {
      const min = getal(door.minOhm);
      const grens = min ? (k === 2 && isSub ? min * 2 : min) : null;
      if (grens && z < grens) {
        meld('fout', `${s.naam} komt uit op ${komma(z, 2)} Ω, maar ${door.naam} kan ${isSub && k === 2 ? 'gebrugd ' : ''}niet lager dan ${komma(grens, 2)} Ω. Schakel de spoelen anders (serie) of kies een andere versterker.`, s.id);
      } else if (isSub && grens && z >= grens * 2) {
        meld('info', `${s.naam} komt uit op ${komma(z, 2)} Ω. Dat is veilig, maar ${door.naam} levert daar minder vermogen dan op ${komma(grens, 2)} Ω.`, s.id);
      }
    }
    if (isSub && !z) meld('fout', `Van ${s.naam} zijn de spoelen niet ingevuld. Zonder impedantie weet je niet of de versterker het aankan.`, s.id);

    kabels.push({
      id: `spk-${s.id}`, soort: 'speaker', van: door.id, naar: s.id, laag: 'audio', status, maat,
      lengteM: fabrieksDraad ? null : lengte, aantal: fabrieksDraad ? 1 : runs, lengteAanpasbaar: !fabrieksDraad,
      naam: `${door.naam} → ${s.naam}`,
      rijen: fabrieksDraad
        ? [['Kabel', 'fabrieksbedrading'], ['Aansluiten', s.status === 'bestaand' ? 'blijft zoals hij is' : 'met een adapterkabel op de fabrieksstekker']]
        : [
          ['Dikte', luidsprekerNaam(maat)],
          ['Aantal', isSub ? '1 kabel (2-aderig)' : `${runs} kabels (2-aderig), één per kanaal`],
          ['Lengte', `${komma(lengte)} m per kabel`],
          ['Kanalen', `${k} van ${door.naam}${isSub && k === 2 ? ' (gebrugd)' : ''}`],
          ['Impedantie', z ? `${komma(z, 2)} Ω` : '—'],
        ],
      uitleg: fabrieksDraad
        ? ['De speakers blijven op de fabrieksbedrading. Bij vervangen speakers zit er een adapterkabel tussen, zodat de stekker van de auto heel blijft.']
        : [
          'Dikte gekozen op het vermogen per kanaal en zo dat er niet meer dan 3% van het vermogen in de kabel verloren gaat.',
          isSub ? 'Let op de plus en min: verkeerd om en de sub werkt tegen de rest in, dan verdwijnt het laag.' : 'Let op plus en min per speaker. Eén speaker andersom en het stereobeeld en het laag vallen weg.',
          s.positie === 'voor' && !isSub ? 'Door de deurrubber naar de deur: gebruik de bestaande doorvoer of een flexibele doorvoerset.' : '',
        ].filter(Boolean),
    });
  }

  for (const a of amps) {
    const nodig = gebruikt.get(a.id) || 0;
    const heeftK = getal(a.kanalen);
    if (heeftK && nodig > heeftK) {
      meld('fout', `${a.naam} heeft ${heeftK} kanalen, maar moet er ${nodig} aansturen.`, a.id);
    }
    if (heeftK === 1) {
      const nietSub = luid.filter((c) => c.door === a.id && c.soort !== 'subwoofer');
      if (nietSub.length) meld('fout', `${a.naam} is een monoblok. Die is voor een subwoofer, niet voor ${nietSub[0].naam}.`, a.id);
    }
    const knoop = knopen.find((x) => x.id === a.id);
    if (knoop) {
      const lijst = luid.filter((c) => c.door === a.id).map((c) => c.naam).join(', ');
      knoop.rijen.push(['Stuurt aan', lijst || 'niets']);
      knoop.rijen.push(['Kanalen in gebruik', heeftK ? `${nodig} van ${heeftK}` : `${nodig}`]);
      const plus = kabels.find((x) => x.id === `plus-${a.id}`) || (kabels.find((x) => x.id === 'plus-voeding' && x.naar === a.id));
      if (plus) knoop.rijen.push(['Voeding', plus.maat ? voedingNaam(plus.maat) : 'nog niet te berekenen']);
      const zek = zekeringen.find((z) => z.id === `zek-${a.id}`) || (verbruikers.length === 1 ? zekeringen.find((z) => z.id === 'hoofdzekering') : null);
      if (zek) knoop.rijen.push(['Zekering in de kabel', zek.waardeA ? `${zek.waardeA} A ${zek.type}` : '—']);
    }
  }

  if (koper === 'cca') meld('info', 'Je rekent met CCA-kabel. Dat mag, maar hij valt dikker uit dan OFC en wordt sneller warm.', 'plus-voeding');

  /* De popups van de kabels tonen ook de waarschuwingen die erbij horen. */
  for (const ding of [...knopen, ...kabels]) {
    ding.waarschuwingen = waarschuwingen.filter((w) => w.bij === ding.id);
  }
  /* Waar alles zit en hoe de kabels lopen, voor de tekening van de auto. */
  for (const k of kabels) {
    k.routes = routes[k.id] || null;
    k.lengteZelf = getal(p.lengtes?.[k.id]) != null;
    if (k.lengteAanpasbaar && k.lengteM) {
      k.rijen.push(['Lengte komt uit', k.lengteZelf ? 'zelf ingevuld' : `de maten van de auto${maten.geschat ? ' (geschat: maten onbekend)' : ''}`]);
    }
  }
  for (const k of knopen) {
    const plek = plekVan(k.id === 'accumassa' ? 'accu' : k.id);
    const info = inbouwVan(p, k.id);
    k.plek = plek;
    k.rijen.push(['Plek in de auto', locatie(plek)?.naam || plek]);
    if (info.notitie) k.rijen.push(['Exacte plaats', info.notitie]);
    if (info.afmeting) k.rijen.push(['Afmetingen', `${info.afmeting} mm`]);
  }

  return {
    knopen, kabels, zekeringen, waarschuwingen,
    stroom: { totaalA, volStroomA, verbruikers: verbruikers.length, onbekend: onbekend.length },
    maten,
    kabellijst: kabellijst(kabels),
  };
}

/**
 * Wat je aan kabel moet klaarleggen, per soort en dikte, met een meter
 * speling per stuk. Alleen wat er nieuw bij komt.
 */
export function kabellijst(kabels) {
  const groepen = new Map();
  for (const k of kabels) {
    if (k.status !== 'nieuw' || !k.lengteM || k.advies) continue;
    const maatNaam = k.soort === 'speaker' ? luidsprekerNaam(k.maat)
      : k.soort === 'rca' ? 'stereo-RCA' : k.soort === 'hoog' ? 'hoog niveau' : k.soort === 'remote' ? '0,75 mm²'
        : (k.maat ? voedingNaam(k.maat) : 'nog te berekenen');
    const sleutel = `${k.soort}|${maatNaam}`;
    const g = groepen.get(sleutel) || { soort: k.soort, maat: maatNaam, meters: 0, stuks: 0 };
    g.meters += k.lengteM * (k.aantal || 1);
    g.stuks += k.aantal || 1;
    groepen.set(sleutel, g);
  }
  const volgorde = ['plus', 'massa', 'remote', 'rca', 'hoog', 'speaker'];
  return [...groepen.values()]
    .map((g) => ({ ...g, klaarleggen: Math.ceil(g.meters + g.stuks) }))
    .sort((a, b) => volgorde.indexOf(a.soort) - volgorde.indexOf(b.soort));
}

export const KABELSOORT_NAAM = {
  plus: 'Plus (voeding)',
  massa: 'Massa',
  remote: 'Remote',
  rca: 'RCA (signaal)',
  hoog: 'Hoog niveau (signaal)',
  fabriek: 'Fabrieksbedrading',
  speaker: 'Luidsprekerkabel',
};

/* ================= DE TEKENING =================
   Twee tekeningen, allebei 360 breed zodat ze op een telefoon op ware
   grootte staan: de stroom (accu tot massa) en de audio (radio tot speaker).
   Elke kabel en elk onderdeel is een groep met data-ding, zodat de app er
   een popup aan kan hangen. */

const BREED = 360;
const RAND = 8;
const KNOOP_H = 50;
const RIJ_AFSTAND = 112;

function legUit(rijen) {
  const plek = {};
  let y = 24;
  for (const rij of rijen) {
    if (!rij.length) continue;
    /* Ruimte tussen de blokken: genoeg om een kabel ertussen te zien lopen. */
    const gat = rij.length <= 3 ? 22 : 8;
    const w = Math.min(112, (BREED - 2 * RAND - gat * (rij.length - 1)) / rij.length);
    const totaal = rij.length * w + gat * (rij.length - 1);
    let x = (BREED - totaal) / 2;
    for (const id of rij) {
      plek[id] = { x, y, w, h: KNOOP_H };
      x += w + gat;
    }
    y += RIJ_AFSTAND;
  }
  return { plek, hoogte: y - RIJ_AFSTAND + KNOOP_H + 40 };
}

/** Een tekst die in de breedte van een knoop past. */
function past(tekst, w, px = 6) {
  const t = String(tekst || '');
  const max = Math.max(4, Math.floor(w / px));
  return t.length > max ? `${t.slice(0, max - 1)}…` : t;
}

const KOP = {
  accu: 'ACCU', zekering: 'ZEKERING', verdeelblok: 'VERDEELBLOK', massa: 'MASSA',
  bron: 'BRON', fabrieksversterker: 'FABRIEKSVERSTERKER', dsp: 'DSP', versterker: 'VERSTERKER',
  speakers: 'SPEAKERS', subwoofer: 'SUBWOOFER',
};

function knoopSvg(k, pos) {
  const { x, y, w, h } = pos;
  const fout = (k.waarschuwingen || []).some((v) => v.ernst === 'fout');
  const kop = k.soort === 'versterker' && k.naam ? KOP.versterker : (KOP[k.soort] || '');
  const label = `${STATUSSEN.find((s) => s.id === k.status)?.naam || ''} ${k.naam}`.trim();
  return `<g class="bd-knoop bd-${k.status} bd-s-${k.soort}" data-ding="knoop:${ontsnap(k.id)}" tabindex="0" role="button" aria-label="${ontsnap(label)}">`
    + `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6"/>`
    + `<text class="bd-kop" x="${x + 7}" y="${y + 13}">${ontsnap(past(kop, w - 10, 5.2))}</text>`
    + `<text class="bd-naam" x="${x + 7}" y="${y + 28}">${ontsnap(past(k.naam, w - 12, 6))}</text>`
    + `<text class="bd-waarde" x="${x + 7}" y="${y + 42}">${ontsnap(past(k.kort, w - 12, 5.4))}</text>`
    + (fout ? `<circle class="bd-fout" cx="${x + w - 8}" cy="${y + 9}" r="6"/><text class="bd-fout-teken" x="${x + w - 8}" y="${y + 12.5}">!</text>` : '')
    + '</g>';
}

/**
 * Kabels tekenen als haakse lijnen, met elk een eigen baan zodat lijnen
 * die naast elkaar lopen niet over elkaar vallen.
 */
function kabelsSvg(lijst, plek) {
  const uit = new Map();
  const in_ = new Map();
  for (const k of lijst) {
    if (!plek[k.van] || !plek[k.naar]) continue;
    (uit.get(k.van) || uit.set(k.van, []).get(k.van)).push(k);
    (in_.get(k.naar) || in_.set(k.naar, []).get(k.naar)).push(k);
  }
  const midden = (id) => plek[id].x + plek[id].w / 2;
  for (const m of [uit, in_]) {
    for (const [, l] of m) l.sort((a, b) => midden(m === uit ? a.naar : a.van) - midden(m === uit ? b.naar : b.van));
  }
  const banen = new Map();
  let svg = '';
  let labels = '';
  for (const k of lijst) {
    const a = plek[k.van];
    const b = plek[k.naar];
    if (!a || !b) continue;
    const uitL = uit.get(k.van);
    const inL = in_.get(k.naar);
    const ax = a.x + (a.w * (uitL.indexOf(k) + 1)) / (uitL.length + 1);
    const bx = b.x + (b.w * (inL.indexOf(k) + 1)) / (inL.length + 1);
    let d;
    let labelX;
    let labelY;
    const naast = Math.abs(a.y - b.y) < 1 && Math.abs(a.x - b.x) < Math.max(a.w, b.w) + 30;
    if (naast) {
      /* Naast elkaar op dezelfde rij: gewoon een rechte lijn ertussen. */
      const links = a.x < b.x;
      const y = a.y + a.h / 2;
      const x1 = links ? a.x + a.w : a.x;
      const x2 = links ? b.x : b.x + b.w;
      d = `M${x1} ${y} H${x2}`;
      /* Geen label: daar is tussen twee blokken geen plek voor. De dikte
         staat in de popup en op de kabel eronder. */
      labelX = null;
    } else if (Math.abs(a.y - b.y) < 1) {
      /* Op dezelfde rij: eronderdoor. */
      const sleutel = `onder-${a.y}`;
      const baan = banen.get(sleutel) || 0;
      banen.set(sleutel, baan + 1);
      const yb = a.y + a.h + 10 + baan * 7;
      d = `M${ax} ${a.y + a.h} V${yb} H${bx} V${b.y + b.h}`;
      labelX = (ax + bx) / 2;
      labelY = yb + 9;
    } else {
      const omlaag = b.y > a.y;
      const y1 = omlaag ? a.y + a.h : a.y;
      const y2 = omlaag ? b.y : b.y + b.h;
      const sleutel = `gat-${Math.min(a.y, b.y)}`;
      const baan = banen.get(sleutel) || 0;
      banen.set(sleutel, baan + 1);
      const ym = omlaag ? y1 + 14 + baan * 7 : y1 - 14 - baan * 7;
      d = `M${ax} ${y1} V${ym} H${bx} V${y2}`;
      labelX = bx + 3;
      labelY = (ym + y2) / 2 + 3;
    }
    const keer = k.aantal > 1 ? `${k.aantal}× ` : '';
    const label = k.soort === 'speaker' ? (k.maat ? `${keer}${luidsprekerNaam(k.maat)}` : '')
      : k.soort === 'rca' ? `${keer}RCA` : k.soort === 'hoog' ? 'hoog' : k.soort === 'remote' ? 'remote'
        : (k.maat ? `${komma(k.maat.mm2)} mm²` : '');
    const naam = `${KABELSOORT_NAAM[k.soort] || ''}: ${k.naam}`;
    svg += `<g class="bd-kabel bd-k-${k.soort} bd-${k.status}${k.advies ? ' bd-advies' : ''}" data-ding="kabel:${ontsnap(k.id)}" tabindex="0" role="button" aria-label="${ontsnap(naam)}">`
      + `<path class="bd-raak" d="${d}"/><path class="bd-lijn" d="${d}"/></g>`;
    if (label && labelX !== null) labels += `<text class="bd-label" x="${labelX}" y="${labelY}">${ontsnap(label)}</text>`;
    if (k.zekeringId) {
      const fy = a.y + a.h + 4;
      svg += `<g class="bd-zek" data-ding="zekering:${ontsnap(k.zekeringId)}" tabindex="0" role="button" aria-label="Zekering ${k.zekeringA || ''} A">`
        + `<rect x="${ax - 5}" y="${fy}" width="10" height="9" rx="2"/></g>`;
      if (k.zekeringA) labels += `<text class="bd-label bd-zek-label" x="${ax + 7}" y="${fy + 8}">${k.zekeringA} A</text>`;
    }
  }
  return svg + labels;
}

function schema(soort, uitkomst, rijen, extra = '') {
  const ids = new Set(rijen.flat());
  const { plek, hoogte } = legUit(rijen);
  const knopen = uitkomst.knopen.filter((k) => ids.has(k.id));
  const kabels = uitkomst.kabels.filter((k) => (k.laag === soort || (soort === 'stroom' && k.soort === 'remote')) && plek[k.van] && plek[k.naar]);
  const titel = soort === 'stroom' ? 'Stroomschema' : 'Audioschema';
  return `<svg class="bd-schema" viewBox="0 0 ${BREED} ${hoogte}" width="100%" role="img" aria-label="${titel}" xmlns="http://www.w3.org/2000/svg">`
    + `<title>${titel}</title>`
    + (typeof extra === 'function' ? extra(plek, hoogte) : extra)
    + kabelsSvg(kabels, plek)
    + knopen.map((k) => knoopSvg(k, plek[k.id])).join('')
    + '</svg>';
}

export function stroomSchema(uitkomst, plan = {}) {
  const heeft = (id) => uitkomst.knopen.some((k) => k.id === id);
  const verbruikers = uitkomst.knopen.filter((k) => k.soort === 'versterker' || k.soort === 'dsp');
  const remoteBron = uitkomst.kabels.some((k) => k.soort === 'remote' && k.van === 'bron');
  const rijen = [
    ['accumassa', 'accu', ...(heeft('hoofdzekering') ? ['hoofdzekering'] : [])],
    [...(heeft('verdeelblok') ? ['verdeelblok'] : []), ...(remoteBron ? ['bron'] : [])],
    verbruikers.map((k) => k.id),
    heeft('massapunt') ? ['massapunt'] : [],
  ];
  const motor = (plan.accu?.plek || 'motorruimte') === 'motorruimte' && verbruikers.length;
  return schema('stroom', uitkomst, rijen, (plek) => {
    if (!motor) return '';
    const y = plek.accu.y + plek.accu.h + 40;
    return `<g class="bd-zone"><text x="${RAND}" y="14">MOTORRUIMTE</text>`
      + `<line x1="0" x2="${BREED}" y1="${y}" y2="${y}"/>`
      + `<text x="${BREED - RAND}" y="${y + 13}" text-anchor="end">INTERIEUR · DOOR HET SCHUTBORD</text></g>`;
  });
}

export function audioSchema(uitkomst) {
  const van = (soort) => uitkomst.knopen.filter((k) => k.soort === soort).map((k) => k.id);
  const rijen = [
    van('bron'),
    van('fabrieksversterker'),
    van('dsp'),
    van('versterker'),
    [...van('speakers'), ...van('subwoofer')],
  ];
  return schema('audio', uitkomst, rijen);
}

/**
 * DE AUTO VAN BOVEN, met elk onderdeel op zijn plek.
 *
 * Getekend op de echte verhouding van deze auto: lengte, breedte en de
 * plaats van de assen uit de wielbasis. De neus wijst naar boven, links in
 * de tekening is links in de auto (de bestuurderskant).
 *
 * Elk onderdeel is een genummerd rondje; het nummer staat ook in de lijst
 * eronder. Kabels lopen zoals ze getrokken worden: plus langs links, signaal
 * langs rechts.
 */
export function inbouwSchema(uitkomst, plan = {}) {
  const maten = uitkomst.maten || autoMaten({}, plan);
  const H = 540;
  const autoH = 500;
  const autoW = Math.min(300, autoH * (maten.breedte / maten.lengte));
  const x0 = (BREED - autoW) / 2;
  const y0 = 20;
  /* Van fractie in de auto naar een punt in de tekening. */
  const naar = ([fx, fy]) => [x0 + fy * autoW, y0 + fx * autoH];
  const overhangVoor = Math.max(0.1, ((maten.lengte - maten.wielbasis) / maten.lengte) * 0.45);
  const voorAs = y0 + overhangVoor * autoH;
  const achterAs = voorAs + (maten.wielbasis / maten.lengte) * autoH;
  const wiel = (y, kant) => `<rect class="bd-wiel" x="${kant ? x0 + autoW - 4 : x0 - 10}" y="${y - 26}" width="14" height="52" rx="5"/>`;
  const rx = autoW * 0.22;
  const lijn = (f, klasse = 'bd-auto-lijn') => `<line class="${klasse}" x1="${x0 + 6}" x2="${x0 + autoW - 6}" y1="${y0 + f * autoH}" y2="${y0 + f * autoH}"/>`;
  const tekstZone = (f, t) => `<text class="bd-zone-tekst" x="${BREED / 2}" y="${y0 + f * autoH}">${t}</text>`;

  let svg = `<g class="bd-auto">`
    + wiel(voorAs, 0) + wiel(voorAs, 1) + wiel(achterAs, 0) + wiel(achterAs, 1)
    + `<rect class="bd-romp" x="${x0}" y="${y0}" width="${autoW}" height="${autoH}" rx="${rx}"/>`
    + lijn(0.235, 'bd-schutbord')
    + `<path class="bd-ruit" d="M${x0 + 10} ${y0 + 0.3 * autoH} Q${BREED / 2} ${y0 + 0.25 * autoH} ${x0 + autoW - 10} ${y0 + 0.3 * autoH}"/>`
    + `<rect class="bd-stoel" x="${x0 + autoW * 0.14}" y="${y0 + 0.4 * autoH}" width="${autoW * 0.28}" height="${autoH * 0.13}" rx="6"/>`
    + `<rect class="bd-stoel" x="${x0 + autoW * 0.58}" y="${y0 + 0.4 * autoH}" width="${autoW * 0.28}" height="${autoH * 0.13}" rx="6"/>`
    + `<rect class="bd-stoel" x="${x0 + autoW * 0.14}" y="${y0 + 0.6 * autoH}" width="${autoW * 0.72}" height="${autoH * 0.1}" rx="6"/>`
    + lijn(0.73)
    + tekstZone(0.06, 'MOTORRUIMTE')
    + tekstZone(0.255, 'SCHUTBORD')
    + tekstZone(0.97, 'KOFFERBAK')
    + `</g>`;

  /* De kabels, elk met een klein beetje eigen ruimte zodat ze naast
     elkaar lopen en niet over elkaar. */
  let kabelsSvgTekst = '';
  const zichtbaar = uitkomst.kabels.filter((k) => k.routes && k.soort !== 'fabriek');
  zichtbaar.forEach((k, i) => {
    const schuif = ((i % 7) - 3) * 0.008;
    const d = k.routes.map((punten) => punten.map((pt, j) => {
      const [x, y] = naar([pt[0], pt[1] + (j > 0 && j < punten.length - 1 ? schuif : 0)]);
      return `${j ? 'L' : 'M'}${Math.round(x * 10) / 10} ${Math.round(y * 10) / 10}`;
    }).join(' ')).join(' ');
    const naam = `${KABELSOORT_NAAM[k.soort] || ''}: ${k.naam}`;
    kabelsSvgTekst += `<g class="bd-kabel bd-k-${k.soort} bd-${k.status}${k.advies ? ' bd-advies' : ''}" data-ding="kabel:${ontsnap(k.id)}" tabindex="0" role="button" aria-label="${ontsnap(naam)}">`
      + `<path class="bd-raak" d="${d}"/><path class="bd-lijn" d="${d}"/></g>`;
  });

  /* De onderdelen. Staan er meer op één plek, dan schuiven ze een stukje
     uit elkaar. */
  const lijst = inbouwLijst(uitkomst);
  const opPlek = new Map();
  let punten = '';
  for (const item of lijst) {
    for (const pt of puntenVan(item.plek)) {
      const sleutel = pt.join(',');
      const n = opPlek.get(sleutel) || 0;
      opPlek.set(sleutel, n + 1);
      const [x, y] = naar(pt);
      const dx = [0, 20, -20][n % 3];
      const dy = Math.floor(n / 3) * 20;
      punten += `<g class="bd-punt bd-${item.status}" data-ding="knoop:${ontsnap(item.id)}" tabindex="0" role="button" aria-label="${ontsnap(`${item.nr}. ${item.naam}`)}">`
        + `<circle cx="${x + dx}" cy="${y + dy}" r="9"/><text x="${x + dx}" y="${y + dy + 3.5}">${item.nr}</text></g>`;
    }
  }

  return `<svg class="bd-schema bd-inbouw" viewBox="0 0 ${BREED} ${H}" width="100%" role="img" aria-label="Inbouw in de auto" xmlns="http://www.w3.org/2000/svg">`
    + '<title>Inbouw in de auto, van boven</title>'
    + svg + kabelsSvgTekst + punten + '</svg>';
}

/** De genummerde lijst onder de tekening: elk onderdeel met zijn plek. */
export function inbouwLijst(uitkomst) {
  const volgorde = ['accu', 'zekering', 'verdeelblok', 'massa', 'bron', 'fabrieksversterker', 'dsp', 'versterker', 'speakers', 'subwoofer'];
  return uitkomst.knopen
    .filter((k) => k.id !== 'accumassa')
    .slice()
    .sort((a, b) => volgorde.indexOf(a.soort) - volgorde.indexOf(b.soort))
    .map((k, i) => ({ id: k.id, nr: i + 1, naam: k.naam, soort: k.soort, status: k.status, plek: k.plek }));
}

/** Alle dingen in de tekening op hun id, om de popup te vullen. */
export function zoekDing(uitkomst, sleutel) {
  const [soort, id] = String(sleutel || '').split(':');
  if (soort === 'knoop') return uitkomst.knopen.find((k) => k.id === id) || null;
  if (soort === 'kabel') return uitkomst.kabels.find((k) => k.id === id) || null;
  if (soort === 'zekering') {
    const z = uitkomst.zekeringen.find((x) => x.id === id);
    if (!z) return null;
    return {
      id: z.id, soort: 'zekering', naam: `Zekering ${z.beschermt}`, status: z.status,
      rijen: [['Waarde', z.waardeA ? `${z.waardeA} A` : 'nog niet te berekenen'], ['Soort', z.type], ['Plek', z.plek], ['Beschermt', z.beschermt]],
      uitleg: ['Elke kabel die dunner is dan de kabel ervoor krijgt een eigen zekering. Die waarde is nooit groter dan wat die dunnere kabel kan dragen.'],
      waarschuwingen: uitkomst.waarschuwingen.filter((w) => w.bij === id),
    };
  }
  return null;
}

/* ================= OP PAPIER ================= */

export function bedradingHtml(uitkomst, plan, offerte = {}) {
  const auto = [offerte.auto?.merk, offerte.auto?.model].filter(Boolean).join(' ');
  const rij = (cellen, kop = false) => `<tr>${cellen.map((c) => (kop ? `<th>${ontsnap(c)}</th>` : `<td>${ontsnap(c)}</td>`)).join('')}</tr>`;
  const kabels = uitkomst.kabellijst.length
    ? `<table>${rij(['Soort', 'Dikte', 'Stuks', 'Klaarleggen'], true)}${uitkomst.kabellijst.map((g) => rij([KABELSOORT_NAAM[g.soort] || g.soort, g.maat, String(g.stuks), `${g.klaarleggen} m`])).join('')}</table>`
    : '<p>Geen nieuwe kabels.</p>';
  const zek = uitkomst.zekeringen.length
    ? `<table>${rij(['Zekering', 'Soort', 'Plek', 'Beschermt'], true)}${uitkomst.zekeringen.map((z) => rij([z.waardeA ? `${z.waardeA} A` : '—', z.type, z.plek, z.beschermt])).join('')}</table>`
    : '<p>Geen nieuwe zekeringen.</p>';
  const letOp = uitkomst.waarschuwingen.length
    ? `<ul>${uitkomst.waarschuwingen.map((w) => `<li>${ontsnap(w.tekst)}</li>`).join('')}</ul>`
    : '<p>Niets bijzonders.</p>';
  return `<div class="bd-blad">`
    + `<h2>Bedradingsplan${offerte.nummer ? ` · offerte ${ontsnap(offerte.nummer)}` : ''}</h2>`
    + `<p class="bd-blad-sub">${ontsnap([auto, offerte.auto?.kenteken, offerte.klant?.naam].filter(Boolean).join(' · '))}</p>`
    + `<div class="bd-blad-schemas"><div><h3>Stroom</h3>${stroomSchema(uitkomst, plan)}</div><div><h3>Audio</h3>${audioSchema(uitkomst)}</div></div>`
    + `<h3>Kabels klaarleggen</h3>${kabels}<h3>Zekeringen</h3>${zek}<h3>Let op</h3>${letOp}`
    + `<p class="bd-blad-sub">Grijs = bestaand · oranje = nieuw · oranje gestippeld = vervangen. Gestippelde kabel = fabrieksbedrading die blijft.</p>`
    + `</div>`
    + `<div class="bd-blad bd-blad-auto">`
    + `<h2>Inbouw in de auto</h2>`
    + `<p class="bd-blad-sub">${komma(uitkomst.maten.lengte / 100, 2)} × ${komma(uitkomst.maten.breedte / 100, 2)} m, wielbasis ${komma(uitkomst.maten.wielbasis / 100, 2)} m${uitkomst.maten.geschat ? ' (geschat)' : ''}</p>`
    + `<div class="bd-blad-schemas"><div>${inbouwSchema(uitkomst, plan)}</div><div>`
    + `<table>${rij(['Nr', 'Onderdeel', 'Plek', 'Maten (mm)'], true)}${inbouwLijst(uitkomst).map((item) => {
      const info = inbouwVan(plan, item.id);
      const plek = [LOCATIES.find((l) => l.id === item.plek)?.naam, info.notitie].filter(Boolean).join(' — ');
      return rij([String(item.nr), item.naam, plek, info.afmeting || '—']);
    }).join('')}</table></div></div>`
    + `<h3>Kabellengtes</h3><table>${rij(['Kabel', 'Dikte', 'Stuks', 'Meter per stuk'], true)}${uitkomst.kabels.filter((k) => k.lengteAanpasbaar && k.lengteM).map((k) => rij([
      k.naam,
      k.soort === 'speaker' ? luidsprekerNaam(k.maat) : k.soort === 'rca' ? 'RCA' : k.soort === 'hoog' ? 'hoog niveau' : k.soort === 'remote' ? '0,75 mm²' : voedingNaam(k.maat),
      String(k.aantal || 1), `${komma(k.lengteM)} m`,
    ])).join('')}</table>`
    + `</div>`;
}
