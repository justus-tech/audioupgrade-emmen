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

/**
 * Twee argumenten die op de oude site stonden en die je nergens anders vindt
 * in deze branche. Ze horen op de homepage, want ze nemen precies de twee
 * bezwaren weg die mensen tegenhouden: "ik kan mijn auto niet missen" en
 * "ik weet niet of ik het verschil hoor".
 */
export const ONTZORGEN = {
  kop: 'Je tijd is kostbaar. Wij ontzorgen volledig.',
  tekst:
    'Je hebt wel iets beters te doen dan uren in een wachtruimte zitten. Wij bouwen het audiosysteem in op locatie, terwijl jij thuis of op kantoor gewoon doorwerkt. Liever halen en brengen? Ook goed. Wij halen je auto \'s ochtends op en zetten hem aan het eind van de dag volledig afgesteld en getuned weer voor de deur.',
};

export const DEMO = {
  kop: 'Eerst horen, dan pas beslissen.',
  tekst:
    'In onze VW T6-demobus hoor je het verschil tussen de pakketten met je eigen muziek. Vrijblijvend, en je weet meteen waar je je geld aan uitgeeft.',
  knop: 'Boek een luisterdemo',
};

/**
 * VERTROUWEN ZONDER RECENSIES.
 *
 * Zolang er nog geen Google-recensies zijn, is "wij hebben alleen tevreden
 * klanten" een zwakke zet: dat schrijft iedereen op zijn site en niemand
 * gelooft het, want de klant kan het niet nakijken.
 *
 * Wat wél werkt is het risico bij de klant weghalen. Elk punt hieronder is
 * iets wat hij kan controleren voordat hij betaalt, of iets wat hij kan
 * terugdraaien als het tegenvalt. Dat is sterker dan welk cijfer ook.
 *
 * De uitspraak over tevreden klanten staat er wél in, maar als opstapje naar
 * die beloftes en niet als bewijs op zichzelf.
 *
 * LET OP: dit zijn toezeggingen aan de klant. Justus moet ze alle vier
 * bevestigen voordat de site live gaat. Wat hier staat moet hij ook echt
 * waarmaken, anders werkt het tegen je.
 */
export const VERTROUWEN = {
  kop: 'Waarom je ons kunt vertrouwen',
  tekst:
    'Wij zijn een jong bedrijf, dus je vindt online nog weinig over ons. Wat we wel kunnen zeggen: tot nu toe is elke auto hier tevreden de deur uit gegaan. Dat willen we zo houden, en daarom hebben we het zo geregeld dat jij nooit voor een verrassing komt te staan.',
  punten: [
    {
      kop: 'Eerst horen, dan beslissen',
      tekst:
        'In onze demobus hoor je met je eigen muziek wat een pakket doet, voordat je ergens ja tegen zegt.',
    },
    {
      kop: 'Alles is terug te bouwen',
      tekst:
        'Wij knippen niets door en werken met pasklare kabelbomen. Bevalt het niet, dan gaat je auto terug naar origineel alsof er niets gebeurd is.',
    },
    {
      kop: 'Ook als het antwoord nee is',
      tekst:
        'Levert een upgrade bij jouw auto weinig op, dan zeggen we dat. Liever een klant die niets koopt dan een klant die spijt heeft.',
    },
    {
      kop: 'Eén aanspreekpunt',
      tekst:
        'Je hebt van het eerste bericht tot de oplevering met dezelfde persoon te maken. Geen balie, geen doorverbinden.',
    },
  ],
};

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

export default {
  GARANTIE, WERKWIJZE, VAKMANSCHAP, ONTZORGEN, DEMO, VERTROUWEN, CTA, STANDAARD_PAKKETTEN,
};
