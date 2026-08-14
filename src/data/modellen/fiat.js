/**
 * Fiat — 3 modellen.
 *
 * DE VOLGORDE IN DIT BESTAND TELT. De kenteken-check pakt de eerste
 * treffer, dus een specifiek model hoort bóven een algemener model te
 * staan: "Range Rover Sport" vóór "Range Rover".
 *
 * Gebruik geen \b direct achter een cijfer: tussen de 0 en de I van
 * "320I" ligt geen woordgrens. Gebruik daar (?!\d).
 */

export default [

  // ------------------------------------------------------------ FIAT 500
  {
    slug: 'fiat-500',
    brand: 'Fiat',
    model: '500',
    generaties: '500 en 500C',
    matchers: { merk: 'FIAT', model: /\b500\b/ },
    title: 'Fiat 500 audio upgrade | Audio Upgrade Emmen',
    description:
      'Voller en warmer geluid in je Fiat 500. Premium speakers, deurdemping en een afstemming die de harde binnenkant temt.',
    intro:
      'De 500 is gekocht om hoe hij eruitziet, en dat mooie interieur is precies het probleem voor het geluid: veel gelakt plaatwerk en harde oppervlakken binnen handbereik.',
    problems: [
      'Het gelakte dashboard en de harde panelen kaatsen hoge tonen terug. Daardoor klinkt de 500 scherper en vermoeiender dan je van dit volume zou verwachten.',
      'De cabine is klein maar akoestisch lastig: weinig zachte materialen om reflecties te dempen.',
      'De basisinstallatie heeft weinig vermogen en geen echte onderkant, waardoor er onder de muziek niets zit.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een 500 gaat het minder om harder en meer om beschaafder. Wij dempen de deuren, wat het rammelen wegneemt en de bas laat dragen, en kiezen een speakerset met een zachtere hoge kant die niet met dat gelakte dashboard gaat vechten. Met een DSP-afstemming halen we de reflecties eruit die de auto scherp maken. Het resultaat is een 500 waar je een uur in kunt zitten zonder dat je oren moe worden.',
    },
    carplay: {
      possible: true,
      text: 'Op uitvoeringen met het Uconnect-scherm is CarPlay vaak al aanwezig of toe te voegen. Bij de kale uitvoeringen zonder scherm kijken we per auto wat de nette oplossing is.',
    },
    packages: ['akoestische-basis', 'oem-plus-executive', 'akoestische-isolatie'],
    faq: [
      {
        q: 'Waarom klinkt mijn 500 zo scherp?',
        a: 'Door het gelakte dashboard en de harde panelen. Hoge tonen kaatsen daar meerdere keren op terug voordat ze bij je oor zijn, en dat stapelt op. Met de juiste speakerkeuze en afstemming is dat goed te temmen zonder dat het dof wordt.',
      },
      {
        q: 'Ik heb een 500C met vouwdak. Maakt dat verschil?',
        a: 'Ja. Met het dak open verdwijnt de akoestiek van de cabine en concurreert de muziek met rijwind. Wij stemmen dan af op een compromis dat open én dicht werkt, en kiezen de speakerposities daarop.',
      },
      {
        q: 'Ik heb het BeatsAudio-systeem. Valt daar nog winst te halen?',
        a: 'Ja, vooral in beheersing. Dat systeem geeft je meer bas, maar de deuren blijven ongedempt en de scherpte bovenin blijft. Demping en een eigen afstemming maken het geheel rustiger in plaats van luider.',
      },
    ],
  },

  // ----------------------------------------------------------- FIAT PANDA
  {
    slug: 'fiat-panda',
    brand: 'Fiat',
    model: 'Panda',
    generaties: 'Panda II en III',
    matchers: { merk: 'FIAT', model: /PANDA/ },
    title: 'Fiat Panda audio upgrade | Audio Upgrade Emmen',
    description:
      'Beter geluid in je Fiat Panda. Speakers, akoestische deurdemping en minder rolgeluid, met all-in prijs.',
    intro:
      'De Panda is eerlijk gebouwd: recht, hoog en zonder opsmuk. Die rechte, hoge panelen maken hem akoestisch levendiger dan comfortabel is.',
    problems: [
      'De rechte, hoge panelen resoneren makkelijk mee en geven een holle nagalm bij lage tonen.',
      'Twee of vier eenvoudige speakers zonder aparte tweeter, dus het geluid komt volledig uit je knieën.',
      'Minimale isolatie: op snelwegsnelheid overstemt het rolgeluid de muziek.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Panda is demping het halve werk. De rechte panelen stilleggen haalt de holle nagalm weg die je aanzag voor bas, en maakt de auto meteen rustiger op de snelweg. Daarna zetten we er een componentenset in met een losse tweeter zodat het geluid vóór je komt te zitten. Voor een bescheiden bedrag klinkt de auto compleet anders.',
    },
    carplay: {
      possible: true,
      text: 'Heeft jouw Panda het Uconnect-scherm, dan kunnen we CarPlay meestal toevoegen. Bij de kale uitvoeringen zonder scherm is dat niet mogelijk.',
    },
    packages: ['akoestische-isolatie', 'akoestische-basis'],
    faq: [
      {
        q: 'Ik hoor een holle dreun. Wat is dat?',
        a: 'De rechte, vlakke panelen die meetrillen. Het klinkt als bas maar het is resonantie, en het maskeert de echte lage tonen. Dempen lost dat op.',
      },
      {
        q: 'Waarom raden jullie isolatie als eerste aan?',
        a: 'Omdat rolgeluid en resonantie hier het grootste probleem zijn. Zolang de weg luider is dan de muziek, hoor je van betere speakers maar de helft.',
      },
      {
        q: 'Wat kost dit ongeveer?',
        a: 'De Akoestische Basis ligt op € 995 all-in. Alleen isolatie maken we op maat, afhankelijk van hoeveel oppervlak je wilt aanpakken.',
      },
    ],
  },

  // ----------------------------------------------------------- FIAT PUNTO
  {
    slug: 'fiat-punto',
    brand: 'Fiat',
    model: 'Punto',
    generaties: 'Punto, Grande Punto en Punto Evo',
    matchers: { merk: 'FIAT', model: /PUNTO/ },
    title: 'Fiat Punto audio upgrade | Audio Upgrade Emmen',
    description:
      'Beter geluid in je Fiat Punto. Speakers vervangen, deuren dempen en minder rolgeluid, met all-in prijs.',
    intro:
      'De Punto is jarenlang een van de meest verkochte kleine auto\'s van Europa geweest. De exemplaren die nu rijden zijn op leeftijd, en dat hoor je aan het geluid.',
    problems: [
      'De originele speakerconussen zijn na jaren verhard of vergaan: dunne, rammelende bas zonder dat er iets kapot is.',
      'De deuren zijn niet gedempt en het blik is licht, dus bas komt vooral als geklapper terug.',
      'Weinig isolatie, waardoor rolgeluid op de snelweg de muziek overstemt.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Punto vervangen we de vergane speakers en dempen we de deuren, na controle van het plaatwerk. Dat laatste is bij deze leeftijd geen overbodige stap. Daarna komt er een componentenset in met een losse tweeter, zodat het geluidsbeeld vóór je komt te zitten. Voor een bescheiden bedrag klinkt de auto compleet anders.',
    },
    carplay: {
      possible: false,
      text: 'De meeste Punto\'s hebben geen scherm waar CarPlay in past. Draadloos streamen en handsfree bellen kan wel met een discrete oplossing achter het dashboard.',
    },
    packages: ['akoestische-basis', 'akoestische-isolatie'],
    faq: [
      {
        q: 'Mijn bas is verdwenen maar de speakers werken nog. Hoe kan dat?',
        a: 'De conus of de schuimrand is verhard of gescheurd. De speaker maakt nog geluid maar verliest zijn lage tonen. Zeer gebruikelijk bij auto\'s van deze leeftijd.',
      },
      {
        q: 'Is mijn Punto het nog waard?',
        a: 'Dat bepaal jij. Blijf je er nog jaren in rijden, dan is het goed besteed. Wij zeggen eerlijk wanneer wij vinden dat de investering niet in verhouding staat.',
      },
      {
        q: 'Blijft mijn fabrieksgarantie geldig?',
        a: 'Ja, voor zover die er nog is. Wij werken met Plug & Play-kabelbomen en knippen geen originele bedrading door.',
      },
    ],
  },
];
