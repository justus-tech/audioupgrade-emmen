/**
 * Renault — 4 modellen.
 *
 * DE VOLGORDE IN DIT BESTAND TELT. De kenteken-check pakt de eerste
 * treffer, dus een specifiek model hoort bóven een algemener model te
 * staan: "Range Rover Sport" vóór "Range Rover".
 *
 * Gebruik geen \b direct achter een cijfer: tussen de 0 en de I van
 * "320I" ligt geen woordgrens. Gebruik daar (?!\d).
 */

export default [

  // -------------------------------------------------------- RENAULT CLIO
  {
    slug: 'renault-clio',
    brand: 'Renault',
    model: 'Clio',
    generaties: 'Clio IV en Clio V',
    matchers: { merk: 'RENAULT', model: /CLIO/ },
    title: 'Renault Clio audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer diepgang in je Renault Clio. Premium speakers, deurdemping en DSP-afstemming, met behoud van je originele scherm en garantie.',
    intro:
      'De Clio heeft een verzorgd interieur en een net scherm, en dat wekt verwachtingen die het geluid niet waarmaakt. Renault bewaart de goede installatie voor de duurdere uitvoering.',
    problems: [
      'De basisinstallatie klinkt netjes op laag volume maar loopt snel vast: draai je door, dan wordt de stem scherp en verdwijnt de onderkant.',
      'De deuren zijn niet gedempt, waardoor de bas grotendeels in het paneel verdwijnt in plaats van de cabine in.',
      'Zonder het optionele systeem ontbreekt het onderste octaaf volledig, en dat hoor je juist bij moderne muziek meteen.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Clio houden we het originele scherm en de bediening intact en werken we erachter. De deuren gaan open, worden gedempt en krijgen een componentenset met een losse tweeter zodat het beeld voor je komt te staan. Wil je het onderste octaaf erbij, dan voegen we een compacte subwoofer toe die onder de stoel verdwijnt. De auto blijft er van binnen precies hetzelfde uitzien.',
    },
    carplay: {
      possible: true,
      text: 'Op de meeste Clio\'s met R-Link of EASY LINK is CarPlay al aanwezig of eenvoudig toe te voegen. Stuur een foto van je dashboard, dan zeggen we welke van de twee bij jou geldt.',
    },
    packages: ['akoestische-basis', 'oem-plus-executive', 'akoestische-isolatie'],
    faq: [
      {
        q: 'Ik heb het Bose-systeem. Heeft een upgrade dan nog zin?',
        a: 'Ja, maar gerichter. Bose geeft je meer speakers en meer vermogen, maar de deuren blijven ongedempt en de afstemming is voor elke Clio dezelfde. Wij voegen dan demping en DSP-controle toe en laten de speakerset vaak gewoon zitten.',
      },
      {
        q: 'Moet mijn scherm eruit?',
        a: 'Nee. Alles wat wij doen zit achter het dashboard en in de deuren. Je scherm, je navigatie en je stuurbediening blijven volledig origineel.',
      },
      {
        q: 'Wat is de eerste stap die het meest oplevert?',
        a: 'De Akoestische Basis: premium speakers voorin plus deurdemping, € 995 all-in. Dat is bij een Clio de grootste sprong per euro. Wil je daarna meer diepgang, dan bouwen we door naar een DSP met subwoofer.',
      },
    ],
  },

  // ------------------------------------------------------ RENAULT TWINGO
  {
    slug: 'renault-twingo',
    brand: 'Renault',
    model: 'Twingo',
    generaties: 'Twingo II en III',
    matchers: { merk: 'RENAULT', model: /TWINGO/ },
    title: 'Renault Twingo audio upgrade | Audio Upgrade Emmen',
    description:
      'Van blikkerig naar vol geluid in je Renault Twingo. Speakers, deurdemping en minder rolgeluid, met all-in prijs.',
    intro:
      'De Twingo is klein, vrolijk en goedkoop gehouden. Aan audio is daarbij vrijwel niets uitgegeven — wat de sprong hier juist zo groot maakt.',
    problems: [
      'Vaak maar twee of vier eenvoudige speakers zonder aparte tweeter, dus alles komt uit je knieën.',
      'Het deurblik is dun en licht en gaat op elke basnoot hoorbaar meetrillen.',
      'Bij de derde generatie zit de motor achterin, wat een eigen soort geluid in de cabine brengt.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Twingo levert demping direct hoorbaar meer bas op zonder dat er één watt bij komt: het lichte blik stilleggen is hier het halve werk. Daarna zetten we er een componentenset in met een losse tweeter, zodat het geluid vóór je komt te zitten. Door de kleine cabine heb je verrassend weinig vermogen nodig voor een groot resultaat.',
    },
    carplay: {
      possible: true,
      text: 'Heeft jouw Twingo een scherm in het dashboard, dan kunnen we CarPlay en Android Auto meestal toevoegen. Bij de kale uitvoeringen is dat niet mogelijk; een foto van je dashboard geeft uitsluitsel.',
    },
    packages: ['akoestische-basis', 'akoestische-isolatie'],
    faq: [
      {
        q: 'Wat levert het meest op als ik één ding kies?',
        a: 'De deuren dempen. Bij deze auto is het lichte blik de grootste boosdoener, en dat stilleggen kost geen extra vermogen. Daarna pas heeft een betere speaker echt zin.',
      },
      {
        q: 'Mijn motor zit achterin. Verandert dat iets?',
        a: 'Voor de speakers niet, maar je hoort de motor wel dichter bij je dan in een gewone hatchback. Demping van het achterschot helpt daar tegen; dat bespreken we vooraf.',
      },
      {
        q: 'Wat kost dit ongeveer?',
        a: 'De Akoestische Basis met premium speakers en deurdemping ligt op € 995 all-in. Wil je alleen minder rijgeluid, dan maken we een prijs op maat voor alleen isolatie.',
      },
    ],
  },

  // ------------------------------------------------------ RENAULT CAPTUR
  {
    slug: 'renault-captur',
    brand: 'Renault',
    model: 'Captur',
    generaties: 'Captur I en II',
    matchers: { merk: 'RENAULT', model: /CAPTUR/ },
    title: 'Renault Captur audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer body in je Renault Captur. Premium speakers, deurdemping, DSP-afstemming en draadloos CarPlay met behoud van je scherm.',
    intro:
      'De Captur is de Clio op hoge poten en is daarmee een van de best verkochte compacte SUV\'s van Nederland. Die extra hoogte kost je geluid.',
    problems: [
      'De hogere zitpositie zet je verder van de deurspeakers, waardoor het geluidsbeeld laag blijft hangen.',
      'Het cabinevolume is groter dan bij de Clio terwijl de aansturing dezelfde bescheiden is.',
      'De achterklep resoneert hoorbaar mee zodra er echte bas bij komt.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Captur tillen we met tijdcorrectie het geluidsbeeld naar ooghoogte, zodat het niet meer van onderen komt. De deuren en de achterklep dempen we, wat het rammelen wegneemt en de bas laat dragen. Een DSP-versterker geeft de speakers het vermogen dat het grotere volume vraagt. Je originele scherm en bediening blijven ongemoeid.',
    },
    carplay: {
      possible: true,
      text: 'Op de meeste Capturs met EASY LINK of R-Link zit CarPlay al af fabriek of is het eenvoudig toe te voegen.',
    },
    packages: ['carplay-upgrade', 'akoestische-basis', 'oem-plus-executive'],
    faq: [
      {
        q: 'Waarom komt het geluid van onderen?',
        a: 'Omdat je hoog zit en je speakers laag in de deur. Met tijdcorrectie laten we de signalen samenvallen op jouw stoel, waardoor het beeld voor je op ooghoogte komt.',
      },
      {
        q: 'Ik heb het Bose-systeem. Heeft een upgrade dan nog zin?',
        a: 'Ja, gerichter. Bose geeft je meer speakers en meer vermogen, maar laat de deuren ongedempt. Wij voegen dan demping en DSP-controle toe in plaats van alles te vervangen.',
      },
      {
        q: 'Verlies ik bagageruimte?',
        a: 'Nee. Wij werken met compacte subwoofers die onder de stoel of in de reservewielbak verdwijnen.',
      },
    ],
  },

  // ------------------------------------------------------ RENAULT MEGANE
  {
    slug: 'renault-megane',
    brand: 'Renault',
    model: 'Mégane',
    generaties: 'Mégane III, IV en E-Tech, ook Estate',
    matchers: { merk: 'RENAULT', model: /MEGANE/ },
    title: 'Renault Mégane audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer diepgang in je Renault Mégane of Estate. Premium speakers, deurdemping, DSP-afstemming en draadloos CarPlay.',
    intro:
      'De Mégane heeft een van de fraaiste interieurs in zijn klasse, met dat staande scherm in het midden. Het geluid haalt dat niveau in de basisuitvoering niet.',
    problems: [
      'De basisinstallatie klinkt netjes op laag volume maar knijpt dicht zodra je verder opendraait.',
      'De deuren zijn niet gedempt, waardoor de bas grotendeels in het paneel verdwijnt.',
      'Bij de Estate slikt de grote laadruimte lage tonen weg en resoneert de achterklep hoorbaar mee.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Mégane houden we het originele scherm en de bediening intact en werken we erachter. De deuren gaan open, worden gedempt en krijgen een componentenset met een losse tweeter zodat het beeld voor je komt te staan. Rijd je Estate, dan dempen we ook de laadruimte. Een DSP-versterker maakt het geheel af met een afstemming op jouw stoel.',
    },
    carplay: {
      possible: true,
      text: 'Op de meeste Méganes met R-Link of EASY LINK is CarPlay al aanwezig of eenvoudig toe te voegen.',
    },
    packages: ['carplay-upgrade', 'akoestische-basis', 'oem-plus-executive'],
    faq: [
      {
        q: 'Ik heb het Bose-systeem. Heeft een upgrade dan nog zin?',
        a: 'Ja, gerichter. Bose geeft je meer speakers en meer vermogen, maar de deuren blijven ongedempt en de afstemming is voor elke Mégane dezelfde. Wij voegen dan demping en DSP-controle toe.',
      },
      {
        q: 'Moet mijn scherm eruit?',
        a: 'Nee. Alles wat wij doen zit achter het dashboard en in de deuren. Je scherm, navigatie en stuurbediening blijven origineel.',
      },
      {
        q: 'Ik heb de Estate. Kost dat extra?',
        a: 'Als je de laadruimte mee wilt dempen wel. Daar zit bij een Estate wel de meeste winst, dus we bespreken vooraf wat het oplevert en wat het kost.',
      },
    ],
  },
];
