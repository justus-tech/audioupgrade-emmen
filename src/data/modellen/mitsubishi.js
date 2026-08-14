/**
 * Mitsubishi — 3 modellen.
 *
 * DE VOLGORDE IN DIT BESTAND TELT. De kenteken-check pakt de eerste
 * treffer, dus een specifiek model hoort bóven een algemener model te
 * staan: "Range Rover Sport" vóór "Range Rover".
 *
 * Gebruik geen \b direct achter een cijfer: tussen de 0 en de I van
 * "320I" ligt geen woordgrens. Gebruik daar (?!\d).
 */

export default [
  // ------------------------------------------------- MITSUBISHI OUTLANDER
  {
    slug: 'mitsubishi-outlander',
    brand: 'Mitsubishi',
    model: 'Outlander',
    generaties: 'Outlander II, III en PHEV',
    matchers: { merk: 'MITSUBISHI', model: /OUTLANDER/ },
    title: 'Mitsubishi Outlander audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer body in je Mitsubishi Outlander. Premium speakers, demping van deuren en achterklep, DSP-afstemming.',
    intro:
      'De Outlander PHEV was jarenlang de meest verkochte stekkerauto van Nederland. Juist die elektrische aandrijving legt bloot wat het audiosysteem laat liggen.',
    problems: [
      'Bij de PHEV rijd je vaak volledig elektrisch, waardoor het rolgeluid het luidste geluid in de auto wordt.',
      'Het cabinevolume is fors en vraagt meer vermogen dan de basisinstallatie geeft.',
      'De grote achterklep en de bagageruimtepanelen resoneren hoorbaar mee.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Een stekkerauto is een dankbare klant voor demping: zonder motorgeluid hoor je alles wat je stiller maakt meteen terug. Wij dempen de deuren en de klep, zetten er een DSP-versterker achter voor het vermogen dat het volume vraagt, en tillen met tijdcorrectie het geluidsbeeld naar ooghoogte.',
    },
    carplay: {
      possible: true,
      text: 'Op de meeste Outlanders vanaf 2016 met SDA-scherm zit CarPlay al af fabriek. Bij oudere modellen bekijken we per auto wat er kan.',
    },
    packages: ['carplay-upgrade', 'akoestische-basis', 'oem-plus-executive'],
    faq: [
      {
        q: 'Ik rij vooral elektrisch. Merk ik meer verschil?',
        a: 'Ja. Zonder verbrandingsmotor hoor je het rolgeluid en elke resonantie veel duidelijker, dus demping levert extra veel op — ook als je de muziek uit laat.',
      },
      {
        q: 'Kost een audiosysteem rijbereik?',
        a: 'Verwaarloosbaar. Bij normaal luisteren verbruikt het een fractie van wat de aandrijving vraagt.',
      },
      {
        q: 'Verlies ik laadruimte?',
        a: 'Nee. Wij werken met compacte subwoofers die onder de stoel of in de zijwand verdwijnen.',
      },
    ],
  },

  // ------------------------------------------------ MITSUBISHI SPACE STAR
  {
    slug: 'mitsubishi-space-star',
    brand: 'Mitsubishi',
    model: 'Space Star',
    generaties: 'Space Star vanaf 2013',
    matchers: { merk: 'MITSUBISHI', model: /SPACE ?STAR/ },
    title: 'Mitsubishi Space Star audio upgrade | Audio Upgrade Emmen',
    description:
      'Beter geluid in je Mitsubishi Space Star. Speakers, akoestische deurdemping en minder rolgeluid.',
    intro:
      'De Space Star is een van de goedkoopste nieuwe auto\'s van Nederland en daar is hij eerlijk over. Op audio is stevig bezuinigd, en dat maakt de sprong hier juist zo groot.',
    problems: [
      'Twee of vier eenvoudige speakers zonder aparte tweeter: alles komt uit je knieën.',
      'Zeer licht plaatwerk dat op elke basnoot hoorbaar meetrilt.',
      'Nauwelijks isolatie, waardoor rolgeluid op de snelweg alles overstemt.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Space Star is demping de belangrijkste stap. Het lichte blik stilleggen levert direct hoorbaar meer bas op zonder extra vermogen, en maakt de auto merkbaar rustiger. Daarna zetten we er een componentenset in met een losse tweeter zodat het geluid vóór je komt te zitten.',
    },
    carplay: {
      possible: true,
      text: 'Heeft jouw Space Star het multimediascherm, dan is CarPlay meestal toe te voegen. Bij de kale uitvoeringen zonder scherm is dat niet mogelijk.',
    },
    packages: ['akoestische-isolatie', 'akoestische-basis'],
    faq: [
      {
        q: 'Wat levert het meest op als ik één ding kies?',
        a: 'De deuren dempen. Bij deze auto is het lichte blik de grootste boosdoener, en dat stilleggen kost geen extra vermogen.',
      },
      {
        q: 'Is het de investering waard bij zo\'n auto?',
        a: 'Juist omdat er af fabriek weinig in zit, is het verschil hier groter dan bij een auto die al een fatsoenlijk systeem heeft. Blijf je er nog jaren in rijden, dan is het goed besteed.',
      },
      {
        q: 'Blijft mijn fabrieksgarantie geldig?',
        a: 'Ja. Plug & Play-kabelbomen op de bestaande stekkers, niets doorgeknipt.',
      },
    ],
  },

  // ---------------------------------------------------- MITSUBISHI COLT
  {
    slug: 'mitsubishi-colt',
    brand: 'Mitsubishi',
    model: 'Colt',
    generaties: 'Colt Z30 en de nieuwe Colt vanaf 2023',
    matchers: { merk: 'MITSUBISHI', model: /COLT/ },
    title: 'Mitsubishi Colt audio upgrade | Audio Upgrade Emmen',
    description:
      'Beter geluid in je Mitsubishi Colt. Speakers, akoestische deurdemping en minder rolgeluid.',
    intro:
      'De Colt is jarenlang een populaire, eenvoudige stadsauto geweest. Veel exemplaren zijn inmiddels op leeftijd, en dat hoor je het eerst aan de speakers.',
    problems: [
      'Bij de oudere Colt zijn de originele speakerconussen verhard of vergaan: dunne bas zonder dat er iets kapot is.',
      'Licht deurblik dat op elke basnoot hoorbaar meetrilt.',
      'Weinig isolatie, waardoor rolgeluid op de snelweg de muziek overstemt.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een oudere Colt vervangen we de vergane speakers en dempen we de deuren, na controle van het plaatwerk. De nieuwe Colt vanaf 2023 is technisch een Renault Clio; die pakken we op dezelfde manier aan als een Clio. Meld even welk bouwjaar je hebt, dan weten we welke aanpak past.',
    },
    carplay: {
      possible: true,
      text: 'De nieuwe Colt heeft CarPlay af fabriek. Bij de oudere Colt is er meestal geen scherm waar het in past; een foto van je dashboard geeft uitsluitsel.',
    },
    packages: ['akoestische-basis', 'akoestische-isolatie'],
    faq: [
      {
        q: 'Mijn bas is verdwenen maar de speakers werken nog. Hoe kan dat?',
        a: 'De conus of de schuimrand is verhard of gescheurd. De speaker maakt nog geluid maar verliest zijn lage tonen. Zeer gebruikelijk bij auto\'s van deze leeftijd.',
      },
      {
        q: 'Ik heb de nieuwe Colt van 2023. Is dat anders?',
        a: 'Ja. Die is technisch een Renault Clio, met hetzelfde scherm en dezelfde deuropbouw. Wij pakken hem dan ook zo aan.',
      },
      {
        q: 'Is mijn oude Colt het nog waard?',
        a: 'Blijf je er nog jaren in rijden, dan zeker. Wij zeggen eerlijk wanneer wij vinden dat de investering niet in verhouding staat.',
      },
    ],
  },
];
