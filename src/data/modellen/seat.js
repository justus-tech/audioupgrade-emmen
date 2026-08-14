/**
 * Seat — 3 modellen.
 *
 * DE VOLGORDE IN DIT BESTAND TELT. De kenteken-check pakt de eerste
 * treffer, dus een specifiek model hoort bóven een algemener model te
 * staan: "Range Rover Sport" vóór "Range Rover".
 *
 * Gebruik geen \b direct achter een cijfer: tussen de 0 en de I van
 * "320I" ligt geen woordgrens. Gebruik daar (?!\d).
 */

export default [

  // ---------------------------------------------------------- SEAT IBIZA
  {
    slug: 'seat-ibiza',
    brand: 'Seat',
    model: 'Ibiza',
    generaties: '6J, 6P en KJ',
    matchers: { merk: 'SEAT', model: /IBIZA/ },
    title: 'Seat Ibiza audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer body in je Seat Ibiza. Premium speakers, deurdemping en DSP-afstemming, met behoud van je scherm en fabrieksgarantie.',
    intro:
      'De Ibiza deelt zijn techniek met de VW Polo, maar wordt sportiever aangekleed en jonger verkocht. De audio is precies hetzelfde bezuinigde verhaal.',
    problems: [
      'Geen aparte tweeter op veel uitvoeringen: het stereobeeld zit laag bij je voeten in plaats van voor je.',
      'De deuren van het platform zijn holle bakken met open gaten, waardoor de achterkant van de speaker de bas grotendeels opheft.',
      'Weinig isolatie betekent veel rolgeluid, precies in het gebied waar stemmen zitten.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Ibiza dempen we het buitenblik, sluiten we de gaten in het binnenblik af en maken we van die holle deur een fatsoenlijke behuizing. Daarna heeft een componentenset met losse tweeter pas echt zin: die tweeter komt in de spiegeldriehoek, waardoor het geluidsbeeld ineens vóór je zit. Omdat de cabine klein is, haal je met bescheiden vermogen al veel resultaat.',
    },
    carplay: {
      possible: true,
      text: 'Op de meeste Ibiza-uitvoeringen met scherm is CarPlay al aanwezig of eenvoudig toe te voegen, met behoud van de originele bediening.',
    },
    packages: ['carplay-upgrade', 'akoestische-basis', 'oem-plus-executive'],
    faq: [
      {
        q: 'Ik heb een VW Polo gehad. Is dit dezelfde klus?',
        a: 'Grotendeels wel. Ibiza en Polo delen het platform en de deuropbouw, dus de aanpak is vergelijkbaar. De afwerking van het interieur verschilt, en daar stemmen wij de plaatsing op af.',
      },
      {
        q: 'Passen er grotere speakers in de deur?',
        a: 'Wij gebruiken CNC-gefreesde adapterringen die op de originele bevestigingspunten passen, zonder boren of zagen. Het deurpaneel gaat er daarna weer strak op.',
      },
      {
        q: 'Wat kost een upgrade ongeveer?',
        a: 'De Akoestische Basis ligt op € 995 all-in, inclusief montage en btw. Wil je er een DSP en subwoofer bij, dan kom je op The OEM+ Executive van € 2.195.',
      },
    ],
  },

  // ------------------------------------------------------------ SEAT LEON
  {
    slug: 'seat-leon',
    brand: 'Seat',
    model: 'Leon',
    generaties: '1P, 5F en KL, ook Sportstourer',
    matchers: { merk: 'SEAT', model: /LEON/ },
    title: 'Seat Leon audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer diepgang in je Seat Leon. Premium speakers, deurdemping, DSP-afstemming en draadloos CarPlay.',
    intro:
      'De Leon deelt zijn techniek met de VW Golf maar wordt sportiever verkocht. De audio is precies hetzelfde bezuinigde verhaal: geen aparte versterker, ongedempte deuren.',
    problems: [
      'Geen aparte versterker: het vermogen komt uit het kleine eindtrapje in de radio.',
      'De deuren van het MQB-platform zijn holle bakken met open gaten, waardoor de bas grotendeels wordt opgeheven.',
      'Bij de Sportstourer slikt de laadruimte lage tonen weg en resoneert de achterklep mee.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Leon zit de grootste winst in de deur: dempen, de gaten afsluiten en er een fatsoenlijke behuizing van maken. Daarna klinkt dezelfde speaker al hoorbaar voller. Wil je meer, dan zetten we er een DSP-versterker achter die de fabrieksafstemming corrigeert en het geluidsbeeld met tijdcorrectie voor je op het dashboard zet.',
    },
    carplay: {
      possible: true,
      text: 'Draadloos CarPlay en Android Auto in het originele scherm, met behoud van de originele knoppen en stuurbediening.',
    },
    packages: ['carplay-upgrade', 'akoestische-basis', 'oem-plus-executive', 'reference-edition'],
    faq: [
      {
        q: 'Ik heb eerder een Golf gehad. Is dit dezelfde klus?',
        a: 'Grotendeels wel. Leon en Golf delen het platform en de deuropbouw. De afwerking van het interieur verschilt, en daar stemmen wij de plaatsing op af.',
      },
      {
        q: 'Ik heb het Beats-systeem. Heeft een upgrade dan nog zin?',
        a: 'Ja, gerichter. Beats geeft je meer bas maar laat de deuren ongedempt en de afstemming ongewijzigd. Wij voegen demping en DSP-controle toe.',
      },
      {
        q: 'Ik heb de Sportstourer. Kost dat extra?',
        a: 'Als je de laadruimte mee wilt dempen wel. Daar zit bij een stationwagen wel de meeste winst.',
      },
    ],
  },

  // ------------------------------------------------------------ SEAT MII
  {
    slug: 'seat-mii',
    brand: 'Seat',
    model: 'Mii',
    generaties: 'Mii en Mii electric',
    matchers: { merk: 'SEAT', model: /\bMII\b/ },
    title: 'Seat Mii audio upgrade | Audio Upgrade Emmen',
    description:
      'Beter geluid in je Seat Mii. Speakers, akoestische deurdemping en minder rolgeluid, met all-in prijs.',
    intro:
      'De Mii is samen met de VW Up! en de Škoda Citigo ontwikkeld: dezelfde auto, drie badges. Dat betekent ook dezelfde bezuiniging op geluid.',
    problems: [
      'Vaak maar twee of vier speakers zonder aparte tweeter, dus alles komt uit je knieën.',
      'Het deurblik is dun en licht en gaat op elke basnoot hoorbaar meetrillen.',
      'Weinig isolatie, waardoor rolgeluid op de snelweg de muziek overstemt.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Mii levert demping direct hoorbaar meer bas op zonder dat er één watt bij komt. Daarna zetten we er een componentenset in met een losse tweeter, zodat het geluid vóór je komt te zitten. Rijd je de Mii electric, dan levert de demping dubbel op omdat er geen motorgeluid overheen komt.',
    },
    carplay: {
      possible: false,
      text: 'De meeste Mii-uitvoeringen hebben geen ingebouwd scherm maar een houder voor je telefoon. Heeft jouw Mii wél een scherm, stuur dan een foto van je dashboard.',
    },
    packages: ['akoestische-basis', 'akoestische-isolatie'],
    faq: [
      {
        q: 'Ik heb een VW Up! of Škoda Citigo. Geldt dit ook?',
        a: 'Ja. Die drie auto\'s zijn samen ontwikkeld en delen vrijwel alles. De aanpak is identiek.',
      },
      {
        q: 'Ik heb de Mii electric. Merk ik meer verschil?',
        a: 'Ja. Zonder motorgeluid valt het rolgeluid extra op, dus demping levert bij de elektrische versie nog meer op.',
      },
      {
        q: 'Wat levert het meest op?',
        a: 'De deuren dempen. Bij deze auto is het lichte blik de grootste boosdoener, en dat stilleggen kost geen extra vermogen.',
      },
    ],
  },
];
