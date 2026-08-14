/**
 * Dacia — 2 modellen.
 *
 * DE VOLGORDE IN DIT BESTAND TELT. De kenteken-check pakt de eerste
 * treffer, dus een specifiek model hoort bóven een algemener model te
 * staan: "Range Rover Sport" vóór "Range Rover".
 *
 * Gebruik geen \b direct achter een cijfer: tussen de 0 en de I van
 * "320I" ligt geen woordgrens. Gebruik daar (?!\d).
 */

export default [

  // ------------------------------------------------------- DACIA SANDERO
  {
    slug: 'dacia-sandero',
    brand: 'Dacia',
    model: 'Sandero',
    generaties: 'Sandero I, II en III, ook Stepway',
    matchers: { merk: 'DACIA', model: /SANDERO/ },
    title: 'Dacia Sandero audio upgrade | Audio Upgrade Emmen',
    description:
      'Beter geluid in je Dacia Sandero. Speakers, akoestische deurdemping en minder rolgeluid, met all-in prijs.',
    intro:
      'De Sandero is gebouwd op de scherpst mogelijke prijs, en daar is niets mis mee — je weet wat je koopt. Audio is wel het eerste waar dat te horen is.',
    problems: [
      'Eenvoudige speakers zonder aparte tweeter, waardoor stemmen dof blijven en alles uit je knieën komt.',
      'Minimale isolatie, waardoor rolgeluid op de snelweg de muziek overstemt.',
      'Het lichte plaatwerk trilt hoorbaar mee op elke basnoot.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Sandero is demping veruit de beste eerste stap: het maakt de auto merkbaar rustiger, wat op lange ritten meer oplevert dan meer volume. Daarna zetten we er een componentenset in met een losse tweeter, zodat het geluid vóór je komt te zitten. Voor een bescheiden bedrag is dit een van de grootste sprongen die wij maken.',
    },
    carplay: {
      possible: true,
      text: 'Op de Sandero met Media Nav of Media Display is CarPlay vaak al aanwezig of toe te voegen. Bij de kale uitvoeringen met alleen een telefoonhouder is dat niet mogelijk.',
    },
    packages: ['akoestische-isolatie', 'akoestische-basis', 'oem-plus-executive'],
    faq: [
      {
        q: 'Waarom raden jullie isolatie als eerste aan?',
        a: 'Omdat het rolgeluid hier het grootste probleem is. Zolang de weg luider is dan de muziek, hoor je van betere speakers maar de helft.',
      },
      {
        q: 'Is het niet zonde om in zo\'n auto te investeren?',
        a: 'Juist niet. Omdat er af fabriek weinig in zit, is het verschil hier groter dan bij een auto die al een fatsoenlijk systeem heeft.',
      },
      {
        q: 'Wat kost dit ongeveer?',
        a: 'De Akoestische Basis ligt op € 995 all-in. Alleen isolatie maken we op maat, afhankelijk van hoeveel oppervlak je wilt aanpakken.',
      },
    ],
  },

  // --------------------------------------------------------- DACIA DUSTER
  {
    slug: 'dacia-duster',
    brand: 'Dacia',
    model: 'Duster',
    generaties: 'Duster I, II en III',
    matchers: { merk: 'DACIA', model: /DUSTER/ },
    title: 'Dacia Duster audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer body in je Dacia Duster. Speakers, akoestische deurdemping en minder rolgeluid, met all-in prijs.',
    intro:
      'De Duster is de eerlijkste SUV die je kunt kopen: robuust, simpel en scherp geprijsd. Het geluid is precies waar die scherpe prijs vandaan komt.',
    problems: [
      'Eenvoudige speakers zonder aparte tweeter, waardoor stemmen dof blijven en alles uit je knieën komt.',
      'Minimale isolatie: op de snelweg is het rolgeluid duidelijk het luidste in de auto.',
      'De hoge zitpositie legt het geluidsbeeld laag, onder je oorhoogte.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Duster is demping veruit de beste eerste stap: het maakt de auto merkbaar rustiger, wat op lange ritten meer oplevert dan meer volume. Daarna zetten we er een componentenset in met een losse tweeter en tillen we met tijdcorrectie het geluidsbeeld naar ooghoogte. Voor een bescheiden bedrag is dit een van de grootste sprongen die wij maken.',
    },
    carplay: {
      possible: true,
      text: 'Op de Duster met Media Nav of Media Display is CarPlay vaak al aanwezig of toe te voegen. Bij de kale uitvoeringen met alleen een telefoonhouder is dat niet mogelijk.',
    },
    packages: ['akoestische-isolatie', 'akoestische-basis', 'oem-plus-executive'],
    faq: [
      {
        q: 'Waarom raden jullie isolatie als eerste aan?',
        a: 'Omdat het rolgeluid hier het grootste probleem is. Zolang de weg luider is dan de muziek, hoor je van betere speakers maar de helft.',
      },
      {
        q: 'Is het niet zonde om in zo\'n auto te investeren?',
        a: 'Juist niet. Omdat er af fabriek weinig in zit, is het verschil hier groter dan bij een auto die al een fatsoenlijk systeem heeft.',
      },
      {
        q: 'Verlies ik bagageruimte?',
        a: 'Nee. Wij werken met compacte subwoofers die onder de stoel of in de reservewielbak verdwijnen.',
      },
    ],
  },
];
