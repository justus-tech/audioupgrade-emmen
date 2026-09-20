/**
 * DE NAAM VAN DE APP — één bron van waarheid.
 *
 * De app heet Headroom. Dat is een term uit de audio: de ruimte die je
 * overhoudt voordat het signaal vervormt. En het is precies wat deze app
 * voor Justus bewaakt op een offerte — de ruimte die hij overhoudt.
 *
 * Hij heeft eerder Werkbak en Deck geheten. Die oude adressen sturen door
 * naar het nieuwe; zie src/components/OudAdres.astro.
 *
 * WAAROM DIT BESTAND
 * De naam stond op zeven plekken: de titel, de balk bovenin, het icoon op je
 * telefoon, het app-bestand, de melding bij het inlezen. Bij de tweede
 * naamswijziging bleef er eentje staan. Nu staat hij hier, en verder nergens.
 *
 * LET OP: `opslagSleutel` is NIET de naam van de app en mag nooit meeveranderen.
 * Daaronder staat alles wat Justus op zijn telefoon heeft — zijn onderdelen,
 * zijn autodossiers, zijn offertes. Wijzig je hem, dan kijkt de app op een
 * lege plek en is het weg.
 */
export const APP = {
  naam: 'Headroom',
  pad: '/headroom',
  /* Wat er onder het icoon past: twaalf tekens is het maximum voordat
     Android hem afkapt met drie puntjes. */
  kortenaam: 'Headroom',
  omschrijving: 'Offertes, werkbonnen en facturen vanaf het kenteken.',
  /* NIET HERNOEMEN — zie de waarschuwing hierboven. */
  opslagSleutel: 'aue-werkbak-v1',
};

/**
 * DE TABBLADEN.
 *
 * Elk tabblad heeft een eigen adres: /headroom?tab=agenda. Daarmee kun je er
 * vanaf je beginscherm rechtstreeks in springen, en werkt de terugknop van je
 * telefoon zoals je verwacht.
 *
 * Ze staan ook in het app-bestand als snelkoppeling. Houd je op Android het
 * icoon van Headroom even ingedrukt, dan klapt dit lijstje open en tik je
 * meteen op Agenda.
 */
export const TABBLADEN = [
  { id: 'offerte', naam: 'Offerte', wat: 'Een nieuwe offerte maken' },
  { id: 'agenda', naam: 'Agenda', wat: 'Wat er aankomt en wanneer je moet bestellen' },
  { id: 'rapport', naam: 'Rapport', wat: 'Hoe je draait en wat er nog moet binnenkomen' },
  { id: 'catalogus', naam: 'Onderdelen', wat: 'Je leveranciersprijzen' },
  { id: 'autos', naam: "Auto's", wat: 'Wat je per model hebt nagemeten' },
  { id: 'instellingen', naam: 'Instellingen', wat: 'Uurtarief, marge en rekeningnummer' },
];

export default APP;
