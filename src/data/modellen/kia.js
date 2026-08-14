/**
 * Kia — 7 modellen.
 *
 * DE VOLGORDE IN DIT BESTAND TELT. De kenteken-check pakt de eerste
 * treffer, dus een specifiek model hoort bóven een algemener model te
 * staan: "Range Rover Sport" vóór "Range Rover".
 *
 * Gebruik geen \b direct achter een cijfer: tussen de 0 en de I van
 * "320I" ligt geen woordgrens. Gebruik daar (?!\d).
 */

export default [

  // -------------------------------------------------------- KIA PICANTO
  {
    slug: 'kia-picanto',
    brand: 'Kia',
    model: 'Picanto',
    generaties: 'Picanto tweede en derde generatie',
    matchers: { merk: 'KIA', model: /PICANTO/ },
    title: 'Kia Picanto audio upgrade | Audio Upgrade Emmen',
    description:
      'Beter geluid in je Kia Picanto. Premium speakers, akoestische deurdemping en minder rolgeluid. All-in prijs, fabrieksgarantie behouden.',
    intro:
      'De Picanto is een van de meest verkochte auto\'s van Nederland en een van de meest onderschatte om aan te pakken. Klein, dus je hebt weinig nodig. Er valt veel te winnen.',
    problems: [
      'De instapuitvoeringen komen met een handvol basisspeakers zonder aparte tweeter, waardoor stemmen dof klinken en het beeld laag blijft.',
      'Het plaatwerk is licht uitgevoerd om gewicht te sparen. Dat hoor je terug als meetrillende deuren zodra er bas bij komt.',
      'Weinig isolatie betekent veel rolgeluid, en dat maskeert precies het gebied waar zang en spraak zitten.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Picanto halen we de winst uit de combinatie van demping en een componentenset. Eerst leggen we het lichte deurblik stil, waardoor de bas ophoudt met rammelen en gaat dragen. Daarna komt er een set in met een losse tweeter, die we in het bovenste deel van de deur of in de spiegeldriehoek plaatsen zodat het geluid voor je komt te zitten. In deze cabine is dat genoeg voor een verschil dat mensen niet verwachten van een auto in deze klasse.',
    },
    carplay: {
      possible: true,
      text: 'Veel Picanto\'s vanaf 2017 hebben CarPlay al af fabriek. Zit het er niet in en heb je wel een scherm, dan kunnen we het meestal toevoegen. Stuur een foto van je dashboard, dan zeggen we het je binnen 24 uur, en als je het al hebt, zeggen we dat gewoon eerlijk.',
    },
    packages: ['akoestische-basis', 'akoestische-isolatie', 'oem-plus-executive'],
    faq: [
      {
        q: 'Heb ik CarPlay eigenlijk al?',
        a: 'Goede kans van wel. Kia levert het op veel uitvoeringen vanaf 2017 standaard mee. Wij verkopen je niets wat er al in zit: stuur een foto van je dashboard en je hoort het binnen 24 uur.',
      },
      {
        q: 'Passen er grotere speakers in de deuren?',
        a: 'Wij werken met CNC-gefreesde adapterringen die op de originele bevestigingspunten passen, dus er hoeft niet geboord of gezaagd te worden. Het originele deurpaneel gaat er daarna weer strak op.',
      },
      {
        q: 'Wat kost dit ongeveer voor een Picanto?',
        a: 'De Akoestische Basis met premium speakers en deurdemping ligt op € 995 all-in, inclusief montage en btw. Wil je alleen minder rijgeluid, dan maken we een prijs op maat voor alleen isolatie.',
      },
    ],
  },

  // ------------------------------------------------------------ KIA NIRO
  {
    slug: 'kia-niro',
    brand: 'Kia',
    model: 'Niro',
    generaties: 'Niro I en II, hybride en volledig elektrisch',
    matchers: { merk: 'KIA', model: /NIRO/ },
    title: 'Kia Niro audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer body in je Kia Niro. Premium speakers, deurdemping en DSP-afstemming — extra effectief in een stille elektrische auto.',
    intro:
      'De Niro is een van de meest verkochte hybrides en elektrische auto\'s van Nederland. Juist doordat hij zo stil is, valt op wat het audiosysteem niet doet.',
    problems: [
      'Zonder motorgeluid valt het rolgeluid van de banden extra op, en dat maskeert precies het gebied waar stemmen zitten.',
      'De hogere zitpositie legt het geluidsbeeld laag, onder je oorhoogte.',
      'De basisinstallatie mist een echte onderkant, waardoor er onder de muziek niets zit.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Een elektrische of hybride auto is een dankbare klant voor demping: er is geen motor die het rolgeluid maskeert, dus alles wat je stiller maakt hoor je meteen terug. Wij dempen de deuren en waar gewenst de vloer, zetten er een componentenset in en tillen met tijdcorrectie het geluidsbeeld naar ooghoogte. Een compacte subwoofer maakt het fundament af.',
    },
    carplay: {
      possible: true,
      text: 'Op vrijwel alle Niro-uitvoeringen zit CarPlay al af fabriek. Zit het er niet in, dan bekijken we per auto wat er mogelijk is.',
    },
    packages: ['akoestische-basis', 'akoestische-isolatie', 'oem-plus-executive'],
    faq: [
      {
        q: 'Merk ik in een elektrische auto meer verschil?',
        a: 'Ja. Zonder motorgeluid hoor je het rolgeluid en elke resonantie veel duidelijker. Demping levert daardoor meer op dan bij een benzineauto. Het maakt de auto ook comfortabeler zonder dat je de muziek aanzet.',
      },
      {
        q: 'Kost een audiosysteem rijbereik?',
        a: 'Verwaarloosbaar. Een audiosysteem verbruikt bij normaal luisteren een fractie van wat de aandrijving vraagt. Het effect valt weg tegen buitentemperatuur en rijstijl.',
      },
      {
        q: 'Verlies ik bagageruimte?',
        a: 'Nee. Wij gebruiken compacte subwoofers die onder de stoel of in de reservewielbak verdwijnen.',
      },
    ],
  },

  // -------------------------------------------------------- KIA SPORTAGE
  {
    slug: 'kia-sportage',
    brand: 'Kia',
    model: 'Sportage',
    generaties: 'SL, QL en NQ5',
    matchers: { merk: 'KIA', model: /SPORTAGE/ },
    title: 'Kia Sportage audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer body in je Kia Sportage. Premium speakers, demping van deuren en achterklep, DSP-afstemming en draadloos CarPlay.',
    intro:
      'De Sportage is een van de best verkochte SUV\'s van Nederland en biedt veel auto voor je geld. Het geluid is het onderdeel waar dat het duidelijkst te merken is.',
    problems: [
      'Het cabinevolume is fors en lage tonen hebben vermogen nodig om zo\'n ruimte te vullen.',
      'De hoge zitpositie legt het geluidsbeeld laag, ver onder je oorhoogte.',
      'De grote achterklep werkt als een trommelvel en dreunt hoorbaar mee op elke basnoot.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Sportage verrast de achterklep de meeste mensen: die dempen haalt het dreunen weg dat je aanzag voor bas. Daarna geeft een DSP-versterker de speakers het vermogen dat het volume vraagt, met tijdcorrectie zodat het beeld op ooghoogte komt. Een compacte subwoofer in de reservewielbak vult het fundament aan zonder dat je laadruimte inlevert.',
    },
    carplay: {
      possible: true,
      text: 'Op vrijwel alle Sportages vanaf 2016 zit CarPlay al af fabriek. Zit het er niet in, dan bekijken we per auto wat er mogelijk is.',
    },
    packages: ['carplay-upgrade', 'akoestische-basis', 'oem-plus-executive'],
    faq: [
      {
        q: 'Ik hoor een doffe dreun bij bas. Is er iets kapot?',
        a: 'Waarschijnlijk niet. Dat is meestal de achterklep die meetrilt. Het klinkt als bas maar het is resonantie, en het maskeert de echte lage tonen.',
      },
      {
        q: 'Ik heb het JBL-systeem. Heeft een upgrade dan nog zin?',
        a: 'Ja, gerichter. JBL geeft je meer speakers en meer vermogen, maar laat de deuren en de klep ongedempt. Wij voegen dan demping en DSP-controle toe.',
      },
      {
        q: 'Verlies ik bagageruimte?',
        a: 'Nee. Wij gebruiken compacte subwoofers die onder de stoel of in de reservewielbak verdwijnen.',
      },
    ],
  },

  // -------------------------------------------------------------- KIA RIO
  {
    slug: 'kia-rio',
    brand: 'Kia',
    model: 'Rio',
    generaties: 'Rio derde en vierde generatie',
    matchers: { merk: 'KIA', model: /\bRIO\b/ },
    title: 'Kia Rio audio upgrade | Audio Upgrade Emmen',
    description:
      'Beter geluid in je Kia Rio. Premium speakers, akoestische deurdemping en DSP-afstemming met behoud van je scherm.',
    intro:
      'De Rio is de praktische keuze in de compacte klasse: veel uitrusting voor een scherpe prijs. Op audio is daarbij zichtbaar bezuinigd.',
    problems: [
      'Weinig vermogen op de deurspeakers: het systeem knijpt dicht zodra je verder opendraait.',
      'De deuren zijn niet gedempt, dus een deel van de bas verdwijnt in het paneel.',
      'Op veel uitvoeringen ontbreekt een aparte tweeter, waardoor het beeld laag hangt.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Rio dempen we de deuren en zetten we er een componentenset in met een losse tweeter in het bovenste deel van de deur, zodat het geluidsbeeld vóór je komt te zitten. In deze compacte cabine haal je met bescheiden vermogen al een groot resultaat. Je scherm en bediening blijven ongemoeid.',
    },
    carplay: {
      possible: true,
      text: 'Op de meeste Rio-uitvoeringen vanaf 2017 zit CarPlay al af fabriek. Zit het er niet in, dan bekijken we per auto wat er mogelijk is.',
    },
    packages: ['carplay-upgrade', 'akoestische-basis', 'oem-plus-executive'],
    faq: [
      {
        q: 'Heb ik CarPlay eigenlijk al?',
        a: 'Goede kans van wel. Kia levert het op veel uitvoeringen standaard mee. Stuur een foto van je dashboard, dan zeggen we het je binnen 24 uur.',
      },
      {
        q: 'Wat levert het meest op?',
        a: 'De Akoestische Basis: premium speakers voorin plus deurdemping, € 995 all-in.',
      },
      {
        q: 'Hoe lang duurt de inbouw?',
        a: 'Voor de meeste Rio-opdrachten één werkdag.',
      },
    ],
  },

  // ------------------------------------------------------------ KIA CEED
  {
    slug: 'kia-ceed',
    brand: 'Kia',
    model: 'Ceed',
    generaties: 'cee\'d, Ceed en Ceed Sportswagon',
    // De RDW schrijft dit zowel als "CEED" als met een spatie: "CEE D".
    matchers: { merk: 'KIA', model: /CEE ?'?D/ },
    title: 'Kia Ceed audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer diepgang in je Kia Ceed of Sportswagon. Premium speakers, deurdemping en DSP-afstemming.',
    intro:
      'De Ceed is de praktische middenklasser van Kia: veel auto voor je geld en zeven jaar garantie. Op audio is net als bij de rest van het merk zuinig gekozen.',
    problems: [
      'Weinig vermogen op de deurspeakers: het systeem blijft beheerst, ook als je dat niet wilt.',
      'De deuren zijn niet gedempt, dus een deel van de bas verdwijnt in het paneel.',
      'Bij de Sportswagon slikt de laadruimte lage tonen weg en resoneert de achterklep mee.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Ceed dempen we de deuren en zetten we er een componentenset in met een losse tweeter, zodat het geluidsbeeld vóór je komt te zitten. Rijd je Sportswagon, dan pakken we ook de laadruimte aan. Een DSP-versterker maakt het geheel af met een afstemming op jouw stoel.',
    },
    carplay: {
      possible: true,
      text: 'Op vrijwel alle Ceeds vanaf 2016 zit CarPlay al af fabriek. Zit het er niet in, dan bekijken we per auto wat er mogelijk is.',
    },
    packages: ['carplay-upgrade', 'akoestische-basis', 'oem-plus-executive'],
    faq: [
      {
        q: 'Heb ik CarPlay eigenlijk al?',
        a: 'Goede kans van wel. Kia levert het op veel uitvoeringen standaard mee. Stuur een foto van je dashboard, dan zeggen we het je binnen 24 uur.',
      },
      {
        q: 'Ik heb de Sportswagon. Kost dat extra?',
        a: 'Als je de laadruimte mee wilt dempen wel. Daar zit bij een stationwagen wel de meeste winst.',
      },
      {
        q: 'Vervalt mijn zevenjarige Kia-garantie?',
        a: 'Nee. Wij werken met Plug & Play-kabelbomen op de bestaande stekkers en knippen geen originele bedrading door. Alles is terug te bouwen naar origineel.',
      },
    ],
  },

  // ---------------------------------------------------------- KIA STONIC
  {
    slug: 'kia-stonic',
    brand: 'Kia',
    model: 'Stonic',
    generaties: 'Stonic vanaf 2017',
    matchers: { merk: 'KIA', model: /STONIC/ },
    title: 'Kia Stonic audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer body in je Kia Stonic. Premium speakers, deurdemping, DSP-afstemming en behoud van je scherm.',
    intro:
      'De Stonic is de Rio op hoge poten en verkoopt uitstekend als eerste crossover. Die extra hoogte kost je precies wat het geluid nodig heeft.',
    problems: [
      'De hogere zitpositie zet je verder van de deurspeakers, waardoor het geluidsbeeld laag blijft hangen.',
      'Weinig vermogen op de deurspeakers: het systeem knijpt dicht zodra je opendraait.',
      'De achterklep resoneert hoorbaar mee zodra er echte bas bij komt.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Stonic dempen we de deuren en de klep en tillen we met tijdcorrectie het geluidsbeeld naar ooghoogte. Daarna zetten we er een componentenset in met een losse tweeter. Omdat de cabine compact is, heb je daar minder vermogen voor nodig dan in een grote SUV.',
    },
    carplay: {
      possible: true,
      text: 'Op vrijwel alle Stonics zit CarPlay al af fabriek. Zit het er niet in, dan bekijken we per auto wat er mogelijk is.',
    },
    packages: ['carplay-upgrade', 'akoestische-basis', 'oem-plus-executive'],
    faq: [
      {
        q: 'Heb ik CarPlay eigenlijk al?',
        a: 'Vrijwel zeker. Kia levert het op de Stonic standaard mee. Wij verkopen je niets wat er al in zit.',
      },
      {
        q: 'Waarom komt het geluid van onderen?',
        a: 'Omdat je hoog zit en je speakers laag in de deur. Met tijdcorrectie laten we de signalen samenvallen op jouw stoel.',
      },
      {
        q: 'Vervalt mijn zevenjarige Kia-garantie?',
        a: 'Nee. Plug & Play-kabelbomen op de bestaande stekkers, niets doorgeknipt, alles terug te bouwen.',
      },
    ],
  },

  // ------------------------------------------------------------ KIA VENGA
  {
    slug: 'kia-venga',
    brand: 'Kia',
    model: 'Venga',
    generaties: 'Venga vanaf 2010',
    matchers: { merk: 'KIA', model: /VENGA/ },
    title: 'Kia Venga audio upgrade | Audio Upgrade Emmen',
    description:
      'Beter geluid in je Kia Venga. Speakers, akoestische deurdemping en DSP-afstemming.',
    intro:
      'De Venga is de compacte ruimtewagen van Kia: hoog instappen, veel hoofdruimte en een praktische achterbank. Die hoge, rechte vorm gaat makkelijk galmen.',
    problems: [
      'De hoge, rechte panelen resoneren makkelijk mee en geven een holle nagalm bij lage tonen.',
      'De hoge zitpositie zet je verder van de deurspeakers, waardoor het geluidsbeeld laag blijft hangen.',
      'Eenvoudige speakers zonder aparte tweeter, waardoor stemmen dof blijven.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Venga haalt demping de holle nagalm weg en maakt hij de auto merkbaar rustiger. Daarna komt er een componentenset in met een losse tweeter en tillen we met tijdcorrectie het geluidsbeeld naar ooghoogte. In deze compacte cabine heb je daar weinig vermogen voor nodig.',
    },
    carplay: {
      possible: true,
      text: 'Heeft jouw Venga het multimediascherm, dan is CarPlay meestal toe te voegen. Bij de kale uitvoeringen zonder scherm is dat niet mogelijk.',
    },
    packages: ['akoestische-basis', 'akoestische-isolatie'],
    faq: [
      {
        q: 'Ik hoor een holle dreun. Wat is dat?',
        a: 'De hoge, vlakke panelen die meetrillen. Het klinkt als bas maar het is resonantie.',
      },
      {
        q: 'Wat levert het meest op?',
        a: 'De Akoestische Basis: premium speakers voorin plus deurdemping, € 995 all-in.',
      },
      {
        q: 'Vervalt mijn Kia-garantie?',
        a: 'Nee. Plug & Play-kabelbomen op de bestaande stekkers, niets doorgeknipt, alles terug te bouwen.',
      },
    ],
  },
];
