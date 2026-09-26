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

/** De belofte, voor pagina's die geen specifieke auto in beeld hebben. */
export const GARANTIE = {
  kop: 'Je fabrieksgarantie blijft 100% intact',
  tekst:
    'Wij werken uitsluitend met Plug & Play-kabelbomen die op de bestaande stekkers worden aangesloten. Er wordt niets doorgeknipt en niets aan de originele bedrading veranderd. Alles is volledig terug te bouwen naar origineel — precies wat je nodig hebt om je garantie ongemoeid te laten.',
};

/**
 * Dezelfde belofte, maar dan over één bepaalde auto.
 *
 * WAAROM DIT BESTAAT
 * Op alle 150 modelpagina's stond exact dezelfde garantiealinea. Gemeten:
 * van dat hele blok was 1% eigen tekst. Dat is precies wat een zoekmachine
 * "dubbele inhoud" noemt, en het leest ook slapper — je bent op de pagina
 * over jóuw auto en krijgt een algemene mededeling.
 *
 * Nu staat er de naam van de auto in, en waar zijn kabelboom op wordt
 * aangesloten. Geen verzonnen techniek: dat wij op de bestaande stekkers
 * aansluiten geldt voor elk model, alleen de naam wisselt.
 *
 * `dealer` is de merknaam, zodat er "geen BMW-dealer" staat en niet
 * "geen dealer".
 */
export function garantieVoor(merk, model) {
  return {
    kop: `Je fabrieksgarantie op je ${model} blijft 100% intact`,
    /* Let op de naam in béíde zinnen. Niet om Google te plezieren, maar omdat
       elke zin die er zonder naam in staat, op alle 150 modelpagina's woord
       voor woord hetzelfde is. Meer dan twee keer moet je hem er niet in
       proppen: dan gaat het lezen als een zoekmachine-truc, en dat is het
       tegenovergestelde van wat we willen. */
    tekst:
      `In je ${merk} ${model} gaat geen enkele draad door de schaar. Wij sluiten aan op de stekkers ` +
      `die er al zitten, met een kabelboom die speciaal voor de ${model} gemaakt is, zodat de ` +
      `originele bedrading blijft zoals hij de fabriek verliet.`,
    naTekst:
      `Daardoor is alles terug te bouwen naar origineel — handig als je de ${model} ooit inruilt, ` +
      `en de reden dat geen enkele ${merk}-dealer je hierop kan aanspreken.`,
  };
}

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
      'Binnen 24 uur krijg je een helder, vrijblijvend advies op maat met een transparante all-inprijs. Geen verrassingen achteraf.',
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
      'Wij haten knijpstekkers. Elke verbinding wordt vakkundig gesoldeerd, voorzien van krimpkous en afgewerkt met originele stoftape (tesa). 100% storingsvrij.',
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
/**
 * EERST HOREN BIJ EEN KLANT DIE HET AL HEEFT.
 *
 * Het probleem van deze hele branche: niemand kan een geluidsinstallatie
 * beoordelen op papier. Een opname van car audio zegt niets — die hoor je
 * door je eigen speakers. Dus staat een klant voor de keuze tussen 995 en
 * 3.695 euro zonder dat hij het verschil ooit gehoord heeft, en dan kiest
 * hij het goedkoopste of hij stelt het uit.
 *
 * Dit is het antwoord, en het kost niets: er rijden al auto's rond met deze
 * pakketten erin. Vraag de eigenaar of er iemand mag komen luisteren.
 *
 * TWEE DINGEN OM AAN TE HOUDEN
 *   1. Vraag het altijd eerst aan die klant. Zijn naam, auto of woonplaats
 *      gaan nooit zonder toestemming naar een ander — dat is niet alleen de
 *      AVG, het is ook gewoon de afspraak.
 *   2. De tekst hieronder belooft dat je het vráágt, niet dat het altijd
 *      lukt. Beloof nooit een auto die er misschien niet is.
 */
export const LUISTEREN = {
  eyebrow: 'Eerst horen, dan pas beslissen',
  kop: 'Luister in een auto die er al mee rondrijdt',
  tekst:
    'Het verschil tussen de pakketten hoor je in tien minuten, en lees je nergens in terug. Zeg welk pakket je overweegt, dan vragen we een klant met precies dat pakket of je een keer mag komen luisteren. Neem je eigen muziek mee — dat is de enige eerlijke test.',
  knop: 'Vraag een luisterafspraak',
  /* Zonder aanhef: whatsappLink() zet er zelf "Hoi Justus," voor. */
  bericht: 'ik zou het graag eerst een keer willen horen. Ik denk aan dit pakket:',
};

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
  rol: 'Eigenaar / OEM+ Integration Specialist',
  kop: 'Wie je auto onder handen neemt',
  /**
   * De korte versie, voor de homepage.
   *
   * Het blok staat op twee plekken: halverwege de homepage en op /over-ons.
   * Daar drie keer dezelfde alinea's neerzetten is zonde van de ruimte op de
   * pagina waar bijna iedereen landt — en het geeft niemand een reden om door
   * te klikken.
   *
   * Waarom het op de homepage tóch blijft staan: er zijn nog geen reviews en
   * geen eigen werkfoto's. Dit gezicht is voorlopig het enige bewijs dat er
   * een vakman achter staat, en de homepage is de pagina die het meest wordt
   * gezien. Weghalen kost meer dan het oplevert.
   *
   * Deze twee zinnen moeten dus twee dingen doen: vertrouwen wekken én
   * nieuwsgierig maken naar de rest.
   */
  kort: [
    'Ik sleutelde al aan auto-interieurs voordat ik mijn rijbewijs had, en leerde het vak daarna aan het conservatorium — als audio engineer. Die twee dingen komen in jouw auto samen.',
    'Wat er in jouw auto komt, kies ik met mijn oren.',
  ],

  alineas: [
    'Ik sleutelde al aan auto-interieurs voordat ik mijn rijbewijs had. De auto stond op de oprit en ik was er dagelijks mee bezig: strippen, uit elkaar, weer in elkaar — net zo lang tot ik er het maximale geluid uit had.',
    'Daarnaast heb ik het vak geleerd aan het conservatorium, als audio engineer. Microfoons, luidsprekers, sound design, mixen: sinds 2018 werk ik professioneel met geluid. Mijn speakers bouw ik zelf van hout, van kleine kastjes tot Jamaicaanse superscoopers van 24 inch.',
    'Die twee dingen komen in jouw auto samen. Ik stel niet af omdat het zo in een handleiding staat, maar omdat ik hoor wat er nog niet klopt. En dat is precies waarom ik dit doe: rijden hoort een feestje te zijn. Je moet ergens heen willen puur omdat de muziek onderweg zo goed staat.',
  ],
  feiten: [
    'Opgeleid audio engineer',
    'Sinds 2018 in het geluid',
    'Bouwt zijn eigen speakers',
  ],

  /**
   * Het aanbod om gewoon mee te denken, ook zonder opdracht.
   *
   * Idee van Justus' broer (26 augustus 2026), en een goed idee. Twee redenen:
   *
   *   1. Het klopt met wie hij is. Iemand met een conservatoriumopleiding die
   *      zelf speakerkasten bouwt, weet meer van geluid dan alleen van auto's.
   *      Dat mag je laten zien.
   *   2. Het verlaagt de drempel enorm. Een appje sturen over "wat vind je van
   *      deze speakers" is oneindig veel makkelijker dan om een offerte van
   *      2.195 euro vragen. En wie eenmaal in gesprek is, komt terug.
   *
   * Let op de toon: dit is een uitnodiging, geen dienst met een prijskaartje.
   * Zodra het klinkt als "gratis advies!" wordt het een lokkertje, en dat is
   * precies het tegenovergestelde van wat het moet doen.
   */
  advies: {
    kop: 'Vraag gerust iets, ook zonder auto',
    alineas: [
      'Twijfel je over een setje speakers dat je op Marktplaats ziet staan? Wil je weten waarom je installatie thuis of in de garage niet klinkt zoals je hoopte? Ben je iets aan het bouwen en loop je vast?',
      'Stuur gewoon een appje. Ik denk graag mee over geluid, in de auto en daarbuiten. Daar hoeft geen opdracht achter te zitten en er komt geen rekening voor.',
    ],
  },
};

/** De afsluitende oproep, voor pagina's zonder specifieke auto in beeld. */
export const CTA = {
  tekst:
    'Geen lange formulieren. Stuur een foto van je dashboard via WhatsApp en ontvang binnen 24 uur een eerlijk advies met transparante all-inprijs.',
  knop: 'Stuur foto dashboard',
};

/**
 * Dezelfde oproep, maar over één bepaalde auto. Zelfde reden als bij
 * garantieVoor: dit stond 150 keer woord voor woord hetzelfde op de site.
 */
export const ctaVoor = (model) =>
  `Geen lange formulieren. Stuur een foto van het dashboard van je ${model} via WhatsApp, ` +
  `dan weet je binnen 24 uur wat er voor deze auto kan en wat het kost — met een all-inprijs, ` +
  `zonder verplichtingen.`;

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
  GARANTIE, garantieVoor, LEVENSLANG, WERKWIJZE, VAKMANSCHAP, ONTZORGEN, OVER,
  CTA, ctaVoor, STANDAARD_PAKKETTEN,
};
