/**
 * Škoda — 6 modellen.
 *
 * DE VOLGORDE IN DIT BESTAND TELT. De kenteken-check pakt de eerste
 * treffer, dus een specifiek model hoort bóven een algemener model te
 * staan: "Range Rover Sport" vóór "Range Rover".
 *
 * Gebruik geen \b direct achter een cijfer: tussen de 0 en de I van
 * "320I" ligt geen woordgrens. Gebruik daar (?!\d).
 */

export default [

  // ------------------------------------------------------- SKODA OCTAVIA
  {
    slug: 'skoda-octavia',
    brand: 'Škoda',
    model: 'Octavia',
    generaties: '1Z, 5E en NX, ook Combi',
    matchers: { merk: 'SKODA', model: /OCTAVIA/ },
    title: 'Škoda Octavia audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer diepgang in je Škoda Octavia of Combi. Premium speakers, demping, DSP-afstemming en draadloos CarPlay.',
    intro:
      'De Octavia is de verstandige keuze: veel auto voor je geld. Dat verstandige zit ook in de audio, en daar is het minder leuk — het is precies genoeg en niets meer.',
    problems: [
      'Geen aparte versterker: het vermogen komt uit het kleine eindtrapje in de radio, en dat is weinig voor deze cabine.',
      'De deuren zijn holle bakken met open gaten, waardoor de achterkant van de speaker de bas grotendeels opheft.',
      'Bij de Combi slikt de grote laadruimte lage tonen weg en resoneert de achterklep hoorbaar mee.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Octavia zit de grootste winst in de deur: dempen, de gaten afsluiten en er een fatsoenlijke behuizing van maken. Daarna klinkt dezelfde speaker al hoorbaar voller. Wil je meer, dan zetten we er een DSP-versterker achter die de fabrieksafstemming corrigeert en het geluidsbeeld met tijdcorrectie voor je op het dashboard zet. Rijd je Combi, dan pakken we ook de laadruimte aan.',
    },
    carplay: {
      possible: true,
      text: 'Draadloos CarPlay en Android Auto in het originele scherm, met behoud van de originele knoppen en de stuurbediening.',
    },
    packages: ['carplay-upgrade', 'akoestische-basis', 'oem-plus-executive', 'reference-edition'],
    faq: [
      {
        q: 'Ik heb de Combi. Kost dat extra?',
        a: 'Als je de laadruimte mee wilt dempen wel, want dat is extra oppervlak en extra demontage. Bij een Combi zit daar wel de meeste winst, dus we bespreken vooraf wat het oplevert.',
      },
      {
        q: 'Ik heb het Canton-systeem. Heeft een upgrade dan nog zin?',
        a: 'Ja, gerichter. Canton geeft je meer speakers en meer vermogen, maar laat de deuren ongedempt en stemt af op een gemiddelde bestuurder. Wij voegen dan demping en DSP-controle toe.',
      },
      {
        q: 'Kan ik de originele radio houden?',
        a: 'Ja, en dat is ook het advies. Je scherm, je stuurknoppen en je parkeersensoren blijven ongewijzigd. Alleen wat je hoort verandert.',
      },
    ],
  },
  // --------------------------------------------------------- SKODA FABIA
  {
    slug: 'skoda-fabia',
    brand: 'Škoda',
    model: 'Fabia',
    generaties: '5J, NJ en PJ, ook Combi',
    matchers: { merk: 'SKODA', model: /FABIA/ },
    title: 'Škoda Fabia audio upgrade | Audio Upgrade Emmen',
    description:
      'Beter geluid in je Škoda Fabia. Premium speakers, akoestische deurdemping en DSP-afstemming met behoud van je scherm.',
    intro:
      'De Fabia deelt zijn platform met de VW Polo en de Seat Ibiza, en deelt daarmee ook hun grootste tekortkoming: holle deuren waar de bas in verdwijnt.',
    problems: [
      'De deuren zijn holle bakken met open gaten, waardoor de achterkant van de speaker de voorkant grotendeels tegenwerkt.',
      'Op veel uitvoeringen ontbreekt een aparte tweeter, waardoor stemmen dof blijven en het geluid uit je knieën komt.',
      'Weinig isolatie betekent veel rolgeluid, precies in het gebied waar zang en spraak zitten.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Fabia zit de winst in de deur. Wij dempen het buitenblik, sluiten de gaten in het binnenblik af en maken van die holle deur een fatsoenlijke behuizing — dezelfde speaker klinkt daarin hoorbaar voller. Daarna komt er een componentenset in met een losse tweeter in de spiegeldriehoek, waardoor het geluidsbeeld ineens vóór je zit.',
    },
    carplay: {
      possible: true,
      text: 'Op de meeste Fabia-uitvoeringen met scherm is CarPlay al aanwezig of eenvoudig toe te voegen, met behoud van de originele bediening.',
    },
    packages: ['carplay-upgrade', 'akoestische-basis', 'oem-plus-executive'],
    faq: [
      {
        q: 'Ik heb eerder een Polo gehad. Is dit dezelfde klus?',
        a: 'Grotendeels wel. Fabia, Polo en Ibiza delen het platform en de deuropbouw, dus de aanpak is vergelijkbaar. De afwerking verschilt, en daar stemmen wij de plaatsing op af.',
      },
      {
        q: 'Passen er grotere speakers in?',
        a: 'Wij gebruiken CNC-gefreesde adapterringen die op de originele bevestigingspunten passen, zonder boren of zagen. Het deurpaneel gaat er daarna weer strak op.',
      },
      {
        q: 'Wat kost dit ongeveer?',
        a: 'De Akoestische Basis met premium speakers en deurdemping ligt op € 995 all-in, inclusief montage en btw.',
      },
    ],
  },

  // ------------------------------------------------------- SKODA KODIAQ
  {
    slug: 'skoda-kodiaq',
    brand: 'Škoda',
    model: 'Kodiaq',
    generaties: 'NS7 en NU7',
    matchers: { merk: 'SKODA', model: /KODIAQ/ },
    title: 'Škoda Kodiaq audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer body in je Škoda Kodiaq. Echt vermogen voor het grote cabinevolume, demping en afstemming voor alle zitrijen.',
    intro:
      'De Kodiaq is de grote gezinsauto van Škoda, vaak met zeven zitplaatsen. Dat formaat is precies waar de fabrieksinstallatie op vastloopt.',
    problems: [
      'Het cabinevolume is groot en lage tonen vragen daar veel meer vermogen dan de basisaansturing geeft.',
      'Met de derde zitrij in gebruik zitten passagiers ver van elke speaker.',
      'De grote achterklep en de uitgestrekte zijpanelen resoneren over een fors oppervlak mee.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Kodiaq telt vermogen echt. Wij zetten er een DSP-versterker in die het cabinevolume aankan en voegen een subwoofer toe die in de zijwand verdwijnt. De deuren en de klep dempen we grondig. Rijd je vaak met zeven mensen, dan leggen we een tweede afstemming vast die de hele auto bedient.',
    },
    carplay: {
      possible: true,
      text: 'Draadloos CarPlay en Android Auto in het originele scherm, met behoud van camera, sensoren en stuurbediening.',
    },
    packages: ['carplay-upgrade', 'oem-plus-executive', 'reference-edition'],
    faq: [
      {
        q: 'Kan het ook goed klinken op de derde rij?',
        a: 'Beter dan nu, maar wees realistisch: wie ver achter de voorste speakers zit hoort nooit hetzelfde als de bestuurder. Met een aparte afstemming komen we een heel eind.',
      },
      {
        q: 'Ik heb het Canton-systeem. Wat kunnen jullie toevoegen?',
        a: 'Demping en een eigen afstemming. De speakerset laten we dan meestal zitten; de winst zit in het temmen van deuren en klep.',
      },
      {
        q: 'Verlies ik laadruimte?',
        a: 'Nauwelijks. Wij bouwen de subwoofer in de zijwand, afgewerkt in dezelfde stoffering.',
      },
    ],
  },

  // -------------------------------------------------------- SKODA CITIGO
  {
    slug: 'skoda-citigo',
    brand: 'Škoda',
    model: 'Citigo',
    generaties: 'Citigo en Citigo-e iV',
    matchers: { merk: 'SKODA', model: /CITIGO/ },
    title: 'Škoda Citigo audio upgrade | Audio Upgrade Emmen',
    description:
      'Beter geluid in je Škoda Citigo. Speakers, akoestische deurdemping en minder rolgeluid, met all-in prijs.',
    intro:
      'De Citigo is samen met de VW Up! en de Seat Mii ontwikkeld: dezelfde auto, drie badges. Dat betekent ook dezelfde bezuiniging op geluid.',
    problems: [
      'Vaak maar twee of vier speakers zonder aparte tweeter, dus alles komt uit je knieën.',
      'Het deurblik is dun en licht en gaat op elke basnoot hoorbaar meetrillen.',
      'Weinig isolatie, waardoor rolgeluid op de snelweg de muziek overstemt.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Citigo levert demping direct hoorbaar meer bas op zonder dat er één watt bij komt. Daarna zetten we er een componentenset in met een losse tweeter, zodat het geluid vóór je komt te zitten. Rijd je de elektrische Citigo-e, dan levert de demping dubbel op omdat er geen motorgeluid overheen komt.',
    },
    carplay: {
      possible: false,
      text: 'De meeste Citigo-uitvoeringen hebben geen ingebouwd scherm maar een houder voor je telefoon. Heeft jouw Citigo wél een scherm, stuur dan een foto van je dashboard.',
    },
    packages: ['akoestische-basis', 'akoestische-isolatie'],
    faq: [
      {
        q: 'Ik heb een VW Up! of Seat Mii. Geldt dit ook?',
        a: 'Ja. Die drie auto\'s zijn samen ontwikkeld en delen vrijwel alles. De aanpak is identiek.',
      },
      {
        q: 'Ik heb de elektrische Citigo-e. Merk ik meer verschil?',
        a: 'Ja. Zonder motorgeluid valt het rolgeluid extra op, dus demping levert bij de elektrische versie nog meer op.',
      },
      {
        q: 'Wat levert het meest op?',
        a: 'De deuren dempen. Bij deze auto is het lichte blik de grootste boosdoener.',
      },
    ],
  },

  // --------------------------------------------------------- SKODA KAROQ
  {
    slug: 'skoda-karoq',
    brand: 'Škoda',
    model: 'Karoq',
    generaties: 'Karoq vanaf 2017',
    matchers: { merk: 'SKODA', model: /KAROQ/ },
    title: 'Škoda Karoq audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer body in je Škoda Karoq. Premium speakers, demping van deuren en achterklep, DSP-afstemming.',
    intro:
      'De Karoq is de compacte SUV die veel Nederlanders kozen als opvolger van hun Octavia. Meer ruimte, hetzelfde audiosysteem. Dat merk je.',
    problems: [
      'Het cabinevolume is groter dan bij een Octavia terwijl de aansturing even bescheiden is.',
      'De hoge zitpositie legt het geluidsbeeld laag, ver onder je oorhoogte.',
      'De grote achterklep dreunt hoorbaar mee op elke basnoot.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Karoq dempen we eerst de klep en de deuren, want zonder dat gaat elk extra watt zitten in rammelend plaatwerk. Daarna geeft een DSP-versterker de speakers het vermogen dat het volume vraagt, met tijdcorrectie zodat het beeld op ooghoogte komt. Een compacte subwoofer in de reservewielbak maakt het fundament af.',
    },
    carplay: {
      possible: true,
      text: 'Draadloos CarPlay en Android Auto in het originele scherm, met behoud van camera, sensoren en stuurbediening.',
    },
    packages: ['carplay-upgrade', 'akoestische-basis', 'oem-plus-executive'],
    faq: [
      {
        q: 'Ik hoor een doffe dreun bij bas. Is er iets kapot?',
        a: 'Waarschijnlijk niet. Dat is meestal de achterklep die meetrilt. Het klinkt als bas maar het is resonantie.',
      },
      {
        q: 'Ik heb het Canton-systeem. Wat kunnen jullie toevoegen?',
        a: 'Demping en een eigen afstemming. De speakerset laten we dan meestal zitten; de winst zit in het temmen van deuren en klep.',
      },
      {
        q: 'Verlies ik laadruimte?',
        a: 'Nee. Wij werken met compacte subwoofers die in de reservewielbak of onder een stoel verdwijnen.',
      },
    ],
  },

  // -------------------------------------------------------- SKODA SUPERB
  {
    slug: 'skoda-superb',
    brand: 'Škoda',
    model: 'Superb',
    generaties: 'Superb II, III en IV, ook Combi',
    matchers: { merk: 'SKODA', model: /SUPERB/ },
    title: 'Škoda Superb audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer diepgang in je Škoda Superb of Combi. High-end speakers, demping, DSP-afstemming en draadloos CarPlay.',
    intro:
      'De Superb is de auto met de meeste beenruimte in zijn klasse en een favoriet onder veelrijders. Op die kilometers gaat het om hoe lang je het volhoudt, niet om hoe hard het kan.',
    problems: [
      'Op snelwegtempo verdrinkt het middengebied in rolgeluid, en juist dan knijpt de fabrieksversterking dicht.',
      'Achterin zitten passagiers ver van de voorste speakers — in deze auto zit daar vaak juist iemand.',
      'Bij de Combi slikt de grote laadruimte lage tonen weg en resoneert de achterklep mee.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Superb begint het bij rust. Wij dempen de deuren en bij een Combi ook de laadruimte, waardoor je zachter kunt luisteren zonder iets te missen. Daarna geeft een DSP-versterker de speakers ruimte en zetten we met tijdcorrectie het geluidsbeeld voor je op het dashboard. Wordt er vaak achterin gezeten, dan leggen we daar een tweede afstemming voor vast.',
    },
    carplay: {
      possible: true,
      text: 'Draadloos CarPlay en Android Auto in het originele scherm, met behoud van de originele bediening.',
    },
    packages: ['carplay-upgrade', 'oem-plus-executive', 'reference-edition'],
    faq: [
      {
        q: 'Ik word vaak gereden en zit achterin. Kan daarop afgestemd worden?',
        a: 'Ja. Met een DSP slaan we twee afstemmingen op: één voor de bestuurdersstoel en één die op de achterbank klopt. Je kiest ze zelf.',
      },
      {
        q: 'Ik heb het Canton-systeem. Heeft een upgrade dan nog zin?',
        a: 'Ja, gerichter. Canton geeft meer speakers en vermogen, maar laat de deuren ongedempt en stemt af op een gemiddelde bestuurder.',
      },
      {
        q: 'Ik heb de Combi. Kost dat extra?',
        a: 'Als je de laadruimte mee wilt dempen wel. Daar zit bij een Combi wel de meeste winst.',
      },
    ],
  },
];
