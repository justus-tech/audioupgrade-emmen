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

/**
 * De levenslange garantie op het inbouwwerk.
 *
 * WAAROM DIT ER STAAT
 * Dit stond alleen in artikel 8 van de algemene voorwaarden en twee keer in
 * het privacybeleid. Nergens op een pagina waar iemand een prijs staat te
 * bekijken. Het is het sterkste argument dat Justus heeft en niemand anders
 * in deze branche doet het.
 *
 * LET OP DAT DIT PRECIES BLIJFT KLOPPEN
 * De garantie geldt op het inbouwwerk en de bekabeling die hij aanlegt — niet
 * op de apparatuur, daar geldt de fabrieksgarantie van Alpine of Mosconi. En
 * hij is persoonsgebonden: verkoop je de auto, dan vervalt hij. Dat staat zo
 * in de algemene voorwaarden en het moet hier hetzelfde zeggen. Een garantie
 * die op de verkooppagina ruimer klinkt dan in de voorwaarden is precies het
 * soort belofte waar je later ruzie over krijgt.
 */
export const LEVENSLANG = {
  kop: 'Levenslange garantie op ons inbouwwerk',
  kort: 'Levenslange garantie op ons inbouwwerk en onze bekabeling.',
  tekst:
    'Op alles wat wij monteren en aansluiten — het inbouwwerk zelf en de bekabeling die wij aanleggen — krijg je levenslange garantie, zolang de auto van jou blijft. Dat durven we te beloven omdat we solderen in plaats van knijpstekkers gebruiken: er zit niets in dat na drie jaar los gaat trillen. Voor de apparatuur zelf geldt gewoon de garantie van de fabrikant.',
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
 * Het bezwaar dat mensen het vaakst tegenhoudt: "ik kan mijn auto een dag
 * niet missen". Daar hebben we een antwoord op, en dat hoort op de homepage.
 *
 * LET OP wat hier NIET staat: wij halen geen auto's op. De klant brengt hem
 * zelf. Op de oude site stond wél dat we haalden en brachten; dat klopte niet
 * meer en is eruit. Alles hieronder is met Justus doorgenomen.
 */
export const ONTZORGEN = {
  kop: 'Je hoeft niet te wachten.',
  tekst:
    'Je brengt je auto naar de Charles Darwinstraat en wij gaan aan de slag. Blijft hij een dag staan, dan brengen we je gewoon thuis — tot vijftien kilometer rond Emmen. Aan het eind van de dag halen we je weer op, of kom je zelf langs. Kleinere klussen kunnen in overleg ook bij jou op de oprit.',
};

/**
 * Wie de klant tegenover zich krijgt.
 *
 * WAAROM DIT ER STAAT
 * Je vraagt iemand om zijn auto — vaak zijn duurste bezit na zijn huis — een
 * dag lang bij een vreemde achter te laten. Er zijn nog geen reviews die dat
 * makkelijker maken. Een gezicht en een verhaal doen dan het werk.
 *
 * WAT ER NIET STAAT, EN WAAROM NIET
 * Nergens "jarenlange ervaring in car audio". Het bedrijf bestaat drie jaar
 * en dat is kort; daar overheen praten valt op zodra iemand doorvraagt. Het
 * eerlijke verhaal is sterker: acht jaar geluid, een opleiding als audio
 * engineer, en auto's die er al waren voordat er een rijbewijs was. Dat is
 * precies de combinatie die de winkel om de hoek niet heeft.
 *
 * Alles hieronder komt uit Justus' eigen woorden (24 augustus 2026).
 */
export const OVER = {
  naam: 'Justus',
  rol: 'Eigenaar en audio engineer',
  kop: 'Wie je auto onder handen neemt',
  alineas: [
    'Ik sleutelde al aan auto-interieurs voordat ik mijn rijbewijs had. De auto stond op de oprit en ik was er dagelijks mee bezig: strippen, uit elkaar, weer in elkaar — net zolang tot ik er het maximale geluid uit had.',
    'Daarnaast heb ik het vak geleerd aan het conservatorium, als audio engineer. Microfoons, luidsprekers, sound design, mixen: sinds 2018 werk ik professioneel met geluid. Mijn speakers bouw ik zelf van hout, van kleine kastjes tot Jamaicaanse superscoopers van 24 inch.',
    'Die twee dingen komen in jouw auto samen. Ik stel niet af omdat het zo in een handleiding staat, maar omdat ik hoor wat er nog niet klopt. En dat is precies waarom ik dit doe: rijden hoort een feestje te zijn. Je moet ergens heen willen puur omdat de muziek onderweg zo goed staat.',
  ],
  feiten: [
    'Opgeleid audio engineer',
    'Sinds 2018 in het geluid',
    'Bouwt zijn eigen speakers',
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
  GARANTIE, LEVENSLANG, WERKWIJZE, VAKMANSCHAP, ONTZORGEN, OVER, CTA, STANDAARD_PAKKETTEN,
};
