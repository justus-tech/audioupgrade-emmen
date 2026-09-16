/**
 * DE VEELGESTELDE VRAGEN.
 *
 * WAAROM DEZE PAGINA ER IS
 * Drie redenen, en ze versterken elkaar:
 *
 *   1. Voor de klant. Dit zijn de vragen die Justus nu per WhatsApp
 *      beantwoordt. Eén keer goed opschrijven scheelt hem tijd en het haalt
 *      twijfel weg bij mensen die nog niet durven te appen.
 *   2. Voor Google. "Gaat mijn garantie eraan als ik CarPlay laat inbouwen"
 *      wordt letterlijk zo ingetypt. Een pagina met die vraag als kop wint
 *      die zoekopdracht van een verkooppagina die er omheen praat.
 *   3. Voor AI-assistenten. ChatGPT en Claude halen vraag-en-antwoordblokken
 *      er letterlijk uit en citeren ze. Losse verkooptekst niet.
 *
 * DE HARDE REGEL BIJ DIT BESTAND
 * Elk antwoord moet kloppen met de algemene voorwaarden en met de pakketten.
 * Wijzigt daar iets — een prijs, een termijn, een garantie — dan moet het
 * hier mee. Een antwoord dat ruimer klinkt dan de voorwaarden is precies het
 * soort belofte waar je later ruzie over krijgt.
 *
 * Achter elk antwoord staat waar het vandaan komt, zodat dat na te lopen is.
 */
import { SITE, PACKAGES, TIJDEN_KORT } from './site.js';
import { VANAF_JAAR } from './oldtimer.js';

const goedkoopste = PACKAGES.reduce(
  (laagste, p) => (p.bedrag && p.bedrag < laagste ? p.bedrag : laagste),
  Infinity
);

export const VRAGEN = [
  {
    vraag: 'Gaat mijn fabrieksgarantie eraan?',
    antwoord:
      'Nee. Wij werken uitsluitend met pasklare kabelbomen die op de bestaande stekkers worden aangesloten. Er wordt niets doorgeknipt en er verandert niets aan de originele bedrading, dus er is niets waar een dealer je op kan aanspreken.',
  },
  {
    vraag: 'Kan mijn auto later weer helemaal origineel worden gemaakt?',
    antwoord:
      'Ja. Omdat er niets is doorgeknipt, is alles volledig terug te bouwen naar de fabrieksstaat. Handig als je de auto ooit verkoopt of inruilt.',
  },
  {
    vraag: 'Hoe lang ben ik mijn auto kwijt?',
    antwoord:
      'Dat hangt van het pakket af. Een draadloze CarPlay-upgrade is klaar in ongeveer twee uur; bij de grotere pakketten staat je auto een werkdag bij ons. Blijft hij staan, dan brengen we je thuis binnen vijftien kilometer rond Emmen en halen we je aan het eind van de dag weer op.',
  },
  {
    vraag: 'Past dit ook in mijn auto?',
    antwoord:
      'Vrijwel zeker. Vul je kenteken in op de website en je ziet meteen wat er voor jouw auto mogelijk is. Weet je het liever zeker, stuur dan een foto van je dashboard via WhatsApp — dan krijg je binnen 24 uur antwoord.',
  },
  {
    vraag: 'Blijft mijn originele scherm werken?',
    antwoord:
      'Ja, en dat is juist het idee. CarPlay en Android Auto komen in je eigen fabrieksscherm te staan, en je bedient ze met de knoppen op je stuurwiel of je touchpad. Je boordcomputer, achteruitrijcamera en parkeersensoren blijven gewoon werken. Heeft je auto geen scherm, dan kan er een nieuw display in.',
  },
  {
    vraag: 'Is die CarPlay echt draadloos?',
    antwoord:
      'Ja. Je telefoon verbindt vanzelf zodra je instapt en mag in je zak of tas blijven. Dat is precies waar de goedkope kastjes het laten afweten: die willen alsnog een kabel.',
  },
  {
    vraag: 'Zie je aan de buitenkant dat er iets is gebeurd?',
    antwoord:
      'Nee. Alles gaat weg achter je originele panelen. Geen zichtbare kastjes, geen losse kabels, geen lichtjes. Wie instapt ziet een standaardauto, tot je hem aanzet.',
  },
  {
    vraag: 'Wat kost het?',
    antwoord: `De pakketten beginnen bij € ${goedkoopste},- en dat is een all-in prijs: inclusief btw en montage. Er komen achteraf geen montage- of voorrijkosten bij. Wat jouw auto precies kost, hoor je in de offerte vooraf.`,
  },
  {
    vraag: 'Krijg ik garantie op het werk zelf?',
    antwoord:
      'Ja, levenslange garantie op het inbouwwerk en de bekabeling die wij aanleggen, zolang de auto van jou blijft. Dat kunnen we beloven omdat wij solderen in plaats van knijpstekkers gebruiken. Op de apparatuur zelf geldt de garantie van de fabrikant.',
  },
  {
    vraag: 'Ik weet niets van audio. Kan ik dan wel langskomen?',
    antwoord:
      'Juist dan. Je hoeft geen merken of vermogens te kennen. Stuur een foto van je dashboard en vertel wat je mist — te weinig bas, stemmen die wegvallen, of gewoon dat het blikkerig klinkt. Wij vertalen dat naar wat je auto nodig heeft.',
  },
  {
    vraag: 'Doen jullie ook klassiekers en youngtimers?',
    antwoord: `Ja, vanaf bouwjaar ${VANAF_JAAR}. Daar werken we anders: geen vaste pakketten en je dashboard blijft zoals het was. De prijs bespreken we vooraf, want elke klassieker vraagt om iets anders.`,
  },
  {
    vraag: 'Kunnen jullie ook bij mij op locatie werken?',
    antwoord:
      'Kleinere klussen kunnen in overleg bij jou op de oprit. Voor de grotere pakketten breng je de auto naar de werkplaats: DSP-tuning en demping vragen om rust, gereedschap en meetapparatuur die niet in een bus passen.',
  },
  {
    vraag: 'Hoe en wanneer betaal ik?',
    antwoord:
      'Bij oplevering, per pin of betaalverzoek. Moeten we voertuigspecifieke onderdelen bestellen, dan kunnen we vooraf een aanbetaling vragen tot de helft van de materiaalkosten.',
  },
  {
    vraag: 'Kan ik mijn afspraak nog verzetten?',
    antwoord:
      'Kosteloos tot veertien dagen voor de inbouwdatum. Daarbinnen brengen we een deel van het offertebedrag in rekening, omdat de tijd is gereserveerd en de onderdelen al besteld zijn. Laat het dus vooral weten als er iets tussenkomt — er valt altijd te praten.',
  },
  {
    vraag: 'Waar zitten jullie?',
    antwoord: `In Emmen, ${SITE.street}. We zijn open ${TIJDEN_KORT}, en op zondag gesloten. Langskomen gaat op afspraak, zodat je niet voor een dichte deur staat en we de tijd voor je auto vrij kunnen houden.`,
  },
];

export default VRAGEN;
