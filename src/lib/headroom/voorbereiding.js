/**
 * DE VOORBEREIDING — wat je een week en een dag van tevoren doet.
 *
 * WAAROM DIT LOS STAAT VAN stappen.js
 * In stappen.js staat wat je doet mét de auto op de brug. Hier staat wat je
 * doet vóórdat de auto er is. Dat zijn twee verschillende lijstjes en ze
 * horen op twee verschillende momenten.
 *
 * WAT ER OP DEZE LIJSTJES STAAT
 * Alleen dingen die écht misgaan als je ze vergeet, en die je van tevoren
 * kunt doen. Geen "wees op tijd". Een speaker die een dag te laat besteld is
 * kost een hele werkdag; een ring die niet blijkt te passen kost er twee.
 *
 * Net als de werkblokken: dit is een begin, geen wet. Justus is de vakman.
 */
import { soortenIn } from './rekenen.js';

/**
 * Een stap hoort bij een of meer soorten werk, of bij '*' (altijd).
 * `waarom` staat er alleen bij als het niet vanzelf spreekt.
 */
const WEEK = [
  {
    soorten: ['*'],
    tekst: 'Onderdelen besteld en de orderbevestiging gecontroleerd op aantal en type.',
    waarom: 'Een half bestelde order merk je anders pas op de dag zelf.',
  },
  {
    soorten: ['*'],
    tekst: 'Klant een appje: dag, tijd, en hoe lang de auto blijft staan.',
  },
  {
    soorten: ['*'],
    tekst: 'Autodossier nakijken onder Auto\'s: staan de speakermaat, de ring, de stekker en de interface erin?',
    waarom: 'Staat er een streep, zoek dat nu uit. Op de dag zelf heb je die tijd niet.',
  },
  {
    soorten: ['carplay'],
    tekst: 'Fabrieksscherm en softwareversie nagevraagd of nagekeken.',
    waarom: 'Bij dezelfde auto zit soms een ander scherm; dan past de interface niet.',
  },
  {
    soorten: ['versterker', 'dsp'],
    tekst: 'Stroomplan rond: kabeldikte, zekeringwaarde en waar de massa komt.',
  },
  {
    soorten: ['demping'],
    tekst: 'Genoeg butyl en absorptie op voorraad voor het aantal deuren.',
  },
  {
    soorten: ['*'],
    tekst: 'Halve dag extra vrijgehouden achter de klus.',
    waarom: 'Loopt het uit, dan hoeft de klant van de dag erna niet af te bellen.',
  },
];

const DAG = [
  {
    soorten: ['*'],
    tekst: 'Alle onderdelen binnen, uitgepakt en gecontroleerd: juiste maat, geen transportschade.',
    waarom: 'Uitpakken op de dag zelf is hoe je om half tien met een verkeerde ring staat.',
  },
  { soorten: ['*'], tekst: 'Werkbon uitgedraaid of op de telefoon klaargezet.' },
  { soorten: ['*'], tekst: 'Stoelhoes, stuurhoes en mattenbescherming klaar.' },
  {
    soorten: ['*'],
    tekst: 'Accusteun of druppellader klaar.',
    waarom: 'Bij een lange klus met contact aan loopt de accu leeg, en dan krijg je foutcodes.',
  },
  { soorten: ['speakers-voor', 'speakers-achter', 'demping'], tekst: 'Demontageset en clips voor de deurpanelen klaar.' },
  { soorten: ['versterker', 'dsp'], tekst: 'Soldeerbout, krimpkous en kabelschoenen klaar.' },
  { soorten: ['dsp'], tekst: 'Laptop opgeladen en de tuningsoftware een keer geopend.' },
  {
    soorten: ['*'],
    tekst: 'Klant een appje: morgen om die tijd, sleutel en eventuele codes meenemen.',
  },
  { soorten: ['*'], tekst: 'Brug of plek vrij, en de vloer leeg.' },
];

/** De stappen die bij deze offerte horen. */
function kies(lijst, regels = []) {
  const soorten = new Set(soortenIn(regels));
  return lijst.filter((s) => s.soorten.includes('*') || s.soorten.some((x) => soorten.has(x)));
}

/**
 * De twee lijstjes voor één klus.
 *
 * Levert platte tekst op: dit gaat ook mee in een agendabestand, en daar kun
 * je geen opmaak in kwijt.
 */
export function voorbereiding(offerte = {}) {
  const maak = (lijst) => kies(lijst, offerte.regels).map((s) => s.tekst);
  return {
    week: maak(WEEK),
    dag: maak(DAG),
  };
}

/** Hetzelfde, maar met de uitleg erbij voor op het scherm. */
export function voorbereidingMetWaarom(offerte = {}) {
  const maak = (lijst) => kies(lijst, offerte.regels).map((s) => ({ tekst: s.tekst, waarom: s.waarom || '' }));
  return {
    week: maak(WEEK),
    dag: maak(DAG),
  };
}

export { WEEK, DAG };
