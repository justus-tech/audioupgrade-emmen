/**
 * DE AGENDA — wanneer staat wat, en wanneer moet er besteld zijn.
 *
 * WAAROM DIT BESTAAT
 * Een inbouw gaat niet mis op de dag zelf. Hij gaat mis twee weken eerder,
 * toen de onderdelen nog niet besteld waren. Deze module rekent per klus drie
 * datums uit en zet ze op een rij:
 *
 *   de inbouwdatum        wanneer de auto op de brug staat
 *   bestel uiterlijk      de laatste dag dat je de onderdelen kunt bestellen
 *                         en ze op tijd binnen zijn
 *   de herinneringen      een week en een dag van tevoren
 *
 * OVER DE MELDINGEN — LEES DIT
 * Deze app kan je géén melding sturen als hij dichtstaat. Daar is een server
 * voor nodig en die is er niet: dit is een website zonder achterkant. Wat wél
 * werkt, en beter werkt, is de agenda die al op je telefoon staat. De app
 * maakt een agendabestand (.ics) met de afspraak én de wekkers erin. Dat zet
 * je één keer in je eigen agenda, en dan piept je telefoon een week en een
 * dag van tevoren — ook als Headroom dicht staat, ook zonder internet.
 *
 * Open je Headroom zelf, dan zie je bovenaan de agenda wat eraan komt.
 */
import { datumNl } from './rekenen.js';
import { ADRES } from '../../data/site.js';

/** Statussen waarbij de aanbetaling binnen is en je dus mag bestellen. */
const BETAALD = ['aanbetaald', 'gefactureerd', 'betaald'];

/**
 * Een datum zonder tijd, zodat "hoeveel dagen nog" op hele dagen uitkomt.
 *
 * "2026-10-05" wordt met opzet stuk voor stuk uit elkaar gehaald in plaats
 * van aan new Date() gegeven. Die leest zo'n datum namelijk als middernacht
 * in Greenwich, en dan wordt het in een tijdzone links van ons de dag ervóór.
 * Een inbouwdatum die een dag verschuift omdat je op vakantie bent is precies
 * het soort fout dat je pas merkt als de klant voor een dichte deur staat.
 */
export function opMiddernacht(waarde) {
  if (waarde instanceof Date) {
    const d = new Date(waarde);
    if (Number.isNaN(d.getTime())) return null;
    d.setHours(0, 0, 0, 0);
    return d;
  }
  const tekst = String(waarde || '').trim();
  const m = tekst.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (m) return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]), 0, 0, 0, 0);
  const d = new Date(tekst);
  if (Number.isNaN(d.getTime())) return null;
  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * Hoeveel hele dagen er tussen twee datums zitten.
 *
 * Via middernacht en niet via het aantal milliseconden gedeeld door een dag:
 * twee keer per jaar duurt een dag 23 of 25 uur, en dan komt zo'n deling er
 * een dag naast te zitten.
 */
export function dagenTussen(van, tot) {
  const a = opMiddernacht(van);
  const b = opMiddernacht(tot);
  if (!a || !b) return null;
  return Math.round((b - a) / 86400000);
}

/** De dag waarop de onderdelen uiterlijk besteld moeten zijn. */
export function bestelUiterlijk(inbouwdatum, bestelDagen = 14) {
  const d = opMiddernacht(inbouwdatum);
  if (!d) return null;
  d.setDate(d.getDate() - (Math.round(Number(bestelDagen)) || 0));
  return d;
}

/** 'over 3 dagen', 'morgen', 'vandaag', '2 dagen geleden'. */
export function hoeLangNog(dagen) {
  if (dagen === null) return '';
  if (dagen === 0) return 'vandaag';
  if (dagen === 1) return 'morgen';
  if (dagen === -1) return 'gisteren';
  if (dagen > 0) return `over ${dagen} dagen`;
  return `${-dagen} dagen geleden`;
}

/**
 * Eén klus met alles erbij gerekend.
 *
 * `bestellen` is het enige veld waar iets in zit dat geen datum is, en dat
 * met opzet: dit is het veld waar Justus op moet kijken.
 *
 *   'wacht'     de aanbetaling is nog niet binnen — nog niet bestellen
 *   'nu'        besteld moet worden, vandaag of eerder had gemoeten
 *   'straks'    de aanbetaling is binnen, bestellen kan nog even wachten
 *   'te-laat'   de besteldag is voorbij en er is nog niet betaald
 *   'gedaan'    de inbouwdag is geweest
 */
export function agendaItem(offerte, inst = {}, vandaag = new Date()) {
  const datum = opMiddernacht(offerte.inbouwdatum);
  if (!datum) return null;

  const bestelDagen = Math.round(Number(inst.bestelDagen)) || 14;
  const besteldag = bestelUiterlijk(datum, bestelDagen);
  const dagen = dagenTussen(vandaag, datum);
  const bestelDagenTot = dagenTussen(vandaag, besteldag);
  const aanbetaald = BETAALD.includes(offerte.status);

  let bestellen;
  if (dagen < 0) bestellen = 'gedaan';
  else if (offerte.besteld) bestellen = 'gedaan';
  else if (!aanbetaald && bestelDagenTot <= 0) bestellen = 'te-laat';
  else if (!aanbetaald) bestellen = 'wacht';
  else if (bestelDagenTot <= 0) bestellen = 'nu';
  else bestellen = 'straks';

  return {
    nummer: offerte.nummer,
    wie: offerte.klant?.bedrijf || offerte.klant?.naam || 'zonder naam',
    telefoon: offerte.klant?.telefoon || '',
    auto: [offerte.auto?.merk, offerte.auto?.model].filter(Boolean).join(' '),
    kenteken: offerte.auto?.kenteken || '',
    status: offerte.status || 'concept',
    datum,
    tijd: offerte.inbouwtijd || '09:00',
    dagen,
    hoeLang: hoeLangNog(dagen),
    besteldag,
    bestelDagenTot,
    aanbetaald,
    bestellen,
  };
}

/** Alle klussen met een datum, de eerstvolgende bovenaan. */
export function agenda(offertes = [], inst = {}, vandaag = new Date()) {
  return offertes
    .map((o) => agendaItem(o, inst, vandaag))
    .filter(Boolean)
    .sort((a, b) => a.datum - b.datum);
}

/* ================= HET AGENDABESTAND ================= */

/**
 * Tekst zoals een agendabestand hem wil hebben.
 *
 * Een komma, een puntkomma en een schuine streep naar links hebben in zo'n
 * bestand een eigen betekenis. Staat er een komma in een klantnaam en
 * ontsnapt die niet, dan houdt de agenda de helft van de regel over.
 */
export function icsTekst(tekst) {
  return String(tekst ?? '')
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n');
}

/**
 * Het moment waarop de afspraak is gemaakt, in de tijd van Greenwich.
 * Elk agendabestand moet dat veld hebben.
 */
export function icsNu(nu = new Date()) {
  const twee = (n) => String(n).padStart(2, '0');
  return (
    `${nu.getUTCFullYear()}${twee(nu.getUTCMonth() + 1)}${twee(nu.getUTCDate())}` +
    `T${twee(nu.getUTCHours())}${twee(nu.getUTCMinutes())}${twee(nu.getUTCSeconds())}Z`
  );
}

/**
 * Afspraken tot één agendabestand maken: met de omslag eromheen die elke
 * agenda verwacht, opgevouwen, en met wagenretouren aan het eind van de regel.
 */
export function icsBestand(afspraken) {
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Audio Upgrade Emmen//Headroom//NL',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    ...afspraken,
    'END:VCALENDAR',
  ].flatMap(vouwOp).join('\r\n') + '\r\n';
}

/**
 * Lange regels opvouwen.
 *
 * Een regel in een agendabestand mag niet langer zijn dan 75 tekens. Wat
 * eroverheen gaat komt op de volgende regel, met een spatie ervoor. Doe je
 * dat niet, dan weigeren sommige agenda's het hele bestand.
 */
export function vouwOp(regel) {
  const uit = [];
  let rest = String(regel);
  uit.push(rest.slice(0, 73));
  rest = rest.slice(73);
  while (rest.length) {
    uit.push(` ${rest.slice(0, 72)}`);
    rest = rest.slice(72);
  }
  return uit;
}

/**
 * Opgevouwen regels weer aan elkaar plakken.
 *
 * Precies wat een agenda-app zelf doet bij het inlezen. Staat hier zodat je
 * kunt controleren dat er na het opvouwen nog hetzelfde staat als ervoor.
 */
export function ontvouw(tekst) {
  return String(tekst).replace(/\r\n[ \t]/g, '');
}

/** 20260920T090000 — de tijd zoals hij op de klok staat, zonder tijdzone. */
export function icsStempel(datum, tijd = '09:00') {
  const [uur, min] = String(tijd).split(':');
  const d = opMiddernacht(datum);
  const twee = (n) => String(n).padStart(2, '0');
  return (
    `${d.getFullYear()}${twee(d.getMonth() + 1)}${twee(d.getDate())}` +
    `T${twee(Number(uur) || 0)}${twee(Number(min) || 0)}00`
  );
}

/**
 * RECHTSTREEKS IN GOOGLE AGENDA — zonder koppeling, zonder inloggen.
 *
 * WAAROM DIT NAAST HET AGENDABESTAND STAAT
 * Een .ics-bestand moet je downloaden en openen; op Android is dat een paar
 * tikken en soms landt hij in de verkeerde agenda. Deze link opent Google
 * Agenda met de afspraak al ingevuld — je controleert hem en drukt op
 * Opslaan. Eén tik, en het staat in dezelfde agenda die je al gebruikt.
 *
 * `ctz` is het belangrijkste veld hier. Zonder dat leest Google de tijd als
 * de tijdzone van het account, en dat is niet altijd de onze; met Europe/
 * Amsterdam staat negen uur ook echt om negen uur in zijn agenda.
 *
 * Dit werkt vandaag al. Om een afspraak later automatisch te laten meeschuiven
 * als je hem verzet, is een echte koppeling met Google nodig.
 */
export function googleAgendaLink({
  titel = '',
  datum,
  tijd = '09:00',
  eindDatum,
  eindTijd,
  uitleg = '',
  plaats = '',
} = {}) {
  const begin = icsStempel(datum, tijd);
  const eind = icsStempel(eindDatum || datum, eindTijd || tijd);
  const velden = new URLSearchParams({
    action: 'TEMPLATE',
    text: titel,
    dates: `${begin}/${eind}`,
    ctz: 'Europe/Amsterdam',
  });
  if (uitleg) velden.set('details', uitleg);
  if (plaats) velden.set('location', plaats);
  return `https://calendar.google.com/calendar/render?${velden.toString()}`;
}

/** De inbouw en de besteldag als twee links naar Google Agenda. */
export function googleLinksVoorKlus(item, { duurUren = 8, voorbereiding = {} } = {}) {
  const wat = [item.auto, item.kenteken].filter(Boolean).join(' · ');
  const titel = `Inbouw ${item.wie}${wat ? ` — ${wat}` : ''}`;
  const regels = (lijst) => [
    `Offerte ${item.nummer}`,
    item.telefoon && `Tel. ${item.telefoon}`,
    '',
    ...lijst,
  ].filter((r) => r !== false && r !== undefined).join('\n');

  return {
    inbouw: {
      naam: 'Inbouw',
      url: googleAgendaLink({
        titel,
        datum: item.datum,
        tijd: item.tijd,
        eindTijd: plusUren(item.tijd, duurUren),
        uitleg: regels(voorbereiding.dag || []),
        plaats: ADRES,
      }),
    },
    bestellen: {
      naam: 'Bestellen',
      url: googleAgendaLink({
        titel: `Onderdelen bestellen — ${item.wie}`,
        datum: item.besteldag,
        tijd: '08:00',
        eindTijd: '08:30',
        uitleg: regels([
          `Uiterlijk vandaag bestellen voor de inbouw op ${datumNl(item.datum)}.`,
          'Bestel pas als de aanbetaling binnen is.',
        ]),
      }),
    },
  };
}

/**
 * JE GOOGLE-AGENDA IN BEELD IN DE APP.
 *
 * Google laat een agenda zien in een venstertje binnen je eigen pagina. Dat
 * is kijken, geen koppeling: de app kan niet lézen wat erin staat, want de
 * browser houdt de twee sites uit elkaar. Voor het inplannen is dat genoeg —
 * je ziet in één scherm of een dag al vol staat.
 *
 * Je plakt bij Instellingen je agenda-adres. Dat is meestal het e-mailadres
 * van je Google-account, of het lange adres dat onder "Agenda integreren"
 * staat. Een volledige link uit Google mag ook.
 *
 * WAT ER NIET IN DE CODE KOMT
 * Dat adres blijft in je telefoon staan, net als je rekeningnummer. Deze map
 * staat openbaar op GitHub.
 */
export function googleEmbedUrl(invoer, { achtergrond = '', weergave = 'AGENDA' } = {}) {
  const tekst = String(invoer || '').trim();
  if (!tekst) return '';

  /* Plakt hij een hele link uit Google, dan die gebruiken — maar alleen als
     hij ook echt van Google komt. Een willekeurig adres in een venstertje op
     je eigen scherm zetten is nergens voor nodig. */
  if (/^https?:\/\//i.test(tekst)) {
    try {
      const url = new URL(tekst);
      if (url.hostname !== 'calendar.google.com') return '';
      return url.toString();
    } catch (e) {
      return '';
    }
  }

  /**
   * Een agenda-adres van Google ziet er altijd uit als een e-mailadres: je
   * eigen adres, of zoiets als abc123@group.calendar.google.com. Plakt hij
   * iets anders, dan levert Google een leeg venster op en snapt niemand
   * waarom. Beter meteen zeggen dat het niet klopt.
   */
  if (!/^[^\s:@]+@[^\s:@]+\.[^\s:@]+$/.test(tekst)) return '';

  const velden = new URLSearchParams({
    src: tekst,
    ctz: 'Europe/Amsterdam',
    mode: weergave,
    showTitle: '0',
    showPrint: '0',
    showCalendars: '0',
    showTz: '0',
    /* Maandag vooraan, zoals de kalender aan de muur. */
    wkst: '2',
  });
  if (achtergrond) velden.set('bgcolor', achtergrond);
  return `https://calendar.google.com/calendar/embed?${velden.toString()}`;
}

/** De tijd een aantal uren later, voor het einde van de afspraak. */
function plusUren(tijd, uren) {
  const [u, m] = String(tijd).split(':');
  const totaal = Math.min(23 * 60 + 59, (Number(u) || 0) * 60 + (Number(m) || 0) + uren * 60);
  return `${String(Math.floor(totaal / 60)).padStart(2, '0')}:${String(totaal % 60).padStart(2, '0')}`;
}

/**
 * Het agendabestand voor één klus.
 *
 * Er komen twee afspraken in:
 *
 *   1. de inbouw zelf, met een wekker een week en een dag van tevoren
 *   2. de dag waarop de onderdelen uiterlijk besteld moeten zijn
 *
 * De tijden staan er zonder tijdzone in. Dat heet een zwevende tijd en
 * betekent: negen uur is negen uur op de klok waar je bent. Voor een
 * werkplaats die altijd in Nederland staat is dat precies goed, en het
 * scheelt een hoop gedoe met zomertijd.
 */
export function icsVoorKlus(item, { duurUren = 8, voorbereiding = {} } = {}) {
  const wat = [item.auto, item.kenteken].filter(Boolean).join(' · ');
  const titel = `Inbouw ${item.wie}${wat ? ` — ${wat}` : ''}`;
  const gestempeld = icsNu();

  const omschrijving = (lijst) =>
    icsTekst([`Offerte ${item.nummer}`, item.telefoon && `Tel. ${item.telefoon}`, '', ...lijst]
      .filter((r) => r !== false && r !== undefined)
      .join('\n'));

  return icsBestand([
    /* ---- de inbouw ---- */
    'BEGIN:VEVENT',
    `UID:inbouw-${item.nummer}@audioupgradeemmen.nl`,
    `DTSTAMP:${gestempeld}`,
    `DTSTART:${icsStempel(item.datum, item.tijd)}`,
    `DTEND:${icsStempel(item.datum, plusUren(item.tijd, duurUren))}`,
    `SUMMARY:${icsTekst(titel)}`,
    `DESCRIPTION:${omschrijving(voorbereiding.dag || [])}`,
    'LOCATION:Charles Darwinstraat 35\\, 7825 AB Emmen',
    'BEGIN:VALARM',
    'TRIGGER:-P7D',
    'ACTION:DISPLAY',
    `DESCRIPTION:${icsTekst(`Over een week: ${titel}`)}`,
    'END:VALARM',
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    `DESCRIPTION:${icsTekst(`Morgen: ${titel}`)}`,
    'END:VALARM',
    'END:VEVENT',

    /* ---- uiterlijk bestellen ---- */
    'BEGIN:VEVENT',
    `UID:bestellen-${item.nummer}@audioupgradeemmen.nl`,
    `DTSTAMP:${gestempeld}`,
    `DTSTART:${icsStempel(item.besteldag, '08:00')}`,
    `DTEND:${icsStempel(item.besteldag, '08:30')}`,
    `SUMMARY:${icsTekst(`Onderdelen bestellen — ${item.wie}`)}`,
    `DESCRIPTION:${omschrijving([
      `Uiterlijk vandaag bestellen voor de inbouw op ${datumNl(item.datum)}.`,
      'Bestel pas als de aanbetaling binnen is.',
    ])}`,
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    `DESCRIPTION:${icsTekst(`Morgen uiterlijk bestellen voor ${item.wie}`)}`,
    'END:VALARM',
    'END:VEVENT',
  ]);
}

/** inbouw-2026-014-XX99XX.ics */
export function icsBestandsnaam(item) {
  const kenteken = String(item.kenteken || '').replace(/[^A-Za-z0-9]/g, '').toUpperCase();
  return ['inbouw', item.nummer, kenteken].filter(Boolean).join('-') + '.ics';
}
