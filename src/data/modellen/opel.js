/**
 * Opel — 7 modellen.
 *
 * DE VOLGORDE IN DIT BESTAND TELT. De kenteken-check pakt de eerste
 * treffer, dus een specifiek model hoort bóven een algemener model te
 * staan: "Range Rover Sport" vóór "Range Rover".
 *
 * Gebruik geen \b direct achter een cijfer: tussen de 0 en de I van
 * "320I" ligt geen woordgrens. Gebruik daar (?!\d).
 */

export default [

  // ---------------------------------------------------------- OPEL CORSA
  {
    slug: 'opel-corsa',
    brand: 'Opel',
    model: 'Corsa',
    generaties: 'Corsa D, E en F',
    matchers: { merk: 'OPEL', model: /CORSA/ },
    title: 'Opel Corsa audio upgrade | Audio Upgrade Emmen',
    description:
      'Beter geluid in je Opel Corsa. Premium speakers, akoestische deurdemping en DSP-afstemming. All-in prijs, fabrieksgarantie behouden.',
    intro:
      'De Corsa is al decennia een van de gewoonste auto\'s op de Nederlandse weg. Zo gewoon is het geluid ook gebleven, terwijl er onder die deurpanelen meer ruimte zit dan je zou denken.',
    problems: [
      'Weinig vermogen op de deurspeakers: het systeem blijft altijd beheerst, ook als je dat niet wilt.',
      'De deuren zijn holle bakken met open gaten, waardoor de achterkant van de speaker de voorkant grotendeels tegenwerkt.',
      'Bij de oudere uitvoeringen ontbreekt een aparte tweeter, waardoor stemmen dof blijven en het beeld laag hangt.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Een Corsa is een dankbare auto omdat de deur meer ruimte biedt dan de fabrieksspeaker gebruikt. Wij dempen het buitenblik, sluiten de gaten in het binnenblik af en maken van die holle deur een fatsoenlijke behuizing. Daarna heeft een betere speakerset pas echt zin: dezelfde speaker klinkt in een gedempte deur hoorbaar voller. Een losse tweeter tilt het geluidsbeeld vervolgens naar ooghoogte.',
    },
    carplay: {
      possible: true,
      text: 'De Corsa F vanaf 2019 heeft CarPlay meestal al af fabriek. Bij de Corsa D en E hangt het van het schermtype af; dat bepalen we aan de hand van een foto van je dashboard.',
    },
    packages: ['akoestische-basis', 'oem-plus-executive', 'akoestische-isolatie'],
    faq: [
      {
        q: 'Mijn Corsa is al wat ouder. Is het dat nog waard?',
        a: 'Dat hangt van jou af, niet van de auto. Blijf je er nog een paar jaar in rijden, dan is het geld goed besteed — een gedempte deur en een goede speakerset gaan langer mee dan de auto. Wij zeggen het eerlijk als we vinden dat de investering niet in verhouding staat.',
      },
      {
        q: 'Zit er bij een oudere Corsa geen roest in de deuren?',
        a: 'Soms wel. Wij controleren het plaatwerk voordat we iets plakken, want demping op blik met beginnende roest eronder is vragen om problemen. Komen we iets tegen, dan melden we dat en overleggen we voordat we verdergaan.',
      },
      {
        q: 'Hoe lang duurt de inbouw?',
        a: 'Voor de meeste Corsa-opdrachten één werkdag. Bij uitgebreide isolatie plannen we langer, en dat zeggen we vooraf.',
      },
    ],
  },

  // ---------------------------------------------------------- OPEL AGILA
  {
    slug: 'opel-agila',
    brand: 'Opel',
    model: 'Agila',
    generaties: 'Agila A en B',
    matchers: { merk: 'OPEL', model: /AGILA/ },
    title: 'Opel Agila audio upgrade | Audio Upgrade Emmen',
    description:
      'Beter geluid in je Opel Agila. Speakers, akoestische deurdemping en minder rolgeluid, met all-in prijs.',
    intro:
      'De Agila is klein, hoog en praktisch, en juist die hoge rechte vorm maakt hem akoestisch levendiger dan comfortabel is.',
    problems: [
      'De rechte, hoge panelen resoneren makkelijk mee en geven een holle nagalm bij lage tonen.',
      'Twee of vier eenvoudige speakers zonder aparte tweeter, dus het geluid komt uit je knieën.',
      'Minimale isolatie: op snelwegsnelheid overstemt het rolgeluid de muziek.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Agila is demping het halve werk. De rechte panelen stilleggen haalt de holle nagalm weg die je aanzag voor bas en maakt de auto meteen rustiger. Daarna komt er een componentenset in met een losse tweeter, zodat het geluid vóór je komt te zitten.',
    },
    carplay: {
      possible: false,
      text: 'De meeste Agila\'s hebben geen scherm in het dashboard waar CarPlay in past. Wil je toch draadloos streamen en handsfree bellen, dan kan dat met een discrete oplossing achter het dashboard.',
    },
    packages: ['akoestische-isolatie', 'akoestische-basis'],
    faq: [
      {
        q: 'Ik hoor een holle dreun. Wat is dat?',
        a: 'De rechte, vlakke panelen die meetrillen. Het klinkt als bas maar het is resonantie, en het maskeert de echte lage tonen.',
      },
      {
        q: 'Waarom eerst isolatie?',
        a: 'Omdat rolgeluid en resonantie hier het grootste probleem zijn. Zolang de weg luider is dan de muziek, hoor je van betere speakers maar de helft.',
      },
      {
        q: 'Wat kost dit ongeveer?',
        a: 'De Akoestische Basis ligt op € 995 all-in. Alleen isolatie maken we op maat.',
      },
    ],
  },

  // ---------------------------------------------------------- OPEL ASTRA
  {
    slug: 'opel-astra',
    brand: 'Opel',
    model: 'Astra',
    generaties: 'Astra H, J, K en L, ook Sports Tourer',
    matchers: { merk: 'OPEL', model: /ASTRA/ },
    title: 'Opel Astra audio upgrade | Audio Upgrade Emmen',
    description:
      'Beter geluid in je Opel Astra of Sports Tourer. Premium speakers, deurdemping en DSP-afstemming met behoud van je scherm.',
    intro:
      'De Astra is decennialang een van de gewoonste auto\'s op de Nederlandse weg geweest. Zo gewoon is het geluid ook gebleven, terwijl er onder die deurpanelen ruimte genoeg zit.',
    problems: [
      'Weinig vermogen op de deurspeakers: het systeem blijft altijd beheerst, ook als je dat niet wilt.',
      'De deuren zijn holle bakken met open gaten, waardoor de achterkant van de speaker de voorkant tegenwerkt.',
      'Bij de Sports Tourer slikt de grote laadruimte lage tonen weg en resoneert de klep mee.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Een Astra is dankbaar omdat de deur meer ruimte biedt dan de fabrieksspeaker gebruikt. Wij dempen het buitenblik, sluiten de gaten in het binnenblik af en maken er een fatsoenlijke behuizing van. Daarna heeft een betere speakerset pas echt zin. Rijd je Sports Tourer, dan pakken we ook de laadruimte aan.',
    },
    carplay: {
      possible: true,
      text: 'Op de Astra K en L met IntelliLink zit CarPlay meestal al af fabriek. Bij de oudere generaties hangt het van het schermtype af.',
    },
    packages: ['carplay-upgrade', 'akoestische-basis', 'oem-plus-executive'],
    faq: [
      {
        q: 'Mijn Astra is wat ouder. Is het dat nog waard?',
        a: 'Blijf je er nog jaren in rijden, dan zeker. Wij controleren wel eerst het plaatwerk voordat we iets plakken, want op blik met beginnende roest hoort geen demping.',
      },
      {
        q: 'Ik heb de Sports Tourer. Kost dat extra?',
        a: 'Als je de laadruimte mee wilt dempen wel. Daar zit bij een stationwagen wel de meeste winst.',
      },
      {
        q: 'Hoe lang duurt de inbouw?',
        a: 'Voor de meeste Astra-opdrachten één werkdag.',
      },
    ],
  },

  // ---------------------------------------------------------- OPEL MOKKA
  {
    slug: 'opel-mokka',
    brand: 'Opel',
    model: 'Mokka',
    generaties: 'Mokka, Mokka X en Mokka-e',
    matchers: { merk: 'OPEL', model: /MOKKA/ },
    title: 'Opel Mokka audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer body in je Opel Mokka. Premium speakers, deurdemping, DSP-afstemming en draadloos CarPlay.',
    intro:
      'De Mokka is de compacte SUV waarmee Opel het gat naar de crossover dichtte. Je zit hoger dan in een Corsa, en dat verandert meer aan het geluid dan je zou denken.',
    problems: [
      'De hogere zitpositie zet je verder van de deurspeakers, waardoor het geluidsbeeld laag blijft hangen.',
      'Het cabinevolume is groter dan bij een Corsa terwijl de aansturing even bescheiden is.',
      'De achterklep resoneert hoorbaar mee zodra er echte bas bij komt.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Mokka tillen we met tijdcorrectie het geluidsbeeld naar ooghoogte, zodat het niet meer van onderen komt. De deuren en de klep dempen we, wat het rammelen wegneemt en de bas laat dragen. Een DSP-versterker geeft de speakers het vermogen dat het volume vraagt. Bij de elektrische Mokka-e levert de demping dubbel op, omdat er geen motorgeluid overheen komt.',
    },
    carplay: {
      possible: true,
      text: 'Op de meeste Mokka-uitvoeringen zit CarPlay al af fabriek. Zit het er niet in, dan bekijken we per auto wat er mogelijk is.',
    },
    packages: ['carplay-upgrade', 'akoestische-basis', 'oem-plus-executive'],
    faq: [
      {
        q: 'Ik heb de elektrische Mokka-e. Maakt dat verschil?',
        a: 'Ja, in je voordeel. Zonder motorgeluid hoor je elke verbetering duidelijker, maar valt het rolgeluid ook meer op. Demping levert daar extra veel op.',
      },
      {
        q: 'Waarom komt het geluid van onderen?',
        a: 'Omdat je hoog zit en je speakers laag in de deur. Met tijdcorrectie laten we de signalen samenvallen op jouw stoel.',
      },
      {
        q: 'Verlies ik bagageruimte?',
        a: 'Nee. Wij werken met compacte subwoofers die onder de stoel of in de reservewielbak verdwijnen.',
      },
    ],
  },

  // ---------------------------------------------------------- OPEL KARL
  {
    slug: 'opel-karl',
    brand: 'Opel',
    model: 'Karl',
    generaties: 'Karl en Karl Rocks',
    matchers: { merk: 'OPEL', model: /KARL/ },
    title: 'Opel Karl audio upgrade | Audio Upgrade Emmen',
    description:
      'Beter geluid in je Opel Karl. Speakers, akoestische deurdemping en minder rolgeluid, met all-in prijs.',
    intro:
      'De Karl is een eerlijke stadsauto zonder franje. Precies daarom valt er met bescheiden middelen veel aan te verbeteren.',
    problems: [
      'Eenvoudige speakers zonder aparte tweeter, waardoor het geluid volledig uit je knieën komt.',
      'Licht deurblik dat op elke basnoot hoorbaar meetrilt.',
      'Minimale isolatie: op snelwegsnelheid overstemt het rolgeluid de muziek.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Karl levert demping direct meer bas op zonder dat er één watt bij komt. Daarna zetten we er een componentenset in met een losse tweeter, zodat het geluidsbeeld vóór je komt te zitten. In deze kleine cabine heb je daar weinig vermogen voor nodig.',
    },
    carplay: {
      possible: true,
      text: 'Heeft jouw Karl het IntelliLink-scherm, dan is CarPlay meestal al aanwezig of toe te voegen. Bij de kale uitvoeringen zonder scherm is dat niet mogelijk.',
    },
    packages: ['akoestische-basis', 'akoestische-isolatie'],
    faq: [
      {
        q: 'Wat levert het meest op als ik één ding kies?',
        a: 'De deuren dempen. Bij deze auto is het lichte blik de grootste boosdoener.',
      },
      {
        q: 'Is het niet zonde om in zo\'n auto te investeren?',
        a: 'Een kleine cabine vraagt weinig vermogen en je zit dicht bij de speakers, dus je krijgt veel terug voor een bescheiden bedrag.',
      },
      {
        q: 'Hoe lang duurt de inbouw?',
        a: 'Voor de meeste Karl-opdrachten één werkdag.',
      },
    ],
  },

  // --------------------------------------------------------- OPEL MERIVA
  {
    slug: 'opel-meriva',
    brand: 'Opel',
    model: 'Meriva',
    generaties: 'Meriva A en B',
    matchers: { merk: 'OPEL', model: /MERIVA/ },
    title: 'Opel Meriva audio upgrade | Audio Upgrade Emmen',
    description:
      'Beter geluid in je Opel Meriva. Premium speakers, akoestische deurdemping en DSP-afstemming.',
    intro:
      'De Meriva is de praktische gezinsauto met de tegengesteld openende achterdeuren. Hoog, recht en ruim — akoestisch een auto die makkelijk gaat galmen.',
    problems: [
      'De hoge, rechte panelen resoneren makkelijk mee en geven een holle nagalm bij lage tonen.',
      'De hoge zitpositie zet je verder van de deurspeakers, waardoor het geluidsbeeld laag blijft hangen.',
      'Weinig vermogen op de deurspeakers: het systeem knijpt dicht zodra je opendraait.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Meriva is demping het halve werk: de rechte panelen stilleggen haalt de holle nagalm weg die je aanzag voor bas. De achterdeuren scharnieren anders dan gebruikelijk, dus daar nemen we extra tijd voor bij demontage. Daarna komt er een componentenset in en tillen we met tijdcorrectie het geluidsbeeld naar ooghoogte.',
    },
    carplay: {
      possible: true,
      text: 'Heeft jouw Meriva het IntelliLink-scherm, dan is CarPlay meestal toe te voegen. Bij de oudere Meriva A zonder scherm is dat niet mogelijk.',
    },
    packages: ['akoestische-basis', 'akoestische-isolatie', 'oem-plus-executive'],
    faq: [
      {
        q: 'Mijn achterdeuren openen tegengesteld. Is dat een probleem?',
        a: 'Nee, maar het vraagt wel extra zorg bij demontage omdat de scharnieren en de bedrading anders lopen. Wij plannen daar tijd voor in en zeggen dat vooraf.',
      },
      {
        q: 'Ik hoor een holle dreun. Wat is dat?',
        a: 'De hoge, vlakke panelen die meetrillen. Het klinkt als bas maar het is resonantie, en het maskeert de echte lage tonen.',
      },
      {
        q: 'Wat levert het meest op?',
        a: 'De Akoestische Basis: premium speakers voorin plus deurdemping, € 995 all-in.',
      },
    ],
  },

  // ----------------------------------------------------- OPEL CROSSLAND
  {
    slug: 'opel-crossland',
    brand: 'Opel',
    model: 'Crossland',
    generaties: 'Crossland X en Crossland',
    matchers: { merk: 'OPEL', model: /CROSSLAND/ },
    title: 'Opel Crossland audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer body in je Opel Crossland. Premium speakers, deurdemping, DSP-afstemming en draadloos CarPlay.',
    intro:
      'De Crossland is de praktische compacte crossover van Opel: hoog instappen, veel ruimte voor zijn maat. Die hoogte verandert meer aan het geluid dan je zou denken.',
    problems: [
      'De hogere zitpositie zet je verder van de deurspeakers, waardoor het geluidsbeeld laag blijft hangen.',
      'Het interieur heeft veel hard kunststof dat hoge tonen scherp terug laat kaatsen.',
      'De achterklep resoneert hoorbaar mee zodra er echte bas bij komt.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Crossland dempen we de deuren en de klep, tillen we met tijdcorrectie het geluidsbeeld naar ooghoogte en temmen we met de DSP-afstemming de scherpte van het harde interieur. Omdat de cabine compact is, heb je daar minder vermogen voor nodig dan in een grote SUV.',
    },
    carplay: {
      possible: true,
      text: 'Op de meeste Crossland-uitvoeringen met IntelliLink zit CarPlay al af fabriek.',
    },
    packages: ['carplay-upgrade', 'akoestische-basis', 'oem-plus-executive'],
    faq: [
      {
        q: 'Waarom komt het geluid van onderen?',
        a: 'Omdat je hoog zit en je speakers laag in de deur. Met tijdcorrectie laten we de signalen samenvallen op jouw stoel.',
      },
      {
        q: 'Wat levert het meest op?',
        a: 'De Akoestische Basis: premium speakers voorin plus deurdemping, € 995 all-in.',
      },
      {
        q: 'Verlies ik bagageruimte?',
        a: 'Nee. Wij gebruiken compacte subwoofers die onder de stoel of in de reservewielbak verdwijnen.',
      },
    ],
  },
];
