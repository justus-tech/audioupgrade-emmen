/**
 * DE VASTE INFORMATIE — staat hier één keer, wordt op élke modelpagina geladen.
 *
 * Dit is het idee van Justus: alles wat voor elke auto hetzelfde is, staat op
 * één plek. Pas je hier een tekst aan, dan verandert die op alle modelpagina's
 * tegelijk. Alleen wat per auto verschilt staat in src/data/modellen/.
 *
 * Prijzen staan NIET hier maar in site.js (PACKAGES), zodat er ook daarvoor
 * maar één bron is.
 */

/** De belofte die op elke modelpagina onder de pakketten staat. */
export const GARANTIE = {
  kop: 'Je fabrieksgarantie blijft 100% intact',
  tekst:
    'Wij werken uitsluitend met Plug & Play-kabelbomen die op de bestaande stekkers worden aangesloten. Er wordt niets doorgeknipt en niets aan de originele bedrading veranderd. Alles is volledig terug te bouwen naar origineel — precies wat je nodig hebt om je garantie ongemoeid te laten.',
};

/** De drie stappen. Zelfde volgorde als op /werkwijze. */
export const WERKWIJZE = [
  {
    nummer: '01',
    kop: 'Stuur een foto van je dashboard',
    tekst:
      'Geen lange formulieren. Een WhatsApp-bericht met je automerk, bouwjaar en een foto van je huidige radio of dashboard is genoeg.',
  },
  {
    nummer: '02',
    kop: 'Eerlijk advies & offerte',
    tekst:
      'Binnen 24 uur krijg je een helder, vrijblijvend advies op maat met een transparante all-in prijs. Geen verrassingen achteraf.',
  },
  {
    nummer: '03',
    kop: 'De premium inbouw',
    tekst:
      'We plannen een datum. Je levert de auto \'s ochtends af en rijdt aan het eind van de dag weg met een systeem dat op jouw auto is afgestemd.',
  },
];

/** Waarom bij ons — de drie vakmanschapsargumenten. */
export const VAKMANSCHAP = [
  {
    kop: 'Massieve montage',
    tekst:
      'Hout (MDF) neemt vocht op, zet uit en gaat rotten. Wij gebruiken uitsluitend CNC-gefreesde, massieve kunststof of aluminium adapterringen. Waterbestendig en akoestisch dood.',
  },
  {
    kop: '100% gesoldeerd',
    tekst:
      'Wij haten knijpstekkers. Elke verbinding wordt vakkundig gesoldeerd, voorzien van krimpkous en afgewerkt met originele stoftape (TESA). 100% storingsvrij.',
  },
  {
    kop: 'Akoestische DSP-tuning',
    tekst:
      'Een dure speaker klinkt nergens naar zonder de juiste afstelling. Wij stemmen looptijden en frequenties exact af op de akoestiek van jouw specifieke auto.',
  },
];

/** De afsluitende oproep onderaan elke modelpagina. */
export const CTA = {
  tekst:
    'Geen lange formulieren. Stuur een foto van je dashboard via WhatsApp en ontvang binnen 24 uur een eerlijk advies met transparante all-in prijs.',
  knop: 'Stuur foto dashboard',
};

/**
 * Welke pakketten standaard onder een modelpagina komen. Een model kan hiervan
 * afwijken door zelf `packages` te zetten — bijvoorbeeld een Tesla, waar geen
 * CarPlay mogelijk is, of een bestelbus waar isolatie juist vooropstaat.
 */
export const STANDAARD_PAKKETTEN = [
  'carplay-upgrade',
  'akoestische-basis',
  'oem-plus-executive',
  'reference-edition',
];

export default { GARANTIE, WERKWIJZE, VAKMANSCHAP, CTA, STANDAARD_PAKKETTEN };
