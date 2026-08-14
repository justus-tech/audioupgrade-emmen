/**
 * Hyundai — 4 modellen.
 *
 * DE VOLGORDE IN DIT BESTAND TELT. De kenteken-check pakt de eerste
 * treffer, dus een specifiek model hoort bóven een algemener model te
 * staan: "Range Rover Sport" vóór "Range Rover".
 *
 * Gebruik geen \b direct achter een cijfer: tussen de 0 en de I van
 * "320I" ligt geen woordgrens. Gebruik daar (?!\d).
 */

export default [

  // -------------------------------------------------------- HYUNDAI I10
  {
    slug: 'hyundai-i10',
    brand: 'Hyundai',
    model: 'i10',
    generaties: 'i10 eerste, tweede en derde generatie',
    // De RDW schrijft dit zowel als "I10" als met een spatie: "I 10".
    matchers: { merk: 'HYUNDAI', model: /\bI ?10\b/ },
    title: 'Hyundai i10 audio upgrade | Audio Upgrade Emmen',
    description:
      'Beter geluid in je Hyundai i10. Speakers, akoestische deurdemping en minder rolgeluid, met all-in prijs en garantie behouden.',
    intro:
      'De i10 is een van de best verkochte stadsauto\'s van Nederland: compact, betrouwbaar en scherp geprijsd. Dat scherpe prijskaartje hoor je terug in het geluid.',
    problems: [
      'Eenvoudige speakers zonder aparte tweeter op veel uitvoeringen, waardoor alles uit je knieën komt.',
      'Het lichte deurblik gaat op elke basnoot hoorbaar meetrillen.',
      'Weinig isolatie: op de snelweg is het rolgeluid het luidste geluid in de auto.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een i10 levert demping direct hoorbaar meer bas op zonder dat er één watt bij komt: het lichte blik stilleggen is het halve werk. Daarna zetten we er een componentenset in met een losse tweeter, zodat het geluid vóór je komt te zitten in plaats van bij je voeten. In deze kleine cabine heb je verrassend weinig vermogen nodig.',
    },
    carplay: {
      possible: true,
      text: 'Op de meeste i10-uitvoeringen met scherm zit CarPlay al af fabriek. Bij de kale uitvoeringen zonder scherm is dat niet mogelijk.',
    },
    packages: ['akoestische-basis', 'akoestische-isolatie', 'oem-plus-executive'],
    faq: [
      {
        q: 'Heb ik CarPlay eigenlijk al?',
        a: 'Goede kans van wel. Hyundai levert het op veel uitvoeringen standaard mee. Wij verkopen je niets wat er al in zit: stuur een foto van je dashboard en je hoort het binnen 24 uur.',
      },
      {
        q: 'Is het niet zonde om in zo\'n kleine auto te investeren?',
        a: 'Juist niet. Een kleine cabine vraagt weinig vermogen voor hetzelfde niveau en je zit dicht bij de speakers. Een goed opgezette i10 klinkt met gemak beter dan een grote auto met fabrieksaudio.',
      },
      {
        q: 'Wat levert het meest op?',
        a: 'De deuren dempen. Bij deze auto is het lichte blik de grootste boosdoener, en dat stilleggen kost geen extra vermogen.',
      },
    ],
  },

  // -------------------------------------------------------- HYUNDAI KONA
  {
    slug: 'hyundai-kona',
    brand: 'Hyundai',
    model: 'Kona',
    generaties: 'OS en SX2, ook volledig elektrisch',
    matchers: { merk: 'HYUNDAI', model: /KONA/ },
    title: 'Hyundai Kona audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer body in je Hyundai Kona. Premium speakers, deurdemping en DSP-afstemming — extra effectief bij de elektrische versie.',
    intro:
      'De Kona is een van de populairste compacte SUV\'s van Nederland, en de elektrische versie is er een die je vaak in Drenthe ziet. Juist die stilte legt bloot wat het geluid mist.',
    problems: [
      'Bij de elektrische versie valt het rolgeluid extra op, omdat er geen motorgeluid overheen komt.',
      'De hogere zitpositie zet je verder van de deurspeakers, waardoor het geluidsbeeld laag blijft hangen.',
      'De achterklep resoneert hoorbaar mee zodra er echte bas bij komt.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Kona, en zeker de elektrische, levert demping dubbel op: de auto wordt stiller én muzikaler. Wij dempen de deuren en de achterklep, tillen met tijdcorrectie het geluidsbeeld naar ooghoogte en voegen waar gewenst een compacte subwoofer toe. In deze cabine heb je daar minder vermogen voor nodig dan in een grote SUV.',
    },
    carplay: {
      possible: true,
      text: 'Op vrijwel alle Kona-uitvoeringen zit CarPlay al af fabriek. Zit het er niet in, dan bekijken we per auto wat er mogelijk is.',
    },
    packages: ['akoestische-basis', 'akoestische-isolatie', 'oem-plus-executive'],
    faq: [
      {
        q: 'Ik heb de elektrische Kona. Merk ik meer verschil?',
        a: 'Ja. Zonder motorgeluid hoor je het rolgeluid en elke resonantie veel duidelijker. Demping levert daardoor meer op dan bij een benzineauto, en maakt de auto ook comfortabeler zonder muziek.',
      },
      {
        q: 'Kost een audiosysteem rijbereik?',
        a: 'Verwaarloosbaar. Bij normaal luisteren verbruikt het een fractie van wat de aandrijving vraagt; het valt weg tegen buitentemperatuur en rijstijl.',
      },
      {
        q: 'Ik heb het Krell-systeem. Wat kunnen jullie toevoegen?',
        a: 'Demping en een eigen afstemming. De componenten zijn dan bovengemiddeld; de winst zit in het temmen van de deuren en de klep en in een afstemming op jouw stoel.',
      },
    ],
  },

  // -------------------------------------------------------- HYUNDAI I20
  {
    slug: 'hyundai-i20',
    brand: 'Hyundai',
    model: 'i20',
    generaties: 'i20 eerste, tweede en derde generatie',
    matchers: { merk: 'HYUNDAI', model: /\bI ?20\b/ },
    title: 'Hyundai i20 audio upgrade | Audio Upgrade Emmen',
    description:
      'Beter geluid in je Hyundai i20. Premium speakers, akoestische deurdemping en DSP-afstemming met behoud van je scherm.',
    intro:
      'De i20 biedt veel auto voor weinig geld, en dat is precies waar het geluid het onderspit delft. Het is niet slecht, het is zuinig gekozen.',
    problems: [
      'Weinig vermogen op de deurspeakers: het systeem knijpt dicht zodra je verder opendraait.',
      'De deuren zijn niet gedempt, dus een deel van de bas verdwijnt in het paneel.',
      'Op veel uitvoeringen ontbreekt een aparte tweeter, waardoor het beeld laag hangt.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een i20 dempen we de deuren en zetten we er een componentenset in met een losse tweeter in de spiegeldriehoek, zodat het geluidsbeeld vóór je komt te zitten. In deze compacte cabine haal je met bescheiden vermogen al een groot resultaat. Je scherm en bediening blijven ongemoeid.',
    },
    carplay: {
      possible: true,
      text: 'Op de meeste i20-uitvoeringen met scherm zit CarPlay al af fabriek. Zit het er niet in, dan bekijken we per auto wat er mogelijk is.',
    },
    packages: ['carplay-upgrade', 'akoestische-basis', 'oem-plus-executive'],
    faq: [
      {
        q: 'Heb ik CarPlay eigenlijk al?',
        a: 'Goede kans van wel. Hyundai levert het op veel uitvoeringen standaard mee. Stuur een foto van je dashboard, dan zeggen we het je binnen 24 uur, en als je het al hebt, zeggen we dat gewoon.',
      },
      {
        q: 'Wat levert het meest op?',
        a: 'De Akoestische Basis: premium speakers voorin plus deurdemping, € 995 all-in.',
      },
      {
        q: 'Blijft mijn fabrieksgarantie geldig?',
        a: 'Ja. Plug & Play-kabelbomen op de bestaande stekkers, niets doorgeknipt, alles terug te bouwen.',
      },
    ],
  },

  // ------------------------------------------------------- HYUNDAI TUCSON
  {
    slug: 'hyundai-tucson',
    brand: 'Hyundai',
    model: 'Tucson',
    generaties: 'TL en NX4',
    matchers: { merk: 'HYUNDAI', model: /TUCSON/ },
    title: 'Hyundai Tucson audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer body in je Hyundai Tucson. Premium speakers, demping van deuren en achterklep, DSP-afstemming en draadloos CarPlay.',
    intro:
      'De Tucson is een van de best verkochte SUV\'s van Nederland en biedt veel voor zijn geld. Het geluid is het onderdeel waar dat het duidelijkst te merken is.',
    problems: [
      'Het cabinevolume is fors en lage tonen hebben vermogen nodig om zo\'n ruimte te vullen.',
      'De hoge zitpositie legt het geluidsbeeld laag, ver onder je oorhoogte.',
      'De grote achterklep werkt als een trommelvel en dreunt hoorbaar mee.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Tucson verrast de achterklep de meeste mensen: die dempen haalt het dreunen weg dat je aanzag voor bas. Daarna geeft een DSP-versterker de speakers het vermogen dat het volume vraagt, met tijdcorrectie zodat het beeld op ooghoogte komt. Een compacte subwoofer vult het fundament aan zonder dat je laadruimte inlevert.',
    },
    carplay: {
      possible: true,
      text: 'Op vrijwel alle Tucsons vanaf 2016 zit CarPlay al af fabriek. Zit het er niet in, dan bekijken we per auto wat er mogelijk is.',
    },
    packages: ['carplay-upgrade', 'akoestische-basis', 'oem-plus-executive'],
    faq: [
      {
        q: 'Ik hoor een doffe dreun bij bas. Is er iets kapot?',
        a: 'Waarschijnlijk niet. Dat is meestal de achterklep die meetrilt. Het klinkt als bas maar het is resonantie.',
      },
      {
        q: 'Ik heb het Krell-systeem. Wat kunnen jullie toevoegen?',
        a: 'Demping en een eigen afstemming. De componenten zijn dan bovengemiddeld; de winst zit in het temmen van de deuren en de klep.',
      },
      {
        q: 'Verlies ik laadruimte?',
        a: 'Nee. Wij werken met compacte subwoofers die in de reservewielbak of onder een stoel verdwijnen.',
      },
    ],
  },
];
