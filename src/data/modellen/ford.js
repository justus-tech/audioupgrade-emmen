/**
 * Ford — 7 modellen.
 *
 * DE VOLGORDE IN DIT BESTAND TELT. De kenteken-check pakt de eerste
 * treffer, dus een specifiek model hoort bóven een algemener model te
 * staan: "Range Rover Sport" vóór "Range Rover".
 *
 * Gebruik geen \b direct achter een cijfer: tussen de 0 en de I van
 * "320I" ligt geen woordgrens. Gebruik daar (?!\d).
 */

export default [

  // --------------------------------------------------------- FORD FIESTA
  {
    slug: 'ford-fiesta',
    brand: 'Ford',
    model: 'Fiesta',
    generaties: 'Fiesta MK7 en MK8',
    matchers: { merk: 'FORD', model: /FIESTA/ },
    title: 'Ford Fiesta audio upgrade | Audio Upgrade Emmen',
    description:
      'Beter geluid in je Ford Fiesta. Premium speakers, deurdemping en DSP-afstemming, met behoud van SYNC en je fabrieksgarantie.',
    intro:
      'De Fiesta rijdt strak en voelt levendig, en dat maakt het des te vreemder dat het geluid er zo braaf bij ligt. Ford bewaart het betere systeem voor de optielijst.',
    problems: [
      'De basisinstallatie levert weinig vermogen, waardoor het geheel dichtknijpt zodra je verder opendraait.',
      'De deuren zijn niet gedempt, dus de achterkant van de speaker straalt de deur in en heft daar een deel van de bas op.',
      'Er is geen echte subwoofer, waardoor het fundament onder de muziek ontbreekt en alles wat mager blijft.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Fiesta laten we het SYNC-systeem met rust — dat werkt goed en je bent eraan gewend. Wij pakken aan wat erachter zit: gedempte deuren, een fatsoenlijke componentenset en waar gewenst een DSP-versterker die het signaal van SYNC oppikt en er een afstemming op jouw stoel van maakt. Je bediening, je scherm en je telefoonfuncties blijven precies zoals ze waren.',
    },
    carplay: {
      possible: true,
      text: 'Veel Fiesta\'s met SYNC 3 hebben CarPlay al af fabriek. Heb je een oudere uitvoering met een klein scherm, dan bekijken we per auto of het toe te voegen is.',
    },
    packages: ['akoestische-basis', 'oem-plus-executive', 'akoestische-isolatie'],
    faq: [
      {
        q: 'Blijft SYNC gewoon werken?',
        a: 'Ja. Wij vervangen het systeem niet maar sluiten erachter aan. Navigatie, telefoon, spraakbediening en de stuurknoppen blijven ongewijzigd — alleen wat je hoort verandert.',
      },
      {
        q: 'Ik heb het B&O-systeem. Valt daar nog winst te halen?',
        a: 'Ja, al is het vertrekpunt hoger. Je hebt dan een betere speakerset en meer vermogen, maar nog steeds ongedempte deuren en een afstemming die voor elke Fiesta gelijk is. Wij voegen dan gericht demping en DSP-controle toe in plaats van alles te vervangen.',
      },
      {
        q: 'Hoe lang staat mijn auto bij jullie?',
        a: 'Voor de meeste Fiesta-opdrachten één werkdag. Je brengt hem \'s ochtends en rijdt aan het eind van de dag weg met een afgestemd systeem.',
      },
    ],
  },
  // ---------------------------------------------------------- FORD FOCUS
  {
    slug: 'ford-focus',
    brand: 'Ford',
    model: 'Focus',
    generaties: 'MK2, MK3 en MK4, ook Wagon',
    matchers: { merk: 'FORD', model: /FOCUS/ },
    title: 'Ford Focus audio upgrade | Audio Upgrade Emmen',
    description:
      'Beter geluid in je Ford Focus of Wagon. Premium speakers, deurdemping en DSP-afstemming met behoud van SYNC en je garantie.',
    intro:
      'De Focus rijdt beter dan hij kost, en dat is jarenlang zijn kracht geweest. Het geluid heeft die reputatie nooit gehaald: het is netjes, en verder niets.',
    problems: [
      'De basisinstallatie levert weinig vermogen en knijpt dicht zodra je verder opendraait.',
      'De deuren zijn niet gedempt, dus de achterkant van de speaker heft een deel van de bas op.',
      'Bij de Wagon slikt de grote laadruimte lage tonen weg en resoneert de achterklep hoorbaar mee.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Focus laten we SYNC met rust — dat werkt goed en je bent eraan gewend. Wij pakken aan wat erachter zit: gedempte deuren, een fatsoenlijke componentenset en waar gewenst een DSP-versterker die het signaal van SYNC oppikt. Rijd je Wagon, dan dempen we ook de laadruimte, want daar zit bij die carrosserie de resonantie.',
    },
    carplay: {
      possible: true,
      text: 'Veel Focussen met SYNC 3 hebben CarPlay al af fabriek. Bij oudere uitvoeringen met een klein scherm bekijken we per auto wat er mogelijk is.',
    },
    packages: ['akoestische-basis', 'oem-plus-executive', 'akoestische-isolatie'],
    faq: [
      {
        q: 'Blijft SYNC gewoon werken?',
        a: 'Ja. Wij vervangen het systeem niet maar sluiten erachter aan. Navigatie, telefoon, spraakbediening en de stuurknoppen blijven ongewijzigd.',
      },
      {
        q: 'Ik heb de Wagon. Kost dat extra?',
        a: 'Als je de laadruimte mee wilt dempen wel, want dat is extra oppervlak en extra demontage. Daar zit bij een Wagon wel de meeste winst.',
      },
      {
        q: 'Mijn Focus is wat ouder. Is het dat nog waard?',
        a: 'Blijf je er nog jaren in rijden, dan zeker. Gedempte deuren en een goede speakerset gaan langer mee dan de auto. Wij controleren wel eerst het plaatwerk voordat we iets plakken.',
      },
    ],
  },

  // ------------------------------------------------------------- FORD KA
  {
    slug: 'ford-ka',
    brand: 'Ford',
    model: 'Ka',
    generaties: 'Ka II en Ka+',
    matchers: { merk: 'FORD', model: /\bKA\b|\bKA\+/ },
    title: 'Ford Ka audio upgrade | Audio Upgrade Emmen',
    description:
      'Beter geluid in je Ford Ka. Speakers, akoestische deurdemping en minder rolgeluid, met all-in prijs en garantie behouden.',
    intro:
      'De Ka is een stadsauto zonder pretenties, en zo is hij ook uitgerust. Precies daarom valt er met bescheiden middelen veel te winnen.',
    problems: [
      'Twee of vier eenvoudige speakers zonder aparte tweeter, dus het geluid komt volledig uit je knieën.',
      'Het lichte deurblik trilt hoorbaar mee op elke basnoot.',
      'Minimale isolatie: op snelwegsnelheid overstemt het rolgeluid de muziek.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Ka is demping het halve resultaat. Het lichte blik stilleggen levert direct hoorbaar meer bas op, zonder dat er één watt bij komt. Daarna zetten we er een componentenset in met een losse tweeter, zodat het geluid vóór je komt te zitten. Door de kleine cabine haal je met weinig vermogen al een groot verschil.',
    },
    carplay: {
      possible: true,
      text: 'Bij de Ka+ met SYNC-scherm is CarPlay vaak toe te voegen. Bij de oudere Ka zonder scherm is dat niet mogelijk; een foto van je dashboard geeft uitsluitsel.',
    },
    packages: ['akoestische-basis', 'akoestische-isolatie'],
    faq: [
      {
        q: 'Wat levert het meest op als ik één ding kies?',
        a: 'De deuren dempen. Bij deze auto is het lichte blik de grootste boosdoener, en dat stilleggen kost geen extra vermogen.',
      },
      {
        q: 'Is het niet zonde om in zo\'n auto te investeren?',
        a: 'Blijf je er nog jaren in rijden, dan niet. Een kleine cabine vraagt weinig vermogen en je zit dicht bij de speakers, dus je krijgt veel terug voor een bescheiden bedrag.',
      },
      {
        q: 'Blijft mijn fabrieksgarantie geldig?',
        a: 'Ja. Wij werken met Plug & Play-kabelbomen op de bestaande stekkers en knippen geen originele bedrading door.',
      },
    ],
  },

  // ------------------------------------------------------------ FORD KUGA
  {
    slug: 'ford-kuga',
    brand: 'Ford',
    model: 'Kuga',
    generaties: 'Kuga I, II en III',
    matchers: { merk: 'FORD', model: /KUGA/ },
    title: 'Ford Kuga audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer body in je Ford Kuga. Premium speakers, demping van deuren en achterklep, DSP-afstemming met behoud van SYNC.',
    intro:
      'De Kuga is de gezinsauto van Ford: hoog, ruim en met veel kilometers per jaar. Dat formaat vraagt meer van de audio dan er af fabriek in zit.',
    problems: [
      'Het cabinevolume is fors terwijl de basisaansturing weinig vermogen levert, dus lage tonen komen nooit op niveau.',
      'De hoge zitpositie legt het geluidsbeeld laag, ver onder je oorhoogte.',
      'De grote achterklep en de bagageruimtepanelen resoneren hoorbaar mee.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Kuga laten we SYNC met rust en werken we erachter. De deuren en de achterklep dempen we, wat het dreunen wegneemt, en een DSP-versterker geeft de speakers het vermogen dat het volume vraagt. Met tijdcorrectie tillen we het geluidsbeeld naar ooghoogte. Je scherm, telefoonfuncties en stuurbediening blijven ongewijzigd.',
    },
    carplay: {
      possible: true,
      text: 'Veel Kuga\'s met SYNC 3 hebben CarPlay al af fabriek. Bij oudere uitvoeringen bekijken we per auto wat er mogelijk is.',
    },
    packages: ['carplay-upgrade', 'akoestische-basis', 'oem-plus-executive'],
    faq: [
      {
        q: 'Blijft SYNC gewoon werken?',
        a: 'Ja. Wij vervangen het systeem niet maar sluiten erachter aan. Navigatie, telefoon en de stuurknoppen blijven ongewijzigd.',
      },
      {
        q: 'Ik heb het B&O-systeem. Heeft een upgrade dan nog zin?',
        a: 'Ja, gerichter. Je hebt dan een betere speakerset, maar nog steeds ongedempte deuren en klep. Wij voegen demping en DSP-controle toe in plaats van te vervangen.',
      },
      {
        q: 'Verlies ik bagageruimte?',
        a: 'Nee. Wij werken met compacte subwoofers die onder de stoel of in de reservewielbak verdwijnen.',
      },
    ],
  },

  // ----------------------------------------------------------- FORD PUMA
  {
    slug: 'ford-puma',
    brand: 'Ford',
    model: 'Puma',
    generaties: 'Puma vanaf 2019',
    matchers: { merk: 'FORD', model: /PUMA/ },
    title: 'Ford Puma audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer body in je Ford Puma. Premium speakers, deurdemping en DSP-afstemming, met behoud van SYNC.',
    intro:
      'De Puma is de compacte crossover waar Ford het momenteel van moet hebben, en hij rijdt scherper dan zijn concurrenten. Het geluid houdt daar niet helemaal gelijke tred mee.',
    problems: [
      'De basisinstallatie levert weinig vermogen en knijpt dicht zodra je verder opendraait.',
      'De hogere zitpositie legt het geluidsbeeld laag, onder je oorhoogte.',
      'De achterklep resoneert hoorbaar mee zodra er echte bas bij komt.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Puma laten we SYNC met rust en werken we erachter. De deuren en de klep dempen we, en een DSP-versterker geeft de speakers het vermogen dat de cabine vraagt. Met tijdcorrectie tillen we het geluidsbeeld naar ooghoogte. Je scherm, telefoonfuncties en stuurbediening blijven ongewijzigd.',
    },
    carplay: {
      possible: true,
      text: 'Op vrijwel alle Puma-uitvoeringen met SYNC 3 zit CarPlay al af fabriek.',
    },
    packages: ['akoestische-basis', 'oem-plus-executive', 'carplay-upgrade'],
    faq: [
      {
        q: 'Blijft SYNC gewoon werken?',
        a: 'Ja. Wij vervangen het systeem niet maar sluiten erachter aan. Navigatie, telefoon en stuurknoppen blijven ongewijzigd.',
      },
      {
        q: 'Ik heb het B&O-systeem. Heeft een upgrade dan nog zin?',
        a: 'Ja, gerichter. Je hebt dan een betere speakerset, maar nog steeds ongedempte deuren en klep. Wij voegen demping en DSP-controle toe.',
      },
      {
        q: 'Verlies ik bagageruimte?',
        a: 'Nee. Wij gebruiken compacte subwoofers die onder de stoel verdwijnen; de diepe bak achterin blijft volledig bruikbaar.',
      },
    ],
  },

  // ---------------------------------------------------------- FORD C-MAX
  {
    slug: 'ford-c-max',
    brand: 'Ford',
    model: 'C-Max',
    generaties: 'C-Max en Grand C-Max',
    matchers: { merk: 'FORD', model: /C-?MAX/ },
    title: 'Ford C-Max audio upgrade | Audio Upgrade Emmen',
    description:
      'Beter geluid in je Ford C-Max of Grand C-Max. Premium speakers, deurdemping en DSP-afstemming.',
    intro:
      'De C-Max is de ruimtewagen op Focus-techniek: hoog, praktisch en bij de Grand met schuifdeuren. Die hoogte en die grote vlakken maken hem akoestisch levendig.',
    problems: [
      'De hoge, rechte panelen resoneren makkelijk mee en geven een holle nagalm bij lage tonen.',
      'De hoge zitpositie legt het geluidsbeeld laag, onder je oorhoogte.',
      'Bij de Grand C-Max lopen de schuifdeuren anders, wat demontage bewerkelijker maakt.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een C-Max haalt demping de holle nagalm weg en maakt hij de auto merkbaar rustiger. Daarna komt er een componentenset in en tillen we met tijdcorrectie het geluidsbeeld naar ooghoogte. Heb je de Grand met schuifdeuren, dan plannen we daar extra tijd voor in — die vragen meer zorg bij demontage.',
    },
    carplay: {
      possible: true,
      text: 'Bij de C-Max met SYNC-scherm is CarPlay vaak toe te voegen. Bij de oudere uitvoeringen verschilt het per bouwjaar.',
    },
    packages: ['akoestische-basis', 'akoestische-isolatie', 'oem-plus-executive'],
    faq: [
      {
        q: 'Ik heb de Grand met schuifdeuren. Is dat een probleem?',
        a: 'Nee, maar het vraagt meer zorg bij demontage omdat de bedrading en geleiding anders lopen. Wij plannen daar tijd voor in en zeggen dat vooraf.',
      },
      {
        q: 'Ik hoor een holle dreun. Wat is dat?',
        a: 'De hoge, vlakke panelen die meetrillen. Het klinkt als bas maar het is resonantie.',
      },
      {
        q: 'Blijft SYNC gewoon werken?',
        a: 'Ja. Wij sluiten erachter aan en vervangen het systeem niet.',
      },
    ],
  },

  // --------------------------------------------------------- FORD MONDEO
  {
    slug: 'ford-mondeo',
    brand: 'Ford',
    model: 'Mondeo',
    generaties: 'Mondeo III, IV en V, ook Wagon',
    matchers: { merk: 'FORD', model: /MONDEO/ },
    title: 'Ford Mondeo audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer diepgang in je Ford Mondeo of Wagon. Premium speakers, demping en DSP-afstemming met behoud van SYNC.',
    intro:
      'De Mondeo is de klassieke zakelijke kilometervreter. Op die afstanden gaat het niet om hoe hard het kan, maar om hoe lang je het volhoudt.',
    problems: [
      'Op snelwegtempo verdrinkt het middengebied in rolgeluid, en juist dan knijpt de fabrieksversterking dicht.',
      'De deuren zijn niet gedempt, dus een deel van de bas verdwijnt in het paneel.',
      'Bij de Wagon slikt de grote laadruimte lage tonen weg en resoneert de achterklep mee.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Mondeo begint het bij rust. Wij dempen de deuren en bij een Wagon ook de laadruimte, waardoor de bodem stiller wordt en je zachter kunt luisteren zonder iets te missen. Daarna geeft een DSP-versterker de speakers ruimte en zetten we met tijdcorrectie het geluidsbeeld voor je op het dashboard. SYNC blijft ongewijzigd.',
    },
    carplay: {
      possible: true,
      text: 'Veel Mondeo\'s met SYNC 3 hebben CarPlay al af fabriek. Bij oudere uitvoeringen bekijken we per auto wat er kan.',
    },
    packages: ['akoestische-basis', 'oem-plus-executive', 'akoestische-isolatie'],
    faq: [
      {
        q: 'Ik rij veel snelweg. Wat merk ik daarvan?',
        a: 'Minder luistervermoeidheid. Is de bodem stiller, dan hoef je er niet meer overheen te draaien en stap je minder moe uit.',
      },
      {
        q: 'Ik heb de Wagon. Kost dat extra?',
        a: 'Als je de laadruimte mee wilt dempen wel. Daar zit bij een stationwagen wel de meeste winst.',
      },
      {
        q: 'Blijft SYNC gewoon werken?',
        a: 'Ja. Wij sluiten erachter aan en vervangen het systeem niet.',
      },
    ],
  },
];
