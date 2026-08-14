/**
 * Suzuki — 5 modellen.
 *
 * DE VOLGORDE IN DIT BESTAND TELT. De kenteken-check pakt de eerste
 * treffer, dus een specifiek model hoort bóven een algemener model te
 * staan: "Range Rover Sport" vóór "Range Rover".
 *
 * Gebruik geen \b direct achter een cijfer: tussen de 0 en de I van
 * "320I" ligt geen woordgrens. Gebruik daar (?!\d).
 */

export default [

  // -------------------------------------------------------- SUZUKI SWIFT
  {
    slug: 'suzuki-swift',
    brand: 'Suzuki',
    model: 'Swift',
    generaties: 'Swift III, IV en V',
    matchers: { merk: 'SUZUKI', model: /SWIFT/ },
    title: 'Suzuki Swift audio upgrade | Audio Upgrade Emmen',
    description:
      'Beter geluid in je Suzuki Swift. Premium speakers, akoestische deurdemping en minder rolgeluid. All-in prijs, garantie behouden.',
    intro:
      'De Swift is licht, wendbaar en zuinig, en dat gewicht is er overal uit gehaald. Dat merk je aan het geluid: er is weinig massa om trillingen tegen te houden.',
    problems: [
      'Het lichte plaatwerk trilt makkelijk mee, waardoor bas eerder rammelt dan draagt.',
      'Weinig isolatie betekent veel rolgeluid, precies in het gebied waar stemmen zitten.',
      'De basisinstallatie mist een aparte tweeter, waardoor het geluidsbeeld laag blijft.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Swift is demping het halve werk, juist omdát de auto zo licht is gebouwd. Het deurblik stilleggen levert direct hoorbaar meer bas op zonder extra vermogen. Daarna zetten we er een componentenset in met een losse tweeter in het bovenste deel van de deur, zodat het geluid vóór je komt te zitten in plaats van bij je voeten.',
    },
    carplay: {
      possible: true,
      text: 'Op Swifts met het multimediascherm is CarPlay vaak al aanwezig of toe te voegen. Bij de kale uitvoeringen kijken we per auto wat er kan.',
    },
    packages: ['akoestische-basis', 'akoestische-isolatie', 'oem-plus-executive'],
    faq: [
      {
        q: 'Waarom rammelt mijn deur bij bas?',
        a: 'Omdat er weinig massa in het plaatwerk zit. Dat is goed voor het verbruik maar slecht voor geluid. Demping voegt die massa toe op precies de plekken waar het meetrilt.',
      },
      {
        q: 'Wat levert het meest op als ik één ding kies?',
        a: 'De Akoestische Basis: premium speakers voorin plus deurdemping, € 995 all-in. Bij een lichte auto als deze is dat de grootste sprong per euro.',
      },
      {
        q: 'Hoe lang duurt de inbouw?',
        a: 'Voor de meeste Swift-opdrachten één werkdag. Je brengt de auto \'s ochtends en rijdt er aan het eind van de dag mee weg.',
      },
    ],
  },

  // --------------------------------------------------------- SUZUKI ALTO
  {
    slug: 'suzuki-alto',
    brand: 'Suzuki',
    model: 'Alto',
    generaties: 'Alto zesde en zevende generatie',
    matchers: { merk: 'SUZUKI', model: /ALTO/ },
    title: 'Suzuki Alto audio upgrade | Audio Upgrade Emmen',
    description:
      'Beter geluid in je Suzuki Alto. Speakers, akoestische deurdemping en minder rolgeluid, met all-in prijs.',
    intro:
      'De Alto is zo licht en zo eenvoudig mogelijk gebouwd. Dat maakt hem zuinig, en het maakt het geluid het eerste onderdeel waar je iets aan wilt doen.',
    problems: [
      'Twee of vier eenvoudige speakers zonder aparte tweeter: alles komt uit je knieën.',
      'Zeer licht plaatwerk dat op elke basnoot hoorbaar meetrilt.',
      'Vrijwel geen isolatie, waardoor rolgeluid op de snelweg alles overstemt.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Alto is demping veruit het belangrijkste. Het lichte blik stilleggen levert direct hoorbaar meer bas op zonder extra vermogen, en maakt de auto merkbaar rustiger op de snelweg. Daarna zetten we er een componentenset in met een losse tweeter zodat het geluid vóór je komt te zitten. Voor een bescheiden bedrag is dat een compleet andere auto.',
    },
    carplay: {
      possible: false,
      text: 'De meeste Alto\'s hebben geen scherm in het dashboard waar CarPlay in past. Wil je toch draadloos muziek streamen, dan kan dat met een discrete oplossing achter het dashboard; vraag ernaar via WhatsApp.',
    },
    packages: ['akoestische-isolatie', 'akoestische-basis'],
    faq: [
      {
        q: 'Wat levert het meest op als ik één ding kies?',
        a: 'De deuren dempen. Bij deze auto is het lichte blik de grootste boosdoener, en dat stilleggen kost geen extra vermogen.',
      },
      {
        q: 'Is het niet zonde om in zo\'n auto te investeren?',
        a: 'Een kleine cabine vraagt weinig vermogen en je zit dicht bij de speakers, dus je krijgt veel terug voor een bescheiden bedrag. Blijf je er nog jaren in rijden, dan is het goed besteed.',
      },
      {
        q: 'Blijft mijn fabrieksgarantie geldig?',
        a: 'Ja. Wij werken met Plug & Play-kabelbomen op de bestaande stekkers en knippen geen originele bedrading door.',
      },
    ],
  },

  // -------------------------------------------------------- SUZUKI VITARA
  {
    slug: 'suzuki-vitara',
    brand: 'Suzuki',
    model: 'Vitara',
    generaties: 'Grand Vitara en Vitara vanaf 2015',
    matchers: { merk: 'SUZUKI', model: /VITARA/ },
    title: 'Suzuki Vitara audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer body in je Suzuki Vitara. Premium speakers, demping van deuren en achterklep, DSP-afstemming.',
    intro:
      'De Vitara is de compacte SUV die het van zijn eenvoud moet hebben: licht, praktisch en scherp geprijsd. Dat lichte gewicht werkt tegen het geluid.',
    problems: [
      'Het lichte plaatwerk trilt makkelijk mee, waardoor bas eerder rammelt dan draagt.',
      'De hogere zitpositie legt het geluidsbeeld laag, onder je oorhoogte.',
      'Weinig isolatie betekent veel rolgeluid, precies in het gebied waar stemmen zitten.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Vitara is demping het halve werk, juist omdát de auto zo licht is gebouwd. Het deurblik en de klep stilleggen levert direct meer bas op zonder extra vermogen. Daarna zetten we er een componentenset in en tillen we met tijdcorrectie het geluidsbeeld naar ooghoogte.',
    },
    carplay: {
      possible: true,
      text: 'Op de meeste Vitara-uitvoeringen met scherm is CarPlay al aanwezig of toe te voegen.',
    },
    packages: ['carplay-upgrade', 'akoestische-basis', 'akoestische-isolatie'],
    faq: [
      {
        q: 'Waarom rammelt mijn deur bij bas?',
        a: 'Omdat er weinig massa in het plaatwerk zit. Dat is goed voor het verbruik maar slecht voor geluid. Demping voegt die massa toe op de plekken waar het meetrilt.',
      },
      {
        q: 'Wat levert het meest op?',
        a: 'De Akoestische Basis: premium speakers voorin plus deurdemping, € 995 all-in.',
      },
      {
        q: 'Verlies ik bagageruimte?',
        a: 'Nee. Wij werken met compacte subwoofers die onder de stoel of in de reservewielbak verdwijnen.',
      },
    ],
  },

  // --------------------------------------------------------- SUZUKI IGNIS
  {
    slug: 'suzuki-ignis',
    brand: 'Suzuki',
    model: 'Ignis',
    generaties: 'Ignis vanaf 2016',
    matchers: { merk: 'SUZUKI', model: /IGNIS/ },
    title: 'Suzuki Ignis audio upgrade | Audio Upgrade Emmen',
    description:
      'Beter geluid in je Suzuki Ignis. Speakers, akoestische deurdemping en minder rolgeluid, met all-in prijs.',
    intro:
      'De Ignis is klein, hoog en eigenzinnig vormgegeven. Die rechte, hoge vormen maken hem akoestisch levendiger dan comfortabel is.',
    problems: [
      'De rechte, hoge panelen resoneren makkelijk mee en geven een holle nagalm bij lage tonen.',
      'Zeer licht plaatwerk dat op elke basnoot meetrilt.',
      'Weinig isolatie, waardoor rolgeluid op de snelweg alles overstemt.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Ignis haalt demping de holle nagalm weg die je aanzag voor bas, en maakt hij de auto meteen rustiger. Daarna komt er een componentenset in met een losse tweeter, zodat het geluid vóór je komt te zitten. Door de kleine cabine heb je weinig vermogen nodig voor een groot resultaat.',
    },
    carplay: {
      possible: true,
      text: 'Op de meeste Ignis-uitvoeringen met scherm is CarPlay al aanwezig of toe te voegen.',
    },
    packages: ['akoestische-basis', 'akoestische-isolatie', 'carplay-upgrade'],
    faq: [
      {
        q: 'Ik hoor een holle dreun. Wat is dat?',
        a: 'De rechte, vlakke panelen die meetrillen. Het klinkt als bas maar het is resonantie, en het maskeert de echte lage tonen.',
      },
      {
        q: 'Wat levert het meest op?',
        a: 'De Akoestische Basis: premium speakers voorin plus deurdemping, € 995 all-in.',
      },
      {
        q: 'Blijft mijn fabrieksgarantie geldig?',
        a: 'Ja. Plug & Play-kabelbomen op de bestaande stekkers, niets doorgeknipt.',
      },
    ],
  },

  // ----------------------------------------------------------- SUZUKI SX4
  {
    slug: 'suzuki-sx4',
    brand: 'Suzuki',
    model: 'SX4',
    generaties: 'SX4 en SX4 S-Cross',
    matchers: { merk: 'SUZUKI', model: /SX-?4/ },
    title: 'Suzuki SX4 audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer body in je Suzuki SX4 of S-Cross. Premium speakers, deurdemping en DSP-afstemming.',
    intro:
      'De SX4 is de praktische crossover van Suzuki: hoger dan een hatchback, lichter dan een echte SUV. Dat lichte gewicht werkt tegen het geluid.',
    problems: [
      'Het lichte plaatwerk trilt makkelijk mee, waardoor bas eerder rammelt dan draagt.',
      'De hogere zitpositie legt het geluidsbeeld laag, onder je oorhoogte.',
      'Weinig isolatie betekent veel rolgeluid, precies in het gebied waar stemmen zitten.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een SX4 is demping het halve werk, juist omdát de auto zo licht is gebouwd. Het deurblik en de klep stilleggen levert direct meer bas op zonder extra vermogen. Daarna zetten we er een componentenset in en tillen we met tijdcorrectie het geluidsbeeld naar ooghoogte.',
    },
    carplay: {
      possible: true,
      text: 'Op de S-Cross met multimediascherm is CarPlay meestal al aanwezig of toe te voegen. Bij de oudere SX4 zonder scherm is dat niet mogelijk.',
    },
    packages: ['akoestische-basis', 'akoestische-isolatie', 'oem-plus-executive'],
    faq: [
      {
        q: 'Waarom rammelt mijn deur bij bas?',
        a: 'Omdat er weinig massa in het plaatwerk zit. Demping voegt die massa toe op precies de plekken waar het meetrilt.',
      },
      {
        q: 'Wat levert het meest op?',
        a: 'De Akoestische Basis: premium speakers voorin plus deurdemping, € 995 all-in.',
      },
      {
        q: 'Verlies ik bagageruimte?',
        a: 'Nee. Wij werken met compacte subwoofers die onder de stoel of in de reservewielbak verdwijnen.',
      },
    ],
  },
];
