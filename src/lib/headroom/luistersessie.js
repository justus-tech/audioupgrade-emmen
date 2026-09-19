/**
 * DE LUISTERSESSIE — de afspraak die je de klant stuurt.
 *
 * WAAROM DIT BESTAAT
 * Een luistersessie gaat aan alles vooraf: de klant komt luisteren, en pas
 * daarna volgt een offerte. Die afspraak moest Justus elke keer met de hand
 * uittikken in WhatsApp, en dan vergeet je een keer het belangrijkste: dat er
 * een hek voor het terrein zit en dat je moet bellen om binnen te komen. Dan
 * staat er iemand voor niets te wachten.
 *
 * WAT ER ALTIJD IN MOET
 *   de voornaam       zodat het bericht aan hém gericht is
 *   dag, datum, tijd  voluit, want "7-10" leest iedereen anders
 *   het kenteken      zodat hij weet dat het over zijn auto gaat
 *   het adres         Charles Darwinstraat 35
 *   het hek           bellen op het nummer van Justus, niet wachten
 *
 * HET BERICHT IS EEN VOORSTEL, GEEN KNOP
 * De app zet het bericht klaar; Justus kan het aanpassen voordat het weggaat.
 * Er staat niets in wat hij niet waar kan maken, en niets wat de app niet
 * weet — geen verzonnen looptijd, geen beloftes over wat hij gaat horen.
 */
import { SITE, ADRES } from '../../data/site.js';
import { formatteerKenteken } from '../match.js';
import {
  icsTekst, icsStempel, icsNu, icsBestand, opMiddernacht, dagenTussen, hoeLangNog,
  googleAgendaLink,
} from './agenda.js';

const DAGEN = ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'];
const MAANDEN = [
  'januari', 'februari', 'maart', 'april', 'mei', 'juni',
  'juli', 'augustus', 'september', 'oktober', 'november', 'december',
];

/**
 * 'woensdag 7 oktober 2026'.
 *
 * Voluit en met de dag erbij. "07-10" wordt door de een gelezen als 7 oktober
 * en door de ander als juli; de dagnaam erbij maakt dat onmogelijk, en je
 * ziet meteen of het je wel uitkomt.
 */
export function datumVoluit(waarde) {
  const d = opMiddernacht(waarde);
  if (!d) return '';
  return `${DAGEN[d.getDay()]} ${d.getDate()} ${MAANDEN[d.getMonth()]} ${d.getFullYear()}`;
}

/** De tijd een aantal minuten later, voor het einde van de afspraak. */
function tijdPlus(tijd, minuten) {
  const [u, m] = String(tijd || '00:00').split(':');
  const totaal = Math.min(23 * 60 + 59, (Number(u) || 0) * 60 + (Number(m) || 0) + minuten);
  return `${String(Math.floor(totaal / 60)).padStart(2, '0')}:${String(totaal % 60).padStart(2, '0')}`;
}

/**
 * HET BERICHT VOOR DE KLANT.
 *
 * Kort gehouden en in blokjes, want dit wordt op een telefoon gelezen. De
 * instructie over het hek staat apart en onderaan-maar-één: dat is het enige
 * wat mis kan gaan als hij het niet leest.
 */
export function bevestiging({
  voornaam = '',
  kenteken = '',
  datum = '',
  tijd = '',
  duurMinuten = 0,
} = {}) {
  const naam = String(voornaam).trim().split(/\s+/)[0] || '';
  const plaat = formatteerKenteken(kenteken);
  const regels = [];

  regels.push(`Hoi${naam ? ` ${naam}` : ''},`);
  regels.push('');
  regels.push('Je luistersessie staat genoteerd:');
  regels.push('');
  if (datum) regels.push(`Wanneer: ${datumVoluit(datum)}`);
  if (tijd) {
    regels.push(
      duurMinuten
        ? `Hoe laat: ${tijd} tot ongeveer ${tijdPlus(tijd, duurMinuten)}`
        : `Hoe laat: ${tijd}`
    );
  }
  if (plaat) regels.push(`Je auto: ${plaat}`);
  regels.push('');
  regels.push(`Adres: ${ADRES}.`);
  regels.push('');
  regels.push(
    'Let op: er zit een hek voor het terrein. Bel me als je er bent op ' +
    `${SITE.phoneDisplay}, dan doe ik het hek voor je open.`
  );
  regels.push('');
  regels.push('Neem gerust je eigen muziek mee, op je telefoon of op een usb-stick.');
  regels.push('Op nummers die je kent hoor je het verschil het beste.');
  regels.push('');
  regels.push('Tot dan.');
  regels.push(`Justus — ${SITE.name}`);

  return regels.join('\n');
}

/**
 * De afspraak als agendabestand, voor de klant én voor Justus.
 *
 * Met een wekker een dag en een uur van tevoren. Het hek en het nummer staan
 * ook in de afspraak zelf: een klant die op de dag zelf zijn agenda opent
 * moet daar alles kunnen vinden zonder terug te scrollen in WhatsApp.
 */
export function icsLuistersessie(sessie = {}) {
  const { id = 'nieuw', voornaam = '', kenteken = '', datum, tijd = '10:00', duurMinuten = 45 } = sessie;
  const plaat = formatteerKenteken(kenteken);
  const naam = String(voornaam).trim().split(/\s+/)[0] || '';
  const titel = `Luistersessie ${SITE.name}${naam ? ` — ${naam}` : ''}`;

  const uitleg = [
    naam && `Voor ${naam}.`,
    plaat && `Auto: ${plaat}.`,
    `Adres: ${ADRES}.`,
    '',
    `Er zit een hek voor het terrein. Bel bij aankomst ${SITE.phoneDisplay}, dan gaat het hek open.`,
  ].filter(Boolean).join('\n');

  return icsBestand([
    'BEGIN:VEVENT',
    `UID:luistersessie-${id}@audioupgradeemmen.nl`,
    `DTSTAMP:${icsNu()}`,
    `DTSTART:${icsStempel(datum, tijd)}`,
    `DTEND:${icsStempel(datum, tijdPlus(tijd, duurMinuten))}`,
    `SUMMARY:${icsTekst(titel)}`,
    `DESCRIPTION:${icsTekst(uitleg)}`,
    `LOCATION:${icsTekst(ADRES)}`,
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    `DESCRIPTION:${icsTekst(`Morgen: ${titel}`)}`,
    'END:VALARM',
    'BEGIN:VALARM',
    'TRIGGER:-PT1H',
    'ACTION:DISPLAY',
    `DESCRIPTION:${icsTekst(`Over een uur: ${titel}`)}`,
    'END:VALARM',
    'END:VEVENT',
  ]);
}

/**
 * Dezelfde afspraak, maar rechtstreeks in Google Agenda.
 *
 * Handig voor jezelf, en je kunt de link ook aan de klant sturen: hij drukt
 * op Opslaan en het staat in zijn eigen agenda, met het adres en de
 * instructie over het hek erbij.
 */
export function googleLinkLuistersessie(sessie = {}) {
  const { voornaam = '', kenteken = '', datum, tijd = '10:00', duurMinuten = 45 } = sessie;
  const naam = String(voornaam).trim().split(/\s+/)[0] || '';
  const plaat = formatteerKenteken(kenteken);
  return googleAgendaLink({
    titel: `Luistersessie ${SITE.name}${naam ? ` — ${naam}` : ''}`,
    datum,
    tijd,
    eindTijd: tijdPlus(tijd, duurMinuten),
    uitleg: [
      naam && `Voor ${naam}.`,
      plaat && `Auto: ${plaat}.`,
      '',
      `Er zit een hek voor het terrein. Bel bij aankomst ${SITE.phoneDisplay}, dan gaat het hek open.`,
    ].filter(Boolean).join('\n'),
    plaats: ADRES,
  });
}

/** luistersessie-2026-10-07-XX99XX.ics */
export function luistersessieBestandsnaam(sessie = {}) {
  const d = opMiddernacht(sessie.datum);
  /* Niet via toISOString(). opMiddernacht() geeft middernacht hier, en dat is
     in Greenwich de dag ervóór — een sessie op 7 oktober kreeg zo een bestand
     dat luistersessie-2026-10-06 heette. Daarom uit de lokale onderdelen. */
  const twee = (n) => String(n).padStart(2, '0');
  const dag = d ? `${d.getFullYear()}-${twee(d.getMonth() + 1)}-${twee(d.getDate())}` : '';
  const plaat = String(sessie.kenteken || '').replace(/[^A-Za-z0-9]/g, '').toUpperCase();
  return ['luistersessie', dag, plaat].filter(Boolean).join('-') + '.ics';
}

/**
 * De WhatsApp-link met het bericht er al in.
 *
 * Zonder nummer opent WhatsApp met de contactenlijst en kiest Justus zelf wie
 * het krijgt. Met nummer gaat hij rechtstreeks naar dat gesprek.
 */
export function whatsappBericht(tekst, telefoon = '') {
  const nummer = String(telefoon).replace(/[^0-9]/g, '');
  /* Een Nederlands 06-nummer wil WhatsApp als 316... zien. */
  const internationaal = nummer.startsWith('06') ? `31${nummer.slice(1)}`
    : nummer.startsWith('316') ? nummer
    : nummer.startsWith('6') && nummer.length === 9 ? `31${nummer}`
    : nummer;
  return internationaal
    ? `https://wa.me/${internationaal}?text=${encodeURIComponent(tekst)}`
    : `https://wa.me/?text=${encodeURIComponent(tekst)}`;
}

/**
 * De bewaarde luistersessies, klaar om in de agenda te zetten.
 *
 * Dezelfde vorm als een inbouw uit agenda.js, zodat ze in één lijst door
 * elkaar kunnen staan — je agenda is één agenda, niet twee.
 */
export function luistersessieItems(sessies = [], vandaag = new Date()) {
  return sessies
    .filter((s) => opMiddernacht(s.datum))
    .map((s) => {
      const datum = opMiddernacht(s.datum);
      const dagen = dagenTussen(vandaag, datum);
      return {
        soort: 'luistersessie',
        id: s.id,
        wie: String(s.voornaam || '').trim() || 'zonder naam',
        /* Ook hier met streepjes: de klant leest zijn eigen kenteken zo. */
        voornaam: s.voornaam || '',
        kenteken: formatteerKenteken(s.kenteken || ''),
        telefoon: s.telefoon || '',
        datum,
        tijd: s.tijd || '10:00',
        duurMinuten: s.duurMinuten || 45,
        dagen,
        hoeLang: hoeLangNog(dagen),
      };
    })
    .sort((a, b) => a.datum - b.datum);
}
