/**
 * Toyota — 7 modellen.
 *
 * DE VOLGORDE IN DIT BESTAND TELT. De kenteken-check pakt de eerste
 * treffer, dus een specifiek model hoort bóven een algemener model te
 * staan: "Range Rover Sport" vóór "Range Rover".
 *
 * Gebruik geen \b direct achter een cijfer: tussen de 0 en de I van
 * "320I" ligt geen woordgrens. Gebruik daar (?!\d).
 */

export default [

  // --------------------------------------------------------- TOYOTA AYGO
  {
    slug: 'toyota-aygo',
    brand: 'Toyota',
    model: 'Aygo',
    generaties: 'Aygo eerste en tweede generatie',
    matchers: { merk: 'TOYOTA', model: /AYGO/ },
    title: 'Toyota Aygo audio upgrade | Audio Upgrade Emmen',
    description:
      'Van dun naar vol geluid in je Toyota Aygo. Speakers, deurdemping en minder rolgeluid, met all-in prijs en behoud van fabrieksgarantie.',
    intro:
      'De Aygo is gebouwd op de scherpst mogelijke kostprijs, samen met de Peugeot 107 en de Citroën C1. Aan audio is daarbij vrijwel niets uitgegeven. Dat maakt de sprong hier juist zo groot.',
    problems: [
      'Er zitten vaak maar twee of vier eenvoudige speakers in, zonder aparte tweeter. Het geluid komt daardoor volledig uit je knieën.',
      'De isolatie is tot het minimum beperkt om gewicht en kosten te sparen. Op de snelweg is het rolgeluid dan ook het luidste in de auto.',
      'De dunne deurpanelen resoneren mee, waardoor wat er aan bas is vooral als geklapper terugkomt.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'De Aygo is een van de duidelijkste voorbeelden van waarom wij bij demping beginnen. Het rolgeluid omlaag brengen verandert de auto meteen: gesprekken gaan zonder stemverheffing en je hoeft de muziek niet meer boven de weg uit te draaien. Daarna zetten we er een componentenset in met een losse tweeter. Voor het bedrag van een setje winterbanden klinkt de auto compleet anders.',
    },
    carplay: {
      possible: true,
      text: 'Heeft jouw Aygo het multimediascherm in het dashboard, dan kunnen we CarPlay en Android Auto meestal toevoegen. Bij de kale uitvoeringen zonder scherm is dat niet mogelijk; stuur een foto van je dashboard, dan weet je het zeker.',
    },
    packages: ['akoestische-isolatie', 'akoestische-basis', 'oem-plus-executive'],
    faq: [
      {
        q: 'Waarom raden jullie bij deze auto isolatie als eerste aan?',
        a: 'Omdat het rolgeluid hier het grootste probleem is, niet de speakers. Zolang de weg luider is dan de muziek, hoor je van betere speakers maar de helft. Stiller maken levert dus meer op dan harder maken.',
      },
      {
        q: 'Ik heb een Peugeot 107 of Citroën C1. Geldt dit ook?',
        a: 'Ja. Die drie auto\'s zijn samen ontwikkeld en delen het grootste deel van de carrosserie en het interieur. Wat wij voor een Aygo doen, doen we op dezelfde manier voor een 107 of een C1.',
      },
      {
        q: 'Blijft mijn fabrieksgarantie geldig?',
        a: 'Ja. Wij werken met Plug & Play-kabelbomen op de bestaande stekkers en knippen geen originele bedrading door. Alles is volledig terug te bouwen naar origineel.',
      },
    ],
  },

  // -------------------------------------------------------- TOYOTA YARIS
  {
    slug: 'toyota-yaris',
    brand: 'Toyota',
    model: 'Yaris',
    generaties: 'XP90, XP130 en XP210',
    matchers: { merk: 'TOYOTA', model: /YARIS/ },
    title: 'Toyota Yaris audio upgrade | Audio Upgrade Emmen',
    description:
      'Beter geluid in je Toyota Yaris. Premium speakers, akoestische deurdemping en minder rolgeluid. All-in prijs, garantie behouden.',
    intro:
      'De Yaris is gekocht om te doen wat hij moet doen, en dat doet hij twintig jaar lang. Het geluid is het onderdeel waar Toyota het meest heeft bezuinigd.',
    problems: [
      'Eenvoudige speakers zonder aparte tweeter op veel uitvoeringen, waardoor stemmen dof blijven en het beeld laag hangt.',
      'Weinig isolatie: op de snelweg is het rolgeluid het luidste geluid in de auto.',
      'Bij de hybride valt dat rolgeluid extra op, omdat er geen motorgeluid overheen komt.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Yaris beginnen we bij de deur. Demping legt het lichte blik stil en haalt rolgeluid weg, waardoor je zachter kunt luisteren en toch alles hoort. Daarna zetten we er een componentenset in met een losse tweeter, zodat het geluid vóór je komt te zitten in plaats van bij je knieën. In deze kleine cabine heb je daar weinig vermogen voor nodig.',
    },
    carplay: {
      possible: true,
      text: 'Heeft jouw Yaris het multimediascherm in het dashboard, dan kunnen we CarPlay en Android Auto meestal toevoegen. Bij de kale uitvoeringen zonder scherm is dat niet mogelijk.',
    },
    packages: ['akoestische-basis', 'akoestische-isolatie', 'oem-plus-executive'],
    faq: [
      {
        q: 'Ik heb de hybride. Merk ik meer of minder verschil?',
        a: 'Meer. Zonder motorgeluid valt het rolgeluid extra op, dus demping levert bij een hybride nog meer op dan bij de benzineversie.',
      },
      {
        q: 'Is het niet zonde om in zo\'n auto te investeren?',
        a: 'Een kleine cabine vraagt weinig vermogen voor hetzelfde niveau en je zit dicht bij de speakers. Een goed opgezette Yaris klinkt met gemak beter dan een grote auto met standaard fabrieksaudio.',
      },
      {
        q: 'Blijft mijn fabrieksgarantie geldig?',
        a: 'Ja. Wij werken met Plug & Play-kabelbomen op de bestaande stekkers en knippen geen originele bedrading door.',
      },
    ],
  },

  // ------------------------------------------------------ TOYOTA COROLLA
  {
    slug: 'toyota-corolla',
    brand: 'Toyota',
    model: 'Corolla',
    generaties: 'E120 tot en met E210, ook Touring Sports',
    matchers: { merk: 'TOYOTA', model: /COROLLA/ },
    title: 'Toyota Corolla audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer diepgang in je Toyota Corolla. Premium speakers, demping en DSP-afstemming — extra effectief bij de hybride.',
    intro:
      'De Corolla is de meest verkochte auto ter wereld en tegenwoordig vrijwel altijd hybride. Die stille aandrijving legt precies bloot wat het audiosysteem niet doet.',
    problems: [
      'Bij de hybride valt het rolgeluid extra op, omdat er geen motorgeluid overheen komt om het te maskeren.',
      'De basisinstallatie mist een echte onderkant, waardoor er onder de muziek niets zit.',
      'De deuren zijn niet gedempt, dus een deel van de bas verdwijnt in het paneel.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Een hybride is een dankbare klant voor demping: er is geen motor die het rolgeluid maskeert, dus alles wat je stiller maakt hoor je meteen terug. Wij dempen de deuren en waar gewenst de vloer, zetten er een componentenset in en voegen een compacte subwoofer toe voor het fundament. Het resultaat is een auto die stiller én muzikaler is.',
    },
    carplay: {
      possible: true,
      text: 'Op de meeste Corolla-uitvoeringen vanaf 2019 zit CarPlay al af fabriek. Bij oudere modellen kijken we per auto wat er mogelijk is.',
    },
    packages: ['akoestische-basis', 'akoestische-isolatie', 'oem-plus-executive'],
    faq: [
      {
        q: 'Merk ik bij een hybride meer verschil?',
        a: 'Ja. Zonder motorgeluid hoor je het rolgeluid en elke resonantie veel duidelijker. Demping levert daardoor meer op dan bij een benzineauto, en het maakt de auto ook comfortabeler zonder muziek.',
      },
      {
        q: 'Ik heb het JBL-systeem. Heeft een upgrade dan nog zin?',
        a: 'Ja, gerichter. JBL geeft je meer speakers en meer vermogen, maar laat de deuren ongedempt. Wij voegen dan demping en DSP-controle toe in plaats van alles te vervangen.',
      },
      {
        q: 'Kost een audiosysteem verbruik?',
        a: 'Verwaarloosbaar. Bij normaal luisteren verbruikt het een fractie van wat de aandrijving vraagt; het valt weg tegen buitentemperatuur en rijstijl.',
      },
    ],
  },

  // -------------------------------------------------------- TOYOTA AURIS
  {
    slug: 'toyota-auris',
    brand: 'Toyota',
    model: 'Auris',
    generaties: 'E150 en E180, ook Touring Sports',
    matchers: { merk: 'TOYOTA', model: /AURIS/ },
    title: 'Toyota Auris audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer diepgang in je Toyota Auris. Premium speakers, demping en DSP-afstemming — extra effectief bij de hybride.',
    intro:
      'De Auris was jarenlang de hybride waar Nederland op reed voordat de Corolla die naam terugkreeg. Veel exemplaren rijden nog, en het geluid is er zelden aan bijgewerkt.',
    problems: [
      'Bij de hybride valt het rolgeluid extra op, omdat er geen motorgeluid overheen komt.',
      'De basisinstallatie mist een echte onderkant en knijpt dicht zodra je verder opendraait.',
      'Bij oudere exemplaren zijn de originele speakerconussen na jaren verhard, waardoor de bas dun wordt zonder dat er iets kapot is.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Auris pakken we twee dingen tegelijk aan: het rolgeluid en de verouderde speakers. Demping van de deuren maakt de auto stiller, wat bij een hybride extra opvalt, en een nieuwe componentenset haalt de dunheid eruit. Bij oudere exemplaren controleren we eerst het plaatwerk — bij een auto van deze leeftijd wil je geen demping plakken op blik met beginnende roest.',
    },
    carplay: {
      possible: true,
      text: 'Bij de latere Auris met multimediascherm is CarPlay vaak toe te voegen. Bij oudere uitvoeringen verschilt het per bouwjaar; een foto van je dashboard geeft uitsluitsel.',
    },
    packages: ['akoestische-basis', 'akoestische-isolatie', 'oem-plus-executive'],
    faq: [
      {
        q: 'Mijn geluid is dun geworden, maar er is niets stuk. Hoe kan dat?',
        a: 'Bij oudere auto\'s verharden of scheuren de speakerconussen langzaam. De speaker houdt niet op met werken maar verliest zijn bas. Het is de meest voorkomende klacht bij auto\'s van deze leeftijd en makkelijk op te lossen.',
      },
      {
        q: 'Merk ik bij de hybride meer verschil?',
        a: 'Ja. Zonder motorgeluid hoor je het rolgeluid duidelijker, dus demping levert extra veel op.',
      },
      {
        q: 'Mijn Auris is wat ouder. Is het dat nog waard?',
        a: 'Blijf je er nog jaren in rijden, dan zeker. Gedempte deuren en een goede speakerset gaan langer mee dan de auto zelf.',
      },
    ],
  },

  // --------------------------------------------------------- TOYOTA RAV4
  {
    slug: 'toyota-rav4',
    brand: 'Toyota',
    model: 'RAV4',
    generaties: 'XA30, XA40 en XA50',
    matchers: { merk: 'TOYOTA', model: /RAV\s?4/ },
    title: 'Toyota RAV4 audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer diepgang in je Toyota RAV4. Premium speakers, demping van deuren en achterklep, DSP-afstemming — extra effectief bij de hybride.',
    intro:
      'De RAV4 is de best verkochte SUV ter wereld en vrijwel altijd hybride. Die stille aandrijving legt precies bloot waar het audiosysteem tekortschiet.',
    problems: [
      'Bij de hybride valt het rolgeluid extra op, omdat er geen motorgeluid overheen komt.',
      'Het cabinevolume is fors en vraagt meer vermogen dan de basisinstallatie geeft.',
      'De grote achterklep en de bagageruimtepanelen resoneren hoorbaar mee.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Een hybride SUV is een dankbare klant voor demping: er is geen motor die het rolgeluid maskeert, dus alles wat je stiller maakt hoor je meteen terug. Wij dempen de deuren en de klep, zetten er een DSP-versterker achter voor het vermogen dat het volume vraagt, en tillen met tijdcorrectie het geluidsbeeld naar ooghoogte.',
    },
    carplay: {
      possible: true,
      text: 'Op de meeste RAV4-uitvoeringen vanaf 2019 zit CarPlay al af fabriek. Bij oudere modellen bekijken we per auto wat er mogelijk is.',
    },
    packages: ['carplay-upgrade', 'akoestische-basis', 'oem-plus-executive'],
    faq: [
      {
        q: 'Merk ik bij de hybride meer verschil?',
        a: 'Ja. Zonder motorgeluid hoor je het rolgeluid en elke resonantie duidelijker, dus demping levert extra veel op — ook als je de muziek uit laat.',
      },
      {
        q: 'Ik heb het JBL-systeem. Heeft een upgrade dan nog zin?',
        a: 'Ja, gerichter. JBL geeft meer speakers en vermogen, maar laat de deuren en klep ongedempt. Wij voegen dan demping en DSP-controle toe.',
      },
      {
        q: 'Verlies ik laadruimte?',
        a: 'Nee. Wij gebruiken compacte subwoofers die in de reservewielbak of onder een stoel verdwijnen.',
      },
    ],
  },

  // --------------------------------------------------------- TOYOTA C-HR
  {
    slug: 'toyota-c-hr',
    brand: 'Toyota',
    model: 'C-HR',
    generaties: 'C-HR eerste en tweede generatie',
    matchers: { merk: 'TOYOTA', model: /C-?HR/ },
    title: 'Toyota C-HR audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer body in je Toyota C-HR. Premium speakers, deurdemping en DSP-afstemming — extra effectief bij de hybride.',
    intro:
      'De C-HR valt op door zijn vorm: aflopend dak, kleine ruiten en een gesloten achterkant. Dat ontwerp kost precies de ruimte waar lage tonen hun werk doen.',
    problems: [
      'De aflopende daklijn en kleine ruiten geven weinig cabinevolume, waardoor het geluidsbeeld snel benauwd wordt.',
      'Bij de hybride valt het rolgeluid extra op, want er is geen motorgeluid dat het maskeert.',
      'De achterklep resoneert hoorbaar mee zodra er echte bas bij komt.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een C-HR plaatsen we de subwoofer bij voorkeur vooraan, onder een stoel, omdat de kleine ruimte achterin niet meewerkt. De deuren en de klep dempen we — bij een hybride hoor je dat meteen terug in rust. Met tijdcorrectie leggen we het geluidsbeeld bewust wat hoger, zodat de lage daklijn niet drukkend werkt.',
    },
    carplay: {
      possible: true,
      text: 'Op de meeste C-HR-uitvoeringen vanaf 2019 zit CarPlay al af fabriek. Bij oudere modellen bekijken we per auto wat er kan.',
    },
    packages: ['carplay-upgrade', 'akoestische-basis', 'oem-plus-executive'],
    faq: [
      {
        q: 'Waarom zetten jullie de subwoofer niet achterin?',
        a: 'De bagageruimte is klein en de daklijn loopt af, waardoor lage tonen zich daar minder goed opbouwen. Een compacte subwoofer onder de stoel zit dichter bij je en geeft een strakker resultaat.',
      },
      {
        q: 'Merk ik bij de hybride meer verschil?',
        a: 'Ja. Zonder motorgeluid hoor je het rolgeluid duidelijker, dus demping levert extra veel op.',
      },
      {
        q: 'Verlies ik bagageruimte?',
        a: 'Nee. Wij werken met compacte subwoofers die onder de stoel verdwijnen.',
      },
    ],
  },
  // -------------------------------------------------------- TOYOTA PRIUS
  {
    slug: 'toyota-prius',
    brand: 'Toyota',
    model: 'Prius',
    generaties: 'Prius II, III, IV en V',
    matchers: { merk: 'TOYOTA', model: /PRIUS/ },
    title: 'Toyota Prius audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer diepgang in je Toyota Prius. Premium speakers, demping en DSP-afstemming — extra effectief in een auto die zo stil is.',
    intro:
      'De Prius was de eerste hybride die Nederland massaal kocht en rijdt vaak volledig elektrisch in de stad. Die stilte is precies waarom het audiosysteem er zo mager afkomt.',
    problems: [
      'Zonder motorgeluid wordt het rolgeluid van de banden het luidste geluid in de auto.',
      'De basisinstallatie mist een echte onderkant, waardoor er onder de muziek niets zit.',
      'De aflopende daklijn en de gedeelde achterruit geven een akoestisch onrustige achterkant.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Een Prius is een dankbare klant voor demping: er is geen motor die het rolgeluid maskeert, dus alles wat je stiller maakt hoor je meteen terug. Wij dempen de deuren en waar gewenst de vloer, zetten er een componentenset in en plaatsen de subwoofer bij voorkeur vooraan omdat de aflopende achterkant minder meewerkt.',
    },
    carplay: {
      possible: true,
      text: 'Op de Prius vanaf 2019 zit CarPlay meestal al af fabriek. Bij oudere generaties bekijken we per auto wat er mogelijk is.',
    },
    packages: ['akoestische-isolatie', 'akoestische-basis', 'oem-plus-executive'],
    faq: [
      {
        q: 'Merk ik in een hybride meer verschil?',
        a: 'Ja. Zonder motorgeluid hoor je het rolgeluid en elke resonantie veel duidelijker, dus demping levert extra veel op — ook als je de muziek uit laat.',
      },
      {
        q: 'Kost een audiosysteem verbruik?',
        a: 'Verwaarloosbaar. Bij normaal luisteren verbruikt het een fractie van wat de aandrijving vraagt.',
      },
      {
        q: 'Ik heb het JBL-systeem. Heeft een upgrade dan nog zin?',
        a: 'Ja, gerichter. JBL geeft meer speakers en vermogen, maar tegen rolgeluid helpt alleen isolatie.',
      },
    ],
  },
];
